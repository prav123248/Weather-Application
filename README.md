# Weather Application

### Description :
This is a group project for a module called "Graphical User Interfaces" focused on building intuitive and well-designed user interfaces. This weather application is targetted towards our chosen stakeholder, hikers. Features and the user interface reflects our choice in stakeholder. Using the OpenWeatherMap API, this weather application prototype designed to run on mobile resolutions provides accurate results based on the current location. Additional functionalities include storing locations of trails and monitoring the ideal days to visit them based on weather conditions.

#### Main Weather Interface on the IPhone SE
<img src="https://user-images.githubusercontent.com/78224090/193422621-dfd776fc-ee90-48d7-997b-73aabe333e9b.PNG" width="232" height="373" />

The main interface makes use of weather data obtained from the OpenWeatherMap API and uses react to display them on a custom landscape background designed in photoshop. 

#### Adding Trail (with Map)
<img src="https://user-images.githubusercontent.com/78224090/193457363-893e45aa-5536-4de5-a312-013aba98d149.PNG" width=250/>

The above image showcases how trails can be added by plotting points on a map. Hikes can be scheduled for stored trails, displaying the ideal day for a visit based on the upcoming week conditions.

### Technologies used :
    - HTML/CSS/Javascript
    - React JS including components from React Leaflet
    - React Bootstrap
    - JQuery
    - OpenWeatherMap API

### Functionalities implemented :
    - Main view of current and upcoming weather, gathered from an API
    - Adding the location of trails
    - Scheduling a hike to stored trails
    - Viewing the upcoming weather at a trail location
    - Removing stored trails
    - Removing scheduled hikes
    
### Setup :
    (01) - Install Node
    (02) - Open CMD in the Weather-Application directory
    (03) - Run "npm install"
    (04) - Run "npm run"
    (05) - Use inspect element to adjust to mobile resolutions as this project was designed as a prototype for mobile applications.
    
