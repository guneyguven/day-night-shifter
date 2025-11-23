import { useEffect, useMemo, useState } from 'react';

const THEME_KEY = 'next-bento-theme';

const portfolioItems = [
  {
    title: 'Veri Odaklı Dashboard',
    description: 'Canlı veri akışı, tematik görselleştirme ve interaktif filtreler.',
    image: 'https://images.unsplash.com/photo-1527443224154-d2e0c09356b1?auto=format&fit=crop&w=800&q=80',
    badges: ['React', 'D3.js'],
  },
  {
    title: 'Headless E-ticaret',
    description: 'SEO dostu, çoklu tema destekli ve performanslı vitrin.',
    image: 'https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&fit=crop&w=800&q=80',
    badges: ['Next.js', 'Stripe'],
  },
  {
    title: 'Mobil Ürün Deneyimi',
    description: 'Mikro animasyonlar, sezgisel akışlar ve offline-first özellikler.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    badges: ['React Native', 'Firebase'],
  },
];

const tools = ['VS Code', 'Figma', 'Notion', 'Linear', 'Vercel', 'Railway', 'Supabase', 'GitHub Actions'];

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/blog/posts/index.json');
        const posts = await response.json();
        const detailed = await Promise.all(
          posts.map(async (post) => {
            const textRes = await fetch(`/${post.path}`);
            const text = await textRes.text();
            return { ...post, body: text.trim() };
          })
        );
        setBlogPosts(detailed);
      } catch (error) {
        setBlogPosts([]);
      }
    }
    loadPosts();
  }, []);

  useEffect(() => {
    const loader = document.getElementById('page-loader');
    const timer = setTimeout(() => loader?.classList.add('hidden'), 800);
    return () => clearTimeout(timer);
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="bg-body text-body">
      <div className="page-loader" id="page-loader">
        <div className="spinner-grow text-primary" role="status"></div>
        <p className="mt-3 fw-semibold">Yükleniyor...</p>
      </div>
      <header className="py-3 sticky-top glassy">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand fw-bold text-gradient" href="#home">
              Güven
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Menüyü Aç"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                <li className="nav-item">
                  <a className="nav-link" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#bio">
                    Bio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#portfolio">
                    Portfolio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#blog">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item ms-lg-3">
                  <button
                    className="btn btn-outline-primary d-flex align-items-center gap-2"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  >
                    <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
                    <span className="small">{theme === 'light' ? 'Light' : 'Dark'}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="container py-5">
        <section id="home" className="mb-5">
          <div className="row g-4 bento-grid">
            <div className="col-12 col-lg-6">
              <div className="bento-card gradient-card h-100">
                <div>
                  <p className="text-uppercase fw-semibold small text-secondary">Selam!</p>
                  <h1 className="display-5 fw-bold">Next.js Bento Portföy</h1>
                  <p className="lead text-secondary">
                    Aynı tasarım dilini Next.js sürümüyle de yaşayabilirsiniz. Tema tercihi ve blog içeriği paylaşılır.
                  </p>
                  <div className="d-flex gap-3 mt-4 flex-wrap">
                    <a href="#portfolio" className="btn btn-primary btn-lg">
                      Projeler
                    </a>
                    <a href="#contact" className="btn btn-outline-primary btn-lg">
                      İletişim
                    </a>
                  </div>
                </div>
                <div className="floating-dots" aria-hidden="true"></div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bento-card h-100">
                <div className="icon-bubble bg-primary-subtle text-primary">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <h3 className="h5 fw-bold">Paylaşılan İçerik</h3>
                <p className="text-secondary">Blog yazıları public klasöründe düz metin olarak saklanır, kolayca güncellenir.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bento-card h-100">
                <div className="icon-bubble bg-success-subtle text-success">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <h3 className="h5 fw-bold">Animasyonlu Akış</h3>
                <p className="text-secondary">Kart girişleri ve yükleme ekranı sayfaya dinamizm katar.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="bio" className="mb-5">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-4">
              <div className="bento-card text-center h-100">
                <div className="avatar-circle mb-3">
                  <span className="avatar-initial">G</span>
                </div>
                <h2 className="h4 fw-bold">Güven</h2>
                <p className="text-secondary mb-0">Ürün odaklı full-stack geliştirici ve deneyim tasarımcısı.</p>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="bento-card h-100">
                <h3 className="h5 fw-bold mb-3">Kısa Bio</h3>
                <p className="text-secondary">
                  Tasarım ve mühendisliği birleştirerek kullanıcı odaklı ürünler geliştiriyorum. Performans, erişilebilirlik ve
                  anlatıma önem veriyorum.
                </p>
                <div className="row g-3 mt-2">
                  {['Next.js', 'Bootstrap 5', 'Animasyon', 'Erişilebilirlik', 'UI/UX', 'Strateji'].map((pill) => (
                    <div className="col-6 col-md-4" key={pill}>
                      <div className="pill">{pill}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 fw-bold mb-0">Portfolio</h2>
            <span className="text-secondary small">Bootstrap grid + Next.js</span>
          </div>
          <div className="row g-4">
            {portfolioItems.map((item) => (
              <div className="col-12 col-md-6 col-lg-4" key={item.title}>
                <div className="bento-card portfolio-card h-100">
                  <img src={item.image} alt={item.title} className="img-fluid rounded-3 mb-3" loading="lazy" />
                  <h3 className="h5 fw-bold">{item.title}</h3>
                  <p className="text-secondary">{item.description}</p>
                  <div className="d-flex gap-2 flex-wrap">
                    {item.badges.map((badge) => (
                      <span className="badge bg-primary-subtle text-primary" key={badge}>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="blog" className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 fw-bold mb-0">Blog</h2>
            <span className="text-secondary small">Düz metin dosyalarından yüklenir</span>
          </div>
          <div className="row g-4" aria-live="polite">
            {blogPosts.length === 0 && (
              <div className="col-12">
                <div className="bento-card text-center">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-3 mb-0 text-secondary">Yazılar yükleniyor...</p>
                </div>
              </div>
            )}
            {blogPosts.map((post) => (
              <div className="col-12 col-md-6 col-lg-4" key={post.title}>
                <div className="bento-card h-100">
                  <img src={post.image} alt={post.title} className="blog-image mb-3" loading="lazy" />
                  <h3 className="h6 fw-bold">{post.title}</h3>
                  <div className="text-secondary small mb-2">{post.date}</div>
                  <p className="text-secondary">{post.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mb-5">
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div className="bento-card h-100">
                <h2 className="h4 fw-bold mb-3">İletişim</h2>
                <p className="text-secondary">Proje, iş birliği veya merhaba demek için ulaşın.</p>
                <ul className="list-unstyled d-grid gap-3">
                  <li className="d-flex align-items-center gap-3">
                    <span className="icon-bubble bg-primary-subtle text-primary">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <div>
                      <div className="fw-bold">E-posta</div>
                      <a className="text-primary" href="mailto:guven@example.com">
                        guven@example.com
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <span className="icon-bubble bg-info-subtle text-info">
                      <i className="fa-brands fa-linkedin"></i>
                    </span>
                    <div>
                      <div className="fw-bold">LinkedIn</div>
                      <a className="text-info" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                        linkedin.com/in/guven
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="bento-card h-100 gradient-card">
                <h3 className="h5 fw-bold mb-3">Favori araçlar</h3>
                <div className="tool-grid">
                  {tools.map((tool) => (
                    <div className="tool-chip" key={tool}>
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-4 border-top glassy">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="text-secondary small">Güven © {currentYear}</div>
          <div className="d-flex gap-3 fs-5">
            <a className="text-primary" href="#contact" aria-label="İletişim" title="İletişim">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a
              className="text-gradient"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
