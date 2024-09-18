package main

import (
	"fmt"
	scripts "scrapper/scripts/cleaner-listings"
)

const (
	CASA_IMOVEIS  = "casa_imoveis"
	AUX_PREDIAL   = "aux_predial"
	JEFERSON_ALBA = "jeferson_alba"
)

func main() {
	var agencies = []string{
		CASA_IMOVEIS,
		AUX_PREDIAL,
		JEFERSON_ALBA,
	}

	fmt.Println("Starting cleaning")

	for _, agency := range agencies {
		if agency == CASA_IMOVEIS {

			scripts.CleanerCasaImoveis()
		}
		// if agency == AUX_PREDIAL {
		// 	go CleanerAuxPredial()
		// }
		// if agency == JEFERSON_ALBA {
		// 	go CleanerJefersonAlba()
		// }
	}

	fmt.Println("Finished cleaning")
}
