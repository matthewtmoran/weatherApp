$(document).ready(function() {

    $.getJSON("http://ipinfo.io", function(response) {
        console.log(response.city, response.region, response.country);

        var degree = "F";
        var tempImpMet = "F";
        var backgroundImage;


        getWeatherInfo();
        function getWeatherInfo() {

            $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + response.city +"," + response.region + "&units=imperial", function(weatherResponse) {
                    console.log(weatherResponse);

                //data to variables
                var getDesc = weatherResponse.weather[0].description,
                    currentLocation = response.city +", " + response.region,
                    deg = weatherResponse.wind.deg,
                    windSpeed = weatherResponse.wind.speed,
                    currentTemp = weatherResponse.main.temp.toFixed(),
                    iconID = weatherResponse.weather[0].icon,
                    iconImageURL = "http://openweathermap.org/img/w/" + iconID + ".png";
                //dom locaiton to variables
                var weatherIcon = $('.iconImage'),
                    weatherDegree = $('.degrees'),
                    weatherLocation = $('.location'),
                    weatherDescription = $('.description'),
                    weatherSpeed = $('.speed'),
                    weatherDirection = $('.direction');


                //append data to dom
                weatherIcon.append('<p class="weatherData"><img src="' + iconImageURL + '"/></p>').hide().fadeIn();
                weatherDegree.append('<p class="weatherData" id="tempDetails"><span id="tempChange"> ' + currentTemp + ' <span id="tempID"> ' + tempImpMet + ' </span></p>');

                weatherLocation.append('<p class="weatherData">' + currentLocation + '</p>').hide().fadeIn();
                weatherDescription.append('<p class="weatherData">' + getDesc + '</p>').hide().fadeIn();
                weatherSpeed.append('<p class="weatherData">' + windSpeed + '<span class="windID"> MPH</span></p>').hide().fadeIn();
                weatherDirection.append('<p class="weatherData">' + windDirection(deg) + '</p>').hide().fadeIn();
                //set background image
                function setBackground() {
                    switch(true) {
                        case currentTemp <= 35:
                            backgroundImage = "cold.jpeg";
                            break;
                        case currentTemp > 35 && currentTemp < 80:
                            backgroundImage = "medium.jpeg";
                            break;
                        case currentTemp >= 80:
                            backgroundImage = "hot.jpeg";
                            break;
                        default:
                            backgroundImage = "medium.jpeg";
                    }

                    $('body').css({'background': 'url(img/bkg/' + backgroundImage});
                } setBackground();

                //calc metric/imperial conversion
                $('.sysToggle').on('click', function() {
                    if (degree === "F") {
                        degree = "C";
                        $('.sysToggle').text('Switch to Fahrenheit ');
                        currentTemp = (currentTemp - 32) * 5 / 9;
                        updateDegree(degree, currentTemp.toFixed());
                    } else if (degree === "C") {
                        degree = "F";
                        $('.sysToggle').text('Switch to Celsius');
                        currentTemp = currentTemp * 9 / 5 + 32;
                        updateDegree(degree, currentTemp);
                    }
                });
                //write conversion after calc
                function updateDegree(deg, temp) {
                    $('#tempChange').fadeOut("normal", function(){
                        $(this).remove();
                    });
                    $('#tempID').fadeOut("normal", function(){
                        $(this).remove();
                    });

                    $('#tempDetails').html('<span id="tempChang"> ' + temp + ' </span><span id="tempID">' + deg + '</span>').hide().fadeIn();
                }

                //calc wind direction
                function windDirection(deg) {
                    var compassArray = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
                    var direction = Math.floor(deg / 45);
                    return compassArray[direction];
                }

            }, "jsonp");
        }
    }, "jsonp");
});


