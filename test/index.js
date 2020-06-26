const assert = require('assert').strict;
const diff = require('../dist');

// Test addition
const additionResult = diff(
    {
        'hello.txt': 'aaa\nbbb\nccc\nddd\neee\nfff\n',
    },
    {
        'hello.txt': 'aaa\nbbb\nccc\nddd\neee\n',
    },
);
assert.equal(additionResult['hello.txt'].name.length, 1);
assert.equal(additionResult['hello.txt'].name[0].added, false);
assert.equal(additionResult['hello.txt'].name[0].removed, false);
assert.equal(additionResult['hello.txt'].name[0].value, 'hello.txt');
assert.equal(additionResult['hello.txt'].content.length, 2);
assert.equal(additionResult['hello.txt'].content[0].added, false);
assert.equal(additionResult['hello.txt'].content[0].removed, false);
assert.equal(additionResult['hello.txt'].content[0].value, 'aaa\nbbb\nccc\nddd\neee\n');
assert.equal(additionResult['hello.txt'].content[1].added, true);
assert.equal(additionResult['hello.txt'].content[1].removed, false);
assert.equal(additionResult['hello.txt'].content[1].value, 'fff\n');

// Test removal
const removalResult = diff(
    {
        'hello.txt': 'aaa\nbbb\nccc\nddd\neee\n',
    },
    {
        'hello.txt': 'aaa\nbbb\nccc\nddd\neee\nfff\n',
    },
);
assert.equal(removalResult['hello.txt'].name.length, 1);
assert.equal(removalResult['hello.txt'].name[0].added, false);
assert.equal(removalResult['hello.txt'].name[0].removed, false);
assert.equal(removalResult['hello.txt'].name[0].value, 'hello.txt');
assert.equal(removalResult['hello.txt'].content.length, 2);
assert.equal(removalResult['hello.txt'].content[0].added, false);
assert.equal(removalResult['hello.txt'].content[0].removed, false);
assert.equal(removalResult['hello.txt'].content[0].value, 'aaa\nbbb\nccc\nddd\neee\n');
assert.equal(removalResult['hello.txt'].content[1].added, false);
assert.equal(removalResult['hello.txt'].content[1].removed, true);
assert.equal(removalResult['hello.txt'].content[1].value, 'fff\n');

// Test modification
const modificationResult = diff(
    {
        'hello.txt': 'aaa\nbbb\nccc\nddd\neee\nggg\n',
    },
    {
        'hello.txt': 'aaa\nbbb\nccc\nddd\neee\nfff\n',
    },
);
assert.equal(modificationResult['hello.txt'].name.length, 1);
assert.equal(modificationResult['hello.txt'].name[0].added, false);
assert.equal(modificationResult['hello.txt'].name[0].removed, false);
assert.equal(modificationResult['hello.txt'].name[0].value, 'hello.txt');
assert.equal(modificationResult['hello.txt'].content.length, 3);
assert.equal(modificationResult['hello.txt'].content[0].added, false);
assert.equal(modificationResult['hello.txt'].content[0].removed, false);
assert.equal(modificationResult['hello.txt'].content[0].value, 'aaa\nbbb\nccc\nddd\neee\n');
assert.equal(modificationResult['hello.txt'].content[1].added, false);
assert.equal(modificationResult['hello.txt'].content[1].removed, true);
assert.equal(modificationResult['hello.txt'].content[1].value, 'fff\n');
assert.equal(modificationResult['hello.txt'].content[2].added, true);
assert.equal(modificationResult['hello.txt'].content[2].removed, false);
assert.equal(modificationResult['hello.txt'].content[2].value, 'ggg\n');

