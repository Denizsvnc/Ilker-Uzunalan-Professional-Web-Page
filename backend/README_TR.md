# Backend Projesi

Bu proje, Express, TypeScript ve Drizzle ORM kullanılarak geliştirilmiş bir Node.js backend uygulamasıdır. Blog gönderileri, ana sayfa (hero) bölümü, hakkımızda içeriği ve dosya yükleme işlemlerini yönetmek için RESTful API sunar. Kişisel portföy veya içerik yönetim sistemi gibi projelerde sunucu tarafı olarak kullanılabilir.

## Özellikler
- Kullanıcı kimlik doğrulama (JWT tabanlı)
- Blog yönetimi (CRUD)
- Hero bölümü yönetimi
- Hakkımızda bölümü yönetimi
- Dosya yükleme desteği (Multer)
- PostgreSQL veritabanı entegrasyonu (Drizzle ORM)

## Gereksinimler
- Node.js (v18 veya üzeri önerilir)
- PostgreSQL

## Kurulum

1. **Depoyu klonlayın:**
   ```sh
   git clone <repo-url>
   cd backend
   ```

2. **Bağımlılıkları yükleyin:**
   ```sh
   npm install
   ```

3. **Ortam değişkenlerini ayarlayın:**
   - `.env.example` dosyasını `.env` olarak kopyalayıp gerekli alanları doldurun.

4. **Veritabanı migrasyonlarını çalıştırın:**
   ```sh
   npm run db:push
   ```

5. **Geliştirme sunucusunu başlatın:**
   ```sh
   npm run dev
   ```

Sunucu, `.env` dosyasında belirttiğiniz portta (varsayılan: 3005) çalışacaktır.

## Klasör Yapısı
- `src/` — Ana kaynak kodu
- `src/modules/` — Özellik modülleri (blog, hero, aboutUs, auth vb.)
- `src/common/middleware/` — Özel Express middleware'leri
- `src/db/` — Veritabanı şeması, modeller ve seed scriptleri
- `uploads/` — Yüklenen dosyalar (görseller vb.)

## API Uç Noktaları
- `/api/auth` — Kimlik doğrulama
- `/api/blog` — Blog yönetimi
- `/api/hero` — Hero bölümü yönetimi
- `/api/about` — Hakkımızda bölümü yönetimi

## Notlar
- Yüklenen dosyalar `uploads/` klasöründe saklanır.
- PostgreSQL sunucunuzun çalışır ve erişilebilir olduğundan emin olun.
- Canlı ortamda güvenlik ayarlarını ve ortam değişkenlerini gözden geçirin.

---

Herhangi bir sorunla karşılaşırsanız, lütfen repoda bir issue açın.
