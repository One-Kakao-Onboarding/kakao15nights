import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Eye, Users, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Features() {
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
            <Link to="/features" className="text-sm text-foreground font-medium transition-colors">
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

      {/* Hero */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">핵심 기능</h1>
          <p className="text-lg text-muted-foreground">
            AI가 발견한 문제를 시각적으로 명확하게 표시해드립니다.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Eye className="h-8 w-8" />}
            title="Visual Red Pen"
            description="AI가 지적한 문제 영역을 원본 이미지 위에 빨간 박스로 표시하여 한눈에 파악할 수 있습니다."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="멀티 페르소나 분석"
            description="4가지 페르소나를 동시에 선택하여 다양한 관점의 피드백을 한 번에 수집할 수 있습니다."
          />
          <FeatureCard
            icon={<Target className="h-8 w-8" />}
            title="구체적인 개선 제안"
            description="단순 지적이 아닌, 실제로 적용 가능한 구체적인 수정 방안을 제시합니다."
          />
        </div>
      </section>

      {/* Feature Details */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Visual Red Pen Detail */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Visual Red Pen</h2>
                <p className="text-muted-foreground mb-4">
                  마치 선배 디자이너가 빨간펜으로 피드백을 주듯, AI가 발견한 UX 문제점을 원본 이미지 위에 직관적으로 표시합니다.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    문제 영역을 빨간 박스로 하이라이트
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    클릭하면 해당 문제에 대한 상세 설명 표시
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    문제별 네비게이션으로 순차적 검토 가능
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-8 flex items-center justify-center">
                <div className="relative w-48 h-64 bg-muted rounded-lg">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-muted-foreground/20 rounded" />
                  <div className="absolute top-16 left-4 right-4 h-20 border-2 border-red-500 bg-red-500/10 rounded" />
                  <div className="absolute top-40 left-4 w-20 h-6 bg-muted-foreground/20 rounded" />
                </div>
              </div>
            </div>

            {/* Multi Persona Detail */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-card border border-border rounded-xl p-8 flex items-center justify-center gap-4">
                <div className="text-4xl">👵</div>
                <div className="text-4xl">📱</div>
                <div className="text-4xl">🚌</div>
                <div className="text-4xl">🌏</div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-bold mb-4">멀티 페르소나 분석</h2>
                <p className="text-muted-foreground mb-4">
                  한 번의 분석으로 다양한 사용자 관점의 피드백을 받아보세요. 각 페르소나는 고유한 특성과 UX 체크리스트를 가지고 있습니다.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    최대 4가지 페르소나 동시 선택 가능
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    페르소나별 점수 및 피드백 제공
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    종합 점수로 전체적인 UX 품질 파악
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-24 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">직접 체험해보세요</h2>
        <p className="text-muted-foreground mb-8">
          UI 스크린샷 한 장으로 시작할 수 있습니다.
        </p>
        <Link to="/analyze">
          <Button size="lg" className="gap-2">
            무료로 시작하기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
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

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
