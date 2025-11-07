// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Crown, Star, ShoppingBag, Calendar, FileText, Coins, Headphones, ChevronRight, Settings, Camera, Award, TrendingUp, Activity, Heart, Brain, Shield, Target, MessageCircle, Phone, Mail } from 'lucide-react';

export default function PersonalCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    // 模拟获取用户信息
    const userData = {
      id: '1',
      name: $w.auth.currentUser?.name || '张晓明',
      nickname: $w.auth.currentUser?.nickName || '健康达人',
      avatar: $w.auth.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      memberLevel: 'platinum',
      memberPoints: 15890,
      joinDate: '2023-01-15',
      healthScore: 92,
      nextLevelPoints: 20000,
      currentLevelPoints: 10000
    };
    setUserProfile(userData);
  }, [$w.auth.currentUser]);

  // 会员等级配置
  const memberLevels = {
    bronze: {
      name: '青铜会员',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: Star,
      benefits: ['基础健康评估', '在线客服', '积分商城']
    },
    silver: {
      name: '白银会员',
      color: 'bg-gray-500',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      icon: Star,
      benefits: ['进阶健康评估', '优先客服', '专属优惠', '积分商城']
    },
    gold: {
      name: '黄金会员',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: Star,
      benefits: ['专业健康评估', '专属客服', '会员专享价', '积分商城', '生日礼遇']
    },
    platinum: {
      name: '铂金会员',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Crown,
      benefits: ['全方位健康评估', '24小时专属客服', 'VIP专享价', '积分商城', '生日礼遇', '定制方案']
    },
    diamond: {
      name: '钻石会员',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: Crown,
      benefits: ['顶级健康评估', '24小时专属客服', 'SVIP专享价', '积分商城', '生日礼遇', '定制方案', '私人医生']
    }
  };

  // 服务数据
  const services = [{
    id: 'orders',
    title: '我的订单',
    description: '查看购买记录和订单状态',
    icon: ShoppingBag,
    count: 12,
    color: 'bg-blue-500',
    path: 'orders'
  }, {
    id: 'appointments',
    title: '我的预约',
    description: '管理医生预约和就诊安排',
    icon: Calendar,
    count: 3,
    color: 'bg-green-500',
    path: 'appointments'
  }, {
    id: 'reports',
    title: '我的报告',
    description: '查看健康检测报告和分析',
    icon: FileText,
    count: 28,
    color: 'bg-purple-500',
    path: 'reports'
  }, {
    id: 'points',
    title: '我的积分',
    description: '积分明细和兑换记录',
    icon: Coins,
    count: userProfile?.memberPoints || 0,
    color: 'bg-yellow-500',
    path: 'points'
  }];

  // 健康数据
  const healthData = [{
    title: '心血管健康',
    value: 88,
    status: 'excellent',
    icon: Heart,
    color: 'text-red-500'
  }, {
    title: '代谢功能',
    value: 85,
    status: 'good',
    icon: Activity,
    color: 'text-green-500'
  }, {
    title: '免疫系统',
    value: 92,
    status: 'excellent',
    icon: Shield,
    color: 'text-blue-500'
  }, {
    title: '神经系统',
    value: 78,
    status: 'good',
    icon: Brain,
    color: 'text-purple-500'
  }];

  // 客服数据
  const customerService = [{
    id: 1,
    name: '李客服',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    status: 'online',
    rating: 4.9,
    specialty: '健康咨询',
    responseTime: '1分钟内'
  }, {
    id: 2,
    name: '王客服',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    status: 'online',
    rating: 4.8,
    specialty: '产品咨询',
    responseTime: '2分钟内'
  }];
  const handleServiceClick = service => {
    toast({
      title: "跳转中",
      description: `正在前往${service.title}...`
    });
    $w.utils.navigateTo({
      pageId: service.path,
      params: {}
    });
  };
  const handleContactService = service => {
    toast({
      title: "联系客服",
      description: `正在连接${service.name}...`
    });
  };
  const getMemberLevel = () => {
    return memberLevels[userProfile?.memberLevel] || memberLevels.bronze;
  };
  const getProgressPercentage = () => {
    if (!userProfile) return 0;
    const {
      currentLevelPoints,
      nextLevelPoints,
      memberPoints
    } = userProfile;
    return (memberPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints) * 100;
  };
  const getPointsToNextLevel = () => {
    if (!userProfile) return 0;
    return userProfile.nextLevelPoints - userProfile.memberPoints;
  };
  if (!userProfile) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>;
  }
  const memberLevel = getMemberLevel();
  const LevelIcon = memberLevel.icon;
  return <div style={style} className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* 顶部背景 */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* 用户信息 */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img src={userProfile.avatar} alt={userProfile.name} className="w-20 h-20 rounded-full border-4 border-white/30" />
                <button className="absolute bottom-0 right-0 bg-white text-purple-600 p-2 rounded-full shadow-lg hover:bg-purple-50">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <p className="text-purple-100">@{userProfile.nickname}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={`${memberLevel.bgColor} ${memberLevel.textColor} border-0`}>
                    <LevelIcon className="w-4 h-4 mr-1" />
                    {memberLevel.name}
                  </Badge>
                  <span className="text-sm text-purple-100">加入于 {userProfile.joinDate}</span>
                </div>
              </div>
            </div>

            {/* 会员信息 */}
            <div className="text-center lg:text-right">
              <div className="mb-4">
                <p className="text-purple-100 text-sm">会员积分</p>
                <p className="text-3xl font-bold">{userProfile.memberPoints.toLocaleString()}</p>
              </div>
              <div className="mb-2">
                <p className="text-purple-100 text-sm">健康评分</p>
                <p className="text-2xl font-bold">{userProfile.healthScore}</p>
              </div>
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Settings className="w-4 h-4 mr-2" />
                个人设置
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 会员进度 */}
        <Card className="mb-6 border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">会员等级进度</h3>
                <p className="text-sm text-gray-600">距离下一等级还需 {getPointsToNextLevel()} 积分</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">当前积分</p>
                <p className="text-xl font-bold text-purple-600">{userProfile.memberPoints}</p>
              </div>
            </div>
            <Progress value={getProgressPercentage()} className="h-3 mb-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{userProfile.currentLevelPoints}</span>
              <span>{userProfile.nextLevelPoints}</span>
            </div>
          </CardContent>
        </Card>

        {/* 数字孪生人3D模型 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              健康档案 - 数字孪生人
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 3D模型展示区域 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">数字孪生人模型</h4>
                  <p className="text-sm text-gray-600 mb-4">基于您的健康数据生成的3D模型</p>
                  <Button variant="outline" className="bg-white hover:bg-gray-50">
                    <Activity className="w-4 h-4 mr-2" />
                    查看3D模型
                  </Button>
                </div>
              </div>

              {/* 健康指标 */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">健康指标概览</h4>
                <div className="space-y-3">
                  {healthData.map((item, index) => {
                  const Icon = item.icon;
                  return <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <div>
                          <p className="font-medium text-gray-800">{item.title}</p>
                          <p className="text-sm text-gray-600">
                            {item.status === 'excellent' ? '优秀' : '良好'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">{item.value}</p>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{
                          width: `${item.value}%`
                        }}></div>
                        </div>
                      </div>
                    </div>;
                })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 我的服务 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              我的服务
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map(service => {
              const Icon = service.icon;
              return <div key={service.id} onClick={() => handleServiceClick(service)} className="cursor-pointer group">
                  <div className={`${service.color} rounded-lg p-4 text-white transition-all duration-300 group-hover:shadow-lg group-hover:scale-105`}>
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-8 h-8" />
                      {service.count > 0 && <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                          {service.count}
                        </span>}
                    </div>
                    <h4 className="font-semibold mb-1">{service.title}</h4>
                    <p className="text-sm text-white/80">{service.description}</p>
                  </div>
                </div>;
            })}
            </div>
          </CardContent>
        </Card>

        {/* 专属客服 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Headphones className="w-5 h-5 mr-2" />
              专属客服
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customerService.map(service => <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img src={service.avatar} alt={service.name} className="w-12 h-12 rounded-full" />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${service.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-yellow-500 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm ml-1">{service.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{service.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleContactService(service)} className="flex-1 bg-green-600 hover:bg-green-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      在线咨询
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>)}
            </div>

            {/* 会员权益 */}
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                {memberLevel.name}专属权益
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {memberLevel.benefits.map((benefit, index) => <div key={index} className="flex items-center text-sm text-purple-700">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    {benefit}
                  </div>)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}