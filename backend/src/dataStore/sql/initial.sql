--init database

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE,
    UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE
);

CREATE TABLE blogs (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    spaceId VARCHAR(255) NOT NULL,
    timestamp VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (spaceId) REFERENCES spaces(id)
);

CREATE TABLE spaces (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    ownerId VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    timestamp VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT,
    blogId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (blogId) REFERENCES blogs(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT,
    blogId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    timestamp VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (blogId) REFERENCES blogs(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE follows (
    id INT NOT NULL AUTO_INCREMENT,
    followerId VARCHAR(255) NOT NULL,
    followingId VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (followerId) REFERENCES users(id),
    FOREIGN KEY (followingId) REFERENCES users(id)
);
