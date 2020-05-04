package event

import (
	"encoding/json"
	"log"
	"net/http"
	"potate/dbConnect"
)

type Event struct {
  Id            int `json.Id`
  OwnerId       string `json.ownerId`
  Name          string `json.name`
  Description   string `json.description`
  StartDate     string `json.startDate`
  EndDate       string `json.endDate`
}

func FetchEvents(w http.ResponseWriter,r *http.Request){
  Id := r.URL.Query()["Id"]
	db, err := dbConnect.SqlConnect()
	if err != nil {
		log.Printf("err 2")
		return
	}
  stmt,err := db.Prepare("select * from events where OwnerId = ?")
	if err != nil {
		log.Printf("err 3")
		log.Println(err)
	}
	defer stmt.Close()
  rows,err := stmt.Query(Id[0])
  var events  []Event
  if err != nil {
    log.Println(err)
  }
  for rows.Next(){
    var result Event
    err = rows.Scan(&result.Id,&result.OwnerId,&result.Name,&result.Description,&result.StartDate,&result.EndDate)
		if err != nil {
			panic(err.Error())
		}
    events = append(events,result)
  }
  response ,err := json.Marshal(events)
  w.Write(response)
}

func AddEvent(w http.ResponseWriter ,r *http.Request){
	decoder := json.NewDecoder(r.Body)
  var event Event
	err := decoder.Decode(&event)
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
  stmt,err := db.Prepare("insert into events (OwnerId,Name,Description,StartDate,EndDate) values (?,?,?,?,?)")
	if err != nil {
		log.Println(err)
	}
	defer stmt.Close()
  res, err := stmt.Exec(event.OwnerId, event.Name, event.Description,event.StartDate, event.EndDate)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var result Event
  stmt,err = db.Prepare("select * from events where Id = ?")
  if err != nil{
    log.Printf("err 4")
    log.Println(err)
  }
	defer stmt.Close()
  insertId ,err:= res.LastInsertId()
	err = stmt.QueryRow(insertId).Scan(&result.Id,&result.OwnerId,&result.Name,&result.Description,&result.StartDate,&result.EndDate)
  if err != nil {
    log.Println(err)
  }
  stmt,err = db.Prepare("insert into eventMember (EventId,UserId) values (?,?)")
  if err != nil{
    log.Printf("err 5")
    log.Println(err)
  }
  defer stmt.Close()
  _,err = stmt.Exec(result.Id,result.OwnerId)
  if err != nil{
    w.WriteHeader(http.StatusInternalServerError)
    return
  }
  response ,err := json.Marshal(result)
  w.Write(response)
}
func AddEventMember(w http.ResponseWriter ,r *http.Request){
  type Query struct{
    EventId  int  `json.eventId`
    UserId   string  `json.userId`
  }
	decoder := json.NewDecoder(r.Body)
  var query Query
	err := decoder.Decode(&query)
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
  stmt,err := db.Prepare("insert into eventMember (EventId,UserID) values (?,?)")
	if err != nil {
		log.Println(err)
	}
	defer stmt.Close()
  _, err = stmt.Exec(query.EventId,query.UserId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
  return
	}

func FetchEventMember(w http.ResponseWriter,r *http.Request){
Id := r.URL.Query().Get("Id")
	db, err := dbConnect.SqlConnect()
	if err != nil {
		log.Printf("err 2")
		return
	}
  stmt,err := db.Prepare("select UserId from eventMember where EventId = ?")
	if err != nil {
		log.Printf("err 3")
		log.Println(err)
	}
	defer stmt.Close()
  rows,err := stmt.Query(Id)
  var members  []string
  if err != nil {
    log.Println(err)
  }
  for rows.Next(){
    var result string
    err = rows.Scan(&result)
		if err != nil {
			panic(err.Error())
		}
    members = append(members,result)
  }
  response ,err := json.Marshal(members)
  w.Write(response)

}
