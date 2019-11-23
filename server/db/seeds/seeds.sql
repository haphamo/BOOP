INSERT INTO users (id, first_name, last_name, email, city, post_code, photo_profile)
VALUES (1, "Maria", "Fern", "mariafern@gmail.com", "Toronto", "M6G3X4", "https://image.flaticon.com/icons/svg/920/920963.svg"),
("Ha", "Pham", "hapham@gmail.com", "Toronto", "M5T3A4", "https://image.flaticon.com/icons/svg/920/920963.svg");

INSERT INTO pets (id, name, age, breed, quicky_fact, owner_id)
VALUES (1, "Yoyo", 5, "Maltese", "I don't like belly rubs.", 1),
(2, "Kiki", 9, "Maltipoo", "I like going on walks.");

INSERT INTO pet_favourites (id, name, category, pet_id)
VALUES (1, "Dentastix", "Treat", 1),
(2, "Tennis Ball", "Toy", 1),
(3, "Chewies", "Treat", 2),
(4, "Frisbee", "Toy", 2);

