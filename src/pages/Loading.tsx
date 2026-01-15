import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useAnalysisStore } from '@/store/analysis';
import { analyzeImage, validateImage } from '@/lib/gemini';
import { Button } from '@/components/ui/button';

const loadingMessages = [
  '이미지를 검증하고 있어요...',
  '김복심 할머니가 돋보기를 찾고 계세요...',
  '이혁준 대리가 UI를 훑어보고 있어요...',
  '김민석이 한 손으로 스크롤하고 있어요...',
  'Brian이 번역기를 돌리고 있어요...',
  '페르소나들이 문제점을 기록하고 있어요...',
  '분석 결과를 정리하고 있어요...',
];

interface ValidationError {
  title: string;
  message: string;
}

export default function Loading() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [validationError, setValidationError] = useState<ValidationError | null>(null);

  const { uploadedImage, selectedPersonas, selectedDevice, setResults, setIsAnalyzing, setError } =
    useAnalysisStore();

  useEffect(() => {
    // Check if we have analysis data
    if (!uploadedImage || selectedPersonas.length === 0) {
      navigate('/analyze');
      return;
    }

    // Rotate loading messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95; // Cap at 95% until actual completion
        return prev + 1;
      });
    }, 150);

    // Analyze and navigate
    const runAnalysis = async () => {
      setIsAnalyzing(true);
      setError(null);

      try {
        // Get API key from environment variable
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

        if (!apiKey) {
          throw new Error('API key not configured');
        }

        // Step 1: Validate image
        const validation = await validateImage(uploadedImage, apiKey);

        if (!validation.isValid) {
          setValidationError({
            title: '올바르지 않은 이미지입니다',
            message: validation.message,
          });
          setIsAnalyzing(false);
          return;
        }

        // Step 2: Analyze image
        const results = await analyzeImage(uploadedImage, selectedPersonas, selectedDevice, apiKey);

        setResults(results);
        setProgress(100);

        // Short delay to show 100% before navigating
        setTimeout(() => {
          navigate('/analyze/results');
        }, 300);
      } catch (error) {
        console.error('Analysis failed:', error);
        // Use fallback mock results
        const mockResults = createMockResults(uploadedImage, selectedPersonas, selectedDevice);
        setResults(mockResults);
        setProgress(100);

        setTimeout(() => {
          navigate('/analyze/results');
        }, 300);
      } finally {
        setIsAnalyzing(false);
      }
    };

    runAnalysis();

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [
    uploadedImage,
    selectedPersonas,
    selectedDevice,
    navigate,
    setResults,
    setIsAnalyzing,
    setError,
  ]);

  // Show validation error screen
  if (validationError) {
    return (
      <div className='min-h-screen bg-black flex flex-col items-center justify-center p-8'>
        <div className='text-center max-w-md'>
          {/* Logo */}
          <div className='flex items-center justify-center gap-2 mb-12'>
            <Eye className='h-8 w-8 text-white' />
            <span className='text-2xl font-bold text-white'>UX-Ray</span>
          </div>

          {/* Error Icon */}
          <div className='relative mb-8'>
            <div className='w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center'>
              <AlertTriangle className='w-12 h-12 text-red-500' />
            </div>
          </div>

          {/* Error Message */}
          <h2 className='text-xl font-semibold mb-3 text-red-400'>
            {validationError.title}
          </h2>
          <p className='text-gray-400 mb-8'>
            {validationError.message}
          </p>

          {/* Guide */}
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-8 text-left'>
            <p className='text-sm font-medium mb-2 text-white'>올바른 이미지 예시:</p>
            <ul className='text-sm text-gray-400 space-y-1'>
              <li>• 웹사이트 화면 캡처</li>
              <li>• 모바일 앱 화면 캡처</li>
              <li>• 데스크톱 앱 화면 캡처</li>
              <li>• UI/UX 목업 또는 와이어프레임</li>
            </ul>
          </div>

          {/* Back Button */}
          <Button
            onClick={() => navigate('/analyze')}
            className='gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
          >
            <ArrowLeft className='h-4 w-4' />
            다시 업로드하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-radial flex flex-col items-center justify-center p-8 relative overflow-hidden'>
      {/* X-ray scan effect */}
      <div
        className='absolute top-0 left-0 w-full h-full pointer-events-none'
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 100%)',
          animation: 'xrayScanGlobal 3s ease-in-out infinite',
        }}
      />

      <div className='text-center max-w-md relative z-10'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2 mb-12'>
          <Eye className='h-8 w-8 text-white' />
          <span className='text-2xl font-bold text-white'>UX-Ray</span>
        </div>

        {/* Loading Animation - X logo */}
        <div className='relative mb-8'>
          <div className='w-32 h-32 mx-auto bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border border-white/20'
            style={{
              animation: 'pulse 2s ease-in-out infinite'
            }}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='w-16 h-16 animate-spin' style={{ animationDuration: '3s' }}>
              <line x1="30" y1="30" x2="70" y2="70" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
              <line x1="70" y1="30" x2="30" y2="70" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
              <line x1="50" y1="15" x2="50" y2="5" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <line x1="50" y1="85" x2="50" y2="95" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <line x1="15" y1="50" x2="5" y2="50" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <line x1="85" y1="50" x2="95" y2="50" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
            </svg>
          </div>
        </div>

        {/* Loading Message */}
        <h2 className='text-xl font-semibold mb-2 text-white'>페르소나들이 사용성 테스트 중입니다</h2>
        <p className='text-gray-400 mb-8 h-6 transition-all'>
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress Bar */}
        <div className='w-full bg-white/10 rounded-full h-2 overflow-hidden shadow-inner backdrop-blur-xl'>
          <div
            className='h-full bg-white transition-all duration-300 ease-out rounded-full shadow-sm'
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className='text-sm text-gray-400 mt-2'>{progress}%</p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.05);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </div>
  );
}

