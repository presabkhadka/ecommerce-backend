import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt'
import { signupDto } from './dto/signup-auth.dto';
import { loginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  private async createHash(password: string) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }

  private async generateToken(email: string): Promise<string> {
    const payload = {
      email
    }

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET
    })

    return token
  }

  async signup(dto: signupDto) {
    const { name, address, email, password, contactNumber } = dto

    const userExists = await this.prismaService.user.findFirst({
      where: {
        name
      }
    })

    if (userExists) {
      throw new ConflictException('User already exists')
    }

    const hashedPassword = await this.createHash(password)

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        address,
        email,
        password: hashedPassword,
        contactNumber
      }
    })

    return {
      message: 'User created successfully',
      data: newUser
    }

  }


  async login(dto: loginDto) {
    const { email, password } = dto

    const userExists = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })

    if (!userExists) {
      throw new NotFoundException('No such user found')
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect credentials, Please try again')
    }

    const token = await this.generateToken(userExists.email)

    return {
      message: 'Logged in successfully',
      accessToken: token
    }
  }
}
