function match (subject, pattern) {
    let state, patternOffset, next
    [state, patternOffset, next] = start(pattern);
    for (let c of subject) {
        [state, patternOffset, next] = state(pattern, patternOffset, c, next);
    }
    return state === end;
}

function end(pattern, patternOffset, c, next) {
    return [end, patternOffset, next];
}

function start (pattern) {
    let kmt = [-1];
    for (let offset = 1; offset < pattern.length; offset++) {
        let subString = pattern.slice(0, offset);
        kmt[offset] = getLongestAffixLength(subString);
    }
    return [matchOffset, 0, kmt];
}

function matchOffset (pattern, patternOffset, c, next) {
    if (patternOffset < 0 || patternOffset > pattern.length - 1) {
        throw new Error('Unkown Error: Pattern Offset Out Of Range!')
    } else if (pattern[patternOffset] === c) {
        if (patternOffset === pattern.length - 1) {
            return [end, 0, next];
        }
        patternOffset++;
        return [matchOffset, patternOffset, next];
    } else {
        patternOffset = next[patternOffset];
        if (patternOffset < 0) {
            return [matchOffset, 0, next];
        }
        return matchOffset(pattern, patternOffset, c, next)
    }
}

function getLongestAffixLength (string) {
    let cutOffset = 1;
    while (cutOffset < string.length) {
        if (string.slice(0, -cutOffset) === string.slice(cutOffset)) {
            return string.length - cutOffset;
        }
        cutOffset++;
    }
    return 0;
}

// console.log(match('abcabx', 'abcabx')); // true
console.log(match('abcabcabxabcabaxab', 'abcabx')); // true
// console.log(match('abcacacxacbxacb', 'abcabx')); // false
