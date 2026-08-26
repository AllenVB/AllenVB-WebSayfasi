# Süleyman Emre Arlı — Kişisel Portföy

Backend / Full-Stack Developer portföy sitesi.
Canlı: **[allenvb-websayfasi.vercel.app](https://allenvb-websayfasi.vercel.app/)**

Bağımlılıksız, tek sayfalık (SPA) statik site. Derleme adımı yok — dosyalar
olduğu gibi servis edilir.

## Özellikler

- **Hash tabanlı router** — derin bağlantı (`#projects`), tarayıcı geri/ileri ve
  sayfa başlığı desteğiyle; kütüphane kullanmadan
- **Canlı GitHub verisi** — depolar, yıldızlar, dil dağılımı ve katkı geçmişi
  çalışma anında API'den çekilir, hiçbir sayı kodda sabit değildir
- **Katkı ısı haritası** — son 365 günün gün gün dökümü
- **CV** — gömülü PDF görüntüleyici (mobilde indirmeye düşer) ve yapılandırılmış özet
- **İletişim formu** — EmailJS üzerinden, sunucu gerektirmez
- **Canvas arka plan** — kütüphanesiz parçacık alanı, `prefers-reduced-motion` uyumlu

## Yapı

```
index.html      Sayfa iskeleti, meta etiketler, navbar ve footer
app.js          Router, sayfa şablonları, GitHub veri katmanı
style.css       Tasarım sistemi (CSS değişkenleri, bileşenler, responsive)
cv.pdf          Özgeçmiş
profile.*       Portre görseli (WebP + JPEG)
dev-server.js   Yalnızca yerel önizleme için statik sunucu
```

## Yerel çalıştırma

Bağımlılık kurmaya gerek yok:

```bash
node dev-server.js
```

Ardından `http://localhost:5000` adresini aç.

> Not: Ziyaret analitiği servisine (CoreMetrics) karşı istekler yalnızca üretim
> alan adından çalışacak şekilde ayarlıydı; entegrasyon siteden kaldırıldı.

## Veri kaynakları

| Veri | Kaynak |
|---|---|
| Depolar, yıldız, dil | GitHub REST API |
| Katkı geçmişi | github-contributions-api.jogruber.de |
| İletişim formu | EmailJS |

GitHub API kimliksiz istekleri saatte 60 ile sınırlar; yanıtlar sekme başına
`sessionStorage`'da önbelleklenir (depolar 30 dk, katkılar 60 dk).

## Dağıtım

Vercel'e statik olarak dağıtılır; ayar gerekmez. `main` dalına yapılan her push
otomatik yayınlanır.
