import escape from 'escape-html';

/**
 *
 * @param {Change} change
 * @param {Options} options
 * @return {Change}
 */
const highlightChange = (change, options) => {
    if (options.highlightFunction) {
        // Attempt to avoid highlighting leading/trailing whitespace
        const match = change.value.match(/^(\s*)(.*)(\s*)$/);
        const highlighted = options.highlightFunction(match ? match[2] : change.value, change.added, change.removed);
        change.value = `${match ? match[1] : ''}${highlighted}${match ? match[3] : ''}`;
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
    const customDiff = diff.reduce((prev, srcChange, index, src) => {
        // Make a clone that is detached
        const change = { ...srcChange };

        // Escape if needed
        if (options.escapeHtml) change.value = escape(change.value);

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

        // Highlight change line by line, so we can avoid highlighting whitespace
        const values = change.value.split('\n').map((value, index, arr) => `${value}${index < arr.length - 1 ? '\n' : ''}`);
        for (const value of values) {
            prev.push(highlightChange({
                added: change.added,
                removed: change.removed,
                value,
            }, options));
        }

        // Done!
        return prev;
    }, []);

    // Combine consecutive changes of the same type
    const previousState = { added: null, removed: null };
    return customDiff.reduce((prev, change) => {
        if (change.added === previousState.added && change.removed === previousState.removed) {
            // If identical change type previously, combine
            prev[prev.length - 1].value += change.value;
        } else {
            // Otherwise, add as a new change
            prev.push(change);
        }

        // Update state
        previousState.added = change.added;
        previousState.removed = change.removed;

        // Done
        return prev;
    }, []);
};
