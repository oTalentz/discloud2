"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Shield, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { useState } from "react"

export default function LandingPage() {
  const { t } = useLanguage()
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "quarterly" | "annual">("annual")

  const calculatePrice = (basePrice: number) => {
    if (billingPeriod === "annual") {
      return Math.round(basePrice * 0.9) // 10% discount
    } else if (billingPeriod === "quarterly") {
      return Math.round(basePrice * 0.95) // 5% discount
    }
    return basePrice // No discount for monthly
  }

  const calculateSavings = (basePrice: number) => {
    if (billingPeriod === "annual") {
      return Math.round(basePrice * 0.1 * 12) // Annual savings
    } else if (billingPeriod === "quarterly") {
      return Math.round(basePrice * 0.05 * 12) // Quarterly savings per year
    }
    return 0
  }

  const calculateEffectiveMonthlyPrice = (basePrice: number) => {
    if (billingPeriod === "annual") {
      return (basePrice * 0.9).toFixed(2) // 10% discount
    } else if (billingPeriod === "quarterly") {
      return (basePrice * 0.95).toFixed(2) // 5% discount
    }
    return basePrice.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-background dark relative overflow-hidden">
      {/* Enhanced Multi-layer Animated Background */}
      <div className="grid-background"></div>
      <div className="floating-dots"></div>
      <div className="gradient-overlay"></div>

      {/* Relative z-index to ensure content appears above background */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/40 transition-all duration-500 ease-in-out backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold hidden sm:block">CloudHost</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <LanguageSelector />
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  {t("header.login")}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="text-xs sm:text-sm">
                  {t("header.getStarted")}
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 opacity-0 animate-fade-in transition-all duration-700 ease-out">
          <div className="container mx-auto text-center max-w-4xl">
            <Badge variant="secondary" className="mb-4 text-xs sm:text-sm">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">{t("hero.subtitle")}</p>
            <div className="flex justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg">
                  {t("hero.startHosting")} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/20 opacity-0 animate-fade-in-up transition-all duration-700 ease-out"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div
                className="text-center opacity-0 animate-fade-in-up transition-all duration-500 ease-out"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("features.instantDeploy.title")}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{t("features.instantDeploy.desc")}</p>
              </div>
              <div
                className="text-center opacity-0 animate-fade-in-up transition-all duration-500 ease-out"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("features.alwaysOnline.title")}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{t("features.alwaysOnline.desc")}</p>
              </div>
              <div
                className="text-center opacity-0 animate-fade-in-up transition-all duration-500 ease-out sm:col-span-2 lg:col-span-1"
                style={{ animationDelay: "0.9s" }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("features.globalCdn.title")}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{t("features.globalCdn.desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 opacity-0 animate-slide-up transition-all duration-800 ease-out"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="container mx-auto max-w-6xl">
            <div
              className="text-center mb-8 sm:mb-12 opacity-0 animate-fade-in transition-all duration-600 ease-out"
              style={{ animationDelay: "0.6s" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("pricing.title")}</h2>
              <p className="text-muted-foreground text-sm sm:text-base">{t("pricing.subtitle")}</p>

              <div className="flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8">
                <div className="bg-muted/50 p-1 rounded-lg flex items-center justify-center gap-1 sm:gap-2 w-full max-w-md sm:w-auto">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      billingPeriod === "monthly"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Mensal
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setBillingPeriod("quarterly")}
                      className={`px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                        billingPeriod === "quarterly"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Trimestral
                    </button>
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs bg-green-500 text-white px-1.5 py-0.5">
                      5%
                    </Badge>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setBillingPeriod("annual")}
                      className={`px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                        billingPeriod === "annual"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Anual
                    </button>
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs bg-green-500 text-white px-1.5 py-0.5">
                      10%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              <Card
                className="relative flex flex-col opacity-0 animate-fade-in-up transition-all duration-600 ease-out transform hover:scale-105 hover:shadow-xl"
                style={{ animationDelay: "0.8s" }}
              >
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-lg sm:text-xl">{t("pricing.free.title")}</CardTitle>
                  <CardDescription className="text-sm">{t("pricing.free.desc")}</CardDescription>
                  <div className="text-2xl sm:text-3xl font-bold">
                    R$0<span className="text-sm font-normal text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">1 Bot/Aplicação</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">100MB RAM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">100GB Largura de Banda</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Suporte Básico</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Deploy via GitHub</span>
                    </div>
                  </div>
                  <Link href="/login" className="block mt-auto">
                    <Button className="w-full bg-transparent" variant="outline">
                      Começar
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card
                className="relative border-primary flex flex-col opacity-0 animate-fade-in-up transition-all duration-600 ease-out transform hover:scale-105 hover:shadow-xl"
                style={{ animationDelay: "1s" }}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-xs">Mais Popular</Badge>
                </div>
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-lg sm:text-xl">Standard</CardTitle>
                  <CardDescription className="text-sm">
                    Base sólida para aplicações com performance e escalabilidade
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-bold">
                      R${calculatePrice(10)}
                      <span className="text-sm font-normal text-muted-foreground">/mês</span>
                    </div>
                    {billingPeriod !== "monthly" && (
                      <div className="text-sm text-muted-foreground">
                        <span className="line-through">R$10/mês</span>
                        <div className="text-green-500 font-medium">Economize R${calculateSavings(10)}/ano</div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">3 Bots/Aplicações</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">512MB RAM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">500GB Largura de Banda</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Domínio Personalizado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Notificações por E-mail</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Suporte Prioritário</span>
                    </div>
                  </div>
                  <Link href="/login" className="block mt-auto">
                    <Button className="w-full">Começar Agora</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card
                className="relative flex flex-col opacity-0 animate-fade-in-up transition-all duration-600 ease-out transform hover:scale-105 hover:shadow-xl lg:col-span-1 sm:col-span-2 lg:col-span-1"
                style={{ animationDelay: "1.2s" }}
              >
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-lg sm:text-xl">Pro</CardTitle>
                  <CardDescription className="text-sm">
                    Performance máxima para projetos de alta disponibilidade
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-bold">
                      R${calculatePrice(50)}
                      <span className="text-sm font-normal text-muted-foreground">/mês</span>
                    </div>
                    {billingPeriod !== "monthly" && (
                      <div className="text-sm text-muted-foreground">
                        <span className="line-through">R$50/mês</span>
                        <div className="text-green-500 font-medium">Economize R${calculateSavings(50)}/ano</div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">10 Bots/Aplicações</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">2GB RAM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">1TB Largura de Banda</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Snapshots Automáticos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Gerenciamento de Equipe</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Processamento Turbo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Suporte 24/7</span>
                    </div>
                  </div>
                  <Link href="/login" className="block mt-auto">
                    <Button className="w-full bg-transparent" variant="outline">
                      Começar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Animated CTA Section */}
        <section
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden opacity-0 animate-fade-in transition-all duration-900 ease-out"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900"></div>

          {/* Animated Network Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Animated connecting lines */}
              <g className="animate-pulse">
                <line x1="100" y1="100" x2="200" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="200" y1="150" x2="350" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="350" y1="120" x2="500" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="500" y1="180" x2="650" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              </g>

              {/* Animated dots */}
              <g>
                <circle cx="100" cy="100" r="4" fill="rgba(255,255,255,0.6)" className="animate-ping" />
                <circle
                  cx="200"
                  cy="150"
                  r="4"
                  fill="rgba(255,255,255,0.6)"
                  className="animate-ping"
                  style={{ animationDelay: "0.5s" }}
                />
                <circle
                  cx="350"
                  cy="120"
                  r="4"
                  fill="rgba(255,255,255,0.6)"
                  className="animate-ping"
                  style={{ animationDelay: "1s" }}
                />
                <circle
                  cx="500"
                  cy="180"
                  r="4"
                  fill="rgba(255,255,255,0.6)"
                  className="animate-ping"
                  style={{ animationDelay: "1.5s" }}
                />
                <circle
                  cx="650"
                  cy="140"
                  r="4"
                  fill="rgba(255,255,255,0.6)"
                  className="animate-ping"
                  style={{ animationDelay: "2s" }}
                />
              </g>
            </svg>
          </div>

          {/* Floating Bot Cards */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            <div className="absolute top-20 right-10 transform rotate-12 animate-float">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white text-sm font-medium">MusicBot</span>
                </div>
                <div className="text-white/70 text-xs">Online • 24/7</div>
              </div>
            </div>

            <div
              className="absolute bottom-20 right-20 transform -rotate-6 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-white text-sm font-medium">ModBot</span>
                </div>
                <div className="text-white/70 text-xs">Deploying...</div>
              </div>
            </div>

            <div className="absolute top-32 left-10 transform rotate-6 animate-float" style={{ animationDelay: "2s" }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-white text-sm font-medium">GameBot</span>
                </div>
                <div className="text-white/70 text-xs">Ready to deploy</div>
              </div>
            </div>
          </div>

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Descubra, crie e hospede
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>seus próprios bots
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto px-4">
              Plataforma completa para desenvolvedores criarem, deployarem e gerenciarem bots de Discord, Telegram e
              aplicações web com facilidade total.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link href="/login">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                  Explorar Agora <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto bg-transparent"
                >
                  Criar Seu Primeiro Bot <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="border-t border-border/40 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 opacity-0 animate-fade-in transition-all duration-500 ease-out"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="container mx-auto text-center text-muted-foreground">
            <p className="text-sm sm:text-base">{t("footer.rights")}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
