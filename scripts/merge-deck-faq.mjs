#!/usr/bin/env node
/**
 * Non-destructive FAQ merge from Edenred_TRT_大企業向け_マージ版.pptx (Q01–Q15)
 * into public/cards.json.
 *
 * Policy (2026-06-27): additive only — attach faqIds + faq blocks from deck FAQ.
 * NEVER overwrite read / doIt / dont / status / sources (or other card body fields).
 * Run validation before write; exit 1 if any core field would change.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CARDS_PATH = path.join(ROOT, 'public/cards.json');

/** @type {Record<string, object>} */
const FAQ = {
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
  Q02: {
    id: 'Q02',
    category: '税務',
    question: '食事以外にも使えるなら“現金支給”とみなされて課税されませんか？',
    conclusion: '「食事補助（現物給与）」としての実態を保つ運用であれば課税されません。',
    sections: [
      {
        title: '課税/非課税を分ける“実態”',
        body:
          '判定は形式でなく実態（恒常性・現金代替性・利用目的）で行う\n飲食物以外の購入が常態化・換金的な使われ方は現金支給と評価され得る\n利用対象が飲食物に限定（仕様面の歯止め）\n閉域ネットワークゆえ運用での統制が重要',
      },
      {
        title: '実態を守る運用（推奨）',
        body:
          '規程に「勤務日の食事費用の軽減が目的」と明記し食事以外を禁止\n利用量・頻度をモニタリング、逸脱時は確認→申告→是正\n50%本人負担の徴収記録・上限管理ログを保存\n厳格運用が必要なら証憑スキャン(OCR)の活用も選択可',
      },
    ],
    misconception: '「食事以外に使える＝即課税」ではありません。恒常的な目的外利用が問題になります。',
    footnote: '出典：所得税基本通達 36-38の2／国税庁 No.2594。最終判断は顧問税理士へ。',
  },
  Q03: {
    id: 'Q03',
    category: '税務',
    question: '全社員を対象にしないとダメですか？一部の部署だけでは？',
    conclusion: '2要件に“全員対象”の明文はありませんが、公平な設計を強く推奨します。',
    sections: [
      {
        title: 'なぜ公平性が重要か',
        body:
          '特定の役職・部署だけ優遇すると福利厚生費性が崩れ「給与」評価のおそれ\n給与評価になると非課税前提が崩れ、社会保険の論点にも波及\n全社員に利用機会が開かれていることが税務・社保両面の安全側\n公平性は“守り(税務)”と“攻め(採用・定着)”の両用',
      },
      {
        title: '実務上の設計・注意',
        body:
          '利用機会の公平性を担保（説明会・希望募集・対象範囲の明文化）\n雇用形態（正社員/契約/パート）ごとの取扱いを事前に整理\n対象範囲は規程に明記し、運用と一致させる\n最終的な線引きは顧問社労士・税理士に確認',
      },
    ],
    misconception: '「役員だけ・一部部署だけ」は公平性を欠き、給与認定リスクが高まります。',
    footnote: '出典：所得税基本通達 36-38の2／国税庁 No.2594',
  },
  Q04: {
    id: 'Q04',
    category: '社会保険料',
    question: '社会保険料の算定に含まれますか？社保が上がるなら意味がないのでは？',
    conclusion:
      '本提案のROIは社保削減を前提としません。仮に算定対象でも提案の価値は変わりません。',
    sections: [
      {
        title: '正確な論点整理',
        body:
          '報酬該当性は実態で判断され、最終的には所轄の年金事務所・社労士の見解による\n健保法第3条第5項：報酬＝労働の対償として受けるすべて（現物給与を含む）\n現物給与は告示の価額で評価され、標準報酬月額に合算され得る\n当社は社会保険料の非算入を保証しません',
      },
      {
        title: 'だからこう考える（誠実な整理）',
        body:
          '確実に訴求できるのは所得税の非課税。社保は前提に入れない\n「2/3負担なら社保非算入」等の断定は実態・個社で異なり確約できない\n「約40年間 指摘ゼロ」は所得税の話。社保(年金事務所)とは別論点\n取扱いは貴社の社労士・年金事務所にご確認を',
      },
      {
        title: '実務確認フロー（推奨）',
        body:
          '① 顧問社労士に制度設計（負担割合・対象）を共有\n② 必要に応じ所轄の年金事務所へ照会\n③ 取扱い（標準報酬への算入有無）を文書化して運用\n所得税(税務署)と社保(年金事務所)は管轄が異なり判断も別',
      },
    ],
    misconception: '「2/3負担なら社保は非算入」と言い切るのは不正確。実態・個社で異なり確約できません。',
    footnote: '当社は社会保険料の非算入を保証しません。確実に訴求できるのは所得税の非課税です。',
  },
  Q05: {
    id: 'Q05',
    category: 'コスト・手数料',
    question: '手数料10%は高くありませんか？大人数だと月額が大きく見えます。',
    conclusion:
      '1人あたり手数料1,500円（15,000円×10%）。非課税ウェッジ（約1,500円）と税効果はおおむね相殺。便益は利用率・到達率・運用省力に表れる。',
    sections: [
      {
        title: '1人あたりの経済性（最大枠：チャージ15,000円／月）',
        body:
          '手数料：1,500円（15,000円×10%）\n非課税ウェッジ：所得税10%＋住民税10% ≒ +1,500円/人（社保は前提に含めない）\nネット（税効果のみ）：±0円/人・月\n絶対額は「人数×一定」。規模が増えても1人あたりは不変',
      },
      {
        title: '手数料の中身／逓減',
        body:
          'オールイン：システム・25万店決済網・カード発行/再発行・サポート・不正監視\n個別に調達すれば別費用になるものがすべて込み\n大企業向けにはボリュームディスカウント（規模別に料率逓減）\n固定料金の他社比較は総コスト・運用工数・実績で（Q07参照）',
      },
      {
        title: '会社負担の目安',
        body: '会社負担7,500円＋手数料1,500円＝9,000円／人・月（チャージ上限15,000円・折半の場合）',
      },
    ],
    misconception: '「手数料10%＝丸損」ではありません。税効果と相殺し、便益は利用率・TCO・管理省力に表れます。',
    footnote: '根拠：手数料1,500円＝15,000円×10%／非課税ウェッジ（所得税＋住民税 約20%）で実質±0。社保削減は含めず・概算。',
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
  Q07: {
    id: 'Q07',
    category: '競合比較',
    question: '固定料金の他社サービスの方が安いのではないですか？',
    conclusion: '月額の見かけは他社が安い場合があります。総コスト・運用負荷・実績で比較してください。',
    sections: [
      {
        title: '価格以外の差（チケットレストランの強み）',
        body:
          '全国25万店＋Uber Eats。在宅・現場・多拠点・出張先でも全社員に届く\n小規模拠点・少人数部署にも対応（最低人数の制約が出にくい）\n約40年・国内約4,000社の運用実績と継続性\n規程・労使協定・説明会まで導入を支援',
      },
      {
        title: '他社方式で要確認の点（総コスト視点）',
        body:
          'レシート・証憑の確認運用が前提だと管理工数が増える\n預託金・前払いの有無、最低人数の制約（各社の最新条件は要確認）\n「月額単価」でなく管理工数・カバレッジ・継続性まで含めた総コストで比較',
      },
      {
        title: '加盟店ネットワーク（Visa／クレジット系との比較）',
        body:
          'コンビニ・主要チェーンは Visa／Master／iD でほぼ同等\n汎用カード系が店舗数で上回るのは主に独立系飲食店\n日常の食事利用の大半はコンビニ＋デリバリーでカバー\n「店舗数」勝負に乗らず「従業員が実際に使う場所で使えるか＋運用価値」で土俵を変える',
      },
    ],
    misconception: null,
    footnote: '評価軸：月額単価でなくTCO（管理工数・カバレッジ・継続性）で比較。※他社の料金体系は各社公表値を要確認。',
  },
  Q08: {
    id: 'Q08',
    category: '運用',
    question: 'どこで使えるのですか？',
    conclusion: '全国25万店。コンビニ・飲食店・デリバリーで電子マネー(iD)のタッチ決済で使えます。',
    sections: [
      {
        title: '使える場所・規模',
        body:
          'チケットレストラン加盟店 約7万店＋Uber Eats 約18万店\nコンビニ大手・主要外食チェーン・個店・デリバリー\n在宅・現場・出張先でも使える＝全社員に公平に届く\nアプリで近くの加盟店を検索できる',
      },
      {
        title: '決済方法・地方カバレッジ',
        body:
          '決済は電子マネー(iD)のタッチ。iD加盟店で利用（専用端末は基本不要）\n地方の店舗数はエリアで差。コンビニ＋デリバリーで実用性を確保\n利用可能店舗はエリア指定で事前確認が可能',
      },
    ],
    misconception: null,
    footnote: '出典：エデンレッドジャパン提供情報。利用可能店舗は全国 約25万店。',
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
    footnote: '出典：エデンレッドジャパン提供情報。1日上限・有効期限・対象品目はプラン設定に基づく（最新仕様を要確認）。',
  },
  Q10: {
    id: 'Q10',
    category: '運用',
    question: '私的利用や不正利用は防げますか？',
    conclusion:
      '管理者は利用状況を可視化でき、カードの停止も可能。統制と証跡で抑止し、限界も正直にご説明します。',
    sections: [
      {
        title: '可視化・統制の仕組み',
        body:
          '管理ポータルで利用状況を可視化（部署・個人・期間別）\n紛失・退職・不正の疑い時はカードを即時停止できる\n食事以外の利用は規程で禁止し、量・頻度をモニタリング\n50%本人負担の徴収記録・1日上限・是正ログを保存',
      },
      {
        title: 'OCR連携と正直な限界',
        body:
          'OCRで対象外利用を検知した場合、課税対象額をCSVで管理者へ提供（いーウェル社連携）\n閉域ネットワークのため購入明細レベルの事後証憑確認は限定的\n完全な私的利用防止は技術的に困難。OCR・抜き取り確認で補完\n規程と運用設計で“実態としての食事補助”を担保',
      },
    ],
    misconception: null,
    footnote: '出典：エデンレッドジャパン提供情報。用途制限・利用履歴の可視化・加盟店側の制御で抑止。',
  },
  Q11: {
    id: 'Q11',
    category: '運用',
    question: '導入・運用は大変ですか？情報システム部門の負担は？',
    conclusion:
      '運用はシンプル。専用ポータルでのカード注文・チャージが中心で、情シス負担は基本ありません。',
    sections: [
      {
        title: '日常の運用',
        body:
          'カードは渡し切りで回収不要\n入金（チャージ）・利用状況は管理ポータルで一元管理\n特別なシステム連携・情シス対応は基本不要\n入退社のカード手配もポータルで完結',
      },
      {
        title: 'サポート体制',
        body:
          '規程文案・周知資料・運用モニタリングまで継続的に支援\n従業員はアプリで残高・履歴・加盟店検索・利用停止が可能\n問い合わせ窓口で従業員対応も支援\n導入時はオンボーディング（説明会資料・登録誘導）を提供',
      },
    ],
    misconception: null,
    footnote: '出典：エデンレッドジャパン提供情報。給与控除を追加するのみで情報システム部門の負担は最小。',
  },
  Q12: {
    id: 'Q12',
    category: '運用',
    question: 'スマホ決済はできますか？アプリで何ができますか？',
    conclusion:
      '現在はカードでのタッチ決済。アプリは残高・履歴・加盟店検索・利用停止などに対応します。',
    sections: [
      {
        title: 'アプリでできること',
        body:
          '残高確認・入金/利用履歴の確認\n加盟店検索（近くの使える店）\n紛失時の利用停止\n証憑スキャン（必要に応じた記録）',
      },
      {
        title: '決済方式と今後',
        body:
          '当面の決済はプリペイドカード（電子マネー iD）\nモバイル（スマホ）決済は今後の対応予定\n最新の提供状況は導入時にご案内',
      },
    ],
    misconception: null,
    footnote: '出典：エデンレッドジャパン提供情報。専用アプリで残高・利用履歴・加盟店検索が可能。',
  },
  Q13: {
    id: 'Q13',
    category: '導入・移行',
    question: '全社へどう展開しますか？全社一括で問題ありませんか？',
    conclusion:
      '最初から全社展開を前提に、設計→検証→稟議→順次ロールアウトで、確実に全社員へ届けます。',
    sections: [
      {
        title: '全社展開の4フェーズ',
        body:
          'Phase1 制度設計（補助額・対象・規程の確定）1〜2ヶ月\nPhase2 効果検証・従業員アンケートで根拠データ取得 1ヶ月\nPhase3 全社稟議の稟議書・役員説明資料の作成支援 1ヶ月\nPhase4 全社ロールアウト（拠点別に順次）2〜3ヶ月',
      },
      {
        title: 'なぜ有効か／支援',
        body:
          '効果と従業員反応を実データで確認しながら全社へ広げられる\n役員会・労組への説明材料を実データで用意できる\n制度設計〜全社展開まで当社が伴走支援\n大手企業でも全社展開での実績あり',
      },
    ],
    misconception: null,
    footnote: '出典：エデンレッドジャパン導入支援情報。全社一括展開を標準。規程・労使協定・説明会はひな型とサポート窓口で支援。',
  },
  Q14: {
    id: 'Q14',
    category: '導入・移行',
    question: '既存の食事手当・福利厚生からの切替は、目立ちませんか？',
    conclusion:
      '賃上げ発表と同時に切り替えると“目立たず”、従業員も前向きに受け止めやすくなります。',
    sections: [
      {
        title: '移行の進め方',
        body:
          '既存の食事手当・福利厚生の廃止/新設を賃上げと同時に\nEBP等のカフェテリアには“置き換え”でなく“追加”で共存も可能\n説明会で「実質手取りが増える」点を丁寧に説明\n移行スケジュール・FAQを事前準備',
      },
      {
        title: 'リスクと対処',
        body:
          '「課税→非課税の切替が目立つ」懸念は賃上げ同時・全社公平の設計で対応\n既存制度の利用率が低い場合、切替で満足度が上がるケースが多い\n労使協定・規程の更新を同時に実施\n移行設計・説明会を支援',
      },
    ],
    misconception: null,
    footnote: '出典：エデンレッドジャパン導入支援情報。既存の食事手当・福利厚生からの切替は段階・告知設計で円滑化。',
  },
  Q15: {
    id: 'Q15',
    category: '会社・実績',
    question: 'エデンレッドはどのような会社ですか？実績は？',
    conclusion:
      '食事補助の専業として、世界規模の基盤と日本40年の実績を持つ会社です。制度設計から運用・定着まで一気通貫で支援します。',
    sections: [
      {
        title: 'エデンレッド（グローバル）',
        body:
          '世界44カ国・6,000万人以上が利用\n食事補助（Ticket Restaurant）の世界的リーダー\n世界60年・日本40年の歴史',
      },
      {
        title: '日本での実績（ERJ）',
        body:
          '加盟店 約25万店（外食・中食・コンビニ・デリバリー等）\n利用率の参考値 98%（国内導入実績）\n導入〜運用までエデンレッドジャパンが支援',
      },
    ],
    misconception: null,
    footnote: '出典：Edenred公式・ERJ。世界44カ国・6,000万人／世界60年・日本40年／加盟店 約25万店／利用率参考値 98%。',
  },
};

/** scene → FAQ id(s) */
const SCENE_FAQ_MAP = {
  '非課税枠拡大が問い合わせの引き金': ['Q01'],
  '賃上げの代替として検討している': ['Q01', 'Q14'],
  '手数料10%が高いと言う': ['Q05'],
  '非課税は本当に大丈夫か確認': ['Q01'],
  '社会保険料への算入を心配する': ['Q04'],
  '不正利用（タバコ・酒・日用品）を懸念': ['Q02', 'Q10'],
  '天引きで手取りが減って見える': ['Q06'],
  '地方で使える店が少ないと言う': ['Q08'],
  'miiveと比較している': ['Q07', 'Q15'],
  'HQの固定手数料が安く見える': ['Q07'],
  'リロクラブ/ベネワンと併存している': ['Q07'],
  '税務最適化の論理で語り出す': ['Q01'],
  '院長・事務長が税務に踏み込む（医療）': ['Q01'],
  '費用対効果の根拠を求められる': ['Q05'],
  '置き型社食から乗り換え検討': ['Q08', 'Q14'],
  'スマホ決済の時期を気にする': ['Q12'],
  '残高繰越・有効期限を確認': ['Q09'],
  'パート・アルバイトの対象範囲': ['Q03'],
  '建設・電気工事業からの相談': ['Q08'],
  '医療・歯科・介護からの相談': ['Q08'],
  '運輸・物流からの相談': ['Q08'],
  '監査で何を見られるか問う': ['Q10'],
  '情シスが個人情報・権限を問う': ['Q11'],
  '1日の利用限度額を確認': ['Q09'],
  '事前学習済みで即決できる状態': ['Q13'],
  '「また連絡します」で終わりそう': ['Q13'],
};

/** Fields that must never change during FAQ merge */
const PRESERVE_FIELDS = [
  'shelf',
  'scene',
  'quote',
  'speaker',
  'speakerRead',
  'read',
  'doIt',
  'dont',
  'freq',
  'status',
  'sources',
];

function stableJson(value) {
  return JSON.stringify(value ?? null);
}

function validatePreservation(beforeCards, afterCards) {
  const beforeByScene = new Map(beforeCards.map((c) => [c.scene, c]));
  const errors = [];

  for (const after of afterCards) {
    const before = beforeByScene.get(after.scene);
    if (!before) continue;
    for (const field of PRESERVE_FIELDS) {
      if (stableJson(before[field]) !== stableJson(after[field])) {
        errors.push(
          `scene "${after.scene}": ${field} changed\n  before: ${stableJson(before[field])}\n  after:  ${stableJson(after[field])}`
        );
      }
    }
  }

  if (errors.length) {
    console.error('Non-destructive merge validation FAILED:\n');
    errors.forEach((e) => console.error(`- ${e}\n`));
    process.exit(1);
  }
}

const NEW_CARDS = [
  {
    shelf: 'DP',
    scene: '全社展開の進め方を確認（FAQ Q13）',
    quote: 'いきなり全社一括だと反対が出そう…段階的にできますか？',
    speaker: '人事・経営',
    speakerRead: '全社展開への不安。段階ロールアウトの具体像を求めている',
    read: '一括＝リスクと誤解しがち。設計→検証→稟議→ロールアウトの型があると安心する。',
    doIt:
      'Phase1制度設計→Phase2効果検証→Phase3稟議支援→Phase4拠点別ロールアウト（計5〜7ヶ月目安）。実データで役員・労組説明。ERJが伴走。',
    dont: '「全社一括必須」と圧力をかける／具体フェーズなしで「大丈夫です」と流す。',
    freq: '中（デッキFAQ）',
    status: 'proven',
    faqIds: ['Q13'],
  },
  {
    shelf: 'I',
    scene: '既存手当からの切替が目立つか心配（FAQ Q14）',
    quote: '今の食事手当をやめて非課税に替えると、目立ちませんか？',
    speaker: '人事・労組',
    speakerRead: '従業員の見え方・納得感が論点。移行設計の具体策を求めている',
    read: '切替自体が問題ではなく、告知・タイミング・公平性の設計が鍵。',
    doIt:
      '賃上げ発表と同時切替で“目立たず”前向きに。EBP等カフェテリアは置換でなく追加共存も可。移行FAQ・説明会で「実質手取り増」を丁寧に説明。',
    dont: '既存手当の突然廃止を告知なしで進める／課税→非課税の差額だけを強調して不安を煽る。',
    freq: '中（デッキFAQ）',
    status: 'proven',
    faqIds: ['Q14'],
  },
  {
    shelf: 'CO',
    scene: 'エデンレッドの会社・実績を確認（FAQ Q15）',
    quote: 'エデンレッドってどんな会社？日本でどれくらいの実績？',
    speaker: '経営・購買',
    speakerRead: 'ベンダー選定の最終確認。継続性・実績・支援体制を見ている',
    read: 'グローバル基盤＋日本40年・約4,000社・25万店が信頼の根拠。導入支援まで一気通貫。',
    doIt:
      '世界44カ国・6,000万人／世界60年・日本40年。国内約4,000社・加盟店約25万店・利用率参考98%。規程・労使協定・説明会まで伴走とセットで語る。',
    dont: '競合の機能細部比較に入る／実績数値を分析側の旧数字（4,500社等）で語る。',
    freq: '中（デッキFAQ）',
    status: 'proven',
    faqIds: ['Q15'],
    sources: [
      { label: 'エデンレッド公式', url: 'https://edenred.jp/' },
      { label: 'エデンレッド公式 チケットレストラン', url: 'https://edenred.jp/ticketrestaurant/' },
    ],
  },
];

function attachFaqIds(card) {
  const ids = card.faqIds ?? SCENE_FAQ_MAP[card.scene] ?? [];
  if (!ids.length) return card;
  return { ...card, faqIds: ids };
}

function writeFaqJson() {
  const items = Object.keys(FAQ)
    .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))
    .map((id) => FAQ[id]);
  const faqPath = path.join(ROOT, 'public/faq.json');
  let prevMeta = {};
  if (fs.existsSync(faqPath)) {
    try {
      prevMeta = JSON.parse(fs.readFileSync(faqPath, 'utf8')).meta ?? {};
    } catch {
      /* ignore */
    }
  }
  const faqOut = {
    meta: {
      version: prevMeta.version ?? '0.9.2',
      updated: prevMeta.updated ?? new Date().toISOString().slice(0, 10),
      source: '提案デッキ FAQ Q01–Q15',
      note: prevMeta.note ?? 'merge-deck-faq.mjs 正本',
      count: items.length,
      deck: prevMeta.deck ?? 'Edenred_TRT_大企業向け_0629.pptx',
    },
    items,
  };
  fs.writeFileSync(faqPath, JSON.stringify(faqOut, null, 2) + '\n');
  return items.length;
}

