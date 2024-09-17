package main

import (
	"fmt"

	"log"

	"scrapper/internal/repositories"
	"scrapper/internal/structs"
	"scrapper/internal/usecases"

	"sync"
)

func main() {
	listings := repositories.GetListingsImages()

	var wg sync.WaitGroup

	resultch := make(chan structs.ListingItem)

	for _, listing := range listings {
		wg.Add(1)
		go func(id int, url string, ch chan<- structs.ListingItem, wg *sync.WaitGroup) {
			defer wg.Done()

			filename := fmt.Sprintf("%d.png", listing.Id)

			placeholderImage, err := usecases.SavePlaceholderImage(url, filename)
			if err != nil {
				log.Println(err)
				return
			}

			listing.PlaceholderImage = placeholderImage

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
