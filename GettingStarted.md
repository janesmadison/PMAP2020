![PMAP LOGO](/src/assets/logo.png)
# Getting Started

The project was created by Madison Janes, Tavarius Fleming, and Faith Hough.

In order to run the project, if using XAMPP, you will need to create a Database using the tables found in pmap_database.sql and pmap_database.pdf in the backend directory. After installation of everything below, do an ng build --prod and copy the dist and backend files into XAMPP's htdocs folder. Then, in your browser, go to localhost:8080/dist/pmap. From here you will need to adjust some configurations to get everything to work correctly. (More at Bottom)

## Installation
You will need to install NPM package manager, Node, and angular CLI. Follow this tutorial https://www.techiediaries.com/angular/angular-9-8-cli-commands-install-angular-cli-on-windows-10-linux-and-macos/

We recommend installing XAMPP to manage apache, php, and MySQL.

## NPM
NPM is used in this project for package management. It generates the package.json file. [NPM Tutorial](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

## Angular
Angular is the platform for building our desktop web application.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

*How do I use angular?*
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## PHP
PHP is what our backend files are written in. It follows the CRUD system, and comes packaged with XAMPP.
*How do I use PHP?*
[PHP Tutorial](https://www.w3schools.com/php/)

## XAMPP
Tutorial for getting started with XAMPP (should you choose to use it)
https://www.ionos.com/digitalguide/server/tools/xampp-tutorial-create-your-own-local-test-server/

## Database
You will need to create a MySQL database local to your machine using files provided. If you use XAMPP, this can be easily managed in PHPMyAdmin which is the GUI found within XAMPP on the browser.

##Further Help Running Program
These are the notes I took on things that will need to be changed and checked as far as configuring XAMPP. These notes aren't perfect and each will need to be googled separately. *If you absolutely can't get it to connect, in login.service change the code so it doesn't require backend connection. Route straight to home page instead.*

LocalHost:8080 will need to be adjusted to Localhost:8080/dist/PMAP2020 in Index.php or Config of XAMPP (maybe)

Ports need to be changed from 80 to 8080 and 443 to 4433 in Apache Config within XAMPP.

Change email settings in php.ini and sendmail.ini so that the backend can send out email invitations.


GettingStarted.md was edited by Madison Janes on 5/6/2020.
