import renameMap from './rename_map';

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
 * Get the diff between two sets of files.
 *
 * @param {Files} newFiles
 * @param {Files} oldFiles
 */
export default (newFiles, oldFiles) => {
    // Establish what files have been renamed, so we can diff across them
    const renames = renameMap(newFiles, oldFiles);
    return renames;

    // TODO: Iterate over each file and perform a diff
};
