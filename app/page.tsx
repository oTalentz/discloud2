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
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CloudHost</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {t("header.login")}
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">{t("header.getStarted")}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            {t("hero.badge")}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                {t("hero.startHosting")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              {t("hero.viewDemo")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("features.instantDeploy.title")}</h3>
              <p className="text-muted-foreground">{t("features.instantDeploy.desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("features.alwaysOnline.title")}</h3>
              <p className="text-muted-foreground">{t("features.alwaysOnline.desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("features.globalCdn.title")}</h3>
              <p className="text-muted-foreground">{t("features.globalCdn.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("pricing.title")}</h2>
            <p className="text-muted-foreground">{t("pricing.subtitle")}</p>

            <div className="flex justify-center mt-8 mb-8">
              <div className="bg-muted/50 p-1 rounded-lg flex items-center justify-center gap-2">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
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
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
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
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
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

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <Card className="relative flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl">{t("pricing.free.title")}</CardTitle>
                <CardDescription>{t("pricing.free.desc")}</CardDescription>
                <div className="text-3xl font-bold">
                  R$0<span className="text-sm font-normal text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">1 Bot/Aplicação</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">100MB RAM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">100GB Largura de Banda</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Suporte Básico</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Deploy via GitHub</span>
                  </div>
                </div>
                <Link href="/login" className="block mt-auto">
                  <Button className="w-full bg-transparent" variant="outline">
                    {t("pricing.getStarted")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative border-primary flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Mais Popular</Badge>
              </div>
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl">Standard</CardTitle>
                <CardDescription>Base sólida para aplicações com performance e escalabilidade</CardDescription>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
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
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">3 Bots/Aplicações</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">512MB RAM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">500GB Largura de Banda</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Domínio Personalizado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Notificações por E-mail</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Suporte Prioritário</span>
                  </div>
                </div>
                <Link href="/login" className="block mt-auto">
                  <Button className="w-full">Começar</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl">Pro</CardTitle>
                <CardDescription>Performance máxima para projetos de alta disponibilidade</CardDescription>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
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
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">10 Bots/Aplicações</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">2GB RAM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">1TB Largura de Banda</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Snapshots Automáticos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Gerenciamento de Equipe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Processamento Turbo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
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

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>{t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  )
}
