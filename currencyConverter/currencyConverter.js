import { LightningElement, track } from 'lwc';

const CURRENCIES = [
    { label: 'US Dollar', value: 'USD' },
    { label: 'Great Britian Pound', value: 'GBP' },
    { label: 'Indian Rupee', value: 'INR' },
    { label: 'Euro', value: 'EUR' },
    { label: 'Japan Yen', value: 'JPY' },
    { label: 'Thailand Baht', value: 'THB' },
    { label: 'Australia Dollar', value: 'AUD' },
    { label: 'Sweden Krona', value: 'SEK' },
    { label: 'Switzerland Franc', value: 'CHF' },
    { label: 'Russia Rouble', value: 'RUB' },
    { label: 'Turkish New Lira', value: 'TRY' },
    { label: 'Brazil Real', value: 'BRL' },
    { label: 'Canada Dollar', value: 'CAD' },
    { label: 'China Yuan/Renminbi', value: 'CNY' },
    { label: 'Indonesia Rupiah', value: 'IDR' },
]
export default class CurrencyConverter extends LightningElement {
    @track currencyOptions = CURRENCIES;
    amount = 1;
    fromCurrency='USD';
    toCurrency='INR';
    conversionRate;
    convertedValue;
    showConvertedValue=false;
    showSpinner = false;

    handleChange(event){
        this.showConvertedValue=false;

        if(event.target.name === 'amount'){
            this.amount = event.target.value;
        }
        else if(event.target.name === 'fromCurr'){
            this.fromCurrency = event.target.value;
        }
        else if(event.target.name === 'toCurr'){
            this.toCurrency = event.target.value;
        }
    }

     handleConversion(){
        this.showSpinner = true;
        let endpoint = "https://exchange-rates.abstractapi.com/v1/live/?api_key=7645a63629e94ef59423a06b8f418056&base="+this.fromCurrency+"&target="+this.toCurrency;
        console.log("endpoint "+endpoint);
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            this.conversionRate = data.exchange_rates[this.toCurrency];
            this.convertedValue = (this.amount * this.conversionRate).toFixed(2);
            this.showConvertedValue = true;
            this.showSpinner = false;
        })
        .catch(error => {
            console.error('Error fetching conversion rate:', error);
        });

    }

}