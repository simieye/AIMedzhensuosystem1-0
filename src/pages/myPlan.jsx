// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, Clock, Target, TrendingUp, CheckCircle, AlertCircle, Plus, Edit, Trash2, Play, Pause, RotateCcw, Award, Activity, Heart, Brain } from 'lucide-react';

export default function MyPlan(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('current');
  const [plans, setPlans] = useState([]);
  const [completedPlans, setCompletedPlans] = useState([]);
  useEffect(() => {
    // 模拟获取计划数据
    const mockPlans = [{
      id: 1,
      title: '30天减重计划',
      category: 'weight_loss',
      description: '通过合理饮食和运动，在30天内健康减重5公斤',
      startDate: '2024-01-01',
      endDate: '2024-01-30',
      progress: 65,
      status: 'active',
      target: {
        type: 'weight',
        current: 75,
        target: 70,
        unit: 'kg'
      },
      tasks: [{
        id: 1,
        title: '每日运动30分钟',
        completed: true,
        time: '08:00'
      }, {
        id: 2,
        title: '控制饮食热量',
        completed: true,
        time: '12:00'
      }, {
        id: 3,
        title: '晚上瑜伽放松',
        completed: false,
        time: '20:00'
      }],
      icon: Activity
    }, {
      id: 2,
      title: '血压控制计划',
      category: 'health',
      description: '通过生活方式调整，将血压控制在正常范围',
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      progress: 30,
      status: 'active',
      target: {
        type: 'blood_pressure',
        current: '135/85',
        target: '120/80',
        unit: 'mmHg'
      },
      tasks: [{
        id: 1,
        title: '低盐饮食',
        completed: true,
        time: '每餐'
      }, {
        id: 2,
        title: '规律服药',
        completed: true,
        time: '09:00'
      }, {
        id: 3,
        title: '每日监测血压',
        completed: false,
        time: '19:00'
      }],
      icon: Heart
    }, {
      id: 3,
      title: '睡眠改善计划',
      category: 'lifestyle',
      description: '调整作息习惯，提高睡眠质量',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      progress: 20,
      status: 'paused',
      target: {
        type: 'sleep',
        current: 6.5,
        target: 8,
        unit: '小时'
      },
      tasks: [{
        id: 1,
        title: '22:30前睡觉',
        completed: false,
        time: '22:30'
      }, {
        id: 2,
        title: '睡前冥想',
        completed: false,
        time: '22:00'
      }],
      icon: Brain
    }];
    const mockCompletedPlans = [{
      id: 4,
      title: '21天运动习惯养成',
      category: 'exercise',
      description: '连续21天每天运动，养成运动习惯',
      startDate: '2023-12-01',
      endDate: '2023-12-21',
      progress: 100,
      status: 'completed',
      target: {
        type: 'exercise',
        current: 21,
        target: 21,
        unit: '天'
      },
      completedDate: '2023-12-21',
      icon: Activity
    }];
    setPlans(mockPlans);
    setCompletedPlans(mockCompletedPlans);
  }, []);
  const handleCreatePlan = () => {
    toast({
      title: "创建计划",
      description: "正在跳转到计划创建页面..."
    });
  };
  const handleEditPlan = planId => {
    toast({
      title: "编辑计划",
      description: `正在编辑计划 ${planId}...`
    });
  };
  const handleDeletePlan = planId => {
    if (confirm('确定要删除这个计划吗？')) {
      setPlans(plans.filter(plan => plan.id !== planId));
      toast({
        title: "删除成功",
        description: "计划已删除"
      });
    }
  };
  const handleTogglePlanStatus = planId => {
    setPlans(plans.map(plan => plan.id === planId ? {
      ...plan,
      status: plan.status === 'active' ? 'paused' : 'active'
    } : plan));
    toast({
      title: "状态更新",
      description: `计划状态已更新`
    });
  };
  const handleCompleteTask = (planId, taskId) => {
    setPlans(plans.map(plan => {
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
      title: "任务更新",
      description: "任务状态已更新"
    });
  };
  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'active':
        return '进行中';
      case 'paused':
        return '已暂停';
      case 'completed':
        return '已完成';
      default:
        return '未知';
    }
  };
  const getCategoryColor = category => {
    switch (category) {
      case 'weight_loss':
        return 'bg-purple-100 text-purple-800';
      case 'health':
        return 'bg-red-100 text-red-800';
      case 'lifestyle':
        return 'bg-blue-100 text-blue-800';
      case 'exercise':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getCategoryText = category => {
    switch (category) {
      case 'weight_loss':
        return '减重';
      case 'health':
        return '健康';
      case 'lifestyle':
        return '生活方式';
      case 'exercise':
        return '运动';
      default:
        return '其他';
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">我的健康计划</h1>
            </div>
            <Button onClick={handleCreatePlan} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              创建计划
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">进行中</p>
                  <p className="text-2xl font-bold text-gray-800">{plans.filter(p => p.status === 'active').length}</p>
                </div>
                <Play className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">已暂停</p>
                  <p className="text-2xl font-bold text-gray-800">{plans.filter(p => p.status === 'paused').length}</p>
                </div>
                <Pause className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">已完成</p>
                  <p className="text-2xl font-bold text-gray-800">{completedPlans.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">平均进度</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {plans.length > 0 ? Math.round(plans.reduce((sum, plan) => sum + plan.progress, 0) / plans.length) : 0}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 计划列表 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">当前计划</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {plans.length === 0 ? <Card>
                <CardContent className="p-8 text-center">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">暂无进行中的计划</h3>
                  <p className="text-gray-600 mb-4">创建您的第一个健康计划，开始健康之旅</p>
                  <Button onClick={handleCreatePlan} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    创建计划
                  </Button>
                </CardContent>
              </Card> : plans.map(plan => {
            const Icon = plan.icon;
            return <Card key={plan.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(plan.category)}`}>
                                {getCategoryText(plan.category)}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                                {getStatusText(plan.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{plan.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {plan.startDate} - {plan.endDate}
                          </div>
                          <div className="flex items-center">
                            <Target className="w-4 h-4 mr-1 text-gray-400" />
                            目标: {plan.target.current} → {plan.target.target} {plan.target.unit}
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1 text-gray-400" />
                            进度: {plan.progress}%
                          </div>
                        </div>

                        {/* 进度条 */}
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${plan.progress >= 80 ? 'bg-green-500' : plan.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{
                          width: `${plan.progress}%`
                        }}></div>
                          </div>
                        </div>

                        {/* 今日任务 */}
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">今日任务</h4>
                          <div className="space-y-2">
                            {plan.tasks.map(task => <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div className="flex items-center space-x-3">
                                  <button onClick={() => handleCompleteTask(plan.id, task.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                    {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                                  </button>
                                  <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                    {task.title}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{task.time}</span>
                                </div>
                              </div>)}
                          </div>
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex flex-col space-y-2 lg:ml-4">
                        <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleTogglePlanStatus(plan.id)}>
                          {plan.status === 'active' ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                          {plan.status === 'active' ? '暂停' : '继续'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeletePlan(plan.id)} className="text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedPlans.length === 0 ? <Card>
                <CardContent className="p-8 text-center">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">暂无已完成的计划</h3>
                  <p className="text-gray-600">完成您的第一个健康计划，获得成就感</p>
                </CardContent>
              </Card> : completedPlans.map(plan => {
            const Icon = plan.icon;
            return <Card key={plan.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
                          <p className="text-gray-600 text-sm">{plan.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>完成日期: {plan.completedDate}</span>
                            <span>目标达成: {plan.target.current}/{plan.target.target} {plan.target.unit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <span className="text-green-600 font-medium">已完成</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}