---
name: nextjs-page-builder
description: Next.js App Router 기반 페이지 및 컴포넌트 생성 가이드 (범용)
---

# Next.js 페이지 빌더 스킬

## 프로젝트 구조 (App Router)
```
app/
├── layout.tsx              # 루트 레이아웃 (html, body, 네비게이션, 푸터)
├── page.tsx                # 홈페이지 (/)
├── globals.css             # 글로벌 스타일
├── about/
│   └── page.tsx            # /about
├── services/
│   └── page.tsx            # /services
├── contact/
│   └── page.tsx            # /contact
├── blog/
│   ├── page.tsx            # /blog (목록)
│   └── [slug]/
│       └── page.tsx        # /blog/:slug (상세)
├── (group)/                # route group (옵션)
└── api/
    └── contact/
        └── route.ts        # API 라우트
components/
├── ui/                     # 공통 UI (Button, Card, Input 등)
├── layout/                 # Header, Footer, Navigation
├── sections/               # 페이지 섹션 (Hero, Services, CTA 등)
└── features/               # 기능 단위 컴포넌트 (폼, 인증 등)
lib/
├── utils.ts                # 유틸리티 함수
├── constants.ts            # 상수 값
└── api.ts                  # API 관련 로직
hooks/
├── useXxx.ts               # 커스텀 훅
types/
├── index.ts                # 공통 타입 정의
public/
├── images/
├── fonts/
└── icons/
```

## 페이지 생성 패턴

### 서버 컴포넌트 (기본값)
```tsx
// app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개 | {사이트명}',
  description: '페이지 설명 (150자 이내)',
};

export default function AboutPage() {
  return (
    <main>
      <section id="hero">{/* 히어로 */}</section>
      <section id="content">{/* 본문 */}</section>
      <section id="cta">{/* CTA */}</section>
    </main>
  );
}
```

### 클라이언트 컴포넌트 (인터랙션 필요 시)
```tsx
'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return <form>{/* ... */}</form>;
}
```

## 확장 패턴 (권장)

### 로딩 상태
```tsx
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

### 에러 처리
```tsx
// app/error.tsx
'use client';

export default function Error({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}
```

### 404 페이지
```tsx
// app/not-found.tsx
export default function NotFound() {
  return <div>Page Not Found</div>;
}
```

## 필수 홈페이지 섹션
1. Hero — 메인 비주얼 + CTA 버튼 + 핵심 메시지
2. Services — 제공 서비스 카드 그리드
3. About — 소개 + 이미지/사진
4. Testimonials — 고객 후기 (캐러셀 또는 그리드)
5. Contact/CTA — 문의 폼 또는 연락처
6. Footer — 링크, 저작권, SNS 아이콘

## 컴포넌트 작성 규칙
- 서버 컴포넌트 우선, 필요한 경우에만 'use client'
- next/image로 이미지 최적화
- next/link로 내부 네비게이션
- 스타일 방식 선택:
  - CSS Modules 또는
  - Tailwind CSS (권장)
- props에 TypeScript 타입 정의 필수
- 재사용 가능한 UI는 components/ui에 분리

## 관련 스킬
- SEO 최적화 → `seo-optimize` 스킬 참조
- 성능 최적화 & 반응형 → `performance` 스킬 참조
- 디자인 토큰 & 컴포넌트 → `design-system` 스킬 참조

## 체크리스트
- [ ] App Router 구조로 페이지 생성
- [ ] 시맨틱 HTML (section, article, nav 등)
- [ ] next/image, next/link 사용
- [ ] 서버/클라이언트 컴포넌트 분리
- [ ] TypeScript 타입 정의
- [ ] loading / error / not-found 구성
