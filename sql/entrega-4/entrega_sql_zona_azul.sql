USE blue_zone;

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE users
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    surename VARCHAR(50),
    id_card VARCHAR(10),
    email VARCHAR(50),
    telefone_number VARCHAR(10),
    account_number VARCHAR(24)
);

CREATE TABLE vehicles
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    plate_number VARCHAR(10),
    model VARCHAR(50),
    mark VARCHAR(50),
    type ENUM ('car', 'motorcycle', 'van'),
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE parks
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    initial_time DATETIME,
    finish_time DATETIME,
    vehicles_id INT UNSIGNED,
    FOREIGN KEY (vehicles_id) REFERENCES vehicles(id),
    zones_id INT UNSIGNED,
    FOREIGN KEY (zones_id) REFERENCES zones(id)
);

CREATE TABLE zones
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    initial_time DATETIME,
    finish_time DATETIME,
    limit_time INT UNSIGNED,
    prize_minute INT UNSIGNED,
    comments TINYTEXT
);

CREATE TABLE fines
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ammount INT UNSIGNED,
    status BOOLEAN,
    parks_id INT UNSIGNED,
    FOREIGN KEY (parks_id) REFERENCES parks(id)
);

CREATE TABLE claims
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    comments TINYTEXT,
    reason VARCHAR(50),
    status BOOLEAN,
    fines_id INT UNSIGNED,
    FOREIGN KEY (fines_id) REFERENCES fines(id),
    users_id INT UNSIGNED,
    FOREIGN KEY (users_id) REFERENCES users(id)
);

SET FOREIGN_KEY_CHECKS=1;
