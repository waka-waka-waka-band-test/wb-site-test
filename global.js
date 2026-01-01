const audio = document.getElementById('persistent-audio');
const miniPlayer = document.getElementById('global-mini-player');
const playPauseBtn = document.getElementById('mini-play-pause');
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');

// --- THEME LOGIC ---
if(localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeBtn?.addEventListener('click', () => {
    themeBtn.style.transform = "scale(0.8)";
    setTimeout(() => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeIcon.classList.replace(isLight ? 'fa-moon' : 'fa-sun', isLight ? 'fa-sun' : 'fa-moon');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeBtn.style.transform = "scale(1)";
    }, 100);
});

// --- AUDIO LOGIC ---
function playNewSong(src, art, title) {
    audio.src = src;
    localStorage.setItem('audio-src', src);
    localStorage.setItem('audio-art', art);
    localStorage.setItem('audio-title', title);
    localStorage.setItem('audio-playing', 'true');
    audio.play();
    updateMiniPlayer(art, title);
}

function updateMiniPlayer(art, title) {
    miniPlayer.style.display = 'flex';
    document.getElementById('mini-player-art').src = art;
    document.getElementById('mini-player-title').innerText = title;
}

audio.ontimeupdate = () => localStorage.setItem('audio-pos', audio.currentTime);

window.addEventListener('load', () => {
    const isPlaying = localStorage.getItem('audio-playing') === 'true';
    if (isPlaying && localStorage.getItem('audio-src')) {
        audio.src = localStorage.getItem('audio-src');
        audio.currentTime = parseFloat(localStorage.getItem('audio-pos') || 0);
        audio.play();
        updateMiniPlayer(localStorage.getItem('audio-art'), localStorage.getItem('audio-title'));
    }
});

playPauseBtn.onclick = () => {
    if (audio.paused) { audio.play(); playPauseBtn.innerText = '⏸'; localStorage.setItem('audio-playing', 'true'); }
    else { audio.pause(); playPauseBtn.innerText = '▶'; localStorage.setItem('audio-playing', 'false'); }
};