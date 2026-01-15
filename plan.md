# 📂 Project Plan: UX-Ray (AI Persona-based UX Diagnosis Solution)

> **Document Status:** Draft (v1.0)
>
> **Target Audience:** PM, Designers, Developers
>
> **Core Value:** AI 페르소나를 활용한 즉각적이고 시각적인 UX 진단 (Visual Red Pen)

---

## 1. 🎯 Project Overview (개요)

**UX-Ray**는 사용자 데이터가 부족한 초기 기획자/디자이너를 위해, **4가지 유형의 특수 AI 페르소나**가 UI 디자인을 분석하고 시각적으로 피드백을 제공하는 SaaS 웹 애플리케이션입니다.

* **핵심 기능:** 이미지 업로드 → AI 페르소나 시뮬레이션 → 시각적 결함 표시(Red Pen) 및 리포트 생성
* **타겟 유저:** 이서영(프리랜서 디자이너), 김동규(기업 시니어 디자이너) 등 객관적 데이터가 필요한 실무자

---

## 2. 🏗 System Architecture & Tech Stack (기술 스택)

MVP(Minimum Viable Product) 구축을 위한 효율적이고 확장 가능한 스택을 제안합니다.

### 2.1 Tech Stack

- **Frontend:** React
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Canvas/Visualization:** Konva.js
- **AI Model:** Gemini 3 Pro

### 2.2 Data Flow
1.  **User Client:** UI 이미지 업로드
2.  **API Server:** 이미지 파일 + 선택한 페르소나 프롬프트를 AI 모델에 전송
3.  **AI Engine:** Gemini 3 pro가 이미지를 분석하여 응답받은 **평가 텍스트와 결함 위치(좌표 x,y), 유형, 조언**을 JSON으로 반환
4.  **Client Visualizer:** 반환된 좌표 데이터를 기반으로 원본 이미지 위에 **시각적 오버레이(Red box, Heatmap, Blur)** 렌더링

---

## 3. 📝 Feature Specifications (기능 명세)

### 3.1 1단계: 테스트 환경 설정 (Input)
* **프로젝트 관리:** 신규 프로젝트 생성 및 진단 이력 관리.
* **이미지 업로드:**
    * Drag & Drop 지원 (JPG, PNG).
    * 스크롤이 긴 웹페이지를 위한 Full-page 캡처 지원 (추후 고도화).
* **디바이스 컨텍스트 설정:** Mobile / PC / Tablet 선택 (히트맵 영역 계산용).
* **페르소나 멀티 셀렉트:** 4명의 페르소나 중 진단을 원하는 대상 선택 (다중 선택 가능).

### 3.2 2단계: AI 페르소나 엔진 (Processing)
각 페르소나별 특화된 프롬프트 엔지니어링 및 이미지 전처리 로직. (`prompt.md` 파일 참고)

### 3.3 3단계: 결과 리포트 (Output)
* **UX Score:** 페르소나별 100점 만점 기준 점수 및 레이더 차트.
* **Visual Red Pen (핵심):** AI가 지적한 좌표에 붉은 박스 표기.
* **Action Item:** 발견된 문제에 대한 구체적인 수정 제안.
* **Export:** PDF 생성.

---

## 4. 💡 Implementation Strategy (구현 전략)

### AI Prompt Strategy (Example for Persona A)

> `prompt.md` 파일 참고

```
[Role Definition]

당신은 지금부터 75세의 '김복심' 할머니입니다. 당신은 노안이 있어 작은 글씨를 읽기 힘들고, 최신 디지털 기기 조작에 서툽니다. 스마트폰은 주로 카카오톡과 유튜브 시청 용도로만 사용합니다.

[Task]

- 제공된 웹페이지 스크린샷(또는 설명)을 보고 김복심 할머니의 관점에서 UX를 평가해주세요.
- A: 존댓말을 사용한 말투로 평가 결과를 한줄로 나열해주며 여러 평가가 있을 경우 '/'로 구별해 주세요. 평가 결과가 완벽하면 '완벽'이라는 답변을 주세요.
- B: 평가를 기반으로 개선이 필요한 영역의 좌표를 [ymin, xmin, ymax, xmax] 형식으로 알려주세요. 이 좌표는 자바스크립트로 해당 이미지에 빨간색 테두리를 표시하는데 사용됩니다.
- 답변 예시는 아래와 같습니다.

A: 검색창 안에 있는 글씨가 너무 흐릿해서 눈에 잘 안 들어오네요./왼쪽 위에 줄 세 개 그려진 게 도대체 뭔지 설명이 없어서 누르기가 겁나요./아이콘 밑에 있는 글씨들이 너무 깨알 같아서 돋보기 없이는 읽을 수가 없어요./신문사 그림들이 너무 다닥다닥 붙어 있고 글씨가 작아서 엉뚱한 걸 누를까 봐 걱정되네요./뉴스 넘기는 화살표가 너무 조그마해서 손이 떨리면 잘 안 눌러져요. B: [[75, 325, 115, 450], [18, 116, 50, 136], [205, 310, 225, 620], [580, 130, 850, 600], [885, 298, 935, 435]]

[Checklist]

- 글씨가 충분히 크고 읽기 쉬운가? (가독성)
- 버튼이 명확하게 구분되고 누르기 쉬운가? (조작성)
- 모르는 영어(Menu, My Page 등)나 아이콘만 있어서 헷갈리지 않는가? (이해용이성)
- 광고와 실제 내용이 구분이 가는가? (인지부하)
- 실수로 눌렀을 때 되돌아가는 방법이 쉬운가? (심리적 안전감)
```

### Visual Red Pen Implementation
1.  **좌표 정규화:** AI 모델은 이미지 원본 해상도 기준 좌표를 줍니다. 프론트엔드에서는 화면 크기에 맞춰 비율(Ratio)을 계산하여 캔버스에 그려야 합니다.
2.  **레이어링:**
    * Layer 1: 원본 이미지
    * Layer 2: 시뮬레이션 필터 (블러, 히트맵 등 - CSS/Canvas 처리)
    * Layer 3: Red Pen 마킹 및 툴팁 (Interaction Layer)

---

## 5. ⚠️ Potential Risks & Solutions
* **Risk:** 할루시네이션 (없는 문제를 있다고 지적).
    * *Solution:* 프롬프트에 "확실하지 않으면 지적하지 말 것" 제약 추가.