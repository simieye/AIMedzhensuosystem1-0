// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, TrendingUp, TrendingDown, Shield, Activity, Heart, Brain, Target, RefreshCw, Download, Share2 } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
export function RiskAssessment({
  healthData,
  symptoms,
  onRiskUpdate
}) {
  const {
    toast
  } = useToast();
  const [riskScores, setRiskScores] = useState({});
  const [historicalData, setHistoricalData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  useEffect(() => {
    calculateRiskScores();
    generateHistoricalData();
  }, [healthData, symptoms]);
  const calculateRiskScores = () => {
    // 模拟风险评估算法
    const baseScores = {
      cardiovascular: 15,
      metabolic: 20,
      neurological: 10,
      immune: 8,
      mental: 12
    };

    // 基于健康数据调整风险分数
    if (healthData) {
      // 心血管风险评估
      if (healthData.cholesterol > 5.2) baseScores.cardiovascular += 15;
      if (healthData.bloodPressure?.systolic > 140) baseScores.cardiovascular += 10;
      if (healthData.heartRate > 100) baseScores.cardiovascular += 5;

      // 代谢风险评估
      if (healthData.bmi > 25) baseScores.metabolic += 10;
      if (healthData.glucose > 6.1) baseScores.metabolic += 15;
      if (healthData.triglycerides > 1.7) baseScores.metabolic += 10;

      // 神经系统风险评估
      if (symptoms?.includes('头痛') || symptoms?.includes('头晕')) baseScores.neurological += 8;
      if (symptoms?.includes('失眠') || symptoms?.includes('疲劳')) baseScores.neurological += 5;

      // 免疫系统风险评估
      if (symptoms?.includes('感染') || symptoms?.includes('发热')) baseScores.immune += 10;
      if (healthData.whiteBloodCells < 4 || healthData.whiteBloodCells > 10) baseScores.immune += 8;

      // 心理健康风险评估
      if (symptoms?.includes('焦虑') || symptoms?.includes('抑郁')) baseScores.mental += 15;
      if (symptoms?.includes('压力')) baseScores.mental += 8;
    }

    // 确保分数在合理范围内
    Object.keys(baseScores).forEach(key => {
      baseScores[key] = Math.min(100, Math.max(0, baseScores[key]));
    });
    setRiskScores(baseScores);
    onRiskUpdate?.(baseScores);
    setLastUpdate(new Date());
  };
  const generateHistoricalData = () => {
    // 生成历史风险数据
    const data = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      data.push({
        month: date.toLocaleDateString('zh-CN', {
          month: 'short'
        }),
        cardiovascular: Math.floor(Math.random() * 20) + 10,
        metabolic: Math.floor(Math.random() * 25) + 15,
        neurological: Math.floor(Math.random() * 15) + 8,
        immune: Math.floor(Math.random() * 12) + 5,
        mental: Math.floor(Math.random() * 18) + 10
      });
    }
    setHistoricalData(data);
  };
  const updateRiskScores = async () => {
    setIsUpdating(true);
    try {
      // 模拟AI重新评估
      await new Promise(resolve => setTimeout(resolve, 2000));
      calculateRiskScores();
      toast({
        title: "风险评估更新",
        description: "基于最新数据重新评估了健康风险"
      });
    } catch (error) {
      toast({
        title: "更新失败",
        description: "风险评估更新失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };
  const getRiskLevel = score => {
    if (score < 20) return {
      level: '低',
      color: 'text-green-600 bg-green-100',
      icon: Shield
    };
    if (score < 40) return {
      level: '中等',
      color: 'text-yellow-600 bg-yellow-100',
      icon: AlertTriangle
    };
    if (score < 60) return {
      level: '高',
      color: 'text-orange-600 bg-orange-100',
      icon: Activity
    };
    return {
      level: '极高',
      color: 'text-red-600 bg-red-100',
      icon: AlertTriangle
    };
  };
  const getOverallRisk = () => {
    const scores = Object.values(riskScores);
    if (scores.length === 0) return 0;
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(average);
  };
  const riskCategories = [{
    id: 'cardiovascular',
    name: '心血管风险',
    icon: Heart,
    description: '心脏病、高血压、中风等风险',
    color: 'text-red-600'
  }, {
    id: 'metabolic',
    name: '代谢风险',
    icon: Activity,
    description: '糖尿病、肥胖、血脂异常等风险',
    color: 'text-blue-600'
  }, {
    id: 'neurological',
    name: '神经风险',
    icon: Brain,
    description: '神经系统疾病、认知障碍等风险',
    color: 'text-purple-600'
  }, {
    id: 'immune',
    name: '免疫风险',
    icon: Shield,
    description: '免疫系统疾病、感染风险等',
    color: 'text-green-600'
  }, {
    id: 'mental',
    name: '心理风险',
    icon: Target,
    description: '心理健康、情绪障碍等风险',
    color: 'text-orange-600'
  }];
  const radarData = riskCategories.map(category => ({
    category: category.name,
    score: riskScores[category.id] || 0,
    fullMark: 100
  }));
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            健康风险评估
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={updateRiskScores} disabled={isUpdating}>
              {isUpdating ? <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  更新中...
                </> : <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重新评估
                </>}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 总体风险评分 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">综合健康风险评分</h3>
              <p className="text-gray-600">基于您的健康数据和症状分析</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{getOverallRisk()}</div>
              <div className="text-sm text-gray-600">风险指数</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className={`h-3 rounded-full transition-all duration-500 ${getOverallRisk() < 20 ? 'bg-green-500' : getOverallRisk() < 40 ? 'bg-yellow-500' : getOverallRisk() < 60 ? 'bg-orange-500' : 'bg-red-500'}`} style={{
              width: `${getOverallRisk()}%`
            }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>低风险</span>
              <span>中等风险</span>
              <span>高风险</span>
              <span>极高风险</span>
            </div>
          </div>
        </div>

        {/* 各项风险评分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskCategories.map(category => {
          const Icon = category.icon;
          const score = riskScores[category.id] || 0;
          const riskLevel = getRiskLevel(score);
          const RiskIcon = riskLevel.icon;
          return <Card key={category.id} className="border-l-4 border-l-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                    <h4 className="font-semibold text-gray-800">{category.name}</h4>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${riskLevel.color}`}>
                    {riskLevel.level}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl font-bold text-gray-800">{score}</span>
                    <RiskIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-500 ${score < 20 ? 'bg-green-500' : score < 40 ? 'bg-yellow-500' : score < 60 ? 'bg-orange-500' : 'bg-red-500'}`} style={{
                    width: `${score}%`
                  }}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardContent>
            </Card>;
        })}
        </div>

        {/* 雷达图 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">风险分布雷达图</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="风险评分" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">历史趋势</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cardiovascular" stroke="#ef4444" strokeWidth={2} name="心血管" />
                <Line type="monotone" dataKey="metabolic" stroke="#3b82f6" strokeWidth={2} name="代谢" />
                <Line type="monotone" dataKey="neurological" stroke="#8b5cf6" strokeWidth={2} name="神经" />
                <Line type="monotone" dataKey="immune" stroke="#10b981" strokeWidth={2} name="免疫" />
                <Line type="monotone" dataKey="mental" stroke="#f59e0b" strokeWidth={2} name="心理" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 风险建议 */}
        <div className="bg-yellow-50 rounded-xl p-6">
          <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            风险管理建议
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(riskScores).map(([key, score]) => {
            const category = riskCategories.find(cat => cat.id === key);
            const riskLevel = getRiskLevel(score);
            if (score >= 40) {
              return <div key={key} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${score >= 60 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{category?.name}风险{riskLevel.level}</p>
                    <p className="text-sm text-gray-600">建议定期检查，积极干预</p>
                  </div>
                </div>;
            }
            return null;
          })}
          </div>
        </div>

        {/* 最后更新时间 */}
        {lastUpdate && <div className="text-center text-sm text-gray-500">
            最后更新: {lastUpdate.toLocaleString('zh-CN')}
          </div>}
      </CardContent>
    </Card>;
}