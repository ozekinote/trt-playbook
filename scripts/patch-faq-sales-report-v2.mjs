#!/usr/bin/env node
/**
 * Extend faq.json from 商談分析レポートv2 Top15 gaps + patch existing Q03/Q06/Q08/Q09.
 * Adds Q16–Q22. Updates cards.json faqIds for linked MEDDPICC scenes.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FAQ_PATH = path.join(ROOT, 'public/faq.json');
const CARDS_PATH = path.join(ROOT, 'public/cards.json');

/** @type {Record<string, object>} */
const NEW_FAQ = {
  Q16: {
    id: 'Q16',
    category: '運用',
    question: '退職時のカード回収・残高はどうなりますか？',
    conclusion:
      '退職時はカードの利用停止・回収手続きを行い、残高の取扱いは規程と最新の運用ルールに従います。退職フロー図で社内説明できる形に整理します。',
    sections: [
      {
        title: '標準的なフロー',
        body:
          '退職が確定した時点で管理ポータルからカードを停止\n物理カードは回収（渡し切り運用のため回収不要の説明会資料もあるが、貴社規程で統一）\n未使用残高は有効期限・規程に基づき処理（失効または精算ルールを事前に明文化）\n入退社・休職時のチャージ調整ルールを導入前に整理',
      },
      {
        title: '総務・人事向けのポイント',
        body:
          '「回収するのか／残高はどうなるのか」を退職フロー図1枚で即答できる状態に\n給与天引き残・最終精算との関係を経理・社労士と事前すり合わせ\n説明会資料・従業員向けFAQに退職時の取扱いを記載',
      },
    ],
    misconception: '「退職者の残高は自動で現金化される」とは限りません。規程と運用で明確にします。',
    footnote: '詳細は導入時の運用ガイド・退職フロー標準資料を参照。最終確認は顧問社労士へ。',
  },
  Q17: {
    id: 'Q17',
    category: '運用',
    question: '残高が足りないとき、現金や他のカードと併用できますか？',
    conclusion:
      '店舗・決済端末により異なります。主要チェーンでは残高不足分を現金等で追加支払いできる場合があります。',
    sections: [
      {
        title: '一般的な考え方',
        body:
          'プリペイド残高を超える購入は、端末・店舗の仕様により「残高分のみ決済」または「不足分を現金等で追加」のいずれか\nコンビニ・主要外食チェーンでは併用決済に対応している店舗が多い\n利用前に加盟店検索アプリで対象店舗を確認する運用を推奨',
      },
      {
        title: '営業・説明会での示し方',
        body:
          '「店舗によります」で終わらせず、主要チェーン対応表で即答\n従業員の生活動線（コンビニ・外食）で使えるかを優先して説明\n併用不可の店舗では1日上限2,500円以内の利用設計を周知',
      },
    ],
    misconception: null,
    footnote: '最新の加盟店・端末仕様は導入時資料を参照。',
  },
  Q18: {
    id: 'Q18',
    category: '経理・会計',
    question: '福利厚生費ですか？預かり金ですか？仕訳はどうなりますか？',
    conclusion:
      'チャージ時と給与天引き時で仕訳のタイミングが異なります。貴社の会計方針・顧問税理士の判断に合わせ、サンプル仕訳をベースに整理します。',
    sections: [
      {
        title: '論点の整理',
        body:
          '会社負担分：福利厚生費（または貴社の費目区分）として処理するケースが一般的\n従業員負担分：給与天引き（賃金控除）で回収—控除額は給与仕訳と連動\n前払い（プリペイド）方式のため、チャージ時点と利用時点で貴社の会計処理方針を確認',
      },
      {
        title: '実務で用意するもの',
        body:
          'チャージ時・天引き時の仕訳サンプル（貸借科目例）\n管理ポータルの請求書・利用明細と突合する手順\n経理部門向けFAQ／導入説明資料',
      },
    ],
    misconception: '仕訳は全社一律ではありません。顧問税理士の見解に合わせて確定してください。',
    footnote: '当社は貴社の会計処理を代行しません。サンプルと運用フローの提供が中心です。',
  },
  Q19: {
    id: 'Q19',
    category: '運用',
    question: '土日や時間帯を制限できますか？',
    conclusion:
      'システム上の土日・時間帯ロック機能は基本ありません。勤務日の食事補助であることを規程と周知で担保します。',
    sections: [
      {
        title: '設計上の考え方',
        body:
          '非課税要件は「食事補助（現物給与）」の実態—業務に関連する食事の軽減が目的\n土日祝の利用可否は、勤務体系（シフト・休日出勤）に応じて規程で定義\n時間帯の機械的制限より、利用目的・監視（ポータル可視化）で運用統制',
      },
      {
        title: '運用での抑止',
        body:
          '規程に「勤務日の食事費用の軽減が目的」と明記\n利用量・頻度のモニタリング、逸脱時の確認→是正\n説明会で「私的な外食・家族利用は対象外」を周知（Q20参照）',
      },
    ],
    misconception: null,
    footnote: '詳細な線引きは規程文案テンプレートと顧問税理士・社労士へ確認。',
  },
  Q20: {
    id: 'Q20',
    category: '運用',
    question: '家族の食事や、家族とのレストランでも使えますか？',
    conclusion:
      '対象は従業員本人の食事補助です。家族分・家族との会食を制度趣旨として想定していません。',
    sections: [
      {
        title: '制度の前提',
        body:
          '食事補助（現物給与）として、従業員本人が業務に関連して摂る飲食物が対象\n家族分の購入・家族との外食を常態化させると、実態としての食事補助から逸脱するリスク\n利用ガイドラインで「本人の食事」と線引きを明確化',
      },
      {
        title: '説明会・規程での扱い',
        body:
          '「本人の昼食・業務中の食事が目的」と周知\n複数人分の会計・目的外利用は規程で禁止し、モニタリング\n従業員からの質問はFAQで事前に潰す',
      },
    ],
    misconception: '「カードさえあれば家族の食事もOK」は誤りです。',
    footnote: '最終判断は規程と顧問税理士へ。',
  },
  Q21: {
    id: 'Q21',
    category: '導入・移行',
    question: '仕出し弁当・既存の食事制度と併用できますか？非課税枠は共有になりますか？',
    conclusion:
      '併用自体は可能なケースが多いです。非課税枠・食事補助の取扱いは制度ごとに異なるため、顧問税理士と設計時に整理してください。',
    sections: [
      {
        title: '併用の考え方',
        body:
          '既存の仕出し弁当・社食・食事手当を「置き換え」でなく「追加」で共存する設計も可能\n従業員には選択の自由度（社食 vs 外食・コンビニ）を提供\n移行は賃上げ発表と同時に行うと前向きに受け止められやすい（Q14参照）',
      },
      {
        title: '非課税枠・枠の計算',
        body:
          '会社負担の非課税上限（月7,500円等）は、食事補助全体で要件を満たす必要がある\n複数制度を併用する場合、合算での上限・本人負担50%要件を要確認\n併用時の枠計算シートでシミュレーションし、税理士レビューを推奨',
      },
    ],
    misconception: '「併用すれば枠が2倍」にはなりません。上限・要件は制度全体で判断されます。',
    footnote: '数値試算は導入支援時に提供。最終確認は顧問税理士へ。',
  },
  Q22: {
    id: 'Q22',
    category: 'サービス比較',
    question: 'Mastercardへの切替はいつですか？自販機は使えなくなりますか？',
    conclusion:
      '決済ネットワークをMastercardへ切り替える予定です（時期は最新ロードマップを参照）。加盟店拡大が主目的で、移行スケジュールと影響範囲を事前にご案内します。',
    sections: [
      {
        title: '切替の目的・見通し',
        body:
          '加盟店網の拡大・決済の利便性向上が目的\n2026年8月頃の切替を想定する説明もあるが、最新スケジュールは導入時に確認\n地方・独立系店舗のカバレッジ改善が期待される',
      },
      {
        title: '自販機・既存利用への影響',
        body:
          'iD／加盟店対応端末での利用が基本—切替後もコンビニ・主要チェーン中心の利用は継続\n自販機・特定端末は対応可否が変わる可能性があるため、MC切替FAQ資料で一覧提示\n「今使えている店が使えなくなる」不安には、拡大＋移行一覧で回答',
      },
    ],
    misconception: null,
    footnote: 'スケジュール・対応店舗は変更される場合があります。導入時の最新資料が正。',
  },
};

