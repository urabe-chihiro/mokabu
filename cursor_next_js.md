# Next.js で株ポートフォリオアプリ設計
_Exported on 2025/10/1 at 10:37:35 JST from Cursor (1.7.17)_

---

**User**

Next.js の App Router で 株のポートフォリオアプリケーションを実装したいんだけど、いい設計はないかな？

フロントは React 、データベースはモダンな開発を真似した形にしたい。

将来的にVercel や aws で運用したいけど、まずはローカルで動くようにしたいです。

なるだけ、自動生成を利用した開発にしたい。

---

**Cursor**

株のポートフォリオアプリケーションの設計を提案させていただきます！モダンな開発スタックで自動生成を活用した構成を考えました。

## 推奨する技術スタック

**フロントエンド:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui (コンポーネント自動生成)
- React Hook Form + Zod (フォーム管理・バリデーション)

**バックエンド・データベース:**
- Prisma (ORM - 型自動生成、マイグレーション管理)
- PostgreSQL (本番) / SQLite (ローカル開発)
- tRPC (型安全なAPI、自動補完)

**その他:**
- ESLint + Prettier
- Vitest (テスト)

この構成の利点：
✅ Prisma がDBスキーマから TypeScript の型を自動生成
✅ tRPC でフロント・バック間の型が自動同期
✅ shadcn/ui でUIコンポーネントを CLI で自動追加
✅ ローカルは SQLite、本番は PostgreSQL に簡単に切り替え可能
✅ Vercel へのデプロイが簡単

プロジェクトをセットアップしましょうか？以下を実装します：

1. **Next.js プロジェクトの初期化** (TypeScript, Tailwind CSS)
2. **Prisma のセットアップ** (株ポートフォリオ用のスキーマ定義)
3. **tRPC のセットアップ** (型安全なAPI)
4. **shadcn/ui のセットアップ** (モダンなUIコンポーネント)
5. **基本的なディレクトリ構造の作成**

進めてよろしいでしょうか？

---

**User**

まずは、この構成で README を作成してくれる？

---

**Cursor**

株のポートフォリオアプリケーション用のREADMEを作成します！

```markdown
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

## 🎯 アーキテクチャの特徴

### 自動生成による開発効率化
- **Prisma**: データベーススキーマから TypeScript の型を自動生成
- **tRPC**: フロントエンドとバックエンド間で型を自動同期
- **shadcn/ui**: CLI コマンドで必要な UI コンポーネントを自動追加

### スケーラビリティ
- ローカル開発では SQLite、本番環境では PostgreSQL に簡単切り替え
- Vercel や AWS へのデプロイに対応
- Server Components と Client Components の適切な分離

## 📁 ディレクトリ構造

```
mokabu/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 認証関連のルートグループ
│   │   ├── api/               # API ルート
│   │   ├── portfolio/         # ポートフォリオページ
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx           # トップページ
│   ├── components/            # React コンポーネント
│   │   ├── ui/                # shadcn/ui コンポーネント
│   │   ├── portfolio/         # ポートフォリオ関連コンポーネント
│   │   └── layouts/           # レイアウトコンポーネント
│   ├── lib/                   # ユーティリティ・ヘルパー
│   │   ├── db.ts              # Prisma クライアント
│   │   ├── trpc/              # tRPC 設定
│   │   └── utils.ts           # 汎用ユーティリティ
│   ├── server/                # サーバーサイドロジック
│   │   ├── routers/           # tRPC ルーター
│   │   └── context.ts         # tRPC コンテキスト
│   └── types/                 # 型定義
├── prisma/
│   ├── schema.prisma          # Prisma スキーマ定義
│   ├── migrations/            # マイグレーションファイル
│   └── seed.ts                # シードデータ
├── public/                    # 静的ファイル
├── tests/                     # テストファイル
├── .env.example               # 環境変数のサンプル
├── .eslintrc.json            # ESLint 設定
├── .prettierrc               # Prettier 設定
├── next.config.js            # Next.js 設定
├── tailwind.config.ts        # Tailwind CSS 設定
├── tsconfig.json             # TypeScript 設定
└── package.json              # 依存関係
```

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

```

READMEを作成しました！📝

このREADMEには以下を含めています：

✅ **技術スタックの詳細** - フロント・バック・開発ツールの全体像
✅ **主な機能** - ポートフォリオ管理アプリとして必要な機能
✅ **アーキテクチャの特徴** - 自動生成による開発効率化の説明
✅ **ディレクトリ構造** - プロジェクト全体の構成
✅ **セットアップ手順** - ローカル環境での起動方法
✅ **開発フロー** - スキーマ変更、UI追加、API追加の手順
✅ **デプロイ方法** - Vercel と AWS へのデプロイ
✅ **データベーススキーマ例** - User、Portfolio、Stock の基本モデル

次は実際にプロジェクトのセットアップを進めましょうか？以下の順で実装できます：

1. **Next.js プロジェクトの初期化**
2. **Prisma のセットアップとスキーマ定義**
3. **tRPC のセットアップ**
4. **shadcn/ui のインストール**
5. **基本的なページとコンポーネントの作成**

進めてよろしいでしょうか？それとも README の内容を修正したい箇所はありますか？

---

**User**

src/app/page.tsxや、 src/app/portfolio/page.tsx などが 表示されるページってことだよね？

その認識であっていれば、src/app はルートを管理として、 api や (auth) は src/app から出したいのだけど、どう管理するのがいいと思う？

---

**Cursor**

```plaintext
src/
├── app/                    # ページのみ（ルーティング）
│   ├── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── api/
│       └── trpc/
│           └── [trpc]/
│               └── route.ts  # tRPC のエンドポイント（最小限）
├── server/                 # バックエンドロジック（app外）
│   ├── routers/
│   ├── trpc.ts


│   └── context.ts
├── lib/                    # ユーティリティ（app外）
└── components/             # コンポーネント（app外）
```

はい、その認識で正しいです！`src/app/page.tsx` がトップページ、`src/app/portfolio/page.tsx` がポートフォリオページとして表示されます。

そして、ビジネスロジックや API ロジックを `src/app` から分離したいというのは**とても良い設計**です！App Router では、`src/app` は「ルーティング層」として最小限にするのがベストプラクティスです。

## 推奨するディレクトリ構造

```
mokabu/
├── src/
│   ├── app/                          # ルーティング層（ページのみ）
│   │   ├── page.tsx                  # トップページ
│   │   ├── portfolio/
│   │   │   ├── page.tsx              # ポートフォリオ一覧
│   │   │   └── [id]/
│   │   │       └── page.tsx          # 個別ポートフォリオ
│   │   ├── layout.tsx
│   │   └── api/
│   │       └── trpc/
│   │           └── [trpc]/
│   │               └── route.ts      # tRPC エンドポイント（最小限）
│   │
│   ├── features/                     # 機能別ビジネスロジック ⭐
│   │   ├── auth/
│   │   │   ├── components/           # 認証関連コンポーネント
│   │   │   ├── hooks/                # 認証関連フック
│   │   │   └── utils/                # 認証ユーティリティ
│   │   ├── portfolio/
│   │   │   ├── components/           # ポートフォリオコンポーネント
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   └── stocks/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── utils/
│   │
│   ├── server/                       # サーバーサイドロジック ⭐
│   │   ├── routers/
│   │   │   ├── auth.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── stock.ts
│   │   │   └── index.ts              # ルーター統合
│   │   ├── services/                 # ビジネスロジック
│   │   │   ├── portfolioService.ts
│   │   │   └── stockService.ts
│   │   ├── trpc.ts                   # tRPC 設定
│   │   └── context.ts                # tRPC コンテキスト
│   │
│   ├── components/                   # 共通コンポーネント ⭐
│   │   ├── ui/                       # shadcn/ui コンポーネント
│   │   └── layouts/                  # レイアウトコンポーネント
│   │
│   ├── lib/                          # 共通ライブラリ ⭐
│   │   ├── prisma.ts                 # Prisma クライアント
│   │   ├── trpc/
│   │   │   ├── client.ts             # tRPC クライアント設定
│   │   │   └── Provider.tsx          # tRPC Provider
│   │   └── utils.ts
│   │
│   └── types/                        # 型定義
│       ├── portfolio.ts
│       └── stock.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
└── ... (設定ファイル等)
```

## この構造の利点

### ✅ 関心の分離
- **`src/app`**: ルーティングとページレンダリングのみ
- **`src/features`**: 機能別のビジネスロジック（Feature-Based）
- **`src/server`**: サーバーサイドロジック（API、DB操作）
- **`src/components`**: 共通UIコンポーネント
- **`src/lib`**: インフラ層（Prisma、tRPC設定など）

### ✅ テストしやすい
- ビジネスロジックが `src/app` から分離されているので、ページコンポーネントに依存せずテスト可能

### ✅ スケーラブル
- 新しい機能は `src/features` に追加するだけ
- 各機能が独立しているので、チーム開発でも衝突しにくい

## 具体的なファイル例

### ページ（`src/app/portfolio/page.tsx`）- ルーティング層
```typescript
// ページは薄く保つ
import { PortfolioList } from '@/features/portfolio/components/PortfolioList'

export default function PortfolioPage() {
  return <PortfolioList />
}
```

### ビジネスロジック（`src/features/portfolio/components/PortfolioList.tsx`）
```typescript
'use client'
import { trpc } from '@/lib/trpc/client'
import { PortfolioCard } from './PortfolioCard'

export function PortfolioList() {
  const { data: portfolios } = trpc.portfolio.getAll.useQuery()
  
  return (
    <div>
      {portfolios?.map(portfolio => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  )
}
```

### API ロジック（`src/server/routers/portfolio.ts`）
```typescript
import { router, publicProcedure } from '../trpc'
import { portfolioService } from '../services/portfolioService'

export const portfolioRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return portfolioService.getAll(ctx.userId)
  }),
})
```

READMEを更新しましょうか？このディレクトリ構造に合わせて修正します。

```plaintext
mokabu/
├── src/
│   ├── app/                          # ルーティング層（ページのみ）
│   │   ├── page.tsx                  # トップページ
│   │   ├── portfolio/
│   │   │   ├── page.tsx              # ポートフォリオ一覧
│   │   │   └── [id]/
│   │   │       └── page.tsx          # 個別ポートフォリオ
│   │   ├── layout.tsx
│   │   └── api/
│   │       └── trpc/
│   │           └── [trpc]/
│   │               └── route.ts      # tRPC エンドポイント（最小限）
│   │
│   ├── features/                     # 機能別ビジネスロジック ⭐
│   │   ├── auth/
│   │   │   ├── components/           # 認証関連コンポーネント
│   │   │   ├── hooks/                # 認証関連フック
│   │   │   └── utils/                # 認証ユーティリティ
│   │   ├── portfolio/
│   │   │   ├── components/           # ポートフォリオコンポーネント
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   └── stocks/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── utils/
│   │
│   ├── server/                       # サーバーサイドロジック ⭐
│   │   ├── routers/
│   │   │   ├── auth.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── stock.ts
│   │   │   └── index.ts              # ルーター統合
│   │   ├── services/                 # ビジネスロジック
│   │   │   ├── portfolioService.ts
│   │   │   └── stockService.ts
│   │   ├── trpc.ts                   # tRPC 設定
│   │   └── context.ts                # tRPC コンテキスト
│   │
│   ├── components/                   # 共通コンポーネント ⭐
│   │   ├── ui/                       # shadcn/ui コンポーネント
│   │   └── layouts/                  # レイアウトコンポーネント
│   │
│   ├── lib/                          # 共通ライブラリ ⭐
│   │   ├── prisma.ts                 # Prisma クライアント
│   │   ├── trpc/
│   │   │   ├── client.ts             # tRPC クライアント設定
│   │   │   └── Provider.tsx          # tRPC Provider
│   │   └── utils.ts
│   │
│   └── types/                        # 型定義
│       ├── portfolio.ts
│       └── stock.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
└── ... (設定ファイル等)
```

