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
                        <div class="flex flex-col sm:flex-row gap-3 mb-10">
                            <button data-page="projects" class="btn-glow px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30">Projelerimi Gör</button>
                            <a href="cv.pdf" download="Süleyman_Emre_Arlı_CV.pdf" class="px-7 py-3.5 rounded-xl font-bold text-slate-200 border border-white/10 hover:bg-white/6 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                                <i class="bi bi-download text-sm"></i> CV İndir
                            </a>
                            <button data-page="contact" class="px-7 py-3.5 rounded-xl font-bold text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/8 transition-all duration-200 hover:scale-105 active:scale-95">İletişim</button>
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
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <!-- Başlık -->
                <div class="reveal mb-16">
                    <div class="flex items-center gap-3 mb-5">
                        <span class="w-5 h-px bg-indigo-500/70"></span>
                        <span class="text-indigo-400 text-[11px] font-bold uppercase tracking-widest">Hakkımda</span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Yazılım Geliştirici
                    </h2>
                    <p class="text-slate-500 text-lg mt-2 font-normal">Full-Stack · Android · AI Entegrasyonu</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">

                    <!-- Sol sütun: Profil + İstatistik + Teknoloji -->
                    <div class="reveal reveal-d1 lg:col-span-4 flex flex-col gap-5">

                        <!-- Profil kartı -->
                        <div class="glass rounded-2xl p-6 border border-white/5">
                            <div class="flex items-center gap-4 mb-5 pb-5 border-b border-white/5">
                                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center flex-shrink-0">
                                    <i class="bi bi-person text-indigo-400"></i>
                                </div>
                                <div>
                                    <p class="text-white font-semibold text-sm leading-tight">Süleyman Emre Arlı</p>
                                    <p class="text-slate-500 text-xs mt-0.5">Yazılım Mühendisliği, 3. Sınıf</p>
                                </div>
                                <div class="ml-auto flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span class="text-emerald-400 text-[10px] font-medium">Müsait</span>
                                </div>
                            </div>
                            <p class="text-slate-400 text-sm leading-relaxed mb-5">
                                Bandırma Onyedi Eylül Üniversitesi'nde öğrenimimi sürdürüyorum. Web, mobil ve backend alanlarında çalışıyorum; ürün odaklı düşünmeyi severim.
                            </p>
                            <div class="space-y-2.5">
                                <div class="flex items-center gap-3">
                                    <i class="bi bi-envelope text-slate-600 text-xs w-3.5 text-center"></i>
                                    <span class="text-slate-400 text-xs">suleymanarli0666@gmail.com</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <i class="bi bi-geo-alt text-slate-600 text-xs w-3.5 text-center"></i>
                                    <span class="text-slate-400 text-xs">Bandırma, Balıkesir, Türkiye</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <i class="bi bi-github text-slate-600 text-xs w-3.5 text-center"></i>
                                    <a href="https://github.com/AllenVB" target="_blank" class="text-slate-400 text-xs hover:text-indigo-300 transition">github.com/AllenVB</a>
                                </div>
                            </div>
                        </div>

                        <!-- İstatistikler -->
                        <div class="grid grid-cols-3 gap-3">
                            <div class="glass rounded-xl p-4 border border-white/5 text-center">
                                <p class="text-xl font-black text-white">6+</p>
                                <p class="text-slate-600 text-[10px] uppercase tracking-wider mt-1">Proje</p>
                            </div>
                            <div class="glass rounded-xl p-4 border border-white/5 text-center">
                                <p class="text-xl font-black text-white">2+</p>
                                <p class="text-slate-600 text-[10px] uppercase tracking-wider mt-1">Yıl</p>
                            </div>
                            <div class="glass rounded-xl p-4 border border-white/5 text-center">
                                <p class="text-xl font-black text-white">7+</p>
                                <p class="text-slate-600 text-[10px] uppercase tracking-wider mt-1">Teknoloji</p>
                            </div>
                        </div>

                        <!-- Teknoloji etiketleri -->
                        <div class="glass rounded-2xl p-5 border border-white/5">
                            <p class="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3.5">Teknoloji Yığını</p>
                            <div class="flex flex-wrap gap-2">
                                ${['JavaScript','React','Java','C# .NET','Spring Boot','PostgreSQL','Tailwind CSS','Android'].map(t =>
                                    `<span class="text-[11px] text-slate-400 bg-white/4 border border-white/6 px-2.5 py-1 rounded-md">${t}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Sağ sütun: Yetkinlikler -->
                    <div class="reveal reveal-d2 lg:col-span-8 glass rounded-2xl p-7 border border-white/5">
                        <div class="flex items-center gap-3 mb-7">
                            <div class="w-8 h-8 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center">
                                <i class="bi bi-lightning-charge text-indigo-400 text-sm"></i>
                            </div>
                            <h3 class="text-sm font-semibold text-white">Teknik Yetkinlikler</h3>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            <!-- Frontend -->
                            <div>
                                <div class="flex items-center gap-2 mb-5">
                                    <span class="w-0.5 h-3.5 bg-indigo-500 rounded-full"></span>
                                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Frontend</span>
                                </div>
                                <div class="space-y-4">
                                    <div>
                                        <div class="flex justify-between text-xs mb-1.5">
                                            <span class="text-slate-300">HTML5 &amp; CSS3</span>
                                            <span class="text-slate-600">90%</span>
                                        </div>
                                        <div class="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <div class="skill-bar-fill h-full" data-width="90%" style="width:0%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-xs mb-1.5">
                                            <span class="text-slate-300">JavaScript</span>
                                            <span class="text-slate-600">80%</span>
                                        </div>
                                        <div class="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <div class="skill-bar-fill h-full" data-width="80%" style="width:0%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-xs mb-1.5">
                                            <span class="text-slate-300">Tailwind CSS</span>
                                            <span class="text-slate-600">85%</span>
                                        </div>
                                        <div class="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <div class="skill-bar-fill h-full" data-width="85%" style="width:0%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-xs mb-1.5">
                                            <span class="text-slate-300">React</span>
                                            <span class="text-slate-600">65%</span>
                                        </div>
                                        <div class="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <div class="skill-bar-fill h-full" data-width="65%" style="width:0%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Backend -->
                            <div>
                                <div class="flex items-center gap-2 mb-5">
                                    <span class="w-0.5 h-3.5 bg-emerald-500 rounded-full"></span>
                                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Backend</span>
                                </div>
                                <div class="space-y-4">
                                    <div>
                                        <div class="flex justify-between text-xs mb-1.5">
                                            <span class="text-slate-300">Java &amp; Spring Boot</span>
                                            <span class="text-slate-600">75%</span>
                                        </div>
                                        <div class="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <div class="skill-bar-fill skill-bar-green h-full" data-width="75%" style="width:0%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-xs mb-1.5">
                                            <span class="text-slate-300">C# &amp; ASP.NET Core</span>
                                            <span class="text-slate-600">70%</span>
                                        </div>
                                        <div class="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <div class="skill-bar-fill skill-bar-green h-full" data-width="70%" style="width:0%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-xs mb-1.5">
                                            <span class="text-slate-300">PostgreSQL</span>
                                            <span class="text-slate-600">72%</span>
                                        </div>
                                        <div class="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <div class="skill-bar-fill skill-bar-green h-full" data-width="72%" style="width:0%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-xs mb-1.5">
                                            <span class="text-slate-300">Android / Java</span>
                                            <span class="text-slate-600">68%</span>
                                        </div>
                                        <div class="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <div class="skill-bar-fill skill-bar-green h-full" data-width="68%" style="width:0%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Eğitim -->
                        <div class="mt-8 pt-7 border-t border-white/5">
                            <div class="flex items-center gap-2 mb-5">
                                <span class="w-0.5 h-3.5 bg-violet-500 rounded-full"></span>
                                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Eğitim</span>
                            </div>
                            <div class="flex items-start gap-4">
                                <div class="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <i class="bi bi-mortarboard text-violet-400 text-sm"></i>
                                </div>
                                <div>
                                    <p class="text-slate-200 text-sm font-medium">Yazılım Mühendisliği</p>
                                    <p class="text-slate-500 text-xs mt-0.5">Bandırma Onyedi Eylül Üniversitesi · 2022 – Devam Ediyor</p>
                                    <p class="text-slate-600 text-xs mt-2 leading-relaxed">Web geliştirme, algoritmalar, veri tabanı tasarımı ve yazılım mimarisi üzerine kapsamlı müfredat.</p>
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
                <div class="reveal mb-14">
                    <p class="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Neler yaptım?</p>
                    <h2 class="text-5xl font-black text-white tracking-tight">Projelerim</h2>
                    <p class="text-slate-500 mt-3 text-sm flex items-center gap-2">
                        <i class="bi bi-pin-fill text-indigo-400"></i> GitHub'da pinlenmiş projeler
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                    <!-- Smart Home Security -->
                    <div class="reveal reveal-d1 project-card glass border border-white/5 rounded-3xl overflow-hidden group">
                        <div class="h-44 bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-15" style="background-image:radial-gradient(circle at 50% 50%, white 1px, transparent 1px);background-size:24px 24px"></div>
                            <div class="absolute w-32 h-32 rounded-full border border-white/10 animate-pulse"></div>
                            <div class="absolute w-20 h-20 rounded-full border border-white/20"></div>
                            <i class="bi bi-house-gear text-white text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"></i>
                            <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] text-white/80 font-semibold">
                                <i class="bi bi-star-fill text-yellow-400"></i> 1
                            </div>
                            <div class="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white/80">HTML</div>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">Smart Home Security</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Akıllı ev güvenlik arayüzü — veritabanı entegrasyonlu gerçek zamanlı izleme ve güvenlik simülasyonu.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-blue-500/15 text-blue-300 px-2.5 py-1 rounded-lg">HTML</span>
                                <span class="text-[10px] font-bold bg-cyan-500/15 text-cyan-300 px-2.5 py-1 rounded-lg">Tailwind</span>
                                <span class="text-[10px] font-bold bg-indigo-500/15 text-indigo-300 px-2.5 py-1 rounded-lg">PostgreSQL</span>
                            </div>
                            <div class="flex gap-2">
                                <a href="https://smart-home-security-veri-taban.vercel.app/" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white transition-all">Canlı Demo <i class="bi bi-arrow-up-right"></i></a>
                                <a href="https://github.com/AllenVB/SmartHomeSecurity-VeriTaban-" target="_blank" class="px-3 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 transition-all flex items-center"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>

                    <!-- CoreMetrics -->
                    <div class="reveal reveal-d2 project-card glass border border-white/5 rounded-3xl overflow-hidden group">
                        <div class="h-44 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-10" style="background-image:linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px);background-size:30px 30px"></div>
                            <div class="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-around px-4 pb-2 opacity-30">
                                <div class="w-3 bg-white rounded-t" style="height:60%"></div>
                                <div class="w-3 bg-white rounded-t" style="height:90%"></div>
                                <div class="w-3 bg-white rounded-t" style="height:40%"></div>
                                <div class="w-3 bg-white rounded-t" style="height:75%"></div>
                                <div class="w-3 bg-white rounded-t" style="height:55%"></div>
                                <div class="w-3 bg-white rounded-t" style="height:85%"></div>
                            </div>
                            <i class="bi bi-bar-chart-line text-white text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"></i>
                            <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] text-white/80 font-semibold">
                                <i class="bi bi-star-fill text-yellow-400"></i> 1
                            </div>
                            <div class="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white/80">C#</div>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">CoreMetrics</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Gerçek zamanlı analitik platformu — ziyaretçi takibi, oturum ölçümü, konum tespiti ve canlı SSE güncellemeleri.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-indigo-500/15 text-indigo-300 px-2.5 py-1 rounded-lg">C# .NET</span>
                                <span class="text-[10px] font-bold bg-purple-500/15 text-purple-300 px-2.5 py-1 rounded-lg">PostgreSQL</span>
                                <span class="text-[10px] font-bold bg-violet-500/15 text-violet-300 px-2.5 py-1 rounded-lg">Google Cloud</span>
                            </div>
                            <div class="flex gap-2">
                                <a href="dashboard.html" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all">Dashboard <i class="bi bi-arrow-up-right"></i></a>
                                <a href="https://github.com/AllenVB/CoreMetrics" target="_blank" class="px-3 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 transition-all flex items-center"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>

                    <!-- BizimSite -->
                    <div class="reveal reveal-d3 project-card glass border border-white/5 rounded-3xl overflow-hidden group">
                        <div class="h-44 bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-15" style="background-image:radial-gradient(circle at 30% 70%, white 1px, transparent 1px);background-size:20px 20px"></div>
                            <div class="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-lg flex items-center px-3 gap-2">
                                <div class="w-2 h-2 rounded-full bg-red-400/70"></div>
                                <div class="w-2 h-2 rounded-full bg-yellow-400/70"></div>
                                <div class="w-2 h-2 rounded-full bg-green-400/70"></div>
                                <div class="flex-1 h-1.5 bg-white/20 rounded-full ml-2"></div>
                            </div>
                            <i class="bi bi-building text-white text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"></i>
                            <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] text-white/80 font-semibold">
                                <i class="bi bi-star-fill text-yellow-400"></i> 1
                            </div>
                            <div class="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white/80">JavaScript</div>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">BizimSite</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Çok kiracılı apartman yönetim sistemi — aidat, duyuru ve şikayet takibi ayrı dashboardlar ile.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-lg">React 19</span>
                                <span class="text-[10px] font-bold bg-teal-500/15 text-teal-300 px-2.5 py-1 rounded-lg">ASP.NET Core</span>
                                <span class="text-[10px] font-bold bg-cyan-500/15 text-cyan-300 px-2.5 py-1 rounded-lg">PostgreSQL</span>
                            </div>
                            <div class="flex gap-2">
                                <a href="https://bizim-site.vercel.app" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all">Canlı Demo <i class="bi bi-arrow-up-right"></i></a>
                                <a href="https://github.com/AllenVB/BizimSite" target="_blank" class="px-3 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 transition-all flex items-center"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>

                    <!-- TraveLog -->
                    <div class="reveal reveal-d4 project-card glass border border-white/5 rounded-3xl overflow-hidden group">
                        <div class="h-44 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px);background-size:30px 30px"></div>
                            <div class="absolute inset-0 flex items-center justify-center opacity-15">
                                <div class="w-40 h-40 rounded-full border-2 border-white"></div>
                                <div class="absolute w-32 h-8 border border-white rounded-full"></div>
                            </div>
                            <i class="bi bi-airplane text-white text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" style="transform:rotate(-45deg)"></i>
                            <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] text-white/80 font-semibold">
                                <i class="bi bi-star-fill text-yellow-400"></i> 1
                            </div>
                            <div class="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white/80">Java</div>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">TraveLog</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Android tabanlı kişisel seyahat günlüğü — haritalar, hava durumu ve şehir anı defteri.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-orange-500/15 text-orange-300 px-2.5 py-1 rounded-lg">Java</span>
                                <span class="text-[10px] font-bold bg-amber-500/15 text-amber-300 px-2.5 py-1 rounded-lg">Android</span>
                                <span class="text-[10px] font-bold bg-yellow-500/15 text-yellow-300 px-2.5 py-1 rounded-lg">OpenStreetMap</span>
                            </div>
                            <div class="flex gap-2">
                                <a href="https://github.com/AllenVB/TraveLog/releases" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white transition-all">APK İndir <i class="bi bi-download"></i></a>
                                <a href="https://github.com/AllenVB/TraveLog" target="_blank" class="px-3 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 transition-all flex items-center"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>

                    <!-- FitMetrics -->
                    <div class="reveal reveal-d5 project-card glass border border-white/5 rounded-3xl overflow-hidden group">
                        <div class="h-44 bg-gradient-to-br from-rose-600 to-pink-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-15" style="background-image:radial-gradient(circle at 80% 20%, white 1px, transparent 1px);background-size:18px 18px"></div>
                            <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none">
                                <polyline points="0,70 30,50 60,65 90,30 120,45 150,20 180,35 200,25" fill="none" stroke="white" stroke-width="2"/>
                                <polyline points="0,85 30,70 60,80 90,50 120,60 150,40 180,55 200,45" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
                            </svg>
                            <i class="bi bi-activity text-white text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"></i>
                            <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] text-white/80 font-semibold">
                                <i class="bi bi-star-fill text-yellow-400"></i> 1
                            </div>
                            <div class="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white/80">C#</div>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">FitMetrics</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">AI destekli beslenme, antrenman ve sağlık takip platformu — Claude API ile kişisel koçluk.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-rose-500/15 text-rose-300 px-2.5 py-1 rounded-lg">ASP.NET Core</span>
                                <span class="text-[10px] font-bold bg-pink-500/15 text-pink-300 px-2.5 py-1 rounded-lg">React</span>
                                <span class="text-[10px] font-bold bg-purple-500/15 text-purple-300 px-2.5 py-1 rounded-lg">Claude AI</span>
                            </div>
                            <div class="flex gap-2">
                                <a href="https://github.com/AllenVB/FitMetrics" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white transition-all">GitHub'da Gör <i class="bi bi-arrow-up-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <!-- AllenVB-WebSayfasi -->
                    <div class="reveal reveal-d6 project-card glass border border-white/5 rounded-3xl overflow-hidden group">
                        <div class="h-44 bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 flex flex-col justify-center gap-2 px-6 opacity-20 font-mono text-white text-[10px]">
                                <div>&lt;<span class="text-cyan-300">html</span> lang="tr"&gt;</div>
                                <div class="pl-3">&lt;<span class="text-green-300">head</span>&gt;...&lt;/<span class="text-green-300">head</span>&gt;</div>
                                <div class="pl-3">&lt;<span class="text-green-300">body</span>&gt;</div>
                                <div class="pl-6">&lt;<span class="text-yellow-300">nav</span>&gt;...&lt;/<span class="text-yellow-300">nav</span>&gt;</div>
                                <div class="pl-3">&lt;/<span class="text-green-300">body</span>&gt;</div>
                            </div>
                            <i class="bi bi-code-slash text-white text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"></i>
                            <div class="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white/80">HTML</div>
                        </div>
                        <div class="p-6">
                            <h5 class="text-lg font-bold text-white mb-2">Kişisel Portföy</h5>
                            <p class="text-slate-400 text-sm mb-4 leading-relaxed">Tailwind CSS tabanlı, çoklu tema destekli, Three.js 3D arkaplan ve CoreMetrics entegrasyonlu modern SPA.</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="text-[10px] font-bold bg-violet-500/15 text-violet-300 px-2.5 py-1 rounded-lg">HTML</span>
                                <span class="text-[10px] font-bold bg-indigo-500/15 text-indigo-300 px-2.5 py-1 rounded-lg">Tailwind</span>
                                <span class="text-[10px] font-bold bg-blue-500/15 text-blue-300 px-2.5 py-1 rounded-lg">Three.js</span>
                            </div>
                            <div class="flex gap-2">
                                <a href="https://github.com/AllenVB/AllenVB-WebSayfasi" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all">GitHub'da Gör <i class="bi bi-arrow-up-right"></i></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    `,
    contact: `
        <section class="min-h-screen relative overflow-hidden py-24">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="reveal mb-14">
                    <p class="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Ulaşın</p>
                    <h2 class="text-5xl font-black text-white tracking-tight">İletişim</h2>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    <div class="reveal reveal-d1 lg:col-span-3 glass p-8 rounded-3xl border border-white/5">
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

                    <div class="reveal reveal-d2 lg:col-span-2 space-y-4">
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
                <div class="reveal mb-12">
                    <p class="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Canlı Veri</p>
                    <h2 class="text-5xl font-black text-white tracking-tight">📊 Site İstatistikleri</h2>
                    <p class="text-slate-500 mt-2 text-sm">Son 30 günlük ziyaret verileri — gerçek zamanlı</p>
                </div>

                <div id="stats-loading" class="text-center py-20">
                    <div class="inline-block animate-spin text-indigo-400 text-4xl mb-4">⏳</div>
                    <p class="text-slate-500">Veriler yükleniyor...</p>
                </div>

                <div id="stats-content" class="hidden">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        <div class="glass border border-indigo-500/20 p-6 rounded-2xl card-hover">
                            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Toplam Ziyaret</p>
                            <p id="stat-total" class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-indigo-500">-</p>
                        </div>
                        <div class="glass border border-purple-500/20 p-6 rounded-2xl card-hover">
                            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Farklı Sayfa</p>
                            <p id="stat-pages" class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-purple-500">-</p>
                        </div>
                        <div class="glass border border-emerald-500/20 p-6 rounded-2xl card-hover">
                            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Oturum Sayısı</p>
                            <p id="stat-sessions" class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-500">-</p>
                        </div>
                        <div class="glass border border-amber-500/20 p-6 rounded-2xl card-hover">
                            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Ort. Süre</p>
                            <p id="stat-duration" class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-amber-500">-</p>
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

// --- STATS: SAYAÇ ANİMASYONU ---
function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const duration = 1200;
    const start = Date.now();
    const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

// --- SCROLL REVEAL ---
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
}

// --- SKILL BAR ANİMASYONU ---
function animateSkillBars() {
    setTimeout(() => {
        document.querySelectorAll('.skill-bar-fill[data-width]').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 150);
}

// --- STATS: VERİ RENDER ---
function renderStatsData(data) {
    if (!document.getElementById('stat-total')) return;

    animateCounter('stat-total', data.totalVisits ?? 0);
    animateCounter('stat-pages', data.topPages?.length ?? 0);
    animateCounter('stat-sessions', data.totalSessions ?? 0);

    const avgSec = data.avgSessionDuration ?? 0;
    document.getElementById('stat-duration').textContent = avgSec >= 60
        ? Math.floor(avgSec / 60) + 'dk ' + (avgSec % 60) + 'sn'
        : avgSec + ' sn';

    const pageNames = {
        '/': '🏠 Anasayfa',
        '/#about': '👤 Hakkımda',
        '/#projects': '💼 Projelerim',
        '/#contact': '✉️ İletişim',
        '/#stats': '📊 İstatistikler'
    };
    const chartColors = [
        'from-indigo-500 to-purple-500',
        'from-blue-500 to-cyan-500',
        'from-emerald-500 to-teal-500',
        'from-violet-500 to-pink-500',
        'from-amber-500 to-orange-500'
    ];

    const pagesList = document.getElementById('pages-list');
    const maxCount = Math.max(...(data.topPages?.map(p => p.count) ?? [1]), 1);
    pagesList.innerHTML = (data.topPages ?? []).map((p, i) => {
        const label = pageNames[p.path] ?? p.path;
        const pct = Math.round((p.count / maxCount) * 100);
        const color = chartColors[i % chartColors.length];
        return `
            <div>
                <div class="flex justify-between text-sm mb-2">
                    <span class="text-gray-200 font-medium">${label}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-slate-500 text-xs">${pct}%</span>
                        <span class="text-indigo-400 font-bold text-sm">${p.count}</span>
                    </div>
                </div>
                <div class="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <div class="h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out chart-bar" data-width="${pct}%" style="width:0%"></div>
                </div>
            </div>`;
    }).join('');

    const locationsList = document.getElementById('locations-list');
    const maxLocCount = Math.max(...(data.topLocations?.map(l => l.count) ?? [1]), 1);
    locationsList.innerHTML = (data.topLocations ?? []).map(l => {
        const pct = Math.round((l.count / maxLocCount) * 100);
        return `
        <div>
            <div class="flex justify-between items-center mb-1.5">
                <span class="text-gray-300 text-sm font-medium">🌐 ${l.city ?? '?'}, ${l.country ?? '?'}</span>
                <span class="text-purple-400 font-bold text-sm">${l.count}</span>
            </div>
            <div class="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out chart-bar" data-width="${pct}%" style="width:0%"></div>
            </div>
        </div>`;
    }).join('');

    document.getElementById('stats-loading')?.classList.add('hidden');
    document.getElementById('stats-content')?.classList.remove('hidden');

    setTimeout(() => {
        document.querySelectorAll('.chart-bar[data-width]').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
        initScrollReveal();
    }, 150);
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

        // About sayfasında skill barlarını animasyonlu doldur
        if (pageName === 'about') {
            animateSkillBars();
        }

        // Tüm sayfalarda scroll reveal başlat
        initScrollReveal();

        // İletişim formu — EmailJS entegrasyonu
        if (pageName === 'contact') {
            emailjs.init('IYOSLI7CaXZvxytxf');
            const form = document.getElementById('contactForm');
            const msg = document.getElementById('formMessage');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const btn = form.querySelector('button[type="submit"]');
                    btn.disabled = true;
                    btn.textContent = 'Gönderiliyor...';
                    msg.textContent = '';
                    msg.className = 'mt-2 text-center text-sm';

                    const params = {
                        from_name: form.name.value,
                        from_email: form.email.value,
                        subject: form.subject.value,
                        message: form.message.value,
                    };

                    try {
                        await emailjs.send('service_yaac4jp', 'template_juyhcsw', params);
                        msg.textContent = '✅ Mesajınız iletildi, teşekkürler!';
                        msg.classList.add('text-emerald-400');
                        form.reset();
                    } catch (err) {
                        console.error(err);
                        msg.textContent = '❌ Gönderilemedi, lütfen tekrar deneyin.';
                        msg.classList.add('text-red-400');
                    } finally {
                        btn.disabled = false;
                        btn.textContent = 'Gönder';
                    }
                });
            }
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