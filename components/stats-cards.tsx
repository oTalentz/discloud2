import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Server, Zap, Users } from "lucide-react"

const stats = [
  {
    title: "Active Deployments",
    value: "12",
    change: "+2 from last month",
    icon: Server,
    color: "text-chart-1",
  },
  {
    title: "Total Uptime",
    value: "99.9%",
    change: "+0.1% from last month",
    icon: Activity,
    color: "text-chart-2",
  },
  {
    title: "Resource Usage",
    value: "2.4GB",
    change: "of 4GB limit",
    icon: Zap,
    color: "text-chart-3",
  },
  {
    title: "Active Bots",
    value: "8",
    change: "+1 from last week",
    icon: Users,
    color: "text-chart-4",
  },
]

export function StatsCards() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
