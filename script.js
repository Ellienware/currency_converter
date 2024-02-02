async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
  
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive number for the amount.');
      return;
    }
  
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates.');
      }
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error.description);
      }
  
      const exchangeRate = data.rates[toCurrency];
  
      if (!exchangeRate) {
        throw new Error(`Exchange rate for ${toCurrency} not found.`);
      }
  
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      document.getElementById('result').innerHTML = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred while fetching exchange rates. Please try again later.');
    }
  }
  