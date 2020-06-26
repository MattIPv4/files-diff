import JsDiff from 'diff';
import customDiff from './custom_diff';

// TODO: Investigate importing diffChars directly from `diff`

/**
 *
 * @param {String} newLines
 * @param {String} oldLines
 * @param {Options} options
 * @return {Diff}
 */
export default (newLines, oldLines, options) => {
    // Get the initial diff from the `diff` library
    const diff = JsDiff.diffLines(oldLines, newLines);

    // Return our customised diff (whitespace & highlighting)
    return customDiff(diff, options);
};
