// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

export default function ChangePassword(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });
  const getPasswordStrength = password => {
    if (!password) return {
      strength: 0,
      text: '',
      color: ''
    };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    const levels = [{
      strength: 0,
      text: '请输入密码',
      color: 'text-gray-500'
    }, {
      strength: 1,
      text: '密码强度：弱',
      color: 'text-red-500'
    }, {
      strength: 2,
      text: '密码强度：中等',
      color: 'text-yellow-500'
    }, {
      strength: 3,
      text: '密码强度：强',
      color: 'text-blue-500'
    }, {
      strength: 4,
      text: '密码强度：很强',
      color: 'text-green-500'
    }];
    return levels[strength];
  };
  const newPassword = form.watch('newPassword');
  const passwordStrength = getPasswordStrength(newPassword);
  const onSubmit = async data => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "修改失败",
        description: "两次输入的新密码不一致",
        variant: "destructive"
      });
      return;
    }
    if (data.newPassword.length < 6) {
      toast({
        title: "修改失败",
        description: "新密码长度至少为6位",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      // 模拟密码修改逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "修改成功",
        description: "您的密码已成功修改"
      });
      $w.utils.navigateBack();
    } catch (error) {
      toast({
        title: "修改失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            <h1 className="text-xl font-semibold text-gray-800">修改密码</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* 安全提示 */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            为了您的账户安全，请设置一个包含大小写字母、数字和特殊字符的强密码。
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="currentPassword" render={({
                field
              }) => <FormItem>
                    <FormLabel>当前密码</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type={showCurrentPassword ? "text" : "password"} placeholder="请输入当前密码" className="pl-10 pr-10" {...field} />
                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="newPassword" render={({
                field
              }) => <FormItem>
                    <FormLabel>新密码</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type={showNewPassword ? "text" : "password"} placeholder="请输入新密码（至少6位）" className="pl-10 pr-10" {...field} />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription className={passwordStrength.color}>
                      {passwordStrength.text}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="confirmPassword" render={({
                field
              }) => <FormItem>
                    <FormLabel>确认新密码</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type={showConfirmPassword ? "text" : "password"} placeholder="请再次输入新密码" className="pl-10 pr-10" {...field} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                {/* 密码要求 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">密码要求：</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className={`w-4 h-4 mr-2 ${newPassword.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                      至少8个字符
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`w-4 h-4 mr-2 ${/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) ? 'text-green-500' : 'text-gray-300'}`} />
                      包含大小写字母
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`w-4 h-4 mr-2 ${/\d/.test(newPassword) ? 'text-green-500' : 'text-gray-300'}`} />
                      包含数字
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`w-4 h-4 mr-2 ${/[^a-zA-Z\d]/.test(newPassword) ? 'text-green-500' : 'text-gray-300'}`} />
                      包含特殊字符
                    </li>
                  </ul>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? '修改中...' : '确认修改'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>;
}