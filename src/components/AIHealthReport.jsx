// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { FileText, Download, Share2, Calendar, TrendingUp, AlertTriangle, CheckCircle, Brain, Heart, Activity, Target, RefreshCw, Eye, BarChart3 } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
export function AIHealthReport({
  userData,
  onReportGenerated,
  onShare
}) {
  const {
    toast
  } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reportType, setReportType] = useState('comprehensive');
  useEffect(() => {
    generateReport();
  }, [userData, selectedPeriod, reportType]);
  const generateReport = async () => {
    setIsGenerating(true);
    try {
      // 模拟AI报告生成过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mockReportData = {
        reportId: `RPT${Date.now()}`,
        generatedAt: new Date().toISOString(),
        period: selectedPeriod,
        type: reportType,
        overallScore: 85,
        healthAge: 32,
        actualAge: 35,
        // 健康趋势数据
        trends: {
          healthScore: [{
            date: '1月',
            score: 78
          }, {
            date: '2月',
            score: 80
          }, {
            date: '3月',
            score: 82
          }, {
            date: '4月',
            score: 83
          }, {
            date: '5月',
            score: 84
          }, {
            date: '6月',
            score: 85
          }],
          keyMetrics: [{
            name: '心血管',
            value: 88,
            max: 100
          }, {
            name: '免疫力',
            value: 82,
            max: 100
          }, {
            name: '代谢',
            value: 75,
            max: 100
          }, {
            name: '精神',
            value: 90,
            max: 100
          }, {
            name: '睡眠',
            value: 78,
            max: 100
          }]
        },
        // 健康风险评估
        risks: {
          low: ['心血管疾病', '糖尿病'],
          medium: ['骨质疏松', '轻度脂肪肝'],
          high: [],
          critical: []
        },
        // AI建议
        recommendations: [{
          category: '运动',
          priority: 'high',
          title: '增加有氧运动',
          description: '建议每周进行150分钟中等强度有氧运动，如快走、游泳或骑行',
          expectedImpact: '心血管健康提升15%'
        }, {
          category: '营养',
          priority: 'medium',
          title: '优化营养结构',
          description: '增加蔬菜水果摄入，减少高脂高糖食物，补充优质蛋白质',
          expectedImpact: '代谢功能改善10%'
        }, {
          category: '睡眠',
          priority: 'high',
          title: '改善睡眠质量',
          description: '保持规律作息，每晚7-8小时睡眠，睡前避免电子设备',
          expectedImpact: '精神状态提升20%'
        }],
        // 健康亮点
        highlights: ['健康评分较上月提升3分', '心血管功能持续改善', '免疫力水平稳定', '精神状态良好'],
        // 下月重点
        nextMonthFocus: ['重点关注肝功能指标', '增加力量训练', '定期监测血压', '保持健康饮食']
      };
      setReportData(mockReportData);
      onReportGenerated?.(mockReportData);
      toast({
        title: "健康报告生成完成",
        description: "AI已为您生成个性化健康报告"
      });
    } catch (error) {
      toast({
        title: "报告生成失败",
        description: "AI报告生成失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  const handleDownload = () => {
    toast({
      title: "下载报告",
      description: "正在生成PDF文件..."
    });
  };
  const handleShare = () => {
    onShare?.(reportData);
    toast({
      title: "分享报告",
      description: "正在生成分享链接..."
    });
  };
  const periods = [{
    id: 'week',
    name: '本周',
    description: '7天健康数据'
  }, {
    id: 'month',
    name: '本月',
    description: '30天健康数据'
  }, {
    id: 'quarter',
    name: '本季度',
    description: '90天健康数据'
  }, {
    id: 'year',
    name: '本年度',
    description: '365天健康数据'
  }];
  const reportTypes = [{
    id: 'comprehensive',
    name: '综合报告',
    description: '全面健康评估'
  }, {
    id: 'executive',
    name: '精简报告',
    description: '核心指标概览'
  }, {
    id: 'detailed',
    name: '详细报告',
    description: '深度数据分析'
  }];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  if (!reportData) {
    return <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">正在生成AI健康报告...</p>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            AI健康报告
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              下载
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </Button>
            <Button variant="outline" size="sm" onClick={generateReport} disabled={isGenerating}>
              {isGenerating ? <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  生成中...
                </> : <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重新生成
                </>}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 报告设置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">报告周期</label>
            <div className="grid grid-cols-2 gap-2">
              {periods.map(period => <button key={period.id} onClick={() => setSelectedPeriod(period.id)} className={`p-2 rounded-lg text-sm transition-colors ${selectedPeriod === period.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <div className="font-medium">{period.name}</div>
                  <div className="text-xs opacity-80">{period.description}</div>
                </button>)}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">报告类型</label>
            <div className="grid grid-cols-1 gap-2">
              {reportTypes.map(type => <button key={type.id} onClick={() => setReportType(type.id)} className={`p-2 rounded-lg text-sm transition-colors text-left ${reportType === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <div className="font-medium">{type.name}</div>
                  <div className="text-xs opacity-80">{type.description}</div>
                </button>)}
            </div>
          </div>
        </div>

        {/* 报告概览 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">健康概览</h3>
            <div className="text-sm text-gray-600">
              报告编号: {reportData.reportId}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{reportData.overallScore}</div>
              <div className="text-sm text-gray-600">健康评分</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{reportData.healthAge}</div>
              <div className="text-sm text-gray-600">健康年龄</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{reportData.actualAge - reportData.healthAge}</div>
              <div className="text-sm text-gray-600">年龄优势</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{reportData.trends.keyMetrics.length}</div>
              <div className="text-sm text-gray-600">评估指标</div>
            </div>
          </div>
        </div>

        {/* 健康趋势图表 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">健康趋势</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData.trends.healthScore}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} name="健康评分" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 关键指标雷达图 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">关键指标评估</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={reportData.trends.keyMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="健康指标" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 健康风险评估 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">健康风险评估</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-green-800">低风险</div>
              <div className="text-sm text-green-600">{reportData.risks.low.length}项</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-yellow-800">中风险</div>
              <div className="text-sm text-yellow-600">{reportData.risks.medium.length}项</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-orange-800">高风险</div>
              <div className="text-sm text-orange-600">{reportData.risks.high.length}项</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-red-800">危急风险</div>
              <div className="text-sm text-red-600">{reportData.risks.critical.length}项</div>
            </div>
          </div>
        </div>

        {/* AI建议 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">AI智能建议</h4>
          <div className="space-y-4">
            {reportData.recommendations.map((rec, index) => <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${rec.priority === 'high' ? 'bg-red-500' : rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <h5 className="font-semibold text-gray-800">{rec.title}</h5>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {rec.category}
                    </span>
                  </div>
                  <div className="text-sm text-green-600">
                    {rec.expectedImpact}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>)}
          </div>
        </div>

        {/* 健康亮点 */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            健康亮点
          </h4>
          <ul className="space-y-2">
            {reportData.highlights.map((highlight, index) => <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-green-700">{highlight}</span>
              </li>)}
          </ul>
        </div>

        {/* 下月重点 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            下月重点关注
          </h4>
          <ul className="space-y-2">
            {reportData.nextMonthFocus.map((focus, index) => <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-blue-700">{focus}</span>
              </li>)}
          </ul>
        </div>
      </CardContent>
    </Card>;
}