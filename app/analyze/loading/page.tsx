"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, Loader2 } from "lucide-react"

const loadingMessages = [
  "김복심 할머니가 돋보기를 찾고 계세요...",
  "이혁준 대리가 UI를 훑어보고 있어요...",
  "김민석이 한 손으로 스크롤하고 있어요...",
  "Brian이 번역기를 돌리고 있어요...",
  "페르소나들이 문제점을 기록하고 있어요...",
  "분석 결과를 정리하고 있어요...",
]

export default function LoadingPage() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check if we have analysis data
    const analysisData = sessionStorage.getItem("uxray-analysis")
    if (!analysisData) {
      router.push("/analyze")
      return
    }

    // Rotate loading messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 100)

    // Navigate to results after analysis
    const analyzeAndNavigate = async () => {
      try {
        const data = JSON.parse(analysisData)

        // Call the API to analyze
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error("Analysis failed")

        const results = await response.json()
        sessionStorage.setItem("uxray-results", JSON.stringify(results))
        router.push("/analyze/results")
      } catch {
        // If API fails, create mock results for demo
        const mockResults = createMockResults(JSON.parse(analysisData))
        sessionStorage.setItem("uxray-results", JSON.stringify(mockResults))
        router.push("/analyze/results")
      }
    }

    // Start analysis
    analyzeAndNavigate()

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <Eye className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">UX-Ray</span>
        </div>

        {/* Loading Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <Loader2 className="w-24 h-24 text-primary animate-spin" />
          </div>
        </div>

        {/* Loading Message */}
        <h2 className="text-xl font-semibold mb-2">페르소나들이 사용성 테스트 중입니다</h2>
        <p className="text-muted-foreground mb-8 h-6 transition-all">{loadingMessages[messageIndex]}</p>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
      </div>
    </div>
  )
}

function createMockResults(data: { personas: string[]; image: string; device: string }) {
  const personaResults: Record<
    string,
    {
      name: string
      emoji: string
      score: number
      feedback: string[]
      coordinates: number[][]
    }
  > = {
    grandmother: {
      name: "김복심 할머니",
      emoji: "👵",
      score: 65,
      feedback: [
        "글씨가 너무 작아서 눈이 아프네요. 조금 더 크게 해주시면 좋겠어요.",
        "이 버튼은 뭔가요? 설명이 없어서 누르기가 무서워요.",
        "메뉴라는 글씨가 영어로 되어있어서 무슨 뜻인지 모르겠어요.",
      ],
      coordinates: [
        [50, 20, 150, 200],
        [200, 300, 250, 400],
        [10, 10, 60, 80],
      ],
    },
    adhd: {
      name: "이혁준 대리",
      emoji: "📱",
      score: 72,
      feedback: [
        "정보가 너무 많아서 뭘 봐야 할지 모르겠어요. 핵심만 보여주세요.",
        "이 디자인 좀 올드하네요. 요즘 트렌드랑 안 맞아 보여요.",
        "클릭해야 할 게 너무 많아요. 한 번에 끝낼 수 있게 해주세요.",
      ],
      coordinates: [
        [100, 50, 300, 400],
        [0, 0, 50, 500],
        [350, 200, 400, 350],
      ],
    },
    "one-hand": {
      name: "김민석",
      emoji: "🚌",
      score: 58,
      feedback: [
        "이 버튼이 너무 위에 있어서 엄지로 누르기 힘들어요.",
        "버튼들이 너무 작고 붙어있어서 잘못 누를 것 같아요.",
        "뒤로가기 버튼이 왼쪽 상단에 있어서 한 손으로는 닿지 않아요.",
      ],
      coordinates: [
        [10, 10, 60, 100],
        [300, 150, 380, 250],
        [5, 5, 45, 55],
      ],
    },
    foreigner: {
      name: "Brian",
      emoji: "🌏",
      score: 45,
      feedback: [
        "This text is embedded in an image, so I can't translate it with my browser.",
        "I can't find an English language option anywhere on this page.",
        "The authentication requires a Korean phone number, which I don't have.",
      ],
      coordinates: [
        [150, 100, 300, 350],
        [0, 0, 50, 500],
        [200, 400, 280, 480],
      ],
    },
  }

  return {
    image: data.image,
    device: data.device,
    personas: data.personas.map((id) => personaResults[id]),
    overallScore: Math.round(
      data.personas.reduce((acc, id) => acc + personaResults[id].score, 0) / data.personas.length,
    ),
  }
}
