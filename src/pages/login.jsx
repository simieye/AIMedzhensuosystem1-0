// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, Smartphone, Facebook, Apple, Chrome } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

export default function Login(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('password'); // password or code
  const [rememberMe, setRememberMe] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [socialLoading, setSocialLoading] = useState('');
  const form = useForm({
    defaultValues: {
      account: '',
      password: '',
      code: ''
    }
  });

  // 自动填充记住的账号
  useEffect(() => {
    const rememberedAccount = localStorage.getItem('rememberedAccount');
    if (rememberedAccount) {
      form.setValue('account', rememberedAccount);
      setRememberMe(true);
    }
  }, [form]);

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const onSubmit = async data => {
    setIsLoading(true);
    try {
      // 模拟登录逻辑
      if (loginType === 'password') {
        if (data.account && data.password) {
          // 记住账号逻辑
          if (rememberMe) {
            localStorage.setItem('rememberedAccount', data.account);
          } else {
            localStorage.removeItem('rememberedAccount');
          }

          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 1500));
          toast({
            title: "登录成功",
            description: "欢迎回来！"
          });

          // 跳转到首页
          $w.utils.navigateTo({
            pageId: 'personalCenter',
            params: {}
          });
        } else {
          toast({
            title: "登录失败",
            description: "请填写完整的登录信息",
            variant: "destructive"
          });
        }
      } else {
        if (data.account && data.code) {
          await new Promise(resolve => setTimeout(resolve, 1500));
          toast({
            title: "登录成功",
            description: "验证码登录成功！"
          });
          $w.utils.navigateTo({
            pageId: 'personalCenter',
            params: {}
          });
        } else {
          toast({
            title: "登录失败",
            description: "请填写手机号和验证码",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "登录失败",
        description: error.message || "网络错误，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const sendCode = async () => {
    const account = form.getValues('account');
    if (!account) {
      toast({
        title: "发送失败",
        description: "请先输入手机号",
        variant: "destructive"
      });
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(account)) {
      toast({
        title: "发送失败",
        description: "请输入正确的手机号",
        variant: "destructive"
      });
      return;
    }
    try {
      // 模拟发送验证码
      setCountdown(60);
      toast({
        title: "验证码已发送",
        description: `验证码已发送至 ${account}`
      });
    } catch (error) {
      toast({
        title: "发送失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const handleSocialLogin = async provider => {
    setSocialLoading(provider);
    try {
      // 模拟社交登录
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "登录成功",
        description: `使用${provider}登录成功！`
      });
      $w.utils.navigateTo({
        pageId: 'personalCenter',
        params: {}
      });
    } catch (error) {
      toast({
        title: "登录失败",
        description: `${provider}登录失败，请稍后重试`,
        variant: "destructive"
      });
    } finally {
      setSocialLoading('');
    }
  };
  const handleForgotPassword = () => {
    toast({
      title: "功能开发中",
      description: "忘记密码功能正在开发中"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">欢迎登录</CardTitle>
            <p className="text-gray-600 text-sm">登录您的账户以继续</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 社交登录 */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('微信')} disabled={!!socialLoading}>
                {socialLoading === '微信' ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div> : <Smartphone className="w-4 h-4 mr-2 text-green-600" />}
                微信登录
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleSocialLogin('QQ')} disabled={!!socialLoading}>
                  {socialLoading === 'QQ' ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div> : <Chrome className="w-4 h-4 mr-2 text-blue-600" />}
                  QQ登录
                </Button>
                
                <Button variant="outline" onClick={() => handleSocialLogin('Apple')} disabled={!!socialLoading}>
                  {socialLoading === 'Apple' ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div> : <Apple className="w-4 h-4 mr-2" />}
                  Apple登录
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">或使用账号登录</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="account" rules={{
                required: '请输入手机号或邮箱',
                pattern: {
                  value: /^1[3-9]\d{9}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '请输入正确的手机号或邮箱'
                }
              }} render={({
                field,
                fieldState: {
                  error
                }
              }) => <FormItem>
                    <FormLabel>手机号/邮箱</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="请输入手机号或邮箱" className={`pl-10 ${error ? 'border-red-500' : ''}`} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                {loginType === 'password' ? <FormField control={form.control} name="password" rules={{
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
                          <Input type={showPassword ? "text" : "password"} placeholder="请输入密码" className={`pl-10 pr-10 ${error ? 'border-red-500' : ''}`} {...field} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} /> : <div className="space-y-2">
                    <FormLabel>验证码</FormLabel>
                    <div className="flex space-x-2">
                      <FormField control={form.control} name="code" rules={{
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
                      <Button type="button" variant="outline" onClick={sendCode} disabled={countdown > 0} className="px-4">
                        {countdown > 0 ? `${countdown}s` : '发送验证码'}
                      </Button>
                    </div>
                  </div>}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="remember" className="text-gray-600">
                      记住账号
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button type="button" onClick={() => setLoginType(loginType === 'password' ? 'code' : 'password')} className="text-blue-600 hover:text-blue-800">
                      {loginType === 'password' ? '使用验证码登录' : '使用密码登录'}
                    </button>
                    <button type="button" onClick={handleForgotPassword} className="text-blue-600 hover:text-blue-800">
                      忘记密码？
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" disabled={isLoading}>
                  {isLoading ? <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      登录中...
                    </div> : '登录'}
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">或</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => $w.utils.navigateTo({
            pageId: 'register',
            params: {}
          })}>
              注册新账户
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* 用户协议 */}
            <div className="text-xs text-center text-gray-500">
              登录即表示您同意
              <button className="text-blue-600 hover:underline mx-1">用户协议</button>
              和
              <button className="text-blue-600 hover:underline mx-1">隐私政策</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}