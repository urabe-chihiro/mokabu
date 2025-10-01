# 株ポートフォリオ管理アプリケーション (Mokabu)

モダンな技術スタックで構築された、株式投資のポートフォリオ管理アプリケーションです。

## 🚀 技術スタック

### フロントエンド
- **Next.js 14+** - App Router を使用したフルスタックフレームワーク
- **React 18** - UI ライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストの CSS フレームワーク
- **shadcn/ui** - カスタマイズ可能な UI コンポーネント集
- **React Hook Form** - フォーム管理
- **Zod** - スキーマバリデーション

### バックエンド・データベース
- **Prisma** - 次世代 ORM（型自動生成、マイグレーション管理）
- **PostgreSQL** - 本番環境用データベース
- **SQLite** - ローカル開発用データベース
- **tRPC** - 型安全な API 層（エンドツーエンドの型安全性）

### 開発ツール
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター
- **Vitest** - 高速テストランナー

## ✨ 主な機能

- 📊 **ポートフォリオ管理** - 保有株式の一覧表示・追加・編集・削除
- 💰 **損益計算** - リアルタイムでの評価損益の自動計算
- 📈 **パフォーマンス分析** - ポートフォリオ全体のパフォーマンス可視化
- 🏷️ **セクター分類** - 業種別の保有比率分析
- 📱 **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応

## 🏛️ アーキテクチャ設計

このアプリケーションは**レイヤードアーキテクチャ + 機能ベースアーキテクチャ**で設計されており、その実装に **tRPC**（API層）、**Prisma**（データアクセス層）、**Next.js**（プレゼンテーション層）などのモダンなツールを使用しています。

### レイヤードアーキテクチャ

アプリケーションを責務ごとに明確な層に分離し、保守性・テスト容易性・拡張性を確保しています。

```
┌─────────────────────────────────────────────────────────────┐
│  プレゼンテーション層 (src/app)                              │
│  - ルーティング、ページレンダリング                          │
│  - Next.js App Router による URL とページの対応             │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  UI・ビジネスロジック層 (src/features)                       │
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
│  ビジネスロジック層 (src/server)                             │
│  - API ルーター、サービス、バリデーション                    │
│  - ビジネスルール、データ処理                                │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  データアクセス層 (Prisma)                                   │
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
src/features/
├── portfolio/      ← ポートフォリオ機能（すべてここに集約）
│   ├── components/ ← UI コンポーネント
│   ├── hooks/      ← カスタムフック
│   └── utils/      ← ヘルパー関数
├── stocks/         ← 株式機能
└── auth/           ← 認証機能
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
- **shadcn/ui**: CLI コマンドで必要な UI コンポーネントを自動追加

### スケーラビリティ

- ローカル開発では SQLite、本番環境では PostgreSQL に簡単切り替え
- Vercel や AWS へのデプロイに対応
- Server Components と Client Components の適切な分離
- 各層・各機能が独立しているため、段階的な拡張が可能

## 📁 ディレクトリ構造

各層・各機能が明確に分離された構造になっています。

```
mokabu/
├── src/
│   ├── app/                          # プレゼンテーション層（ルーティングのみ）
│   │   ├── page.tsx                  # トップページ
│   │   ├── layout.tsx                # ルートレイアウト
│   │   ├── portfolio/
│   │   │   ├── page.tsx              # ポートフォリオ一覧ページ
│   │   │   └── [id]/
│   │   │       └── page.tsx          # 個別ポートフォリオページ
│   │   └── api/
│   │       └── trpc/
│   │           └── [trpc]/
│   │               └── route.ts      # tRPC エンドポイント（薄いアダプター層）
│   │
│   ├── features/                     # UI・ビジネスロジック層（機能別）
│   │   ├── auth/                     # 認証機能
│   │   │   ├── components/           # 認証関連 UI コンポーネント
│   │   │   ├── hooks/                # 認証関連カスタムフック
│   │   │   └── utils/                # 認証ヘルパー関数
│   │   ├── portfolio/                # ポートフォリオ機能
│   │   │   ├── components/
│   │   │   │   ├── PortfolioList.tsx
│   │   │   │   ├── PortfolioCard.tsx
│   │   │   │   └── CreatePortfolioForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── usePortfolio.ts
│   │   │   └── utils/
│   │   │       └── calculateTotal.ts
│   │   └── stocks/                   # 株式機能
│   │       ├── components/
│   │       │   ├── StockTable.tsx
│   │       │   └── AddStockForm.tsx
│   │       ├── hooks/
│   │       │   └── useStockPrice.ts
│   │       └── utils/
│   │           └── calculateProfit.ts
│   │
│   ├── server/                       # ビジネスロジック・API 層
│   │   ├── routers/                  # tRPC ルーター
│   │   │   ├── auth.ts               # 認証 API
│   │   │   ├── portfolio.ts          # ポートフォリオ API
│   │   │   ├── stock.ts              # 株式 API
│   │   │   └── index.ts              # ルーター統合
│   │   ├── services/                 # ビジネスロジック
│   │   │   ├── portfolioService.ts
│   │   │   └── stockService.ts
│   │   ├── trpc.ts                   # tRPC 初期設定
│   │   └── context.ts                # tRPC コンテキスト
│   │
│   ├── components/                   # 共通 UI コンポーネント
│   │   ├── ui/                       # shadcn/ui コンポーネント
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── table.tsx
│   │   └── layouts/                  # レイアウトコンポーネント
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   │
│   ├── lib/                          # インフラ層・共通ライブラリ
│   │   ├── prisma.ts                 # Prisma クライアント
│   │   ├── trpc/                     # tRPC クライアント設定
│   │   │   ├── client.ts
│   │   │   └── Provider.tsx
│   │   └── utils.ts                  # 汎用ユーティリティ
│   │
│   └── types/                        # 共通型定義
│       ├── portfolio.ts
│       └── stock.ts
│
├── prisma/                           # データアクセス層
│   ├── schema.prisma                 # Prisma スキーマ定義
│   ├── migrations/                   # マイグレーションファイル
│   └── seed.ts                       # シードデータ
│
├── public/                           # 静的ファイル
│   ├── favicon.ico
│   └── images/
│
├── tests/                            # テストファイル
│   ├── features/
│   └── server/
│
├── .env.example                      # 環境変数のサンプル
├── .eslintrc.json                    # ESLint 設定
├── .prettierrc                       # Prettier 設定
├── next.config.js                    # Next.js 設定
├── tailwind.config.ts                # Tailwind CSS 設定
├── tsconfig.json                     # TypeScript 設定
├── components.json                   # shadcn/ui 設定
└── package.json                      # 依存関係
```

### ディレクトリの責務

| ディレクトリ | 層 | 責務 |
|-------------|-----|------|
| `src/app` | プレゼンテーション | URL ルーティング、ページレンダリング（薄く保つ） |
| `src/features` | UI・ビジネスロジック | 機能別の UI コンポーネント、フック、ユーティリティ |
| `src/server` | ビジネスロジック・API | API 定義、ビジネスルール、データ処理 |
| `src/components` | 共通 UI | 機能横断で使用する共通コンポーネント |
| `src/lib` | インフラ | Prisma、tRPC などのインフラ設定、共通ライブラリ |
| `prisma` | データアクセス | DB スキーマ定義、マイグレーション |

## 🛠️ セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd mokabu
```

