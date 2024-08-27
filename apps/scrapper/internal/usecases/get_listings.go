package usecases

import (
	"fmt"
	"scrapper/config"
	"scrapper/internal/structs"
)

func GetListings() ([]structs.ListingItem, error) {
	client, err := config.SupabaseClient()
	if err != nil {
		fmt.Println("cannot initalize client supabase", err)
		return nil, err
	}

	var results = []structs.ListingItem{}
	err = client.DB.From("listings").Select("*").Filter("agency", "eq", "jeferson_alba").Execute(&results)
	if err != nil {
		fmt.Println("cannot get listings from database", err)
		return nil, err
	}

	return results, nil
}
