import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) { }
  async use(req: Request, next: () => void) {
    const token = req.headers['accesstoken']

    if (!token) {
      throw new UnauthorizedException('No access token found')
    }

    const decoded = await this.jwtService.decode(token)

    const email = decoded.email

    console.log("email", email);

    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: email
      }
    })

    if (!userExists) {
      throw new NotFoundException('No such user found in db')
    }

    next();
  }
}

// todo implement this middleware
