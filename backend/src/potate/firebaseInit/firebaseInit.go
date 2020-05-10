package firebaseInit

import (
	"context"
	"fmt"

	"firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
	"log"
	"net/http"
	"strings"
)

func initFirebase() *auth.Client {
	opt := option.WithCredentialsFile("/etc/serviceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		fmt.Printf("1")
		log.Panic(err)
	}
	auth, err := app.Auth(context.Background())
	if err != nil {
		fmt.Printf("2")
		log.Panic(err)
	}
	return auth
}

func VerifyToken(bearer string) error {
	idToken := strings.Replace(bearer, "Bearer ", "", 1)
	_, tokenErr := FirebaseApp.VerifyIDToken(context.Background(), idToken)
	return tokenErr
}

func GetUidByToken(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	idToken := strings.Replace(authHeader, "Bearer ", "", 1)
	decord, tokenErr := FirebaseApp.VerifyIDToken(context.Background(), idToken)
	return decord.UID, tokenErr
}

var FirebaseApp = initFirebase()