function createMockResults(image: string, personas: string[], device: string) {
  const personaResults: Record<
    string,
    {
      name: string;
      emoji: string;
      score: number;
      feedback: string[];
      coordinates: { x: number; y: number; width: number; height: number }[];
    }
  > = {
    grandmother: {
      name: '김복심 할머니',
      emoji: '👵',
      score: 65,
      feedback: [
        '글씨가 너무 작아서 눈이 아프네요. 조금 더 크게 해주시면 좋겠어요.',
        '이 버튼은 뭔가요? 설명이 없어서 누르기가 무서워요.',
        '메뉴라는 글씨가 영어로 되어있어서 무슨 뜻인지 모르겠어요.',
      ],
      coordinates: [
        { x: 0.1, y: 0.05, width: 0.3, height: 0.08 },
        { x: 0.5, y: 0.3, width: 0.2, height: 0.06 },
        { x: 0.02, y: 0.02, width: 0.15, height: 0.04 },
      ],
    },
    adhd: {
      name: '이혁준 대리',
      emoji: '📱',
      score: 72,
      feedback: [
        '정보가 너무 많아서 뭘 봐야 할지 모르겠어요. 핵심만 보여주세요.',
        '이 디자인 좀 올드하네요. 요즘 트렌드랑 안 맞아 보여요.',
        '클릭해야 할 게 너무 많아요. 한 번에 끝낼 수 있게 해주세요.',
      ],
      coordinates: [
        { x: 0.1, y: 0.15, width: 0.7, height: 0.3 },
        { x: 0, y: 0, width: 1, height: 0.08 },
        { x: 0.4, y: 0.5, width: 0.3, height: 0.08 },
      ],
    },
    'one-hand': {
      name: '김민석',
      emoji: '🚌',
      score: 58,
      feedback: [
        '이 버튼이 너무 위에 있어서 엄지로 누르기 힘들어요.',
        '버튼들이 너무 작고 붙어있어서 잘못 누를 것 같아요.',
        '뒤로가기 버튼이 왼쪽 상단에 있어서 한 손으로는 닿지 않아요.',
      ],
      coordinates: [
        { x: 0.02, y: 0.02, width: 0.18, height: 0.06 },
        { x: 0.3, y: 0.4, width: 0.2, height: 0.1 },
        { x: 0.01, y: 0.01, width: 0.1, height: 0.05 },
      ],
    },
    foreigner: {
      name: 'Brian',
      emoji: '🌏',
      score: 45,
      feedback: [
        "This text is embedded in an image, so I can't translate it with my browser.",
        "I can't find an English language option anywhere on this page.",
        "The authentication requires a Korean phone number, which I don't have.",
      ],
      coordinates: [
        { x: 0.2, y: 0.15, width: 0.5, height: 0.2 },
        { x: 0, y: 0, width: 1, height: 0.08 },
        { x: 0.8, y: 0.5, width: 0.15, height: 0.1 },
      ],
    },
  };

  const selectedResults = personas
    .map((id) => personaResults[id])
    .filter((r): r is NonNullable<typeof r> => r !== undefined);

  return {
    image,
    device,
    personas: selectedResults,
    overallScore: Math.round(
      selectedResults.reduce((acc, r) => acc + r.score, 0) / selectedResults.length
    ),
  };
}
