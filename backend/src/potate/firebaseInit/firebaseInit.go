package firebaseInit

import (
	"context"
	"fmt"

	"firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
	"log"
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
func VerifyToken(bearer string) error{
	idToken := strings.Replace(bearer, "Bearer ", "", 1)
	_, tokenErr := FirebaseApp.VerifyIDToken(context.Background(), idToken)
  return tokenErr
}


var FirebaseApp = initFirebase()
