# Interview Schedualer

## Project Description
Interview Schedualer is a single page application designed to allow students to book appointments with an interviewer of their choice any work day.
In addition to that, students have the ability to edit, or even delete their appointments if they wish.<br />
The data is available and new data is collected using PostgresSQL on the backend.<br />
The project also uses Storybooks to test every component individualy making sure that the action and css are as desired.
Cypress and Jest frameworks are also used to ensure further testing to provide expected results.
## Screenshots
![Main Page](https://github.com/Khaled91Alkhatib/scheduler/blob/master/docs/Main%20Page.png?raw=true)
![Adding New Appointment](https://github.com/Khaled91Alkhatib/scheduler/blob/master/docs/Adding%20new%20appointment.png?raw=true)
![Editing an Appointment](https://github.com/Khaled91Alkhatib/scheduler/blob/master/docs/Editing%20an%20appointment.png?raw=true)
![Deleting an Appointment](https://github.com/Khaled91Alkhatib/scheduler/blob/master/docs/Deleting%20an%20appointment.png?raw=true)
## Setup
### Scheduler-api
* Scheduler api should be installed by forking and cloning [schedualer-api server](https://github.com/lighthouse-labs/scheduler-api).
* Follow with the README file.
* Run the api server on a separate terminal using the command `npm start`.

### Scheduler
* Fork and Clone this repository.
* Install dependencies using `npm install`.
* Start the server using `npm start`(Make sure you start the api as well so that the data renders).

### Storybooks
* Type `npm run storybooks`.
### Jest Test Framwork
* Type `npm test` in the terminal.

## Dependencies
* axios
* classnames
* normalize.css
* react
* react-dom
* react-scripts

