import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#2A2A2A] border-4 border-[#4A4A4A] p-8 text-center" style={{ boxShadow: '8px 8px 0 #0A0A0A' }}>
            <div className="w-16 h-16 bg-[#FFD700] border-4 border-[#CC9900] mx-auto mb-6 flex items-center justify-center" style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
              <span className="text-4xl font-black text-[#1A1A1A]">!</span>
            </div>
            <h2 className="text-2xl font-black text-[#FFD700] mb-4 tracking-wider" style={{ textShadow: '3px 3px 0 #1A1A1A' }}>
              出错了
            </h2>
            <p className="text-[#E8E8E8] mb-6 leading-relaxed">
              抱歉，页面加载时发生了错误。请刷新页面重试。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#6B8E23] border-4 border-[#4A6B1F] text-white font-black py-4 px-6 hover:bg-[#7D9E35] hover:scale-105 active:scale-95 transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #3A5B0F' }}
            >
              刷新页面
            </button>
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-[#8A8A8A] text-sm cursor-pointer hover:text-[#AAAAAA] transition-colors">
                  错误详情
                </summary>
                <pre className="mt-2 text-xs text-[#6A6A6A] bg-[#1A1A1A] p-4 overflow-auto max-h-40">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
