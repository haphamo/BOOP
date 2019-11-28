INSERT INTO users (first_name, last_name, email, password, city, post_code, profile_photo)
VALUES ('Maria', 'Fern', 'mariafern@gmail.com', '$2y$10$ksP7YR5c6UOTkxWrtIGu3.siPHsCp6lc9YEn99EMuFSs/NMaxQKTG', 'Toronto', 'M6G3X4', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('Ha', 'Pham', 'hapham@gmail.com', '$2y$10$vGy7TfLkK2iSU0dfNeXpoeRVpS24rmOH/VKwmB/U3SKSDnFD3yx7.', 'Toronto', 'M5T3A4', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('John', 'Smith', 'johnsmith@gmail.com', '$2y$10$3l22J5HcrvQqJpADS4.Zg.tEO1p3yV0wHhISZXkS1ZlCaZFzRY/UW
', 'Toronto', 'M5T4A4', 'https://image.flaticon.com/icons/svg/920/920955.svg'),
('Barack', 'Obama', 'bobama@gmail.com', '$2y$10$i.uXKyUGbOc1iN7ZlMGYNuzG9l.6B1RmPUIj8RgmETYH4hWvYuF0u', 'Toronto', 'M6G1J5', 'https://image.flaticon.com/icons/svg/920/920955.svg');

INSERT INTO pets (name, age, breed, quirky_fact, owner_id, profile_photo)
VALUES ('Yoyo', 5, 'Maltese', 'I do not like belly rubs.', 1, 'https://www.rover.com/blog/wp-content/uploads/2018/07/animal-753418_1280-960x540.jpg'),
('Kiki', 9, 'Maltipoo', 'I like going on walks.', 2, 'https://petsnpals.biz/wp-content/uploads/2018/11/1235917_800.jpg'),
('Hunter', 6, 'German Shepherd', 'I really like whipped cream.', 3, 'https://www.perfectdogbreeds.com/wp-content/uploads/2018/10/German-Shepherd.jpg'),
('Bo', 11, 'Portuguese Water Dog', 'I am the former first dog of the United States.', 4, 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Bo_official_portrait.jpg'),
('Bruno', 1, 'Maltese', 'My favourite toy is a shoe.', 1, 'https://thehappypuppysite.com/wp-content/uploads/2016/09/The-Maltese-HP-long.jpg');

INSERT INTO pet_favourites (name, category, pet_id)
VALUES ('Dentastix', 'Treat', 1),
('Tennis Ball', 'Toy', 1),
('Chewies', 'Treat', 2),
('Frisbee', 'Toy', 2),
('Whipped Cream', 'Treat', 3),
('Tennis Ball', 'Toy', 4),
('Berczy Park', 'Park', 4),
('Trinity Bellwoods Dog Bowl', 'Park', 3);

INSERT INTO images (url, pet_id)
VALUES ('https://ucarecdn.com/99b9ada1-1c45-4feb-95ee-acd5dad5288b/WhatsAppImage20191114at170028.jpeg', 1);

INSERT INTO connections (sender_id, receiver_id, status)
VALUES (1, 2, 2);

-- SENDER
-- SELECT users.first_name as sender_name, friends.first_name as receiver_name
-- FROM users
-- JOIN connections ON connections.sender_id = users.id 
-- JOIN users AS friends ON receiver_id = friends.id
-- WHERE users.id = 1;

-- SELECT users.first_name as sender_name, friends.first_name as sender_name
-- FROM users
-- JOIN connections ON connections.receiver_id = users.id 
-- JOIN users AS friends ON sender_id = friends.id
-- WHERE users.id = 1;

------- Get all users excluding connections
-- SELECT users.first_name as sender_name, friends.first_name as receiver_name
-- FROM users
-- JOIN connections ON connections.sender_id = users.id 
-- JOIN users AS friends ON receiver_id = friends.id
-- WHERE users.id = 1;


-- users.first_name as sender_name, friends.first_name as receiver_name from users join connections ON connections.sender_id = users.id join users as friends on receiver_id = friends.id where users.id = 1



-- The one connection is Maria and Ha, Fido should show up on the dashboard since no connections with him is available
-- The INTEGERS in the STATUS column of CONNECTIONS can be 1 (REQUESTED), 2 (ACCEPTED) or 3 (DECLINED)
-- Once the user has accepted the request, they show up on each others friends list