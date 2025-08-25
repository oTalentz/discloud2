"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Zap, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"

export default function LoginPage() {
  const { t } = useLanguage()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (isLogin) {
      // Login logic - check admin credentials
      if (email === "admin@cloudhost.com" && password === "admin123") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: "admin@cloudhost.com",
            name: "Admin User",
            role: "admin",
          }),
        )
        router.push("/dashboard")
      } else if (email && password.length >= 6) {
        // Regular user login
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            name: email.split("@")[0],
            role: "user",
          }),
        )
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Use admin@cloudhost.com / admin123 for admin access")
      }
    } else {
      // Register logic
      if (email && password.length >= 6) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            name: email.split("@")[0],
            role: "user",
          }),
        )
        router.push("/dashboard")
      } else {
        setError("Please enter valid email and password (min 6 characters)")
      }
    }

    setLoading(false)
  }

  const handleDiscordAuth = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "discord@user.com",
        name: "Discord User",
        role: "user",
        provider: "discord",
      }),
    )
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CloudHost</span>
          </div>
          <CardTitle>{t("login.title")}</CardTitle>
          <CardDescription>{t("login.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
            onClick={handleDiscordAuth}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            {loading ? "Connecting..." : t("login.signInDiscord")}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t("login.or")}</span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("login.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("login.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-2 rounded">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              <Mail className="w-4 h-4 mr-2" />
              {loading ? "Loading..." : t("login.signIn")}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t("login.noAccount")}</span>
            <Button variant="link" className="p-0 ml-1 h-auto" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? t("login.signUp") : t("login.signIn")}
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground bg-muted/20 p-3 rounded">
            <strong>Admin Access:</strong>
            <br />
            Email: admin@cloudhost.com
            <br />
            Password: admin123
          </div>

          <div className="text-center">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Back to home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
