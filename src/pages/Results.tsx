import { useEffect, useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, ArrowLeft, Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAnalysisStore } from "@/store/analysis"
import jsPDF from "jspdf"
import html2canvas from "html2canvas-pro"

// Persona image mapping
const getPersonaImage = (name: string): string => {
  if (name.includes('할머니') || name.includes('김복심')) return '/personaA.png'
  if (name.includes('이혁준') || name.includes('대리')) return '/personaB.png'
  if (name.includes('김민석') || name.includes('취준생') || name.includes('한 손')) return '/personaC.png'
  if (name.includes('Brian') || name.includes('미국인') || name.includes('여행객')) return '/personaD.png'
  return '/personaA.png' // fallback
}

// Persona descriptor mapping
const getPersonaDescriptor = (name: string): string => {
  if (name.includes('할머니') || name.includes('김복심')) return '75세 고령층'
  if (name.includes('이혁준') || name.includes('대리')) return 'ADHD 성향'
  if (name.includes('김민석') || name.includes('취준생') || name.includes('한 손')) return '한 손 사용자'
  if (name.includes('Brian') || name.includes('미국인') || name.includes('여행객')) return '외국인 여행객'
  return ''
}

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
  const [enableThumbZone, setEnableThumbZone] = useState(false)

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

  useEffect(() => {
    if (enableThumbZone) {
      const oneHandIndex = results?.personas.findIndex(p => p.name.includes('김민석') || p.name.includes('취준생'))
      if (oneHandIndex !== undefined && oneHandIndex !== -1) {
        setActivePersonaIndex(oneHandIndex)
      }
    }
  }, [enableThumbZone, results])

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Eye className="h-12 w-12 text-white mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">결과를 불러오는 중...</p>
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
    <div className="min-h-screen bg-gradient-radial">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">UX-Ray</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-white/5 backdrop-blur-xl border-white/20 text-white hover:bg-white/10"
              onClick={handleNewAnalysis}
            >
              <RefreshCw className="h-4 w-4" />
              새로운 진단
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-white text-black hover:bg-white/90"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              <Download className="h-4 w-4" />
              {isExporting ? "생성 중..." : "PDF 저장"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-4 px-4">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Image with Red Pen */}
          <div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-auto">
              <div className="relative inline-block w-full">
                <img
                  src={results.image}
                  alt="Analyzed UI"
                  className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
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

                {/* Thumb Zone Overlays */}
                {enableThumbZone && activePersona && (activePersona.name.includes('김민석') || activePersona.name.includes('취준생')) && (
                  <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                    {activePersona.coordinates.map((coord, idx) => {
                      const isUpperZone = coord.y < 0.3
                      const isMiddleZone = coord.y >= 0.3 && coord.y < 0.6
                      return (
                        <div
                          key={`thumb-${idx}`}
                          className="absolute transition-all duration-300"
                          style={{
                            top: `${coord.y * 100}%`,
                            left: `${coord.x * 100}%`,
                            width: `${coord.width * 100}%`,
                            height: `${coord.height * 100}%`,
                            backgroundColor: isUpperZone ? 'rgba(239, 68, 68, 0.25)' : isMiddleZone ? 'rgba(234, 179, 8, 0.2)' : 'rgba(34, 197, 94, 0.15)',
                            border: `2px solid ${isUpperZone ? '#ef4444' : isMiddleZone ? '#eab308' : '#22c55e'}`,
                            borderRadius: '4px',
                          }}
                        >
                          <div className={cn(
                            "absolute -top-5 left-0 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap",
                            isUpperZone ? "bg-red-500" : isMiddleZone ? "bg-yellow-500" : "bg-green-500"
                          )}>
                            {isUpperZone ? '👆 어려움' : isMiddleZone ? '👆 불편' : '👆 편함'}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Red Pen Overlay */}
                {activeCoordinate && !enableElderlyVision && !enableBlindSpot && !enableLocalBlocker && !enableThumbZone && (
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
                <div className="mt-4 p-3 bg-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-lg">
                  <p className="text-sm text-purple-200 flex items-center gap-2">
                    <span className="text-lg">👁️</span>
                    <span>
                      <strong className="text-purple-100">노안 시뮬레이터 활성화:</strong> 75세 고령층의 시각으로 화면을 보고 있습니다.
                      작은 텍스트일수록 더 흐리게 표현됩니다.
                    </span>
                  </p>
                </div>
              )}

              {/* Blind Spot Info */}
              {enableBlindSpot && activePersona && (activePersona.name.includes('이혁준') || activePersona.name.includes('대리')) && (
                <div className="mt-4 p-3 bg-gray-500/10 backdrop-blur-xl border border-gray-500/30 rounded-lg">
                  <p className="text-sm text-gray-200 flex items-center gap-2">
                    <span className="text-lg">🙈</span>
                    <span>
                      <strong className="text-gray-100">블라인드 스팟 활성화:</strong> 검은 영역은 ADHD 성향의 사용자가 읽지 않고 스킵한 텍스트입니다.
                      당신이 심혈을 기울인 카피가 실제로는 전달되지 않았을 수 있습니다.
                    </span>
                  </p>
                </div>
              )}

              {/* Local Blocker Info */}
              {enableLocalBlocker && activePersona && (activePersona.name.includes('Brian') || activePersona.name.includes('미국인')) && (
                <div className="mt-4 p-3 bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-200 flex items-center gap-2">
                    <span className="text-lg">🌏</span>
                    <span>
                      <strong className="text-red-100">로컬 블로커 활성화:</strong> 표시된 영역은 외국인 사용자가 이해하기 어렵거나 수행할 수 없는 절차입니다.
                      한국어 전용 콘텐츠, 현지 결제 시스템, 미번역 UI 등이 포함됩니다.
                    </span>
                  </p>
                </div>
              )}

              {/* Thumb Zone Info */}
              {enableThumbZone && activePersona && (activePersona.name.includes('김민석') || activePersona.name.includes('취준생')) && (
                <div className="mt-4 p-3 bg-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-lg">
                  <p className="text-sm text-orange-200 flex items-center gap-2">
                    <span className="text-lg">👆</span>
                    <span>
                      <strong className="text-orange-100">Thumb Zone 활성화:</strong> 한 손 조작 시 엄지가 닿기 어려운 영역을 표시합니다.
                      <span className="inline-flex items-center gap-1 ml-1">
                        <span className="inline-block w-3 h-3 rounded bg-red-500"></span>닿기 어려움
                        <span className="inline-block w-3 h-3 rounded bg-yellow-500 ml-2"></span>불편함
                        <span className="inline-block w-3 h-3 rounded bg-green-500 ml-2"></span>편함
                      </span>
                    </span>
                  </p>
                </div>
              )}

              {/* Feedback Navigation */}
              {!enableElderlyVision && !enableBlindSpot && !enableLocalBlocker && !enableThumbZone && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                    disabled={activeFeedbackIndex === 0}
                    onClick={() => setActiveFeedbackIndex((prev) => prev - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    이전 문제
                  </Button>
                  <span className="text-sm text-gray-400">
                    {activeFeedbackIndex + 1} / {activePersona?.feedback.length || 0}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
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
          <div className="space-y-4">
            {/* Overall Score - Emphasized */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">종합 UX 점수</p>
                  <div className="flex items-baseline gap-2">
                    <p className={cn("text-5xl font-bold tracking-tight", getScoreColor(results.overallScore))}>{results.overallScore}</p>
                    <span className="text-lg text-gray-400 font-medium">/ 100</span>
                  </div>
                  <div className="w-32 bg-white/10 rounded-full h-1.5 mt-2">
                    <div
                      className={cn("h-full rounded-full transition-all", getScoreBg(results.overallScore))}
                      style={{ width: `${results.overallScore}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-2">분석 완료</p>
                  <div className="flex gap-1.5">
                    {results.personas.map((p, i) => (
                      <span key={i} className="text-2xl" title={p.name}>
                        {p.emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Persona Tabs */}
            <div className="grid grid-cols-2 gap-2">
              {results.personas.map((persona, index) => (
                <button
                  key={index}
                  onClick={() => setActivePersonaIndex(index)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all",
                    activePersonaIndex === index
                      ? "border-white/40 bg-white/10 shadow-sm"
                      : "border-white/10 bg-white/5 hover:border-white/30",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={getPersonaImage(persona.name)}
                      alt={persona.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="truncate">
                      <span className="text-xs text-gray-400">{getPersonaDescriptor(persona.name)}</span>
                      <span className="text-sm font-medium text-white ml-1">{persona.name.split(' ')[0]}</span>
                    </div>
                  </div>
                  <span className={cn("text-lg font-bold tabular-nums", getScoreColor(persona.score))}>
                    {persona.score}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Persona Card */}
            {activePersona && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getPersonaImage(activePersona.name)}
                      alt={activePersona.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{getPersonaDescriptor(activePersona.name)}</p>
                      <h3 className="font-bold text-lg text-white">{activePersona.name}</h3>
                      <p className="text-xs text-gray-400">{activePersona.feedback.length}개의 문제 발견</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Ability Toggle - Emphasized */}
                    {activePersona.name.includes('할머니') && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "gap-2 transition-all duration-300",
                          enableElderlyVision
                            ? "bg-purple-500 hover:bg-purple-600 text-white border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                            : "bg-purple-500/20 border-purple-500/50 text-purple-300 hover:bg-purple-500/30 hover:border-purple-500 animate-pulse"
                        )}
                        onClick={() => {
                          setEnableElderlyVision(!enableElderlyVision)
                          setEnableBlindSpot(false)
                          setEnableLocalBlocker(false)
                          setEnableThumbZone(false)
                        }}
                      >
                        👵 노안 시뮬레이터
                      </Button>
                    )}
                    {(activePersona.name.includes('이혁준') || activePersona.name.includes('대리')) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "gap-2 transition-all duration-300",
                          enableBlindSpot
                            ? "bg-gray-600 hover:bg-gray-500 text-white border-gray-600 shadow-[0_0_20px_rgba(107,114,128,0.4)]"
                            : "bg-gray-500/20 border-gray-500/50 text-gray-300 hover:bg-gray-500/30 hover:border-gray-500 animate-pulse"
                        )}
                        onClick={() => {
                          setEnableBlindSpot(!enableBlindSpot)
                          setEnableElderlyVision(false)
                          setEnableLocalBlocker(false)
                          setEnableThumbZone(false)
                        }}
                      >
                        📱 블라인드 스팟
                      </Button>
                    )}
                    {(activePersona.name.includes('Brian') || activePersona.name.includes('미국인')) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "gap-2 transition-all duration-300",
                          enableLocalBlocker
                            ? "bg-red-500 hover:bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                            : "bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30 hover:border-red-500 animate-pulse"
                        )}
                        onClick={() => {
                          setEnableLocalBlocker(!enableLocalBlocker)
                          setEnableElderlyVision(false)
                          setEnableBlindSpot(false)
                          setEnableThumbZone(false)
                        }}
                      >
                        🌏 로컬 블로커
                      </Button>
                    )}
                    {(activePersona.name.includes('김민석') || activePersona.name.includes('취준생')) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "gap-2 transition-all duration-300",
                          enableThumbZone
                            ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                            : "bg-orange-500/20 border-orange-500/50 text-orange-300 hover:bg-orange-500/30 hover:border-orange-500 animate-pulse"
                        )}
                        onClick={() => {
                          setEnableThumbZone(!enableThumbZone)
                          setEnableElderlyVision(false)
                          setEnableBlindSpot(false)
                          setEnableLocalBlocker(false)
                        }}
                      >
                        🚌 Thumb Zone
                      </Button>
                    )}
                    {/* Score */}
                    <div className="text-right bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">점수</p>
                      <p className={cn("text-3xl font-bold tabular-nums", getScoreColor(activePersona.score))}>
                        {activePersona.score}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mb-4 shadow-inner">
                  <div
                    className={cn("h-full rounded-full transition-all shadow-sm", getScoreBg(activePersona.score))}
                    style={{ width: `${activePersona.score}%` }}
                  />
                </div>

                {/* Feedback List */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wide mb-2">발견된 문제</h4>
                  {activePersona.feedback.map((feedback, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeedbackIndex(index)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-all",
                        activeFeedbackIndex === index
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/10 bg-white/5 hover:border-red-500/50",
                      )}
                    >
                      <div className="flex gap-2.5">
                        <span
                          className={cn(
                            "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                            activeFeedbackIndex === index ? "bg-red-500 text-white" : "bg-white/10 text-gray-400",
                          )}
                        >
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-gray-200">{feedback}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div>
              <Button
                variant="outline"
                className="w-full gap-2 bg-white/5 backdrop-blur-xl border-white/20 text-white hover:bg-white/10"
                onClick={handleNewAnalysis}
              >
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
                    <img
                      key={i}
                      src={getPersonaImage(p.name)}
                      alt={p.name}
                      style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                    />
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
                  <img
                    src={getPersonaImage(persona.name)}
                    alt={persona.name}
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <p style={{ fontSize: "12px", color: "#666", margin: "0 0 2px 0" }}>{getPersonaDescriptor(persona.name)}</p>
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
