# Gutenberg Blocks

This contains all of the Gutenberg blocks used on the [INSERT PROJECT TITLE] website. It also restricts which blocks will display on the website.

This blocks folder should be located at [project name]/wp-content/themes/[project theme]/blocks.

## Environment Setup
This project uses NPM and Webpack.
* You will need to install node when first setting up the project.
* `npm run build` will build this project once.
* `npm run start` will build this project and keep listening for changes.
* After these commands are run the blocks folder should include a 'build' folder, a 'node_modules' folder, package.json and package-lock.json files, and the webpack.config.js file.

## Adjusting Blocks
There are a few places that will need to be updated when adding or removing custom blocks.

### Restricting Core WordPress Blocks
Relative to this directory, `src/index.js` has an array called `excludeBlocks` which lists which core Gutenberg blocks we want to remove from the site.

### Adding a New Custom Block
To add a new custom block, you will need to add a few things. Our convention for Gutenberg blocks is that we call full-width-spanning blocks "layouts" and for blocks that go within the layouts we call them "elements". When creating a new block, follow these steps:
1. Add a new directory to either "elements" or "layouts" within the `src` directory (depending on the type, as described above) and include an `index.js` file within it. This will be your code for your custom block. Namespace these blocks according to the convention `key`.
2. Import the block as a component at the bottom of the `src/index.js` file.
3. Add the block to the `$blocks` array in the file `blocks.php`.

You will need to run `npm run start` in order to see the block on the site.

### Removing a Custom Block
To remove a custom block:
1. Comment out or remove the block name from the `$blocks` array in the file `blocks.php`.
2. Comment out or remove the block as an imported component at the bottom of the `src/index.js` file.
3. Optionally remove the directory of the block from either the "elements" or "layouts" directories.
