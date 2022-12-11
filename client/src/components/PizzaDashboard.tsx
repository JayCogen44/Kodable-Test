import { useState, useEffect } from 'react';
import { getData } from '../api';

type PizzaDataSet = PizzaData[];

type PizzaData = {
  person: string;
  meat_type: string;
  date: Date;
};

export const PizzaDashboard = () => {
  const [pizzaData, setPizzaData] = useState<PizzaDataSet | null>();

  useEffect(() => {
    (async () => {
      const res: PizzaDataSet = await getData('/api/all-pizza-data');
      setPizzaData(res);
    })();
  }, []);

  return (
    <div className='container'>
      <h1>Pizza Dashboard</h1>

      <div>
        {pizzaData &&
          pizzaData.map((pizza, i) => (
            <div key={i}>
              {`${pizza.person}, ${pizza.meat_type} - ${new Date(
                pizza.date
              ).toDateString()}`}
            </div>
          ))}
      </div>
    </div>
  );
};
