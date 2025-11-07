// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Mic, MicOff, ShoppingCart, Volume2, VolumeX, Headphones, MessageCircle, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

export function VoicePurchase({
  products,
  onPurchase,
  onVoiceCommand
}) {
  const {
    toast
  } = useToast;
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognizedCommand, setRecognizedCommand] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  useEffect(() => {
    // 检查语音支持
    const recognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    const synthesisSupported = 'speechSynthesis' in window;
    setSpeechSupported(recognitionSupported && synthesisSupported);
    synthRef.current = window.speechSynthesis;
    if (recognitionSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'zh-CN';
      recognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTranscript(transcript);
        setIsListening(false);
        processVoiceCommand(transcript);
      };
      recognitionRef.current.onerror = event => {
        setIsListening(false);
        toast({
          title: "语音识别错误",
          description: event.error,
          variant: "destructive"
        });
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);
  const processVoiceCommand = command => {
    console.log('Voice command received:', command);
    setRecognizedCommand(command);

    // 添加到对话记录
    const userMessage = {
      type: 'user',
      content: command,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, userMessage]);

    // 解析命令
    let response = '';
    let action = null;
    if (command.includes('购买') || command.includes('下单') || command.includes('买')) {
      // 尝试识别产品
      const product = identifyProduct(command);
      if (product) {
        response = `好的，为您购买${product.name}。价格是${product.price}元，正在为您处理订单...`;
        action = {
          type: 'purchase',
          product
        };
      } else {
        response = '请问您想购买哪款产品？您可以告诉我产品名称或编号。';
      }
    } else if (command.includes('推荐') || command.includes('介绍')) {
      const product = identifyProduct(command);
      if (product) {
        response = `${product.name}是一款${product.description}。主要功效包括${product.benefits?.join('、')}。现在购买享受优惠价${product.price}元。`;
      } else {
        response = '我为您推荐我们的热销产品NMN细胞活化精华，具有很好的抗衰老效果。';
      }
    } else if (command.includes('价格') || command.includes('多少钱')) {
      const product = identifyProduct(command);
      if (product) {
        response = `${product.name}的价格是${product.price}元，原价${product.originalPrice}元，现在购买可以节省${product.originalPrice - product.price}元。`;
      } else {
        response = '请问您想了解哪款产品的价格？';
      }
    } else if (command.includes('优惠') || command.includes('折扣')) {
      response = '现在所有产品都享受限时优惠，NMN产品立省800元，免疫增强产品立省600元。';
    } else if (command.includes('订单') || command.includes('物流')) {
      response = '您可以在个人中心查看订单状态，一般3-5个工作日送达。';
    } else if (command.includes('帮助') || command.includes('怎么用')) {
      response = '您可以说"购买NMN"、"介绍产品"、"价格多少"等指令，我会为您处理。';
    } else {
      response = '抱歉，我没有理解您的意思。您可以说"购买"、"推荐"、"价格"等指令。';
    }

    // 添加AI回复
    const aiMessage = {
      type: 'assistant',
      content: response,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, aiMessage]);

    // 执行动作
    if (action) {
      setTimeout(() => {
        if (action.type === 'purchase') {
          onPurchase?.(action.product);
          const successMessage = {
            type: 'assistant',
            content: `已成功为您购买${action.product.name}！订单正在处理中。`,
            timestamp: new Date()
          };
          setConversation(prev => [...prev, successMessage]);
        }
      }, 2000);
    }

    // 语音播报回复
    speak(response);
    onVoiceCommand?.(command, action);
  };
  const identifyProduct = command => {
    if (!products || products.length === 0) return null;

    // 简单的产品识别逻辑
    for (const product of products) {
      if (command.includes(product.name.toLowerCase()) || command.includes('nmn') && product.name.includes('NMN') || command.includes('免疫') && product.name.includes('免疫') || command.includes('精力') && product.name.includes('精力')) {
        return product;
      }
    }
    return null;
  };
  const speak = text => {
    if (!speechSupported || !synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };
  const startListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      toast({
        title: "语音功能不可用",
        description: "您的浏览器不支持语音识别功能",
        variant: "destructive"
      });
      return;
    }
    try {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
      toast({
        title: "开始语音识别",
        description: "请说出您的购买需求..."
      });
    } catch (error) {
      toast({
        title: "启动失败",
        description: "语音识别启动失败",
        variant: "destructive"
      });
    }
  };
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const quickCommands = [{
    command: '购买NMN',
    description: '购买NMN产品'
  }, {
    command: '推荐产品',
    description: '获取产品推荐'
  }, {
    command: '查询价格',
    description: '了解产品价格'
  }, {
    command: '查看优惠',
    description: '了解优惠信息'
  }];
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Headphones className="w-5 h-5 mr-2" />
            语音购买助手
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={stopSpeaking} disabled={!isSpeaking}>
              {isSpeaking ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
              {isSpeaking ? '停止' : '播放'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 语音控制按钮 */}
        <div className="text-center">
          <button onClick={isListening ? stopListening : startListening} className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {isListening ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
            {isListening && <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>}
          </button>
          <p className="mt-4 text-gray-600">
            {isListening ? '正在听取您的指令...' : '点击开始语音购买'}
          </p>
          {transcript && <div className="mt-2 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-800">
                <span className="font-medium">识别结果:</span> {transcript}
              </p>
            </div>}
        </div>

        {/* 快捷指令 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">快捷指令</h4>
          <div className="grid grid-cols-2 gap-3">
            {quickCommands.map((item, index) => <button key={index} onClick={() => processVoiceCommand(item.command)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors">
                <p className="font-medium text-gray-800">{item.command}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </button>)}
          </div>
        </div>

        {/* 对话记录 */}
        {conversation.length > 0 && <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">对话记录</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {conversation.map((message, index) => <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>}

        {/* 功能说明 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-2">语音购买说明</p>
              <ul className="space-y-1">
                <li>• 支持自然语言，如"购买NMN"、"介绍产品"等</li>
                <li>• 可以询问价格、功效、优惠等信息</li>
                <li>• 语音识别准确率高，支持中文指令</li>
                <li>• 购买确认后会自动处理订单</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 支持状态 */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            {speechSupported ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-yellow-600" />}
            <span className={`text-sm ${speechSupported ? 'text-green-800' : 'text-yellow-800'}`}>
              {speechSupported ? '您的浏览器支持语音功能' : '您的浏览器不支持语音功能'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>;
}