import diff from '../src';

console.log(diff(
    {
        'test.txt': 'aaa\nbbb\nccc\nddd\neee\naaa',
    },
    {
        'hello.txt': 'aaa\nbbb\nfff\nddd\neee\n  aaa',
    },
    {
        highlightFunction: (change, added, removed) => {
            if (removed) return '';
            if (added) return `<mark>${change}</mark>`;
        },
    },
)['test.txt']);
