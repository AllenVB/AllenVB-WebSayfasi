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
        desc: {
            tr: 'Türkiye genelinde gerçek OSRM rotalarında hareket eden 100 aracın telemetrisini işleyen event-driven filo platformu. Canlı harita, operatör konsolu, geofencing, ihlal cooldown\'lu kural motoru, sefer tespiti ve sürücü skorlaması.',
            en: "An event-driven fleet telematics platform processing telemetry from 100 vehicles moving along real OSRM routes across Türkiye. Live map, operator console, geofencing, a rule engine with violation cooldowns, trip detection and driver scoring."
        }
    },
    'event-driven-pipeline': {
        title: 'Event-Driven Microservices Pipeline',
        icon: 'bi-diagram-3',
        tags: ['Java', 'Spring Boot', 'Kafka', 'RabbitMQ', 'Redis', 'Hazelcast', 'PostgreSQL'],
        desc: {
            tr: 'Bağımsız servisler arasında asenkron iletişim kuran event-driven mikroservis mimarisi. Kafka ile event streaming, RabbitMQ ile bildirim akışları, Redis ile cache ve idempotency, Hazelcast ile dağıtık veri yönetimi.',
            en: "An event-driven microservices architecture with asynchronous communication between independent services. Kafka for event streaming, RabbitMQ for notification workflows, Redis for caching and idempotency, Hazelcast for distributed data management."
        }
    },
    'CoreMetrics': {
        title: 'CoreMetrics — SaaS Analytics',
        icon: 'bi-graph-up-arrow',
        tags: ['C#', 'ASP.NET Core', 'PostgreSQL', 'Cloud Run', 'SSE', 'Chart.js'],
        desc: {
            tr: 'Web siteleri için gerçek zamanlı ziyaretçi analitiği platformu. Server-Sent Events ile anlık güncelleme, API key doğrulaması, oturum takibi ve Google Cloud Run üzerinde serverless dağıtım.',
            en: "A real-time visitor analytics platform for websites. Live updates over Server-Sent Events, API key authentication, session tracking and serverless deployment on Google Cloud Run."
        }
    },
    'n8n_Finans': {
        title: { tr: "n8n Finans Asistanı", en: "n8n Finance Assistant" },
        icon: 'bi-robot',
        tags: ['n8n', 'Automation', 'LLM', 'Webhook'],
        desc: {
            tr: 'n8n ile tasarlanmış, yapay zekâ analizleri sonucunda harcamaları yorumlayan ve öneri sunan kapsamlı finans takip otomasyonu.',
            en: "A finance tracking automation built with n8n that interprets spending through AI analysis and offers recommendations."
        }
    },
    'BizimSite': {
        title: { tr: "BizimSite — Apartman Yönetimi", en: "BizimSite — Apartment Management" },
        icon: 'bi-buildings',
        tags: ['React', 'C#', 'ASP.NET Core', 'PostgreSQL'],
        desc: {
            tr: 'Apartman yönetimi için aidat takibi, sakin yönetimi ve duyuru akışı içeren full-stack sistem. React arayüz, ASP.NET Core API ve PostgreSQL veri katmanı.',
            en: "A full-stack apartment management system covering dues tracking, resident management and an announcement feed. React front end, ASP.NET Core API and a PostgreSQL data layer."
        }
    },
    'AllenVB-WebSayfasi': {
        title: { tr: "Kişisel Portföy Sitesi", en: "Personal Portfolio Site" },
        icon: 'bi-window-stack',
        tags: ['JavaScript', 'SPA', 'Canvas', 'GitHub API'],
        desc: {
            tr: 'Şu an baktığınız site. Bağımlılıksız hash router, canlı GitHub verisi, katkı ısı haritası ve gerçek zamanlı ziyaret analitiği içeren tek sayfa uygulaması.',
            en: "The site you are looking at. A single-page application with a dependency-free hash router, live GitHub data, a contribution heatmap and project detail pages rendered from README files."
        }
    },
    'n8n_News': {
        title: { tr: "n8n Haber Özetleyici", en: "n8n News Summariser" },
        icon: 'bi-newspaper',
        tags: ['n8n', 'Automation', 'Workflow'],
        desc: {
            tr: 'Her sabah haber kaynaklarını tarayıp özet çıkaran n8n otomasyonu. Haber takip ve özetleme akışının tamamı tek bir workflow olarak tasarlandı.',
            en: "An n8n automation that scans news sources every morning and produces summaries. The whole tracking and summarising flow is designed as a single workflow."
        }
    },
    'TraveLog': {
        title: { tr: "TraveLog — Tatil ve Anı Deposu", en: "TraveLog — Travel & Memory Journal" },
        icon: 'bi-geo-alt',
        tags: ['Java', 'Android', 'Gradle'],
        desc: {
            tr: 'Gezilen yerleri ve anıları kaydetmek için geliştirilen Android uygulaması. Java ile yazıldı, Gradle Kotlin DSL ile yapılandırıldı.',
            en: "An Android application for recording places visited and memories. Written in Java and configured with the Gradle Kotlin DSL."
        }
    },
    'SmartHomeSecurity-VeriTaban-': {
        title: { tr: "S-Home — Akıllı Ev Güvenliği", en: "S-Home — Smart Home Security" },
        icon: 'bi-house-lock',
        tags: ['HTML', 'JavaScript', 'CSS', 'CRUD'],
        desc: {
            tr: 'Veritabanı yönetimi (CRUD) ve güvenlik simülasyonu içeren responsive akıllı ev arayüzü. Veritabanı dersi kapsamında geliştirildi.',
            en: "A responsive smart home interface with database management (CRUD) and a security simulation. Built for a database course."
        }
    },
    'Project-Management-Systems': {
        title: { tr: "Proje Yönetim Sistemi", en: "Project Management System" },
        icon: 'bi-kanban',
        tags: ['JavaScript', 'HTML', 'CSS'],
        desc: {
            tr: 'Yazılım Tasarımı ve Mimarisi dersi için geliştirilen proje yönetim arayüzü. Görev takibi ve proje organizasyonu üzerine kurgulandı.',
            en: "A project management interface built for a Software Design and Architecture course, centred on task tracking and project organisation."
        }
    },
    'usersso': {
        title: { tr: "UserSSO — JWT Kullanıcı Yönetimi", en: "UserSSO — JWT User Management" },
        icon: 'bi-shield-lock',
        tags: ['Java', 'Spring Boot 3', 'Spring Security 6', 'JWT'],
        desc: {
            tr: 'Spring Boot 3 ve Spring Security 6 ile geliştirilmiş, JWT tabanlı güvenli kullanıcı yönetim sistemi. Kimlik doğrulama ve yetkilendirme akışlarını kapsıyor.',
            en: "A secure, JWT-based user management system built with Spring Boot 3 and Spring Security 6, covering authentication and authorisation flows."
        }
    },
    'Login-Form': {
        title: { tr: "Login Form Arayüzü", en: "Login Form UI" },
        icon: 'bi-box-arrow-in-right',
        tags: ['HTML', 'CSS'],
        desc: {
            tr: 'Saf HTML ve CSS ile hazırlanmış, arka plan görseli ve modern form stiliyle tasarlanmış giriş ekranı çalışması.',
            en: "A sign-in screen built with pure HTML and CSS, styled with a background image and a modern form treatment."
        }
    },
    'VeriBilimi': {
        title: { tr: "Veri Bilimi Çalışmaları", en: "Data Science Studies" },
        icon: 'bi-bar-chart-line',
        tags: ['Python', 'Jupyter', 'Matplotlib', 'Seaborn'],
        desc: {
            tr: 'Veri analizi ve görselleştirme üzerine Jupyter notebook çalışmaları. Matplotlib ve Seaborn ile grafik üretimi ve veri inceleme pratikleri.',
            en: "Jupyter notebook studies on data analysis and visualisation - producing charts and exploring data with Matplotlib and Seaborn."
        }
    },
    'Market-Alisveris-Sistemi': {
        title: { tr: "Market Alışveriş Sistemi", en: "Market Shopping System" },
        icon: 'bi-cart3',
        tags: ['Python', 'SQLite'],
        desc: {
            tr: 'Python ile geliştirilen, SQLite veritabanı üzerinde ürün ve alışveriş işlemlerini yöneten market otomasyonu.',
            en: "A market automation built in Python that manages products and shopping operations on top of an SQLite database."
        }
    },
    'Ogrenci-Bilgi-Sistemi': {
        title: { tr: "Öğrenci Bilgi Sistemi", en: "Student Information System" },
        icon: 'bi-mortarboard',
        tags: ['Python', 'SQLite'],
        desc: {
            tr: 'Öğrenci kayıt ve bilgi takibi için Python ile yazılmış, SQLite veritabanı kullanan bilgi sistemi uygulaması.',
            en: "A student registration and record tracking system written in Python, using an SQLite database."
        }
    }
};

