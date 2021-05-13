#! /usr/bin/env node

const {
    classify,
    dasherize,
} = require("@angular-devkit/core/src/utils/strings");
const { singular } = require("pluralize");
const ejs = require("ejs");
const fse = require("fs-extra");
const path = require("path");
const { writeFile, unlink, access, rename } = require("fs");
const { promisify } = require("util");
const { green, yellow, red, blue } = require("chalk");

const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);
const accessAsync = promisify(access);
const renameAsync = promisify(rename);

console.green = (...args) => console.log(green(args));
console.blue = (...args) => console.log(blue(args));
console.yellow = (...args) => console.log(yellow(args));
console.red = (...args) => console.log(red(args));

const lowercased = (name) => {
    const classifiedName = classify(name);
    return classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1);
};

const ejsContext = {
    singular,
    dasherize,
    classify,
    lowercased,
};

let basePath = ".";

async function run() {
    const [_1, _2, name] = process.argv;

    if (!name) {
        console.blue(`사용 형태`);
        console.blue(`----------`);
        console.log(`nest-boom <리소스 이름>`);
        console.blue(`----------`);
        console.blue(
            `리소스 이름은 snake case, 복수형으로 해주세요. example: "users"`
        );
        return;
    }

    ejsContext.name = name;

    const file_path = path.join(__dirname, "template");

    if (accessAsync("./src")) {
        basePath = "./src";
    }

    await fse.copy(file_path, basePath);
    await Promise.all([
        controller(name),
        model(name),
        module(name),
        service(name),
        createDto(name),
        updateDto(name),
    ]);

    await renameAsync(`${basePath}/temp`, `${basePath}/${name}`);

    console.yellow(`@@@ ${name} 리소스 생성 완료`);
}

async function controller(name) {
    const content = await ejs.renderFile(
        `${basePath}/temp/controller.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/temp/${name}.controller.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/controller.ts`);

    console.green(">>>>> 컨트롤러 생성 완료");
}

async function model(name) {
    const content = await ejs.renderFile(
        `${basePath}/temp/model.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/temp/${singular(name)}.model.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/model.ts`);

    console.green(">>>>> 모델 생성 완료");
}

async function module(name) {
    const content = await ejs.renderFile(
        `${basePath}/temp/module.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/temp/${name}.module.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/module.ts`);

    console.green(">>>>> 모듈 생성 완료");
}

async function service(name) {
    const content = await ejs.renderFile(
        `${basePath}/temp/service.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/temp/${name}.service.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/service.ts`);

    console.green(">>>>> 서비스 생성 완료");
}

async function createDto(name) {
    const content = await ejs.renderFile(
        `${basePath}/temp/dto/create-__name@singular__.dto.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/temp/dto/create-${singular(name)}.dto.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/dto/create-__name@singular__.dto.ts`);

    console.green(">>>>> DTO(Create) 생성 완료");
}

async function updateDto(name) {
    const content = await ejs.renderFile(
        `${basePath}/temp/dto/update-__name@singular__.dto.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/temp/dto/update-${singular(name)}.dto.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/dto/update-__name@singular__.dto.ts`);

    console.green(">>>>> DTO(Update) 생성 완료");
}

run();
