/* ═══════════════════════════════════════════════════════════════
   Süleyman Emre Arlı — Portföy SPA
   Hash tabanlı router + canlı GitHub verisi
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Yapılandırma ──────────────────────────────────────────────
const GH = {
    user: 'AllenVB',
    reposUrl: 'https://api.github.com/users/AllenVB/repos?per_page=100&sort=updated',
    contribUrl: 'https://github-contributions-api.jogruber.de/v4/AllenVB?y=last',
    contribAllUrl: 'https://github-contributions-api.jogruber.de/v4/AllenVB',
    // GitHub profilinde pinlenmiş depolar
    pinned: [
        'Vehicle-Tracking-Simulation',
        'event-driven-pipeline',
        'CoreMetrics',
        'n8n_Finans',
        'BizimSite',
        'AllenVB-WebSayfasi'
    ],
    // Projeler sayfasında gösterilecek depolar (elle seçili).
    // Buraya eklenmeyen depolar listelenmez; sıralama son güncellenme tarihine göre yapılır.
    showcase: [
        // pinliler
        'Vehicle-Tracking-Simulation',
        'event-driven-pipeline',
        'CoreMetrics',
        'n8n_Finans',
        'BizimSite',
        'AllenVB-WebSayfasi',
        // diğer seçilenler
        'n8n_News',
        'TraveLog',
        'SmartHomeSecurity-VeriTaban-',
        'Project-Management-Systems',
        'usersso',
        'Login-Form',
        'VeriBilimi',
        'Market-Alisveris-Sistemi',
        'Ogrenci-Bilgi-Sistemi'
    ]
};

// Pinli projeler için elle zenginleştirilmiş bilgi (API'de olmayan detaylar)
const PROJECT_META = {
    'Vehicle-Tracking-Simulation': {
        title: 'Vehicle Tracking & Fleet Telematics',
        icon: 'bi-truck',
        tags: ['Java 21', 'Spring Boot', 'Kafka Streams', 'TimescaleDB', 'PostGIS', 'Redis', 'Docker'],
        desc: 'Türkiye genelinde gerçek OSRM rotalarında hareket eden 100 aracın telemetrisini işleyen event-driven filo platformu. Canlı harita, operatör konsolu, geofencing, ihlal cooldown\'lu kural motoru, sefer tespiti ve sürücü skorlaması.'
    },
    'event-driven-pipeline': {
        title: 'Event-Driven Microservices Pipeline',
        icon: 'bi-diagram-3',
        tags: ['Java', 'Spring Boot', 'Kafka', 'RabbitMQ', 'Redis', 'Hazelcast', 'PostgreSQL'],
        desc: 'Bağımsız servisler arasında asenkron iletişim kuran event-driven mikroservis mimarisi. Kafka ile event streaming, RabbitMQ ile bildirim akışları, Redis ile cache ve idempotency, Hazelcast ile dağıtık veri yönetimi.'
    },
    'CoreMetrics': {
        title: 'CoreMetrics — SaaS Analytics',
        icon: 'bi-graph-up-arrow',
        tags: ['C#', 'ASP.NET Core', 'PostgreSQL', 'Cloud Run', 'SSE', 'Chart.js'],
        desc: 'Web siteleri için gerçek zamanlı ziyaretçi analitiği platformu. Server-Sent Events ile anlık güncelleme, API key doğrulaması, oturum takibi ve Google Cloud Run üzerinde serverless dağıtım.'
    },
    'n8n_Finans': {
        title: 'n8n Finans Asistanı',
        icon: 'bi-robot',
        tags: ['n8n', 'Automation', 'LLM', 'Webhook'],
        desc: 'n8n ile tasarlanmış, yapay zekâ analizleri sonucunda harcamaları yorumlayan ve öneri sunan kapsamlı finans takip otomasyonu.'
    },
    'BizimSite': {
        title: 'BizimSite — Apartman Yönetimi',
        icon: 'bi-buildings',
        tags: ['React', 'C#', 'ASP.NET Core', 'PostgreSQL'],
        desc: 'Apartman yönetimi için aidat takibi, sakin yönetimi ve duyuru akışı içeren full-stack sistem. React arayüz, ASP.NET Core API ve PostgreSQL veri katmanı.'
    },
    'AllenVB-WebSayfasi': {
        title: 'Kişisel Portföy Sitesi',
        icon: 'bi-window-stack',
        tags: ['JavaScript', 'SPA', 'Canvas', 'GitHub API'],
        desc: 'Şu an baktığınız site. Bağımlılıksız hash router, canlı GitHub verisi, katkı ısı haritası ve gerçek zamanlı ziyaret analitiği içeren tek sayfa uygulaması.'
    },
    'n8n_News': {
        title: 'n8n Haber Özetleyici',
        icon: 'bi-newspaper',
        tags: ['n8n', 'Automation', 'Workflow'],
        desc: 'Her sabah haber kaynaklarını tarayıp özet çıkaran n8n otomasyonu. Haber takip ve özetleme akışının tamamı tek bir workflow olarak tasarlandı.'
    },
    'TraveLog': {
        title: 'TraveLog — Tatil ve Anı Deposu',
        icon: 'bi-geo-alt',
        tags: ['Java', 'Android', 'Gradle'],
        desc: 'Gezilen yerleri ve anıları kaydetmek için geliştirilen Android uygulaması. Java ile yazıldı, Gradle Kotlin DSL ile yapılandırıldı.'
    },
    'SmartHomeSecurity-VeriTaban-': {
        title: 'S-Home — Akıllı Ev Güvenliği',
        icon: 'bi-house-lock',
        tags: ['HTML', 'JavaScript', 'CSS', 'CRUD'],
        desc: 'Veritabanı yönetimi (CRUD) ve güvenlik simülasyonu içeren responsive akıllı ev arayüzü. Veritabanı dersi kapsamında geliştirildi.'
    },
    'Project-Management-Systems': {
        title: 'Proje Yönetim Sistemi',
        icon: 'bi-kanban',
        tags: ['JavaScript', 'HTML', 'CSS'],
        desc: 'Yazılım Tasarımı ve Mimarisi dersi için geliştirilen proje yönetim arayüzü. Görev takibi ve proje organizasyonu üzerine kurgulandı.'
    },
    'usersso': {
        title: 'UserSSO — JWT Kullanıcı Yönetimi',
        icon: 'bi-shield-lock',
        tags: ['Java', 'Spring Boot 3', 'Spring Security 6', 'JWT'],
        desc: 'Spring Boot 3 ve Spring Security 6 ile geliştirilmiş, JWT tabanlı güvenli kullanıcı yönetim sistemi. Kimlik doğrulama ve yetkilendirme akışlarını kapsıyor.'
    },
    'Login-Form': {
        title: 'Login Form Arayüzü',
        icon: 'bi-box-arrow-in-right',
        tags: ['HTML', 'CSS'],
        desc: 'Saf HTML ve CSS ile hazırlanmış, arka plan görseli ve modern form stiliyle tasarlanmış giriş ekranı çalışması.'
    },
    'VeriBilimi': {
        title: 'Veri Bilimi Çalışmaları',
        icon: 'bi-bar-chart-line',
        tags: ['Python', 'Jupyter', 'Matplotlib', 'Seaborn'],
        desc: 'Veri analizi ve görselleştirme üzerine Jupyter notebook çalışmaları. Matplotlib ve Seaborn ile grafik üretimi ve veri inceleme pratikleri.'
    },
    'Market-Alisveris-Sistemi': {
        title: 'Market Alışveriş Sistemi',
        icon: 'bi-cart3',
        tags: ['Python', 'SQLite'],
        desc: 'Python ile geliştirilen, SQLite veritabanı üzerinde ürün ve alışveriş işlemlerini yöneten market otomasyonu.'
    },
    'Ogrenci-Bilgi-Sistemi': {
        title: 'Öğrenci Bilgi Sistemi',
        icon: 'bi-mortarboard',
        tags: ['Python', 'SQLite'],
        desc: 'Öğrenci kayıt ve bilgi takibi için Python ile yazılmış, SQLite veritabanı kullanan bilgi sistemi uygulaması.'
    }
};

const LANG_COLOR = {
    Java: '#b07219', JavaScript: '#f1e05a', TypeScript: '#3178c6', 'C#': '#178600',
    Python: '#3572A5', HTML: '#e34c26', CSS: '#563d7c', 'Jupyter Notebook': '#DA5B0B',
    Vue: '#41b883', Shell: '#89e051', Dockerfile: '#384d54'
};

const SKILL_GROUPS = [
    { icon: 'bi-code-slash', title: 'Programlama Dilleri', items: ['Java', 'C#', 'Python', 'JavaScript', 'C / C++'] },
    { icon: 'bi-hdd-stack', title: 'Backend Geliştirme', items: ['Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Spring Security', 'ASP.NET Core', 'RESTful API', 'JWT'] },
    { icon: 'bi-diagram-3', title: 'Dağıtık Sistemler & Mesajlaşma', items: ['Apache Kafka', 'RabbitMQ', 'Redis', 'Hazelcast', 'Microservices', 'Event-Driven'] },
    { icon: 'bi-database', title: 'Veritabanları', items: ['PostgreSQL', 'SQL', 'TimescaleDB', 'PostGIS'] },
    { icon: 'bi-window', title: 'Frontend Geliştirme', items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
    { icon: 'bi-tools', title: 'DevOps & Araçlar', items: ['Docker', 'Git', 'GitHub', 'Postman', 'Linux'] }
];

// Hero'da fotoğrafın altında alt alta listelenen roller
const ROLES = [
    'Backend Developer',
    'Full-Stack Developer',
    'Java & Spring Boot',
    'Event-Driven Systems'
];

// Anasayfadaki kayan teknoloji şeridi
const MARQUEE_ITEMS = [
    'Java 21', 'Spring Boot', 'Spring Security', 'Apache Kafka', 'RabbitMQ', 'Redis',
    'Hazelcast', 'PostgreSQL', 'TimescaleDB', 'PostGIS', 'Docker', 'REST API', 'JWT',
    'C#', 'ASP.NET Core', 'React', 'JavaScript', 'Tailwind CSS', 'Python', 'Git', 'Linux'
];

// Anasayfa "Ne üzerine çalışıyorum" kartları
const FOCUS_AREAS = [
    {
        icon: 'bi-hdd-stack',
        title: 'Backend & API',
        desc: 'Spring Boot ile katmanlı, test edilebilir servisler; JWT tabanlı kimlik doğrulama ve temiz REST sözleşmeleri.',
        tags: ['Spring Boot', 'REST', 'JPA', 'JWT']
    },
    {
        icon: 'bi-diagram-3',
        title: 'Dağıtık & Event-Driven',
        desc: 'Kafka ile event streaming, RabbitMQ ile bildirim akışları, Redis ile cache ve idempotency kurgusu.',
        tags: ['Kafka', 'RabbitMQ', 'Redis', 'Microservices']
    },
    {
        icon: 'bi-window-stack',
        title: 'Uçtan Uca Teslim',
        desc: 'Gerektiğinde arayüzü de ben yazıyorum: React veya ASP.NET Core ile çalışan, Docker ile paketlenmiş tam ürün.',
        tags: ['React', 'ASP.NET Core', 'PostgreSQL', 'Docker']
    }
];

const TIMELINE = [
    {
        date: 'Temmuz 2026 — Ağustos 2026',
        title: 'Software Engineering Intern',
        org: 'Mobiliz',
        desc: 'Araç takip ve filo yönetimi projelerinde görev aldım. Telemetri verisinin işlenmesi, event tabanlı akışlar ve gerçek zamanlı izleme tarafında geliştirme yaptım.'
    },
    {
        date: 'Mart 2025 — Haziran 2026',
        title: 'IT Support / Programlama Asistanı',
        org: 'Bandırma Onyedi Eylül Üniversitesi · İŞKUR Gençlik Programı',
        desc: 'Üniversite bünyesinde teknik destek sağladım ve programlama eğitimlerine asistanlık ettim.'
    },
    {
        date: '2023 — 2027',
        title: 'Yazılım Mühendisliği (Lisans)',
        org: 'Bandırma Onyedi Eylül Üniversitesi',
        desc: '4. sınıf öğrencisiyim. Dağıtık sistemler, veri tabanları ve yazılım mimarisi alanlarına yoğunlaşıyorum.'
    }
];

// ── Yardımcılar ───────────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function esc(str) {
    return String(str ?? '').replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function prettyName(name) {
    return name.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function animateCounter(el, target, suffix = '') {
    if (!el) return;
    const final = target.toLocaleString('tr-TR') + suffix;

    // Sekme arka plandayken rAF çalışmaz; animasyon yerine son değeri yaz
    if (document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = final;
        return;
    }

    const duration = 1100;
    const start = performance.now();
    let done = false;

    const step = (now) => {
        if (done) return;
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        if (p < 1) {
            el.textContent = Math.round(eased * target) + suffix;
            requestAnimationFrame(step);
        } else {
            done = true;
            el.textContent = final;
        }
    };

    el.textContent = '0' + suffix;
    requestAnimationFrame(step);

    // Güvenlik ağı: rAF kısıtlanırsa değer yine de doğru görünsün
    setTimeout(() => {
        if (!done) { done = true; el.textContent = final; }
    }, duration + 500);
}

// ── GitHub veri katmanı (sekme ömrü boyunca önbellekli) ───────
let _reposPromise = null;
let _contribPromise = null;

function cached(key, ttlMs, fetcher) {
    try {
        const raw = sessionStorage.getItem(key);
        if (raw) {
            const { t, v } = JSON.parse(raw);
            if (Date.now() - t < ttlMs) return Promise.resolve(v);
        }
    } catch { /* sessionStorage kapalıysa doğrudan çek */ }

    return fetcher().then(v => {
        try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch { }
        return v;
    });
}