```typescript
// ページは薄く保つ
import { PortfolioList } from '@/features/portfolio/components/PortfolioList'

export default function PortfolioPage() {
  return <PortfolioList />
}
```

```typescript
'use client'
import { trpc } from '@/lib/trpc/client'
import { PortfolioCard } from './PortfolioCard'

export function PortfolioList() {
  const { data: portfolios } = trpc.portfolio.getAll.useQuery()
  
  return (
    <div>
      {portfolios?.map(portfolio => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  )
}
```

```typescript
import { router, publicProcedure } from '../trpc'
import { portfolioService } from '../services/portfolioService'

export const portfolioRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return portfolioService.getAll(ctx.userId)
  }),
})
```

---

**User**

src/app/api はなに？　ルーティング層にいる意味は？

---

**Cursor**

良い質問です！`src/app/api` は **Next.js の仕様上、どうしてもそこに置く必要がある** んです。

## Next.js App Router の仕様

Next.js では、`app/api/xxx/route.ts` というパスが **HTTP エンドポイント**になります。これは Next.js の規約で、`app` ディレクトリ配下に置かないと動きません。

### 例：tRPC のエンドポイント
```
src/app/api/trpc/[trpc]/route.ts  →  /api/trpc/* というHTTPエンドポイントになる
```

## でも、ロジックは分離できる！

`src/app/api` 配下のファイルは **超薄い「アダプター層」** として使い、実際のロジックは `src/server` に置きます。

### `src/app/api/trpc/[trpc]/route.ts` （アダプター層 - 最小限）
```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,        // ← 実際のロジックは src/server に
    createContext,            // ← これも src/server に
  })

export { handler as GET, handler as POST }
```

### `src/server/routers/index.ts` （ビジネスロジック）
```typescript
import { router } from '../trpc'
import { portfolioRouter } from './portfolio'
import { stockRouter } from './stock'

export const appRouter = router({
  portfolio: portfolioRouter,
  stock: stockRouter,
})

export type AppRouter = typeof appRouter
```

## もし REST API を使う場合も同じ

```
src/app/api/portfolios/route.ts  →  /api/portfolios というエンドポイント
```

```typescript
// src/app/api/portfolios/route.ts （薄い）
import { NextResponse } from 'next/server'
import { portfolioService } from '@/server/services/portfolioService'

export async function GET() {
  const portfolios = await portfolioService.getAll()  // ← ロジックは別
  return NextResponse.json(portfolios)
}
```

## まとめ

| ディレクトリ | 役割 | 理由 |
|-------------|------|------|
| `src/app/api` | HTTPエンドポイントの定義（薄い） | Next.js の仕様上必須 |
| `src/server` | 実際のビジネスロジック | テスト可能・再利用可能 |

つまり、`src/app/api` は「Next.js の制約で仕方なく置く場所」で、中身は可能な限り薄く保ち、実際のロジックは `src/server` に書くのがベストプラクティスです！

これで納得いただけましたか？

```plaintext
src/app/api/trpc/[trpc]/route.ts  →  /api/trpc/* というHTTPエンドポイントになる
```

```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,        // ← 実際のロジックは src/server に
    createContext,            // ← これも src/server に
  })

export { handler as GET, handler as POST }
```

```typescript
import { router } from '../trpc'
import { portfolioRouter } from './portfolio'
import { stockRouter } from './stock'

export const appRouter = router({
  portfolio: portfolioRouter,
  stock: stockRouter,
})

export type AppRouter = typeof appRouter
```

```plaintext
src/app/api/portfolios/route.ts  →  /api/portfolios というエンドポイント
```

```typescript
// src/app/api/portfolios/route.ts （薄い）
import { NextResponse } from 'next/server'
import { portfolioService } from '@/server/services/portfolioService'

export async function GET() {
  const portfolios = await portfolioService.getAll()  // ← ロジックは別
  return NextResponse.json(portfolios)
}
```

---

**User**

なるほど、理解しました！
ちなみに、trpc　について教えてーー !

---

**Cursor**

tRPC について詳しく説明しますね！🚀

## tRPC とは？

**tRPC = TypeScript Remote Procedure Call**

簡単に言うと、**フロントエンドとバックエンド間で型を自動共有してくれる魔法のようなライブラリ**です。

## 従来の REST API の問題点

### ❌ REST API の場合
```typescript
// バックエンド（API）
app.get('/api/portfolios', async (req, res) => {
  const portfolios = await db.portfolio.findMany()
  res.json(portfolios)
})

// フロントエンド
const response = await fetch('/api/portfolios')
const portfolios = await response.json()  // ← any 型！型安全じゃない！

// 手動で型を定義する必要がある
interface Portfolio {
  id: string
  name: string
  // ... バックエンドと手動で同期が必要 😢
}
const portfolios: Portfolio[] = await response.json()
```

**問題点:**
- バックエンドで返す型とフロントエンドで受け取る型が別々
- 手動で型を同期する必要がある
- バックエンドの変更がフロントエンドに自動反映されない
- タイポがあっても実行時まで気づかない

## ✅ tRPC の場合

### バックエンド（`src/server/routers/portfolio.ts`）
```typescript
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const portfolioRouter = router({
  // 全件取得
  getAll: publicProcedure
    .query(async () => {
      return prisma.portfolio.findMany({
        include: { stocks: true }
      })
    }),
  
  // ID指定で取得
  getById: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input }) => {
      return prisma.portfolio.findUnique({
        where: { id: input.id }
      })
    }),
  
  // 作成
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      userId: z.string()
    }))
    .mutation(async ({ input }) => {
      return prisma.portfolio.create({
        data: input
      })
    }),
})
```

### フロントエンド（`src/features/portfolio/components/PortfolioList.tsx`）
```typescript
'use client'
import { trpc } from '@/lib/trpc/client'

export function PortfolioList() {
  // ✨ 型が自動で推論される！
  const { data: portfolios, isLoading } = trpc.portfolio.getAll.useQuery()
  
  // portfolios の型は自動的に Prisma のモデルから推論される
  // portfolios: (Portfolio & { stocks: Stock[] })[] | undefined
  
  const createMutation = trpc.portfolio.create.useMutation()
  
  const handleCreate = () => {
    createMutation.mutate({
      name: "新しいポートフォリオ",
      userId: "user123"
      // ↑ ここで間違った型を渡すと、エディタ上でエラーが出る！
    })
  }
  
  if (isLoading) return <div>読み込み中...</div>
  
  return (
    <div>
      {portfolios?.map(portfolio => (
        <div key={portfolio.id}>
          {portfolio.name}
          {/* ↑ 自動補完が効く！ */}
          <span>銘柄数: {portfolio.stocks.length}</span>
        </div>
      ))}
      <button onClick={handleCreate}>追加</button>
    </div>
  )
}
```

## tRPC の魔法のポイント 🪄

### 1. **型の自動推論**
```typescript
// バックエンドで定義した型が...
.query(async () => {
  return { id: "1", name: "ポートフォリオA" }
})

// フロントエンドで自動的に推論される！
const { data } = trpc.portfolio.getAll.useQuery()
// data の型: { id: string, name: string } | undefined
```

### 2. **エディタ上での自動補完**
```typescript
trpc.portfolio.  // ← ここで Ctrl+Space を押すと...
  // - getAll
  // - getById
  // - create
  // が自動的に表示される！
```

### 3. **コンパイル時のエラー検出**
```typescript
// ❌ これはエディタ上で即座にエラーになる
trpc.portfolio.getById.useQuery({
  id: 123  // 型エラー！string が必要なのに number を渡している
})

// ✅ 正しい
trpc.portfolio.getById.useQuery({
  id: "123"
})
```

### 4. **Zod によるバリデーション**
```typescript
// バックエンドで Zod スキーマを定義
.input(z.object({
  name: z.string().min(1, "名前は必須です"),
  quantity: z.number().min(1).max(10000)
}))

// フロントエンドから間違ったデータを送ると...
createMutation.mutate({
  name: "",  // ← 実行時にバリデーションエラー
  quantity: 99999  // ← これもエラー
})
```

## tRPC vs REST API vs GraphQL

```typescript
// バックエンド（API）
app.get('/api/portfolios', async (req, res) => {
  const portfolios = await db.portfolio.findMany()
  res.json(portfolios)
})

// フロントエンド
const response = await fetch('/api/portfolios')
const portfolios = await response.json()  // ← any 型！型安全じゃない！

// 手動で型を定義する必要がある
interface Portfolio {
  id: string
  name: string
  // ... バックエンドと手動で同期が必要 😢
}
const portfolios: Portfolio[] = await response.json()
```

```typescript
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const portfolioRouter = router({
  // 全件取得
  getAll: publicProcedure
    .query(async () => {
      return prisma.portfolio.findMany({
        include: { stocks: true }
      })
    }),
  
  // ID指定で取得
  getById: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input }) => {
      return prisma.portfolio.findUnique({
        where: { id: input.id }
      })
    }),
  
  // 作成
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      userId: z.string()
    }))
    .mutation(async ({ input }) => {
      return prisma.portfolio.create({
        data: input
      })
    }),
})
```

```typescript
'use client'
import { trpc } from '@/lib/trpc/client'

export function PortfolioList() {
  // ✨ 型が自動で推論される！
  const { data: portfolios, isLoading } = trpc.portfolio.getAll.useQuery()
  
  // portfolios の型は自動的に Prisma のモデルから推論される
  // portfolios: (Portfolio & { stocks: Stock[] })[] | undefined
  
  const createMutation = trpc.portfolio.create.useMutation()
  
  const handleCreate = () => {
    createMutation.mutate({
      name: "新しいポートフォリオ",
      userId: "user123"
      // ↑ ここで間違った型を渡すと、エディタ上でエラーが出る！
    })
  }
  
  if (isLoading) return <div>読み込み中...</div>
  
  return (
    <div>
      {portfolios?.map(portfolio => (
        <div key={portfolio.id}>
          {portfolio.name}
          {/* ↑ 自動補完が効く！ */}
          <span>銘柄数: {portfolio.stocks.length}</span>
        </div>
      ))}
      <button onClick={handleCreate}>追加</button>
    </div>
  )
}
```

```typescript
// バックエンドで定義した型が...
.query(async () => {
  return { id: "1", name: "ポートフォリオA" }
})

// フロントエンドで自動的に推論される！
const { data } = trpc.portfolio.getAll.useQuery()
// data の型: { id: string, name: string } | undefined
```

```typescript
trpc.portfolio.  // ← ここで Ctrl+Space を押すと...
  // - getAll
  // - getById
  // - create
  // が自動的に表示される！
```

```typescript
// ❌ これはエディタ上で即座にエラーになる
trpc.portfolio.getById.useQuery({
  id: 123  // 型エラー！string が必要なのに number を渡している
})

// ✅ 正しい
trpc.portfolio.getById.useQuery({
  id: "123"
})
```

