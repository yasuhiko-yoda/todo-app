# Todo App

React + Spring Boot + H2 Databaseを使用したTodoアプリです。

## 使用技術

### Frontend
- React
- Vite

### Backend
- Java 21
- Spring Boot 4.1.1
- Spring Security
- Maven

### Database
- H2 Database

## 開発環境

- IntelliJ IDEA
- Visual Studio Code
- Git / GitHub

### Backend API

- [x] ログイン
- [x] ログアウト
- [x] 認証状態取得
- [x] Todo一覧取得
- [x] Todo詳細取得
- [x] Todo登録
- [x] Todo編集
- [x] Todo削除

### Frontend

- [ ] ログイン画面
- [ ] Todo一覧表示
- [ ] Todo登録
- [ ] Todo編集
- [ ] Todo削除
- [ ] Todo完了状態変更

## 今回の仕様について
現在は管理者1名での利用を想定しているため、タスクの一覧・詳細・更新・削除におけるユーザー別のアクセス制御は実装していません。将来的に複数ユーザーへ対応する場合は、認証ユーザーに紐づくタスクのみを操作可能とする予定です。