function getRepos() {
    if (!_reposPromise) {
        _reposPromise = cached('gh_repos', 30 * 60 * 1000, async () => {
            const res = await fetch(GH.reposUrl);
            if (!res.ok) throw new Error('GitHub API: ' + res.status);
            const data = await res.json();
            return data
                .filter(r => !r.fork && !r.archived)
                .map(r => ({
                    name: r.name,
                    desc: r.description,
                    lang: r.language,
                    stars: r.stargazers_count,
                    forks: r.forks_count,
                    url: r.html_url,
                    homepage: r.homepage,
                    updated: r.updated_at
                }));
        }).catch(err => { _reposPromise = null; throw err; });
    }
    return _reposPromise;
}

function getContributions() {
    if (!_contribPromise) {
        _contribPromise = cached('gh_contrib', 60 * 60 * 1000, async () => {
            const res = await fetch(GH.contribUrl);
            if (!res.ok) throw new Error('Katkı API: ' + res.status);
            return res.json();
        }).catch(err => { _contribPromise = null; throw err; });
    }
    return _contribPromise;
}

// Tüm yılların katkı verisi (yıl kırılımı ve tüm zamanlar toplamı için)
let _contribAllPromise = null;

function getContributionsAllTime() {
    if (!_contribAllPromise) {
        _contribAllPromise = cached('gh_contrib_all', 60 * 60 * 1000, async () => {
            const res = await fetch(GH.contribAllUrl);
            if (!res.ok) throw new Error('Katkı API: ' + res.status);
            return res.json();
        }).catch(err => { _contribAllPromise = null; throw err; });
    }
    return _contribAllPromise;
}

// ═══════════════════════════════════════════════════════════════
//  SAYFA ŞABLONLARI
// ═══════════════════════════════════════════════════════════════

