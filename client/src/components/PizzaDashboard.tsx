import { useState, useCallback, useEffect } from 'react';
import { getData, postData } from '../api';

type PizzaData = {
  person: string;
  meat_type: string;
  date: Date;
};

type PizzaDataSet = PizzaData[];

type StreakData = {
  date: Date;
  count: number;
};

type StreakDataSet = StreakData[];

type ReportData = {
  longestStreak: number;
  mostPizzaDay: string;
};

export const PizzaDashboard = () => {
  const [outputData, setOutputData] = useState<PizzaDataSet | null>(null);
  const [pizzaData, setPizzaData] = useState<PizzaDataSet>([]);
  const [reportData, setReportData] = useState<StreakDataSet>([]);
  const [name, setName] = useState<string>('');
  const [meatType, setMeatType] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<PizzaDataSet>([]);
  const [error, setError] = useState<string>('');

  const getAllPizzaData = useCallback(() => {
    (async () => {
      const res: PizzaDataSet = await getData('/api/all-pizza-data');
      setPizzaData(res);
      setError('');
    })();
  }, []);

  const getMonthlyReport = useCallback(() => {
    const date = new Date();
    const month = date.getMonth();
    (async () => {
      const mostPizzaInMonth: PizzaDataSet = await getData(
        `/api/pizza-month?month=${month}`
      );
      const streakData: StreakDataSet = await getData('/api/pizza-streak');

      console.log(streakData, mostPizzaInMonth);

      // const longestStreak =

      // const mostPizzaDay =

      //setReportData()

      setError('');
    })();
  }, [reportData]);

  const addPizzaEntry = useCallback(() => {
    (async () => {
      if (name && meatType) {
        const res: PizzaDataSet = await postData('/api/add-pizza-entry', {
          name,
          meatType,
          date: new Date(),
        });

        const newPizzaData = [...pizzaData];
        setPizzaData([...newPizzaData, ...res]);
        setError('');
        setName('');
        setMeatType('');
      } else {
        setError('Please include name and meat type');
      }
    })();
  }, [name, meatType, setPizzaData, pizzaData]);

  const filterPizzaData = useCallback(() => {
    const filteringData = pizzaData.filter((row) =>
      `${row.person}${row.meat_type}${row.date}`.includes(filterValue)
    );
    setFilteredData([...filteringData]);
  }, [filterValue, pizzaData]);

  useEffect(() => {
    const data = !!filteredData?.length
      ? filteredData
      : !!pizzaData.length
      ? pizzaData
      : null;
    setOutputData(data ? [...data] : null);
  }, [pizzaData, filteredData]);

  return (
    <div className='container'>
      <h1>Pizza Dashboard</h1>
      {!!error && <div className='error'>{error}</div>}
      <div className='actions'>
        <button className='action emerald' onClick={() => getAllPizzaData()}>
          All Pizza Data
        </button>
        <div className='action honey-sucle'>
          <h4>Add a pizza entry</h4>
          <label>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Meat Type</label>
          <select
            value={meatType}
            onChange={(e) => setMeatType(e.target.value)}
          >
            <option value=''></option>
            <option value='pepperoni'>Pepperoni</option>
            <option value='sausage'>Sausage</option>
            <option value='pineapple'>Pineapple</option>
          </select>
          <button
            style={{ width: '100px', padding: '10px', alignSelf: 'flex-end' }}
            onClick={() => addPizzaEntry()}
          >
            Add
          </button>
        </div>
        <div className='action marsala'>
          <h4>This month's report:</h4>
          <button
            style={{ width: '100px', padding: '10px', marginRight: '10px' }}
            onClick={() => getMonthlyReport()}
          >
            Run Report
          </button>
        </div>
      </div>

      <h2>Pizza Data</h2>
      {!!outputData && (
        <div className='output'>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end',
              marginBottom: '20px',
            }}
          >
            <input
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <button
              style={{ width: '100px', padding: '10px' }}
              onClick={() => filterPizzaData()}
            >
              Filter
            </button>
          </div>
          <div className='output-row output-header'>
            <div>Name</div>
            <div>Meat Type</div>
            <div>Date</div>
          </div>
          {outputData?.map((pizza, i) => (
            <div key={i} className='output-row'>
              <div>{pizza.person}</div>
              <div>{pizza.meat_type}</div>
              <div>{new Date(pizza.date).toDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
