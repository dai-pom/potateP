CREATE TABLE users
(
    id      INT(10) primary key,
    name    VARCHAR(40)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO users (id, name) VALUES (1, "Nagaoka");
INSERT INTO users (id, name) VALUES (0, "wada");
INSERT INTO users (id, name) VALUES (2, "Tanaka");
