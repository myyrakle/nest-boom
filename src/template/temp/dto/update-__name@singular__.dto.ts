import { ApiProperty } from '@nestjs/swagger';

export class Update<%= singular(classify(name)) %>Dto {
    @ApiProperty({
        example: 'boom',
        description: '값',
        require: true,
    })
    value: string;
}
