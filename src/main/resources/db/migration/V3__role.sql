DROP TABLE IF EXISTS role;

CREATE TABLE role (
       id bigserial PRIMARY KEY,
       name varchar(100) NOT NULL
);