package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("../client/build"))
	http.Handle("/", fs)
	
	fmt.Println("Starting server on port 8080...")

	log.Fatal(http.ListenAndServe(":8080", fs))
}
