#! /usr/bin/env node

const {classify, dasherize} = require('@angular-devkit/core/src/utils/strings');
const {singular} = require('pluralize');
const ejs = require('ejs');
const fse = require('fs-extra');
const path = require('path');
const { writeFile, unlink, exists, access } = require('fs');
const { promisify } = require('util');

const writeFileAsync  = promisify(writeFile);
const unlinkAsync  = promisify(unlink);
const accessAsync  = promisify(access);

const lowercased = (name) => {
    const classifiedName = classify(name);
    return (
        classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1)
    );
};

const ejsContext = {
    singular,
    dasherize,
    classify,
    lowercased,
};

let basePath = '.';

async function run(){
    const [_1,_2, name] = process.argv;

    if(!name){
        console.log(`사용 형태`)
        console.log(`----------`)
        console.log(`nest-boom <리소스 이름>`)
        console.log(`----------`)
        console.log(`(리소스 이름은 snake case)`)
        return;
    }

    ejsContext.name = name;

    const file_path = path.join(__dirname, 'template');

    if(accessAsync('./src')) {
        basePath = './src';
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
}

async function controller(name){
    const content = await ejs.renderFile(`${basePath}/temp/controller.ts`, ejsContext);
    const newFileName = `${basePath}/temp/${singular(name)}.controller.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/controller.ts`);
}

async function model(name){
    const content = await ejs.renderFile(`${basePath}/temp/model.ts`, ejsContext);
    const newFileName = `${basePath}/temp/${singular(name)}.model.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/model.ts`);
}

async function module(name){
    const content = await ejs.renderFile(`${basePath}/temp/module.ts`, ejsContext);
    const newFileName = `${basePath}/temp/${singular(name)}.module.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/module.ts`);
}

async function service(name){
    const content = await ejs.renderFile(`${basePath}/temp/service.ts`, ejsContext);
    const newFileName = `${basePath}/temp/${singular(name)}.service.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/service.ts`);
}

async function createDto(name){
    const content = await ejs.renderFile(`${basePath}/temp/dto/create-__name@singular__.dto.ts`, ejsContext);
    const newFileName = `${basePath}/temp/dto/create-${singular(name)}.dto.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/dto/create-__name@singular__.dto.ts`);
}

async function updateDto(name){
    const content = await ejs.renderFile(`${basePath}/temp/dto/update-__name@singular__.dto.ts`, ejsContext);
    const newFileName = `${basePath}/temp/dto/update-${singular(name)}.dto.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync(`${basePath}/temp/dto/update-__name@singular__.dto.ts`);
}

run();