function projectCardHTML(repo, isPinned) {
    const meta = PROJECT_META[repo.name] || {};
    const title = meta.title || prettyName(repo.name);
    const desc = meta.desc || repo.desc || 'Açıklama eklenmemiş bir depo.';
    const tags = meta.tags || (repo.lang ? [repo.lang] : []);
    const icon = meta.icon || 'bi-folder2-open';
    const color = LANG_COLOR[repo.lang] || '#6366f1';
    const demo = demoUrl(repo);

    return `
    <article class="card card-hover project-card reveal" data-lang="${esc(repo.lang || 'Diğer')}">
        ${isPinned ? '<span class="pin-flag">Pinli</span>' : ''}
        <div class="pc-top">
            <div class="pc-icon"><i class="bi ${esc(icon)}"></i></div>
            <div class="pc-stats" style="margin-top:6px">
                ${repo.stars ? `<span><i class="bi bi-star-fill"></i> ${repo.stars}</span>` : ''}
                ${repo.forks ? `<span><i class="bi bi-diagram-2"></i> ${repo.forks}</span>` : ''}
            </div>
        </div>
        <h3 class="pc-title">${esc(title)}</h3>
        <p class="pc-desc">${esc(desc)}</p>
        <div class="pc-tags">${tags.slice(0, 6).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <div class="pc-foot">
            <span class="pc-lang">
                ${repo.lang ? `<i class="pc-dot" style="background:${color}"></i> ${esc(repo.lang)}` : '<span class="dim">—</span>'}
            </span>
            <span class="pc-links">
                ${demo ? `<a class="pc-demo" href="${esc(demo)}" target="_blank" rel="noopener">
                    <i class="bi bi-box-arrow-up-right"></i> Canlı Demo
                </a>` : ''}
                <a class="pc-link" href="${esc(repo.url)}" target="_blank" rel="noopener">
                    <i class="bi bi-github"></i> Kod
                </a>
            </span>
        </div>
    </article>`;
}

// Depodaki `homepage` alanı canlı demo adresidir. Kendi alan adımıza dönenleri
// gösterme — ziyaretçiyi zaten bulunduğu siteye yollamanın anlamı yok.
function demoUrl(repo) {
    if (!repo.homepage) return null;
    try {
        const host = new URL(repo.homepage).hostname.replace(/^www\./, '');
        if (host === location.hostname.replace(/^www\./, '')) return null;
        if (host === 'allenvb-websayfasi.vercel.app') return null;
        return repo.homepage;
    } catch {
        return null;   // geçersiz URL
    }
}

function contribSectionHTML() {
    return `
    <div class="card contrib-card reveal">
        <div class="contrib-head">
            <div>
                <h3 style="font-size:16px;font-weight:750;margin-bottom:3px">GitHub Katkı Geçmişi</h3>
                <p class="dim" style="font-size:12.5px">Son 12 ayda <strong id="contrib-total" style="color:var(--accent-light)">—</strong> katkı</p>
            </div>
            <a class="btn btn-sm btn-ghost" href="https://github.com/AllenVB" target="_blank" rel="noopener">
                <i class="bi bi-github"></i> @AllenVB
            </a>
        </div>
        <div class="contrib-scroll">
            <div id="contrib-months" class="contrib-months"></div>
            <div id="contrib-grid" class="contrib-grid"></div>
        </div>
        <div class="contrib-legend">
            <span>Az</span>
            <span class="contrib-cell"></span>
            <span class="contrib-cell" data-level="1"></span>
            <span class="contrib-cell" data-level="2"></span>
            <span class="contrib-cell" data-level="3"></span>
            <span class="contrib-cell" data-level="4"></span>
            <span>Çok</span>
        </div>
    </div>`;
}

