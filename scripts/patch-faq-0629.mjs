#!/usr/bin/env node
/**
 * Patch faq.json for 0629 deck delta (Q01, Q06, Q09).
 * FAQ is managed separately from MEDDPICC cards (faq.json only).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FAQ_PATH = path.join(__dirname, '..', 'public/faq.json');

/** @type {Record<string, object>} */
const UPDATES = {
  Q01: {
    id: 'Q01',
    category: '税務',
    question: '本当に所得税は非課税になるのですか？要件は？',
    conclusion:
      '本人負担50%以上 ＋ 会社負担が月額上限以内、の2要件を満たせば会社負担分は非課税です。',
    sections: [
      {
        title: '非課税の2要件',
        body:
          '①本人負担：従業員が食事補助額の50%以上を負担（給与控除で徴収）\n②会社負担：会社の補助が定められた月額上限の範囲内\n両方を同時に満たす必要（片方でも欠けると全額が給与＝課税）\n現金で同額を渡すと全額課税。食事補助なら非課税で実質手取りUP',
      },
      {
        title: '根拠・実務上の注意',
        body:
          '根拠：国税庁 No.2594／所得税基本通達 36-38の2\n上限額は税制改正で変動（最新の施行内容を要確認）\n判定は税抜ベース。税込だと上限超過の誤判定が起きやすい\n規程・控除記録・利用実態の証跡で要件充足を客観的に示す',
      },
      {
        title: '数値例（月15,000円チャージ・折半）',
        body:
          '補助総額15,000円／会社7,500円（上限内）／本人7,500円（50%）→ 課税なし\n現金で同額支給 → 全額課税\n判定：①本人50%以上か ②会社負担が上限内か → 両方YESで非課税',
      },
      {
        title: '改正経緯・留意',
        body:
          '非課税の月額上限：3,500円 → 7,500円（2026年4月1日施行／令和8年度）\n施行内容・適用時期は最新情報を要確認\n残業時の食事など他の現物給与は別の取扱い',
      },
    ],
    misconception: '「上限額まで会社が出せば非課税」は誤り。本人負担50%以上も同時に必要です。',
    footnote: '出典：所得税法／所得税基本通達 36-38・36-38の2／国税庁 No.2594',
  },
  Q06: {
    id: 'Q06',
    category: 'コスト・手数料',
    question: '従業員の負担分は、どうやって集めるのですか？',
    conclusion: '給与天引き（賃金控除）でまとめて精算します。控除には労使協定の締結が必要です。',
    sections: [
      {
        title: '徴収の流れ',
        body:
          '会社負担分＋本人負担分を専用カードにチャージ\n本人負担分（50%以上）は毎月の給与から控除\n控除額は管理ポータルで把握し給与システムへ反映\n運用はポータルでのカード注文・チャージが中心でシンプル',
      },
      {
        title: '必要な手続き・注意',
        body:
          '労基法第24条（賃金全額払い原則）の例外として労使協定が必要\n協定書のひな型を提供し、締結プロセスを支援\n入退社・休職時のチャージ調整ルールを事前に整理\n最終確認は顧問社労士へ',
      },
      {
        title: 'お金と時系列の流れ（初回利用の例）',
        body:
          '6/20 チャージ指示（利用企業→ERJ）15,000円分\n6月末 請求書発行（ERJ→利用企業）16,500円\n7/14 利用料の振込（利用企業→ERJ）16,500円\n7/25 カードへチャージ（ERJ→カード）15,000円／同日に本人負担7,500円を給与天引きで充当\n※請求書は6月末発行・入金は翌月7/14、チャージと天引きは同日（7/25）。初回はチャージ指示〜実チャージまで約1か月。',
      },
    ],
    misconception: null,
    footnote: '根拠：労基法 第24条。本人負担50%以上は通達36-38の2の要件。協定ひな型はERJが提供。',
  },
  Q09: {
    id: 'Q09',
    category: '運用',
    question: '1日の上限や有効期限はありますか？使えるものは？',
    conclusion:
      '1日の利用上限・残高の有効期限があり、対象は業務時間中に摂る飲食物に限られます。',
    sections: [
      {
        title: '具体的なルール',
        body:
          '1日の利用上限：2,500円\nチャージ残高の有効期限：1年\n利用対象：飲食物（アルコール・タバコ等は対象外）\n決済単位・複数会計の扱いは仕様に準拠',
      },
      {
        title: '背景・注意',
        body:
          '上限・対象限定は「食事補助（現物給与）」の実態を保つための設計\n有効期限により未使用残高の管理・失効ルールを明確化\n国税庁『在宅勤務FAQ』問12の非課税食券例（1回2,500円まで）に沿う設計',
      },
    ],
    misconception: null,
    footnote:
      '出典：エデンレッドジャパン提供情報。1日上限・有効期限・対象品目はプラン設定に基づく（最新仕様を要確認）。',
  },
};

const raw = JSON.parse(fs.readFileSync(FAQ_PATH, 'utf8'));
const items = (raw.items ?? raw).map((item) =>
  UPDATES[item.id] ? { ...UPDATES[item.id] } : item
);

const patched = Object.keys(UPDATES).filter((id) => items.some((f) => f.id === id)).length;
const out = {
  meta: {
    ...raw.meta,
    version: '0.9.2',
    updated: '2026-06-29',
    note: '0629反映：Q01施行日・Q06お金の流れ・Q09文言',
    deck: 'Edenred_TRT_大企業向け_0629.pptx',
    count: items.length,
  },
  items,
};

fs.writeFileSync(FAQ_PATH, JSON.stringify(out, null, 2) + '\n');
console.log(`Patched faq.json (${patched} items updated, v0.9.2)`);
