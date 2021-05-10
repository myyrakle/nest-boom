#! /usr/bin/env node

const {classify, dasherize} = require('@angular-devkit/core/src/utils/strings');
const {singular} = require('pluralize');
const ejs = require('ejs');
const fse = require('fs-extra');
const path = require('path');
const { writeFile, unlink } = require('fs');

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
        controller(name)
    ]);
}

async function controller(name){
    const content = ejs.renderFile('./temp/controller.ts', ejsContext);
    await writeFile(`./temp/${singular(name).controller.ts}`, content);
    await unlink('./temp/controller.ts');
}

run();