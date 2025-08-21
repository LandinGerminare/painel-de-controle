import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const dataForBarGraphic = [
   { name: "Landin", value: 52 },
   { name: "Jojo", value: 48 },
   { name: "Andressa", value: 95 },
   { name: "Amanda", value: 70 },
   { name: "Cargil", value: 46 },
   { name: "Isabela", value: 92 },
   { name: "Bioma", value: 57 },
   { name: "Bunge", value: 44 },
]

export default function ClientGraphic() {
   return (
      <div className="w-full h-[100%] min-h-[500px] bg-neutral-700 p-4">
         <ResponsiveContainer width="100%" height="100%">
            <BarChart
               data={dataForBarGraphic}
               margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 0,
               }}
            >
               <XAxis
                  dataKey="name"
                  tick={{
                     fill: "#BFBFBF",
                     fontSize: 12,
                  }}
               />
               <YAxis
                  tick={{
                     fill: "#BFBFBF",
                     fontSize: 12,
                  }}
               />
               <Bar dataKey="value" fill="#E26612" />
            </BarChart>
         </ResponsiveContainer>
      </div>
   )
}