//Math for making time in ms into days
var _MS_PER_DAY = 1000 * 60 * 60 * 24;

// Javascript Date objects
//var startDate = new Date(2017, 10, 14);
//var endDate = new Date(2017, 10, 18);
function reset(){
  $("#result").html(""); 
  $("#start").val(""); 
  $("#end").val(""); 
  $('#result').removeClass('result-container');
}
//Function for calculating time between two dates
function dateCalculator(a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

//Function to format into weeks with decimal point
function dateDiff() {  

  var startDate = new Date($('#start').val())
  var endDate = new Date($('#end').val())
  
  var date = dateCalculator(startDate, endDate);
  
  var weeks = Math.floor(date / 7);
  var days = date % 7;
  
  var result = "";
  
  if (days >= 5) {
    result = weeks += 1;
  }
  else {
    days = ((days / 10) * 2) * 10;
    result =  weeks + "." + days;
  }
    
  
  $("#result").html(result); 
  $("#result").addClass('result-container');
  
}



