const EOF = Symbol('EOF');
let workStack = [{
    type: 'document',
    children: []
}];

let buffer = [];
let bufferDefination = {
    'attrName': 0,
    'attrValue': 1,
}

function parser (htmlText) {
    let state = sData;
    for (let c of htmlText) {
        state = state(c);
    }
    state(EOF);

    if (workStack.length > 1) {
        throw new Error('Tags Not Closed');
    }

    return workStack;
}

function appendBuffer (name, value) {
    let index = bufferDefination[name];
    if (typeof index === 'number') {
        return buffer[index] = buffer[index] ? buffer[index] + value : value;
    }
    throw new Error('Buffer Not Allocated');
}

function clearBuffer (name) {
    let index = bufferDefination[name];
    if (typeof index === 'number') {
        return buffer[index] = '';
    }
    throw new Error('Buffer Not Allocated');
}

function createToken(type) {
    switch (type) {
        case 'startTag': {
            workStack.push({
                type: 'tag',
                tagName: '',
                attributes: {},
                children: []
            })
            break;
        }
        case 'endTag': {
            workStack.push({
                type: 'tag',
                tagName: ''
            })
            break;
        }
        case 'textNode': {
            workStack.push({
                type: 'text',
                text: ''
            })
            break;
        } 
    }
}

function appendToToken (feild, value, key) {
    let currentToken = workStack[workStack.length - 1];
    if (feild === 'text') {
        if (currentToken.type !== 'text') {
            createToken('textNode');
            currentToken = workStack[workStack.length - 1];
        }
    }

    if (typeof currentToken[feild] === 'string') {
        currentToken[feild] += value;
    } else if (typeof currentToken[feild] === 'object' && key) {
        currentToken[feild][key] = value;
    } else if (typeof currentToken[feild] === 'object' &&!key) {
        currentToken[feild].push(value);
    }
}

function popAsChild (stack) {
    let lastElement = stack.pop();
    stack[stack.length - 1].children.push(lastElement);
}

function emit(type) {
    let currentToken = workStack[workStack.length - 1];
    switch (type) {
        case 'self-closing':
        case 'tag': {
            if (currentToken.type === 'text') {
                popAsChild(workStack);
            } else if (currentToken.type === 'tag') {
                if (typeof currentToken.attributes === 'object' && type === 'self-closing') {
                    popAsChild(workStack);
                } else if (typeof currentToken.attributes === 'object') {
                    // doing nothing
                } else if (currentToken.tagName === workStack[workStack.length - 2].tagName) {
                    workStack.pop();
                    popAsChild(workStack);
                } else {
                    throw new Error('Start Tag And Close Tag Not Match');
                }
            }
            break;
        }
        case 'attributeName': {
            if (buffer[bufferDefination['attrName']]) {
                currentToken.attributes[buffer[bufferDefination['attrName']]] = true;
            }
            break;
        }
        case 'attributeValue': {
            currentToken.attributes[buffer[bufferDefination['attrName']]] = buffer[bufferDefination['attrValue']];
            break;
        }
    }
};

function end (c) {
    return end;
}

function sData (c) {
    if (c === '<') {
        emit('tag');
        return sTagOpen;
    } else if (c === EOF) {
        emit('tag');
        return end();
    }

    appendToToken('text', c);
    return sData;
}

function sTagOpen (c) {
    if (c === '/') {
        return sEndTagOpen;
    } else if (c === EOF){
        return end();
    } else if (c.match(/^[a-z]$/i)) {
        createToken('startTag');
        return sTagName(c.toLowerCase());
    }

    throw new Error('Cannot Use "' + c + '" As Tag Name');
}

function sEndTagOpen (c) {
    if (c === '>') {
        throw new Error('Unexpected End Of Tag');
    } else if (c === EOF) {
        throw new Error('Unexpected EOF');
    } else if (c.match(/^[a-z]$/i)) {
        createToken('endTag');
        return sTagName(c.toLowerCase());
    }

    throw new Error('Unexpected Char "' + c + '"');
}

