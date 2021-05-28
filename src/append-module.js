#! /usr/bin/env node

const { readFileSync } = require('fs');

const typescript = require('typescript');
const ts = typescript;
const { createProgram, forEachChild } = typescript;

function appendModuleImports(filename, appendModuleName){
    const program = createProgram([filename], {maxNodeModuleJsDepth: 1});
    const sourceFile = program.getSourceFile(filename);
    const sourceText = String(readFileSync(filename));

    let end = null;

    forEachChild(sourceFile, node => {
        if (ts.isClassDeclaration(node)) {
            node.forEachChild(nodeOfClass=> {
                if (ts.isDecorator(nodeOfClass)) {
                    nodeOfClass.forEachChild(nodeOfDecorator=>{
                        nodeOfDecorator.forEachChild(nodeOfParameter=>{
                            if (ts.isObjectLiteralExpression(nodeOfParameter)) {
                                nodeOfParameter.forEachChild(nodeOfObject=>{
                                    if(ts.isObjectLiteralElement(nodeOfObject) && nodeOfObject.name.escapedText == 'imports'){
                                        nodeOfObject.forEachChild(nodeOfImports=>{
                                            if(ts.isArrayLiteralExpression(nodeOfImports)) {
                                                nodeOfImports.forEachChild(nodeOfArray=>{
                                                    end = nodeOfArray.end;
                                                });
                                                return;
                                            }
                                        });
                                        return;
                                    }
                                });
                                return;
                            }
                        });
                        return;
                    });
                    return
                }
            })
            return
        } 
    });

    if(end === null){
        console.log('!!! imports에 모듈 추가 실패');
        return sourceText;
    }

    const temp = sourceText.slice(0, end).trimRight();
    const hasTraillingComma = temp[temp.length-1] === ','

    return sourceText.slice(0, end) + `${hasTraillingComma?'':','} ${appendModuleName}` + sourceText.slice(end);
}

module.exports = appendModuleImports;