
const CHARS = { '{': '}', '(': ')', '[': ']'};
const RELAXED = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;

function isglob(target) {

  const match = RELAXED.exec(target);

  let currectTarget = target;

  while (match) {

    // if (match[2]) return true;

    let idx = match.index + match[0].length;

    console.log(idx);

    // if an open bracket/brace/paren is escaped,
    // set the index to the next closing character
    const open = match[1];

    const close = open ? CHARS[open] : null;

    if (open && close) {

      const n = currectTarget.indexOf(close, idx);

      if (n !== -1)  idx = n + 1;
    }

    currectTarget = currectTarget.slice(idx);
  }

  return false;
}

console.log(isglob('*.*'));