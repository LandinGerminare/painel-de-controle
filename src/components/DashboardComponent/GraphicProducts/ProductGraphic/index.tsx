import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const dataForProductGraphic = [
  { name: "DDGS", value: 95 },
  { name: "MILHO", value: 61 },
  { name: "SOJA GRÃO", value: 95 },
  { name: "CASCA", value: 22 },
  { name: "SORGO", value: 73 },
  { name: "CAROCO", value: 17 },
  { name: "OUTROS", value: 28 },
  { name: "FARELO POUPA", value: 18 },
]

export default function ProductGraphic() {
  return (
    <div className="w-full h-[100%] min-h-[500px] bg-neutral-700 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dataForProductGraphic}
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
