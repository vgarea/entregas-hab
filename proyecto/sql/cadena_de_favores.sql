USE cadena_de_favores;

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS favours
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    rating_applicant INT UNSIGNED,
    rating_user INT UNSIGNED,
    location VARCHAR(50),
    description VARCHAR(500),
    category VARCHAR(50), -- Desde el front o el back defino las categorías de favor
    deadline DATETIME,
    status VARCHAR(50), -- Desde el front o el back defino las categorías de estado
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    modification_date DATETIME,
    user_doer_id INT UNSIGNED,
    FOREIGN KEY (user_doer_id) REFERENCES users(id),
    user_maker_id INT UNSIGNED,
    FOREIGN KEY (user_maker_id) REFERENCES users(id)    
);

CREATE TABLE IF NOT EXISTS users
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    surname VARCHAR(50),
    alias VARCHAR(50) UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    foto VARCHAR(50),
    login VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    modification_date DATETIME
);

SET FOREIGN_KEY_CHECKS=1;