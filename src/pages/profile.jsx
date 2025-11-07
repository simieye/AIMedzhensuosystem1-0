// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Settings, Shield, Key, LogOut, ChevronRight, Edit, Camera, Mail, Phone, Calendar, MapPin } from 'lucide-react';

export default function Profile(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [user, setUser] = useState(null);
  useEffect(() => {
    // 模拟获取用户信息
    setUser({
      id: '1',
      name: $w.auth.currentUser?.name || '张三',
      nickname: $w.auth.currentUser?.nickName || '小明',
      email: 'zhangsan@example.com',
      phone: '138****8888',
      avatar: $w.auth.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      location: '北京市',
      joinDate: '2023-01-15',
      status: 'active'
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
            <p className="text-blue-100">管理您的账户信息</p>
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
            </div>
          </CardContent>
        </Card>

        {/* 功能菜单 */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
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
        </div>

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
    </div>;
}