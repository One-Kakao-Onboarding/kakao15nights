import { Link } from "react-router-dom"
import { Eye, ArrowRight, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
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
            <Link to="/how-it-works" className="text-sm text-foreground font-medium transition-colors">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">사용 방법</h1>
          <p className="text-lg text-muted-foreground">
            3단계만으로 전문적인 UX 진단을 받아보세요.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold">이미지 업로드</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                진단받고 싶은 UI 스크린샷을 드래그 앤 드롭으로 업로드하세요.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  JPG, PNG 형식 지원
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  웹사이트, 모바일 앱, 데스크톱 앱 화면 모두 가능
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  와이어프레임이나 목업도 분석 가능
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 flex items-center justify-center">
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">이미지를 드래그하여 업로드</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 bg-card border border-border rounded-xl p-8">
              <div className="space-y-3">
                {[
                  { emoji: "👵", name: "디지털 취약계층 김복심 할머니", selected: true },
                  { emoji: "📱", name: "참을성이 부족한 이혁준 대리", selected: true },
                  { emoji: "🚌", name: "한 손 조작 사용자 김민석", selected: false },
                  { emoji: "🌏", name: "미국인 Brian", selected: false },
                ].map((persona, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                      persona.selected ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <span className="text-2xl">{persona.emoji}</span>
                    <span className="text-sm font-medium">{persona.name}</span>
                    {persona.selected && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold">페르소나 선택</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                4가지 페르소나 중 원하는 진단 대상을 선택하세요. 다중 선택이 가능합니다.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  최소 1명 이상의 페르소나 선택 필요
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  여러 페르소나 선택 시 다양한 관점의 피드백 수집
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  디바이스 타입(모바일/태블릿/데스크톱) 선택 가능
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h2 className="text-2xl font-bold">결과 확인</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                AI가 분석한 결과를 Visual Red Pen과 함께 상세 리포트로 확인하세요.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  페르소나별 점수 및 상세 피드백 제공
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  문제 영역을 이미지 위에 시각적으로 표시
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  종합 점수로 전체 UX 품질 파악
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">종합 점수</span>
                <span className="text-3xl font-bold text-yellow-500">72</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-6">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "72%" }} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-800">
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">1</span>
                  <span className="text-sm">글씨가 너무 작아서 눈이 아프네요.</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-muted">
                  <span className="w-5 h-5 rounded-full bg-muted-foreground text-white text-xs flex items-center justify-center">2</span>
                  <span className="text-sm text-muted-foreground">버튼 설명이 없어서 무서워요.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작해보세요</h2>
          <p className="text-primary-foreground/80 mb-8">
            UI 스크린샷 한 장이면 충분합니다.
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
