// save reference to important DOM elements
var timeDisplayEl = $('#time-display');
var projectDisplayEl = $('#project-display');
var projectFormEl = $('#project-form');
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var projectDateInputEl = $('#project-date-input');

// handle displaying the time
function displayTime() {
  // use dayjs to find date and print that
  const now = dayjs().format('MMM DD, YYYY [at] HH:mm:ss a')
  timeDisplayEl.text(now);
}

// Reads projects from local storage and returns array of project objects.
// Returns an empty array ([]) if there aren't any projects.
function readProjectsFromStorage() {
  // find from localStorge and parse otherwise fall back to empty array
}

// Takes an array of projects and saves them in localStorage.
function saveProjectsToStorage(projects) {
  // set localStorage with stringified input
}

// Gets project data from local storage and displays it
function printProjectData() {
  // clear current projects on the page


  // get projects from localStorage


  // loop through each project and create a row
  for (var i = 0; i < projects.length; i += 1) {
    // set local scoped variables

    // get date/time for start of today


    // Create row and columns for project


    // Save the index of the project as a data-* attribute on the button. This
    // will be used when removing the project from the array.


    // add class to row by comparing project date to today's date (and if it's due)


    // append elements to DOM to display them

  }
}

// Removes a project from local storage and prints the project data
function handleDeleteProject() {
  // local scoped variables

  // remove project from the array


  // print projects

}

// Adds a project to local storage and prints the project data
function handleProjectFormSubmit(event) {
  event.preventDefault();

  // read user input from the form


  var newProject = {};

  // add project to local storage
  var projects = readProjectsFromStorage();
  projects.push(newProject);
  saveProjectsToStorage(projects);

  // print project data
  printProjectData();

  // clear the form inputs

}

// add submit handler


// Use jQuery event delegation to listen for clicks on dynamically added delete
// buttons.
// add event handler via delegation


displayTime();
setInterval(displayTime, 1000);

printProjectData();

//add datepickewidget to modal
$(() => {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});