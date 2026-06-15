import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminService } from './admin.service';

@Controller('admin/dashboard')
export class AdminDashboardController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(AdminGuard)
  async getDashboard() {
    const data = await this.adminService.getDashboard();
    return { data };
  }
}
