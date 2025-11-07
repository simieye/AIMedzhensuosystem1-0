// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Mic, MicOff, ShoppingCart, CreditCard, FileText, Zap, CheckCircle, AlertTriangle, Clock, User, MapPin, Phone, Mail } from 'lucide-react';

export function RPAOrderSystem({
  selectedProduct,
  recommendation,
  onOrderComplete,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState('idle'); // idle, listening, processing, payment, invoicing, completed
  const [voiceCommand, setVoiceCommand] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = speechRecognition ? new speechRecognition() : null;
  useEffect(() => {
    if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'zh-CN';
      recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setVoiceCommand(transcript);
        processVoiceCommand(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "语音识别失败",
          description: "请检查麦克风权限或重试",
          variant: "destructive"
        });
      };
      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);
  const startVoiceOrder = () => {
    if (!recognition) {
      toast({
        title: "语音识别不可用",
        description: "您的浏览器不支持语音识别",
        variant: "destructive"
      });
      return;
    }
    setIsListening(true);
    setOrderStatus('listening');
    recognition.start();
    toast({
      title: "语音下单已启动",
      description: "请说出您的购买需求，如：购买NMN 250mg两盒"
    });
  };
  const processVoiceCommand = async command => {
    setIsProcessing(true);
    setOrderStatus('processing');

    // 模拟RPA处理语音命令
    await new Promise(resolve => setTimeout(resolve, 2000));
    const parsedOrder = parseVoiceCommand(command);
    if (parsedOrder.success) {
      setOrderData(parsedOrder.data);
      await processOrder(parsedOrder.data);
    } else {
      toast({
        title: "订单解析失败",
        description: parsedOrder.error,
        variant: "destructive"
      });
      setIsProcessing(false);
      setOrderStatus('idle');
    }
  };
  const parseVoiceCommand = command => {
    const lowerCommand = command.toLowerCase();

    // 解析产品
    let product = selectedProduct;
    if (!product) {
      if (lowerCommand.includes('nmn')) {
        if (lowerCommand.includes('150')) {
          product = {
            id: 'nmn-150',
            name: 'NMN 150mg',
            price: 1350,
            specification: '150mg × 60粒'
          };
        } else if (lowerCommand.includes('250')) {
          product = {
            id: 'nmn-250',
            name: 'NMN 250mg',
            price: 2250,
            specification: '250mg × 60粒'
          };
        } else if (lowerCommand.includes('350')) {
          product = {
            id: 'nmn-350',
            name: 'NMN 350mg',
            price: 3150,
            specification: '350mg × 60粒'
          };
        } else if (lowerCommand.includes('500')) {
          product = {
            id: 'nmn-500',
            name: 'NMN 500mg',
            price: 4500,
            specification: '500mg × 60粒'
          };
        } else {
          product = {
            id: 'nmn-250',
            name: 'NMN 250mg',
            price: 2250,
            specification: '250mg × 60粒'
          };
        }
      } else {
        return {
          success: false,
          error: '未识别到有效产品'
        };
      }
    }

    // 解析数量
    let quantity = 1;
    const quantityMatch = lowerCommand.match(/(\d+)[个盒瓶]/);
    if (quantityMatch) {
      quantity = parseInt(quantityMatch[1]);
    } else if (lowerCommand.includes('两') || lowerCommand.includes('2')) {
      quantity = 2;
    } else if (lowerCommand.includes('三') || lowerCommand.includes('3')) {
      quantity = 3;
    }

    // 解析配送信息
    let deliveryInfo = {
      address: '北京市朝阳区建国门外大街1号',
      phone: '138****8888',
      name: '张先生',
      needInvoice: lowerCommand.includes('发票') || lowerCommand.includes('开票')
    };
    return {
      success: true,
      data: {
        product,
        quantity,
        totalPrice: product.price * quantity,
        deliveryInfo,
        orderTime: new Date().toISOString(),
        voiceCommand: command
      }
    };
  };
  const processOrder = async orderInfo => {
    try {
      // 步骤1: 创建订单
      setOrderStatus('payment');
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 步骤2: 自动支付
      const paymentResult = await processPayment(orderInfo);
      if (!paymentResult.success) {
        throw new Error(paymentResult.error);
      }

      // 步骤3: 开具发票
      setOrderStatus('invoicing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const invoiceResult = await generateInvoice(orderInfo);

      // 步骤4: 完成订单
      setOrderStatus('completed');
      const finalOrderData = {
        ...orderInfo,
        paymentId: paymentResult.paymentId,
        invoiceId: invoiceResult.invoiceId,
        invoiceUrl: invoiceResult.invoiceUrl,
        estimatedDelivery: calculateDeliveryDate()
      };
      setOrderData(finalOrderData);
      setIsProcessing(false);
      toast({
        title: "订单完成",
        description: `${orderInfo.product.name} x${orderInfo.quantity} 已成功下单，预计${finalOrderData.estimatedDelivery}送达`
      });
      onOrderComplete?.(finalOrderData);
    } catch (error) {
      setIsProcessing(false);
      setOrderStatus('idle');
      toast({
        title: "订单处理失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const processPayment = async orderInfo => {
    // 模拟RPA自动支付
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      paymentId: 'PAY' + Date.now(),
      amount: orderInfo.totalPrice,
      method: '支付宝',
      status: 'success'
    };
  };
  const generateInvoice = async orderInfo => {
    // 模拟RPA自动开票
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      invoiceId: 'INV' + Date.now(),
      invoiceUrl: 'https://invoice.example.com/INV' + Date.now(),
      type: '增值税普通发票',
      title: 'NMN保健品',
      amount: orderInfo.totalPrice
    };
  };
  const calculateDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('zh-CN');
  };
  const handleQuickOrder = async (quantity = 1) => {
    if (!selectedProduct) {
      toast({
        title: "请先选择产品",
        description: "请先在AI推荐中选择产品",
        variant: "destructive"
      });
      return;
    }
    const orderInfo = {
      product: selectedProduct,
      quantity,
      totalPrice: selectedProduct.price * quantity,
      deliveryInfo: {
        address: '北京市朝阳区建国门外大街1号',
        phone: '138****8888',
        name: '张先生',
        needInvoice: true
      },
      orderTime: new Date().toISOString(),
      quickOrder: true
    };
    setOrderData(orderInfo);
    await processOrder(orderInfo);
  };
  const getStatusIcon = () => {
    switch (orderStatus) {
      case 'listening':
        return <Mic className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'processing':
        return <Zap className="w-5 h-5 text-yellow-600 animate-spin" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'invoicing':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <ShoppingCart className="w-5 h-5 text-gray-600" />;
    }
  };
  const getStatusText = () => {
    switch (orderStatus) {
      case 'listening':
        return '正在听取语音指令...';
      case 'processing':
        return 'AI正在处理订单...';
      case 'payment':
        return '正在自动支付...';
      case 'invoicing':
        return '正在生成发票...';
      case 'completed':
        return '订单已完成';
      default:
        return '准备就绪';
    }
  };
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-600" />
          RPA智能下单系统
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 语音下单区域 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">语音智能下单</h3>
            <p className="text-sm text-gray-600">
              说出您的需求，AI将自动完成下单、支付、开票全流程
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button onClick={startVoiceOrder} disabled={isListening || isProcessing} className={`${isListening ? 'bg-red-600 hover:bg-red-700 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isListening ? <>
                  <MicOff className="w-4 h-4 mr-2" />
                  停止录音
                </> : <>
                  <Mic className="w-4 h-4 mr-2" />
                  开始语音下单
                </>}
            </Button>
          </div>

          {/* 状态显示 */}
          <div className="flex items-center justify-center space-x-2 text-sm">
            {getStatusIcon()}
            <span className="text-gray-600">{getStatusText()}</span>
          </div>

          {/* 语音命令显示 */}
          {voiceCommand && <div className="mt-4 p-3 bg-white rounded border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">识别到的命令：</p>
              <p className="text-gray-800">"{voiceCommand}"</p>
            </div>}
        </div>

        {/* 快速下单 */}
        {selectedProduct && <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">快速下单</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="font-semibold text-gray-800">{selectedProduct.name}</h5>
                  <p className="text-sm text-gray-600">{selectedProduct.specification}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">¥{selectedProduct.price}</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => handleQuickOrder(1)} disabled={isProcessing}>
                  购买1盒
                </Button>
                <Button variant="outline" onClick={() => handleQuickOrder(2)} disabled={isProcessing}>
                  购买2盒
                </Button>
                <Button variant="outline" onClick={() => handleQuickOrder(3)} disabled={isProcessing}>
                  购买3盒
                </Button>
              </div>
            </div>
          </div>}

        {/* 处理进度 */}
        {isProcessing && <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800">订单处理进度</h4>
            <div className="space-y-2">
              {['listening', 'processing', 'payment', 'invoicing', 'completed'].map((step, index) => <div key={step} className={`flex items-center space-x-3 p-3 rounded-lg ${orderStatus === step ? 'bg-blue-50 border border-blue-200' : ['completed', 'payment', 'invoicing'].includes(orderStatus) && ['listening', 'processing'].includes(step) ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus === step ? 'bg-blue-600 text-white animate-pulse' : ['completed', 'payment', 'invoicing'].includes(orderStatus) && ['listening', 'processing'].includes(step) ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {step === 'listening' && <Mic className="w-4 h-4" />}
                    {step === 'processing' && <Zap className="w-4 h-4" />}
                    {step === 'payment' && <CreditCard className="w-4 h-4" />}
                    {step === 'invoicing' && <FileText className="w-4 h-4" />}
                    {step === 'completed' && <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {step === 'listening' && '语音识别'}
                      {step === 'processing' && '订单处理'}
                      {step === 'payment' && '自动支付'}
                      {step === 'invoicing' && '开据发票'}
                      {step === 'completed' && '订单完成'}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>}

        {/* 订单完成信息 */}
        {orderData && orderStatus === 'completed' && <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h4 className="text-lg font-semibold text-green-800">订单已完成</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">订单信息</h5>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">商品：</span>{orderData.product.name}</p>
                  <p><span className="text-gray-600">数量：</span>{orderData.quantity}盒</p>
                  <p><span className="text-gray-600">总价：</span>¥{orderData.totalPrice}</p>
                  <p><span className="text-gray-600">订单号：</span>ORD{Date.now()}</p>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">配送信息</h5>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">收货人：</span>{orderData.deliveryInfo.name}</p>
                  <p><span className="text-gray-600">电话：</span>{orderData.deliveryInfo.phone}</p>
                  <p><span className="text-gray-600">地址：</span>{orderData.deliveryInfo.address}</p>
                  <p><span className="text-gray-600">预计送达：</span>{orderData.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowInvoice(!showInvoice)} className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                查看发票
              </Button>
              <Button className="flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                继续购物
              </Button>
            </div>
          </div>}

        {/* 发票信息 */}
        {showInvoice && orderData && orderData.invoiceId && <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-3">发票信息</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">发票号码：</p>
                <p className="font-medium">{orderData.invoiceId}</p>
              </div>
              <div>
                <p className="text-gray-600">发票金额：</p>
                <p className="font-medium">¥{orderData.totalPrice}</p>
              </div>
              <div>
                <p className="text-gray-600">发票类型：</p>
                <p className="font-medium">增值税普通发票</p>
              </div>
              <div>
                <p className="text-gray-600">下载链接：</p>
                <Button variant="outline" size="sm" className="mt-1">
                  下载发票
                </Button>
              </div>
            </div>
          </div>}

        {/* 使用说明 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-800 mb-2">语音下单示例</h5>
          <div className="space-y-1 text-sm text-gray-600">
            <p>• "购买NMN 250mg两盒"</p>
            <p>• "我要买NMN 500mg三盒，需要开发票"</p>
            <p>• "下单NMN 350mg一盒送到北京"</p>
          </div>
        </div>
      </CardContent>
    </div>;
}