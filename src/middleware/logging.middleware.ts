import { NextFunction } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`Request logged: ${req.method}`);
  if (req.body) console.log(`Request body :::${JSON.stringify(req.body)}`);
  next();
};
