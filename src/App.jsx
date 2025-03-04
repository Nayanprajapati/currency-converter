// Importing necessary dependencies
import { useState } from "react"; // useState hook to manage state
import Select from "react-select"; // Importing react-select for enhanced dropdowns
import { currencyConverter } from "./api/postApi"; // Function to fetch conversion rates
import { currencies } from "./utils/currencies"; // Importing the currency list
import "./index.css"; // Importing the CSS file for styling

// Function to map currencies into Select dropdown format
const formatCurrencies = currencies.map((currency) => ({
  value: currency.code, // Currency code (e.g., USD, INR)
  label: `${currency.code} ${currency.name} (${currency.code})`, // Display format for dropdown
}));

// Main App component
const App = () => {
  // State variables to store input values and results
  const [amount, setAmount] = useState(1); // Amount to be converted
  const [fromCurrency, setFromCurrency] = useState(formatCurrencies[0]); // Default "From" currency (USD)
  const [toCurrency, setToCurrency] = useState(formatCurrencies[3]); // Default "To" currency (INR)
  const [convertedAmount, setConvertedAmount] = useState(null); // Stores the converted amount
  const [loading, setLoading] = useState(false); // Loading state while fetching data
  const [error, setError] = useState(null); // Stores error messages if API call fails

  // Function to fetch and convert currency
  const handleConvertCurrency = async () => {
    setLoading(true); // Set loading to true while fetching
    setError(null); // Reset previous errors

    try {
      // Call API function to fetch conversion rate
      const res = await currencyConverter(
        fromCurrency.value,
        toCurrency.value,
        amount
      );
      const { conversion_result } = await res.data; // Extract conversion result
      setConvertedAmount(conversion_result); // Store the converted amount
      setLoading(false); // Reset loading state
    } catch (error) {
      setError("Error fetching conversion rate"); // Store error message
      console.error(error); // Log error for debugging
    }
  };

  return (
    // Currency Converter container
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1> {/* Title */}
        {/* Amount Input Field */}
        <div>
          <label htmlFor="currency_amount">Amount:</label>
          <input
            type="number"
            id="currency_amount"
            value={amount} // Bind input value to state
            onChange={(e) => setAmount(e.target.value)} // Update amount on change
          />
        </div>
        {/* Currency Selection Dropdowns */}
        <div className="currency-selector">
          {/* From Currency Dropdown */}
          <div>
            <label>From:</label>
            <Select
              options={formatCurrencies} // Options for dropdown
              value={fromCurrency} // Bind state
              onChange={setFromCurrency} // Update state on selection
              className="currency-dropdown" // Class for styling
            />
          </div>

          {/* To Currency Dropdown */}
          <div>
            <label>To:</label>
            <Select
              options={formatCurrencies} // Options for dropdown
              value={toCurrency} // Bind state
              onChange={setToCurrency} // Update state on selection
              className="currency-dropdown" // Class for styling
            />
          </div>
        </div>
        {/* Convert Button */}
        <button
          disabled={loading || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {loading ? "Converting..." : "Convert"}{" "}
          {/* Show "Converting..." while loading */}
        </button>
        <hr /> {/* Divider */}
        {/* Display Converted Amount */}
        {convertedAmount && (
          <div>
            <h2>
              {amount} {fromCurrency.value} = {convertedAmount.toFixed(2)}{" "}
              {toCurrency.value}
            </h2>
          </div>
        )}
        {/* Display Error Message if API Call Fails */}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
};

export default App; // Exporting the App component
