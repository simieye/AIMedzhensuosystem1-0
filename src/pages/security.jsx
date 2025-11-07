// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Switch, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Shield, Smartphone, Mail, Key, Clock, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

export default function Security(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    sessionTimeout: true
  });
  const [loginHistory] = useState([{
    id: 1,
    device: 'Chrome on Windows',
    location: '北京市',
    ip: '192.168.1.1',
    time: '2024-01-15 14:30:22',
    status: 'current'
  }, {
    id: 2,
    device: 'Safari on iPhone',
    location: '上海市',
    ip: '192.168.1.2',
    time: '2024-01-14 09:15:33',
    status: 'success'
  }, {
    id: 3,
    device: 'Firefox on Mac',
    location: '深圳市',
    ip: '192.168.1.3',
    time: '2024-01-13 16:45:18',
    status: 'success'
  }]);
  const handleSettingChange = (key, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
    toast({
      title: "设置已更新",
      description: `${key} 已${value ? '启用' : '禁用'}`
    });
  };
  const handleEnable2FA = async () => {
    setIsLoading(true);
    try {
      // 模拟启用两步验证
      await new Promise(resolve => setTimeout(resolve, 1500));
      handleSettingChange('twoFactorEnabled', true);
      toast({
        title: "两步验证已启用",
        description: "您的账户现在更加安全了"
      });
    } catch (error) {
      toast({
        title: "启用失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDisable2FA = async () => {
    setIsLoading(true);
    try {
      // 模拟禁用两步验证
      await new Promise(resolve => setTimeout(resolve, 1000));
      handleSettingChange('twoFactorEnabled', false);
      toast({
        title: "两步验证已禁用",
        description: "请确保您的密码足够强"
      });
    } catch (error) {
      toast({
        title: "禁用失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleRevokeSession = sessionId => {
    toast({
      title: "会话已撤销",
      description: "该设备的登录会话已被终止"
    });
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateBack()}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回
            </Button>
            <h1 className="text-xl font-semibold text-gray-800">安全设置</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        {/* 安全状态概览 */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">账户安全状态：良好</h3>
                <p className="text-green-600 text-sm">您的账户已启用基本安全保护措施</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 两步验证 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              两步验证
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">两步验证</p>
                <p className="text-sm text-gray-600">为您的账户添加额外的安全层</p>
              </div>
              {securitySettings.twoFactorEnabled ? <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">已启用</span>
                  <Button variant="outline" size="sm" onClick={handleDisable2FA} disabled={isLoading}>
                    禁用
                  </Button>
                </div> : <Button onClick={handleEnable2FA} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  {isLoading ? '启用中...' : '启用'}
                </Button>}
            </div>
            
            {!securitySettings.twoFactorEnabled && <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  建议启用两步验证以提高账户安全性
                </AlertDescription>
              </Alert>}
          </CardContent>
        </Card>

        {/* 安全通知 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              安全通知
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">邮件通知</p>
                <p className="text-sm text-gray-600">接收安全相关的邮件通知</p>
              </div>
              <Switch checked={securitySettings.emailNotifications} onCheckedChange={checked => handleSettingChange('emailNotifications', checked)} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">短信通知</p>
                <p className="text-sm text-gray-600">接收安全相关的短信通知</p>
              </div>
              <Switch checked={securitySettings.smsNotifications} onCheckedChange={checked => handleSettingChange('smsNotifications', checked)} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">登录提醒</p>
                <p className="text-sm text-gray-600">新设备登录时发送通知</p>
              </div>
              <Switch checked={securitySettings.loginAlerts} onCheckedChange={checked => handleSettingChange('loginAlerts', checked)} />
            </div>
          </CardContent>
        </Card>

        {/* 登录历史 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              登录历史
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loginHistory.map(session => <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-800">{session.device}</p>
                      {session.status === 'current' && <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">当前会话</span>}
                    </div>
                    <div className="text-sm text-gray-600 space-x-4 mt-1">
                      <span>{session.location}</span>
                      <span>{session.ip}</span>
                      <span>{session.time}</span>
                    </div>
                  </div>
                  {session.status !== 'current' && <Button variant="outline" size="sm" onClick={() => handleRevokeSession(session.id)}>
                      撤销
                    </Button>}
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 其他安全设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              其他安全设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">会话超时</p>
                <p className="text-sm text-gray-600">长时间不活动时自动退出登录</p>
              </div>
              <Switch checked={securitySettings.sessionTimeout} onCheckedChange={checked => handleSettingChange('sessionTimeout', checked)} />
            </div>

            <div className="pt-2 space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({
              title: "功能开发中",
              description: "密码管理器功能正在开发中"
            })}>
                <Key className="w-4 h-4 mr-2" />
                管理已保存的密码
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => $w.utils.navigateTo({
              pageId: 'changePassword',
              params: {}
            })}>
                <Key className="w-4 h-4 mr-2" />
                修改密码
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}