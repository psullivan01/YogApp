
var poses = {quads:["Saddle", "Lizard"],
  hamstrings:["Seated Forward Fold", "Standing Straddle"],
  hips:["Pigeon", "Seated Cross Shin"],
  lowerBack:["Single Leg Forward Fold", "Puppy Dog"]};

$(function() {
  $("#yoga-form").submit(function(e) {
    e.preventDefault();
  });

  var contents = {duration:10, muscle:[]};
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

    console.log(contents);
// Generate the workout options and duration for each
    var poseTime = contents.duration / contents.muscle.length;
    var selection = {time:poseTime, pose:[]}

    for (var i = 0; i < contents.muscle.length; i++) {
// Generate random pose assigner
      if (Math.random() < .5) {
        var selector = 0;
      } else {
        var selector = 1;
      }

      var muscle = contents.muscle[i];
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
      $(".container").empty();
      $("#topDiv").append("<button type='submit' class='btn btn-primary' id='reload'>Go Back</button>");
      $("#reload").click(function() {
        location.reload();
      });

      function displayTimer(time) {
        var timer = time, minutes, seconds;

        setInterval(function() {

          minutes = Math.floor(time);
          seconds = (time % 1) * 60;

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          $("#time").append(minutes + ":" + seconds);

          if (--timer < 0) {
            timer = time
          }
        }, 1000);
      }

      function displayPoses(time, pose) {
        var move = pose.pop();

        if (move === "Lizard") {
          $("#poses").append("<img src='img/lizard.jpg'></img>");
        } else if (move === "Saddle") {
          $("#poses").append("<img src='img/saddle.png'></img>");
        } else if (move === "Seated Forward Fold") {
          $("#poses").append("<img src='img/seated_forward_fold.jpg'></img>");
        } else if (move === "Standing Straddle") {
          $("#poses").append("<img src='img/standing_straddle.jpg'></img>");
        } else if (move === "Pigeon") {
          $("#poses").append("<img src='img/pigeon.jpg'></img>");
        } else if (move === "Seated Cross Shin") {
          $("#poses").append("<img src='img/seated_cross_shin.jpg'></img>");
        } else if (move === "Single Leg Forward Fold") {
          $("#poses").append("<img src='img/single_leg_forward_fold.png'></img>");
        } else if (move === "Puppy Dog") {
          $("#poses").append("<img src='img/puppy_dog.jpg'></img>");
        }

        displayTimer(time);

        if (pose.length) {
          setTimeout(function() {
            $("#poses").empty();
            displayPoses(time, pose);
          }, time * 60000)
        }
      }

      displayPoses(selection.time, selection.pose);

    });
  });
});
