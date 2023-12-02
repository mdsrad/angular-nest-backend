import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(
  private jwtService: JwtService,
  private authService: AuthService,
  ){ 

}

async canActivate( context: ExecutionContext ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No existe token en la petición');
    }
    
    try {

      const payload = await this.jwtService.verifyAsync(
        token, { secret: process.env.JET_SEED }
      );

      const user = await this.authService.findUserById( payload.id );
      if ( !user ) throw new UnauthorizedException('El usuario no existe');
      if ( !user.isActive ) throw new UnauthorizedException('El usuario no está activo');


      request['user'] = user;

    } catch (error) {
      throw new UnauthorizedException('No esta autorizado');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