```typescript
// バックエンドで Zod スキーマを定義
.input(z.object({
  name: z.string().min(1, "名前は必須です"),
  quantity: z.number().min(1).max(10000)
}))

// フロントエンドから間違ったデータを送ると...
createMutation.mutate({
  name: "",  // ← 実行時にバリデーションエラー
  quantity: 99999  // ← これもエラー
})
```

| 特徴 | REST API | GraphQL | tRPC |
|------|---------|---------|------|
| 型安全性 | ❌ 手動で型定義 | ⚠️ Codegen必要 | ✅ 自動 |
| セットアップ | ✅ 簡単 | ❌ 複雑 | ✅ 簡単 |
| オーバーフェッチ | ❌ 起きやすい | ✅ なし | ⚠️ 起きる可能性 |
| TypeScript統合 | ❌ 弱い | ⚠️ 普通 | ✅ 完璧 |
| 学習コスト | ✅ 低い | ❌ 高い | ✅ 低い |
| 適用範囲 | ✅ どこでも | ✅ どこでも | ⚠️ TypeScript フルスタックのみ |

## tRPC の仕組み

```
┌─────────────────────────────────────────────────────────────┐
│                    1. バックエンド定義                        │
│  src/server/routers/portfolio.ts                            │
│  export const portfolioRouter = router({ ... })             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ TypeScript の型推論
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    2. tRPC が型を抽出                         │
│  export type AppRouter = typeof appRouter                   │
│  ← この型情報がフロントエンドに共有される                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP 通信（内部的には POST /api/trpc）
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   3. フロントエンドで使用                      │
│  const trpc = createTRPCClient<AppRouter>()                 │
│  ← AppRouter の型情報を使って自動補完・型チェック              │
└─────────────────────────────────────────────────────────────┘
```

## 実際の開発フロー

### ステップ 1: バックエンドでAPIを定義
```typescript
// src/server/routers/stock.ts
export const stockRouter = router({
  addToPortfolio: publicProcedure
    .input(z.object({
      portfolioId: z.string(),
      symbol: z.string(),
      quantity: z.number(),
      buyPrice: z.number()
    }))
    .mutation(async ({ input }) => {
      return prisma.stock.create({ data: input })
    })
})
```

### ステップ 2: フロントエンドで即座に使える
```typescript
// ファイルを保存した瞬間、フロントエンドで自動補完が効く！
const addStock = trpc.stock.addToPortfolio.useMutation()

addStock.mutate({
  portfolioId: "xxx",
  symbol: "7203",  // トヨタ自動車
  quantity: 100,
  buyPrice: 2500
})
```

### ステップ 3: 変更も即座に反映
```typescript
// バックエンドで name フィールドを追加
.input(z.object({
  name: z.string(),  // ← 追加
  symbol: z.string(),
  // ...
}))

// フロントエンドで保存した瞬間、エラーになる！
addStock.mutate({
  // name: が足りないとエディタが教えてくれる
  symbol: "7203",
  quantity: 100,
  buyPrice: 2500
})
```

## まとめ

tRPC の最大の利点は：

✅ **手動で型を同期する必要がない**
✅ **バックエンドの変更がフロントエンドに即座に反映される**
✅ **タイポや型ミスがエディタ上で即座にわかる**
✅ **コード補完が完璧に効く**
✅ **セットアップが簡単**（GraphQL より遥かに簡単）
✅ **Prisma との相性が抜群**（Prisma の型をそのまま使える）

tRPC を使うと、**フロントエンドとバックエンドの境界がほぼ消えて、まるで同じアプリケーション内で関数を呼んでいるかのような感覚で開発できます**！

これで tRPC の理解は深まりましたか？実際に使ってみるともっとその便利さがわかりますよ！😊

```plaintext
┌─────────────────────────────────────────────────────────────┐
│                    1. バックエンド定義                        │
│  src/server/routers/portfolio.ts                            │
│  export const portfolioRouter = router({ ... })             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ TypeScript の型推論
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    2. tRPC が型を抽出                         │
│  export type AppRouter = typeof appRouter                   │
│  ← この型情報がフロントエンドに共有される                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP 通信（内部的には POST /api/trpc）
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   3. フロントエンドで使用                      │
│  const trpc = createTRPCClient<AppRouter>()                 │
│  ← AppRouter の型情報を使って自動補完・型チェック              │
└─────────────────────────────────────────────────────────────┘
```

```typescript
// src/server/routers/stock.ts
export const stockRouter = router({
  addToPortfolio: publicProcedure
    .input(z.object({
      portfolioId: z.string(),
      symbol: z.string(),
      quantity: z.number(),
      buyPrice: z.number()
    }))
    .mutation(async ({ input }) => {
      return prisma.stock.create({ data: input })
    })
})
```

```typescript
// ファイルを保存した瞬間、フロントエンドで自動補完が効く！
const addStock = trpc.stock.addToPortfolio.useMutation()

addStock.mutate({
  portfolioId: "xxx",
  symbol: "7203",  // トヨタ自動車
  quantity: 100,
  buyPrice: 2500
})
```

```typescript
// バックエンドで name フィールドを追加
.input(z.object({
  name: z.string(),  // ← 追加
  symbol: z.string(),
  // ...
}))

// フロントエンドで保存した瞬間、エラーになる！
addStock.mutate({
  // name: が足りないとエディタが教えてくれる
  symbol: "7203",
  quantity: 100,
  buyPrice: 2500
})
```

```plaintext
┌─────────────────────────────────────────────────────────────┐
│                    1. バックエンド定義                        │
│  src/server/routers/portfolio.ts                            │
│  export const portfolioRouter = router({ ... })             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ TypeScript の型推論
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    2. tRPC が型を抽出                         │
│  export type AppRouter = typeof appRouter                   │
│  ← この型情報がフロントエンドに共有される                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP 通信（内部的には POST /api/trpc）
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   3. フロントエンドで使用                      │
│  const trpc = createTRPCClient<AppRouter>()                 │
│  ← AppRouter の型情報を使って自動補完・型チェック              │
└─────────────────────────────────────────────────────────────┘
```

```typescript
// src/server/routers/stock.ts
export const stockRouter = router({
  addToPortfolio: publicProcedure
    .input(z.object({
      portfolioId: z.string(),
      symbol: z.string(),
      quantity: z.number(),
      buyPrice: z.number()
    }))
    .mutation(async ({ input }) => {
      return prisma.stock.create({ data: input })
    })
})
```

```typescript
// ファイルを保存した瞬間、フロントエンドで自動補完が効く！
const addStock = trpc.stock.addToPortfolio.useMutation()

addStock.mutate({
  portfolioId: "xxx",
  symbol: "7203",  // トヨタ自動車
  quantity: 100,
  buyPrice: 2500
})
```

```typescript
// バックエンドで name フィールドを追加
.input(z.object({
  name: z.string(),  // ← 追加
  symbol: z.string(),
  // ...
}))

// フロントエンドで保存した瞬間、エラーになる！
addStock.mutate({
  // name: が足りないとエディタが教えてくれる
  symbol: "7203",
  quantity: 100,
  buyPrice: 2500
})
```

---

**User**

本当に便利だね！！

ちなみに、今のアプリケーションの設計概念を tRPC と理解していいのかな？

---

**Cursor**

いい質問ですね！でも、**tRPC は設計概念ではなく、あくまで「ツール」の一つ**です。

このアプリケーションの**設計概念（アーキテクチャ）**は別にあります！

## このアプリの設計概念

### 1. **レイヤードアーキテクチャ** (Layered Architecture)

アプリケーションを層（レイヤー）に分けて、責務を明確に分離する設計：

```
┌─────────────────────────────────────────┐
│  プレゼンテーション層 (src/app)          │  ← ルーティング、ページ表示
│  - page.tsx, layout.tsx                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  UI層 (src/features/*/components)       │  ← UIコンポーネント、ユーザー操作
│  - PortfolioList.tsx                    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  API層 (tRPC)                           │  ← フロント↔バック通信（tRPCはここ！）
│  - trpc.portfolio.getAll.useQuery()     │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  ビジネスロジック層 (src/server)         │  ← ビジネスルール、データ処理
│  - routers/, services/                  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  データアクセス層 (Prisma)               │  ← データベース操作（Prismaはここ！）
│  - prisma.portfolio.findMany()          │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  データベース (PostgreSQL/SQLite)        │  ← データの永続化
└─────────────────────────────────────────┘
```

### 2. **機能ベースアーキテクチャ** (Feature-Based Architecture)

コードを「機能」単位で整理：

```
src/features/
├── portfolio/     ← ポートフォリオ機能に関するものは全てここ
│   ├── components/
│   ├── hooks/
│   └── utils/
├── stocks/        ← 株式機能に関するものは全てここ
│   ├── components/
│   ├── hooks/
│   └── utils/
└── auth/          ← 認証機能に関するものは全てここ
```

**利点**: 機能を追加・削除しやすい、テストしやすい、チーム開発で衝突しにくい

### 3. **型駆動開発** (Type-Driven Development)

TypeScript の型システムを中心に開発：

```
Prisma スキーマ定義
    ↓
Prisma が TypeScript の型を自動生成
    ↓
tRPC がその型を使ってAPI定義
    ↓
フロントエンドで型安全に使用
```

すべての型が**単一の情報源（Prisma スキーマ）**から派生する設計

### 4. **関心の分離** (Separation of Concerns)

各ディレクトリが明確な責務を持つ：

| ディレクトリ | 責務 |
|-------------|------|
| `src/app` | ルーティング（URLとページの対応） |
| `src/features` | ビジネスロジック・UI |
| `src/server` | サーバーサイドロジック |
| `src/lib` | インフラ・共通ライブラリ |
| `src/components` | 共通UIコンポーネント |
| `prisma` | データモデル定義 |

## ツールと設計概念の関係

| 要素 | 分類 | 役割 |
|------|------|------|
| **レイヤードアーキテクチャ** | 🏛️ 設計概念 | アプリ全体の構造 |
| **機能ベースアーキテクチャ** | 🏛️ 設計概念 | コードの整理方法 |
| **型駆動開発** | 🏛️ 設計概念 | 開発の進め方 |
| **tRPC** | 🔧 ツール | API層の実装 |
| **Prisma** | 🔧 ツール | データアクセス層の実装 |
| **Next.js** | 🔧 フレームワーク | プレゼンテーション層の実装 |

## つまり...

### ❌ 間違った理解
「このアプリは tRPC で設計されている」

### ✅ 正しい理解
「このアプリは**レイヤードアーキテクチャ + 機能ベースアーキテクチャ**で設計されていて、その実装に **tRPC**（API層）、**Prisma**（データアクセス層）、**Next.js**（プレゼンテーション層）などのツールを使っている」

## 例えで説明すると

🏠 **家の設計**に例えると：

- **設計概念**: 「平屋建て」「2階建て」「バリアフリー」など
- **ツール**: ドリル、のこぎり、ペンキなど

tRPC は「とても便利な電動ドリル」のようなもので、家の設計そのものではありません！

---

**このアプリの設計の核心**は、
1. **レイヤーを分けて責務を明確にする**
2. **機能単位でコードを整理する**
3. **型安全性を重視する**

という考え方で、tRPC はそれを実現するための「優れたツール」という位置づけです！

理解できましたか？😊

