// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Settings, Shield, Key, LogOut, ChevronRight, Edit, Camera, Mail, Phone, Calendar, MapPin, Activity, Heart, Brain, Target, Award } from 'lucide-react';

// @ts-ignore;
import { EnhancedDigitalTwin3D } from '@/components/EnhancedDigitalTwin3D';
// @ts-ignore;
import { HealthDataComparison } from '@/components/HealthDataComparison';
// @ts-ignore;
import { AIAssistant } from '@/components/AIAssistant';
// @ts-ignore;
import { AIHealthReportGenerator } from '@/components/AIHealthReportGenerator';
// @ts-ignore;
import { RPAMembershipRenewal } from '@/components/RPAMembershipRenewal';
export default function PersonalCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('overview'); // overview, 3dmodel, comparison, report, membership
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [renewalData, setRenewalData] = useState(null);
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
      membership: {
        plan: '白金会员',
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        daysUntilExpiry: 15,
        consecutiveYears: 3
      }
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
      title: "器官详情",
      description: `查看${bodyPart.name}的详细基因表达数据`
    });
  };
  const handleReportGenerated = report => {
    setReportData(report);
    toast({
      title: "报告生成成功",
      description: "AI健康月报已生成，可下载PDF版本"
    });
  };
  const handleRenewalComplete = renewalInfo => {
    setRenewalData(renewalInfo);
    toast({
      title: "会员续费成功",
      description: "感谢您的续费，会员权益已更新"
    });
  };
  const handleAIMessage = message => {
    console.log('AI消息:', message);
    // 可以在这里处理AI消息，比如发送到后端进行分析
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
    value: user?.healthAge || 0,
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
    label: '年龄差',
    value: (user?.actualAge || 0) - (user?.healthAge || 0),
    unit: '岁',
    color: 'text-green-500'
  }];
  const sectionTabs = [{
    id: 'overview',
    name: '概览',
    icon: User
  }, {
    id: '3dmodel',
    name: '3D模型',
    icon: Brain
  }, {
    id: 'comparison',
    name: '数据对比',
    icon: Activity
  }, {
    id: 'report',
    name: '健康报告',
    icon: Target
  }, {
    id: 'membership',
    name: '会员续费',
    icon: Award
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
      {/* 顶部背景 */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-48 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">个人中心</h1>
            <p className="text-blue-100">管理您的账户信息和健康数据</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* 用户信息卡片 */}
        <Card className="shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
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

              {/* 快速统计 */}
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return <div key={index} className="text-center">
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>;
              })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能导航标签 */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg overflow-x-auto">
          {sectionTabs.map(section => {
          const Icon = section.icon;
          return <button key={section.id} onClick={() => setActiveSection(section.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeSection === section.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
              <Icon className="w-4 h-4" />
              <span>{section.name}</span>
            </button>;
        })}
        </div>

        {/* 主要内容区域 */}
        {activeSection === 'overview' && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {menuItems.map((item, index) => <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={item.onClick}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>)}
          </div>}

        {activeSection === '3dmodel' && <div className="space-y-6">
            <EnhancedDigitalTwin3D healthData={{
          overall: user.healthScore,
          age: user.healthAge
        }} onBodyPartClick={handleBodyPartClick} />
            
            {/* 选中器官详情 */}
            {selectedBodyPart && <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-800">{selectedBodyPart.name}基因表达分析</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">健康评分</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedBodyPart.health}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">端粒长度</p>
                      <p className="text-lg font-semibold text-green-600">{selectedBodyPart.geneExpression?.telomereLength} kb</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">线粒体DNA</p>
                      <p className="text-lg font-semibold text-purple-600">{selectedBodyPart.geneExpression?.mitochondrialDNA}%</p>
                    </div>
                  </div>
                  {selectedBodyPart.geneExpression && <div className="mt-4 space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">关键基因</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedBodyPart.geneExpression.keyGenes.map((gene, index) => <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {gene}
                            </span>)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">风险因素</h4>
                        <ul className="space-y-1">
                          {selectedBodyPart.geneExpression.riskFactors.map((risk, index) => <li key={index} className="flex items-center space-x-2 text-sm text-red-600">
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                              <span>{risk}</span>
                            </li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">优化建议</h4>
                        <ul className="space-y-1">
                          {selectedBodyPart.geneExpression.recommendations.map((rec, index) => <li key={index} className="flex items-center space-x-2 text-sm text-green-600">
                              <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                              <span>{rec}</span>
                            </li>)}
                        </ul>
                      </div>
                    </div>}
                </CardContent>
              </Card>}
          </div>}

        {activeSection === 'comparison' && <HealthDataComparison currentData={{
        score: user.healthScore,
        age: user.healthAge
      }} historicalData={[]} onExport={() => {}} onShare={() => {}} />}

        {activeSection === 'report' && <AIHealthReportGenerator healthData={{
        biologicalAge: user.healthAge,
        actualAge: user.actualAge,
        healthScore: user.healthScore
      }} onReportGenerated={handleReportGenerated} />}

        {activeSection === 'membership' && <RPAMembershipRenewal currentMembership={user.membership} onRenewalComplete={handleRenewalComplete} />}

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

      {/* AI客服悬浮按钮 */}
      <AIAssistant onSendMessage={handleAIMessage} />
    </div>;
}