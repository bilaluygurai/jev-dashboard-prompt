# 🎯 Jev Dashboard

Modern, güzel tasarımlı web arayüzü ile **Jev karar modelini** test edin. TypeSafe AI'ın güçlü karar motoru artık parmaklarınızın ucunda!

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-7-blue?style=for-the-badge&logo=typescript)
![TanStack AI](https://img.shields.io/badge/TanStack-AI-orange?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

**[Demo](#-hızlı-başlangıç)** • **[Özellikler](#-özellikler)** • **[Kullanım](#-kullanım)** • **[API](#-api-entegrasyonu)**

</div>

---

## ✨ Özellikler

### 🎨 Modern & Minimal Tasarım
- **Yan Yana Layout** - Sol panel: input, Sağ panel: sonuçlar
- **Violet-Purple-Fuchsia Gradients** - Göz alıcı renk paletleri
- **Glass Morphism** - Backdrop blur efektleri
- **Responsive** - Mobil ve desktop uyumlu
- **Compact UI** - Kaydırma gerektirmeyen sıkı yerleşim

### 🧠 3 Karar Tipi

| Tip | Kullanım | Örnek |
|-----|----------|-------|
| **Boolean** | Evet/Hayır kararları | Müşteri memnun mu? ✓/✗ |
| **Choice** | Seçeneklerden birini seç | Kategori: satis, destek, fatura |
| **Score** | Sıralı seviyelerde ölçüm | Memnuniyet: düşük → yüksek (0-1 score) |

### 🚀 Dinamik Soru Yönetimi
- ➕ İstediğiniz tipte soru ekleyin
- ✏️ Field, instructions ve seçenekleri düzenleyin
- 🗑️ Gereksiz soruları silin
- 📝 Hazır örnekle hızlı test

### 📊 Zengin Sonuç Gösterimi
- **Olasılık yüzdesi** - Her kararın güven seviyesi
- **Dağılım grafikleri** - Choice tipinde tüm seçeneklerin skorları
- **Ham score değeri** - Score tipinde 0.0-1.0 arası sayısal sonuç
- **Raw JSON** - Geliştiriciler için tam API yanıtı

---

## 🚀 Hızlı Başlangıç

### 1️⃣ Projeyi İndirin

```bash
git clone https://github.com/bilaluygurai/jev-dashboard.git
cd jev-dashboard
```

### 2️⃣ Bağımlılıkları Kurun

```bash
npm install
```

### 3️⃣ API Anahtarını Yapılandırın

`.env.local` dosyası oluşturun:

```env
JEV_PROVIDER=vercel
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_api_key_here
```

> 💡 **API Key nasıl alınır?**
> - Vercel AI Gateway: [vercel.com/ai](https://vercel.com/ai)
> - TypeSafe doğrudan: [typesafe.ai](https://typesafe.ai)
> - OpenRouter üzerinden: [openrouter.ai](https://openrouter.ai)

### 4️⃣ Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın 🎉

---

## 💡 Kullanım

### Adım Adım Test

1. **📥 Örnek Yükle** butonuna basın
   - Gerçekçi bir müşteri senaryosu yüklenir (ödeme sorunu)
   
2. **🔍 Varsayılan Soruları İnceleyin**
   - 3 choice sorusu hazır durumda:
     - `kategori` → satis, destek, fatura, yonetim
     - `oncelik` → dusuk, orta, yuksek, kritik
     - `ton` → notr, mutlu, endiseli, kizgin

3. **🚀 Kararları Al** butonuna tıklayın
   - Jev durumu analiz eder (~2-3 saniye)
   
4. **📊 Sonuçları İnceleyin**
   - Sağ panelde kararları görün
   - Dağılım grafiklerini kontrol edin
   - Ham JSON'u açarak detaylara bakın

### Özel Soru Ekleme

**Boolean Sorusu:**
```typescript
Alan: musteri_memnun
Instructions: Müşteri genel olarak memnun mu?
// Sonuç: true/false + olasılık
```

**Choice Sorusu:**
```typescript
Alan: departman
Instructions: Bu mesaj hangi departmana gitmeli?
Seçenekler:
  satis → "Satış talebi, demo, fiyat"
  destek → "Teknik sorun, yardım"
  fatura → "Ödeme, abonelik, iade"
// Sonuç: "fatura" + %85 + dağılım
```

**Score Sorusu:**
```typescript
Alan: memnuniyet_seviyesi
Instructions: Müşterinin memnuniyet seviyesi?
Seviyeler:
  cok_dusuk → "Çok memnuniyetsiz"
  dusuk → "Hayal kırıklığı"
  orta → "Nötr"
  yuksek → "Memnun"
  cok_yuksek → "Övgü dolu"
// Sonuç: "yuksek" + %70 + score: 0.75
```

---

## 🏗️ Proje Yapısı

```
jev-dashboard/
├── app/
│   ├── page.tsx              # Ana UI bileşeni (395 satır)
│   │                         # - State yönetimi
│   │                         # - QuestionCard, ResultCard bileşenleri
│   │                         # - Yan yana grid layout
│   ├── globals.css           # Tailwind v4 config
│   └── layout.tsx            # Root layout
│
├── lib/
│   ├── types.ts              # TypeScript type tanımları
│   │                         # - Question, DecisionRequest/Response
│   │                         # - BooleanResult, ChoiceResult, ScoreResult
│   │
│   ├── decide-action.ts      # Server Action (Jev API çağrısı)
│   │                         # - Giriş doğrulama
│   │                         # - TanStack AI formatına çevirme
│   │                         # - Sonuç dönüştürme
│   │
│   └── jev-decider.ts        # Sağlayıcı adaptörü
│                             # - Vercel Gateway
│                             # - TypeSafe (hazır)
│                             # - OpenRouter (hazır)
│
├── .env.local                # API anahtarları (git'e eklenmez)
├── package.json              # Bağımlılıklar
├── tailwind.config.ts        # Tailwind v4 config
└── postcss.config.mjs        # PostCSS + Tailwind plugin
```

---

## 🔧 API Entegrasyonu

### Sağlayıcı Değiştirme

`.env.local` dosyasında `JEV_PROVIDER` değişkenini değiştirin:

```env
# Seçenek 1: Vercel AI Gateway (önerilen)
JEV_PROVIDER=vercel
AI_GATEWAY_API_KEY=vck_xxxxx

# Seçenek 2: TypeSafe doğrudan (paketi yükleyin)
JEV_PROVIDER=typesafe
TYPESAFE_API_KEY=ts_xxxxx

# Seçenek 3: OpenRouter üzerinden (paketi yükleyin)
JEV_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-xxxxx
```

### Server Action Kullanımı

```typescript
// lib/decide-action.ts
import { boolean, choice, decide, score } from "@tanstack/ai";
import { getJevDecider } from "./jev-decider";

export async function makeDecision(request: DecisionRequest) {
  const adapter = await getJevDecider();
  
  const result = await decide({
    adapter,
    state: request.state,
    questions: {
      is_urgent: boolean({
        instructions: "Bu talep acil mi?"
      }),
      category: choice({
        instructions: "Kategori nedir?",
        options: {
          sales: "Satış talebi",
          support: "Destek talebi"
        }
      }),
      priority: score({
        instructions: "Öncelik seviyesi?",
        levels: ["low", "medium", "high", "critical"]
      })
    }
  });
  
  return result;
}
```

---

## 🎨 Tasarım Detayları

### Renk Paleti

```css
/* Gradients */
Background: violet-50 → purple-50 → fuchsia-50
Buttons: violet-600 → fuchsia-600
Headings: violet-600 → purple-600 → fuchsia-600

/* Type Colors */
Boolean: emerald-500 → teal-500
Choice: blue-500 → indigo-500
Score: violet-500 → purple-500
```

### Layout Breakpoints

- **Mobile (< 1024px)**: Tek kolon, dikey scroll
- **Desktop (≥ 1024px)**: İki kolon yan yana (`lg:grid-cols-2`)

### Animasyonlar

- **Hover efektleri** - Kartlar ve butonlarda scale/shadow
- **Focus states** - Violet ring (ring-violet-400)
- **Transitions** - Smooth all (transition-all)
- **Custom scrollbar** - Sorular listesi için minimal scrollbar

---

## 🧪 Test Senaryoları

### 1. Ödeme Sorunu (Varsayılan Örnek)

**Durum:**
```
3 gün önce 1.200 TL ödeme yapıldı ama premium aktif değil.
Yarın sunum var, bugün çözülmezse iptal edilecek.
```

**Beklenen Sonuçlar:**
- `kategori` → **fatura** (~85%)
- `oncelik` → **yuksek** veya **kritik** (~75%)
- `ton` → **kizgin** veya **endiseli** (~80%)

### 2. Müşteri Geri Bildirimi (Score Testi)

**Durum:**
```
Premium planı kullanıyorum. Genel olarak memnunum ama bazı eksiklikler var.
Arayüz güzel, destek hızlı. Fiyat biraz yüksek ama makul.
Mobil uygulama yavaş. Dokümantasyon iyileştirilebilir.
Arkadaşlarıma öneririm ama mobil uygulamayı düzeltin.
```

**Score Soruları:**
```typescript
genel_memnuniyet → "cok_dusuk", "dusuk", "orta", "yuksek", "cok_yuksek"
tavsiye_olasiligi → "asla", "dusuk", "orta", "yuksek", "kesin"
aciliyet → "dusuk", "orta", "yuksek"
```

**Beklenen Sonuçlar:**
- `genel_memnuniyet` → **yuksek** (~70%, score: 0.75)
- `tavsiye_olasiligi` → **yuksek** (~65%, score: 0.70)
- `aciliyet` → **orta** (~60%, score: 0.50)

---

## 🛠️ Teknolojiler

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| **Next.js** | 16 | App Router, Server Actions |
| **React** | 19 | UI bileşenleri, hooks |
| **TypeScript** | 7 | Tip güvenliği |
| **TanStack AI** | Latest | Jev entegrasyonu |
| **Tailwind CSS** | v4 | Styling (yeni @import syntax) |
| **PostCSS** | Latest | Tailwind processing |

### Önemli Notlar

- ✅ **Server-side API calls** - API key tarayıcıya gönderilmez
- ✅ **Type-safe** - TypeScript ile tam tip desteği
- ✅ **Modern Tailwind v4** - `@import "tailwindcss"` syntax
- ✅ **No confidence field** - TanStack AI sadece `probability` döner
- ✅ **Score API** - `legend` parametresi YOK, sadece `levels`

---

## 📦 Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Vercel Deploy

```bash
npm install -g vercel
vercel
```

Environment variables ekleyin:
- `JEV_PROVIDER=vercel`
- `AI_GATEWAY_API_KEY=your_key`

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. **Fork** edin
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing`)
5. **Pull Request** açın

### Geliştirme Notları

- ESLint ve Prettier kullanın
- TypeScript strict mode aktif
- Component testleri yazın (Jest + React Testing Library)
- Semantic commit messages (`feat:`, `fix:`, `docs:`, etc.)

---

## 📄 Lisans

Bu proje [MIT License](LICENSE) ile lisanslanmıştır.

---

## 🙏 Teşekkürler

- [TypeSafe AI](https://typesafe.ai) - Jev karar modeli
- [TanStack](https://tanstack.com) - AI SDK
- [Vercel](https://vercel.com) - AI Gateway & Hosting
- [Tailwind CSS](https://tailwindcss.com) - Styling framework

---

## 📞 İletişim

**Proje Sahibi:** [Bilal Uygurai](https://github.com/bilaluygurai)

**Sorular & Destek:**
- 🐛 [Issue açın](https://github.com/bilaluygurai/jev-dashboard/issues)
- 💬 [Discussions](https://github.com/bilaluygurai/jev-dashboard/discussions)
- 📧 Email: [İletişim formu](https://github.com/bilaluygurai)

---

<div align="center">

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ and ☕ by [Bilal Uygurai](https://github.com/bilaluygurai)

</div>
