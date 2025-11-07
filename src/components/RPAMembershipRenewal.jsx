// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Crown, Zap, CheckCircle, AlertTriangle, Clock, TrendingUp, Gift, Star, CreditCard, Calendar, ArrowRight } from 'lucide-react';

export function RPAMembershipRenewal({
  currentMembership,
  onRenewalComplete,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [renewalStatus, setRenewalStatus] = useState('idle');
  const [discountInfo, setDiscountInfo] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const membershipPlans = [{
    id: 'basic',
    name: '基础会员',
    duration: '12个月',
    originalPrice: 2880,
    currentPrice: 2880,
    discount: 0,
    features: ['基础健康评估', '月度健康报告', '在线客服支持', '健康数据存储'],
    popular: false,
    color: 'bg-gray-500'
  }, {
    id: 'premium',
    name: '高级会员',
    duration: '12个月',
    originalPrice: 5880,
    currentPrice: 4680,
    discount: 20,
    features: ['全面健康评估', 'AI个性化建议', '基因表达分析', '优先客服支持', '无限数据存储', '专家咨询'],
    popular: true,
    color: 'bg-blue-600'
  }, {
    id: 'platinum',
    name: '白金会员',
    duration: '12个月',
    originalPrice: 9880,
    currentPrice: 6880,
    discount: 30,
    features: ['全方位健康监测', '专属健康顾问', '深度基因分析', '24/7专属客服', '家庭健康管理', '线下就医绿通', '年度深度体检'],
    popular: false,
    color: 'bg-purple-600'
  }];
  const specialOffers = [{
    id: 'early_bird',
    title: '早鸟优惠',
    description: '提前续费享受额外10%折扣',
    discount: 10,
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    type: 'percentage'
  }, {
    id: 'loyalty',
    title: '忠诚会员奖励',
    description: '连续续费第3年享受15%折扣',
    discount: 15,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    type: 'percentage'
  }, {
    id: 'bundle',
    title: '套餐优惠',
    description: '购买24个月享受25%折扣',
    discount: 25,
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    type: 'percentage'
  }];
  useEffect(() => {
    // 检查用户是否符合优惠条件
    checkEligibleOffers();
  }, [currentMembership]);
  const checkEligibleOffers = () => {
    const eligibleOffers = specialOffers.filter(offer => {
      // 模拟优惠资格检查
      if (offer.id === 'early_bird') {
        return currentMembership?.daysUntilExpiry <= 30;
      } else if (offer.id === 'loyalty') {
        return currentMembership?.consecutiveYears >= 2;
      } else if (offer.id === 'bundle') {
        return true; // 所有人都符合套餐优惠
      }
      return false;
    });
    if (eligibleOffers.length > 0) {
      setDiscountInfo(eligibleOffers[0]);
    }
  };
  const handlePlanSelect = plan => {
    setSelectedPlan(plan);
    calculateFinalPrice(plan);
  };
  const calculateFinalPrice = plan => {
    let finalPrice = plan.currentPrice;
    if (discountInfo) {
      if (discountInfo.type === 'percentage') {
        finalPrice = plan.currentPrice * (1 - discountInfo.discount / 100);
      }
    }
    return finalPrice;
  };
  const processRenewal = async plan => {
    setIsProcessing(true);
    setRenewalStatus('processing');
    try {
      // 步骤1: 验证会员资格
      setRenewalStatus('validating');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 步骤2: 应用优惠
      setRenewalStatus('applying_discount');
      await new Promise(resolve => setTimeout(resolve, 800));

      // 步骤3: 处理支付
      setRenewalStatus('payment');
      const paymentResult = await processPayment(plan);
      if (!paymentResult.success) {
        throw new Error(paymentResult.error);
      }

      // 步骤4: 更新会员状态
      setRenewalStatus('updating');
      await new Promise(resolve => setTimeout(resolve, 1200));

      // 步骤5: 完成续费
      setRenewalStatus('completed');
      const renewalData = {
        planId: plan.id,
        planName: plan.name,
        duration: plan.duration,
        originalPrice: plan.originalPrice,
        finalPrice: calculateFinalPrice(plan),
        discount: discountInfo?.discount || 0,
        paymentId: paymentResult.paymentId,
        renewedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        benefits: plan.features
      };
      setPaymentStatus(paymentResult);
      setIsProcessing(false);
      onRenewalComplete?.(renewalData);
      toast({
        title: "续费成功",
        description: `${plan.name}续费成功，会员有效期至${new Date(renewalData.expiresAt).toLocaleDateString('zh-CN')}`
      });
    } catch (error) {
      setIsProcessing(false);
      setRenewalStatus('error');
      toast({
        title: "续费失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const processPayment = async plan => {
    // 模拟RPA自动支付
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      paymentId: 'PAY' + Date.now(),
      amount: calculateFinalPrice(plan),
      method: '支付宝',
      status: 'success',
      transactionId: 'TXN' + Date.now()
    };
  };
  const getStatusIcon = () => {
    switch (renewalStatus) {
      case 'processing':
      case 'validating':
      case 'applying_discount':
      case 'payment':
      case 'updating':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };
  const getStatusText = () => {
    switch (renewalStatus) {
      case 'validating':
        return '验证会员资格...';
      case 'applying_discount':
        return '应用优惠...';
      case 'payment':
        return '处理支付...';
      case 'updating':
        return '更新会员状态...';
      case 'completed':
        return '续费完成';
      case 'error':
        return '续费失败';
      default:
        return '准备就绪';
    }
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Crown className="w-5 h-5 mr-2 text-yellow-600" />
          RPA智能会员续费
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 当前会员状态 */}
        {currentMembership && <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">当前会员状态</h4>
                <p className="text-sm text-gray-600">
                  {currentMembership.plan} • 到期时间：{new Date(currentMembership.expiresAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentMembership.daysUntilExpiry <= 30 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}`}>
                  {currentMembership.daysUntilExpiry <= 30 ? '即将到期' : '正常'}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  剩余{currentMembership.daysUntilExpiry}天
                </p>
              </div>
            </div>
          </div>}

        {/* 优惠信息 */}
        {discountInfo && <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-3">
              <Gift className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <h4 className="font-semibold text-green-800">{discountInfo.title}</h4>
                <p className="text-sm text-green-700">{discountInfo.description}</p>
                <p className="text-xs text-green-600 mt-1">
                  有效期至：{discountInfo.validUntil.toLocaleDateString('zh-CN')}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">-{discountInfo.discount}%</div>
                <div className="text-xs text-green-600">额外折扣</div>
              </div>
            </div>
          </div>}

        {/* 会员计划选择 */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">选择会员计划</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {membershipPlans.map(plan => {
            const finalPrice = calculateFinalPrice(plan);
            const isSelected = selectedPlan?.id === plan.id;
            return <div key={plan.id} className={`relative border rounded-lg p-4 cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handlePlanSelect(plan)}>
                {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      最受欢迎
                    </span>
                  </div>}
                
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold text-gray-800">{plan.name}</h5>
                  <p className="text-sm text-gray-600">{plan.duration}</p>
                </div>
                
                <div className="text-center mb-4">
                  {plan.discount > 0 && <div className="text-sm text-gray-500 line-through">
                      {formatCurrency(plan.originalPrice)}
                    </div>}
                  <div className="text-2xl font-bold text-gray-800">
                    {formatCurrency(finalPrice)}
                  </div>
                  {discountInfo && <div className="text-xs text-green-600 mt-1">
                      已享{discountInfo.discount}%优惠
                    </div>}
                </div>
                
                <div className="space-y-2">
                  {plan.features.map((feature, index) => <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>)}
                </div>
              </div>;
          })}
          </div>
        </div>

        {/* 续费处理状态 */}
        {isProcessing && <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">续费处理进度</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{getStatusText()}</p>
                  {renewalStatus === 'payment' && <p className="text-sm text-gray-600 mt-1">
                      正在通过RPA自动处理支付...
                    </p>}
                </div>
              </div>
              {renewalStatus !== 'idle' && renewalStatus !== 'completed' && renewalStatus !== 'error' && <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{
                width: renewalStatus === 'validating' ? '20%' : renewalStatus === 'applying_discount' ? '40%' : renewalStatus === 'payment' ? '70%' : '90%'
              }}></div>
                  </div>
                </div>}
            </div>
          </div>}

        {/* 续费完成信息 */}
        {renewalStatus === 'completed' && paymentStatus && <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h4 className="text-lg font-semibold text-green-800">续费成功</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">续费详情</h5>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">会员计划：</span>{selectedPlan?.name}</p>
                  <p><span className="text-gray-600">有效期：</span>{selectedPlan?.duration}</p>
                  <p><span className="text-gray-600">原价：</span>{formatCurrency(selectedPlan?.originalPrice || 0)}</p>
                  <p><span className="text-gray-600">实付：</span>{formatCurrency(paymentStatus.amount)}</p>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">支付信息</h5>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">支付方式：</span>{paymentStatus.method}</p>
                  <p><span className="text-gray-600">交易号：</span>{paymentStatus.transactionId}</p>
                  <p><span className="text-gray-600">支付时间：</span>{new Date().toLocaleString('zh-CN')}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                查看会员权益
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <ArrowRight className="w-4 h-4 mr-2" />
                进入会员中心
              </Button>
            </div>
          </div>}

        {/* 续费按钮 */}
        {selectedPlan && !isProcessing && renewalStatus !== 'completed' && <Button onClick={() => processRenewal(selectedPlan)} className="w-full bg-blue-600 hover:bg-blue-700">
            <Zap className="w-4 h-4 mr-2" />
            立即续费{selectedPlan.name}
          </Button>}

        {/* 续费提醒 */}
        {currentMembership?.daysUntilExpiry <= 30 && renewalStatus !== 'completed' && <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div className="flex-1">
                <h4 className="font-semibold text-orange-800">续费提醒</h4>
                <p className="text-sm text-orange-700">
                  您的会员将在{currentMembership.daysUntilExpiry}天后到期，请及时续费以免影响服务使用。
                </p>
              </div>
            </div>
          </div>}
      </CardContent>
    </div>;
}