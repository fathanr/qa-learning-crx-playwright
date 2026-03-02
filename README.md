# 🎯 Playwright CRX - Learn by Doing

A practical learning project to master Playwright CRX for automated testing.

## 📚 Apa yang Akan Dipelajari?

- **Recording** - Record test actions langsung dari browser
- **Playback** - Jalankan recorded scripts
- **Assertions** - Record validations dan assertions
- **Export** - Export ke TypeScript/JavaScript
- **Best Practices** - Optimasi dan structure project

## 🔧 Installation

### 1. Install Playwright CRX Extension
[Buka Chrome Web Store](https://chromewebstore.google.com/detail/playwright-crx/jambeljnbnfbkcpnoiaedcabbgmnnlcd) lalu klik **Add to Chrome**

### 2. Setup Project Lokal

```bash
# Clone project
cd playwright-qa

# Install dependencies
npm install

# Install browsers
npx playwright install chromium
```

## 🚀 Quick Start

### Cara Menggunakan Playwright CRX:

1. **Buka Chrome** dan install extension Playwright CRX
2. **Buka halaman** yang ingin di-test (bisa gunakan contoh di bawah)
3. **Klik icon** Playwright CRX di toolbar
4. **Klik "New Recording"** dan pilih tab target
5. **Lakukan actions** (click, fill, dll)
6. **Tambahkan assertions** dengan klik icon assertion
7. **Stop Recording** dan lihat hasilnya
8. **Export** ke TypeScript

## 📱 Sample Apps untuk Latihan

Buka file ini di browser untuk latihan:

```
playwright-qa/sample-app/login.html
playwright-qa/sample-app/form.html
playwright-qa/sample-app/todomvc.html
```

Atau gunakan sample online:

- https://demo.playwright.dev/todomvc
- https://example.com
- https://the-internet.herokuapp.com/login

## 📁 Struktur Project

```
playwright-qa/
├── sample-app/           # Sample apps untuk latihan
│   ├── login.html       # Login form
│   ├── form.html        # Contact form
│   └── todomvc.html     # Todo app
├── tests/               # Test files
│   ├── basics/          # Basic examples
│   ├── assertions/      # Assertion examples
│   └── pom/             # Page Object Model
├── pages/               # Page Objects
├── fixtures/            # Test data
├── utils/               # Helpers
├── playwright.config.ts
└── package.json
```

## 🧪 Jalankan Tests

```bash
# Run all tests
npm test

# Run specific folder
npm run test:basics
npm run test:assertions

# Run dengan UI
npm run test:ui

# Run dengan debug
npm run test:debug
```

## 📖 Materi Pembelajaran

### Hari 1: Dasar-Dasar
- Install & setup
- Recording pertama
- Understanding generated code

### Hari 2: Intermediate  
- Multiple tabs
- Assertions
- Script optimization

### Hari 3: Advanced
- Real project application
- Debugging
- CI/CD integration

Lihat Timeline lengkap: `training-materials/TIMELINE_3_HARI.html`

## 💻 Contoh Test (Setelah Recording)

```typescript
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Fill form
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  
  // Assert
  await expect(page.locator('.welcome')).toContainText('testuser');
});
```

## 🔗 Referensi

- [Playwright CRX - Chrome Web Store](https://chromewebstore.google.com/detail/playwright-crx/jambeljnbnfbkcpnoiaedcabbgmnnlcd)
- [Playwright Documentation](https://playwright.dev)
- [Playwright CRX GitHub](https://github.com/ruifigueira/playwright-crx)

## 📝 Lisensi

MIT - Free untuk pembelajaran.

---

**Happy Testing! 🚀**
