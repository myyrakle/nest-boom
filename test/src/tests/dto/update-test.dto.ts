import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestDto {
    @ApiProperty({
        example: 'boom',
        description: '값',
        required: true,
    })
    value: string;
}
