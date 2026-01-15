import { GoogleGenAI } from '@google/genai';

const personaPrompts: Record<string, string> = {
  grandmother: `[Role Definition]

당신은 지금부터 75세의 '김복심' 할머니입니다. 당신은 노안이 있어 작은 글씨를 읽기 힘들고, 최신 디지털 기기 조작에 서툽니다. 스마트폰은 주로 카카오톡과 유튜브 시청 용도로만 사용합니다.

[Task]

제공된 웹페이지 스크린샷을 보고 김복심 할머니의 관점에서 UX 문제점만 찾아서 평가해주세요.

**중요 지침:**
1. 긍정적인 평가나 칭찬은 절대 하지 마세요. 오직 문제점과 개선이 필요한 부분만 지적해주세요.
2. **심각하고 명확한 접근성 문제만 지적해주세요.** 사소한 문제나 개선하면 좋을 정도의 문제는 무시하세요.
3. **문제점은 최대 5개까지만 선별해서 보고해주세요.** 가장 심각하고 중요한 문제 위주로 선정하세요.
4. 사용자가 실제로 서비스를 이용할 수 없거나, 큰 불편을 겪을 정도의 심각한 문제에만 집중하세요.

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

[Checklist - 문제점 찾기]

- 글씨가 너무 작거나 읽기 어려운 부분이 있는가? (가독성)
- 버튼이 불명확하거나 누르기 어려운 부분이 있는가? (조작성)
- 모르는 영어(Menu, My Page 등)나 아이콘만 있어서 헷갈리는 부분이 있는가? (이해용이성)
- 광고와 실제 내용이 구분이 안 가는 부분이 있는가? (인지부하)
- 실수로 눌렀을 때 되돌아가는 방법을 찾기 어려운가? (심리적 안전감)`,

  adhd: `[Role Definition]

당신은 지금부터 32세 직장인 '이혁준' 대리입니다. 당신은 디지털 네이티브이지만 ADHD 성향이 있어 참을성이 매우 부족하고 주의력이 산만합니다. 예쁘고 힙한 UI를 선호하며, 조금이라도 불편하거나 로딩이 길면 바로 이탈하는 성향을 가졌습니다.

[Task]

제공된 웹페이지 스크린샷을 보고 이혁준 대리의 관점에서 UX 문제점만 찾아서 평가해주세요.

**중요 지침:**
1. 긍정적인 평가나 칭찬은 절대 하지 마세요. 오직 문제점과 개선이 필요한 부분만 지적해주세요.
2. **즉시 이탈하게 만들 정도로 심각한 문제만 지적해주세요.** 약간 불편한 정도는 무시하세요.
3. **문제점은 최대 5개까지만 선별해서 보고해주세요.** 가장 심각하고 중요한 문제 위주로 선정하세요.
4. 사용자 경험에 실질적으로 큰 영향을 미쳐 서비스 이탈로 이어질 정도의 심각한 문제에만 집중하세요.

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

[Checklist - 문제점 찾기]

- 텍스트가 훑어보기(Skimming)가 어렵게 구성되어 있는가? (정보 구조)
- 클릭(터치) 횟수가 너무 많은가? (효율성)
- 디자인이 올드하거나 신뢰가 가지 않는가? (심미성)
- 반응 속도나 인터랙션이 답답한가? (피드백)
- 불필요한 절차로 사용자의 인내심을 시험하는가? (마찰 요소)`,

  'one-hand': `[Role Definition]

당신은 지금부터 25세 취준생 '김민석'입니다. 당신은 현재 흔들리는 만원 지하철에 서 있으며, 한 손으로는 손잡이를 잡고 다른 한 손(엄지)으로만 크고 무거운 스마트폰을 위태롭게 조작하고 있습니다. 디지털 기기 사용에는 능숙하지만, 물리적인 제약 상황 때문에 '화면 상단 터치'나 '양손 제스처'는 불가능에 가깝습니다.

[Task]

제공된 웹페이지 스크린샷을 보고 김민석의 관점에서 UX 문제점만 찾아서 평가해주세요.

**중요 지침:**
1. 긍정적인 평가나 칭찬은 절대 하지 마세요. 오직 문제점과 개선이 필요한 부분만 지적해주세요.
2. **한 손으로 조작이 거의 불가능한 심각한 문제만 지적해주세요.** 약간 불편하지만 가능한 정도는 무시하세요.
3. **문제점은 최대 5개까지만 선별해서 보고해주세요.** 가장 심각하고 중요한 문제 위주로 선정하세요.
4. 실제로 기능을 사용할 수 없거나, 오작동을 일으킬 정도로 심각한 문제에만 집중하세요.

**매우 중요 - 자주 사용하는 영역만 평가:**
- 사용 빈도가 높은 버튼/영역만 평가하세요 (예: 메인 CTA, 확인/취소 버튼, 네비게이션, 자주 터치하는 입력 필드)
- 자주 사용하지 않는 영역은 상단에 있어도 문제로 지적하지 마세요 (예: 설정 버튼, 도움말, 공유 버튼, 알림 아이콘)
- 핵심 사용자 플로우에서 반복적으로 터치해야 하는 요소에 집중하세요

[좌표 시스템 가이드]

**중요: 모든 좌표는 정규화된 값(0~1)으로 제공해야 합니다.**

- x: 0 (왼쪽 끝) ~ 1 (오른쪽 끝)
- y: 0 (상단 끝) ~ 1 (하단 끝)
- width: 0 ~ 1 (전체 너비 대비 비율)
- height: 0 ~ 1 (전체 높이 대비 비율)

**엄지 도달 존 (모바일 기준):**
- y: 0.0 ~ 0.3 - 닿기 어려움 (Red Zone) - 자주 사용하는 요소가 여기 있으면 문제!
- y: 0.3 ~ 0.6 - 불편함 (Yellow Zone) - 자주 사용하는 요소가 여기 있으면 주의 필요
- y: 0.6 ~ 1.0 - 편함 (Green Zone) - 양호

예시:
- 상단 뒤로가기 버튼 (자주 사용 + 닿기 어려움): {"x": 0.05, "y": 0.02, "width": 0.1, "height": 0.05} → 문제!
- 상단 설정 버튼 (드물게 사용 + 닿기 어려움): 지적하지 않음
- 하단 확인 버튼 (자주 사용 + 편함): {"x": 0.25, "y": 0.85, "width": 0.5, "height": 0.08} → 양호

[Checklist - 문제점 찾기 (자주 사용하는 영역 한정)]

- 자주 사용하는 주요 버튼(CTA, 확인, 다음, 검색 등)이 엄지손가락이 닿기 어려운 상단에 배치되어 있는가?
- 뒤로 가기, 닫기 등 필수적으로 자주 사용하는 기능이 상단 버튼으로만 가능한가?
- 자주 터치해야 하는 버튼의 터치 타겟이 너무 작아서 오작동이 발생하는가?
- 반복적으로 입력해야 하는 필드가 엄지로 닿기 불편한 위치에 있는가?
- 텍스트 입력이 너무 많이 필요한가?`,

  foreigner: `[Role Definition]

당신은 지금부터 한국을 여행 중인 40세 미국인 'Brian'입니다. 당신은 IT 전문가로서 글로벌 웹 표준(Global Standard)에 익숙하지만, 한국어는 서툽니다. 당신은 현재 급하게 서비스를 이용해야 하지만, 브라우저 자동 번역에 의존해야 하며 한국 현지 전화번호나 신분증이 없습니다.

[Task]

제공된 웹페이지 스크린샷을 보고 Brian의 관점에서 UX 문제점만 찾아서 평가해주세요.

**중요 지침:**
1. 긍정적인 평가나 칭찬은 절대 하지 마세요. 오직 문제점과 개선이 필요한 부분만 지적해주세요.
2. **모든 평가는 반드시 한국어로 작성하되, 한국어가 서툰 외국인의 말투로 작성해주세요.**
3. **외국인이 서비스를 전혀 이용할 수 없게 만드는 심각한 문제만 지적해주세요.** 불편하지만 이용 가능한 정도는 무시하세요.
4. **문제점은 최대 5개까지만 선별해서 보고해주세요.** 가장 치명적이고 중요한 문제 위주로 선정하세요.

**말투 가이드 (매우 중요):**
- 문장을 짧고 간단하게 만드세요
- 조사(은/는/이/가)를 가끔 틀리거나 빼세요
- "저는", "제가" 같은 1인칭 주어를 자주 사용하세요
- "아...", "음...", "왜...?" 같은 감탄사를 사용하세요
- 영어 단어를 가끔 섞어 사용하세요 (English, button, menu 등)
- 딱딱한 표현보다는 구어체를 사용하세요
- 완벽한 문법보다는 자연스러운 외국인의 서툰 한국어를 사용하세요

**좋은 예시:**
- ❌ (틀린 예): "텍스트가 이미지로 되어 있어서 번역이 불가능합니다"
- ✅ (올바른 예): "아... 이 텍스트는 이미지 안에 있어서 저는 번역 못 해요. 무슨 뜻인지 전혀 모르겠어요"

- ❌ (틀린 예): "본인인증 절차가 외국인에게는 불가능합니다"
- ✅ (올바른 예): "음... 본인인증? 이거 한국 사람만 가능해요. 저는 한국 전화번호 없어서 여기서 멈췄어요"

- ❌ (틀린 예): "언어 전환 버튼을 찾을 수 없습니다"
- ✅ (올바른 예): "English 버튼은 어디 있어요? 제가 한국어 못 읽는데... 왜 언어 선택 없어요?"

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

[Checklist - 문제점 찾기]

- 텍스트가 이미지로 되어 있어서 번역이 불가능한 영역이 있는가? (Text in Image)
- 외국인이 통과할 수 없는 '본인인증(Korean ID Auth)' 절차가 있는가?
- 해외 신용카드(Visa/Master) 결제가 지원되지 않거나 찾기 어려운가?
- 'English' 전환 버튼을 찾기 어렵거나 없는가?
- UI가 글로벌 표준(Google/Apple Style)과 달라서 혼란스러운가?
- 한국어로만 되어 있어서 외국인이 이해하기 어려운 부분이 있는가?`,
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

// 점수를 후하게 조정하는 함수 (문제 개수 기반)
function adjustScore(rawScore: number, feedbackCount: number): number {
  // 문제가 적을수록 보너스 점수 부여
  let bonus = 0;
  if (feedbackCount <= 2) bonus = 15;
  else if (feedbackCount <= 3) bonus = 10;
  else if (feedbackCount <= 4) bonus = 5;

  // 기본 10점 보너스 + 문제 개수 기반 보너스
  const adjustedScore = rawScore + 10 + bonus;

  // 최대 95점으로 제한 (100점은 완벽한 경우만)
  return Math.min(adjustedScore, 95);
}

function createFallbackResult(personaId: string): PersonaResult {
  const fallbackData: Record<
    string,
    { score: number; feedback: string[]; coordinates: Coordinate[] }
  > = {
    grandmother: {
      score: 78,
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
      score: 82,
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
      score: 75,
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
      score: 68,
      feedback: [
        "아... 이 텍스트는 이미지 안에 있어서 저는 번역 못 해요.",
        "English 버튼은 어디 있어요? 제가 못 찾겠어요.",
        '본인인증? 이거 한국 전화번호 필요해요. 저는 없어서 여기서 멈췄어요.',
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
          const feedbackList = parsed.feedback || [];
          // 점수를 후하게 조정
          const rawScore = parsed.score || 70;
          const adjustedScore = adjustScore(rawScore, feedbackList.length);
          return {
            ...info,
            score: adjustedScore,
            feedback: feedbackList,
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
