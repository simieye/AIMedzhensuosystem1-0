// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Share2, Download, Calendar, TrendingUp, Award, Target, Heart, Brain, Activity, Users, MessageCircle, Star, ChevronRight, FileText, BarChart3 } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
export function LongevityReport({
  userData,
  onShare,
  onDownload
}) {
  const {
    toast
  } = useToast();
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareOptions, setShareOptions] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  useEffect(() => {
    generateReport();
  }, [userData, selectedPeriod]);
  const generateReport = async () => {
    setIsGenerating(true);
    try {
      // 模拟长寿月报生成
      await new Promise(resolve => setTimeout(resolve, 2500));
      const mockReportData = {
        reportId: `LR${Date.now()}`,
        period: selectedPeriod,
        generatedAt: new Date().toISOString(),
        // 长寿评分
        longevityScore: {
          overall: 88,
          biological: 32,
          chronological: 35,
          advantage: 3,
          trend: 'improving',
          rank: '前15%'
        },
        // 健康指标趋势
        healthTrends: {
          energy: [{
            month: '1月',
            value: 65
          }, {
            month: '2月',
            value: 68
          }, {
            month: '3月',
            value: 72
          }, {
            month: '4月',
            value: 75
          }, {
            month: '5月',
            value: 78
          }, {
            month: '6月',
            value: 82
          }],
          immunity: [{
            month: '1月',
            value: 70
          }, {
            month: '2月',
            value: 72
          }, {
            month: '3月',
            value: 75
          }, {
            month: '4月',
            value: 78
          }, {
            month: '5月',
            value: 80
          }, {
            month: '6月',
            value: 83
          }],
          metabolism: [{
            month: '1月',
            value: 60
          }, {
            month: '2月',
            value: 62
          }, {
            month: '3月',
            value: 65
          }, {
            month: '4月',
            value: 68
          }, {
            month: '5月',
            value: 70
          }, {
            month: '6月',
            value: 73
          }]
        },
        // 生活方式分析
        lifestyle: {
          exercise: {
            score: 85,
            weeklyMinutes: 180,
            consistency: 92,
            types: ['有氧运动', '力量训练', '柔韧性训练']
          },
          nutrition: {
            score: 78,
            balance: 82,
            supplements: ['NMN', '维生素D', 'Omega-3'],
            improvements: ['减少糖分摄入', '增加蛋白质']
          },
          sleep: {
            score: 80,
            averageHours: 7.5,
            quality: 85,
            regularity: 90
          },
          stress: {
            score: 75,
            level: 'moderate',
            management: ['冥想', '运动', '社交'],
            improvement: 'stress_level_decreasing'
          }
        },
        // 长寿建议
        recommendations: [{
          category: '运动',
          priority: 'high',
          title: '增加高强度间歇训练',
          description: '每周2-3次HIIT训练，可显著提升心肺功能和代谢水平',
          impact: '长寿评分+5分',
          timeframe: '3个月见效'
        }, {
          category: '营养',
          priority: 'high',
          title: '优化抗氧化营养',
          description: '增加富含抗氧化剂的食物，补充NMN等前沿营养素',
          impact: '生物年龄-2岁',
          timeframe: '6个月见效'
        }, {
          category: '睡眠',
          priority: 'medium',
          title: '改善睡眠深度',
          description: '保持规律作息，优化睡眠环境，提高深度睡眠比例',
          impact: '精力水平+15%',
          timeframe: '1个月见效'
        }],
        // 社交分享内容
        shareContent: {
          title: '我的长寿月报',
          summary: '本月长寿评分88分，比实际年龄年轻3岁！',
          highlights: ['精力水平提升26%', '免疫力改善18%', '代谢功能提升22%'],
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop'
        },
        // 同龄人对比
        peerComparison: {
          totalUsers: 15678,
          yourRank: 2356,
          percentile: 85,
          betterThan: '85%的用户',
          averageScore: 72,
          topPerformers: 92
        }
      };
      setReportData(mockReportData);
      toast({
        title: "长寿月报生成完成",
        description: "您的个性化长寿报告已准备就绪"
      });
    } catch (error) {
      toast({
        title: "报告生成失败",
        description: "长寿月报生成失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  const handleShare = platform => {
    const shareData = {
      platform,
      content: reportData.shareContent,
      reportId: reportData.reportId
    };
    onShare?.(shareData);
    toast({
      title: "分享成功",
      description: `已分享到${platform}`
    });
    setShareOptions(false);
  };
  const handleDownload = () => {
    onDownload?.(reportData);
    toast({
      title: "下载报告",
      description: "正在生成PDF文件..."
    });
  };
  const periods = [{
    id: 'month',
    name: '本月',
    description: '30天数据'
  }, {
    id: 'quarter',
    name: '本季度',
    description: '90天数据'
  }, {
    id: 'year',
    name: '本年度',
    description: '365天数据'
  }];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  if (!reportData) {
    return <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">正在生成长寿月报...</p>
          </div>
        </CardContent>
      </Card>;
  }
  return <div className="space-y-6">
      {/* 报告头部 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              长寿月报
            </CardTitle>
            <div className="flex items-center space-x-2">
              <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
                {periods.map(period => <option key={period.id} value={period.id}>
                    {period.name}
                  </option>)}
              </select>
              <Button variant="outline" size="sm" onClick={() => setShareOptions(!shareOptions)}>
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                下载
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">长寿评分总览</h3>
              <div className="text-sm text-gray-600">
                报告编号: {reportData.reportId}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{reportData.longevityScore.overall}</div>
                <div className="text-sm text-gray-600">长寿评分</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{reportData.longevityScore.biological}</div>
                <div className="text-sm text-gray-600">生物年龄</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{reportData.longevityScore.advantage}</div>
                <div className="text-sm text-gray-600">年龄优势</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{reportData.longevityScore.rank}</div>
                <div className="text-sm text-gray-600">排名</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{reportData.peerComparison.percentile}%</div>
                <div className="text-sm text-gray-600">超越用户</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 健康趋势图表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            健康指标趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData.healthTrends.energy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} name="精力水平" />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">+26%</div>
              <div className="text-sm text-gray-600">精力提升</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+18%</div>
              <div className="text-sm text-gray-600">免疫力改善</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">+22%</div>
              <div className="text-sm text-gray-600">代谢提升</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 生活方式分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            生活方式分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{reportData.lifestyle.exercise.score}</div>
              <div className="text-sm text-gray-600">运动评分</div>
              <div className="text-xs text-gray-500 mt-1">
                {reportData.lifestyle.exercise.weeklyMinutes}分钟/周
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{reportData.lifestyle.nutrition.score}</div>
              <div className="text-sm text-gray-600">营养评分</div>
              <div className="text-xs text-gray-500 mt-1">
                平衡度 {reportData.lifestyle.nutrition.balance}%
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{reportData.lifestyle.sleep.score}</div>
              <div className="text-sm text-gray-600">睡眠评分</div>
              <div className="text-xs text-gray-500 mt-1">
                {reportData.lifestyle.sleep.averageHours}小时/天
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{reportData.lifestyle.stress.score}</div>
              <div className="text-sm text-gray-600">压力管理</div>
              <div className="text-xs text-gray-500 mt-1">
                {reportData.lifestyle.stress.level}水平
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 长寿建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            AI长寿建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.recommendations.map((rec, index) => <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${rec.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    <h5 className="font-semibold text-gray-800">{rec.title}</h5>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {rec.category}
                    </span>
                  </div>
                  <div className="text-sm text-green-600">
                    {rec.impact}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="text-xs text-gray-500">
                  预期见效时间: {rec.timeframe}
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 同龄人对比 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            同龄人对比
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">排名统计</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">总用户数:</span>
                  <span className="font-medium">{reportData.peerComparison.totalUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">您的排名:</span>
                  <span className="font-medium">#{reportData.peerComparison.yourRank.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">超越用户:</span>
                  <span className="font-medium text-green-600">{reportData.peerComparison.betterThan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">平均评分:</span>
                  <span className="font-medium">{reportData.peerComparison.averageScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">顶尖水平:</span>
                  <span className="font-medium text-purple-600">{reportData.peerComparison.topPerformers}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">表现分布</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={[{
                  name: '优秀',
                  value: 15,
                  color: '#10b981'
                }, {
                  name: '良好',
                  value: 35,
                  color: '#3b82f6'
                }, {
                  name: '一般',
                  value: 30,
                  color: '#f59e0b'
                }, {
                  name: '较差',
                  value: 20,
                  color: '#ef4444'
                }]} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                    {[{
                    name: '优秀',
                    value: 15,
                    color: '#10b981'
                  }, {
                    name: '良好',
                    value: 35,
                    color: '#3b82f6'
                  }, {
                    name: '一般',
                    value: 30,
                    color: '#f59e0b'
                  }, {
                    name: '较差',
                    value: 20,
                    color: '#ef4444'
                  }].map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分享选项弹窗 */}
      {shareOptions && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">分享长寿月报</h3>
                <button onClick={() => setShareOptions(false)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
              
              <div className="space-y-3">
                <button onClick={() => handleShare('微信')} className="w-full flex items-center justify-center space-x-3 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <MessageCircle className="w-5 h-5" />
                  <span>分享到微信</span>
                </button>
                
                <button onClick={() => handleShare('朋友圈')} className="w-full flex items-center justify-center space-x-3 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  <Users className="w-5 h-5" />
                  <span>分享到朋友圈</span>
                </button>
                
                <button onClick={() => handleShare('微博')} className="w-full flex items-center justify-center space-x-3 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  <Share2 className="w-5 h-5" />
                  <span>分享到微博</span>
                </button>
                
                <button onClick={() => handleShare('复制链接')} className="w-full flex items-center justify-center space-x-3 p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  <ChevronRight className="w-5 h-5" />
                  <span>复制分享链接</span>
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}