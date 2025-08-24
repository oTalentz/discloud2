"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Settings, LogOut, Upload, Play, Pause, Trash2, Server, Eye, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [bots, setBots] = useState([
    {
      id: 1,
      name: "MusicBot",
      status: "online",
      uptime: "2d 14h",
      memory: 45,
      cpu: 12,
      lastRestart: "2 hours ago",
    },
    {
      id: 2,
      name: "ModeratorBot",
      status: "offline",
      uptime: "0m",
      memory: 0,
      cpu: 0,
      lastRestart: "5 minutes ago",
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("[v0] File selected:", file.name)
      const newBot = {
        id: Date.now(),
        name: file.name.replace(".zip", ""),
        status: "deploying" as const,
        uptime: "0m",
        memory: 0,
        cpu: 0,
        lastRestart: "now",
      }
      setBots((prev) => [...prev, newBot])

      setTimeout(() => {
        setBots((prev) =>
          prev.map((bot) =>
            bot.id === newBot.id
              ? { ...bot, status: "online" as const, memory: Math.floor(Math.random() * 30) + 10 }
              : bot,
          ),
        )
      }, 3000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded animate-spin mx-auto mb-4">
            <Zap className="w-4 h-4 text-white m-2" />
          </div>
          <p className="text-zinc-400">Carregando...</p>
        </div>
      </div>
    )
  }

  const toggleBotStatus = (id: number) => {
    setBots((prev) =>
      prev.map((bot) =>
        bot.id === id
          ? {
              ...bot,
              status: bot.status === "online" ? "offline" : "online",
              memory: bot.status === "online" ? 0 : Math.floor(Math.random() * 30) + 10,
              cpu: bot.status === "online" ? 0 : Math.floor(Math.random() * 15) + 5,
            }
          : bot,
      ),
    )
  }

  const deleteBot = (id: number) => {
    setBots((prev) => prev.filter((bot) => bot.id !== id))
  }

  const restartBot = (id: number) => {
    setBots((prev) =>
      prev.map((bot) => (bot.id === id ? { ...bot, status: "restarting" as const, lastRestart: "now" } : bot)),
    )

    setTimeout(() => {
      setBots((prev) => prev.map((bot) => (bot.id === id ? { ...bot, status: "online" as const } : bot)))
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-medium">CloudHost</span>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
              {user?.role === "admin" ? "Admin" : "Free"}
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-zinc-400">Olá, {user?.name}</span>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".zip" className="hidden" />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-lg font-medium"
          >
            <Upload className="w-5 h-5 mr-3" />
            Enviar Aplicação (.zip)
          </Button>
          <p className="text-zinc-500 text-sm mt-2 text-center">
            Arraste e solte ou clique para enviar seu bot em formato ZIP
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">
                {bots.filter((b) => b.status === "online").length}
              </div>
              <div className="text-sm text-zinc-400">Online</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{bots.length}</div>
              <div className="text-sm text-zinc-400">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">1/1</div>
              <div className="text-sm text-zinc-400">Limite</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-medium text-zinc-300 mb-4">Suas Aplicações</h2>

          {bots.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-12 text-center">
                <Server className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma aplicação</h3>
                <p className="text-zinc-500">Envie seu primeiro bot para começar</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {bots.map((bot) => (
                <Card key={bot.id} className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                          <Server className="w-5 h-5 text-zinc-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{bot.name}</h3>
                          <div className="flex items-center space-x-3 text-sm text-zinc-500">
                            <span className="flex items-center space-x-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  bot.status === "online"
                                    ? "bg-green-500"
                                    : bot.status === "deploying"
                                      ? "bg-yellow-500"
                                      : bot.status === "restarting"
                                        ? "bg-blue-500"
                                        : "bg-red-500"
                                }`}
                              />
                              <span className="capitalize">
                                {bot.status === "deploying"
                                  ? "Enviando..."
                                  : bot.status === "restarting"
                                    ? "Reiniciando..."
                                    : bot.status}
                              </span>
                            </span>
                            <span>Uptime: {bot.uptime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBotStatus(bot.id)}
                          className="text-zinc-400 hover:text-white"
                          disabled={bot.status === "deploying" || bot.status === "restarting"}
                        >
                          {bot.status === "online" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => restartBot(bot.id)}
                          className="text-zinc-400 hover:text-white"
                          disabled={bot.status !== "online"}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBot(bot.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {bot.status === "online" && (
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-xs text-zinc-500 mb-1">
                            <span>RAM</span>
                            <span>{bot.memory}%</span>
                          </div>
                          <Progress value={bot.memory} className="h-1 bg-zinc-800" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-zinc-500 mb-1">
                            <span>CPU</span>
                            <span>{bot.cpu}%</span>
                          </div>
                          <Progress value={bot.cpu} className="h-1 bg-zinc-800" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
