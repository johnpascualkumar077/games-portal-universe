const games = [
  {
    title: 'Subway Surfers',
    category: 'action',
    thumb: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Dash through colorful city tracks, dodge trains, and collect coins in fast sessions.',
    description: 'Subway Surfers is a speed-focused endless runner where your main objective is to survive for as long as possible while collecting coins and power-ups. The controls are simple, but the pace becomes intense quickly, making each run exciting even if you only have a few minutes. You can unlock characters, hoverboards, and score boosters as you improve. The game works well for quick breaks because every attempt feels different, and the bright art style keeps the action readable and fun on both mobile and desktop screens.',
    url: 'https://poki.com/en/g/subway-surfers'
  },
  {
    title: 'Moto X3M',
    category: 'driving',
    thumb: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Race a stunt bike through explosive obstacle tracks and beat your own best time.',
    description: 'Moto X3M combines racing and physics-based platforming in short, creative levels packed with ramps, loops, and moving hazards. You need to manage speed and balance at the same time, because pushing too hard can send your rider flipping into danger. Restarting is instant, so trial-and-error feels rewarding instead of frustrating. As levels get harder, careful timing becomes more important than pure speed, which gives the game satisfying depth. It is an excellent pick for players who enjoy fast reflex gameplay with a steady progression of increasingly clever track designs.',
    url: 'https://poki.com/en/g/moto-x3m'
  },
  {
    title: 'Stickman Hook',
    category: 'arcade',
    thumb: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Swing from point to point with smooth momentum and clear one-tap controls.',
    description: 'Stickman Hook is an arcade momentum game where you launch, swing, and release at the right moment to fly through compact levels. The core mechanic is very easy to understand, but mastering rhythm and trajectory takes practice, which keeps the gameplay engaging over time. Levels are short and snappy, so it is ideal when you want instant action without a long commitment. Its clean visuals make movement easy to read, and successful swings feel rewarding. If you like score chasing and polished controls, this game delivers a consistently fun experience.',
    url: 'https://poki.com/en/g/stickman-hook'
  },
  {
    title: 'Tetris',
    category: 'puzzle',
    thumb: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Stack falling blocks efficiently, clear lines, and survive as speed increases.',
    description: 'Tetris is a timeless puzzle classic that challenges spatial thinking, planning, and composure under pressure. Different block shapes fall from above, and your task is to rotate and place them to complete horizontal lines. As lines clear, your score rises and the pace gradually increases, demanding quicker decisions. The rules are simple enough for beginners, yet high-level play rewards strategy and precision. Because each round is compact and endlessly replayable, Tetris remains one of the best choices for players who enjoy skill-based puzzle sessions that are easy to start and hard to stop.',
    url: 'https://tetris.com/play-tetris'
  },
  {
    title: 'Temple Run 2',
    category: 'action',
    thumb: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Escape dangerous paths with quick swipes, jumps, slides, and coin collecting.',
    description: 'Temple Run 2 delivers a cinematic endless-runner experience with winding paths, sharp turns, and environmental hazards that force quick reactions. You collect coins while avoiding cliffs, fire traps, and obstacles that appear with little warning. The movement system is simple, but long runs demand focus and quick pattern recognition. Unlocking upgrades and characters adds a sense of progression between sessions. It is a strong option for players who enjoy high-energy action with short rounds, since every run offers a fresh sequence of risks and opportunities to beat your personal high score.',
    url: 'https://poki.com/en/g/temple-run-2'
  },
  {
    title: '2048',
    category: 'puzzle',
    thumb: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Slide numbered tiles, combine matches, and build toward the 2048 target tile.',
    description: '2048 is a strategic number puzzle that looks simple but rewards careful long-term planning. You slide tiles across a small grid, combining matching values to create larger numbers while preventing the board from filling up. Each move matters because random tile spawns can quickly limit your options. The challenge is balancing short-term merges with a stable board setup for future turns. It is perfect for thoughtful players who enjoy calm but mentally engaging gameplay. With no timer pressure, 2048 offers a relaxing pace while still providing a satisfying sense of progress and mastery.',
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


const themeSelect = document.getElementById('theme-select');
const THEME_STORAGE_KEY = 'ui-theme';

function applyTheme(themeName) {
  const validThemes = ['default', 'xbox', 'nintendo', 'geforcenow', 'playstation'];
  const nextTheme = validThemes.includes(themeName) ? themeName : 'default';
  document.body.setAttribute('data-theme', nextTheme);
  if (themeSelect) {
    themeSelect.value = nextTheme;
  }
}


function initializeAds() {
  const adConfig = window.UNIVERSE_ADS || {};
  const adClient = (adConfig.client || '').trim();
  const adsEnabled = adConfig.enabled !== false;
  const hasRealClient = adsEnabled && /^ca-pub-\d{10,}$/.test(adClient);

  document.querySelectorAll('.ad-slot').forEach((slot) => {
    if (hasRealClient) {
      slot.setAttribute('data-ad-client', adClient);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (_) {
        slot.classList.add('is-placeholder');
        slot.textContent = 'Ad failed to load.';
      }
    } else {
      slot.classList.add('is-placeholder');
      slot.textContent = 'Set your AdSense client/slot IDs to enable ads.';
    }
  });
}

function initializeTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'default';
  applyTheme(storedTheme);

  if (themeSelect) {
    themeSelect.addEventListener('change', () => {
      applyTheme(themeSelect.value);
      localStorage.setItem(THEME_STORAGE_KEY, themeSelect.value);
    });
  }
}


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
    gameGrid.innerHTML = '<div class="empty-state">No games found. Try a different search or category filter.</div>';
    return;
  }

  gameGrid.innerHTML = filteredGames
    .map((game) => `
      <article class="game-card">
        <img src="${game.thumb}" alt="${game.title} thumbnail" class="game-thumb" loading="lazy">
        <div class="game-body">
          <div class="game-topline">
            <h2 class="game-title">${escapeHtml(game.title)}</h2>
            <span class="game-category">${escapeHtml(game.category)}</span>
          </div>
          <p class="game-short">${escapeHtml(game.shortDescription)}</p>
          <button class="play-btn" data-title="${escapeHtml(game.title)}">Play Now</button>
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

initializeTheme();
initializeAds();
renderGames();
