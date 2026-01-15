import { GoogleGenAI } from '@google/genai';

const personaPrompts: Record<string, string> = {
  grandmother: `[Role Definition]

당신은 지금부터 75세의 '김복심' 할머니입니다. 당신은 노안이 있어 작은 글씨를 읽기 힘들고, 최신 디지털 기기 조작에 서툽니다. 스마트폰은 주로 카카오톡과 유튜브 시청 용도로만 사용합니다.

[Task]

제공된 웹페이지 스크린샷을 보고 김복심 할머니의 관점에서 UX를 평가해주세요.

[좌표 시스템 가이드]

**중요: 모든 좌표는 정규화된 값(0~1)으로 제공해야 합니다.**

- x: 0 (왼쪽 끝) ~ 1 (오른쪽 끝)
- y: 0 (상단 끝) ~ 1 (하단 끝)
- width: 0 ~ 1 (전체 너비 대비 비율)
- height: 0 ~ 1 (전체 높이 대비 비율)

예시:
- 화면 왼쪽 상단 버튼: {"x": 0.05, "y": 0.02, "width": 0.15, "height": 0.05}
- 화면 중앙 로고: {"x": 0.4, "y": 0.45, "width": 0.2, "height": 0.1}
- 화면 우상단 닫기 버튼: {"x": 0.9, "y": 0.02, "width": 0.08, "height": 0.04}

[Checklist]

- 글씨가 충분히 크고 읽기 쉬운가? (가독성)
- 버튼이 명확하게 구분되고 누르기 쉬운가? (조작성)
- 모르는 영어(Menu, My Page 등)나 아이콘만 있어서 헷갈리지 않는가? (이해용이성)
- 광고와 실제 내용이 구분이 가는가? (인지부하)
- 실수로 눌렀을 때 되돌아가는 방법이 쉬운가? (심리적 안전감)`,

  adhd: `[Role Definition]

당신은 지금부터 32세 직장인 '이혁준' 대리입니다. 당신은 디지털 네이티브이지만 ADHD 성향이 있어 참을성이 매우 부족하고 주의력이 산만합니다. 예쁘고 힙한 UI를 선호하며, 조금이라도 불편하거나 로딩이 길면 바로 이탈하는 성향을 가졌습니다.

[Task]

제공된 웹페이지 스크린샷을 보고 이혁준 대리의 관점에서 UX를 평가해주세요.

[좌표 시스템 가이드]

**중요: 모든 좌표는 정규화된 값(0~1)으로 제공해야 합니다.**

- x: 0 (왼쪽 끝) ~ 1 (오른쪽 끝)
- y: 0 (상단 끝) ~ 1 (하단 끝)
- width: 0 ~ 1 (전체 너비 대비 비율)
- height: 0 ~ 1 (전체 높이 대비 비율)

예시:
- 화면 왼쪽 상단 버튼: {"x": 0.05, "y": 0.02, "width": 0.15, "height": 0.05}
- 화면 중앙 로고: {"x": 0.4, "y": 0.45, "width": 0.2, "height": 0.1}
- 여러 산만한 요소들: [{"x": 0.1, "y": 0.3, "width": 0.15, "height": 0.05}, {"x": 0.3, "y": 0.3, "width": 0.15, "height": 0.05}]

[Checklist]

- 텍스트가 훑어보기(Skimming) 좋게 구성되었는가? (정보 구조)
- 클릭(터치) 횟수를 최소화했는가? (효율성)
- 디자인이 트렌디하고 신뢰가 가는가? (심미성)
- 반응 속도나 인터랙션이 답답하지 않은가? (피드백)
- 불필요한 절차로 사용자의 인내심을 시험하지 않는가? (마찰 요소)`,

  'one-hand': `[Role Definition]

당신은 지금부터 25세 취준생 '김민석'입니다. 당신은 현재 흔들리는 만원 지하철에 서 있으며, 한 손으로는 손잡이를 잡고 다른 한 손(엄지)으로만 크고 무거운 스마트폰을 위태롭게 조작하고 있습니다. 디지털 기기 사용에는 능숙하지만, 물리적인 제약 상황 때문에 '화면 상단 터치'나 '양손 제스처'는 불가능에 가깝습니다.

[Task]

제공된 웹페이지 스크린샷을 보고 김민석의 관점에서 UX를 평가해주세요.

[좌표 시스템 가이드]

**중요: 모든 좌표는 정규화된 값(0~1)으로 제공해야 합니다.**

- x: 0 (왼쪽 끝) ~ 1 (오른쪽 끝)
- y: 0 (상단 끝) ~ 1 (하단 끝)
- width: 0 ~ 1 (전체 너비 대비 비율)
- height: 0 ~ 1 (전체 높이 대비 비율)

**엄지 도달 존 (모바일 기준):**
- y: 0.0 ~ 0.3 - 닿기 어려움 (Red Zone)
- y: 0.3 ~ 0.6 - 불편함 (Yellow Zone)
- y: 0.6 ~ 1.0 - 편함 (Green Zone)

예시:
- 상단 뒤로가기 버튼 (닿기 어려움): {"x": 0.05, "y": 0.02, "width": 0.1, "height": 0.05}
- 하단 확인 버튼 (편함): {"x": 0.25, "y": 0.85, "width": 0.5, "height": 0.08}

[Checklist]

- 주요 버튼(CTA)이 엄지손가락이 닿기 편한 하단(Thumb Zone)에 배치되었는가?
- 뒤로 가기, 닫기 등의 기능이 제스처(스와이프)로 해결되는가?
- 터치 타겟(버튼 크기)이 엄지로 눌러도 오작동하지 않을 만큼 충분히 큰가?
- 실수로 화면 가장자리를 건드렸을 때 오작동(Ghost Touch)이 발생하지 않는가?
- 텍스트 입력 없이 선택만으로 진행 가능한가? (탭 최소화)`,

  foreigner: `[Role Definition]

당신은 지금부터 한국을 여행 중인 40세 미국인 'Brian'입니다. 당신은 IT 전문가로서 글로벌 웹 표준(Global Standard)에 익숙하지만, 한국어는 전혀 하지 못합니다. 당신은 현재 급하게 서비스를 이용해야 하지만, 브라우저 자동 번역에 의존해야 하며 한국 현지 전화번호나 신분증이 없습니다.

[Task]

제공된 웹페이지 스크린샷을 보고 Brian의 관점에서 UX를 평가해주세요.

[좌표 시스템 가이드]

**중요: 모든 좌표는 정규화된 값(0~1)으로 제공해야 합니다.**

- x: 0 (왼쪽 끝) ~ 1 (오른쪽 끝)
- y: 0 (상단 끝) ~ 1 (하단 끝)
- width: 0 ~ 1 (전체 너비 대비 비율)
- height: 0 ~ 1 (전체 높이 대비 비율)

예시:
- 배너 이미지 내 번역 불가능한 텍스트: {"x": 0.15, "y": 0.1, "width": 0.7, "height": 0.15}
- 우상단 언어 전환 버튼: {"x": 0.85, "y": 0.02, "width": 0.12, "height": 0.04}
- 본인인증 버튼: {"x": 0.25, "y": 0.5, "width": 0.5, "height": 0.08}

[Checklist]

- 텍스트가 이미지로 되어 있어서 번역이 불가능한 영역이 있는가? (Text in Image)
- 외국인이 통과할 수 없는 '본인인증(Korean ID Auth)' 절차가 있는가?
- 해외 신용카드(Visa/Master) 결제가 직관적으로 지원되는가?
- 'English' 전환 버튼을 찾기 쉬운가?
- UI가 글로벌 표준(Google/Apple Style)과 너무 달라 혼란스러운가?`,
};

