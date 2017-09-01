//totalHoliday based on 52 weeks of work
var totalHol; 
//Percentage of holiday pay owed for the whole year
var holPayPercentage;

//Total weeks worked by employee
var weeksWorked;

//payRate is weekly earning rate of employee
var payRate;

//Amount of holiday taken by the employee as a decimal
var holTaken;

//Days worked accounts for part-time workers 
var daysWorked;

function submit(){
	totalHol = document.getElementById("totalHol").value;
	holPayPercentage = document.getElementById("holPercent").value;
	weeksWorked = document.getElementById("weeksWorked").value;
	payRate = document.getElementById("payRate").value;
	holTaken = document.getElementById("holTaken").value;
	daysWorked = document.getElementById("daysWorked").value;

	$("#result-container").html("");

	errorCheck();
}

function errorCheck(){
	var errorCount = 0

	if(totalHol === ""){
		$('<style>.glyphicon-time { color: #D56062; }</style>').appendTo('head');
		errorCount += 1;
	}

	if(weeksWorked === ""){
		$('<style>.glyphicon-stats { color: #D56062; }</style>').appendTo('head');
		errorCount += 1;
	}

	if(payRate < 1){
		$('<style>.glyphicon-piggy-bank { color: #D56062; }</style>').appendTo('head');
		errorCount += 1;
	}

	if(holTaken === ""){
		holTaken = 0;
	}

	if(errorCount === 0){
		$('<style>.glyphicon-plane { color: black; }</style>').appendTo('head');
		$('<style>.glyphicon-piggy-bank { color: black; }</style>').appendTo('head');
		$('<style>.glyphicon-stats { color: black; }</style>').appendTo('head');
		$('<style>.glyphicon-time { color: black; }</style>').appendTo('head');
		calculateHol();
	}

}


function calculateHol() {
	//holPerWeek is how much holiday the employee has per week if working a full year
	var holPerWeek = totalHol / 52;

	//Total amount of holiday available to employee
	var availableHol = ((((holPerWeek * weeksWorked).toFixed(2)) / 5) * daysWorked).toFixed(2);

	//Holiday remaining for time employed
	var remainingHol = (availableHol - holTaken).toFixed(2);

	//Total amount earned by employee before tax
	var totalEarnt = payRate * weeksWorked;

	//Total amount of holiday pay owed to the employee
	var totalHolPayOwed = ((totalEarnt / 100 * holPayPercentage) * 100).toFixed(2);

	//
	var moneyOwedForUnusedHol = ((totalHolPayOwed / availableHol) * (availableHol - holTaken)).toFixed(2);

	var result_html = "<div class='row'><div class='col-lg-2 col-md-2'></div><div class='col-lg-2 col-md-2 col-sm-6 col-xs-6'><h5>Holiday pay owed</h5><p id='result-num-1'>" + "£" + moneyOwedForUnusedHol + "</p></div><div class='col-lg-2 col-md-2 col-sm-6 col-xs-6'><h5>Total pay</h5><p id='result-num-2'>" + "£" + totalEarnt + "</p></div><div class='col-lg-2 col-md-2 col-sm-6 col-xs-6'><h5>Total holiday allowance</h5><p id='result-num-3'>" + availableHol + "<span> days</span></p></div><div class='col-lg-2 col-md-2 col-sm-6 col-xs-6'><h5>Holiday remaining</h5><p id='result-num-4'>" + remainingHol + "<span> days</span></p></div><div class='col-lg-2 col-md-2'></div></div>"
  	


  	$("#result-container").html(result_html);  
}


