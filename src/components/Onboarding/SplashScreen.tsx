import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => onComplete(), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </div>
      
      {/* Content */}
      <div 
        className={`text-center transition-all duration-1000 ${
          showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
          <span className="text-4xl">💕</span>
        </div>
        <h1 className="text-6xl font-dancing font-bold text-white mb-4 tracking-wide">
          AjnabiCam
        </h1>
        <p className="text-xl text-white/90 font-poppins italic">
          Meet your new friend
        </p>
      </div>
    </div>
  );
}