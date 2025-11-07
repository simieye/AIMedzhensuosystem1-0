// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { User, MessageCircle, Send, AlertTriangle, TrendingUp, Activity, Clock, CheckCircle, Brain, Stethoscope, Calendar, Pill, Heart } from 'lucide-react';

export function AIMedicalConsultation({
  initialData,
  onConsultationComplete,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [riskScore, setRiskScore] = useState(15);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [consultationResult, setConsultationResult] = useState(null);
  const consultationSteps = [{
    id: 'symptoms',
    title: '症状询问',
    icon: MessageCircle,
    questions: [{
      id: 'cough',
      text: '您最近是否有咳嗽症状？',
      type: 'single',
      options: ['无咳嗽', '偶尔干咳', '频繁咳嗽', '咳嗽带血'],
      weights: [0, 2, 4, 8]
    }, {
      id: 'breath',
      text: '您是否有呼吸困难或气短？',
      type: 'single',
      options: ['无', '轻微', '中度', '严重'],
      weights: [0, 2, 4, 6]
    }, {
      id: 'pain',
      text: '您是否有胸痛或不适？',
      type: 'single',
      options: ['无', '偶尔轻微', '经常轻微', '持续明显'],
      weights: [0, 1, 3, 5]
    }]
  }, {
    id: 'lifestyle',
    title: '生活习惯',
    icon: User,
    questions: [{
      id: 'smoking',
      text: '您的吸烟情况如何？',
      type: 'single',
      options: ['从不吸烟', '已戒烟', '偶尔吸烟', '经常吸烟'],
      weights: [0, 1, 3, 6]
    }, {
      id: 'exercise',
      text: '您的运动频率如何？',
      type: 'single',
      options: ['每天运动', '每周3-4次', '每周1-2次', '很少运动'],
      weights: [0, 1, 2, 4]
    }, {
      id: 'diet',
      text: '您的饮食习惯如何？',
      type: 'single',
      options: ['健康均衡', '较健康', '一般', '不健康'],
      weights: [0, 1, 2, 3]
    }]
  }, {
    id: 'medical_history',
    title: '病史询问',
    icon: Stethoscope,
    questions: [{
      id: 'family_history',
      text: '您的家族是否有肺癌病史？',
      type: 'single',
      options: ['无', '有远亲病史', '有近亲病史', '多人有病史'],
      weights: [0, 2, 4, 6]
    }, {
      id: 'previous_diseases',
      text: '您是否有既往肺部疾病史？',
      type: 'single',
      options: ['无', '肺炎史', '结核史', '其他肺病'],
      weights: [0, 1, 2, 4]
    }, {
      id: 'occupational_exposure',
      text: '您是否有职业性暴露史？',
      type: 'single',
      options: ['无', '轻微暴露', '中度暴露', '重度暴露'],
      weights: [0, 2, 4, 8]
    }]
  }];
  useEffect(() => {
    // 计算风险评分
    let totalScore = 15; // 基础分（来自CT分析）
    Object.values(answers).forEach(answer => {
      if (answer && answer.weight) {
        totalScore += answer.weight;
      }
    });
    setRiskScore(Math.min(totalScore, 100));
  }, [answers]);
  const handleAnswer = (questionId, optionIndex) => {
    const question = consultationSteps[currentStep].questions.find(q => q.id === questionId);
    const selectedOption = question.options[optionIndex];
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        text: selectedOption,
        weight: question.weights[optionIndex]
      }
    }));
  };
  const handleNext = () => {
    if (currentStep < consultationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeConsultation();
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const completeConsultation = async () => {
    setIsAnalyzing(true);

    // 模拟AI分析过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    const result = {
      riskScore,
      riskLevel: getRiskLevel(riskScore),
      recommendations: generateRecommendations(riskScore),
      followUpPlan: generateFollowUpPlan(riskScore),
      analysisTime: new Date().toISOString()
    };
    setConsultationResult(result);
    setIsAnalyzing(false);
    onConsultationComplete?.(result);
    toast({
      title: "问诊完成",
      description: `AI评估完成，您的风险评分为${riskScore}分`
    });
  };
  const getRiskLevel = score => {
    if (score <= 20) return 'very_low';
    if (score <= 35) return 'low';
    if (score <= 50) return 'moderate';
    if (score <= 70) return 'high';
    return 'very_high';
  };
  const generateRecommendations = score => {
    const baseRecommendations = ['定期复查CT', '保持健康生活方式'];
    if (score > 50) {
      baseRecommendations.push('考虑进一步检查', '咨询专科医生');
    }
    if (score > 70) {
      baseRecommendations.push('及时就医治疗', '密切监测症状变化');
    }
    return baseRecommendations;
  };
  const generateFollowUpPlan = score => {
    if (score <= 20) {
      return {
        nextCT: '6-12个月',
        frequency: '年度体检',
        monitoring: '基础监测'
      };
    } else if (score <= 35) {
      return {
        nextCT: '3-6个月',
        frequency: '半年体检',
        monitoring: '定期监测'
      };
    } else if (score <= 50) {
      return {
        nextCT: '1-3个月',
        frequency: '季度体检',
        monitoring: '密切监测'
      };
    } else {
      return {
        nextCT: '1个月内',
        frequency: '月度体检',
        monitoring: '持续监测'
      };
    }
  };
  const getRiskLevelColor = level => {
    switch (level) {
      case 'very_low':
        return 'text-green-600 bg-green-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'very_high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getRiskLevelText = level => {
    switch (level) {
      case 'very_low':
        return '极低风险';
      case 'low':
        return '低风险';
      case 'moderate':
        return '中等风险';
      case 'high':
        return '高风险';
      case 'very_high':
        return '极高风险';
      default:
        return '未知';
    }
  };
  const resetConsultation = () => {
    setCurrentStep(0);
    setAnswers({});
    setRiskScore(15);
    setConsultationResult(null);
  };
  const currentStepData = consultationSteps[currentStep];
  const isStepComplete = currentStepData.questions.every(q => answers[q.id]);
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-600" />
          AI智能问诊
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 进度指示器 */}
        <div className="flex items-center justify-between mb-6">
          {consultationSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          return <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${isActive ? 'border-blue-600 bg-blue-600 text-white' : isCompleted ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 text-gray-400'}`}>
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              {index < consultationSteps.length - 1 && <div className={`flex-1 h-1 mx-2 transition-colors ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`}></div>}
            </div>;
        })}
        </div>

        {/* 风险评分显示 */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <h4 className="font-semibold text-gray-800">当前风险评分</h4>
                <p className="text-sm text-gray-600">基于AI分析的综合评估</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">{riskScore}</div>
              <div className="text-sm text-gray-600">满分100分</div>
            </div>
          </div>
        </div>

        {/* 问诊内容 */}
        {!consultationResult && !isAnalyzing && <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <currentStepData.icon className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">{currentStepData.title}</h3>
            </div>
            
            {currentStepData.questions.map(question => <div key={question.id} className="space-y-3">
                <p className="font-medium text-gray-800">{question.text}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options.map((option, index) => {
              const isSelected = answers[question.id]?.text === option;
              return <button key={index} onClick={() => handleAnswer(question.id, index)} className={`p-3 rounded-lg border text-left transition-colors ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-gray-300 hover:border-gray-400'}`}>
                      {option}
                    </button>;
            })}
                </div>
              </div>)}

            {/* 导航按钮 */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                上一步
              </Button>
              <Button onClick={handleNext} disabled={!isStepComplete} className="bg-blue-600 hover:bg-blue-700">
                {currentStep === consultationSteps.length - 1 ? '完成问诊' : '下一步'}
              </Button>
            </div>
          </div>}

        {/* 分析中状态 */}
        {isAnalyzing && <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">AI正在综合分析您的健康状况...</p>
          </div>}

        {/* 问诊结果 */}
        {consultationResult && !isAnalyzing && <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">AI问诊结果</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(consultationResult.riskLevel)}`}>
                  {getRiskLevelText(consultationResult.riskLevel)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">随访计划</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">下次CT检查</span>
                      <span className="font-medium">{consultationResult.followUpPlan.nextCT}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">体检频率</span>
                      <span className="font-medium">{consultationResult.followUpPlan.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">监测强度</span>
                      <span className="font-medium">{consultationResult.followUpPlan.monitoring}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">健康建议</h4>
                  <ul className="space-y-2">
                    {consultationResult.recommendations.map((rec, index) => <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{rec}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                预约复查
              </Button>
              <Button variant="outline" className="flex-1" onClick={resetConsultation}>
                重新问诊
              </Button>
            </div>
          </div>}
      </CardContent>
    </div>;
}