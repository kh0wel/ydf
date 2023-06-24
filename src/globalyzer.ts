import path from 'node:path';

const CHARS = {

    '{': '}',
    '(': ')',
    '[': ']'
};

const RELAXED = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;

function isglob(target: string) {

    const match = RELAXED.exec(target);

    let currectTarget = target;

    while (match) {

        if (match[2]) return true;

        let idx = match.index + match[0].length;

        // if an open bracket/brace/paren is escaped,
        // set the index to the next closing character
        const open = match[1];

        const close = open ? CHARS[open] : null;

        if (open && close) {

            const n = currectTarget.indexOf(close, idx);

            if (n !== -1) idx = n + 1;
        }

        currectTarget = currectTarget.slice(idx);
    }

    return false;
}

function parent (target: string) {

    let t = target.replace(/\/|\\/, '/');

    // special case for strings ending in enclosure containing path separator
    if (/[\{\[].*[\/]*.*[\}\]]$/.test(t)) t += '/';

    // preserves full path in case of trailing path separator
    t += 'a';

    t = path.dirname(t);

    do { t }

    while (isglob(t) || /(^|[^\\])([\{\[]|\([^\)]+$)/.test(t));

    // remove escape chars and return result
    return t.replace(/\\([\*\?\|\[\]\(\)\{\}])/g, '$1');
}

export default function (pattern: string) {

    const normalizedPattern = path.normalize(pattern);

    let base = parent(normalizedPattern);

    const isGlob = isglob(normalizedPattern);

    let glob;

    if (base !== '.') {

        glob = normalizedPattern.substring(base.length);

        if (glob.startsWith('/')) glob = glob.substring(1);
    } else glob = normalizedPattern;

    if (!isGlob) {

        base = path.dirname(normalizedPattern);

        glob = base !== '.'

            ? normalizedPattern.substring(base.length)

            : normalizedPattern;
    }

    if (glob.startsWith('./')) glob = glob.substring(2);
    if (glob.startsWith('/')) glob = glob.substring(1);

    return { base, glob, isGlob };
}
