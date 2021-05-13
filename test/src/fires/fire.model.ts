import {
    Model,
    Table,
    Column,
    HasMany,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    Sequelize,
    HasOne,
    DefaultScope,
    Scopes,
    Index,
    createIndexDecorator,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    AllowNull,
  } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
    //tableName: 'tb_sample',
    paranoid: true,
    freezeTableName: true,
    // timestamps: false,
    // createdAt: false,
    // updatedAt: false,
    // deletedAt: false,
    // schema: 'cp',
})
export class Fire extends Model {
    @ApiProperty({
        example: 1,
        description: '기본식별자',
    })
    @Column({
        primaryKey: true,
    })
    id: bigint;

    @ApiProperty({
        example: 'boom',
        description: '값 컬럼',
    })
    @Column({
        type: DataType.STRING(15),
        allowNull: false,
    })
    value: string;
}
