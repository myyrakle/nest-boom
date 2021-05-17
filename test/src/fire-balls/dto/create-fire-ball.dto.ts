import { ApiProperty } from '@nestjs/swagger';

export class CreateFireBallDto {
    @ApiProperty({
        example: 'boom',
        description: '값',
        required: true,
    })
    value: string;
}
