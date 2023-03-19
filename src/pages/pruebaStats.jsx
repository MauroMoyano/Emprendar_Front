import StatsCircle from "../../components/statsCircle.jsx";
import StatsRadar from "components/statsRadar.jsx";




export default function pruebaStats (){

    const data = [
        {name: "Si donaron", value: 505},
        {name: "No donaron", value: 105}
    ]

    const data2 = [
        {name: "Tecnologia", value: 50},
        {name: "Ambiental", value: 19},
        {name: "Cultural", value: 36},
        {name: "Social", value: 50},
        {name: "Medicina", value: 55},
        {name: "Educacion", value: 25},
        {name: "Emprendimiento", value: 85},
    ]


    return (
        <div>
            <h1>HolaMundo</h1>
            <StatsCircle data={data} />
            <StatsRadar data={data2} />
        </div>
    )
}