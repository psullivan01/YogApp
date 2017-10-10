
var poses = {quads:["Saddle", "Lizard", "Half Saddle", "Twisted Lizard"],
  hamstrings:["Seated Forward Fold", "Standing Straddle", "Half Front Split", "Dragon"],
  hips:["Pigeon", "Seated Cross Shin", "Bound Angle"],
  lowerBack:["Single Leg Forward Fold", "Puppy Dog", "Single Leg Forward Fold with QLT", "Sphinx"],
  upperBack:["Saddle Eagle", "Saddle Archer", "Standing Forward Fold with Interlacing Fingers"],
  shoulders:["Child's Pose with Shoulders", "Twisted Cross", "Thread the Needle"],
};

$(function() {
  $("#yoga-form").submit(function(e) {
    e.preventDefault();
  });

  var contents = {"duration":10, "muscle":[]};
// when the user clicks submit...
  $("#submission").click(function() {
// Add the selected time into the contents object
    contents.muscle = []
    contents.duration = $("#select").val();
    $("#summaryTable tr").remove();
    $("#confirm").remove();
// Push the chosen workouts into the contents object
    if ($("#inlineCheckbox1").is(":checked")) {
      contents.muscle.push($("#inlineCheckbox1").attr('value'))
    }
    if ($("#inlineCheckbox2").is(":checked")) {
      contents.muscle.push($("#inlineCheckbox2").attr('value'))
    }
    if ($("#inlineCheckbox3").is(":checked")) {
      contents.muscle.push($("#inlineCheckbox3").attr('value'))
    }
    if ($("#inlineCheckbox4").is(":checked")) {
      contents.muscle.push($("#inlineCheckbox4").attr('value'))
    }
    if ($("#inlineCheckbox5").is(":checked")) {
      contents.muscle.push($("#inlineCheckbox5").attr('value'))
    }
    if ($("#inlineCheckbox6").is(":checked")) {
      contents.muscle.push($("#inlineCheckbox6").attr('value'))
    }

    console.log(contents);
// Generate the workout options and duration for each
    var poseTime = contents.duration / contents.muscle.length;
    var selection = {time:poseTime, pose:[]}

    for (var i = 0; i < contents.muscle.length; i++) {
// Generate random pose assigner
      var muscle = contents.muscle[i];
      var muscleArrayLength = poses[muscle].length
      var selector = Math.floor(Math.random() * muscleArrayLength)
      selection.pose.push(poses[muscle][selector]);
    }

    console.log(selection);
// Populate table with summary info
    for (var i = -1; i < selection.pose.length; i++) {
      if (i === -1) {
        $("#summaryTable").append("<thead><tr><th>Duration</th><th>Pose</th></tr></thead>");
      } else {
        $("#summaryTable").append("<tbody><tr><td>" + selection.time + " minutes</td><td>" + selection.pose[i] + "</td></tr></tbody>");
      }
    }
// Generate Acceptance Button
    $("#result").append("<button type='submit' class='btn btn-primary' id='confirm'>Continue</button>");

    $("#confirm").click(function() {
      $("#topDiv").empty();
      $("#topDiv").append("<button type='submit' class='btn btn-primary' id='reload'>Go Back</button>");
      $("#reload").click(function() {
        location.reload();
      });

      function displayTime(totalSeconds) {
        $("#time").empty();

        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;

        if (seconds < 10) {
          seconds = '0' + seconds;
        }

        $("#time").append(minutes + ":" + seconds);
        totalSeconds--;

        if (totalSeconds > 0) {
          setTimeout(function() {
            $("#time").empty();
            displayTime(totalSeconds);
          }, 1000);
        }
      }

// Display Poses on given interval
      function displayPoses(time, pose) {
        var move = pose.pop();
        var totalSeconds = time * 60;

        if (move === "Lizard") {
          $("#poses").append("<img class='img-responsive center-block' src='img/lizard.jpg'></img>");
          $("#move").append(move);
        } else if (move === "Saddle") {
          $("#poses").append("<img class='img-responsive center-block' src='img/saddle.png'></img>");
          $("#move").append(move);
        } else if (move === "Seated Forward Fold") {
          $("#poses").append("<img class='img-responsive center-block' src='img/seated_forward_fold.jpg'></img>");
          $("#move").append(move);
        } else if (move === "Standing Straddle") {
          $("#poses").append("<img class='img-responsive center-block' src='img/standing_straddle.jpg'></img>");
          $("#move").append(move);
        } else if (move === "Pigeon") {
          $("#poses").append("<img class='img-responsive center-block' src='img/pigeon.jpg'></img>");
          $("#move").append(move);
        } else if (move === "Seated Cross Shin") {
          $("#poses").append("<img class='img-responsive center-block' src='img/seated_cross_shin.jpg'></img>");
          $("#move").append(move);
        } else if (move === "Single Leg Forward Fold") {
          $("#poses").append("<img class='img-responsive center-block' src='img/single_leg_forward_fold.png'></img>");
          $("#move").append(move);
        } else if (move === "Puppy Dog") {
          $("#poses").append("<img class='img-responsive center-block' src='img/puppy_dog.jpg'></img>");
          $("#move").append(move);
        }

        displayTime(totalSeconds);

        if (pose.length) {
          setTimeout(function() {
            $("#poses").empty();
            $("#move").empty();
            displayPoses(time, pose);
          }, time * 60000);
        }
      }

      displayPoses(selection.time, selection.pose);

    });
  });
});
