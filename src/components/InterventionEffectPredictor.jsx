// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { TrendingDown, TrendingUp, Target, Brain, Activity, Calendar, BarChart3, Zap, Clock, CheckCircle, AlertTriangle, Info } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
export function InterventionEffectPredictor({
  currentAge,
  healthData,
  interventionPlan,
  className = ''
}) {
  const {
    toast
  } = useToast;
  const [predictionData, setPredictionData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [confidenceLevel, setConfidenceLevel] = useState(85);
  const timeframes = [{
    id: '1month',
    name: '1个月',
    days: 30
  }, {
    id: '3months',
    name: '3个月',
    days: 90
  }, {
    id: '6months',
    name: '6个月',
    days: 180
  }, {
    id: '1year',
    name: '1年',
    days: 365
  }];

  // 模拟干预效果预测算法
  const calculatePrediction = async timeframe => {
    setIsCalculating(true);

    // 模拟AI计算过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    const timeframeData = timeframes.find(tf => tf.id === timeframe);
    const baseAgeReduction = 0.1; // 基础年龄减少（每月）
    const interventionBonus = interventionPlan ? interventionPlan.effectiveness : 0.05;
    const healthBonus = healthData ? (healthData.overallScore - 50) / 1000 : 0;
    const totalReduction = baseAgeReduction + interventionBonus + healthBonus;
    const predictedReduction = totalReduction * timeframeData.days / 30;

    // 生成预测数据
    const prediction = {
      currentAge: currentAge || 52.3,
      predictedAge: Math.max((currentAge || 52.3) - predictedReduction, 45),
      ageReduction: predictedReduction,
      timeframe: timeframeData.name,
      confidence: confidenceLevel,
      factors: [{
        name: 'NMN补充',
        impact: 0.08,
        description: '提升NAD+水平，改善细胞功能'
      }, {
        name: '规律运动',
        impact: 0.06,
        description: '增强心血管功能，提高代谢'
      }, {
        name: '优质睡眠',
        impact: 0.04,
        description: '促进身体修复，减少炎症'
      }, {
        name: '压力管理',
        impact: 0.03,
        description: '降低皮质醇，改善免疫'
      }, {
        name: '营养均衡',
        impact: 0.05,
        description: '提供必需营养，支持修复'
      }],
      monthlyProgress: generateMonthlyProgress(currentAge || 52.3, predictedReduction, timeframeData.days),
      riskFactors: [{
        name: '遗传因素',
        impact: -0.02,
        probability: 0.3
      }, {
        name: '环境因素',
        impact: -0.01,
        probability: 0.2
      }, {
        name: '依从性',
        impact: -0.03,
        probability: 0.4
      }],
      recommendations: ['坚持每日NMN补充，建议早餐后服用', '保持每周至少150分钟中等强度运动', '确保每晚7-8小时优质睡眠', '定期监测健康指标，调整方案', '保持积极心态，减少慢性压力']
    };
    setPredictionData(prediction);
    setIsCalculating(false);
    toast({
      title: "预测完成",
      description: `AI预测您在${timeframeData.name}内可减少生物龄${predictedReduction.toFixed(2)}岁`
    });
  };
  const generateMonthlyProgress = (startAge, totalReduction, days) => {
    const months = Math.ceil(days / 30);
    const data = [];
    for (let i = 0; i <= months; i++) {
      const progress = i / months;
      const nonLinearProgress = 1 - Math.pow(1 - progress, 1.5); // 非线性进展
      const currentReduction = totalReduction * nonLinearProgress;
      data.push({
        month: i === 0 ? '当前' : `${i}个月`,
        age: startAge - currentReduction,
        reduction: currentReduction,
        confidence: confidenceLevel - i * 2 // 置信度随时间递减
      });
    }
    return data;
  };
  useEffect(() => {
    calculatePrediction(selectedTimeframe);
  }, [selectedTimeframe]);
  const getConfidenceColor = level => {
    if (level >= 80) return 'text-green-600 bg-green-100';
    if (level >= 60) return 'text-blue-600 bg-blue-100';
    if (level >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
  const getConfidenceText = level => {
    if (level >= 80) return '高置信度';
    if (level >= 60) return '中等置信度';
    if (level >= 40) return '低置信度';
    return '极低置信度';
  };
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            AI干预效果预测
          </div>
          <div className="flex items-center space-x-2">
            <select value={selectedTimeframe} onChange={e => setSelectedTimeframe(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {timeframes.map(timeframe => <option key={timeframe.id} value={timeframe.id}>{timeframe.name}</option>)}
            </select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isCalculating ? <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">AI正在分析您的健康数据并预测干预效果...</p>
          </div> : predictionData && <div className="space-y-6">
            {/* 预测结果概览 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">{predictionData.currentAge.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">当前生物年龄</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{predictionData.predictedAge.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">预测生物年龄</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">-{predictionData.ageReduction.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">预计减少年龄</div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center">
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${getConfidenceColor(predictionData.confidence)}`}>
                  <Info className="w-4 h-4 inline mr-2" />
                  {getConfidenceText(predictionData.confidence)} ({predictionData.confidence}%)
                </div>
              </div>
            </div>

            {/* 进度趋势图 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingDown className="w-5 h-5 mr-2" />
                生物龄下降趋势
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={predictionData.monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                    <Tooltip />
                    <Area type="monotone" dataKey="age" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 影响因素分析 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                影响因素分析
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {predictionData.factors.map((factor, index) => <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-800">{factor.name}</h5>
                      <span className="text-sm font-medium text-green-600">+{factor.impact.toFixed(2)}岁</span>
                    </div>
                    <p className="text-sm text-gray-600">{factor.description}</p>
                  </div>)}
              </div>
            </div>

            {/* 风险因素 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                潜在风险因素
              </h4>
              <div className="space-y-3">
                {predictionData.riskFactors.map((risk, index) => <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <div>
                        <h5 className="font-medium text-gray-800">{risk.name}</h5>
                        <p className="text-sm text-gray-600">可能影响效果: {Math.abs(risk.impact).toFixed(2)}岁</p>
                      </div>
                    </div>
                    <span className="text-sm text-red-600">{(risk.probability * 100).toFixed(0)}%概率</span>
                  </div>)}
              </div>
            </div>

            {/* 个性化建议 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                个性化建议
              </h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-3">
                  {predictionData.recommendations.map((recommendation, index) => <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{recommendation}</span>
                    </li>)}
                </ul>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                制定详细计划
              </Button>
              <Button variant="outline" className="flex-1">
                <Activity className="w-4 h-4 mr-2" />
                调整干预方案
              </Button>
            </div>
          </div>}
      </CardContent>
    </div>;
}