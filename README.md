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
<script src="https://cdn.jsdelivr.net/gh/vierless/waitless/waitless.min.js"></script>
```

## Usage

### Using the config:

To use the config, you just push your settings for each individual page or in a global file to the waitless.scripts array. The config accepts 3 options at the moment. Check the list and the example below to learn more.

| option | description | accepts | required |
|----------|----------|----------|----------|
| src | The link to your script | All links with https:// | yes |
| location | The location of the script in the DOM | 'head' or 'body' | yes |
| callback | A custom function that runs after the script is done loading | a custom function name | no |

```
// Define scripts that you want to load
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

### Using the attribute on scripts:

Besides the config you also have the option to delay your scripts by using the waitless-attribute instead of the src-attribute. Waitless will then delay all scripts until the user interacts with the page and swap the waitless-attribute with the src-attribute. This will then load all scripts.

```
<!-- Normal script tag that loads with the page -->
<script src="https://player.vimeo.com/api/player.js">

<!-- Delayed script tag that loads on interaction -->
<script waitless="https://player.vimeo.com/api/player.js">
```

### Using the attribute on iframes:

You are also able to delay iframes from loading until they are appearing in the viewport. This causes a slight delay until the iframe content is available but increases the page load time immensly. Feel free to experiment with this feature.

```
<!-- Normal iframe that loads with the page -->
<iframe
  title="My iframe title"
  src="https://mydomain.de/iframe-src"
  width="100%"
  height="100%"
  frameborder="0"
  style="background: url('https://mydomain.de/iframe-background-placeholder.jpg') no-repeat center center, #000; background-size: cover;"
></iframe>

<!-- Delayed iframe that loads when entering the viewport -->
<iframe
  title="My iframe title"
  waitless="https://mydomain.de/iframe-src"
  width="100%"
  height="100%"
  frameborder="0"
  style="background: url('https://mydomain.de/iframe-background-placeholder.jpg') no-repeat center center, #000; background-size: cover;"
></iframe>
```

It is also possible to toggle the load of iframes that are entering the DOM later by using the triggerLoad function. It can be accessed like this for example:

```
/*
    In this example we are binding the triggerLoad function to a load more button in a CMS. When clicking the button the function gets some content from our CMS and runs after some delay to swap the waitless attribute for src attributes.
*/

document.addEventListener('DOMContentLoaded', function() {
   let loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', function() {
        setTimeout(function() {
            waitless.triggerLoad();
        }, 1000) // Adjust delay as needed
    }); 
});
```

### Differences

The attribute approach makes the usage a little bit easier but does not allow custom callbacks at the moment. Main difference is that the scripts are already in the DOM but are not executed while the config option keeps the scripts out of the DOM until the user interacts. 

## License

This project is licensed under the MIT License.
