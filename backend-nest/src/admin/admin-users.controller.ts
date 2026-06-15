import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IsString } from 'class-validator';
import { AdminGuard } from '../common/guards/admin.guard';
import { UsersService } from '../users/users.service';

class UpdateUserRoleDto {
  @IsString()
  role!: string;
}

@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    const users = await this.usersService.findAllForAdmin();
    return { data: users };
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateRole(@Param('id') id: string, @Body() dto: UpdateUserRoleDto) {
    const data = await this.usersService.updateRole(id, dto.role);
    return { data };
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return { success: true };
  }
}