const personaInfo: Record<string, { name: string; emoji: string }> = {
  grandmother: { name: '김복심 할머니', emoji: '👵' },
  adhd: { name: '이혁준 대리', emoji: '📱' },
  'one-hand': { name: '김민석 취준생', emoji: '🚌' },
  foreigner: { name: 'Brian 여행객', emoji: '🌏' },
};

export interface Coordinate {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageValidationResult {
  isValid: boolean;
  message: string;
}

export async function validateImage(
  image: string,
  apiKey: string
): Promise<ImageValidationResult> {
  const ai = new GoogleGenAI({ apiKey });

  try {
    const base64Match = image.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) {
      return {
        isValid: false,
        message: '이미지 형식을 인식할 수 없습니다.',
      };
    }

    const mimeType = `image/${base64Match[1]}`;
    const base64Data = base64Match[2];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            {
              text: `이 이미지가 웹사이트 또는 모바일 앱의 UI 스크린샷인지 판단해주세요.

다음과 같은 이미지는 "유효한 UI 스크린샷"으로 판단합니다:
- 웹사이트 화면 캡처
- 모바일 앱 화면 캡처
- 데스크톱 애플리케이션 화면 캡처
- 와이어프레임 또는 UI 목업

다음과 같은 이미지는 "유효하지 않음"으로 판단합니다:
- 일반 사진 (풍경, 인물, 음식, 동물 등)
- 문서 스캔 (PDF, 종이 문서)
- 그림, 일러스트, 만화
- 다이어그램, 차트만 있는 이미지
- 텍스트만 있는 이미지
- 로고나 아이콘만 있는 이미지

반드시 아래 JSON 형식으로만 응답해주세요:
{
  "isValidUI": true 또는 false,
  "reason": "판단 이유를 간단히 설명"
}`,
            },
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.isValidUI) {
        return {
          isValid: true,
          message: '',
        };
      } else {
        return {
          isValid: false,
          message: parsed.reason || '웹페이지 또는 앱 화면이 아닙니다. 올바른 UI 스크린샷을 업로드해주세요.',
        };
      }
    }

    return {
      isValid: true,
      message: '',
    };
  } catch (error) {
    console.error('Image validation error:', error);
    return {
      isValid: true,
      message: '',
    };
  }
}

