import { ApiProperty } from '@nestjs/swagger';

export class CreateFireDto {
    @ApiProperty({
        example: 'boom',
        description: '값',
        required: true,
    })
    value: string;
}
