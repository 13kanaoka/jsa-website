// Board roster, newest term first.
//
// Photos are pulled straight from src/assets/board-photos/<term>/ by file name,
// so you never write an import. `nameEn` and `position` are parsed from the file
// name (e.g. "matt-rohde-public-relations.png" -> "Matt Rohde" / "public-relations").
//
// Optional per-member fields you can add inline:
//   nameEn     - override the parsed English name
//   position   - override the parsed position (must match a key in translations.positions)
//   nameJa     - shown in JA mode. Japanese members: kanji with a normal space
//                between family and given name. Everyone else: katakana in
//                family-name-first order, also space-separated.
//   funFactEn  - shown when a card is hovered / tapped
//   funFactJa  - Japanese fun fact; falls back to funFactEn when blank

const photos = import.meta.glob(
  '../assets/board-photos/*/*.{png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true, import: 'default' },
)

const KNOWN_POSITIONS = [
  'president', 'vp', 'secretary', 'treasurer', 'public-relations',
  'marketing', 'graphic-designer', 'content-creator', 'content-creation',
  'media', 'photography',
  'event-logistics', 'event-planner', 'event-coordinator', 'advisor',
]

const cap = (w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w)

function parseFile(file) {
  const stem = file.replace(/\.(png|jpe?g)$/i, '')
  const position = KNOWN_POSITIONS.find((p) => stem.endsWith(`-${p}`)) ?? ''
  const slug = position ? stem.slice(0, -(position.length + 1)) : stem
  const nameEn = slug.split('-').map(cap).join(' ')
  return { nameEn, position }
}

function resolvePhoto(folder, file) {
  const url = photos[`../assets/board-photos/${folder}/${file}`]
  if (!url && import.meta.env.DEV) {
    console.warn(`[board] no photo found for ${folder}/${file}`)
  }
  return url ?? null
}

