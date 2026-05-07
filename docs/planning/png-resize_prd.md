# 개인용 PNG Print Pack Resizer MVP PRD

## 1. 개요

이 프로젝트는 PNG 이미지 1장을 업로드하면, 선택한 인쇄 비율 팩에 맞춰 여러 출력 사이즈의 PNG 파일을 자동 생성하고 ZIP으로 다운로드할 수 있게 해주는 **개인용 웹앱 MVP**이다. SnapToSize의 핵심 흐름인 “업로드 1회 → 여러 출력 파일 생성 → 정리된 ZIP 다운로드”를 참고하되, 첫 버전은 나 혼자 사용하는 용도에 맞게 단순화한다. [cite:26][cite:44]

이 앱은 Etsy 프린터블 또는 월아트 작업 전처리를 빠르게 하기 위한 도구이며, 처음부터 다중 사용자 SaaS로 만들지 않는다. 브라우저 내에서 이미지를 처리하고 결과물을 ZIP으로 묶는 구조를 우선 채택한다. [cite:44][cite:46][cite:38]

## 2. 목표

이 앱의 1차 목표는 PNG 원본 1개를 여러 인쇄 비율과 크기로 빠르게 변환하여, 수동 리사이즈와 파일 정리 시간을 줄이는 것이다. SnapToSize도 여러 비율과 정리된 ZIP 구조, 파일명 규칙을 핵심 가치로 제시하고 있다. [cite:44][cite:53]

MVP 단계의 목표는 다음과 같다.

- PNG 파일 1개 업로드
- 사전에 정의된 출력 팩 선택
- 브라우저에서 이미지 리사이즈 수행
- 결과 PNG 파일들을 ZIP으로 다운로드
- 내가 반복적으로 실사용 가능한 수준의 간단하고 안정적인 UI 제공 [cite:38][cite:46]

이번 버전에서는 로그인, 결제, DB, 클라우드 저장, 공유 링크, 다중 파일 업로드는 목표에 포함하지 않는다. 개인 생산성 도구로 빠르게 완성하는 것이 우선이다. [cite:20][cite:38]

## 3. 기능

### 3.1 필수 기능

#### 1) PNG 업로드
- 사용자는 PNG 파일 1개를 업로드할 수 있어야 한다.
- 업로드 방식은 drag & drop과 파일 선택 버튼 둘 다 지원한다.
- 업로드 후 원본 이미지 미리보기와 원본 해상도를 표시한다. [cite:38][cite:61]

#### 2) 출력 팩 선택
- 사용자는 미리 정의된 출력 팩을 체크박스 방식으로 선택할 수 있어야 한다.
- MVP 기본 팩은 아래 중 일부 또는 전부를 지원한다.
  - 2:3 팩
  - 3:4 팩
  - 4:5 팩
  - ISO 팩 [cite:45][cite:53]

#### 3) 출력 사이즈 목록 표시
- 사용자가 팩을 선택하면 생성될 파일 목록을 미리 보여준다.
- 각 항목에는 비율명, 인치 기준 크기 또는 용지명, 최종 픽셀 크기를 표시한다. [cite:53][cite:57]

#### 4) 브라우저 내 리사이즈 처리
- 이미지 리사이즈는 브라우저에서 Canvas API로 처리한다.
- 서버 업로드 없이 로컬에서 처리해 개인용 도구로서 속도와 프라이버시를 확보한다. [cite:49][cite:61][cite:38]

#### 5) ZIP 다운로드
- 생성된 PNG 파일들은 JSZip으로 하나의 ZIP 파일로 묶어서 다운로드한다.
- ZIP 내부 파일명은 일관된 규칙을 따른다. [cite:46][cite:44]

#### 6) 진행 상태 표시
- 생성 중에는 현재 처리 중인 파일 수와 전체 수를 보여준다.
- 처리 완료 후 ZIP 다운로드 버튼이 활성화된다. [cite:38]

### 3.2 권장 기능

#### 1) 파일명 prefix 입력
- 사용자가 결과 파일명 앞에 붙을 이름을 직접 입력할 수 있게 한다.
- 예: `psalm-art-01`, `minimal-floral-set-a` [cite:54]

#### 2) 팩별 전체 선택 / 해제
- 빠른 테스트를 위해 팩 단위 선택과 해제를 쉽게 한다.

#### 3) 에러 처리
- PNG가 아닌 파일 업로드 시 에러 메시지를 표시한다.
- 이미지 크기가 지나치게 클 경우 제한 안내를 보여준다.
- 캔버스 처리 실패 시 사용자에게 다시 시도 방법을 안내한다. [cite:49][cite:38]

### 3.3 제외 기능

이번 MVP에서는 아래 기능을 구현하지 않는다.

- JPG, PDF, SVG 지원
- 로그인 / 회원가입
- DB 저장
- 작업 이력 저장
- 결제 기능
- 다중 사용자 지원
- 서버 사이드 이미지 처리
- 자동 크롭 편집기
- 배경 제거
- Etsy 20MB 자동 분할 최적화 [cite:42][cite:44]

## 4. 화면

### 4.1 메인 화면 구조

메인 화면은 한 페이지 안에서 아래 3개 영역으로 구성한다.

#### A. 업로드 영역
- 앱 제목
- 짧은 설명 문구
- PNG 업로드 박스
- 업로드 완료 후 원본 미리보기
- 원본 해상도 표시 [cite:38][cite:61]

#### B. 출력 설정 영역
- 파일명 prefix 입력
- 출력 팩 선택 체크박스
- 선택한 팩의 생성 예정 파일 목록 표시
- 예상 생성 개수 표시 [cite:45][cite:53]

