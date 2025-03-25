import React, { useEffect, useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

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
      const res = await fetch("http://localhost:5000/api/soildata/all");
      const data = await res.json();

      setSoilData(data);
      if (data.length > 0) {
        setLatestData(data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchSoilData();
    const interval = setInterval(fetchSoilData, 5000);

    return () => clearInterval(interval);
  }, []);
  console.log("latestData", latestData);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Soil Monitoring Dashboard</h1>
      {latestData && (
        <div className="flex-row">
          <div className="gauge-card bg-white p-4 rounded shadow">
            <h3 className="text-center mb-2">Humidity</h3>
            <Gauge
              value={latestData.humidity}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: "translate(0px, 0px)",
                },
              }}
              valueMin={0}
              valueMax={100}
              height={200}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div>
          <div className="gauge-card bg-white p-4 rounded shadow">
            <h3 className="text-center mb-2">Temperature (°C)</h3>
            <Gauge
              value={latestData.temperature}
              startAngle={-110}
              endAngle={110}
              height={200}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: "translate(0px, 0px)",
                },
              }}
              valueMin={0}
              valueMax={50}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div>
          <div className="gauge-card bg-white p-4 rounded shadow">
            <h3 className="text-center mb-2">Soil Moisture</h3>
            <Gauge
              value={latestData.moisture}
              startAngle={-110}
              endAngle={110}
              height={200}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: "translate(0px, 0px)",
                },
              }}
              valueMin={0}
              valueMax={1024}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-3">All Soil Data Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Humidity (%)</th>
              <th className="py-2 px-4 border-b">Temperature (°C)</th>
              <th className="py-2 px-4 border-b">Moisture</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {soilData?.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{entry.humidity}</td>
                <td className="py-2 px-4 border-b">{entry.temperature}</td>
                <td className="py-2 px-4 border-b">{entry.moisture}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoilDataDashboard;
