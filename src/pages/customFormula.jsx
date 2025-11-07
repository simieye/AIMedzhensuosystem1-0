// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, User, Activity, Heart, Brain, Shield, ChevronRight, CheckCircle, Clock, Award, FlaskConical, Target, Star } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
export default function CustomFormula(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    healthGoals: [],
    currentSymptoms: [],
    lifestyle: '',
    budget: '',
    allergies: []
  });
  const steps = [{
    id: 1,
    title: '基本信息',
    icon: User
  }, {
    id: 2,
    title: '健康目标',
    icon: Target
  }, {
    id: 3,
    title: '症状评估',
    icon: Activity
  }, {
    id: 4,
    title: '生活方式',
    icon: Heart
  }, {
    id: 5,
    title: '配方确认',
    icon: FlaskConical
  }];
  const healthGoals = [{
    id: 'anti-aging',
    name: '抗衰老',
    icon: Shield
  }, {
    id: 'immunity',
    name: '增强免疫',
    icon: Heart
  }, {
    id: 'energy',
    name: '提升精力',
    icon: Activity
  }, {
    id: 'sleep',
    name: '改善睡眠',
    icon: Clock
  }, {
    id: 'brain',
    name: '健脑益智',
    icon: Brain
  }, {
    id: 'beauty',
    name: '美容养颜',
    icon: Star
  }];
  const symptoms = ['疲劳乏力', '失眠多梦', '记忆力下降', '免疫力低下', '关节疼痛', '皮肤老化', '内分泌失调', '心血管问题'];
  const lifestyleOptions = [{
    value: 'sedentary',
    label: '久坐少动'
  }, {
    value: 'moderate',
    label: '适度运动'
  }, {
    value: 'active',
    label: '经常运动'
  }, {
    value: 'intense',
    label: '高强度运动'
  }];
  const budgetRanges = [{
    value: 'basic',
    label: '基础方案 (¥1000-2000/月)'
  }, {
    value: 'standard',
    label: '标准方案 (¥2000-5000/月)'
  }, {
    value: 'premium',
    label: '高端方案 (¥5000-10000/月)'
  }, {
    value: 'luxury',
    label: '奢华方案 (¥10000+/月)'
  }];
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSubmit = async () => {
    try {
      // 模拟提交
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "提交成功",
        description: "您的定制配方需求已提交，专家团队将在24小时内联系您"
      });
      $w.utils.navigateBack();
    } catch (error) {
      toast({
        title: "提交失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const toggleHealthGoal = goalId => {
    setFormData(prev => ({
      ...prev,
      healthGoals: prev.healthGoals.includes(goalId) ? prev.healthGoals.filter(id => id !== goalId) : [...prev.healthGoals, goalId]
    }));
  };
  const toggleSymptom = symptom => {
    setFormData(prev => ({
      ...prev,
      currentSymptoms: prev.currentSymptoms.includes(symptom) ? prev.currentSymptoms.filter(s => s !== symptom) : [...prev.currentSymptoms, symptom]
    }));
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">年龄</label>
              <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="请输入您的年龄" value={formData.age} onChange={e => setFormData(prev => ({
              ...prev,
              age: e.target.value
            }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
              <div className="grid grid-cols-2 gap-4">
                {['男', '女'].map(gender => <Button key={gender} variant={formData.gender === gender ? "default" : "outline"} onClick={() => setFormData(prev => ({
                ...prev,
                gender
              }))} className="p-4">
                    {gender}
                  </Button>)}
              </div>
            </div>
          </div>;
      case 2:
        return <div className="space-y-4">
            <h4 className="font-medium text-gray-800">请选择您的健康目标（可多选）</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {healthGoals.map(goal => {
              const Icon = goal.icon;
              return <Button key={goal.id} variant={formData.healthGoals.includes(goal.id) ? "default" : "outline"} onClick={() => toggleHealthGoal(goal.id)} className="p-4 h-auto flex flex-col items-center space-y-2">
                  <Icon className="w-6 h-6" />
                  <span className="text-sm">{goal.name}</span>
                </Button>;
            })}
            </div>
          </div>;
      case 3:
        return <div className="space-y-4">
            <h4 className="font-medium text-gray-800">请选择您当前的症状（可多选）</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {symptoms.map(symptom => <Button key={symptom} variant={formData.currentSymptoms.includes(symptom) ? "default" : "outline"} onClick={() => toggleSymptom(symptom)} size="sm" className="text-sm">
                  {symptom}
                </Button>)}
            </div>
          </div>;
      case 4:
        return <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">运动习惯</label>
              <div className="space-y-2">
                {lifestyleOptions.map(option => <Button key={option.value} variant={formData.lifestyle === option.value ? "default" : "outline"} onClick={() => setFormData(prev => ({
                ...prev,
                lifestyle: option.value
              }))} className="w-full justify-start">
                    {option.label}
                  </Button>)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">预算范围</label>
              <div className="space-y-2">
                {budgetRanges.map(range => <Button key={range.value} variant={formData.budget === range.value ? "default" : "outline"} onClick={() => setFormData(prev => ({
                ...prev,
                budget: range.value
              }))} className="w-full justify-start">
                    {range.label}
                  </Button>)}
              </div>
            </div>
          </div>;
      case 5:
        return <div className="space-y-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                基于您的信息，我们的专家团队为您推荐以下定制配方
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">推荐配方</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>NMN细胞活化剂</span>
                      <span className="font-semibold">¥2,880</span>
                    </div>
                    <div className="flex justify-between">
                      <span>辅酶Q10</span>
                      <span className="font-semibold">¥1,580</span>
                    </div>
                    <div className="flex justify-between">
                      <span>维生素复合物</span>
                      <span className="font-semibold">¥980</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>总计</span>
                        <span className="text-purple-600">¥5,440/月</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">预期效果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>细胞活性提升 35%</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>免疫力增强 28%</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>精力水平提升 40%</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>睡眠质量改善 32%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                专家团队将在24小时内与您联系，进一步确认配方细节
              </p>
              <Button onClick={handleSubmit} size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Award className="w-5 h-5 mr-2" />
                确认定制方案
              </Button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateBack()}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回商城
            </Button>
            <h1 className="text-xl font-semibold text-gray-800">定制配方</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* 步骤指示器 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${isCompleted ? 'bg-green-500 border-green-500' : isCurrent ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}`}>
                  {isCompleted ? <CheckCircle className="w-6 h-6 text-white" /> : <Icon className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />}
                </div>
                <div className="ml-3">
                  <p className={`font-medium ${isCurrent ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}`}></div>}
              </div>;
          })}
          </div>
        </div>

        {/* 主要内容 */}
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* 导航按钮 */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            上一步
          </Button>
          {currentStep < steps.length ? <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
              下一步
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button> : null}
        </div>
      </div>
    </div>;
}