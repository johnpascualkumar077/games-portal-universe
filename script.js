const games = [
  {
    title: 'サブウェイサーファーズ',
    category: 'action',
    thumb: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'でんしゃをよけながらコインをあつめて走りつづけよう！',
    description: 'サブウェイサーファーズは、カラフルなまちを走りぬけるゲームだよ。ひだり・みぎにうごいたり、ジャンプしたり、スライディングしたりしてでんしゃをよけよう。コインをあつめるとキャラクターやアイテムがもらえるよ。かんたんなそうさでだれでもすぐにあそべるけど、はやくなるとドキドキするよ！',
    url: 'https://poki.com/en/g/subway-surfers'
  },
  {
    title: 'モトX3M',
    category: 'driving',
    thumb: 'https://images.unsplash.com/photo-1558981001-19911d9d8b5b?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'バイクでジャンプ！しょうがいぶつをよけてゴールをめざそう。',
    description: 'モトX3Mは、バイクにのってコースをクリアするゲームだよ。ジャンプだい、ループ、うごくしょうがいぶつがいっぱい！スピードをだしすぎるとふっとんじゃうから、バランスがだいじ。しっぱいしてもすぐやりなおせるから、なんどもチャレンジしよう！ステージがすすむとどんどんむずかしくなるよ。',
    url: 'https://poki.com/en/g/moto-x3m'
  },
  {
    title: 'スティックマンフック',
    category: 'arcade',
    thumb: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'タップでぶらさがって、とんで、ゴールまでとどけ！',
    description: 'スティックマンフックは、フックでぶらさがってとぶゲームだよ。タップするだけのかんたんそうさ！でもタイミングがだいじで、うまくとべるとすごくきもちいい。ステージはみじかいから、サクサクあそべるよ。きれいなうごきでゴールできたときのたっせいかんはさいこう！',
    url: 'https://poki.com/en/g/stickman-hook'
  },
  {
    title: 'テトリス',
    category: 'puzzle',
    thumb: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'おちてくるブロックをならべて、よこいちれつをけそう！',
    description: 'テトリスは、うえからおちてくるブロックをくるくるまわして、よこいちれつにそろえてけすパズルゲームだよ。ルールはかんたんだけど、だんだんはやくなるからドキドキ！どこにおくかかんがえるのがたのしいよ。おわりがないから、じぶんのさいこうスコアをめざしてなんどもチャレンジしよう！',
    url: 'https://tetris.com/play-tetris'
  },
  {
    title: 'テンプルラン2',
    category: 'action',
    thumb: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'にげろ！ジャンプとスライドでワナをよけてコインをゲット！',
    description: 'テンプルラン2は、いせきのなかをはしってにげるゲームだよ。まがりかど、がけ、ひのワナがつぎつぎでてくるから、すばやくよけよう！コインをあつめるとキャラクターやパワーアップがもらえるよ。まいかいちがうコースだから、あきずにあそべるよ。じぶんのきろくをこうしんしよう！',
    url: 'https://poki.com/en/g/temple-run-2'
  },
  {
    title: '2048',
    category: 'puzzle',
    thumb: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'おなじすうじをくっつけて、2048をめざそう！',
    description: '2048は、すうじのパズルゲームだよ。おなじすうじをスライドしてくっつけると、あたらしいすうじになるよ。2、4、8、16… どんどんおおきくして、2048をめざそう！かんたんそうだけど、マスがうまっちゃうとゲームオーバー。よくかんがえておくばしょをきめよう！ゆっくりあそべるからリラックスしてたのしめるよ。',
    url: 'https://play2048.co/'
  }
];

const gameGrid = document.getElementById('game-grid');
const searchInput = document.getElementById('game-search');
const catBtns = document.querySelectorAll('.cat-btn');
const modal = document.getElementById('game-modal');
const gameContainer = document.getElementById('game-container');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.getElementById('close-modal');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const openTabBtn = document.getElementById('open-tab-btn');

let activeCategory = 'all';
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderGames() {
  const search = searchInput.value.trim().toLowerCase();
  const filteredGames = games.filter((game) => {
    const byCategory = activeCategory === 'all' || game.category === activeCategory;
    const bySearch = game.title.toLowerCase().includes(search) || game.shortDescription.toLowerCase().includes(search);
    return byCategory && bySearch;
  });

  if (filteredGames.length === 0) {
    gameGrid.innerHTML = '<div class="empty-state">ゲームがみつかりませんでした。ほかのことばでさがしてみてね！</div>';
    return;
  }

  gameGrid.innerHTML = filteredGames
    .map((game) => `
      <article class="game-card">
        <img src="${game.thumb}" alt="${escapeHtml(game.title)}のがぞう" class="game-thumb" loading="lazy">
        <div class="game-body">
          <div class="game-topline">
            <h2 class="game-title">${escapeHtml(game.title)}</h2>
            <span class="game-category">${escapeHtml(game.category)}</span>
          </div>
          <p class="game-short">${escapeHtml(game.shortDescription)}</p>
          <button class="play-btn" data-title="${escapeHtml(game.title)}">▶ あそぶ！</button>
        </div>
      </article>
    `)
    .join('');

  document.querySelectorAll('.play-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = games.find((game) => game.title === button.dataset.title);
      openGame(selected);
    });
  });
}

function openGame(game) {
  modalTitle.textContent = game.title;
  modalDescription.textContent = game.description;
  gameContainer.innerHTML = `<iframe src="${game.url}" title="${game.title}" allow="fullscreen; autoplay; gamepad" allowfullscreen loading="lazy" referrerpolicy="no-referrer"></iframe>`;
  openTabBtn.href = game.url;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  gameContainer.innerHTML = '';
  openTabBtn.href = '#';
  document.body.style.overflow = '';
}

searchInput.addEventListener('input', renderGames);
catBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    catBtns.forEach((item) => item.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    renderGames();
  });
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

fullscreenBtn.addEventListener('click', () => {
  const iframe = gameContainer.querySelector('iframe');
  if (!iframe) return;

  if (iframe.requestFullscreen) iframe.requestFullscreen();
  else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
  else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
});

renderGames();
