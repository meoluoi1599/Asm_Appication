var db;
var dbVersion = 1;
var dbReady = false;
var dbKey;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        initDb();
    }
};
function initDb() {
    let request = indexedDB.open('iRate', dbVersion);

    request.onerror = function(e) {
        console.error('Unable to open database.');
    }
    request.onsuccess = function(e) {
        db = e.target.result;
        console.log('db opened');
    }
    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        db.createObjectStore('rating', {keyPath:'id', autoIncrement: true});
        dbReady = true;
    }
}

function upload(e) {
    // Check field isn't empty
    if ($("#name").val() == "") {
  
        alert("Please Enter Restaurant Name.");
     
        $("#name").focus(); 
     
    } else if ($("#type").val() == "") {
     
        alert("Please Enter Restaurant Type.");
     
        $("#type").focus();
    } else if ($("#date").val() == ""){
        alert("Please Enter Date/Time of The Visit.");
     
        $("#date").focus();
    } else if ($("#average").val() == ""){
        alert("Please Enter Average Meal Price Per Person.");
     
        $("#average").focus();
    } else if ($("#reporter").val() == ""){
        alert("Please Enter Name of The Reporter.");
     
        $("#reporter").focus();
    } else{
        // Check service rating option to selected then plus point to calculate average rating 
        var point = 0;
        if($("#select_service").find(":selected").val() == 'Need to improve'){
            point = point + 40;
            console.log(point);
        } else if ($("#select_service").find(":selected").val() == 'Okay') {
            point = point + 60;
            console.log(point);
        } else if ($("#select_service").find(":selected").val() == 'Good') {
            point = point + 70;
            console.log(point);
        } else {
            point = point + 100;
            console.log(point);
        }
        // Check cleanliness rating option to selected then plus point to calculate average rating 
        if($("#select_cleanliness").find(":selected").val()  == 'Need to improve') {
            point = point + 50;
            console.log(point);
        } else if ($("#select_cleanliness").find(":selected").val()  == 'Okay') {
            point = point + 60;
            console.log(point);
        } else if ($("#select_cleanliness").find(":selected").val() == 'Good') {
            point = point + 70;
            console.log(point);
        } else {
            point = point + 80;
            console.log(point);
        }
         // Check food rating option to selected then plus point to calculate average rating 
        if($("#select_food").find(":selected").val() == 'Need to improve') {
            point = point + 50;
            console.log(point);
        } else if ($("#select_food").find(":selected").val() == 'Okay') {
            point = point + 60;
            console.log(point);
        } else if ($("#select_food").find(":selected").val() == 'Good') {
            point = point + 70;
            console.log(point);
        } else {
            point = point + 80;
            console.log(point);
        }
        // Calculate average rating = (food + cleanliness + service) /3
        var ratingPoint = point/3;
        console.log('rating'+ ratingPoint);
        // Average rating 
        let averageRating=''
        //if average rating point <= 55 average rating = Need to improve
        if (ratingPoint <= 55) {
            averageRating = 'Need to improve'
        } else if (ratingPoint <= 65) {
            //if average rating point <= 65 average rating = Okay
            averageRating = 'Okay'
        } else if (ratingPoint <= 75) {
            //if average rating point <= 75 average rating = Good
            averageRating = 'Good'
        }else {
            //Average rating point >75 average rating = Excellent
            averageRating = 'Excellent'
        }
        // Make object which include all data from html form.
        let ob = {
            created:new Date(),
            name: $("#name").val(),
            type: $("#type").val(),
            date: $("#date").val(),
            average: $("#average").val(),
            service: $("#select_service").find(":selected").val(),
            cleanliness: $("#select_cleanliness").find(":selected").val(),
            food: $("#select_food").find(":selected").val(),
            reporter: $("#reporter").val(),
            note: $("#note").val(),
            ratingAverage: averageRating
        }
        // Connect with database
        let trans = db.transaction(['rating'], 'readwrite');
        // Add object to database
        let addReq = trans.objectStore('rating').add(ob);
        // if there are error, it will console 'error storing data'
        addReq.onerror = function(e) {
            console.log('error storing data');
            console.error(e);
        }
        // if added, it will alert 'Thank for rating'
        trans.oncomplete = function(e) {
           alert('Thank for rating');
        }
    }
}

