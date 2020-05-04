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

CREATE TABLE schedule
(
  Id INT AUTO_INCREMENT,
  Eid INT,
  Date VARCHAR(20),
  End VARCHAR(20),
  Start VARCHAR(20),
  Title VARCHAR(40),
  Description VARCHAR(256),
  Color VARCHAR(20),
  UserName VARCHAR(40),
  INDEX(Id)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE eventMember
(
  EventId INT,
  UserId VARCHAR(64)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

