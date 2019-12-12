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
('LIGHTHOUSE LABS', '2019', 'bigcohort19@gmail.com', 'synergy', 'Toronto', 'M5V1L7', 'https://pbs.twimg.com/profile_images/1197911268939550720/33RhGxsO_400x400.jpg'),
('Justin', 'Richardsson', 'jrichardsson@gmail.com', 'justin', 'Toronto', 'M5V1L3', 'https://secure.meetupstatic.com/photos/member/8/3/0/9/highres_254553545.jpeg');

INSERT INTO pets (name, age, breed, quirky_fact, owner_id, profile_photo)
VALUES ('Yoyo', 5, 'Maltese', 'I do not like belly rubs.', 1, 'https://ucarecdn.com/99b9ada1-1c45-4feb-95ee-acd5dad5288b/WhatsAppImage20191114at170028.jpeg'),
('Kiki',11, 'Maltipoo', 'I am very shy.', 2, 'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.15752-9/79371858_446557809618599_3908629833764044800_n.png?_nc_cat=102&_nc_ohc=IJD-Pswso-kAQnsehz6xBZRuASFubhmIXtrss7ojn-oExXBccihVVNDkA&_nc_ht=scontent-yyz1-1.xx&oh=96ae919e000d958aea1fd0a8ffb1b823&oe=5E7B9FC3'),
('Hunter', 6, 'German Shepherd', 'I really like whipped cream.', 3, 'https://i.imgur.com/DQkHHcF.jpg'),
('Bo', 11, 'Portuguese Water Dog', 'I am the former first dog of the United States.', 4, 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Bo_official_portrait.jpg'),
('Sunny', 7, 'Portuguese Water Dog', 'I am the younger sister of Bo.', 4, 'https://dcist.com/wp-content/uploads/sites/3/2013/09/sunnyobama-thumb-640xauto-807922-600x400.jpg'),
('Doug the Pug', 7, 'Pug', 'I have appeared in several music videos.', 5, 'https://images-na.ssl-images-amazon.com/images/I/51or1XtdsYL._SX258_BO1,204,203,200_.jpg'),
('Winston', 7, 'Corgi', 'I am the unicorn of corgis.', 6, 'http://www.puchic.com/pics/winston-corgi.jpg'),
('Marnie', 18, 'Shih Tzu', 'I have my own book.', 7, 'https://shortyawards.imgix.net/entries/8th/screen-shot-2016-01-19-at-125145-a.png?auto=format&fit=crop&h=400&q=65&w=400&s=b26d616ab5a53478b99509be499d3838'),
('Moo', 10, 'Rescue', 'I may have a dozen toys lying around the house but receipts I find on the floor have got to be my favourite.', 8, 'https://ucarecdn.com/1e8a97e3-9eac-4def-8789-ba7400d67685/'),
('Cava', 6, 'Medium Hair Domestic', 'I love yoga and the rain.', 9, 'https://ucarecdn.com/8a563b04-e3f0-45d2-a50d-527026a53bcb/'),
('Juno', 9, 'Alsatian Husky', 'I sleep with my legs up against the wall.', 11, 'https://ucarecdn.com/181464dd-15be-4d22-98ed-60be1889671a/'),
('BIG COHORT', 2019, 'Mixed', 'SYNERGYYYYYYY', 10, 'https://image.flaticon.com/icons/png/512/32/32441.png');

INSERT INTO pet_favourites (name, category, pet_id)
VALUES ('Dentastix', 'Treat', 1),
('Tennis Ball', 'Toy', 1),
('Chewies', 'Treat', 2),
('Frisbee', 'Toy', 2),
('Whipped Cream', 'Treat', 3),
('Tennis Ball', 'Toy', 4),
('Berczy Park', 'Park', 4),
('Football', 'Toy', 6),
('Dentastix', 'Treat', 7),
('Chewies', 'Treat', 8),
('Pizza', 'Treat', 9);

INSERT INTO images (url, pet_id)
VALUES ('https://ucarecdn.com/f3979415-b86b-4030-9cbb-e59c83593f13/', 9),
('https://ucarecdn.com/d5a85a69-f66e-4a50-97e9-811e31388719/', 9),
('https://ucarecdn.com/d0316afe-f7c1-4e71-950c-3aa6ad79eeca/', 9),
('https://ucarecdn.com/78b4b6af-d144-42bd-8aec-723828a9580f/', 10),
('https://ucarecdn.com/f33422db-6d97-4412-b8b8-d3af83ea940d/', 10),
('https://ucarecdn.com/ed612be4-d35c-4719-90ff-b9b863f09d1c/', 10),
('https://ucarecdn.com/ca8d2044-7737-454a-88af-d5d3eaa1b300/', 11),
('https://ucarecdn.com/181464dd-15be-4d22-98ed-60be1889671a/', 11),
('https://ucarecdn.com/2c4fc014-34c9-449d-952f-2e94d9fa2006/', 11),
('https://ucarecdn.com/0a2dd43f-8e12-4251-8f51-8e2301fe9055/', 12),
('https://ucarecdn.com/b0bada66-5010-4350-b8c5-7bd5674890b4/', 12),
('https://ucarecdn.com/7d4b6b9f-33af-4688-a0e2-08f3325071ec/', 12),
('https://ucarecdn.com/3ef2a881-97a5-4746-9c9d-8b6d67cb9ea0/', 12),
('https://ucarecdn.com/cfb8ad26-829e-40c0-a5bf-acfef943814f/', 12),
('https://ucarecdn.com/370f18ad-aead-4556-ab89-62eee20ac652/', 12),
('https://ucarecdn.com/9f265f48-3a4c-4656-80d3-3dea33119706/', 12),
('https://ucarecdn.com/02889b46-9263-49ad-90c5-2b0c473b7a74/', 12),
('https://ucarecdn.com/c4080dbd-0b6b-4f8f-864d-d78c7e112075/', 12),
('https://ucarecdn.com/976e82b8-8269-440c-85e5-570c496cfebb/', 12),
('https://ucarecdn.com/c70666e5-8b68-4570-b4d3-1215578d0ba2/', 12),
('https://ucarecdn.com/fbd97ffc-a0f8-4cae-bbe6-1bdc1077bb13/', 12),
('https://ucarecdn.com/9c6e0cc2-11d4-4f9d-b687-027ab7e47834/', 12),
('https://ucarecdn.com/62ef33c7-623f-429b-85e8-5e85c9a30f93/', 12),
('https://ucarecdn.com/78b288b9-b1f6-45c8-8d4b-67a47edea336/', 12),
('https://ucarecdn.com/f01c71fe-a0de-4d0f-b831-6224ef86d04b/', 12),
('https://ucarecdn.com/c6f07069-f5d3-49a6-96d1-93ba187ea10b/', 12),
('https://ucarecdn.com/48a2f9f3-a7b0-43c4-a7f7-46c9039c158a/', 12);


-- Status can be PENDING, ACCEPTED or PASSED
INSERT INTO connections (sender_id, receiver_id, status)
VALUES (3, 1, 'PENDING'),
(4, 1, 'PENDING'),
(2, 3, 'PENDING'),
(2, 4, 'ACCEPTED'),
(1, 7, 'ACCEPTED'),
(8, 1, 'ACCEPTED'),
(9, 1, 'ACCEPTED'),
(10, 1, 'ACCEPTED'),
(11, 1, 'ACCEPTED');