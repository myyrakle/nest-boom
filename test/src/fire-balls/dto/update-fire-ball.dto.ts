import { ApiProperty } from '@nestjs/swagger';

export class UpdateFireBallDto {
    @ApiProperty({
        example: 'boom',
        description: '값',
        required: true,
    })
    value: string;
}
