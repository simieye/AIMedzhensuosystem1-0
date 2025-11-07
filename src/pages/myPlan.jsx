// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { Target, Calendar, TrendingUp, Award, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Sun, Smartphone, BarChart3, Trophy } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { AIWakeUpService } from '@/components/AIWakeUpService';
// @ts-ignore;
import { SmartPlanAdjustment } from '@/components/SmartPlanAdjustment';
// @ts-ignore;
import { InterventionEffectPrediction } from '@/components/InterventionEffectPrediction';
// @ts-ignore;
import { CheckInPointsSystem } from '@/components/CheckInPointsSystem';
export default function MyPlan(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userPoints, setUserPoints] = useState(2580);
  const [checkInHistory, setCheckInHistory] = useState([]);
  const [wearableData, setWearableData] = useState(null);
  const [userMetrics, setUserMetrics] = useState({
    healthScore: 75,
    weight: 75,
    restingHeartRate: 72,
    bloodPressure: 120,
    energy: 70,
    sleepQuality: 75
  });
  const [healthGoals, setHealthGoals] = useState({
    targetWeight: 70,
    targetHeartRate: 65,
    targetBloodPressure: 115,
    targetEnergy: 85,
    targetSleep: 85
  });
  useEffect(() => {
    // 模拟获取用户方案数据
    const mockPlans = [{
      id: 1,
      name: '30天减重计划',
      type: 'weight_loss',
      status: 'active',
      progress: 65,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      description: '科学减重，健康塑形',
      target: '减重5公斤',
      current: '已减重3.2公斤',
      tasks: [{
        id: 1,
        name: '每日运动30分钟',
        completed: true,
        time: '07:00'
      }, {
        id: 2,
        name: '控制饮食热量',
        completed: true,
        time: '12:00'
      }, {
        id: 3,
        name: '晚上8点后不进食',
        completed: false,
        time: '20:00'
      }, {
        id: 4,
        name: '记录体重变化',
        completed: true,
        time: '21:00'
      }],
      color: 'bg-blue-500'
    }, {
      id: 2,
      name: '睡眠改善计划',
      type: 'sleep',
      status: 'active',
      progress: 45,
      startDate: '2024-01-05',
      endDate: '2024-02-05',
      description: '优化睡眠质量，提升精力',
      target: '睡眠质量达到85分',
      current: '当前睡眠质量75分',
      tasks: [{
        id: 1,
        name: '22:30准备睡觉',
        completed: false,
        time: '22:30'
      }, {
        id: 2,
        name: '睡前冥想15分钟',
        completed: true,
        time: '22:00'
      }, {
        id: 3,
        name: '避免咖啡因摄入',
        completed: true,
        time: '14:00'
      }, {
        id: 4,
        name: '记录睡眠数据',
        completed: false,
        time: '07:00'
      }],
      color: 'bg-purple-500'
    }, {
      id: 3,
      name: '营养补充方案',
      type: 'nutrition',
      status: 'completed',
      progress: 100,
      startDate: '2023-12-01',
      endDate: '2024-01-01',
      description: 'NMN细胞活化，延缓衰老',
      target: '完成30天补充周期',
      current: '已完成30天补充',
      tasks: [{
        id: 1,
        name: '早餐后服用NMN',
        completed: true,
        time: '08:00'
      }, {
        id: 2,
        name: '补充维生素D',
        completed: true,
        time: '12:00'
      }, {
        id: 3,
        name: '晚餐后服用辅酶Q10',
        completed: true,
        time: '19:00'
      }],
      color: 'bg-green-500'
    }];
    setPlans(mockPlans);
    setSelectedPlan(mockPlans[0]);

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
        quality: 75,
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
    setWearableData(mockWearableData);
  }, []);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    const pageMap = {
      overview: 'myPlan',
      wake_up: 'myPlan',
      adjustment: 'myPlan',
      prediction: 'myPlan',
      points: 'myPlan'
    };
    if (pageMap[tabId]) {
      $w.utils.navigateTo({
        pageId: pageMap[tabId],
        params: {}
      });
    }
  };
  const handlePlanSelect = plan => {
    setSelectedPlan(plan);
    toast({
      title: "方案已选择",
      description: `已选择"${plan.name}"`
    });
  };
  const handleTaskToggle = (planId, taskId) => {
    setPlans(prev => prev.map(plan => {
      if (plan.id === planId) {
        const updatedTasks = plan.tasks.map(task => task.id === taskId ? {
          ...task,
          completed: !task.completed
        } : task);
        const completedCount = updatedTasks.filter(task => task.completed).length;
        const progress = Math.round(completedCount / updatedTasks.length * 100);
        return {
          ...plan,
          tasks: updatedTasks,
          progress
        };
      }
      return plan;
    }));
    toast({
      title: "任务状态更新",
      description: "任务完成状态已更新"
    });
  };
  const handleWakeUpComplete = wakeUpData => {
    console.log('Wake up completed:', wakeUpData);
    // 可以在这里更新用户状态或积分
  };
  const handlePlanUpdate = adjustment => {
    toast({
      title: "方案已更新",
      description: `智能调整已应用到"${selectedPlan?.name}"`
    });
  };
  const handleCheckIn = checkInData => {
    setUserPoints(prev => prev + checkInData.points);
    setCheckInHistory(prev => [...prev, checkInData]);
    toast({
      title: "打卡成功",
      description: `连续打卡${checkInData.streak}天，获得${checkInData.points}积分`
    });
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
  const getTabIcon = tabId => {
    switch (tabId) {
      case 'overview':
        return Target;
      case 'wake_up':
        return Sun;
      case 'adjustment':
        return Smartphone;
      case 'prediction':
        return BarChart3;
      case 'points':
        return Trophy;
      default:
        return Target;
    }
  };
  const getTabTitle = tabId => {
    switch (tabId) {
      case 'overview':
        return '方案总览';
      case 'wake_up':
        return 'AI叫醒';
      case 'adjustment':
        return '智能调整';
      case 'prediction':
        return '效果预测';
      case 'points':
        return '打卡积分';
      default:
        return '我的方案';
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">我的健康方案</h1>
              <p className="text-blue-100">AI智能管理您的健康计划</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{plans.filter(p => p.status === 'active').length}</div>
                <div className="text-blue-100 text-sm">进行中</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{userPoints}</div>
                <div className="text-blue-100 text-sm">积分</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {['overview', 'wake_up', 'adjustment', 'prediction', 'points'].map(tabId => {
            const Icon = getTabIcon(tabId);
            return <TabsTrigger key={tabId} value={tabId} className="flex items-center space-x-2">
                <Icon className="w-4 h-4" />
                <span>{getTabTitle(tabId)}</span>
              </TabsTrigger>;
          })}
          </TabsList>

          {/* 方案总览 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 方案列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map(plan => <Card key={plan.id} className={`cursor-pointer transition-all hover:shadow-lg ${selectedPlan?.id === plan.id ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handlePlanSelect(plan)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                        {getStatusText(plan.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>进度</span>
                          <span>{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${plan.color} h-2 rounded-full transition-all duration-300`} style={{
                        width: `${plan.progress}%`
                      }}></div>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <p className="text-gray-600">目标: {plan.target}</p>
                        <p className="text-gray-800 font-medium">{plan.current}</p>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <p>开始: {plan.startDate}</p>
                        <p>结束: {plan.endDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* 选中方案详情 */}
            {selectedPlan && <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      {selectedPlan.name} - 任务详情
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        添加任务
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPlan.tasks.map(task => <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <button onClick={() => handleTaskToggle(selectedPlan.id, task.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                            {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                          </button>
                          <div>
                            <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                              {task.name}
                            </p>
                            <p className="text-sm text-gray-600">{task.time}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}
          </TabsContent>

          {/* AI叫醒服务 */}
          <TabsContent value="wake_up" className="space-y-6">
            <AIWakeUpService onWakeUpComplete={handleWakeUpComplete} userPreferences={{
            name: $w.auth.currentUser?.nickName || '用户'
          }} />
          </TabsContent>

          {/* 智能方案调整 */}
          <TabsContent value="adjustment" className="space-y-6">
            <SmartPlanAdjustment currentPlan={selectedPlan} wearableData={wearableData} onPlanUpdate={handlePlanUpdate} />
          </TabsContent>

          {/* 干预效果预测 */}
          <TabsContent value="prediction" className="space-y-6">
            <InterventionEffectPrediction currentPlan={selectedPlan} userMetrics={userMetrics} healthGoals={healthGoals} />
          </TabsContent>

          {/* 打卡积分系统 */}
          <TabsContent value="points" className="space-y-6">
            <CheckInPointsSystem onCheckIn={handleCheckIn} userPoints={userPoints} checkInHistory={checkInHistory} />
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}