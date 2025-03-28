import React, { useEffect, useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import "../styles/SoilDashboard.css";

interface SoilData {
  humidity: number;
  temperature: number;
  moisture: number;
  timestamp: string;
}

const SoilDataDashboard: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData[]>([]);
  const [latestData, setLatestData] = useState<SoilData | null>(null);

  const fetchSoilData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/soildata/all`
      );
      setSoilData(res.data);
      if (res.data.length > 0) {
        setLatestData(res.data[0]);
      }
    } catch (error) {
      console.error("Error fetching soil data:", error);
    }
  };

  useEffect(() => {
    fetchSoilData();
    const interval = setInterval(fetchSoilData, 5000);
    return () => clearInterval(interval);
  }, []);

  const columns: GridColDef[] = [
    { field: "humidity", headerName: "Humidity (%)", flex: 1 },
    { field: "temperature", headerName: "Temperature (°C)", flex: 1 },
    { field: "moisture", headerName: "Moisture", flex: 1 },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 2,
      valueFormatter: (params) => {
        const rawTimestamp = params;
        const date = new Date(rawTimestamp);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
      },
    },
  ];

  const rows = soilData.map((item, index) => ({ id: index, ...item }));

  return (
    <div className="soil-dashboard-container" aria-label="Soil Data Dashboard">
      <h1 className="dashboard-title">Soil Monitoring Dashboard</h1>

      {latestData && (
        <div className="gauge-grid">
          <div className="gauge-card" aria-label="Humidity Gauge">
            <h3>Humidity</h3>
            <Gauge
              value={latestData.humidity}
              startAngle={-110}
              endAngle={110}
              valueMin={0}
              valueMax={100}
              height={200}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 30,
                  transform: "translate(0px, 0px)",
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div>
          <div className="gauge-card" aria-label="Temperature Gauge">
            <h3>Temperature</h3>
            <Gauge
              value={latestData.temperature}
              startAngle={-110}
              endAngle={110}
              valueMin={0}
              valueMax={50}
              height={200}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 30,
                  transform: "translate(0px, 0px)",
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div>
          <div className="gauge-card" aria-label="Soil Moisture Gauge">
            <h3>Soil Moisture</h3>
            <Gauge
              value={latestData.moisture}
              startAngle={-110}
              endAngle={110}
              valueMin={0}
              valueMax={1024}
              height={200}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 30,
                  transform: "translate(0px, 0px)",
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div>
        </div>
      )}

      <h2 className="text-xl fw-bold mb-3">All Soil Data Records</h2>
      <div className="table-responsive">
        <div className="min-width-600">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[25, 50, 75, 100]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                  page: 0,
                },
              },
            }}
            autoHeight
            className="bg-white rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default SoilDataDashboard;
