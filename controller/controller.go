package controller

import (
	"comment-generator/models"
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
func GetAllComments() ([]bson.M, error) {
	cursor, err := collection.Find(context.TODO(), bson.D{{}})

	if err != nil {
		log.Fatal(err)
	}

	var results []bson.M
	if err := cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
	}

	return results, nil
}

func CreateComment(comment *models.Comment) (interface{}, error) {
	result, err := collection.InsertOne(context.TODO(), *comment)

	if err != nil {
		fmt.Println("There was an error saving a comment to the database.")
	}

	fmt.Printf("Document successfully inserted! ID: %v\n", result.InsertedID)

	return result.InsertedID, err
}

func GetComment(id string) (models.Comment, error) {
	var comment models.Comment
	objectId, _ := primitive.ObjectIDFromHex(id)
	err := collection.FindOne(context.TODO(), bson.D{{Key: "_id", Value: objectId}}).Decode(&comment)

	if err != nil {
		fmt.Printf("There was an error fetching this comment: %v\n", objectId)
	}

	return comment, err
}

func DeleteComment(id string) error {
	objectId, _ := primitive.ObjectIDFromHex(id)
	_, err := collection.DeleteOne(context.TODO(), bson.D{{Key: "_id", Value: objectId}})

	if err != nil {
		fmt.Printf("There was an error deleting this comment: %v\n", objectId)
	}

	return nil
}