const LANG_COLOR = {
    Java: '#b07219', JavaScript: '#f1e05a', TypeScript: '#3178c6', 'C#': '#178600',
    Python: '#3572A5', HTML: '#e34c26', CSS: '#563d7c', 'Jupyter Notebook': '#DA5B0B',
    Vue: '#41b883', Shell: '#89e051', Dockerfile: '#384d54'
};

const SKILL_GROUPS = [
    { icon: 'bi-code-slash', title: { tr: 'Programlama Dilleri', en: 'Programming Languages' }, items: ['Java', 'C#', 'Python', 'JavaScript', 'C / C++'] },
    { icon: 'bi-hdd-stack', title: { tr: 'Backend Geliştirme', en: 'Backend Development' }, items: ['Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Spring Security', 'ASP.NET Core', 'RESTful API', 'JWT'] },
    { icon: 'bi-diagram-3', title: { tr: 'Dağıtık Sistemler & Mesajlaşma', en: 'Distributed Systems & Messaging' }, items: ['Apache Kafka', 'RabbitMQ', 'Redis', 'Hazelcast', 'Microservices', 'Event-Driven'] },
    { icon: 'bi-database', title: { tr: 'Veritabanları', en: 'Databases' }, items: ['PostgreSQL', 'SQL', 'TimescaleDB', 'PostGIS'] },
    { icon: 'bi-window', title: { tr: 'Frontend Geliştirme', en: 'Frontend Development' }, items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
    { icon: 'bi-tools', title: { tr: 'DevOps & Araçlar', en: 'DevOps & Tools' }, items: ['Docker', 'Git', 'GitHub', 'Postman', 'Linux'] }
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
        title: { tr: 'Backend & API', en: 'Backend & API' },
        desc: {
            tr: 'Spring Boot ile katmanlı, test edilebilir servisler; JWT tabanlı kimlik doğrulama ve temiz REST sözleşmeleri.',
            en: 'Layered, testable services with Spring Boot; JWT-based authentication and clean REST contracts.'
        },
        tags: ['Spring Boot', 'REST', 'JPA', 'JWT']
    },
    {
        icon: 'bi-diagram-3',
        title: { tr: 'Dağıtık & Event-Driven', en: 'Distributed & Event-Driven' },
        desc: {
            tr: 'Kafka ile event streaming, RabbitMQ ile bildirim akışları, Redis ile cache ve idempotency kurgusu.',
            en: 'Event streaming with Kafka, notification workflows over RabbitMQ, caching and idempotency with Redis.'
        },
        tags: ['Kafka', 'RabbitMQ', 'Redis', 'Microservices']
    },
    {
        icon: 'bi-window-stack',
        title: { tr: 'Uçtan Uca Teslim', en: 'End-to-End Delivery' },
        desc: {
            tr: 'Gerektiğinde arayüzü de ben yazıyorum: React veya ASP.NET Core ile çalışan, Docker ile paketlenmiş tam ürün.',
            en: 'I write the interface too when needed: a complete product built with React or ASP.NET Core and packaged with Docker.'
        },
        tags: ['React', 'ASP.NET Core', 'PostgreSQL', 'Docker']
    }
];

const TIMELINE = [
    {
        date: { tr: 'Temmuz 2026 — Ağustos 2026', en: 'July 2026 — August 2026' },
        title: { tr: 'Yazılım Mühendisliği Stajyeri', en: 'Software Engineering Intern' },
        org: 'Mobiliz',
        desc: {
            tr: 'Araç takip ve filo yönetimi projelerinde görev aldım. Telemetri verisinin işlenmesi, event tabanlı akışlar ve gerçek zamanlı izleme tarafında geliştirme yaptım.',
            en: 'Worked on vehicle tracking and fleet management projects, developing telemetry processing, event-driven pipelines and real-time monitoring.'
        }
    },
    {
        date: { tr: 'Mart 2025 — Haziran 2026', en: 'March 2025 — June 2026' },
        title: { tr: 'IT Destek / Programlama Asistanı', en: 'IT Support / Programming Assistant' },
        org: {
            tr: 'Bandırma Onyedi Eylül Üniversitesi · İŞKUR Gençlik Programı',
            en: 'Bandırma Onyedi Eylül University · İŞKUR Youth Programme'
        },
        desc: {
            tr: 'Üniversite bünyesinde teknik destek sağladım ve programlama eğitimlerine asistanlık ettim.',
            en: 'Provided technical support across the university and assisted in programming courses.'
        }
    },
    {
        date: { tr: '2023 — 2027', en: '2023 — 2027' },
        title: { tr: 'Yazılım Mühendisliği (Lisans)', en: 'BSc Software Engineering' },
        org: {
            tr: 'Bandırma Onyedi Eylül Üniversitesi',
            en: 'Bandırma Onyedi Eylül University'
        },
        desc: {
            tr: '4. sınıf öğrencisiyim. Dağıtık sistemler, veri tabanları ve yazılım mimarisi alanlarına yoğunlaşıyorum.',
            en: 'Final-year student, focusing on distributed systems, databases and software architecture.'
        }
    }
];

// ═══════════════════════════════════════════════════════════════
//  DİL (i18n)
// ═══════════════════════════════════════════════════════════════

const LANGS = ['tr', 'en'];

