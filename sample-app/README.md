# Sample App

Aplikasi practice untuk testing dengan Playwright.

## Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan server:
```bash
node server.js
```

3. Buka browser: http://localhost:3000

## Halaman

### 1. Login (login.html)
- **URL:** http://localhost:3000/login.html
- **Username:** admin
- **Password:** password123
- **Fitur:** Remember me, session management

### 2. Contact Form (form.html)
- **URL:** http://localhost:3000/form.html
- **Fitur:** Validasi form, display data setelah submit

### 3. Upload Gambar (upload.html)
- **URL:** http://localhost:3000/upload.html
- **Akses:** Hanya untuk user yang sudah login
- **Fitur:** Drag & drop, preview, upload ke folder sample-app/server

## Folder

```
sample-app/
├── login.html      # Halaman login
├── form.html       # Halaman form kontak
├── upload.html     # Halaman upload gambar
└── server/         # Folder untuk menyimpan gambar yang diupload
```

## Server

- **Port:** 3000
- **Static files:** sample-app/
- **Upload endpoint:** POST /upload
