package event

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"potate/dbConnect"
)

type Schedule struct {
  Id        int `json.id`
  Eid            int `json.eid`
  Date       string `json.date`
  Title          string `json.title`
  Description   string `json.description`
  Start     string `json.start`
  End       string `json.end`
  Color       string `json.color`
  UserName       string `json.userName`
}

func AddSchedule(w http.ResponseWriter ,r *http.Request){
	decoder := json.NewDecoder(r.Body)
  var schedule Schedule
	err := decoder.Decode(&schedule)
	if err != nil {
		log.Printf("err 1")
    log.Println(err)
		return
	}
	db, err := dbConnect.SqlConnect()
	if err != nil {
		log.Printf("err 2")
		return
	}
  stmt,err := db.Prepare("insert into schedule (Eid,Date,Title,Description,Start,End,Color,UserName) values (?,?,?,?,?,?,?,?)")
	if err != nil { log.Println(err)
	}
  log.Printf(schedule.Date)
	defer stmt.Close()
  res, err := stmt.Exec(schedule.Eid,schedule.Date,schedule.Title,schedule.Description,schedule.Start,schedule.End,schedule.Color,schedule.UserName)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
  id ,err := res.LastInsertId()
  
  fmt.Fprint(w,id)
  return
}
func FetchSchedule(w http.ResponseWriter,r *http.Request){
  Eid := r.URL.Query().Get("Eid")
  Date := r.URL.Query().Get("Date")
  log.Printf(Eid)
  log.Printf(Date)
	db, err := dbConnect.SqlConnect()
	if err != nil {
		log.Printf("err 2")
		return
	}
  stmt,err := db.Prepare("select * from schedule where Eid = ? and Date = ?")
	if err != nil {
		log.Printf("err 3")
		log.Println(err)
	}
	defer stmt.Close()
  rows,err := stmt.Query(Eid,Date)
  var schedule []Schedule
  if err != nil {
    log.Println(err)
  }
  for rows.Next(){
    var result Schedule
    err = rows.Scan(&result.Id,&result.Eid,&result.Date,&result.End,&result.Start,&result.Title,&result.Description,&result.Color,&result.UserName)
		if err != nil {
			panic(err.Error())
		}
    schedule = append(schedule,result)
  }
  log.Println(schedule)
  response ,err := json.Marshal(schedule)
  w.Write(response)
}
func DeleteSchedule(w http.ResponseWriter,r *http.Request){
   Id := r.URL.Query().Get("Id")
	db, err := dbConnect.SqlConnect()
	if err != nil {
		log.Printf("err 2")
		return
	}
  stmt,err := db.Prepare("delete  from schedule where Id = ?")
	if err != nil {
		log.Printf("err 3")
		log.Println(err)
	}
	defer stmt.Close()
  _,err = stmt.Exec(Id)
  if err != nil {
   w.WriteHeader(http.StatusNotFound) 
  }
  return
}