const PAGES = {
    // ── ANASAYFA ─────────────────────────────────────────────
    home: () => `
    <section class="wrap hero">
        <div>
            <span class="badge"><span class="live-dot"></span> Yeni projelere açığım</span>
            <h1>Merhaba, ben<br><span class="gradient-text">Süleyman Emre</span></h1>
            <p class="hero-lead">
                Bandırma Onyedi Eylül Üniversitesi <strong>Yazılım Mühendisliği</strong> 4. sınıf öğrencisiyim.
                <strong>Java 21, Spring Boot ve Apache Kafka</strong> ile event-driven, gerçek zamanlı sistemler kuruyorum;
                gerektiğinde React ve ASP.NET Core ile uçtan uca teslim ediyorum.
            </p>
            <div class="hero-actions">
                <a href="#projects" data-page="projects" class="btn btn-primary">
                    <i class="bi bi-collection"></i> Projelerimi Gör
                </a>
                <a href="cv.pdf" download="Suleyman-Emre-Arli-CV.pdf" class="btn btn-ghost">
                    <i class="bi bi-download"></i> CV İndir
                </a>
                <a href="#contact" data-page="contact" class="btn btn-outline">
                    <i class="bi bi-envelope"></i> İletişime Geç
                </a>
            </div>
            <div class="hero-meta">
                <span><i class="bi bi-geo-alt-fill"></i> Bandırma, Balıkesir</span>
                <span><i class="bi bi-mortarboard-fill"></i> Yazılım Mühendisliği · 2023–2027</span>
                <span><i class="bi bi-briefcase-fill"></i> Mobiliz stajyeri</span>
            </div>
        </div>

        <div class="portrait-wrap reveal d2">
            <div class="portrait-glow"></div>
            <picture>
                <source srcset="profile.webp" type="image/webp">
                <img src="profile.jpg" alt="Süleyman Emre Arlı" class="portrait" loading="eager"
                     width="200" height="203" fetchpriority="high">
            </picture>
            <ul class="role-list">
                ${ROLES.map((r, i) => `<li class="reveal d${i + 1}">${esc(r)}</li>`).join('')}
            </ul>
        </div>
    </section>

    <section class="wrap section-sm">
        <div class="stat-strip reveal">
            <div class="stat-cell"><p class="stat-num" data-count="45" data-suffix="+">0</p><p class="stat-label">Genel Depo</p></div>
            <div class="stat-cell"><p class="stat-num" id="stat-contrib">0</p><p class="stat-label">Yıllık Katkı</p></div>
            <div class="stat-cell"><p class="stat-num" data-count="6" data-suffix="">0</p><p class="stat-label">Öne Çıkan Proje</p></div>
            <div class="stat-cell"><p class="stat-num" data-count="2" data-suffix="">0</p><p class="stat-label">İş Deneyimi</p></div>
        </div>
    </section>

    <section class="wrap section-sm" id="after-hero">
        <div class="marquee reveal" aria-hidden="true">
            <div class="marquee-track">
                ${MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map(t => `<span class="chip">${esc(t)}</span>`).join('')}
            </div>
        </div>
    </section>

    <section class="wrap section-sm">
        <div class="reveal" style="margin-bottom:26px">
            <span class="eyebrow">Odak Alanlarım</span>
            <h2 class="section-title" style="font-size:clamp(24px,3.4vw,32px)">Ne üzerine <span class="gradient-text">çalışıyorum</span></h2>
        </div>
        <div class="grid-3">
            ${FOCUS_AREAS.map((f, i) => `
            <div class="card card-hover focus-card reveal d${i + 1}">
                <div class="sg-icon"><i class="bi ${esc(f.icon)}"></i></div>
                <h3 class="focus-title">${esc(f.title)}</h3>
                <p class="focus-desc">${esc(f.desc)}</p>
                <div class="sg-chips">${f.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
            </div>`).join('')}
        </div>
    </section>

    <section class="wrap section-sm">
        ${contribSectionHTML()}
    </section>

    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow">Öne Çıkanlar</span>
            <h2 class="section-title">Pinlediğim <span class="gradient-text">projeler</span></h2>
            <p class="section-sub">GitHub profilimde öne çıkardığım çalışmalar — canlı olarak GitHub API'den çekiliyor.</p>
        </div>
        <div id="featured-grid" class="project-grid">
            <div class="state-box" style="grid-column:1/-1"><div class="spinner"></div>Projeler yükleniyor…</div>
        </div>
        <div class="center mt-40">
            <a href="#projects" data-page="projects" class="btn btn-ghost">
                Tüm projeleri gör <i class="bi bi-arrow-right"></i>
            </a>
        </div>
    </section>

    <section class="wrap section-sm">
        <div class="reveal" style="margin-bottom:26px">
            <span class="eyebrow">Deneyim</span>
            <h2 class="section-title" style="font-size:clamp(24px,3.4vw,32px)">Nerelerde <span class="gradient-text">çalıştım</span></h2>
        </div>
        <div class="grid-2">
            ${TIMELINE.slice(0, 2).map((t, i) => `
            <div class="card card-hover exp-card reveal d${i + 1}">
                <p class="tl-date">${esc(t.date)}</p>
                <p class="exp-title">${esc(t.title)}</p>
                <p class="tl-org">${esc(t.org)}</p>
                <p class="tl-desc">${esc(t.desc)}</p>
            </div>`).join('')}
        </div>
        <div class="center mt-40">
            <a href="#about" data-page="about" class="btn btn-ghost">
                Eğitim ve yetenekler <i class="bi bi-arrow-right"></i>
            </a>
        </div>
    </section>

    <section class="wrap section-sm">
        <div class="cta-band reveal">
            <h2 class="section-title" style="font-size:clamp(24px,3.6vw,34px)">Birlikte bir şey inşa edelim</h2>
            <p class="section-sub mx-auto center" style="margin-bottom:26px">
                Staj, yarı zamanlı iş veya freelance bir proje — backend ağırlıklı işlerde memnuniyetle yer alırım.
            </p>
            <div class="hero-actions" style="justify-content:center;margin:0">
                <a href="#contact" data-page="contact" class="btn btn-primary"><i class="bi bi-send"></i> Mesaj Gönder</a>
                <a href="#cv" data-page="cv" class="btn btn-ghost"><i class="bi bi-file-earmark-text"></i> CV'yi İncele</a>
            </div>
        </div>
    </section>`,

    // ── HAKKIMDA ─────────────────────────────────────────────
    about: () => `
    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow">Hakkımda</span>
            <h2 class="section-title">Kısaca <span class="gradient-text">ben</span></h2>
        </div>

        <div class="grid-2 reveal" style="align-items:start;gap:28px">
            <div class="card" style="padding:28px">
                <p class="muted" style="font-size:15px;line-height:1.85">
                    Dördüncü sınıf Yazılım Mühendisliği öğrencisiyim. IT desteği, programlama eğitimi asistanlığı ve
                    yazılım geliştirme tarafında deneyim kazandım. Bandırma Onyedi Eylül Üniversitesi'nde
                    <strong style="color:var(--text)">İŞKUR Gençlik Programı</strong> kapsamında çalıştım;
                    <strong style="color:var(--text)">Mobiliz</strong>'deki stajım boyunca araç takip ve filo yönetimi
                    projelerine katkı verdim.
                </p>
                <p class="muted" style="font-size:15px;line-height:1.85;margin-top:16px">
                    İlgi alanım <strong style="color:var(--text)">backend geliştirme, dağıtık sistemler ve gerçek zamanlı
                    uygulamalar</strong>. Kafka ile event streaming, Redis ile idempotency, PostGIS/TimescaleDB ile
                    zaman-serisi ve konum verisi üzerinde çalışmayı seviyorum.
                </p>
                <div class="sg-chips" style="margin-top:22px">
                    <span class="chip"><i class="bi bi-geo-alt"></i> Bandırma, Balıkesir</span>
                    <span class="chip"><i class="bi bi-translate"></i> Türkçe · İngilizce</span>
                    <span class="chip"><i class="bi bi-clock-history"></i> Uzaktan / Hibrit</span>
                </div>
            </div>

            <div class="card" style="padding:28px">
                <h3 style="font-size:15px;font-weight:750;margin-bottom:22px">Deneyim & Eğitim</h3>
                <div class="timeline">
                    ${TIMELINE.map(t => `
                    <div class="tl-item">
                        <p class="tl-date">${esc(t.date)}</p>
                        <p class="tl-title">${esc(t.title)}</p>
                        <p class="tl-org">${esc(t.org)}</p>
                        <p class="tl-desc">${esc(t.desc)}</p>
                    </div>`).join('')}
                </div>
            </div>
        </div>

        <div class="reveal" style="margin:56px 0 26px">
            <span class="eyebrow">Yetenekler</span>
            <h2 class="section-title" style="font-size:clamp(24px,3.4vw,32px)">Çalıştığım <span class="gradient-text">teknolojiler</span></h2>
        </div>

        <div class="project-grid">
            ${SKILL_GROUPS.map((g, i) => `
            <div class="card card-hover skill-group reveal d${(i % 3) + 1}">
                <div class="sg-head">
                    <div class="sg-icon"><i class="bi ${esc(g.icon)}"></i></div>
                    <p class="sg-title">${esc(g.title)}</p>
                </div>
                <div class="sg-chips">
                    ${g.items.map(s => `<span class="chip">${esc(s)}</span>`).join('')}
                </div>
            </div>`).join('')}
        </div>

        <div style="margin-top:48px">${contribSectionHTML()}</div>
    </section>`,

    // ── PROJELER ─────────────────────────────────────────────
    projects: () => `
    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow">Portföy</span>
            <h2 class="section-title">Geliştirdiğim <span class="gradient-text">projeler</span></h2>
            <p class="section-sub">
                Seçtiğim projeler, en yeniden eskiye doğru sıralı. Depo bilgileri
                (yıldız, dil, güncellenme) GitHub API'den canlı çekiliyor.
            </p>
        </div>

        <div id="lang-filter" class="filter-bar reveal"></div>

        <div id="all-grid" class="project-grid">
            <div class="state-box" style="grid-column:1/-1"><div class="spinner"></div>GitHub'dan çekiliyor…</div>
        </div>
    </section>`,

    // ── CV ───────────────────────────────────────────────────
    cv: () => `
    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow">Özgeçmiş</span>
            <h2 class="section-title">CV — <span class="gradient-text">Süleyman Emre Arlı</span></h2>
            <p class="section-sub">Belgeyi doğrudan burada inceleyebilir veya PDF olarak indirebilirsiniz.</p>
        </div>

        <div class="cv-layout">
            <div class="card cv-viewer reveal">
                <iframe id="cv-frame" class="cv-frame" src="cv.pdf#toolbar=0&navpanes=0&view=FitH"
                        title="Süleyman Emre Arlı CV"></iframe>
                <div id="cv-fallback" class="cv-fallback">
                    <i class="bi bi-file-earmark-pdf" style="font-size:38px;color:var(--accent-light)"></i>
                    <p class="muted" style="margin:14px 0 4px;font-weight:600">PDF önizlemesi bu cihazda açılamıyor</p>
                    <p class="dim" style="font-size:13px">Aşağıdaki butonlardan indirebilir veya yeni sekmede açabilirsiniz.</p>
                </div>
                <div class="cv-toolbar">
                    <a href="cv.pdf" download="Suleyman-Emre-Arli-CV.pdf" class="btn btn-primary">
                        <i class="bi bi-download"></i> PDF İndir
                    </a>
                    <a href="cv.pdf" target="_blank" rel="noopener" class="btn btn-ghost">
                        <i class="bi bi-box-arrow-up-right"></i> Yeni Sekmede Aç
                    </a>
                </div>
            </div>

            <div class="card reveal d2" style="padding:28px">
                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-person-badge"></i> Profil</p>
                    <p class="muted" style="font-size:13.5px;line-height:1.8">
                        Backend / Full-Stack Developer. Dördüncü sınıf Yazılım Mühendisliği öğrencisi; IT desteği,
                        programlama eğitimi ve yazılım geliştirme deneyimine sahip. Backend geliştirme, dağıtık
                        sistemler ve gerçek zamanlı uygulamalara odaklı.
                    </p>
                    <div class="sg-chips" style="margin-top:16px">
                        <a class="chip" href="mailto:suleymanarli0666@gmail.com"><i class="bi bi-envelope"></i> suleymanarli0666@gmail.com</a>
                        <a class="chip" href="tel:+905444530125"><i class="bi bi-telephone"></i> +90 544 453 01 25</a>
                        <a class="chip" href="https://github.com/AllenVB" target="_blank" rel="noopener"><i class="bi bi-github"></i> AllenVB</a>
                        <a class="chip" href="https://www.linkedin.com/in/suleymanemrearlii" target="_blank" rel="noopener"><i class="bi bi-linkedin"></i> LinkedIn</a>
                        <a class="chip" href="https://allenvb-websayfasi.vercel.app/" target="_blank" rel="noopener"><i class="bi bi-globe2"></i> Portföy</a>
                    </div>
                </div>

                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-briefcase"></i> İş Deneyimi</p>
                    <div class="cv-entry">
                        <div class="cv-entry-head">
                            <p class="cv-entry-title">Software Engineering Intern</p>
                            <p class="cv-entry-date">Tem 2026 — Ağu 2026</p>
                        </div>
                        <p class="cv-entry-org">Mobiliz</p>
                        <ul class="cv-list">
                            <li>Araç takip ve filo yönetimi projelerinde geliştirme.</li>
                            <li>Telemetri işleme ve event tabanlı akışlar üzerinde çalışma.</li>
                        </ul>
                    </div>
                    <div class="cv-entry">
                        <div class="cv-entry-head">
                            <p class="cv-entry-title">IT Support / Programlama Asistanı</p>
                            <p class="cv-entry-date">Mar 2025 — Haz 2026</p>
                        </div>
                        <p class="cv-entry-org">Bandırma Onyedi Eylül Üniversitesi · İŞKUR Gençlik Programı</p>
                        <ul class="cv-list">
                            <li>Teknik destek ve sistem bakımı.</li>
                            <li>Programlama eğitimlerinde asistanlık.</li>
                        </ul>
                    </div>
                </div>

                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-mortarboard"></i> Eğitim</p>
                    <div class="cv-entry">
                        <div class="cv-entry-head">
                            <p class="cv-entry-title">Yazılım Mühendisliği (Lisans)</p>
                            <p class="cv-entry-date">2023 — 2027</p>
                        </div>
                        <p class="cv-entry-org">Bandırma Onyedi Eylül Üniversitesi</p>
                    </div>
                </div>

                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-kanban"></i> Öne Çıkan Proje Deneyimi</p>
                    <div class="cv-entry">
                        <p class="cv-entry-title" style="margin-bottom:6px">Vehicle Tracking & Fleet Telematics Platform</p>
                        <p class="dim mono" style="font-size:11.5px;margin-bottom:8px">Java 21 · Spring Boot · Kafka Streams · TimescaleDB · PostGIS · Redis · WebSocket · Docker</p>
                        <ul class="cv-list">
                            <li>Gerçek zamanlı araç takibi ve filo yönetimi için event-driven platform geliştirdim.</li>
                            <li>Telemetri işleme, geofencing, sefer tespiti ve rota takibi bileşenlerini kurdum.</li>
                            <li>Kafka tabanlı event streaming, kural tabanlı ihlal tespiti ve zaman-serisi/konumsal veri yönetimi uyguladım.</li>
                        </ul>
                    </div>
                    <div class="cv-entry">
                        <p class="cv-entry-title" style="margin-bottom:6px">Event-Driven Microservices Pipeline</p>
                        <p class="dim mono" style="font-size:11.5px;margin-bottom:8px">Java · Spring Boot · Kafka · RabbitMQ · Redis · Hazelcast · PostgreSQL · Docker</p>
                        <ul class="cv-list">
                            <li>Bağımsız servisler arasında asenkron iletişim kuran mikroservis mimarisi tasarladım.</li>
                            <li>Kafka ile event streaming, RabbitMQ ile bildirim akışları, Redis ile cache ve idempotency, Hazelcast ile dağıtık veri yönetimi kurguladım.</li>
                        </ul>
                    </div>
                    <div class="cv-entry">
                        <p class="cv-entry-title" style="margin-bottom:6px">CoreMetrics — Real-Time SaaS Analytics Platform</p>
                        <p class="dim mono" style="font-size:11.5px;margin-bottom:8px">C# · ASP.NET Core · PostgreSQL · Google Cloud Run · SSE · Chart.js</p>
                        <ul class="cv-list">
                            <li>Ziyaretçi, oturum, sayfa etkileşimi ve coğrafi veri takibi yapan gerçek zamanlı analitik platformu geliştirdim.</li>
                            <li>RESTful API, Server-Sent Events, API key doğrulaması ve Cloud Run üzerinde serverless dağıtım uyguladım.</li>
                        </ul>
                    </div>
                </div>

                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-stars"></i> Teknik Yetenekler</p>
                    ${SKILL_GROUPS.map(g => `
                    <div class="cv-skill-row">
                        <span class="cv-skill-key">${esc(g.title)}</span>
                        <span class="muted" style="font-size:12.5px">${esc(g.items.join(' · '))}</span>
                    </div>`).join('')}
                </div>
            </div>
        </div>
    </section>`,

    // ── İLETİŞİM ─────────────────────────────────────────────
    contact: () => `
    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow">İletişim</span>
            <h2 class="section-title">Bir şey mi <span class="gradient-text">konuşalım?</span></h2>
            <p class="section-sub">Staj, proje ya da sadece merhaba demek için — formu doldurun, en kısa sürede döneyim.</p>
        </div>

        <div class="contact-layout">
            <div class="stack-lg reveal">
                <a class="contact-item" href="mailto:suleymanarli0666@gmail.com">
                    <span class="ci-icon"><i class="bi bi-envelope-fill"></i></span>
                    <span><span class="ci-label">E-posta</span><br><span class="ci-value">suleymanarli0666@gmail.com</span></span>
                </a>
                <a class="contact-item" href="tel:+905444530125">
                    <span class="ci-icon"><i class="bi bi-telephone-fill"></i></span>
                    <span><span class="ci-label">Telefon</span><br><span class="ci-value">+90 544 453 01 25</span></span>
                </a>
                <a class="contact-item" href="https://github.com/AllenVB" target="_blank" rel="noopener">
                    <span class="ci-icon"><i class="bi bi-github"></i></span>
                    <span><span class="ci-label">GitHub</span><br><span class="ci-value">github.com/AllenVB</span></span>
                </a>
                <a class="contact-item" href="https://www.linkedin.com/in/suleymanemrearlii" target="_blank" rel="noopener">
                    <span class="ci-icon"><i class="bi bi-linkedin"></i></span>
                    <span><span class="ci-label">LinkedIn</span><br><span class="ci-value">suleymanemrearlii</span></span>
                </a>
                <div class="contact-item" style="cursor:default">
                    <span class="ci-icon"><i class="bi bi-geo-alt-fill"></i></span>
                    <span><span class="ci-label">Konum</span><br><span class="ci-value">Bandırma / Balıkesir, Türkiye</span></span>
                </div>
            </div>

            <form id="contact-form" class="card reveal d2" style="padding:28px" novalidate>
                <div class="form-grid">
                    <div class="form-field">
                        <label class="form-label" for="cf-name">Ad Soyad</label>
                        <input class="form-input" id="cf-name" name="name" type="text" required placeholder="Adınız" autocomplete="name">
                    </div>
                    <div class="form-field">
                        <label class="form-label" for="cf-email">E-posta</label>
                        <input class="form-input" id="cf-email" name="email" type="email" required placeholder="ornek@mail.com" autocomplete="email">
                    </div>
                    <div class="form-field full">
                        <label class="form-label" for="cf-subject">Konu</label>
                        <input class="form-input" id="cf-subject" name="subject" type="text" required placeholder="Neden yazıyorsunuz?">
                    </div>
                    <div class="form-field full">
                        <label class="form-label" for="cf-message">Mesaj</label>
                        <textarea class="form-input" id="cf-message" name="message" rows="6" required placeholder="Mesajınız…"></textarea>
                    </div>
                    <div class="form-field full">
                        <button type="submit" class="btn btn-primary" style="width:100%">
                            <i class="bi bi-send-fill"></i> Gönder
                        </button>
                        <p id="form-msg" class="form-msg" role="status" style="margin-top:10px"></p>
                    </div>
                </div>
            </form>
        </div>
    </section>`,

    // ── İSTATİSTİKLER ────────────────────────────────────────
    stats: () => `
    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow"><span class="live-dot" style="margin-right:2px"></span> Canlı Veri</span>
            <h2 class="section-title">İstatistikler</h2>
            <p class="section-sub">
                Depolarım, katkı geçmişim ve aktivite dökümüm — hepsi GitHub API'den canlı çekiliyor.
            </p>
        </div>

        <!-- ── GitHub ────────────────────────────────────────── -->
        <p class="cv-block-title reveal"><i class="bi bi-github"></i> GitHub Aktivitesi</p>

        <div class="metric-grid">
            <div class="card metric-card reveal"><p class="metric-label">Toplam Katkı</p><p class="metric-value" id="g-total">—</p><p class="metric-hint" id="g-total-hint">tüm zamanlar</p></div>
            <div class="card metric-card reveal d1"><p class="metric-label">Son 1 Yıl</p><p class="metric-value" id="g-year">—</p><p class="metric-hint">son 365 gün</p></div>
            <div class="card metric-card reveal d2"><p class="metric-label">Depo</p><p class="metric-value" id="g-repos">—</p><p class="metric-hint" id="g-stars">—</p></div>
            <div class="card metric-card reveal d3"><p class="metric-label">En Uzun Seri</p><p class="metric-value" id="g-streak">—</p><p class="metric-hint">ardışık gün</p></div>
        </div>

        <div class="grid-2" style="margin-bottom:20px">
            <div class="card reveal" style="padding:26px">
                <p class="cv-block-title"><i class="bi bi-calendar3"></i> Yıllara Göre Katkı</p>
                <div id="g-years"><div class="state-box" style="padding:24px"><div class="spinner"></div></div></div>
            </div>
            <div class="card reveal d2" style="padding:26px">
                <p class="cv-block-title"><i class="bi bi-activity"></i> Son Dönem Aktivitesi</p>
                <div id="g-periods"><div class="state-box" style="padding:24px"><div class="spinner"></div></div></div>
            </div>
        </div>

        <div class="card reveal" style="padding:26px;margin-bottom:20px">
            <p class="cv-block-title"><i class="bi bi-code-slash"></i> Depolarda Dil Dağılımı</p>
            <div id="g-langs"><div class="state-box" style="padding:24px"><div class="spinner"></div></div></div>
        </div>

        <div style="margin-bottom:44px">${contribSectionHTML()}</div>

    </section>`
};

const PAGE_TITLES = {
    home: 'Süleyman Emre Arlı | Backend & Full-Stack Developer',
    about: 'Hakkımda | Süleyman Emre Arlı',
    projects: 'Projeler | Süleyman Emre Arlı',
    cv: 'CV | Süleyman Emre Arlı',
    contact: 'İletişim | Süleyman Emre Arlı',
    stats: 'İstatistikler | Süleyman Emre Arlı'
};

// ═══════════════════════════════════════════════════════════════
//  SAYFA BAŞLATICILARI
// ═══════════════════════════════════════════════════════════════

function initCounters(root) {
    $$('[data-count]', root).forEach(el => {
        animateCounter(el, Number(el.dataset.count), el.dataset.suffix || '');
    });
}

// ── Katkı ısı haritası ────────────────────────────────────────
const MONTHS_TR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

function initContributions() {
    const grid = $('#contrib-grid');
    if (!grid) return;

    getContributions().then(data => {
        if (!document.body.contains(grid)) return;

        const days = (data.contributions || []).slice(-371);
        if (!days.length) throw new Error('veri yok');

        const total = data.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0);
        const totalEl = $('#contrib-total');
        if (totalEl) totalEl.textContent = total.toLocaleString('tr-TR');

        const homeStat = $('#stat-contrib');
        if (homeStat) animateCounter(homeStat, total);

        // İlk sütun Pazar'dan başlasın diye baştaki boş hücreleri ekle
        const firstDow = new Date(days[0].date + 'T00:00:00').getDay();
        const cells = [];
        for (let i = 0; i < firstDow; i++) cells.push('<span class="contrib-cell" style="visibility:hidden"></span>');

        days.forEach(d => {
            const dt = new Date(d.date + 'T00:00:00');
            const label = `${dt.getDate()} ${MONTHS_TR[dt.getMonth()]} ${dt.getFullYear()} · ${d.count} katkı`;
            cells.push(`<span class="contrib-cell" data-level="${d.level}" data-tip="${esc(label)}"></span>`);
        });
        grid.innerHTML = cells.join('');

        // Ay etiketleri — her ayın ilk göründüğü sütunun üstüne
        const weeks = Math.ceil((firstDow + days.length) / 7);
        const monthsEl = $('#contrib-months');
        if (monthsEl) {
            const labels = new Array(weeks).fill('');
            let lastMonth = -1;
            days.forEach((d, i) => {
                const w = Math.floor((firstDow + i) / 7);
                const m = new Date(d.date + 'T00:00:00').getMonth();
                if (m !== lastMonth && !labels[w]) { labels[w] = MONTHS_TR[m]; lastMonth = m; }
            });
            // 14px hücre adımı (11px hücre + 3px boşluk)
            monthsEl.innerHTML = labels
                .map(l => `<span style="width:14px;flex:0 0 14px;white-space:nowrap">${l}</span>`)
                .join('');
        }

        initTooltips(grid);
        initReveal();
    }).catch(() => {
        grid.innerHTML = `<p class="dim" style="font-size:13px">Katkı verisi şu an alınamadı —
            <a href="https://github.com/AllenVB" target="_blank" rel="noopener" style="color:var(--accent-light)">GitHub profilinden</a> görebilirsiniz.</p>`;
        grid.style.display = 'block';
    });
}

