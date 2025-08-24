import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Rocket,
  BarChart3,
  Settings,
  Bot,
  Database,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, current: true },
  { name: "Deployments", href: "/deployments", icon: Rocket, current: false },
  { name: "Bots", href: "/bots", icon: Bot, current: false },
  { name: "Analytics", href: "/analytics", icon: BarChart3, current: false },
  { name: "Database", href: "/database", icon: Database, current: false },
  { name: "Billing", href: "/billing", icon: CreditCard, current: false },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
]

const support = [
  { name: "Help & Support", href: "/help", icon: HelpCircle },
  { name: "Sign Out", href: "/logout", icon: LogOut },
]

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border lg:block hidden">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-serif text-sidebar-foreground">CloudHost</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={item.current ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                item.current
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Button>
          ))}
        </nav>

        {/* Support */}
        <div className="px-4 py-4 border-t border-sidebar-border space-y-2">
          {support.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
