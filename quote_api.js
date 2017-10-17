$(function() {
  $.ajax({
    type: 'GET',
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&key=6&lang=en',
    xhrFields: {
      withCredentials: false
    },
    headers: {
      Access-Control-Allow-Origin: *
    }
    success: function(data) {
      console.log(data);
    },
    error: function() {
      console.log('error');
    }
  });
})
