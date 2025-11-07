// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage, useToast, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Calendar, Save } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

export default function EditProfile(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const form = useForm({
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      phone: '',
      location: '',
      bio: ''
    }
  });
  useEffect(() => {
    // 模拟获取用户信息
    const userData = {
      name: $w.auth.currentUser?.name || '张三',
      nickname: $w.auth.currentUser?.nickName || '小明',
      email: 'zhangsan@example.com',
      phone: '13888888888',
      location: '北京市',
      bio: '这是一个简单的个人简介',
      avatar: $w.auth.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    setUser(userData);
    form.reset(userData);
  }, [$w.auth.currentUser, form]);
  const onSubmit = async data => {
    setIsLoading(true);
    try {
      // 模拟保存逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        ...user,
        ...data
      });
      toast({
        title: "保存成功",
        description: "您的资料已更新"
      });
      $w.utils.navigateBack();
    } catch (error) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (!user) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateBack()}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                返回
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">编辑资料</h1>
            </div>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? '保存中...' : '保存'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* 头像上传 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-3xl">{user.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-600">点击更换头像</p>
            </div>
          </CardContent>
        </Card>

        {/* 基本信息 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <FormField control={form.control} name="name" render={({
                field
              }) => <FormItem>
                    <FormLabel>姓名</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="请输入姓名" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="nickname" render={({
                field
              }) => <FormItem>
                    <FormLabel>昵称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入昵称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type="email" placeholder="请输入邮箱地址" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="phone" render={({
                field
              }) => <FormItem>
                    <FormLabel>手机号</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="请输入手机号" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="location" render={({
                field
              }) => <FormItem>
                    <FormLabel>所在地</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="请输入所在地" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                <FormField control={form.control} name="bio" render={({
                field
              }) => <FormItem>
                    <FormLabel>个人简介</FormLabel>
                    <FormControl>
                      <textarea placeholder="请输入个人简介" className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500" {...field} />
                    </FormControl>
                    <FormDescription>
                      简单介绍一下自己，让其他人更好地了解你
                    </FormDescription>
                    <FormMessage />
                  </FormItem>} />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>;
}