let _tipEl = null;

function initTooltips(root) {
    if (!_tipEl) {
        _tipEl = document.createElement('div');
        _tipEl.id = 'contrib-tip';
        document.body.appendChild(_tipEl);
    }
    root.addEventListener('mouseover', e => {
        const cell = e.target.closest('[data-tip]');
        if (!cell) return;
        const r = cell.getBoundingClientRect();
        _tipEl.textContent = cell.dataset.tip;
        _tipEl.style.left = (r.left + r.width / 2) + 'px';
        _tipEl.style.top = r.top + 'px';
        _tipEl.classList.add('show');
    });
    root.addEventListener('mouseout', e => {
        if (e.target.closest('[data-tip]')) _tipEl.classList.remove('show');
    });
}

// ── Projeler ──────────────────────────────────────────────────
// Pinli depoları GH.pinned'deki sırayla döndürür
function pinnedRepos(repos) {
    const byName = new Map(repos.map(r => [r.name, r]));
    return GH.pinned.map(n => byName.get(n)).filter(Boolean);
}

function initFeatured() {
    const grid = $('#featured-grid');
    if (!grid) return;

    getRepos().then(repos => {
        if (!document.body.contains(grid)) return;
        grid.innerHTML = pinnedRepos(repos).map(r => projectCardHTML(r, true)).join('');
        initCardGlow(grid);
        initReveal();
    }).catch(() => {
        // API'ye ulaşılamazsa elle tanımlı meta ile göster
        const fallback = GH.pinned.map(name => ({
            name, url: `https://github.com/${GH.user}/${name}`, lang: null, stars: 0, forks: 0
        }));
        grid.innerHTML = fallback.map(r => projectCardHTML(r, true)).join('');
        initCardGlow(grid);
        initReveal();
    });
}

