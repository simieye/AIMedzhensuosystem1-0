// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, X, Send, Mic, MicOff, Camera, Image, FileText, Calendar, ShoppingBag, Stethoscope, Receipt, Package, User, Sparkles } from 'lucide-react';

export function AIAssistant({
  onQuery,
  onAction,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [digitalTwinData, setDigitalTwinData] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    // 初始化数字孪生数据
    setDigitalTwinData({
      biologicalAge: 52.3,
      change: -0.8,
      healthScore: 92,
      lastUpdate: new Date()
    });

    // 自动欢迎消息
    const timer = setTimeout(() => {
      addMessage({
        type: 'ai',
        content: '您好，我是您的私人长寿医生·小臻。已同步您最新数字孪生数据，生物龄52.3岁（较上月-0.8）。',
        timestamp: new Date()
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const addMessage = message => {
    setMessages(prev => [...prev, message]);
  };
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage = {
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };
    addMessage(userMessage);
    setInputText('');
    setIsTyping(true);
    try {
      // 模拟AI响应
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await generateAIResponse(inputText);
      addMessage({
        type: 'ai',
        content: response.text,
        action: response.action,
        timestamp: new Date()
      });

      // 执行RPA操作
      if (response.action) {
        onAction?.(response.action);
      }
    } catch (error) {
      addMessage({
        type: 'ai',
        content: '抱歉，我暂时无法处理您的请求，请稍后再试。',
        timestamp: new Date()
      });
    } finally {
      setIsTyping(false);
    }
  };
  const generateAIResponse = async query => {
    const lowerQuery = query.toLowerCase();

    // 健康数据查询
    if (lowerQuery.includes('心率') || lowerQuery.includes('心脏')) {
      return {
        text: '您的心率变异性HRV 42ms（偏低），推荐本周3次HIIT运动，已为您生成方案。',
        action: {
          type: 'create_plan',
          data: {
            type: 'exercise',
            frequency: 'weekly',
            intensity: 'HIIT'
          }
        }
      };
    }

    // 肝功能查询
    if (lowerQuery.includes('肝功能') || lowerQuery.includes('肝')) {
      return {
        text: 'ALT 38U/L，轻度升高，建议加服奶蓟草胶囊。根据《New England Journal of Medicine 2024》研究，ALT>40U/L需关注肝脏健康。',
        action: {
          type: 'recommend_product',
          data: {
            product: 'milk_thistle',
            dosage: '300mg/day'
          }
        }
      };
    }

    // 预约相关
    if (lowerQuery.includes('预约') || lowerQuery.includes('针灸')) {
      return {
        text: '已为您查询到北大医院国医大师团队本周六上午有空档，是否需要我帮您预约？',
        action: {
          type: 'booking',
          data: {
            service: 'acupuncture',
            time: 'saturday_morning'
          }
        }
      };
    }

    // 产品购买
    if (lowerQuery.includes('买') || lowerQuery.includes('订购') || lowerQuery.includes('抗衰保护剂')) {
      return {
        text: '根据您NAD+水平28.3（偏低），推荐NMN剂量900mg/日，已生成专属配方。是否立即下单？',
        action: {
          type: 'order',
          data: {
            product: 'nmn_custom',
            dosage: '900mg',
            quantity: 3
          }
        }
      };
    }

    // 检测报告
    if (lowerQuery.includes('报告') || lowerQuery.includes('检测')) {
      return {
        text: '您最新的检测报告显示：肺部结节3mm（良性可能98.7%），已加入数字孪生监控。需要我为您详细解读吗？',
        action: {
          type: 'view_report',
          data: {
            report_id: 'latest'
          }
        }
      };
    }

    // 默认响应
    return {
      text: '我是您的私人长寿医生小臻，可以帮您：\n• 解读检测报告\n• 制定个性化方案\n• 预约专家服务\n• 推荐抗衰产品\n• 监控健康数据\n\n请问有什么可以帮助您的？'
    };
  };
  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "录音结束",
        description: "正在识别语音..."
      });
    } else {
      setIsRecording(true);
      toast({
        title: "开始录音",
        description: "请说出您的需求..."
      });
      // 模拟录音结束
      setTimeout(() => {
        setIsRecording(false);
        setInputText('帮我查看最新的健康报告');
        toast({
          title: "识别成功",
          description: "语音已转换为文字"
        });
      }, 3000);
    }
  };
  const handleImageUpload = () => {
    toast({
      title: "上传图片",
      description: "请选择检测报告图片进行AI解析"
    });
  };
  const handleQuickAction = action => {
    const actions = {
      report: '查看最新报告',
      formula: '生成定制胶囊',
      booking: '预约黄帝内针',
      doctor: '联系人工医生',
      invoice: '开电子发票'
    };
    setInputText(actions[action]);
  };
  const quickActions = [{
    id: 'report',
    icon: FileText,
    label: '查看最新报告'
  }, {
    id: 'formula',
    icon: Sparkles,
    label: '生成定制胶囊'
  }, {
    id: 'booking',
    icon: Calendar,
    label: '预约黄帝内针'
  }, {
    id: 'doctor',
    icon: Stethoscope,
    label: '联系人工医生'
  }, {
    id: 'invoice',
    icon: Receipt,
    label: '开电子发票'
  }];
  if (!isOpen) {
    return <div className={`fixed bottom-20 right-5 z-50 ${className}`}>
        {/* 悬浮按钮 */}
        <button onClick={() => setIsOpen(true)} className="relative w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
          {/* 呼吸灯效果 */}
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 bg-yellow-500 rounded-full animate-pulse"></div>
          
          {/* DNA双螺旋图标 */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-6 h-6 border-2 border-white rounded-full animate-spin" style={{
              animationDuration: '3s'
            }}></div>
              <div className="absolute inset-0 w-6 h-6 border-2 border-white rounded-full animate-spin" style={{
              animationDuration: '3s',
              animationDirection: 'reverse',
              borderTopColor: 'transparent'
            }}></div>
            </div>
          </div>

          {/* 悬浮提示 */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            私人长寿医生·小臻
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>
      </div>;
  }
  return <div className={`fixed inset-0 z-50 flex items-end justify-end ${className}`}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

      {/* AI会话窗 */}
      <div className={`relative w-full max-w-md h-[600px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-t-3xl shadow-2xl flex flex-col ${isMinimized ? 'h-16' : ''}`}>
        {/* 顶部栏 */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            {/* 数字孪生小头像 */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {/* 在线状态呼吸灯 */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-white font-semibold">私人长寿医生·小臻</h3>
              {digitalTwinData && <p className="text-xs text-gray-400">
                  生物龄 {digitalTwinData.biologicalAge}岁 ({digitalTwinData.change > 0 ? '+' : ''}{digitalTwinData.change})
                </p>}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-gray-400 hover:text-white">
              <div className={`w-4 h-1 bg-current rounded-full transition-transform ${isMinimized ? 'rotate-90' : ''}`}></div>
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && <>
            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`px-4 py-3 rounded-2xl ${message.type === 'user' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'}`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                    </p>
                  </div>
                </div>)}
              
              {isTyping && <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-3 rounded-2xl">
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
            <div className="px-4 py-2 border-t border-slate-700">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {quickActions.map(action => {
              const Icon = action.icon;
              return <button key={action.id} onClick={() => handleQuickAction(action.id)} className="flex items-center space-x-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs whitespace-nowrap transition-colors">
                    <Icon className="w-3 h-3" />
                    <span>{action.label}</span>
                  </button>;
            })}
              </div>
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center space-x-2">
                <button onClick={handleImageUpload} className="p-2 text-gray-400 hover:text-white">
                  <Camera className="w-5 h-5" />
                </button>
                <button onClick={handleVoiceRecord} className={`p-2 ${isRecording ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input ref={inputRef} type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="输入您的问题..." className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40" />
                <button onClick={handleSendMessage} disabled={!inputText.trim() || isTyping} className="p-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>}
      </div>
    </div>;
}