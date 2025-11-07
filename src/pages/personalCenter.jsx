// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Settings, Award, FileText, Crown, Activity, Brain, Heart, Target, TrendingUp, Calendar, Bell, LogOut, Camera, Edit, Shield, Star } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { InteractiveDigitalTwin } from '@/components/InteractiveDigitalTwin';
// @ts-ignore;
import { AIHealthReport } from '@/components/AIHealthReport';
// @ts-ignore;
import { MemberRenewal } from '@/components/MemberRenewal';
// @ts-ignore;
import { LongevityReport } from '@/components/LongevityReport';
export default function PersonalCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [membershipData, setMembershipData] = useState(null);
  useEffect(() => {
    // 模拟加载用户数据
    const mockUserData = {
      id: $w.auth.currentUser?.userId || 'user001',
      name: $w.auth.currentUser?.name || '张晓明',
      nickName: $w.auth.currentUser?.nickName || '健康达人',
      avatar: $w.auth.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      email: $w.auth.currentUser?.email || 'zhangxiaoming@example.com',
      phone: '138****5678',
      gender: 'male',
      age: 35,
      joinDate: '2023-01-15',
      level: 'Premium会员',
      points: 2580,
      healthScore: 85,
      healthAge: 32
    };
    const mockHealthData = {
      overall: 85,
      age: 35,
      gender: 'male',
      healthGoals: ['抗衰老', '免疫力提升'],
      healthIssues: ['易疲劳', '睡眠质量一般'],
      preferences: ['天然成分', '无副作用']
    };
    const mockMembershipData = {
      currentPlan: {
        id: 'premium',
        name: 'Premium会员',
        level: '高级',
        price: 2999,
        duration: '12个月',
        endDate: '2024-06-14',
        remainingDays: 45,
        status: 'active'
      },
      usage: {
        aiConsultations: 156,
        healthPlans: 8,
        expertAppointments: 3,
        savedAmount: 2580,
        healthScoreImprovement: 12
      }
    };
    setUserData(mockUserData);
    setHealthData(mockHealthData);
    setMembershipData(mockMembershipData);
  }, [$w.auth.currentUser]);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    const pageMap = {
      profile: 'personalCenter',
      digital_twin: 'personalCenter',
      health_report: 'personalCenter',
      membership: 'personalCenter',
      longevity_report: 'personalCenter'
    };
    if (pageMap[tabId]) {
      $w.utils.navigateTo({
        pageId: pageMap[tabId],
        params: {}
      });
    }
  };
  const handleOrganClick = organ => {
    toast({
      title: "器官分析",
      description: `已分析${organ.name}的健康状况`,
      duration: 3000
    });
  };
  const handleReportGenerated = report => {
    toast({
      title: "报告生成成功",
      description: `健康报告已生成，评分：${report.overallScore}分`,
      duration: 3000
    });
  };
  const handleReportShare = report => {
    toast({
      title: "分享成功",
      description: "健康报告已分享",
      duration: 3000
    });
  };
  const handleRenewal = renewalResult => {
    toast({
      title: "续费成功",
      description: `会员已续费至${new Date(renewalResult.nextBillingDate).toLocaleDateString('zh-CN')}`,
      duration: 5000
    });
  };
  const handleUpgrade = plan => {
    toast({
      title: "升级会员",
      description: `正在为您升级到${plan.name}`,
      duration: 3000
    });
  };
  const handleLongevityShare = shareData => {
    toast({
      title: "分享成功",
      description: `长寿月报已分享到${shareData.platform}`,
      duration: 3000
    });
  };
  const handleLongevityDownload = report => {
    toast({
      title: "下载中",
      description: "正在生成长寿月报PDF文件...",
      duration: 3000
    });
  };
  const handleLogout = () => {
    toast({
      title: "退出登录",
      description: "正在退出...",
      duration: 2000
    });
    // 实际退出逻辑
    setTimeout(() => {
      $w.utils.navigateTo({
        pageId: 'login',
        params: {}
      });
    }, 2000);
  };
  const handleEditProfile = () => {
    toast({
      title: "编辑资料",
      description: "跳转到资料编辑页面...",
      duration: 2000
    });
  };
  const getTabIcon = tabId => {
    switch (tabId) {
      case 'profile':
        return User;
      case 'digital_twin':
        return Activity;
      case 'health_report':
        return FileText;
      case 'membership':
        return Crown;
      case 'longevity_report':
        return Award;
      default:
        return User;
    }
  };
  const getTabTitle = tabId => {
    switch (tabId) {
      case 'profile':
        return '个人资料';
      case 'digital_twin':
        return '3D数字孪生';
      case 'health_report':
        return '健康报告';
      case 'membership':
        return '会员管理';
      case 'longevity_report':
        return '长寿月报';
      default:
        return '个人中心';
    }
  };
  if (!userData) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img src={userData.avatar} alt={userData.name} className="w-16 h-16 rounded-full border-2 border-white" />
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Camera className="w-3 h-3 text-white" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userData.nickName}</h1>
                <p className="text-indigo-100">{userData.level}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{userData.healthScore}</div>
                <div className="text-indigo-100 text-sm">健康评分</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{userData.points}</div>
                <div className="text-indigo-100 text-sm">积分</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {['profile', 'digital_twin', 'health_report', 'membership', 'longevity_report'].map(tabId => {
            const Icon = getTabIcon(tabId);
            return <TabsTrigger key={tabId} value={tabId} className="flex items-center space-x-2">
                <Icon className="w-4 h-4" />
                <span>{getTabTitle(tabId)}</span>
              </TabsTrigger>;
          })}
          </TabsList>

          {/* 个人资料 */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    个人资料
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={handleEditProfile}>
                    <Edit className="w-4 h-4 mr-2" />
                    编辑资料
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img src={userData.avatar} alt={userData.name} className="w-20 h-20 rounded-full" />
                      <div>
                        <h3 className="text-lg font-semibold">{userData.name}</h3>
                        <p className="text-gray-600">{userData.nickName}</p>
                        <p className="text-sm text-gray-500">ID: {userData.id}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">邮箱:</span>
                        <span className="font-medium">{userData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">手机:</span>
                        <span className="font-medium">{userData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">性别:</span>
                        <span className="font-medium">{userData.gender === 'male' ? '男' : '女'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">年龄:</span>
                        <span className="font-medium">{userData.age}岁</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{userData.healthScore}</div>
                        <div className="text-sm text-gray-600">健康评分</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{userData.healthAge}</div>
                        <div className="text-sm text-gray-600">健康年龄</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">会员等级:</span>
                        <span className="font-medium text-purple-600">{userData.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">积分:</span>
                        <span className="font-medium text-orange-600">{userData.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">加入时间:</span>
                        <span className="font-medium">{userData.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 快捷操作 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Settings className="w-6 h-6 mb-2" />
                <span>账号设置</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Shield className="w-6 h-6 mb-2" />
                <span>隐私设置</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Bell className="w-6 h-6 mb-2" />
                <span>通知设置</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col text-red-600 hover:text-red-700" onClick={handleLogout}>
                <LogOut className="w-6 h-6 mb-2" />
                <span>退出登录</span>
              </Button>
            </div>
          </TabsContent>

          {/* 3D数字孪生 */}
          <TabsContent value="digital_twin" className="space-y-6">
            <InteractiveDigitalTwin userData={healthData} onOrganClick={handleOrganClick} />
          </TabsContent>

          {/* 健康报告 */}
          <TabsContent value="health_report" className="space-y-6">
            <AIHealthReport userData={healthData} onReportGenerated={handleReportGenerated} onShare={handleReportShare} />
          </TabsContent>

          {/* 会员管理 */}
          <TabsContent value="membership" className="space-y-6">
            <MemberRenewal currentMembership={membershipData} onRenewal={handleRenewal} onUpgrade={handleUpgrade} />
          </TabsContent>

          {/* 长寿月报 */}
          <TabsContent value="longevity_report" className="space-y-6">
            <LongevityReport userData={healthData} onShare={handleLongevityShare} onDownload={handleLongevityDownload} />
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}