```plaintext
┌─────────────────────────────────────────┐
│  プレゼンテーション層 (src/app)          │  ← ルーティング、ページ表示
│  - page.tsx, layout.tsx                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  UI層 (src/features/*/components)       │  ← UIコンポーネント、ユーザー操作
│  - PortfolioList.tsx                    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  API層 (tRPC)                           │  ← フロント↔バック通信（tRPCはここ！）
│  - trpc.portfolio.getAll.useQuery()     │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  ビジネスロジック層 (src/server)         │  ← ビジネスルール、データ処理
│  - routers/, services/                  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  データアクセス層 (Prisma)               │  ← データベース操作（Prismaはここ！）
│  - prisma.portfolio.findMany()          │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  データベース (PostgreSQL/SQLite)        │  ← データの永続化
└─────────────────────────────────────────┘
```

```plaintext
src/features/
├── portfolio/     ← ポートフォリオ機能に関するものは全てここ
│   ├── components/
│   ├── hooks/
│   └── utils/
├── stocks/        ← 株式機能に関するものは全てここ
│   ├── components/
│   ├── hooks/
│   └── utils/
└── auth/          ← 認証機能に関するものは全てここ
```

```plaintext
Prisma スキーマ定義
    ↓
Prisma が TypeScript の型を自動生成
    ↓
tRPC がその型を使ってAPI定義
    ↓
フロントエンドで型安全に使用
```

---

**User**

できた ！！！

> このアプリはレイヤードアーキテクチャ + 機能ベースアーキテクチャで設計されていて、その実装に tRPC（API層）、Prisma（データアクセス層）、Next.js（プレゼンテーション層）などのツールを使っている

このあたりをREADMEにかっこよく記載してくれる？

---

**Cursor**

READMEにアーキテクチャの説明をかっこよく追加しますね！✨

```markdown
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

```
mokabu/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 認証関連のルートグループ
│   │   ├── api/               # API ルート
│   │   ├── portfolio/         # ポートフォリオページ
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx           # トップページ
│   ├── components/            # React コンポーネント
│   │   ├── ui/                # shadcn/ui コンポーネント
│   │   ├── portfolio/         # ポートフォリオ関連コンポーネント
│   │   └── layouts/           # レイアウトコンポーネント
│   ├── lib/                   # ユーティリティ・ヘルパー
│   │   ├── db.ts              # Prisma クライアント
│   │   ├── trpc/              # tRPC 設定
│   │   └── utils.ts           # 汎用ユーティリティ
│   ├── server/                # サーバーサイドロジック
│   │   ├── routers/           # tRPC ルーター
│   │   └── context.ts         # tRPC コンテキスト
│   └── types/                 # 型定義
├── prisma/
│   ├── schema.prisma          # Prisma スキーマ定義
│   ├── migrations/            # マイグレーションファイル
│   └── seed.ts                # シードデータ
├── public/                    # 静的ファイル
├── tests/                     # テストファイル
├── .env.example               # 環境変数のサンプル
├── .eslintrc.json            # ESLint 設定
├── .prettierrc               # Prettier 設定
├── next.config.js            # Next.js 設定
├── tailwind.config.ts        # Tailwind CSS 設定
├── tsconfig.json             # TypeScript 設定
└── package.json              # 依存関係
```

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


```

```markdown
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


```

完璧です！✨ READMEにアーキテクチャの説明をかっこよく追加しました！

## 追加・更新した内容

### 🏛️ アーキテクチャ設計セクション

1. **レイヤードアーキテクチャ**
   - 6層の明確な分離をビジュアル図で表示
   - 各層の責務を明記

2. **機能ベースアーキテクチャ**
   - 高凝集度・低結合度のメリットを説明
   - 機能単位での整理方法を図示

3. **型駆動開発**
   - Prismaスキーマからフロントエンドまでの型の流れを図示
   - 利点を4つ明記

4. **自動生成による開発効率化**（既存を維持）

5. **スケーラビリティ**（既存に追加）

### 📁 ディレクトリ構造の更新

- `src/features` を中心とした機能ベースの構造に変更
- 各ディレクトリの具体的なファイル例を追加
- 責務の表を追加して、どのディレクトリが何の層なのかを明確化

---

これで、誰が見ても
> **「このアプリはレイヤードアーキテクチャ + 機能ベースアーキテクチャで設計されていて、その実装に tRPC（API層）、Prisma（データアクセス層）、Next.js（プレゼンテーション層）などのツールを使っている」**

ということが一目でわかるREADMEになりました！🎉

次は実際にプロジェクトのセットアップを進めましょうか？

---

**User**

API通信層とビジネスロジック層の違いがいまいちつかめない...

---

**Cursor**

いい質問です！確かにこの2つは混乱しやすいですよね。具体的なコードで説明しますね！

## わかりやすい例えで説明

### 🏢 会社で例えると

- **API通信層（tRPC）**: 電話システム・メール・FAX など「通信インフラ」
- **ビジネスロジック層（src/server）**: 実際に業務を行う「社員」と「業務ルール」

電話システムは「どうやって伝えるか」を担当し、社員は「何を伝えるか、どう処理するか」を担当します。

## コードで具体的に見てみよう

### ❌ 誤解しやすい考え方

「tRPC = バックエンド」と思ってしまうと混乱します。

### ✅ 正しい理解

tRPC は「橋渡し役」で、実際の処理は `src/server` が行います。

---

## 実際のコード例

### 1️⃣ フロントエンド（UI層）

```typescript
// src/features/portfolio/components/PortfolioList.tsx
'use client'
import { trpc } from '@/lib/trpc/client'

export function PortfolioList() {
  // ここで tRPC を使って API を呼び出す
  const { data } = trpc.portfolio.getAll.useQuery()
  //              ↑ tRPC は「電話をかける役」
  
  return <div>...</div>
}
```

### 2️⃣ API通信層（tRPC - 橋渡し）

```typescript
// src/lib/trpc/client.ts
// tRPC の設定（クライアント側）
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',  // ← ここにHTTPリクエストを送る
    }),
  ],
})
```

**tRPC がやること:**
- フロントエンドの関数呼び出しを HTTP リクエストに変換
- バックエンドからの HTTP レスポンスをフロントエンドに返す
- **型情報を保持したまま通信する**（これが tRPC の魔法！）

### 3️⃣ ビジネスロジック層（src/server - 実際の処理）

```typescript
// src/server/routers/portfolio.ts
import { router, publicProcedure } from '../trpc'
import { portfolioService } from '../services/portfolioService'
import { z } from 'zod'

export const portfolioRouter = router({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // ↓ ここが「実際のビジネスロジック」
      return portfolioService.getAll(ctx.userId)
    }),
  
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1, '名前は必須です'),
      initialAmount: z.number().min(0)
    }))
    .mutation(async ({ input, ctx }) => {
      // ↓ ここが「実際のビジネスロジック」
      
      // バリデーション（ビジネスルール）
      if (input.initialAmount > 1000000000) {
        throw new Error('初期金額が大きすぎます')
      }
      
      // データベース操作
      const portfolio = await portfolioService.create({
        name: input.name,
        userId: ctx.userId,
        amount: input.initialAmount
      })
      
      // 通知を送る（ビジネスロジック）
      await sendNotification(ctx.userId, 'ポートフォリオを作成しました')
      
      return portfolio
    })
})
```

```typescript
// src/server/services/portfolioService.ts
// より複雑なビジネスロジックはサービス層に
import { prisma } from '@/lib/prisma'

export const portfolioService = {
  async getAll(userId: string) {
    // データ取得ロジック
    const portfolios = await prisma.portfolio.findMany({
      where: { userId },
      include: { stocks: true }
    })
    
    // 計算ロジック（ビジネスルール）
    return portfolios.map(p => ({
      ...p,
      totalValue: p.stocks.reduce((sum, stock) => 
        sum + (stock.currentPrice ?? 0) * stock.quantity, 0
      ),
      totalProfit: p.stocks.reduce((sum, stock) => 
        sum + ((stock.currentPrice ?? 0) - stock.buyPrice) * stock.quantity, 0
      )
    }))
  },
  
  async create(data: { name: string, userId: string, amount: number }) {
    // データ作成ロジック
    return prisma.portfolio.create({
      data: {
        name: data.name,
        userId: data.userId,
        initialAmount: data.amount
      }
    })
  }
}
```

---

## 🔍 違いを表で整理

| 項目 | API通信層（tRPC） | ビジネスロジック層（src/server） |
|------|------------------|--------------------------------|
| **役割** | フロント↔バック間の通信インフラ | 実際のビジネスルール・データ処理 |
| **やること** | ・HTTP通信<br>・型の伝達<br>・リクエスト/レスポンス変換 | ・バリデーション<br>・DB操作<br>・計算処理<br>・ビジネスルール適用 |
| **例え** | 電話システム、郵便配達員 | 実際に仕事をする社員 |
| **配置場所** | ・`src/lib/trpc/`（設定）<br>・`src/app/api/trpc/`（エンドポイント） | ・`src/server/routers/`<br>・`src/server/services/` |
| **コード量** | 少ない（設定のみ） | 多い（実際のロジック） |
| **テストの焦点** | 通信が正しく行われるか | ビジネスルールが正しいか |

## 🎯 実際の処理の流れ

```
1. フロントエンド（UI層）
   ↓ 「ポートフォリオの一覧が欲しい！」
   trpc.portfolio.getAll.useQuery()
   
2. API通信層（tRPC）
   ↓ 「HTTPリクエストに変換して送るよ」
   POST /api/trpc
   body: { query: "portfolio.getAll" }
   
3. API通信層（tRPC）- サーバー側
   ↓ 「リクエストを受け取って、該当するルーターに渡すよ」
   
4. ビジネスロジック層（src/server/routers）
   ↓ 「ビジネスロジックを実行するよ」
   portfolioService.getAll(userId)
   ↓
   - ユーザー認証チェック
   - データベースから取得
   - 損益計算
   - データ整形
   
5. API通信層（tRPC）
   ↓ 「結果を型付きでフロントに返すよ」
   HTTPレスポンス + 型情報
   
6. フロントエンド（UI層）
   ↓ 「型付きでデータを受け取った！表示するよ」
   data が自動補完・型チェック付きで使える
```

## 📝 まとめ

### API通信層（tRPC）
- **「どうやって」通信するか**を担当
- 通信の仕組み、型の伝達
- 薄い、設定が中心

### ビジネスロジック層（src/server）
- **「何を」処理するか**を担当
- 実際のビジネスルール、計算、DB操作
- 厚い、アプリの核心部分

---

**もっと簡単に言うと:**

- **tRPC**: 「郵便配達員」- 手紙（データ）を運ぶだけ、中身は読まない
- **src/server**: 「郵便局の社員」- 手紙を仕分けたり、処理したり、実際の業務をする

これで理解できましたか？😊

```typescript
// src/features/portfolio/components/PortfolioList.tsx
'use client'
import { trpc } from '@/lib/trpc/client'

export function PortfolioList() {
  // ここで tRPC を使って API を呼び出す
  const { data } = trpc.portfolio.getAll.useQuery()
  //              ↑ tRPC は「電話をかける役」
  
  return <div>...</div>
}
```

```typescript
// src/lib/trpc/client.ts
// tRPC の設定（クライアント側）
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',  // ← ここにHTTPリクエストを送る
    }),
  ],
})
```

