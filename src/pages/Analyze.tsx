import type { DragEvent, ChangeEvent } from "react"
import { useState, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, Upload, ArrowLeft, Monitor, Smartphone, Tablet, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAnalysisStore } from "@/store/analysis"
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
    name: "디지털 취약계층 김복심 할머니",
    age: "75세",
    description: "노안으로 작은 글씨를 읽기 힘들고, 디지털 기기 조작에 서투른 고령층 사용자",
    tags: ["가독성", "신뢰성", "인지부하"],
    quote: "이게 글씨여 그림이여... 당최 보여야 누르지.",
    painPoints: [
      "저시력 & 색약: 작은 텍스트(12px 이하)와 낮은 명도 대비(회색 글씨)를 읽지 못함",
      "터치 정확도 저하: 버튼이 작으면 자꾸 엉뚱한 곳을 누르거나, 두 번 누름(Double Tap)을 실수로 수행함",
      "낯선 UI 공포: 햄버거 메뉴(≡), 돋보기 같은 아이콘의 의미를 모르며, 텍스트 라벨이 없으면 기능을 유추하지 못함",
    ],
    ability: {
      title: "고유 능력: 노안 시뮬레이터",
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
    name: "참을성이 부족한 이혁준 대리",
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
      title: "고유 능력: 주의력 분산 맵",
      description: "정돈된 히트맵이 아니라, 시선이 얼마나 산만하게 튀는지(Jumping)를 시각화합니다.",
      effects: [
        "블라인드 스팟(Blind Spot) 처리: 이혁준이 '안 읽고 넘긴' 텍스트 영역을 검게 가려서(Blackout), 기획자가 쓴 카피가 실제로는 전달되지 않았음을 충격적으로 보여줌",
      ],
    },
  },
  {
    id: "one-hand",
    emoji: "🚌",
    name: "한 손 조작 사용자 김민석",
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
      title: "고유 능력: 엄지 도달 히트맵",
      description: "화면 위에 '엄지 손가락이 편하게 닿는 영역'과 '불가능한 영역'을 오버레이로 씌워줍니다.",
      effects: [
        "초록색 (Comfort): 엄지가 자연스럽게 닿는 하단 영역",
        "노란색 (Stretch): 손을 뻗으면 닿지만 그립이 불안해지는 영역",
        "빨간색 (Pain): 한 손으로는 절대 닿지 않아, 반대 손을 써야 하는 영역(UX 실패 구간)",
      ],
    },
  },
  {
    id: "foreigner",
    emoji: "🌏",
    name: "미국인 Brian",
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
      title: "고유 능력: 레이아웃 파괴 및 장벽 맵",
      description:
        "한국어 UI 시안을 입력하면, 영문/다국어 변환 시 UI가 어떻게 망가지는지와 외국인이 이해 불가능한 영역을 시뮬레이션하여 보여줍니다.",
      effects: [
        "로컬 블로커(Local Blocker) 경고: 외국인이 수행 불가능한 절차(예: 한국 통신사 본인인증 화면)나 로컬라이징에 미흡한 영역에 경고 라벨 부착",
      ],
    },
  },
]

const devices = [
  { id: "mobile", icon: Smartphone, label: "Mobile" },
  { id: "tablet", icon: Tablet, label: "Tablet" },
  { id: "desktop", icon: Monitor, label: "Desktop" },
]

const demoImages = [
  { id: "daum", path: "/demo_daum.png", name: "다음", description: "데모 • 모바일 앱" },
  { id: "naver", path: "/demo_naver.png", name: "네이버", description: "데모 • 모바일 앱" },
  { id: "youtube", path: "/demo_youtube.jpg", name: "유튜브", description: "데모 • 모바일 앱" },
]

