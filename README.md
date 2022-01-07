# [Work in Progress] Browser Extension for Swetrix Analytics

### Build locally

1. Checkout the copied repository to your local machine eg. with `git clone https://github.com/Swetrix/swetrix-browser.git`
1. Run `npm install` to install all the required dependencies.
1. Run `npm run build`

The build step will create the `distribution` folder, this folder will contain the generated extension.

### Run the extension

Using [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) is recommened for automatic reloading and running in a dedicated browser instance. Alternatively you can load the extension manually (see below).

1. Run `npm install --global web-ext` (only only for the first time).
1. Run `npm run watch` to watch for file changes and build continuously.
1. In another terminal, run `web-ext run` for Firefox or `web-ext run -t chromium` for Chrome.
1. Check that the extension is loaded by opening it's popup window.

#### Manually

You can also [load the extension manually in Chrome](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#google-chrome-opera-vivaldi) or [Firefox](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#mozilla-firefox).
