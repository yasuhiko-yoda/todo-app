INSERT INTO users (username, password, role)
VALUES ('admin', '$2a$10$8.LbeVKLQzq3vcj50YCKlufnsDXJ4jp19FPhjQO7D/tCeUMAAJZz6', 'ADMIN'),
       ('test-user', '$2a$10$8.LbeVKLQzq3vcj50YCKlufnsDXJ4jp19FPhjQO7D/tCeUMAAJZz6', 'USER');

INSERT INTO tasks (user_id, task_content, created_at, updated_at, completed)
VALUES (1, 'Javaを勉強する', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);