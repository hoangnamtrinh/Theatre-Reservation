DROP DATABASE IF EXISTS theatre;
CREATE DATABASE theatre;
USE theatre;

CREATE TABLE Customer (
    ID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Password BINARY(32) NOT NULL,

    PRIMARY KEY (ID),
    CONSTRAINT username_not_unique UNIQUE (Username)
);

CREATE TABLE Section (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(10) NOT NULL,

    PRIMARY KEY (ID),
    CONSTRAINT section_name_not_unique UNIQUE (Name)
);

CREATE TABLE Seat (
    ID INT NOT NULL AUTO_INCREMENT,
    Section_ID INT NOT NULL,
    Seat_Num INT NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (Section_ID) REFERENCES Section (ID)
);


CREATE TABLE Play (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Image VARCHAR(500) NOT NULL,

    PRIMARY KEY (ID)
);

CREATE TABLE Showtime (
    ID INT NOT NULL AUTO_INCREMENT,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    Play_ID INT NOT NULL,

    PRIMARY KEY (ID),
    CONSTRAINT fk_showtime FOREIGN KEY (Play_ID) REFERENCES Play (ID)
);

-- CREATE TABLE Reservation (
--     ID INT NOT NULL AUTO_INCREMENT,
--     Customer_ID INT NOT NULL,
--     Seat_ID INT NOT NULL,
--     Showtime_ID INT NOT NULL,

--     PRIMARY KEY (ID),
--     CONSTRAINT fk_reservaton_customer FOREIGN KEY (Customer_ID) REFERENCES Customer (ID) ON DELETE CASCADE,
--     CONSTRAINT fk_reservaton_seat FOREIGN KEY (Seat_ID) REFERENCES Seat (ID) ON DELETE CASCADE,
--     CONSTRAINT fk_reservaton_showtime FOREIGN KEY (Showtime_ID) REFERENCES Showtime (ID) ON DELETE CASCADE
-- );

CREATE TABLE Reservation (
    ID INT NOT NULL AUTO_INCREMENT,
    Customer_ID INT NOT NULL,
    Seat_ID INT NOT NULL,
    Showtime_ID INT NOT NULL,

    PRIMARY KEY (ID),
    CONSTRAINT fk_reservaton_customer FOREIGN KEY (Customer_ID) REFERENCES Customer (ID) ON DELETE CASCADE,
    CONSTRAINT fk_reservaton_showtime FOREIGN KEY (Showtime_ID) REFERENCES Showtime (ID) ON DELETE CASCADE
);
/* Mock database */
INSERT INTO Customer (Username, Password) VALUES ('nam', UNHEX(SHA2(CONCAT('SA', 'nam', 'LT'), 256)));
INSERT INTO Customer (Username, Password) VALUES ('abc', UNHEX(SHA2(CONCAT('SA', 'abc', 'LT'), 256)));
INSERT INTO Customer (Username, Password) VALUES ('def', UNHEX(SHA2(CONCAT('SA', 'def', 'LT'), 256)));

INSERT INTO Play (Name, Image) VALUES ('Harry Potter', 'https://www.target.com.au/medias/static_content/product/images/full/59/54/A1115954.jpg?impolicy=product_portrait_hero');
INSERT INTO Play (Name, Image) VALUES ('Beauty and the Beast', 'https://m.media-amazon.com/images/I/51dHnZJcZ2L._AC_SY580_.jpg');
INSERT INTO Play (Name, Image) VALUES ('test', 'https://www.target.com.au/medias/static_content/product/images/full/59/54/A1115954.jpg?impolicy=product_portrait_hero');

INSERT INTO Showtime (Date, Time, Play_ID) VALUES ('2022-06-30', '19:00:00', 1);
INSERT INTO Showtime (Date, Time, Play_ID) VALUES ('2022-06-30', '10:00:00', 1);
INSERT INTO Showtime (Date, Time, Play_ID) VALUES ('2022-06-20', '20:00:00', 2);
INSERT INTO Showtime (Date, Time, Play_ID) VALUES ('2022-06-20', '21:00:00', 3);

INSERT INTO Reservation (Customer_ID, Seat_ID, Showtime_ID) VALUES (1, 7, 1);
INSERT INTO Reservation (Customer_ID, Seat_ID, Showtime_ID) VALUES (1, 15, 2);
INSERT INTO Reservation (Customer_ID, Seat_ID, Showtime_ID) VALUES (2, 21, 2);
INSERT INTO Reservation (Customer_ID, Seat_ID, Showtime_ID) VALUES (2, 31, 3);
INSERT INTO Reservation (Customer_ID, Seat_ID, Showtime_ID) VALUES (3, 25, 2);





-- SELECT * FROM Customer
--   WHERE Username = 'nam' AND Password = UNHEX(SHA2(CONCAT('SA', 'nam', 'LT'), 256));

