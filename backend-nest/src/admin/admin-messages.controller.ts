import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { IsString } from 'class-validator';
import { AdminGuard } from '../common/guards/admin.guard';
import { ContactsService } from '../contacts/contacts.service';

class DeleteMessageDto {
  @IsString()
  id!: string;
}

@Controller('admin/messages')
export class AdminMessagesController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    const data = await this.contactsService.findAllForAdmin();
    return { data };
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Body() dto: DeleteMessageDto) {
    await this.contactsService.deleteById(dto.id);
    return { success: true };
  }
}
