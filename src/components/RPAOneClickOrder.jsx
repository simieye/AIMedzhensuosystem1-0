// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, CreditCard, MapPin, User, Package, Clock, CheckCircle, AlertTriangle, Zap, Shield, ChevronRight, Truck } from 'lucide-react';

export function RPAOneClickOrder({
  product,
  onOrderComplete,
  onAddressUpdate
}) {
  const {
    toast
  } = useToast;
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStep, setOrderStep] = useState('idle');
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [orderResult, setOrderResult] = useState(null);
  useEffect(() => {
    // 加载默认地址
    const mockAddress = {
      id: 1,
      name: '张晓明',
      phone: '138****5678',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      detail: '建国门外大街1号国贸大厦A座1201室',
      isDefault: true
    };
    setDefaultAddress(mockAddress);
  }, []);
  const handleOneClickOrder = async () => {
    if (!defaultAddress) {
      toast({
        title: "请设置收货地址",
        description: "一键下单需要默认收货地址",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);
    setOrderStep('validating');
    try {
      // 步骤1: 验证库存和价格
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrderStep('creating');

      // 步骤2: 创建订单
      await new Promise(resolve => setTimeout(resolve, 1500));
      const orderData = {
        orderId: `ORD${Date.now()}`,
        product: product,
        quantity: 1,
        price: product.price,
        address: defaultAddress,
        paymentMethod: paymentMethod,
        createTime: new Date().toISOString(),
        estimatedDelivery: '3-5个工作日'
      };
      setOrderStep('payment');

      // 步骤3: 处理支付
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOrderStep('confirming');

      // 步骤4: 确认订单
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrderStep('completed');
      const result = {
        ...orderData,
        status: 'paid',
        trackingNumber: `SF${Date.now()}`,
        deliveryStatus: 'preparing'
      };
      setOrderResult(result);
      onOrderComplete?.(result);
      toast({
        title: "下单成功！",
        description: `订单号：${result.orderId}`,
        duration: 5000
      });
    } catch (error) {
      toast({
        title: "下单失败",
        description: "RPA自动下单失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const getStepIcon = step => {
    switch (step) {
      case 'validating':
        return <Shield className="w-5 h-5" />;
      case 'creating':
        return <Package className="w-5 h-5" />;
      case 'payment':
        return <CreditCard className="w-5 h-5" />;
      case 'confirming':
        return <CheckCircle className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };
  const getStepText = step => {
    switch (step) {
      case 'validating':
        return '验证商品信息';
      case 'creating':
        return '创建订单';
      case 'payment':
        return '处理支付';
      case 'confirming':
        return '确认订单';
      case 'completed':
        return '下单完成';
      default:
        return '准备中';
    }
  };
  const getStepStatus = step => {
    const steps = ['validating', 'creating', 'payment', 'confirming', 'completed'];
    const currentIndex = steps.indexOf(orderStep);
    const stepIndex = steps.indexOf(step);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            RPA一键下单
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>智能安全</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 商品信息 */}
        {product && <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-bold text-red-600">¥{product.price}</span>
                <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
              </div>
            </div>
          </div>}

        {/* 收货地址 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              收货地址
            </h4>
            <Button variant="outline" size="sm" onClick={onAddressUpdate}>
              修改地址
            </Button>
          </div>
          {defaultAddress ? <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">{defaultAddress.name}</p>
                    <p className="text-sm text-gray-600">{defaultAddress.phone}</p>
                    <p className="text-sm text-gray-800 mt-1">
                      {defaultAddress.province} {defaultAddress.city} {defaultAddress.district} {defaultAddress.detail}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">默认</span>
              </div>
            </div> : <div className="text-center py-8 text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>请设置收货地址</p>
            </div>}
        </div>

        {/* 支付方式 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            支付方式
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {[{
            id: 'alipay',
            name: '支付宝',
            icon: '💰'
          }, {
            id: 'wechat',
            name: '微信支付',
            icon: '💚'
          }, {
            id: 'card',
            name: '银行卡',
            icon: '💳'
          }].map(method => <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`p-3 border rounded-lg text-center transition-colors ${paymentMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="text-2xl mb-1">{method.icon}</div>
                <div className="text-sm font-medium">{method.name}</div>
              </button>)}
          </div>
        </div>

        {/* 处理进度 */}
        {isProcessing && <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">RPA处理进度</h4>
            <div className="space-y-3">
              {['validating', 'creating', 'payment', 'confirming', 'completed'].map(step => {
            const status = getStepStatus(step);
            return <div key={step} className={`flex items-center space-x-3 p-3 rounded-lg ${status === 'active' ? 'bg-blue-50 border-blue-200' : status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${status === 'active' ? 'bg-blue-600 text-white animate-pulse' : status === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {getStepIcon(step)}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${status === 'active' ? 'text-blue-800' : status === 'completed' ? 'text-green-800' : 'text-gray-600'}`}>
                        {getStepText(step)}
                      </p>
                      {status === 'active' && <p className="text-sm text-blue-600">正在处理...</p>}
                      {status === 'completed' && <p className="text-sm text-green-600">已完成</p>}
                    </div>
                  </div>;
          })}
            </div>
          </div>}

        {/* 订单结果 */}
        {orderResult && <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <h4 className="text-lg font-semibold text-green-800">下单成功！</h4>
              </div>
              <div className="text-sm text-green-600">
                订单号：{orderResult.orderId}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">支付金额:</p>
                <p className="font-semibold text-gray-800">¥{orderResult.price}</p>
              </div>
              <div>
                <p className="text-gray-600">支付方式:</p>
                <p className="font-semibold text-gray-800">{paymentMethod === 'alipay' ? '支付宝' : paymentMethod === 'wechat' ? '微信支付' : '银行卡'}</p>
              </div>
              <div>
                <p className="text-gray-600">预计送达:</p>
                <p className="font-semibold text-gray-800">{orderResult.estimatedDelivery}</p>
              </div>
              <div>
                <p className="text-gray-600">物流单号:</p>
                <p className="font-semibold text-gray-800">{orderResult.trackingNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 p-3 bg-blue-50 rounded-lg">
              <Truck className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-blue-800">商品正在准备发货，请耐心等待</p>
            </div>
          </div>}

        {/* 一键下单按钮 */}
        {!orderResult && <Button onClick={handleOneClickOrder} disabled={isProcessing || !defaultAddress} size="lg" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            {isProcessing ? <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                RPA处理中...
              </> : <>
                <Zap className="w-5 h-5 mr-2" />
                一键下单
              </>}
          </Button>}

        {/* 安全提示 */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">RPA智能下单说明</p>
              <ul className="space-y-1">
                <li>• 系统将自动验证商品信息和库存</li>
                <li>• 使用您设置的默认收货地址</li>
                <li>• 自动选择最优支付方式</li>
                <li>• 全程加密保护，安全可靠</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}