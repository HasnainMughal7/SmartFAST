import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LabelList } from "recharts";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([
    { name: "Academic Block 1", value: 400, color: "#4169E1" },
    { name: "Academic Block 2", value: 550, color: "#008b8b" },
    { name: "Multi-Purpose Block", value: 300, color: "#8b0000" }
  ]);

  useEffect(() => {
    // Update power consumption every 9 seconds
    const id = setInterval(() => {
      setData(prev =>
        prev.map(d => ({
          ...d,
          value: Math.floor(Math.random() * 10000)
        }))
      );
    }, 9000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <h1>Power Consumption</h1>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />

        <YAxis
          tick={false}
          axisLine={true}
          label={{
            value: "Watts",
            angle: -90,
            position: "insideLeft",
            offset: 30
          }}
        />

        <Tooltip />

        <Bar dataKey="value" barSize={75}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}

          {/* Value shown inside the bar */}
          <LabelList
            dataKey="value"
            position="center"
            fill="#ffffff"
            fontSize={14}
          />
        </Bar>
      </BarChart>
    </>
  );
}
