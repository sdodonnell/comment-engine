package router

import "net/http"

func Router() *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("./client/build")))

	return mux
}
