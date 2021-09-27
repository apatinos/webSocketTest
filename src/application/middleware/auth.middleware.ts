import { User } from '@domain/entities/user';
import { JwtService } from '@infrastructure/data/provider/auth/jwt/jwt.service';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: any, res: any, next: () => void) {
    throw new Error('Method not implemented.');
  }

  async resolve() {
    return async (req, res, next) => {
      const authorization: string = req.headers.authorization;

      if (authorization && authorization.split(' ')[0] === 'Bearer') {
        const token = authorization.split(' ')[1];
        const user: User = await this.jwtService.verify(token);
        next();
      } else {
        throw new HttpException('Unauthorized access', HttpStatus.BAD_REQUEST);
      }
    };
  }
}
