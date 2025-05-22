import React, { useState, useEffect } from 'react'
import axios from "axios";

interface CsvRow {
  Country: string;
  Region?: string;
  randomValue: number;
  latitude?: number;
  longitude?: number;
}

  const getCoords = async (place: string) : Promise<{ lat: number; lon: number } | null> => {
    try {
      if (place) {
        const url = "https://nominatim.openstreetmap.org/search";
            const { data } = await axios.get(url, {
      params: { q: place, format: "json", limit: 1, email:''},
      headers: {
        'User-Agent': 'incubator-test/1.0 (ijack.li.1998@gmail.com)',  // Identify your app & contact
      }
    });

        if (data && data.length > 0) {
          return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon)}
        }
        return null;
      }
      return null;
    }
    catch (error) {
      console.error("Unable to fetch coordinates for", place, error)
      return null;
    }
  }

  const populateRows = async (csvData: any): Promise<CsvRow[]> => {
    const rows: CsvRow[] = [];

    for (const row of csvData) {
      const place = row.Region && row.Country ? `${row.Region}, ${row.Country}` : row.Country;
      const coords = await getCoords(place)

      rows.push({
        ...row,
        latitude: coords?.lat,
        longitude: coords?.lon
      })
    }

    return rows
  }

  export const populateWithCoords = (csvData: any) => {
    const [rows, setRows] = useState<CsvRow[]>();

    useEffect(() => {
      if (!csvData) {
        return
      } 

      async function fetchCoords() {
        const updatedRows = await populateRows(csvData)
        setRows(updatedRows)
      }

      fetchCoords()
    }, [csvData])

    return rows
  }