/** Partial updates by FAQ id */
const PATCHES = {
  Q03: {
    sections: [
      {
        title: 'なぜ公平性が重要か',
        body:
          '特定の役職・部署だけ優遇すると福利厚生費性が崩れ「給与」評価のおそれ\n給与評価になると非課税前提が崩れる\n全社員に利用機会が開かれていることが税務面の安全側\n公平性は“守り(税務)”と“攻め(採用・定着)”の両用',
      },
      {
        title: '実務上の設計・注意',
        body:
          '利用機会の公平性を担保（説明会・希望募集・対象範囲の明文化）\n雇用形態（正社員/契約/パート）ごとの取扱いを事前に整理\n対象範囲は規程に明記し、運用と一致させる\n最終的な線引きは顧問社労士・税理士に確認',
      },
      {
        title: '金額設定・パート・アルバイトの線引き',
        body:
          '正社員とパートでチャージ額を変える設計は可能だが、公平性・給与認定リスクを要検討\n「週20時間未満は対象外」等の合理的区分は規程に根拠を明記\n特定部署・役員のみ高額など、説明できない優遇は避ける\n希望制・段階導入（パイロット拠点）も選択肢',
      },
    ],
  },
  Q06: {
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
        title: 'お金と時系列の流れ（1名・初回利用の例）',
        body:
          '6/20 利用企業→エデンレッド：チャージ指示 15,000円分\n6月末 エデンレッド→利用企業：請求書発行 16,500円\n7/14 利用企業→エデンレッド：利用料の振込 16,500円\n7/25 エデンレッド→カード：カードへチャージ 15,000円\n7/25 従業員→利用企業：本人負担の充当 7,500円\n※請求書は6月末発行、入金は翌月7/14。カードへのチャージと給与天引きは同日（7/25）。',
      },
      {
        title: '給与天引きと手取りの見え方',
        body:
          '給与明細では控除額が表示されるが、会社負担分の非課税効果により実質手取りは増える\n説明会で「天引き前後の手取り比較」を図解\n希望制であること、不要な従業員は加入しない選択も可能と明示',
      },
    ],
  },
  Q08: {
    question: 'チケットレストランはどこで使えるのですか？（コンビニ・スーパー等）',
    sections: [
      {
        title: '使える場所・規模',
        body:
          'チケットレストラン加盟店 約25万店\nコンビニ大手・主要外食チェーン・個店・デリバリー\n在宅・現場・出張先でも使える＝全社員に公平に届く\n専用アプリで近くの加盟店を検索できる',
      },
      {
        title: '店舗カテゴリ（よくある質問）',
        body:
          'コンビニ：iD対応店舗で広く利用可能\nスーパー・ドラッグストア：加盟店登録店舗で利用可能（店舗により異なる—事前検索を推奨）\n北海道セイコーマート等：iD対応状況はエリア・店舗で確認（導入前に所在地周辺をリスト化）\nUber Eats等デリバリーも利用可能',
      },
      {
        title: '決済方法・地方対応',
        body:
          '決済は電子マネー(iD)のタッチ。iD加盟店で利用（専用端末は基本不要）\n地方の店舗数はエリアで差。コンビニ＋デリバリーで実用性を確保\n利用可能店舗はエリア指定で事前確認が可能\n今後の対応拡大（Mastercard切替・モバイル決済等）も予定（Q22参照）',
      },
    ],
  },
  Q09: {
    sections: [
      {
        title: '具体的なルール',
        body:
          '1日の利用上限：2,500円\nチャージ残高の有効期限：1年\n利用対象：飲食物（アルコール・タバコ等は対象外）\nチャージ月の1年後に、未利用残高は失効します',
      },
      {
        title: '残高の繰越（翌月以降）',
        body:
          '有効期限（1年）の範囲内であれば、未使用分は翌月以降も残高として利用可能\n「翌月に自動で現金化」等はありません—カード残高として保持\n1日2,500円の上限は日ごとにリセット（繰越不可）',
      },
      {
        title: '限度額・設定の変更',
        body:
          '1日上限2,500円・有効期限1年はプラン設定に基づく標準値\n変更可否は契約プラン・最新仕様を要確認—導入時に限度額設定ガイドで即答',
      },
      {
        title: '背景・注意',
        body:
          '金額上限、利用対象限定は「食事補助（現物給与）」の実態を保つための設計\n有効期限により未使用残高の管理・失効ルールを明確化\n国税庁『在宅勤務FAQ』問12の非課税食券例（1回2,500円まで）に沿う設計\n従業員の皆さまへは説明会・FAQで事前周知を行う',
      },
    ],
  },
};

