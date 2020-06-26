import { diffLines } from 'diff';
import customDiff from './custom_diff';

/**
 *
 * @param {String} newLines
 * @param {String} oldLines
 * @param {Options} options
 * @return {Diff}
 */
export default (newLines, oldLines, options) => {
    // Get the initial diff from the `diff` library
    const diff = diffLines(oldLines, newLines);

    // Return our customised diff (whitespace & highlighting)
    return customDiff(diff, options);
};
