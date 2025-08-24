import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Plus } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold font-serif text-foreground">Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search deployments, bots..." className="pl-10 w-80" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Deployment
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>

          <Avatar>
            <AvatarImage src="/developer-avatar.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
