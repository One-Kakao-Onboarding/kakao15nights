import { useEffect, useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, ArrowLeft, Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAnalysisStore } from "@/store/analysis"

export default function Results() {
  const navigate = useNavigate()
  const { results, reset } = useAnalysisStore()
  const [activePersonaIndex, setActivePersonaIndex] = useState(0)
  const [activeFeedbackIndex, setActiveFeedbackIndex] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!results) {
      navigate("/analyze")
      return
    }
  }, [results, navigate])

  useEffect(() => {
    setActiveFeedbackIndex(0)
  }, [activePersonaIndex])

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      })
    }
  }

  const handleNewAnalysis = () => {
    reset()
    navigate("/analyze")
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Eye className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const activePersona = results.personas[activePersonaIndex]
  const activeCoordinate = activePersona?.coordinates[activeFeedbackIndex]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">UX-Ray</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleNewAnalysis}>
              <RefreshCw className="h-4 w-4" />
              새로운 진단
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              PDF 저장
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Overall Score */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">UX 진단 결과</h1>
          <div className="inline-flex items-center gap-4 bg-card border border-border rounded-xl p-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">종합 점수</p>
              <p className={cn("text-5xl font-bold", getScoreColor(results.overallScore))}>{results.overallScore}</p>
            </div>
            <div className="h-16 w-px bg-border" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-1">분석 페르소나</p>
              <div className="flex gap-1">
                {results.personas.map((p, i) => (
                  <span key={i} className="text-2xl" title={p.name}>
                    {p.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Image with Red Pen */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="relative inline-block w-full">
                <img
                  ref={imageRef}
                  src={results.image}
                  alt="Analyzed UI"
                  className="w-full rounded-lg"
                  onLoad={handleImageLoad}
                />
                {/* Red Pen Overlay */}
                {activeCoordinate && (
                  <div
                    className="absolute border-2 border-red-500 bg-red-500/10 rounded transition-all duration-300"
                    style={{
                      top: `${activeCoordinate.y * 100}%`,
                      left: `${activeCoordinate.x * 100}%`,
                      height: `${activeCoordinate.height * 100}%`,
                      width: `${activeCoordinate.width * 100}%`,
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      문제 {activeFeedbackIndex + 1}
                    </div>
                  </div>
                )}
              </div>

              {/* Feedback Navigation */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={activeFeedbackIndex === 0}
                  onClick={() => setActiveFeedbackIndex((prev) => prev - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  이전 문제
                </Button>
                <span className="text-sm text-muted-foreground">
                  {activeFeedbackIndex + 1} / {activePersona?.feedback.length || 0}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={activeFeedbackIndex >= (activePersona?.feedback.length || 1) - 1}
                  onClick={() => setActiveFeedbackIndex((prev) => prev + 1)}
                >
                  다음 문제
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Feedback Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Persona Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {results.personas.map((persona, index) => (
                <button
                  key={index}
                  onClick={() => setActivePersonaIndex(index)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all whitespace-nowrap",
                    activePersonaIndex === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <span className="text-xl">{persona.emoji}</span>
                  <span className="text-sm font-medium">{persona.name}</span>
                </button>
              ))}
            </div>

            {/* Active Persona Card */}
            {activePersona && (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{activePersona.emoji}</span>
                    <div>
                      <h3 className="font-bold text-lg">{activePersona.name}</h3>
                      <p className="text-sm text-muted-foreground">{activePersona.feedback.length}개의 문제 발견</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">점수</p>
                    <p className={cn("text-3xl font-bold", getScoreColor(activePersona.score))}>
                      {activePersona.score}
                    </p>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-6">
                  <div
                    className={cn("h-full rounded-full transition-all", getScoreBg(activePersona.score))}
                    style={{ width: `${activePersona.score}%` }}
                  />
                </div>

                {/* Feedback List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">발견된 문제</h4>
                  {activePersona.feedback.map((feedback, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeedbackIndex(index)}
                      className={cn(
                        "w-full text-left p-4 rounded-lg border transition-all",
                        activeFeedbackIndex === index
                          ? "border-red-500 bg-red-50 dark:bg-red-500/10"
                          : "border-border hover:border-red-300",
                      )}
                    >
                      <div className="flex gap-3">
                        <span
                          className={cn(
                            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                            activeFeedbackIndex === index ? "bg-red-500 text-white" : "bg-muted text-muted-foreground",
                          )}
                        >
                          {index + 1}
                        </span>
                        <p className="text-sm">{feedback}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={handleNewAnalysis}>
                <ArrowLeft className="h-4 w-4" />
                다시 진단하기
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
