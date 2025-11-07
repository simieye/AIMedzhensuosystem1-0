// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { X, Heart, Activity, Brain, AlertTriangle, TrendingUp, Calendar, Clock, ChevronRight, Stethoscope, Pill } from 'lucide-react';

export function HeartDetailModal({
  isOpen,
  onClose,
  heartData,
  onBookAppointment
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  if (!isOpen) return null;
  const heartMetrics = {
    heartRate: {
      value: 72,
      unit: 'bpm',
      status: 'normal',
      trend: 'stable',
      description: '静息心率正常，心脏功能良好'
    },
    bloodPressure: {
      value: '120/80',
      unit: 'mmHg',
      status: 'optimal',
      trend: 'stable',
      description: '血压处于理想范围，心血管健康'
    },
    hrv: {
      value: 45,
      unit: 'ms',
      status: 'good',
      trend: 'up',
      description: '心率变异性良好，自主神经系统平衡'
    },
    vo2max: {
      value: 42,
      unit: 'ml/kg/min',
      status: 'excellent',
      trend: 'up',
      description: '最大摄氧量优秀，心肺功能强劲'
    }
  };
  const recommendations = [{
    icon: Activity,
    title: '有氧运动',
    description: '每周150分钟中等强度有氧运动',
    color: 'text-blue-600'
  }, {
    icon: Brain,
    title: '压力管理',
    description: '每日冥想15分钟，降低心脏负担',
    color: 'text-purple-600'
  }, {
    icon: Pill,
    title: '营养补充',
    description: 'Omega-3脂肪酸，辅酶Q10保护心脏',
    color: 'text-green-600'
  }];
  const riskFactors = [{
    factor: '年龄',
    level: 'low',
    description: '年龄适中，风险较低'
  }, {
    factor: '家族史',
    level: 'medium',
    description: '有轻微家族遗传倾向'
  }, {
    factor: '生活习惯',
    level: 'low',
    description: '生活习惯良好'
  }, {
    factor: '运动水平',
    level: 'low',
    description: '运动量充足'
  }];
  const getStatusColor = status => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'normal':
        return 'text-gray-600 bg-gray-100';
      case 'optimal':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getTrendIcon = trend => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };
  const handleBookAppointment = () => {
    toast({
      title: "预约功能",
      description: "正在为您预约心脏专科医生..."
    });
    onBookAppointment?.();
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] mx-4 my-8 bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">心脏健康分析</h2>
              <p className="text-gray-600">AI智能心脏功能评估</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 标签页 */}
        <div className="flex border-b">
          {['overview', 'metrics', 'risks', 'recommendations'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === tab ? 'text-red-600 border-b-2 border-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}>
              {tab === 'overview' ? '总览' : tab === 'metrics' ? '指标' : tab === 'risks' ? '风险' : '建议'}
            </button>)}
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">心脏健康总评</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-red-600 mb-2">92分</div>
                    <p className="text-gray-600">综合健康评分</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{
                      width: '92%'
                    }}></div>
                      </div>
                      <span className="text-sm text-gray-600">优秀</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">32岁</div>
                    <p className="text-gray-600">心脏年龄</p>
                    <p className="text-sm text-green-600 mt-1">比实际年龄年轻3岁</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-600" />
                  AI智能分析
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  基于您的心电图、血压、心率变异性等多项指标分析，您的心脏功能处于优秀水平。
                  心肌收缩力良好，血液循环顺畅，心律规则。建议继续保持当前的运动习惯和健康饮食，
                  定期进行有氧运动，有助于进一步提升心脏功能。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return <Card key={index} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Icon className={`w-5 h-5 mt-1 ${rec.color}`} />
                          <div>
                            <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>;
            })}
              </div>
            </div>}

          {activeTab === 'metrics' && <div className="space-y-4">
              {Object.entries(heartMetrics).map(([key, metric]) => <Card key={key}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-800">
                            {key === 'heartRate' ? '心率' : key === 'bloodPressure' ? '血压' : key === 'hrv' ? '心率变异性' : '最大摄氧量'}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                            {metric.status === 'excellent' ? '优秀' : metric.status === 'good' ? '良好' : metric.status === 'normal' ? '正常' : '理想'}
                          </span>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                          <span className="text-gray-600">{metric.unit}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{metric.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}

          {activeTab === 'risks' && <div className="space-y-4">
              <div className="bg-yellow-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                  心血管风险评估
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {riskFactors.map((risk, index) => <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{risk.factor}</p>
                        <p className="text-sm text-gray-600">{risk.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${risk.level === 'low' ? 'bg-green-100 text-green-800' : risk.level === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {risk.level === 'low' ? '低风险' : risk.level === 'medium' ? '中风险' : '高风险'}
                      </span>
                    </div>)}
                </div>
              </div>
            </div>}

          {activeTab === 'recommendations' && <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4">个性化心脏健康计划</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Activity className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h5 className="font-medium text-gray-800">运动处方</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        • 每周5次，每次30分钟中等强度有氧运动<br />
                        • 心率控制在最大心率的60-70%<br />
                        • 推荐运动：快走、游泳、骑行
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Pill className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h5 className="font-medium text-gray-800">营养建议</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        • 增加Omega-3脂肪酸摄入<br />
                        • 控制钠盐摄入，每日&lt;6g<br />
                        • 多吃富含钾的食物：香蕉、菠菜
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>

        {/* 底部操作 */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>下次检查：3个月后</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>最后更新：2小时前</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                关闭
              </Button>
              <Button onClick={handleBookAppointment} className="bg-red-600 hover:bg-red-700">
                <Stethoscope className="w-4 h-4 mr-2" />
                预约专科医生
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}