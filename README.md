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

## データ更新

1. Claude が文字起こし分析 → MEDDPICC 振り分け → `cards.json` 生成
2. `public/cards.json` を差し替え
3. commit → push → 自動デプロイ

### cards.json スキーマ

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
  "sources": [{ "label": "...", "url": "https://..." | null }]
}
```

空棚は cards.json にカードが0件の棚のみ UI で「流し込み予定（0件）」表示。

## 現状（2026-06-27 Cursor 確認）

| 項目 | 状態 |
|------|------|
| レンダラ | `public/index.html` + `public/playbook.html`（同一・fetch 駆動・`sources` 対応） |
| データ | `public/cards.json` — **v0.8 41枚**（根拠付き15・Claude Chat DL 反映済み） |
| noindex | robots.txt + meta + vercel `X-Robots-Tag` |
| ローカル | `cd public && python3 -m http.server 8765` → OK |
| GitHub / Vercel | **未 push / 未デプロイ**（Oz 判断） |

### cards.json 正本

- **v0.8**（41枚・sources 15枚・e-Gov 法令2件）← **採用・repo 反映済み**
- ~~v0.7 / v0.6 / v0.5 / 22枚~~ — 包含または破棄

Claude Chat から DL → `public/cards.json` 上書き → commit → push のみで本番更新。

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
