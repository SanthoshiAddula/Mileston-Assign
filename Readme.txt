*******************************************************************************************
									Past week weather info 
*******************************************************************************************
    This app displays the weather information of past week for the location entered.
	Access the app @ https://past-week-weather-info.appspot.com/ 

*******************************************************************************************
									API info 
*******************************************************************************************		  

	Uses a free weather API available on https://api.apixu.com/v1/history.json with an 
	API key restricted for registered users.
	
	It accepts two params 
	1. location
	2. date 

	This app has got simple form to enter location which on submit displays the 
	weather information for the past week.

*******************************************************************************************
									Source code Files 
*******************************************************************************************

	1. app.yaml                     - 	Python file used to execute the project on Google 
										Platform
	2. www/index.html				-	UI template	
	3. www/js/app.js				-	javacript file comprising controller,services
	4. www/css/style.css			-	css file 
	5. www/images/loading_icon.gif  -	loader image to be shown while the weather data is retrieved from API