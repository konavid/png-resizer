---
name: nextjs-design-system
description: Tailwind CSS v4 + Framer Motion 기반 디자인 시스템. 브랜드 토큰, 프리미엄 컴포넌트 패턴, 모션 안무를 정의합니다.
---

# Next.js 디자인 시스템 스킬

> `k-standard`에서 정의한 디자인 방향성을 **구현 수준**으로 상세화한 가이드입니다.

## 1. 크리에이티브 아키타입 (Creative Archetypes)
작업 전, 프로젝트 성격에 맞는 비주얼 방향을 결정합니다.

### A. 분위기 및 질감 (Vibe & Texture)
1. **Vantablack Luxe:** OLED 블랙(`#050505`), 메쉬 그라디언트 오버레이, `backdrop-blur-2xl`, 화이트 10% 투명도 헤어라인 테두리.
2. **Warm Editorial:** 웜 크림(`#FDFBF7`), 세이지/에스프레소 포인트, 세리프 영문 제목, 3% 불투명도 노이즈 오버레이(종이 질감).
3. **Clean Structural:** 실버 그레이 배경, 거대한 볼드 타이포그래피, 초확산 앰비언트 쉐도우(`rgba(0,0,0,0.05)`).

### B. 레이아웃 프리셋
1. **Asymmetrical Bento:** 불규칙한 그리드 구조 (`col-span-8` + `col-span-4` 조합).
2. **Z-Axis Cascade:** 요소들이 약간씩 겹치며 쌓이는 구조, 미세한 회전(`rotate-1`)으로 유기적 깊이감 표현.
3. **Editorial Split:** 6:4 또는 5:5 화면 분할. 한쪽은 텍스트, 한쪽은 고해상도 비주얼 배치.

## 2. 브랜드 토큰 시스템 (tailwind.config.ts)
프로젝트의 일관된 톤앤매너를 유지하기 위해 CSS Variables + HSL 패턴을 사용합니다.

```typescript
// tailwind.config.ts - HSL CSS Variable 패턴 (Tailwind v4 호환)
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
}
```

**규칙:**
- 하드코딩된 색상(`#3B82F6`, `blue-500` 등)을 직접 사용하지 않고, 반드시 테마 토큰(`bg-primary`, `text-accent` 등)을 사용합니다.
- 모든 스타일링은 Tailwind CSS 유틸리티 클래스를 사용하며, `.css` 또는 `.module.css` 파일을 별도로 생성하지 않습니다.

## 3. 폰트 설정 패턴
```tsx
// app/layout.tsx
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }) {
  return (
    <html className={pretendard.variable}>
      <body className="font-sans bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
```

## 4. 컴포넌트 마스터리 (Component Patterns)

### A. Double-Bezel 카드 아키텍처
카드는 평면이 아닌 '정밀 가공된 하드웨어'처럼 설계합니다.
```tsx
{/* Outer Shell */}
<div className="bg-white/5 ring-1 ring-white/10 p-1.5 rounded-[2rem]">
  {/* Inner Core */}
  <div className="shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] p-6">
    {/* 콘텐츠 */}
  </div>
</div>
```

### B. 프리미엄 CTA 버튼
```tsx
<button className="
  group relative bg-primary text-primary-foreground
  rounded-full px-8 py-4 font-medium
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  hover:scale-[1.02] active:scale-[0.98]
">
  시작하기
  <span className="inline-flex ml-2 w-8 h-8 rounded-full bg-black/5 items-center justify-center
    transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</button>
```

### C. 이미지 카드
```tsx
<div className="group relative overflow-hidden rounded-lg bg-muted">
  <Image
    src={src}
    alt={alt}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-500"
  />
</div>
```

### D. 섹션 여백
```tsx
<section className="py-16 md:py-24 lg:py-32">
  <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
    {children}
  </div>
</section>
```

## 5. 모션 안무 (Motion Choreography)
모든 움직임은 실제 질량과 스프링 물리 법칙을 따릅니다. `framer-motion`을 사용합니다.

### A. 트랜지션 표준
- 모든 인터랙티브 요소에 다음 베지어 곡선 필수 적용:
  `transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);`
- **금지:** `linear`, 기본 `ease-in-out` 등 기본 이징. 즉각적인 상태 변화.

### B. 스크롤 진입 (Scroll Entry with Framer Motion)
```tsx
'use client';
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### C. 순차적 노출 (Stagger)
형제 요소 간 `animation-delay`를 통한 순차적 노출(Stagger).
```tsx
<motion.div
  variants={{
    show: { transition: { staggerChildren: 0.1 } },
  }}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 6. 절대 금지 원칙 (Anti-Patterns)
- **Banned Fonts:** Inter, Noto Sans KR, Roboto, Arial, Open Sans, Helvetica, 맑은 고딕.
- **Banned Icons:** 선이 굵거나 투박한 아이콘. (Iconify Solar 세트 권장)
- **Banned Borders:** 단순한 `1px solid gray`. 탁한 그림자(`shadow-md` 단독).
- **Banned Motion:** `linear`, 기본 `ease-in-out`. 즉각적인 상태 변화.

## 체크리스트
- [ ] 하드코딩된 색상 대신 테마 토큰(`bg-primary`, `text-accent` 등)을 사용했는가?
- [ ] 모든 카드에 프리미엄 구조(Double-Bezel 또는 이에 준하는)가 적용되었는가?
- [ ] 버튼 호버 시 물리 법칙(Scale, Icon Move)이 구현되었는가?
- [ ] framer-motion 애니메이션이 과하지 않고 자연스러운가?
- [ ] 금지된 폰트나 아이콘이 사용되지 않았는가?
- [ ] 충분한 여백(`py-16 md:py-24`)을 활용하여 시각적 안정감을 주었는가?
