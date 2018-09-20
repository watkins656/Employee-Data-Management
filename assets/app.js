
var $submitButton = $('#submit-button');
var $table = $('#employee-table')

function months(m) {
    Math.floor(m);
}

var config = {
    apiKey: "AIzaSyAmWr8ii49FfwxLRqC6z-xqcSGxoTbXjhQ",
    authDomain: "employee-tracker-3227c.firebaseapp.com",
    databaseURL: "https://employee-tracker-3227c.firebaseio.com",
    projectId: "employee-tracker-3227c",
    storageBucket: "",
    messagingSenderId: "493824084369"
};
firebase.initializeApp(config);
var database = firebase.database();
var employeesArr = [];
database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    employeesArr = JSON.parse(snapshot.val().employee);
    employeesArr.forEach(el => {
        $('#employee-table').prepend(el);

    });
})

var employeeName = '';
var role = '';
var startDate = '';
var monthlyRate = 0;
$("#submit-button").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();
    // YOUR TASK!!!
    employeeName = $('#employeeName').val().trim();
    role = $('#employeeRole').val().trim();
    startDate = $('#startDate').val().trim();
    var startDateFormat = "MM/DD/YYYY";
    var convertedDate = moment(startDate, startDateFormat);
    var monthsWorked = Math.abs(convertedDate.diff(moment(), 'months'));
    console.log(monthsWorked);
    monthlyRate = $('#monthlyRate').val().trim();

    var newRow = `
        <tr>
            <td>${employeeName}</td>
            <td>${role}</td>
            <td>${startDate}</td>
            <td>${monthsWorked}</td>    
            <td>${monthlyRate}</td>    
            <td>${monthsWorked * monthlyRate}</td>    
        </tr>
        `
    employeesArr.push(newRow);
    $('#employee-form')[0].reset();

    database.ref().set({
        employee: JSON.stringify(employeesArr)
    });
})
