# Proje Genel Bilgisi

Bu depo, içerik yönetimi ve portföy sistemi için tam yığın (full-stack) bir uygulama içerir. Backend kısmı Node.js, Express, TypeScript ve Drizzle ORM ile geliştirilmiştir. Frontend (varsa) ayrı bir klasörde yer alabilir. Backend; kimlik doğrulama, blog, hero ve hakkımızda bölümleri ile dosya yükleme için RESTful API'ler sunar.

## Temel Özellikler
- Modüler backend yapısı
- JWT tabanlı kimlik doğrulama
- Blog, hero ve hakkımızda yönetimi
- Dosya yükleme desteği
- PostgreSQL veritabanı entegrasyonu

## Başlangıç

1. **Depoyu klonlayın:**
   ```sh
   git clone <repo-url>
   cd ilker_uzunalan
   ```

2. **Backend kurulumu:**
   ```sh
   cd backend
   npm install
   cp .env.example .env # Ortam değişkenlerini doldurun
   npm run db:push
   npm run dev
   ```

3. **Frontend kurulumu (varsa):**
   - Frontend klasöründeki talimatları izleyin.

## Klasör Yapısı
- `backend/` — Backend API ve iş mantığı
- `uploads/` — Yüklenen dosyalar (görseller vb.)
- (Opsiyonel) `frontend/` — Frontend uygulaması

## Gereksinimler
- Node.js (v18+)
- PostgreSQL

## Notlar
- Backend'i çalıştırmadan önce ortam değişkenlerinizi ayarlayın.
- Yüklenen dosyalar `uploads/` klasöründe saklanır.
- Canlı ortamda güvenlik ve ortam ayarlarını gözden geçirin.

---

Sorunlar veya katkılar için lütfen repoda bir issue veya pull request açın.
