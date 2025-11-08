// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Settings, Shield, Heart, Brain, Activity, Calendar, Award, FileText, Share2, Download, RefreshCw, TrendingUp, Clock, Star, Zap, ChevronRight, Eye, MessageCircle, Dna, Target, Gift, CreditCard, Bell, CheckCircle, AlertCircle, Info, X, BarChart3, PieChart } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { AIAssistant } from '@/components/AIAssistant';
// @ts-ignore;
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
export default function PersonalCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [showOrganDetail, setShowOrganDetail] = useState(false);
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [renewalReminder, setRenewalReminder] = useState(null);
  const [geneAnalysis, setGeneAnalysis] = useState(null);
  const [showGeneDetail, setShowGeneDetail] = useState(false);
  const [shareOptions, setShareOptions] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isProcessingRenewal, setIsProcessingRenewal] = useState(false);
  const organDetailRef = useRef(null);

  // 3D器官数据
  const organsData = [{
    id: 'brain',
    name: '大脑',
    position: {
      x: 50,
      y: 20
    },
    health: 92,
    status: 'excellent',
    issues: [],
    color: '#8b5cf6',
    description: '认知功能良好，记忆力正常',
    metrics: {
      memory: 88,
      focus: 90,
      reaction: 85,
      creativity: 92
    },
    recommendations: ['保持充足睡眠', '进行脑力训练', '补充Omega-3脂肪酸']
  }, {
    id: 'heart',
    name: '心脏',
    position: {
      x: 50,
      y: 35
    },
    health: 85,
    status: 'good',
    issues: ['心率略高'],
    color: '#ef4444',
    description: '心血管功能基本正常，需要关注心率',
    metrics: {
      heartRate: 78,
      bloodPressure: '125/82',
      hrv: 45,
      vo2max: 42
    },
    recommendations: ['增加有氧运动', '减少咖啡因摄入', '控制盐分摄入']
  }, {
    id: 'lungs',
    name: '肺部',
    position: {
      x: 45,
      y: 30
    },
    health: 90,
    status: 'excellent',
    issues: [],
    color: '#06b6d4',
    description: '肺功能良好，呼吸系统健康',
    metrics: {
      lungCapacity: 95,
      oxygenSaturation: 98,
      breathingRate: 16,
      fev1: 88
    },
    recommendations: ['保持规律运动', '避免吸烟环境', '进行深呼吸练习']
  }, {
    id: 'liver',
    name: '肝脏',
    position: {
      x: 55,
      y: 40
    },
    health: 78,
    status: 'fair',
    issues: ['轻度脂肪肝'],
    color: '#f59e0b',
    description: '肝功能轻度异常，需要注意饮食',
    metrics: {
      alt: 35,
      ast: 32,
      bilirubin: 1.2,
      albumin: 4.2
    },
    recommendations: ['控制脂肪摄入', '增加运动量', '定期复查肝功能']
  }, {
    id: 'kidneys',
    name: '肾脏',
    position: {
      x: 50,
      y: 45
    },
    health: 88,
    status: 'good',
    issues: [],
    color: '#ec4899',
    description: '肾功能正常，代谢良好',
    metrics: {
      creatinine: 0.9,
      bun: 18,
      egfr: 92,
      uricAcid: 5.8
    },
    recommendations: ['保持充足水分', '控制蛋白质摄入', '定期检查肾功能']
  }];

  // 模拟会员信息
  const mockMembershipInfo = {
    level: 'VIP',
    status: 'active',
    expiryDate: new Date('2024-12-31'),
    daysUntilExpiry: 45,
    benefits: ['专属健康顾问', '优先预约', '定制方案', '基因检测', '年度体检'],
    currentPlan: {
      name: '臻寿VIP会员',
      price: 9999,
      duration: '1年',
      features: ['无限次AI咨询', '专属营养师', '定制保健品', '优先预约专家']
    },
    renewalOptions: [{
      id: 'monthly',
      name: '月度续费',
      price: 999,
      duration: '1个月',
      discount: 0
    }, {
      id: 'quarterly',
      name: '季度续费',
      price: 2699,
      duration: '3个月',
      discount: 10
    }, {
      id: 'yearly',
      name: '年度续费',
      price: 8999,
      duration: '12个月',
      discount: 25
    }]
  };

  // 模拟基因分析数据
  const mockGeneAnalysis = {
    overallScore: 85,
    longevityPotential: 'high',
    keyGenes: [{
      name: 'FOXO3',
      variant: 'AA',
      description: '长寿基因，与细胞修复和抗氧化相关',
      advantage: '增强细胞修复能力',
      impact: 'positive',
      score: 92
    }, {
      name: 'APOE',
      variant: 'E3/E3',
      description: '载脂蛋白E基因，影响脂质代谢和认知功能',
      advantage: '正常认知功能风险',
      impact: 'neutral',
      score: 78
    }, {
      name: 'SIRT1',
      variant: 'GG',
      description: '沉默信息调节因子，与抗衰老相关',
      advantage: '增强代谢调节',
      impact: 'positive',
      score: 88
    }, {
      name: 'MTOR',
      variant: 'CT',
      description: '雷帕霜素靶蛋白，影响细胞生长和自噬',
      advantage: '平衡细胞生长',
      impact: 'neutral',
      score: 82
    }, {
      name: 'TELOMERASE',
      variant: 'TT',
      description: '端粒酶基因，影响细胞衰老',
      advantage: '维持端粒长度',
      impact: 'positive',
      score: 86
    }],
    recommendations: ['基于FOXO3基因优势，建议进行抗氧化补充', '保持规律运动激活SIRT1基因', '适当热量摄入调节MTOR通路', '补充NAD+前体支持端粒酶活性'],
    lifestyleAdjustments: {
      diet: '地中海饮食，富含抗氧化物质',
      exercise: '中等强度有氧运动，每周150分钟',
      sleep: '保持7-8小时优质睡眠',
      stress: '冥想和瑜伽，降低皮质醇水平'
    }
  };
  useEffect(() => {
    // 初始化数据
    setMembershipInfo(mockMembershipInfo);
    setGeneAnalysis(mockGeneAnalysis);
    generateMonthlyReports();
    checkRenewalReminder();
  }, []);
  const generateMonthlyReports = () => {
    const reports = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const reportDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      reports.push({
        id: `report-${i}`,
        month: reportDate.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long'
        }),
        date: reportDate,
        overallScore: Math.floor(Math.random() * 15) + 80,
        keyMetrics: {
          healthScore: Math.floor(Math.random() * 15) + 80,
          biologicalAge: Math.floor(Math.random() * 5) + 32,
          energyLevel: Math.floor(Math.random() * 20) + 70,
          sleepQuality: Math.floor(Math.random() * 15) + 75,
          stressLevel: Math.floor(Math.random() * 30) + 40
        },
        improvements: ['睡眠质量提升15%', '运动量增加20%', '压力水平降低10%'],
        recommendations: ['继续保持当前生活方式', '增加有氧运动时间', '关注维生素D补充'],
        status: i === 0 ? 'generating' : 'completed'
      });
    }
    setMonthlyReports(reports);
  };
  const checkRenewalReminder = () => {
    const membership = mockMembershipInfo;
    if (membership.daysUntilExpiry <= 60) {
      setRenewalReminder({
        type: membership.daysUntilExpiry <= 30 ? 'urgent' : 'reminder',
        message: membership.daysUntilExpiry <= 30 ? `您的VIP会员将在${membership.daysUntilExpiry}天后到期，请及时续费以免影响服务。` : `您的VIP会员将在${membership.daysUntilExpiry}天后到期，续费可享受${membership.renewalOptions[2].discount}%优惠。`,
        bestOffer: membership.renewalOptions[2]
      });
    }
  };
  const handleOrganClick = organ => {
    setSelectedOrgan(organ);
    setShowOrganDetail(true);
    toast({
      title: "器官分析",
      description: `正在分析${organ.name}的健康数据...`
    });
  };
  const generateMonthlyReport = () => {
    setIsGeneratingReport(true);
    toast({
      title: "生成月度报告",
      description: "AI正在分析您的健康数据，生成个性化报告..."
    });

    // 模拟报告生成过程
    setTimeout(() => {
      const newReport = {
        id: `report-${Date.now()}`,
        month: new Date().toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long'
        }),
        date: new Date(),
        overallScore: Math.floor(Math.random() * 15) + 80,
        keyMetrics: {
          healthScore: Math.floor(Math.random() * 15) + 80,
          biologicalAge: Math.floor(Math.random() * 5) + 32,
          energyLevel: Math.floor(Math.random() * 20) + 70,
          sleepQuality: Math.floor(Math.random() * 15) + 75,
          stressLevel: Math.floor(Math.random() * 30) + 40
        },
        improvements: ['睡眠质量提升15%', '运动量增加20%', '压力水平降低10%'],
        recommendations: ['继续保持当前生活方式', '增加有氧运动时间', '关注维生素D补充'],
        status: 'completed'
      };
      setMonthlyReports(prev => [newReport, ...prev]);
      setCurrentReport(newReport);
      setIsGeneratingReport(false);
      setShowReportDetail(true);
      toast({
        title: "报告生成成功",
        description: `${newReport.month}健康报告已生成`
      });
    }, 3000);
  };
  const handleRenewal = option => {
    setIsProcessingRenewal(true);
    toast({
      title: "处理续费",
      description: "RPA正在为您处理会员续费..."
    });

    // 模拟RPA续费处理
    setTimeout(() => {
      setIsProcessingRenewal(false);
      setRenewalReminder(null);
      toast({
        title: "续费成功",
        description: `您已成功续费${option.name}，会员权益已延长至${option.duration}`
      });
    }, 2000);
  };
  const handleShare = type => {
    const shareData = {
      title: '我的健康报告',
      description: '查看我的健康数据和基因分析结果',
      url: window.location.href
    };
    switch (type) {
      case 'wechat':
        toast({
          title: "分享到微信",
          description: "正在生成分享链接..."
        });
        break;
      case 'report':
        toast({
          title: "分享报告",
          description: "正在生成PDF报告..."
        });
        break;
      case 'gene':
        toast({
          title: "分享基因分析",
          description: "正在生成基因分析报告..."
        });
        break;
      case 'link':
        navigator.clipboard.writeText(shareData.url);
        toast({
          title: "链接已复制",
          description: "分享链接已复制到剪贴板"
        });
        break;
    }
    setShareOptions(false);
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
  const getHealthColor = health => {
    if (health >= 90) return 'text-green-600';
    if (health >= 80) return 'text-blue-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  const getGeneImpactColor = impact => {
    switch (impact) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">个人中心</h1>
              <p className="text-indigo-100">3D数字孪生 · AI健康报告 · 基因分析</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{membershipInfo?.level || 'VIP'}</div>
                <div className="text-indigo-100 text-sm">会员等级</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{geneAnalysis?.overallScore || 85}</div>
                <div className="text-indigo-100 text-sm">基因评分</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 3D数字孪生器官交互 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                3D数字孪生器官分析
              </div>
              <Button variant="outline" size="sm" onClick={() => {
              toast({
                title: "3D视图",
                description: "正在加载3D交互视图..."
              });
            }}>
                <Eye className="w-4 h-4 mr-1" />
                3D视图
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8" style={{
            minHeight: '400px'
          }}>
              {/* 人体轮廓背景 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-48 border-2 border-gray-300 rounded-t-full relative">
                  {/* 头部 */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 border-2 border-gray-300 rounded-full"></div>
                  {/* 身体 */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-32 border-2 border-gray-300 rounded-lg"></div>
                  {/* 手臂 */}
                  <div className="absolute top-20 -left-8 w-8 h-20 border-2 border-gray-300 rounded-lg transform rotate-12"></div>
                  <div className="absolute top-20 -right-8 w-8 h-20 border-2 border-gray-300 rounded-lg transform -rotate-12"></div>
                  {/* 腿部 */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <div className="w-6 h-16 border-2 border-gray-300 rounded-lg"></div>
                    <div className="w-6 h-16 border-2 border-gray-300 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* 器官热点 */}
              {organsData.map(organ => <div key={organ.id} className="absolute cursor-pointer group" style={{
              left: `${organ.position.x}%`,
              top: `${organ.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }} onClick={() => handleOrganClick(organ)}>
                  <div className={`w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${organ.color === '#8b5cf6' ? 'bg-purple-500' : organ.color === '#ef4444' ? 'bg-red-500' : organ.color === '#06b6d4' ? 'bg-cyan-500' : organ.color === '#f59e0b' ? 'bg-yellow-500' : 'bg-pink-500'}`}>
                    <span className="text-white font-bold text-xs">{organ.health}</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-medium text-gray-800">{organ.name}</p>
                  </div>
                </div>)}

              {/* 图例 */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">健康状态</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">优秀 (90-100)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">良好 (80-89)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">一般 (70-79)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">较差 (&lt;70)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI健康报告月度生成 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  AI健康报告
                </div>
                <Button onClick={generateMonthlyReport} disabled={isGeneratingReport} className="bg-blue-600 hover:bg-blue-700">
                  {isGeneratingReport ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                  {isGeneratingReport ? '生成中...' : '生成月报'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyReports.slice(0, 3).map(report => <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                setCurrentReport(report);
                setShowReportDetail(true);
              }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{report.month}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-bold ${getHealthColor(report.overallScore)}`}>
                          {report.overallScore}分
                        </span>
                        {report.status === 'generating' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">健康评分:</span>
                        <span className="ml-2 font-medium">{report.keyMetrics.healthScore}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">生物年龄:</span>
                        <span className="ml-2 font-medium">{report.keyMetrics.biologicalAge}岁</span>
                      </div>
                      <div>
                        <span className="text-gray-600">精力水平:</span>
                        <span className="ml-2 font-medium">{report.keyMetrics.energyLevel}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">睡眠质量:</span>
                        <span className="ml-2 font-medium">{report.keyMetrics.sleepQuality}%</span>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          {/* RPA会员续费提醒 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                会员管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renewalReminder ? <div className={`p-4 rounded-lg ${renewalReminder.type === 'urgent' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'} border`}>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${renewalReminder.type === 'urgent' ? 'text-red-600' : 'text-yellow-600'}`} />
                    <div className="flex-1">
                      <h4 className={`font-semibold ${renewalReminder.type === 'urgent' ? 'text-red-800' : 'text-yellow-800'}`}>
                        续费提醒
                      </h4>
                      <p className={`text-sm ${renewalReminder.type === 'urgent' ? 'text-red-700' : 'text-yellow-700'} mt-1`}>
                        {renewalReminder.message}
                      </p>
                      <div className="mt-3">
                        <Button onClick={() => handleRenewal(renewalReminder.bestOffer)} disabled={isProcessingRenewal} className={`${renewalReminder.type === 'urgent' ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700'}`}>
                          {isProcessingRenewal ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                          {isProcessingRenewal ? '处理中...' : `立即续费${renewalReminder.bestOffer.discount > 0 ? ` (省${renewalReminder.bestOffer.discount}%)` : ''}`}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div> : <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-green-800">{membershipInfo?.currentPlan.name}</h4>
                      <p className="text-sm text-green-700">有效期至: {membershipInfo?.expiryDate.toLocaleDateString('zh-CN')}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{membershipInfo?.daysUntilExpiry}</div>
                      <div className="text-sm text-green-700">天后到期</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">会员权益</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {membershipInfo?.benefits.map((benefit, index) => <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{benefit}</span>
                        </div>)}
                    </div>
                  </div>
                </div>}
            </CardContent>
          </Card>
        </div>

        {/* 长寿基因优势分析 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Dna className="w-5 h-5 mr-2" />
                长寿基因优势分析
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowGeneDetail(!showGeneDetail)}>
                <Eye className="w-4 h-4 mr-1" />
                {showGeneDetail ? '收起详情' : '查看详情'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{geneAnalysis?.overallScore}</div>
                  <div className="text-gray-600">基因优势评分</div>
                  <div className="text-sm text-purple-600 mt-1">长寿潜力: {geneAnalysis?.longevityPotential === 'high' ? '高' : '中'}</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">关键基因</h4>
                  {geneAnalysis?.keyGenes.map((gene, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-800">{gene.name}</span>
                          <span className={`px-2 py-1 rounded text-xs ${getGeneImpactColor(gene.impact)}`}>
                            {gene.variant}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{gene.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">{gene.score}</div>
                        <div className="text-xs text-gray-500">评分</div>
                      </div>
                    </div>)}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4">基因雷达图</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={geneAnalysis?.keyGenes.map(gene => ({
                  gene: gene.name,
                  score: gene.score
                }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="gene" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="基因评分" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {showGeneDetail && <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">个性化建议</h4>
                  <ul className="space-y-2">
                    {geneAnalysis?.recommendations.map((rec, index) => <li key={index} className="flex items-start">
                        <Target className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">生活方式调整</h4>
                  <div className="space-y-3">
                    {Object.entries(geneAnalysis?.lifestyleAdjustments || {}).map(([key, value]) => <div key={key} className="flex items-start space-x-2">
                        <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 capitalize">{key}</div>
                          <div className="text-sm text-gray-600">{value}</div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>}
          </CardContent>
        </Card>

        {/* 一键分享功能 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              分享健康数据
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => handleShare('wechat')} variant="outline" className="flex flex-col items-center space-y-2 h-20">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">微信分享</span>
              </Button>
              <Button onClick={() => handleShare('report')} variant="outline" className="flex flex-col items-center space-y-2 h-20">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">分享报告</span>
              </Button>
              <Button onClick={() => handleShare('gene')} variant="outline" className="flex flex-col items-center space-y-2 h-20">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Dna className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">基因分析</span>
              </Button>
              <Button onClick={() => handleShare('link')} variant="outline" className="flex flex-col items-center space-y-2 h-20">
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">复制链接</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 器官详情弹窗 */}
      {showOrganDetail && selectedOrgan && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${selectedOrgan.color === '#8b5cf6' ? 'bg-purple-500' : selectedOrgan.color === '#ef4444' ? 'bg-red-500' : selectedOrgan.color === '#06b6d4' ? 'bg-cyan-500' : selectedOrgan.color === '#f59e0b' ? 'bg-yellow-500' : 'bg-pink-500'}`}></div>
                {selectedOrgan.name}健康分析
              </h3>
              <button onClick={() => setShowOrganDetail(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">健康评分</h4>
                  <div className="text-3xl font-bold text-purple-600">{selectedOrgan.health}</div>
                  <div className="text-sm text-gray-600">满分100分</div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">健康状态</h4>
                  <div className="text-lg font-semibold text-gray-800">{selectedOrgan.description}</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">关键指标</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedOrgan.metrics).map(([key, value]) => <div key={key} className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">{key}</div>
                      <div className="text-lg font-semibold text-gray-800">{value}</div>
                    </div>)}
                </div>
              </div>

              {selectedOrgan.issues.length > 0 && <div>
                  <h4 className="font-medium text-gray-700 mb-2">发现的问题</h4>
                  <ul className="space-y-1">
                    {selectedOrgan.issues.map((issue, index) => <li key={index} className="flex items-center text-sm text-orange-600">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {issue}
                      </li>)}
                  </ul>
                </div>}

              <div>
                <h4 className="font-medium text-gray-700 mb-2">AI建议</h4>
                <ul className="space-y-1">
                  {selectedOrgan.recommendations.map((rec, index) => <li key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {rec}
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>}

      {/* 健康报告详情弹窗 */}
      {showReportDetail && currentReport && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{currentReport.month}健康报告</h3>
              <button onClick={() => setShowReportDetail(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentReport.overallScore}</div>
                  <div className="text-sm text-gray-600">整体健康评分</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{currentReport.keyMetrics.biologicalAge}</div>
                  <div className="text-sm text-gray-600">生物年龄</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{currentReport.keyMetrics.energyLevel}%</div>
                  <div className="text-sm text-gray-600">精力水平</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">健康趋势</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsLineChart data={monthlyReports.slice(0, 6).reverse().map(report => ({
                month: report.month.split('年')[1],
                score: report.overallScore,
                healthScore: report.keyMetrics.healthScore,
                energyLevel: report.keyMetrics.energyLevel
              }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="整体评分" />
                    <Line type="monotone" dataKey="healthScore" stroke="#10b981" strokeWidth={2} name="健康评分" />
                    <Line type="monotone" dataKey="energyLevel" stroke="#8b5cf6" strokeWidth={2} name="精力水平" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">本月改善</h4>
                  <ul className="space-y-2">
                    {currentReport.improvements.map((improvement, index) => <li key={index} className="flex items-center text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {improvement}
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">AI建议</h4>
                  <ul className="space-y-2">
                    {currentReport.recommendations.map((rec, index) => <li key={index} className="flex items-center text-sm text-gray-700">
                        <Target className="w-4 h-4 mr-2" />
                        {rec}
                      </li>)}
                  </ul>
                </div>
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