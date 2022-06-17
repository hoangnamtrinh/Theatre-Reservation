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

INSERT INTO Section (Name) VALUES ('A');
INSERT INTO Section (Name) VALUES ('B');
INSERT INTO Section (Name) VALUES ('C');
INSERT INTO Section (Name) VALUES ('D');
INSERT INTO Section (Name) VALUES ('E');

INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 1);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 2);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 3);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 4);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 5);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 6);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 7);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 8);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 9);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (1, 10);

INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 11);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 12);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 13);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 14);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 15);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 16);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 17);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 18);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 19);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (2, 20);

INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 21);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 22);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 23);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 24);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 25);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 26);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 27);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 28);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 29);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (3, 30);

INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 31);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 32);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 33);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 34);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 35);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 36);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 37);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 38);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 39);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (4, 40);

INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 41);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 42);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 43);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 44);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 45);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 46);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 47);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 48);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 49);
INSERT INTO Seat (Section_ID, Seat_Num) VALUES (5, 50);

-- SELECT * FROM Customer
--   WHERE Username = 'nam' AND Password = UNHEX(SHA2(CONCAT('SA', 'nam', 'LT'), 256));
