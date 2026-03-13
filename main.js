const games = [
    {
        title: "Subway Surfers",
        category: "action",
        thumb: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80",
        url: "https://poki.com/en/g/subway-surfers"
    },
    {
        title: "Moto X3M",
        category: "driving",
        thumb: "https://images.unsplash.com/photo-1558484666-63ca9cb72473?w=400&q=80",
        url: "https://poki.com/en/g/moto-x3m"
    },
    {
        title: "Stickman Hook",
        category: "arcade",
        thumb: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&q=80",
        url: "https://poki.com/en/g/stickman-hook"
    },
    {
        title: "Tetris",
        category: "puzzle",
        thumb: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&q=80",
        url: "https://tetris.com/play-tetris"
    }
];

const gameGrid = document.getElementById('game-grid');
const searchInput = document.getElementById('game-search');
const catBtns = document.querySelectorAll('.cat-btn');

function renderGames(filter = 'all', search = '') {
    gameGrid.innerHTML = '';
    
    const filteredGames = games.filter(game => {
        const matchesCat = filter === 'all' || game.category === filter;
        const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
    });

    filteredGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumb}" alt="${game.title}" class="game-thumb">
            <div class="game-title">${game.title}</div>
        `;
        card.onclick = () => openGame(game);
        gameGrid.appendChild(card);
    });
}

// Modal Logic
const modal = document.getElementById('game-modal');
const gameContainer = document.getElementById('game-container');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.querySelector('.close-btn');

function openGame(game) {
    modalTitle.innerText = game.title;
    gameContainer.innerHTML = `<iframe src="${game.url}" allowfullscreen></iframe>`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeBtn.onclick = () => {
    modal.style.display = 'none';
    gameContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
};

window.onclick = (event) => {
    if (event.target == modal) closeBtn.onclick();
};

// Search & Filter
searchInput.oninput = (e) => {
    const activeCat = document.querySelector('.cat-btn.active').dataset.cat;
    renderGames(activeCat, e.target.value);
};

catBtns.forEach(btn => {
    btn.onclick = () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGames(btn.dataset.cat, searchInput.value);
    };
});

// Fullscreen
document.getElementById('fullscreen-btn').onclick = () => {
    const iframe = gameContainer.querySelector('iframe');
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
};

// Initial Render
renderGames();
