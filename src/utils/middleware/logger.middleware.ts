import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware, Logger } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const {  method, originalUrl } = request;

    response.on("finish", () => {
      const { statusCode } = response;

      this.logger.log(
        `[ ${method} : ${statusCode} ] ${originalUrl}`,
      );
    });

    next();
  }
}