package user

import (
	// "encoding/json"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"potate/dbConnect"
	// "firebase.google.com/go"
	// "github.com/mgutz/ansi"
)

type User struct {
	// gorm.Model
	Id          string `json:id`
	Name        string `json:name`
	Email       string `json:email`
	Description string `json:description`
}

func FetchUser(w http.ResponseWriter, r *http.Request) {
  Id := r.URL.Query().Get("Id")
	var user User
	db, err := dbConnect.SqlConnect()
	if err != nil {
		log.Printf("err 2")
		return
	}
  stmt,err := db.Prepare("select * from users where Id = ?")
	if err != nil {
		fmt.Fprintf(w, "err 3")
	}
	defer stmt.Close()
	err = stmt.QueryRow(Id).Scan(&user.Id,&user.Name,&user.Email,&user.Description)
  response ,err := json.Marshal(user)
  w.Write(response)
}
func FetchUserByEmail(w http.ResponseWriter, r *http.Request) {
  Email := r.URL.Query().Get("Email")
  var user User
	db, err := dbConnect.SqlConnect()
	if err != nil {
		log.Printf("err 2")
		return
	}
  stmt,err := db.Prepare("select * from users where Email = ?")
	if err != nil {
		fmt.Fprintf(w, "err 3")
	}
	defer stmt.Close()
	err = stmt.QueryRow(Email).Scan(&user.Id,&user.Name,&user.Email,&user.Description)
  response ,err := json.Marshal(user)
  w.Write(response)
}
func RegisterUser(w http.ResponseWriter, r *http.Request) {
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

	stmt, err := db.Prepare("insert into users (Id,Name,Email,Description) select ?,?,?,? from dual where not exists  (select * from users where Id = ?)")
	if err != nil {
		log.Printf( "err 3")
	}
  if stmt == nil {
    log.Printf("stmt is nil")
  }
	defer stmt.Close()
	_, err = stmt.Exec(user.Id, user.Name, user.Email,user.Description, user.Id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var result User
	stmt, err = db.Prepare("select * from users where Id = ?")
	defer stmt.Close()
	err = stmt.QueryRow(user.Id).Scan(&result.Id,&result.Name,&result.Email,&result.Description)
  if err != nil {
    log.Println(err)
  }
  response ,err := json.Marshal(result)
  w.Write(response)
}
