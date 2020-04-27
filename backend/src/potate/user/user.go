package user

import (
	"context"
	// "encoding/json"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"potate/dbConnect"
	"potate/firebaseInit"
	"strings"
	// "firebase.google.com/go"
	// "github.com/mgutz/ansi"
)

type User struct {
	// gorm.Model
	Id          string `json:id`
	Name        string `json:name`
	Description string `json:description`
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	idToken := strings.Replace(authHeader, "Bearer ", "", 1)
	_, tokenErr := firebaseInit.FirebaseApp.VerifyIDToken(context.Background(), idToken)
	if tokenErr != nil {
		w.WriteHeader(http.StatusForbidden)
		fmt.Fprintf(w, "token ga zenzen dame")
		return
	}
	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		log.Printf("err 1")
		return
	}
	db, err := dbConnect.SqlConnect()
	if err != nil {
		log.Printf("err 2")
		return
	}
	// var result User
  stmt, err := db.Prepare("insert into users (Id,Name,Description) select ?,?,? from dual where not exists  (select * from users where Id = ?)")
	if err != nil {
		fmt.Fprintf(w, "err 3")
	}
	defer stmt.Close()
	_, err = stmt.Exec(user.Id, user.Name, user.Description, user.Id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	return
}
