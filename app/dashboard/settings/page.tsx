"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Zap, User, CreditCard, Bell, Shield, Key, Trash2, Crown, Copy, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"

export default function SettingsPage() {
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState({
    email: true,
    discord: false,
    downtime: true,
    deployment: true,
  })

  const [apiKey] = useState("sk_live_1234567890abcdef")

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">{t("settings.title")}</span>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <CardTitle>{t("settings.account")}</CardTitle>
            </div>
            <CardDescription>Manage your account information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <CardTitle>{t("settings.language")}</CardTitle>
            </div>
            <CardDescription>{t("settings.selectLanguage")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t("settings.language")}</p>
                <p className="text-sm text-muted-foreground">{t("settings.selectLanguage")}</p>
              </div>
              <LanguageSelector />
            </div>
          </CardContent>
        </Card>

        {/* Plan & Billing */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <CardTitle>{t("settings.billing")}</CardTitle>
            </div>
            <CardDescription>Manage your subscription and billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">Free Plan</Badge>
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">1 bot, 512MB RAM, 100GB bandwidth</p>
                </div>
              </div>
              <Button>
                <Crown className="w-4 h-4 mr-2" />
                Upgrade
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Bots Used</span>
                  <span>1 / 1</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Memory Used</span>
                  <span>45% / 512MB</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Bandwidth Used</span>
                  <span>12GB / 100GB</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5" />
              <CardTitle>API Keys</CardTitle>
            </div>
            <CardDescription>Manage your API keys for external integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="font-mono text-sm">{apiKey.slice(0, 20)}...</div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline">Generate New Key</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Configure how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Discord Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified in Discord</p>
              </div>
              <Switch
                checked={notifications.discord}
                onCheckedChange={(checked) => setNotifications({ ...notifications, discord: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Downtime Alerts</p>
                <p className="text-sm text-muted-foreground">Alert when bots go offline</p>
              </div>
              <Switch
                checked={notifications.downtime}
                onCheckedChange={(checked) => setNotifications({ ...notifications, downtime: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Deployment Updates</p>
                <p className="text-sm text-muted-foreground">Notify on successful deployments</p>
              </div>
              <Switch
                checked={notifications.deployment}
                onCheckedChange={(checked) => setNotifications({ ...notifications, deployment: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <CardTitle>{t("settings.security")}</CardTitle>
            </div>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Trash2 className="w-5 h-5 text-destructive" />
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </div>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
