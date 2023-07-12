ERD:
Certainly! Here are the tables formatted in markdown syntax:

**users**

| Field     | Type         |
| --------- | ------------ |
| id        | VARCHAR(255) |
| username  | VARCHAR(255) |
| password  | VARCHAR(255) |
| email     | VARCHAR(255) |
| timestamp | TIMESTAMP    |

**spaces**

| Field       | Type         |
| ----------- | ------------ |
| id          | VARCHAR(255) |
| name        | VARCHAR(255) |
| status      | VARCHAR(255) |
| ownerId     | VARCHAR(255) |
| description | VARCHAR(255) |
| timestamp   | TIMESTAMP    |

**blogs**

| Field     | Type         |
| --------- | ------------ |
| id        | VARCHAR(255) |
| title     | VARCHAR(255) |
| content   | MEDIUMTEXT   |
| userId    | VARCHAR(255) |
| spaceId   | VARCHAR(255) |
| timestamp | TIMESTAMP    |

Here are the tables formatted in markdown syntax:

**likes**

| Field                                     | Type         |
| ----------------------------------------- | ------------ |
| id                                        | VARCHAR(255) |
| blogId                                    | VARCHAR(255) |
| userId                                    | VARCHAR(255) |
| PRIMARY KEY (id)                          |              |
| FOREIGN KEY (blogId) REFERENCES blogs(id) |              |
| FOREIGN KEY (userId) REFERENCES users(id) |              |

**comments**

| Field                                     | Type         |
| ----------------------------------------- | ------------ |
| id                                        | VARCHAR(255) |
| blogId                                    | VARCHAR(255) |
| userId                                    | VARCHAR(255) |
| content                                   | TEXT         |
| timestamp                                 | TIMESTAMP    |
| PRIMARY KEY (id)                          |              |
| FOREIGN KEY (blogId) REFERENCES blogs(id) |              |
| FOREIGN KEY (userId) REFERENCES users(id) |              |

**follows**

| Field                                          | Type         |
| ---------------------------------------------- | ------------ |
| id                                             | VARCHAR(255) |
| followerId                                     | VARCHAR(255) |
| followingId                                    | VARCHAR(255) |
| PRIMARY KEY (id)                               |              |
| FOREIGN KEY (followerId) REFERENCES users(id)  |              |
| FOREIGN KEY (followingId) REFERENCES users(id) |              |
