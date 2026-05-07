---
name: nextjs-seo
description: Next.js SEO 최적화 - App Router Metadata API 기반 검색 엔진 최적화 범용 가이드
---

# Next.js SEO 최적화 스킬

## Metadata API 활용

### 정적 메타데이터
```tsx
// app/layout.tsx (전역)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('[https://example.com](https://example.com)'),
  title: {
    default: '사이트명',
    template: '%s | 사이트명',  // 하위 페이지 title 템플릿
  },
  description: '사이트 전체 설명',
  keywords: ['키워드1', '키워드2', '키워드3'],
  alternates: {
    canonical: '/', // 표준 URL 설정
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '사이트명',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: '사이트명' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

### 페이지별 메타데이터
```tsx
// app/about/page.tsx
export const metadata: Metadata = {
  title: '소개',  // → "소개 | 사이트명"
  description: '이 페이지의 고유한 설명 (150자 이내)',
  alternates: {
    canonical: '/about',
  },
};
```

### 동적 메타데이터
```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: { images: [post.thumbnail] },
  };
}
```

## 구조화된 데이터 (JSON-LD)
```tsx
// components/JsonLd.tsx
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': '[https://schema.org](https://schema.org)',
    '@type': 'Organization', // 프로젝트 성격에 따라 'LocalBusiness', 'WebSite' 등으로 변경
    name: '사이트명',
    url: '[https://example.com](https://example.com)',
    logo: '[https://example.com/logo.png](https://example.com/logo.png)',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-XX-XXXX-XXXX',
      contactType: 'customer service',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

## sitemap & robots
```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: '[https://example.com](https://example.com)', lastModified: new Date(), priority: 1.0 },
    { url: '[https://example.com/about](https://example.com/about)', lastModified: new Date(), priority: 0.8 },
    { url: '[https://example.com/services](https://example.com/services)', lastModified: new Date(), priority: 0.8 },
    { url: '[https://example.com/contact](https://example.com/contact)', lastModified: new Date(), priority: 0.7 },
  ];
}

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: '[https://example.com/sitemap.xml](https://example.com/sitemap.xml)',
  };
}
```

## 콘텐츠 SEO 규칙
- 페이지당 <h1> 하나만 사용
- 제목 계층: h1 → h2 → h3 (건너뛰기 금지)
- 모든 next/image에 설명적인 alt 필수
- 의미 있는 앵커 텍스트 ("여기 클릭" 지양)

## 체크리스트
- [ ] 루트 layout.tsx에 전역 metadata 설정
- [ ] 모든 페이지에 title + description
- [ ] Open Graph 이미지 (1200×630) 설정
- [ ] JSON-LD 구조화 데이터
- [ ] sitemap.ts 생성
- [ ] robots.ts 생성
- [ ] canonical URL(표준 URL) 설정
- [ ] h1 태그 페이지당 1개 사용
- [ ] 모든 이미지 alt 속성 작성