```typescript
// src/server/routers/portfolio.ts
import { router, publicProcedure } from '../trpc'
import { portfolioService } from '../services/portfolioService'
import { z } from 'zod'

export const portfolioRouter = router({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // ↓ ここが「実際のビジネスロジック」
      return portfolioService.getAll(ctx.userId)
    }),
  
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1, '名前は必須です'),
      initialAmount: z.number().min(0)
    }))
    .mutation(async ({ input, ctx }) => {
      // ↓ ここが「実際のビジネスロジック」
      
      // バリデーション（ビジネスルール）
      if (input.initialAmount > 1000000000) {
        throw new Error('初期金額が大きすぎます')
      }
      
      // データベース操作
      const portfolio = await portfolioService.create({
        name: input.name,
        userId: ctx.userId,
        amount: input.initialAmount
      })
      
      // 通知を送る（ビジネスロジック）
      await sendNotification(ctx.userId, 'ポートフォリオを作成しました')
      
      return portfolio
    })
})
```

```typescript
// src/server/services/portfolioService.ts
// より複雑なビジネスロジックはサービス層に
import { prisma } from '@/lib/prisma'

export const portfolioService = {
  async getAll(userId: string) {
    // データ取得ロジック
    const portfolios = await prisma.portfolio.findMany({
      where: { userId },
      include: { stocks: true }
    })
    
    // 計算ロジック（ビジネスルール）
    return portfolios.map(p => ({
      ...p,
      totalValue: p.stocks.reduce((sum, stock) => 
        sum + (stock.currentPrice ?? 0) * stock.quantity, 0
      ),
      totalProfit: p.stocks.reduce((sum, stock) => 
        sum + ((stock.currentPrice ?? 0) - stock.buyPrice) * stock.quantity, 0
      )
    }))
  },
  
  async create(data: { name: string, userId: string, amount: number }) {
    // データ作成ロジック
    return prisma.portfolio.create({
      data: {
        name: data.name,
        userId: data.userId,
        initialAmount: data.amount
      }
    })
  }
}
```

```plaintext
1. フロントエンド（UI層）
   ↓ 「ポートフォリオの一覧が欲しい！」
   trpc.portfolio.getAll.useQuery()
   
2. API通信層（tRPC）
   ↓ 「HTTPリクエストに変換して送るよ」
   POST /api/trpc
   body: { query: "portfolio.getAll" }
   
3. API通信層（tRPC）- サーバー側
   ↓ 「リクエストを受け取って、該当するルーターに渡すよ」
   
4. ビジネスロジック層（src/server/routers）
   ↓ 「ビジネスロジックを実行するよ」
   portfolioService.getAll(userId)
   ↓
   - ユーザー認証チェック
   - データベースから取得
   - 損益計算
   - データ整形
   
5. API通信層（tRPC）
   ↓ 「結果を型付きでフロントに返すよ」
   HTTPレスポンス + 型情報
   
6. フロントエンド（UI層）
   ↓ 「型付きでデータを受け取った！表示するよ」
   data が自動補完・型チェック付きで使える
```

---

**User**

REST API  との違いもわかりやすく教えてくれる？

---

**Cursor**

REST API と tRPC の違いを、同じ機能を実装する場合で比較してみますね！

## 📋 同じ機能を実装してみる

**やりたいこと**: ポートフォリオを作成する

---

## 🔵 REST API の場合

### バックエンド (API)

```typescript
// src/app/api/portfolios/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // バリデーションを手動で書く
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: '名前は必須です' },
        { status: 400 }
      )
    }
    
    if (!body.userId || typeof body.userId !== 'string') {
      return NextResponse.json(
        { error: 'ユーザーIDは必須です' },
        { status: 400 }
      )
    }
    
    // データ作成
    const portfolio = await prisma.portfolio.create({
      data: {
        name: body.name,
        userId: body.userId
      }
    })
    
    return NextResponse.json(portfolio)
    
  } catch (error) {
    return NextResponse.json(
      { error: 'サーバーエラー' },
      { status: 500 }
    )
  }
}

// GET も別途定義
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  
  const portfolios = await prisma.portfolio.findMany({
    where: userId ? { userId } : undefined
  })
  
  return NextResponse.json(portfolios)
}
```

### フロントエンド

```typescript
// src/features/portfolio/components/CreatePortfolioForm.tsx
'use client'
import { useState } from 'react'

// 型を手動で定義しないといけない
interface Portfolio {
  id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
}

interface ErrorResponse {
  error: string
}

export function CreatePortfolioForm() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // fetch で手動で HTTP リクエスト
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          userId: 'user123'  // ← タイポしても気づかない！
        })
      })
      
      // エラーハンドリングを手動で書く
      if (!response.ok) {
        const error: ErrorResponse = await response.json()
        setError(error.error)
        return
      }
      
      // 型アサーションが必要
      const portfolio: Portfolio = await response.json()
      
      // portfolio. ← ここで自動補完は効くが、
      //             バックエンドと型が一致してるか保証なし！
      
      console.log('作成成功:', portfolio)
      
    } catch (err) {
      setError('ネットワークエラー')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '作成中...' : '作成'}
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
```

### データ取得の場合

```typescript
// ポートフォリオ一覧を取得
const [portfolios, setPortfolios] = useState<Portfolio[]>([])

useEffect(() => {
  fetch('/api/portfolios?userId=user123')
    .then(res => res.json())
    .then(data => setPortfolios(data))  // ← 型が any！
}, [])
```

---

## 🟢 tRPC の場合

### バックエンド (API)

```typescript
// src/server/routers/portfolio.ts
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const portfolioRouter = router({
  // 作成
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1, '名前は必須です'),
      userId: z.string()
    }))
    .mutation(async ({ input }) => {
      return prisma.portfolio.create({
        data: input
      })
    }),
  
  // 取得
  getAll: publicProcedure
    .input(z.object({
      userId: z.string().optional()
    }).optional())
    .query(async ({ input }) => {
      return prisma.portfolio.findMany({
        where: input?.userId ? { userId: input.userId } : undefined
      })
    })
})
```

### フロントエンド

```typescript
// src/features/portfolio/components/CreatePortfolioForm.tsx
'use client'
import { useState } from 'react'
import { trpc } from '@/lib/trpc/client'

// 型定義は一切不要！tRPC が自動で型を提供

export function CreatePortfolioForm() {
  const [name, setName] = useState('')
  
  // useMutation で簡単に使える
  const createMutation = trpc.portfolio.create.useMutation()
  
  const handleSubmit = async () => {
    try {
      const portfolio = await createMutation.mutateAsync({
        name,
        userId: 'user123'
        // ↑ ここで間違った型を渡すと、エディタ上でエラーが出る！
        // userld: ← タイポすると赤線が出る
      })
      
      // portfolio の型が自動推論される！
      console.log(portfolio.id)  // ← 自動補完が効く
      console.log(portfolio.name) // ← 自動補完が効く
      // portfolio.invalidField ← 存在しないフィールドはエラー
      
    } catch (error) {
      // エラーは自動的にキャッチされる
      console.error(error)
    }
  }
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button 
        onClick={handleSubmit} 
        disabled={createMutation.isLoading}
      >
        {createMutation.isLoading ? '作成中...' : '作成'}
      </button>
      {createMutation.error && (
        <p>{createMutation.error.message}</p>
      )}
    </div>
  )
}
```

### データ取得の場合

```typescript
// ポートフォリオ一覧を取得
const { data: portfolios } = trpc.portfolio.getAll.useQuery({
  userId: 'user123'
})

// portfolios の型が自動推論される！
// portfolios: (Portfolio & { ... })[] | undefined
```

---

## 📊 比較表

| 項目 | REST API | tRPC |
|------|---------|------|
| **型の定義** | 手動で両方に型定義が必要 | **自動で型が共有される** ✨ |
| **バリデーション** | 手動で if 文を書く | Zod で宣言的に定義 |
| **エラーハンドリング** | try-catch + レスポンスコード確認 | 自動的に処理される |
| **自動補完** | 手動で定義した型のみ | **完璧に効く** ✨ |
| **型の同期** | バックエンド変更時に手動更新 | **自動で同期** ✨ |
| **リクエスト作成** | fetch を手動で書く | フック（useQuery/useMutation）で簡単 |
| **コード量** | 多い（50行以上） | 少ない（20行程度） |
| **タイポ検出** | 実行時エラー | **コンパイル時エラー** ✨ |
| **学習コスト** | 低い（HTTPの知識） | 中程度（tRPCの概念） |
| **適用範囲** | どこでも使える | TypeScript フルスタックのみ |
| **外部からのアクセス** | 可能（モバイルアプリなど） | 基本的に同じプロジェクト内 |

---

## 🎯 実際の開発での違い

### REST API の開発フロー

```
1. バックエンド側
   - API エンドポイント作成 (/api/portfolios)
   - バリデーションを手動実装
   - レスポンスの型を定義

2. 型定義ファイル作成
   - interface Portfolio { ... } を手動定義
   - フロントとバックで型を手動で同期

3. フロントエンド側
   - fetch でリクエスト作成
   - エラーハンドリング実装
   - 型アサーション

4. バックエンドの変更時
   - API の変更
   - 型定義ファイルを手動更新 ← 忘れがち！
   - フロントのコードを修正
   
⚠️ 型の不一致は実行時まで気づかない
```

### tRPC の開発フロー

```
1. バックエンド側
   - tRPC ルーターに処理を追加
   - Zod でバリデーション定義

2. フロントエンド側
   - ファイル保存した瞬間、型が自動同期
   - trpc.xxx.useQuery() で呼び出し
   - 自動補完が即座に効く

3. バックエンドの変更時
   - ルーターを変更
   - ファイル保存
   - フロントで自動的にエラーが表示される ← 安心！
   
✅ 型の不一致はエディタ上で即座にわかる
```

---

## 🏢 レストランで例えると

### REST API = 普通のレストラン

**注文時:**
```
客: 「すみません、オムライスください」
店員: 「オムライスですね、かしこまりました」

（厨房に口頭で伝える）
店員 → 厨房: 「オムライス1つ！」

厨房: 「了解！」
（料理を作る）

店員: （料理を運ぶ）
「お待たせしました、オムライスです」

客: 「あれ、これカレーライスじゃない？」
店員: 「すみません！間違えました！」
```

**問題点:**
- 口頭のやり取りなので、聞き間違い・伝え間違いが起きる
- 料理が出てくるまで間違いに気づかない
- メニュー変更時に、客に伝え忘れることがある

### tRPC = タブレット注文のレストラン

**注文時:**
```
客: （タブレットで「オムライス」をタップ）

システム: 
  - メニューにあるものしか選べない
  - 選択肢が自動表示される
  - 注文内容が自動で厨房に送信される

厨房: （タブレットに表示）
  「オムライス 1つ」

（料理を作って提供）

客: 「完璧！」
```

**利点:**
- メニューにないものは注文できない（型安全）
- タップするだけで、間違いがない
- メニュー変更はリアルタイムで反映
- 注文履歴も自動記録

---

## 🤔 どちらを使うべき？

### REST API を使うべき場合

✅ 外部からのアクセスが必要（モバイルアプリ、他社システムなど）
✅ 公開 API を提供する
✅ TypeScript 以外のクライアントもある
✅ HTTP の標準に従いたい

### tRPC を使うべき場合

✅ Next.js のようなフルスタック TypeScript プロジェクト
✅ 型安全性を最重視
✅ 開発速度を上げたい
✅ 自動補完を完璧にしたい
✅ 内部 API（フロントとバックが同じリポジトリ）

---

## 📝 まとめ

| | REST API | tRPC |
|---|---|---|
| **例え** | 普通のレストラン（口頭注文） | タブレット注文レストラン |
| **型安全性** | 手動で頑張る | 自動で保証される |
| **開発速度** | 遅い（手動作業多い） | 速い（自動生成） |
| **適用範囲** | 広い | TypeScript フルスタックのみ |
| **ベストケース** | 公開API、外部連携 | 社内ツール、自社プロダクト |

