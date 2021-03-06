import stringSimilarity from 'string-similarity';

/**
 * A map of files that have been renamed (new -> old).
 * @typedef FileNameMap
 * @type {Object.<FileName, FileName>}
 */

/**
 * Create a map (object) of new files that have been renamed from old files.
 *
 * @param {Files} newFiles
 * @param {Files} oldFiles
 * @param {Number} similarityThreshold
 * @return {FileNameMap}
 */
export default (newFiles, oldFiles, similarityThreshold) => {
    // Establish which files were added and removed
    const newNames = Object.keys(newFiles);
    const oldNames = Object.keys(oldFiles);
    const removedNames = oldNames.filter(name => !newNames.includes(name));
    const addedNames = newNames.filter(name => !oldNames.includes(name));

    // For each removed file, determine which added file it is most similar to
    // We actually care about addedName -> removedName, but iterating over removedName allows us to pick the most similar
    const availableAddedNames = new Set(addedNames);
    const renameMap = {};
    for (const removedName of removedNames) {
        // If no available files, skip this removed file
        if (availableAddedNames.size === 0) continue;

        // Determine which added file this removed file is most similar to
        const available = Array.from(availableAddedNames).map(name => [name, newFiles[name]]);
        const similarity = stringSimilarity.findBestMatch(oldFiles[removedName], available.map(x => x[1]));

        // If the most similar is below the threshold, skip this removed file
        if (similarity.bestMatch.rating < similarityThreshold) continue;

        // Store the match
        const addedName = available[similarity.bestMatchIndex][0];
        renameMap[addedName] = removedName;

        // Remove this added file from the available options for the other removed files
        availableAddedNames.delete(addedName);
    }

    // Return the map
    return renameMap;
}
