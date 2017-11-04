//configure firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfG1REctxamY3bi_EodtUsO2zq1uCGUPI",
    authDomain: "trainschedule-862f8.firebaseapp.com",
    databaseURL: "https://trainschedule-862f8.firebaseio.com",
    projectId: "trainschedule-862f8",
    storageBucket: "trainschedule-862f8.appspot.com",
    messagingSenderId: "490332700561"
  };

  firebase.initializeApp(config);

//declare variables
  
  var database = firebase.database();

  var TrainName = "";
  var destination = "";
  var firstTime = "";
  var frequency = "";
  

//on-click function to add train
$("#addTrain").on("click", function(event) 
	{

     event.preventDefault();

      TrainName = $("#addTrainName").val().trim();
      destination = $("#addDestination").val().trim();
      firstTime = moment($("#addTrainTime").val().trim(), "HH:mm").format("");
      frequency = $("#addFrequency").val().trim();

      database.ref().push({
        TrainName: TrainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency

      });

       TrainName = $("#addTrainName").val("");
      destination = $("#addDestination").val("");
      firstTime = $("#addTrainTime").val("");
      frequency = $("#addFrequency").val("");

	});

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.TrainName);
      console.log(sv.destination);
      console.log(sv.firstTime);
      console.log(sv.frequency);

      var TimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

      var diffTime = moment().diff(moment(TimeConverted), "minutes");

      var tRemainder = diffTime % frequency;

      var MinTillTrain = frequency - tRemainder;

      var nextTrain = moment().add(MinTillTrain, "minutes");
      var nextTrainConverted = moment(nextTrain).format("hh:mm a");
    

      // Change the HTML to reflect
      $("#employeeTable").append(
        "<tr><td>" + sv.TrainName + 
        "</td><td>" + sv.destination + 
        "</td><td>" +  sv.frequency + 
        "</td><td>" +  nextTrainConverted + 
        "</td><td>" + MinTillTrain +
        "</td></tr>");


      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

		
