const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieValidator = require('cookie-validator');
const session = require('express-session')
const passport = require('passport');
const authRoutes = require('./route/authRoute')
const { createServer } = require('node:http');
const { Server } = require('socket.io'); // ดึง Server จาก socket.io
const NodeMediaServer = require('node-media-server');
const { spawn } = require('child_process');
const path = require('path');
require('./config/passport-setup');

const port = process.env.PORT || 3001;

const app = express()
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'supersecretkey', // คีย์สำหรับการเข้ารหัส session
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cors({
    origin: 'http://localhost:5173', // อนุญาตให้เข้าถึงจาก front-end Vite
    credentials: true, // หากมีการใช้ session หรือ cookies
}));

const server = createServer(app);   

const io = new Server (server ,{
    cors:{
        origin: ["http://localhost:5173","http://localhost:5173/Live"],
        methods: ["GET","POST"],
    }
})



app.get('/', (req, res) => {
    res.send("Connected to Server");
});

io.on('connection', (socket) => {

    socket.username = 'Anonymous';

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.username}, Socket ID: ${socket.id}`);
    });

    socket.on("change_username", (data) => {
        socket.username = data.username || 'Anonymous'; // ตั้งค่าเป็น Anonymous ถ้าไม่ได้ส่ง username มา
        console.log(`Username changed to: ${socket.username}`);
    });
    
    socket.on('new_message', (data) => {
        if(data.message)
        io.sockets.emit("receive_message", { message: data.message, username: socket.username });
    });
    
    console.log(`${socket.username} Is connected`)
});

// MiddleWare
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/login', (req, res) => {
    res.json({ message: 'Welcome to the API', loginUrl: '/auth/google' });
});

app.post('/rtmp/:key', (req, res) => {
    const streamKey = req.params.key;

    // ใช้ FFmpeg เพื่อแปลง RTMP เป็น HLS
    const ffmpeg = spawn('ffmpeg', [
        '-i', `rtmp://localhost/live/${streamKey}`,
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-g', '50',
        '-sc_threshold', '0',
        '-f', 'hls',
        '-hls_time', '4',
        '-hls_list_size', '6',
        '-hls_flags', 'delete_segments',
        path.join(__dirname, 'public', 'stream.m3u8') // เส้นทางไปยังโฟลเดอร์ public
    ]);

    ffmpeg.stderr.on('data', (data) => {
        console.log(`FFmpeg stderr: ${data}`);
    });

    ffmpeg.on('close', (code) => {
        console.log(`FFmpeg process closed with code ${code}`);
    });

    res.sendStatus(200);
});


server.listen(port,()=>{
    console.log(`Running on port : ${port}`)
})