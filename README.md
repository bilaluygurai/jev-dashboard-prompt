# 🎯 Jev Dashboard Prompt

**Claude ile Jev karar modeli dashboard'u oluşturmak için hazırlanmış kapsamlı prompt.**

<div align="center">

![TanStack AI](https://img.shields.io/badge/TanStack-AI-orange?style=for-the-badge)
![Claude](https://img.shields.io/badge/Claude-Prompt-blueviolet?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-7-blue?style=for-the-badge&logo=typescript)

**[Prompt İçeriği](#-prompt-içeriği)** • **[Nasıl Kullanılır](#-nasıl-kullanılır)** • **[Ne Üretir](#-ne-üretir)**

</div>

---

## 📖 Hakkında

Bu repo, **TypeSafe AI'ın Jev karar modelini** test edebileceğiniz modern bir web arayüzü oluşturmak için hazırlanmış kapsamlı bir Claude prompt'u içerir.

**Prompt'u Claude'a verdiğinizde:**
- ✅ Next.js 16 + TypeScript 7 projesi
- ✅ TanStack AI SDK entegrasyonu
- ✅ 3 karar tipi desteği (Boolean, Choice, Score)
- ✅ Modern, yan yana layout tasarım
- ✅ Server-side API güvenliği
- ✅ Çalışır durumda tam proje

---

## 🚀 Nasıl Kullanılır

### 1️⃣ Prompt'u İndir

**[INITIAL_PROMPT.txt](INITIAL_PROMPT.txt)** dosyasını indir veya içeriğini kopyala.

### 2️⃣ Claude'a Ver

Prompt'u **Claude Code** (desktop app) veya **claude.ai**'ye yapıştır:

```
GÖREV: Jev karar modelini kullanabileceğim basit bir web arayüzü kur.

## 🎯 Amaç
Jev'i test edebileceğim, farklı durumlarda nasıl karar verdiğini görebileceğim bir dashboard.

...
```

### 3️⃣ API Key Ekle

Claude projeyi oluşturduktan sonra `.env.local` dosyasına API key'ini ekle:

```env
JEV_PROVIDER=vercel
AI_GATEWAY_API_KEY=your_api_key_here
```

### 4️⃣ Çalıştır

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) aç! 🎉

---

## 📦 Ne Üretir

Prompt, Claude'un şu dosyaları oluşturmasını sağlar:

```
jev-dashboard/
├── app/
│   ├── page.tsx          # Ana UI (yan yana layout, 3 karar tipi)
│   ├── globals.css       # Tailwind v4 + gradients
│   └── layout.tsx        # Root layout
├── lib/
│   ├── types.ts          # TypeScript tipleri
│   ├── decide-action.ts  # Server action (Jev API çağrısı)
│   └── jev-decider.ts    # Sağlayıcı adaptörü
├── .env.local            # API keys (oluşturulacak)
├── package.json          # Bağımlılıklar
├── tailwind.config.ts    # Tailwind v4
└── tsconfig.json         # TypeScript config
```

---

### 🎨 Modern Tasarım
- Yan yana layout (sol: input, sağ: sonuçlar)
- Violet-purple-fuchsia gradients
- Glass morphism efektleri
- Responsive & compact

### 🧠 3 Karar Tipi

| Tip | Ne Yapar | Örnek |
|-----|----------|-------|
| **Boolean** | Evet/Hayır | Müşteri memnun mu? → ✓/✗ + %85 |
| **Choice** | Seçeneklerden biri | Kategori → "fatura" + %85 + dağılım |
| **Score** | Sıralı seviyeler | Memnuniyet → "yuksek" + %70 + 0.75 |

### 🚀 Dinamik Sorular
- İstediğiniz tipte soru ekleyin/silin
- Field, instructions, seçenekleri düzenleyin
- Hazır test senaryosu ile hızlı başlangıç

### 📊 Sonuç Gösterimi
- Olasılık yüzdesi (probability)
- Dağılım grafikleri (choice için)
- Ham score değeri (score için)
- Raw JSON görüntüleyici

---

## 💡 Prompt İçeriği

Prompt şunları içerir:

### 📋 Teknik Gereksinimler
- Next.js 16 App Router + TypeScript 7
- TanStack AI SDK (`@tanstack/ai`)
- Tailwind CSS v4
- Server Actions (güvenli API çağrıları)

### 🎨 Tasarım İstekleri
- Yan yana layout (sol: input, sağ: sonuçlar)
- Modern gradient renk paletleri
- Glass morphism efektleri
- Compact & minimalist

### 🧠 Soru Tipleri
- **Boolean**: Evet/Hayır kararları
- **Choice**: Seçenekler arasından seçim
- **Score**: Sıralı seviyelerle ölçüm

### 🔧 Sağlayıcı Desteği
- Vercel AI Gateway
- TypeSafe doğrudan
- OpenRouter üzerinden

### ⚠️ Önemli Notlar
- `boolean`, `choice`, `decide`, `score` → `@tanstack/ai`'dan import
- Tailwind v4: `@import "tailwindcss"` syntax
- Score tipinde `legend` parametresi YOK
- TanStack AI'da `confidence` YOK, sadece `probability`

---

## 📸 Örnek Ekran Görüntüsü

Prompt ile oluşturulan dashboard:

- **Sol panel**: Durum textarea + dinamik sorular listesi
- **Sağ panel**: Kararlar (değer, olasılık, dağılım)
- **Tasarım**: Violet-purple-fuchsia gradients, glass morphism
- **Test senaryosu**: Ödeme sorunu müşteri mesajı

---

## 🧪 Test Senaryosu

Prompt, hazır bir test senaryosu içerir:

**Durum:**
```
3 gün önce 1.200 TL ödeme yapıldı ama premium aktif değil.
Yarın sunum var, bugün çözülmezse iptal edilecek.
```

**Varsayılan sorular:**
- `kategori` (choice) → satis, destek, fatura, yonetim
- `oncelik` (choice) → dusuk, orta, yuksek, kritik
- `ton` (choice) → notr, mutlu, endiseli, kizgin

**Beklenen sonuç:**
- kategori → **fatura** (~85%)
- oncelik → **yuksek/kritik** (~75%)
- ton → **kizgin/endiseli** (~80%)

---

## 🔗 Kaynaklar

### API Key Alma
- **Vercel AI Gateway**: [vercel.com/ai](https://vercel.com/ai)
- **TypeSafe AI**: [typesafe.ai](https://typesafe.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai)

### Dökümanlar
- **TanStack AI SDK**: [tanstack.com/ai](https://tanstack.com/ai)
- **Jev Model**: [TypeSafe AI Docs](https://docs.typesafe.ai)
- **Next.js 16**: [nextjs.org](https://nextjs.org)
- **Tailwind CSS v4**: [tailwindcss.com](https://tailwindcss.com)

---

## 📞 İletişim

**Proje Sahibi:** [Bilal Uygurai](https://github.com/bilaluygurai)

Sorularınız için [issue açın](https://github.com/bilaluygurai/jev-dashboard/issues) veya [discussions](https://github.com/bilaluygurai/jev-dashboard/discussions) kullanın.

---

<div align="center">

**⭐ Prompt'u beğendiyseniz repo'ya yıldız vermeyi unutmayın!**

Made with ❤️ by [Bilal Uygurai](https://github.com/bilaluygurai)

</div>
