import cookieParser from 'cookie-parser';
import express from 'express';
import authRouter from './router/auth.routes.js';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser())


// Health check 
app.get('/', (req, res) => {
  res.send('Hello, from VexaCore!');
});

app.use("/api/auth", authRouter)

export default app;