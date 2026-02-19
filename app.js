// --- COREMETRICS ANALYTICS START ---
const CORE_CONFIG = {
    API_KEY: "db281f63-a569-47e4-b30d-e6637451e890",
    BASE_URL: "https://coremetrics-service-665359087509.europe-west3.run.app/api/Collector"
};

async function trackCoreMetrics(path) {
    console.log("%c📊 CoreMetrics: Veri Frankfurt'a uçuyor -> " + path, "color: #00ff00; font-weight: bold; background: #000; padding: 2px 5px;");
    try {
        await fetch(CORE_CONFIG.BASE_URL + "/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apiKey: CORE_CONFIG.API_KEY,
                path: path,
                referrer: document.referrer || "Doğrudan Giriş",
                userAgent: navigator.userAgent
            })
        });
    } catch (err) {
        console.warn("CoreMetrics: Bağlantı hatası.");
    }
}

// --- SESSION TRACKING (anonim, giriş gerekmez) ---
const _sessionStart = Date.now();
const _sessionPath = window.location.hash || "/";

window.addEventListener("beforeunload", () => {
    const duration = Math.round((Date.now() - _sessionStart) / 1000);
    if (duration < 2) return; // 2 saniyeden kısa oturumları sayma
    navigator.sendBeacon(
        CORE_CONFIG.BASE_URL + "/session",
        new Blob([JSON.stringify({
            apiKey: CORE_CONFIG.API_KEY,
            duration: duration,
            path: _sessionPath
        })], { type: "application/json" })
    );
});
// --- COREMETRICS ANALYTICS END ---


