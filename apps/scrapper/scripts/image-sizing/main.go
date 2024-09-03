package main

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"net/http"
	"scrapper/config"
	"scrapper/internal/repositories"

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
	images := repositories.GetListingsImages()

	client, err := config.SupabaseClient()
	if err != nil {
		log.Fatal(err)
	}

	for _, imageURL := range images {
		resp, err := http.Get(imageURL)
		if err != nil {
			fmt.Println("Failed to download image:", err)
			continue
		}
		defer resp.Body.Close()

		imageData, err := io.ReadAll(resp.Body)
		if err != nil {
			fmt.Println("Failed to read image data:", err)
			continue
		}

		compressedImage := imageResize(imageData)

		fmt.Println("size", len(imageData), "=>", len(compressedImage))

		client.Storage.From("images").Upload("placeholder.png", bytes.NewReader(compressedImage))
		if err != nil {
			fmt.Println("Failed to upload image:", err)
			continue
		}

		fmt.Println("Image uploaded successfully.")
	}
}
