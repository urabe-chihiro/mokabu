# 株ポートフォリオ管理アプリケーション (Mokabu)

モダンな技術スタックで構築された、株式投資のポートフォリオ管理アプリケーションです。

## 🚀 技術スタック

### フロントエンド
- **Next.js 15** - App Router を使用したフルスタックフレームワーク
- **React 19** - UI ライブラリ
- **TypeScript** - 型安全な開発
- **Material-UI (MUI)** - Material Design コンポーネントライブラリ
- **Emotion** - CSS-in-JS（MUI の依存）
- **Zod** - スキーマバリデーション

### バックエンド・データベース
- **Prisma** - 次世代 ORM（型自動生成、マイグレーション管理）
- **PostgreSQL** - 本番環境用データベース
- **SQLite** - ローカル開発用データベース
- **tRPC** - 型安全な API 層（エンドツーエンドの型安全性）

### モノレポ・ビルドツール
- **Turborepo** - 高速モノレポビルドシステム
- **pnpm** - 高速パッケージマネージャー

### 開発ツール
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター

## ✨ 主な機能

- 📊 **ポートフォリオ管理** - 保有株式の一覧表示・追加・編集・削除
- 💰 **損益計算** - リアルタイムでの評価損益の自動計算
- 📈 **パフォーマンス分析** - ポートフォリオ全体のパフォーマンス可視化
- 🏷️ **セクター分類** - 業種別の保有比率分析
- 📱 **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応

## 🏛️ アーキテクチャ設計

このアプリケーションは**レイヤードアーキテクチャ + 機能ベースアーキテクチャ + モノレポ構成**で設計されており、その実装に **tRPC**（API層）、**Prisma**（データアクセス層）、**Next.js**（プレゼンテーション層）、**Turborepo**（ビルドシステム）などのモダンなツールを使用しています。

### モノレポ構成

責務ごとにパッケージを分離し、コードの再利用性と保守性を向上させています。

```
mokabu/                        # モノレポルート
├── apps/
│   └── web/                   # Next.js フロントエンド
│       ├── src/
│       │   ├── app/          # ルーティング層
│       │   ├── features/     # 機能別ビジネスロジック
│       │   ├── components/   # 共通 UI
│       │   └── lib/          # ライブラリ
│       └── next.config.ts
│
└── packages/
    ├── database/              # Prisma（データアクセス層）
    │   ├── prisma/
    │   │   ├── schema.prisma
    │   │   └── seed.ts
    │   └── src/index.ts
    │
    ├── server/                # tRPC サーバー（ビジネスロジック層）
    │   └── src/
    │       ├── routers/
    │       └── trpc.ts
    │
    └── typescript-config/     # TypeScript 共有設定
```

### レイヤードアーキテクチャ

アプリケーションを責務ごとに明確な層に分離し、保守性・テスト容易性・拡張性を確保しています。

```
┌─────────────────────────────────────────────────────────────┐
│  プレゼンテーション層 (apps/web/src/app)                     │
│  - ルーティング、ページレンダリング                          │
│  - Next.js App Router による URL とページの対応             │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  UI・ビジネスロジック層 (apps/web/src/features)              │
│  - 機能別のコンポーネント、フック、ユーティリティ            │
│  - ユーザー操作、画面表示ロジック                            │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  API通信層 (tRPC)                                            │
│  - 型安全なフロント↔バック通信                               │
│  - エンドツーエンドの型推論                                  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  ビジネスロジック層 (packages/server)                        │
│  - API ルーター、サービス、バリデーション                    │
│  - ビジネスルール、データ処理                                │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  データアクセス層 (packages/database)                        │
│  - ORM によるデータベース操作                                │
│  - 型安全なクエリ、マイグレーション管理                      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  データ永続化層 (PostgreSQL/SQLite)                          │
│  - データベース                                              │
└─────────────────────────────────────────────────────────────┘
```

### 機能ベースアーキテクチャ

コードを「技術」ではなく「機能」単位で整理することで、以下を実現：

- ✅ **高い凝集度**: 関連するコードが同じディレクトリにまとまる
- ✅ **低い結合度**: 機能間の依存が最小限
- ✅ **スケーラビリティ**: 新機能の追加・既存機能の削除が容易
- ✅ **チーム開発**: 機能ごとに並行開発が可能、コンフリクトが少ない

```
apps/web/src/features/
├── portfolio/      ← ポートフォリオ機能（すべてここに集約）
│   ├── components/ ← UI コンポーネント
│   ├── hooks/      ← カスタムフック
│   └── utils/      ← ヘルパー関数
├── stocks/         ← 株式機能
└── auth/           ← 認証機能（将来）
```

### 型駆動開発

TypeScript の型システムを活用し、**単一の情報源（Prisma スキーマ）**からすべての型を自動生成：

