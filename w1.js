/*current location weather. 
  Mandy Apr 2016*/
var API_KEY = "6b080c709528a920db976e333611142f";
var cel = false;
var wd;

function displayTemp(fTemp, c){
  if(c) return Math.round((fTemp - 32) * (5/9)) + " C";
  return Math.round(fTemp) + " F";
}

function render(wd,cel){
      var currentLocation = wd.name;
      var currentWeather = wd.weather[0].description;
      var currentTemp = displayTemp(wd.main.temp, cel);
      var high = displayTemp(wd.main.temp_max, cel);
      var low = displayTemp(wd.main.temp_min, cel);
      var icon = wd.weather[0].icon;
      var pressure = wd.main.pressure;       
              
      $('#currentLocation').html(currentLocation);
      $('#currentTemp').html(currentTemp);
      $('#currentWeather').html(currentWeather);
      $('#high-low').html(high + "/" + low);
      
      var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
      $('#currentTemp').prepend('<img src="' + iconSrc + '">');
}

$(function(){
  var loc;
  
  $.getJSON('http://ipinfo.io', function(d){
    loc = d.loc.split(","); //change string to array [a, b]
    console.log(loc);
    
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function(apiData){
      wd = apiData;
      render(apiData, cel);
      initMap(wd);
      
      $('#toggle').click(function(){
        cel = !cel;//flip itself from on and off, cel and f
        render(wd, cel);  
      })
    })
  })
})

function initMap(wd) {
  var uluru = {lat: wd.coord.lat, lng: wd.coord.lon};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}