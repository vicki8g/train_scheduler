// Initialize Firebase

  var config = {
    apiKey: "AIzaSyCbABW7CGC5AbceV6w0iVQtQaTtefumNOE",
    authDomain: "trainschedule-8a510.firebaseapp.com",
    databaseURL: "https://trainschedule-8a510.firebaseio.com",
    storageBucket: "trainschedule-8a510.appspot.com",
    messagingSenderId: "499646180421"
  };
  firebase.initializeApp(config);
  var trainData = firebase.database();

// Button to add Train Names
$("#addTrainBtn").on("click", function() {

  // Scan user input
  var train_Name = $("#trainNameInput").val().trim();
  var train_Destination = $("#destination-input").val().trim();
  var first_Train = moment($("#firstTrtainTime").val().trim(), "HH:mm").format("X");
  var frequency_Train = $("#frequency-input").val().trim();

  // Update time infront of previous display
      var firstTimeConverted = moment.unix(first_Train).subtract(1, "years"); 
      console.log(firstTimeConverted);
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
      // Difference in times
      var diffTime = moment().diff(firstTimeConverted, "minutes");
    
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var timeRemaining = diffTime % frequency_Train;
      console.log(timeRemaining);

      // Minute Until Train
      var timeTillArrival = frequency_Train - timeRemaining;
      console.log("MINUTES TILL TRAIN: " + timeTillArrival);

      // Next Train
      var nextTrain = moment().add(timeTillArrival, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

      // Arrival time
      nextArrival = moment(nextTrain).format("HH:mm a");

  // Creates local storage
  var newTrain = {
    name: train_Name,
    dest: train_Destination,
    first: first_Train,
    freq: frequency_Train,
    timeTillArrival: timeTillArrival,
    nextArrival: nextArrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,

  };

  // Update train data
  database.ref().push(newTrain);


  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);
  console.log(newTrain.timeTillArrival);
  console.log(newTrain.nextArrival);
  console.log(newTrain.dateAdded);


  // Clear train informatiom
  $("#trainNameInput").val("");
  $("#destination-input").val("");
  $("#firstTrtainTime").val("");
  $("#frequency-input").val("");

 // stop moving from page
  return false;    

});

// Create Firebase event for adding TRAINS to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.

  var train_Name = childSnapshot.val().name;
  var train_Destination = childSnapshot.val().dest;
  var first_Train = childSnapshot.val().first;
  var frequency_Train = childSnapshot.val().freq;
  var timeTillArrival = childSnapshot.val().timeTillArrival;
  var nextArrival = childSnapshot.val().nextArrival;

  

  // Train Info
  console.log(train_Name);
  console.log(train_Destination);
  console.log(first_Train);
  console.log(frequency_Train);

  // Prettify 
  var trnStartPretty = moment.unix(first_Train).format("HH:mm");


  // update the table with train information
  $("#train-table > tbody").append("<tr><td>" + train_Name + "</td><td>" + train_Destination + "</td><td>" +
  frequency_Train + "</td>   <td>" + nextArrival + "</td><td>" + timeTillArrival + "</td>    </tr>");

  

});



