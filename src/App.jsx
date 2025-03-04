import { useState } from "react";
import Select from "react-select"; // ✅ Import react-select
import { currencyConverter } from "./api/postApi";
import { currencies } from "./utils/currencies"; // ✅ Import the currency list
import "./index.css"; // ✅ Import CSS for styling


// Function to map currencies into Select dropdown format
const formatCurrencies = currencies.map((currency) => ({
  value: currency.code,
  label: `${(currency.code)} ${currency.name} (${currency.code})`,
}));



const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState(formatCurrencies[0]);
  const [toCurrency, setToCurrency] = useState(formatCurrencies[3]); // Default INR
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvertCurrency = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await currencyConverter(fromCurrency.value, toCurrency.value, amount);
      const { conversion_result } = await res.data;
      setLoading(false);
      setConvertedAmount(conversion_result);
    } catch (error) {
      setError("Error fetching conversion rate");
      console.error(error);
    }
  };

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <div>
          <label htmlFor="currency_amount">Amount:</label>
          <input
            type="number"
            id="currency_amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Improved Dropdowns */}
        <div className="currency-selector">
          <div>
            <label>From:</label>
            <Select
              options={formatCurrencies}
              value={fromCurrency}
              onChange={setFromCurrency}
              className="currency-dropdown"
            />
          </div>
          <div>
            <label>To:</label>
            <Select
              options={formatCurrencies}
              value={toCurrency}
              onChange={setToCurrency}
              className="currency-dropdown"
            />
          </div>
        </div>

        <button disabled={loading || amount <= 0} onClick={handleConvertCurrency}>
          {loading ? "Converting..." : "Convert"}
        </button>

        <hr />
        {convertedAmount && (
          <div>
            <h2>
              {amount} {fromCurrency.value} = {convertedAmount.toFixed(2)} {toCurrency.value}
            </h2>
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </section>
  );
};

export default App;
