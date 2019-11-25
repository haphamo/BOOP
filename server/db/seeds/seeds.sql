INSERT INTO users (id, first_name, last_name, email, city, post_code, profile_photo)
VALUES (1, 'Maria', 'Fern', 'mariafern@gmail.com', 'Toronto', 'M6G3X4', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
(2, 'Ha', 'Pham', 'hapham@gmail.com', 'Toronto', 'M5T3A4', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
(3, 'John', 'Smith', 'johnsmith@gmail.com', 'Toronto', 'M5T4A4', 'https://image.flaticon.com/icons/svg/920/920955.svg'),
(4, 'Barack', 'Obama', 'bobama@gmail.com', 'Toronto', 'M6G1J5', 'https://image.flaticon.com/icons/svg/920/920955.svg');

INSERT INTO pets (id, name, age, breed, quirky_fact, owner_id, profile_photo)
VALUES (1, 'Yoyo', 5, 'Maltese', 'I do not like belly rubs.', 1, 'https://www.rover.com/blog/wp-content/uploads/2018/07/animal-753418_1280-960x540.jpg'),
(2, 'Kiki', 9, 'Maltipoo', 'I like going on walks.', 2, 'https://petsnpals.biz/wp-content/uploads/2018/11/1235917_800.jpg'),
(3, 'Hunter', 6, 'German Shepherd', 'I really like whipped cream.', 3, 'https://www.perfectdogbreeds.com/wp-content/uploads/2018/10/German-Shepherd.jpg'),
(4, 'Bo', 11, 'Portuguese Water Dog', 'I am the former first dog of the United States.', 4, 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Bo_official_portrait.jpg'),
(5, 'Bruno', 1, 'Maltese', 'My favourite toy is a shoe.', 1, 'https://thehappypuppysite.com/wp-content/uploads/2016/09/The-Maltese-HP-long.jpg');

INSERT INTO pet_favourites (id, name, category, pet_id)
VALUES (1, 'Dentastix', 'Treat', 1),
(2, 'Tennis Ball', 'Toy', 1),
(3, 'Chewies', 'Treat', 2),
(4, 'Frisbee', 'Toy', 2),
(5, 'Whipped Cream', 'Treat', 3),
(6, 'Tennis Ball', 'Toy', 4),
(7, 'Berczy Park', 'Park', 4);

-- TEST DATA
INSERT INTO images (id, url, pet_id)
VALUES (1, 'https://ucarecdn.com/99b9ada1-1c45-4feb-95ee-acd5dad5288b/WhatsAppImage20191114at170028.jpeg', 1);

INSERT INTO connections (id, sender_id, receiver_id, status)
VALUES (1, 1, 2, 2);


-- The one connection is Maria and Ha, Fido should show up on the dashboard since no connections with him is available
-- The INTEGERS in the STATUS column of CONNECTIONS can be 1 (REQUESTED), 2 (ACCEPTED) or 3 (DECLINED)
-- Once the user has accepted the request, they show up on each others friends list