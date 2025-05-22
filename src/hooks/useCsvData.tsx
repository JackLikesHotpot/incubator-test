import {useState, useEffect} from 'react';
import Papa from 'papaparse'

interface CsvRow {
  country: string;
  region: string;
  randomValue: number; 
}

export function useCsvData() {

  const [csvData, setCsvData] = useState<CsvRow[] | null>();

  useEffect(() => {
    fetch('../../../data/geo_sentiments.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results: any) => {
            setCsvData(results.data);
          }
        })
      })
  })

  return { csvData }
}