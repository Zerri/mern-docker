import { useState, useEffect } from 'react';

// Definisci il tipo per gli esempi
interface Esempio {
  _id: string;
  nome: string;
}

const EsempiList: React.FC = () => {
  const [esempi, setEsempi] = useState<Esempio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEsempi = async () => {
      try {
        const response = await fetch('/api/esempi');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Esempio[] = await response.json(); // Definisci il tipo per i dati
        setEsempi(data);
      } catch (error: any) { // Imposta il tipo per l'errore
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEsempi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista di Esempi</h1>
      <ul>
        {esempi.map((esempio) => (
          <li key={esempio._id}>
            {esempio.nome} (ID: {esempio._id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EsempiList;
