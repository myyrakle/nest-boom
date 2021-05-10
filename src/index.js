#! /usr/bin/env node

function run(){
    const [_1,_2, name] = process.argv;
    console.log('인자값: ', name);
}

run();

module.exports = run;