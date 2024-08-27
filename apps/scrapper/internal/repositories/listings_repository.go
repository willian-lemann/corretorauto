package repositories

import (
	"scrapper/config"
	"scrapper/internal/structs"

	supa "github.com/nedpals/supabase-go"
)

type ListingsRepository struct {
	db *supa.Client
}

func NewListingsRepository(db *supa.Client) *ListingsRepository {
	return &ListingsRepository{
		db: db,
	}
}

func Save(scrappedListings []structs.ListingItem) (bool, error) {
	client, err := config.SupabaseClient()
	if err != nil {
		return false, err
	}

	var results []structs.ListingItem
	for _, scrappedListing := range scrappedListings {
		err = client.DB.From("listings").Upsert(scrappedListing).Execute(&results)
		if err != nil {
			return false, err
		}
	}
	return true, nil
}

func SaveOne(listingItem structs.ListingItem) (bool, error) {
	client, err := config.SupabaseClient()
	if err != nil {
		return false, err
	}

	var results []structs.ListingItem
	err = client.DB.From("listings").Upsert(listingItem).Execute(&results)
	if err != nil {
		return false, err
	}
	return true, nil
}
