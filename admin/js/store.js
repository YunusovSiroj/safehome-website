// SafeHome Admin — localStorage-backed demo data store (no real backend yet)

const DB_KEYS = {
  products: 'sh_admin_products',
  categories: 'sh_admin_categories',
  projects: 'sh_admin_projects',
  applications: 'sh_admin_applications',
  requests: 'sh_admin_requests',
  posts: 'sh_admin_posts',
  banner: 'sh_admin_banner',
  contactInfo: 'sh_admin_contact_info',
  about: 'sh_admin_about',
  auth: 'sh_admin_auth',
};

const SEED = {
  products: [
    // Domofonlar (Akuvox)
    { id: 1, category: 'Domofonlar', name: 'Akuvox domofon paneli', desc: '', img: '../assets/img/products/door-phone.webp', datasheet: '', createdAt: '2026-08-07' },
    { id: 2, category: 'Domofonlar', name: 'Akuvox E12', desc: 'Compact 7" Video Door Phone', img: '../assets/img/akuvox-doorphones/e12.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 3, category: 'Domofonlar', name: 'Akuvox E13S', desc: 'Single-Button 7" Video Door Phone', img: '../assets/img/akuvox-doorphones/e13s.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 4, category: 'Domofonlar', name: 'Akuvox E16', desc: 'Face Recognition Door Phone', img: '../assets/img/akuvox-doorphones/e16.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 5, category: 'Domofonlar', name: 'Akuvox E18', desc: '7" Face Recognition Door Phone', img: '../assets/img/akuvox-doorphones/e18.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 6, category: 'Domofonlar', name: 'Akuvox E20S', desc: '7" Emergency Intercom', img: '../assets/img/akuvox-doorphones/e20s.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 7, category: 'Domofonlar', name: 'Akuvox E21', desc: '7" Emergency Video Intercom', img: '../assets/img/akuvox-doorphones/e21.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 8, category: 'Domofonlar', name: 'Akuvox MD06', desc: 'Video Intercom Doorstep Module', img: '../assets/img/akuvox-doorphones/md06.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 9, category: 'Domofonlar', name: 'Akuvox MD12', desc: 'Video Intercom Doorstep Module', img: '../assets/img/akuvox-doorphones/md12.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 10, category: 'Domofonlar', name: 'Akuvox R20A', desc: 'Compact 7" Video Doorphone', img: '../assets/img/akuvox-doorphones/r20a.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 11, category: 'Domofonlar', name: 'Akuvox R20B', desc: 'Compact 7" Video Door Phone', img: '../assets/img/akuvox-doorphones/r20b.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 12, category: 'Domofonlar', name: 'Akuvox R20K', desc: 'Compact 7" Video Doorphone', img: '../assets/img/akuvox-doorphones/r20k.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 13, category: 'Domofonlar', name: 'Akuvox R20K-L', desc: 'Compact 4.3" Video Door Phone', img: '../assets/img/akuvox-doorphones/r20k-l.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 14, category: 'Domofonlar', name: 'Akuvox R25A', desc: 'Single-Button 7" Video Door Phone', img: '../assets/img/akuvox-doorphones/r25a.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 15, category: 'Domofonlar', name: 'Akuvox R25K', desc: 'Video Door Phone', img: '../assets/img/akuvox-doorphones/r25k.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 16, category: 'Domofonlar', name: 'Akuvox R28', desc: '7" Video Doorphone', img: '../assets/img/akuvox-doorphones/r28.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 17, category: 'Domofonlar', name: 'Akuvox R29', desc: 'AI-powered Smart Doorphone', img: '../assets/img/akuvox-doorphones/r29.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 18, category: 'Domofonlar', name: 'Akuvox S532', desc: '7.9" S3 Video Door Phone', img: '../assets/img/akuvox-doorphones/s532.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 19, category: 'Domofonlar', name: 'Akuvox S535', desc: 'Facial Recognition Door Phone', img: '../assets/img/akuvox-doorphones/s535.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 20, category: 'Domofonlar', name: 'Akuvox S538', desc: '8" Two-Way Video Door Phone', img: '../assets/img/akuvox-doorphones/s538.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 21, category: 'Domofonlar', name: 'Akuvox S539', desc: '7" Android Door Phone', img: '../assets/img/akuvox-doorphones/s539.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 22, category: 'Domofonlar', name: 'Akuvox X910', desc: 'Single-Button Package Detection Door Phone', img: '../assets/img/akuvox-doorphones/x910.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 23, category: 'Domofonlar', name: 'Akuvox X912', desc: 'Vandal-resistant Video Door Phone', img: '../assets/img/akuvox-doorphones/x912.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 24, category: 'Domofonlar', name: 'Akuvox X915', desc: 'Face Recognition Android Door Phone', img: '../assets/img/akuvox-doorphones/x915.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 25, category: 'Domofonlar', name: 'Akuvox X916', desc: 'Android Doorphone with Starlight Camera', img: '../assets/img/akuvox-doorphones/x916.png', datasheet: '', createdAt: '2026-08-07' },
    // Videoperegovor panellari
    { id: 26, category: 'Videoperegovor panellari', name: 'Akuvox C313', desc: '7" Linux Indoor Monitor', img: '../assets/img/akuvox-monitors/c313.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 27, category: 'Videoperegovor panellari', name: 'Akuvox C316', desc: '7" Android Indoor Monitor', img: '../assets/img/akuvox-monitors/c316.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 28, category: 'Videoperegovor panellari', name: 'Akuvox C319', desc: '10" Android Indoor Monitor', img: '../assets/img/akuvox-monitors/c319.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 29, category: 'Videoperegovor panellari', name: 'Akuvox indoor monitor', desc: '', img: '../assets/img/products/indoor-monitor.webp', datasheet: '', createdAt: '2026-08-07' },
    { id: 30, category: 'Videoperegovor panellari', name: "Akuvox indoor monitor (devorga o'rnatiladigan)", desc: '', img: '../assets/img/akubela-ref/26044dbf99596f60d35f904ab5900015.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 31, category: 'Videoperegovor panellari', name: 'Akuvox indoor monitor', desc: '', img: '../assets/img/akubela-ref/cb0c49804963f9c1cf98d7b20efe28e4.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 32, category: 'Videoperegovor panellari', name: 'Akuvox IT88', desc: '10" Android Indoor Monitor', img: '../assets/img/akuvox-monitors/it88.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 33, category: 'Videoperegovor panellari', name: 'Akuvox S560', desc: 'SIP-Based Handset', img: '../assets/img/akuvox-monitors/s560.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 34, category: 'Videoperegovor panellari', name: 'Akuvox S562', desc: '7" Linux Indoor Monitor', img: '../assets/img/akuvox-monitors/s562.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 35, category: 'Videoperegovor panellari', name: 'Akuvox S563', desc: '8" SIP Indoor Monitor', img: '../assets/img/akuvox-monitors/s563.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 36, category: 'Videoperegovor panellari', name: 'Akuvox S565', desc: '10" Video Indoor Monitor', img: '../assets/img/akuvox-monitors/s565.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 37, category: 'Videoperegovor panellari', name: 'Akuvox S567', desc: '10.1" Android Indoor Monitor', img: '../assets/img/akuvox-monitors/s567.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 38, category: 'Videoperegovor panellari', name: 'Akuvox X933', desc: '7" Android Indoor Monitor', img: '../assets/img/akuvox-monitors/x933.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 39, category: 'Videoperegovor panellari', name: 'Akuvox X937', desc: '15.6" Surveillance + Intercom AI Monitor', img: '../assets/img/akuvox-monitors/x937.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 40, category: 'Videoperegovor panellari', name: 'Indoor monitor', desc: '', img: '../assets/img/akubela-ref/9b65b852124dbf60bec84b58977c6d19.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 41, category: 'Videoperegovor panellari', name: 'Kompakt indoor panel', desc: '', img: '../assets/img/akubela-ref/57a88a9dfb53212c18a0c090a5a33cf5.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 42, category: 'Videoperegovor panellari', name: 'Mobil ilova orqali boshqarish', desc: '', img: '../assets/img/akubela-ref/e1b0151be40c83e6d9ec981dcdaa1802.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 43, category: 'Videoperegovor panellari', name: 'HyPanel', desc: '', img: '../assets/img/akubela-ref/PHX1.jpg', datasheet: '', createdAt: '2026-08-07' },
    { id: 44, category: 'Videoperegovor panellari', name: 'HyPanel Ultra', desc: '', img: '../assets/img/akubela-ref/a1b5ed6ceb0e833066718b1fcb2deda0.jpg', datasheet: '', createdAt: '2026-08-07' },
    { id: 45, category: 'Videoperegovor panellari', name: 'Smart panel (barmoq izi bilan)', desc: '', img: '../assets/img/akubela-ref/569523626f45a19aa28512cf7596ce5d.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 46, category: 'Videoperegovor panellari', name: 'Smart panel', desc: '', img: '../assets/img/akubela-ref/2f62844d66c878f0df680d959a58f1ba.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 47, category: 'Videoperegovor panellari', name: 'Smart panel', desc: '', img: '../assets/img/akubela-ref/4603e3115e5a1dd9abcc35f4aef5922f.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 48, category: 'Videoperegovor panellari', name: 'Smart panel', desc: '', img: '../assets/img/akubela-ref/50be9886a4b74aac208e4aaa7821f5f2.png', datasheet: '', createdAt: '2026-08-07' },
    // ZigBee sensorlar
    { id: 49, category: 'ZigBee sensorlar', name: 'CO Sensor', desc: '', img: '../assets/img/akubela-ref/sensor-co.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 50, category: 'ZigBee sensorlar', name: 'Door Window Sensor', desc: '', img: '../assets/img/akubela-ref/sensor-door-window.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 51, category: 'ZigBee sensorlar', name: 'Flood Sensor', desc: '', img: '../assets/img/akubela-ref/sensor-flood.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 52, category: 'ZigBee sensorlar', name: 'Gas Sensor', desc: '', img: '../assets/img/akubela-ref/sensor-gas.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 53, category: 'ZigBee sensorlar', name: 'Human Presence Detector', desc: '', img: '../assets/img/akubela-ref/sensor-presence.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 54, category: 'ZigBee sensorlar', name: 'Motion Sensor', desc: '', img: '../assets/img/akubela-ref/sensor-motion.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 55, category: 'ZigBee sensorlar', name: 'Scene Button', desc: '', img: '../assets/img/akubela-ref/sensor-scene-button.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 56, category: 'ZigBee sensorlar', name: 'Smart Valve', desc: '', img: '../assets/img/akubela-ref/sensor-valve.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 57, category: 'ZigBee sensorlar', name: 'Smoke Sensor', desc: '', img: '../assets/img/akubela-ref/sensor-smoke.png', datasheet: '', createdAt: '2026-08-07' },
    // ZigBee switch / rele
    { id: 58, category: 'ZigBee switch / rele', name: '1/2 Gang Switch Module', desc: '', img: '../assets/img/akubela-ref/switch-1-2gang.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 59, category: 'ZigBee switch / rele', name: '1/2/3/4 Gang Touch Switch (EU version)', desc: '', img: '../assets/img/akubela-ref/switch-touch-eu.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 60, category: 'ZigBee switch / rele', name: '1/2/3/4 Gang Touch Switch (US version)', desc: '', img: '../assets/img/akubela-ref/switch-touch-us.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 61, category: 'ZigBee switch / rele', name: '2/4/6/8-Button Scene Panel (KNX)', desc: '', img: '../assets/img/akubela-ref/knx-scene-panel.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 62, category: 'ZigBee switch / rele', name: 'Power Module (960mA, KNX)', desc: '', img: '../assets/img/akubela-ref/knx-power-module.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 63, category: 'ZigBee switch / rele', name: 'Smart Key Switch (EU standard)', desc: '', img: '../assets/img/akubela-ref/switch-key.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 64, category: 'ZigBee switch / rele', name: 'Smart Plug (EU)', desc: '', img: '../assets/img/akubela-ref/plug-eu.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 65, category: 'ZigBee switch / rele', name: 'Smart Plug (UK)', desc: '', img: '../assets/img/akubela-ref/plug-uk.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 66, category: 'ZigBee switch / rele', name: 'Smart Plug (US)', desc: '', img: '../assets/img/akubela-ref/plug-us.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 67, category: 'ZigBee switch / rele', name: 'Switch + termostat + rozetka paneli', desc: '', img: '../assets/img/akubela-ref/2f6b62237ce094886cf13d4896f9c2ed.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 68, category: 'ZigBee switch / rele', name: 'Switch Actuator (RS485)', desc: '', img: '../assets/img/akubela-ref/switch-actuator.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 69, category: 'ZigBee switch / rele', name: 'Switch Module (8-Gang, 10A, KNX)', desc: '', img: '../assets/img/akubela-ref/knx-switch-8g10a.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 70, category: 'ZigBee switch / rele', name: 'Switch Module (8-Gang, 16A, KNX)', desc: '', img: '../assets/img/akubela-ref/knx-switch-8g16a.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 71, category: 'ZigBee switch / rele', name: 'Switch Module (28-Gang, 10A, KNX)', desc: '', img: '../assets/img/akubela-ref/knx-switch-28g10a.png', datasheet: '', createdAt: '2026-08-07' },
    // Smart panellar
    { id: 72, category: 'Smart panellar', name: 'Devor switch paneli (3 tugmali)', desc: '', img: '../assets/img/akubela-ref/2a1efd109f34707db04eef076ee3c24b.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 73, category: 'Smart panellar', name: 'Dumaloq smart panel', desc: '', img: '../assets/img/akubela-ref/ff6a747c8bc226e65e8083c803da79db.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 74, category: 'Smart panellar', name: 'HyPanel Lux', desc: '', img: '../assets/img/akubela-ref/HyPanel-Lux-big.jpg', datasheet: '', createdAt: '2026-08-07' },
    { id: 75, category: 'Smart panellar', name: 'Ikki qanotli smart panel', desc: '', img: '../assets/img/akubela-ref/5ff7d6ace90bacef83d135ce7e7bce49.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 76, category: 'Smart panellar', name: 'Mini smart panel', desc: '', img: '../assets/img/akubela-ref/458dcb428640bfa17bde85eca8d195a9.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 77, category: 'Smart panellar', name: 'Smart control panel', desc: '', img: '../assets/img/products/smart-panel.png', datasheet: '', createdAt: '2026-08-07' },
    // Access control
    { id: 78, category: 'Access control', name: 'Smart qulf', desc: '', img: '../assets/img/akubela-ref/395864aca24a14980474e6b7232e92fa.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 79, category: 'Access control', name: 'Smart qulf (kamera bilan)', desc: '', img: '../assets/img/akubela-ref/563b187a7a0c6403a3b5c0bc1bac80a9.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 80, category: 'Access control', name: "Smart qulf (klaviatura bilan)", desc: '', img: '../assets/img/akubela-ref/abd6ccdf6b506de19b5868d8ed752993.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 81, category: 'Access control', name: 'Smart eshik qulfi (dastakli)', desc: '', img: '../assets/img/akubela-ref/b7d689ff75509117fdcb3f14fbf999d3.png', datasheet: '', createdAt: '2026-08-07' },
    // Kirish nazorati kontrollerlari
    { id: 82, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox A01', desc: 'IP Access Control Terminal', img: '../assets/img/akuvox-access/a01.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 83, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox A02', desc: 'IP Access Control Terminal', img: '../assets/img/akuvox-access/a02.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 84, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox A03', desc: 'IP Access Control Terminal', img: '../assets/img/akuvox-access/a03.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 85, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox A05', desc: 'Face Recognition Access Control Terminal', img: '../assets/img/akuvox-access/a05.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 86, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox A08', desc: 'IP Access Control Terminal', img: '../assets/img/akuvox-access/a08.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 87, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox A094', desc: '4 Door Controller', img: '../assets/img/akuvox-access/a094.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 88, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox A095', desc: '4 Door Controller', img: '../assets/img/akuvox-access/a095.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 89, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox ACR-CID01', desc: 'Desktop Card Reader', img: '../assets/img/akuvox-access/acr-cid01.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 90, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox ACR-CID12', desc: 'Desktop Card Reader', img: '../assets/img/akuvox-access/acr-cid12.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 91, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox ACR-CRP12', desc: 'UHF Card Reader', img: '../assets/img/akuvox-access/acr-crp12.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 92, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox Bkey', desc: 'Bluetooth Access Card', img: '../assets/img/akuvox-access/bkey.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 93, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox EC33', desc: 'IP Elevator Access Controller', img: '../assets/img/akuvox-access/ec33.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 94, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox SR01', desc: 'Security Relay', img: '../assets/img/akuvox-access/sr01.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 95, category: 'Kirish nazorati kontrollerlari', name: 'Akuvox UHF-TAG11', desc: 'UHF Card', img: '../assets/img/akuvox-access/uhf-tag11.png', datasheet: '', createdAt: '2026-08-07' },
    // IP telefonlar
    { id: 96, category: 'IP telefonlar', name: 'Akuvox HCP-R15P', desc: 'Health Care Phone for Seniors', img: '../assets/img/akuvox-ipphone/hcp-r15p.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 97, category: 'IP telefonlar', name: 'Akuvox R49G', desc: 'Android IP Video Phone', img: '../assets/img/akuvox-ipphone/r49g.png', datasheet: '', createdAt: '2026-08-07' },
    { id: 98, category: 'IP telefonlar', name: 'Akuvox SP-R50P', desc: 'Entry-level IP Phone', img: '../assets/img/akuvox-ipphone/sp-r50p.png', datasheet: '', createdAt: '2026-08-07' },
  ],
  projects: [
    { id: 1, title: 'ARKAN — Yangi Toshkent', object: '22A', logo: 'AR', desc: 'SHARQ BAHORI, 22A obyekt. Domofon + Smart Home to\'liq jihozlash.', createdAt: '2026-07-21' },
    { id: 2, title: 'GOLD STEP INVEST', object: '32-A / 45-D / 46-A', logo: 'GS', desc: 'Yangi Toshkent obyektlari uchun yechim.', createdAt: '2026-07-25' },
    { id: 3, title: 'AGROMIR BUILDINGS', object: '43-D / 44-B', logo: 'AB', desc: 'Akuvox-AkuBella integratsiyasi.', createdAt: '2026-07-28' },
  ],
  categories: [
    { id: 1, slug: 'domofon', category: 'Domofonlar', title: 'Domofonlar (Akuvox)', desc: "IP domofon panellari, video ko'rish, mobil ilova orqali boshqarish." },
    { id: 2, slug: 'video', category: 'Videoperegovor panellari', title: 'Videoperegovor panellari', desc: "Kirish qismlari uchun HD video va ovozli aloqa panellari." },
    { id: 3, slug: 'sensor', category: 'ZigBee sensorlar', title: 'ZigBee sensorlar', desc: "Harakat, tutun, suv oqishi, ochiq eshik/deraza sensorlari." },
    { id: 4, slug: 'switch', category: 'ZigBee switch / rele', title: 'ZigBee switch / rele', desc: "Yorug'lik va elektr jihozlarni masofadan boshqarish moduli." },
    { id: 5, slug: 'panel', category: 'Smart panellar', title: 'Smart panellar', desc: "Uy/obyektni yagona markazdan boshqarish uchun sensorli panel." },
    { id: 6, slug: 'access', category: 'Access control', title: 'Access control', desc: "Karta, kod va yuzni tanish orqali kirishni nazorat qilish." },
    { id: 7, slug: 'terminal', category: 'Kirish nazorati kontrollerlari', title: 'Kirish nazorati kontrollerlari', desc: "Eshik kontrollerlari, IP kirish terminallari, karta o'quvchilar va aksessuarlar." },
    { id: 8, slug: 'ipphone', category: 'IP telefonlar', title: 'IP telefonlar', desc: "Ofis va uy uchun IP telefonlar." },
  ],
  applications: [
    { id: 1, title: 'Elita villalar', icon: '🏡', image: 'assets/img/applications/residential.jpg', link: '#contact', createdAt: '2026-08-06' },
    { id: 2, title: 'Turar-joy majmualari', icon: '🏢', image: 'assets/img/applications/residential-2wire.jpg', link: '#contact', createdAt: '2026-08-06' },
    { id: 3, title: 'Ofis va biznes markazlari', icon: '🏬', image: 'assets/img/applications/commercial.jpg', link: '#contact', createdAt: '2026-08-06' },
    { id: 4, title: 'Aqlli uy tizimlari', icon: '💡', image: 'assets/img/applications/smart-security.jpg', link: '#contact', createdAt: '2026-08-06' },
  ],
  requests: [
    { id: 1, name: 'Bekzod Qodirov', phone: '+998 90 123 45 67', company: 'ARKAN QURILISH', object: '22A', message: 'Domofon narxlari bo\'yicha KP kerak.', status: 'yangi', createdAt: '2026-08-01' },
    { id: 2, name: 'Sherzod Aliyev', phone: '+998 93 555 11 22', company: 'GOLD STEP INVEST', object: '45-D', message: 'ZigBee to\'plami haqida ma\'lumot.', status: 'ko\'rib chiqilmoqda', createdAt: '2026-08-03' },
    { id: 3, name: 'Dilnoza Rashidova', phone: '+998 97 777 88 99', company: 'MARG\'ILON BINOKOR', object: '44-A', message: 'Access control tizimi o\'rnatish muddati?', status: 'yopilgan', createdAt: '2026-07-30' },
  ],
  posts: [
    { id: 1, title: 'SafeHome — Akuvox rasmiy distributori', excerpt: 'Endi O\'zbekistonda Akuvox mahsulotlari rasmiy hamkorimiz orqali.', image: 'assets/img/applications/residential.jpg', socialUrl: '', createdAt: '2026-06-15' },
  ],
  banner: {
    eyebrow: 'Akuvox rasmiy distributori O\'zbekistonda',
    desc: 'Domofonlar, videoperegovor panellari, ZigBee sensor va switchlar, smart boshqaruv panellari — qurilish tashkilotlari va deviluperlar uchun to\'liq yechim, o\'rnatishdan texnik xizmatgacha.',
  },
  contactInfo: {
    address: '79A Mustaqillik Avenue, Toshkent',
    phone: '+998 90 000 00 00',
    email: 'info@safehome.uz',
    telegram: '@safehome_uz',
  },
  about: {
    title: 'LLC «SAFEHOME» — Akuvox rasmiy distributori',
    desc: 'Qurilish tashkilotlari, deviluperlar va texnik nazorat kompaniyalari bilan ishlaymiz.',
    director: 'Artikbayev B.U.',
    address: '79A Mustaqillik Avenue, Toshkent',
    activity: 'Akuvox domofon, ZigBee sensor/switch, smart panellar',
  },
};

function seedIfEmpty() {
  Object.entries(SEED).forEach(([key, val]) => {
    if (!localStorage.getItem(DB_KEYS[key])) {
      localStorage.setItem(DB_KEYS[key], JSON.stringify(val));
    }
  });
  migrateDefaultProductPhotos();
  migrateFullProductCatalog();
  migratePostImageFields();
}

// One-time migration: browsers that seeded posts before the `image`/`socialUrl`
// fields existed get the seed post's photo backfilled in place (admin-added
// posts and any edited excerpt/title are left untouched).
function migratePostImageFields() {
  const MIGRATION_KEY = 'sh_admin_posts_migrated_v2';
  if (localStorage.getItem(MIGRATION_KEY)) return;

  const raw = localStorage.getItem(DB_KEYS.posts);
  if (raw) {
    const items = JSON.parse(raw).map((p) => {
      if (p.image === undefined) {
        const seedMatch = SEED.posts.find((s) => s.id === p.id);
        return { ...p, image: seedMatch ? seedMatch.image : '', socialUrl: p.socialUrl ?? '' };
      }
      return p;
    });
    localStorage.setItem(DB_KEYS.posts, JSON.stringify(items));
  }
  localStorage.setItem(MIGRATION_KEY, '1');
}

// One-time migration: browsers that seeded products back when the list only had
// 6 placeholder items (one per category) get upgraded to the full ~98-item
// Akuvox catalog. Runs once; any products the admin has added/edited by then
// are preserved by appending them after the fresh catalog import.
function migrateFullProductCatalog() {
  const MIGRATION_KEY = 'sh_admin_products_migrated_v3';
  if (localStorage.getItem(MIGRATION_KEY)) return;

  const raw = localStorage.getItem(DB_KEYS.products);
  const existing = raw ? JSON.parse(raw) : [];
  const seedIds = new Set(SEED.products.map((p) => p.id));
  const adminAdded = existing.filter((p) => !seedIds.has(p.id));
  localStorage.setItem(DB_KEYS.products, JSON.stringify([...SEED.products, ...adminAdded]));
  localStorage.setItem(MIGRATION_KEY, '1');
}

// One-time migration: browsers that already seeded products before real photos
// were added (emoji-only `img`) get upgraded in place, without touching any
// products the admin has since added or edited manually.
function migrateDefaultProductPhotos() {
  const MIGRATION_KEY = 'sh_admin_products_migrated_v2';
  if (localStorage.getItem(MIGRATION_KEY)) return;

  const photoByName = {};
  SEED.products.forEach((p) => { photoByName[p.name] = p.img; });

  const raw = localStorage.getItem(DB_KEYS.products);
  if (raw) {
    const items = JSON.parse(raw).map((p) => {
      const isOldEmojiIcon = typeof p.img === 'string' && !p.img.includes('/');
      if (isOldEmojiIcon && photoByName[p.name]) {
        return { ...p, img: photoByName[p.name] };
      }
      return p;
    });
    localStorage.setItem(DB_KEYS.products, JSON.stringify(items));
  }
  localStorage.setItem(MIGRATION_KEY, '1');
}

function getAll(key) {
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(DB_KEYS[key]) || '[]');
}

function saveAll(key, items) {
  localStorage.setItem(DB_KEYS[key], JSON.stringify(items));
}

function nextId(items) {
  return items.reduce((max, i) => Math.max(max, i.id), 0) + 1;
}

function addItem(key, item) {
  const items = getAll(key);
  item.id = nextId(items);
  items.push(item);
  saveAll(key, items);
  return item;
}

function updateItem(key, id, patch) {
  const items = getAll(key).map(i => (i.id === id ? { ...i, ...patch } : i));
  saveAll(key, items);
}

function deleteItem(key, id) {
  saveAll(key, getAll(key).filter(i => i.id !== id));
}

// --- Banner (singular object, not a list) ---
function getBanner() {
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(DB_KEYS.banner) || 'null') || SEED.banner;
}
function saveBanner(obj) {
  localStorage.setItem(DB_KEYS.banner, JSON.stringify(obj));
}

// --- Contact info (singular object, not a list) ---
function getContactInfo() {
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(DB_KEYS.contactInfo) || 'null') || SEED.contactInfo;
}
function saveContactInfo(obj) {
  localStorage.setItem(DB_KEYS.contactInfo, JSON.stringify(obj));
}

// --- About / company info (singular object, not a list) ---
function getAbout() {
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(DB_KEYS.about) || 'null') || SEED.about;
}
function saveAbout(obj) {
  localStorage.setItem(DB_KEYS.about, JSON.stringify(obj));
}

// --- Auth (demo only — not secure, for local prototype purposes) ---
function isLoggedIn() {
  return sessionStorage.getItem(DB_KEYS.auth) === '1';
}
function login(email, password) {
  if (email === 'admin@safehome.uz' && password === 'safehome2026') {
    sessionStorage.setItem(DB_KEYS.auth, '1');
    sessionStorage.setItem('sh_admin_email', email);
    return true;
  }
  return false;
}
function logout() {
  sessionStorage.removeItem(DB_KEYS.auth);
  window.location.href = 'login.html';
}
function guardAuth() {
  if (!isLoggedIn()) window.location.href = 'login.html';
}
