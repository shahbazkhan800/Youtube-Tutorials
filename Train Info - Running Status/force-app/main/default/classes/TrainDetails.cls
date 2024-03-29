public class TrainDetails {
	
    @AuraEnabled
    public static TrainDetailsWrapper getTrainDetails(String trainNo){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndPoint('https://rappid.in/apis/train.php?train_no='+trainNo);
        req.setMethod('GET');
        HttpResponse resp = http.send(req);
        //System.debug('resp '+resp.getBody());
        
        TrainDetailsWrapper trDetWrap = new TrainDetailsWrapper();
        if(resp.getStatusCode() == 200){
            trDetWrap = (TrainDetailsWrapper)JSON.deserialize(resp.getBody(),TrainDetailsWrapper.class);
        }
        return trDetWrap;
    }
    
    public class TrainDetailsWrapper{
    @AuraEnabled public boolean success{get;set;}
	@AuraEnabled public String train_name{get;set;}
	@AuraEnabled public String message{get;set;}	
	@AuraEnabled public String updated_time{get;set;}
	@AuraEnabled public List<Data> data{get;set;}
    }
	public class Data {
		@AuraEnabled public boolean is_current_station{get;set;}
		@AuraEnabled public String station_name{get;set;}	
		@AuraEnabled public String distance{get;set;}
		@AuraEnabled public String timing{get;set;}	
		@AuraEnabled public String delay{get;set;}	
		@AuraEnabled public String platform{get;set;}
		@AuraEnabled public String halt{get;set;}	
	}
    
}