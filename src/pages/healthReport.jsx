// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Download, Share2, Calendar, TrendingUp, Heart, Brain, Activity, Shield, Target, Clock, Award, AlertTriangle, CheckCircle, FileText, BarChart3 } from 'lucide-react';

// @ts-ignore;
import { HealthTrendChart, HealthRadarChart, HealthScoreDistribution } from '@/components/HealthChart';
// @ts-ignore;
import { HealthScoreCard } from '@/components/HealthScoreCard';
export default function HealthReport(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);
  useEffect(() => {
    // 模拟生成报告数据
    const generateReportData = () => {
      return {
        overallScore: 85,
        healthAge: 32,
        actualAge: 35,
        generatedDate: '2024-01-15',
        validUntil: '2024-04-15',
        dimensions: [{
          dimension: '心血管健康',
          score: 88,
          status: 'excellent',
          trend: 'up'
        }, {
          dimension: '代谢功能',
          score: 75,
          status: 'good',
          trend: 'stable'
        }, {
          dimension: '免疫系统',
          score: 92,
          status: 'excellent',
          trend: 'up'
        }, {
          dimension: '神经系统',
          score: 80,
          status: 'good',
          trend: 'stable'
        }, {
          dimension: '骨骼肌肉',
          score: 78,
          status: 'good',
          trend: 'down'
        }, {
          dimension: '心理健康',
          score: 85,
          status: 'excellent',
          trend: 'up'
        }],
        recommendations: [{
          category: '运动建议',
          priority: 'high',
          content: '建议每周进行至少150分钟的中等强度有氧运动，如快走、游泳等',
          icon: Activity
        }, {
          category: '饮食调整',
          priority: 'medium',
          content: '减少高盐高脂食物摄入，增加蔬菜水果比例，保持营养均衡',
          icon: Heart
        }, {
          category: '作息规律',
          priority: 'high',
          content: '保持规律作息，确保每天7-8小时充足睡眠',
          icon: Clock
        }, {
          category: '压力管理',
          priority: 'medium',
          content: '学习放松技巧，适当进行冥想或瑜伽练习',
          icon: Brain
        }],
        riskFactors: [{
          factor: '血压偏高',
          level: 'moderate',
          description: '需要定期监测并控制'
        }, {
          factor: '体重超标',
          level: 'low',
          description: '建议适当减重5-10%'
        }, {
          factor: '缺乏运动',
          level: 'high',
          description: '需要增加日常运动量'
        }],
        trends: [{
          month: '8月',
          score: 78
        }, {
          month: '9月',
          score: 80
        }, {
          month: '10月',
          score: 82
        }, {
          month: '11月',
          score: 83
        }, {
          month: '12月',
          score: 84
        }, {
          month: '1月',
          score: 85
        }]
      };
    };
    setReportData(generateReportData());
  }, []);
  const handleDownload = () => {
    toast({
      title: "下载中",
      description: "正在生成PDF报告..."
    });
    // 模拟下载
    setTimeout(() => {
      toast({
        title: "下载成功",
        description: "健康报告已下载到您的设备"
      });
    }, 2000);
  };
  const handleShare = () => {
    toast({
      title: "分享功能",
      description: "正在生成分享链接..."
    });
  };
  const getRiskLevelColor = level => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  if (!reportData) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">生成报告中...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateBack()}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                返回
              </Button>
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">健康寿命报告</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
              <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                下载PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* 报告概览 */}
        <Card className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{reportData.overallScore}</div>
                <div className="text-blue-100">总体健康评分</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{reportData.healthAge}</div>
                <div className="text-blue-100">健康年龄</div>
                <div className="text-sm text-blue-200 mt-1">实际年龄: {reportData.actualAge}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">+3</div>
                <div className="text-blue-100">健康寿命</div>
                <div className="text-sm text-blue-200 mt-1">预期延长</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{reportData.generatedDate}</div>
                <div className="text-blue-100">生成日期</div>
                <div className="text-sm text-blue-200 mt-1">有效期至: {reportData.validUntil}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 健康维度分析 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                健康维度评分
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportData.dimensions.map((dimension, index) => <HealthScoreCard key={index} {...dimension} />)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                健康雷达图
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HealthRadarChart data={reportData.dimensions} />
            </CardContent>
          </Card>
        </div>

        {/* 健康趋势 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              健康趋势分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <HealthTrendChart data={reportData.trends} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">评分分布</h4>
                <HealthScoreDistribution data={reportData.dimensions} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 个性化建议 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              个性化健康建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportData.recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{rec.category}</h4>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority === 'high' ? '高优先级' : rec.priority === 'medium' ? '中优先级' : '低优先级'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{rec.content}</p>
                    </div>
                  </div>
                </div>;
            })}
            </div>
          </CardContent>
        </Card>

        {/* 风险提示 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              健康风险提示
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.riskFactors.map((risk, index) => <div key={index} className={`border rounded-lg p-4 ${getRiskLevelColor(risk.level)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5" />
                      <div>
                        <h4 className="font-semibold">{risk.factor}</h4>
                        <p className="text-sm opacity-80">{risk.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {risk.level === 'high' ? '高风险' : risk.level === 'moderate' ? '中风险' : '低风险'}
                    </Badge>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 报告说明 */}
        <Alert className="border-blue-200 bg-blue-50">
          <CheckCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>报告说明：</strong>本报告基于您的健康数据生成，仅供参考。如有健康问题，请咨询专业医生。建议每3个月重新生成一次报告以跟踪健康状况变化。
          </AlertDescription>
        </Alert>
      </div>
    </div>;
}