const pages = {
    home: `
        <section class="min-h-screen relative overflow-hidden flex items-center">
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div class="animate-fade-in-up">
                        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-indigo-300 mb-6 border border-indigo-500/30">
                            <span class="w-2 h-2 rounded-full bg-emerald-400 live-dot"></span>
                            Yazılım Mühendisi &amp; Web Developer
                        </div>
                        <h1 class="text-6xl md:text-7xl font-black text-white mb-4 leading-none tracking-tight">
                            Merhaba<br>
                            <span class="gradient-text">Süleyman Emre</span>
                        </h1>
                        <p class="text-slate-400 text-lg mb-10 leading-relaxed max-w-md">
                            Modern teknolojiler ile yaratıcı ve ölçeklenebilir çözümler üretiyorum. Bandırma Onyedi Eylül Üniversitesi Yazılım Mühendisliği öğrencisiyim.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 mb-10">
                            <button data-page="projects" class="btn-glow px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30">Projelerimi Gör</button>
                            <button data-page="contact"  class="px-8 py-3.5 rounded-xl font-bold text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200 hover:scale-105 active:scale-95">İletişime Geç</button>
                        </div>
                        <div class="flex gap-5">
                            <a href="https://github.com/AllenVB" target="_blank" class="social-icon text-slate-400 text-2xl"><i class="bi bi-github"></i></a>
                            <a href="https://www.linkedin.com/in/s%C3%BCleyman-emre-arl%C4%B1-608491330/" target="_blank" class="social-icon text-slate-400 text-2xl"><i class="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="relative">
                            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 blur-2xl opacity-25 scale-105"></div>
                            <div class="relative border-2 border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl hover-image-scale">
                                <img src="ben1.jpeg" alt="Süleyman Emre Arlı" class="w-full h-auto max-w-sm">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    about: `
        <section class="min-h-screen relative overflow-hidden py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="mb-14">
                    <p class="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Ben kimim?</p>
                    <h2 class="text-5xl font-black text-white tracking-tight">Hakkımda</h2>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div class="lg:col-span-1 glass p-7 rounded-3xl card-hover border border-white/5">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl mb-5">👤</div>
                        <h3 class="text-lg font-bold text-white mb-3">Kişisel Bilgiler</h3>
                        <p class="text-slate-400 text-sm leading-relaxed mb-4">Merhaba! Ben Süleyman Emre Arlı. Bandırma Onyedi Eylül Üniversitesinde Yazılım Mühendisliği öğrencisiyim.</p>
                        <p class="text-slate-400 text-sm leading-relaxed">Modern teknolojiler ile projeler geliştirmeyi severim.</p>
                        <div class="mt-6 space-y-3">
                            <div class="flex items-center gap-3 text-sm text-slate-400"><i class="bi bi-envelope text-indigo-400"></i> suleymanarli0666@gmail.com</div>
                            <div class="flex items-center gap-3 text-sm text-slate-400"><i class="bi bi-telephone text-indigo-400"></i> +90 544 453 0125</div>
                            <div class="flex items-center gap-3 text-sm text-slate-400"><i class="bi bi-geo-alt text-indigo-400"></i> Bandırma, Balıkesir</div>
                        </div>
                    </div>

                    <div class="lg:col-span-2 glass p-7 rounded-3xl card-hover border border-white/5">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-2xl mb-5">⚡</div>
                        <h3 class="text-lg font-bold text-white mb-6">Yetenekler</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                            <div>
                                <p class="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Frontend</p>
                                <div class="space-y-4">
                                    <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">HTML5 &amp; CSS3</span><span class="text-slate-500">90%</span></div><div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px"><div class="skill-bar-fill" style="width:90%"></div></div></div>
                                    <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">JavaScript</span><span class="text-slate-500">80%</span></div><div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px"><div class="skill-bar-fill" style="width:80%"></div></div></div>
                                    <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">Tailwind CSS</span><span class="text-slate-500">85%</span></div><div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px"><div class="skill-bar-fill" style="width:85%"></div></div></div>
                                </div>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">Backend</p>
                                <div class="space-y-4">
                                    <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">Java &amp; Spring</span><span class="text-slate-500">75%</span></div><div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px"><div class="skill-bar-fill" style="width:75%"></div></div></div>
                                    <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">C# &amp; .NET</span><span class="text-slate-500">70%</span></div><div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px"><div class="skill-bar-fill" style="width:70%"></div></div></div>
                                    <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">PostgreSQL</span><span class="text-slate-500">72%</span></div><div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px"><div class="skill-bar-fill" style="width:72%"></div></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    `,
    projects: `
        <section class="min-h-screen relative overflow-hidden py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="mb-14">
                    <p class="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Neler yaptım?</p>
                    <h2 class="text-5xl font-black text-white tracking-tight">Projelerim</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">

                    <div class="project-card glass border border-white/5 rounded-3xl overflow-hidden">
                        <div class="h-36 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(circle at 70% 30%, white 1px, transparent 1px);background-size:20px 20px"></div>
                            <i class="bi bi-house-door text-white text-5xl relative z-10"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">Smart Home Security</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Akıllı ev güvenlik sistemi — veritabanı entegrasyonlu gerçek zamanlı izleme.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-blue-500/15 text-blue-300 px-2.5 py-1 rounded-lg">JavaScript</span>
                                <span class="text-[10px] font-bold bg-indigo-500/15 text-indigo-300 px-2.5 py-1 rounded-lg">PostgreSQL</span>
                                <span class="text-[10px] font-bold bg-purple-500/15 text-purple-300 px-2.5 py-1 rounded-lg">Vercel</span>
                            </div>
                            <a href="https://smart-home-security-veri-taban.vercel.app/" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all">Projeyi Gör <i class="bi bi-arrow-up-right"></i></a>
                        </div>
                    </div>

                    <div class="project-card glass border border-white/5 rounded-3xl overflow-hidden">
                        <div class="h-36 bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(circle at 30% 70%, white 1px, transparent 1px);background-size:20px 20px"></div>
                            <i class="bi bi-shield-lock text-white text-5xl relative z-10"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">User SSO</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Tek oturum açma (Single Sign-On) sistemi — güvenli kimlik doğrulama.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-lg">Java</span>
                                <span class="text-[10px] font-bold bg-teal-500/15 text-teal-300 px-2.5 py-1 rounded-lg">Spring Boot</span>
                                <span class="text-[10px] font-bold bg-cyan-500/15 text-cyan-300 px-2.5 py-1 rounded-lg">GitHub</span>
                            </div>
                            <a href="https://github.com/AllenVB/usersso" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all">Projeyi Gör <i class="bi bi-arrow-up-right"></i></a>
                        </div>
                    </div>

                    <div class="project-card glass border border-white/5 rounded-3xl overflow-hidden">
                        <div class="h-36 bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(circle at 50% 50%, white 1px, transparent 1px);background-size:20px 20px"></div>
                            <i class="bi bi-diagram-3 text-white text-5xl relative z-10"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">Project Management Systems</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Yazılım tasarım ve mimari odaklı proje yönetim platformu.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-purple-500/15 text-purple-300 px-2.5 py-1 rounded-lg">React</span>
                                <span class="text-[10px] font-bold bg-violet-500/15 text-violet-300 px-2.5 py-1 rounded-lg">Tailwind</span>
                                <span class="text-[10px] font-bold bg-pink-500/15 text-pink-300 px-2.5 py-1 rounded-lg">Vercel</span>
                            </div>
                            <a href="https://yazilim-tasarim-mimarisi-proje.vercel.app/" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all">Projeyi Gör <i class="bi bi-arrow-up-right"></i></a>
                        </div>
                    </div>

                    <div class="project-card glass border border-white/5 rounded-3xl overflow-hidden">
                        <div class="h-36 bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(circle at 80% 20%, white 1px, transparent 1px);background-size:20px 20px"></div>
                            <i class="bi bi-activity text-white text-5xl relative z-10"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">Fitness Platform</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Kapsamlı fitness ve spor takip platformu uygulaması.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-orange-500/15 text-orange-300 px-2.5 py-1 rounded-lg">JavaScript</span>
                                <span class="text-[10px] font-bold bg-red-500/15 text-red-300 px-2.5 py-1 rounded-lg">CSS3</span>
                                <span class="text-[10px] font-bold bg-yellow-500/15 text-yellow-300 px-2.5 py-1 rounded-lg">Vercel</span>
                            </div>
                            <a href="https://fitness-platform-eta.vercel.app/" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white transition-all">Projeyi Gör <i class="bi bi-arrow-up-right"></i></a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    `,
    contact: `
        <section class="min-h-screen relative overflow-hidden py-24">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="mb-14">
                    <p class="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Ulaşın</p>
                    <h2 class="text-5xl font-black text-white tracking-tight">İletişim</h2>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    <div class="lg:col-span-3 glass p-8 rounded-3xl border border-white/5">
                        <h3 class="text-lg font-bold text-white mb-6">Mesaj Gönderin</h3>
                        <form id="contactForm" class="space-y-5">
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Adınız</label>
                                <input type="text" name="name" class="w-full bg-slate-900/60 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">E-posta</label>
                                <input type="email" name="email" class="w-full bg-slate-900/60 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Konu</label>
                                <input type="text" name="subject" class="w-full bg-slate-900/60 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mesaj</label>
                                <textarea name="message" class="w-full bg-slate-900/60 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition h-32 resize-none" required></textarea>
                            </div>
                            <button type="submit" class="btn-glow w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:scale-105 active:scale-95">Gönder</button>
                            <div id="formMessage" class="mt-2 text-center text-sm text-slate-400"></div>
                        </form>
                    </div>

                    <div class="lg:col-span-2 space-y-4">
                        <div class="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 card-hover">
                            <div class="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0"><i class="bi bi-envelope text-indigo-400"></i></div>
                            <div><p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">E-posta</p><p class="text-sm text-slate-300">suleymanarli0666@gmail.com</p></div>
                        </div>
                        <div class="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 card-hover">
                            <div class="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0"><i class="bi bi-telephone text-emerald-400"></i></div>
                            <div><p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Telefon</p><p class="text-sm text-slate-300">+90 544 453 0125</p></div>
                        </div>
                        <div class="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 card-hover">
                            <div class="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0"><i class="bi bi-geo-alt text-purple-400"></i></div>
                            <div><p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Konum</p><p class="text-sm text-slate-300">Bandırma, Balıkesir</p></div>
                        </div>
                        <div class="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 card-hover">
                            <div class="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center flex-shrink-0"><i class="bi bi-github text-sky-400"></i></div>
                            <div><p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">GitHub</p><a href="https://github.com/AllenVB" target="_blank" class="text-sm text-slate-300 hover:text-indigo-300 transition">@AllenVB</a></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    `,
    stats: `
        <section class="min-h-screen relative overflow-hidden py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="mb-12">
                    <p class="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Canlı Veri</p>
                    <h2 class="text-5xl font-black text-white tracking-tight">📊 Site İstatistikleri</h2>
                    <p class="text-slate-500 mt-2 text-sm">Son 30 günlük ziyaret verileri — gerçek zamanlı</p>
                </div>

                <div id="stats-loading" class="text-center py-20">
                    <div class="inline-block animate-spin text-indigo-400 text-4xl mb-4">⏳</div>
                    <p class="text-slate-500">Veriler yükleniyor...</p>
                </div>

                <div id="stats-content" class="hidden">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div class="glass border border-indigo-500/20 p-6 rounded-2xl card-hover">
                            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Toplam Ziyaret</p>
                            <p id="stat-total" class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-indigo-500">-</p>
                        </div>
                        <div class="glass border border-purple-500/20 p-6 rounded-2xl card-hover">
                            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Farklı Sayfa</p>
                            <p id="stat-pages" class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-purple-500">-</p>
                        </div>
                        <div class="glass border border-emerald-500/20 p-6 rounded-2xl card-hover">
                            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Süre</p>
                            <p id="stat-days" class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-500">30 gün</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div class="glass border border-white/5 p-6 rounded-2xl">
                            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">📄 Sayfa Ziyaretleri</h3>
                            <div id="pages-list" class="space-y-4"></div>
                        </div>
                        <div class="glass border border-white/5 p-6 rounded-2xl">
                            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">🌍 Lokasyonlar</h3>
                            <div id="locations-list" class="space-y-3"></div>
                        </div>
                    </div>
                </div>

                <div id="stats-error" class="hidden text-center py-20">
                    <p class="text-red-400">⚠️ Veriler yüklenemedi. Sunucu bağlantısını kontrol edin.</p>
                </div>
            </div>
        </section>
    `
};