function sTagName (c) {
    if (c.match(/^\s$/)) {
        return sBefroreAttributeName;
    } else if (c === '/') {
        return sSelfClosingStartTag;
    } else if (c === '>') {
        emit('tag');
        return sData;
    } else if (c.match(/^[a-z0-9\u0000]$/i)) {
        appendToToken('tagName', c === '\u0000' ? '\ufffd' : c);
        return sTagName;
    }

    throw new Error('Cannot Use "' + c + '" As Tag Name');
}

function sBefroreAttributeName (c) {
    if (c.match(/^\s$/)) {
        return sBefroreAttributeName;
    } else if (c === EOF || c === '>') {
        return sAfterAttributeName(c);
    } else if (c === '=') {
        throw new Error('Cannot Use "' + c + '" As Attribute Name');
    } else {
        clearBuffer('attrName');
        return sAttributeName(c);
    }
}

function sAttributeName (c) {
    if (c.match(/^\s$/) || c === '/' || c === '>' || c === EOF) {
        emit('attributeName');
        return sAfterAttributeName(c);
    } else if ( c === '=') {
        emit('attributeName');
        return sBeforeAttributeValue;
    } else if (c.match(/^[a-z0-9]$/i) || c === '\u0000') {
        appendBuffer('attrName', c === '\u0000' ? '\ufffd' : c);
        return sAttributeName;
    }

    throw new Error('Cannot Use "' + c + '" As Attribute Name');
}

function sAfterAttributeName (c) {
    if (c.match(/^\s$/)) {
        return sAfterAttributeName;
    } else if (c === '/') {
        return sSelfClosingStartTag;
    } else if (c === '=') {
        return sBeforeAttributeValue;
    } else if (c === '>') {
        emit('tag');
        return sData;
    } else if (c === EOF) {
        throw new Error('Unexpected EOF');
    }

    return sAttributeName(c);
}

function sBeforeAttributeValue (c) {
    if (c.match(/^\s$/)) {
        clearBuffer('attrValue');
        return sBeforeAttributeValue;
    } else if (c === '"') {
        clearBuffer('attrValue');
        return sAttributeValueDQ;
    } else if (c === '\'') {
        clearBuffer('attrValue');
        return sAttributeValueSQ;
    } else if (c === '>') {
        throw new Error('Missing Attribute Value');
    } 
    return sAttributeValue(c);
}

function sAttributeValueDQ (c) {
    if (c === '"') {
        emit('attributeValue');
        return sAfterAttributeValueQ;
    } else if (c === EOF) {
        throw new Error('Unexpected EOF');
    }

    appendBuffer('attrValue', c === '\u0000' ? '\ufffd' : c);
    return sAttributeValueDQ;
}

function sAttributeValueSQ (c) {
    if (c === '\'') {
        emit('attributeValue');
        return sAfterAttributeValueQ;
    } else if (c === EOF) {
        throw new Error('Unexpected EOF');
    }

    appendBuffer('attrValue', c === '\u0000' ? '\ufffd' : c);
    return sAttributeValueDQ;
}

function sAttributeValue (c) {
    if (c.match(/^\s$/)) {
        emit('attributeValue');
        return sBefroreAttributeName;
    } else if (c === '>') {
        emit('tag');
        return sData;
    } else if (['"', '\'', '<', '=', '`'].includes(c)) {
        throw new Error('Cannot Use "' + c + '" As Attribute Value');
    } else if (c === EOF) {
        throw new Error('Unexpected EOF');
    }

    appendBuffer('attrValue', c === '\u0000' ? '\ufffd' : c);
}

function sAfterAttributeValueQ (c) {
    if (c.match(/^\s$/)) {
        return sBefroreAttributeName;
    } else if (c === '/') {
        return sSelfClosingStartTag;
    } else if (c === '>') {
        emit('tag');
        return sData;
    }
}

function sSelfClosingStartTag (c) {
    if (c === '>') {
        emit('self-closing');
        return sData;
    } else if (c === EOF) {
        throw new Error('Unexpected EOF');
    }

    throw new Error('Unexpected Tag Close Char');
}

module.exports = parser;