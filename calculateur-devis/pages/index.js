
import { useState } from 'react';

export default function Home() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [price, setPrice] = useState(null);

  const handleCalculate = async () => {
    const res = await fetch(`/api/calculate?pickup=${pickup}&dropoff=${dropoff}`);
    const data = await res.json();
    setPrice(data.price);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Calculateur de devis</h1>
      <input
        type="text"
        placeholder="Adresse de prise en charge"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%', padding: 10 }}
      />
      <input
        type="text"
        placeholder="Adresse de dépôt"
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%', padding: 10 }}
      />
      <button
        onClick={handleCalculate}
        style={{ backgroundColor: '#001338', color: 'white', padding: 12, border: 'none', cursor: 'pointer' }}
      >
        Calculer
      </button>
      {price !== null && (
        <h2 style={{ textAlign: 'center', marginTop: 30 }}>
          Prix total : {price} €
        </h2>
      )}
    </div>
  );
}
