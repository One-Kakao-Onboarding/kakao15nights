import { Link } from "react-router-dom"
import { ArrowRight, Eye, Zap } from "lucide-react"
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
