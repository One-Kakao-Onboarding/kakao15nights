import { Link } from "react-router-dom"
import { ArrowRight, Eye, Zap, Heart, Users, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">UX-Ray</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              기능
            </Link>
            <Link to="/personas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              페르소나
            </Link>
            <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              사용법
            </Link>
          </nav>
          <Link to="/analyze">
            <Button>시작하기</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-24 md:py-32 px-4">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Zap className="h-4 w-4" />
            AI 기반 UX 진단 솔루션
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            당신이 테스트해볼 수 없었던
            <br />
            <span className="text-primary">유저들의 접근성</span>을 보여드려요
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">
            4가지 AI 페르소나가 당신의 UI를 분석하고, 놓치기 쉬운 접근성 문제를 시각적으로 보여드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/analyze">
              <Button size="lg" className="gap-2">
                무료로 시작하기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline">
                사용법 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">4가지</div>
              <div className="text-sm text-muted-foreground mt-1">AI 페르소나</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">30초</div>
              <div className="text-sm text-muted-foreground mt-1">평균 분석 시간</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground mt-1">문제 발견율</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">무료</div>
              <div className="text-sm text-muted-foreground mt-1">시작 비용</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="container mx-auto py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
              <Heart className="h-4 w-4" />
              사회적 가치
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              디지털 포용, 모두를 위한 UX
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              UX-Ray는 단순한 진단 도구가 아닙니다.
              디지털 소외 계층을 포함한 모든 사람이 편리하게 사용할 수 있는 서비스를 만들어갑니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-xl mb-3">1,200만 명의 디지털 소외 계층</h3>
              <p className="text-muted-foreground leading-relaxed">
                대한민국 65세 이상 고령 인구는 약 <strong className="text-foreground">900만 명</strong>,
                장애인 등록 인구는 <strong className="text-foreground">약 264만 명</strong>.
                이들 중 상당수가 작은 글씨, 복잡한 UI, 불친절한 네비게이션으로 인해 디지털 서비스 이용에 어려움을 겪고 있습니다.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-xl mb-3">글로벌 접근성 기준 충족</h3>
              <p className="text-muted-foreground leading-relaxed">
                한국 웹사이트의 <strong className="text-foreground">접근성 준수율은 약 30%</strong>에 불과합니다.
                UX-Ray는 WCAG(웹 접근성 가이드라인)과 한국형 웹 콘텐츠 접근성 지침(KWCAG)을 기반으로
                외국인, 장애인도 사용 가능한 서비스를 만듭니다.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold text-xl mb-3">카카오 생태계 접근성 강화</h3>
              <p className="text-muted-foreground leading-relaxed">
                카카오톡, 카카오페이, 다음 등 <strong className="text-foreground">카카오 그룹 서비스</strong>의
                UX를 개선하여 디지털 취약 계층의 진입 장벽을 낮춥니다.
                더 많은 사람이 카카오 생태계를 편리하게 이용할 수 있도록 기여합니다.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-bold text-xl mb-3">실질적인 사회 기여</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">접근성 1% 개선</strong>만으로도
                수십만 명이 서비스를 더 쉽게 사용할 수 있습니다.
                UX-Ray는 디자이너와 기획자가 쉽게 접근성 문제를 발견하고 개선할 수 있도록 도와,
                디지털 권리를 보장하는 사회를 만듭니다.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 via-red-500/10 to-orange-500/10 border border-border rounded-xl p-8 md:p-10">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                "좋은 UX는 특권이 아닌 권리입니다"
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                UX-Ray를 통해 하나의 서비스가 개선될 때마다,
                디지털 소외 계층이 일상에서 느끼는 불편함이 하나씩 사라집니다.
                당신의 디자인이 누군가의 삶을 바꿀 수 있습니다.
              </p>
              <Link to="/analyze">
                <Button size="lg" className="gap-2">
                  지금 접근성 진단 시작하기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto py-24 px-4">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link to="/features" className="group">
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary/50">
              <h3 className="font-bold text-xl mb-3">핵심 기능</h3>
              <p className="text-muted-foreground mb-4">
                Visual Red Pen, 멀티 페르소나 분석 등 주요 기능을 확인하세요.
              </p>
              <span className="text-primary font-medium group-hover:underline">자세히 보기 →</span>
            </div>
          </Link>
          <Link to="/personas" className="group">
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary/50">
              <div className="flex gap-2 mb-4">
                <span className="text-2xl">👵</span>
                <span className="text-2xl">📱</span>
                <span className="text-2xl">🚌</span>
                <span className="text-2xl">🌏</span>
              </div>
              <h3 className="font-bold text-xl mb-3">AI 페르소나</h3>
              <p className="text-muted-foreground mb-4">
                4가지 페르소나의 특성과 UX 체크리스트를 확인하세요.
              </p>
              <span className="text-primary font-medium group-hover:underline">자세히 보기 →</span>
            </div>
          </Link>
          <Link to="/how-it-works" className="group">
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary/50">
              <h3 className="font-bold text-xl mb-3">사용 방법</h3>
              <p className="text-muted-foreground mb-4">
                3단계로 간단하게 UX 진단을 받는 방법을 확인하세요.
              </p>
              <span className="text-primary font-medium group-hover:underline">자세히 보기 →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 바로 UX 진단을 시작하세요</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            사용자 테스트 없이도 다양한 사용자 관점에서 UI의 문제점을 발견할 수 있습니다.
          </p>
          <Link to="/analyze">
            <Button size="lg" variant="secondary" className="gap-2">
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <span className="font-bold">UX-Ray</span>
            </Link>
            <p className="text-sm text-muted-foreground">© 2026 UX-Ray. AI 기반 UX 진단 솔루션</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
