package router

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"comment-generator/controller"
	"comment-generator/models"

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

func getCommentsHandler(w http.ResponseWriter, req *http.Request) {
	comments, err := controller.GetAllComments()

	if err != nil {
		fmt.Println("Something went wrong trying to fetch comments.")
		return
	}

	w.Header().Add("Access-Control-Allow-Origin", "*")
	
	json.NewEncoder(w).Encode(comments)
}

func getCommentHandler(w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	comment, err := controller.GetComment(vars["id"])

	if err != nil {
		fmt.Println("Something went wrong trying to fetch this comment.")
		return
	}

	// maybe some headers?
	json.NewEncoder(w).Encode(comment)
}

func saveCommentHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var comment models.Comment
	_ = json.NewDecoder(req.Body).Decode(&comment)
	_, err := controller.CreateComment(&comment)

	if err != nil {
		log.Fatal(err)
		return
	}

	json.NewEncoder(w).Encode(comment)
}

func deleteCommentHandler(w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	err := controller.DeleteComment(vars["id"])

	if err != nil {
		fmt.Println("Something went wrong trying to delete this comment.")
		return
	}

	// maybe some headers?
	json.NewEncoder(w).Encode(vars["id"])
}

