package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
  "database/sql"

	"github.com/gorilla/mux"
	// "github.com/jinzhu/gorm"
  _ "github.com/jinzhu/gorm/dialects/mysql"
)


func rootHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Hello world!")
    fmt.Fprintf(w, "hello world!")
}
type Article struct {
    ID       int    `json:id`
    Title    string `json:title`
    Author   string `json:author`
    PostDate string `json:year`
}
type User struct{
  // gorm.Model
  id int `json:id`
  name string `json:name`
}

// サンプルデータ用
var articles []Article

func getArticles(w http.ResponseWriter, r *http.Request) {
      // strct を json に変換 してwに出力
  articles = append(articles,
        Article{ID: 1, Title: "Article1", Author: "Gopher", PostDate: "2019/1/1"},
        Article{ID: 2, Title: "Article2", Author: "Gopher", PostDate: "2019/2/2"},
        Article{ID: 3, Title: "Article3", Author: "Gopher", PostDate: "2019/3/3"},
        Article{ID: 4, Title: "Article4", Author: "Gopher", PostDate: "2019/4/4"},
        Article{ID: 5, Title: "Article5", Author: "Gopher", PostDate: "2019/5/5"},
    )
    fmt.Println(articles)
    json.NewEncoder(w).Encode(articles)
}

func getArticle(w http.ResponseWriter, r *http.Request) {
    log.Println("Get article is called")
    db, err := sqlConnect()
    if err != nil {
    panic(err.Error())
    }
    // defer db.Close()
    rows,_ := db.Query("select * from users")
    defer db.Close()
    var users []User
    for rows.Next() {
      var user User //構造体Person型の変数personを定義
      err := rows.Scan(&user.id, &user.name)
      if err != nil {
        panic(err.Error())
      }
      users = append(users,User{id:user.id,name:user.name})
      // fmt.Println(user.id, user.name) //結果　1 yamada 2 suzuki
    }
    fmt.Fprint(w,users)
}

func addArticle(w http.ResponseWriter, r *http.Request) {
    log.Println("Add article is called")
    fmt.Fprintf(w,"hello!")
}

func updateArticle(w http.ResponseWriter, r *http.Request) {
    log.Println("Update article is called")
}

func removeArticle(w http.ResponseWriter, r *http.Request) {
    log.Println("Remove article is called")
}
func main() {
    log.Println("start server")
    r := mux.NewRouter()
    r.HandleFunc("/", rootHandler)

    r.HandleFunc("/articles", getArticles).Methods("GET")
    r.HandleFunc("/articles/json", getArticle).Methods("GET")
    r.HandleFunc("/articles", addArticle).Methods("POST")
    r.HandleFunc("/articles", updateArticle).Methods("PUT")
    r.HandleFunc("/articles/{id}", removeArticle).Methods("DELETE")




    http.Handle("/", r)
    http.ListenAndServe(":3000", nil)
}
func sqlConnect() (*sql.DB,error) {
      DBMS := "mysql"
      USER := "app_user"
      PASS := "user_pass"
      PROTOCOL := "tcp(mysql:3306)"
      DBNAME := "app"
      CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?charset=utf8&parseTime=true&loc=Asia%2FTokyo"
      return sql.Open(DBMS, CONNECT)
}
