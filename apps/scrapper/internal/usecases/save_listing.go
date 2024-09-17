package usecases

import (
	"errors"
	"fmt"
	"scrapper/internal/repositories"
	"scrapper/internal/structs"
)

func SaveListing(listingItem structs.ListingItem) (bool, error) {
	listing := structs.NewListingItem(listingItem)

	listingFound, _ := GetListing(listing.Id)

	if listingFound != nil {
		return false, errors.New("listing already in database")
	}

	placeholderImage, err := SavePlaceholderImage(listing.Image, fmt.Sprintf("%d.png", listing.Id))
	if err != nil {
		fmt.Printf("upload placeholder image for listing %d", listing.Id)
	}

	listing.PlaceholderImage = placeholderImage

	_, err = repositories.SaveOne(listing)

	if err != nil {
		fmt.Println("Cannot save listing", err)
		return false, err
	}
	return true, nil
}
