import { ApiProperty } from '@nestjs/swagger';

export class CreateFooDto {
    @ApiProperty({
        example: 'boom',
        description: '값',
        required: true,
    })
    value: string;
}
