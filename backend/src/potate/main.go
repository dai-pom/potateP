package main

import (
  "potate/user"
  "potate/firebaseInit"
  "potate/event"
	"fmt"
	"log"
	"net/http"
	// "reflect"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	// "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

//apiの共通処理としてfirebaseトークンの確認を行う。現状だとCLIからAPIを試しに叩くとかはできなくなる。

func token(next http.Handler) http.Handler{
  return http.HandlerFunc(func(w http.ResponseWriter,r *http.Request){
	authHeader := r.Header.Get("Authorization")
  tokenErr := firebaseInit.VerifyToken(authHeader)
	if tokenErr != nil {
		w.WriteHeader(http.StatusForbidden)
		return
	}
  next.ServeHTTP(w,r)
  })
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hello world!")
	fmt.Fprintf(w, "hello world!")
}


func main() {
	log.Println("start server")
	r := mux.NewRouter()
	r.HandleFunc("/", rootHandler)

	r.HandleFunc("/user/register", user.RegisterUser).Methods("POST")
	r.HandleFunc("/user/fetch", user.FetchUser).Queries("Id","{Id}").Methods("GET")

	r.HandleFunc("/event", event.AddEvent).Methods("POST")
	r.HandleFunc("/event", event.FetchEvents).Queries("Id","{Id}").Methods("GET")
	r.HandleFunc("/event/schedule", event.AddSchedule).Methods("POST")
	r.HandleFunc("/event/schedule", event.FetchSchedule).Methods("GET")

  c := cors.New(cors.Options{
    AllowedOrigins:[]string{"*"},
    AllowedHeaders:[]string{"*"},
    AllowCredentials:true,
  })
  secureHandler := token(r)
  handler := c.Handler(secureHandler)
  http.Handle("/", handler)
	http.ListenAndServe(":3000", nil)
}
