package usecases

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"net/http"
	"scrapper/config"
	"scrapper/pkg"
)

func SavePlaceholderImage(url string, filename string) (string, error) {
	client, err := config.SupabaseClient()
	if err != nil {
		log.Fatal(err)
	}

	resp, err := http.Get(url)
	if err != nil {
		fmt.Printf("Image:[%s] not downloadable", url)
		return "", err
	}

	defer resp.Body.Close()

	imageData, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to read image data:", err)
		return "", err
	}

	compressedImage := pkg.ImageResizing(imageData)

	response := client.Storage.From("images").Upload(filename, bytes.NewReader(compressedImage))

	if response.Key == "" {
		fmt.Println("Failed to upload image:", err)
	}

	resultURL := fmt.Sprintf("https://digdpilwqusbkpnnbejk.supabase.co/storage/v1/object/public/images/%s", filename)

	return resultURL, nil
}
