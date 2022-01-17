package router

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

/**
 * POST   /api/comment      : save comment, return ID
 * GET    /api/comment/<id> : return a single comment by ID
 * GET    /api/comment      : return all comments
 * DELETE /api/comment/<id> : delete a comment by ID
 */

func Router() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/comment", apiHandler)
	mux.Handle("/", http.FileServer(http.Dir("./client/build")))

	return mux
}

func apiHandler(w http.ResponseWriter, req *http.Request) {
	if req.URL.Path == "/comment/" {
		if req.Method == http.MethodPost {
			// post comment
		} else if req.Method == http.MethodGet {
			// get all tasks
		} else {
			http.Error(w, fmt.Sprintf("expect method GET, DELETE or POST at /task/, got %v", req.Method), http.StatusMethodNotAllowed)
		}
	} else {
		path := strings.Trim(req.URL.Path, "/")
		pathParts := strings.Split(path, "/")

		id, err := strconv.Atoi(pathParts[1])

		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		
		if req.Method == http.MethodGet {
			// get comment
		} else if req.Method == http.MethodDelete {
			// delete comment
		} else {
			http.Error(w, fmt.Sprintf("expect method GET or DELETE at /task/<id>, got %v", req.Method), http.StatusMethodNotAllowed)
		}
	}
}
