# Quiz App

## Framework: Angular

### Description

A simple quiz app that retrieves questions from an external server using API calls via Axios. The app is built using the Angular framework and styled with normal CSS.

### Components / Templates

- **WelcomePageComponent**: This component displays a form and makes dynamic API calls using the form data.
- **QuestionsPageComponent**: This component displays the questions one by one and shows the score at the end of the quiz.
- **ResultPageComponent**: This component displays the user's score after completing the quiz.

### Pipes

- **decodeUri**: This pipe transforms encoded values into decoded format.

### Services

- **quizService**: This service is used to make API calls using Axios.

### Dependencies

The following dependencies are used in this project:

- `@angular/animations: ^16.0.0`
- `@angular/common: ^16.0.0`
- `@angular/compiler: ^16.0.0`
- `@angular/core: ^16.0.0`
- `@angular/forms: ^16.0.0`
- `@angular/platform-browser: ^16.0.0`
- `@angular/platform-browser-dynamic: ^16.0.0`
- `@angular/router: ^16.0.0`
- `axios: ^1.4.0`
- `html-entities: ^2.3.5`
- `rxjs: ~7.8.0`
- `tslib: ^2.3.0`
- `zone.js: ~0.13.0`

### Development Dependencies

The following development dependencies are used in this project:

- `@angular-devkit/build-angular: ^16.0.3`
- `@angular/cli: ~16.0.3`
- `@angular/compiler-cli: ^16.0.0`
- `@types/jasmine: ~4.3.0`
- `jasmine-core: ~4.6.0`
- `karma: ~6.4.0`
- `karma-chrome-launcher: ~3.2.0`
- `karma-coverage: ~2.2.0`
- `karma-jasmine: ~5.1.0`
- `karma-jasmine-html-reporter: ~2.0.0`
- `typescript: ~5.0.2`
