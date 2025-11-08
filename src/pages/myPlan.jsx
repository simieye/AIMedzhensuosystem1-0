// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Target, Calendar, Clock, TrendingUp, Award, Bell, Sun, Moon, Activity, Heart, Brain, Zap, CheckCircle, AlertCircle, Play, Pause, RotateCcw, BarChart3, Eye, MessageCircle, Sparkles, Flame, Star } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { AIAssistant } from '@/components/AIAssistant';
// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
export default function MyPlan(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('plans');
  const [plans, setPlans] = useState([]);
  const [wakeUpTime, setWakeUpTime] = useState('07:00');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [todayCheckIn, setTodayCheckIn] = useState(null);
  const [checkInStreak, setCheckInStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [wearableData, setWearableData] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [effectPrediction, setEffectPrediction] = useState([]);
  const [executionHeatmap, setExecutionHeatmap] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPredictionDetail, setShowPredictionDetail] = useState(false);
  const alarmAudioRef = useRef(null);

  // 模拟方案数据
  const mockPlans = [{
    id: 1,
    title: 'NMN抗衰老方案',
    type: 'anti-aging',
    duration: '90天',
    progress: 65,
    status: 'active',
    dailyTasks: ['服用NMN补充剂', '30分钟有氧运动', '8小时充足睡眠', '健康饮食'],
    weeklyGoals: ['体重下降1-2kg', '睡眠质量提升', '精力水平改善'],
    expectedResults: '生物年龄逆转3-5岁',
    difficulty: 'medium',
    completionRate: 78
  }, {
    id: 2,
    title: '心血管健康计划',
    type: 'cardiovascular',
    duration: '60天',
    progress: 40,
    status: 'active',
    dailyTasks: ['心率监测', '血压记录', '低盐饮食', '规律运动'],
    weeklyGoals: ['血压控制在120/80', '静息心率降低', '心肺功能提升'],
    expectedResults: '心血管风险降低30%',
    difficulty: 'easy',
    completionRate: 85
  }, {
    id: 3,
    title: '认知功能提升',
    type: 'cognitive',
    duration: '45天',
    progress: 25,
    status: 'pending',
    dailyTasks: ['记忆力训练', '冥想练习', '益智游戏', '充足睡眠'],
    weeklyGoals: ['记忆力测试提升', '专注力延长', '反应速度改善'],
    expectedResults: '认知年龄年轻5岁',
    difficulty: 'hard',
    completionRate: 60
  }];

  // 模拟穿戴设备数据
  const mockWearableData = {
    heartRate: {
      current: 72,
      resting: 65,
      zones: {
        fatBurn: {
          min: 98,
          max: 138,
          time: 45
        },
        cardio: {
          min: 138,
          max: 160,
          time: 20
        },
        peak: {
          min: 160,
          max: 190,
          time: 5
        }
      }
    },
    sleep: {
      duration: 7.5,
      quality: 85,
      deepSleep: 1.8,
      remSleep: 1.9,
      efficiency: 92
    },
    steps: {
      current: 8456,
      goal: 10000,
      calories: 320
    },
    stress: {
      level: 'moderate',
      score: 65,
      recovery: 78
    },
    activity: {
      moderate: 45,
      vigorous: 15,
      total: 60
    }
  };

  // 生成效果预测数据
  const generateEffectPrediction = () => {
    const days = [];
    const biologicalAge = [];
    const healthScore = [];
    const energyLevel = [];
    for (let i = 0; i <= 90; i += 5) {
      days.push(`第${i}天`);
      // 模拟生物年龄逐渐下降
      biologicalAge.push(35 - Math.random() * 2 - i / 90 * 4);
      // 健康评分逐渐提升
      healthScore.push(75 + Math.random() * 5 + i / 90 * 15);
      // 精力水平波动上升
      energyLevel.push(70 + Math.random() * 10 + i / 90 * 20);
    }
    return days.map((day, index) => ({
      day,
      biologicalAge: biologicalAge[index].toFixed(1),
      healthScore: healthScore[index].toFixed(0),
      energyLevel: energyLevel[index].toFixed(0)
    }));
  };

  // 生成执行率热力图数据
  const generateExecutionHeatmap = () => {
    const heatmap = [];
    const today = new Date();
    for (let week = 0; week < 12; week++) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (11 - week) * 7 - (6 - day));
        heatmap.push({
          date: date.toISOString().split('T')[0],
          week: week,
          day: day,
          completionRate: Math.floor(Math.random() * 40) + 60,
          // 60-100%完成率
          tasksCompleted: Math.floor(Math.random() * 3) + 2,
          // 2-5个任务完成
          totalTasks: 5
        });
      }
    }
    return heatmap;
  };
  useEffect(() => {
    // 初始化数据
    setPlans(mockPlans);
    setWearableData(mockWearableData);
    setEffectPrediction(generateEffectPrediction());
    setExecutionHeatmap(generateExecutionHeatmap());

    // 检查今日打卡状态
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    if (lastCheckIn === today) {
      setTodayCheckIn(new Date(lastCheckIn));
      setCheckInStreak(parseInt(localStorage.getItem('checkInStreak') || '0'));
    } else {
      setCheckInStreak(parseInt(localStorage.getItem('checkInStreak') || '0'));
    }
    setTotalPoints(parseInt(localStorage.getItem('totalPoints') || '0'));

    // 初始化穿戴设备监测
    initializeWearableMonitoring();
  }, []);
  const initializeWearableMonitoring = () => {
    // 模拟穿戴设备连接
    setTimeout(() => {
      setIsMonitoring(true);
      toast({
        title: "穿戴设备已连接",
        description: "智能手环已连接，开始实时监测"
      });
    }, 2000);
  };
  const handleSetAlarm = () => {
    setIsAlarmSet(true);
    toast({
      title: "AI叫醒已设置",
      description: `明天${wakeUpTime}将用AI语音叫醒您`
    });

    // 模拟叫醒功能
    const now = new Date();
    const [hours, minutes] = wakeUpTime.split(':').map(Number);
    const alarmTime = new Date();
    alarmTime.setHours(hours, minutes, 0, 0);
    if (alarmTime <= now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }
    const timeUntilAlarm = alarmTime.getTime() - now.getTime();
    setTimeout(() => {
      triggerAIWakeUp();
    }, timeUntilAlarm);
  };
  const triggerAIWakeUp = () => {
    // 播放AI语音叫醒
    if ('speechSynthesis' in window) {
      const wakeUpText = `早上好！现在是${wakeUpTime}，新的一天开始了。今天有${plans.filter(p => p.status === 'active').length}个健康方案需要执行，让我们一起开启健康的一天吧！记得完成打卡获得积分奖励。`;
      const utterance = new SpeechSynthesisUtterance(wakeUpText);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
    toast({
      title: "AI叫醒服务",
      description: "早上好！新的一天开始了，记得打卡哦！"
    });

    // 播放轻柔音乐
    if (alarmAudioRef.current) {
      alarmAudioRef.current.play();
    }
  };
  const handleCheckIn = () => {
    const today = new Date();
    const todayString = today.toDateString();
    if (todayCheckIn && todayCheckIn.toDateString() === todayString) {
      toast({
        title: "今日已打卡",
        description: "您今天已经完成打卡了",
        variant: "destructive"
      });
      return;
    }

    // 计算连续打卡天数
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    let newStreak = checkInStreak;
    if (lastCheckIn === yesterdayString) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    // 计算积分奖励
    const basePoints = 10;
    const streakBonus = Math.floor(newStreak / 7) * 5; // 每连续7天额外5分
    const totalPointsEarned = basePoints + streakBonus;
    setTodayCheckIn(today);
    setCheckInStreak(newStreak);
    setTotalPoints(prev => prev + totalPointsEarned);

    // 保存到本地存储
    localStorage.setItem('lastCheckIn', todayString);
    localStorage.setItem('checkInStreak', newStreak.toString());
    localStorage.setItem('totalPoints', (totalPoints + totalPointsEarned).toString());
    toast({
      title: "打卡成功！",
      description: `获得${totalPointsEarned}积分，连续打卡${newStreak}天`
    });

    // AI语音反馈
    if ('speechSynthesis' in window) {
      const checkInText = `打卡成功！您获得${totalPointsEarned}积分，已连续打卡${newStreak}天。坚持就是胜利，继续加油！`;
      const utterance = new SpeechSynthesisUtterance(checkInText);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };
  const handleWearableAlert = (type, message) => {
    toast({
      title: "健康提醒",
      description: message,
      action: <Button size="sm" onClick={() => {
        toast({
          title: "查看详情",
          description: "正在跳转到健康数据分析..."
        });
      }}>
        查看详情
      </Button>
    });
  };
  const handlePlanAction = (plan, action) => {
    switch (action) {
      case 'start':
        setPlans(prev => prev.map(p => p.id === plan.id ? {
          ...p,
          status: 'active'
        } : p));
        toast({
          title: "方案已启动",
          description: `${plan.title}已开始执行`
        });
        break;
      case 'pause':
        setPlans(prev => prev.map(p => p.id === plan.id ? {
          ...p,
          status: 'paused'
        } : p));
        toast({
          title: "方案已暂停",
          description: `${plan.title}已暂停执行`
        });
        break;
      case 'complete':
        setPlans(prev => prev.map(p => p.id === plan.id ? {
          ...p,
          status: 'completed',
          progress: 100
        } : p));
        toast({
          title: "方案已完成",
          description: `恭喜完成${plan.title}！`
        });
        break;
      case 'view':
        setSelectedPlan(plan);
        setShowPredictionDetail(true);
        break;
    }
  };
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    const pageMap = {
      plans: 'myPlan',
      detection: 'detectionCenter',
      mall: 'mall',
      profile: 'personalCenter'
    };
    if (pageMap[tabId]) {
      $w.utils.navigateTo({
        pageId: pageMap[tabId],
        params: {}
      });
    }
  };
  const getCompletionColor = rate => {
    if (rate >= 90) return 'bg-green-500';
    if (rate >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getHeatmapColor = rate => {
    if (rate >= 90) return 'bg-green-500';
    if (rate >= 75) return 'bg-green-400';
    if (rate >= 60) return 'bg-yellow-400';
    if (rate >= 40) return 'bg-orange-400';
    return 'bg-red-400';
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">我的健康方案</h1>
              <p className="text-purple-100">AI智能管理 · 效果预测 · 执行追踪</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{totalPoints}</div>
                <div className="text-purple-100 text-sm">总积分</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{checkInStreak}</div>
                <div className="text-purple-100 text-sm">连续打卡</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* AI叫醒和打卡区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="w-5 h-5 mr-2" />
                AI智能叫醒
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">叫醒时间</label>
                    <input type="time" value={wakeUpTime} onChange={e => setWakeUpTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleSetAlarm} disabled={isAlarmSet} className={`${isAlarmSet ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}>
                      {isAlarmSet ? <CheckCircle className="w-4 h-4 mr-2" /> : <Bell className="w-4 h-4 mr-2" />}
                      {isAlarmSet ? '已设置' : '设置叫醒'}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-purple-700">
                    <Brain className="w-4 h-4" />
                    <span>AI将根据您的睡眠周期智能叫醒</span>
                  </div>
                </div>
                
                {isAlarmSet && <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>明天{wakeUpTime}AI语音叫醒</span>
                  </div>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="w-5 h-5 mr-2" />
                每日打卡积分
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {todayCheckIn ? '✓ 已打卡' : '○ 未打卡'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {todayCheckIn ? `打卡时间: ${todayCheckIn.toLocaleTimeString()}` : '今日尚未打卡'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{checkInStreak}</div>
                    <div className="text-xs text-gray-600">连续天数</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{totalPoints}</div>
                    <div className="text-xs text-gray-600">累计积分</div>
                  </div>
                </div>
                
                <Button onClick={handleCheckIn} disabled={todayCheckIn !== null} className={`w-full ${todayCheckIn ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'}`}>
                  {todayCheckIn ? '今日已打卡' : '立即打卡'}
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  基础积分10分，连续7天额外奖励5分
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 穿戴设备监测 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                智能穿戴监测
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600">{isMonitoring ? '已连接' : '未连接'}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {wearableData ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 心率数据 */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-gray-600">心率</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">{wearableData.heartRate.current}</div>
                  <div className="text-xs text-gray-600">静息: {wearableData.heartRate.resting}</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>燃脂:</span>
                      <span>{wearableData.heartRate.zones.fatBurn.time}分钟</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>有氧:</span>
                      <span>{wearableData.heartRate.zones.cardio.time}分钟</span>
                    </div>
                  </div>
                </div>

                {/* 睡眠数据 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Moon className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">睡眠</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{wearableData.sleep.duration}h</div>
                  <div className="text-xs text-gray-600">质量: {wearableData.sleep.quality}%</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>深睡:</span>
                      <span>{wearableData.sleep.deepSleep}h</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>REM:</span>
                      <span>{wearableData.sleep.remSleep}h</span>
                    </div>
                  </div>
                </div>

                {/* 运动数据 */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">运动</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{wearableData.steps.current}</div>
                  <div className="text-xs text-gray-600">目标: {wearableData.steps.goal}</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>卡路里:</span>
                      <span>{wearableData.steps.calories}千卡</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>完成度:</span>
                      <span>{Math.round(wearableData.steps.current / wearableData.steps.goal * 100)}%</span>
                    </div>
                  </div>
                </div>

                {/* 压力数据 */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600">压力</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{wearableData.stress.score}</div>
                  <div className="text-xs text-gray-600">水平: {wearableData.stress.level}</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>恢复:</span>
                      <span>{wearableData.stress.recovery}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>状态:</span>
                      <span className={wearableData.stress.score > 70 ? 'text-red-600' : 'text-green-600'}>
                        {wearableData.stress.score > 70 ? '偏高' : '正常'}
                      </span>
                    </div>
                  </div>
                </div>
              </div> : <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">正在连接穿戴设备...</p>
              </div>}
            
            {/* 健康提醒 */}
            <div className="mt-4 space-y-2">
              {wearableData?.stress.score > 70 && <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>压力提醒：</strong>您当前压力水平较高，建议进行5分钟深呼吸练习或冥想。
                  </AlertDescription>
                </Alert>}
              
              {wearableData?.steps.current < wearableData?.steps.goal * 0.5 && <Alert className="border-blue-200 bg-blue-50">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>运动提醒：</strong>今日步数较少，建议增加运动量以达到健康目标。
                  </AlertDescription>
                </Alert>}
            </div>
          </CardContent>
        </Card>

        {/* 干预效果预测 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                干预效果预测
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowPredictionDetail(!showPredictionDetail)}>
                <Eye className="w-4 h-4 mr-1" />
                {showPredictionDetail ? '收起详情' : '查看详情'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 生物年龄变化预测 */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">生物年龄变化预测</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={effectPrediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="biologicalAge" stroke="#8b5cf6" strokeWidth={2} name="生物年龄" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-purple-800">
                    <strong>预测结果：</strong>按当前方案执行，90天后生物年龄预计逆转3-5岁
                  </div>
                </div>
              </div>

              {/* 健康评分预测 */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">健康评分趋势</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={effectPrediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="healthScore" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="健康评分" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>预测结果：</strong>健康评分将从75分提升至90分以上
                  </div>
                </div>
              </div>
            </div>

            {/* 详细预测信息 */}
            {showPredictionDetail && <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h5 className="font-semibold text-purple-800">抗衰老效果</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">细胞活力:</span>
                      <span className="font-medium text-purple-600">+35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">DNA修复:</span>
                      <span className="font-medium text-purple-600">+28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">端粒长度:</span>
                      <span className="font-medium text-purple-600">+15%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-green-800">心血管改善</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">血压控制:</span>
                      <span className="font-medium text-green-600">-12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">胆固醇:</span>
                      <span className="font-medium text-green-600">-18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">血管弹性:</span>
                      <span className="font-medium text-green-600">+22%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h5 className="font-semibold text-blue-800">认知提升</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">记忆力:</span>
                      <span className="font-medium text-blue-600">+25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">专注力:</span>
                      <span className="font-medium text-blue-600">+30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">反应速度:</span>
                      <span className="font-medium text-blue-600">+20%</span>
                    </div>
                  </div>
                </div>
              </div>}
          </CardContent>
        </Card>

        {/* 方案执行率热力图 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              方案执行率热力图
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>过去12周执行情况</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span>0-40%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-400 rounded"></div>
                    <span>40-60%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span>60-75%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span>75-90%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>90-100%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => <div key={index} className="text-center text-xs font-medium text-gray-600 py-2">
                  {day}
                </div>)}
              
              {executionHeatmap.map((day, index) => {
              const date = new Date(day.date);
              const isToday = date.toDateString() === new Date().toDateString();
              return <div key={index} className={`aspect-square rounded ${getHeatmapColor(day.completionRate)} ${isToday ? 'ring-2 ring-blue-500' : ''} relative group cursor-pointer`} title={`${date.toLocaleDateString()}: ${day.completionRate}%完成率`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-white font-medium">{day.completionRate}%</span>
                    </div>
                  </div>;
            })}
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(executionHeatmap.filter(d => d.completionRate >= 80).length / executionHeatmap.length * 100)}%
                </div>
                <div className="text-sm text-gray-600">优秀执行天数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(executionHeatmap.reduce((sum, d) => sum + d.completionRate, 0) / executionHeatmap.length).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">平均执行率</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {executionHeatmap.filter(d => d.completionRate === 100).length}
                </div>
                <div className="text-sm text-gray-600">完美执行天数</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 健康方案列表 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">我的健康方案</h2>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-1" />
              创建新方案
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">{plan.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                      {plan.difficulty === 'easy' ? '简单' : plan.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">持续时间:</span>
                      <span className="font-medium">{plan.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">当前进度:</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">执行率:</span>
                      <span className="font-medium">{plan.completionRate}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>完成进度</span>
                      <span>{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${getCompletionColor(plan.progress)} h-2 rounded-full transition-all duration-300`} style={{
                    width: `${plan.progress}%`
                  }}></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">每日任务:</div>
                    <div className="space-y-1">
                      {plan.dailyTasks.slice(0, 2).map((task, index) => <div key={index} className="flex items-center text-xs text-gray-700">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                          {task}
                        </div>)}
                      {plan.dailyTasks.length > 2 && <div className="text-xs text-gray-500">
                          +{plan.dailyTasks.length - 2}个更多任务
                        </div>}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>预期效果:</strong> {plan.expectedResults}
                  </div>
                  
                  <div className="flex space-x-2">
                    {plan.status === 'pending' && <Button size="sm" onClick={() => handlePlanAction(plan, 'start')} className="flex-1">
                        <Play className="w-4 h-4 mr-1" />
                        开始
                      </Button>}
                    {plan.status === 'active' && <>
                        <Button size="sm" variant="outline" onClick={() => handlePlanAction(plan, 'pause')} className="flex-1">
                          <Pause className="w-4 h-4 mr-1" />
                          暂停
                        </Button>
                        <Button size="sm" onClick={() => handlePlanAction(plan, 'view')} className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          详情
                        </Button>
                      </>}
                    {plan.status === 'paused' && <Button size="sm" onClick={() => handlePlanAction(plan, 'start')} className="flex-1">
                        <RotateCcw className="w-4 h-4 mr-1" />
                        继续
                      </Button>}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* 效果预测详情弹窗 */}
      {showPredictionDetail && selectedPlan && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{selectedPlan.title} - 效果预测详情</h3>
              <button onClick={() => setShowPredictionDetail(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">生物年龄变化趋势</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={effectPrediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="biologicalAge" stroke="#8b5cf6" strokeWidth={2} name="生物年龄" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">健康评分预测</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={effectPrediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="healthScore" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="健康评分" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-4">关键指标预测</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h5 className="font-semibold text-purple-800">抗衰老效果</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">细胞活力:</span>
                      <span className="font-medium text-purple-600">+35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">DNA修复:</span>
                      <span className="font-medium text-purple-600">+28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">端粒长度:</span>
                      <span className="font-medium text-purple-600">+15%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-green-800">心血管改善</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">血压控制:</span>
                      <span className="font-medium text-green-600">-12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">胆固醇:</span>
                      <span className="font-medium text-green-600">-18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">血管弹性:</span>
                      <span className="font-medium text-green-600">+22%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h5 className="font-semibold text-blue-800">认知提升</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">记忆力:</span>
                      <span className="font-medium text-blue-600">+25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">专注力:</span>
                      <span className="font-medium text-blue-600">+30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">反应速度:</span>
                      <span className="font-medium text-blue-600">+20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* AI客服组件 */}
      <AIAssistant />

      {/* 隐藏的音频元素 */}
      <audio ref={alarmAudioRef} loop>
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>
    </div>;
}