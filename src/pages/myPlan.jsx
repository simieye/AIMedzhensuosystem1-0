// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Target, Calendar, Clock, TrendingUp, Activity, Brain, Heart, Star, Plus, Edit, CheckCircle, Bell, Zap } from 'lucide-react';

// @ts-ignore;
import { SmartReminderSystem } from '@/components/SmartReminderSystem';
// @ts-ignore;
import { WearableDataMonitor } from '@/components/WearableDataMonitor';
// @ts-ignore;
import { InterventionEffectPredictor } from '@/components/InterventionEffectPredictor';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function MyPlan(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('reminder');
  const [userPlans, setUserPlans] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // 模拟用户数据
  const mockUserStats = {
    biologicalAge: 52.3,
    actualAge: 53,
    healthScore: 85,
    completedPlans: 3,
    activePlans: 2,
    totalDays: 156,
    adherenceRate: 87
  };
  const mockPlans = [{
    id: 1,
    title: 'NMN抗衰老方案',
    type: 'supplement',
    status: 'active',
    progress: 75,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    description: '每日NMN补充，结合运动和饮食调整',
    effectiveness: 0.08,
    color: 'bg-blue-500'
  }, {
    id: 2,
    title: 'HIIT运动计划',
    type: 'exercise',
    status: 'active',
    progress: 60,
    startDate: '2024-01-15',
    endDate: '2024-02-28',
    description: '每周3次高强度间歇训练',
    effectiveness: 0.06,
    color: 'bg-green-500'
  }, {
    id: 3,
    title: '睡眠优化方案',
    type: 'lifestyle',
    status: 'completed',
    progress: 100,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    description: '改善睡眠质量和作息规律',
    effectiveness: 0.04,
    color: 'bg-purple-500'
  }];
  useEffect(() => {
    setUserStats(mockUserStats);
    setUserPlans(mockPlans);
  }, []);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };
  const handleReminderComplete = reminder => {
    console.log('提醒完成:', reminder);
    toast({
      title: "提醒完成",
      description: "继续保持良好的服药习惯！"
    });
  };
  const handleExerciseRecommend = recommendation => {
    console.log('运动建议:', recommendation);
    toast({
      title: "运动建议",
      description: `正在为您生成${recommendation.title}的详细方案...`
    });
  };
  const handlePlanAction = (plan, action) => {
    switch (action) {
      case 'edit':
        toast({
          title: "编辑方案",
          description: `正在编辑${plan.title}...`
        });
        break;
      case 'pause':
        toast({
          title: "暂停方案",
          description: `${plan.title}已暂停`
        });
        break;
      case 'complete':
        toast({
          title: "完成方案",
          description: `恭喜完成${plan.title}！`
        });
        break;
      default:
        break;
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'active':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'paused':
        return '已暂停';
      default:
        return '未知';
    }
  };
  const tabs = [{
    id: 'reminder',
    name: '智能提醒',
    icon: Bell
  }, {
    id: 'monitor',
    name: '数据监测',
    icon: Activity
  }, {
    id: 'predict',
    name: '效果预测',
    icon: Brain
  }, {
    id: 'plans',
    name: '我的方案',
    icon: Target
  }];
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部背景 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">我的健康方案</h1>
              <p className="text-blue-100">AI驱动的个性化健康管理</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{userStats?.biologicalAge || 52.3}</div>
              <div className="text-blue-100 text-sm">生物年龄</div>
            </div>
          </div>

          {/* 健康指标概览 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <Target className="w-4 h-4" />
                <TrendingUp className="w-4 h-4 text-green-300" />
              </div>
              <div className="text-xl font-bold">{userStats?.activePlans || 0}</div>
              <div className="text-blue-100 text-xs">进行中方案</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <CheckCircle className="w-4 h-4" />
                <Star className="w-4 h-4 text-yellow-300" />
              </div>
              <div className="text-xl font-bold">{userStats?.completedPlans || 0}</div>
              <div className="text-blue-100 text-xs">已完成方案</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <Clock className="w-4 h-4" />
                <Zap className="w-4 h-4 text-orange-300" />
              </div>
              <div className="text-xl font-bold">{userStats?.adherenceRate || 0}%</div>
              <div className="text-blue-100 text-xs">执行率</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <Heart className="w-4 h-4" />
                <Activity className="w-4 h-4 text-red-300" />
              </div>
              <div className="text-xl font-bold">{userStats?.healthScore || 0}</div>
              <div className="text-blue-100 text-xs">健康评分</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 标签导航 */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
          {tabs.map(tab => {
          const Icon = tab.icon;
          return <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>;
        })}
        </div>

        {/* 主要内容区域 */}
        <div className="space-y-6">
          {activeTab === 'reminder' && <SmartReminderSystem onReminderComplete={handleReminderComplete} />}
          
          {activeTab === 'monitor' && <WearableDataMonitor onExerciseRecommend={handleExerciseRecommend} />}
          
          {activeTab === 'predict' && <InterventionEffectPredictor currentAge={userStats?.biologicalAge} healthData={{
          overallScore: userStats?.healthScore
        }} interventionPlan={userPlans.find(p => p.status === 'active')} />}
          
          {activeTab === 'plans' && <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">我的健康方案</h2>
                <Button onClick={() => setShowCreatePlan(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  创建方案
                </Button>
              </div>

              <div className="grid gap-4">
                {userPlans.map(plan => <Card key={plan.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center`}>
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
                            <p className="text-sm text-gray-600">{plan.description}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(plan.status)}`}>
                          {getStatusText(plan.status)}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">完成进度</span>
                          <span className="text-sm font-medium text-gray-800">{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${plan.color} h-2 rounded-full transition-all duration-300`} style={{
                      width: `${plan.progress}%`
                    }}></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-600">开始时间</p>
                          <p className="font-medium">{plan.startDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">结束时间</p>
                          <p className="font-medium">{plan.endDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">有效性</p>
                          <p className="font-medium text-green-600">{(plan.effectiveness * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">类型</p>
                          <p className="font-medium">{plan.type === 'supplement' ? '补充剂' : plan.type === 'exercise' ? '运动' : '生活方式'}</p>
                        </div>
                      </div>

                      {plan.status === 'active' && <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handlePlanAction(plan, 'edit')}>
                            <Edit className="w-4 h-4 mr-1" />
                            编辑
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handlePlanAction(plan, 'pause')}>
                            <Clock className="w-4 h-4 mr-1" />
                            暂停
                          </Button>
                          <Button size="sm" onClick={() => handlePlanAction(plan, 'complete')}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            完成
                          </Button>
                        </div>}
                    </CardContent>
                  </Card>)}
              </div>
            </div>}
        </div>

        {/* AI健康建议 */}
        <Alert className="border-blue-200 bg-blue-50 mt-6">
          <Brain className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>AI建议：</strong>基于您的健康数据分析，建议继续保持当前的NMN补充方案，配合适度运动和优质睡眠，预计3个月内生物年龄可减少0.8-1.2岁。
          </AlertDescription>
        </Alert>
      </div>

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}