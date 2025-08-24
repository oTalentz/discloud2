import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Bot, Database, FileText, Zap, Settings } from "lucide-react"

const actions = [
  {
    title: "Deploy New App",
    description: "Upload and deploy your application",
    icon: Upload,
    color: "bg-primary hover:bg-primary/90",
  },
  {
    title: "Create Bot",
    description: "Set up a new Discord/Telegram bot",
    icon: Bot,
    color: "bg-secondary hover:bg-secondary/90",
  },
  {
    title: "Add Database",
    description: "Connect MongoDB or PostgreSQL",
    icon: Database,
    color: "bg-chart-3 hover:bg-chart-3/90",
  },
  {
    title: "View Logs",
    description: "Check application logs and errors",
    icon: FileText,
    color: "bg-chart-4 hover:bg-chart-4/90",
  },
  {
    title: "Scale Resources",
    description: "Upgrade your hosting plan",
    icon: Zap,
    color: "bg-chart-5 hover:bg-chart-5/90",
  },
  {
    title: "API Settings",
    description: "Manage API keys and webhooks",
    icon: Settings,
    color: "bg-muted hover:bg-muted/80 text-muted-foreground",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="ghost"
              className={`h-auto p-4 justify-start text-left ${action.color} text-white`}
            >
              <action.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium">{action.title}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
