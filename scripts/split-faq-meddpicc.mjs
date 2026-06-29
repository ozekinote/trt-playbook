#!/usr/bin/env node
/**
 * Split embedded FAQ from cards.json into public/faq.json.
 * cards.json keeps faqIds only (cross-reference). Removes `faq` from each card.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CARDS_PATH = path.join(ROOT, 'public/cards.json');
const FAQ_PATH = path.join(ROOT, 'public/faq.json');

const raw = JSON.parse(fs.readFileSync(CARDS_PATH, 'utf8'));
const faqMap = new Map();

for (const card of raw.cards) {
  const faqs = card.faq ? (Array.isArray(card.faq) ? card.faq : [card.faq]) : [];
  for (const f of faqs) {
    if (f?.id && !faqMap.has(f.id)) faqMap.set(f.id, f);
  }
}

const order = [...faqMap.keys()].sort((a, b) => {
  const na = Number(a.slice(1));
  const nb = Number(b.slice(1));
  return na - nb;
});

if (order.length !== 15) {
  console.warn(`Expected 15 FAQ entries, got ${order.length}`);
}

const deck = raw.meta?.deck ?? 'Edenred_TRT_大企業向け_0629.pptx';
const faqOut = {
  meta: {
    version: raw.meta?.version?.startsWith('0.9') ? raw.meta.version : '0.9.2',
    updated: raw.meta?.updated ?? '2026-06-29',
    source: '提案デッキ FAQ Q01–Q15',
    note: raw.meta?.note ?? '0629反映：Q01施行日・Q06お金の流れ・Q09文言',
    count: order.length,
    deck,
  },
  items: order.map((id) => faqMap.get(id)),
};

const cards = raw.cards.map(({ faq: _faq, ...rest }) => rest);
const withFaqIds = cards.filter((c) => c.faqIds?.length).length;

const cardsOut = {
  meta: {
    version: '1.0.0',
    updated: new Date().toISOString().slice(0, 10),
    source: '商談文字起こし分析 — MEDDPICC カード',
    note: `FAQ分離 — faqIds参照のみ（${withFaqIds}枚）。FAQ正本は faq.json`,
    cards: cards.length,
    withFaqIds,
    faq: 'public/faq.json',
  },
  cards,
};

fs.writeFileSync(FAQ_PATH, JSON.stringify(faqOut, null, 2) + '\n');
fs.writeFileSync(CARDS_PATH, JSON.stringify(cardsOut, null, 2) + '\n');
console.log(`Wrote faq.json (${order.length} items) and cards.json (${cards.length} cards, faq stripped)`);
