import { PartialType } from '@nestjs/swagger';
import { CreateGDto } from './create-g.dto';

export class UpdateGDto extends PartialType(CreateGDto) {}
