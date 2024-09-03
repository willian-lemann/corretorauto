package usecases

import (
	"fmt"
	"scrapper/internal/repositories"
	"scrapper/internal/structs"
)

type SaveListingUseCase struct {
	listings []structs.ListingItem
}

func ExecuteOne(listingItem structs.ListingItem) (bool, error) {
	_, err := repositories.SaveOne(listingItem)
	if err != nil {
		fmt.Println("Cannot save listing", err)
		return false, err
	}
	return true, nil
}
