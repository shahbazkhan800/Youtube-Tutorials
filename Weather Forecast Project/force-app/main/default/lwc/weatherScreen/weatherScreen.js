import { LightningElement } from 'lwc';
import getWeatherDetails from '@salesforce/apex/WeatherDetailsClass.getWeatherDetails'
export default class WeatherScreen extends LightningElement {
		inputCityName = '';
		weatherDetails ={};
		showWeatherDetails = false;
		
		handleInputChange(event){
				this.inputCityName = event.detail.value;
		}
		
		handleWeatherDetails(){
				getWeatherDetails({cityName : this.inputCityName})
				.then((result) => {
						this.showWeatherDetails = true;
						this.weatherDetails = result;
				})
				.catch((error) =>{
						this.showWeatherDetails = false;
						console.log('Some error occurred while fetching weather details');
				});
				console.log('result '+JSON.stringify(this.weatherDetails));
		}
		
}