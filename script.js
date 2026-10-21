document.body.classList.add('intro-active');


 const players = [
  {
    name: 'ODIN WALA',
    role: 'OWNER & FOUNDER',
    image: 'uttam.png'
  },
  {
    name: 'BOULDER HATER',
    role: 'RAZE',
    image: 'raze.png'
  },
  {
    name: 'PWRETTISSS',
    role: 'NEON',
    image: 'neon.png'
  },
  {
    name: 'ASH',
    role: 'SAGE',
    image: 'sage.png'
  },
  {
    name: 'LUFFY',
    role: 'TEJO',
    image: 'tejo.png'
  }
];

const clips = [
  { title: 'CLUTCH MOMENTS', description: 'The rounds that matter', url: '' },
  { title: 'INSANE AIM', description: 'Precision under pressure', url: '' },
  { title: 'TEAM HIGHLIGHTS', description: 'VANTA in action', url: '' }
];

const socials = [
  { name: 'YOUTUBE', url: 'https://www.youtube.com/@SinsTV' },
  {
    name: 'INSTAGRAM',
    url: 'https://www.instagram.com/paapibhai.official/'
  },
  {
    name: 'DISCORD',
    url: 'https://discord.gg/kuTdgQcpM'
  }
];

const playerGrid = document.getElementById('playerGrid');

players.forEach((player, index) => {
  const card = document.createElement('article');
  card.className = 'player-card reveal';

  const portrait = document.createElement('div');
  portrait.className = 'player-portrait';

  if (player.image) {
    const photo = document.createElement('img');
    photo.src = player.image;
    photo.alt = player.name;
    photo.className = 'player-photo';

    photo.onerror = () => {
      photo.remove();
      const silhouette = document.createElement('div');
      silhouette.className = 'shadow-person';
      silhouette.setAttribute('aria-hidden', 'true');
      portrait.appendChild(silhouette);
    };

    portrait.appendChild(photo);
  } else {
    const silhouette = document.createElement('div');
    silhouette.className = 'shadow-person';
    silhouette.setAttribute('aria-hidden', 'true');
    portrait.appendChild(silhouette);
  }

  const info = document.createElement('div');
  info.className = 'player-info';

  const number = document.createElement('span');
  number.className = 'player-number';
  number.textContent = `PLAYER 0${index + 1}`;

  const name = document.createElement('h3');
  name.textContent = player.name;

  const role = document.createElement('p');
  role.textContent = player.role;

  info.append(number, name, role);
  card.append(portrait, info);
  playerGrid.appendChild(card);
});

const clipGrid = document.getElementById('clipGrid');

clips.forEach(clip => {
  const card = document.createElement('article');
  card.className = 'clip-card reveal';

  const preview = document.createElement('div');
  preview.className = 'clip-preview';
  preview.textContent = '▶';

  const info = document.createElement('div');
  info.className = 'clip-info';

  const tag = document.createElement('span');
  tag.className = 'clip-tag';
  tag.textContent = 'VANTA // HIGHLIGHTS';

  const title = document.createElement('h3');
  title.textContent = clip.title;

  const description = document.createElement('p');
  description.textContent = clip.description;

  info.append(tag, title, description);
  card.append(preview, info);

  if (clip.url) {
    card.tabIndex = 0;
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `Watch ${clip.title}`);

    card.addEventListener('click', () => {
      window.open(clip.url, '_blank', 'noopener,noreferrer');
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        window.open(clip.url, '_blank', 'noopener,noreferrer');
      }
    });
  }

  clipGrid.appendChild(card);
});

const socialLinks = document.getElementById('socialLinks');

socials.forEach(social => {
  const link = document.createElement('a');
  link.className = 'social-link';
  link.textContent = social.name;

  if (social.url) {
    link.href = social.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.href = '#social';
    link.addEventListener('click', event => {
      event.preventDefault();
    });
    link.setAttribute(
      'aria-label',
      social.name + ' link not configured yet'
    );
  }

  socialLinks.appendChild(link);
});

document.getElementById('year').textContent =
  new Date().getFullYear();

const introDuration = 5500;

window.setTimeout(() => {
  const intro = document.getElementById('intro');

  if (intro) {
    intro.style.animation = 'none';
    intro.style.opacity = '0';
    intro.style.visibility = 'hidden';
    intro.style.pointerEvents = 'none';
  }

  document.body.classList.remove('intro-active');
}, introDuration);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('reveal');
  revealObserver.observe(section);
});

document.querySelectorAll('.player-card, .clip-card').forEach(card => {
  revealObserver.observe(card);
});

// Logo responds to the user's scroll position.

const emblem = document.getElementById('emblem');

function updateEmblem() {
  if (!emblem) return;

  const progress = Math.min(
    Math.max(window.scrollY / (window.innerHeight * 0.7), 0),
    1
  );

  const eased = progress * progress * (3 - 2 * progress);

  const startWidth = Math.min(320, window.innerWidth * 0.55);
  const endWidth = window.innerWidth <= 600 ? 52 : 76;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.70;

  const left = centerX + (12 + endWidth / 2 - centerX) * eased;
  const top = centerY + (12 + endWidth / 2 - centerY) * eased;
  const width = startWidth + (endWidth - startWidth) * eased;

  emblem.style.left = `${left}px`;
  emblem.style.top = `${top}px`;
  emblem.style.width = `${width}px`;
  emblem.style.transform = 'translate(-50%, -50%)';

  emblem.classList.toggle('scrolled', progress > 0.98);
}


