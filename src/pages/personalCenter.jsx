// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Settings, Shield, Key, LogOut, ChevronRight, Edit, Camera, Mail, Phone, Calendar, MapPin, Activity, Heart, Brain, Target, Award } from 'lucide-react';

// @ts-ignore;
import { DigitalTwin3D } from '@/components/DigitalTwin3D';
// @ts-ignore;
import { HealthDataComparison } from '@/components/HealthDataComparison';
// @ts-ignore;
import { AIAssistant } from '@/components/AIAssistant';
export default function PersonalCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('overview'); // overview, 3dmodel, comparison
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  useEffect(() => {
    // 模拟获取用户信息
    setUser({
      id: '1',
      name: $w.auth.currentUser?.name || '张晓明',
      nickname: $w.auth.currentUser?.nickName || '健康达人',
      email: 'zhangxiaoming@example.com',
      phone: '138****8888',
      avatar: $w.auth.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      location: '北京市',
      joinDate: '2023-01-15',
      status: 'active',
      memberLevel: 'platinum',
      memberPoints: 15890,
      healthScore: 92,
      healthAge: 52.3,
      actualAge: 53,
      biologicalAge: 52.3,
      ageChange: -0.8
    });
  }, [$w.auth.currentUser]);
  const handleLogout = () => {
    toast({
      title: "退出成功",
      description: "您已成功退出登录"
    });
    $w.utils.navigateTo({
      pageId: 'login',
      params: {}
    });
  };
  const handleBodyPartClick = bodyPart => {
    setSelectedBodyPart(bodyPart);
    toast({
      title: "部位详情",
      description: `查看${bodyPart.name}的详细健康信息`
    });
  };
  const handleExportData = data => {
    // 模拟导出功能
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `health_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "导出成功",
      description: "健康数据已导出"
    });
  };
  const handleShareData = data => {
    // 模拟分享功能
    if (navigator.share) {
      navigator.share({
        title: '我的健康数据',
        text: '查看我的健康数据分析',
        url: window.location.href
      }).then(() => {
        toast({
          title: "分享成功",
          description: "健康数据已分享"
        });
      }).catch(() => {
        toast({
          title: "分享取消",
          description: "分享已取消"
        });
      });
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "链接已复制",
          description: "分享链接已复制到剪贴板"
        });
      });
    }
  };
  const handleAIQuery = async query => {
    // 模拟AI查询处理
    toast({
      title: "AI查询",
      description: `正在处理: ${query.text}`
    });
    return {
      text: "我是您的私人长寿医生小臻，可以帮您解读检测报告、制定个性化方案、预约专家服务等。",
      action: null
    };
  };
  const handleAIAction = action => {
    // 处理AI触发的RPA操作
    switch (action.type) {
      case 'create_plan':
        toast({
          title: "方案生成",
          description: "正在为您生成个性化运动方案..."
        });
        break;
      case 'recommend_product':
        toast({
          title: "产品推荐",
          description: "正在推荐适合您的保健品..."
        });
        break;
      case 'booking':
        toast({
          title: "预约服务",
          description: "正在为您预约专家服务..."
        });
        break;
      case 'order':
        toast({
          title: "下单处理",
          description: "正在处理您的订单..."
        });
        break;
      default:
        toast({
          title: "处理中",
          description: "正在处理您的请求..."
        });
    }
  };
  const menuItems = [{
    icon: Edit,
    label: '编辑资料',
    description: '修改个人信息',
    onClick: () => $w.utils.navigateTo({
      pageId: 'editProfile',
      params: {}
    }),
    color: 'text-blue-600'
  }, {
    icon: Key,
    label: '修改密码',
    description: '更改账户密码',
    onClick: () => $w.utils.navigateTo({
      pageId: 'changePassword',
      params: {}
    }),
    color: 'text-orange-600'
  }, {
    icon: Shield,
    label: '安全设置',
    description: '管理账户安全',
    onClick: () => $w.utils.navigateTo({
      pageId: 'security',
      params: {}
    }),
    color: 'text-green-600'
  }, {
    icon: Settings,
    label: '账户设置',
    description: '偏好设置和选项',
    onClick: () => toast({
      title: "功能开发中",
      description: "账户设置功能正在开发中"
    }),
    color: 'text-purple-600'
  }];
  const quickStats = [{
    icon: Heart,
    label: '健康评分',
    value: user?.healthScore || 0,
    unit: '分',
    color: 'text-red-500'
  }, {
    icon: Activity,
    label: '生物年龄',
    value: user?.biologicalAge || 0,
    unit: '岁',
    color: 'text-blue-500'
  }, {
    icon: Award,
    label: '会员积分',
    value: user?.memberPoints || 0,
    unit: '分',
    color: 'text-yellow-500'
  }, {
    icon: Target,
    label: '年龄逆转',
    value: Math.abs((user?.actualAge || 0) - (user?.biologicalAge || 0)),
    unit: '岁',
    color: 'text-green-500'
  }];
  if (!user) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部背景 - 奢华医疗风格 */}
      <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 h-48 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">臻寿个人中心</h1>
            <p className="text-yellow-100">您的私人长寿医生·小臻已就绪</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* 用户信息卡片 - 奢华风格 */}
        <Card className="shadow-xl mb-6 bg-gradient-to-br from-white to-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-yellow-400">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">{user.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-3">@{user.nickname}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center sm:justify-start">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {user.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {user.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    加入于 {user.joinDate}
                  </div>
                </div>
              </div>

              {/* 快速统计 - 奢华风格 */}
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return <div key={index} className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>;
              })}
              </div>
            </div>

            {/* 生物年龄提示 */}
            <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    生物年龄 {user.biologicalAge}岁（实际年龄 {user.actualAge}岁）
                  </span>
                </div>
                <span className="text-green-600 font-bold">
                  {user.ageChange > 0 ? '+' : ''}{user.ageChange}岁
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能导航标签 */}
        <div className="flex space-x-1 mb-6 bg-gradient-to-r from-yellow-100 to-yellow-50 p-1 rounded-xl border border-yellow-200">
          {['overview', '3dmodel', 'comparison'].map(section => <button key={section} onClick={() => setActiveSection(section)} className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${activeSection === section ? 'bg-white text-yellow-600 shadow-md border border-yellow-300' : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'}`}>
              {section === 'overview' ? '概览' : section === '3dmodel' ? '数字孪生' : '数据对比'}
            </button>)}
        </div>

        {/* 主要内容区域 */}
        {activeSection === 'overview' && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {menuItems.map((item, index) => <Card key={index} className="hover:shadow-lg transition-all cursor-pointer border-yellow-200 hover:border-yellow-400 bg-gradient-to-br from-white to-yellow-50" onClick={item.onClick}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 ${item.color} text-white`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>)}
          </div>}

        {activeSection === '3dmodel' && <div className="space-y-6">
            <DigitalTwin3D healthData={{
          overall: user.healthScore,
          age: user.biologicalAge
        }} onBodyPartClick={handleBodyPartClick} />
            
            {/* 选中部位详情 */}
            {selectedBodyPart && <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-800">{selectedBodyPart.name}详细分析</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">健康评分</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedBodyPart.health}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">健康状态</p>
                      <p className="text-lg font-semibold text-blue-800">
                        {selectedBodyPart.status === 'excellent' ? '优秀' : selectedBodyPart.status === 'good' ? '良好' : selectedBodyPart.status === 'fair' ? '一般' : '需改善'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">建议措施</p>
                      <p className="text-sm text-blue-700">
                        {selectedBodyPart.issues.length > 0 ? '建议进一步检查' : '保持良好状态'}
                      </p>
                    </div>
                  </div>
                  {selectedBodyPart.issues.length > 0 && <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">注意事项：</p>
                      <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                        {selectedBodyPart.issues.map((issue, index) => <li key={index}>{issue}</li>)}
                      </ul>
                    </div>}
                </CardContent>
              </Card>}
          </div>}

        {activeSection === 'comparison' && <HealthDataComparison currentData={{
        score: user.healthScore,
        age: user.biologicalAge
      }} historicalData={[]} onExport={handleExportData} onShare={handleShareData} />}

        {/* 退出登录按钮 */}
        <Card className="border-red-200">
          <CardContent className="p-4">
            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI助手 */}
      <AIAssistant onQuery={handleAIQuery} onAction={handleAIAction} />
    </div>;
}