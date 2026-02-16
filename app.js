// --- COREMETRICS TAKİP SİSTEMİ (FRANKFURT) ---
const CORE_CONFIG = {
    API_KEY: "db281f63-a569-47e4-b30d-e6637451e890",
    URL: "https://coremetrics-service-665359087509.europe-west3.run.app/api/Collector/track"
};

async function trackCoreMetrics(path) {
    // Konsolda yeşil bildirim
    console.log("%c📊 CoreMetrics: Veri Frankfurt'a uçuyor -> " + path, "color: #00ff00; font-weight: bold; background: #000; padding: 2px 5px;");

    try {
        await fetch(CORE_CONFIG.URL, {
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

// --- PORTFÖY SAYFA İÇERİKLERİ ---
const pages = {
    home: `
        <section class="min-h-screen bg-gray-900 relative overflow-hidden">
            <div class="absolute inset-0">
                <div class="float-shape1 absolute top-20 left-10 w-20 h-20 bg-blue-500 opacity-20 rounded-full"></div>
                <div class="float-shape2 absolute top-40 right-20 w-16 h-16 bg-purple-500 opacity-30 rounded-lg transform rotate-45"></div>
                <div class="float-shape3 absolute bottom-40 left-1/4 w-24 h-24 bg-green-500 opacity-25 rounded-full"></div>
            </div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 py-20">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="animate-fade-in-up">
                        <h1 class="text-5xl md:text-6xl font-bold text-blue-400 mb-6">Merhaba 👋</h1>
                        <p class="text-xl text-gray-300 mb-4">Yazılım Mühendisi ve Web Developer</p>
                        <div class="flex flex-col sm:flex-row gap-4 mb-8">
                            <button data-page="about" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">Hakkımda</button>
                            <button data-page="projects" class="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">Projelerim</button>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="border-4 border-blue-400 rounded-lg overflow-hidden shadow-2xl">
                            <img src="ben1.jpeg" alt="Süleyman Emre Arlı" class="w-full h-auto max-w-md">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    about: `
        <section class="min-h-screen bg-gray-900 py-20 relative overflow-hidden text-white">
            <div class="max-w-7xl mx-auto px-4 relative z-10">
                <h2 class="text-5xl font-bold text-blue-400 mb-12">Hakkımda</h2>
                <div class="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                    <p class="text-xl">Süleyman Emre Arlı | Yazılım Mühendisi Öğrencisi</p>
                    <p class="text-gray-400 mt-4">Bandırma Onyedi Eylül Üniversitesi'nde eğitimime devam etmekteyim.</p>
                </div>
            </div>
        </section>
    `,
    projects: `
        <section class="min-h-screen bg-gray-900 py-20">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-5xl font-bold text-blue-400 mb-12">Projelerim</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
                        <h5 class="text-xl font-bold text-white mb-4">Smart Home Security</h5>
                        <a href="https://smart-home-security-veri-taban.vercel.app/" target="_blank" class="block bg-blue-600 text-center py-2 rounded-lg font-bold">Detaylar</a>
                    </div>
                    <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
                        <h5 class="text-xl font-bold text-white mb-4">User SSO</h5>
                        <a href="https://github.com/AllenVB/usersso" target="_blank" class="block bg-blue-600 text-center py-2 rounded-lg font-bold">Detaylar</a>
                    </div>
                </div>
            </div>
        </section>
    `,
    contact: `
        <section class="min-h-screen bg-gray-900 py-20 text-white">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-5xl font-bold text-blue-400 mb-12">İletişim</h2>
                <form id="contactForm" class="space-y-6 bg-gray-800 p-8 rounded-2xl border border-gray-700">
                    <input type="text" name="name" placeholder="Adınız" class="w-full bg-gray-900 p-3 rounded-lg border border-gray-700">
                    <textarea name="message" placeholder="Mesajınız" class="w-full bg-gray-900 p-3 rounded-lg border border-gray-700 h-32"></textarea>
                    <button type="submit" class="w-full bg-blue-600 py-3 rounded-lg font-bold">Gönder</button>
                    <div id="formMessage" class="mt-4 text-center"></div>
                </form>
            </div>
        </section>
    `
};

// --- ROUTER (SAYFA YÖNETİMİ) ---
function loadPage(pageName) {
    const container = document.getElementById('app-container');
    if (!pages[pageName]) pageName = 'home';

    // Sayfa yolu belirleme ve Frankfurt'a gönderme
    const trackPath = pageName === 'home' ? '/' : `/#${pageName}`;
    trackCoreMetrics(trackPath);

    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = pages[pageName];
        container.style.opacity = '1';

        // Sayfa içindeki dinamik butonları dinle
        container.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                loadPage(e.currentTarget.getAttribute('data-page'));
            });
        });

        // Dış bağlantı tıklamalarını takip et (Örn: Detaylar butonları)
        container.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const title = e.currentTarget.closest('div')?.querySelector('h5')?.innerText || "Bilinmeyen Proje";
                trackCoreMetrics(`click/project/${title}`);
            });
        });
    }, 300);
}

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    loadPage('home');

    // Navbar linklerini dinle
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(e.currentTarget.getAttribute('data-page'));
        });
    });
});