**このプロジェクト（Mokabu）では tRPC が最適！**
- フロントもバックも同じ Next.js プロジェクト
- 外部公開の予定なし
- 型安全性と開発速度を重視

これで REST API と tRPC の違いが理解できましたか？😊

```typescript
// src/app/api/portfolios/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // バリデーションを手動で書く
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: '名前は必須です' },
        { status: 400 }
      )
    }
    
    if (!body.userId || typeof body.userId !== 'string') {
      return NextResponse.json(
        { error: 'ユーザーIDは必須です' },
        { status: 400 }
      )
    }
    
    // データ作成
    const portfolio = await prisma.portfolio.create({
      data: {
        name: body.name,
        userId: body.userId
      }
    })
    
    return NextResponse.json(portfolio)
    
  } catch (error) {
    return NextResponse.json(
      { error: 'サーバーエラー' },
      { status: 500 }
    )
  }
}

// GET も別途定義
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  
  const portfolios = await prisma.portfolio.findMany({
    where: userId ? { userId } : undefined
  })
  
  return NextResponse.json(portfolios)
}
```

```typescript
// src/features/portfolio/components/CreatePortfolioForm.tsx
'use client'
import { useState } from 'react'

// 型を手動で定義しないといけない
interface Portfolio {
  id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
}

interface ErrorResponse {
  error: string
}

export function CreatePortfolioForm() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // fetch で手動で HTTP リクエスト
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          userId: 'user123'  // ← タイポしても気づかない！
        })
      })
      
      // エラーハンドリングを手動で書く
      if (!response.ok) {
        const error: ErrorResponse = await response.json()
        setError(error.error)
        return
      }
      
      // 型アサーションが必要
      const portfolio: Portfolio = await response.json()
      
      // portfolio. ← ここで自動補完は効くが、
      //             バックエンドと型が一致してるか保証なし！
      
      console.log('作成成功:', portfolio)
      
    } catch (err) {
      setError('ネットワークエラー')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '作成中...' : '作成'}
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
```

```typescript
// ポートフォリオ一覧を取得
const [portfolios, setPortfolios] = useState<Portfolio[]>([])

useEffect(() => {
  fetch('/api/portfolios?userId=user123')
    .then(res => res.json())
    .then(data => setPortfolios(data))  // ← 型が any！
}, [])
```

```typescript
// src/server/routers/portfolio.ts
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const portfolioRouter = router({
  // 作成
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1, '名前は必須です'),
      userId: z.string()
    }))
    .mutation(async ({ input }) => {
      return prisma.portfolio.create({
        data: input
      })
    }),
  
  // 取得
  getAll: publicProcedure
    .input(z.object({
      userId: z.string().optional()
    }).optional())
    .query(async ({ input }) => {
      return prisma.portfolio.findMany({
        where: input?.userId ? { userId: input.userId } : undefined
      })
    })
})
```

```typescript
// src/features/portfolio/components/CreatePortfolioForm.tsx
'use client'
import { useState } from 'react'
import { trpc } from '@/lib/trpc/client'

// 型定義は一切不要！tRPC が自動で型を提供

export function CreatePortfolioForm() {
  const [name, setName] = useState('')
  
  // useMutation で簡単に使える
  const createMutation = trpc.portfolio.create.useMutation()
  
  const handleSubmit = async () => {
    try {
      const portfolio = await createMutation.mutateAsync({
        name,
        userId: 'user123'
        // ↑ ここで間違った型を渡すと、エディタ上でエラーが出る！
        // userld: ← タイポすると赤線が出る
      })
      
      // portfolio の型が自動推論される！
      console.log(portfolio.id)  // ← 自動補完が効く
      console.log(portfolio.name) // ← 自動補完が効く
      // portfolio.invalidField ← 存在しないフィールドはエラー
      
    } catch (error) {
      // エラーは自動的にキャッチされる
      console.error(error)
    }
  }
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button 
        onClick={handleSubmit} 
        disabled={createMutation.isLoading}
      >
        {createMutation.isLoading ? '作成中...' : '作成'}
      </button>
      {createMutation.error && (
        <p>{createMutation.error.message}</p>
      )}
    </div>
  )
}
```

```typescript
// ポートフォリオ一覧を取得
const { data: portfolios } = trpc.portfolio.getAll.useQuery({
  userId: 'user123'
})

// portfolios の型が自動推論される！
// portfolios: (Portfolio & { ... })[] | undefined
```

```plaintext
1. バックエンド側
   - API エンドポイント作成 (/api/portfolios)
   - バリデーションを手動実装
   - レスポンスの型を定義

2. 型定義ファイル作成
   - interface Portfolio { ... } を手動定義
   - フロントとバックで型を手動で同期

3. フロントエンド側
   - fetch でリクエスト作成
   - エラーハンドリング実装
   - 型アサーション

4. バックエンドの変更時
   - API の変更
   - 型定義ファイルを手動更新 ← 忘れがち！
   - フロントのコードを修正
   
⚠️ 型の不一致は実行時まで気づかない
```

```plaintext
1. バックエンド側
   - tRPC ルーターに処理を追加
   - Zod でバリデーション定義

2. フロントエンド側
   - ファイル保存した瞬間、型が自動同期
   - trpc.xxx.useQuery() で呼び出し
   - 自動補完が即座に効く

3. バックエンドの変更時
   - ルーターを変更
   - ファイル保存
   - フロントで自動的にエラーが表示される ← 安心！
   
✅ 型の不一致はエディタ上で即座にわかる
```

```plaintext
客: 「すみません、オムライスください」
店員: 「オムライスですね、かしこまりました」

（厨房に口頭で伝える）
店員 → 厨房: 「オムライス1つ！」

厨房: 「了解！」
（料理を作る）

店員: （料理を運ぶ）
「お待たせしました、オムライスです」

客: 「あれ、これカレーライスじゃない？」
店員: 「すみません！間違えました！」
```

```plaintext
客: （タブレットで「オムライス」をタップ）

システム: 
  - メニューにあるものしか選べない
  - 選択肢が自動表示される
  - 注文内容が自動で厨房に送信される

厨房: （タブレットに表示）
  「オムライス 1つ」

（料理を作って提供）

客: 「完璧！」
```

---

**User**

なるほど。なるほど。ありがとう。

例えば、フロントエンドとバックエンドを別のプロジェクトでそれぞれ実装したい場合は、tRPCの採用は難しいのかな？

---

**Cursor**

いい質問ですね！**技術的には可能だけど、かなり面倒になります**。そして tRPC のメリットが大きく減ってしまいます。

## 🔍 別プロジェクトで tRPC を使う場合の課題

### 問題点 1: 型情報の共有が難しい

tRPC の最大の魅力は「型の自動同期」ですが、これは**同じプロジェクト（同じ `node_modules`）** にいることが前提です。

```
同じプロジェクト（tRPC向き）:
my-app/
├── src/
│   ├── app/           ← フロントエンド
│   └── server/        ← バックエンド
└── node_modules/      ← 同じ依存関係

別プロジェクト（tRPC不向き）:
frontend/
├── src/
└── node_modules/      ← 別々の依存関係

backend/
├── src/
└── node_modules/      ← 別々の依存関係
```

### 問題点 2: 型の同期タイミングのズレ

```
バックエンド側で変更:
1. API を変更
2. ビルド
3. デプロイ
4. npm パッケージとして公開？
5. フロントエンド側で npm install
6. やっと型が同期される

↑ これでは「リアルタイムの型同期」という
   tRPC の最大のメリットが失われる
```

---

## 💡 別プロジェクトで tRPC を使う方法

### 方法 1: モノレポ（Monorepo）にする

別プロジェクトだけど、**同じリポジトリ内**で管理する方法です。

```
my-monorepo/
├── apps/
│   ├── frontend/          # Next.js フロントエンド
│   │   ├── package.json
│   │   └── src/
│   └── backend/           # Express/Fastify バックエンド
│       ├── package.json
│       └── src/
├── packages/
│   └── api-types/         # tRPC の型を共有するパッケージ
│       ├── package.json
│       └── src/
│           └── router.ts  # tRPC ルーター定義
├── package.json           # ルートパッケージ
└── pnpm-workspace.yaml    # モノレポ設定
```

**ツール:**
- **Turborepo** - Vercel製のモノレポツール
- **Nx** - より高機能なモノレポツール
- **pnpm workspace** - シンプルなワークスペース管理

**利点:**
- ✅ 型の自動同期ができる
- ✅ コード変更が即座に反映
- ✅ 依存関係を共有できる

**欠点:**
- ⚠️ 別プロジェクトではあるが、別リポジトリではない
- ⚠️ デプロイが少し複雑になる
- ⚠️ モノレポツールの学習が必要

### 方法 2: npm パッケージで型を共有

バックエンドの型を npm パッケージとして公開し、フロントエンドでインストールする。

```
1. バックエンド側
   - tRPC ルーターを npm パッケージとして公開
   - @my-company/api-types など

2. フロントエンド側
   - npm install @my-company/api-types
   - その型を使って tRPC クライアントを作成
```

**利点:**
- ✅ 完全に別リポジトリにできる
- ✅ 型の恩恵は受けられる

**欠点:**
- ❌ バックエンド変更時、パッケージを公開し直す必要
- ❌ フロントエンド側で再インストールが必要
- ❌ リアルタイムの型同期ではない
- ❌ バージョン管理が面倒

---

## 🆚 別プロジェクトの場合の選択肢

### tRPC（モノレポ構成）

```
適している: 
- 同じ会社・チームで開発
- フロントもバックも TypeScript
- 型安全性を最重視
- デプロイ先は別でもOK（Vercel + AWS Lambda など）

構成例:
my-app/          # モノレポ
├── apps/
│   ├── web/     # Next.js → Vercel にデプロイ
│   └── api/     # tRPC API → AWS Lambda にデプロイ
```

### GraphQL + Codegen

```typescript
適している:
- 完全に別リポジトリ
- 複数のクライアント（Web, iOS, Android）
- 柔軟なクエリが必要

# バックエンド: GraphQL API
type Portfolio {
  id: ID!
  name: String!
  stocks: [Stock!]!
}

# フロントエンド: GraphQL Codegen で型を自動生成
npm install -g @graphql-codegen/cli
graphql-codegen --config codegen.yml
```

**利点:**
- ✅ 別リポジトリでもOK
- ✅ 型を自動生成できる
- ✅ 柔軟なクエリ
- ✅ 多言語対応

**欠点:**
- ⚠️ セットアップが複雑
- ⚠️ スキーマ定義が必要
- ⚠️ tRPC より学習コスト高

### REST API + OpenAPI (Swagger)

```yaml
適している:
- 完全に別リポジトリ
- 公開APIの可能性がある
- チームが別々
- 多様なクライアント

# OpenAPI 定義から TypeScript の型を生成
openapi: 3.0.0
paths:
  /api/portfolios:
    get:
      responses:
        '200':
          schema:
            type: array
            items:
              $ref: '#/components/schemas/Portfolio'
```

**ツール:**
- `openapi-typescript` - OpenAPI → TypeScript 型生成
- `orval` - OpenAPI → React Query フック生成

**利点:**
- ✅ 完全に別リポジトリ
- ✅ 標準的なHTTP API
- ✅ ドキュメント自動生成
- ✅ 型生成可能

**欠点:**
- ⚠️ tRPC ほどシームレスではない
- ⚠️ OpenAPI 定義の保守が必要

---

