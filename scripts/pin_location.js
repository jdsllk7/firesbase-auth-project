//Pin Location
function getLocation() {
  records_submit_btn.innerHTML = "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-blue-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    var text = '<span>ERROR: Check Internet Connection!</span>';
    M.toast({
      html: text
    });
  } //end else
} //end getLocation()

var lat, long;

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  var text = '<span class="green-text text-lighten-3"><b>SUCCESS:</b> Location Pinned Successfully! <i class="material-icons">check_box</i></span>';
  M.toast({
    html: text
  });
  records_submit_btn.innerHTML = 'submit <i class="material-icons right">open_in_new</i>';
} //end showPosition()

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      var text = '<span>ERROR: User denied the request for Geolocation!</span>';
      M.toast({
        html: text
      });
      break;
    case error.POSITION_UNAVAILABLE:
      var text = '<span>ERROR: Location information is unavailable<br>Check Internet Connection!</span>';
      M.toast({
        html: text
      });
      break;
    case error.TIMEOUT:
      var text = '<span>ERROR: The request to get user location timed out!</span>';
      M.toast({
        html: text
      });
      break;
    case error.UNKNOWN_ERROR:
      var text = '<span>ERROR: An unknown error occurred!</span>';
      M.toast({
        html: text
      });
      break;
  }
  records_submit_btn.innerHTML = 'submit <i class="material-icons right">open_in_new</i>';
} //end showError()