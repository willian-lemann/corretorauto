package structs

type ListingItem struct {
	Id        int      `json:"id"`
	Link      string   `json:"link"`
	Image     string   `json:"image"`
	Address   string   `json:"address"`
	Price     string   `json:"price"`
	Area      string   `json:"area"`
	Bedrooms  int      `json:"bedrooms"`
	Bathrooms int      `json:"bathrooms"`
	Type      string   `json:"type"`
	ForSale   bool     `json:"forSale"`
	Parking   int      `json:"parking"`
	Content   string   `json:"content"`
	Photos    []Photos `json:"photos"`
	Agency    string   `json:"agency"`
	Ref       string   `json:"ref"`
}

type Photos struct {
	ListingItemId int    `json:"listingItemId"`
	Href          string `json:"href"`
}
