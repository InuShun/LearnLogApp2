# 学習記録アプリ

学習内容と学習時間を記録できるアプリです。

日々、学んだことを振り返ることが出来ます。

## 機能一覧

- 学習内容、学習時間を入力して登録が出来る。
- 登録した内容は一覧に羅列される。
- 登録内容は削除することが出来る。
- 登録した内容の合計時間を見ることが出来る。

## 技術スタック

- フロントエンド：React 19
- バックエンド：SupaBase
- ビルドツール：Vite
- テスト:Vitest
- デプロイ:Firebase

## 起動方法

前提条件：Node.jsがインストールされていること

1. リポジトリのクローン
```bash
git clone https://github.com/InuShun/LearnLogApp2.git
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
- Supabaseでアカウントとプロジェクトを作成する。

- 作成したプロジェクト内に以下のテーブルを作成する。

テーブル名： study-record

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `title` | `varchar` |  |
| `time` | `int4` |  |
| `created_at` | `timestamp` |  Nullable |


- Gitでクローンしたリポジトリに、「.envファイル」をリポジトリ直下に作成する。

- .envファイルに以下のようにSUPABASE_URLとSUPABASE_ANON_KEYを記載する。それぞれの確認方法はコメント参照。
```bash
//Supabase → Project Settings → Data API → 「API URL」
VITE_SUPABASE_URL={SUPABASE_URL}

//Supabase → Project Settings → API Keys → Legacy anon, service_role API keys → 「anon public」
VITE_SUPABASE_ANON_KEY={SUPABASE_ANON_KEY}
```

4. 起動
```bash
npm run dev
```