function detectLang() {
    try {
        const saved = localStorage.getItem('lang');
        if (LANGS.includes(saved)) return saved;
    } catch { /* localStorage kapalı olabilir */ }
    return (navigator.language || 'tr').toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

let LANG = detectLang();

/** Çift dilli değeri o anki dilde döndürür: {tr,en} ya da düz metin kabul eder. */
function L(val) {
    if (val && typeof val === 'object' && !Array.isArray(val)) return val[LANG] ?? val.tr ?? '';
    return val ?? '';
}

const STRINGS = {
    // Menü
    nav_home: { tr: 'Anasayfa', en: 'Home' },
    nav_about: { tr: 'Hakkımda', en: 'About' },
    nav_projects: { tr: 'Projeler', en: 'Projects' },
    nav_cv: { tr: 'CV', en: 'Resume' },
    nav_contact: { tr: 'İletişim', en: 'Contact' },
    nav_stats: { tr: 'İstatistikler', en: 'Stats' },
    cv_download: { tr: 'CV İndir', en: 'Download CV' },

    // Hero
    hero_badge: { tr: 'Yeni projelere açığım', en: 'Open to new opportunities' },
    hero_hi: { tr: 'Merhaba, ben', en: "Hi, I'm" },
    hero_lead: {
        tr: 'Bandırma Onyedi Eylül Üniversitesi <strong>Yazılım Mühendisliği</strong> 4. sınıf öğrencisiyim. <strong>Java 21, Spring Boot ve Apache Kafka</strong> ile event-driven, gerçek zamanlı sistemler kuruyorum; gerektiğinde React ve ASP.NET Core ile uçtan uca teslim ediyorum.',
        en: "I'm a final-year <strong>Software Engineering</strong> student at Bandırma Onyedi Eylül University. I build event-driven, real-time systems with <strong>Java 21, Spring Boot and Apache Kafka</strong> — and ship them end to end with React and ASP.NET Core when needed."
    },
    hero_cta_projects: { tr: 'Projelerimi Gör', en: 'View My Work' },
    hero_cta_contact: { tr: 'İletişime Geç', en: 'Get in Touch' },
    hero_loc: { tr: 'Bandırma, Balıkesir', en: 'Bandırma, Türkiye' },
    hero_edu: { tr: 'Yazılım Mühendisliği · 2023–2027', en: 'Software Engineering · 2023–2027' },
    hero_intern: { tr: 'Mobiliz stajyeri', en: 'Intern at Mobiliz' },

    // Sayaçlar
    stat_repos: { tr: 'Genel Depo', en: 'Public Repos' },
    stat_contrib: { tr: 'Yıllık Katkı', en: 'Contributions / yr' },
    stat_stars: { tr: 'Aldığı Yıldız', en: 'Stars Earned' },
    stat_exp: { tr: 'İş Deneyimi', en: 'Work Experience' },

    // Anasayfa bölümleri
    focus_eyebrow: { tr: 'Odak Alanlarım', en: 'What I Focus On' },
    focus_title: { tr: 'Ne üzerine <span class="gradient-text">çalışıyorum</span>', en: 'What I <span class="gradient-text">work on</span>' },
    featured_eyebrow: { tr: 'Öne Çıkanlar', en: 'Featured' },
    featured_title: { tr: 'Pinlediğim <span class="gradient-text">projeler</span>', en: 'Pinned <span class="gradient-text">projects</span>' },
    featured_sub: { tr: "GitHub profilimde öne çıkardığım çalışmalar — canlı olarak GitHub API'den çekiliyor.", en: 'The work I pin on my GitHub profile — pulled live from the GitHub API.' },
    featured_all: { tr: 'Tüm projeleri gör', en: 'See all projects' },
    exp_eyebrow: { tr: 'Deneyim', en: 'Experience' },
    exp_title: { tr: 'Nerelerde <span class="gradient-text">çalıştım</span>', en: 'Where I have <span class="gradient-text">worked</span>' },
    exp_more: { tr: 'Eğitim ve yetenekler', en: 'Education and skills' },
    cta_title: { tr: 'Birlikte bir şey inşa edelim', en: "Let's build something together" },
    cta_sub: { tr: 'Staj, yarı zamanlı iş veya freelance bir proje — backend ağırlıklı işlerde memnuniyetle yer alırım.', en: 'Internship, part-time role or a freelance project — I would be glad to take on backend-focused work.' },
    cta_msg: { tr: 'Mesaj Gönder', en: 'Send a Message' },
    cta_cv: { tr: "CV'yi İncele", en: 'View Resume' },

    // Hakkımda
    about_eyebrow: { tr: 'Hakkımda', en: 'About' },
    about_title: { tr: 'Kısaca <span class="gradient-text">ben</span>', en: 'A bit <span class="gradient-text">about me</span>' },
    about_p1: {
        tr: "Dördüncü sınıf Yazılım Mühendisliği öğrencisiyim. IT desteği, programlama eğitimi asistanlığı ve yazılım geliştirme tarafında deneyim kazandım. Bandırma Onyedi Eylül Üniversitesi'nde <strong>İŞKUR Gençlik Programı</strong> kapsamında çalıştım; <strong>Mobiliz</strong>'deki stajım boyunca araç takip ve filo yönetimi projelerine katkı verdim.",
        en: "I'm a final-year Software Engineering student with experience in IT support, programming instruction and software development. I worked at Bandırma Onyedi Eylül University through the <strong>İŞKUR Youth Programme</strong>, and contributed to vehicle tracking and fleet management projects during my internship at <strong>Mobiliz</strong>."
    },
    about_p2: {
        tr: 'İlgi alanım <strong>backend geliştirme, dağıtık sistemler ve gerçek zamanlı uygulamalar</strong>. Kafka ile event streaming, Redis ile idempotency, PostGIS/TimescaleDB ile zaman-serisi ve konum verisi üzerinde çalışmayı seviyorum.',
        en: 'My interests are <strong>backend development, distributed systems and real-time applications</strong>. I enjoy working with Kafka for event streaming, Redis for idempotency, and PostGIS/TimescaleDB for time-series and spatial data.'
    },
    about_langs: { tr: 'Türkçe · İngilizce', en: 'Turkish · English' },
    about_remote: { tr: 'Uzaktan / Hibrit', en: 'Remote / Hybrid' },
    about_timeline: { tr: 'Deneyim & Eğitim', en: 'Experience & Education' },
    skills_eyebrow: { tr: 'Yetenekler', en: 'Skills' },
    skills_title: { tr: 'Çalıştığım <span class="gradient-text">teknolojiler</span>', en: 'Technologies I <span class="gradient-text">work with</span>' },

    // Projeler
    projects_eyebrow: { tr: 'Portföy', en: 'Portfolio' },
    projects_title: { tr: 'Geliştirdiğim <span class="gradient-text">projeler</span>', en: 'Projects I have <span class="gradient-text">built</span>' },
    projects_sub: {
        tr: "Seçtiğim projeler, en yeniden eskiye doğru sıralı. Depo bilgileri (yıldız, dil, güncellenme) GitHub API'den canlı çekiliyor.",
        en: 'A curated selection, newest first. Repository details (stars, language, last update) come live from the GitHub API.'
    },
    projects_loading: { tr: "GitHub'dan çekiliyor…", en: 'Fetching from GitHub…' },
    filter_all: { tr: 'Tümü', en: 'All' },
    card_demo: { tr: 'Demo', en: 'Demo' },
    card_detail: { tr: 'Detay', en: 'Details' },
    pinned: { tr: 'Pinli', en: 'Pinned' },

    // Proje detayı
    back_projects: { tr: 'Tüm projeler', en: 'All projects' },
    pd_loading: { tr: 'İçerik yükleniyor…', en: 'Loading content…' },
    pd_demo: { tr: 'Canlı Demo', en: 'Live Demo' },
    pd_github: { tr: "GitHub'da Aç", en: 'Open on GitHub' },
    pd_no_readme: {
        tr: "Bu projenin GitHub'da README dosyası yok; ayrıntı için kaynak koda göz atabilirsiniz.",
        en: 'This repository has no README on GitHub — take a look at the source code for details.'
    },
    pd_no_desc: { tr: 'Bu depo için ayrıntılı açıklama bulunmuyor.', en: 'No detailed description is available for this repository.' },

    // CV
    cv_eyebrow: { tr: 'Özgeçmiş', en: 'Resume' },
    cv_title_tr: { tr: 'CV — <span class="gradient-text">Süleyman Emre Arlı</span>', en: 'Resume — <span class="gradient-text">Süleyman Emre Arlı</span>' },
    cv_sub: { tr: 'Belgeyi doğrudan burada inceleyebilir veya PDF olarak indirebilirsiniz.', en: 'Read it right here, or download the PDF.' },
    cv_no_preview: { tr: 'PDF önizlemesi bu cihazda açılamıyor', en: 'PDF preview is not available on this device' },
    cv_no_preview_sub: { tr: 'Aşağıdaki butonlardan indirebilir veya yeni sekmede açabilirsiniz.', en: 'Use the buttons below to download it or open it in a new tab.' },
    cv_pdf: { tr: 'PDF İndir', en: 'Download PDF' },
    cv_newtab: { tr: 'Yeni Sekmede Aç', en: 'Open in New Tab' },
    cv_profile: { tr: 'Profil', en: 'Profile' },
    cv_profile_text: {
        tr: 'Backend / Full-Stack Developer. Dördüncü sınıf Yazılım Mühendisliği öğrencisi; IT desteği, programlama eğitimi ve yazılım geliştirme deneyimine sahip. Backend geliştirme, dağıtık sistemler ve gerçek zamanlı uygulamalara odaklı.',
        en: 'Backend / Full-Stack Developer. Final-year Software Engineering student with experience in IT support, programming instruction and software development. Focused on backend development, distributed systems and real-time applications.'
    },
    cv_work: { tr: 'İş Deneyimi', en: 'Work Experience' },
    cv_edu: { tr: 'Eğitim', en: 'Education' },
    cv_projects: { tr: 'Öne Çıkan Proje Deneyimi', en: 'Key Project Experience' },
    cv_skills: { tr: 'Teknik Yetenekler', en: 'Technical Skills' },
    cv_portfolio: { tr: 'Portföy', en: 'Portfolio' },

    // İletişim
    contact_eyebrow: { tr: 'İletişim', en: 'Contact' },
    contact_title: { tr: 'Bir şey mi <span class="gradient-text">konuşalım?</span>', en: 'Want to <span class="gradient-text">talk?</span>' },
    contact_sub: { tr: 'Staj, proje ya da sadece merhaba demek için — formu doldurun, en kısa sürede döneyim.', en: 'About an internship, a project, or just to say hello — drop me a line and I will get back to you.' },
    f_email: { tr: 'E-posta', en: 'Email' },
    f_phone: { tr: 'Telefon', en: 'Phone' },
    f_location: { tr: 'Konum', en: 'Location' },
    f_name_label: { tr: 'Ad Soyad', en: 'Full Name' },
    f_name_ph: { tr: 'Adınız', en: 'Your name' },
    f_email_ph: { tr: 'ornek@mail.com', en: 'you@example.com' },
    f_subject: { tr: 'Konu', en: 'Subject' },
    f_subject_ph: { tr: 'Neden yazıyorsunuz?', en: 'What is this about?' },
    f_message: { tr: 'Mesaj', en: 'Message' },
    f_message_ph: { tr: 'Mesajınız…', en: 'Your message…' },
    f_send: { tr: 'Gönder', en: 'Send' },
    f_sending: { tr: 'Gönderiliyor…', en: 'Sending…' },
    f_required: { tr: 'Lütfen tüm alanları eksiksiz doldurun.', en: 'Please fill in every field.' },
    f_ok: { tr: '✓ Mesajınız iletildi, teşekkürler! En kısa sürede döneceğim.', en: '✓ Message sent — thank you! I will reply soon.' },
    f_err: { tr: '✕ Gönderilemedi. Lütfen tekrar deneyin veya doğrudan e-posta yazın.', en: '✕ Could not send. Please try again or email me directly.' },
    f_nolib: { tr: 'E-posta servisi yüklenemedi. Doğrudan suleymanarli0666@gmail.com adresine yazabilirsiniz.', en: 'The email service failed to load. You can write to suleymanarli0666@gmail.com directly.' },

    // İstatistikler
    stats_eyebrow: { tr: 'Canlı Veri', en: 'Live Data' },
    stats_title: { tr: 'İstatistikler', en: 'Statistics' },
    stats_sub: {
        tr: "Depolarım, katkı geçmişim ve aktivite dökümüm — hepsi GitHub API'den canlı çekiliyor.",
        en: 'My repositories, contribution history and activity breakdown — all pulled live from the GitHub API.'
    },
    s_github: { tr: 'GitHub Aktivitesi', en: 'GitHub Activity' },
    s_total: { tr: 'Toplam Katkı', en: 'Total Contributions' },
    s_alltime: { tr: 'tüm zamanlar', en: 'all time' },
    s_year: { tr: 'Son 1 Yıl', en: 'Past Year' },
    s_365: { tr: 'son 365 gün', en: 'last 365 days' },
    s_repos: { tr: 'Depo', en: 'Repositories' },
    s_streak: { tr: 'En Uzun Seri', en: 'Longest Streak' },
    s_streak_unit: { tr: 'ardışık gün', en: 'consecutive days' },
    s_by_year: { tr: 'Yıllara Göre Katkı', en: 'Contributions by Year' },
    s_recent: { tr: 'Son Dönem Aktivitesi', en: 'Recent Activity' },
    s_langs: { tr: 'Depolarda Dil Dağılımı', en: 'Language Breakdown' },
    s_today: { tr: 'Bugün', en: 'Today' },
    s_7d: { tr: 'Son 7 gün', en: 'Last 7 days' },
    s_30d: { tr: 'Son 30 gün', en: 'Last 30 days' },
    s_90d: { tr: 'Son 90 gün', en: 'Last 90 days' },
    s_stars_earned: { tr: 'yıldız aldı', en: 'stars earned' },
    s_repo_unit: { tr: 'depo', en: 'repos' },

    // Katkı haritası
    c_title: { tr: 'GitHub Katkı Geçmişi', en: 'GitHub Contribution History' },
    c_sub_a: { tr: 'Son 12 ayda', en: 'In the past 12 months:' },
    c_sub_b: { tr: 'katkı', en: 'contributions' },
    c_less: { tr: 'Az', en: 'Less' },
    c_more: { tr: 'Çok', en: 'More' },
    c_fail: { tr: 'Katkı verisi şu an alınamadı —', en: 'Contribution data is unavailable right now —' },
    c_fail_link: { tr: 'GitHub profilinden', en: 'see it on GitHub' },

    // Genel
    err_generic: { tr: 'Veri şu an alınamadı.', en: 'Data is unavailable right now.' },
    err_api: {
        tr: "GitHub API'ye şu an ulaşılamıyor (saatlik istek limiti olabilir).",
        en: 'The GitHub API is unreachable right now (possibly an hourly rate limit).'
    },
    open_github: { tr: "GitHub'da Aç", en: 'Open on GitHub' },
    cvw_intern_title: { tr: 'Yazılım Mühendisliği Stajyeri', en: 'Software Engineering Intern' },
    cvw_intern_date: { tr: 'Tem 2026 — Ağu 2026', en: 'Jul 2026 — Aug 2026' },
    cvw_intern_1: { tr: 'Araç takip ve filo yönetimi projelerinde geliştirme.', en: 'Development on vehicle tracking and fleet management projects.' },
    cvw_intern_2: { tr: 'Telemetri işleme ve event tabanlı akışlar üzerinde çalışma.', en: 'Worked on telemetry processing and event-driven pipelines.' },
    cvw_it_title: { tr: 'IT Destek / Programlama Asistanı', en: 'IT Support / Programming Assistant' },
    cvw_it_date: { tr: 'Mar 2025 — Haz 2026', en: 'Mar 2025 — Jun 2026' },
    cvw_it_org: { tr: 'Bandırma Onyedi Eylül Üniversitesi · İŞKUR Gençlik Programı', en: 'Bandırma Onyedi Eylül University · İŞKUR Youth Programme' },
    cvw_it_1: { tr: 'Teknik destek ve sistem bakımı.', en: 'Technical support and system maintenance.' },
    cvw_it_2: { tr: 'Programlama eğitimlerinde asistanlık.', en: 'Teaching assistance in programming courses.' },
    cve_degree: { tr: 'Yazılım Mühendisliği (Lisans)', en: 'BSc Software Engineering' },
    cve_school: { tr: 'Bandırma Onyedi Eylül Üniversitesi', en: 'Bandırma Onyedi Eylül University' },
    cvp_vts_1: { tr: 'Gerçek zamanlı araç takibi ve filo yönetimi için event-driven platform geliştirdim.', en: 'Built an event-driven platform for real-time vehicle tracking and fleet management.' },
    cvp_vts_2: { tr: 'Telemetri işleme, geofencing, sefer tespiti ve rota takibi bileşenlerini kurdum.', en: 'Implemented telemetry processing, geofencing, trip detection and route tracking.' },
    cvp_vts_3: { tr: 'Kafka tabanlı event streaming, kural tabanlı ihlal tespiti ve zaman-serisi/konumsal veri yönetimi uyguladım.', en: 'Applied Kafka-based event streaming, rule-based violation detection and time-series/spatial data management.' },
    cvp_edp_1: { tr: 'Bağımsız servisler arasında asenkron iletişim kuran mikroservis mimarisi tasarladım.', en: 'Designed a microservices architecture with asynchronous communication between independent services.' },
    cvp_edp_2: { tr: 'Kafka ile event streaming, RabbitMQ ile bildirim akışları, Redis ile cache ve idempotency, Hazelcast ile dağıtık veri yönetimi kurguladım.', en: 'Set up event streaming with Kafka, notification workflows with RabbitMQ, caching and idempotency with Redis, and distributed data management with Hazelcast.' },
    cvp_cm_1: { tr: 'Ziyaretçi, oturum, sayfa etkileşimi ve coğrafi veri takibi yapan gerçek zamanlı analitik platformu geliştirdim.', en: 'Developed a real-time analytics platform tracking visitors, sessions, page interactions and geographic data.' },
    cvp_cm_2: { tr: 'RESTful API, Server-Sent Events, API key doğrulaması ve Cloud Run üzerinde serverless dağıtım uyguladım.', en: 'Implemented RESTful APIs, Server-Sent Events, API key authentication and serverless deployment on Cloud Run.' },
    lang_other: { tr: 'Diğer', en: 'Other' },
    no_desc_repo: { tr: 'Açıklama eklenmemiş bir depo.', en: 'A repository without a description.' },
    no_data: { tr: 'Henüz veri yok.', en: 'No data yet.' },
    to_top: { tr: 'Yukarı çık', en: 'Back to top' },
    menu: { tr: 'Menü', en: 'Menu' }
};

function t(key) {
    const v = STRINGS[key];
    if (!v) { console.warn('Çeviri eksik:', key); return key; }
    return L(v);
}

/** index.html'deki sabit metinleri (menü, butonlar) o anki dile çevirir. */
function applyStaticI18n() {
    document.documentElement.lang = LANG;
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    const cur = $('#lang-current');
    if (cur) cur.textContent = LANG.toUpperCase();
}

/** Dili değiştirir, tercihi saklar ve açık sayfayı yeniden çizer. */
function setLang(next) {
    if (!LANGS.includes(next) || next === LANG) return;
    LANG = next;
    try { localStorage.setItem('lang', LANG); } catch { }

    applyStaticI18n();

    // Açık sayfayı yeni dilde yeniden oluştur (kaydırma konumu korunur)
    const y = window.scrollY;
    const page = _currentPage, param = _currentParam;
    _currentPage = null;
    _navigating = false;
    render(page, param, { scroll: false });
    setTimeout(() => window.scrollTo(0, y), 240);
}

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

// Depo README'sini GitHub'ın kendi markdown motorundan HTML olarak alır.
// Böylece detay sayfasındaki içerik her zaman deponun güncel README'sidir.
function getReadmeHtml(name) {
    return cached('gh_readme_' + name, 60 * 60 * 1000, async () => {
        const res = await fetch(`https://api.github.com/repos/${GH.user}/${name}/readme`, {
            headers: { Accept: 'application/vnd.github.html' }
        });
        if (res.status === 404) return null;          // README yok
        if (!res.ok) throw new Error('README: ' + res.status);
        return res.text();
    });
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
    const title = L(meta.title) || prettyName(repo.name);
    const desc = L(meta.desc) || repo.desc || t('no_desc_repo');
    const tags = meta.tags || (repo.lang ? [repo.lang] : []);
    const icon = meta.icon || 'bi-folder2-open';
    const color = LANG_COLOR[repo.lang] || '#6366f1';
    const demo = demoUrl(repo);

    return `
    <article class="card card-hover project-card reveal" data-lang="${esc(repo.lang || t('lang_other'))}">
        ${isPinned ? `<span class="pin-flag">${t('pinned')}</span>` : ''}
        <div class="pc-top">
            <div class="pc-icon"><i class="bi ${esc(icon)}"></i></div>
            <div class="pc-stats" style="margin-top:6px">
                ${repo.stars ? `<span><i class="bi bi-star-fill"></i> ${repo.stars}</span>` : ''}
                ${repo.forks ? `<span><i class="bi bi-diagram-2"></i> ${repo.forks}</span>` : ''}
            </div>
        </div>
        <h3 class="pc-title"><a href="#project/${encodeURIComponent(repo.name)}" data-page="project/${encodeURIComponent(repo.name)}">${esc(title)}</a></h3>
        <p class="pc-desc">${esc(desc)}</p>
        <div class="pc-tags">${tags.slice(0, 6).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <div class="pc-foot">
            <span class="pc-lang">
                ${repo.lang ? `<i class="pc-dot" style="background:${color}"></i> ${esc(repo.lang)}` : '<span class="dim">—</span>'}
            </span>
            <span class="pc-links">
                ${demo ? `<a class="pc-demo" href="${esc(demo)}" target="_blank" rel="noopener">
                    <i class="bi bi-box-arrow-up-right"></i> ${t('card_demo')}
                </a>` : ''}
                <a class="pc-link" href="${esc(repo.url)}" target="_blank" rel="noopener" aria-label="GitHub deposu">
                    <i class="bi bi-github"></i>
                </a>
                <a class="pc-link" href="#project/${encodeURIComponent(repo.name)}"
                   data-page="project/${encodeURIComponent(repo.name)}">
                    ${t('card_detail')} <i class="bi bi-arrow-right"></i>
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
                <h3 style="font-size:16px;font-weight:750;margin-bottom:3px">${t('c_title')}</h3>
                <p class="dim" style="font-size:12.5px">${t('c_sub_a')} <strong id="contrib-total" style="color:var(--accent-light)">—</strong> ${t('c_sub_b')}</p>
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
            <span>${t('c_less')}</span>
            <span class="contrib-cell"></span>
            <span class="contrib-cell" data-level="1"></span>
            <span class="contrib-cell" data-level="2"></span>
            <span class="contrib-cell" data-level="3"></span>
            <span class="contrib-cell" data-level="4"></span>
            <span>${t('c_more')}</span>
        </div>
    </div>`;
}

const PAGES = {
    // ── ANASAYFA ─────────────────────────────────────────────
    home: () => `
    <section class="wrap hero">
        <div>
            <span class="badge"><span class="live-dot"></span> ${t('hero_badge')}</span>
            <h1>${t('hero_hi')}<br><span class="gradient-text">Süleyman Emre</span></h1>
            <p class="hero-lead">
                ${t('hero_lead')}
            </p>
            <div class="hero-actions">
                <a href="#projects" data-page="projects" class="btn btn-primary">
                    <i class="bi bi-collection"></i> ${t('hero_cta_projects')}
                </a>
                <a href="cv.pdf" download="Suleyman-Emre-Arli-CV.pdf" class="btn btn-ghost">
                    <i class="bi bi-download"></i> CV İndir
                </a>
                <a href="#contact" data-page="contact" class="btn btn-outline">
                    <i class="bi bi-envelope"></i> ${t('hero_cta_contact')}
                </a>
            </div>
            <div class="hero-meta">
                <span><i class="bi bi-geo-alt-fill"></i> ${t('hero_loc')}</span>
                <span><i class="bi bi-mortarboard-fill"></i> ${t('hero_edu')}</span>
                <span><i class="bi bi-briefcase-fill"></i> ${t('hero_intern')}</span>
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
            <div class="stat-cell"><p class="stat-num" id="stat-repos">0</p><p class="stat-label">${t('stat_repos')}</p></div>
            <div class="stat-cell"><p class="stat-num" id="stat-contrib">0</p><p class="stat-label">${t('stat_contrib')}</p></div>
            <div class="stat-cell"><p class="stat-num" id="stat-stars">0</p><p class="stat-label">${t('stat_stars')}</p></div>
            <div class="stat-cell"><p class="stat-num" data-count="2" data-suffix="">0</p><p class="stat-label">${t('stat_exp')}</p></div>
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
            <span class="eyebrow">${t('focus_eyebrow')}</span>
            <h2 class="section-title" style="font-size:clamp(24px,3.4vw,32px)">${t('focus_title')}</h2>
        </div>
        <div class="grid-3">
            ${FOCUS_AREAS.map((f, i) => `
            <div class="card card-hover focus-card reveal d${i + 1}">
                <div class="sg-icon"><i class="bi ${esc(f.icon)}"></i></div>
                <h3 class="focus-title">${esc(L(f.title))}</h3>
                <p class="focus-desc">${esc(L(f.desc))}</p>
                <div class="sg-chips">${f.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
            </div>`).join('')}
        </div>
    </section>

    <section class="wrap section-sm">
        ${contribSectionHTML()}
    </section>

    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow">${t('featured_eyebrow')}</span>
            <h2 class="section-title">${t('featured_title')}</h2>
            <p class="section-sub">${t('featured_sub')}</p>
        </div>
        <div id="featured-grid" class="project-grid">
            <div class="state-box" style="grid-column:1/-1"><div class="spinner"></div>${t('projects_loading')}</div>
        </div>
        <div class="center mt-40">
            <a href="#projects" data-page="projects" class="btn btn-ghost">
                ${t('featured_all')} <i class="bi bi-arrow-right"></i>
            </a>
        </div>
    </section>

    <section class="wrap section-sm">
        <div class="reveal" style="margin-bottom:26px">
            <span class="eyebrow">${t('exp_eyebrow')}</span>
            <h2 class="section-title" style="font-size:clamp(24px,3.4vw,32px)">${t('exp_title')}</h2>
        </div>
        <div class="grid-2">
            ${TIMELINE.slice(0, 2).map((t, i) => `
            <div class="card card-hover exp-card reveal d${i + 1}">
                <p class="tl-date">${esc(L(t.date))}</p>
                <p class="exp-title">${esc(L(t.title))}</p>
                <p class="tl-org">${esc(L(t.org))}</p>
                <p class="tl-desc">${esc(L(t.desc))}</p>
            </div>`).join('')}
        </div>
        <div class="center mt-40">
            <a href="#about" data-page="about" class="btn btn-ghost">
                ${t('exp_more')} <i class="bi bi-arrow-right"></i>
            </a>
        </div>
    </section>

    <section class="wrap section-sm">
        <div class="cta-band reveal">
            <h2 class="section-title" style="font-size:clamp(24px,3.6vw,34px)">${t('cta_title')}</h2>
            <p class="section-sub mx-auto center" style="margin-bottom:26px">
                ${t('cta_sub')}
            </p>
            <div class="hero-actions" style="justify-content:center;margin:0">
                <a href="#contact" data-page="contact" class="btn btn-primary"><i class="bi bi-send"></i> ${t('cta_msg')}</a>
                <a href="#cv" data-page="cv" class="btn btn-ghost"><i class="bi bi-file-earmark-text"></i> ${t('cta_cv')}</a>
            </div>
        </div>
    </section>`,

    // ── HAKKIMDA ─────────────────────────────────────────────
    about: () => `
    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow">${t('about_eyebrow')}</span>
            <h2 class="section-title">${t('about_title')}</h2>
        </div>

        <div class="grid-2 reveal" style="align-items:start;gap:28px">
            <div class="card" style="padding:28px">
                <p class="muted" style="font-size:15px;line-height:1.85">
                    ${t('about_p1')}
                </p>
                <p class="muted" style="font-size:15px;line-height:1.85;margin-top:16px">
                    ${t('about_p2')}
                </p>
                <div class="sg-chips" style="margin-top:22px">
                    <span class="chip"><i class="bi bi-geo-alt"></i> ${t('hero_loc')}</span>
                    <span class="chip"><i class="bi bi-translate"></i> ${t('about_langs')}</span>
                    <span class="chip"><i class="bi bi-clock-history"></i> ${t('about_remote')}</span>
                </div>
            </div>

            <div class="card" style="padding:28px">
                <h3 style="font-size:15px;font-weight:750;margin-bottom:22px">${t('about_timeline')}</h3>
                <div class="timeline">
                    ${TIMELINE.map(t => `
                    <div class="tl-item">
                        <p class="tl-date">${esc(L(t.date))}</p>
                        <p class="tl-title">${esc(L(t.title))}</p>
                        <p class="tl-org">${esc(L(t.org))}</p>
                        <p class="tl-desc">${esc(L(t.desc))}</p>
                    </div>`).join('')}
                </div>
            </div>
        </div>

        <div class="reveal" style="margin:56px 0 26px">
            <span class="eyebrow">${t('skills_eyebrow')}</span>
            <h2 class="section-title" style="font-size:clamp(24px,3.4vw,32px)">${t('skills_title')}</h2>
        </div>

        <div class="project-grid">
            ${SKILL_GROUPS.map((g, i) => `
            <div class="card card-hover skill-group reveal d${(i % 3) + 1}">
                <div class="sg-head">
                    <div class="sg-icon"><i class="bi ${esc(g.icon)}"></i></div>
                    <p class="sg-title">${esc(L(g.title))}</p>
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
            <span class="eyebrow">${t('projects_eyebrow')}</span>
            <h2 class="section-title">${t('projects_title')}</h2>
            <p class="section-sub">
                ${t('projects_sub')}
            </p>
        </div>

        <div id="lang-filter" class="filter-bar reveal"></div>

        <div id="all-grid" class="project-grid">
            <div class="state-box" style="grid-column:1/-1"><div class="spinner"></div>${t('projects_loading')}</div>
        </div>
    </section>`,

    // ── PROJE DETAYI ─────────────────────────────────────────
    project: (name) => {
        const meta = PROJECT_META[name] || {};
        const title = L(meta.title) || prettyName(name);
        return `
    <section class="wrap section">
        <a href="#projects" data-page="projects" class="back-link reveal">
            <i class="bi bi-arrow-left"></i> ${t('back_projects')}
        </a>

        <div class="pd-head reveal">
            <div class="pd-icon"><i class="bi ${esc(meta.icon || 'bi-folder2-open')}"></i></div>
            <div style="flex:1;min-width:0">
                <h1 class="pd-title">${esc(title)}</h1>
                <p class="dim mono" style="font-size:12.5px;margin-top:4px">${esc(GH.user)}/${esc(name)}</p>
                <div id="pd-meta" class="pd-meta"></div>
            </div>
        </div>

        ${meta.desc ? `<p class="pd-lead reveal">${esc(L(meta.desc))}</p>` : ''}

        ${(meta.tags || []).length ? `<div class="sg-chips reveal" style="margin-bottom:22px">
            ${meta.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}
        </div>` : ''}

        <div id="pd-actions" class="hero-actions reveal" style="margin:0 0 34px"></div>

        <div id="pd-body" class="reveal">
            <div class="state-box"><div class="spinner"></div>${t('pd_loading')}</div>
        </div>
    </section>`;
    },

    // ── CV ───────────────────────────────────────────────────
    cv: () => `
    <section class="wrap section">
        <div class="reveal mb-32">
            <span class="eyebrow">${t('cv_eyebrow')}</span>
            <h2 class="section-title">${t('cv_title_tr')}</h2>
            <p class="section-sub">${t('cv_sub')}</p>
        </div>

        <div class="cv-layout">
            <div class="card cv-viewer reveal">
                <iframe id="cv-frame" class="cv-frame" src="cv.pdf#toolbar=0&navpanes=0&view=FitH"
                        title="Süleyman Emre Arlı CV"></iframe>
                <div id="cv-fallback" class="cv-fallback">
                    <i class="bi bi-file-earmark-pdf" style="font-size:38px;color:var(--accent-light)"></i>
                    <p class="muted" style="margin:14px 0 4px;font-weight:600">${t('cv_no_preview')}</p>
                    <p class="dim" style="font-size:13px">${t('cv_no_preview_sub')}</p>
                </div>
                <div class="cv-toolbar">
                    <a href="cv.pdf" download="Suleyman-Emre-Arli-CV.pdf" class="btn btn-primary">
                        <i class="bi bi-download"></i> ${t('cv_pdf')}
                    </a>
                    <a href="cv.pdf" target="_blank" rel="noopener" class="btn btn-ghost">
                        <i class="bi bi-box-arrow-up-right"></i> ${t('cv_newtab')}
                    </a>
                </div>
            </div>

            <div class="card reveal d2" style="padding:28px">
                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-person-badge"></i> ${t('cv_profile')}</p>
                    <p class="muted" style="font-size:13.5px;line-height:1.8">
                        ${t('cv_profile_text')}
                    </p>
                    <div class="sg-chips" style="margin-top:16px">
                        <a class="chip" href="mailto:suleymanarli0666@gmail.com"><i class="bi bi-envelope"></i> suleymanarli0666@gmail.com</a>
                        <a class="chip" href="tel:+905444530125"><i class="bi bi-telephone"></i> +90 544 453 01 25</a>
                        <a class="chip" href="https://github.com/AllenVB" target="_blank" rel="noopener"><i class="bi bi-github"></i> AllenVB</a>
                        <a class="chip" href="https://www.linkedin.com/in/suleymanemrearlii" target="_blank" rel="noopener"><i class="bi bi-linkedin"></i> LinkedIn</a>
                        <a class="chip" href="https://allenvb-websayfasi.vercel.app/" target="_blank" rel="noopener"><i class="bi bi-globe2"></i> ${t('cv_portfolio')}</a>
                    </div>
                </div>

                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-briefcase"></i> ${t('cv_work')}</p>
                    <div class="cv-entry">
                        <div class="cv-entry-head">
                            <p class="cv-entry-title">${t('cvw_intern_title')}</p>
                            <p class="cv-entry-date">${t('cvw_intern_date')}</p>
                        </div>
                        <p class="cv-entry-org">Mobiliz</p>
                        <ul class="cv-list">
                            <li>${t('cvw_intern_1')}</li>
                            <li>${t('cvw_intern_2')}</li>
                        </ul>
                    </div>
                    <div class="cv-entry">
                        <div class="cv-entry-head">
                            <p class="cv-entry-title">${t('cvw_it_title')}</p>
                            <p class="cv-entry-date">${t('cvw_it_date')}</p>
                        </div>
                        <p class="cv-entry-org">${t('cvw_it_org')}</p>
                        <ul class="cv-list">
                            <li>${t('cvw_it_1')}</li>
                            <li>${t('cvw_it_2')}</li>
                        </ul>
                    </div>
                </div>

                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-mortarboard"></i> ${t('cv_edu')}</p>
                    <div class="cv-entry">
                        <div class="cv-entry-head">
                            <p class="cv-entry-title">${t('cve_degree')}</p>
                            <p class="cv-entry-date">2023 — 2027</p>
                        </div>
                        <p class="cv-entry-org">${t('cve_school')}</p>
                    </div>
                </div>

                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-kanban"></i> ${t('cv_projects')}</p>
                    <div class="cv-entry">
                        <p class="cv-entry-title" style="margin-bottom:6px">Vehicle Tracking & Fleet Telematics Platform</p>
                        <p class="dim mono" style="font-size:11.5px;margin-bottom:8px">Java 21 · Spring Boot · Kafka Streams · TimescaleDB · PostGIS · Redis · WebSocket · Docker</p>
                        <ul class="cv-list">
                            <li>${t('cvp_vts_1')}</li>
                            <li>${t('cvp_vts_2')}</li>
                            <li>${t('cvp_vts_3')}</li>
                        </ul>
                    </div>
                    <div class="cv-entry">
                        <p class="cv-entry-title" style="margin-bottom:6px">Event-Driven Microservices Pipeline</p>
                        <p class="dim mono" style="font-size:11.5px;margin-bottom:8px">Java · Spring Boot · Kafka · RabbitMQ · Redis · Hazelcast · PostgreSQL · Docker</p>
                        <ul class="cv-list">
                            <li>${t('cvp_edp_1')}</li>
                            <li>${t('cvp_edp_2')}</li>
                        </ul>
                    </div>
                    <div class="cv-entry">
                        <p class="cv-entry-title" style="margin-bottom:6px">CoreMetrics — Real-Time SaaS Analytics Platform</p>
                        <p class="dim mono" style="font-size:11.5px;margin-bottom:8px">C# · ASP.NET Core · PostgreSQL · Google Cloud Run · SSE · Chart.js</p>
                        <ul class="cv-list">
                            <li>${t('cvp_cm_1')}</li>
                            <li>${t('cvp_cm_2')}</li>
                        </ul>
                    </div>
                </div>

                <div class="cv-block">
                    <p class="cv-block-title"><i class="bi bi-stars"></i> ${t('cv_skills')}</p>
                    ${SKILL_GROUPS.map(g => `
                    <div class="cv-skill-row">
                        <span class="cv-skill-key">${esc(L(g.title))}</span>
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
            <span class="eyebrow">${t('contact_eyebrow')}</span>
            <h2 class="section-title">${t('contact_title')}</h2>
            <p class="section-sub">${t('contact_sub')}</p>
        </div>

        <div class="contact-layout">
            <div class="stack-lg reveal">
                <a class="contact-item" href="mailto:suleymanarli0666@gmail.com">
                    <span class="ci-icon"><i class="bi bi-envelope-fill"></i></span>
                    <span><span class="ci-label">${t('f_email')}</span><br><span class="ci-value">suleymanarli0666@gmail.com</span></span>
                </a>
                <a class="contact-item" href="tel:+905444530125">
                    <span class="ci-icon"><i class="bi bi-telephone-fill"></i></span>
                    <span><span class="ci-label">${t('f_phone')}</span><br><span class="ci-value">+90 544 453 01 25</span></span>
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
                    <span><span class="ci-label">${t('f_location')}</span><br><span class="ci-value">${LANG === 'tr' ? 'Bandırma / Balıkesir, Türkiye' : 'Bandırma / Balıkesir, Türkiye'}</span></span>
                </div>
            </div>

            <form id="contact-form" class="card reveal d2" style="padding:28px" novalidate>
                <div class="form-grid">
                    <div class="form-field">
                        <label class="form-label" for="cf-name">${t('f_name_label')}</label>
                        <input class="form-input" id="cf-name" name="name" type="text" required placeholder="${t('f_name_ph')}" autocomplete="name">
                    </div>
                    <div class="form-field">
                        <label class="form-label" for="cf-email">${t('f_email')}</label>
                        <input class="form-input" id="cf-email" name="email" type="email" required placeholder="${t('f_email_ph')}" autocomplete="email">
                    </div>
                    <div class="form-field full">
                        <label class="form-label" for="cf-subject">${t('f_subject')}</label>
                        <input class="form-input" id="cf-subject" name="subject" type="text" required placeholder="${t('f_subject_ph')}">
                    </div>
                    <div class="form-field full">
                        <label class="form-label" for="cf-message">${t('f_message')}</label>
                        <textarea class="form-input" id="cf-message" name="message" rows="6" required placeholder="${t('f_message_ph')}"></textarea>
                    </div>
                    <div class="form-field full">
                        <button type="submit" class="btn btn-primary" style="width:100%">
                            <i class="bi bi-send-fill"></i> ${t('f_send')}
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
            <span class="eyebrow"><span class="live-dot" style="margin-right:2px"></span> ${t('stats_eyebrow')}</span>
            <h2 class="section-title">${t('stats_title')}</h2>
            <p class="section-sub">
                ${t('stats_sub')}
            </p>
        </div>

        <!-- ── GitHub ────────────────────────────────────────── -->
        <p class="cv-block-title reveal"><i class="bi bi-github"></i> ${t('s_github')}</p>

        <div class="metric-grid">
            <div class="card metric-card reveal"><p class="metric-label">${t('s_total')}</p><p class="metric-value" id="g-total">—</p><p class="metric-hint" id="g-total-hint">${t('s_alltime')}</p></div>
            <div class="card metric-card reveal d1"><p class="metric-label">${t('s_year')}</p><p class="metric-value" id="g-year">—</p><p class="metric-hint">${t('s_365')}</p></div>
            <div class="card metric-card reveal d2"><p class="metric-label">${t('s_repos')}</p><p class="metric-value" id="g-repos">—</p><p class="metric-hint" id="g-stars">—</p></div>
            <div class="card metric-card reveal d3"><p class="metric-label">${t('s_streak')}</p><p class="metric-value" id="g-streak">—</p><p class="metric-hint">${t('s_streak_unit')}</p></div>
        </div>

        <div class="grid-2" style="margin-bottom:20px">
            <div class="card reveal" style="padding:26px">
                <p class="cv-block-title"><i class="bi bi-calendar3"></i> ${t('s_by_year')}</p>
                <div id="g-years"><div class="state-box" style="padding:24px"><div class="spinner"></div></div></div>
            </div>
            <div class="card reveal d2" style="padding:26px">
                <p class="cv-block-title"><i class="bi bi-activity"></i> ${t('s_recent')}</p>
                <div id="g-periods"><div class="state-box" style="padding:24px"><div class="spinner"></div></div></div>
            </div>
        </div>

        <div class="card reveal" style="padding:26px;margin-bottom:20px">
            <p class="cv-block-title"><i class="bi bi-code-slash"></i> ${t('s_langs')}</p>
            <div id="g-langs"><div class="state-box" style="padding:24px"><div class="spinner"></div></div></div>
        </div>

        <div style="margin-bottom:44px">${contribSectionHTML()}</div>

    </section>`
};

const PAGE_TITLES = {
    home: 'Süleyman Emre Arlı | Backend & Full-Stack Developer',
    about: 'Hakkımda | Süleyman Emre Arlı',
    projects: 'Projeler | Süleyman Emre Arlı',
    project: (name) => `${L(PROJECT_META[name]?.title) || prettyName(name || '')} | Süleyman Emre Arlı`,
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
        grid.innerHTML = `<p class="dim" style="font-size:13px">${t('c_fail')}
            <a href="https://github.com/AllenVB" target="_blank" rel="noopener" style="color:var(--accent-light)">${t('c_fail_link')}</a></p>`;
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
        // Anasayfa sayaçları da aynı veriden beslensin — elle güncelleme gerekmesin
        animateCounter($('#stat-repos'), repos.length);
        animateCounter($('#stat-stars'), repos.reduce((s, r) => s + r.stars, 0));

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
            const l = r.lang || t('lang_other');
            counts[l] = (counts[l] || 0) + 1;
        });
        const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]);

        filterBar.innerHTML =
            `<button class="filter-btn active" data-filter="all">${t('filter_all')} <span class="dim">${ordered.length}</span></button>` +
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
            <p style="margin-top:12px">${t('err_api')}</p>
            <a class="btn btn-ghost" style="margin-top:16px" href="https://github.com/AllenVB?tab=repositories" target="_blank" rel="noopener">
                <i class="bi bi-github"></i> ${t('open_github')}
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
            msg.textContent = t('f_required');
            msg.classList.add('err');
            form.reportValidity();
            return;
        }

        if (typeof emailjs === 'undefined') {
            msg.textContent = t('f_nolib');
            msg.classList.add('err');
            return;
        }

        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="bi bi-hourglass-split"></i> ' + t('f_sending');

        try {
            await emailjs.send('service_yaac4jp', 'template_juyhcsw', {
                from_name: form.name.value,
                from_email: form.email.value,
                subject: form.subject.value,
                message: form.message.value
            });
            msg.textContent = t('f_ok');
            msg.classList.add('ok');
            form.reset();
        } catch (err) {
            console.error('EmailJS hatası:', err);
            msg.textContent = t('f_err');
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
            [t('s_today'), sumLast(days, 1)],
            [t('s_7d'), sumLast(days, 7)],
            [t('s_30d'), sumLast(days, 30)],
            [t('s_90d'), sumLast(days, 90)]
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
        setText('#g-stars', `${stars} ${t('s_stars_earned')}`);

        const counts = {};
        repos.forEach(r => { const l = r.lang || t('lang_other'); counts[l] = (counts[l] || 0) + 1; });
        const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const max = Math.max(...langs.map(l => l[1]), 1);
        $('#g-langs').innerHTML = langs
            .map(([l, c]) => barRow(`${l} — ${c} ${t('s_repo_unit')}`, c, Math.round(c / max * 100),
                LANG_COLOR[l] || null)).join('');
        paintBars();
    }).catch(() => {
        setText('#g-repos', '—');
        $('#g-langs').innerHTML = apiErrorHTML();
    });
}

