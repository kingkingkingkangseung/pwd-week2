SvelteKit 프로젝트 Vercel 배포 실습 가이드
실습 개요
이번 실습에서는 SvelteKit을 사용하여 간단한 자기소개 웹사이트를 만들고, GitHub를 통해 코드를 관리하며, Vercel을 통해 실제로 배포하는 전체 과정을 경험합니다.

학습 목표
Node.js와 npm 환경 구축
SvelteKit 프레임워크로 정적 사이트 제작
Git/GitHub를 활용한 버전 관리
Vercel을 통한 자동 배포 파이프라인 구축
소요 시간
약 2-3시간

Step 1: Node.js 설치 및 환경 설정
1.1 Node.js 다운로드 및 설치
Node.js 공식 사이트 접속
LTS 버전 다운로드 (2025년 기준 v20.x.x 권장)
운영체제별 설치:
Windows: 다운로드한 .msi 파일 실행 → Next 클릭하며 기본 설정으로 설치
Mac: 다운로드한 .pkg 파일 실행 → 설치 마법사 따라 진행
1.2 설치 확인
터미널(Windows는 명령 프롬프트 또는 PowerShell)을 열고 다음 명령어로 설치 확인:

node -v
# v22.x.x 형태로 버전 출력되면 성공

npm -v
# 10.x.x 형태로 버전 출력되면 성공
⚠️ 오류 해결: 명령어를 찾을 수 없다고 나오는 경우 터미널 재시작 후 다시 시도

Step 2: SvelteKit 프로젝트 생성
2.1 프로젝트 생성
# 작업할 폴더로 이동 (예: 바탕화면)
cd Workspace

### 2.2 SvelteKit 프로젝트 초기화
npx sv create pwd-week2

Need to install the following packages:
sv@0.9.4
Ok to proceed? (y) y

T  Welcome to the Svelte CLI! (v0.9.2)
|
*  Which template would you like?
|  > SvelteKit minimal (barebones scaffolding for your new app)
|    SvelteKit demo
|    Svelte library
—

*  Add type checking with TypeScript?
|    Yes, using TypeScript syntax
|  > Yes, using JavaScript with JSDoc comments
|    No
—

