import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GService } from './g.service';
import { CreateGDto } from './dto/create-g.dto';
import { UpdateGDto } from './dto/update-g.dto';

@Controller('g')
export class GController {
  constructor(private readonly gService: GService) {}

  @Post()
  create(@Body() createGDto: CreateGDto) {
    return this.gService.create(createGDto);
  }

  @Get()
  findAll() {
    return this.gService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGDto: UpdateGDto) {
    return this.gService.update(+id, updateGDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gService.remove(+id);
  }
}
