import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({
    summary: 'Récupérer tous les utilisateurs (admin uniquement)',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les utilisateurs.',
  })
  @ApiResponse({
    status: 403,
    description: 'Accès refusé.',
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiResponse({
    status: 200,
    description: 'Détails de l’utilisateur.',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Mettre à jour un utilisateur (authentification requise)',
  })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès.',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé.',
  })
  @ApiResponse({
    status: 403,
    description: 'Accès refusé.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Supprimer un utilisateur (admin uniquement)' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur supprimé avec succès.',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé.',
  })
  @ApiResponse({
    status: 403,
    description: 'Accès refusé.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
