# セットアップガイド

このドキュメントは、Mokabu プロジェクトのセットアップ手順を説明します。

## 📋 前提条件

- Node.js 18.0.0 以上
- pnpm 8.0.0 以上

## 🚀 セットアップ手順

### 1. 依存関係のインストール

プロジェクトルートで以下を実行：

```bash
pnpm install
```

これにより、すべてのワークスペース（apps/web、packages/*）の依存関係がインストールされます。

### 2. 環境変数の設定

`apps/web/.env.example` を参考に `.env` ファイルを作成：

```bash
cd apps/web
cp .env.example .env
```

デフォルトでは SQLite を使用します（ローカル開発用）。

### 3. データベースのセットアップ

```bash
cd apps/web

# Prisma スキーマをデータベースに反映
pnpm db:push

# Prisma Client を生成
pnpm db:generate

# シードデータを投入（オプション）
pnpm db:seed
```

### 4. 開発サーバーの起動

プロジェクトルートで：

```bash
pnpm dev
```

または、`apps/web` ディレクトリで：

```bash
cd apps/web
pnpm dev
```

ブラウザで http://localhost:3000 を開いてアクセスします。

## 🗂️ プロジェクト構造

```
mokabu/
├── apps/
│   └── web/              # Next.js フロントエンド
│       ├── src/
│       │   ├── app/      # Next.js App Router（ルーティング層）
│       │   ├── features/ # 機能別ビジネスロジック
│       │   ├── server/   # tRPC サーバー
│       │   ├── lib/      # インフラ・ライブラリ
│       │   └── components/ # 共通 UI コンポーネント
│       └── prisma/       # Prisma スキーマ
│
└── packages/
    └── typescript-config/ # 共有 TypeScript 設定
```

## 💡 便利なコマンド

### ルートから実行（Turborepo 経由）

```bash
pnpm dev          # すべてのアプリの開発サーバーを起動
pnpm build        # すべてのアプリをビルド
pnpm lint         # すべてのアプリで lint 実行
pnpm format       # コードフォーマット
```

### apps/web で実行

```bash
pnpm dev          # 開発サーバー起動
pnpm build        # プロダクションビルド
pnpm start        # ビルドしたアプリを起動
pnpm lint         # ESLint 実行
pnpm db:push      # Prisma スキーマを DB に反映
pnpm db:generate  # Prisma Client 生成
pnpm db:seed      # シードデータ投入
pnpm db:studio    # Prisma Studio 起動（DB GUI）
```

## 🔧 開発フロー

### データベーススキーマの変更

1. `apps/web/prisma/schema.prisma` を編集
2. 変更を DB に反映:
   ```bash
   cd apps/web
   pnpm db:push
   ```
3. Prisma Client が自動再生成され、TypeScript の型も更新されます

### 新しい UI コンポーネントの追加

shadcn/ui から必要なコンポーネントを追加：

```bash
cd apps/web
pnpm dlx shadcn@latest add [component-name]

# 例
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add form
```

### 新しい API の追加

1. `apps/web/src/server/routers/` に新しいルーターを作成
2. `apps/web/src/server/routers/index.ts` でルーターを統合
3. フロントエンドで型安全に使用可能

## 🎯 次のステップ

- [ ] 認証機能の追加（NextAuth.js）
- [ ] 株価 API の統合
- [ ] リアルタイム更新機能
- [ ] チャート・グラフの実装
- [ ] モバイル対応の改善
- [ ] テストの追加

## 📚 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Prisma ドキュメント](https://www.prisma.io/docs)
- [tRPC ドキュメント](https://trpc.io/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Turborepo ドキュメント](https://turbo.build/repo/docs)

