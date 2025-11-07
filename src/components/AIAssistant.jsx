// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Mic, MicOff, Send, X, MessageCircle, Sparkles, Heart, Activity, Brain, Shield, Target, ChevronRight, User } from 'lucide-react';

export function AIAssistant() {
  const {
    toast
  } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 快捷指令
  const quickCommands = [{
    id: 'health_check',
    text: '健康检查',
    icon: Heart,
    color: 'bg-red-500',
    action: () => handleQuickCommand('health_check')
  }, {
    id: 'activity_plan',
    text: '运动计划',
    icon: Activity,
    color: 'bg-blue-500',
    action: () => handleQuickCommand('activity_plan')
  }, {
    id: 'brain_training',
    text: '健脑训练',
    icon: Brain,
    color: 'bg-purple-500',
    action: () => handleQuickCommand('brain_training')
  }, {
    id: 'immunity_boost',
    text: '免疫力提升',
    icon: Shield,
    color: 'bg-green-500',
    action: () => handleQuickCommand('immunity_boost')
  }, {
    id: 'goal_setting',
    text: '目标设定',
    icon: Target,
    color: 'bg-yellow-500',
    action: () => handleQuickCommand('goal_setting')
  }, {
    id: 'personal_advice',
    text: '个性化建议',
    icon: User,
    color: 'bg-indigo-500',
    action: () => handleQuickCommand('personal_advice')
  }];

  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      type: 'assistant',
      content: '您好！��是您的AI健康助手小智 🤖\n\n我可以为您提供：\n• 健康数据分析和建议\n• 个性化运动和饮食计划\n• 疾病风险评估和预防\n• 心理健康指导\n• 24/7健康咨询服务\n\n请告诉我您需要什么帮助，或者点击下方的快捷指令开始吧！',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 打开窗口时聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleQuickCommand = commandId => {
    const command = quickCommands.find(cmd => cmd.id === commandId);
    if (command) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: command.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // 模拟AI回复
      setTimeout(() => {
        const aiResponse = generateAIResponse(commandId);
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };
  const generateAIResponse = commandId => {
    const responses = {
      health_check: {
        content: '🔍 正在为您进行健康检查分析...\n\n根据您最近的健康数据：\n• 整体健康评分：92分（优秀）\n• 心血管系统：健康状态良好\n• 免疫力水平：正常范围\n• 睡眠质量：建议改善\n\n建议：保持规律作息，增加有氧运动，每晚保证7-8小时睡眠。',
        suggestions: ['查看详细报告', '制定改善计划', '预约专家咨询']
      },
      activity_plan: {
        content: '🏃‍♂️ 为您推荐个性化运动计划：\n\n**本周运动安排：**\n• 周一：有氧运动30分钟（跑步/游泳）\n• 周三：力量训练45分钟\n• 周五：瑜伽拉伸20分钟\n• 周日：户外徒步1小时\n\n根据您的身体状况，建议从低强度开始，逐步提升运动量。',
        suggestions: ['查看详细计划', '下载运动APP', '购买运动装备']
      },
      brain_training: {
        content: '🧠 健脑训练方案：\n\n**每日训练内容：**\n• 记忆力训练：15分钟\n• 逻辑思维：20分钟\n• 创造力练习：10分钟\n• 冥想放松：5分钟\n\n推荐应用：记忆力游戏、数独、围棋等。坚持训练可提升认知功能20-30%。',
        suggestions: ['开始训练', '查看进度', '分享成果']
      },
      immunity_boost: {
        content: '🛡️ 免疫力提升建议：\n\n**营养补充：**\n• 维生素C：每日1000mg\n• 维生素D：每日2000IU\n• 锌元素：每日15mg\n• 益生菌：每日1杯\n\n**生活习惯：**\n• 规律作息，不熬夜\n• 适度运动，增强体质\n• 保持心情愉快\n• 多晒太阳',
        suggestions: ['购买营养品', '查看食谱', '制定作息表']
      },
      goal_setting: {
        content: '🎯 帮您设定健康目标：\n\n**SMART原则：**\n• S（具体）：减重5公斤\n• M（可衡量）：每周减重0.5kg\n• A（可实现）：通过饮食+运动\n• R（相关性）：改善健康指标\n• T（时限）：3个月内完成\n\n建议将大目标分解为小目标，逐步实现。',
        suggestions: ['设定目标', '制定计划', '跟踪进度']
      },
      personal_advice: {
        content: '👤 基于您的健康数据，个性化建议：\n\n**重点关注：**\n• 心血管健康：有氧运动+低盐饮食\n• 体重管理：控制热量摄入\n• 睡眠改善：规律作息+放松训练\n• 压力管理：冥想+兴趣爱好\n\n**下个月重点：**\n建立运动习惯，改善睡眠质量。',
        suggestions: ['查看详细分析', '定制方案', '预约咨询']
      }
    };
    const response = responses[commandId] || {
      content: '正在为您分析，请稍候...',
      suggestions: []
    };
    return {
      id: Date.now(),
      type: 'assistant',
      content: response.content,
      suggestions: response.suggestions,
      timestamp: new Date()
    };
  };
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: '感谢您的咨询！我正在分析您的问题，为您提供专业的健康建议。请稍等片刻...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast({
        title: "语音识别不可用",
        description: "您的浏览器不支持语音识别功能",
        variant: "destructive"
      });
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => {
      setIsRecording(true);
      toast({
        title: "开始录音",
        description: "请说出您的问题..."
      });
    };
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
      toast({
        title: "录音完成",
        description: "识别结果：" + transcript
      });
    };
    recognition.onerror = event => {
      setIsRecording(false);
      toast({
        title: "语音识别失败",
        description: event.error,
        variant: "destructive"
      });
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
    recognition.start();
  };
  const handleSuggestionClick = suggestion => {
    setInputText(suggestion);
    inputRef.current?.focus();
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <>
      {/* 悬浮按钮 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="relative w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group" style={{
        animation: 'breathe 2.8s ease-in-out infinite',
        backdropFilter: 'blur(10px)',
        background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.9), rgba(217, 119, 6, 0.9))'
      }}>
          {/* DNA双螺旋动画 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-yellow-700 rounded-full" style={{
              animation: 'rotate 3s linear infinite'
            }}></div>
              <div className="absolute inset-1 border-2 border-yellow-800 rounded-full" style={{
              animation: 'rotate 3s linear infinite reverse'
            }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
          </div>
          
          {/* 呼吸灯效果 */}
          <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-30" style={{
          animation: 'pulse 2.8s ease-in-out infinite'
        }}></div>
        </button>
      </div>

      {/* 全屏会话窗口 */}
      {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full h-full max-w-4xl max-h-[90vh] mx-4 my-8 bg-gradient-to-br from-green-900/90 to-emerald-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-700/30 flex flex-col">
            {/* 头部 */}
            <div className="flex items-center justify-between p-6 border-b border-green-700/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-yellow-900" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI健康助手</h2>
                  <p className="text-green-200 text-sm">24/7 在线服务</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-green-200 hover:text-white hover:bg-green-700/30 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-yellow-500 text-white' : 'bg-green-700/50 text-white backdrop-blur-sm'}`}>
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {message.content}
                    </p>
                    {message.suggestions && message.suggestions.length > 0 && <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => <button key={index} onClick={() => handleSuggestionClick(suggestion)} className="w-full text-left px-3 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg text-sm transition-colors flex items-center justify-between group">
                            <span>{suggestion}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>)}
                      </div>}
                    <p className="text-xs opacity-70 mt-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>)}
              {isTyping && <div className="flex justify-start">
                  <div className="bg-green-700/50 text-white rounded-2xl px-4 py-3 backdrop-blur-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{
                  animationDelay: '0ms'
                }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{
                  animationDelay: '150ms'
                }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{
                  animationDelay: '300ms'
                }}></div>
                    </div>
                  </div>
                </div>}
              <div ref={messagesEndRef} />
            </div>

            {/* 快捷指令 */}
            <div className="px-6 py-3 border-t border-green-700/30">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {quickCommands.map(command => {
              const Icon = command.icon;
              return <button key={command.id} onClick={command.action} className={`flex items-center space-x-2 px-3 py-2 ${command.color} text-white rounded-lg whitespace-nowrap hover:opacity-90 transition-opacity`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{command.text}</span>
                    </button>;
            })}
              </div>
            </div>

            {/* 输入区域 */}
            <div className="p-6 border-t border-green-700/30">
              <div className="flex items-center space-x-3">
                <button onClick={handleVoiceInput} className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-green-700/50 text-green-200 hover:bg-green-700/70'}`}>
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input ref={inputRef} type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="输入您的问题..." className="flex-1 px-4 py-3 bg-green-700/30 text-white placeholder-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm" />
                <button onClick={handleSendMessage} disabled={!inputText.trim()} className="p-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>}

      {/* CSS动画 */}
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(250, 204, 21, 0.6);
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