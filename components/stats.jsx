import style from "./styles/stats.module.css"
import { PieChart, Pie, Cell, Legend } from "recharts";


export default function Stats() {

    const data1 = [
        { name: "Si donaron", value: 700 },
        { name: "No donaron", value: 210 }
      ];
    const data2 = [
        { name: "Con proyectos", value: 300 },
        { name: "Sin proyectos", value: 610 }
      ];
      
      const COLORS = ["#FFBB28", "#00C49F", "#FFBB28", "#FF8042"];
      
      const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
      }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };



  return (
      <div className={style.container}>
            <h1>Usuarios</h1>
        <div className={style.containerA}>
            <div className={style.cont_A1}>
                
                <PieChart id="donaron" width={300} height={250}>
                    <Pie
                        isAnimationActive={false}
                        data={data1}
                        cx={150}
                        cy={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {data1.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </div>
            <div className={style.cont_A2}>
                <PieChart id="donaron" width={300} height={250}>
                    <Pie
                        isAnimationActive={false}
                        data={data2}
                        cx={150}
                        cy={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </div>
        </div>
        <div className={style.containerB}>

        </div>
        
        
    </div>
  );
}
