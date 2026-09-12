# Todo App

ReactとSpring Bootを使用して作成したTodoアプリです。

ログインしたユーザーが、Todoの登録・一覧表示・編集・削除・完了状態の変更を行えます。

## 公開URL

- アプリケーション：[Todo App](https://todo-app-xi-three-76.vercel.app/login)
- バックエンド：Render
- データベース：Neon PostgreSQL

> Renderの無料プランでは、一定時間アクセスがない場合、最初の表示に時間がかかることがあります。

## 使用技術

### Frontend

- React
- Vite
- React Router

### Backend

- Java 21
- Spring Boot 4.1.1
- Spring Security
- Spring Data JPA
- Maven

### Database

- H2 Database（ローカル環境）
- PostgreSQL / Neon（本番環境）

### Infrastructure

- Vercel（フロントエンド）
- Render（バックエンド）
- Neon（PostgreSQL）
- GitHub

## 開発環境

- IntelliJ IDEA
- Visual Studio Code
- Git / GitHub
- Postman

## 実装機能

### Backend API

- [x] ログイン
- [x] ログアウト
- [x] 認証状態取得
- [x] Todo一覧取得
- [x] Todo詳細取得
- [x] Todo登録
- [x] Todo編集
- [x] Todo削除
- [x] Todo完了状態変更

### Frontend

- [x] ログイン画面
- [x] Todo一覧表示
- [x] Todo登録
- [x] Todo編集
- [x] Todo削除
- [x] Todo完了状態変更
- [x] 未認証時の画面遷移制御
- [x] 存在しないURLのエラー画面

## ローカルでの起動方法

### 1. リポジトリをクローン

```bash
git clone https://github.com/yasuhiko-yoda/todo-app.git
cd todo-app
```

### 2. バックエンドを起動

```bash
cd backend
./mvnw spring-boot:run
```

バックエンドは、デフォルトでは次のURLで起動します。

```text
http://localhost:8080
```

### 3. フロントエンドの環境変数を設定

`frontend`直下に`.env.local`を作成します。

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

`.env.local`はGitHubへコミットしません。

### 4. フロントエンドを起動

別のターミナルで次を実行します。

```bash
cd frontend
npm install
npm run dev
```

表示されたURLへブラウザからアクセスします。

```text
http://localhost:5173
```

## 本番環境の設定

本番環境では、次の環境変数を各サービスに設定しています。

### Vercel

```text
VITE_API_BASE_URL
```

### Render

```text
SPRING_PROFILES_ACTIVE
DATABASE_URL
DB_USERNAME
DB_PASSWORD
FRONTEND_URL
```

データベースの接続情報やパスワードなどの秘密情報は、GitHubには保存せず、各サービスの環境変数で管理しています。

## 今回の仕様について

現在は管理者1名での利用を想定しているため、タスクの一覧・詳細・更新・削除におけるユーザー別のアクセス制御は実装していません。

将来的に複数ユーザーへ対応する場合は、認証ユーザーに紐づくタスクのみを表示・操作できるように拡張する予定です。