## 📊 別プロジェクトの場合の比較表

| 構成 | 型安全性 | リアルタイム型同期 | セットアップ | リポジトリ分離 | 学習コスト |
|------|---------|------------------|------------|--------------|-----------|
| **tRPC（モノレポ）** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⚠️ 同じリポジトリ | ⭐⭐⭐⭐ |
| **tRPC（npm共有）** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ✅ 別リポジトリ | ⭐⭐⭐ |
| **GraphQL + Codegen** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ✅ 別リポジトリ | ⭐⭐ |
| **REST + OpenAPI** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ✅ 別リポジトリ | ⭐⭐⭐⭐ |
| **REST（型定義手動）** | ⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ✅ 別リポジトリ | ⭐⭐⭐⭐⭐ |

---

## 🎯 結論とおすすめ

### ✅ tRPC が最適なケース

```
✓ フロントとバックが同じリポジトリ
✓ または、モノレポ構成にできる
✓ 同じチーム・会社で開発
✓ TypeScript フルスタック
✓ 型安全性を最重視

→ 今回の Mokabu プロジェクトはこれ！
```

### ⚠️ tRPC が微妙なケース

```
✗ 完全に別リポジトリにしたい
✗ フロントとバックのチームが別
✗ 複数の異なるクライアント（Web, Mobile, 他社システム）
✗ 公開APIにする可能性がある

→ GraphQL + Codegen または REST + OpenAPI を検討
```

### 🏗️ モノレポなら別プロジェクトでもOK！

```
my-monorepo/
├── apps/
│   ├── frontend/    # Next.js → Vercel
│   └── api/         # Express → AWS
└── packages/
    └── shared-types/ # tRPC 型を共有

デプロイ先は別々でOK
リポジトリは1つ
型は自動同期✨
```

---

## 💡 まとめ

**Q: 別プロジェクトで tRPC は難しい？**

**A: 
- **別リポジトリ**: かなり難しい（tRPCのメリット半減）
- **モノレポ（別プロジェクト、同じリポジトリ）**: 全然OK！むしろ推奨**

**おすすめ:**
- 同じリポジトリでOKなら → **tRPC**（今回のMokabu）
- モノレポにできるなら → **tRPC + Turborepo**
- 完全に別リポジトリなら → **GraphQL + Codegen** または **REST + OpenAPI**

理解できましたか？😊

```plaintext
同じプロジェクト（tRPC向き）:
my-app/
├── src/
│   ├── app/           ← フロントエンド
│   └── server/        ← バックエンド
└── node_modules/      ← 同じ依存関係

別プロジェクト（tRPC不向き）:
frontend/
├── src/
└── node_modules/      ← 別々の依存関係

backend/
├── src/
└── node_modules/      ← 別々の依存関係
```

```plaintext
バックエンド側で変更:
1. API を変更
2. ビルド
3. デプロイ
4. npm パッケージとして公開？
5. フロントエンド側で npm install
6. やっと型が同期される

↑ これでは「リアルタイムの型同期」という
   tRPC の最大のメリットが失われる
```

```plaintext
my-monorepo/
├── apps/
│   ├── frontend/          # Next.js フロントエンド
│   │   ├── package.json
│   │   └── src/
│   └── backend/           # Express/Fastify バックエンド
│       ├── package.json
│       └── src/
├── packages/
│   └── api-types/         # tRPC の型を共有するパッケージ
│       ├── package.json
│       └── src/
│           └── router.ts  # tRPC ルーター定義
├── package.json           # ルートパッケージ
└── pnpm-workspace.yaml    # モノレポ設定
```

```plaintext
1. バックエンド側
   - tRPC ルーターを npm パッケージとして公開
   - @my-company/api-types など

2. フロントエンド側
   - npm install @my-company/api-types
   - その型を使って tRPC クライアントを作成
```

```plaintext
適している: 
- 同じ会社・チームで開発
- フロントもバックも TypeScript
- 型安全性を最重視
- デプロイ先は別でもOK（Vercel + AWS Lambda など）

構成例:
my-app/          # モノレポ
├── apps/
│   ├── web/     # Next.js → Vercel にデプロイ
│   └── api/     # tRPC API → AWS Lambda にデプロイ
```

```typescript
適している:
- 完全に別リポジトリ
- 複数のクライアント（Web, iOS, Android）
- 柔軟なクエリが必要

# バックエンド: GraphQL API
type Portfolio {
  id: ID!
  name: String!
  stocks: [Stock!]!
}

# フロントエンド: GraphQL Codegen で型を自動生成
npm install -g @graphql-codegen/cli
graphql-codegen --config codegen.yml
```

```yaml
適している:
- 完全に別リポジトリ
- 公開APIの可能性がある
- チームが別々
- 多様なクライアント

# OpenAPI 定義から TypeScript の型を生成
openapi: 3.0.0
paths:
  /api/portfolios:
    get:
      responses:
        '200':
          schema:
            type: array
            items:
              $ref: '#/components/schemas/Portfolio'
```

```plaintext
✓ フロントとバックが同じリポジトリ
✓ または、モノレポ構成にできる
✓ 同じチーム・会社で開発
✓ TypeScript フルスタック
✓ 型安全性を最重視

→ 今回の Mokabu プロジェクトはこれ！
```

```plaintext
✗ 完全に別リポジトリにしたい
✗ フロントとバックのチームが別
✗ 複数の異なるクライアント（Web, Mobile, 他社システム）
✗ 公開APIにする可能性がある

→ GraphQL + Codegen または REST + OpenAPI を検討
```

```plaintext
my-monorepo/
├── apps/
│   ├── frontend/    # Next.js → Vercel
│   └── api/         # Express → AWS
└── packages/
    └── shared-types/ # tRPC 型を共有

デプロイ先は別々でOK
リポジトリは1つ
型は自動同期✨
```

---

**User**

なるほど、なるほど！

将来、デプロイ先を分けることもあるかもしれないから、モノレポで、別プロジェクトにしたいな。

モノレポは、フロントでVercel にデプロイを検討しているなら、Turborepo がいいのかな？

---

**Cursor**

**大正解です！！** 🎉

Vercel にデプロイするなら、**Turborepo が最適な選択**です。理由を説明しますね！

## 🚀 Turborepo が Vercel に最適な理由

### 1. **Vercel 製**
- Turborepo は Vercel が開発・メンテナンスしている
- Next.js と同じ会社なので、統合が完璧
- Vercel へのデプロイが**超簡単**

### 2. **Vercel での自動検出**
```bash
# Vercel にデプロイすると...
✓ Turborepo を自動検出
✓ ビルドコマンドを自動設定
✓ 依存関係を自動解決
✓ キャッシュを自動最適化

# 設定ほぼゼロ！
```

### 3. **Remote Caching**
```
Vercel の Remote Caching が無料で使える
↓
ビルドが爆速になる
↓
CI/CD が高速化
```

### 4. **シンプル**
- 設定がめちゃくちゃ簡単
- 学習コスト低い
- Next.js ユーザーなら馴染みやすい

---

## 🆚 モノレポツール比較

| 機能 | Turborepo | Nx | pnpm workspace |
|------|-----------|----|----|
| **Vercel 統合** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **セットアップ** | ⭐⭐⭐⭐⭐ 超簡単 | ⭐⭐ 複雑 | ⭐⭐⭐⭐ 簡単 |
| **ビルドキャッシュ** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ 手動 |
| **並列ビルド** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ 手動 |
| **学習コスト** | ⭐⭐⭐⭐⭐ 低い | ⭐⭐ 高い | ⭐⭐⭐⭐ 低い |
| **高度な機能** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Next.js 親和性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

### Turborepo
- **最適**: Vercel + Next.js、シンプルさ重視
- **開発元**: Vercel
- **難易度**: 低
- **おすすめ度**: ⭐⭐⭐⭐⭐（今回のケース）

### Nx
- **最適**: 大規模プロジェクト、Angular、高度な機能
- **開発元**: Nrwl
- **難易度**: 高
- **おすすめ度**: ⭐⭐（小〜中規模には過剰）

### pnpm workspace
- **最適**: シンプルなモノレポ、ツール不要
- **開発元**: pnpm
- **難易度**: 低
- **おすすめ度**: ⭐⭐⭐（ビルド最適化は手動）

---

## 🏗️ Turborepo での構成例

このプロジェクト（Mokabu）を Turborepo で構成するとこうなります：

```
mokabu/                              # モノレポルート
├── apps/
│   ├── web/                         # フロントエンド（Next.js）
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── src/
│   │       ├── app/                 # Next.js App Router
│   │       ├── features/            # UI・ビジネスロジック
│   │       └── components/
│   │
│   └── api/                         # バックエンド（オプション: 将来AWS用）
│       ├── package.json
│       └── src/
│           └── lambda/              # AWS Lambda関数など
│
├── packages/
│   ├── server/                      # tRPC サーバー（共有）
│   │   ├── package.json
│   │   └── src/
│   │       ├── routers/             # tRPC ルーター
│   │       │   ├── portfolio.ts
│   │   │       └── stock.ts
│   │       ├── services/            # ビジネスロジック
│   │       └── trpc.ts
│   │
│   ├── database/                    # Prisma（共有）
│   │   ├── package.json
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       └── client.ts            # Prisma クライアント
│   │
│   ├── ui/                          # 共通UIコンポーネント（shadcn/ui）
│   │   ├── package.json
│   │   └── src/
│   │       ├── button.tsx
│   │       └── card.tsx
│   │
│   └── typescript-config/           # 共有 tsconfig
│       ├── base.json
│       ├── nextjs.json
│       └── react-library.json
│
├── turbo.json                       # Turborepo 設定
├── package.json                     # ルートパッケージ
└── pnpm-workspace.yaml              # pnpm workspace 設定
```

### メリット

✅ **apps/web**: Vercel にデプロイ
✅ **apps/api**: 将来 AWS Lambda にデプロイ（オプション）
✅ **packages/server**: どちらからも使える tRPC ロジック
✅ **packages/database**: どちらからも使える Prisma
✅ **型の自動同期**: すべてのパッケージ間で型が共有される

---

## 🎯 今回の Mokabu での推奨構成

### 案1: 最初はシンプルに（推奨）

```
mokabu/
├── apps/
│   └── web/                    # Next.js（フロント + API Routes）
│       ├── src/
│       │   ├── app/           # Next.js App Router
│       │   ├── features/      # UI
│       │   ├── server/        # tRPC サーバー（ここに配置）
│       │   └── lib/
│       └── prisma/            # Prisma（ここに配置）
│
├── packages/
│   ├── ui/                    # 共通UIコンポーネント（将来用）
│   └── typescript-config/     # tsconfig共有
│
├── turbo.json
└── package.json
```

**理由:**
- 最初は Next.js の中に全部入れてシンプルに
- Turborepo の恩恵（ビルドキャッシュなど）は受けられる
- 将来、バックエンドを分離したくなったら `apps/api` を追加

### 案2: 最初から分離（将来を見据える）

```
mokabu/
├── apps/
│   └── web/                    # フロントエンド
│
├── packages/
│   ├── server/                 # tRPC サーバー
│   ├── database/               # Prisma
│   └── ui/                     # 共通UI
```

**理由:**
- 最初から責務が明確
- 将来 `apps/api` を追加しても、`packages/server` をそのまま使える
- ちょっと複雑だけど、スケーラブル

---

## 💡 私のおすすめ

**まずは「案1: シンプル構成」で始めて、必要になったら分離！**

