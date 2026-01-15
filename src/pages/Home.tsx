import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Home() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => {
    setIsVisible(false)
    setTimeout(() => {
      navigate('/analyze')
    }, 300)
  }

  return (
    <div
      className="onboarding-container"
      style={{ opacity: isVisible ? 1 : 0 }}
      onClick={handleClick}
    >
      <div className="onboarding-content">
        <div className="onboarding-text">
          당신이 테스트해볼 수 없었던 유저들이<br />
          UX문제를 스캔해드려요.
        </div>
        <div className="onboarding-icon">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="30" x2="70" y2="70" strokeWidth="3" strokeLinecap="round"/>
            <line x1="70" y1="30" x2="30" y2="70" strokeWidth="3" strokeLinecap="round"/>
            <line x1="50" y1="15" x2="50" y2="5" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
            <line x1="50" y1="85" x2="50" y2="95" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
            <line x1="15" y1="50" x2="5" y2="50" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
            <line x1="85" y1="50" x2="95" y2="50" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
            <line x1="25" y1="25" x2="15" y2="15" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
            <line x1="75" y1="25" x2="85" y2="15" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
            <line x1="25" y1="75" x2="15" y2="85" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
            <line x1="75" y1="75" x2="85" y2="85" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
          </svg>
        </div>
        <div className="onboarding-logo">UX-Ray</div>
      </div>

      <style jsx>{`
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
          cursor: pointer;
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
            rgba(255, 255, 255, 0.1) 45%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.1) 55%,
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
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1);
          position: relative;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.5), inset 0 0 60px rgba(255, 255, 255, 0.2);
          }
        }

        .onboarding-icon svg {
          width: 100px;
          height: 100px;
          fill: none;
          stroke: #ffffff;
          stroke-width: 2;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
        }

        .onboarding-logo {
          font-size: 36px;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: 4px;
          text-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
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
        }
      `}</style>
    </div>
  )
}