### 2. 依存関係のインストール

```bash
npm install
# または
pnpm install
# または
yarn install
```

### 3. 環境変数の設定

`.env.example` を `.env` にコピーして、必要な環境変数を設定します。

```bash
cp .env.example .env
```

```.env
# ローカル開発用（SQLite）
DATABASE_URL="file:./dev.db"

# 本番環境用（PostgreSQL）
# DATABASE_URL="postgresql://user:password@localhost:5432/mokabu?schema=public"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 4. データベースのセットアップ

```bash
# Prisma マイグレーションの実行
npx prisma migrate dev --name init

# Prisma Client の生成
npx prisma generate

# シードデータの投入（オプション）
npx prisma db seed
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアクセスします。

## 📝 開発フロー

### データベーススキーマの変更

1. `prisma/schema.prisma` を編集
2. マイグレーションを作成・適用

```bash
npx prisma migrate dev --name <migration-name>
```

3. Prisma Client が自動的に再生成され、TypeScript の型も更新されます

### UI コンポーネントの追加

shadcn/ui から必要なコンポーネントを CLI で追加：

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
```

### tRPC API の追加

1. `src/server/routers/` に新しいルーターを作成
2. 型が自動的にフロントエンドに同期されます
3. フロントエンドで型安全に API を呼び出し可能

```typescript
// サーバー側
export const stockRouter = router({
  getAll: publicProcedure.query(async () => {
    return prisma.stock.findMany();
  }),
});

// クライアント側（型が自動補完される）
const { data } = trpc.stock.getAll.useQuery();
```

## 🧪 テスト

```bash
# ユニットテスト実行
npm run test

# カバレッジ付きテスト
npm run test:coverage

# ウォッチモード
npm run test:watch
```

## 🎨 コードフォーマット

```bash
# コードフォーマット
npm run format

# Lint チェック
npm run lint

# Lint 自動修正
npm run lint:fix
```

## 📦 ビルド

```bash
npm run build
```

## 🚢 デプロイ

### Vercel へのデプロイ

1. Vercel アカウントを作成
2. GitHub リポジトリを連携
3. 環境変数を設定（PostgreSQL の接続情報など）
4. デプロイ実行

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
  id        String   @id @default(cuid())
  name      String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  stocks    Stock[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Stock {
  id           String    @id @default(cuid())
  symbol       String    // 銘柄コード
  name         String    // 銘柄名
  quantity     Int       // 保有数量
  buyPrice     Float     // 購入単価
  currentPrice Float?    // 現在価格
  sector       String?   // セクター
  portfolioId  String
  portfolio    Portfolio @relation(fields: [portfolioId], references: [id])
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まず Issue を開いて変更内容を議論してください。

## 📄 ライセンス

MIT

## 🔗 リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Prisma ドキュメント](https://www.prisma.io/docs)
- [tRPC ドキュメント](https://trpc.io/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

