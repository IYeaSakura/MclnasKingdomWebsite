import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Mail, CheckCircle } from 'lucide-react';

export function CTA() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = '准备好开始你的冒险了吗？';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-[#0071e3] to-[#0056b3] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Typing Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 min-h-[60px]">
            {displayText}
            <span className="animate-pulse">|</span>
          </h2>

          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            加入数千名玩家。建立你的帝国。创造历史。
            <br />
            在王国之争的世界中，每个人都能成为传奇
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="输入您的邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 text-lg rounded-xl border-0 shadow-lg"
                disabled={isSubmitted}
              />
            </div>
            <Button
              type="submit"
              className={`h-14 px-8 text-lg rounded-xl transition-all duration-300 ${
                isSubmitted
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#ff6f2c] hover:bg-[#e85300]'
              }`}
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  已提交
                </>
              ) : (
                <>
                  立即加入
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Features */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            {[
              { icon: Sparkles, label: '免费游玩' },
              { icon: Sparkles, label: '持续更新' },
              { icon: Sparkles, label: '活跃社区' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="w-8 h-8 text-white/60 mx-auto mb-2" />
                <span className="text-white/60 text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
