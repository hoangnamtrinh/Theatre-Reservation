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

    PRIMARY KEY (ID),
    CONSTRAINT play_name_not_unique UNIQUE (Name)
);

CREATE TABLE Showtime (
    ID INT NOT NULL AUTO_INCREMENT,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    Play_ID INT NOT NULL,

    PRIMARY KEY (iD),
    CONSTRAINT fk_showtime FOREIGN KEY (ID) REFERENCES Play (ID)
);

CREATE TABLE Reservation (
    ID INT NOT NULL AUTO_INCREMENT,
    Customer_ID INT NOT NULL,
    Seat_ID INT NOT NULL,
    Showtime_ID INT NOT NULL,

    PRIMARY KEY (ID),
    CONSTRAINT fk_reservaton_customer FOREIGN KEY (ID) REFERENCES Customer (ID) ON DELETE CASCADE,
    CONSTRAINT fk_reservaton_seat FOREIGN KEY (Seat_ID) REFERENCES Seat (ID) ON DELETE CASCADE,
    CONSTRAINT fk_reservaton_showtime FOREIGN KEY (Showtime_ID) REFERENCES Showtime (ID) ON DELETE CASCADE
);
/* Mock database */
INSERT INTO Customer (Username, Password) VALUES ('nam', UNHEX(SHA2(CONCAT('SA', 'nam', 'LT'), 256)));
-- SELECT * FROM Customer
--   WHERE Username = 'nam' AND Password = UNHEX(SHA2(CONCAT('SA', 'nam', 'LT'), 256));