const raw = JSON.parse(fs.readFileSync(CARDS_PATH, 'utf8'));
const beforeCards = raw.cards.map((c) => ({ ...c, faq: undefined }));
const cards = raw.cards.map((c) => {
  const { faq: _faq, ...rest } = c;
  return attachFaqIds(rest);
});
validatePreservation(beforeCards, cards);
const existingScenes = new Set(cards.map((c) => c.scene));
for (const nc of NEW_CARDS) {
  if (!existingScenes.has(nc.scene)) cards.push(attachFaqIds(nc));
}

writeFaqJson();
const withFaqIds = cards.filter((c) => c.faqIds?.length).length;
const out = {
  meta: {
    version: raw.meta?.version?.startsWith('1.') ? raw.meta.version : '1.0.0',
    updated: new Date().toISOString().slice(0, 10),
    source: '商談文字起こし分析 — MEDDPICC カード',
    note: `FAQ分離 — faqIds参照のみ（${withFaqIds}枚）。FAQ正本は faq.json`,
    cards: cards.length,
    withFaqIds,
    faq: 'public/faq.json',
  },
  cards,
};

fs.writeFileSync(CARDS_PATH, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${cards.length} cards (${withFaqIds} with faqIds), faq.json (${Object.keys(FAQ).length} items)`);
