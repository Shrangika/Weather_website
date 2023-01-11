let weather = {
	"apiKey": "77ef667a740796b4c2d489bc95aafaad",
	fetchWeather: function(city){
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q="
			+city
			+"&units=metric&appid="
			+this.apiKey
			)
		 .then((response)=>response.json())
		 .then((data) => this.displayWeather(data));
	},
  displayWeather:function(data) {
   const{ name } = data;
	 const{ icon, description } = data.weather[0];
	 const{ temp, humidity } = data.main;
	 const{ speed } = data.wind;
	 document.querySelector(".city").innerText="Weather in "+ name;
	 document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+ icon +".png";
	 document.querySelector(".description").innerText=description;
	 document.querySelector(".temp").innerText=temp+"°C";
	 document.querySelector(".humidity").innerText="Humidity: "+humidity+"%";
	 document.querySelector(".wind").innerText="Wind speed: "+ speed + "km/h"; 
	 document.querySelector(".weather").classList.remove("loading");
	 document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?" + description + "')";
	},
	search: function(){
		this.fetchWeather(document.querySelector(".search-bar").value);
	}
};
document.querySelector(".search button").addEventListener("click",function(){
 weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup",function(event){
 if(event.key == "Enter" ){
	weather.search();
 }
});
weather.fetchWeather("Delhi");
const http=new XMLHttpRequest()
let result=document.querySelector("#result")

document.querySelector("#share").addEventListener("click",()=>{
  findMyCoordinates()
})
function findMyCoordinates(){
  if(navigator.geolocation){
navigator.geolocation.getCurrentPosition((position)=>{
  const bdcAPI=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
  getAPI(bdcAPI)
  },
(err)=>{
  alert(err.message)
}
)
  }
  else{
    alert("Geolocation is not supported by your browser")
  }
}

function getAPI(bdcAPI){
  http.open("GET",bdcAPI)
  http.send()
  http.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200)
    {
      const results =JSON.parse(this.responseText)
      weather.fetchWeather(results.locality)
    }
  }
}