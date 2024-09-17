package main

import (
	"fmt"
	"scrapper/internal/usecases"
	"strings"
	"sync"

	"github.com/gocolly/colly"
)

func checkCasaImoveis() {
	c := colly.NewCollector()

	listings, err := usecases.GetListings("casa_imoveis")
	if err != nil {
		fmt.Println("Cannot get listings from casa_imoveis", err)
		return
	}

	var wg sync.WaitGroup

	for _, listing := range listings {
		wg.Add(1)
		go func(id int, ref string) {
			c.OnHTML("section.internatitle div.internatitle__container.container h1 p", func(e *colly.HTMLElement) {
				notAvailable := e.ChildText("b") == "0"
				if notAvailable {
					_, err := usecases.DeleteSaving(id)
					if err != nil {
						fmt.Println("Cannot delete listing from casa_imoveis", err)
						return
					}
				}
			})

			c.Visit(fmt.Sprintf("https://www.casaimoveisimb.com.br/imovel/?finalidade=on&ref=%s", strings.Replace(ref, "#", "", -1)))
			wg.Done()
		}(listing.Id, listing.Ref)
	}

	wg.Wait()

}

func main() {
	checkCasaImoveis()
}
