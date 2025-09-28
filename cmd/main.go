package main

import (
	"fmt"
	"html"
	"log"
	"net/http"
)

func main() {
	// TODO: Add env
	s := &http.Server{
		Addr: ":8080",
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})

	// Add Graceful shotdown
	log.Fatal(s.ListenAndServe())
}
