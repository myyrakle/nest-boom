import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
    @ApiProperty({
        example: 'boom',
        description: '값',
        required: true,
    })
    value: string;
}
