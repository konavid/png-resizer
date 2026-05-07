---
name: nextjs-performance
description: Next.js 성능 최적화 및 반응형 디자인 - Core Web Vitals, 이미지/폰트 최적화, 반응형 레이아웃 패턴 통합 가이드
---

# Next.js 성능 최적화 & 반응형 디자인 스킬

## 핵심 지표 (Core Web Vitals)

| 지표 | 목표 | 설명 |
|------|------|------|
| LCP | < 2.5초 | 최대 콘텐츠 페인트 |
| INP | < 200ms | 다음 페인트 인터랙션 |
| CLS | < 0.1 | 누적 레이아웃 이동 |

---

## 이미지 최적화 (next/image)
```tsx
import Image from 'next/image';

// 히어로 이미지 (LCP 최적화)
<Image
  src="/photo.jpg"
  alt="사진 설명"
  width={800}
  height={600}
  placeholder="blur"
  priority
/>

// 반응형 이미지
<div className="relative w-full aspect-[16/9]">
  <Image
    src="/hero.jpg"
    alt="이미지"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover"
    priority
  />
</div>
```

---

## 폰트 최적화 (next/font)
```tsx
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});
```

---

## 코드 스플리팅
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div className="skeleton" />,
  ssr: false,
});
```

---

## 데이터 캐싱 & ISR
```tsx
// 정적 캐싱 (기본값)
await fetch(url, { cache: 'force-cache' });

// ISR 캐싱
await fetch(url, { next: { revalidate: 60 } });
export const revalidate = 3600;

// SSR (항상 새 데이터)
await fetch(url, { cache: 'no-store' });
```

---

## Third-party 스크립트 최적화
```tsx
import Script from 'next/script';

<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"
/>
```

---

## 반응형 브레이크포인트 (Tailwind)

| 접두사 | 최소 너비 | 대상 디바이스 |
|--------|-----------|---------------|
| (없음) | 0px       | 모바일 (기본) |
| sm:    | 640px     | 소형 태블릿   |
| md:    | 768px     | 태블릿        |
| lg:    | 1024px    | 데스크탑      |
| xl:    | 1280px    | 대형 화면     |
| 2xl:   | 1440px    | 초대형 화면   |

> 모바일 퍼스트: 기본 → md → lg 순으로 확장

---

## 반응형 패턴

### 컨테이너 레이아웃
```tsx
<div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
  {children}
</div>
```

### 반응형 그리드
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### 반응형 간격
```tsx
<section className="py-16 md:py-24 lg:py-32" />
<div className="space-y-4 md:space-y-6 lg:space-y-8" />
```

### 표시 / 숨기기
```tsx
<div className="hidden md:block" />  {/* 데스크탑만 */}
<div className="md:hidden" />        {/* 모바일만 */}
```

### Safe Area 대응 (iOS)
```tsx
<div className="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]" />
```

### Reduced Motion 대응
```tsx
<div className="motion-reduce:transition-none" />
```

---

## CSS 성능
```css
.animate {
  transition: transform 0.3s ease, opacity 0.3s ease;
  will-change: transform;
}
```
- `transform`과 `opacity`만 애니메이션화하여 GPU 가속을 활용합니다.

---

## 번들 사이즈 최적화
- 불필요한 라이브러리 제거
- lodash → lodash-es 또는 개별 import
- moment → dayjs 추천
- 클라이언트 컴포넌트 최소화

---

## 체크리스트
- [ ] LCP 이미지 priority 적용
- [ ] next/image sizes 설정
- [ ] next/font 적용
- [ ] 서버 컴포넌트 우선
- [ ] dynamic import 적용
- [ ] loading UI 구현
- [ ] ISR / 캐싱 전략 적용
- [ ] 불필요한 JS 제거
- [ ] 모바일 기준으로 먼저 구현
- [ ] md / lg / xl 단계별 확인
- [ ] 터치 영역 44px 이상
- [ ] spacing 반응형 적용
- [ ] safe-area 대응
- [ ] motion-reduce 대응
- [ ] Lighthouse Performance 90+
