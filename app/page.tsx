import type React from 'react';
import Link from 'next/link';
import { ArrowRight, Eye, Users, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Eye className='h-6 w-6 text-primary' />
            <span className='text-xl font-bold'>UX-Ray</span>
          </div>
          <nav className='hidden md:flex items-center gap-6'>
            <Link
              href='#features'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              기능
            </Link>
            <Link
              href='#personas'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              페르소나
            </Link>
            <Link
              href='#how-it-works'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              사용법
            </Link>
          </nav>
          <Link href='/analyze'>
            <Button>시작하기</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className='container py-24 md:py-32'>
        <div className='flex flex-col items-center text-center gap-8 max-w-4xl mx-auto'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium'>
            <Zap className='h-4 w-4' />
            AI 기반 UX 진단 솔루션
          </div>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-balance'>
            당신이 테스트해볼 수 없었던
            <br />
            <span className='text-primary'>유저들의 접근성</span>을 보여드려요
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty'>
            4가지 AI 페르소나가 당신의 UI를 분석하고, 놓치기 쉬운 접근성 문제를 시각적으로
            보여드립니다.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link href='/analyze'>
              <Button size='lg' className='gap-2'>
                무료로 시작하기
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='border-y border-border bg-muted/30'>
        <div className='container py-12'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-primary'>4가지</div>
              <div className='text-sm text-muted-foreground mt-1'>AI 페르소나</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-primary'>30초</div>
              <div className='text-sm text-muted-foreground mt-1'>평균 분석 시간</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-primary'>98%</div>
              <div className='text-sm text-muted-foreground mt-1'>문제 발견율</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-primary'>무료</div>
              <div className='text-sm text-muted-foreground mt-1'>시작 비용</div>
            </div>
          </div>
        </div>
      </section>

      {/* Personas Section */}
      <section id='personas' className='container py-24'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>4가지 AI 페르소나</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            서로 다른 디지털 취약점과 행동 패턴을 가진 4명의 페르소나가 당신의 UI를 다각도로
            진단합니다.
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <PersonaCard
            emoji='👵'
            name='김복심 할머니'
            age='75세'
            description='노안으로 작은 글씨를 읽기 힘들고, 디지털 기기 조작에 서투른 고령층 사용자'
            tags={['가독성', '신뢰성', '인지부하']}
          />
          <PersonaCard
            emoji='📱'
            name='이혁준 대리'
            age='32세'
            description='ADHD 성향으로 참을성이 부족하고, 트렌디한 UI를 선호하는 MZ세대'
            tags={['효율성', '심미성', '피드백']}
          />
          <PersonaCard
            emoji='🚌'
            name='김민석'
            age='25세'
            description='만원 지하철에서 한 손으로만 스마트폰을 조작하는 취준생'
            tags={['도달성', '오작동방지', '모바일최적화']}
          />
          <PersonaCard
            emoji='🌏'
            name='Brian'
            age='40세'
            description='한국어를 전혀 모르고 브라우저 번역에 의존하는 미국인 여행객'
            tags={['현지화', '웹표준', '접근성']}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='bg-muted/30 py-24'>
        <div className='container'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>핵심 기능</h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              AI가 발견한 문제를 시각적으로 명확하게 표시해드립니다.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <FeatureCard
              icon={<Eye className='h-8 w-8' />}
              title='Visual Red Pen'
              description='AI가 지적한 문제 영역을 원본 이미지 위에 빨간 박스로 표시하여 한눈에 파악'
            />
            <FeatureCard
              icon={<Users className='h-8 w-8' />}
              title='멀티 페르소나 분석'
              description='4가지 페르소나를 동시에 선택하여 다양한 관점의 피드백을 한 번에 수집'
            />
            <FeatureCard
              icon={<Target className='h-8 w-8' />}
              title='구체적인 개선 제안'
              description='단순 지적이 아닌, 실제로 적용 가능한 구체적인 수정 방안 제시'
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className='container py-24'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>사용 방법</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            3단계만으로 전문적인 UX 진단을 받아보세요.
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          <StepCard
            step='01'
            title='이미지 업로드'
            description='진단받고 싶은 UI 스크린샷을 드래그 앤 드롭으로 업로드하세요.'
          />
          <StepCard
            step='02'
            title='페르소나 선택'
            description='4가지 페르소나 중 원하는 진단 대상을 선택하세요. 다중 선택 가능합니다.'
          />
          <StepCard
            step='03'
            title='결과 확인'
            description='AI가 분석한 결과를 Visual Red Pen과 함께 상세 리포트로 확인하세요.'
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-primary text-primary-foreground py-24'>
        <div className='container text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>지금 바로 UX 진단을 시작하세요</h2>
          <p className='text-primary-foreground/80 max-w-2xl mx-auto mb-8'>
            사용자 테스트 없이도 다양한 사용자 관점에서 UI의 문제점을 발견할 수 있습니다.
          </p>
          <Link href='/analyze'>
            <Button size='lg' variant='secondary' className='gap-2'>
              무료로 시작하기
              <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-border py-12'>
        <div className='container'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Eye className='h-5 w-5 text-primary' />
              <span className='font-bold'>UX-Ray</span>
            </div>
            <p className='text-sm text-muted-foreground'>© 2026 UX-Ray. AI 기반 UX 진단 솔루션</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PersonaCard({
  emoji,
  name,
  age,
  description,
  tags,
}: {
  emoji: string;
  name: string;
  age: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className='bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow'>
      <div className='text-4xl mb-4'>{emoji}</div>
      <div className='flex items-baseline gap-2 mb-2'>
        <h3 className='font-bold text-lg'>{name}</h3>
        <span className='text-sm text-muted-foreground'>{age}</span>
      </div>
      <p className='text-sm text-muted-foreground mb-4'>{description}</p>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <span key={tag} className='text-xs px-2 py-1 rounded-full bg-primary/10 text-primary'>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className='bg-card border border-border rounded-xl p-8 text-center'>
      <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6'>
        {icon}
      </div>
      <h3 className='font-bold text-xl mb-3'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className='relative'>
      <div className='text-6xl font-bold text-primary/10 mb-4'>{step}</div>
      <h3 className='font-bold text-xl mb-2'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
    </div>
  );
}
