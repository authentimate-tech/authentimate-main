import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction)=> {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      return res.status(StatusCodes.).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};
