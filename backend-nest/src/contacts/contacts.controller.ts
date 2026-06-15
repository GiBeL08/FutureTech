import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactDto } from './dto/contact.dto';

@Controller('contact')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: ContactDto) {
    const message = await this.contactsService.create(dto);
    return { success: true, data: { id: message.id } };
  }
}