// --- STATS: VERİ RENDER ---
function renderStatsData(data) {
    if (!document.getElementById('stat-total')) return; // Stats sayfası kapalıysa çık

    document.getElementById('stat-total').textContent = data.totalVisits ?? 0;
    document.getElementById('stat-pages').textContent = data.topPages?.length ?? 0;

    const pageNames = {
        '/': '🏠 Anasayfa',
        '/#about': '👤 Hakkımda',
        '/#projects': '💼 Projelerim',
        '/#contact': '✉️ İletişim'
    };
    const pagesList = document.getElementById('pages-list');
    const maxCount = Math.max(...(data.topPages?.map(p => p.count) ?? [1]), 1);
    pagesList.innerHTML = (data.topPages ?? []).map(p => {
        const label = pageNames[p.path] ?? p.path;
        const pct = Math.round((p.count / maxCount) * 100);
        return `
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-300">${label}</span>
                    <span class="text-blue-400 font-bold">${p.count}</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full transition-all duration-700" style="width: ${pct}%"></div>
                </div>
            </div>`;
    }).join('');

    const locationsList = document.getElementById('locations-list');
    locationsList.innerHTML = (data.topLocations ?? []).map(l => `
        <div class="flex justify-between items-center bg-gray-700/50 rounded-lg px-4 py-2">
            <span class="text-gray-300">🌐 ${l.city ?? '?'}, ${l.country ?? '?'}</span>
            <span class="text-purple-400 font-bold">${l.count}</span>
        </div>`).join('');

    document.getElementById('stats-loading')?.classList.add('hidden');
    document.getElementById('stats-content')?.classList.remove('hidden');
}

