//Global variables that house all inputs as arrays
var globalArr = [];

//Resets the entire page
function reset(){
  globalArr = []
  $("#hrs, #mins, #secs, #frames").val("");
  $("#result, #running-total").html(""); 
  $('#hrs').focus();
  $('#result').removeClass('result-container');
}

//Ensures there's always two digits (preceeds with a 0)
function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

//If input is empty replace with a 0 to avoid error
function isItNan(n) {
  return (isNaN(n) ? 0 : n);
}

//Runs the function on hitting the enter key and moves the cursor back to hours - for smoother UX
document.onkeyup = function(event) {
    if (event.keyCode == 13) {
      $('#hrs').focus();
      addToArr();
    }
}

//Undo removes the last array item from global array
function undo() {
  if (globalArr.length > 1 ){
    globalArr.pop()
    toTimestamp()
  } else {
    reset()
  }
}

//Function adds input to global array as an array
function addToArr(){
  var resultArr = []; 
  
  //Parses input as integer, checks if NaN and adds input variable
  var currentFrames = isItNan(parseInt(document.getElementById("frames").value));
  var currentSeconds = isItNan(parseInt(document.getElementById("secs").value)); 
  var currentMinutes = isItNan(parseInt(document.getElementById("mins").value)); 
  var currentHours = isItNan(parseInt(document.getElementById("hrs").value));
  
  //Pushes variables to a local array
  resultArr.push(currentHours, currentMinutes, currentSeconds, currentFrames);
    
  //Pushes array to global array
  globalArr.push(resultArr);
   
  //Runs next function
  toTimestamp()
  
};


 function toTimestamp() {
   //variables house the sum of all integers from the globalArr
   var framerate = parseInt(document.getElementById('framerate').value);
   var totalHours = 0
   var totalMinutes = 0
   var totalSeconds = 0
   var totalFrames = 0
   var currentTime = "<li>"
   
   //for loop through globalArr
   for (i = 0 ; i < globalArr.length ; i++){
       //Loops through the current array in globalArr and adds the current value to currentTime as a HTML string
       for (a = 0 ; a < globalArr[i].length ; a++) {
         if (a <= 2){
           currentTime += minTwoDigits(globalArr[i][a]) + ":";
         }
         else {
           currentTime += "<i>" + minTwoDigits(globalArr[i][a]) + "</i>";
         }
       }
      currentTime += "</br>"
   
     //loops over the current array inside globalArr and adds the value to totalHours / Minutes / Seconds, depending on it's position in the array
     for (e = 0 ; e < globalArr[i].length ; e++){
        if (e === 0){        
         totalHours += globalArr[i][e];
        }
        else if (e === 1){  
         totalMinutes += globalArr[i][e];
        }
       else if (e === 2){
         totalSeconds += globalArr[i][e];
       }
       else {
         totalFrames += globalArr[i][e];
       }
     }
   }
  
   //closes the currentTime string variable once the for loop has finished
   currentTime += "</li>";
   
   //Checks if total frames are more than the selected framerate, if yes adds a second and removes the frames
   if (totalFrames >= framerate){
     totalSeconds += Math.floor(totalFrames / framerate)
     totalFrames = (totalFrames % framerate)
   };   
   
  //Checks if total seconds are more than 60, if yes adds a minute and removes 60 seconds 
  if (totalSeconds >= 60) {
    totalMinutes += Math.floor(totalSeconds / 60)
    totalSeconds = (totalSeconds % 60)
  }
  
  //Checks if total minutes are more than 60, if yes adds an hour and removes 60 minutes  
  if (totalMinutes >= 60) {
    totalHours += Math.floor(totalMinutes / 60)
    totalMinutes = (totalMinutes % 60)
  }
  
  //Returns the result to a variable
  var result_html = minTwoDigits(totalHours) + ':' + minTwoDigits(totalMinutes) + ':' + minTwoDigits(totalSeconds) + "<i>:" + minTwoDigits(totalFrames) + "</i>";
  
   
  //Pushes variables to HTML with Jquery
  $("#running-total").html(currentTime);
  $("#result").html(result_html); 
  $("#result").addClass('result-container');
  
  //Resets input ready for another
  $("#hrs, #mins, #secs, #frames").val("");
  
};

