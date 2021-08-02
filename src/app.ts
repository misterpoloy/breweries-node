import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport'
import passportMiddleware from './middlewares/passport';
import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';

// Inicializations
const app = express();

// settings
app.set('port', process.env.port || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// routes
app.use(authRoutes)
app.use(protectedRoutes);

export default app;