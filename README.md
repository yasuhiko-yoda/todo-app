## Todo App

**Version:** v1.0.0  
**Release:** 2026-09-14

Todoアプリの初回リリースです。

ReactとSpring Bootを使用して作成したTodoアプリです。

ログインしたユーザーが、自分のTodoの登録・一覧表示・編集・削除・完了状態の変更を行えます。

当初は管理者1名での利用を想定していましたが、基本機能の完成後、ログインユーザーごとにTodoを管理できるように拡張しました。

Spring Securityによる認証、CSRF対策、ユーザー別のアクセス制御を実装し、Vercel・Render・Neonを使用して公開しています。

### 主な機能

- ユーザー認証
- ログイン・ログアウト
- ユーザーごとのタスク一覧表示
- タスクの登録・編集・削除
- タスクの完了状態変更
- CSRF対策
- レスポンシブ対応

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
- [x] ログインユーザーとTodoの紐づけ
- [x] ユーザー別のTodoアクセス制御
- [x] CSRF対策
- [x] CORS設定

### Frontend

- [x] ログイン画面
- [x] Todo一覧表示
- [x] Todo登録
- [x] Todo編集
- [x] Todo削除
- [x] Todo完了状態変更
- [x] ログインユーザー名の表示
- [x] 未認証時の画面遷移制御
- [x] 通信中のボタン連打防止
- [x] 入力エラー・通信エラーの表示
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

## 追加実装・発展的な取り組み

当初は管理者1名が利用するTodoアプリとして設計していましたが、基本機能の完成後、より実際のWebアプリケーションに近づけるため、次の機能や構成を追加しました。

- Spring Securityを使用したログイン・ログアウト機能
- セッションを利用した認証状態の管理
- CSRFトークンを利用したリクエスト保護
- ログインユーザーとTodoデータの紐づけ
- ログインユーザーごとのTodo一覧表示
- 他のユーザーが所有するTodoへのアクセス制御
- ローカル環境と本番環境の設定分離
- H2 DatabaseからPostgreSQLへの本番環境対応
- Vercel・Render・Neonを使用したアプリケーションの公開
- 環境変数を使用した接続情報・秘密情報の管理

## ユーザー別のTodo管理

各Todoはユーザー情報と紐づけて保存しています。

Todoの一覧取得・詳細取得・登録・編集・削除では、Spring Securityから取得した認証ユーザー名を使用しています。これにより、ログインユーザーは自分が所有するTodoのみを表示・操作できます。

他のユーザーが所有するTodoのIDを指定した場合も、そのTodoを取得・更新・削除できないようにしています。

## セキュリティ対策

本アプリケーションでは、次のセキュリティ対策を実装しています。

- Spring Securityによる認証
- BCryptによるパスワードのハッシュ化
- 未認証ユーザーからのTodo APIへのアクセス制限
- CSRFトークンによる不正リクエスト対策
- CORSによるアクセス元の制限
- Cookieを利用したセッション管理
- ユーザーごとのTodoアクセス制御
- 環境変数による秘密情報の管理

## 開発の経緯

最初にTodoの登録・一覧表示・編集・削除・完了状態変更を行う基本的なCRUD機能を実装しました。

その後、次の順序で機能を拡張しました。

1. Spring Securityによるログイン・ログアウト機能の追加
2. React側での認証状態取得と未認証時の画面遷移制御
3. CSRF対策とCORS設定の追加
4. ログインユーザーとTodoデータの紐づけ
5. ユーザーごとのTodo表示・操作制限
6. PostgreSQLを使用する本番環境への対応
7. Vercel・Render・Neonを使用したアプリケーションの公開

基本的なCRUD処理だけでなく、認証・認可、セキュリティ、本番環境へのデプロイまでを含めて、Webアプリケーション開発の一連の流れを経験することを目的としています。