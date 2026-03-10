const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const serverDir = path.join(__dirname, 'sample-app/server');
const dataDir = path.join(__dirname, 'sample-app/server/data');
if (!fs.existsSync(serverDir)) {
    fs.mkdirSync(serverDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const usersFile = path.join(dataDir, 'users.json');

function loadUsers() {
    try {
        if (fs.existsSync(usersFile)) {
            return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        }
    } catch (e) {
        console.error('Error loading users:', e);
    }
    return [];
}

function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, serverDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'image-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

app.use(express.static('sample-app'));

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
        success: true,
        message: 'File uploaded successfully',
        fileName: req.file.filename,
        imageUrl: `http://localhost:${PORT}/sample-app/server/${req.file.filename}`
    });
});

// Multiple upload endpoint
app.post('/upload-multiple', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
        fileName: file.filename,
        imageUrl: `http://localhost:${PORT}/sample-app/server/${file.filename}`
    }));

    res.json({
        success: true,
        message: `${req.files.length} files uploaded successfully`,
        files: uploadedFiles
    });
});

app.use('/sample-app/server', express.static(serverDir));

// Register endpoint
app.post('/register', express.json(), (req, res) => {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
    }
    
    const users = loadUsers();
    
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: 'Username sudah terdaftar' });
    }
    
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
    }
    
    const newUser = {
        id: Date.now(),
        username,
        password,
        email,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    res.json({ success: true, message: 'Pendaftaran berhasil' });
});

// Forgot password endpoint
app.post('/forgot-password', express.json(), (req, res) => {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email dan password baru harus diisi' });
    }
    
    const users = loadUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'Email tidak ditemukan' });
    }
    
    users[userIndex].password = newPassword;
    saveUsers(users);
    
    res.json({ success: true, message: 'Password berhasil diubah' });
});

// Login endpoint
app.post('/login', express.json(), (req, res) => {
    const { username, password } = req.body;
    
    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true, message: 'Login berhasil', username: user.username });
    } else {
        res.status(401).json({ success: false, message: 'Username atau password salah' });
    }
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Upload page: http://localhost:${PORT}/upload.html`);
    console.log(`Uploaded files saved to: ${serverDir}`);
});
