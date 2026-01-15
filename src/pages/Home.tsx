import type { ReactNode } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Eye, Users, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PersonaDetail {
  id: string
  emoji: string
  name: string
  age: string
  description: string
  tags: string[]
  quote: string
  painPoints: string[]
  ability: {
    title: string
    description: string
    effects: string[]
  }
}

const personasData: PersonaDetail[] = [
  {
    id: "grandmother",
    emoji: "👵",
    name: "김복심 할머니",
    age: "75세",
    description: "노안으로 작은 글씨를 읽기 힘들고, 디지털 기기 조작에 서투른 고령층 사용자",
    tags: ["가독성", "신뢰성", "인지부하"],
    quote: "이게 글씨여 그림이여... 당최 보여야 누르지.",
    painPoints: [
      "저시력 & 색약: 작은 텍스트(12px 이하)와 낮은 명도 대비(회색 글씨)를 읽지 못함",
      "터치 정확도 저하: 버튼이 작으면 자꾸 엉뚱한 곳을 누르거나, 두 번 누름(Double Tap)을 실수로 수행함",
      "낯선 UI 공포: 햄버거 메뉴(≡), 돋보기(🔍) 같은 아이콘의 의미를 모르며, 텍스트 라벨이 없으면 기능을 유추하지 못함",
    ],
    ability: {
      title: "✨ 고유 능력: 노안 시뮬레이터",
      description: "사용자가 올린 시안을 '백내장/노안' 필터를 씌운 이미지로 변환하여 보여줍니다.",
      effects: [
        "블러(Blur) 처리: 전체 화면을 흐릿하게 만들어, 폰트 크기가 작은 텍스트가 뭉개져 보이는 현상을 재현",
        "대비(Contrast) 감소: 연한 회색 버튼이나 텍스트가 배경과 섞여 보이지 않게 처리",
      ],
    },
  },
  {
    id: "adhd",
    emoji: "📱",
    name: "이혁준 대리",
    age: "32세",
    description: "ADHD 성향으로 참을성이 부족하고, 트렌디한 UI를 선호하는 MZ세대",
    tags: ["효율성", "심미성", "피드백"],
    quote: "아, 설명 언제 다 읽어. 그냥 결제 버튼 어딨어? (3초 뒤 뒤로 가기)",
    painPoints: [
      "극도로 짧은 주의력: 텍스트를 읽지 않고 '스캔(Scan)'함. 3초 안에 원하는 정보가 안 보이면 즉시 이탈",
      "충동적 인터랙션: 로딩이 1초만 걸려도 화면을 연타하거나, 팝업이 뜨면 내용을 보지 않고 'X'부터 찾음",
      "정보 과부하 스트레스: 화면에 정보(TMI)가 많으면 시선이 분산되어 핵심 기능(CTA)을 찾지 못함",
    ],
    ability: {
      title: "✨ 고유 능력: 주의력 분산 맵",
      description: "정돈된 히트맵이 아니라, 시선이 얼마나 산만하게 튀는지(Jumping)를 시각화합니다.",
      effects: [
        "블라인드 스팟(Blind Spot) 처리: 이혁준이 '안 읽고 넘긴' 텍스트 영역을 검게 가려서(Blackout), 기획자가 쓴 카피가 실제로는 전달되지 않았음을 충격적으로 보여줌",
      ],
    },
  },
  {
    id: "one-hand",
    emoji: "🚌",
    name: "김민석 취준생",
    age: "25세",
    description: "만원 지하철에서 한 손으로만 스마트폰을 조작하는 취준생",
    tags: ["도달성", "오작동방지", "모바일최적화"],
    quote: "지하철에서 한 손엔 커피 들고 있는데... 뒤로 가기 버튼이 왜 저 꼭대기에 있어?",
    painPoints: [
      "엄지 영역의 한계: 스마트폰을 한 손으로 쥐었을 때, 엄지가 닿지 않는 화면 상단(Top-Left) 영역 터치 불가",
      "그립 불안정성: 상단 버튼을 누르려다 폰을 떨어뜨릴 뻔하거나, 손바닥 살이 화면 엣지에 닿아 오작동(Ghost Touch) 발생",
      "제스처 제약: 핀치 줌(두 손가락 확대)이나 복잡한 드래그 앤 드롭이 불가능함",
    ],
    ability: {
      title: "✨ 고유 능력: 엄지 도달 히트맵",
      description: "화면 위에 '엄지 손가락이 편하게 닿는 영역'과 '불가능한 영역'을 오버레이로 씌워줍니다.",
      effects: [
        "🟢 초록색 (Comfort): 엄지가 자연스럽게 닿는 하단 영역",
        "🟡 노란색 (Stretch): 손을 뻗으면 닿지만 그립이 불안해지는 영역",
        "🔴 빨간색 (Pain): 한 손으로는 절대 닿지 않아, 반대 손을 써야 하는 영역(UX 실패 구간)",
      ],
    },
  },
  {
    id: "foreigner",
    emoji: "🌏",
    name: "Brian 여행객",
    age: "40세",
    description: "한국어를 전혀 모르고 브라우저 번역에 의존하는 미국인 여행객",
    tags: ["현지화", "웹표준", "접근성"],
    quote: "English 모드로 바꿨는데, 왜 중요한 버튼은 여전히 한국어인가요? 그리고 'I-PIN'이 도대체 뭐죠?",
    painPoints: [
      "텍스트 길이로 인한 레이아웃 붕괴: 한국어(\"확인\", 2글자)를 영어(\"Confirmation\", 12글자)나 독일어 등으로 바꿨을 때, 글자가 버튼 밖으로 튀어나오거나 잘림",
      "이미지 텍스트의 장벽: 텍스트가 아닌 '이미지'로 박힌 한글(배너, 상세페이지 등)은 번역되지 않아 정보를 전혀 얻지 못함",
      "로컬 UX의 늪: 본인인증(휴대폰/아이핀), 도로명 주소 검색, Active X 기반 결제 등 한국 특화 프로세스에서 길을 잃음",
    ],
    ability: {
      title: "✨ 고유 능력: 레이아웃 파괴 및 장벽 맵",
      description:
        "한국어 UI 시안을 입력하면, 영문/다국어 변환 시 UI가 어떻게 망가지는지와 외국인이 이해 불가능한 영역을 시뮬레이션하여 보여줍니다.",
      effects: [
        "로컬 블로커(Local Blocker) 경고: 외국인이 수행 불가능한 절차(예: 한국 통신사 본인인증 화면)나 로컬라이징에 미흡한 영역에 경고 라벨 부착",
      ],
    },
  },
]

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaDetail | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">UX-Ray</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              기능
            </a>
            <a href="#personas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              페르소나
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              사용법
            </a>
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
            <Button size="lg" variant="outline">
              데모 보기
            </Button>
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

      {/* Personas Section */}
      <section id="personas" className="container mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">4가지 AI 페르소나</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            서로 다른 디지털 취약점과 행동 패턴을 가진 4명의 페르소나가 당신의 UI를 다각도로 진단합니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personasData.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onClick={() => setSelectedPersona(persona)}
            />
          ))}
        </div>
      </section>

      {/* Persona Detail Dialog */}
      <Dialog open={!!selectedPersona} onOpenChange={() => setSelectedPersona(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedPersona && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{selectedPersona.emoji}</div>
                  <div>
                    <DialogTitle className="text-2xl mb-1">
                      {selectedPersona.name}
                      <span className="text-lg text-muted-foreground ml-2">{selectedPersona.age}</span>
                    </DialogTitle>
                    <DialogDescription className="text-base">{selectedPersona.description}</DialogDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPersona.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Quote */}
                <div className="bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
                  <p className="text-sm italic text-pink-900 dark:text-pink-100 leading-relaxed">
                    "{selectedPersona.quote}"
                  </p>
                </div>

                {/* Pain Points */}
                <div>
                  <h3 className="font-bold text-lg mb-3">주요 특징 (UX Pain Points)</h3>
                  <ul className="space-y-2">
                    {selectedPersona.painPoints.map((point, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ability */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800">
                  <h3 className="font-bold text-lg mb-2">{selectedPersona.ability.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{selectedPersona.ability.description}</p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-3 text-primary">시각적 효과:</h4>
                    <ul className="space-y-2">
                      {selectedPersona.ability.effects.map((effect, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span className="text-sm">{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">핵심 기능</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI가 발견한 문제를 시각적으로 명확하게 표시해드립니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Eye className="h-8 w-8" />}
              title="Visual Red Pen"
              description="AI가 지적한 문제 영역을 원본 이미지 위에 빨간 박스로 표시하여 한눈에 파악"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="멀티 페르소나 분석"
              description="4가지 페르소나를 동시에 선택하여 다양한 관점의 피드백을 한 번에 수집"
            />
            <FeatureCard
              icon={<Target className="h-8 w-8" />}
              title="구체적인 개선 제안"
              description="단순 지적이 아닌, 실제로 적용 가능한 구체적인 수정 방안 제시"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">사용 방법</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">3단계만으로 전문적인 UX 진단을 받아보세요.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            step="01"
            title="이미지 업로드"
            description="진단받고 싶은 UI 스크린샷을 드래그 앤 드롭으로 업로드하세요."
          />
          <StepCard
            step="02"
            title="페르소나 선택"
            description="4가지 페르소나 중 원하는 진단 대상을 선택하세요. 다중 선택 가능합니다."
          />
          <StepCard
            step="03"
            title="결과 확인"
            description="AI가 분석한 결과를 Visual Red Pen과 함께 상세 리포트로 확인하세요."
          />
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
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <span className="font-bold">UX-Ray</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 UX-Ray. AI 기반 UX 진단 솔루션</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PersonaCard({ persona, onClick }: { persona: PersonaDetail; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 text-left cursor-pointer"
    >
      <div className="text-4xl mb-4">{persona.emoji}</div>
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="font-bold text-lg">{persona.name}</h3>
        <span className="text-sm text-muted-foreground">{persona.age}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{persona.description}</p>
      <div className="flex flex-wrap gap-2">
        {persona.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 text-xs text-primary font-medium">자세히 보기 →</div>
    </button>
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

function StepCard({
  step,
  title,
  description,
}: {
  step: string
  title: string
  description: string
}) {
  return (
    <div className="relative">
      <div className="text-6xl font-bold text-primary/10 mb-4">{step}</div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
