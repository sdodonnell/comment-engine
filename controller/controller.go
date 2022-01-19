package controller

import (
	"comment-generator/models"
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	connectionString = "mongodb+srv://cg_user:WalterMuffin@commentgenerator.82k0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	dbName = "Test"
	collectionName = "Comments"
)

var collection *mongo.Collection

// Connect to MongoDB
func init() {
	clientOptions := options.Client().ApplyURI(connectionString)
	
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	collection = client.Database(dbName).Collection(collectionName)
}

// CRUD operations
func GetAllComments() ([]models.Comment, error) {
	cursor, err := collection.Find(context.TODO(), bson.D{{}}, nil)

	var results []bson.M
	if err := cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
	}

	fmt.Println(results)
	return [], nil
}

func CreateComment(comment *models.Comment) int {}

func GetComment(id int) (models.Comment, error) {}

func DeleteComment(id int) error {}
