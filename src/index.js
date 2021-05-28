#! /usr/bin/env node

const {
    classify,
    dasherize,
} = require("@angular-devkit/core/src/utils/strings");
const { singular } = require("pluralize");
const ejs = require("ejs");
const fse = require("fs-extra");
const path = require("path");
const { writeFile, unlink, access, rename, readFile, existsSync } = require("fs");
const { promisify } = require("util");
const { green, yellow, red, blue } = require("chalk");
const typescript = require('typescript');

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
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

    if (existsSync("./src")) {
        basePath = "./src";
    }

    if (existsSync(`${basePath}/${name}`)) {
        console.red('!!! 동명의 리소스가 이미 존재하네요.');
        return;
    }

    try {
        await fse.copy(file_path, `${basePath}/${name}`);

        await Promise.all([
            controller(name),
            model(name),
            module(name),
            service(name),
            createDto(name),
            updateDto(name),
            updateAppModule(name),
        ]);

        console.yellow(`@@@ ${name} 리소스 생성 완료`);
    } catch (error) {
        console.error(error);
        //await renameAsync(`${basePath}/temp`, `${basePath}/${name}`);
        console.red("!!! 리소스 생성 실패");
    }
}

async function controller(name) {
    const content = await ejs.renderFile(
        `${basePath}/${name}/controller.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/${name}/${name}.controller.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/${name}/controller.ts`);

    console.green(">>>>> 컨트롤러 생성 완료");

    const specContent = await ejs.renderFile(
        `${basePath}/${name}/controller.spec.ts`,
        ejsContext
    );
    const newSpecFileName = `${basePath}/${name}/${name}.controller.spec.ts`;
    await writeFileAsync(newSpecFileName, specContent);
    await unlinkAsync(`${basePath}/${name}/controller.spec.ts`);

    console.green(">>>>> 컨트롤러 테스트파일 생성 완료");
}

async function model(name) {
    const content = await ejs.renderFile(
        `${basePath}/${name}/model.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/${name}/${singular(name)}.model.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/${name}/model.ts`);

    console.green(">>>>> 모델 생성 완료");
}

async function module(name) {
    const content = await ejs.renderFile(
        `${basePath}/${name}/module.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/${name}/${name}.module.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/${name}/module.ts`);

    console.green(">>>>> 모듈 생성 완료");
}

async function service(name) {
    const content = await ejs.renderFile(
        `${basePath}/${name}/service.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/${name}/${name}.service.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/${name}/service.ts`);

    console.green(">>>>> 서비스 생성 완료");

    const specContent = await ejs.renderFile(
        `${basePath}/${name}/service.spec.ts`,
        ejsContext
    );
    const newSpecFileName = `${basePath}/${name}/${name}.service.spec.ts`;
    await writeFileAsync(newSpecFileName, specContent);
    await unlinkAsync(`${basePath}/${name}/service.spec.ts`);

    console.green(">>>>> 서비스 테스트파일 생성 완료");
}

async function createDto(name) {
    const content = await ejs.renderFile(
        `${basePath}/${name}/dto/create-__name@singular__.dto.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/${name}/dto/create-${singular(
        name
    )}.dto.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(
        `${basePath}/${name}/dto/create-__name@singular__.dto.ts`
    );

    console.green(">>>>> DTO(Create) 생성 완료");
}

async function updateDto(name) {
    const content = await ejs.renderFile(
        `${basePath}/${name}/dto/update-__name@singular__.dto.ts`,
        ejsContext
    );
    const newFileName = `${basePath}/${name}/dto/update-${singular(
        name
    )}.dto.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(
        `${basePath}/${name}/dto/update-__name@singular__.dto.ts`
    );

    console.green(">>>>> DTO(Update) 생성 완료");
}

async function updateAppModule(name) {
    // const content = await ejs.renderFile(
    //     `${basePath}/temp/dto/update-__name@singular__.dto.ts`,
    //     ejsContext
    // );
    // const newFileName = `${basePath}/temp/dto/update-${singular(name)}.dto.ts`;
    // await writeFileAsync(newFileName, content);
    // await unlinkAsync(`${basePath}/temp/dto/update-__name@singular__.dto.ts`);

    const moduleCode = `${classify(name)}Module`;
    const importCode = `import { ${moduleCode} } from './${name}/${name}.module'\n`;

    if (existsSync(`${basePath}/app.module.ts`)) {
        const appendModule = require('./append-module');
        const content = importCode + appendModule(`${basePath}/app.module.ts`, moduleCode);
        await writeFileAsync(`${basePath}/app.module.ts`, content);
        
        console.green(">>>>> AppModule 수정 완료");
    } else {
        console.red("!!!!! AppModule 없음");
    }
}

run();
