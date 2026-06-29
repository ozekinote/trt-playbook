# trt-playbook

TRT 営業向け「第三層（実践知）」静的サイト。ドメイン: **playbook.ozeki.co**

Operating & Co. / `loop.operating.jp` とは **別リポジトリ・別 Vercel プロジェクト**。

## 置くもの

- MEDDPICC 8棚で索引した顧客の声カード（`public/cards.json`）
- 実名・社名は入れない（「製造業A社の財務部長」粒度まで）

## 置かないもの

- 顧客実名・社名・契約情報
- セッション録音そのもの

## 保護レベル（当面）

- **obscurity-only** — 認証なし、URL 非公開
- `robots.txt` Disallow + `<meta robots noindex>` + `X-Robots-Tag: noindex, nofollow`
- noindex は善良なクローラ対策。URL 入手者には無力 → **実名を入れない運用**が前提

## Cloudflare Access（将来）

後付け可能な構成:

1. `playbook.ozeki.co` の DNS を Cloudflare プロキシ（オレンジ雲）に切替
2. Cloudflare Zero Trust → Access Application を作成（対象: `playbook.ozeki.co/*`）
3. Origin は Vercel のまま（CNAME → `cname.vercel-dns.com`）
4. 静的ファイルのみのため、アプリ側の認証コード変更は不要

Vercel 側は本 README の headers 設定のまま。Access 通過後に静的 HTML/JSON を返す。

## データ更新（2トラック — 2026-06-29 FAQ分離）

| 種別 | 正本 | ファイル | 手順 |
|------|------|----------|------|
| **FAQ**（数値・根拠・手続き） | PPTX（0629デッキ） | `public/faq.json` | PPT更新 → `merge-deck-faq.mjs` または `patch-faq-*.mjs` → deploy |
| **MEDDPICC**（商談カード） | 文字起こし分析 | `public/cards.json` | Claude 既存フォーマット → `faqIds` のみ参照 → deploy |

### UI

- **MEDDPICC** — `/` … 商談録音由来の顧客の声（`faqIds` は FAQ ページへリンク）
- **FAQ** — `/faq.html` … 提案デッキ Q01–Q15 の正本

### FAQ 更新

```bash
node scripts/merge-deck-faq.mjs   # faq.json 正本 + cards に faqIds のみ
node scripts/patch-faq-0629.mjs   # faq.json の差分パッチ例
node scripts/split-faq-meddpicc.mjs  # 旧 cards 埋め込み FAQ を分離（移行用）
```

- **cards.json には `faq` ブロックを埋め込まない**（`faqIds` 参照のみ）
- MEDDPICC カードの `read / doIt / dont / status / sources` は**非破壊**

### cards.json スキーマ（authoring 正本 — 変更しない）

```json
{
  "shelf": "M | E | DC | DP | PP | I | CH | CO",
  "scene": "局面名",
  "quote": "顧客の生の声",
  "speaker": "発話者の役割",
  "speakerRead": "任意",
  "read": "兆候の本当の意味",
  "doIt": "打ち手",
  "dont": "やらない",
  "freq": "高 | 中 | 低",
  "status": "proven | hyp",
  "sources": [{ "label": "...", "url": "https://..." | null }],
  "faqIds": ["Q01"]
}
```

`faq` オブジェクトは **faq.json に分離**。cards には `faqIds` のみ。

## UI（v1.0 — MEDDPICC / FAQ 分離）

- `/` — MEDDPICC 商談カード
- `/faq.html` — 提案デッキ FAQ（Q01–Q15）
- H1: ページごとに分離（旧「MEDDPICC & FAQ」統合 UI は廃止）

## 現状（2026-06-27）

| 項目 | 状態 |
|------|------|
| レンダラ | `public/index.html` + `public/playbook.html`（同一・fetch 駆動・`sources` 対応） |
| データ | `public/cards.json`（MEDDPICC v1.0）+ `public/faq.json`（FAQ v0.9.2） |
| noindex | robots.txt + meta + vercel `X-Robots-Tag` |
| ローカル | `cd public && python3 -m http.server 8765` → OK |
| 本番 | https://playbook.ozeki.co / https://trt-playbook.vercel.app |
| GitHub | `ozekinote/trt-playbook`（main） |

### cards.json 正本

- **v0.9**（44枚・FAQ Q01–Q15 統合）← **採用・repo 反映済み**
- ~~v0.8 / v0.7 / v0.6 / v0.5 / 22枚~~ — 包含または破棄

Claude Chat / Mailbox `trt-playbook-cards-vNN.json` → `public/cards.json` 上書き → `merge-deck-faq.mjs` → commit → push。

## Vercel セットアップ（Oz 作業・5分）

1. `cd ~/trt-playbook && git init`（済）→ 初回 commit → GitHub `ozekinote/trt-playbook` 作成・push
2. Vercel 新規プロジェクト（Root: repo ルート、`public/` が静的ルート）
3. ドメイン `playbook.ozeki.co` を追加
4. DNS: `playbook` CNAME → Vercel 指示値（`ozeki.co` note ブログとは別サブドメイン）
5. 以後: `cards.json` 差し替え → push → 自動デプロイ（レンダラは触らない）

## ローカル確認

```bash
cd public && python3 -m http.server 8765
# http://localhost:8765/
```

## デザイン

- 紙白 + インク基調。Edenred RED `#F72717` は **Don't（やらない）専用**
- Operating ネイビー `#293855` は使用しない
- フォント: Noto Sans JP / Archivo / JetBrains Mono
