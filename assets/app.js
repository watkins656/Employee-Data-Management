
var $submitButton = $('#submit-button');
var $table = $('#employee-table')
var currentDate = new Date();
console.log(currentDate);
$submitButton.on('click', function (event) {
    console.log('clicked');
    var employeeName = $('#employeeName').val().trim();
    var role = $('#employeeRole').val().trim();
    var startDate = $('#startDate').val().trim();
    var monthlyRate = $('#monthlyRate').val().trim();
    var monthsWorked = 0;
    // months(currentDate - startDate);
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
    $table.append(newRow);
});

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
        monthlyRate = $('#monthlyRate').val().trim();

        var newRow = `
        <tr>
            <td>${employeeName}</td>
            <td>${role}</td>
            <td>${startDate}</td>
            <td>${startDate}</td>    
            <td>${monthlyRate}</td>    
            <td>${monthlyRate}</td>    
        </tr>
        `
                employeesArr.push(newRow);
        $('#employee-form')[0].reset();

        database.ref().set({
            employee: JSON.stringify(employeesArr)
        });
    })
