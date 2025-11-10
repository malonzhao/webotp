import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenPayload } from "../interfaces/token-payload.interface";

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TokenPayload | undefined => {
    const type = ctx.getType();
    if (type === "http") {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    }
    return undefined;
  },
);
