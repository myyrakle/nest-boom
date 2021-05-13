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
export class User  extends Model {
    @Column({
        primaryKey: true,
    })
    id: bigint;

    @Column({
        type: DataType.STRING(15),
        allowNull: false,
    })
    value: string;
}