function setText(sel, txt) { const el = $(sel); if (el) el.textContent = txt; }

// ── Proje detay sayfası ───────────────────────────────────────

/**
 * GitHub'ın README HTML'ini siteye uyarlar:
 *  - mermaid blokları GitHub'ın kendi iframe'ine bağlı geliyor; kaynağı çıkarıp
 *    kendimiz çizebilmek için <pre class="mermaid"> haline getiriyoruz
 *  - başlık çapası ikonları ve octicon SVG'leri gereksiz gürültü, siliniyor
 *  - dış bağlantılar yeni sekmede açılıyor
 */
function normalizeReadme(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    doc.querySelectorAll('[data-type="mermaid"]').forEach(sec => {
        const holder = sec.querySelector('[data-json]');
        let src = '';
        try { src = JSON.parse(holder.getAttribute('data-json')).data || ''; } catch { }
        if (!src) { sec.remove(); return; }
        const pre = doc.createElement('pre');
        pre.className = 'mermaid';
        pre.textContent = src;
        sec.replaceWith(pre);
    });

    doc.querySelectorAll('.anchor, .octicon, .markdown-heading > a').forEach(e => e.remove());

    doc.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (href.startsWith('#')) { a.removeAttribute('href'); return; }  // iç çapa — çalışmaz
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    });

    doc.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
        img.removeAttribute('width');
        img.removeAttribute('height');
    });

    return doc.body.innerHTML;
}

