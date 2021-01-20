CREATE TABLE IF NOT EXISTS authors (
    _id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name CHARACTER VARYING(40) NOT NULL,
    surname CHARACTER VARYING(40),
    email CHARACTER VARYING(40) NOT NULL,
    password CHARACTER VARYING(20) NOT NULL,
    img CHARACTER VARYING(500) NOT NULL,
    created_At timestamp not null default CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS categories (
    _id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name CHARACTER VARYING(20) NOT NULL,
    img CHARACTER VARYING(500) NOT NULL,
    created_At timestamp not null default CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS articles (
    _id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	headline CHARACTER VARYING(500) NOT NULL,
	subhead CHARACTER VARYING(500),
    author_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
	content CHARACTER NOT NULL,
	cover CHARACTER VARYING(500) NOT NULL,
	createdAt timestamp not null default CURRENT_TIMESTAMP,
	lastUpdated timestamp,
    FOREIGN KEY (author_id) REFERENCES authors,
    FOREIGN KEY (category_id) REFERENCES categories
);

CREATE TABLE IF NOT EXISTS reviews (
    _id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text CHARACTER VARYING(500) NOT NULL,
    author_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    created_At timestamp not null default CURRENT_TIMESTAMP,
	last_updated timestamp,
    FOREIGN KEY (author_id) REFERENCES authors,
    FOREIGN KEY (article_id) REFERENCES articles
);