│
*  What would you like to add to your project? (use arrow keys / space bar)
|  [+] prettier (formatter - https://prettier.io)
|  [+] eslint (linter - https://eslint.org)
|  [+] vitest (unit testing - https://vitest.dev)
|  [+] playwright (browser testing - https://playwright.dev)
|  [ ] tailwindcss
|  [ ] sveltekit-adapter
|  [ ] devtools-json
|  [ ] drizzle
|  [ ] lucia
|  [ ] mdsvex
|  [ ] paraglide
|  [ ] storybook
|
*  vitest: What do you want to use vitest for?
|  [+] unit testing
|  [+] component testing
|
o  vitest: What do you want to use vitest for?
|  unit testing, component testing
|
*  Successfully setup add-ons
|
*  Which package manager do you want to install dependencies with?
|    None
|  > npm
|    yarn
|    pnpm
|    bun
|    deno
|
*  Successfully installed dependencies
|
o  Successfully formatted modified files
|
o  What's next? -------------------------------+
|                                              |
|  📁 Project steps                            |
|                                              |
|    1: cd pwd-week2                           |
|    2: npm run dev -- --open                  |
|                                              |
|  To close the dev server, hit Ctrl-C         |
|                                              |
|  Stuck? Visit us at https://svelte.dev/chat  |
|                                              |
+----------------------------------------------+
|
—  You're all set!
2.2 개발 서버 실행 테스트
cd pwd-week2
npm run dev -- --open
브라우저에서 http://localhost:5173 접속하여 SvelteKit 기본 페이지 확인

"Welcome to SvelteKit" 메시지가 보이면 성공!
종료: 터미널에서 Ctrl + C 누르기
Step 3: GitHub 저장소 생성
3.1 GitHub 계정 생성 (이미 있다면 스킵)
GitHub 접속
Sign up 클릭 → 이메일, 비밀번호, 사용자명 입력
이메일 인증 완료
3.2 새 저장소 생성
GitHub 로그인 후 우측 상단 + 버튼 클릭
New repository 선택
저장소 설정:
Repository name: pwd-week2 (프로젝트명과 동일하게)
Description: "나의 포트폴리오 웹사이트" (선택사항)
Public 선택 (무료 배포를 위해 필수)
Create repository 클릭
3.3 생성된 저장소 URL 복사
생성 후 나타나는 페이지에서 HTTPS URL 복사:

https://github.com/[your-username]/pwd-week2.git
Step 4: 로컬 프로젝트와 GitHub 저장소 연동
4.1 Git 초기화 및 첫 커밋
프로젝트 폴더(pwd-week2)에서 터미널 실행:

# Git 저장소 초기화
git init

# 모든 파일을 스테이징
git add .

# 첫 번째 커밋
git commit -m "Initial commit: SvelteKit 프로젝트 생성"
4.2 GitHub 저장소 연결
# 브랜치 이름을 main으로 변경 (필요한 경우)
git branch -M main

# 원격 저장소 추가 (복사한 URL 사용)
git remote add origin https://github.com/[username]/pwd-week2.git

# GitHub에 푸시
git push -u origin main
4.3 연동 확인
GitHub 저장소 페이지 새로고침하여 파일들이 업로드되었는지 확인

Step 5: SvelteKit 프로젝트 코드 작성
5.1 프로젝트 구조
src/
├─ app.css
├─ lib/
│  └─ Card.svelte
└─ routes/
   ├─ +layout.svelte
   ├─ +page.svelte            # /
   ├─ about/
   │  └─ +page.svelte         # /about
   ├─ api/
   │  └─ projects/
   │     └─ +server.js        # GET /api/projects
   └─ projects/
      ├─ +page.js             # /projects (load)
      ├─ +page.svelte         # /projects (view)
      └─ [slug]/
         ├─ +page.server.js   # /projects/[slug] (server load)
         └─ +page.svelte      # /projects/[slug] (view)
5.2 전역 스타일(CSS)
/* src/app.css */
:root { --brand: #5b3df5; }
* { box-sizing: border-box; }
body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.6; color:#222; }
a { color: var(--brand); text-decoration: none; }
nav { display:flex; gap:1rem; padding:1rem; border-bottom:1px solid #eee; }
main { max-width: 880px; margin: 2rem auto; padding: 0 1rem; }
.card { border:1px solid #eee; border-radius: 12px; padding:1rem; margin:.5rem 0; }
5.2 전역 레이아웃
<!-- src/routes/+layout.svelte -->
<script>  
  let { children } = $props();
</script>

<svelte:head>
  <title>AJOU Mini Portfolio</title>
  <meta name="description" content="SvelteKit + Vercel mini portfolio" />
</svelte:head>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/projects">Projects</a>
</nav>

<main>
  {@render children()}
</main>

<style global>
  @import '../app.css';
</style>
5.3 Home: 상태/파생값/바인딩/이벤트 학습
<!-- src/routes/+page.svelte -->
<script>
  let name = $state('');
  let welcome = $derived(name ? `Hello, ${name}!` : 'Welcome!');

  function randomize() {
    const msgs = ['웹 개발 재밌다!', 'SvelteKit 금방 익힘', 'Vercel로 바로 배포!'];
    alert(msgs[Math.floor(Math.random() * msgs.length)]);
  }
</script>

<h1>{welcome}</h1>

<label>
  Your name: <input placeholder="type your name" bind:value={name} />
</label>
<p>미리보기: <strong>{name || '(입력 대기)'}</strong></p>

<button onclick={randomize}>랜덤 메시지</button>
5.4 About: 시맨틱 마크업 학습
<!-- src/routes/about/+page.svelte -->
<section class="card">
  <h2>About this site</h2>
  <p>이 사이트는 SvelteKit 기본기와 배포를 연습하기 위한 미니 포트폴리오입니다.</p>
  <ul>
    <li>Semantic HTML</li>
    <li>Routing(정적/동적)</li>
    <li>State / Derived / Effects</li>
    <li>API Route</li>
  </ul>
</section>
5.5 컴포넌트 & Props 학습
<!-- src/lib/Card.svelte -->
<script>
  let { title, summary, href } = $props();
</script>

<article class="card">
  <h3><a href={href}>{title}</a></h3>
  <p>{summary}</p>
</article>
5.6 프로젝트 목록 API 라우트(서버 개발) 학습
// src/routes/api/projects/+server.js
import { json } from '@sveltejs/kit';

const projects = [
  { slug:'timetable', title:'Timetable Helper', summary:'수업/일정 정리 도우미' },
  { slug:'gallery',   title:'Image Gallery',    summary:'미니 이미지 갤러리' },
  { slug:'memo',      title:'Memo Pad',         summary:'로컬에 메모 저장' }
];

export function GET() {
  return json(projects);
}
5.7 목록 페이지: API 소비
// src/routes/projects/+page.js
export async function load({ fetch }) {
  const res = await fetch('/api/projects');
  return { projects: await res.json() };
}
<!-- src/routes/projects/+page.svelte -->
<script>
  import Card from '$lib/Card.svelte';
  let { data } = $props(); // { projects }
</script>

<h2>Projects</h2>
{#each data.projects as p}
  <Card title={p.title} summary={p.summary} href={`/projects/${p.slug}`} />
{:else}
  <p class="card">아직 등록된 프로젝트가 없습니다.</p>
{/each}
5.8 동적 라우트 상세 + 이펙트 활용 학습
서버에서 상세 데이터 제공
// src/routes/projects/[slug]/+page.server.js
import { error } from '@sveltejs/kit';

const DB = {
  timetable: { title:'Timetable Helper', body:'나만의 시간표를 정리하는 도구입니다.' },
  gallery:   { title:'Image Gallery',    body:'미니 갤러리 예시입니다.' },
  memo:      { title:'Memo Pad',         body:'브라우저 로컬에 메모를 저장/복원합니다.' }
};

export function load({ params }) {
  const key = params.slug;
  const item = DB[key];   // key가 없으면 undefined
  if (!item) throw error(404, 'Not found');
  return { item, slug: key };
}
페이지에서 표시 + $effect 로컬 동기화
<!-- src/routes/projects/[slug]/+page.svelte -->
<script>
  let { data } = $props();      // { item, slug }
  let memo = $state('');

  // memo 상세에서만 로컬스토리지 동기화
  $effect(() => {
    if (data.slug === 'memo') {
      const saved = localStorage.getItem('memo');
      if (saved) memo = saved;
    }
  });

  function save() {
    localStorage.setItem('memo', memo);
    alert('저장 완료!');
  }
</script>

<h2>{data.item.title}</h2>
<p>{data.item.body}</p>

{#if data.slug === 'memo'}
  <textarea rows="6" bind:value={memo} class="card" style="width:100%"></textarea>
  <button onclick={save}>메모 저장</button>
  <p style="opacity:.6">브라우저 로컬에만 저장됩니다.</p>
{/if}
Step 6: Github 커밋 & 푸시
git add .
git commit -m "feat: mini-portfolio"
git push origin main
Step 7: Vercel 배포
7.1 Vercel 계정 생성
Vercel 접속
Sign Up 클릭
Continue with GitHub 선택 (GitHub 계정으로 로그인)
GitHub 권한 승인
7.2 새 프로젝트 Import
Vercel 대시보드에서 Add New... → Project 클릭
GitHub 저장소 목록에서 pwd-week2 찾기
저장소 옆 Import 버튼 클릭
7.3 프로젝트 설정
Import 페이지에서 다음 설정 확인:

Project Name: pwd-week2 (자동 입력됨)
Framework Preset: SvelteKit (자동 감지됨)
Root Directory: ./ (기본값)
Build Command: npm run build (자동 설정)
Output Directory: .svelte-kit (자동 설정)
Install Command: npm install (자동 설정)
환경 변수는 현재 필요없으므로 그대로 두고 Deploy 클릭

7.4 배포 진행 확인
배포가 시작되면 실시간 로그 확인 가능
일반적으로 1-3분 내 완료
"Congratulations!" 메시지와 함께 배포 완료
7.5 배포된 사이트 확인
제공된 URL 클릭 (형식: https://pwd-week2-[random].vercel.app)
사이트가 정상적으로 표시되는지 확인
💡 프로덕션 URL: Vercel은 고정 URL도 제공합니다

형식: https://pwd-week2.vercel.app
이 URL은 항상 최신 배포를 가리킵니다
7.6 자동 배포 테스트
이제 GitHub main 브랜치에 푸시할 때마다 자동으로 재배포됩니다:

# 테스트: 작은 변경 후 푸시
echo "# 자동 배포 테스트" >> README.md
git add README.md
git commit -m "test: 자동 배포 확인"
git push origin main
Vercel 대시보드에서 새 배포가 시작되는 것 확인

✅ 과제 제출 체크리스트
필수 제출 항목
 GitHub 저장소 URL
 Vercel 배포 URL (7.5 제공된 URL 클릭 https://pwd-week2-[random].vercel.app 도메인)
평가 기준
 GitHub 저장소에 프로젝트 버전 관리가 바르게 되고 있는가?
 Vercel에 GitHub 저장소가 연결되어 자동 배포가 이루어 지고 있는가?
 Vercel 배포한 웹서비스에서 제시한 프로젝트 코드가 모두 바르게 동작하는가? (Home, About, Projects)
기능 확장
추가적인 콘텐츠나 기능 확장은 자율적으로 진행하면 됩니다.
좋은 실습 결과물들은 강의 시간에 함께 리뷰하도록 하겠습니다.
🔍 자주 발생하는 문제와 해결법
Q1. npm 명령어를 찾을 수 없다고 나옵니다
A: Node.js가 제대로 설치되지 않았거나 PATH 설정 문제입니다.

Windows: Node.js 재설치 후 컴퓨터 재시작
Windows: PowerShell 재시작 후에도 명령어가 동작하지 않을 경우
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Mac/Linux: source ~/.bashrc 또는 source ~/.zshrc 실행
Q2. GitHub 푸시 시 인증 오류가 발생합니다
A: 2021년부터 비밀번호 대신 토큰 사용 필요:

GitHub → Settings → Developer settings → Personal access tokens
Generate new token (classic) 선택
repo 권한 체크 → Generate token
비밀번호 대신 생성된 토큰 사용
Q3. Vercel 배포가 실패합니다
A: Build 로그 확인하여 오류 메시지 체크:

package.json 파일이 저장소 루트에 있는지 확인
모든 파일이 GitHub에 푸시되었는지 확인
Node.js 버전 호환성 문제일 경우 Vercel 설정에서 Node 버전 지정
Q4. 로컬에서는 작동하는데 배포 후 오류가 발생합니다
A: 대소문자 구분 문제일 가능성이 높음:

Windows는 대소문자 구분 안 함, Vercel(Linux)은 구분함
파일명과 import 구문의 대소문자가 정확히 일치하는지 확인
📚 추가 학습 자료
공식 문서
SvelteKit 공식 문서
Vercel 문서
Git 기초 가이드
유용한 VS Code 확장 프로그램
Svelte for VS Code: Svelte 문법 하이라이팅
GitLens: Git 히스토리 시각화
Prettier: 코드 자동 포맷팅
Thunder Client: API 테스트 도구
🎯 실습 완료!
축하합니다! 여러분은 이제:

✅ Node.js 환경을 구축했습니다
✅ SvelteKit 프로젝트를 생성했습니다
✅ Git/GitHub로 버전 관리를 시작했습니다
✅ 실제 웹사이트를 인터넷에 배포했습니다
이것은 웹 개발자로서의 첫 걸음입니다. 계속해서 기능을 추가하고 개선해나가세요!

💡 추가 정보: 도메인 연결 (선택사항)
Vercel의 기본 .vercel.app 도메인으로 충분하지만, 커스텀 도메인을 연결하고 싶다면:

도메인 구매

Cafe24, Gabia 도메인 구매 (국내 )
GoDaddy 도메인 구매 (해외)
연결 방법

Vercel 대시보드 → Settings → Domains
도메인 추가 후 DNS 설정
자동 HTTPS 인증서 발급
📌 참고: 이 부분은 개인적으로 진행하시면 됩니다. 수업에서는 Vercel 기본 도메인으로 충분합니다!