```
1. 今: Next.js の中に全部入れる（Turborepo は使う）
   ↓
2. 将来: バックエンドを AWS に移したくなったら
   ├── apps/web/
   ├── apps/api/        ← 追加
   └── packages/
       ├── server/      ← apps/web から移動
       └── database/    ← apps/web から移動
```

**理由:**
- 最初からやりすぎると複雑
- Turborepo なら後から分離も簡単
- YAGNI原則（You Aren't Gonna Need It - 必要になるまで実装しない）

---

## 🚀 次のステップ

このプロジェクトを Turborepo + Monoレポで実装しますか？

やることは：
1. **Turborepo のセットアップ**
2. **Next.js プロジェクトの作成**（apps/web）
3. **Prisma のセットアップ**
4. **tRPC のセットアップ**
5. **shadcn/ui のセットアップ**
6. **基本的なページ作成**

進めてよろしいでしょうか？😊

```shellscript
# Vercel にデプロイすると...
✓ Turborepo を自動検出
✓ ビルドコマンドを自動設定
✓ 依存関係を自動解決
✓ キャッシュを自動最適化

# 設定ほぼゼロ！
```

```plaintext
Vercel の Remote Caching が無料で使える
↓
ビルドが爆速になる
↓
CI/CD が高速化
```

```plaintext
mokabu/                              # モノレポルート
├── apps/
│   ├── web/                         # フロントエンド（Next.js）
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── src/
│   │       ├── app/                 # Next.js App Router
│   │       ├── features/            # UI・ビジネスロジック
│   │       └── components/
│   │
│   └── api/                         # バックエンド（オプション: 将来AWS用）
│       ├── package.json
│       └── src/
│           └── lambda/              # AWS Lambda関数など
│
├── packages/
│   ├── server/                      # tRPC サーバー（共有）
│   │   ├── package.json
│   │   └── src/
│   │       ├── routers/             # tRPC ルーター
│   │       │   ├── portfolio.ts
│   │   │       └── stock.ts
│   │       ├── services/            # ビジネスロジック
│   │       └── trpc.ts
│   │
│   ├── database/                    # Prisma（共有）
│   │   ├── package.json
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       └── client.ts            # Prisma クライアント
│   │
│   ├── ui/                          # 共通UIコンポーネント（shadcn/ui）
│   │   ├── package.json
│   │   └── src/
│   │       ├── button.tsx
│   │       └── card.tsx
│   │
│   └── typescript-config/           # 共有 tsconfig
│       ├── base.json
│       ├── nextjs.json
│       └── react-library.json
│
├── turbo.json                       # Turborepo 設定
├── package.json                     # ルートパッケージ
└── pnpm-workspace.yaml              # pnpm workspace 設定
```

```plaintext
mokabu/
├── apps/
│   └── web/                    # Next.js（フロント + API Routes）
│       ├── src/
│       │   ├── app/           # Next.js App Router
│       │   ├── features/      # UI
│       │   ├── server/        # tRPC サーバー（ここに配置）
│       │   └── lib/
│       └── prisma/            # Prisma（ここに配置）
│
├── packages/
│   ├── ui/                    # 共通UIコンポーネント（将来用）
│   └── typescript-config/     # tsconfig共有
│
├── turbo.json
└── package.json
```

```plaintext
mokabu/
├── apps/
│   └── web/                    # フロントエンド
│
├── packages/
│   ├── server/                 # tRPC サーバー
│   ├── database/               # Prisma
│   └── ui/                     # 共通UI
```

```plaintext
1. 今: Next.js の中に全部入れる（Turborepo は使う）
   ↓
2. 将来: バックエンドを AWS に移したくなったら
   ├── apps/web/
   ├── apps/api/        ← 追加
   └── packages/
       ├── server/      ← apps/web から移動
       └── database/    ← apps/web から移動
```

---

**User**

もう一個だけ質問！

Next.js の app router を開発に使うのであれば、REST API + OpenAPI を採用するメリットはあまりないってことだね？



---

**Cursor**

**ほぼその通りです！** 👍

ただし、**いくつか例外ケース**があるので、整理しますね。

## 🎯 Next.js App Router でフルスタック開発する場合

### ✅ tRPC が最適（ほとんどのケース）

```
フロント: Next.js App Router
バック: Next.js API Routes (または同じプロジェクト)
クライアント: Web のみ（自社プロダクト）

→ tRPC 一択！
  - 型の自動共有
  - 開発速度が速い
  - コード量が少ない
  - メンテナンスが楽
```

### ⚠️ でも REST + OpenAPI が必要なケース

以下の場合は、**Next.js App Router でも REST API が必要**：

#### 1. **公開 API を提供する**

```typescript
例: SaaS プロダクトで、顧客に API を提供

GET https://api.mokabu.com/v1/portfolios
Authorization: Bearer xxx

→ 外部から使われるので REST API が必須
→ OpenAPI でドキュメント自動生成
```

#### 2. **複数の異なるクライアント**

```
- Web (Next.js)        ← tRPC でOK
- iOS アプリ           ← REST API が必要
- Android アプリ       ← REST API が必要
- パートナー企業       ← REST API が必要

→ REST API を用意する必要がある
```

#### 3. **Webhook を提供する**

```typescript
例: 株価が変動したら、顧客のサーバーに通知

POST https://customer.com/webhook
{
  "event": "stock_price_changed",
  "data": { ... }
}

→ 標準的な REST API が必要
```

#### 4. **将来的に Next.js 以外に移行する可能性**

```
今: Next.js フルスタック
将来: React (Vite) + 別のバックエンド

→ 最初から REST にしておく選択肢もある
  （ただし、移行時にリファクタでもOK）
```

---

## 🔄 両方使う構成もアリ

実は、**tRPC と REST API を併用**することもできます！

```
mokabu/
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── trpc/          # 内部用（Web フロント専用）
│   │       │   └── [trpc]/
│   │       │       └── route.ts
│   │       │
│   │       └── v1/            # 外部公開用 REST API
│   │           ├── portfolios/
│   │           │   └── route.ts
│   │           └── stocks/
│   │               └── route.ts
│   │
│   ├── server/
│   │   ├── routers/           # tRPC ルーター（内部用）
│   │   └── services/          # ビジネスロジック（共通）
```

### 使い分け

```typescript
// 内部用（Next.js フロント）: tRPC
'use client'
const { data } = trpc.portfolio.getAll.useQuery()

// 外部公開用（モバイルアプリなど）: REST API
GET /api/v1/portfolios
Authorization: Bearer xxx
```

### メリット

- ✅ **内部開発は爆速**（tRPC）
- ✅ **外部提供も可能**（REST）
- ✅ **ビジネスロジックは共有**（services/）

---

## 📊 まとめ: どっちを使うべき？

### 🟢 tRPC だけでOK（今回の Mokabu はこれ！）

```
✓ Next.js フルスタック
✓ クライアントは Web のみ
✓ 内部ツール・自社プロダクト
✓ 公開 API の予定なし
✓ 開発速度・型安全性を最重視

→ tRPC 一択！REST は不要！
```

### 🟡 REST API も追加すべき

```
✓ 公開 API を提供する
✓ モバイルアプリもある
✓ 外部システムと連携
✓ Webhook を提供

→ tRPC（内部用）+ REST（外部用）
```

### 🔴 最初から REST のみ

```
✓ Next.js をフロント専用にする予定
✓ バックエンドは別のフレームワーク（Express, NestJSなど）
✓ 複数のクライアントが最初から確定

→ REST + OpenAPI
   （ただし、Next.js フルスタックのメリット薄れる）
```

---

## 💡 今回の Mokabu の場合

```
現時点:
- Web アプリのみ
- 公開 API の予定なし
- Next.js フルスタック

→ tRPC のみで十分！

将来、もし公開 API が必要になったら:
- tRPC はそのまま残す（内部用）
- REST API を追加する（外部用）
- ビジネスロジック（services/）は共通化
```

---

## 🎯 結論

**Q: Next.js App Router なら、REST API + OpenAPI のメリットはあまりない？**

**A:**
- **内部開発のみ**: その通り！tRPC の方が圧倒的に良い
- **外部公開も必要**: REST API も併用する価値がある
- **今回の Mokabu**: tRPC だけで十分！

**おすすめ:**
```
1. まず tRPC で開発（今）
2. 必要になったら REST API を追加（将来）
3. ビジネスロジックは共通化しておく（保険）
```

これで理解できましたか？次はいよいよセットアップに進みましょうか？😊

```plaintext
フロント: Next.js App Router
バック: Next.js API Routes (または同じプロジェクト)
クライアント: Web のみ（自社プロダクト）

→ tRPC 一択！
  - 型の自動共有
  - 開発速度が速い
  - コード量が少ない
  - メンテナンスが楽
```

```typescript
例: SaaS プロダクトで、顧客に API を提供

GET https://api.mokabu.com/v1/portfolios
Authorization: Bearer xxx

→ 外部から使われるので REST API が必須
→ OpenAPI でドキュメント自動生成
```

```plaintext
- Web (Next.js)        ← tRPC でOK
- iOS アプリ           ← REST API が必要
- Android アプリ       ← REST API が必要
- パートナー企業       ← REST API が必要

→ REST API を用意する必要がある
```

```typescript
例: 株価が変動したら、顧客のサーバーに通知

POST https://customer.com/webhook
{
  "event": "stock_price_changed",
  "data": { ... }
}

→ 標準的な REST API が必要
```

```plaintext
今: Next.js フルスタック
将来: React (Vite) + 別のバックエンド

→ 最初から REST にしておく選択肢もある
  （ただし、移行時にリファクタでもOK）
```

```plaintext
mokabu/
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── trpc/          # 内部用（Web フロント専用）
│   │       │   └── [trpc]/
│   │       │       └── route.ts
│   │       │
│   │       └── v1/            # 外部公開用 REST API
│   │           ├── portfolios/
│   │           │   └── route.ts
│   │           └── stocks/
│   │               └── route.ts
│   │
│   ├── server/
│   │   ├── routers/           # tRPC ルーター（内部用）
│   │   └── services/          # ビジネスロジック（共通）
```

```typescript
// 内部用（Next.js フロント）: tRPC
'use client'
const { data } = trpc.portfolio.getAll.useQuery()

// 外部公開用（モバイルアプリなど）: REST API
GET /api/v1/portfolios
Authorization: Bearer xxx
```

```plaintext
✓ Next.js フルスタック
✓ クライアントは Web のみ
✓ 内部ツール・自社プロダクト
✓ 公開 API の予定なし
✓ 開発速度・型安全性を最重視

→ tRPC 一択！REST は不要！
```

```plaintext
✓ 公開 API を提供する
✓ モバイルアプリもある
✓ 外部システムと連携
✓ Webhook を提供

→ tRPC（内部用）+ REST（外部用）
```

```plaintext
✓ Next.js をフロント専用にする予定
✓ バックエンドは別のフレームワーク（Express, NestJSなど）
✓ 複数のクライアントが最初から確定

→ REST + OpenAPI
   （ただし、Next.js フルスタックのメリット薄れる）
```

```plaintext
現時点:
- Web アプリのみ
- 公開 API の予定なし
- Next.js フルスタック

→ tRPC のみで十分！

将来、もし公開 API が必要になったら:
- tRPC はそのまま残す（内部用）
- REST API を追加する（外部用）
- ビジネスロジック（services/）は共通化
```

```plaintext
1. まず tRPC で開発（今）
2. 必要になったら REST API を追加（将来）
3. ビジネスロジックは共通化しておく（保険）
```

