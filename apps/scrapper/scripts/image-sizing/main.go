package main

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"net/http"
	"scrapper/config"
	"scrapper/internal/repositories"
	"scrapper/internal/structs"
	"sync"

	"github.com/disintegration/imaging"
)

func imageResize(file []byte) []byte {
	src, err := imaging.Decode(bytes.NewReader(file))
	if err != nil {
		log.Fatalf("failed to decode image: %v", err)
	}

	resized := imaging.Resize(src, 50, 50, imaging.Lanczos)

	buf := new(bytes.Buffer)
	err = imaging.Encode(buf, resized, imaging.PNG)
	if err != nil {
		log.Fatalf("failed to encode image: %v", err)
	}

	return buf.Bytes()
}

func main() {
	listings := repositories.GetListingsImages()

	client, err := config.SupabaseClient()
	if err != nil {
		log.Fatal(err)
	}

	var wg sync.WaitGroup

	resultch := make(chan structs.ListingItem)

	for _, listing := range listings {
		wg.Add(1)
		go func(id int, url string, ch chan<- structs.ListingItem, wg *sync.WaitGroup) {
			defer wg.Done()

			resp, err := http.Get(url)
			if err != nil {
				fmt.Println("Failed to download image:", err)
				return
			}
			defer resp.Body.Close()

			imageData, err := io.ReadAll(resp.Body)
			if err != nil {
				fmt.Println("Failed to read image data:", err)
				return
			}

			compressedImage := imageResize(imageData)

			var fileName = fmt.Sprintf("%d.png", listing.Id)

			response := client.Storage.From("images").Upload(fileName, bytes.NewReader(compressedImage))

			if response.Key == "" {
				fmt.Println("Failed to upload image:", err)
				return
			}

			resultURL := fmt.Sprintf("https://digdpilwqusbkpnnbejk.supabase.co/storage/v1/object/public/images/%s", fileName)

			listing.PlaceholderImage = resultURL

			ch <- listing
		}(listing.Id, listing.Image, resultch, &wg)
	}

	go func() {
		wg.Wait()
		close(resultch)
	}()

	for data := range resultch {
		repositories.Update(data)
	}

	fmt.Println("Image uploaded successfully.")
}