export default function Analyze() {
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPersonaDetail, setSelectedPersonaDetail] = useState<PersonaDetail | null>(null)

  const {
    uploadedImage,
    uploadedFile,
    selectedPersonas,
    selectedDevice,
    setUploadedImage,
    togglePersona,
    setSelectedDevice,
  } = useAnalysisStore()

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string, file)
      }
      reader.readAsDataURL(file)
    }
  }, [setUploadedImage])

  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string, file)
      }
      reader.readAsDataURL(file)
    }
  }, [setUploadedImage])

  const handleDemoSelect = useCallback(async (demoPath: string, demoName: string) => {
    try {
      const response = await fetch(demoPath)
      const blob = await response.blob()
      const reader = new FileReader()
      reader.onload = () => {
        const file = new File([blob], demoName, { type: blob.type })
        setUploadedImage(reader.result as string, file)
      }
      reader.readAsDataURL(blob)
    } catch (error) {
      console.error("Failed to load demo image:", error)
    }
  }, [setUploadedImage])

  const handleAnalyze = () => {
    if (!uploadedImage || selectedPersonas.length === 0) return
    navigate("/analyze/loading")
  }

  const handleDetailClick = (e: React.MouseEvent, persona: PersonaDetail) => {
    e.stopPropagation()
    setSelectedPersonaDetail(persona)
  }

  const isReadyToAnalyze = uploadedImage && selectedPersonas.length > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">UX-Ray</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              홈으로
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">UX 진단 시작하기</h1>
            <p className="text-muted-foreground">UI 스크린샷을 업로드하고, 진단받을 페르소나를 선택하세요.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Image Upload */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                    1
                  </span>
                  이미지 업로드
                </h2>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 transition-colors",
                    isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                    uploadedImage && "border-solid border-primary bg-primary/5",
                  )}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded UI"
                        className="max-h-64 mx-auto rounded-lg shadow-lg"
                      />
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">{uploadedFile?.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUploadedImage(null, null)}
                        >
                          다른 이미지 선택
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">이미지를 드래그하여 업로드</p>
                      <p className="text-sm text-muted-foreground mb-4">또는 파일을 선택하세요 (JPG, PNG)</p>
                      <label>
                        <Button variant="outline" asChild>
                          <span>파일 선택</span>
                        </Button>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                      </label>
                    </div>
                  )}
                </div>

                {/* Demo Images */}
                {!uploadedImage && (
                  <div className="mt-4">
                    <div className="text-center mb-3">
                      <p className="text-sm text-muted-foreground">또는 데모 이미지로 빠르게 시작하기</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {demoImages.map((demo) => (
                        <button
                          key={demo.id}
                          onClick={() => handleDemoSelect(demo.path, demo.name)}
                          className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all"
                        >
                          <img
                            src={demo.path}
                            alt={demo.name}
                            className="w-full h-24 object-cover object-top group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2.5">
                            <div className="text-left w-full">
                              <div className="flex items-center justify-between">
                                <p className="text-white font-semibold text-sm">{demo.name}</p>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">
                                  데모
                                </span>
                              </div>
                              <p className="text-white/80 text-xs mt-0.5">{demo.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Device Selection */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                    2
                  </span>
                  디바이스 타입
                </h2>
                <div className="flex gap-3">
                  {devices.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => setSelectedDevice(device.id)}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                        selectedDevice === device.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <device.icon
                        className={cn(
                          "h-6 w-6",
                          selectedDevice === device.id ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          selectedDevice === device.id ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {device.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Persona Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                  3
                </span>
                페르소나 선택
                <span className="text-sm font-normal text-muted-foreground">(다중 선택 가능)</span>
              </h2>
              <div className="space-y-3">
                {personasData.map((persona) => {
                  const isSelected = selectedPersonas.includes(persona.id)
                  const isOneHandPersona = persona.id === "one-hand"
                  const isDisabled = isOneHandPersona && selectedDevice === "desktop"
                  return (
                    <div
                      key={persona.id}
                      onClick={() => !isDisabled && togglePersona(persona.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border-2 transition-all relative",
                        isDisabled
                          ? "border-border bg-muted/50 cursor-not-allowed opacity-60"
                          : isSelected
                            ? "border-primary bg-primary/5 cursor-pointer"
                            : "border-border hover:border-primary/50 cursor-pointer",
                      )}
                    >
                      {/* Mobile/Tablet only badge */}
                      {isOneHandPersona && (
                        <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700">
                          <span className="text-[10px] font-medium text-orange-700 dark:text-orange-300">
                            📱 Mobile / Tablet 전용
                          </span>
                        </div>
                      )}
                      <div className="flex items-start gap-4">
                        <div className={cn("text-3xl", isDisabled && "grayscale")}>{persona.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className={cn("font-semibold", isDisabled && "text-muted-foreground")}>{persona.name}</span>
                              <span className="text-sm text-muted-foreground">{persona.age}</span>
                            </div>
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                isDisabled
                                  ? "border-muted-foreground/50 bg-muted"
                                  : isSelected
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground",
                              )}
                            >
                              {isSelected && !isDisabled && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{persona.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex flex-wrap gap-1">
                              {persona.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={cn(
                                    "text-xs px-2 py-0.5 rounded-full",
                                    isDisabled ? "bg-muted/50 text-muted-foreground/50" : "bg-muted text-muted-foreground"
                                  )}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={(e) => handleDetailClick(e, persona)}
                              className={cn(
                                "flex items-center gap-1 text-xs hover:underline",
                                isDisabled ? "text-muted-foreground" : "text-primary"
                              )}
                            >
                              <Info className="h-3 w-3" />
                              자세히 보기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 text-center">
            <Button size="lg" disabled={!isReadyToAnalyze} onClick={handleAnalyze} className="gap-2 px-8">
              <Eye className="h-5 w-5" />
              UX 진단 시작하기
              {selectedPersonas.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-primary-foreground/20 text-sm">
                  {selectedPersonas.length}명
                </span>
              )}
            </Button>
            {!isReadyToAnalyze && (
              <p className="text-sm text-muted-foreground mt-3">
                이미지를 업로드하고 최소 1명의 페르소나를 선택해주세요.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Persona Detail Dialog */}
      <Dialog open={!!selectedPersonaDetail} onOpenChange={() => setSelectedPersonaDetail(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedPersonaDetail && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{selectedPersonaDetail.emoji}</div>
                  <div>
                    <DialogTitle className="text-2xl mb-1">
                      {selectedPersonaDetail.name}
                      <span className="text-lg text-muted-foreground ml-2">{selectedPersonaDetail.age}</span>
                    </DialogTitle>
                    <DialogDescription className="text-base">{selectedPersonaDetail.description}</DialogDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPersonaDetail.tags.map((tag) => (
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
                    "{selectedPersonaDetail.quote}"
                  </p>
                </div>

                {/* Pain Points */}
                <div>
                  <h3 className="font-bold text-lg mb-3">주요 특징 (UX Pain Points)</h3>
                  <ul className="space-y-2">
                    {selectedPersonaDetail.painPoints.map((point, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ability */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800">
                  <h3 className="font-bold text-lg mb-2">{selectedPersonaDetail.ability.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{selectedPersonaDetail.ability.description}</p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-3 text-primary">시각적 효과:</h4>
                    <ul className="space-y-2">
                      {selectedPersonaDetail.ability.effects.map((effect, index) => (
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
    </div>
  )
}
