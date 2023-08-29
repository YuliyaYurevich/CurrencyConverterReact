import { useEffect, useState } from 'react';
import './styles.css';

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState('1');
  const [firstCurrency, setFirstCurrency] = useState('EUR');
  const [secondCurrency, setSecondCurrency] = useState('USD');
  const [output, setOutput] = useState('OUTPUT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      async function fetchCurrencyConvert() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching rates');

          const data = await res.json();

          setOutput(data.rates[secondCurrency]);
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (firstCurrency === secondCurrency) return;
      setOutput(amount);

      fetchCurrencyConvert();
    },
    [amount, firstCurrency, secondCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={firstCurrency}
        onChange={(e) => setFirstCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={secondCurrency}
        onChange={(e) => setSecondCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
