package main

import (
	"fmt"
	"scrapper/internal/scrappers"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup

	wg.Add(3)

	start := time.Now()

	go scrappers.ExecuteJefersonAlba(&wg)
	go scrappers.CasaImoveisExecute(&wg)
	go scrappers.ExecuteAuxPredial(&wg)

	wg.Wait()

	elapsed := time.Since(start)

	fmt.Println("Scraping finished")
	fmt.Println("It took:", elapsed.Seconds())
}
