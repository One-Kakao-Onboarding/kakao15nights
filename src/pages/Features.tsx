import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Eye, Users, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-radial">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">UX-Ray</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link to="/features">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                기능
              </Button>
            </Link>
            <Link to="/how-to-use">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                사용법
              </Button>
            </Link>
            <Link to="/analyze">
              <Button size="sm" className="ml-2 bg-white text-black hover:bg-white/90">
                시작하기
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">핵심 기능</h1>
          <p className="text-lg text-gray-400">
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
      <section className="bg-white/5 backdrop-blur-xl py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Visual Red Pen Detail */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Visual Red Pen</h2>
                <p className="text-gray-400 mb-4">
                  마치 선배 디자이너가 빨간펜으로 피드백을 주듯, AI가 발견한 UX 문제점을 원본 이미지 위에 직관적으로 표시합니다.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    문제 영역을 빨간 박스로 하이라이트
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    클릭하면 해당 문제에 대한 상세 설명 표시
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    문제별 네비게이션으로 순차적 검토 가능
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 flex items-center justify-center">
                <div className="relative w-48 h-64 bg-white/10 rounded-lg">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-white/20 rounded" />
                  <div className="absolute top-16 left-4 right-4 h-20 border-2 border-red-500 bg-red-500/10 rounded" />
                  <div className="absolute top-40 left-4 w-20 h-6 bg-white/20 rounded" />
                </div>
              </div>
            </div>

            {/* Multi Persona Detail */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 flex items-center justify-center gap-4">
                <div className="text-4xl">👵</div>
                <div className="text-4xl">📱</div>
                <div className="text-4xl">🚌</div>
                <div className="text-4xl">🌏</div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-bold mb-4 text-white">멀티 페르소나 분석</h2>
                <p className="text-gray-400 mb-4">
                  한 번의 분석으로 다양한 사용자 관점의 피드백을 받아보세요. 각 페르소나는 고유한 특성과 UX 체크리스트를 가지고 있습니다.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    최대 4가지 페르소나 동시 선택 가능
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    페르소나별 점수 및 피드백 제공
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    종합 점수로 전체적인 UX 품질 파악
                  </li>
                </ul>
              </div>
            </div>

            {/* Unique Abilities */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">페르소나 고유 능력</h2>
                <p className="text-gray-400 mb-4">
                  각 페르소나는 특별한 시각화 기능을 제공합니다. 사용자의 시점에서 UI가 어떻게 보이는지 직접 체험해보세요.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-white">👵</span>
                    노안 시뮬레이터 - 흐려진 시야 체험
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">📱</span>
                    블라인드 스팟 - 무시된 영역 표시
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">🚌</span>
                    Thumb Zone - 손가락 도달 영역 표시
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">🌏</span>
                    로컬 블로커 - 외국인 장벽 영역 표시
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-4">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">👵</div>
                    <div className="text-xs text-purple-300">노안 시뮬레이터</div>
                  </div>
                  <div className="bg-gray-500/20 border border-gray-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <div className="text-xs text-gray-300">블라인드 스팟</div>
                  </div>
                  <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🚌</div>
                    <div className="text-xs text-orange-300">Thumb Zone</div>
                  </div>
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🌏</div>
                    <div className="text-xs text-red-300">로컬 블로커</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-24 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">직접 체험해보세요</h2>
        <p className="text-gray-400 mb-8">
          UI 스크린샷 한 장으로 시작할 수 있습니다.
        </p>
        <Link to="/analyze">
          <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90">
            무료로 시작하기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-white" />
              <span className="font-bold text-white">UX-Ray</span>
            </Link>
            <p className="text-sm text-gray-400">© 2026 UX-Ray. AI 기반 UX 진단 솔루션</p>
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
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
