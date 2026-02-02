// Page content
const pages = {
    home: `
        <section class="min-h-screen bg-gray-900 relative overflow-hidden">
            <!-- 3D Background Elements -->
            <div class="absolute inset-0">
                <div class="float-shape1 absolute top-20 left-10 w-20 h-20 bg-blue-500 opacity-20 rounded-full"></div>
                <div class="float-shape2 absolute top-40 right-20 w-16 h-16 bg-purple-500 opacity-30 rounded-lg transform rotate-45"></div>
                <div class="float-shape3 absolute bottom-40 left-1/4 w-24 h-24 bg-green-500 opacity-25 rounded-full"></div>
                <div class="float-shape1 absolute top-1/3 right-1/3 w-12 h-12 bg-red-500 opacity-20 rounded-lg"></div>
                <div class="float-shape2 absolute bottom-20 right-10 w-18 h-18 bg-yellow-500 opacity-30 rounded-full"></div>
            </div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="animate-fade-in-up">
                        <h1 class="text-5xl md:text-6xl font-bold text-blue-400 mb-6">Merhaba 👋</h1>
                        <p class="text-xl text-gray-300 mb-4">Yazılım Mühendisi ve Web Developer</p>
                        <p class="text-lg text-gray-400 mb-8">Modern teknolojiler ile yaratıcı çözümler üretiyorum</p>
                        <div class="flex flex-col sm:flex-row gap-4 mb-8">
                            <button data-page="about" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
                                Hakkımda
                            </button>
                            <button data-page="projects" class="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
                                Projelerim
                            </button>
                        </div>
                        <div class="flex gap-4">
                            <a href="https://github.com/suleymanemrearlii" target="_blank" class="text-gray-300 hover:text-blue-400 transition text-2xl">
                                <i class="bi bi-github"></i>
                            </a>
                            <a href="https://linkedin.com/in/suleymanemrearlii" target="_blank" class="text-gray-300 hover:text-blue-400 transition text-2xl">
                                <i class="bi bi-linkedin"></i>
                            </a>
                            <a href="https://twitter.com/SleymanEmreArl1" target="_blank" class="text-gray-300 hover:text-blue-400 transition text-2xl">
                                <i class="bi bi-twitter"></i>
                            </a>
                            <a href="https://instagram.com/suleymanemrearlii" target="_blank" class="text-gray-300 hover:text-blue-400 transition text-2xl">
                                <i class="bi bi-instagram"></i>
                            </a>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="border-4 border-blue-400 rounded-lg overflow-hidden shadow-2xl hover-image-scale">
                            <img src="ben1.jpeg" alt="Süleyman Emre Arlı" class="w-full h-auto max-w-md">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    about: `
        <section class="min-h-screen bg-gray-900 py-20 relative overflow-hidden">
            <!-- 3D Background Elements - Floating Objects -->
            <div class="absolute inset-0">
                <div class="float-shape1 absolute top-20 left-10 w-20 h-20 bg-blue-500 opacity-20 rounded-full"></div>
                <div class="float-shape2 absolute top-40 right-20 w-16 h-16 bg-purple-500 opacity-30 rounded-lg transform rotate-45"></div>
                <div class="float-shape3 absolute bottom-40 left-1/4 w-24 h-24 bg-green-500 opacity-25 rounded-full"></div>
                <div class="float-shape1 absolute top-1/3 right-1/3 w-12 h-12 bg-red-500 opacity-20 rounded-lg"></div>
                <div class="float-shape2 absolute bottom-20 right-10 w-18 h-18 bg-yellow-500 opacity-30 rounded-full"></div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 class="text-5xl md:text-6xl font-bold text-blue-400 mb-12">Hakkımda</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div class="group bg-gray-800 p-6 rounded-lg mb-6 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                            <h3 class="text-2xl font-bold text-blue-400 mb-4 group-hover:text-blue-300 transition">Kişisel Bilgiler</h3>
                            <p class="text-gray-300 mb-4">
                                Merhaba! Ben Süleyman Emre Arlı, 21 yaşındayım ve Bandırma Onyedi Eylül Üniversitesinde Yazılım Mühendisliği öğrencisiyim.
                            </p>
                            <p class="text-gray-300">
                                Modern teknolojiler ile projeler geliştirmeyi severim.
                            </p>
                        </div>
                        <div class="group bg-gray-800 p-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                            <h3 class="text-2xl font-bold text-blue-400 mb-4 group-hover:text-blue-300 transition">Yetenekler</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <h5 class="text-lg font-bold text-blue-300 mb-2">Frontend</h5>
                                    <ul class="text-gray-300 space-y-1">
                                        <li>• HTML5 & CSS3</li>
                                        <li>• JavaScript</li>
                                        <li>• Tailwind CSS</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 class="text-lg font-bold text-blue-300 mb-2">Backend</h5>
                                    <ul class="text-gray-300 space-y-1">
                                        <li>• Java</li>
                                        <li>• Spring</li>
                                        <li>• PostgreSQL</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="group bg-gray-800 p-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                            <h3 class="text-2xl font-bold text-blue-400 mb-4 group-hover:text-blue-300 transition">İletişim</h3>
                            <ul class="text-gray-300 space-y-3">
                                <li class="hover:text-blue-400 transition cursor-pointer"><i class="bi bi-envelope text-blue-400 mr-2"></i>suleymanarli0666@gmail.com</li>
                                <li class="hover:text-blue-400 transition cursor-pointer"><i class="bi bi-telephone text-blue-400 mr-2"></i>+90 544 453 0125</li>
                                <li class="hover:text-blue-400 transition cursor-pointer"><i class="bi bi-geo-alt text-blue-400 mr-2"></i>Bandırma, Balıkesir, Türkiye</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    projects: `
        <section class="min-h-screen bg-gray-900 py-20 relative overflow-hidden">
            <!-- 3D Background Elements - Floating Objects -->
            <div class="absolute inset-0">
                <div class="float-shape1 absolute top-20 left-10 w-20 h-20 bg-blue-500 opacity-20 rounded-full"></div>
                <div class="float-shape2 absolute top-40 right-20 w-16 h-16 bg-purple-500 opacity-30 rounded-lg transform rotate-45"></div>
                <div class="float-shape3 absolute bottom-40 left-1/4 w-24 h-24 bg-green-500 opacity-25 rounded-full"></div>
                <div class="float-shape1 absolute top-1/3 right-1/3 w-12 h-12 bg-red-500 opacity-20 rounded-lg"></div>
                <div class="float-shape2 absolute bottom-20 right-10 w-18 h-18 bg-yellow-500 opacity-30 rounded-full"></div>
                <div class="float-shape3 absolute top-1/2 right-1/4 w-16 h-16 bg-blue-400 opacity-25 rounded-lg transform -rotate-45"></div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 class="text-5xl md:text-6xl font-bold text-blue-400 mb-12">Projelerim</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div class="h-32 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <i class="bi bi-globe text-white text-3xl"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition">Smart Home Security</h5>
                            <p class="text-gray-400 mb-4">Akıllı ev güvenlik sistemi projesi.</p>
                            <a href="#" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded block text-center transition transform hover:scale-105">
                                Detaylar
                            </a>
                        </div>
                    </div>
                    <div class="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div class="h-32 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <i class="bi bi-lightning text-white text-3xl"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition">User SSO</h5>
                            <p class="text-gray-400 mb-4">Tek oturum açma sistemi.</p>
                            <a href="#" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded block text-center transition transform hover:scale-105">
                                Detaylar
                            </a>
                        </div>
                    </div>
                    <div class="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div class="h-32 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <i class="bi bi-code-slash text-white text-3xl"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition">Proje 3</h5>
                            <p class="text-gray-400 mb-4">Proje açıklaması gelecek.</p>
                            <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition transform hover:scale-105">
                                Detaylar
                            </button>
                        </div>
                    </div>
                    <div class="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div class="h-32 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <i class="bi bi-rocket text-white text-3xl"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition">Proje 4</h5>
                            <p class="text-gray-400 mb-4">Harita tabanlı hizmet uygulaması.</p>
                            <a href="#" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded block text-center transition transform hover:scale-105">
                                Detaylar
                            </a>
                        </div>
                    </div>
                    <div class="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div class="h-32 bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <i class="bi bi-gear text-white text-3xl"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition">Proje 5</h5>
                            <p class="text-gray-400 mb-4">Otomasyon ve yönetim sistemi.</p>
                            <a href="#" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded block text-center transition transform hover:scale-105">
                                Detaylar
                            </a>
                        </div>
                    </div>
                    <div class="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div class="h-32 bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <i class="bi bi-database text-white text-3xl"></i>
                        </div>
                        <div class="p-6">
                            <h5 class="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition">Proje 6</h5>
                            <p class="text-gray-400 mb-4">Veri analiz ve raporlama aracı.</p>
                            <a href="#" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded block text-center transition transform hover:scale-105">
                                Detaylar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    contact: `
        <section class="min-h-screen bg-gray-900 py-20 relative overflow-hidden">
            <!-- 3D Background Elements - Floating Objects -->
            <div class="absolute inset-0">
                <div class="float-shape1 absolute top-20 left-10 w-20 h-20 bg-blue-500 opacity-20 rounded-full"></div>
                <div class="float-shape2 absolute top-40 right-20 w-16 h-16 bg-purple-500 opacity-30 rounded-lg transform rotate-45"></div>
                <div class="float-shape3 absolute bottom-40 left-1/4 w-24 h-24 bg-green-500 opacity-25 rounded-full"></div>
                <div class="float-shape1 absolute top-1/3 right-1/3 w-12 h-12 bg-red-500 opacity-20 rounded-lg"></div>
                <div class="float-shape2 absolute bottom-20 right-10 w-18 h-18 bg-yellow-500 opacity-30 rounded-full"></div>
                <div class="float-shape3 absolute top-1/2 left-1/3 w-14 h-14 bg-cyan-500 opacity-25 rounded-lg transform rotate-12"></div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 class="text-5xl md:text-6xl font-bold text-blue-400 mb-12">İletişim & Mesaj Gönderin</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="bg-gray-800 p-8 rounded-lg">
                        <h3 class="text-2xl font-bold text-blue-400 mb-6">Benimle İletişime Geçin</h3>
                        <form id="contactForm">
                            <div class="mb-4">
                                <label class="block text-gray-300 mb-2">Adınız</label>
                                <input type="text" name="name" class="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-blue-400" required>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-300 mb-2">E-posta</label>
                                <input type="email" name="email" class="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-blue-400" required>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-300 mb-2">Konu</label>
                                <input type="text" name="subject" class="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-blue-400" required>
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-300 mb-2">Mesaj</label>
                                <textarea name="message" class="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-blue-400 h-32" required></textarea>
                            </div>
                            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition">
                                Gönder
                            </button>
                            <div id="formMessage" class="mt-4 text-center text-gray-300"></div>
                        </form>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-blue-400 mb-6">İletişim Bilgileri</h3>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <i class="bi bi-envelope text-blue-400 mr-3"></i>
                                <span class="text-gray-300">suleymanarli0666@gmail.com</span>
                            </div>
                            <div class="flex items-center">
                                <i class="bi bi-telephone text-blue-400 mr-3"></i>
                                <span class="text-gray-300">+90 544 453 0125</span>
                            </div>
                            <div class="flex items-center">
                                <i class="bi bi-geo-alt text-blue-400 mr-3"></i>
                                <span class="text-gray-300">Bandırma, Balıkesir, Türkiye</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
};

