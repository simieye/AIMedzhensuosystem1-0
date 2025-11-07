// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { X, Send, Mic, Volume2, MessageCircle, Sparkles, Activity, Heart, Brain } from 'lucide-react';

export function AIAssistant({
  onSendMessage,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const speechSynthesis = window.speechSynthesis;
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognition = recognition ? new recognition() : null;

  // 用户健康数据
  const healthData = {
    biologicalAge: 52.3,
    monthlyChange: -0.8,
    healthScore: 92,
    lastUpdate: '2024-01-15'
  };
  useEffect(() => {
    if (speechRecognition) {
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'zh-CN';
      speechRecognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      speechRecognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "语音识别失败",
          description: "请检查麦克风权限或重试",
          variant: "destructive"
        });
      };
      speechRecognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);
  useEffect(() => {
    // 自动滚动到底部
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const speak = (text, onStart, onEnd) => {
    if ('speechSynthesis' in window) {
      // 停止当前语音
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.onstart = () => {
        setIsSpeaking(true);
        onStart?.();
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "语音功能不可用",
        description: "您的浏览器不支持语音合成",
        variant: "destructive"
      });
    }
  };
  const handleOpen = () => {
    setIsOpen(true);
    // 添加欢迎消息
    const welcomeMessage = {
      id: Date.now(),
      type: 'assistant',
      text: `您好，我是您的私人长寿医生·小臻。已同步您最新数字孪生数据，生物龄${healthData.biologicalAge}岁（较上月${healthData.monthlyChange > 0 ? '+' : ''}${healthData.monthlyChange}）`,
      timestamp: new Date(),
      hasHealthData: true
    };
    setMessages([welcomeMessage]);

    // 语音播报欢迎语
    setTimeout(() => {
      speak(welcomeMessage.text);
    }, 500);
  };
  const handleClose = () => {
    setIsOpen(false);
    // 停止语音
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
    if (speechRecognition) {
      speechRecognition.stop();
    }
    setIsSpeaking(false);
    setIsListening(false);
  };
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        text: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      // 语音播报回复
      speak(aiResponse);
    }, 1000);
    onSendMessage?.(inputText);
  };
  const generateAIResponse = userInput => {
    const input = userInput.toLowerCase();
    if (input.includes('健康') || input.includes('身体')) {
      return `根据您最新的数字孪生数据分析，您的整体健康评分为${healthData.healthScore}分，生物年龄${healthData.biologicalAge}岁，比实际年龄年轻${35 - healthData.biologicalAge}岁。建议继续保持良好的生活习惯。`;
    } else if (input.includes('年龄') || input.includes('衰老')) {
      return `您的生物年龄为${healthData.biologicalAge}岁，相比上月${healthData.monthlyChange > 0 ? '增加' : '���少'}了${Math.abs(healthData.monthlyChange)}岁。我们的抗衰老方案正在为您产生积极效果。`;
    } else if (input.includes('建议') || input.includes('怎么办')) {
      return '基于您的健康数据，我建议您：1）保持规律作息，每天7-8小时睡眠；2）适度运动，每周至少150分钟有氧运动；3）均衡饮食，控制热量摄入；4）定期进行健康检测。';
    } else if (input.includes('检测') || input.includes('报告')) {
      return '您的最新检测报告已更新。主要指标都在正常范围内，心血管功能良好，新陈代谢稳定。建议3个月后进行下一次全面检测。';
    } else {
      return '我是您的私人长寿医生小臻，可以为您提供健康咨询、抗衰老建议、检测报告解读等服务。请问有什么可以帮助您的？';
    }
  };
  const handleVoiceInput = () => {
    if (!speechRecognition) {
      toast({
        title: "语音识别不可用",
        description: "您的浏览器不支持语音识别",
        variant: "destructive"
      });
      return;
    }
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      speechRecognition.start();
      setIsListening(true);
    }
  };
  const handleStopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <>
      {/* 悬浮按钮 */}
      {!isOpen && <button onClick={handleOpen} className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-2xl backdrop-blur-md bg-opacity-90 border border-amber-200 flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 ${className}`} style={{
      animation: 'float 3s ease-in-out infinite, glow 2.8s ease-in-out infinite'
    }}>
          {/* DNA双螺旋图标 */}
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-800" />
            </div>
            {/* DNA旋转动画 */}
            <div className="absolute inset-0 border-2 border-amber-600 rounded-full opacity-60" style={{
          animation: 'rotate 4s linear infinite'
        }}></div>
            <div className="absolute inset-1 border border-amber-400 rounded-full opacity-40" style={{
          animation: 'rotate 3s linear infinite reverse'
        }}></div>
          </div>
          
          {/* 呼吸光晕效果 */}
          <div className="absolute inset-0 rounded-full bg-amber-400 opacity-30" style={{
        animation: 'pulse 2.8s ease-in-out infinite'
      }}></div>
        </button>}

      {/* 全屏会话窗口 */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl h-[80vh] max-h-[600px] bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl shadow-2xl backdrop-blur-xl border border-emerald-600 flex flex-col overflow-hidden">
            {/* 头部 */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 p-6 border-b border-emerald-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">私人长寿医生·小臻</h3>
                    <p className="text-emerald-200 text-sm">AI健康顾问 · 在线</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isSpeaking && <button onClick={handleStopSpeaking} className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-colors">
                      <Volume2 className="w-4 h-4" />
                    </button>}
                  <button onClick={handleClose} className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-700 text-white'}`}>
                    {message.hasHealthData && <div className="mb-3 p-3 bg-emerald-600 rounded-lg">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>生物年龄: {healthData.biologicalAge}岁</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Activity className="w-4 h-4" />
                            <span>{healthData.monthlyChange > 0 ? '+' : ''}{healthData.monthlyChange}岁</span>
                          </div>
                        </div>
                      </div>}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>)}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t border-emerald-600 bg-emerald-800">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="输入您的问题..." className="w-full px-4 py-3 bg-emerald-700 text-white placeholder-emerald-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 border border-emerald-600" />
                </div>
                <button onClick={handleVoiceInput} className={`p-3 rounded-full transition-colors ${isListening ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}>
                  <Mic className="w-5 h-5" />
                </button>
                <button onClick={handleSendMessage} disabled={!inputText.trim()} className="p-3 bg-amber-500 text-white rounded-full hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {isListening && <div className="mt-2 text-center text-emerald-300 text-sm">
                  正在听取您的语音...
                </div>}
            </div>
          </div>
        </div>}

      {/* CSS动画样式 */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.6);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>;
}