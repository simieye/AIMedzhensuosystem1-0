// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, useToast, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, User, Lock, Mail, ArrowLeft, Check, AlertCircle, Smartphone, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

export default function Register(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      emailCode: '',
      phone: '',
      phoneCode: '',
      password: '',
      confirmPassword: ''
    }
  });

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 密码强度检测
  const checkPasswordStrength = password => {
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
  const password = form.watch('password');
  const passwordStrength = checkPasswordStrength(password);
  const onSubmit = async data => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "注册失败",
        description: "两次输入的密码不一致",
        variant: "destructive"
      });
      return;
    }
    if (!agreed) {
      toast({
        title: "注册失败",
        description: "请同意用户协议和隐私政策",
        variant: "destructive"
      });
      return;
    }
    if (!emailVerified) {
      toast({
        title: "注册失败",
        description: "请先验证邮箱",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      // 模拟注册逻辑
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "注册成功",
        description: "欢迎加入！请登录您的账户"
      });
      $w.utils.navigateTo({
        pageId: 'login',
        params: {}
      });
    } catch (error) {
      toast({
        title: "注册失败",
        description: error.message || "注册失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const sendEmailCode = async () => {
    const email = form.getValues('email');
    if (!email) {
      toast({
        title: "发送失败",
        description: "请先输入邮箱地址",
        variant: "destructive"
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "发送失败",
        description: "请输入正确的邮箱地址",
        variant: "destructive"
      });
      return;
    }
    try {
      setCountdown(60);
      toast({
        title: "验证码已发送",
        description: `验证码已发送至 ${email}`
      });
    } catch (error) {
      toast({
        title: "发送失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const verifyEmailCode = async () => {
    const code = form.getValues('emailCode');
    if (!code) {
      toast({
        title: "验证失败",
        description: "请输入验证码",
        variant: "destructive"
      });
      return;
    }
    try {
      // 模拟验证
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailVerified(true);
      toast({
        title: "验证成功",
        description: "邮箱验证成功"
      });
    } catch (error) {
      toast({
        title: "验证失败",
        description: "验证码错误",
        variant: "destructive"
      });
    }
  };
  const checkUsername = async username => {
    if (!username) return;
    try {
      // 模拟用户名检查
      await new Promise(resolve => setTimeout(resolve, 500));
      if (username.length < 3) {
        form.setError('username', {
          message: '用户名至少3个字符'
        });
      } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        form.setError('username', {
          message: '用户名只能包含字母、数字和下划线'
        });
      }
    } catch (error) {
      // 处理错误
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">创建账户</CardTitle>
            <p className="text-gray-600 text-sm">填写信息以注册新账户</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="username" rules={{
                required: '请输入用户名',
                minLength: {
                  value: 3,
                  message: '用户名至少3个字符'
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: '用户名只能包含字母、数字和下划线'
                }
              }} render={({
                field,
                fieldState: {
                  error
                }
              }) => <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="请输入用户名" className={`pl-10 ${error ? 'border-red-500' : ''}`} {...field} onBlur={e => checkUsername(e.target.value)} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="email" rules={{
                required: '请输入邮箱',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '请输入正确的邮箱地址'
                }
              }} render={({
                field,
                fieldState: {
                  error
                }
              }) => <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type="email" placeholder="请输入邮箱地址" className={`pl-10 ${error ? 'border-red-500' : ''}`} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                {/* 邮箱验证 */}
                <div className="space-y-2">
                  <FormLabel>邮箱验证</FormLabel>
                  <div className="flex space-x-2">
                    <FormField control={form.control} name="emailCode" rules={{
                    required: '请输入验证码',
                    pattern: {
                      value: /^\d{6}$/,
                      message: '请输入6位数字验证码'
                    }
                  }} render={({
                    field,
                    fieldState: {
                      error
                    }
                  }) => <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="请输入验证码" className={error ? 'border-red-500' : ''} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                    <Button type="button" variant="outline" onClick={sendEmailCode} disabled={countdown > 0} className="px-4">
                      {countdown > 0 ? `${countdown}s` : '发送验证码'}
                    </Button>
                    <Button type="button" onClick={verifyEmailCode} disabled={emailVerified} className={emailVerified ? 'bg-green-600 hover:bg-green-700' : ''}>
                      {emailVerified ? <Check className="w-4 h-4" /> : '验证'}
                    </Button>
                  </div>
                  {emailVerified && <div className="flex items-center text-sm text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      邮箱已验证
                    </div>}
                </div>

                <FormField control={form.control} name="phone" rules={{
                required: '请输入手机号',
                pattern: {
                  value: /^1[3-9]\d{9}$/,
                  message: '请输入正确的手机号'
                }
              }} render={({
                field,
                fieldState: {
                  error
                }
              }) => <FormItem>
                    <FormLabel>手机号（选填）</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="请输入手机号" className={`pl-10 ${error ? 'border-red-500' : ''}`} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="password" rules={{
                required: '请输入密码',
                minLength: {
                  value: 6,
                  message: '密码至少6位'
                }
              }} render={({
                field,
                fieldState: {
                  error
                }
              }) => <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type={showPassword ? "text" : "password"} placeholder="请输入密码（至少6位）" className={`pl-10 pr-10 ${error ? 'border-red-500' : ''}`} {...field} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription className={passwordStrength.color}>
                      {passwordStrength.text}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="confirmPassword" rules={{
                required: '请确认密码',
                validate: value => value === password || '两次输入的密码不一致'
              }} render={({
                field,
                fieldState: {
                  error
                }
              }) => <FormItem>
                    <FormLabel>确认密码</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type={showConfirmPassword ? "text" : "password"} placeholder="请再次输入密码" className={`pl-10 pr-10 ${error ? 'border-red-500' : ''}`} {...field} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                {/* 密码要求 */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2 text-sm">密码要求：</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className={`w-3 h-3 mr-1 ${password.length >= 6 ? 'text-green-500' : 'text-gray-300'}`} />
                      至少6个字符
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`w-3 h-3 mr-1 ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                      包含大小写字母
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`w-3 h-3 mr-1 ${/\d/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                      包含数字
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`w-3 h-3 mr-1 ${/[^a-zA-Z\d]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                      包含特殊字符（可选）
                    </li>
                  </ul>
                </div>

                <div className="flex items-start space-x-2">
                  <button type="button" onClick={() => setAgreed(!agreed)} className="mt-0.5 flex-shrink-0">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${agreed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                      {agreed && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                  <p className="text-sm text-gray-600">
                    我已阅读并同意
                    <button type="button" className="text-blue-600 hover:text-blue-800 mx-1" onClick={() => toast({
                    title: "用户协议",
                    description: "用户协议内容展示"
                  })}>
                      用户协议
                    </button>
                    和
                    <button type="button" className="text-blue-600 hover:text-blue-800 mx-1" onClick={() => toast({
                    title: "隐私政策",
                    description: "隐私政策内容展示"
                  })}>
                      隐私政策
                    </button>
                  </p>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700" disabled={isLoading}>
                  {isLoading ? <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      注册中...
                    </div> : '注册'}
                </Button>
              </form>
            </Form>

            <Button variant="outline" className="w-full" onClick={() => $w.utils.navigateTo({
            pageId: 'login',
            params: {}
          })}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回登录
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
}