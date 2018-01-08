$(document).ready(function() {"use strict";
  var geocoder;
  var map;

  $('#search').click(function () {
    var address=$('#city').val();

    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {

        console.log('geocoder results:');
        console.dir(results);

        var mapOptions = {
          zoom: 4,
          mapTypeControl: true,
          mapTypeControlOptions: {

          },
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
          },
          //streetViewControl: false,
          center: results[0].geometry.location
        };

        map = new google.maps.Map(document.getElementById('map1'), mapOptions);

        $('#lat').text(results[0].geometry.location.lat());
        $('#lng').text(results[0].geometry.location.lng());

        //map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        draggable: true,
        animation: google.maps.Animation.DROP
      });
      }
    });

  });

});

function submit()
    {
        document.getElementById("search").click(); // Simulates button click
        document.submitForm.submit(); // Submits the form without the button
    }

$(document).ready(function(){
  $('#search').click(function(){"use strict";
     var city =$("#city").val();

     if(city  !==''){

       $.ajax({
         url:"http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" +
         "&APPID=d00b027ee0a3f47d744782cbc83ff375",
         type: "GET",
         dataType:"jsonp",
         success: function(data){
           var widget = show(data);

           $("#weather-display").html(widget);

           $("#city").val('');
         }
       });


     }
  });

});

function show(data){
  return "<h4>Current Weather for " + data.name + " , " + data.sys.country +"</h4>" +
         "<h5>Weather: "+ data.weather[0].main +"</h5>" +
         "<h5> <img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'>" +"</h5>" +
         "<h5>Description: "+ data.weather[0].description +"</h5>" +
         "<h5>Temprature: "+ data.main.temp + "&deg;C</h5>" +
         "<h5>Pressure: "+ data.main.pressure + "hPa</h5>" +
         "<h5>Humidity: "+ data.main.humidity + "%</h5>" +
         "<h5>Minium Temprature: "+ data.main.temp_min + "&deg;C</h5>" +
         "<h5>Maxium Temprature: "+ data.main.temp_max + "&deg;C</h5>" +
         "<h5>Wind Speed: "+ data.wind.speed + "m/s</h5>" +
         "<h5>Wind Direction: "+ data.wind.deg + "&deg</h5>";

}

$(document).ready(function(){
//On click run code
$("#search").click(function(){"use strict";
  //Get value of input field
var searchTerm = $('#city').val();
//Run ajax and get return in data type JSON
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +
            "&query&limit=1&namespace=0&parse&page=API:Parsing_wikitext&prop=extracts&raw&props=claims&exintro&format=json&callback=?";
  console.log(url);
    $.ajax({
      type: "GET",
      url: url,
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function (data) {
        $('#discription-output').html('');
        for(var i=0;i<data[1].length;i++){
          $('#discription-output').prepend("<div><div class='btn-primary'><h4"+data[3][i]+"><h4>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>" );
        }
 $("#city").val('');
      },
      error: function (errorMessage) {
       console.log(errorMessage);
      }
  });


});
    $("#searchTerm").keypress(function(e){
    if(e.which===13){
      $("#city").click();
    }
  });
});