function initAllProjects() {
    const grid = $('#all-grid');
    const filterBar = $('#lang-filter');
    if (!grid) return;

    getRepos().then(repos => {
        if (!document.body.contains(grid)) return;

        // Yalnızca seçili depolar: önce 6 pinli, sonra diğerleri.
        // Her iki grup kendi içinde en yeniden eskiye sıralanır.
        const pinnedSet = new Set(GH.pinned);
        const byNewest = (a, b) => new Date(b.updated) - new Date(a.updated);
        const showcase = repos.filter(r => GH.showcase.includes(r.name));
        const ordered = [
            ...showcase.filter(r => pinnedSet.has(r.name)).sort(byNewest),
            ...showcase.filter(r => !pinnedSet.has(r.name)).sort(byNewest)
        ];

        grid.innerHTML = ordered.map(r => projectCardHTML(r, pinnedSet.has(r.name))).join('');

        // Dil filtreleri — depo sayısına göre sıralı
        const counts = {};
        ordered.forEach(r => {
            const l = r.lang || 'Diğer';
            counts[l] = (counts[l] || 0) + 1;
        });
        const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]);

        filterBar.innerHTML =
            `<button class="filter-btn active" data-filter="all">Tümü <span class="dim">${ordered.length}</span></button>` +
            langs.map(([l, c]) => `<button class="filter-btn" data-filter="${esc(l)}">${esc(l)} <span class="dim">${c}</span></button>`).join('');

        filterBar.addEventListener('click', e => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            $$('.filter-btn', filterBar).forEach(b => b.classList.toggle('active', b === btn));
            const f = btn.dataset.filter;
            $$('.project-card', grid).forEach(card => {
                card.style.display = (f === 'all' || card.dataset.lang === f) ? '' : 'none';
            });
        });

        initCardGlow(grid);
        initReveal();
    }).catch(() => {
        grid.innerHTML = `<div class="state-box" style="grid-column:1/-1">
            <i class="bi bi-exclamation-triangle" style="font-size:28px;color:var(--warn)"></i>
            <p style="margin-top:12px">GitHub API'ye şu an ulaşılamıyor (saatlik istek limiti olabilir).</p>
            <a class="btn btn-ghost" style="margin-top:16px" href="https://github.com/AllenVB?tab=repositories" target="_blank" rel="noopener">
                <i class="bi bi-github"></i> GitHub'da Aç
            </a></div>`;
    });
}

