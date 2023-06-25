ERD:

User schema:

| Field     | Type        |
| --------- | ----------- |
| ID        | STRING/UUID |
| Username  | STRING      |
| Email     | STRING      |
| Password  | STRING      |
| CreatedAt | DATE        |
| UpdatedAt | DATE        |

Blog schema:

| Field     | Type        |
| --------- | ----------- |
| ID        | STRING/UUID |
| Title     | STRING      |
| Body      | STRING      |
| AuthorId  | STRING/UUID |
| SpaceId   | STRING/UUID |
| CreatedAt | DATE        |
| UpdatedAt | DATE        |

Space schema:

| Field       | Type          |
| ----------- | ------------- |
| ID          | STRING/UUID   |
| Title       | STRING        |
| Status      | STRING        |
| Description | STRING        |
| OwnerId     | STRING/UUID   |
| Admins      | STRING/UUID[] |
| Members     | STRING/UUID[] |
| CreatedAt   | DATE          |
| UpdatedAt   | DATE          |

Comment schema:

| Field     | Type        |
| --------- | ----------- |
| ID        | STRING/UUID |
| Body      | STRING      |
| AuthorId  | STRING/UUID |
| BlogId    | STRING/UUID |
| CreatedAt | DATE        |
| UpdatedAt | DATE        |

Likes schema:

| Field     | Type        |
| --------- | ----------- |
| ID        | STRING/UUID |
| AuthorId  | STRING/UUID |
| BlogId    | STRING/UUID |
| CreatedAt | DATE        |
| UpdatedAt | DATE        |

Follows schema:

| Field      | Type        |
| ---------- | ----------- |
| ID         | STRING/UUID |
| FollowerId | STRING/UUID |
| FolloweeId | STRING/UUID |
| CreatedAt  | DATE        |
| UpdatedAt  | DATE        |
