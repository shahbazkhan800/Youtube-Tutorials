public class WeatherDetailsClass {
    @AuraEnabled
    public static WeatherDetailsWrapper getWeatherDetails(String cityName){
        //Frame the Enpoint URL
        String apiKey = '<place your API key here>'; // for example: String apiKey = 'ab4a1xxxx840adac4da0dxxxxx';
        String endpoint = 'http://api.openweathermap.org/data/2.5/weather';
        endpoint += '?q='+cityName;
        endpoint += '&units=metric';
        endpoint += '&APPID='+apiKey;
        system.debug('endPoint URL=> '+endpoint);
        
        //Callout to Weather API
        Http http =new http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        HttpResponse res = http.send(req);
        system.debug('response status=> '+res);
        system.debug('response body=> '+JSON.deserializeUntyped(res.getBody()));
        
        //return the weather details in wrapper form
        WeatherDetailsWrapper weatherDet = new WeatherDetailsWrapper();
        if(res.getStatusCode() == 200){
            Map<String,object> result = (Map<String,Object>)JSON.deserializeUntyped(res.getBody());
            weatherDet.city = String.valueOf(result.get('name'));
            Map<String,object> mainResult = (Map<String,object>)(result.get('main'));
            weatherDet.temperature = String.valueOf(mainResult.get('temp'));
            weatherDet.pressure = String.valueOf(mainResult.get('pressure'));
            weatherDet.humidity = String.valueOf(mainResult.get('humidity'));
            weatherDet.feelsLike = String.valueOf(mainResult.get('feels_like'));
            weatherDet.tempMin = String.valueOf(mainResult.get('temp_min'));
            weatherDet.tempMax = String.valueOf(mainResult.get('temp_max'));
        }
        system.debug('weather details to return=> '+weatherDet);
        return weatherDet;
        
    }
    
    //Wrapper class to store weather details in serial manner
    public class WeatherDetailsWrapper {
        @AuraEnabled public String city {get;set;}
        @AuraEnabled public String temperature {get;set;}
        @AuraEnabled public String pressure {get;set;}
        @AuraEnabled public String humidity {get;set;}
        @AuraEnabled public String feelsLike {get;set;}
        @AuraEnabled public String tempMin {get;set;}
        @AuraEnabled public String tempMax {get;set;}
    }
    
}
