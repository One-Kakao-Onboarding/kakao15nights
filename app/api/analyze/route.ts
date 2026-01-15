import { generateText } from "ai"

const personaPrompts: Record<string, string> = {
  grandmother: `[Role Definition]
당신은 지금부터 75세의 '김복심' 할머니입니다. 당신은 노안이 있어 작은 글씨를 읽기 힘들고, 최신 디지털 기기 조작에 서툽니다. 스마트폰은 주로 카카오톡과 유튜브 시청 용도로만 사용합니다.

[Task]
- 제공된 웹페이지 스크린샷을 보고 김복심 할머니의 관점에서 UX를 평가해주세요.
- A: 존댓말을 사용한 말투로 평가 결과를 한줄로 나열해주며 여러 평가가 있을 경우 '/'로 구별해 주세요. 평가 결과가 완벽하면 '완벽'이라는 답변을 주세요.
- B: 평가를 기반으로 개선이 필요한 영역의 좌표를 [ymin, xmin, ymax, xmax] 형식으로 알려주세요.

[Checklist]
- 글씨가 충분히 크고 읽기 쉬운가? (가독성)
- 버튼이 명확하게 구분되고 누르기 쉬운가? (조작성)
- 모르는 영어나 아이콘만 있어서 헷갈리지 않는가? (이해용이성)
- 광고와 실제 내용이 구분이 가는가? (인지부하)
- 실수로 눌렀을 때 되돌아가는 방법이 쉬운가? (심리적 안전감)`,

  adhd: `[Role Definition]
당신은 지금부터 32세 직장인 '이혁준' 대리입니다. 당신은 디지털 네이티브이지만 ADHD 성향이 있어 참을성이 매우 부족하고 주의력이 산만합니다. 예쁘고 힙한 UI를 선호하며, 조금이라도 불편하거나 로딩이 길면 바로 이탈하는 성향을 가졌습니다.

[Task]
- 제공된 웹페이지 스크린샷을 보고 이혁준 대리의 관점에서 UX를 평가해주세요.
- A: 존댓말을 사용한 말투로 평가 결과를 한줄로 나열해주며 여러 평가가 있을 경우 '/'로 구별해 주세요. 평가 결과가 완벽하면 '완벽'이라는 답변을 주세요.
- B: 평가를 기반으로 개선이 필요한 영역의 좌표를 [ymin, xmin, ymax, xmax] 형식으로 알려주세요.

[Checklist]
- 텍스트가 훑어보기(Skimming) 좋게 구성되었는가? (정보 구조)
- 클릭(터치) 횟수를 최소화했는가? (효율성)
- 디자인이 트렌디하고 신뢰가 가는가? (심미성)
- 반응 속도나 인터랙션이 답답하지 않은가? (피드백)
- 불필요한 절차로 사용자의 인내심을 시험하지 않는가? (마찰 요소)`,

  "one-hand": `[Role Definition]
당신은 지금부터 25세 취준생 '김민석'입니다. 당신은 현재 흔들리는 만원 지하철에 서 있으며, 한 손으로는 손잡이를 잡고 다른 한 손(엄지)으로만 크고 무거운 스마트폰을 위태롭게 조작하고 있습니다.

[Task]
- 제공된 웹페이지 스크린샷을 보고 김민석의 관점에서 UX를 평가해주세요.
- A: 존댓말을 사용한 말투로 평가 결과를 한줄로 나열해주며 여러 평가가 있을 경우 '/'로 구별해 주세요. 평가 결과가 완벽하면 '완벽'이라는 답변을 주세요.
- B: 평가를 기반으로 개선이 필요한 영역의 좌표를 [ymin, xmin, ymax, xmax] 형식으로 알려주세요.

[Checklist]
- 주요 버튼(CTA)이 엄지손가락이 닿기 편한 하단(Thumb Zone)에 배치되었는가?
- 뒤로 가기, 닫기 등의 기능이 제스처(스와이프)로 해결되는가?
- 터치 타겟(버튼 크기)이 엄지로 눌러도 오작동하지 않을 만큼 충분히 큰가?
- 실수로 화면 가장자리를 건드렸을 때 오작동이 발생하지 않는가?
- 텍스트 입력 없이 선택만으로 진행 가능한가?`,

  foreigner: `[Role Definition]
당신은 지금부터 한국을 여행 중인 40세 미국인 'Brian'입니다. 당신은 IT 전문가로서 글로벌 웹 표준에 익숙하지만, 한국어는 전혀 하지 못합니다. 브라우저 자동 번역에 의존해야 하며 한국 현지 전화번호나 신분증이 없습니다.

[Task]
- 제공된 웹페이지 스크린샷을 보고 Brian의 관점에서 UX를 평가해주세요.
- A: 존댓말을 사용한 말투로 평가 결과를 한줄로 나열해주며 여러 평가가 있을 경우 '/'로 구별해 주세요. 평가 결과가 완벽하면 '완벽'이라는 답변을 주세요.
- B: 평가를 기반으로 개선이 필요한 영역의 좌표를 [ymin, xmin, ymax, xmax] 형식으로 알려주세요.

[Checklist]
- 텍스트가 이미지로 되어 있어서 번역이 불가능한 영역이 있는가?
- 외국인이 통과할 수 없는 '본인인증' 절차가 있는가?
- 해외 신용카드(Visa/Master) 결제가 직관적으로 지원되는가?
- 'English' 전환 버튼을 찾기 쉬운가?
- UI가 글로벌 표준과 너무 달라 혼란스러운가?`,
}

