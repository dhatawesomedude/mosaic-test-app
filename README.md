# AssignarApp
Application that converts an image into a mosaic and uploads an image to imgur for sharing.
Built with Angular, using [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server
- Install node modules - Run `npm install`
- Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests
- With node modules already installed, run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Challenges
- I never had prior experience working with canvas so understanding how to draw on a canvas was a bit of a challenge initially. 
Thankfully the [mdn](https://developer.mozilla.org/en-US/) documentation is really good, and stackoverflow exists. :-) 

## New Features and improvements

- Rewrite the mosaic-photo service using functional reactive programming (ngrx).
- Improvement of the current sh***y UI. 
- Central state management of the appliation using ngRx.
- Setup a queue to manage uploading multiple images to Imgur.
- service worker implementation for caching.
- Improve accessibility (kinda falls under UI).
- Improve tests, and error handling.
