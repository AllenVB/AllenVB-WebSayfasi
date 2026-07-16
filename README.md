# 🌐 Süleyman Emre Arlı — Kişisel Portfolio

Kişisel portföy web sitesi. Vercel üzerinde yayınlanmaktadır.

**Canlı:** [allenvb.websayfasi.vercel.app](allenvb-websayfasi.vercel.app)

---

## 🛠 Teknolojiler

- **HTML5 / Vanilla JS** — SPA (Single Page Application) yapısı
- **Tailwind CSS** — stillendirme
- **Three.js** — 3D animasyonlu arka plan
- **Bootstrap Icons** — ikonlar
- **EmailJS** — iletişim formu e-posta entegrasyonu
- **CoreMetrics** — gerçek zamanlı ziyaretçi analitik sistemi (kendi geliştirmem)

---

## 📁 Dosya Yapısı

```
WebSite/
├── index.html        # Ana HTML, CDN bağımlılıkları
├── app.js            # SPA sayfa yönetimi, tüm page template'leri
├── style.css         # Glassmorphism, animasyonlar, özel stiller
└── dashboard.html    # CoreMetrics canlı dashboard
```

---

## ✨ Özellikler

### Sayfalar
| Sayfa | Açıklama |
|---|---|
| Ana Sayfa | Tanıtım, sosyal bağlantılar, CTA butonları |
| Hakkımda | Kişisel bilgiler, Frontend/Backend skill bar'ları |
| Projelerim | Proje kartları (Smart Home, User SSO, PMS, CoreMetrics) |
| İletişim | EmailJS ile doğrudan e-posta gönderme formu |
| İstatistikler | CoreMetrics canlı ziyaret verileri (SSE + polling) |

### CoreMetrics Entegrasyonu
- Her sayfa geçişinde ziyaret `Frankfurt (Cloud Run)` sunucusuna gönderilir
- Ziyaretçi sekmeyi kapatınca **oturum süresi** otomatik iletilir (`sendBeacon`)
- İstatistikler sayfasında veriler **SSE** ile anlık güncellenir

### İletişim Formu
- **EmailJS** ile backend gerektirmeden e-posta gönderimi
- Gönderim sırasında buton devre dışı kalır, başarı/hata mesajı gösterilir

---

## ⚙️ Yapılandırma

`app.js` dosyasının en üstünde:

```js
const CORE_CONFIG = {
    API_KEY: "...",      // CoreMetrics API anahtarı
    BASE_URL: "..."      // Cloud Run servis URL'i
};
```

---

## 🚀 Deploy

Vercel'e bağlı GitHub reposu üzerinden otomatik deploy.

```bash
git add .
git commit -m "update"
git push
```
