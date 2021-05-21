import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Create<%= singular(classify(name)) %>Dto } from './create-<%= singular(name) %>.dto';

export class Update<%= singular(classify(name)) %>Dto extends PartialType(Create<%= singular(classify(name)) %>Dto) {
}