// Karta göre imleci takip eden yumuşak ışık
function initCardGlow(root) {
    root.addEventListener('pointermove', e => {
        const card = e.target.closest('.project-card');
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
}

// ── CV görüntüleyici ──────────────────────────────────────────
function initCvViewer() {
    const frame = $('#cv-frame');
    const fallback = $('#cv-fallback');
    if (!frame || !fallback) return;

    // Mobil tarayıcıların çoğu iframe içinde PDF göstermez
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || innerWidth < 768;
    if (isMobile) {
        frame.style.display = 'none';
        fallback.style.display = 'block';
    }
}

// ── İletişim formu ────────────────────────────────────────────
function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const msg = $('#form-msg');

    if (typeof emailjs !== 'undefined') emailjs.init('IYOSLI7CaXZvxytxf');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');

        msg.textContent = '';
        msg.className = 'form-msg';

        if (!form.checkValidity()) {
            msg.textContent = 'Lütfen tüm alanları eksiksiz doldurun.';
            msg.classList.add('err');
            form.reportValidity();
            return;
        }

        if (typeof emailjs === 'undefined') {
            msg.textContent = 'E-posta servisi yüklenemedi. Doğrudan suleymanarli0666@gmail.com adresine yazabilirsiniz.';
            msg.classList.add('err');
            return;
        }

        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Gönderiliyor…';

        try {
            await emailjs.send('service_yaac4jp', 'template_juyhcsw', {
                from_name: form.name.value,
                from_email: form.email.value,
                subject: form.subject.value,
                message: form.message.value
            });
            msg.textContent = '✓ Mesajınız iletildi, teşekkürler! En kısa sürede döneceğim.';
            msg.classList.add('ok');
            form.reset();
        } catch (err) {
            console.error('EmailJS hatası:', err);
            msg.textContent = '✕ Gönderilemedi. Lütfen tekrar deneyin veya doğrudan e-posta yazın.';
            msg.classList.add('err');
        } finally {
            btn.disabled = false;
            btn.innerHTML = original;
        }
    });
}

// ── İstatistik sayfası ────────────────────────────────────────
function paintBars() {
    setTimeout(() => {
        $$('.bar-fill[data-w]').forEach(b => { b.style.width = b.dataset.w; });
        initReveal();
    }, 60);
}

// ── GitHub istatistikleri ─────────────────────────────────────
const TODAY_ISO = new Date().toISOString().slice(0, 10);

// Bugüne kadarki günleri döndürür (API gelecek tarihleri de 0 sayımla veriyor)
function pastDays(contributions) {
    return (contributions || []).filter(d => d.date <= TODAY_ISO);
}

function sumLast(days, n) {
    return days.slice(-n).reduce((s, d) => s + d.count, 0);
}

function longestStreak(days) {
    let best = 0, cur = 0;
    for (const d of days) {
        if (d.count > 0) { cur++; if (cur > best) best = cur; }
        else cur = 0;
    }
    return best;
}

function initGithubStats() {
    if (!$('#g-total')) return;

    // Yıl kırılımı + tüm zamanlar
    getContributionsAllTime().then(data => {
        if (!$('#g-total')) return;
        const totals = data.total || {};
        const allTime = Object.values(totals).reduce((a, b) => a + b, 0);
        animateCounter($('#g-total'), allTime);

        const years = Object.keys(totals).sort();
        const hint = $('#g-total-hint');
        if (hint && years.length) hint.textContent = `${years[0]} – ${years[years.length - 1]}`;

        const max = Math.max(...Object.values(totals), 1);
        $('#g-years').innerHTML = years.slice().reverse()
            .map(y => barRow(y, totals[y], Math.round(totals[y] / max * 100))).join('');
        paintBars();
    }).catch(() => {
        setText('#g-total', '—');
        $('#g-years').innerHTML = apiErrorHTML();
    });

    // Son 1 yıl + dönemsel aktivite + seri
    getContributions().then(data => {
        if (!$('#g-year')) return;
        const days = pastDays(data.contributions);
        animateCounter($('#g-year'), data.total?.lastYear ?? sumLast(days, 365));
        animateCounter($('#g-streak'), longestStreak(days));

        const periods = [
            ['Bugün', sumLast(days, 1)],
            ['Son 7 gün', sumLast(days, 7)],
            ['Son 30 gün', sumLast(days, 30)],
            ['Son 90 gün', sumLast(days, 90)]
        ];
        const max = Math.max(...periods.map(p => p[1]), 1);
        $('#g-periods').innerHTML = periods
            .map(([l, v]) => barRow(l, v, Math.round(v / max * 100))).join('');
        paintBars();
    }).catch(() => {
        setText('#g-year', '—');
        setText('#g-streak', '—');
        $('#g-periods').innerHTML = apiErrorHTML();
    });

    // Depo sayısı, yıldız, dil dağılımı
    getRepos().then(repos => {
        if (!$('#g-repos')) return;
        animateCounter($('#g-repos'), repos.length);
        const stars = repos.reduce((s, r) => s + r.stars, 0);
        setText('#g-stars', `${stars} yıldız aldı`);

        const counts = {};
        repos.forEach(r => { const l = r.lang || 'Diğer'; counts[l] = (counts[l] || 0) + 1; });
        const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const max = Math.max(...langs.map(l => l[1]), 1);
        $('#g-langs').innerHTML = langs
            .map(([l, c]) => barRow(`${l} — ${c} depo`, c, Math.round(c / max * 100),
                LANG_COLOR[l] || null)).join('');
        paintBars();
    }).catch(() => {
        setText('#g-repos', '—');
        $('#g-langs').innerHTML = apiErrorHTML();
    });
}