// mermaid yalnızca diyagram içeren detay sayfalarında, o an indiriliyor
async function renderMermaid(root) {
    const nodes = [...root.querySelectorAll('pre.mermaid')];
    if (!nodes.length) return;
    try {
        const mod = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');
        const mermaid = mod.default;
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'strict',
            theme: 'dark',
            themeVariables: {
                background: '#0d1222',
                primaryColor: '#1b2340',
                primaryTextColor: '#e8ebf5',
                primaryBorderColor: '#6366f1',
                lineColor: '#6366f1',
                secondaryColor: '#1a1f38',
                tertiaryColor: '#141a2e',
                fontFamily: 'Inter, system-ui, sans-serif'
            }
        });
        await mermaid.run({ nodes });
    } catch (err) {
        // CDN engellenirse diyagram kaynağı okunabilir kod bloğu olarak kalsın
        console.warn('mermaid yüklenemedi:', err.message);
        nodes.forEach(n => n.classList.add('mermaid-raw'));
    }
}

function initProjectDetail(name) {
    const body = $('#pd-body');
    if (!body) return;

    // Başlık şeridini depo verisiyle doldur
    getRepos().then(repos => {
        const repo = repos.find(r => r.name === name);
        if (!repo || !$('#pd-meta')) return;
        const demo = demoUrl(repo);
        const color = LANG_COLOR[repo.lang] || '#6366f1';
        $('#pd-meta').innerHTML = `
            ${repo.lang ? `<span class="pc-lang"><i class="pc-dot" style="background:${color}"></i> ${esc(repo.lang)}</span>` : ''}
            ${repo.stars ? `<span class="pc-lang"><i class="bi bi-star-fill"></i> ${repo.stars}</span>` : ''}
            <span class="pc-lang"><i class="bi bi-clock-history"></i> ${new Date(repo.updated).toLocaleDateString('tr-TR')}</span>`;
        $('#pd-actions').innerHTML = `
            ${demo ? `<a class="btn btn-primary" href="${esc(demo)}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> ${t('pd_demo')}</a>` : ''}
            <a class="btn btn-ghost" href="${esc(repo.url)}" target="_blank" rel="noopener"><i class="bi bi-github"></i> ${t('pd_github')}</a>`;
    }).catch(() => { });

    // README
    getReadmeHtml(name).then(html => {
        if (!document.body.contains(body)) return;
        if (!html) {
            const meta = PROJECT_META[name] || {};
            body.innerHTML = `<div class="state-box" style="text-align:left;padding:8px 0">
                <p class="muted" style="font-size:14.5px;line-height:1.8">${esc(L(meta.desc) || t('pd_no_desc'))}</p>
                <p class="dim" style="font-size:13px;margin-top:16px">
                    ${t('pd_no_readme')}
                </p></div>`;
            initReveal();
            return;
        }
        body.innerHTML = `<div class="readme">${normalizeReadme(html)}</div>`;
        renderMermaid(body);
        initReveal();
    }).catch(err => {
        if (!document.body.contains(body)) return;
        body.innerHTML = `<p class="dim" style="font-size:13px">İçerik yüklenemedi (${esc(err.message)}).</p>`;
    });
}

function apiErrorHTML() {
    return '<p class="dim" style="font-size:13px">' + t('err_generic') + '</p>';
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
    project: (name) => { initProjectDetail(name); },
    cv: () => { initCvViewer(); },
    contact: () => { initContactForm(); },
    stats: () => { initStatsPage(); }
};

let _currentPage = null;
let _currentParam = null;
let _navigating = false;

// `#project/<depo-adı>` gibi parametreli rotaları da çözer
function routeFromHash() {
    const raw = (location.hash || '').replace(/^#\/?/, '').split('?')[0];
    const slash = raw.indexOf('/');
    const key = slash === -1 ? raw : raw.slice(0, slash);
    const param = slash === -1 ? null : decodeURIComponent(raw.slice(slash + 1));

    if (key === 'project' && param) return { page: 'project', param };
    return { page: PAGES[key] ? key : 'home', param: null };
}

function syncNav(page) {
    // Proje detayındayken üst menüde "Projeler" işaretli kalsın
    const navKey = page === 'project' ? 'projects' : page;
    $$('#nav-links > a, #mobile-menu a[data-page], .footer-nav a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === navKey);
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

function render(page, param, { scroll = true } = {}) {
    const container = $('#app-container');
    if (_navigating) return;

    // Aynı sayfaya tekrar tıklandıysa sadece başa dön
    if (page === _currentPage && param === _currentParam) {
        if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    _navigating = true;
    container.classList.add('leaving');

    setTimeout(() => {
        container.innerHTML = PAGES[page](param);
        _currentPage = page;
        _currentParam = param;

        document.title = typeof PAGE_TITLES[page] === 'function'
            ? PAGE_TITLES[page](param)
            : PAGE_TITLES[page];
        syncNav(page);

        if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });

        // rAF'a bağlanmıyoruz: sekme arka plandayken çalışmaz ve
        // geçiş yarıda kalıp sayfa görünmez şekilde kilitlenirdi
        container.classList.remove('leaving');
        initReveal();
        PAGE_INIT[page]?.(param);
        _navigating = false;
    }, 220);
}

function navigate(target) {
    // target: 'projects' ya da 'project/Depo-Adi'
    const clean = PAGES[target.split('/')[0]] ? target : 'home';
    if (location.hash.replace(/^#\/?/, '') !== clean) {
        location.hash = clean;       // hashchange render'ı tetikler
    } else {
        const r = routeFromHash();
        render(r.page, r.param);
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

    $('#lang-btn')?.addEventListener('click', () => {
        setLang(LANG === 'tr' ? 'en' : 'tr');
    });

    window.addEventListener('resize', moveNavIndicator);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) scheduleNavIndicator();
    });
    window.addEventListener('hashchange', () => {
        const r = routeFromHash();
        render(r.page, r.param);
    });

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
    applyStaticI18n();
    initChrome();
    initBackground();

    // İlk sayfa — derin bağlantı (#projects, #project/Depo-Adi) desteklenir
    const { page, param } = routeFromHash();
    $('#app-container').classList.remove('leaving');
    $('#app-container').innerHTML = PAGES[page](param);
    _currentPage = page;
    _currentParam = param;
    document.title = typeof PAGE_TITLES[page] === 'function'
        ? PAGE_TITLES[page](param)
        : PAGE_TITLES[page];
    syncNav(page);
    initReveal();
    PAGE_INIT[page]?.(param);
});
