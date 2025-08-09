const sidebarElement = document.getElementById('sidebar');
const menuToggleButton = document.getElementById('menuToggle');
const videoGridElement = document.getElementById('videoGrid');
const searchFormElement = document.getElementById('searchForm');
const searchInputElement = document.getElementById('searchInput');

menuToggleButton.addEventListener('click', () => {
  sidebarElement.classList.toggle('collapsed');
});

searchFormElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInputElement.value.trim();
  if (!query) return;
  // For demo purposes, we just filter by title contains
  const filtered = sampleVideos.filter(v => v.title.toLowerCase().includes(query.toLowerCase()));
  renderVideos(filtered);
});

const sampleVideos = Array.from({ length: 24 }).map((_, idx) => {
  const id = idx + 1;
  const titleOptions = [
    'Learn JavaScript in 10 Minutes',
    'Relaxing Lofi Beats to Study/Work',
    'The Ultimate PC Build Guide',
    'Top 10 VS Code Extensions for 2025',
    'How the Web Works - Browser to Server',
    'React Performance Tips You Need',
    'Docker in 7 Minutes - Crash Course',
    'AI Coding Assistants Compared',
  ];
  const channelOptions = ['CodeCraft', 'Lofi Station', 'TechLab', 'Daily Dev', 'NetNinja', 'Frontend Pro', 'InfraOps', 'AI Studio'];
  const title = titleOptions[id % titleOptions.length] + ` #${id}`;
  const channelName = channelOptions[id % channelOptions.length];
  const views = Math.floor(Math.random() * 900 + 100) / 10; // 10.0 to 99.9 (in K)
  const ageDays = Math.floor(Math.random() * 700) + 1;
  const durationMin = Math.floor(Math.random() * 50) + 3;
  const durationSec = Math.floor(Math.random() * 60);
  const duration = `${durationMin}:${String(durationSec).padStart(2, '0')}`;
  const thumbUrl = `https://picsum.photos/seed/youtube-${id}/480/270`;
  const avatarUrl = `https://i.pravatar.cc/48?img=${(id % 70) + 1}`;
  return { id, title, channelName, views, ageDays, duration, thumbUrl, avatarUrl };
});

function formatViewsK(num) {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}M views`;
  return `${num.toFixed(1)}K views`;
}

function formatAge(days) {
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') node.textContent = v;
    else if (k === 'html') node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  return node;
}

function renderVideos(videos) {
  videoGridElement.innerHTML = '';

  videos.forEach((v) => {
    const card = el('article', 'video-card');

    const thumbWrap = el('a', 'thumbnail-wrap', { href: '#', 'aria-label': v.title });
    const img = el('img', '', { src: v.thumbUrl, alt: v.title });
    const duration = el('span', 'video-duration', { text: v.duration });
    thumbWrap.append(img, duration);

    const meta = el('div', 'video-meta');
    const avatar = el('img', 'channel-avatar', { src: v.avatarUrl, alt: `${v.channelName} avatar` });

    const textWrap = el('div', 'video-text');
    const title = el('h3', 'video-title', { text: v.title, title: v.title });
    const sub = el('div', 'video-subtext', { text: `${v.channelName} • ${formatViewsK(v.views)} • ${formatAge(v.ageDays)}` });
    textWrap.append(title, sub);

    const moreBtn = el('button', 'more-button', { 'aria-label': 'More actions', title: 'More' });
    moreBtn.innerHTML = '<span class="material-symbols-outlined">more_vert</span>';

    meta.append(avatar, textWrap, moreBtn);

    card.append(thumbWrap, meta);

    videoGridElement.appendChild(card);
  });
}

renderVideos(sampleVideos);