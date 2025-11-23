const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
const loader = document.getElementById('page-loader');
const blogContainer = document.getElementById('blogContainer');
const yearEl = document.getElementById('year');

const THEME_KEY = 'bento-theme';

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  themeIcon.classList.toggle('fa-sun', theme === 'light');
  themeIcon.classList.toggle('fa-moon', theme !== 'light');
  themeLabel.textContent = theme === 'light' ? 'Light' : 'Dark';
}

function toggleTheme() {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
}

async function loadBlogPosts() {
  try {
    const res = await fetch('blog/posts/index.json');
    const posts = await res.json();
    blogContainer.innerHTML = '';

    posts.forEach(async (post) => {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-4';

      const card = document.createElement('div');
      card.className = 'bento-card h-100';

      const img = document.createElement('img');
      img.src = post.image;
      img.alt = post.title;
      img.className = 'blog-image mb-3';
      img.loading = 'lazy';

      const title = document.createElement('h3');
      title.className = 'h6 fw-bold';
      title.textContent = post.title;

      const meta = document.createElement('div');
      meta.className = 'text-secondary small mb-2';
      meta.textContent = post.date;

      const body = document.createElement('p');
      body.className = 'text-secondary';
      body.textContent = 'Yükleniyor...';

      card.append(img, title, meta, body);
      col.append(card);
      blogContainer.append(col);

      try {
        const textRes = await fetch(post.path);
        const text = await textRes.text();
        body.textContent = text.trim();
      } catch (error) {
        body.textContent = 'Yazı yüklenirken bir sorun oluştu.';
      }
    });
  } catch (error) {
    blogContainer.innerHTML = '<div class="col-12"><div class="bento-card text-center text-danger">Blog verileri yüklenemedi.</div></div>';
  }
}

function setYear() {
  const now = new Date();
  yearEl.textContent = now.getFullYear();
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);
  themeToggle?.addEventListener('click', toggleTheme);
  setYear();
  loadBlogPosts();

  setTimeout(() => loader?.classList.add('hidden'), 800);
});
