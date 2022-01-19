package router

import (
	// "fmt"
	"net/http"
	// "strconv"
	// "strings"
	
	"github.com/gorilla/mux"
)

/**
 * POST   /api/comment      : save comment, return ID
 * GET    /api/comment/<id> : return a single comment by ID
 * GET    /api/comment      : return all comments
 * DELETE /api/comment/<id> : delete a comment by ID
 */

func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/api/comment", getCommentsHandler).Methods("GET")
	router.HandleFunc("/api/comment/{id}", getCommentHandler).Methods("GET")
	router.HandleFunc("/api/comment", saveCommentHandler).Methods("POST")
	router.HandleFunc("/api/comment/{id}", deleteCommentHandler).Methods("DELETE")

	return router
}

func getCommentsHandler(w http.ResponseWriter, req *http.Request) {}

func getCommentHandler(w http.ResponseWriter, req *http.Request) {}

func saveCommentHandler(w http.ResponseWriter, req *http.Request) {}

func deleteCommentHandler(w http.ResponseWriter, req *http.Request) {}