function refreshTable() {
    var objectStore = db.transaction("rating").objectStore("rating");  
    objectStore.openCursor().onsuccess = function(event) {
       var cursor = event.target.result; 
       console.log(cursor)     
       if (cursor) {        
          var name = cursor.value.name;
          var type = cursor.value.type;
          var date = cursor.value.date;
          var average = cursor.value.average;
          var service = cursor.value.service;
          var cleanliness = cursor.value.cleanliness;
          var food = cursor.value.food;
          var reporter = cursor.value.reporter;
          var keyPath = cursor.value.id;
          var note = cursor.value.note;
          var rating = cursor.value.ratingAverage;
          var markup = "<table  id='report_"
            + keyPath +"' class='customersRating' data-filter='true' data-input='#filterTable-input'><tr><th class='left'>"+ name +"</th><th class='right'><div id='action' class='ui-nodisc-icon ui-alt-icon'><a href='#' class='ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-inline' onclick='deleteData("
            + keyPath +")'><a href='#' class='ui-btn ui-shadow ui-corner-all ui-icon-edit ui-btn-icon-notext ui-btn-inline' data-toggle='modal' data-target='#myModal' onclick='edit("
            + keyPath +")'></div></th></tr><tr><td class='tblNameRow'>Type</td><td>" 
            + type + "</td></tr><tr> <td class='tblNameRow'>Date/Time</td><td>" 
            + date + "</td></tr><tr><td class='tblNameRow'>Average meal</td><td>"  
            + average  + "</td></tr><tr><td class='tblNameRow'>Service</td><td>"  
            + service + "</td></tr><tr><td class='tblNameRow'>Cleanliness</td><td>" 
            + cleanliness +"</td></tr><tr><td class='tblNameRow'>Food quality</td><td>" 
            + food +"</td></tr><tr><td class='tblNameRow'>Average Rating</td><td>" 
            + rating +"</td></tr><tr><td class='tblNameRow'>Reporter</td><td>" 
            + reporter +"</td></tr><tr><td class='tblNameRow'>Note</td><td>" 
            + note+ "</td></tr>";
          $("#ratingContent").append(markup);
          cursor.continue();//go to next record
       } 
    };
}
function del(key){
    var transaction = db.transaction(['rating'], "readwrite");
    var store = transaction.objectStore("rating")
    var request= store.delete(key);   
    
    request.onsuccess =() => {
        $('#report_'+key).remove();
        alert('Delete successfull!');
        
    }

    request.onerror = function(e) {
        console.log('error storing remove');
        console.error(e);
    }
}

function deleteData(key) {
    navigator.notification.confirm(
        'Are you sure you want to delete this rating?',
        confirmHandler,
        'Delete Rating',      
        ['Cancel','Delete']  
    );
    function confirmHandler(buttonIndex){
        if(buttonIndex == 1){
           del(key);
        }
    };
}


function deleteDataRefesh(){
    $("#ratingContent").remove();
    $("#two").append("<div id='ratingContent' class='ratingContent' data-filter='true' data-input='#filterTable-input'></div>");
}

function edit(key) {
    var transaction = db.transaction(['rating'], "readonly");
    var store = transaction.objectStore("rating");
    var request= store.get(key);
    request.onsuccess = function() {  
        var cursor = request.result;
        console.log(cursor) 
       if (cursor) {        
        var markup = "<b>Restaurant Name:</b><input type='text' id='editName'  class='form-control' value='"
            + cursor.name+"'/><b>Restaurant type:</b><input type='text' class='form-control' id='editType' value='"
            + cursor.type+"'/><b>Date/Time of the visit:</b><input name='editDate' class='form-control' id='editDate' value='"
            + cursor.date+"'/><b>Average meal price per person:</b><input type='number' class='form-control' id='editAverage' value='"
            + cursor.average+"'/><b>Service rating:</b><input type='text' class='form-control' id='editService' value='"
            + cursor.service+"'/><b>Cleanliness rating:</b><input type='text' class='form-control' id='editCleanliness' value='"
            + cursor.cleanliness+"'/><b>Food rating:</b><input type='text' class='form-control' id='editFood' value='"
            + cursor.food+"'/><b>Reporter:</b><input type='text' class='form-control' id='editReporter' value='"
            + cursor.reporter+"'/><b>Note:</b><textarea cols='40' rows='5' name='textarea-4' class='form-control' id='editNote'>"
            + cursor.note+"</textarea><input type='button' name='record' class='btn btn-default' id='updateButton' value='Update'  data-toggle='modal' data-target='#myModal' onclick='updateData("
            + cursor.id +")'>";
        $('.modal-body').append(markup)
       } 
    }
    request.oncomplete = function() {
        console.log('finish');
    }
}