function setText(sel, txt) { const el = $(sel); if (el) el.textContent = txt; }

function apiErrorHTML() {
    return '<p class="dim" style="font-size:13px">Veri şu an alınamadı.</p>';
}

function barRow(name, value, pct, color) {
    const fill = color
        ? `background:linear-gradient(90deg, ${color}, ${color}aa)`
        : '';
    return `
    <div class="bar-row">
        <div class="bar-head">
            <span class="bar-name">${esc(name)}</span>
            <span class="bar-val">${value.toLocaleString('tr-TR')}</span>
        </div>
        <div class="bar-track">
            <div class="bar-fill" data-w="${Math.max(3, pct)}%" style="${fill}"></div>
        </div>
    </div>`;
}

function initStatsPage() {
    initGithubStats();
    initContributions();
}

// ═══════════════════════════════════════════════════════════════
//  ROUTER
// ═══════════════════════════════════════════════════════════════

const PAGE_INIT = {
    home: () => { initCounters(); initContributions(); initFeatured(); },
    about: () => { initContributions(); },
    projects: () => { initAllProjects(); },
    cv: () => { initCvViewer(); },
    contact: () => { initContactForm(); },
    stats: () => { initStatsPage(); }
};

let _currentPage = null;
let _navigating = false;

function pageFromHash() {
    const key = (location.hash || '').replace(/^#\/?/, '').split('?')[0];
    return PAGES[key] ? key : 'home';
}

function syncNav(page) {
    $$('#nav-links > a, #mobile-menu a[data-page], .footer-nav a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === page);
    });
    scheduleNavIndicator();
}

// Yazı tipleri ve düzen oturmadan ölçüm yanlış çıkabiliyor — birkaç kez dene
function scheduleNavIndicator() {
    moveNavIndicator();
    setTimeout(moveNavIndicator, 80);
    setTimeout(moveNavIndicator, 400);
    document.fonts?.ready?.then(moveNavIndicator).catch(() => { });
}

function moveNavIndicator() {
    const ind = $('#nav-indicator');
    const active = $('#nav-links > a.active');
    if (!ind) return;
    if (!active || getComputedStyle($('#nav-links')).display === 'none') {
        ind.style.opacity = '0';
        return;
    }
    ind.style.left = active.offsetLeft + 'px';
    ind.style.width = active.offsetWidth + 'px';
    ind.style.opacity = '1';
}

function render(page, { scroll = true } = {}) {
    const container = $('#app-container');
    if (_navigating) return;

    // Aynı sayfaya tekrar tıklandıysa sadece başa dön
    if (page === _currentPage) {
        if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    _navigating = true;
    container.classList.add('leaving');

    setTimeout(() => {
        container.innerHTML = PAGES[page]();
        _currentPage = page;

        document.title = PAGE_TITLES[page];
        syncNav(page);

        if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });

        // rAF'a bağlanmıyoruz: sekme arka plandayken çalışmaz ve
        // geçiş yarıda kalıp sayfa görünmez şekilde kilitlenirdi
        container.classList.remove('leaving');
        initReveal();
        PAGE_INIT[page]?.();
        _navigating = false;
    }, 220);
}

function navigate(page) {
    const target = PAGES[page] ? page : 'home';
    if (location.hash.replace(/^#\/?/, '') !== target) {
        location.hash = target;      // hashchange render'ı tetikler
    } else {
        render(target);
    }
}

// ═══════════════════════════════════════════════════════════════
//  GENEL ARAYÜZ (navbar, reveal, arka plan, yukarı çık)
// ═══════════════════════════════════════════════════════════════

let _io = null;

// IntersectionObserver çalışmazsa (eski tarayıcı, arka plan sekmesi) içerik
// opacity:0 ile görünmez kalırdı — ekranda olması gerekenleri zorla göster
function revealFallback() {
    $$('.reveal:not(.visible)').forEach(el => {
        if (el.getBoundingClientRect().top < innerHeight - 20) el.classList.add('visible');
    });
}

function initReveal() {
    if (!('IntersectionObserver' in window)) {
        $$('.reveal').forEach(el => el.classList.add('visible'));
        return;
    }
    if (!_io) {
        _io = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    en.target.classList.add('visible');
                    _io.unobserve(en.target);
                }
            });
        }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    }
    $$('.reveal:not(.visible)').forEach(el => _io.observe(el));
    // 60ms: bir stil frame'i geçsin ki giriş animasyonu yine de oynasın
    setTimeout(revealFallback, 60);
    setTimeout(revealFallback, 900);
}

function initChrome() {
    const nav = $('#navbar');
    const toTop = $('#to-top');
    const menuBtn = $('#menu-btn');
    const mobileMenu = $('#mobile-menu');

    // Scroll'a bağlı durumlar — rAF ile kısmadan, zaman tabanlı hafif throttle.
    // (rAF arka plan sekmesinde durur ve bayrak sıfırlanmadan kilitlenirdi.)
    let lastReveal = 0;
    const onScroll = () => {
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 12);
        toTop.classList.toggle('show', y > 500);

        const now = Date.now();
        if (now - lastReveal > 120) { lastReveal = now; revealFallback(); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Mobil menü
    menuBtn.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });

    const closeMenu = () => {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '<i class="bi bi-list"></i>';
    };

    // Tüm [data-page] tıklamaları tek bir delege üzerinden
    document.addEventListener('click', e => {
        const link = e.target.closest('[data-page]');
        if (link) {
            e.preventDefault();
            closeMenu();
            navigate(link.dataset.page);
        }
    });

    window.addEventListener('resize', moveNavIndicator);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) scheduleNavIndicator();
    });
    window.addEventListener('hashchange', () => render(pageFromHash()));

    $('#year').textContent = new Date().getFullYear();
}

// ── Hafif parçacık arka planı (kütüphanesiz canvas) ───────────
function initBackground() {
    const canvas = $('#bg-canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.style.display = 'none';
        return;
    }

    let w = 0, h = 0, dpr = 1, particles = [];
    let mx = 0, my = 0, tx = 0, ty = 0;

    function resize() {
        dpr = Math.min(devicePixelRatio || 1, 2);
        w = innerWidth;
        h = innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Yoğunluk ekran alanına göre — mobilde daha az parçacık
        const count = Math.min(110, Math.round(w * h / 16000));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - .5) * .16,
            vy: (Math.random() - .5) * .16,
            r: Math.random() * 1.3 + .5,
            a: Math.random() * .35 + .15
        }));
    }

    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('pointermove', e => {
        tx = (e.clientX / w - .5) * 22;
        ty = (e.clientY / h - .5) * 14;
    }, { passive: true });

    const LINK_DIST = 118;

    function frame() {
        mx += (tx - mx) * .04;
        my += (ty - my) * .04;

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.translate(mx, my);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -30) p.x = w + 30; else if (p.x > w + 30) p.x = -30;
            if (p.y < -30) p.y = h + 30; else if (p.y > h + 30) p.y = -30;
        }

        // Bağlantı çizgileri
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 > LINK_DIST * LINK_DIST) continue;
                const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * .13;
                ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }

        // Parçacıklar
        for (const p of particles) {
            ctx.fillStyle = `rgba(165,180,252,${p.a})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        requestAnimationFrame(frame);
    }

    frame();
}

// ═══════════════════════════════════════════════════════════════
//  BAŞLAT
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initChrome();
    initBackground();

    // İlk sayfa — derin bağlantı (#projects gibi) desteklenir
    const first = pageFromHash();
    _currentPage = null;
    $('#app-container').classList.remove('leaving');
    $('#app-container').innerHTML = PAGES[first]();
    _currentPage = first;
    document.title = PAGE_TITLES[first];
    syncNav(first);
    initReveal();
    PAGE_INIT[first]?.();
});
