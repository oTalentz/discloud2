import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ExternalLink, Play, Square } from "lucide-react"

const deployments = [
  {
    name: "Discord Music Bot",
    status: "running",
    type: "Node.js",
    uptime: "15d 4h",
    memory: "128MB",
    url: "https://discord-bot-abc123.cloudhost.dev",
  },
  {
    name: "Telegram Weather Bot",
    status: "running",
    type: "Python",
    uptime: "8d 12h",
    memory: "64MB",
    url: "https://telegram-bot-def456.cloudhost.dev",
  },
  {
    name: "Portfolio Website",
    status: "stopped",
    type: "Next.js",
    uptime: "0h",
    memory: "0MB",
    url: "https://portfolio-ghi789.cloudhost.dev",
  },
  {
    name: "API Gateway",
    status: "running",
    type: "Express",
    uptime: "22d 8h",
    memory: "256MB",
    url: "https://api-gateway-jkl012.cloudhost.dev",
  },
]

export function DeploymentsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Recent Deployments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deployments.map((deployment) => (
            <div
              key={deployment.name}
              className="flex items-center justify-between p-4 border border-border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {deployment.status === "running" ? (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                  <div>
                    <h4 className="font-medium">{deployment.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Badge variant="secondary">{deployment.type}</Badge>
                      <span>•</span>
                      <span>{deployment.memory}</span>
                      <span>•</span>
                      <span>Uptime: {deployment.uptime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  {deployment.status === "running" ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
