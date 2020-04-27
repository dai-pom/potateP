package dbConnect

import (
	"database/sql"
)

func SqlConnect() (*sql.DB, error) {
	DBMS := "mysql"
	USER := "app_user"
	PASS := "user_pass"
	PROTOCOL := "tcp(mysql:3306)"
	DBNAME := "app"
	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?charset=utf8&parseTime=true&loc=Asia%2FTokyo"
	return sql.Open(DBMS, CONNECT)
}
