USE cadena_de_favores;

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS applicants
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    surename VARCHAR(50),
    alias VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS favours
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    rating_applicant INT UNSIGNED,
    rating_user INT UNSIGNED,
    location VARCHAR(50),
    description VARCHAR(500),
    category VARCHAR(50), -- Desde el front o el back defino las categorías de favor
    finish_date DATETIME,
    applicants_id INT UNSIGNED,
    FOREIGN KEY (applicants_id) REFERENCES applicants(id),
    users_id INT UNSIGNED,
    FOREIGN KEY (users_id) REFERENCES users(id),
    status VARCHAR(50) -- Desde el front o el back defino las categorías de estado
);

CREATE TABLE IF NOT EXISTS users
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    surename VARCHAR(50),
    alias VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    login VARCHAR(50) NOT NULL
);

SET FOREIGN_KEY_CHECKS=1;