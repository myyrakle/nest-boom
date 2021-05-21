import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';

export class UpdateTestDto extends PartialType(CreateTestDto) {
}
