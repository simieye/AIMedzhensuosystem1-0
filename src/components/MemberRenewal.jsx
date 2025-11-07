// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Crown, CreditCard, Calendar, AlertTriangle, CheckCircle, Zap, Gift, Star, TrendingUp, Clock, Bell, RefreshCw } from 'lucide-react';

export function MemberRenewal({
  currentMembership,
  onRenewal,
  onUpgrade
}) {
  const {
    toast
  } = useToast;
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [renewalOptions, setRenewalOptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [reminderDays, setReminderDays] = useState(7);
  useEffect(() => {
    loadMembershipInfo();
    generateRenewalOptions();
  }, [currentMembership]);
  const loadMembershipInfo = () => {
    const mockMembershipInfo = {
      currentPlan: {
        id: 'premium',
        name: 'Premium会员',
        level: '高级',
        price: 2999,
        duration: '12个月',
        startDate: '2023-06-15',
        endDate: '2024-06-14',
        remainingDays: 45,
        status: 'active',
        benefits: ['无限次AI健康咨询', '个性化健康方案定制', '优先专家预约', '专属健康管家', '免费体检套餐', '营养产品8折优惠']
      },
      usage: {
        aiConsultations: 156,
        healthPlans: 8,
        expertAppointments: 3,
        savedAmount: 2580,
        healthScoreImprovement: 12
      },
      renewalHistory: [{
        date: '2023-06-15',
        plan: 'Premium会员',
        price: 2999
      }, {
        date: '2022-06-15',
        plan: 'Basic会员',
        price: 1999
      }, {
        date: '2021-06-15',
        plan: 'Basic会员',
        price: 1999
      }]
    };
    setMembershipInfo(mockMembershipInfo);
  };
  const generateRenewalOptions = () => {
    const options = [{
      id: 'basic',
      name: 'Basic会员',
      level: '基础',
      price: 1999,
      originalPrice: 2499,
      duration: '12个月',
      discount: 20,
      popular: false,
      benefits: ['每月10次AI咨询', '基础健康方案', '普通专家预约', '健康数据追踪'],
      color: 'text-gray-600'
    }, {
      id: 'premium',
      name: 'Premium会员',
      level: '高级',
      price: 2999,
      originalPrice: 3999,
      duration: '12个月',
      discount: 25,
      popular: true,
      benefits: ['无限次AI健康咨询', '个性化健康方案定制', '优先专家预约', '专属健康管家', '免费体检套餐', '营养产品8折优惠'],
      color: 'text-blue-600'
    }, {
      id: 'vip',
      name: 'VIP会员',
      level: '尊享',
      price: 5999,
      originalPrice: 7999,
      duration: '12个月',
      discount: 25,
      popular: false,
      benefits: ['Premium所有权益', '24/7专属健康顾问', '顶级专家绿色通道', '上门健康服务', '全家健康管理', '营养产品6折优惠', '豪华体检套餐'],
      color: 'text-yellow-600'
    }, {
      id: 'lifetime',
      name: '终身会员',
      level: '终身',
      price: 29999,
      originalPrice: 49999,
      duration: '终身',
      discount: 40,
      popular: false,
      benefits: ['VIP所有权益', '终身免费更新', '传承给家人', '专属健康基金', '年度健康旅行', '营养产品5折优惠'],
      color: 'text-purple-600'
    }];
    setRenewalOptions(options);
  };
  const handleRenewal = async plan => {
    setIsProcessing(true);
    try {
      // 模拟RPA自动续费处理
      await new Promise(resolve => setTimeout(resolve, 2000));
      const renewalResult = {
        orderId: `REN${Date.now()}`,
        plan: plan,
        processedAt: new Date().toISOString(),
        paymentMethod: '自动扣款',
        nextBillingDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      };
      onRenewal?.(renewalResult);
      toast({
        title: "续费成功！",
        description: `您已成功续费${plan.name}，会员权益已更新`,
        duration: 5000
      });
    } catch (error) {
      toast({
        title: "续费失败",
        description: "自动续费失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleUpgrade = plan => {
    setSelectedPlan(plan);
    onUpgrade?.(plan);
    toast({
      title: "升级会员",
      description: `正在为您升级到${plan.name}...`,
      action: <Button size="sm" onClick={() => handleRenewal(plan)}>
          确认升级
        </Button>
    });
  };
  const setupAutoRenewal = () => {
    setAutoRenewal(true);
    toast({
      title: "自动续费已设置",
      description: `将在会员到期前${reminderDays}天自动续费`
    });
  };
  const cancelAutoRenewal = () => {
    setAutoRenewal(false);
    toast({
      title: "自动续费已取消",
      description: "您需要手动续费会员服务"
    });
  };
  const getStatusColor = remainingDays => {
    if (remainingDays > 90) return 'text-green-600 bg-green-100';
    if (remainingDays > 30) return 'text-yellow-600 bg-yellow-100';
    if (remainingDays > 7) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };
  const getStatusText = remainingDays => {
    if (remainingDays > 90) return '充足';
    if (remainingDays > 30) return '正常';
    if (remainingDays > 7) return '即将到期';
    return '紧急续费';
  };
  if (!membershipInfo) {
    return <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>;
  }
  return <div className="space-y-6">
      {/* 当前会员状态 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              当前会员状态
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(membershipInfo.currentPlan.remainingDays)}`}>
                {getStatusText(membershipInfo.currentPlan.remainingDays)}
              </span>
              <Button variant="outline" size="sm" onClick={loadMembershipInfo}>
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">{membershipInfo.currentPlan.name}</h3>
              <p className="text-sm text-gray-600">{membershipInfo.currentPlan.level}</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{membershipInfo.currentPlan.remainingDays}</div>
              <p className="text-sm text-gray-600">剩余天数</p>
              <p className="text-xs text-gray-500 mt-1">
                到期: {new Date(membershipInfo.currentPlan.endDate).toLocaleDateString('zh-CN')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">¥{membershipInfo.usage.savedAmount}</div>
              <p className="text-sm text-gray-600">累计节省</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">+{membershipInfo.usage.healthScoreImprovement}</div>
              <p className="text-sm text-gray-600">健康提升</p>
            </div>
          </div>

          {/* 会员权益 */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-3">会员权益</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {membershipInfo.currentPlan.benefits.map((benefit, index) => <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-blue-800">{benefit}</span>
                </div>)}
            </div>
          </div>

          {/* 使用统计 */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{membershipInfo.usage.aiConsultations}</div>
              <div className="text-xs text-gray-600">AI咨询次数</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{membershipInfo.usage.healthPlans}</div>
              <div className="text-xs text-gray-600">健康方案</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{membershipInfo.usage.expertAppointments}</div>
              <div className="text-xs text-gray-600">专家预约</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{membershipInfo.renewalHistory.length}</div>
              <div className="text-xs text-gray-600">续费次数</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 自动续费设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            RPA自动续费设置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">会员即将到期</p>
                <p className="text-sm text-yellow-600">
                  建议设置自动续费，避免服务中断
                </p>
              </div>
            </div>
            <Button onClick={autoRenewal ? cancelAutoRenewal : setupAutoRenewal} variant={autoRenewal ? "outline" : "default"} className={autoRenewal ? "border-red-600 text-red-600" : ""}>
              {autoRenewal ? "取消自动续费" : "设置自动续费"}
            </Button>
          </div>

          {autoRenewal && <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">自动续费已启用</span>
              </div>
              <p className="text-sm text-green-600 mt-2">
                将在会员到期前{reminderDays}天自动续费当前套餐
              </p>
            </div>}
        </CardContent>
      </Card>

      {/* 续费选项 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            续费选项
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renewalOptions.map(plan => <div key={plan.id} className={`relative border rounded-lg p-4 transition-all hover:shadow-lg ${plan.popular ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      推荐
                    </span>
                  </div>}
                
                <div className="text-center mb-4">
                  <h3 className={`font-semibold text-lg ${plan.color}`}>{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.level}</p>
                </div>

                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-800">¥{plan.price}</div>
                  <div className="text-sm text-gray-400 line-through">¥{plan.originalPrice}</div>
                  <div className="text-sm text-green-600">节省{plan.discount}%</div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600">{plan.duration}</div>
                </div>

                <div className="space-y-2 mb-4">
                  {plan.benefits.slice(0, 3).map((benefit, index) => <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{benefit}</span>
                    </div>)}
                </div>

                <div className="space-y-2">
                  {plan.id === membershipInfo.currentPlan.id ? <Button className="w-full" variant="outline" disabled>
                      当前套餐
                    </Button> : plan.id === 'basic' ? <Button className="w-full" onClick={() => handleRenewal(plan)} disabled={isProcessing}>
                      {isProcessing ? '处理中...' : '续费'}
                    </Button> : <Button className="w-full" onClick={() => handleUpgrade(plan)} disabled={isProcessing}>
                      {isProcessing ? '处理中...' : '升级'}
                    </Button>}
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}