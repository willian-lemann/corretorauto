package scrappers

import (
	"fmt"
	"log"
	"scrapper/internal/structs"
	"scrapper/internal/usecases"
	"scrapper/utils"
	"strconv"
	"strings"
	"sync"

	"github.com/gocolly/colly"
)

func getLinks(goToLink string) []string {
	c := colly.NewCollector()

	var nextPages []string

	c.OnHTML("div.row div.col-lg-12 nav", func(h *colly.HTMLElement) {
		h.ForEach("ul.pagination li a", func(i int, h *colly.HTMLElement) {
			page := h.Attr("href")
			h.Request.Visit(page)
		})
	})

	c.OnRequest(func(r *colly.Request) {
		nextPages = append(nextPages, r.URL.String())
	})

	c.Visit(goToLink)

	return nextPages
}

func getListingItems(linkToVisit string) []structs.ListingItem {
	c := colly.NewCollector()
	listings := []structs.ListingItem{}
	contentHtmlMap := make(map[int]string)
	photos := []structs.Photos{}

	c.OnHTML("div.row div.col-imovel", func(h *colly.HTMLElement) {
		link := h.ChildAttr("a", "href")

		err := h.Request.Visit(link)
		if err != nil {
			log.Fatal(err)
		}

		id, _ := strconv.Atoi(utils.GetIDFromLink(link))
		image := h.ChildAttr("div.box-content div.box-imovel-image img", "src")
		forSale := h.ChildText("div.box-content div.box-imovel-infos div.box-imovel-tag span") == "Venda"
		price := strings.Split(h.ChildText("div.box-content div.box-imovel-infos span.--price"), " ")[1]
		listingType := h.ChildText("div.box-content div.box-imovel-infos span.--type")
		address := h.ChildText("div.box-content div.box-imovel-infos span.--location")
		area := ""
		bedrooms := 0
		bathrooms := 0
		parking := 0
		ref := utils.GetIDFromLink(link)
		h.ForEach("div.box-content div.box-imovel-infos ul.box-imovel-items li", func(i int, h *colly.HTMLElement) {
			if strings.Contains(h.Text, "vagas") {
				parkingQuantity, _ := strconv.Atoi(h.ChildText("strong"))
				parking = parkingQuantity
			}

			if strings.Contains(h.Text, "dormitório") {
				bedroomsQuantity, _ := strconv.Atoi(h.ChildText("strong"))
				bedrooms = bedroomsQuantity
			}

			if strings.Contains(h.Text, "banheiro") {
				bathroomsQuantity, _ := strconv.Atoi(h.ChildText("strong"))
				bathrooms = bathroomsQuantity
			}

			if strings.Contains(h.Text, "m²") {
				area = h.ChildText("strong")
			}
		})

		if len(listings) > 0 {
			for _, listing := range listings {
				if listing.Id != id {
					listings = append(listings, structs.ListingItem{
						Id:        id,
						Link:      link,
						Image:     image,
						Address:   address,
						Price:     price,
						Area:      area,
						Bedrooms:  bedrooms,
						Bathrooms: bathrooms,
						Type:      listingType,
						ForSale:   forSale,
						Parking:   parking,
						Ref:       ref,
					})
				}
			}
		} else {
			listings = append(listings, structs.ListingItem{
				Id:        id,
				Link:      link,
				Image:     image,
				Address:   address,
				Price:     price,
				Area:      area,
				Bedrooms:  bedrooms,
				Bathrooms: bathrooms,
				Type:      listingType,
				ForSale:   forSale,
				Parking:   parking,
				Ref:       ref,
			})
		}
	})

	c.OnRequest(func(r *colly.Request) {
		id, _ := strconv.Atoi(utils.GetIDFromLink(r.URL.String()))

		c.OnHTML("div.row div div.imovel-content-section", func(h *colly.HTMLElement) {
			bodyHtml, err := h.DOM.Html()
			if err != nil {
				log.Fatal(err)
			}
			contentHtmlMap[id] = bodyHtml
		})

		c.OnHTML("div#imovel-fotos div.container div.img-gallery-magnific", func(h *colly.HTMLElement) {
			imagePhoto := h.ChildAttr("div.magnific-img a.image-popup-vertical-fit", "href")
			photos = append(photos, structs.Photos{
				Href:          imagePhoto,
				ListingItemId: id,
			})
		})
	})

	c.Visit(linkToVisit)

	var newListingsWithContent []structs.ListingItem

	for _, listing := range listings {
		content := contentHtmlMap[listing.Id]
		listing.Content = content

		var listingPhotos []structs.Photos
		for _, photo := range photos {
			if photo.ListingItemId == listing.Id {
				listingPhotos = append(listingPhotos, photo)
			}
		}
		listing.Photos = listingPhotos

		listing.Agency = "jeferson_alba"
		newListingsWithContent = append(newListingsWithContent, listing)
	}
	return newListingsWithContent
}

func worker(links chan string) {
	for link := range links {
		listings := getListingItems(link)

		saveListing := usecases.NewSaveListingUseCase(listings)
		_, err := saveListing.Execute()

		if err != nil {
			fmt.Println("Cannot save listings from jeferson_alba", err)
		}
	}
}

func ExecuteJefersonAlba(wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("Starting scrapping jeferson_alba...")

	go func() {
		forSaleListingsLinks := getLinks("https://imobiliariajefersonealba.com.br/vendas/pesquisa/apartamento/imbituba/todos/todos/1")
		data := make(chan string)
		qntWorkers := len(forSaleListingsLinks) - 1
		for i := 0; i < qntWorkers; i++ {
			go worker(data)
		}
		for i := 0; i < len(forSaleListingsLinks); i++ {
			data <- forSaleListingsLinks[i]
		}
	}()

	rentListingsLinks := getLinks("https://imobiliariajefersonealba.com.br/alugueis/pesquisa/todos/imbituba/todos/todos")
	data := make(chan string)
	qntWorkers := len(rentListingsLinks) - 1
	for i := 0; i < qntWorkers; i++ {
		go worker(data)
	}
	for i := 0; i < len(rentListingsLinks); i++ {
		data <- rentListingsLinks[i]
	}

	fmt.Println("Finished scrapping jeferson_alba")
}
