---
name: nextjs-k-standard
description: Next.js 기반 한국형 프리미엄 웹 표준 가이드. 한국어 타이포그래피, 모바일 UX, 신뢰 중심의 카피라이팅 및 하이엔드 디자인 방향성을 정의하는 마스터 스킬입니다.
---

# Next.js 한국형 프리미엄 웹 표준 (K-Standard)

> 이 문서는 한국형 홈페이지의 **최상위 원칙**을 정의합니다. 구체적인 구현 패턴은 `design-system`, `page-builder`, `performance`, `seo-optimize` 스킬을 참조하세요.

## 1. 한국어 타이포그래피 (Typography)
한국어는 라틴 문자보다 글자 밀도가 높으므로, 시각적 답답함을 해소하는 것이 프리미엄 디자인의 시작입니다.

* **Font Family:** `Pretendard Variable`을 기본으로 사용합니다. (Next.js `localFont` 권장)
* **Word Breaking:** 제목 및 중요 문구에는 반드시 `break-keep-all` (Tailwind: `break-keep`)을 적용하여 조사나 단어가 어색하게 끊기지 않도록 합니다.
* **Line Height:** 한국어 가독성을 위해 `leading-snug(1.375)` ~ `leading-normal(1.5)` 사이를 기본값으로 설정합니다. `leading-none`은 지양합니다.
* **Tracking:** 제목(`h1`, `h2`)은 `tracking-tighter` (-0.02em ~ -0.05em)를 적용하여 응집력을 높입니다.
* **Fluid Typography:** `clamp()` 함수를 활용하여 뷰포트에 따라 자연스럽게 폰트 크기가 변하도록 합니다.
  ```
  text-[clamp(2rem,5vw,4rem)]
  ```

## 2. 모바일 퍼스트 UX (K-Mobile Optimization)
한국 웹 트래픽의 대다수를 차지하는 모바일 환경에서 '앱 같은' 매끄러운 경험을 제공합니다.

* **Viewport Stability:** `h-screen` 대신 `min-h-[100dvh]`를 사용하여 iOS Safari 등에서 주소창 변화에 따른 레이아웃 튐 현상을 방지합니다.
* **Touch Targets:** 모든 클릭 요소(버튼, 링크)는 최소 `min-h-[48px]`와 `min-w-[48px]`를 확보합니다.
* **Sticky CTA:** 모바일 상세 페이지 하단에는 주요 전환 버튼(상담하기, 예약하기 등)을 `sticky` 또는 `fixed`로 배치하여 접근성을 높입니다.
* **Safe Area:** iOS 노치 대응을 위해 `env(safe-area-inset-*)` 패딩을 적용합니다.

## 3. 신뢰 데이터 및 카피 (Trust & Copywriting)
사용자의 신뢰를 얻기 위해 구체적이고 실제적인 데이터를 사용하며, 번역투를 배제합니다.

* **Deterministic Data:**
  * 모호한 숫자(예: 100%, 50,000+) 대신 구체적인 숫자(예: 98.4%, 47,280+)를 사용하여 리얼리티를 부여합니다.
  * 한국 실명 네이밍 패턴(예: 하윤서, 박도현)과 실제 존재하는 지역명/업종명을 사용합니다.
* **Native Copywriting:**
  * **금지 단어:** "혁신적인", "차세대", "한 차원 높은", "게임 체인저" 등 AI 클리셰.
  * **권장 문구:** "3분 만에 끝내는", "매출로 증명하는" 등 구체적인 이득(Benefit) 중심 작성.
  * 존댓말(`~하세요`, `~합니다`)을 일관성 있게 사용합니다.

## 4. 디자인 방향성 (High-End Design Direction)
정형화된 템플릿 느낌을 지우고 설계된 감각을 전달합니다.

* **Layout Diversity:** 획일적인 3열 그리드를 지양하고, **벤토 그리드(Bento Grid)**나 비대칭 레이아웃을 적극 활용합니다.
* **Liquid Glass:** `backdrop-blur`에 더해 `border-white/10`와 미세한 `shadow`를 추가하여 물리적인 깊이감을 표현합니다.
* **Motion:** `framer-motion`을 사용하여 요소가 나타날 때 미세한 시차(`stagger`)와 부드러운 페이드업(`y: 20 -> 0`) 효과를 기본 적용합니다.
* **Color:** 순수 블랙(#000) 대신 Zinc-950 등 미세한 톤이 섞인 블랙을 사용합니다. AI 특유의 보라/파랑 그라디언트를 남용하지 않습니다.
* **Spacing:** 섹션 간 상하 여백은 최소 `py-24` 이상으로 넉넉하게 확보합니다.

## 체크리스트
- [ ] 폰트가 Pretendard이며 자간/행간이 한국어에 최적화되었는가?
- [ ] 제목에 `break-keep`이 적용되어 가독성이 좋은가?
- [ ] 모바일에서 `100dvh`를 사용하여 레이아웃이 안정적인가?
- [ ] 카피에 AI 클리셰가 없고 구체적인 숫자가 포함되었는가?
- [ ] 인접한 섹션 간에 레이아웃 패턴이 중복되지 않는가?
- [ ] 섹션 간 여백이 충분한가? (최소 `py-24`)
- [ ] 존댓말이 일관되게 사용되었는가?