// --- STATS: VERİ ÇEK ---
async function fetchStatsData() {
    const res = await fetch(
        `${CORE_CONFIG.BASE_URL}/summary?apiKey=${CORE_CONFIG.API_KEY}&days=30`
    );
    if (!res.ok) throw new Error('Sunucu hatası');
    return await res.json();
}

// --- STATS: GERÇEK ZAMANLI SSE BAĞLANTISI ---
let _sseSource = null;
let _pollInterval = null;

function startStatsLive() {
    // Önceki bağlantıları temizle
    stopStatsLive();

    // İlk veriyi hemen yükle
    fetchStatsData()
        .then(renderStatsData)
        .catch(() => {
            document.getElementById('stats-loading')?.classList.add('hidden');
            document.getElementById('stats-error')?.classList.remove('hidden');
        });

    // SSE bağlantısı dene
    const sseUrl = `${CORE_CONFIG.BASE_URL}/live?apiKey=${CORE_CONFIG.API_KEY}`;
    try {
        _sseSource = new EventSource(sseUrl);

        _sseSource.addEventListener('visit', () => {
            // Yeni ziyaret geldi → veriyi yenile
            fetchStatsData().then(renderStatsData).catch(() => { });
        });

        _sseSource.onerror = () => {
            // SSE başarısız → polling'e geç
            console.warn('SSE bağlanamadı, polling moduna geçiliyor...');
            _sseSource.close();
            _sseSource = null;
            startPolling();
        };

        console.log('%c📡 SSE bağlandı - anlık güncelleme aktif', 'color: #22c55e; font-weight: bold;');
    } catch (e) {
        startPolling();
    }
}

function startPolling() {
    if (_pollInterval) return;
    _pollInterval = setInterval(() => {
        fetchStatsData().then(renderStatsData).catch(() => { });
    }, 10000); // 10 saniyede bir
    console.log('%c⏱ Polling modu aktif (10s)', 'color: #f59e0b; font-weight: bold;');
}

function stopStatsLive() {
    if (_sseSource) { _sseSource.close(); _sseSource = null; }
    if (_pollInterval) { clearInterval(_pollInterval); _pollInterval = null; }
}


function loadPage(pageName) {
    const container = document.getElementById('app-container');
    if (!pages[pageName]) pageName = 'home';

    // Frankfurt Takibi
    const trackPath = pageName === 'home' ? '/' : `/#${pageName}`;
    trackCoreMetrics(trackPath);

    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = pages[pageName];
        container.style.opacity = '1';

        // Stats sayfasıysa canlı bağlantı başlat, değilse durdur
        if (pageName === 'stats') {
            startStatsLive();
        } else {
            stopStatsLive();
        }

        container.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                loadPage(e.currentTarget.getAttribute('data-page'));
            });
        });

        // Proje tıklama takibi
        container.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const title = e.currentTarget.closest('div')?.querySelector('h5')?.innerText || "Proje";
                trackCoreMetrics(`click/project/${title}`);
            });
        });
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    loadPage('home');
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(e.currentTarget.getAttribute('data-page'));
        });
    });
});