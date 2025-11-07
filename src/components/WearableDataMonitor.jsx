// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Activity, Heart, TrendingUp, TrendingDown, Footprints, Flame, Moon, Sun, AlertTriangle, CheckCircle, Target, Zap } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export function WearableDataMonitor({
  onExerciseRecommend,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [realTimeData, setRealTimeData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [exerciseRecommendations, setExerciseRecommendations] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());

  // 模拟实时穿戴设备数据
  const mockRealTimeData = {
    heartRate: 72,
    steps: 8542,
    calories: 342,
    distance: 6.2,
    activeMinutes: 45,
    sleepHours: 7.5,
    sleepQuality: 85,
    stressLevel: 3,
    bloodOxygen: 98,
    bodyTemperature: 36.5,
    movementIntensity: 'moderate'
  };

  // 模拟历史数据
  const generateHistoricalData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        }),
        heartRate: 68 + Math.floor(Math.random() * 10),
        steps: 6000 + Math.floor(Math.random() * 4000),
        calories: 280 + Math.floor(Math.random() * 120),
        sleepHours: 6 + Math.random() * 3,
        sleepQuality: 70 + Math.floor(Math.random() * 20),
        stressLevel: 2 + Math.floor(Math.random() * 4)
      });
    }
    return data;
  };
  useEffect(() => {
    // 初始化数据
    setRealTimeData(mockRealTimeData);
    setHistoricalData(generateHistoricalData());

    // 模拟实时数据更新
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        heartRate: prev.heartRate + Math.floor(Math.random() * 5) - 2,
        steps: prev.steps + Math.floor(Math.random() * 10),
        calories: prev.calories + Math.floor(Math.random() * 2),
        distance: prev.distance + (Math.random() * 0.01).toFixed(2),
        activeMinutes: prev.activeMinutes + (Math.random() > 0.7 ? 1 : 0),
        stressLevel: Math.max(1, Math.min(5, prev.stressLevel + Math.floor(Math.random() * 3) - 1))
      }));
      setLastSync(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // 生成运动建议
    generateExerciseRecommendations();
  }, [realTimeData]);
  const generateExerciseRecommendations = () => {
    if (!realTimeData) return;
    const recommendations = [];

    // 基于步数的建议
    if (realTimeData.steps < 8000) {
      recommendations.push({
        type: 'steps',
        priority: 'high',
        title: '增加日常步数',
        description: `您今天只走了${realTimeData.steps}步，建议再走${8000 - realTimeData.steps}步达到目标`,
        icon: Footprints,
        color: 'text-orange-600',
        action: '开始步行'
      });
    }

    // 基于心率的建议
    if (realTimeData.heartRate > 80) {
      recommendations.push({
        type: 'heart',
        priority: 'medium',
        title: '心率偏高',
        description: '您的心率略高，建议进行深呼吸或轻度拉伸',
        icon: Heart,
        color: 'text-red-600',
        action: '放松练习'
      });
    }

    // 基于压力水平的建议
    if (realTimeData.stressLevel > 3) {
      recommendations.push({
        type: 'stress',
        priority: 'high',
        title: '压力管理',
        description: '检测到压力水平较高，建议进行5分钟冥想',
        icon: AlertTriangle,
        color: 'text-purple-600',
        action: '开始冥想'
      });
    }

    // 基于活动量的建议
    if (realTimeData.activeMinutes < 30) {
      recommendations.push({
        type: 'activity',
        priority: 'medium',
        title: '增加活动时间',
        description: `今天活动时间${realTimeData.activeMinutes}分钟，建议达到30分钟`,
        icon: Activity,
        color: 'text-blue-600',
        action: '开始运动'
      });
    }

    // 基于睡眠的建议
    if (realTimeData.sleepHours < 7) {
      recommendations.push({
        type: 'sleep',
        priority: 'low',
        title: '改善睡眠',
        description: '昨晚睡眠不足7小时，今晚建议早点休息',
        icon: Moon,
        color: 'text-indigo-600',
        action: '睡眠提醒'
      });
    }
    setExerciseRecommendations(recommendations.slice(0, 3));
  };
  const handleRecommendationClick = recommendation => {
    toast({
      title: recommendation.title,
      description: recommendation.description
    });
    onExerciseRecommend?.(recommendation);
  };
  const getHealthStatus = () => {
    if (!realTimeData) return 'unknown';
    let score = 0;
    if (realTimeData.steps >= 8000) score += 25;
    if (realTimeData.heartRate >= 60 && realTimeData.heartRate <= 80) score += 25;
    if (realTimeData.sleepHours >= 7) score += 25;
    if (realTimeData.stressLevel <= 3) score += 25;
    if (score >= 75) return 'excellent';
    if (score >= 50) return 'good';
    if (score >= 25) return 'fair';
    return 'poor';
  };
  const getHealthStatusColor = status => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getHealthStatusText = status => {
    switch (status) {
      case 'excellent':
        return '优秀';
      case 'good':
        return '良好';
      case 'fair':
        return '一般';
      case 'poor':
        return '需改善';
      default:
        return '未知';
    }
  };
  const healthStatus = getHealthStatus();
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            智能穿戴数据监测
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">{isConnected ? '已连接' : '未连接'}</span>
            <span className="text-xs text-gray-500">最后同步: {lastSync.toLocaleTimeString()}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 实时数据卡片 */}
        {realTimeData && <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className={`text-xs px-2 py-1 rounded ${getHealthStatusColor(healthStatus)}`}>
                  {getHealthStatusText(healthStatus)}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{realTimeData.heartRate}</div>
              <div className="text-sm text-gray-600">心率 bpm</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Footprints className="w-5 h-5 text-blue-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{realTimeData.steps.toLocaleString()}</div>
              <div className="text-sm text-gray-600">今日步数</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <Zap className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{realTimeData.calories}</div>
              <div className="text-sm text-gray-600">卡路里</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Moon className="w-5 h-5 text-purple-500" />
                <Sun className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{realTimeData.sleepHours}</div>
              <div className="text-sm text-gray-600">睡眠时长</div>
            </div>
          </div>}

        {/* 运动建议 */}
        {exerciseRecommendations.length > 0 && <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              AI运动建议
            </h4>
            {exerciseRecommendations.map((recommendation, index) => {
          const Icon = recommendation.icon;
          return <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleRecommendationClick(recommendation)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-100 ${recommendation.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">{recommendation.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                    </div>
                  </div>
                  <Button size="sm" className="ml-3">
                    {recommendation.action}
                  </Button>
                </div>
              </div>;
        })}
          </div>}

        {/* 历史趋势图表 */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">7天健康趋势</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-700 mb-3">步数趋势</h5>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{
                  fontSize: 12
                }} />
                  <YAxis tick={{
                  fontSize: 12
                }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="steps" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-700 mb-3">心率变化</h5>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{
                  fontSize: 12
                }} />
                  <YAxis tick={{
                  fontSize: 12
                }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 详细数据 */}
        {realTimeData && <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">详细健康数据</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">活动时长</p>
                <p className="font-semibold text-gray-800">{realTimeData.activeMinutes} 分钟</p>
              </div>
              <div>
                <p className="text-gray-600">行走距离</p>
                <p className="font-semibold text-gray-800">{realTimeData.distance} 公里</p>
              </div>
              <div>
                <p className="text-gray-600">血氧饱和度</p>
                <p className="font-semibold text-gray-800">{realTimeData.bloodOxygen}%</p>
              </div>
              <div>
                <p className="text-gray-600">体温</p>
                <p className="font-semibold text-gray-800">{realTimeData.bodyTemperature}°C</p>
              </div>
              <div>
                <p className="text-gray-600">睡眠质量</p>
                <p className="font-semibold text-gray-800">{realTimeData.sleepQuality}%</p>
              </div>
              <div>
                <p className="text-gray-600">压力水平</p>
                <p className="font-semibold text-gray-800">{realTimeData.stressLevel}/5</p>
              </div>
              <div>
                <p className="text-gray-600">运动强度</p>
                <p className="font-semibold text-gray-800">{realTimeData.movementIntensity}</p>
              </div>
              <div>
                <p className="text-gray-600">消耗卡路里</p>
                <p className="font-semibold text-gray-800">{realTimeData.calories} kcal</p>
              </div>
            </div>
          </div>}
      </CardContent>
    </div>;
}