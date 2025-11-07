// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Activity, Heart, Brain, TrendingUp, TrendingDown, RefreshCw, AlertTriangle, CheckCircle, Watch, Smartphone, Target } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
export function SmartPlanAdjustment({
  currentPlan,
  wearableData,
  onPlanUpdate
}) {
  const {
    toast
  } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [adjustmentSuggestions, setAdjustmentSuggestions] = useState([]);
  const [currentMetrics, setCurrentMetrics] = useState({});
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);
  useEffect(() => {
    // 模拟穿戴设备数据
    const mockWearableData = {
      heartRate: {
        current: 72,
        average: 68,
        trend: 'stable',
        resting: 65
      },
      sleep: {
        duration: 7.5,
        quality: 85,
        deepSleep: 2.1,
        remSleep: 1.8,
        efficiency: 92
      },
      activity: {
        steps: 8542,
        calories: 420,
        activeMinutes: 45,
        distance: 6.2,
        floors: 12
      },
      stress: {
        level: 35,
        episodes: 2,
        recoveryTime: 15
      },
      oxygen: {
        saturation: 98,
        variability: 3.2
      }
    };
    setCurrentMetrics(mockWearableData);
    generateHistoricalData();
  }, []);
  useEffect(() => {
    if (wearableData) {
      setCurrentMetrics(wearableData);
      analyzeAndSuggest();
    }
  }, [wearableData]);
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
        heartRate: Math.floor(Math.random() * 10) + 65,
        sleepQuality: Math.floor(Math.random() * 20) + 75,
        activityLevel: Math.floor(Math.random() * 30) + 60,
        stressLevel: Math.floor(Math.random() * 25) + 25,
        planAdherence: Math.floor(Math.random() * 30) + 70
      });
    }
    setHistoricalData(data);
  };
  const analyzeAndSuggest = async () => {
    setIsAnalyzing(true);
    try {
      // 模拟AI分析过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      const suggestions = generateAdjustmentSuggestions();
      setAdjustmentSuggestions(suggestions);
      toast({
        title: "分析完成",
        description: `基于您的穿戴设备数据，生成了${suggestions.length}项调整建议`
      });
    } catch (error) {
      toast({
        title: "分析失败",
        description: "智能分析失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  const generateAdjustmentSuggestions = () => {
    const suggestions = [];

    // 基于心率数据
    if (currentMetrics.heartRate?.current > 80) {
      suggestions.push({
        id: 'heart_rate_high',
        type: 'exercise',
        priority: 'high',
        title: '调整有氧运动强度',
        description: '您的心率偏高，建议降低有氧运动强度，增加恢复性训练',
        currentPlan: '每周5次有氧运动，每次30分钟',
        suggestedPlan: '每周3次有氧运动+2次瑜伽/拉伸',
        reason: '静息心率偏高需要更多恢复时间',
        expectedImpact: '心率改善15-20%，恢复能力提升',
        icon: Heart,
        color: 'text-red-600'
      });
    }

    // 基于睡眠数据
    if (currentMetrics.sleep?.quality < 80) {
      suggestions.push({
        id: 'sleep_poor',
        type: 'lifestyle',
        priority: 'high',
        title: '优化睡眠质量',
        description: '您的睡眠质量偏低，建议调整作息时间和睡前习惯',
        currentPlan: '23:00入睡，7:00起床',
        suggestedPlan: '22:30入睡，6:30起床，添加冥想',
        reason: '深度睡眠不足影响身体恢复',
        expectedImpact: '睡眠质量提升20%，精力改善',
        icon: Brain,
        color: 'text-purple-600'
      });
    }

    // 基于活动数据
    if (currentMetrics.activity?.steps < 8000) {
      suggestions.push({
        id: 'activity_low',
        type: 'exercise',
        priority: 'medium',
        title: '增加日常活动量',
        description: '您的步数偏低，建议增加日常活动和碎片化运动',
        currentPlan: '每日8000步目标',
        suggestedPlan: '每日10000步+每小时站立活动5分钟',
        reason: '活动量不足影响代谢健康',
        expectedImpact: '代谢提升10%，体重管理改善',
        icon: Activity,
        color: 'text-blue-600'
      });
    }

    // 基于压力数据
    if (currentMetrics.stress?.level > 50) {
      suggestions.push({
        id: 'stress_high',
        type: 'lifestyle',
        priority: 'high',
        title: '加强压力管理',
        description: '您的压力水平偏高，建议增加放松训练和心理调节',
        currentPlan: '基础压力管理',
        suggestedPlan: '每日冥想15分钟+呼吸训练+周末户外活动',
        reason: '长期高压力影响免疫和内分泌系统',
        expectedImpact: '压力水平降低30%，情绪改善',
        icon: Brain,
        color: 'text-orange-600'
      });
    }

    // 如果没有问题，给出优化建议
    if (suggestions.length === 0) {
      suggestions.push({
        id: 'optimization',
        type: 'optimization',
        priority: 'low',
        title: '方案优化建议',
        description: '您的各项指标良好，可以进一步优化方案效果',
        currentPlan: '当前方案执行良好',
        suggestedPlan: '增加高强度间歇训练+营养补充优化',
        reason: '在良好基础上进一步提升效果',
        expectedImpact: '整体健康水平提升10-15%',
        icon: Target,
        color: 'text-green-600'
      });
    }
    return suggestions;
  };
  const handleApplyAdjustment = suggestion => {
    setSelectedAdjustment(suggestion);
    toast({
      title: "应用调整",
      description: `正在应用"${suggestion.title}"调整...`,
      action: <Button size="sm" onClick={() => confirmAdjustment(suggestion)}>
          确认应用
        </Button>
    });
  };
  const confirmAdjustment = suggestion => {
    onPlanUpdate?.(suggestion);
    toast({
      title: "调整已应用",
      description: `方案已更新：${suggestion.suggestedPlan}`
    });
    setSelectedAdjustment(null);
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getPriorityText = priority => {
    switch (priority) {
      case 'high':
        return '高优先级';
      case 'medium':
        return '中优先级';
      case 'low':
        return '低优先级';
      default:
        return '普通';
    }
  };
  const radarData = [{
    metric: '心率',
    value: currentMetrics.heartRate ? 100 - (currentMetrics.heartRate.current - 60) * 2 : 80,
    fullMark: 100
  }, {
    metric: '睡眠',
    value: currentMetrics.sleep?.quality || 80,
    fullMark: 100
  }, {
    metric: '活动',
    value: Math.min((currentMetrics.activity?.steps || 8000) / 100, 100),
    fullMark: 100
  }, {
    metric: '压力',
    value: 100 - (currentMetrics.stress?.level || 30),
    fullMark: 100
  }, {
    metric: '血氧',
    value: (currentMetrics.oxygen?.saturation || 98) * 1.02,
    fullMark: 100
  }];
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Smartphone className="w-5 h-5 mr-2" />
            智能方案调整
          </CardTitle>
          <Button variant="outline" size="sm" onClick={analyzeAndSuggest} disabled={isAnalyzing}>
            {isAnalyzing ? <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                分析中...
              </> : <>
                <RefreshCw className="w-4 h-4 mr-2" />
                重新分析
              </>}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 实时数据展示 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{currentMetrics.heartRate?.current || '--'}</div>
            <div className="text-sm text-gray-600">心率 (bpm)</div>
            {currentMetrics.heartRate?.trend && <div className="flex items-center justify-center mt-1">
                {currentMetrics.heartRate.trend === 'up' ? <TrendingUp className="w-4 h-4 text-red-500" /> : <TrendingDown className="w-4 h-4 text-green-500" />}
              </div>}
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{currentMetrics.sleep?.quality || '--'}</div>
            <div className="text-sm text-gray-600">睡眠质量</div>
            <div className="text-xs text-gray-500 mt-1">
              {currentMetrics.sleep?.duration || '--'}小时
            </div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{currentMetrics.activity?.steps || '--'}</div>
            <div className="text-sm text-gray-600">今日步数</div>
            <div className="text-xs text-gray-500 mt-1">
              {currentMetrics.activity?.calories || '--'}卡路里
            </div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{currentMetrics.stress?.level || '--'}</div>
            <div className="text-sm text-gray-600">压力水平</div>
            <div className="text-xs text-gray-500 mt-1">
              {currentMetrics.stress?.episodes || '--'}次
            </div>
          </div>
        </div>

        {/* 健康雷达图 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">健康指标雷达图</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="当前状态" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 历史趋势 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">7天健康趋势</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="心率" />
              <Line type="monotone" dataKey="sleepQuality" stroke="#8b5cf6" strokeWidth={2} name="睡眠质量" />
              <Line type="monotone" dataKey="activityLevel" stroke="#3b82f6" strokeWidth={2} name="活动水平" />
              <Line type="monotone" dataKey="stressLevel" stroke="#f59e0b" strokeWidth={2} name="压力水平" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 调整建议 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">AI调整建议</h4>
          {adjustmentSuggestions.length === 0 ? <div className="text-center py-8">
              <Watch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">等待数据分析</h3>
              <p className="text-gray-500">点击"重新分析"按钮获取智能调整建议</p>
            </div> : <div className="space-y-4">
              {adjustmentSuggestions.map(suggestion => {
            const Icon = suggestion.icon;
            return <div key={suggestion.id} className={`border rounded-lg p-4 ${getPriorityColor(suggestion.priority)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${suggestion.color}`} />
                      <div>
                        <h5 className="font-semibold text-gray-800">{suggestion.title}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(suggestion.priority)}`}>
                          {getPriorityText(suggestion.priority)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{suggestion.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">当前方案:</p>
                      <p className="text-sm font-medium">{suggestion.currentPlan}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">建议方案:</p>
                      <p className="text-sm font-medium text-green-700">{suggestion.suggestedPlan}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/50 rounded p-3 mb-3">
                    <p className="text-xs text-gray-600 mb-1">调整原因:</p>
                    <p className="text-sm">{suggestion.reason}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600">预期效果: </span>
                      <span className="font-medium text-green-700">{suggestion.expectedImpact}</span>
                    </div>
                    <Button size="sm" onClick={() => handleApplyAdjustment(suggestion)}>
                      应用调整
                    </Button>
                  </div>
                </div>;
          })}
            </div>}
        </div>
      </CardContent>
    </Card>;
}