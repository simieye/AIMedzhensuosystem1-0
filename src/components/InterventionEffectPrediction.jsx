// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, Target, Activity, Heart, Brain, Calendar, BarChart3, LineChart as LineChartIcon, RefreshCw, Download, Share2, Zap } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from 'recharts';
export function InterventionEffectPrediction({
  currentPlan,
  userMetrics,
  healthGoals
}) {
  const {
    toast
  } = useToast();
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [comparisonMode, setComparisonMode] = useState('with_without');
  const [selectedMetrics, setSelectedMetrics] = useState(['all']);
  useEffect(() => {
    generatePrediction();
  }, [currentPlan, userMetrics, healthGoals]);
  const generatePrediction = async () => {
    setIsPredicting(true);
    try {
      // 模拟AI预测过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockPrediction = generateMockPrediction();
      setPredictionData(mockPrediction);
      toast({
        title: "预测完成",
        description: "AI已生成干预效果预测报告"
      });
    } catch (error) {
      toast({
        title: "预测失败",
        description: "效果预测失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsPredicting(false);
    }
  };
  const generateMockPrediction = () => {
    const timeframes = {
      '1month': 30,
      '3months': 90,
      '6months': 180,
      '1year': 365
    };
    const days = timeframes[selectedTimeframe];
    const data = [];

    // 生成基线数据（无干预）
    const baselineData = {
      healthScore: userMetrics?.healthScore || 75,
      weight: userMetrics?.weight || 75,
      heartRate: userMetrics?.restingHeartRate || 72,
      bloodPressure: userMetrics?.bloodPressure || 120,
      energy: userMetrics?.energy || 70,
      sleep: userMetrics?.sleepQuality || 75
    };

    // 生成预测数据
    for (let i = 0; i <= days; i += Math.ceil(days / 12)) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      // 无干预的缓慢恶化
      const baselineDecay = 1 - i / days * 0.05;

      // 有干预的改善
      const interventionImprovement = 1 + i / days * 0.15;
      data.push({
        date: date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        }),
        day: i,
        baseline: {
          healthScore: Math.round(baselineData.healthScore * baselineDecay),
          weight: Math.round(baselineData.weight * (1 + i / days * 0.03)),
          heartRate: Math.round(baselineData.heartRate * (1 + i / days * 0.02)),
          bloodPressure: Math.round(baselineData.bloodPressure * (1 + i / days * 0.01)),
          energy: Math.round(baselineData.energy * baselineDecay),
          sleep: Math.round(baselineData.sleep * baselineDecay)
        },
        withIntervention: {
          healthScore: Math.min(100, Math.round(baselineData.healthScore * interventionImprovement)),
          weight: Math.round(baselineData.weight * (1 - i / days * 0.08)),
          heartRate: Math.round(baselineData.heartRate * (1 - i / days * 0.05)),
          bloodPressure: Math.round(baselineData.bloodPressure * (1 - i / days * 0.03)),
          energy: Math.min(100, Math.round(baselineData.energy * interventionImprovement)),
          sleep: Math.min(100, Math.round(baselineData.sleep * interventionImprovement))
        }
      });
    }
    return {
      timeframe: selectedTimeframe,
      data,
      summary: {
        healthScoreImprovement: '+15分',
        weightReduction: '-6kg',
        heartRateImprovement: '-4bpm',
        bloodPressureImprovement: '-4mmHg',
        energyImprovement: '+20分',
        sleepImprovement: '+18分',
        confidence: 87,
        keyFactors: ['规律运动', '营养优化', '睡眠改善', '压力管理']
      },
      recommendations: ['坚持当前干预方案，预计3个月后显著改善', '重点关注睡眠质量，对整体健康影响最大', '适当增加有氧运动强度，可加速效果', '定期监测指标，及时调整方案']
    };
  };
  const handleTimeframeChange = timeframe => {
    setSelectedTimeframe(timeframe);
    setTimeout(() => {
      generatePrediction();
    }, 100);
  };
  const handleExport = () => {
    toast({
      title: "导出预测报告",
      description: "正在生成PDF报告..."
    });
  };
  const handleShare = () => {
    toast({
      title: "分享预测结果",
      description: "正在生成分享链接..."
    });
  };
  const timeframes = [{
    id: '1month',
    name: '1个月',
    description: '短期效果预测'
  }, {
    id: '3months',
    name: '3个月',
    description: '中期效果预测'
  }, {
    id: '6months',
    name: '6个月',
    description: '长期效果预测'
  }, {
    id: '1year',
    name: '1年',
    description: '年度效果预测'
  }];
  const metrics = [{
    id: 'healthScore',
    name: '健康评分',
    color: '#3b82f6',
    unit: '分'
  }, {
    id: 'weight',
    name: '体重',
    color: '#ef4444',
    unit: 'kg'
  }, {
    id: 'heartRate',
    name: '静息心率',
    color: '#f59e0b',
    unit: 'bpm'
  }, {
    id: 'bloodPressure',
    name: '血压',
    color: '#8b5cf6',
    unit: 'mmHg'
  }, {
    id: 'energy',
    name: '精力水平',
    color: '#10b981',
    unit: '分'
  }, {
    id: 'sleep',
    name: '睡眠质量',
    color: '#6366f1',
    unit: '分'
  }];
  const getMetricData = metricId => {
    if (!predictionData) return [];
    return predictionData.data.map(item => ({
      date: item.date,
      baseline: item.baseline[metricId],
      withIntervention: item.withIntervention[metricId]
    }));
  };
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            干预效果预测
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </Button>
            <Button variant="outline" size="sm" onClick={generatePrediction} disabled={isPredicting}>
              {isPredicting ? <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  预测中...
                </> : <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重新预测
                </>}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 时间范围选择 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">预测时间范围</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {timeframes.map(timeframe => <button key={timeframe.id} onClick={() => handleTimeframeChange(timeframe.id)} className={`p-3 rounded-lg text-sm font-medium transition-colors ${selectedTimeframe === timeframe.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <div className="font-semibold">{timeframe.name}</div>
                <div className="text-xs opacity-80">{timeframe.description}</div>
              </button>)}
          </div>
        </div>

        {/* 预测摘要 */}
        {predictionData && <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">AI预测摘要</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{predictionData.summary.healthScoreImprovement}</div>
                <div className="text-sm text-gray-600">健康评分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{predictionData.summary.weightReduction}</div>
                <div className="text-sm text-gray-600">体重变化</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{predictionData.summary.heartRateImprovement}</div>
                <div className="text-sm text-gray-600">心率改善</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{predictionData.summary.bloodPressureImprovement}</div>
                <div className="text-sm text-gray-600">血压改善</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{predictionData.summary.energyImprovement}</div>
                <div className="text-sm text-gray-600">精力提升</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{predictionData.summary.sleepImprovement}</div>
                <div className="text-sm text-gray-600">睡眠改善</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                预测置信度: <span className="font-semibold text-blue-600">{predictionData.summary.confidence}%</span>
              </div>
              <div className="text-sm text-gray-600">
                关键因素: {predictionData.summary.keyFactors.join('、')}
              </div>
            </div>
          </div>}

        {/* 对比模式选择 */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">对比模式:</span>
          <div className="flex space-x-2">
            <button onClick={() => setComparisonMode('with_without')} className={`px-3 py-1 rounded text-sm ${comparisonMode === 'with_without' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              有/无干预对比
            </button>
            <button onClick={() => setComparisonMode('trend')} className={`px-3 py-1 rounded text-sm ${comparisonMode === 'trend' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              趋势分析
            </button>
          </div>
        </div>

        {/* 预测图表 */}
        {predictionData && <div className="space-y-6">
            {/* 健康评分预测 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">健康评分预测</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="baseline.healthScore" stroke="#ef4444" strokeWidth={2} name="无干预" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="withIntervention.healthScore" stroke="#3b82f6" strokeWidth={3} name="有干预" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 体重预测 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">体重变化预测</h4>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={predictionData.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="baseline.weight" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="无干预" />
                  <Area type="monotone" dataKey="withIntervention.weight" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} name="有干预" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 综合指标对比 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">综合指标对比</h4>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={predictionData.data.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="baseline.energy" fill="#fbbf24" name="无干预-精力" />
                  <Bar dataKey="withIntervention.energy" fill="#10b981" name="有干预-精力" />
                  <Line type="monotone" dataKey="baseline.sleep" stroke="#8b5cf6" strokeWidth={2} name="无干预-睡眠" />
                  <Line type="monotone" dataKey="withIntervention.sleep" stroke="#6366f1" strokeWidth={2} name="有干预-睡眠" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>}

        {/* AI建议 */}
        {predictionData && <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              AI智能建议
            </h4>
            <ul className="space-y-2">
              {predictionData.recommendations.map((rec, index) => <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-green-700">{rec}</span>
                </li>)}
            </ul>
          </div>}

        {/* 预测说明 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">预测说明</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• 本预测基于AI算法分析您的历史数据和当前方案</p>
            <p>• 预测结果仅供参考，实际效果可能因个体差异而有所不同</p>
            <p>• 建议定期监测健康指标，及时调整干预方案</p>
            <p>• 如有身体不适，请及时咨询专业医生</p>
          </div>
        </div>
      </CardContent>
    </Card>;
}