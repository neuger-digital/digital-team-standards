
# Neuger Block Library

This block library contains examples of files for building custom blocks for WordPress websites. Please remember: these are only example files, to be used for reference. Read each file carefully and only copy what you actually need for your new project. Pay special attention to project-specific terms such as "Northfield Union of Youth" or "Key", as well as custom variables, and replace accordingly.


## Using this library

The files in this library are organized in the same way that they would be found in a WordPress project folder. All of the folders and files included would be located within the project's theme folder.

Open and review each file to see what is helpful for your project. At the top of most files are instructions pertaining to that particular file. Read these instructions carefully so you know how to use the file appropriately and what parts of it might need to be revised or replaced.

Both the 'blocks' folder and the 'lib' folder for your project will need to have node installed. I did not include node files in these examples. The 'blocks' folder should also include a 'build' folder where the build files will go. I did not include an example of that folder here. Further instructions about using node with your blocks files are in the README file in the 'blocks' folder.

## What's here?

`blocks/`
* `blocks.php`: Contains functions pertaining to block registration.
* `package.json`: An example json file for a block library.
* `README.md`: Further instructions on building custom blocks.
* `webpack.config.js`: An example config file.
* `/src/` folder: Includes an `index.js` file for importing blocks, a `/blocks/` folder containing folders for each block included in this library, an `/elements/` folder for block elements, and a `/utilities/` folder for block dividers, spacing control, and themes.

`lib/`
* `package.json`: An example json file for a styles library.
* `/js/` folder: Contains a `main.js` file. This includes a jquery function for running animations with blocks.
* `/scss/` folder: This includes several style sheets with example styles that can be used for blocks. The most relevant styles for blocks can be found in `_blocks.scss`, `_panels.scss`, and `_mixins.scss`.

`views/`
* `/blocks/` folder: This contains a twig file for the callout block.

`class-site.php`
* This is a file that would typically be found in the project theme folder. It is where functions applicable to the whole site can be found. For the purposes of this block library, I have only included functions that directly pertain to blocks.

## Other Resources

* [Create a Block instructions](https://docs.google.com/document/d/1tnlGQVJYcMna1pW0aeD_oC0_j_H54sbeaif3ta1On1U/edit?usp=sharing)
* [Block Library spreadsheet](https://docs.google.com/spreadsheets/d/1NeNRH4MZ4cRpAWZO3INBcpktFBs5xywbfYQT5PMkn10/edit?usp=sharing)
* [Web Team Processes](https://docs.google.com/document/d/1W_3fm1pKNtGX9GqXrbwYdxQZA2l6ZkqpzEXd1Ycoo6A/edit?usp=sharing)
* [Web Process Guide](https://docs.google.com/document/d/1-r9OA7zYl9xojA7rJQj1KY065OVrW5EvF9CfKh0W0B8/edit?usp=sharing)

## Acknowledgement

This block library was assembled by Angie Gustafson, Web Developer. The blocks included in this library were built by Neuger web team members, including Bee Yang, Dan Stone, Daniel Edwins, and Angie Gustafson.






