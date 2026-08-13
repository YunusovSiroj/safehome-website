# SafeHome.uz — Texnik topshiriq (TZ)
**Sana:** 2026-08-10
**Holat:** Frontend tayyor (statik prototip), backend yo'q, deploy qilinmagan.

---

## 1. Loyiha haqida

**LLC «SAFEHOME»** — Akuvox (domofon, ZigBee sensor/switch, smart panel, access control) mahsulotlari bo'yicha O'zbekistondagi rasmiy distributor/integrator.
- Direktor: Artikbayev B.U.
- Manzil: 79A Mustaqillik Avenue, Mirzo Ulugbek, Toshkent
- Email: info@safehome.uz
- Domen: safehome.uz (hali sotib olinmagan/ulanmagan bo'lishi mumkin — tekshirish kerak)
- Asosiy mijoz: ARKAN (Yangi Toshkent, 22A obyekt), + potensial 5 ta yangi pudratchi (GOLD STEP INVEST, AGROMIR BUILDINGS, MARG'ILON BINOKOR, LAND HOUSE, HISORAKGIDRO — BAYAZITOGLU YAPI rasmiy xati asosida majburiy xarid holatida)

**Maqsad:** B2B/B2G mijozlar (qurilish tashkilotlari, deviluperlar, texnik nazorat kompaniyalari) uchun katalog + so'rov (lid) yig'ish sayti + admin CMS.

Referens: antifrogen.uz strukturasi (mahsulot katalogi, loyihalar/case, B2B so'rov formasi, admin panel).

---

## 2. Hozirgi holat — nima tayyor

Manzil: `C:\Users\Asus ROG\Desktop\safehome-website\`
Fayl tuzilishi: `index.html`, `css/style.css`, `js/main.js`, `js/i18n.js`, `admin/` (login, dashboard, products, projects, requests, content), `assets/img/`.
Git repo yo'q. Hech qanday hosting/deploy config (Railway/Vercel) yo'q — faqat lokal fayllar, jonli link mavjud emas.

### 2.1 Public sayt (`index.html`) — bo'limlar
1. **Header** — logo, nav (Bosh sahifa, Mahsulotlar mega-menyu, Loyihalar, Qo'llanilishi, Kompaniya haqida, Yangiliklar, Kontaktlar), UZ/RU til almashtirgich, "So'rov qoldirish" CTA
2. **Hero** — sarlavha, hero stats (6+ kategoriya, 10+ obyekt, 100% sertifikatlangan), 3 ta floating card
3. **Trust strip** — hamkorlar (Akuvox, ARKAN, GOLD STEP INVEST, BAYAZITOGLU YAPI)
4. **Mahsulotlar katalogi** — 6 kategoriya (domofon, videoperegovor, ZigBee sensor, ZigBee switch/rele, smart panel, access control), har biri klik qilinganda modal ochiladi (rasm, tavsif, spec ro'yxati)
5. **Nega SafeHome** — 4 ta afzallik kartasi
6. **Qo'llanilish sohalari** — 6 ta tile (villalar, turar-joy majmuasi, ofis, jamoat joy, parvarish uyi, aqlli uy)
7. **Loyihalar/Case'lar** — 3 ta amalga oshirilgan obyekt (ARKAN 22A, GOLD STEP INVEST, AGROMIR BUILDINGS)
8. **Kompaniya haqida** — direktor, manzil, faoliyat
9. **Yangiliklar** — admin CMS'dan (localStorage) dinamik chiqadi
10. **Kontakt / B2B so'rov formasi** — ism, telefon, kompaniya, obyekt nomi, xabar. Yuborilganda hozircha **faqat localStorage'ga** yoziladi (admin/requests.html'da ko'rinadi), email yoki Telegramga borMAYDI.
11. **Footer** — mahsulot/kompaniya linklar, kontakt, admin panelga link

To'liq UZ/RU i18n (`js/i18n.js`) ishlaydi.

### 2.2 Admin panel (`admin/`)
- **login.html** — demo login: `admin@safehome.uz` / `safehome2026` (parol JS faylida ochiq matnda, `admin/js/store.js:117` — bu **productionga yaramaydi**)
- **dashboard.html** — umumiy ko'rsatkichlar
- **products.html** — mahsulot CRUD (localStorage)
- **projects.html** — loyiha/case CRUD (localStorage)
- **requests.html** — kelib tushgan so'rovlar ro'yxati + status (yangi/ko'rib chiqilmoqda/yopilgan)
- **content.html** — hero banner matni, yangiliklar posti CRUD

**MUHIM:** Butun admin panel `localStorage`/`sessionStorage` asosida ishlaydi (`admin/js/store.js`). Bu degani:
- Ma'lumotlar faqat o'sha brauzerda, o'sha kompyuterda saqlanadi
- Boshqa qurilmadan kirsangiz — bo'sh/demo ma'lumot ko'rinadi
- Real baza (backend) yo'q
- Auth xavfsiz emas (parol client kodida ochiq)

---

## 3. Talab qilinadigan ishlar (backend + deploy)

### 3.1 Backend / API (yangi qurish kerak)
- Real baza (Postgres/MySQL yoki Firebase/Supabase kabi BaaS)
- Endpointlar: `products`, `projects`, `requests`, `posts`, `banner` — hozirgi `store.js`dagi funksiyalar (`getAll`, `addItem`, `updateItem`, `deleteItem`) bilan bir xil interfeysda, lekin server tomonida
- Rasm/datasheet upload (hozir static fayllarga link qilingan)
- Admin auth — real (hashed parol, sessiya/JWT, `admin@safehome.uz` demo emas)

### 3.2 B2B so'rov formasi — bildirishnoma
Forma yuborilganda menejerga **email va/yoki Telegram** orqali darhol xabar ketishi kerak (hozir footer/forma matnida "email va Telegram orqali yetkaziladi" deyilgan, lekin bu **hali ishlamaydi** — faqat localStorage'ga yozadi).
- Telegram bot (`@safehome_uz` yoki alohida bot) orqali yangi so'rov kelganda xabar
- Email (info@safehome.uz) orqali dublikat xabar

### 3.3 Deploy
- Domen: safehome.uz sotib olinganmi/DNS sozlanganmi — tekshirish
- Hosting: statik frontend uchun Vercel/Netlify yetarli; backend uchun Railway/Render (yoki BaaS tanlansa alohida server shart emas)
- SSL (avtomatik, Vercel/Railway bilan keladi)
- Google Maps — contact bo'limida "Xarita joylashuvi (keyingi bosqichda)" placeholder hali to'ldirilmagan

### 3.4 Kontent
- Telefon raqami hozir placeholder: `+998 90 000 00 00` — haqiqiy raqamga almashtirish kerak
- Ijtimoiy tarmoq linklari (Telegram/Instagram/WhatsApp) footer'da `href="#"` — haqiqiy linklar kerak
- Mahsulot rasmlari/datasheet'lar — real Akuvox mahsulot fotolari va PDF datasheet kerak bo'lishi mumkin

---

## 4. Ustuvorlik (nima birinchi kerak)

Hozirgi sotuv holati (BAYAZITOGLU YAPI xati, 5 ta yangi majburiy pudratchi) hisobga olinsa:
1. **Forma → Telegram/email bildirishnoma** — eng muhim, chunki lidlar hozir "yo'qolib" ketяpti (faqat localStorage'da)
2. **Deploy + domen** — link bo'lmasa mijozga yuborib bo'lmaydi
3. Real telefon/social linklar to'ldirish
4. Backend + real admin auth — vaqt bo'lsa keyinroq ham mumkin (dastlab forma+deploy yetadi)

---

## 5. Ishlatilgan texnologiya

Static HTML/CSS/vanilla JS. Backend yo'q. Framework yo'q (React/Vue emas). i18n — custom JS dictionary (`js/i18n.js`).
