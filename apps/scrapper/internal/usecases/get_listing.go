package usecases

import (
	"fmt"
	"scrapper/config"
	"scrapper/internal/structs"
	"strconv"
)

func GetListing(id int) (*structs.ListingItem, error) {
	client, err := config.SupabaseClient()
	if err != nil {
		fmt.Println("cannot initalize client supabase", err)
		return nil, err
	}

	var results = &structs.ListingItem{}
	err = client.DB.From("listings").Select("*").Single().Eq("id", strconv.Itoa(id)).Execute(&results)
	if err != nil {
		return nil, err
	}

	return results, nil
}
