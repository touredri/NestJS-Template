import { Injectable } from '@nestjs/common';
import { CreateGDto } from './dto/create-g.dto';
import { UpdateGDto } from './dto/update-g.dto';

@Injectable()
export class GService {
  create(createGDto: CreateGDto) {
    return 'This action adds a new g';
  }

  findAll() {
    return `This action returns all g`;
  }

  findOne(id: number) {
    return `This action returns a #${id} g`;
  }

  update(id: number, updateGDto: UpdateGDto) {
    return `This action updates a #${id} g`;
  }

  remove(id: number) {
    return `This action removes a #${id} g`;
  }
}
