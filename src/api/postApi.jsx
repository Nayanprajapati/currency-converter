import axios from "axios";

const API_KEY = "51e9775f383c90c41597958b";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;

// Function to get exchange rate for two currencies
export const currencyConverter = async (fromCurrency, toCurrency, amount) => {
  try {
    console.log(`Fetching conversion rate: ${fromCurrency} to ${toCurrency}`);
    const response = await axios.get(`${API_URL}/${fromCurrency}/${toCurrency}/${amount}`);
    
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("API Request Failed:", error.message);
    throw error;
  }
};
