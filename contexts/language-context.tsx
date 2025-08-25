"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "pt-br" | "en" | "pt-pt"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  "pt-br": {
    // Header
    "header.login": "Entrar",
    "header.getStarted": "Começar",

    // Hero Section
    "hero.badge": "Deploy em segundos",
    "hero.title": "Hospede seus bots sem complicação",
    "hero.subtitle":
      "Faça upload do seu bot Discord, Telegram ou WhatsApp e coloque-o online instantaneamente. Sem Docker, sem servidores, sem complexidade.",
    "hero.startHosting": "Começar Hospedagem",
    "hero.viewDemo": "Ver Demo",

    // Features
    "features.instantDeploy.title": "Deploy Instantâneo",
    "features.instantDeploy.desc": "Faça upload do seu arquivo ZIP e fique online em menos de 30 segundos",
    "features.alwaysOnline.title": "Sempre Online",
    "features.alwaysOnline.desc": "99,9% de uptime com reinicializações automáticas e monitoramento",
    "features.globalCdn.title": "CDN Global",
    "features.globalCdn.desc": "Tempos de resposta ultrarrápidos em todo o mundo",

    // Pricing
    "pricing.title": "Preços simples e transparentes",
    "pricing.subtitle": "Escolha o plano que atende às suas necessidades",
    "pricing.free.title": "Gratuito",
    "pricing.free.desc": "Perfeito para testes",
    "pricing.free.bot": "1 Bot/App",
    "pricing.free.ram": "512MB RAM",
    "pricing.free.bandwidth": "100GB Largura de Banda",
    "pricing.free.support": "Suporte Básico",
    "pricing.pro.title": "Pro",
    "pricing.pro.desc": "Para desenvolvedores sérios",
    "pricing.pro.badge": "Mais Popular",
    "pricing.pro.bots": "5 Bots/Apps",
    "pricing.pro.ram": "2GB RAM",
    "pricing.pro.bandwidth": "500GB Largura de Banda",
    "pricing.pro.domain": "Domínio Personalizado",
    "pricing.pro.support": "Suporte Prioritário",
    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.desc": "Para equipes e empresas",
    "pricing.enterprise.bots": "Bots/Apps Ilimitados",
    "pricing.enterprise.ram": "8GB RAM",
    "pricing.enterprise.bandwidth": "Largura de Banda Ilimitada",
    "pricing.enterprise.team": "Gerenciamento de Equipe",
    "pricing.enterprise.support": "Suporte 24/7",
    "pricing.getStarted": "Começar",
    "pricing.contactSales": "Contatar Vendas",

    // Footer
    "footer.rights": "© 2024 CloudHost. Todos os direitos reservados.",

    // Login Page
    "login.title": "Entrar na sua conta",
    "login.subtitle": "Bem-vindo de volta! Entre para acessar seu painel.",
    "login.email": "Email",
    "login.password": "Senha",
    "login.signIn": "Entrar",
    "login.signInDiscord": "Entrar com Discord",
    "login.noAccount": "Não tem uma conta?",
    "login.signUp": "Cadastre-se",
    "login.or": "ou",

    // Dashboard
    "dashboard.welcome": "Bem-vindo de volta",
    "dashboard.quickStart": "Início Rápido",
    "dashboard.uploadBot": "Fazer Upload do Bot",
    "dashboard.uploadDesc": "Arraste e solte seu arquivo ZIP ou clique para selecionar",
    "dashboard.myBots": "Meus Bots",
    "dashboard.status": "Status",
    "dashboard.online": "Online",
    "dashboard.offline": "Offline",
    "dashboard.actions": "Ações",
    "dashboard.view": "Ver",
    "dashboard.restart": "Reiniciar",
    "dashboard.delete": "Excluir",
    "dashboard.stats.totalBots": "Total de Bots",
    "dashboard.stats.activeBots": "Bots Ativos",
    "dashboard.stats.uptime": "Uptime",
    "dashboard.stats.requests": "Requisições/h",
    "dashboard.logout": "Sair",

    // Settings
    "settings.title": "Configurações",
    "settings.account": "Conta",
    "settings.billing": "Cobrança",
    "settings.security": "Segurança",
    "settings.language": "Idioma",
    "settings.selectLanguage": "Selecionar idioma",
  },
  en: {
    // Header
    "header.login": "Login",
    "header.getStarted": "Get Started",

    // Hero Section
    "hero.badge": "Deploy in seconds",
    "hero.title": "Host your bots with zero hassle",
    "hero.subtitle":
      "Upload your Discord, Telegram, or WhatsApp bot and get it running instantly. No Docker, no servers, no complexity.",
    "hero.startHosting": "Start Hosting",
    "hero.viewDemo": "View Demo",

    // Features
    "features.instantDeploy.title": "Instant Deploy",
    "features.instantDeploy.desc": "Upload your ZIP file and go live in under 30 seconds",
    "features.alwaysOnline.title": "Always Online",
    "features.alwaysOnline.desc": "99.9% uptime with automatic restarts and monitoring",
    "features.globalCdn.title": "Global CDN",
    "features.globalCdn.desc": "Lightning-fast response times worldwide",

    // Pricing
    "pricing.title": "Simple, transparent pricing",
    "pricing.subtitle": "Choose the plan that fits your needs",
    "pricing.free.title": "Free",
    "pricing.free.desc": "Perfect for testing",
    "pricing.free.bot": "1 Bot/App",
    "pricing.free.ram": "512MB RAM",
    "pricing.free.bandwidth": "100GB Bandwidth",
    "pricing.free.support": "Basic Support",
    "pricing.pro.title": "Pro",
    "pricing.pro.desc": "For serious developers",
    "pricing.pro.badge": "Most Popular",
    "pricing.pro.bots": "5 Bots/Apps",
    "pricing.pro.ram": "2GB RAM",
    "pricing.pro.bandwidth": "500GB Bandwidth",
    "pricing.pro.domain": "Custom Domain",
    "pricing.pro.support": "Priority Support",
    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.desc": "For teams and businesses",
    "pricing.enterprise.bots": "Unlimited Bots/Apps",
    "pricing.enterprise.ram": "8GB RAM",
    "pricing.enterprise.bandwidth": "Unlimited Bandwidth",
    "pricing.enterprise.team": "Team Management",
    "pricing.enterprise.support": "24/7 Support",
    "pricing.getStarted": "Get Started",
    "pricing.contactSales": "Contact Sales",

    // Footer
    "footer.rights": "© 2024 CloudHost. All rights reserved.",

    // Login Page
    "login.title": "Sign in to your account",
    "login.subtitle": "Welcome back! Sign in to access your dashboard.",
    "login.email": "Email",
    "login.password": "Password",
    "login.signIn": "Sign In",
    "login.signInDiscord": "Sign in with Discord",
    "login.noAccount": "Don't have an account?",
    "login.signUp": "Sign up",
    "login.or": "or",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.quickStart": "Quick Start",
    "dashboard.uploadBot": "Upload Bot",
    "dashboard.uploadDesc": "Drag and drop your ZIP file or click to select",
    "dashboard.myBots": "My Bots",
    "dashboard.status": "Status",
    "dashboard.online": "Online",
    "dashboard.offline": "Offline",
    "dashboard.actions": "Actions",
    "dashboard.view": "View",
    "dashboard.restart": "Restart",
    "dashboard.delete": "Delete",
    "dashboard.stats.totalBots": "Total Bots",
    "dashboard.stats.activeBots": "Active Bots",
    "dashboard.stats.uptime": "Uptime",
    "dashboard.stats.requests": "Requests/h",
    "dashboard.logout": "Logout",

    // Settings
    "settings.title": "Settings",
    "settings.account": "Account",
    "settings.billing": "Billing",
    "settings.security": "Security",
    "settings.language": "Language",
    "settings.selectLanguage": "Select language",
  },
  "pt-pt": {
    // Header
    "header.login": "Iniciar Sessão",
    "header.getStarted": "Começar",

    // Hero Section
    "hero.badge": "Deploy em segundos",
    "hero.title": "Aloje os seus bots sem complicações",
    "hero.subtitle":
      "Carregue o seu bot Discord, Telegram ou WhatsApp e coloque-o online instantaneamente. Sem Docker, sem servidores, sem complexidade.",
    "hero.startHosting": "Começar Alojamento",
    "hero.viewDemo": "Ver Demonstração",

    // Features
    "features.instantDeploy.title": "Deploy Instantâneo",
    "features.instantDeploy.desc": "Carregue o seu ficheiro ZIP e fique online em menos de 30 segundos",
    "features.alwaysOnline.title": "Sempre Online",
    "features.alwaysOnline.desc": "99,9% de uptime com reinicializações automáticas e monitorização",
    "features.globalCdn.title": "CDN Global",
    "features.globalCdn.desc": "Tempos de resposta ultrarrápidos em todo o mundo",

    // Pricing
    "pricing.title": "Preços simples e transparentes",
    "pricing.subtitle": "Escolha o plano que se adequa às suas necessidades",
    "pricing.free.title": "Gratuito",
    "pricing.free.desc": "Perfeito para testes",
    "pricing.free.bot": "1 Bot/App",
    "pricing.free.ram": "512MB RAM",
    "pricing.free.bandwidth": "100GB Largura de Banda",
    "pricing.free.support": "Suporte Básico",
    "pricing.pro.title": "Pro",
    "pricing.pro.desc": "Para programadores sérios",
    "pricing.pro.badge": "Mais Popular",
    "pricing.pro.bots": "5 Bots/Apps",
    "pricing.pro.ram": "2GB RAM",
    "pricing.pro.bandwidth": "500GB Largura de Banda",
    "pricing.pro.domain": "Domínio Personalizado",
    "pricing.pro.support": "Suporte Prioritário",
    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.desc": "Para equipas e empresas",
    "pricing.enterprise.bots": "Bots/Apps Ilimitados",
    "pricing.enterprise.ram": "8GB RAM",
    "pricing.enterprise.bandwidth": "Largura de Banda Ilimitada",
    "pricing.enterprise.team": "Gestão de Equipa",
    "pricing.enterprise.support": "Suporte 24/7",
    "pricing.getStarted": "Começar",
    "pricing.contactSales": "Contactar Vendas",

    // Footer
    "footer.rights": "© 2024 CloudHost. Todos os direitos reservados.",

    // Login Page
    "login.title": "Iniciar sessão na sua conta",
    "login.subtitle": "Bem-vindo de volta! Inicie sessão para aceder ao seu painel.",
    "login.email": "Email",
    "login.password": "Palavra-passe",
    "login.signIn": "Iniciar Sessão",
    "login.signInDiscord": "Iniciar sessão com Discord",
    "login.noAccount": "Não tem uma conta?",
    "login.signUp": "Registar-se",
    "login.or": "ou",

    // Dashboard
    "dashboard.welcome": "Bem-vindo de volta",
    "dashboard.quickStart": "Início Rápido",
    "dashboard.uploadBot": "Carregar Bot",
    "dashboard.uploadDesc": "Arraste e largue o seu ficheiro ZIP ou clique para seleccionar",
    "dashboard.myBots": "Os Meus Bots",
    "dashboard.status": "Estado",
    "dashboard.online": "Online",
    "dashboard.offline": "Offline",
    "dashboard.actions": "Acções",
    "dashboard.view": "Ver",
    "dashboard.restart": "Reiniciar",
    "dashboard.delete": "Eliminar",
    "dashboard.stats.totalBots": "Total de Bots",
    "dashboard.stats.activeBots": "Bots Activos",
    "dashboard.stats.uptime": "Uptime",
    "dashboard.stats.requests": "Pedidos/h",
    "dashboard.logout": "Terminar Sessão",

    // Settings
    "settings.title": "Definições",
    "settings.account": "Conta",
    "settings.billing": "Facturação",
    "settings.security": "Segurança",
    "settings.language": "Idioma",
    "settings.selectLanguage": "Seleccionar idioma",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-br")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["pt-br", "en", "pt-pt"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
