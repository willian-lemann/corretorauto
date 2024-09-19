package scripts

import (
	"fmt"
	"scrapper/internal/usecases"
	"strings"
	"sync"

	"github.com/gocolly/colly"
)

func CleanerCasaImoveis() {
	// defer wg.Done()

	listings, err := usecases.GetListings("casa_imoveis")
	if err != nil {
		fmt.Println("Cannot get listings from casa_imoveis", err)
		return
	}

	// testing git
	var w sync.WaitGroup

	for _, listing := range listings {
		w.Add(1)
		go func(id int, ref string) {
			defer w.Done()

			c := colly.NewCollector()

			c.OnHTML("section.internatitle div.internatitle__container.container h1", func(e *colly.HTMLElement) {
				notAvailable := e.ChildText("p.topsearch__total b") == "0"

				if notAvailable {
					_, err := usecases.DeleteSaving(id)
					if err != nil {
						fmt.Println("Cannot delete listing from casa_imoveis", err)
						return
					}
				}
			})

			linkToVisit := fmt.Sprintf("https://www.casaimoveisimb.com.br/imovel/?finalidade=on&ref=%s", strings.Replace(ref, "#", "", -1))

			c.Visit(linkToVisit)
		}(listing.Id, listing.Ref)
	}

	w.Wait()
}
