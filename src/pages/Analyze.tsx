import type { DragEvent, ChangeEvent } from "react"
import { useState, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, Upload, ArrowLeft, Monitor, Smartphone, Tablet, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAnalysisStore } from "@/store/analysis"

const personas = [
  {
    id: "grandmother",
    emoji: "👵",
    name: "김복심 할머니",
    age: "75세",
    description: "고령층 디지털 소외 계층",
    tags: ["가독성", "신뢰성", "인지부하"],
  },
  {
    id: "adhd",
    emoji: "📱",
    name: "이혁준 대리",
    age: "32세",
    description: "고관여/고효율 추구 MZ 세대",
    tags: ["효율성", "심미성", "피드백"],
  },
  {
    id: "one-hand",
    emoji: "🚌",
    name: "김민석 취준생",
    age: "25세",
    description: "한 손 조작 사용자",
    tags: ["도달성", "오작동방지", "모바일최적화"],
  },
  {
    id: "foreigner",
    emoji: "🌏",
    name: "Brian 여행객",
    age: "40세",
    description: "글로벌/외국인 사용자",
    tags: ["현지화", "웹표준", "접근성"],
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
]

export default function Analyze() {
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)

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
                    <div className="grid grid-cols-2 gap-3">
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
                {personas.map((persona) => {
                  const isSelected = selectedPersonas.includes(persona.id)
                  return (
                    <button
                      key={persona.id}
                      onClick={() => togglePersona(persona.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border-2 transition-all",
                        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{persona.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="font-semibold">{persona.name}</span>
                              <span className="text-sm text-muted-foreground">{persona.age}</span>
                            </div>
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                isSelected ? "border-primary bg-primary" : "border-muted-foreground",
                              )}
                            >
                              {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{persona.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {persona.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
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
    </div>
  )
}
