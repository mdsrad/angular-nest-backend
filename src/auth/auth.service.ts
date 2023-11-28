import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel( User.name ) 
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
  
    try {

      const { password, ...UserData } = createUserDto;
      const newUser = new this.userModel( {
        password: bcryptjs.hashSync( password, 10 ),
        ...UserData
      } );

      await newUser.save();
      const { password:_, ...user} = newUser.toJSON();

      return user;

    } catch (error) {
      if ( error.code === 11000 ) {
        throw new BadRequestException(`${ createUserDto.email } ya existe!!`);
      }
      throw new InternalServerErrorException('Ocurrio algo terrible :(');
    }
  }

  async login( loginDto: LoginDto ){
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email })
    if ( !user ){
      throw new UnauthorizedException('Credenciales no válidas - email');
    }
    if( !bcryptjs.compareSync( password, user.password ) ){
      throw new UnauthorizedException('Credenciales no válidas - password');
    }
    const { password:_, ...rest } = user.toJSON();

    return  {
      user: rest,
      token: this.getJwtoken({ id: user.id }),
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtoken( payload: JwtPayload ){
    const token = this.jwtService.sign( payload );
    return token;
  }
}