const RAW = [
  {
    id: 'fall25', season: 'fall', year: 2025,
    members: [
      { file: 'annette-robertson-president.jpg', nameJa: 'ロバートソン アネット' },
      { file: 'vincenzo-escobar-vp.jpg', nameJa: 'エスコバル ビンチェンゾ' },
      { file: 'nandar-oo-wai-secretary.jpg', nameJa: 'ナンダー・ウー・ワイ' },
      { file: 'ace-tani-treasurer.jpg', nameJa: '谷 衛守' },
      { file: 'seto-kawate-treasurer.jpg', nameJa: '川手 瀬人' },
      { file: 'tomas-brosnan-public-relations.jpg', nameJa: 'ブロスナン トーマス' },
      { file: 'kaylynn-han-event-coordinator.jpg', nameJa: 'ハン ケイリン' },
    ],
  },
  {
    id: 'spring25', season: 'spring', year: 2025,
    members: [
      { file: 'ivan-president.jpg', nameEn: 'Ivan Jarquin', nameJa: 'ハルキン アイヴァン' },
      { file: 'karyo-sugimoto-vp.jpg', nameJa: '杉本 佳崚' },
      { file: 'asahi-kemmotsu-secretary.jpg', nameJa: '剣持 朝陽' },
      { file: 'ace-tani-treasurer.jpg', nameJa: '谷 衛守' },
      { file: 'matt-rohde-public-relations.jpg', nameJa: 'ローディー 眞杜' },
      { file: 'yuya-uchida-marketing.jpg', nameJa: '内田 裕也' },
      { file: 'annette-robertson-graphic-designer.jpg', nameJa: 'ロバートソン アネット' },
      { file: 'damian-nava-content-creator.jpg', nameJa: 'ナバ ダミアン' },
      { file: 'vincenzo-escobar-content-creation.jpg', nameJa: 'エスコバル ビンチェンゾ' },
      { file: 'naoto-yamagishi-event-coordinator.jpg', nameJa: '山岸 直人' },
    ],
  },
  {
    id: 'fall24', season: 'fall', year: 2024,
    members: [
      { file: 'ivan-jarquin-president.jpg', nameJa: 'ハルキン アイヴァン',
        funFactEn: 'Loves ducks.', funFactJa: 'アヒルが大好き。' },
      { file: 'karyo-sugimoto-vp.jpg', nameJa: '杉本 佳崚',
        funFactEn: 'Likes Pollo Loco.', funFactJa: 'ポージョ・ロコが好き。' },
      { file: 'ace-tani-treasurer.jpg', nameJa: '谷 衛守',
        funFactEn: 'Was chased by a guy with a knife.', funFactJa: 'ナイフを持った男に追いかけられたことがある。' },
      { file: 'matt-rohde-public-relations.jpg', nameJa: 'ローディー 眞杜',
        funFactEn: 'Is Danish.....', funFactJa: 'デンマーク人です……' },
      { file: 'toma-murase-marketing.jpg', nameJa: '刀麻',
        funFactEn: 'Eats rice with fruit.', funFactJa: 'ご飯を果物と一緒に食べる。' },
      { file: 'vincenzo-escobar-graphic-designer.jpg', nameJa: 'エスコバル ビンチェンゾ',
        funFactEn: 'Favorite movie: Ratatouille.', funFactJa: '好きな映画：レミーのおいしいレストラン。' },
      { file: 'alisa-content-creator.jpg', nameJa: '有紗',
        funFactEn: 'Does not like photos.', funFactJa: '写真が苦手。' },
    ],
  },
  {
    id: 'spring24', season: 'spring', year: 2024,
    members: [
      { file: 'riko-yoshida-president.jpg', nameJa: '吉田 リコ' },
      { file: 'ivan-jarquin-vp.jpg', nameJa: 'ハルキン アイヴァン' },
      { file: 'yukako-nomura-secretary.jpg', nameJa: '野村 由香子' },
      { file: 'cole-treasurer.jpg', nameJa: 'コール' },
      { file: 'smruti-event-planner.jpg', nameJa: 'スムルティ' },
      { file: 'toma-murase-event-planner.jpg', nameJa: '刀麻' },
      { file: 'matt-rohde-public-relations.jpg', nameJa: 'ローディー 眞杜' },
      { file: 'vincenzo-escobar-content-creation.jpg', nameJa: 'エスコバル ビンチェンゾ' },
    ],
  },
  {
    id: 'fall23', season: 'fall', year: 2023,
    members: [
      { file: 'mizuki-hatano-president.jpg', nameJa: '畑野 瑞季' },
      { file: 'ethan-grajo-vp.jpg', nameJa: 'グラホ イーサン' },
      { file: 'ivan-jarquin-secretary.jpg', nameJa: 'ハルキン アイヴァン' },
      { file: 'toma-murase-treasurer.jpg', nameJa: '刀麻' },
      { file: 'matt-rohde-public-relations.jpg', nameJa: 'ローディー 眞杜' },
      { file: 'vincenzo-escobar-public-relations.jpg', nameJa: 'エスコバル ビンチェンゾ' },
      { file: 'riko-yoshida-event-planner.jpg', nameJa: '吉田 リコ' },
    ],
  },
  {
    id: 'spring23', season: 'spring', year: 2023,
    members: [
      { file: 'miyu-kanaoka-president.jpg', nameJa: '金岡 実祐',
        funFactEn: "I'm really good at warming up a croissant — crispy and buttery.",
        funFactJa: 'クロワッサンを温めるのが得意。サクサクでバターたっぷりに仕上げます。' },
      { file: 'ethan-grajo-vp.jpg', nameJa: 'グラホ イーサン',
        funFactEn: 'Prefers cold weather.', funFactJa: '寒い気候のほうが好き。' },
      { file: 'hayato-eto-vp.jpg', nameJa: '江藤 隼斗',
        funFactEn: "I like waffles now, so let's make them together!",
        funFactJa: '最近ワッフルにハマっているので、一緒に作りましょう！' },
      { file: 'ivan-jarquin-secretary.jpg', nameJa: 'ハルキン アイヴァン',
        funFactEn: '🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆', funFactJa: '🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆' },
      { file: 'yuna-herman-treasurer.jpg', nameJa: 'ハーマン 夢渚',
        funFactEn: "I'm really good at remembering people's birthdays.",
        funFactJa: '人の誕生日を覚えるのが得意。' },
      { file: 'matt-rohde-public-relations.jpg', nameJa: 'ローディー 眞杜',
        funFactEn: "I can only beat Hayato at Smash Bros when he's drunk.",
        funFactJa: 'スマブラで隼斗に勝てるのは、彼が酔っているときだけ。' },
      { file: 'saki-yasuda-public-relations.jpg', nameJa: '安田 早希',
        funFactEn: 'I have a parakeet named Lettuce.', funFactJa: 'レタスという名前のインコを飼っている。' },
      { file: 'shotaro-matsudaira-event-logistics.jpg', nameJa: '松平 将太朗',
        funFactEn: 'Call me Shou-chan (しょうちゃん).', funFactJa: 'しょうちゃんって呼んでね。' },
    ],
  },
  {
    id: 'fall22', season: 'fall', year: 2022,
    members: [
      { file: 'yuki-kozono-president.jpg', nameJa: '小園 湧輝',
        funFactEn: 'Favorite beverage: the sea (海).', funFactJa: '好きな飲み物：海。' },
      { file: 'shinnosuke-se-vp.jpg', nameJa: '瀬 晨之介',
        funFactEn: 'Favorite food: sushi, girl.', funFactJa: '好きな食べ物：寿司、そして女の子。' },
      { file: 'jack-goldman-secretary.jpg', nameJa: 'ゴールドマン ジャック',
        funFactEn: 'Has an awesome bucket hat.', funFactJa: '最高のバケットハットを持っている。' },
      { file: 'kenneth-palos-treasurer.jpg', nameJa: 'パロス ケネス',
        funFactEn: 'Favorite band: Tool.', funFactJa: '好きなバンド：Tool。' },
      { file: 'shuhei-seki-public-relations.jpg', nameJa: '関 臭平',
        funFactEn: 'Is looking for a woman who is 153 cm tall.', funFactJa: '身長153cmの女性を募集中。' },
      { file: 'yu-chigira-media.jpg', nameJa: '千木良 優',
        funFactEn: '"Is this Sake Yakuza?" —Tatsuro', funFactJa: '「これって日本酒ヤクザ？」——達郎' },
      { file: 'yusei-negita-event-logistics.jpg', nameJa: 'ネギタ・ディ・ユーセー',
        funFactEn: 'Dream: become the Pirate King.', funFactJa: '夢：海賊王になること。' },
    ],
  },
  {
    id: 'spring22', season: 'spring', year: 2022,
    members: [
      { file: 'koa-kellenberger-president.jpg', nameJa: 'ケレンバーガ 虎亜',
        funFactEn: 'Favorite movie: The Wind Rises.', funFactJa: '好きな映画：風立ちぬ。' },
      { file: 'lia-kobayashi-vp.jpg', nameJa: '小林 リア',
        funFactEn: 'Favorite place to travel: Hawaii.', funFactJa: '好きな旅行先：ハワイ。' },
      { file: 'yota-inoyue-secretary.jpg', nameJa: '井上 陽太',
        funFactEn: 'Favorite movie: Charlie and the Chocolate Factory.',
        funFactJa: '好きな映画：チャーリーとチョコレート工場。' },
      { file: 'lorenzo-forteza-treasurer.jpg', nameJa: 'フォルテザ 絽蓮像',
        funFactEn: 'Favorite drink: winter melon.', funFactJa: '好きな飲み物：冬瓜茶。' },
      { file: 'takeru-kawakami-public-relations.jpg', nameJa: '川上 岳留',
        funFactEn: 'Favorite city: Waikiki.', funFactJa: '好きな街：ワイキキ。' },
      { file: 'tatsuro-kajioka-advisor.jpg', nameJa: '梶岡 達郎',
        funFactEn: 'Favorite movie: The Martian.', funFactJa: '好きな映画：オデッセイ。' },
    ],
  },
  {
    id: 'spring20', season: 'spring', year: 2020,
    members: [
      { file: 'tatsuro-kajioka-president.jpg', nameJa: '梶岡 達郎' },
      { file: 'nick-barbieri-vp.jpg', nameJa: 'バルビエリ ニック' },
      { file: 'andrew-kallah-treasurer.jpg', nameJa: 'カラー アンドリュー' },
      { file: 'alec-robertson-public-relations.jpg', nameJa: 'ロバートソン アレック' },
      { file: 'lia-kobayashi-public-relations.jpg', nameJa: '小林 リア' },
      { file: 'koa-kellenberger-photography.jpg', nameJa: 'ケレンバーガー 虎亜' },
      { file: 'LJ-tejada-event-coordinator.jpg', nameEn: 'LJ Tejada', nameJa: 'テハダ エルジェイ' },
      { file: 'kuang-myat-naing-event-coordinator.jpg', nameJa: 'クアン・ミャ・ナイン' },
      { file: 'risa-shikamura-event-coordinator.jpg', nameJa: '鹿村 里沙' },
    ],
  },
  {
    id: 'spring19', season: 'spring', year: 2019,
    members: [
      { file: 'harukaze-wakabayashi-president.jpg', nameJa: '若林 春風',
        funFactEn: 'I like to sing.', funFactJa: '歌うのが好き。' },
      { file: 'meona-sato-vp.jpg', nameEn: 'Moena Sato', nameJa: '佐藤 萌菜',
        funFactEn: 'Did equestrian in middle and high school.', funFactJa: '中学・高校で乗馬をやっていた。' },
      { file: 'takumi-wada-treasurer.jpg', nameJa: '和田 拓海',
        funFactEn: 'Half Japanese, half Indonesian.', funFactJa: '日本とインドネシアのハーフ。' },
      { file: 'russel-nakajima-public-relations.jpg', nameJa: '中島 ルッセル',
        funFactEn: 'I love basketball.', funFactJa: 'バスケットボールが大好き。' },
      { file: 'tatsuro-kajioka-public-relations.jpg', nameJa: '梶岡 達郎',
        funFactEn: 'I play baseball!', funFactJa: '野球をやっています！' },
      { file: 'evelyn-brokering-event-planner.jpg', nameJa: 'ブロッケリング エヴリン',
        funFactEn: 'Half Japanese, half German.', funFactJa: '日本とドイツのハーフ。' },
      { file: 'justin-navarro-event-planner.jpg', nameJa: 'ナバロ ジャスティン',
        funFactEn: 'Half Filipino and half Filipino.', funFactJa: 'フィリピンとフィリピンのハーフ。' },
      { file: 'kevin-martinez-event-planner.jpg', nameJa: 'マルティネス ケビン',
        funFactEn: 'A mix of German, Norwegian, Mexican, and Korean.',
        funFactJa: 'ドイツ・ノルウェー・メキシコ・韓国のミックス。' },
    ],
  },
]

export const board = RAW.map((term) => ({
  id: term.id,
  season: term.season,
  year: term.year,
  members: term.members.map((m) => {
    const parsed = parseFile(m.file)
    return {
      photo: resolvePhoto(term.id, m.file),
      nameEn: m.nameEn ?? parsed.nameEn,
      nameJa: m.nameJa ?? '',
      position: m.position ?? parsed.position,
      funFactEn: m.funFactEn ?? '',
      funFactJa: m.funFactJa ?? '',
    }
  }),
}))
