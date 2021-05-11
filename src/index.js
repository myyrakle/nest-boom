#! /usr/bin/env node

const {classify, dasherize} = require('@angular-devkit/core/src/utils/strings');
const {singular} = require('pluralize');
const ejs = require('ejs');
const fse = require('fs-extra');
const path = require('path');
const { writeFile, unlink } = require('fs');
const { promisify } = require('util');

const writeFileAsync  = promisify(writeFile);
const unlinkAsync  = promisify(unlink);

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

async function run(){
    const [_1,_2, name] = process.argv;
    console.log('인자값: ', name);
    console.log('classify: ', classify(name))
    console.log('singular: ', singular(name))
    console.log('singular(classify): ', singular(classify(name)))

    ejsContext.name = name;

    const file_path = path.join(__dirname, 'template');

    await fse.copy(file_path, './');
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
    const content = await ejs.renderFile('./temp/controller.ts', ejsContext);
    const newFileName = `./temp/${singular(name)}.controller.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync('./temp/controller.ts');
}

async function model(name){
    const content = await ejs.renderFile('./temp/model.ts', ejsContext);
    const newFileName = `./temp/${singular(name)}.model.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync('./temp/model.ts');
}

async function module(name){
    const content = await ejs.renderFile('./temp/module.ts', ejsContext);
    const newFileName = `./temp/${singular(name)}.module.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync('./temp/module.ts');
}

async function service(name){
    const content = await ejs.renderFile('./temp/service.ts', ejsContext);
    const newFileName = `./temp/${singular(name)}.service.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync('./temp/service.ts');
}

async function createDto(name){
    const content = await ejs.renderFile('./temp/dto/create-__name@singular__.dto.ts', ejsContext);
    const newFileName = `./temp/dto/create-${singular(name)}.dto.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync('./temp/dto/create-__name@singular__.dto.ts');
}

async function updateDto(name){
    const content = await ejs.renderFile('./temp/dto/update-__name@singular__.dto.ts', ejsContext);
    const newFileName = `./temp/dto/update-${singular(name)}.dto.ts`;
    await writeFileAsync(newFileName, content);
    await unlinkAsync('./temp/dto/update-__name@singular__.dto.ts');
}

run();