// Router functionality
function loadPage(pageName) {
    const container = document.getElementById('app-container');
    if (!pages[pageName]) pageName = 'home';

    // --- BURASI KRİTİK ---
    if (typeof window.trackVisit === 'function') {
        window.trackVisit(pageName);
    }
    // ---------------------

    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = pages[pageName];
        container.style.opacity = '1';

        // Sayfa içindeki butonlar için dinleyiciler
        container.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                loadPage(e.currentTarget.getAttribute('data-page'));
            });
        });

        // Contact form submission
        const contactForm = container.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = {
                    name: contactForm.querySelector('input[name="name"]').value,
                    email: contactForm.querySelector('input[name="email"]').value,
                    subject: contactForm.querySelector('input[name="subject"]').value,
                    message: contactForm.querySelector('textarea[name="message"]').value
                };

                console.log("Form Gönderiliyor:", formData);

                // Formun başarılı olduğunu göster
                const messageDiv = contactForm.querySelector('#formMessage');
                messageDiv.textContent = "✓ Mesajınız gönderildi! Teşekkürler.";
                messageDiv.classList.add('text-green-400');

                // Formu temizle
                contactForm.reset();

                // 3 saniye sonra mesajı gizle
                setTimeout(() => {
                    messageDiv.textContent = '';
                    messageDiv.classList.remove('text-green-400');
                }, 3000);
            });
        }
    }, 300);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Load initial page
    loadPage('home');

    // Add navbar link listeners
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(e.currentTarget.getAttribute('data-page'));
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    });
});
