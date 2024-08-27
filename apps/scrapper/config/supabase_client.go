package config

import (
	supa "github.com/nedpals/supabase-go"
)

func SupabaseClient() (*supa.Client, error) {
	supabaseUrl := "https://digdpilwqusbkpnnbejk.supabase.co"
	supabaseKey := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZ2RwaWx3cXVzYmtwbm5iZWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MTQ4MDcsImV4cCI6MjAzODE5MDgwN30.O6kWQUnTHNcmXrg-ohuRc5KuSl4QiuQUT7nJiiozMC0"
	client := supa.CreateClient(supabaseUrl, supabaseKey)
	return client, nil
}
