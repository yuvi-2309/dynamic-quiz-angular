Title: Quiz App

Framework: Angular

Description: A simple quiz app which retrieves questions from an external server using api calls via axios. 

Styling: Normal css is used

Components / Templates: 
WelcomePageComponent - To display the form and make dynamic api calls using the form data
QuestionsPageComponent - To display the questions one by one and display the score at the end of the quiz
ResultPageComponent - To display the score of the user after completing the test

Pipes:
decodeUri - This is used to transform encoded values into decoded format

Services:
quizService - Used to make api calls using axios

Dependencies:

The following dependencies are used in this project:
@angular/animations: ^16.0.0
@angular/common: ^16.0.0
@angular/compiler: ^16.0.0
@angular/core: ^16.0.0
@angular/forms: ^16.0.0 (Used for validations)
@angular/platform-browser: ^16.0.0
@angular/platform-browser-dynamic: ^16.0.0
@angular/router: ^16.0.0 (Used for routing from one template to another)
axios: ^1.4.0 (Used for making api calls)
html-entities: ^2.3.5 (Used for decoding the questions)
rxjs: ~7.8.0 
tslib: ^2.3.0
zone.js: ~0.13.0

Development Dependencies

The following development dependencies are used in this project:
@angular-devkit/build-angular: ^16.0.3
@angular/cli: ~16.0.3
@angular/compiler-cli: ^16.0.0
@types/jasmine: ~4.3.0
jasmine-core: ~4.6.0
karma: ~6.4.0
karma-chrome-launcher: ~3.2.0
karma-coverage: ~2.2.0
karma-jasmine: ~5.1.0
karma-jasmine-html-reporter: ~2.0.0
typescript: ~5.0.2