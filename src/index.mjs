import renameMap from './rename_map';
import diffChars from './diff_chars';
import diffLines from './diff_lines';

/**
 * The name of a file.
 * @typedef FileName
 * @type {String}
 */

/**
 * The contents of a file.
 * @typedef FileContents
 * @type {String}
 */

/**
 * A set of files.
 * @typedef Files
 * @type {Object.<FileName, FileContents>}
 */

/**
 * Function to highlight changes from the diff.
 * @typedef Highlight
 * @type {function(String, Boolean, Boolean):String}
 * @param {String} value The added or removed string from the diff.
 * @param {Boolean} added If the string was added in the diff.
 * @param {Boolean} removed If the string was removed in the diff.
 * @return {String} The new string with any highlighting applied.
 */

/**
 * Options for the diffing.
 * @typedef Options
 * @type {Object}
 * @property {Number} [similarity=0.5] Minimum threshold for considering two files similar and a potential rename.
 * @property {Boolean} [newAsAdded=false] Minimum threshold for considering two files similar and a potential rename.
 * @property {Boolean} [escapeHtml=true] Escape HTML in the file names & contents before returning the diff.
 * @property {Boolean} [ignoreWhitespace=true] Ignore whitespace when considering additions & removals in the diff.
 * @property {Highlight} [highlightFunction] Optional function to process highlighting changes in the diff.
 */

/**
 * Default options for the diffing.
 * @type {Options}
 */
const defaults = {
    similarity: 0.5,
    newAsAdded: false,
    escapeHtml: true,
    ignoreWhitespace: true,
};

/**
 * @typedef Change
 * @type {Object}
 * @property {Boolean} added
 * @property {Boolean} removed
 * @property {String} value
 */

/**
 * @typedef Diff
 * @type {Change[]}
 */

/**
 * A set of diffs for a file name & contents.
 * @typedef FileDiff
 * @type {Object}
 * @property {Diff} name The diff for the file name.
 * @property {Diff} content The diff for the file contents.
 */

/**
 * A set of file diffs.
 * @typedef FileDiffs
 * @type {Object.<FileName, FileDiff>}
 */

/**
 * Get the diff between two sets of files.
 *
 * @param {Files} newFiles
 * @param {Files} oldFiles
 * @param {Options} [options]
 * @return {FileDiffs}
 */
export default (newFiles, oldFiles, options) => {
    // Ensure options are safe, use defaults for unsafe & missing
    options = options || {};
    options.similarity = (typeof options.similarity === 'number') ? Math.min(Math.max(options.similarity, 0), 1) : defaults.similarity;
    options.newAsAdded = (options.newAsAdded !== undefined) ? !!options.newAsAdded : defaults.newAsAdded;
    options.escapeHtml = (options.escapeHtml !== undefined) ? !!options.escapeHtml : defaults.escapeHtml;
    options.ignoreWhitespace = (options.ignoreWhitespace !== undefined) ? !!options.ignoreWhitespace : defaults.ignoreWhitespace;

    // Establish what files have been renamed, so we can diff across them
    const renames = renameMap(newFiles, oldFiles, options.similarity);

    // Store the final diffs
    const diffs = {};

    // Iterate over each new file and do a diff
    for (const newName in newFiles) {
        // Avoid inherited object props
        if (!Object.prototype.hasOwnProperty.call(newFiles, newName)) continue;

        // Store initial default diff
        diffs[newName] = {
            name: [{
                added: false,
                removed: false,
                value: newName,
            }],
            content: [{
                added: false,
                removed: false,
                value: newFiles[newName],
            }],
        };

        // Attempt to resolve the old version
        const oldName = (newName in renames) ? renames[newName] : ((newName in oldFiles) ? newName : null);
        const old = oldName ? oldFiles[oldName] : null;

        // If this a completely new file, we don't need to diff
        if (oldName === null) {
            diffs[newName].name[0].added = options.newAsAdded;
            diffs[newName].content[0].added = options.newAsAdded;
            return;
        }

        // If the names aren't equal, perform a diff
        if (newName !== oldName) {
            diffs[newName].name = diffChars(newName, oldName, options);
        }

        // If the contents aren't equal, perform a diff
        if (newFiles[newName] !== old) {
            diffs[newName].content = diffLines(newFiles[newName], old, options);
        }
    }

    // We're done, return all the diffs!
    return diffs;
};
