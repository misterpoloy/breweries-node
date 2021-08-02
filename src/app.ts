import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Inicializations
const app = express();

// settings
app.set('port', process.env.port || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`App is running on port ${app.get("port")}.`);
});

export default app;