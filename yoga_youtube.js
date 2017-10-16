var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer');
}

$(function() {
  $("#play").click(function() {

    if ($(this).text() === 'Play') {
      $(this).text('Pause');
    } else {
      $(this).text('Play');
    }

    if (player.getPlayerState() === 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  })

  $("#mute").click(function() {

    if ($(this).text() === 'Mute') {
      $(this).text('Unmute');
    } else {
      $(this).text('Mute');
    }

    if (player.isMuted()) {
      player.unMute();
    } else {
      player.mute();
    }
  });

  $("#submission").click(function() {
    displayVideo();
  })
});


function displayVideo() {
  var randVid = Math.floor(Math.random() * 25)
  $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=soothing+music&fields=etag%2CeventId%2Citems%2Ckind%2CnextPageToken%2CpageInfo%2CprevPageToken%2CregionCode%2CtokenPagination%2CvisitorId&key=AIzaSyBeUBKCY-FKrkFNDepzl0iCkI9ykoLyTWo", function(data) {
    var url = "https://www.youtube.com/embed/" + data.items[randVid].id.videoId + "?controls=0&showinfo=0&rel=0&enablejsapi=1";
    console.log(url)
    $("#ytplayer").attr('src', url);
  });
}
