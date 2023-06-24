const isWin = process.platform === 'win32';

const SEP = isWin ? `\\\\+` : `\\/`;
const SEP_ESC = isWin ? `\\\\` : `/`;
const GLOBSTAR_SEGMENT = `((?:[^${SEP_ESC}]*(?:${SEP_ESC}|$))*)`;

/**
 * Convert any glob pattern to a JavaScript Regexp object
 * @param {String} glob Glob pattern to convert
 * @returns {Object} converted object with string, segments and RegExp object
 */
export default function globrex(glob) {
    let regex = '';
    let segment = '';

    const path = { regex: '', segments: [] };

    // If we are doing extended matching, this boolean is true when we are inside
    // a group (eg {*.html,*.js}), and false otherwise.
    let inGroup = false;
    let inRange = false;

    // extglob stack. Keep track of scope
    const ext = [];

    // Helper function to build string and segments
    function add (str, {split, last, only}={}) {

        if (only !== 'path') regex += str;

        if (only !== 'regex') {
            path.regex += (str === '\\/' ? SEP : str);
            if (split) {
                if (last) segment += str;
                if (segment !== '') {

                    segment = `^${segment}$`; // change it 'includes'

                    path.segments.push(new RegExp(segment, ''));
                }
                segment = '';
            } else segment += str;
        }
    }

    let c;
    let n;
    for (let i = 0; i < glob.length; i++) {
        c = glob[i];
        n = glob[i + 1];

        if (['\\', '$', '^', '.', '='].includes(c)) {
            add(`\\${c}`);
            continue;
        }


        switch (c) {

            case '/':

                add(`\\${c}`, { split: true });

                regex += '?';

                continue;

            case '(':

                if (ext.length) {

                    add(c);
    
                    continue;
                }

                add(`\\${c}`);

                continue;

            case ')':

                if (ext.length) {

                    add(c);

                    const type = ext.pop(); 

                    switch (type) {

                        case '@':

                            add('{1}');

                            break;

                        case '!':

                            add('([^\/]*)');

                            break;
                        
                        default: 

                            add(type);

                            break;
                    }

                    continue;
                }

                add(`\\${c}`);

                continue;

            case '|':

                if (ext.length) {

                    add(c);

                    continue;
                }

                add(`\\${c}`);

                continue;

            case '+':

                if (n === '(') {

                    ext.push(c);

                    continue;
                }

                add(`\\${c}`);

                continue;

            case '@':

                if (n === '(') ext.push(c);

                continue;

            case '!':

                if (inRange) {

                    add('^');

                    continue;
                }

                if (n === '(') {

                    ext.push(c);

                    add('(?!');

                    i++;

                    continue;
                }

                add(`\\${c}`);

                continue;

            case '?':

                if (n === '(') ext.push(c);
                else add('.');

                continue;
                
        }

        if (c === '[') {
            if (inRange && n === ':') {
                i++; // skip [
                let value = '';
                while(glob[++i] !== ':') value += glob[i];
                if (value === 'alnum') add('(\\w|\\d)');
                else if (value === 'space') add('\\s');
                else if (value === 'digit') add('\\d');
                i++; // skip last ]
                continue;
            }
            inRange = true;
            add(c);
            continue;
        }

        if (c === ']') {
            inRange = false;
            add(c);
            continue;
        }

        if (c === '{') {
            inGroup = true;
            add('(');
            continue;
        }

        if (c === '}') {
            inGroup = false;
            add(')');
            continue;
        }

        if (c === ',') {
            if (inGroup) {
                add('|');
                continue;
            }
            add(`\\${c}`);
            continue;
        }

        if (c === '*') {
            if (n === '(') {
                ext.push(c);
                continue;
            }
            // Move over all consecutive "*"'s.
            // Also store the previous and next characters
            let starCount = 1;
            while (glob[i + 1] === '*') {
                starCount++;
                i++;
            }

            // globstar is disabled, so treat any number of "*" as one
            add('.*');

            continue;
        }

        add(c);
    }


    // When regexp 'g' flag is specified don't
    // constrain the regular expression with ^ & $
    regex = `^${regex}$`;
    segment = `^${segment}$`;

    path.regex = `^${path.regex}$`;

    // Push the last segment
    path.segments.push(new RegExp(segment, ''));
    path.regex = new RegExp(path.regex, '');
    path.globstar = new RegExp(`^${ GLOBSTAR_SEGMENT }$`, '');

    return { path, regex: new RegExp(regex, '')};
}
