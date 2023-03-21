// import { PieChart, Pie, Cell, Legend } from "recharts";


// export default function StatsCircle(props) {
      
//       const COLORS = ["#FFBB28", "#00C49F", "#FFBB28", "#FF8042"];
      
//       const RADIAN = Math.PI / 180;
//       const renderCustomizedLabel = ({
//         cx,
//         cy,
//         midAngle,
//         innerRadius,
//         outerRadius,
//         percent,
//         index
//       }) => {
//         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//         const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
//         return (
//           <text
//             x={x}
//             y={y}
//             fill="white"
//             textAnchor={x > cx ? "start" : "end"}
//             dominantBaseline="central"
//           >
//             {`${(percent * 100).toFixed(0)}%`}
//           </text>
//         );
//       };



//   return (
//                 <PieChart id="donaron" width={300} height={250}>
//                     <Pie
//                         isAnimationActive={false}
//                         data={props.data}
//                         cx={150}
//                         cy={100}
//                         labelLine={false}
//                         label={renderCustomizedLabel}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         nameKey="name"
//                     >
//                         {props.data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Legend />
//                 </PieChart>
//   );
// }




import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 11;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 3}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`( ${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

export default function StatsCircle(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const COLORS = ["#FFBB28", "#00C49F", "#f23e02", "#FF8042", "#942222", "#5bcebf" , "#fc370c", "#a3d95b" , "#00988d", "#b80090", "#2c6b74", "#013750", "#2f2bad" , "#f0d890" , "#4d002b", "#750e49", "#342220", "#613c4c", "#ff1457"];

  return (
    <PieChart id="donaron" width={300} height={280}>
      <Pie
        isAnimationActive={false}
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={props.data}
        cx={150}
        cy={120}
        innerRadius={50}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
      {
        (props.data ?? []).map((_, index)=> (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))
      }
    </Pie>
    </PieChart>
  );
}