// Test name addition
const nameAdditionResult = diff(
    {
        'hello-world.txt': 'aaa\nbbb\nccc\nddd\neee\n',
    },
    {
        'hello.txt': 'aaa\nbbb\nccc\nddd\neee\n',
    },
);
assert.equal(nameAdditionResult['hello-world.txt'].name.length, 3);
assert.equal(nameAdditionResult['hello-world.txt'].name[0].added, false);
assert.equal(nameAdditionResult['hello-world.txt'].name[0].removed, false);
assert.equal(nameAdditionResult['hello-world.txt'].name[0].value, 'hello');
assert.equal(nameAdditionResult['hello-world.txt'].name[1].added, true);
assert.equal(nameAdditionResult['hello-world.txt'].name[1].removed, false);
assert.equal(nameAdditionResult['hello-world.txt'].name[1].value, '-world');
assert.equal(nameAdditionResult['hello-world.txt'].name[2].added, false);
assert.equal(nameAdditionResult['hello-world.txt'].name[2].removed, false);
assert.equal(nameAdditionResult['hello-world.txt'].name[2].value, '.txt');
assert.equal(nameAdditionResult['hello-world.txt'].content.length, 1);
assert.equal(nameAdditionResult['hello-world.txt'].content[0].added, false);
assert.equal(nameAdditionResult['hello-world.txt'].content[0].removed, false);
assert.equal(nameAdditionResult['hello-world.txt'].content[0].value, 'aaa\nbbb\nccc\nddd\neee\n');

// Test name removal
const nameRemovalResult = diff(
    {
        'hello.txt': 'aaa\nbbb\nccc\nddd\neee\n',
    },
    {
        'hello-world.txt': 'aaa\nbbb\nccc\nddd\neee\n',
    },
);
assert.equal(nameRemovalResult['hello.txt'].name.length, 3);
assert.equal(nameRemovalResult['hello.txt'].name[0].added, false);
assert.equal(nameRemovalResult['hello.txt'].name[0].removed, false);
assert.equal(nameRemovalResult['hello.txt'].name[0].value, 'hello');
assert.equal(nameRemovalResult['hello.txt'].name[1].added, false);
assert.equal(nameRemovalResult['hello.txt'].name[1].removed, true);
assert.equal(nameRemovalResult['hello.txt'].name[1].value, '-world');
assert.equal(nameRemovalResult['hello.txt'].name[2].added, false);
assert.equal(nameRemovalResult['hello.txt'].name[2].removed, false);
assert.equal(nameRemovalResult['hello.txt'].name[2].value, '.txt');
assert.equal(nameRemovalResult['hello.txt'].content.length, 1);
assert.equal(nameRemovalResult['hello.txt'].content[0].added, false);
assert.equal(nameRemovalResult['hello.txt'].content[0].removed, false);
assert.equal(nameRemovalResult['hello.txt'].content[0].value, 'aaa\nbbb\nccc\nddd\neee\n');

// Test name modification
const nameModificationResult = diff(
    {
        'bbb.txt': 'aaa\nbbb\nccc\nddd\neee\n',
    },
    {
        'aaa.txt': 'aaa\nbbb\nccc\nddd\neee\n',
    },
);
assert.equal(nameModificationResult['bbb.txt'].name.length, 3);
assert.equal(nameModificationResult['bbb.txt'].name[0].added, false);
assert.equal(nameModificationResult['bbb.txt'].name[0].removed, true);
assert.equal(nameModificationResult['bbb.txt'].name[0].value, 'aaa');
assert.equal(nameModificationResult['bbb.txt'].name[1].added, true);
assert.equal(nameModificationResult['bbb.txt'].name[1].removed, false);
assert.equal(nameModificationResult['bbb.txt'].name[1].value, 'bbb');
assert.equal(nameModificationResult['bbb.txt'].name[2].added, false);
assert.equal(nameModificationResult['bbb.txt'].name[2].removed, false);
assert.equal(nameModificationResult['bbb.txt'].name[2].value, '.txt');
assert.equal(nameModificationResult['bbb.txt'].content.length, 1);
assert.equal(nameModificationResult['bbb.txt'].content[0].added, false);
assert.equal(nameModificationResult['bbb.txt'].content[0].removed, false);
assert.equal(nameModificationResult['bbb.txt'].content[0].value, 'aaa\nbbb\nccc\nddd\neee\n');