/** scene → additional faqIds to merge */
const CARD_FAQ_LINKS = {
  '退職時の取扱いを確認': ['Q16'],
  '経費処理・仕訳を問われる': ['Q18'],
  '仕出し弁当と併用を検討': ['Q21'],
  '残高不足時の併用決済を確認': ['Q17'],
  'マスターカード切替の影響を確認': ['Q22'],
  '家族の食事に使えるか問う': ['Q20'],
  '置き型社食から乗り換え検討': ['Q21'],
};

function mergeFaq(item, patch) {
  const out = { ...item, ...patch };
  if (patch.sections) out.sections = patch.sections;
  return out;
}

const faqRaw = JSON.parse(fs.readFileSync(FAQ_PATH, 'utf8'));
let items = faqRaw.items ?? faqRaw;

items = items.map((item) => (PATCHES[item.id] ? mergeFaq(item, PATCHES[item.id]) : item));

const existingIds = new Set(items.map((i) => i.id));
for (const id of Object.keys(NEW_FAQ).sort()) {
  if (!existingIds.has(id)) items.push(NEW_FAQ[id]);
}

items.sort((a, b) => Number(a.id.slice(1)) - Number(b.id.slice(1)));

const faqOut = {
  meta: {
    ...faqRaw.meta,
    version: '1.1.0',
    updated: new Date().toISOString().slice(0, 10),
    source: '0629デッキ P38–P56 ＋ 商談分析レポートv2 Top15 補完',
    note: 'Q01–Q14 デッキ正本／Q15 維持／Q16–Q22 商談FAQギャップ追加',
    count: items.length,
    pages: 'P38–P56 + 商談分析v2',
  },
  items,
};

fs.writeFileSync(FAQ_PATH, JSON.stringify(faqOut, null, 2) + '\n');

const cardsRaw = JSON.parse(fs.readFileSync(CARDS_PATH, 'utf8'));
let linkCount = 0;
for (const card of cardsRaw.cards) {
  const add = CARD_FAQ_LINKS[card.scene];
  if (!add) continue;
  const ids = new Set([...(card.faqIds ?? []), ...add]);
  card.faqIds = [...ids].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
  linkCount++;
}

const withFaqIds = cardsRaw.cards.filter((c) => c.faqIds?.length).length;
cardsRaw.meta = {
  ...cardsRaw.meta,
  updated: new Date().toISOString().slice(0, 10),
  note: `FAQ分離 — faqIds参照（${withFaqIds}枚）。faq.json v1.1.0`,
  withFaqIds,
};

fs.writeFileSync(CARDS_PATH, JSON.stringify(cardsRaw, null, 2) + '\n');

console.log(`faq.json → v${faqOut.meta.version} (${items.length} items)`);
console.log(`cards.json → ${linkCount} scenes linked to new FAQ ids`);
