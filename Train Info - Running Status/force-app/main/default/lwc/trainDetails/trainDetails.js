import { LightningElement } from 'lwc';
import getTrainDetails from '@salesforce/apex/TrainDetails.getTrainDetails'

const columns = [
    { label: 'Station Name', fieldName: 'station_name' },
    { label: 'Distance', fieldName: 'distance'},
	{ label: 'Halt', fieldName: 'halt' },
    { label: 'Delay', fieldName: 'delay' },
    { label: 'Platform', fieldName: 'platform' },
	{ label: 'Timing', fieldName: 'timing'},
		
];

export default class TrainDetails extends LightningElement {
		
		inputTrainNo = '';
		showTrainDetails = false;
		showSpinner = false;
		trainDetails = {};
		columns = columns;
		
		handleInputChange(event){
				this.inputTrainNo = event.detail.value;
		}
		
		handleTrainInfo(){
				this.showSpinner = true;
				this.showTrainDetails = false;
				//console.log('inputTrainNo '+this.inputTrainNo);
				getTrainDetails({trainNo : this.inputTrainNo})
				.then((result) => {
						this.showSpinner = false;
						this.showTrainDetails = true;
						this.trainDetails = result;
						//console.log('trainDetails '+JSON.stringify(this.trainDetails));
				})
				.catch((error) =>{
						this.showTrainDetails = false;
						console.log('Some error occurred while fetching train details');
				});
		}
}
