import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFireDto } from './create-fire.dto';

export class UpdateFireDto extends PartialType(CreateFireDto) {
}
