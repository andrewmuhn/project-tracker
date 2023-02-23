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
  let projects = localStorage.getItem('projects');
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
  }
  return projects;
}

// Takes an array of projects and saves them in localStorage.
function saveProjectsToStorage(projects) {
  // set localStorage with stringified input
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Gets project data from local storage and displays it
function printProjectData() {
  // clear current projects on the page
  projectDisplayEl.empty();

  // get projects from localStorage
  let projects = readProjectsFromStorage();


  // loop through each project and create a row
  for (var i = 0; i < projects.length; i += 1) {
    // set local scoped variables
    let project = projects[i];
    let name = project.name;
    let type = project.type;
    let projectDate = dayjs(project.date);
    // get date/time for start of today
    let today = dayjs().startOf('day');


    // Create row and columns for project
    let rowEl = $('<tr>');
    let nameEl = $('<td>').text(name);
    let typeEl = $('<td>').text(type);
    let dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));


    // Save the index of the project as a data-* attribute on the button. This
    // will be used when removing the project from the array.
    let deleteEl = $(`<td><button class="btn btn-sm btn-delete-project" data-index="${i}">X</button></td>`);

    // add class to row by comparing project date to today's date (and if it's due)
    if (projectDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
      rowEl.addClass('project-today')
    }


    // append elements to DOM to display them
    rowEl.append(nameEl, typeEl, dateEl, deleteEl);
    projectDisplayEl.append(rowEl);
  }
}

// Removes a project from local storage and prints the project data
function handleDeleteProject() {
  // local scoped variables
  let projectIndex = parseInt($(this).attr('data-index'));
  let projects = readProjectsFromStorage();
  // remove project from the array
  projects.splice(projectIndex, 1);
  saveProjectsToStorage(projects);

  // print projects
  printProjectData();
}

// Adds a project to local storage and prints the project data
function handleProjectFormSubmit(event) {
  event.preventDefault();
  // read user input from the form

  let newProjectName = projectNameInputEl.val().trim();
  let newProjectType = projectTypeInputEl.val();
  let newProjectDueDate = projectDateInputEl.val();

  var newProject = {
    name: newProjectName,
    type: newProjectType,
    date: newProjectDueDate
  };


  // add project to local storage
  var projects = readProjectsFromStorage();
  projects.push(newProject);

  saveProjectsToStorage(projects);

  // print project data
  printProjectData();

  // clear the form inputs
  projectNameInputEl.val('');
  projectTypeInputEl.val('');
  projectDateInputEl.val('');

}

// add submit handler


// Use jQuery event delegation to listen for clicks on dynamically added delete buttons.
projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);

// add event handler via delegation

projectFormEl.on("submit", handleProjectFormSubmit);

displayTime();
setInterval(displayTime, 1000);

printProjectData();

