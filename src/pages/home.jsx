// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Activity, Target, ShoppingBag, User, TrendingUp, Heart, Brain, Shield, Clock, Award, ChevronRight, Star, ArrowRight, BarChart3, Volume2, VolumeX, Mic } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { DigitalTwin3D } from '@/components/DigitalTwin3D';
// @ts-ignore;
import { HeartDetailModal } from '@/components/HeartDetailModal';
// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// 语音控制Hook
function useVoiceController() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  useEffect(() => {
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
    }
  }, []);
  const speak = (text, options = {}) => {
    if (!speechSupported || !synthRef.current) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = event => {
        setIsSpeaking(false);
        reject(event.error);
      };
      synthRef.current.speak(utterance);
    });
  };
  const startListening = onResult => {
    if (!speechSupported || !recognitionRef.current) return;
    recognitionRef.current.onresult = event => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setIsListening(false);
      onResult(transcript);
    };
    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };
    recognitionRef.current.start();
    setIsListening(true);
  };
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };
  return {
    isListening,
    isSpeaking,
    speechSupported,
    speak,
    startListening,
    stopSpeaking
  };
}
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [userStats, setUserStats] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showHeartModal, setShowHeartModal] = useState(false);
  const [heartLongPressTimer, setHeartLongPressTimer] = useState(null);
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const voiceController = useVoiceController();
  const digitalTwinRef = useRef(null);
  useEffect(() => {
    // 模拟获取用户数据
    const mockUserStats = {
      healthScore: 85,
      healthAge: 32,
      actualAge: 35,
      completedPlans: 3,
      activePlans: 2,
      totalReports: 12,
      points: 15890
    };
    const mockHealthData = [{
      date: '01-10',
      score: 78,
      steps: 6000,
      heartRate: 68
    }, {
      date: '01-11',
      score: 80,
      steps: 7500,
      heartRate: 70
    }, {
      date: '01-12',
      score: 82,
      steps: 8200,
      heartRate: 72
    }, {
      date: '01-13',
      score: 83,
      steps: 6800,
      heartRate: 69
    }, {
      date: '01-14',
      score: 84,
      steps: 9100,
      heartRate: 71
    }, {
      date: '01-15',
      score: 85,
      steps: 8542,
      heartRate: 72
    }];
    const mockRecommendations = [{
      id: 1,
      title: 'NMN细胞活化精华',
      type: 'product',
      description: '激活细胞能量，延缓衰老进程',
      price: 2880,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
      rating: 4.8,
      tag: '热销'
    }, {
      id: 2,
      title: '30天减重计划',
      type: 'plan',
      description: '科学减重，健康塑形',
      duration: '30天',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      difficulty: '中等',
      tag: '推荐'
    }, {
      id: 3,
      title: '全面体检套餐',
      type: 'service',
      description: '深度健康检测，全面评估',
      price: 1280,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
      rating: 4.9,
      tag: '新品'
    }];
    setUserStats(mockUserStats);
    setHealthData(mockHealthData);
    setRecommendations(mockRecommendations);

    // 页面加载后自动播报健康状态
    setTimeout(() => {
      announceHealthStatus(mockUserStats);
    }, 2000);
  }, []);

  // 自动播报健康状态
  const announceHealthStatus = async stats => {
    if (!voiceController.speechSupported) return;
    const healthMessage = `您好，${$w.auth.currentUser?.nickName || '用户'}。您的健康评分为${stats.healthScore}分，健康年龄为${stats.healthAge}岁，比实际年龄年轻${stats.actualAge - stats.healthAge}岁。整体健康状况良好，请继续保持。`;
    try {
      await voiceController.speak(healthMessage, {
        rate: 0.9
      });
    } catch (error) {
      console.log('语音播报失败:', error);
    }
  };

  // 语音指令处理
  const handleVoiceCommand = command => {
    console.log('收到语音指令:', command);
    if (command.includes('检测中心') || command.includes('体检') || command.includes('检查')) {
      toast({
        title: "语音指令识别",
        description: "正在跳转到检测中心..."
      });
      $w.utils.navigateTo({
        pageId: 'detectionCenter',
        params: {
          highlight: 'heart'
        }
      });
    } else if (command.includes('商城') || command.includes('购买')) {
      toast({
        title: "语音指令识别",
        description: "正在跳转到商城..."
      });
      $w.utils.navigateTo({
        pageId: 'mall',
        params: {}
      });
    } else if (command.includes('方案') || command.includes('计划')) {
      toast({
        title: "语音指令识别",
        description: "正在跳转到我的方案..."
      });
      $w.utils.navigateTo({
        pageId: 'myPlan',
        params: {}
      });
    } else if (command.includes('预约') || command.includes('挂号')) {
      handleAutoAppointment();
    } else if (command.includes('心脏') || command.includes('心率')) {
      setShowHeartModal(true);
    } else {
      toast({
        title: "语音指令",
        description: `识别到指令：${command}`,
        variant: "default"
      });
    }
  };

  // RPA自动预约功能
  const handleAutoAppointment = async () => {
    toast({
      title: "智能预约",
      description: "正在为您分析最佳预约时间..."
    });

    // 模拟RPA分析过程
    setTimeout(() => {
      toast({
        title: "预约建议",
        description: "建议您明天下午2点预约心脏专科医生，已为您预留时间段",
        action: <Button size="sm" onClick={() => confirmAppointment()}>
            确认预约
          </Button>
      });
    }, 2000);
  };
  const confirmAppointment = () => {
    toast({
      title: "预约成功",
      description: "已成功预约明天下午2点的心脏专科检查"
    });
  };

  // 心脏长按处理
  const handleHeartMouseDown = () => {
    setIsHeartPressed(true);
    const timer = setTimeout(() => {
      setShowHeartModal(true);
      setIsHeartPressed(false);
    }, 800); // 长按800ms触发
    setHeartLongPressTimer(timer);
  };
  const handleHeartMouseUp = () => {
    if (heartLongPressTimer) {
      clearTimeout(heartLongPressTimer);
      setHeartLongPressTimer(null);
    }
    setIsHeartPressed(false);
  };
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    const pageMap = {
      home: 'home',
      detection: 'detectionCenter',
      mall: 'mall',
      plan: 'myPlan',
      profile: 'personalCenter'
    };
    if (pageMap[tabId]) {
      $w.utils.navigateTo({
        pageId: pageMap[tabId],
        params: {}
      });
    }
  };
  const handleQuickAction = action => {
    const actionMap = {
      generateReport: () => {
        toast({
          title: "生成报告",
          description: "正在生成您的健康报告..."
        });
        $w.utils.navigateTo({
          pageId: 'healthReport',
          params: {}
        });
      },
      createPlan: () => {
        toast({
          title: "创建计划",
          description: "正在跳转到计划创建页面..."
        });
        $w.utils.navigateTo({
          pageId: 'myPlan',
          params: {}
        });
      },
      shopNow: () => {
        toast({
          title: "前往商城",
          description: "正在跳转到商城..."
        });
        $w.utils.navigateTo({
          pageId: 'mall',
          params: {}
        });
      },
      bookAppointment: () => {
        handleAutoAppointment();
      }
    };
    if (actionMap[action]) {
      actionMap[action]();
    }
  };
  const handleRecommendationClick = item => {
    const pageMap = {
      product: 'mall',
      plan: 'myPlan',
      service: 'detectionCenter'
    };
    if (pageMap[item.type]) {
      $w.utils.navigateTo({
        pageId: pageMap[item.type],
        params: {
          id: item.id
        }
      });
    }
  };
  const quickActions = [{
    id: 'generateReport',
    title: '生成报告',
    description: '获取健康评估',
    icon: BarChart3,
    color: 'bg-blue-500'
  }, {
    id: 'createPlan',
    title: '创建计划',
    description: '制定健康方案',
    icon: Target,
    color: 'bg-green-500'
  }, {
    id: 'shopNow',
    title: '健康商城',
    description: '购买健康产品',
    icon: ShoppingBag,
    color: 'bg-purple-500'
  }, {
    id: 'bookAppointment',
    title: '智能预约',
    description: 'AI自动预约',
    icon: Clock,
    color: 'bg-orange-500'
  }];
  const healthMetrics = [{
    title: '健康评分',
    value: userStats?.healthScore || 0,
    unit: '分',
    icon: Heart,
    color: 'text-red-500',
    trend: 'up',
    isHeart: true
  }, {
    title: '健康年龄',
    value: userStats?.healthAge || 0,
    unit: '岁',
    icon: Shield,
    color: 'text-blue-500',
    trend: 'stable'
  }, {
    title: '完成计划',
    value: userStats?.completedPlans || 0,
    unit: '个',
    icon: Target,
    color: 'text-green-500',
    trend: 'up'
  }, {
    title: '会员积分',
    value: userStats?.points || 0,
    unit: '分',
    icon: Award,
    color: 'text-yellow-500',
    trend: 'up'
  }];
  if (!userStats) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部欢迎区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                欢迎回来，{$w.auth.currentUser?.nickName || '用户'}！
              </h1>
              <p className="text-blue-100">今天是美好的一天，让我们一起关注健康</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userStats.healthScore}</div>
              <div className="text-blue-100 text-sm">健康评分</div>
            </div>
          </div>

          {/* 语音控制按钮 */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => voiceController.startListening(handleVoiceCommand)} disabled={!voiceController.speechSupported || voiceController.isListening} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              {voiceController.isListening ? <>
                  <Mic className="w-4 h-4 mr-2 animate-pulse" />
                  正在听取...
                </> : <>
                  <Mic className="w-4 h-4 mr-2" />
                  语音助手
                </>}
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => voiceController.stopSpeaking()} disabled={!voiceController.isSpeaking} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              {voiceController.isSpeaking ? <>
                  <VolumeX className="w-4 h-4 mr-2" />
                  停止播报
                </> : <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  语音播报
                </>}
            </Button>
          </div>

          {/* 健康指标卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return <div key={index} className={`bg-white/10 backdrop-blur-sm rounded-lg p-3 ${metric.isHeart ? 'cursor-pointer' : ''}`} onMouseDown={metric.isHeart ? handleHeartMouseDown : undefined} onMouseUp={metric.isHeart ? handleHeartMouseUp : undefined} onTouchStart={metric.isHeart ? handleHeartMouseDown : undefined} onTouchEnd={metric.isHeart ? handleHeartMouseUp : undefined}>
                  <div className="flex items-center justify-between mb-1">
                    <Icon className={`w-5 h-5 ${metric.color} ${isHeartPressed && metric.isHeart ? 'animate-pulse' : ''}`} />
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-300" />}
                  </div>
                  <div className="text-xl font-bold">{metric.value}</div>
                  <div className="text-blue-100 text-xs">{metric.title}</div>
                  {metric.isHeart && <div className="text-blue-100 text-xs mt-1">长按查看详情</div>}
                </div>;
          })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 数字孪生3D模型 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">数字孪生人</h2>
          <DigitalTwin3D ref={digitalTwinRef} healthData={{
          overall: userStats.healthScore,
          age: userStats.healthAge
        }} onBodyPartClick={bodyPart => {
          if (bodyPart.id === 'heart') {
            setShowHeartModal(true);
          }
        }} />
        </div>

        {/* 快捷操作 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">快捷操作</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map(action => {
            const Icon = action.icon;
            return <button key={action.id} onClick={() => handleQuickAction(action.id)} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>;
          })}
          </div>
        </div>

        {/* 健康趋势 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              健康趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 个性化推荐 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">为您推荐</h2>
            <Button variant="outline" size="sm" onClick={() => handleQuickAction('shopNow')}>
              查看更多
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map(item => <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleRecommendationClick(item)}>
                <CardContent className="p-4">
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                    {item.tag && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.tag}
                      </span>}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    {item.price && <span className="text-lg font-bold text-red-600">¥{item.price}</span>}
                    {item.rating && <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                      </div>}
                    {item.duration && <span className="text-sm text-gray-600">{item.duration}</span>}
                    {item.difficulty && <span className="text-sm text-gray-600">{item.difficulty}</span>}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* 健康提醒 */}
        <Alert className="border-blue-200 bg-blue-50">
          <Brain className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>AI健康提醒：</strong>您今天还没有记录运动数据，建议进行30分钟的有氧运动以保持健康状态。
            点击语音助手按钮，说出"预约"可自动为您安排体检时间。
          </AlertDescription>
        </Alert>
      </div>

      {/* 心脏详情弹窗 */}
      <HeartDetailModal isOpen={showHeartModal} onClose={() => setShowHeartModal(false)} heartData={{
      heartRate: 72,
      bloodPressure: '120/80',
      status: 'excellent'
    }} onBookAppointment={handleAutoAppointment} />

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}