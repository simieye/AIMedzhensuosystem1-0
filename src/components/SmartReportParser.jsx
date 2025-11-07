// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, FileText, Camera, Scan, CheckCircle, AlertTriangle, Brain, Eye, Heart, Activity, TrendingUp } from 'lucide-react';

export function SmartReportParser({
  onParseComplete,
  onAIConsultation,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [aiQuestions, setAiQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const fileInputRef = useRef(null);
  const handleFileUpload = async event => {
    const file = event.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      // 模拟文件上传
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 开始解析
      setIsParsing(true);
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 模拟解析结果
      const mockParsedData = {
        reportType: 'CT',
        bodyPart: '肺部',
        findings: [{
          id: 1,
          description: '肺部结节3mm',
          location: '右肺上叶',
          benignProbability: 98.7,
          riskLevel: 'low',
          recommendation: '定期复查'
        }, {
          id: 2,
          description: '轻微炎症',
          location: '左肺下叶',
          benignProbability: 95.2,
          riskLevel: 'very_low',
          recommendation: '观察随访'
        }],
        overallAssessment: '肺部整体状况良好，发现小结节建议定期随访',
        nextCheckup: '6个月后'
      };
      setParsedData(mockParsedData);

      // 生成AI问诊问题
      const mockQuestions = [{
        id: 1,
        question: '您最近有咳嗽吗？',
        options: ['是', '否', '偶尔'],
        type: 'single'
      }, {
        id: 2,
        question: '您有吸烟史吗？',
        options: ['从未吸烟', '已戒烟', '仍在吸烟'],
        type: 'single'
      }, {
        id: 3,
        question: '您有呼吸困难的情况吗？',
        options: ['经常', '偶尔', '没有'],
        type: 'single'
      }];
      setAiQuestions(mockQuestions);
      toast({
        title: "解析完成",
        description: "报告已成功解析，发现2项异常"
      });
      onParseComplete?.(mockParsedData);
    } catch (error) {
      toast({
        title: "解析失败",
        description: "报告解析失败，请重试",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setIsParsing(false);
    }
  };
  const handleQuestionAnswer = (questionId, answer) => {
    // 记录答案
    const updatedQuestions = aiQuestions.map(q => q.id === questionId ? {
      ...q,
      answer
    } : q);
    setAiQuestions(updatedQuestions);

    // 进入下一个问题
    if (currentQuestionIndex < aiQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 完成问诊
      handleConsultationComplete(updatedQuestions);
    }
  };
  const handleConsultationComplete = questions => {
    // 计算风险评分
    const riskScore = calculateRiskScore(questions);
    toast({
      title: "问诊完成",
      description: `根据您的回答，健康风险评分为${riskScore}分`
    });
    onAIConsultation?.({
      questions,
      riskScore,
      parsedData
    });
  };
  const calculateRiskScore = questions => {
    // 简单的风险评分算法
    let score = 0;
    questions.forEach(q => {
      if (q.answer === '是' || q.answer === '经常' || q.answer === '仍在吸烟') {
        score += 10;
      } else if (q.answer === '偶尔' || q.answer === '已戒烟') {
        score += 5;
      }
    });
    return Math.min(score, 100);
  };
  const getRiskLevelColor = level => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getRiskLevelText = level => {
    switch (level) {
      case 'low':
        return '低风险';
      case 'moderate':
        return '中等风险';
      case 'high':
        return '高风险';
      default:
        return '未知';
    }
  };
  return <div className={`space-y-6 ${className}`}>
      {/* 上传区域 */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8 text-center">
          <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
          
          {isUploading || isParsing ? <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">
                {isUploading ? '正在上传报告...' : '正在智能解析...'}
              </p>
            </div> : <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Scan className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">智能报告解析</h3>
                <p className="text-gray-600 mb-4">
                  上传CT、X光、化验单等检测报告，AI将自动解析并给出专业建议
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  选择文件
                </Button>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Camera className="w-4 h-4 mr-2" />
                  拍照上传
                </Button>
              </div>
            </div>}
        </CardContent>
      </Card>

      {/* 解析结果 */}
      {parsedData && <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              解析结果
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">报告类型</p>
                <p className="font-semibold">{parsedData.reportType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">检查部位</p>
                <p className="font-semibold">{parsedData.bodyPart}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">发现异常</h4>
              <div className="space-y-3">
                {parsedData.findings.map(finding => <div key={finding.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{finding.description}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          位置：{finding.location} | 良性概率：{finding.benignProbability}%
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(finding.riskLevel)}`}>
                        {getRiskLevelText(finding.riskLevel)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      建议：{finding.recommendation}
                    </div>
                  </div>)}
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Brain className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>整体评估：</strong>{parsedData.overallAssessment}
              </AlertDescription>
            </Alert>

            <div className="text-sm text-gray-600">
              <p>下次复查时间：{parsedData.nextCheckup}</p>
            </div>
          </CardContent>
        </Card>}

      {/* AI问诊 */}
      {aiQuestions.length > 0 && currentQuestionIndex < aiQuestions.length && <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              AI智能问诊
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">
                问题 {currentQuestionIndex + 1} / {aiQuestions.length}
              </span>
              <div className="flex space-x-1">
                {aiQuestions.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full ${index <= currentQuestionIndex ? 'bg-blue-600' : 'bg-gray-300'}`}></div>)}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                {aiQuestions[currentQuestionIndex].question}
              </h4>
              <div className="space-y-2">
                {aiQuestions[currentQuestionIndex].options.map(option => <button key={option} onClick={() => handleQuestionAnswer(aiQuestions[currentQuestionIndex].id, option)} className="w-full p-3 text-left border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
                    {option}
                  </button>)}
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* 数字孪生监控 */}
      {parsedData && <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium text-green-800">已加入数字孪生监控</p>
                <p className="text-sm text-green-600">
                  系统将自动跟踪您的健康指标变化，如有异常会及时提醒
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>}
    </div>;
}