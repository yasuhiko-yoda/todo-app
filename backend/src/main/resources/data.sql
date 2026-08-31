INSERT INTO users (username, password, role)
VALUES ('admin', 'password', 'ADMIN');

INSERT INTO tasks (user_id, task_content, created_at, updated_at, completed)
VALUES (1, 'Javaを勉強する', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);