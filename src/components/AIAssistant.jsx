// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, X, Mic, Send, Image, MapPin, FileText, Calendar, User, Sparkles, Brain, Stethoscope, Receipt } from 'lucide-react';

export function AIAssistant() {
  const {
    toast
  } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const locationInputRef = useRef(null);

  // 快捷指令配置
  const quickActions = [{
    id: 'report',
    label: '查看最新报告',
    icon: FileText,
    color: 'bg-blue-500',
    action: () => handleQuickAction('report')
  }, {
    id: 'capsule',
    label: '生成定制胶囊',
    icon: Sparkles,
    color: 'bg-purple-500',
    action: () => handleQuickAction('capsule')
  }, {
    id: 'appointment',
    label: '预约黄帝内针',
    icon: Calendar,
    color: 'bg-green-500',
    action: () => handleQuickAction('appointment')
  }, {
    id: 'doctor',
    label: '联系人工医生',
    icon: User,
    color: 'bg-orange-500',
    action: () => handleQuickAction('doctor')
  }, {
    id: 'invoice',
    label: '开电子发票',
    icon: Receipt,
    color: 'bg-red-500',
    action: () => handleQuickAction('invoice')
  }];

  // 初始化欢迎消息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'assistant',
        content: '您好！我是您的AI健康助手小智，很高兴为您服务！我可以帮您查看健康报告、生成定制方案、预约专家等服务。请问有什么可以帮助您的吗？',
        timestamp: new Date(),
        hasVoice: true
      };
      setMessages([welcomeMessage]);
      // 模拟语音播放
      setTimeout(() => {
        playVoiceMessage(welcomeMessage.content);
      }, 500);
    }
  }, [isOpen, messages.length]);

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const playVoiceMessage = text => {
    // 模拟语音播放
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };
  const handleQuickAction = action => {
    let response = '';
    switch (action) {
      case 'report':
        response = '正在为您生成最新的健康报告...报告显示您的整体健康评分为92分，各项指标良好。建议继续保持当前的健康生活方式。';
        break;
      case 'capsule':
        response = '正在分析您的健康数据，为您生成个性化定制胶囊方案...根据您的体质分析，推荐NMN细胞活化精华辅酶Q10组合，预计可提升细胞活力35%。';
        break;
      case 'appointment':
        response = '正在为您查询黄帝内针专家排班...张医生明天上午10:00有空档，是否需要为您预约？';
        break;
      case 'doctor':
        response = '正在为您连接人工医生...请稍候，专业医生将在1分钟内为您服务。';
        break;
      case 'invoice':
        response = '正在为您生成电子发票...请提供您的开票信息（抬头、税号等），我将为您处理。';
        break;
    }
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: quickActions.find(a => a.id === action)?.label || '',
      timestamp: new Date()
    };
    const assistantMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: response,
      timestamp: new Date(),
      hasVoice: true
    };
    setMessages(prev => [...prev, userMessage, assistantMessage]);

    // 播放语音回复
    setTimeout(() => {
      playVoiceMessage(response);
    }, 1000);
  };
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const responses = ['我理解您的需求，让我为您分析一下...', '根据您的描述，我建议您...', '这是一个很好的问题，我来为您详细解答...', '基于您的健康数据，我推荐以下方案...'];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
        hasVoice: true
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // 播放语音回复
      setTimeout(() => {
        playVoiceMessage(randomResponse);
      }, 500);
    }, 1500);
  };
  const handleVoiceInput = () => {
    if (!isRecording) {
      // 开始录音
      setIsRecording(true);
      toast({
        title: "开始录音",
        description: "请说出您的问题..."
      });

      // 模拟录音结束
      setTimeout(() => {
        setIsRecording(false);
        const simulatedText = "我想查看我的健康报告";
        setInputText(simulatedText);
        toast({
          title: "录音完成",
          description: "已识别您的语音"
        });
      }, 3000);
    } else {
      // 停止录音
      setIsRecording(false);
    }
  };
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      toast({
        title: "图片上传",
        description: `已上传图片: ${file.name}`
      });
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: `[图片] ${file.name}`,
        timestamp: new Date(),
        isImage: true,
        imageUrl: URL.createObjectURL(file)
      };
      setMessages(prev => [...prev, userMessage]);

      // 模拟AI分析图片
      setTimeout(() => {
        const assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: '我已经收到您上传的图片，正在为您分析...根据图片内容，建议您进一步咨询专业医生进行详细检查。',
          timestamp: new Date(),
          hasVoice: true
        };
        setMessages(prev => [...prev, assistantMessage]);
        playVoiceMessage(assistantMessage.content);
      }, 2000);
    }
  };
  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {
          latitude,
          longitude
        } = position.coords;
        toast({
          title: "位置获取成功",
          description: `纬度: ${latitude.toFixed(6)}, 经度: ${longitude.toFixed(6)}`
        });
        const userMessage = {
          id: Date.now(),
          type: 'user',
          content: `[位置] 纬度: ${latitude.toFixed(6)}, 经度: ${longitude.toFixed(6)}`,
          timestamp: new Date(),
          isLocation: true
        };
        setMessages(prev => [...prev, userMessage]);

        // 模拟AI基于位置推荐
        setTimeout(() => {
          const assistantMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: `已获取您的位置信息。根据您的位置，为您推荐附近的合作医院：北京协和医院（距离2.3km）、北京大学第一医院（距离3.1km）。需要为您预约吗？`,
            timestamp: new Date(),
            hasVoice: true
          };
          setMessages(prev => [...prev, assistantMessage]);
          playVoiceMessage(assistantMessage.content);
        }, 1500);
      }, error => {
        toast({
          title: "位置获取失败",
          description: error.message,
          variant: "destructive"
        });
      });
    } else {
      toast({
        title: "不支持定位",
        description: "您的浏览器不支持地理定位功能",
        variant: "destructive"
      });
    }
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <>
      {/* 悬浮按钮 */}
      {!isOpen && <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group" style={{
      backdropFilter: 'blur(12px)',
      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.9), rgba(217, 119, 6, 0.9))',
      animation: 'breathe 2.8s ease-in-out infinite'
    }}>
          {/* DNA双螺旋动画 */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 border-2 border-yellow-200 rounded-full animate-spin" style={{
              animationDuration: '3s'
            }}></div>
                <div className="absolute inset-2 border-2 border-yellow-300 rounded-full animate-spin" style={{
              animationDuration: '2s',
              animationDirection: 'reverse'
            }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>
            {/* 呼吸灯效果 */}
            <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-30 animate-ping"></div>
          </div>
        </button>}

      {/* 全屏会话窗口 */}
      {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          {/* 会话窗口 */}
          <div className="relative w-full max-w-2xl h-[80vh] max-h-[700px] rounded-3xl shadow-2xl overflow-hidden flex flex-col" style={{
        backdropFilter: 'blur(20px)',
        background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(5, 46, 34, 0.95))'
      }}>
            {/* 顶部渐变星空 */}
            <div className="relative h-20 bg-gradient-to-b from-indigo-900/50 via-purple-900/30 to-transparent">
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}></div>)}
              </div>
              
              {/* 标题栏 */}
              <div className="relative flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-yellow-800" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI健康助手</h3>
                    <p className="text-yellow-200 text-sm">小智在线</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
                    {message.isImage && <div className="mb-2">
                        <img src={message.imageUrl} alt="上传的图片" className="rounded-lg max-w-full h-40 object-cover" />
                      </div>}
                    {message.isLocation && <div className="mb-2 flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">位置信息</span>
                      </div>}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.type === 'assistant' && message.hasVoice && <button onClick={() => playVoiceMessage(message.content)} className="ml-2 text-xs opacity-70 hover:opacity-100">
                          🔊
                        </button>}
                    </div>
                  </div>
                </div>)}
              
              {isTyping && <div className="flex justify-start">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{
                  animationDelay: '0.1s'
                }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{
                  animationDelay: '0.2s'
                }}></div>
                    </div>
                  </div>
                </div>}
              <div ref={messagesEndRef} />
            </div>

            {/* 快捷指令条 */}
            <div className="p-4 border-t border-white/20">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.map(action => {
              const Icon = action.icon;
              return <button key={action.id} onClick={action.action} className={`${action.color} text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity flex items-center space-x-1`}>
                      <Icon className="w-3 h-3" />
                      <span>{action.label}</span>
                    </button>;
            })}
              </div>

              {/* 输入区域 */}
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="输入您的问题..." className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-yellow-200 focus:outline-none focus:border-yellow-400 transition-colors" />
                </div>
                
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                
                <input ref={locationInputRef} type="file" className="hidden" />

                <button onClick={() => fileInputRef.current?.click()} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" title="发送图片">
                  <Image className="w-4 h-4 text-white" />
                </button>

                <button onClick={handleLocationShare} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" title="分享位置">
                  <MapPin className="w-4 h-4 text-white" />
                </button>

                <button onClick={handleVoiceInput} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-white/20 hover:bg-white/30'}`} title={isRecording ? '停止录音' : '语音输入'}>
                  <Mic className="w-4 h-4 text-white" />
                </button>

                <button onClick={handleSendMessage} disabled={!inputText.trim()} className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 rounded-full flex items-center justify-center transition-colors" title="发送消息">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>}

      {/* 添加CSS动画 */}
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(250, 204, 21, 0.5);
          }
        }
      `}</style>
    </>;
}