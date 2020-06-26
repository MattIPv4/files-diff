import diff from '../src';

console.log(diff(
    {
        'test.txt': 'aaa\nbbb\nccc\nddd\neee',
    },
    {
        'hello.txt': 'aaa\nbbb\nfff\nddd\neee',
    },
));
