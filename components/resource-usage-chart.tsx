import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", cpu: 20, memory: 45, network: 12 },
  { time: "04:00", cpu: 15, memory: 42, network: 8 },
  { time: "08:00", cpu: 35, memory: 58, network: 25 },
  { time: "12:00", cpu: 45, memory: 65, network: 35 },
  { time: "16:00", cpu: 38, memory: 62, network: 28 },
  { time: "20:00", cpu: 25, memory: 48, network: 18 },
  { time: "24:00", cpu: 18, memory: 44, network: 10 },
]

export function ResourceUsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Resource Usage (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="time" className="text-muted-foreground" />
            <YAxis className="text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="cpu" stroke="hsl(var(--chart-1))" strokeWidth={2} name="CPU %" />
            <Line type="monotone" dataKey="memory" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Memory %" />
            <Line type="monotone" dataKey="network" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Network MB/s" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