function updateData(key) {
    var transaction = db.transaction(['rating'], "readwrite").objectStore("rating");
    var request = transaction.get(key);
    var averageRating = editAverageRating();
    console.log(averageRating)
    request.onsuccess = function() {
        var cursor = request.result;
        cursor.name =  $("#editName").val();
        cursor.name = $("#editName").val();
        cursor.type = $("#editType").val();
        cursor.date = $("#editDate").val();
        cursor.average = $("#editAverage").val();
        cursor.service = $("#editService").val();
        cursor.cleanliness = $("#editCleanliness").val();
        cursor.food = $("#editFood").val();
        cursor.reporter = $("#editReporter").val();
        cursor.note = $("#editNote").val();
        cursor.ratingAverage = averageRating;
        var requestUpdate = transaction.put(cursor);
        requestUpdate.onsuccess = function() {
            alert('Update successfull!');
            delModal();
            deleteDataRefesh();
            refreshTable();
        }
        requestUpdate.onerror = function() {
            alert('Error!');
        }
    }  
}
function editAverageRating() {
    var point = 0;
        if($("#editService").val() == 'Need to improve'){
            point = point + 40;
            console.log(point);
        } else if ($("#editService").val() == 'Okay') {
            point = point + 60;
            console.log(point);
        } else if ($("#editService").val() == 'Good') {
            point = point + 70;
            console.log(point);
        } else {
            point = point + 100;
            console.log(point);
        }
        // Check cleanliness rating option to selected then plus point to calculate average rating 
        if($("#editCleanliness").val()  == 'Need to improve') {
            point = point + 50;
            console.log(point);
        } else if ($("#editCleanliness").val()  == 'Okay') {
            point = point + 60;
            console.log(point);
        } else if ($("#editCleanliness").val() == 'Good') {
            point = point + 70;
            console.log(point);
        } else {
            point = point + 80;
            console.log(point);
        }
         // Check food rating option to selected then plus point to calculate average rating 
        if($("#editFood").val() == 'Need to improve') {
            point = point + 50;
            console.log(point);
        } else if ($("#editFood").val() == 'Okay') {
            point = point + 60;
            console.log(point);
        } else if ($("#editFood").val() == 'Good') {
            point = point + 70;
            console.log(point);
        } else {
            point = point + 80;
            console.log(point);
        }
        // Calculate average rating = (food + cleanliness + service) /3
        var ratingPoint = point/3;
        console.log('rating'+ ratingPoint);
        // Average rating 
        let averageRating=''
        //if average rating point <= 55 average rating = Need to improve
        if (ratingPoint <= 55) {
           return averageRating = 'Need to improve'
        } else if (ratingPoint <= 65) {
            //if average rating point <= 65 average rating = Okay
            return averageRating = 'Okay'
        } else if (ratingPoint <= 75) {
            //if average rating point <= 75 average rating = Good
            return averageRating = 'Good'
        }else {
            //Average rating point >75 average rating = Excellent
            return averageRating = 'Excellent'
        }
}
$('#closeButton').on('click', function () {
    delModal();
});
function delModal() {
    $("#modal-body").remove();
    $(".modal-content").append("<div class='modal-body' id='modal-body'></div>");
}
$( function() {
    $( ".controlgroup" ).controlgroup()
    $( ".controlgroup-vertical" ).controlgroup({
      "direction": "vertical"
    });
  } );