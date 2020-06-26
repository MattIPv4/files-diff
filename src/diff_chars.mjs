import { diffChars } from 'diff';
import customDiff from './custom_diff';

/**
 *
 * @param {String} newChars
 * @param {String} oldChars
 * @param {Options} options
 * @return {Diff}
 */
export default (newChars, oldChars, options) => {
    // Get the initial diff from the `diff` library
    const diff = diffChars(oldChars, newChars);

    // Return our customised diff (whitespace & highlighting)
    return customDiff(diff, options);
};
