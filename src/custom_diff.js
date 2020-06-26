/**
 *
 * @param {Change} change
 * @param {Options} options
 * @return {Change}
 */
const highlightChange = (change, options) => {
    if (options.highlightFunction) {
        change.value = options.highlightFunction(change.value, change.added, change.removed);
    }
    return change;
};

/**
 *
 * @param {Diff} diff
 * @param {Options} options
 * @return {Diff}
 */
export default (diff, options) => {
    return diff.reduce((prev, srcChange, index, src) => {
        // Make a clone that is detached
        const change = { ...srcChange };

        // Escape if needed
        if (options.escapeHtml) change.value = escape(change.value).replace(new RegExp(escape('\n'), 'g'), '\n');

        // Ensure added & removed are booleans
        change.added = !!change.added;
        change.removed = !!change.removed;

        // Remove `count` property
        if ('count' in change) delete change.count;

        // If no-op, add and be done
        if (!change.removed && !change.added) {
            prev.push(change);
            return prev;
        }

        // If we don't need to ignore whitespace, just highlight the change if needed
        if (!options.ignoreWhitespace) {
            prev.push(highlightChange(change, options));
            return prev;
        }

        // Don't mark as diff if only whitespace changed
        // If the counter-part is before us, store as a no-op change
        if (index > 0) {
            if ((src[index - 1].removed && srcChange.added) || (src[index - 1].added && srcChange.removed)) {
                if (src[index - 1].value.replace(/\s/g, '') === srcChange.value.replace(/\s/g, '')) {
                    prev.push({
                        added: false,
                        removed: false,
                        value: change.value,
                    });
                    return prev;
                }
            }
        }
        // If the counter-part is after us, do nothing
        if (index < src.length - 1) {
            if ((src[index + 1].removed && srcChange.added) || (src[index + 1].added && srcChange.removed)) {
                if (src[index + 1].value.replace(/\s/g, '') === srcChange.value.replace(/\s/g, '')) {
                    return prev;
                }
            }
        }

        // Something has changed, but we should remove whitespace before/after this change
        const match = change.value.match(/^(\s*)(.*?)(\s*)$/);

        // If whitespace before, store that as a new part of the diff
        if (match[1]) {
            prev.push({
                added: false,
                removed: false,
                value: match[1],
            });
        }

        // Store the original change without whitespace, highlighting it if needed
        change.value = match[2];
        prev.push(highlightChange(change, options));

        // If whitespace before, store that as a new part of the diff
        if (match[3]) {
            prev.push({
                added: false,
                removed: false,
                value: match[3],
            });
        }

        // Done!
        return prev;
    }, []);

    // TODO: Cleanup consecutive change entries of the same type (multiple additions, multiple removals, multiple no-ops)
};
