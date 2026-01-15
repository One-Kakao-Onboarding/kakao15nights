import { useEffect, useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, ArrowLeft, Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAnalysisStore } from "@/store/analysis"
import jsPDF from "jspdf"
import html2canvas from "html2canvas-pro"

export default function Results() {
  const navigate = useNavigate()
  const { results, reset } = useAnalysisStore()
  const [activePersonaIndex, setActivePersonaIndex] = useState(0)
  const [activeFeedbackIndex, setActiveFeedbackIndex] = useState(0)
  const pdfReportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [enableElderlyVision, setEnableElderlyVision] = useState(false)
  const [enableBlindSpot, setEnableBlindSpot] = useState(false)
  const [enableLocalBlocker, setEnableLocalBlocker] = useState(false)

  useEffect(() => {
    if (!results) {
      navigate("/analyze")
      return
    }
  }, [results, navigate])

  useEffect(() => {
    setActiveFeedbackIndex(0)
  }, [activePersonaIndex])

  useEffect(() => {
    if (enableElderlyVision) {
      const grandmotherIndex = results?.personas.findIndex(p => p.name.includes('할머니'))
      if (grandmotherIndex !== undefined && grandmotherIndex !== -1) {
        setActivePersonaIndex(grandmotherIndex)
      }
    }
  }, [enableElderlyVision, results])

  useEffect(() => {
    if (enableBlindSpot) {
      const adhdIndex = results?.personas.findIndex(p => p.name.includes('이혁준') || p.name.includes('대리'))
      if (adhdIndex !== undefined && adhdIndex !== -1) {
        setActivePersonaIndex(adhdIndex)
      }
    }
  }, [enableBlindSpot, results])

  useEffect(() => {
    if (enableLocalBlocker) {
      const foreignerIndex = results?.personas.findIndex(p => p.name.includes('Brian') || p.name.includes('미국인'))
      if (foreignerIndex !== undefined && foreignerIndex !== -1) {
        setActivePersonaIndex(foreignerIndex)
      }
    }
  }, [enableLocalBlocker, results])

  const handleNewAnalysis = () => {
    reset()
    navigate("/analyze")
  }

  const getBlurSeverity = (coord: { x: number; y: number; width: number; height: number }, feedback: string) => {
    const area = coord.width * coord.height
    let baseSeverity = 2

    if (area < 0.005) baseSeverity = 4
    else if (area < 0.02) baseSeverity = 3
    else if (area < 0.05) baseSeverity = 2
    else baseSeverity = 1.5

    if (feedback.includes('작') || feedback.includes('깨알')) baseSeverity += 1
    if (feedback.includes('흐릿') || feedback.includes('보이') || feedback.includes('글씨')) baseSeverity += 0.5
    if (feedback.includes('텍스트')) baseSeverity += 0.3

    return Math.min(baseSeverity, 5)
  }

  const handleExportPDF = async () => {
    if (!pdfReportRef.current || !results) return

    setIsExporting(true)

    try {
      const element = pdfReportRef.current
      element.style.display = "block"

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: element.scrollWidth,
        height: element.scrollHeight,
      })

      element.style.display = "none"

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = pdfWidth / imgWidth
      const scaledHeight = imgHeight * ratio

      if (scaledHeight <= pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight)
      } else {
        let position = 0
        let remainingHeight = imgHeight

        while (remainingHeight > 0) {
          const sourceY = position / ratio
          const sourceHeight = Math.min(pdfHeight / ratio, remainingHeight)

          const pageCanvas = document.createElement("canvas")
          pageCanvas.width = imgWidth
          pageCanvas.height = sourceHeight
          const ctx = pageCanvas.getContext("2d")
          ctx?.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight)

          const pageImgData = pageCanvas.toDataURL("image/png")

          if (position > 0) pdf.addPage()
          pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, sourceHeight * ratio)

          position += pdfHeight
          remainingHeight -= sourceHeight
        }
      }

      pdf.save(`ux-ray-report-${Date.now()}.pdf`)
    } catch (error) {
      console.error("PDF 생성 실패:", error)
    } finally {
      setIsExporting(false)
    }
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
            <Button size="sm" className="gap-2" onClick={handleExportPDF} disabled={isExporting}>
              <Download className="h-4 w-4" />
              {isExporting ? "생성 중..." : "PDF 저장"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 bg-background">
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
                  src={results.image}
                  alt="Analyzed UI"
                  className="w-full rounded-lg"
                />

                {/* Elderly Vision Simulator Overlays */}
                {enableElderlyVision && activePersona && activePersona.name.includes('할머니') && (
                  <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                    {activePersona.coordinates.map((coord, idx) => (
                      <div
                        key={`blur-${idx}`}
                        className="absolute transition-all duration-300"
                        style={{
                          top: `${coord.y * 100}%`,
                          left: `${coord.x * 100}%`,
                          width: `${coord.width * 100}%`,
                          height: `${coord.height * 100}%`,
                          backdropFilter: `blur(${getBlurSeverity(coord, activePersona.feedback[idx])}px) contrast(${0.9 - getBlurSeverity(coord, activePersona.feedback[idx]) * 0.05}) brightness(1.1)`,
                          WebkitBackdropFilter: `blur(${getBlurSeverity(coord, activePersona.feedback[idx])}px) contrast(${0.9 - getBlurSeverity(coord, activePersona.feedback[idx]) * 0.05}) brightness(1.1)`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Blind Spot Blackout Overlays */}
                {enableBlindSpot && activePersona && (activePersona.name.includes('이혁준') || activePersona.name.includes('대리')) && (
                  <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                    {activePersona.coordinates.map((coord, idx) => (
                      <div
                        key={`blackout-${idx}`}
                        className="absolute transition-all duration-500 flex items-center justify-center"
                        style={{
                          top: `${coord.y * 100}%`,
                          left: `${coord.x * 100}%`,
                          width: `${coord.width * 100}%`,
                          height: `${coord.height * 100}%`,
                          backgroundColor: 'rgba(0, 0, 0, 0.95)',
                          borderRadius: '2px',
                        }}
                      >
                        <span className="text-white/30 text-xs font-medium">SKIP</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Local Blocker Warning Overlays */}
                {enableLocalBlocker && activePersona && (activePersona.name.includes('Brian') || activePersona.name.includes('미국인')) && (
                  <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                    {activePersona.coordinates.map((coord, idx) => (
                      <div
                        key={`blocker-${idx}`}
                        className="absolute transition-all duration-300 flex items-center justify-center"
                        style={{
                          top: `${coord.y * 100}%`,
                          left: `${coord.x * 100}%`,
                          width: `${coord.width * 100}%`,
                          height: `${coord.height * 100}%`,
                          backgroundColor: 'rgba(239, 68, 68, 0.15)',
                          border: '2px dashed #ef4444',
                          borderRadius: '4px',
                        }}
                      >
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                          <span>⚠️</span>
                          <span>LOCAL ONLY</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Red Pen Overlay */}
                {activeCoordinate && !enableElderlyVision && !enableBlindSpot && !enableLocalBlocker && (
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

              {/* Elderly Vision Info */}
              {enableElderlyVision && activePersona?.name.includes('할머니') && (
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <p className="text-sm text-purple-900 dark:text-purple-100 flex items-center gap-2">
                    <span className="text-lg">👁️</span>
                    <span>
                      <strong>노안 시뮬레이터 활성화:</strong> 75세 고령층의 시각으로 화면을 보고 있습니다.
                      작은 텍스트일수록 더 흐리게 표현됩니다.
                    </span>
                  </p>
                </div>
              )}

              {/* Blind Spot Info */}
              {enableBlindSpot && activePersona && (activePersona.name.includes('이혁준') || activePersona.name.includes('대리')) && (
                <div className="mt-4 p-3 bg-gray-900 dark:bg-gray-950 border border-gray-700 rounded-lg">
                  <p className="text-sm text-gray-100 flex items-center gap-2">
                    <span className="text-lg">🙈</span>
                    <span>
                      <strong>블라인드 스팟 활성화:</strong> 검은 영역은 ADHD 성향의 사용자가 읽지 않고 스킵한 텍스트입니다.
                      당신이 심혈을 기울인 카피가 실제로는 전달되지 않았을 수 있습니다.
                    </span>
                  </p>
                </div>
              )}

              {/* Local Blocker Info */}
              {enableLocalBlocker && activePersona && (activePersona.name.includes('Brian') || activePersona.name.includes('미국인')) && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-900 dark:text-red-100 flex items-center gap-2">
                    <span className="text-lg">🌏</span>
                    <span>
                      <strong>로컬 블로커 활성화:</strong> 표시된 영역은 외국인 사용자가 이해하기 어렵거나 수행할 수 없는 절차입니다.
                      한국어 전용 콘텐츠, 현지 결제 시스템, 미번역 UI 등이 포함됩니다.
                    </span>
                  </p>
                </div>
              )}

              {/* Feedback Navigation */}
              {!enableElderlyVision && !enableBlindSpot && !enableLocalBlocker && (
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
              )}
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

                {/* Elderly Vision Simulator Toggle - Only for Grandmother */}
                {activePersona.name.includes('할머니') && (
                  <div className="mb-6">
                    <Button
                      variant={enableElderlyVision ? "default" : "outline"}
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => {
                        setEnableElderlyVision(!enableElderlyVision)
                        setEnableBlindSpot(false)
                        setEnableLocalBlocker(false)
                      }}
                    >
                      👵 노안 시뮬레이터 {enableElderlyVision ? 'OFF' : 'ON'}
                    </Button>
                  </div>
                )}

                {/* Blind Spot Simulator Toggle - Only for ADHD */}
                {(activePersona.name.includes('이혁준') || activePersona.name.includes('대리')) && (
                  <div className="mb-6">
                    <Button
                      variant={enableBlindSpot ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "w-full gap-2",
                        enableBlindSpot && "bg-gray-900 hover:bg-gray-800 text-white"
                      )}
                      onClick={() => {
                        setEnableBlindSpot(!enableBlindSpot)
                        setEnableElderlyVision(false)
                        setEnableLocalBlocker(false)
                      }}
                    >
                      📱 블라인드 스팟 {enableBlindSpot ? 'OFF' : 'ON'}
                    </Button>
                  </div>
                )}

                {/* Local Blocker Toggle - Only for Foreigner */}
                {(activePersona.name.includes('Brian') || activePersona.name.includes('미국인')) && (
                  <div className="mb-6">
                    <Button
                      variant={enableLocalBlocker ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "w-full gap-2",
                        enableLocalBlocker && "bg-red-500 hover:bg-red-600 text-white"
                      )}
                      onClick={() => {
                        setEnableLocalBlocker(!enableLocalBlocker)
                        setEnableElderlyVision(false)
                        setEnableBlindSpot(false)
                      }}
                    >
                      🌏 로컬 블로커 {enableLocalBlocker ? 'OFF' : 'ON'}
                    </Button>
                  </div>
                )}

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

      {/* Hidden PDF Report */}
      <div
        ref={pdfReportRef}
        style={{ display: "none", width: "800px", position: "absolute", left: "-9999px" }}
      >
        <div style={{ padding: "40px", backgroundColor: "#ffffff", fontFamily: "system-ui, sans-serif" }}>
          {/* PDF Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#3b82f6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "20px" }}>👁</span>
            </div>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: "#111" }}>UX-Ray 진단 리포트</h1>
              <p style={{ fontSize: "14px", color: "#666", margin: "4px 0 0 0" }}>
                생성일: {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          {/* Overall Score Section */}
          <div style={{ backgroundColor: "#f8fafc", borderRadius: "12px", padding: "24px", marginBottom: "32px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div>
                <p style={{ fontSize: "14px", color: "#666", margin: "0 0 8px 0" }}>종합 점수</p>
                <p style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  margin: 0,
                  color: results.overallScore >= 80 ? "#22c55e" : results.overallScore >= 60 ? "#eab308" : "#ef4444"
                }}>
                  {results.overallScore}
                </p>
              </div>
              <div style={{ width: "1px", height: "60px", backgroundColor: "#e2e8f0" }} />
              <div>
                <p style={{ fontSize: "14px", color: "#666", margin: "0 0 8px 0" }}>분석 페르소나</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  {results.personas.map((p, i) => (
                    <span key={i} style={{ fontSize: "28px" }}>{p.emoji}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analyzed Image */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#111" }}>분석된 화면</h2>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <img src={results.image} alt="Analyzed UI" style={{ width: "100%", display: "block" }} />
            </div>
          </div>

          {/* Persona Results */}
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#111" }}>페르소나별 분석 결과</h2>
          {results.personas.map((persona, personaIndex) => (
            <div
              key={personaIndex}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* Persona Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "36px" }}>{persona.emoji}</span>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0, color: "#111" }}>{persona.name}</h3>
                    <p style={{ fontSize: "14px", color: "#666", margin: "4px 0 0 0" }}>{persona.feedback.length}개의 문제 발견</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "12px", color: "#666", margin: "0 0 4px 0" }}>점수</p>
                  <p style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    margin: 0,
                    color: persona.score >= 80 ? "#22c55e" : persona.score >= 60 ? "#eab308" : "#ef4444"
                  }}>
                    {persona.score}
                  </p>
                </div>
              </div>

              {/* Score Bar */}
              <div style={{ width: "100%", backgroundColor: "#e2e8f0", borderRadius: "4px", height: "8px", marginBottom: "20px" }}>
                <div
                  style={{
                    width: `${persona.score}%`,
                    height: "100%",
                    borderRadius: "4px",
                    backgroundColor: persona.score >= 80 ? "#22c55e" : persona.score >= 60 ? "#eab308" : "#ef4444",
                  }}
                />
              </div>

              {/* Feedback List */}
              <div>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  발견된 문제
                </p>
                {persona.feedback.map((feedback, feedbackIndex) => (
                  <div
                    key={feedbackIndex}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "12px",
                      backgroundColor: "#fef2f2",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      border: "1px solid #fecaca",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#ef4444",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {feedbackIndex + 1}
                    </span>
                    <p style={{ fontSize: "14px", margin: 0, color: "#111", lineHeight: "1.5" }}>{feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "#999" }}>
              Generated by UX-Ray • AI-Powered UX Diagnosis Solution
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
