// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Send, Mic, MicOff, User, Bot, Stethoscope, Clock, CheckCircle, AlertTriangle, Activity, Heart, Brain } from 'lucide-react';

export function AIMedicalConsultation({
  onConsultationComplete,
  initialSymptoms = []
}) {
  const {
    toast
  } = useToast();
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [consultationProgress, setConsultationProgress] = useState(0);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // AI问诊流程
  const consultationSteps = [{
    id: 'greeting',
    question: '您好！我是AI健康助手小智。为了更好地了解您的健康状况，请问您今天主要想咨询什么健康问题？',
    type: 'open',
    options: [],
    icon: Bot
  }, {
    id: 'symptoms',
    question: '请详细描述您的症状，比如：\n• 症状出现的时间和持续时间\n• 症状的严重程度（1-10分）\n• 伴随的其他不适\n• 加重或缓解的因素',
    type: 'open',
    options: [],
    icon: Activity
  }, {
    id: 'body_part',
    question: '请问症状主要出现在哪个部位？',
    type: 'choice',
    options: ['头部', '胸部', '腹部', '四肢', '全身', '其他'],
    icon: User
  }, {
    id: 'duration',
    question: '症状持续多长时间了？',
    type: 'choice',
    options: ['今天', '几天', '一周', '一个月', '更长时间'],
    icon: Clock
  }, {
    id: 'severity',
    question: '请评估症状的严重程度（1-10分，1为最轻，10为最严重）',
    type: 'scale',
    options: ['1-2分（轻微）', '3-4分（轻度）', '5-6分（中度）', '7-8分（重度）', '9-10分（严重）'],
    icon: AlertTriangle
  }, {
    id: 'medical_history',
    question: '您是否有相关的既往病史或正在服用药物？',
    type: 'choice',
    options: ['无', '高血压', '糖尿病', '心脏病', '其他慢性病'],
    icon: Heart
  }, {
    id: 'lifestyle',
    question: '最近的生活习惯是否有变化？比如饮食、睡眠、运动、压力等',
    type: 'open',
    options: [],
    icon: Brain
  }];
  useEffect(() => {
    // 初始化问诊
    startConsultation();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    // 初始化语音识别
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'zh-CN';
      recognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
      };
      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };
    }
  }, []);
  const startConsultation = () => {
    const firstStep = consultationSteps[0];
    const welcomeMessage = {
      id: 'welcome',
      type: 'assistant',
      content: firstStep.question,
      step: 0,
      timestamp: new Date(),
      options: firstStep.options,
      stepType: firstStep.type
    };
    setMessages([welcomeMessage]);
    setCurrentStep(0);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleUserResponse = response => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: response,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 模拟AI处理时间
    setTimeout(() => {
      processResponse(response);
    }, 1500);
  };
  const processResponse = response => {
    const nextStep = currentStep + 1;
    const progress = Math.round(nextStep / consultationSteps.length * 100);
    setConsultationProgress(progress);
    if (nextStep >= consultationSteps.length) {
      // 问诊完成，生成总结
      generateConsultationSummary();
    } else {
      // 继续下一步问诊
      const step = consultationSteps[nextStep];
      const aiMessage = {
        id: Date.now(),
        type: 'assistant',
        content: step.question,
        step: nextStep,
        timestamp: new Date(),
        options: step.options,
        stepType: step.type
      };
      setMessages(prev => [...prev, aiMessage]);
      setCurrentStep(nextStep);
    }
    setIsTyping(false);
  };
  const generateConsultationSummary = () => {
    const summaryMessage = {
      id: 'summary',
      type: 'assistant',
      content: `感谢您的详细描述！根据您的症状信息，我为您生成了初步的健康评估：

📋 **症状总结**
${messages.filter(m => m.type === 'user').map((m, i) => `${i + 1}. ${m.content}`).join('\n')}

🔍 **初步分析**
基于您描述的症状，建议重点关注：
• 可能的病因分析
• 需要进一步检查的项目
• 日常护理建议

💡 **下一步建议**
1. 如症状持续或加重，建议及时就医
2. 可考虑进行相关检查以明确诊断
3. 注意休息，避免过度劳累

您是否希望我为您推荐相关的检查项目或提供更详细的健康建议？`,
      timestamp: new Date(),
      isSummary: true
    };
    setMessages(prev => [...prev, summaryMessage]);
    setConsultationProgress(100);
    onConsultationComplete?.(messages);
  };
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    handleUserResponse(inputText.trim());
  };
  const handleOptionClick = option => {
    handleUserResponse(option);
  };
  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: "语音识别不可用",
        description: "您的浏览器不支持语音识别功能",
        variant: "destructive"
      });
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "开始录音",
        description: "请描述您的症状..."
      });
    }
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const currentMessage = messages[messages.length - 1];
  return <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Stethoscope className="w-5 h-5 mr-2" />
            AI智能问诊
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">
              进度: {consultationProgress}%
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
              width: `${consultationProgress}%`
            }}></div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <div className="flex items-start space-x-2">
                  {message.type === 'assistant' && <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>}
                  <div className="flex-1">
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {message.content}
                    </p>
                    
                    {/* 选项按钮 */}
                    {message.options && message.options.length > 0 && <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => <button key={index} onClick={() => handleOptionClick(option)} className="w-full text-left px-3 py-2 bg-white hover:bg-gray-50 rounded-lg text-sm border transition-colors">
                            {option}
                          </button>)}
                      </div>}

                    {/* 评分选择 */}
                    {message.stepType === 'scale' && <div className="mt-3 grid grid-cols-5 gap-2">
                        {message.options.map((option, index) => <button key={index} onClick={() => handleOptionClick(option)} className="px-2 py-2 bg-white hover:bg-gray-50 rounded-lg text-xs border transition-colors">
                            {option}
                          </button>)}
                      </div>}
                  </div>
                  {message.type === 'user' && <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>}
                </div>
                <p className="text-xs opacity-70 mt-2">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>)}
          
          {isTyping && <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                  animationDelay: '0ms'
                }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                  animationDelay: '150ms'
                }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                  animationDelay: '300ms'
                }}></div>
                  </div>
                </div>
              </div>
            </div>}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        {consultationProgress < 100 && <div className="flex items-center space-x-2">
            <button onClick={handleVoiceInput} className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="请描述您的症状..." className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isTyping} />
            <button onClick={handleSendMessage} disabled={!inputText.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="w-5 h-5" />
            </button>
          </div>}

        {/* 问诊完成 */}
        {consultationProgress >= 100 && <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="font-semibold text-green-800">问诊完成</p>
                <p className="text-green-600 text-sm">AI健康评估已生成</p>
              </div>
            </div>
            <Button onClick={() => startConsultation()}>
              重新问诊
            </Button>
          </div>}
      </CardContent>
    </Card>;
}