import {Request, Response} from 'express'

export const breweries = (req: Request, res: Response) => {
  return res.json({ msg: `Hey ${req.body.email}, breweries!` });
};