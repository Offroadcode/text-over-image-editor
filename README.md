# Text Over Image Editor

A custom property editor for Umbraco that allows for an image to be selected and a headline and sub-headline to be added to it and then positioned on top of the image.

![Text Over Image Editor Screenshot](https://drive.google.com/file/d/0B8oHMRu5dbWzYkNnZU12RDk5U00/view?usp=sharing)

## Download for Umbraco

Install the selected release through the Umbraco package installer or download and install locally from Our.

After installing the package, create a new DataType and select "Text Over Image Editor" from the property editor dropdown, then add it to a DocType of your choice.

## Contribute

Want to contribute to the Text Over Image Editor package? You'll want to use Grunt (our task runner) to help you integrate with a local copy of Umbraco.

### Install Dependencies
*Requires Node.js to be installed and in your system path*

    npm install -g grunt-cli && npm install -g grunt
    npm install

### Build

    grunt

Builds the project to /dist/. These files can be dropped into an Umbraco 7 site, or you can build directly to a site using:

    grunt --target="D:\inetpub\mysite"

You can also watch for changes using:

    grunt watch
    grunt watch --target="D:\inetpub\mysite"
