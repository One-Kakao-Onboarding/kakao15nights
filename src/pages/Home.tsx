import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleNavigate = (path: string) => {
    setIsVisible(false);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <div className='onboarding-container' style={{ opacity: isVisible ? 1 : 0 }}>
      <div className='onboarding-content'>
        <div className='onboarding-logo mb-2'>UX-Ray</div>
        <div className='onboarding-text'>
          당신이 만날 수 없었던 유저들의 시선으로
          <br />
          숨겨진 UX 문제를 스캔해 드려요
        </div>
        <div className='onboarding-icon'>
          <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
            <line x1='30' y1='30' x2='70' y2='70' strokeWidth='3' strokeLinecap='round' />
            <line x1='70' y1='30' x2='30' y2='70' strokeWidth='3' strokeLinecap='round' />
            <line
              x1='50'
              y1='15'
              x2='50'
              y2='5'
              strokeWidth='2'
              strokeLinecap='round'
              opacity='0.6'
            />
            <line
              x1='50'
              y1='85'
              x2='50'
              y2='95'
              strokeWidth='2'
              strokeLinecap='round'
              opacity='0.6'
            />
            <line
              x1='15'
              y1='50'
              x2='5'
              y2='50'
              strokeWidth='2'
              strokeLinecap='round'
              opacity='0.6'
            />
            <line
              x1='85'
              y1='50'
              x2='95'
              y2='50'
              strokeWidth='2'
              strokeLinecap='round'
              opacity='0.6'
            />
            <line
              x1='25'
              y1='25'
              x2='15'
              y2='15'
              strokeWidth='2'
              strokeLinecap='round'
              opacity='0.4'
            />
            <line
              x1='75'
              y1='25'
              x2='85'
              y2='15'
              strokeWidth='2'
              strokeLinecap='round'
              opacity='0.4'
            />
            <line
              x1='25'
              y1='75'
              x2='15'
              y2='85'
              strokeWidth='2'
              strokeLinecap='round'
              opacity='0.4'
            />
            <line
              x1='75'
              y1='75'
              x2='85'
              y2='85'
              strokeWidth='2'
              strokeLinecap='round'
              opacity='0.4'
            />
          </svg>
        </div>
        <div className='onboarding-buttons justify-center'>
          <button className='onboarding-btn primary' onClick={() => handleNavigate('/analyze')}>
            시작하기
          </button>
          <button
            className='onboarding-btn secondary'
            onClick={() => handleNavigate('/how-to-use')}
          >
            사용법 보기
          </button>
        </div>
      </div>

      <style>{`
        .onboarding-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1000;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
          overflow: hidden;
        }

        .onboarding-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(239, 68, 68, 0.15) 45%,
            rgba(239, 68, 68, 0.3) 50%,
            rgba(239, 68, 68, 0.15) 55%,
            transparent 100%
          );
          animation: xrayScan 3s ease-in-out infinite;
        }

        @keyframes xrayScan {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .onboarding-content {
          text-align: center;
          max-width: 1000px;
          padding: 20px;
          position: relative;
          z-index: 1;
        }

        .onboarding-text {
          font-size: 52px;
          font-weight: bold;
          color: #e8e8e8;
          margin-bottom: 80px;
          line-height: 1.5;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .onboarding-icon {
          width: 200px;
          height: 200px;
          margin: 0 auto 80px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.4), inset 0 0 40px rgba(239, 68, 68, 0.15);
          position: relative;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.4), inset 0 0 40px rgba(239, 68, 68, 0.15);
          }
          50% {
            box-shadow: 0 0 60px rgba(239, 68, 68, 0.6), inset 0 0 60px rgba(239, 68, 68, 0.25);
          }
        }

        .onboarding-icon svg {
          width: 100px;
          height: 100px;
          fill: none;
          stroke: #ef4444;
          stroke-width: 2;
          filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.7));
        }

        .onboarding-logo {
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 4px;
          text-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
        }

        .onboarding-buttons {
          display: flex;
          gap: 16px;
          margin-top: 60px;
        }

        .onboarding-btn {
          padding: 16px 40px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .onboarding-btn.primary {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
        }

        .onboarding-btn.primary:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
          transform: scale(1.02);
        }

        .onboarding-btn.secondary {
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .onboarding-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 768px) {
          .onboarding-text {
            font-size: 32px;
            margin-bottom: 60px;
          }

          .onboarding-icon {
            width: 150px;
            height: 150px;
            margin-bottom: 60px;
          }

          .onboarding-icon svg {
            width: 75px;
            height: 75px;
          }

          .onboarding-logo {
            font-size: 28px;
          }

          .onboarding-buttons {
            flex-direction: column;
            gap: 12px;
            margin-top: 40px;
          }

          .onboarding-btn {
            padding: 14px 32px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