```
1. Prisma スキーマ定義 (schema.prisma)
         ↓
2. Prisma が TypeScript の型を自動生成
         ↓
3. tRPC がその型を使って API を定義
         ↓
4. フロントエンドで型安全に使用（自動補完・型チェック）
```

**利点:**
- 型の不整合が発生しない
- リファクタリングが安全
- エディタの補完が完璧に機能
- バグをコンパイル時に検出

### 自動生成による開発効率化

- **Prisma**: データベーススキーマから TypeScript の型を自動生成
- **tRPC**: フロントエンドとバックエンド間で型を自動同期
- **Turborepo**: 変更されたパッケージのみを効率的にビルド

### スケーラビリティ

- ローカル開発では SQLite、本番環境では PostgreSQL に簡単切り替え
- Vercel や AWS へのデプロイに対応
- Server Components と Client Components の適切な分離
- 各層・各機能が独立しているため、段階的な拡張が可能
- 将来的に `apps/api` を追加してバックエンドを分離することも容易

## 📁 ディレクトリ構造

各層・各機能が明確に分離された構造になっています。

```
mokabu/
├── apps/
│   └── web/                          # フロントエンド（Next.js）
│       ├── src/
│       │   ├── app/                  # Next.js App Router（ルーティング層）
│       │   │   ├── page.tsx          # トップページ
│       │   │   ├── layout.tsx        # ルートレイアウト
│       │   │   ├── globals.css       # グローバルスタイル
│       │   │   ├── portfolio/
│       │   │   │   └── page.tsx      # ポートフォリオ一覧ページ
│       │   │   └── api/
│       │   │       └── trpc/
│       │   │           └── [trpc]/
│       │   │               └── route.ts  # tRPC エンドポイント
│       │   │
│       │   ├── features/             # 機能別ビジネスロジック
│       │   │   ├── portfolio/
│       │   │   │   └── components/
│       │   │   │       └── PortfolioList.tsx
│       │   │   └── stocks/
│       │   │       └── components/
│       │   │
│       │   ├── components/           # 共通 UI コンポーネント
│       │   │   └── layouts/
│       │   │
│       │   └── lib/                  # ライブラリ・設定
│       │       ├── theme.ts          # MUI テーマ定義
│       │       ├── ThemeRegistry.tsx # MUI テーマプロバイダー
│       │       └── trpc/
│       │           ├── client.ts
│       │           └── Provider.tsx
│       │
│       ├── next.config.ts
│       └── package.json
│
├── packages/
│   ├── database/                     # データアクセス層
│   │   ├── prisma/
│   │   │   ├── schema.prisma         # Prisma スキーマ定義
│   │   │   ├── seed.ts               # シードデータ
│   │   │   └── dev.db                # SQLite データベース
│   │   ├── src/
│   │   │   └── index.ts              # Prisma Client エクスポート
│   │   └── package.json
│   │
│   ├── server/                       # ビジネスロジック・API 層
│   │   ├── src/
│   │   │   ├── routers/
│   │   │   │   ├── portfolio.ts      # ポートフォリオ API
│   │   │   │   ├── stock.ts          # 株式 API
│   │   │   │   └── index.ts          # ルーター統合
│   │   │   ├── trpc.ts               # tRPC 設定
│   │   │   └── index.ts              # エクスポート
│   │   └── package.json
│   │
│   └── typescript-config/            # TypeScript 共有設定
│       ├── base.json
│       ├── nextjs.json
│       └── package.json
│
├── turbo.json                        # Turborepo 設定
├── pnpm-workspace.yaml               # pnpm workspace 設定
├── package.json                      # ルートパッケージ
└── README.md
```

### ディレクトリの責務

| ディレクトリ | 層 | 責務 |
|-------------|-----|------|
| `apps/web/src/app` | プレゼンテーション | URL ルーティング、ページレンダリング（薄く保つ） |
| `apps/web/src/features` | UI・ビジネスロジック | 機能別の UI コンポーネント、フック、ユーティリティ |
| `packages/server` | ビジネスロジック・API | API 定義、ビジネスルール、データ処理 |
| `apps/web/src/components` | 共通 UI | 機能横断で使用する共通コンポーネント |
| `apps/web/src/lib` | インフラ | MUI テーマ、tRPC などのインフラ設定、共通ライブラリ |
| `packages/database` | データアクセス | DB スキーマ定義、マイグレーション、Prisma Client |

## 🛠️ セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd mokabu
```

### 2. 依存関係のインストール

```bash
pnpm install
```

これにより、すべてのワークスペース（apps/web、packages/*）の依存関係がインストールされます。

### 3. 環境変数の設定

`packages/database/.env` ファイルを作成（または `.env.example` をコピー）：

```bash
# packages/database/.env
DATABASE_URL="file:./dev.db"

# 本番環境用（PostgreSQL）
# DATABASE_URL="postgresql://user:password@localhost:5432/mokabu?schema=public"
```

### 4. データベースのセットアップ

```bash
cd packages/database

