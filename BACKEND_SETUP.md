# Portfolio Backend Kurulum Rehberi

## Gereksinimler
- Node.js (v14+)
- PostgreSQL (v12+)

## Adım 1: PostgreSQL Veritabanı Oluştur

```sql
-- PostgreSQL command line veya pgAdmin'de çalıştır
CREATE DATABASE saas;
```

## Adım 2: npm Paketlerini Yükle

```bash
npm install
```

## Adım 3: Backend Server'ı Başlat

```bash
npm start
```

Başarılı olursa konsolu göreceksiniz:
```
✓ PostgreSQL bağlantısı başarılı!
✓ Tablolar başarıyla oluşturuldu!
🚀 Server çalışıyor: http://localhost:5000
```

## API Endpoints

### 1. Contact Form Mesajı Kaydet
```
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "Adı Soyadı",
  "email": "email@example.com",
  "subject": "Konu",
  "message": "Mesaj içeriği"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mesaj başarıyla kaydedildi",
  "data": {
    "id": 1,
    "created_at": "2026-02-04T10:30:00.000Z"
  }
}
```

### 2. Sayfa Ziyaretini Kaydet
```
POST http://localhost:5000/api/track-visit
Content-Type: application/json

{
  "path": "/#projects",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0...",
  "apiKey": "745fc94c-ab14-4ed2-beb2-db4a32c990a5"
}
```

### 3. Tüm Mesajları Getir (Admin)
```
GET http://localhost:5000/api/messages
```

### 4. Sayfa Ziyaretlerini Getir (Admin)
```
GET http://localhost:5000/api/visits
```

### 5. Server Sağlık Kontrolü
```
GET http://localhost:5000/api/health
```

## Veritabanı Tabloları

### messages tablosu
```
id (integer) - Primary Key
name (varchar) - Gönderenin adı
email (varchar) - Gönderenin emaili
subject (varchar) - Mesaj konusu
message (text) - Mesaj içeriği
created_at (timestamp) - Oluşturulma tarihi
```

### page_visits tablosu
```
id (integer) - Primary Key
path (varchar) - Ziyaret edilen sayfa
referrer (varchar) - Referrer
user_agent (text) - Kullanıcı aracısı bilgisi
api_key (varchar) - API anahtarı
created_at (timestamp) - Oluşturulma tarihi
```

## Sorun Giderme

### "connect ECONNREFUSED 127.0.0.1:5432" hatası
- PostgreSQL hizmeti çalışıyor mu kontrol edin
- Windows: Services'de "postgresql-x64-XX" araştırın
- Mac/Linux: `sudo systemctl start postgresql` komutunu çalıştırın

### "database 'saas' does not exist" hatası
- PostgreSQL'de `CREATE DATABASE saas;` komutunu çalıştırın

### CORS hatası
- Server.js'de cors middleware tanımlı
- Frontend URL'sini `package.json`'da yapılandırabileceğiniz bölüm var
