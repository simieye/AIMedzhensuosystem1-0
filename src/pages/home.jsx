// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Activity, Target, ShoppingBag, User, TrendingUp, Heart, Brain, Shield, Clock, Award, ChevronRight, Star, ArrowRight, BarChart3, Mic, Volume2, VolumeX, Calendar, Zap } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { DigitalTwin3D } from '@/components/DigitalTwin3D';
// @ts-ignore;
import { AIAssistant } from '@/components/AIAssistant';
// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [showHRVDialog, setShowHRVDialog] = useState(false);
  const [heartPressed, setHeartPressed] = useState(false);
  const [heartPressTimer, setHeartPressTimer] = useState(null);
  const [rpaStatus, setRpaStatus] = useState('idle'); // idle, running, completed
  const [aiWelcomePlayed, setAiWelcomePlayed] = useState(false);
  const digitalTwinRef = useRef(null);
  const voiceRecognitionRef = useRef(null);

  // HRV数据
  const hrvData = {
    score: 78,
    rmssd: 45,
    pnn50: 12,
    stressLevel: 'moderate',
    recoveryStatus: 'good',
    recommendations: ['建议增加有氧运动', '保持规律作息', '适当进行冥想放松']
  };

  // 语音指令映射
  const voiceCommands = {
    '查看肝功能': () => handleHealthQuery('liver'),
    '检查心脏': () => handleHealthQuery('heart'),
    '血压数据': () => handleHealthQuery('blood_pressure'),
    '血糖水平': () => handleHealthQuery('blood_sugar'),
    '预约医生': () => handleRPAAppointment(),
    '生成报告': () => handleGenerateReport(),
    '健康评分': () => handleHealthQuery('overall'),
    '睡眠质量': () => handleHealthQuery('sleep'),
    '运动数据': () => handleHealthQuery('exercise')
  };
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
      title: '全面���检套餐',
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

    // 初始化语音识别
    initializeVoiceRecognition();
  }, []);

  // AI自动播报健康状态
  useEffect(() => {
    if (userStats && !aiWelcomePlayed && isVoiceEnabled) {
      const timer = setTimeout(() => {
        playAIWelcomeMessage();
        setAiWelcomePlayed(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userStats, aiWelcomePlayed, isVoiceEnabled]);
  const initializeVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      voiceRecognitionRef.current = new SpeechRecognition();
      voiceRecognitionRef.current.continuous = false;
      voiceRecognitionRef.current.interimResults = false;
      voiceRecognitionRef.current.lang = 'zh-CN';
      voiceRecognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setVoiceCommand(transcript);
        processVoiceCommand(transcript);
      };
      voiceRecognitionRef.current.onerror = event => {
        console.error('语音识别错误:', event.error);
        setIsListening(false);
        toast({
          title: "语音识别失败",
          description: "请检查麦克风权限或重试",
          variant: "destructive"
        });
      };
      voiceRecognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };
  const playAIWelcomeMessage = () => {
    if ('speechSynthesis' in window) {
      const welcomeText = `您好！今天是${new Date().toLocaleDateString('zh-CN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}。您的健康评分为${userStats.healthScore}分，健康年龄${userStats.healthAge}岁，比实际年龄年轻${userStats.actualAge - userStats.healthAge}岁。整体状况良好，请继续保持健康的生活方式。`;
      const utterance = new SpeechSynthesisUtterance(welcomeText);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
      toast({
        title: "AI健康助手",
        description: "正在为您播报今日健康状态..."
      });
    }
  };
  const toggleVoiceListening = () => {
    if (isListening) {
      voiceRecognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (voiceRecognitionRef.current) {
        voiceRecognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "语音识别已启动",
          description: "请说出您的健康查询指令..."
        });
      } else {
        toast({
          title: "语音识别不可用",
          description: "您的浏览器不支持语音识别功能",
          variant: "destructive"
        });
      }
    }
  };
  const processVoiceCommand = command => {
    const matchedCommand = Object.keys(voiceCommands).find(key => command.includes(key));
    if (matchedCommand) {
      voiceCommands[matchedCommand]();
      toast({
        title: "语音指令识别",
        description: `已识别指令: ${matchedCommand}`
      });
    } else {
      toast({
        title: "未识别指令",
        description: "请尝试说: 查看肝功能、检查心脏、预约医生等",
        variant: "destructive"
      });
    }
  };
  const handleHealthQuery = organ => {
    const organData = {
      liver: {
        name: '肝脏',
        status: '功能正常',
        indicators: ['ALT: 25 U/L', 'AST: 28 U/L', '总胆红素: 12.5 μmol/L'],
        advice: '肝功能各项指标正常，建议避免饮酒，保持规律作息'
      },
      heart: {
        name: '心脏',
        status: '心率略高',
        indicators: ['心率: 78 bpm', '血压: 125/82 mmHg', 'HRV: 45 ms'],
        advice: '心率略高于正常范围，建议增加有氧运动，减少咖啡因摄入'
      },
      blood_pressure: {
        name: '血压',
        status: '正常偏高',
        indicators: ['收缩压: 125 mmHg', '舒张压: 82 mmHg', '平均压: 96 mmHg'],
        advice: '血压处于正常高值，建议低盐饮食，适量运动'
      },
      blood_sugar: {
        name: '血糖',
        status: '正常',
        indicators: ['空腹血糖: 5.2 mmol/L', '餐后血糖: 6.8 mmol/L', '糖化血红蛋白: 5.5%'],
        advice: '血糖水平正常，继续保持健康饮食和运动习惯'
      },
      overall: {
        name: '整体健康',
        status: '良好',
        indicators: [`健康评分: ${userStats?.healthScore || 0}分`, `健康年龄: ${userStats?.healthAge || 0}岁`, `活跃计划: ${userStats?.activePlans || 0}个`],
        advice: '整体健康状况良好，继续保持当前的生活方式'
      },
      sleep: {
        name: '睡眠',
        status: '良好',
        indicators: ['深度睡眠: 2.5小时', '睡眠效率: 92%', 'REM睡眠: 1.8小时'],
        advice: '睡眠质量良好，建议保持规律作息'
      },
      exercise: {
        name: '运动',
        status: '适中',
        indicators: ['日均步数: 8,542步', '运动时长: 45分钟', '卡路里消耗: 320 kcal'],
        advice: '运动量适中，建议增加力量训练'
      }
    };
    const data = organData[organ];
    if (data) {
      toast({
        title: `${data.name}检查结果`,
        description: `${data.status} - ${data.advice}`
      });

      // 语音播报结果
      if (isVoiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`${data.name}${data.status}。${data.advice}`);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      }
    }
  };
  const handleRPAAppointment = () => {
    setRpaStatus('running');
    toast({
      title: "RPA自动预约",
      description: "正在为您分析最佳预约时间..."
    });

    // 模拟RPA流程
    setTimeout(() => {
      setRpaStatus('completed');
      toast({
        title: "预约成功",
        description: "已为您预约明天上午10:00的张医生专家号"
      });

      // 语音播报预约结果
      if (isVoiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('预约成功！已为您预约明天上午10点的张医生专家号，请准时就诊。');
        utterance.lang = 'zh-CN';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      }
      setTimeout(() => setRpaStatus('idle'), 3000);
    }, 3000);
  };
  const handleGenerateReport = () => {
    toast({
      title: "生成健康报告",
      description: "正在为您生成个性化健康报告..."
    });
    $w.utils.navigateTo({
      pageId: 'healthReport',
      params: {}
    });
  };
  const handleHeartPress = () => {
    setHeartPressed(true);
    // 长按检测
    const timer = setTimeout(() => {
      setShowHRVDialog(true);
      toast({
        title: "HRV数据分析",
        description: "正在分析您的心率变异性数据..."
      });
    }, 800); // 长按800ms触发
    setHeartPressTimer(timer);
  };
  const handleHeartRelease = () => {
    setHeartPressed(false);
    if (heartPressTimer) {
      clearTimeout(heartPressTimer);
      setHeartPressTimer(null);
    }
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
        handleRPAAppointment();
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
    title: '预约服务',
    description: '预约专家咨询',
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
    isInteractive: true,
    onPress: handleHeartPress
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
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

          {/* 语音控制区域 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={toggleVoiceListening} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white/20 hover:bg-white/30'}`}>
                {isListening ? <VolumeX className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span className="text-sm">{isListening ? '正在听...' : '语音助手'}</span>
              </button>
              
              <button onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${isVoiceEnabled ? 'bg-white/20' : 'bg-gray-500/50'}`}>
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-sm">{isVoiceEnabled ? '语音开启' : '语音关闭'}</span>
              </button>

              {rpaStatus === 'running' && <div className="flex items-center space-x-2 bg-yellow-500 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="text-sm">RPA执行中...</span>
              </div>}
            </div>

            {voiceCommand && <div className="text-sm text-blue-100">
                最后指令: {voiceCommand}
              </div>}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 健康指标卡片 - 增强交互 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return <div key={index} className={`${metric.isInteractive ? 'cursor-pointer' : ''} bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all ${metric.isInteractive && heartPressed ? 'ring-2 ring-red-500 scale-105' : ''}`} onMouseDown={metric.onPress} onMouseUp={handleHeartRelease} onMouseLeave={handleHeartRelease}>
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                  {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                </div>
                <div className="text-xl font-bold">{metric.value}</div>
                <div className="text-gray-600 text-xs">{metric.title}</div>
                {metric.isInteractive && <div className="text-xs text-gray-400 mt-1">长按查看详情</div>}
              </div>;
        })}
        </div>

        {/* 数字孪生3D模型 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">数字孪生健康模型</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Activity className="w-4 h-4" />
              <span>实时监测</span>
            </div>
          </div>
          <DigitalTwin3D healthData={{
          overall: userStats.healthScore,
          age: userStats.healthAge
        }} onBodyPartClick={part => {
          toast({
            title: "部位分析",
            description: `正在分析${part.name}的健康数据...`
          });
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
            <button onClick={playAIWelcomeMessage} className="ml-2 text-blue-600 underline text-sm">
              重新播报
            </button>
          </AlertDescription>
        </Alert>
      </div>

      {/* HRV数据弹窗 */}
      {showHRVDialog && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                HRV心率变异性分析
              </h3>
              <button onClick={() => setShowHRVDialog(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">HRV评分</span>
                  <span className="text-2xl font-bold text-red-600">{hrvData.score}</span>
                </div>
                <div className="text-sm text-gray-600">心率变异性正常范围: 20-100</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">RMSSD</div>
                  <div className="text-lg font-semibold">{hrvData.rmssd} ms</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">pNN50</div>
                  <div className="text-lg font-semibold">{hrvData.pnn50}%</div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm text-gray-700 mb-1">压力水平</div>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{
                  width: '60%'
                }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">中等</span>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded">
                <div className="text-sm text-gray-700 mb-2">恢复状态</div>
                <div className="text-sm text-green-800">{hrvData.recoveryStatus === 'good' ? '恢复良好' : '需要更多休息'}</div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-2">AI建议</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {hrvData.recommendations.map((rec, index) => <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {rec}
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* AI客服组件 */}
      <AIAssistant />
    </div>;
}