INSERT INTO users (first_name, last_name, email, password, city, post_code, profile_photo)
VALUES ('Maria', 'Fern', 'mariafern@gmail.com', 'maria', 'Toronto', 'M6G3X4', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('Ha', 'Pham', 'hapham@gmail.com', 'ha', 'Toronto', 'M5T3A4', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('John', 'Smith', 'johnsmith@gmail.com', 'john', 'Toronto', 'M5T4A4', 'https://image.flaticon.com/icons/svg/920/920955.svg'),
('Barack', 'Obama', 'bobama@gmail.com', 'barack', 'Toronto', 'M6G1J5', 'https://image.flaticon.com/icons/svg/920/920955.svg'),
('Leslie', 'Mosier', 'lmosier@gmail.com', 'leslie', 'Toronto', 'M5V1M7', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('Tina', 'Kim', 'tkim@gmail.com', 'tina', 'Toronto', 'M5V1L5', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('Shirley', 'Braha', 'sbraha@gmail.com', 'shirley', 'Toronto', 'M5V1L3', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('Louisa', 'Smith', 'lsmith@gmail.com', 'louisa', 'Toronto', 'M5V1L6', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('Tammie', 'Chung', 'tchung@gmail.com', 'tammie', 'Toronto', 'M5V1L7', 'https://image.flaticon.com/icons/svg/920/920963.svg'),
('BIG COHORT', '2019', 'bigcohort19@gmail.com', 'synergy', 'Toronto', 'M5V1L7', 'https://image.flaticon.com/icons/png/512/32/32441.png');
('Justin', 'Richardsson', 'jrichardsson@gmail.com', 'justin', 'Toronto', 'M5V1L3', 'https://secure.meetupstatic.com/photos/member/8/3/0/9/highres_254553545.jpeg');

INSERT INTO pets (name, age, breed, quirky_fact, owner_id, profile_photo)
VALUES ('Yoyo', 5, 'Maltese', 'I do not like belly rubs.', 1, 'https://www.rover.com/blog/wp-content/uploads/2018/07/animal-753418_1280-960x540.jpg'),
('Kiki',11, 'Maltipoo', 'I am very shy.', 2, 'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.15752-9/79371858_446557809618599_3908629833764044800_n.png?_nc_cat=102&_nc_ohc=IJD-Pswso-kAQnsehz6xBZRuASFubhmIXtrss7ojn-oExXBccihVVNDkA&_nc_ht=scontent-yyz1-1.xx&oh=96ae919e000d958aea1fd0a8ffb1b823&oe=5E7B9FC3'),
('Hunter', 6, 'German Shepherd', 'I really like whipped cream.', 3, 'https://www.perfectdogbreeds.com/wp-content/uploads/2018/10/German-Shepherd.jpg'),
('Bo', 11, 'Portuguese Water Dog', 'I am the former first dog of the United States.', 4, 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Bo_official_portrait.jpg'),
('Bruno', 1, 'Maltese', 'My favourite toy is a shoe.', 1, 'https://thehappypuppysite.com/wp-content/uploads/2016/09/The-Maltese-HP-long.jpg'),
('Sunny', 7, 'Portuguese Water Dog', 'I am the younger sister of Bo.', 4, 'https://dcist.com/wp-content/uploads/sites/3/2013/09/sunnyobama-thumb-640xauto-807922-600x400.jpg'),
('Doug the Pug', 7, 'Pug', 'I have appeared in several music videos.', 5, 'https://images-na.ssl-images-amazon.com/images/I/51or1XtdsYL._SX258_BO1,204,203,200_.jpg'),
('Winston', 7, 'Corgi', 'I am the unicorn of corgis.', 6, 'http://www.puchic.com/pics/winston-corgi.jpg'),
('Marnie', 18, 'Shih Tzu', 'I have my own book.', 7, 'https://shortyawards.imgix.net/entries/8th/screen-shot-2016-01-19-at-125145-a.png?auto=format&fit=crop&h=400&q=65&w=400&s=b26d616ab5a53478b99509be499d3838'),
('Moo', 10, 'Rescue', 'I may have a dozen toys lying around the house but receipts I find on the floor have got to be my favourite.', 8, 'https://files.slack.com/files-pri/T2G8TE2E5-FQYEU2SDN/snapchat-1162879987.jpg'),
('Cava', 6, 'Medium Hair Domestic', 'I love yoga and the rain.', 9, 'https://files.slack.com/files-pri/T2G8TE2E5-FQQKRNNDP/snapchat-1669074930.jpg');

INSERT INTO pet_favourites (name, category, pet_id)
VALUES ('Dentastix', 'Treat', 1),
('Tennis Ball', 'Toy', 1),
('Chewies', 'Treat', 2),
('Frisbee', 'Toy', 2),
('Whipped Cream', 'Treat', 3),
('Tennis Ball', 'Toy', 4),
('Berczy Park', 'Park', 4),
('Petsmart', 'Groomer', 5),
('Football', 'Toy', 6),
('Dentastix', 'Treat', 7),
('Chewies', 'Treat', 8),
('Pizza', 'Treat', 9);

INSERT INTO images (url, pet_id)
VALUES ('https://ucarecdn.com/99b9ada1-1c45-4feb-95ee-acd5dad5288b/WhatsAppImage20191114at170028.jpeg', 1);

-- Status can be PENDING, ACCEPTED or PASSED
INSERT INTO connections (sender_id, receiver_id, status)
VALUES (1, 2, 'ACCEPTED'),
(3, 1, 'PENDING'),
(4, 1, 'PENDING'),
(2, 3, 'PENDING'),
(2, 4, 'ACCEPTED'),
(1, 7, 'ACCEPTED');