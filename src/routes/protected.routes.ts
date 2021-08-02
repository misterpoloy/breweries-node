import { Router } from 'express';
import passport from 'passport';
import { breweries } from '../controllers/breweries.controller'

const router = Router();

router.get(
  '/breweries',
  passport.authenticate('jwt', { session: false }),
  breweries
);
 
export default router;