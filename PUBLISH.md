# Publishing

Maintainer notes for publishing the NPM module.

## 1. Update version

Update the version in [package.json](package.json).

Run `npm i --package-lock-only` to update version in [package-lock.json](package-lock.json).

## 2. Build the package

Run `npm run build` to build the latest version of the package to [dist](dist).

## 3. Commit & tag

Create a new commit with the version number updates, the commit name should be the version.

A tag should be created for this commit with the same name.

## 4. Preview files to publish

To preview all files that will be included in the published module, run `npm publish --dry-run`.

## 5. Publish to NPM

Publish the new version of the module with `npm publish`.
