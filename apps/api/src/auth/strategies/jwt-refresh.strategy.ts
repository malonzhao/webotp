import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || "default-refresh-secret",
      passReqToCallback: true,
    });
  }

  async validate(payload: TokenPayload) {
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
