import { useState, useEffect } from 'react'

// Definisci il tipo per gli esempi
interface Car {
  _id: string;
  brand: string;
  model: string;
}

const CarList = () => {
  const [carList, setCarList] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarList = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Car[] = await response.json(); // Definisci il tipo per i dati
        setCarList(data);
      } catch (error: any) { // Imposta il tipo per l'errore
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{textAlign: 'left'}}>
      <h1>List Car from Postgres</h1>
      <ul>
        {carList.map((car) => (
          <li key={car.id}>
            {car.brand} - {car.model}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
