import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFooDto extends PartialType(CreateFooDto) {
}
