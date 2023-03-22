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

    const data3 = [
        {
          "name": "México",
          "value": 2
        },
        {
          "name": "Colombia",
          "value": 5
        },
        {
          "name": "Argentina",
          "value": 7
        },
        {
          "name": "Brasil",
          "value": 2
        },
        {
          "name": "Chile",
          "value": 2
        },
        {
          "name": "Perú",
          "value": 0
        },
        {
          "name": "Ecuador",
          "value": 0
        },
        {
          "name": "Bolivia",
          "value": 4
        },
        {
          "name": "Uruguay",
          "value": 0
        },
        {
          "name": "Paraguay",
          "value": 0
        },
        {
          "name": "Venezuela",
          "value": 3
        },
        {
          "name": "Costa Rica",
          "value": 0
        },
        {
          "name": "Cuba",
          "value": 0
        },
        {
          "name": "Puerto Rico",
          "value": 4
        },
        {
          "name": "República Dominicana",
          "value": 0
        },
        {
          "name": "Honduras",
          "value": 0
        },
        {
          "name": "Nicaragua",
          "value": 1
        },
        {
          "name": "Panamá",
          "value": 2
        },
        {
          "name": "El Salvador",
          "value": 7
        },
        {
          "name": "Guatemala",
          "value": 0
        }
      ]


    return (
        <div>
            <h1>HolaMundo</h1>
            <StatsCircle data={data} />
            <StatsRadar data={data2} />
            <StatsCircle data={data3} />
        </div>
    )
}