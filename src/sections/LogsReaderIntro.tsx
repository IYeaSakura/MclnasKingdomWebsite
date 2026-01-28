import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Terminal, ExternalLink, Shield, Activity, Database, ArrowRight, FileText, GitBranch, Zap, Upload, TrendingUp, BarChart3, CheckCircle, Lock, Smartphone, FolderTree, Trash2 } from 'lucide-react';

export function LogsReaderIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalStep, setTerminalStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setTerminalStep(0);
      return;
    }

    const steps = [0, 1, 2, 3, 4, 5];
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setTerminalStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="logs"
      className="py-20 min-h-screen relative overflow-hidden"
      style={{
        imageRendering: 'pixelated',
        backgroundImage: 'linear-gradient(to bottom, #f8f9fa 0%, #e8e8e8 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#FFD700]/10 border-4 border-[#FFD700]/20" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-[#FFA500]/10 border-4 border-[#FFA500]/20" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#FF6B6B]/10 border-4 border-[#FF6B6B]/20" />
        <div className="absolute bottom-20 right-1/4 w-18 h-18 bg-[#4ECDC4]/10 border-4 border-[#4ECDC4]/20" />
      </div>

      <div className="section-container relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-[#4A4A4A] border-4 border-[#2A2A2A] mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            <Terminal className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">日志分析器</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-black text-gray-900 mb-4 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #B8860B' }}
          >
            MC部落日志分析器
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            专为MC部落服务器设计的Minecraft客户端日志分析工具
          </p>
        </div>

        <Card className="mb-12 border-4 border-[#4A4A4A] bg-white shadow-[6px_6px_0_#2A2A2A]">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  什么是日志分析器？
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  MC部落日志分析器是一个强大的工具，专为Minecraft中国版MC部落服务器玩家设计。
                  通过上传您的客户端日志文件，可以自动分析PVP击杀记录和商会交易数据，
                  生成详细的统计报告和可视化图表。支持多种导出格式，方便您进行数据分析和分享。
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => window.open('https://mclans-logsreader.sakurain.net', '_blank')}
                    className="group px-6 py-3 text-base font-bold rounded-lg border-4 border-[#2A2A2A] text-white bg-[#4A4A4A] hover:bg-[#5A5A5A] hover:border-[#3A3A3A] hover:-translate-y-0.5 transition-all duration-200"
                    style={{ boxShadow: '6px 6px 0 #2A2A2A' }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2 inline" />
                    访问日志分析器
                  </button>
                  <button
                    onClick={() => window.open('https://github.com/IYeaSakura/MclansLogsAnalyzer', '_blank')}
                    className="group px-6 py-3 text-base font-bold rounded-lg border-4 border-[#2A2A2A] text-white bg-[#6A6A6A] hover:bg-[#7A7A7A] hover:border-[#4A4A4A] hover:-translate-y-0.5 transition-all duration-200"
                    style={{ boxShadow: '6px 6px 0 #2A2A2A' }}
                  >
                    <GitBranch className="w-4 h-4 mr-2 inline" />
                    项目开源地址
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm text-green-400 shadow-inner min-h-[200px] flex flex-col justify-start">
                  <div className="space-y-2">
                    {terminalStep >= 0 && <p className="text-yellow-400">📤 上传日志文件</p>}
                    {terminalStep >= 1 && <p className="text-blue-400">🔍 正在分析...</p>}
                    {terminalStep >= 2 && <p className="text-green-400">✓ PvP击杀记录: 156条</p>}
                    {terminalStep >= 3 && <p className="text-green-400">✓ 商会交易记录: 89条</p>}
                    {terminalStep >= 4 && <p className="text-purple-400">📊 生成统计报告</p>}
                    {terminalStep >= 5 && <p className="text-cyan-400">💾 导出为 Excel/PDF/JSON</p>}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className={`text-center mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-3xl font-bold text-gray-900 mb-2" style={{ textShadow: '3px 3px 0 #B8860B' }}>
            核心功能
          </h3>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto" style={{ boxShadow: '2px 2px 0 #B8860B' }} />
        </div>

        <div className="mb-12">
          <div className={`transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Card className="mb-8 border-4 border-[#4A4A4A] bg-white shadow-[6px_6px_0_#2A2A2A]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-red-100 border-4 border-red-200 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">PvP 击杀分析</h4>
                    <p className="text-gray-600">详细记录和分析您的战斗数据</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">多格式导出</h5>
                      <p className="text-sm text-gray-600">Excel表格、PDF报告、PNG统计图、JSON结构化数据</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">智能统计</h5>
                      <p className="text-sm text-gray-600">击杀/死亡排行榜、K/D比率、24小时活跃时段</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">数据去重</h5>
                      <p className="text-sm text-gray-600">基于MD5哈希自动去重，确保跨文件数据准确性</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">安全增强</h5>
                      <p className="text-sm text-gray-600">严格的内容验证，防止伪装日志文件上传</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <BarChart3 className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">可视化图表</h5>
                      <p className="text-sm text-gray-600">击杀热力图、武器分布、玩家活跃度矩阵</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Database className="w-5 h-5 text-cyan-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">跨文件合并</h5>
                      <p className="text-sm text-gray-600">支持同时上传多个日志文件，自动合并分析结果</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-4 border-[#4A4A4A] bg-white shadow-[6px_6px_0_#2A2A2A]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-green-100 border-4 border-green-200 flex items-center justify-center">
                    <Database className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">商会交易分析</h4>
                    <p className="text-gray-600">全面统计您的交易记录</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">全面统计</h5>
                      <p className="text-sm text-gray-600">收购/出售双模式，自动计算净收益和贸易逆差</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <FileText className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">多维报表</h5>
                      <p className="text-sm text-gray-600">PDF详细报告、JSON结构化数据、PNG图表、Excel表格</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Activity className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">玩家画像</h5>
                      <p className="text-sm text-gray-600">交易金额、商品种类、活跃度评分、交易频率分析</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">特殊字符处理</h5>
                      <p className="text-sm text-gray-600">智能清理Minecraft颜色代码、称号前缀、VIP等级</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">稀有商品识别</h5>
                      <p className="text-sm text-gray-600">自动识别交易次数低于阈值的稀有商品</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">智能分类</h5>
                      <p className="text-sm text-gray-600">自动识别商品类别，支持自定义商品分类规则</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-12 border-4 border-[#4A4A4A] bg-white shadow-[6px_6px_0_#2A2A2A]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 border-4 border-blue-blue-200 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Web 版专属特性</h4>
                    <p className="text-gray-600">高性能、安全、易用的Web界面</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">高性能API</h5>
                      <p className="text-sm text-gray-600">FastAPI驱动，支持并发处理与异步任务（最大3并发）</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Lock className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">企业级安全</h5>
                      <p className="text-sm text-gray-600">路径遍历防护、文件类型验证、灰名单机制、速率限制</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Terminal className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">实时通信</h5>
                      <p className="text-sm text-gray-600">WebSocket推送分析进度，支持断线重连和心跳检测</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">响应式设计</h5>
                      <p className="text-sm text-gray-600">适配PC、平板、手机多端，支持拖拽上传</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <FolderTree className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">审计系统</h5>
                      <p className="text-sm text-gray-600">完整的SQLite审计日志，支持灰名单IP监控和黑名单管理</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#FFD700] hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <Trash2 className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">自动清理</h5>
                      <p className="text-sm text-gray-600">定时任务自动清理过期文件，防止磁盘空间耗尽</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-4 border-[#4A4A4A] bg-gradient-to-r from-blue-50 to-purple-50 shadow-[6px_6px_0_#2A2A2A]">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  开始使用
                </h3>
                <p className="text-gray-600 mb-6">
                  点击下方按钮即可访问日志分析器，上传您的客户端日志文件进行分析。
                  无需安装任何软件，直接在浏览器中使用。
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => window.open('https://mclans-logsreader.sakurain.net', '_blank')}
                    className="group px-8 py-4 text-base font-bold rounded-lg border-4 border-[#2A2A2A] text-white bg-[#4A4A4A] hover:bg-[#5A5A5A] hover:border-[#3A3A3A] hover:-translate-y-0.5 transition-all duration-200"
                    style={{ boxShadow: '6px 6px 0 #2A2A2A' }}
                  >
                    <Upload className="w-4 h-4 mr-2 inline" />
                    立即使用
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </button>
                  <button
                    onClick={() => window.open('https://github.com/IYeaSakura/MclansLogsAnalyzer', '_blank')}
                    className="group px-8 py-4 text-base font-bold rounded-lg border-4 border-[#2A2A2A] text-white bg-[#6A6A6A] hover:bg-[#7A7A7A] hover:border-[#4A4A4A] hover:-translate-y-0.5 transition-all duration-200"
                    style={{ boxShadow: '6px 6px 0 #2A2A2A' }}
                  >
                    <GitBranch className="w-4 h-4 mr-2 inline" />
                    查看源码
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-white rounded-lg p-4 shadow-md border-2 border-gray-200">
                  <div className="text-sm text-gray-500 mb-2 font-bold">访问地址</div>
                  <div className="text-xs text-gray-700 break-all font-mono bg-gray-100 p-2 rounded border-2 border-gray-300">
                    https://mclans-logsreader.sakurain.net
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
