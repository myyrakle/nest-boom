import { Injectable } from "@nestjs/common";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { Sequelize } from "sequelize-typescript";
import { InjectModel } from "@nestjs/sequelize";
import { Transaction } from "sequelize";
import { Test } from "./test.model";

@Injectable()
export class TestsService {
    constructor(
        @InjectModel(Test)
        private readonly testModel: typeof Test,
        private readonly sequelize: Sequelize
    ) {}

    async create(createTestDto: CreateTestDto, transaction?: Transaction) {
        return await this.testModel.create({ ...createTestDto });
    }

    async findAll() {
        return await this.testModel.findAll();
    }

    async findOne(id: number) {
        return await this.testModel.findOne({
            where: {
                id,
            },
        });
    }

    async update(
        id: number,
        updateTestDto: UpdateTestDto,
        transaction?: Transaction
    ) {
        return await this.testModel.update(
            { ...updateTestDto },
            {
                where: {
                    id,
                },
                transaction,
            }
        );
    }

    async remove(id: number, transaction?: Transaction) {
        return await this.testModel.update(
            { useYn: true },
            {
                where: {
                    id,
                },
                transaction,
            }
        );
    }
}