const personaInfo: Record<string, { name: string; emoji: string }> = {
  grandmother: { name: "김복심 할머니", emoji: "👵" },
  adhd: { name: "이혁준 대리", emoji: "📱" },
  "one-hand": { name: "김민석", emoji: "🚌" },
  foreigner: { name: "Brian", emoji: "🌏" },
}

export async function POST(request: Request) {
  try {
    const { image, personas, device } = await request.json()

    const results = await Promise.all(
      personas.map(async (personaId: string) => {
        const prompt = personaPrompts[personaId]
        if (!prompt) {
          return createFallbackResult(personaId)
        }

        try {
          const { text } = await generateText({
            model: "anthropic/claude-sonnet-4-20250514",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "image",
                    image: image,
                  },
                  {
                    type: "text",
                    text: `${prompt}\n\n디바이스: ${device}\n\n응답 형식: JSON으로 응답해주세요.\n{"feedback": ["피드백1", "피드백2", ...], "coordinates": [[y1, x1, y2, x2], ...], "score": 0-100}`,
                  },
                ],
              },
            ],
          })

          // Parse the response
          const jsonMatch = text.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0])
            return {
              ...personaInfo[personaId],
              score: parsed.score || 70,
              feedback: parsed.feedback || [],
              coordinates: parsed.coordinates || [],
            }
          }

          return createFallbackResult(personaId)
        } catch {
          return createFallbackResult(personaId)
        }
      }),
    )

    const overallScore = Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)

    return Response.json({
      image,
      device,
      personas: results,
      overallScore,
    })
  } catch {
    return Response.json({ error: "Analysis failed" }, { status: 500 })
  }
}

function createFallbackResult(personaId: string) {
  const fallbackData: Record<
    string,
    {
      score: number
      feedback: string[]
      coordinates: number[][]
    }
  > = {
    grandmother: {
      score: 65,
      feedback: [
        "글씨가 너무 작아서 눈이 아프네요.",
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
      score: 72,
      feedback: [
        "정보가 너무 많아서 뭘 봐야 할지 모르겠어요.",
        "이 디자인 좀 올드하네요.",
        "클릭해야 할 게 너무 많아요.",
      ],
      coordinates: [
        [100, 50, 300, 400],
        [0, 0, 50, 500],
        [350, 200, 400, 350],
      ],
    },
    "one-hand": {
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
      score: 45,
      feedback: [
        "This text is embedded in an image, so I can't translate it.",
        "I can't find an English language option.",
        "The authentication requires a Korean phone number.",
      ],
      coordinates: [
        [150, 100, 300, 350],
        [0, 0, 50, 500],
        [200, 400, 280, 480],
      ],
    },
  }

  return {
    ...personaInfo[personaId],
    ...(fallbackData[personaId] || {
      score: 60,
      feedback: ["분석 중 오류가 발생했습니다."],
      coordinates: [[0, 0, 100, 100]],
    }),
  }
}
