

$(function() {
  $("#yoga-form").submit(function(e) {
    e.preventDefault();
  });

  var contents = {"duration":10, "muscle":[]};
// when the user clicks submit...
  $("#submission").click(function() {
// Add the selected time into the contents object
    // contents.muscle = []---- Moved this to line 98
    contents.duration = $("#select").val();
    $("#summaryTable tr").remove();
    $("#confirm").remove();




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
        $("#summaryTable").append("<thead><tr><th>Duration</th><th>Body Type</th><th>Pose</th></tr></thead>");
      } else {
        $("#summaryTable").append("<tbody><tr><td>" + selection.time + " minutes</td><td>" + contents.muscle[i] + "</td><td>" + selection.pose[i] + "</td></tr></tbody>");
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

        console.log(links[move]);

        $("#poses").append("<img class='img-responsive center-block' src='" + links[move] + "'></img>");
        $("#move").append(move);

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
    contents.muscle = []
  });

  $("#addButton1").click(function(){
    contents.muscle.push($("#addButton1").attr('value'))
    console.log(contents.muscle);
  });
  $("#addButton2").click(function(){
    contents.muscle.push($("#addButton2").attr('value'))
    console.log(contents.muscle);
  });
  $("#addButton3").click(function(){
    contents.muscle.push($("#addButton3").attr('value'))
    console.log(contents.muscle);
  });
  $("#addButton4").click(function(){
    contents.muscle.push($("#addButton4").attr('value'))
    console.log(contents.muscle);
  });
  $("#addButton5").click(function(){
    contents.muscle.push($("#addButton5").attr('value'))
    console.log(contents.muscle);
  });
  $("#addButton6").click(function(){
    contents.muscle.push($("#addButton6").attr('value'))
    console.log(contents.muscle);
  });
});
