CREATE TABLE Movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(2000),
    duration INT NOT NULL,
    img_path VARCHAR(255)
);

CREATE TABLE Rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(50) NOT NULL,
    seats_total INT NOT NULL
);

INSERT INTO Rooms (room_name, seats_total) VALUES 
('A-1', 25),
('A-2', 35),
('A-3', 50);

CREATE TABLE Screenings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    room_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movies(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Rooms(id) ON DELETE CASCADE
);


CREATE TABLE Seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    screening_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (screening_id) REFERENCES Screenings(id) ON DELETE CASCADE
);
