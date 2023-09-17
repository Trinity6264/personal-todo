import { Request, Response, NextFunction, RequestHandler } from "express";

const AsyncWrapper = (
  fn: (req: Request, res: Response) => Promise<Response>
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};
export default AsyncWrapper;
