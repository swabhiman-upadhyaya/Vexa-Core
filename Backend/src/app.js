import cookieParser from 'cookie-parser';
import express from 'express';
import authRouter from './router/auth.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import chatRouter from './router/chat.routes.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies to be sent
}));


// Health check 
app.get('/', (req, res) => {
  res.send('Hello, from VexaCore!');
});

app.use("/api/auth", authRouter)
app.use("/api/chats", chatRouter)

export default app;