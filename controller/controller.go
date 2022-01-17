package controller

import (
	"comment-generator/models"
)

// Connect to MongoDB
func init() {

}

// CRUD operations
func GetAllComments() ([]models.Comment, error) {}

func CreateComment(comment *models.Comment) int {}

func GetComment(id int) (models.Comment, error) {}

func DeleteComment(id int) error {}
