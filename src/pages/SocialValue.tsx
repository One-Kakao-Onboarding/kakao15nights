import { Link } from 'react-router-dom';
import { Eye, ArrowRight, Users, Globe, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SocialValue() {
  return (
    <div className='min-h-screen bg-gradient-radial'>
      {/* Header */}
      <header className='border-b border-white/10 backdrop-blur-xl sticky top-0 z-50'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          <Link to='/' className='flex items-center gap-2'>
            <Eye className='h-6 w-6 text-white' />
            <span className='text-xl font-bold text-white'>UX-Ray</span>
          </Link>
          <nav>
            <Link to='/features'>
              <Button
                variant='ghost'
                size='sm'
                className='text-md text-gray-300 hover:text-white hover:bg-white/10'
              >
                기능
              </Button>
            </Link>
            <Link to='/how-to-use'>
              <Button
                variant='ghost'
                size='sm'
                className='text-md text-gray-300 hover:text-white hover:bg-white/10'
              >
                사용법
              </Button>
            </Link>
            <Link to='/social-value'>
              <Button
                variant='ghost'
                size='sm'
                className='text-md text-white hover:text-white hover:bg-white/10'
              >
                사회적 가치
              </Button>
            </Link>
          </nav>
          <nav className='flex items-center gap-1'>
            <Link to='/analyze'>
              <Button size='sm' className='ml-2 bg-white text-black hover:bg-white/90'>
                시작하기
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className='container mx-auto py-16 px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-white'>
            디지털 포용, 모두를 위한 UX
          </h1>
          <p className='text-lg text-gray-400'>
            UX-Ray는 단순한 진단 도구가 아닙니다.
            <br />
            디지털 소외 계층을 포함한 모든 사람이 편리하게 사용할 수 있는 서비스를 만들어갑니다.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className='container mx-auto py-12 px-4'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto'>
          <StatCard number='1,200만' label='디지털 소외 계층' />
          <StatCard number='900만' label='65세 이상 고령 인구' />
          <StatCard number='264만' label='장애인 등록 인구' />
          <StatCard number='30%' label='웹 접근성 준수율' />
        </div>
      </section>

      {/* Main Content */}
      <section className='bg-white/5 backdrop-blur-xl py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto space-y-16'>
            {/* Card 1 */}
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center'>
                    <Users className='h-6 w-6 text-yellow-500' />
                  </div>
                  <h2 className='text-2xl font-bold text-white'>1,200만 명의 디지털 소외 계층</h2>
                </div>
                <p className='text-gray-400 leading-relaxed'>
                  대한민국 65세 이상 고령 인구는 약 900만 명, 장애인 등록 인구는 약 264만 명. 이들 중
                  상당수가 작은 글씨, 복잡한 UI, 불친절한 네비게이션으로 인해 디지털 서비스 이용에
                  어려움을 겪고 있습니다.
                </p>
              </div>
              <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center p-4'>
                    <span className='text-4xl'>👵</span>
                    <p className='text-sm text-gray-400 mt-2'>고령층</p>
                  </div>
                  <div className='text-center p-4'>
                    <span className='text-4xl'>👨‍🦯</span>
                    <p className='text-sm text-gray-400 mt-2'>시각 장애</p>
                  </div>
                  <div className='text-center p-4'>
                    <span className='text-4xl'>🦻</span>
                    <p className='text-sm text-gray-400 mt-2'>청각 장애</p>
                  </div>
                  <div className='text-center p-4'>
                    <span className='text-4xl'>🌏</span>
                    <p className='text-sm text-gray-400 mt-2'>외국인</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div className='order-2 md:order-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg'>
                    <span className='text-green-500 font-bold'>WCAG</span>
                    <span className='text-sm text-gray-300'>웹 접근성 가이드라인</span>
                  </div>
                  <div className='flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg'>
                    <span className='text-blue-500 font-bold'>KWCAG</span>
                    <span className='text-sm text-gray-300'>한국형 웹 콘텐츠 접근성 지침</span>
                  </div>
                  <div className='flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg'>
                    <span className='text-purple-500 font-bold'>A11Y</span>
                    <span className='text-sm text-gray-300'>글로벌 접근성 표준</span>
                  </div>
                </div>
              </div>
              <div className='order-1 md:order-2'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center'>
                    <Globe className='h-6 w-6 text-green-500' />
                  </div>
                  <h2 className='text-2xl font-bold text-white'>글로벌 접근성 기준 충족</h2>
                </div>
                <p className='text-gray-400 leading-relaxed'>
                  한국 웹사이트의 접근성 준수율은 약 30%에 불과합니다. UX-Ray는 WCAG(웹 접근성
                  가이드라인)과 한국형 웹 콘텐츠 접근성 지침(KWCAG)을 기반으로 외국인, 장애인도 사용
                  가능한 서비스를 만듭니다.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center'>
                    <Sparkles className='h-6 w-6 text-yellow-400' />
                  </div>
                  <h2 className='text-2xl font-bold text-white'>카카오 생태계 접근성 강화</h2>
                </div>
                <p className='text-gray-400 leading-relaxed'>
                  카카오톡, 카카오페이, 다음 등 카카오 그룹 서비스의 UX를 개선하여 디지털 취약 계층의
                  진입 장벽을 낮춥니다. 더 많은 사람이 카카오 생태계를 편리하게 이용할 수 있도록
                  기여합니다.
                </p>
              </div>
              <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8'>
                <div className='flex flex-wrap justify-center gap-4'>
                  <div className='px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium'>
                    카카오톡
                  </div>
                  <div className='px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium'>
                    카카오페이
                  </div>
                  <div className='px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium'>
                    다음
                  </div>
                  <div className='px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium'>
                    카카오맵
                  </div>
                  <div className='px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium'>
                    카카오뱅크
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div className='order-2 md:order-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 text-center'>
                <div className='text-6xl font-bold text-red-500 mb-2'>1%</div>
                <p className='text-gray-400'>접근성 개선</p>
                <div className='mt-4 pt-4 border-t border-white/10'>
                  <div className='text-3xl font-bold text-white mb-1'>= 수십만 명</div>
                  <p className='text-sm text-gray-400'>더 나은 사용 경험</p>
                </div>
              </div>
              <div className='order-1 md:order-2'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center'>
                    <Heart className='h-6 w-6 text-red-500' />
                  </div>
                  <h2 className='text-2xl font-bold text-white'>실질적인 사회 기여</h2>
                </div>
                <p className='text-gray-400 leading-relaxed'>
                  접근성 1% 개선만으로도 수십만 명이 서비스를 더 쉽게 사용할 수 있습니다. UX-Ray는
                  디자이너와 기획자가 쉽게 접근성 문제를 발견하고 개선할 수 있도록 도와, 디지털 권리를
                  보장하는 사회를 만듭니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className='container mx-auto py-24 px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <blockquote className='text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed'>
            "좋은 UX는 특권이 아닌 권리입니다"
          </blockquote>
          <p className='text-lg text-gray-400 leading-relaxed'>
            UX-Ray를 통해 하나의 서비스가 개선될 때마다,
            <br />
            디지털 소외 계층이 일상에서 느끼는 불편함이 하나씩 사라집니다.
            <br />
            당신의 디자인이 누군가의 삶을 바꿀 수 있습니다.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-white/5 backdrop-blur-xl py-24'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4 text-white'>함께 만들어가요</h2>
          <p className='text-gray-400 mb-8'>모두를 위한 디지털 세상, UX-Ray와 함께 시작하세요.</p>
          <Link to='/analyze'>
            <Button size='lg' className='gap-2 bg-white text-black hover:bg-white/90'>
              무료로 시작하기
              <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-white/10 py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <Link to='/' className='flex items-center gap-2'>
              <Eye className='h-5 w-5 text-white' />
              <span className='font-bold text-white'>UX-Ray</span>
            </Link>
            <p className='text-sm text-gray-400'>© 2026 UX-Ray. AI 기반 UX 진단 솔루션</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center'>
      <div className='text-3xl font-bold text-white mb-2'>{number}</div>
      <div className='text-sm text-gray-400'>{label}</div>
    </div>
  );
}