# Prisma スキーマをデータベースに反映
pnpm db:push

# Prisma Client の生成
pnpm db:generate

# シードデータの投入（オプション）
pnpm db:seed
```

### 5. 開発サーバーの起動

プロジェクトルートで：

```bash
cd ../..  # mokabu/ ルートに戻る
pnpm dev
```

または、`apps/web` で直接起動：

```bash
cd apps/web
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアクセスします。

## 📝 開発フロー

### データベーススキーマの変更

1. `packages/database/prisma/schema.prisma` を編集
2. 変更を DB に反映：

```bash
cd packages/database
pnpm db:push
```

3. Prisma Client が自動的に再生成され、TypeScript の型も更新されます

### 新しい tRPC API の追加

1. `packages/server/src/routers/` に新しいルーターを作成（または既存を編集）
2. `packages/server/src/routers/index.ts` でルーターを統合
3. ファイルを保存すると、型が自動的にフロントエンドに同期されます
4. フロントエンドで型安全に API を呼び出し可能

```typescript
// サーバー側 (packages/server/src/routers/stock.ts)
export const stockRouter = router({
  getAll: publicProcedure.query(async () => {
    return prisma.stock.findMany();
  }),
});

// クライアント側（型が自動補完される）
const { data } = trpc.stock.getAll.useQuery();
```

### Material-UI コンポーネントの使用

MUI コンポーネントは sx props でスタイリング：

```typescript
import { Box, Card, Button } from '@mui/material'

<Box
  sx={{
    display: 'flex',
    gap: 2,
    p: 3,
    bgcolor: 'background.paper',
  }}
>
  <Card sx={{ flexGrow: 1 }}>
    <Button variant="contained" sx={{ mt: 2 }}>
      保存
    </Button>
  </Card>
</Box>
```

テーマのカスタマイズは `apps/web/src/lib/theme.ts` で行います。

## 🧪 テスト

```bash
# ユニットテスト実行
pnpm test

# カバレッジ付きテスト
pnpm test:coverage

# ウォッチモード
pnpm test:watch
```

## 🎨 コードフォーマット

```bash
# コードフォーマット（ルートから）
pnpm format

# Lint チェック
pnpm lint

# Lint 自動修正
cd apps/web
pnpm lint --fix
```

## 📦 ビルド

```bash
# すべてのパッケージをビルド（Turborepo が効率的に実行）
pnpm build
```

## 🚢 デプロイ

### Vercel へのデプロイ

1. Vercel アカウントを作成
2. GitHub リポジトリを連携
3. Root Directory を `apps/web` に設定
4. 環境変数を設定（PostgreSQL の接続情報など）
5. デプロイ実行

```bash
npm install -g vercel
vercel
```

### AWS へのデプロイ

- AWS Amplify または ECS を使用
- RDS (PostgreSQL) をデータベースとして使用
- 環境変数を適切に設定

## 📚 データベーススキーマ

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  portfolios Portfolio[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Portfolio {
  id            String   @id @default(cuid())
  name          String
  description   String?
  initialAmount Float    @default(0)
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  stocks        Stock[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([userId])
}

model Stock {
  id           String    @id @default(cuid())
  symbol       String    // 銘柄コード（例: 7203）
  name         String    // 銘柄名（例: トヨタ自動車）
  quantity     Int       // 保有数量
  buyPrice     Float     // 購入単価
  currentPrice Float?    // 現在価格
  sector       String?   // セクター（例: 自動車、金融など）
  portfolioId  String
  portfolio    Portfolio @relation(fields: [portfolioId], references: [id], onDelete: Cascade)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([portfolioId])
  @@index([symbol])
}
```

## 💡 便利なコマンド

### ルートから実行（Turborepo 経由）

```bash
pnpm dev          # すべてのアプリの開発サーバーを起動
pnpm build        # すべてのアプリをビルド
pnpm lint         # すべてのアプリで lint 実行
pnpm format       # コードフォーマット
```

### packages/database で実行

```bash
cd packages/database
pnpm db:push      # Prisma スキーマを DB に反映
pnpm db:generate  # Prisma Client 生成
pnpm db:seed      # シードデータ投入
pnpm db:studio    # Prisma Studio 起動（DB GUI）
```

### apps/web で実行

```bash
cd apps/web
pnpm dev          # 開発サーバー起動
pnpm build        # プロダクションビルド
pnpm start        # ビルドしたアプリを起動
pnpm lint         # ESLint 実行
```

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まず Issue を開いて変更内容を議論してください。

## 📄 ライセンス

MIT

## 🔗 リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Prisma ドキュメント](https://www.prisma.io/docs)
- [tRPC ドキュメント](https://trpc.io/docs)
- [Material-UI](https://mui.com/)
- [Turborepo ドキュメント](https://turbo.build/repo/docs)
- [pnpm](https://pnpm.io/)