#### C. 결과 영역
- “Generate PNG Pack” 버튼
- 진행 상태 바 또는 진행 문구
- 완료 후 ZIP 다운로드 버튼
- 간단한 완료 메시지 [cite:46][cite:38]

### 4.2 UX 흐름

1. 사용자가 PNG 파일을 업로드한다. [cite:38]
2. 앱이 원본 미리보기와 원본 해상도를 보여준다. [cite:61]
3. 사용자가 출력 팩을 선택한다. [cite:45]
4. 앱이 생성될 파일 목록을 보여준다. [cite:53]
5. 사용자가 생성 버튼을 누른다.
6. 앱이 Canvas로 각 사이즈 PNG를 생성한다. [cite:49][cite:61]
7. 앱이 결과 파일들을 ZIP으로 묶는다. [cite:46]
8. 사용자가 ZIP 파일을 다운로드한다. [cite:44]

### 4.3 UI 원칙

- 데스크톱 우선으로 설계한다.
- 한 화면에서 모든 작업이 끝나는 단일 페이지 구조로 만든다.
- 설정은 최소화하고, 버튼과 상태는 명확하게 보이게 한다.
- 개인용 도구이므로 화려한 브랜딩보다 속도와 실용성을 우선한다. [cite:38][cite:20]

## 5. 기술요건

### 5.1 개발 환경
- Antigravity에서 생성
- Next.js App Router
- TypeScript
- Tailwind CSS
- 클라이언트 컴포넌트 중심 구현 [cite:20][cite:21]

### 5.2 핵심 라이브러리 및 API
- Canvas API: 이미지 리사이즈 처리 [cite:49][cite:61]
- JSZip: ZIP 파일 생성 및 다운로드 [cite:46]
- FileReader / Blob / URL API: 파일 읽기 및 다운로드 처리 [cite:46][cite:38]

### 5.3 처리 방식
- 업로드 이미지는 서버에 저장하지 않는다.
- 모든 리사이즈 연산은 브라우저에서 수행한다.
- ZIP 생성 후 사용자가 직접 다운로드한다. [cite:46][cite:49]

### 5.4 파일 규칙
- ZIP 파일명 예시: `myart_print_pack.zip`
- 내부 파일명 예시:
  - `myart_2x3_4x6_1200x1800.png`
  - `myart_2x3_8x12_2400x3600.png`
  - `myart_4x5_8x10_2400x3000.png`
  - `myart_A4_2480x3508.png` [cite:44][cite:54]

### 5.5 성능 및 제약
- 첫 버전은 PNG 1개만 처리한다.
- 매우 큰 파일은 메모리 문제를 일으킬 수 있으므로 최대 크기 제한을 둔다.
- 모바일보다 데스크톱 환경 사용을 우선한다.
- 최신 Chrome 계열 브라우저에서 안정 동작을 우선 보장한다. [cite:49][cite:38]

### 5.6 기본 출력 팩 정의
초기 MVP는 아래 두 가지 방식 중 하나를 선택한다.

#### 옵션 A: 초소형 MVP
- 2:3 팩만 지원

#### 옵션 B: 기본형 MVP
- 2:3 팩
- 4:5 팩

권장 출력 예시는 다음과 같다.

| 팩 | 사이즈 예시 |
|---|---|
| 2:3 | 4x6, 8x12, 12x18, 16x24, 20x30 [cite:53][cite:60] |
| 4:5 | 4x5, 8x10, 12x15, 16x20 [cite:53][cite:62] |
| 3:4 | 6x8, 9x12, 12x16, 15x20, 18x24 [cite:45][cite:41] |
| ISO | A5, A4, A3, A2 [cite:45][cite:57] |

## 6. 작업순서

### 단계 1. 프로젝트 초기화
- Next.js + TypeScript + Tailwind 프로젝트 생성
- 기본 단일 페이지 레이아웃 구성
- 업로드 UI와 설정 UI 뼈대 생성 [cite:20]

### 단계 2. 업로드 기능 구현
- PNG 업로드 처리
- 파일 검증
- 원본 미리보기 표시
- 원본 해상도 추출 [cite:38][cite:61]

### 단계 3. 출력 팩 데이터 정의
- 하드코딩된 팩 목록 작성
- 각 팩별 사이즈와 픽셀값 정의
- 선택한 팩에 따라 생성 예정 목록 표시 [cite:45][cite:53]

### 단계 4. Canvas 리사이즈 구현
- 원본 이미지를 Canvas에 로드
- 각 목표 해상도별 PNG 생성
- 개별 Blob 또는 data URL 생성 [cite:49][cite:61]

### 단계 5. ZIP 생성 구현
- 생성된 PNG 파일들을 JSZip에 추가
- ZIP 파일 생성 후 다운로드 처리 [cite:46]

### 단계 6. 진행 상태 및 예외 처리
- 진행률 표시
- 실패 시 에러 메시지 표시
- 비정상 입력에 대한 안내 추가 [cite:38][cite:49]

### 단계 7. 마감 정리
- 파일명 규칙 정리
- UI 문구 정리
- 데스크톱 실사용 테스트
- 개인 워크플로 기준 최종 점검 [cite:38][cite:20]

## 안티그래비티용 최종 지시문

아래 문장을 그대로 붙여 넣어도 됩니다.

> Build a personal-use MVP web app with Next.js App Router, TypeScript, and Tailwind CSS. The app should let me upload one PNG image, preview it, show original dimensions, select print size packs, resize the image in the browser using Canvas API, and download all generated PNG files as a ZIP using JSZip. No auth, no database, no payments, no server-side image processing. Use a clean single-page interface. Include file name prefix input, output file list, progress state, validation for PNG-only upload, and ZIP file naming. Start with 2:3 and 4:5 packs only.
