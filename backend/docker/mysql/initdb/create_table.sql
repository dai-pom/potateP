CREATE TABLE users
(
    Id      VARCHAR(1000) primary key,
    Name    VARCHAR(40),
    Email   VARCHAR(256),
    Description    VARCHAR(40)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE events
(
  Id INT AUTO_INCREMENT,
  OwnerId VARCHAR(64),
  Name  VARCHAR(40),
  Description  VARCHAR(256),
  StartDate VARCHAR(20),
  EndDate  VARCHAR(20),
  INDEX(Id)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
