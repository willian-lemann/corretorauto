package config

import (
	"os"

	supa "github.com/nedpals/supabase-go"
)

func SupabaseClient() (*supa.Client, error) {
	supabaseUrl := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_ANON_KEY")
	client := supa.CreateClient(supabaseUrl, supabaseKey)
	return client, nil
}
