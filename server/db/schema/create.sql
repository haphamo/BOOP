DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS pet_favourites CASCADE;
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS connections CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  post_code VARCHAR(255) NOT NULL,
  profile_photo VARCHAR(255)
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  breed VARCHAR(255) NOT NULL,
  quirky_fact VARCHAR(255) NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  profile_photo VARCHAR(255)
);

CREATE TABLE pet_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY NOT NULL,
  url VARCHAR(255) NOT NULL,
  pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE connections (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(255) NOT NULL
);