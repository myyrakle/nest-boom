import { ApiProperty } from '@nestjs/swagger';

export class UpdateFireDto {
    @ApiProperty({
        example: 'boom',
        description: '값',
        required: true,
    })
    value: string;
}