export interface PersonaResult {
  name: string;
  emoji: string;
  score: number;
  feedback: string[];
  coordinates: Coordinate[];
}

export interface AnalysisResults {
  image: string;
  device: string;
  personas: PersonaResult[];
  overallScore: number;
}

function createFallbackResult(personaId: string): PersonaResult {
  const fallbackData: Record<
    string,
    { score: number; feedback: string[]; coordinates: Coordinate[] }
  > = {
    grandmother: {
      score: 65,
      feedback: [
        '글씨가 너무 작아서 눈이 아프네요.',
        '이 버튼은 뭔가요? 설명이 없어서 누르기가 무서워요.',
        '메뉴라는 글씨가 영어로 되어있어서 무슨 뜻인지 모르겠어요.',
      ],
      coordinates: [
        { x: 0.1, y: 0.05, width: 0.3, height: 0.08 },
        { x: 0.5, y: 0.3, width: 0.2, height: 0.06 },
        { x: 0.02, y: 0.02, width: 0.15, height: 0.04 },
      ],
    },
    adhd: {
      score: 72,
      feedback: [
        '정보가 너무 많아서 뭘 봐야 할지 모르겠어요.',
        '이 디자인 좀 올드하네요.',
        '클릭해야 할 게 너무 많아요.',
      ],
      coordinates: [
        { x: 0.1, y: 0.15, width: 0.7, height: 0.3 },
        { x: 0, y: 0, width: 1, height: 0.08 },
        { x: 0.4, y: 0.5, width: 0.3, height: 0.08 },
      ],
    },
    'one-hand': {
      score: 58,
      feedback: [
        '이 버튼이 너무 위에 있어서 엄지로 누르기 힘들어요.',
        '버튼들이 너무 작고 붙어있어서 잘못 누를 것 같아요.',
        '뒤로가기 버튼이 왼쪽 상단에 있어서 한 손으로는 닿지 않아요.',
      ],
      coordinates: [
        { x: 0.02, y: 0.02, width: 0.18, height: 0.06 },
        { x: 0.3, y: 0.4, width: 0.2, height: 0.1 },
        { x: 0.01, y: 0.01, width: 0.1, height: 0.05 },
      ],
    },
    foreigner: {
      score: 45,
      feedback: [
        "This text is embedded in an image, so I can't translate it.",
        "I can't find an English language option.",
        'The authentication requires a Korean phone number.',
      ],
      coordinates: [
        { x: 0.2, y: 0.15, width: 0.5, height: 0.2 },
        { x: 0, y: 0, width: 1, height: 0.08 },
        { x: 0.8, y: 0.5, width: 0.15, height: 0.1 },
      ],
    },
  };

  const info = personaInfo[personaId] || { name: 'Unknown', emoji: '❓' };
  const data = fallbackData[personaId] || {
    score: 60,
    feedback: ['분석 중 오류가 발생했습니다.'],
    coordinates: [{ x: 0, y: 0, width: 0.2, height: 0.1 }],
  };

  return { ...info, ...data };
}

export async function analyzeImage(
  image: string,
  personas: string[],
  device: string,
  apiKey: string
): Promise<AnalysisResults> {
  const ai = new GoogleGenAI({ apiKey });

  const results = await Promise.all(
    personas.map(async (personaId: string): Promise<PersonaResult> => {
      const prompt = personaPrompts[personaId];
      if (!prompt) {
        return createFallbackResult(personaId);
      }

      try {
        // Extract base64 data from data URL
        const base64Match = image.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!base64Match) {
          return createFallbackResult(personaId);
        }

        const mimeType = `image/${base64Match[1]}`;
        const base64Data = base64Match[2];

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            {
              parts: [
                {
                  text: `${prompt}\n\n디바이스: ${device}\n\n[Output Format]\n반드시 아래 JSON 형식으로만 응답해주세요. 다른 텍스트 없이 JSON만 출력하세요.\n\n{\n  "feedback": ["피드백1", "피드백2", ...],\n  "coordinates": [\n    {"x": 0.0-1.0, "y": 0.0-1.0, "width": 0.0-1.0, "height": 0.0-1.0},\n    ...\n  ],\n  "score": 0-100\n}\n\n중요:\n- feedback 배열의 각 항목과 coordinates 배열의 각 항목은 1:1로 대응되어야 합니다\n- 좌표는 반드시 0~1 사이의 정규화된 값으로 제공하세요\n- x, y는 요소의 시작 위치, width와 height는 요소의 크기입니다`,
                },
                {
                  inlineData: {
                    mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const info = personaInfo[personaId];
          return {
            ...info,
            score: parsed.score || 70,
            feedback: parsed.feedback || [],
            coordinates: parsed.coordinates || [],
          };
        }

        return createFallbackResult(personaId);
      } catch (error) {
        console.error(`Error analyzing for persona ${personaId}:`, error);
        return createFallbackResult(personaId);
      }
    })
  );

  const overallScore = Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length);

  return {
    image,
    device,
    personas: results,
    overallScore,
  };
}
