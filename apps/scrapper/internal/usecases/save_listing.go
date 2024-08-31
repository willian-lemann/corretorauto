package usecases

import (
	"fmt"
	"scrapper/internal/repositories"
	"scrapper/internal/structs"
)

type SaveListingUseCase struct {
	listings []structs.ListingItem
}

func NewSaveListingUseCase(listings []structs.ListingItem) *SaveListingUseCase {
	return &SaveListingUseCase{
		listings: listings,
	}
}

func workerSave(ch chan structs.ListingItem) {
	for listing := range ch {
		_, err := repositories.SaveOne(listing)
		if err != nil {
			fmt.Println("Cannot save listing", err)
		}
	}
}

func (usecase *SaveListingUseCase) Execute() (bool, error) {
	savedListings, _ := GetListings()

	var savedListingsMap = make(map[int]bool)

	for _, savedListing := range savedListings {
		savedListingsMap[savedListing.Id] = true
	}

	ch := make(chan structs.ListingItem)

	for i := 0; i < 3; i++ {
		go workerSave(ch)
	}

	if len(savedListings) > 0 {
		var nonDuplicates []structs.ListingItem
		for _, listing := range usecase.listings {
			if _, ok := savedListingsMap[listing.Id]; !ok {
				nonDuplicates = append(nonDuplicates, listing)
			}
		}

		for _, listing := range nonDuplicates {
			_, err := repositories.SaveOne(listing)
			if err != nil {
				fmt.Println("Cannot save listing", err)
			}
		}
	} else {
		for _, listing := range usecase.listings {
			ch <- listing
		}
	}
	return true, nil
}

func ExecuteOne(listingItem structs.ListingItem) (bool, error) {
	_, err := repositories.SaveOne(listingItem)
	if err != nil {
		fmt.Println("Cannot save listing", err)
		return false, err
	}
	return true, nil
}
