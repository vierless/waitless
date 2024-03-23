# Waitless.js

Waitless.js is a lightweight JavaScript library for lazy-loading scripts and executing functions once all scripts are loaded.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

To use Waitless.js, include it directly from a CDN.

### CDN

```
<script src="https://cdn.example.com/waitless.js"></script>
```

## Usage

Using Waitless.js is simple. First, push your scripts and functions to the waitless object, then let Waitless.js handle the lazy-loading and execution. You can push scripts and functions from a global file to waitless to load them on all pages or from a sub page to load them only on this page.

### The script config allows three inputs:
| option | required | description | accepts |
|----------|----------|----------|----------|
| src | yes | The link to your script | All links with https:// |
| location | yes | The location of the script in the DOM | 'head' or 'body' |
| callback | no | A custom function that runs after the script is done loading | a custom function name |

```
// Push scripts to waitless.scripts
waitless.scripts.push(
    { src: 'https://player.vimeo.com/api/player.js', location: 'body', callback: vimeoLoaded },
    { src: 'https://fast.wistia.com/assets/external/E-v1.js', location: 'head' }
);

// Define callback functions
waitless.functions.push(function() {
  // This function runs after all scripts are done loading
});

function vimeoLoaded() {
    console.log('This function runs after the Vimeo script is done loading');
}
```

## License

This project is licensed under the MIT License.
