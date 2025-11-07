// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { FileText, Upload, Search, Brain, Activity, TrendingUp, AlertTriangle, Calendar, Clock, Users, Stethoscope, Scan, MessageCircle, BookOpen } from 'lucide-react';

// @ts-ignore;
import { OCRReportAnalyzer } from '@/components/OCRReportAnalyzer';
// @ts-ignore;
import { AIMedicalConsultation } from '@/components/AIMedicalConsultation';
// @ts-ignore;
import { RAGKnowledgeBase } from '@/components/RAGKnowledgeBase';
export default function DetectionCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('ocr');
  const [ocrResult, setOcrResult] = useState(null);
  const [consultationResult, setConsultationResult] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [userHealthData, setUserHealthData] = useState(null);
  useEffect(() => {
    // 模拟获取用户健康数据
    const mockHealthData = {
      uricAcid: 8.5,
      // 高尿酸血症
      lastCheckDate: '2024-01-10',
      riskFactors: ['高嘌呤饮食', '饮酒', '缺乏运动'],
      medications: ['降压药', '维生素D']
    };
    setUserHealthData(mockHealthData);
  }, []);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };
  const handleOCRAnalysisComplete = result => {
    setOcrResult(result);
    toast({
      title: "CT分析完成",
      description: "已检测到结节，建议进行AI问诊进一步评估"
    });
    // 自动切换到问诊标签
    setTimeout(() => {
      setActiveTab('consultation');
    }, 2000);
  };
  const handleConsultationComplete = result => {
    setConsultationResult(result);
    toast({
      title: "问诊完成",
      description: "AI问诊已完成，查看知识库推荐方案"
    });
    // 如果风险评分较高，自动切换到知识库
    if (result.riskScore > 40) {
      setTimeout(() => {
        setActiveTab('knowledge');
      }, 2000);
    }
  };
  const handleRecommendationSelect = recommendation => {
    setSelectedRecommendation(recommendation);
    toast({
      title: "方案已选择",
      description: `已选择${recommendation.name}，正在生成治疗方案...`
    });
  };
  const tabs = [{
    id: 'ocr',
    name: 'CT报告分析',
    icon: Scan,
    description: 'AI智能识别CT报告'
  }, {
    id: 'consultation',
    name: 'AI问诊',
    icon: MessageCircle,
    description: '智能健康评估'
  }, {
    id: 'knowledge',
    name: '知识库',
    icon: BookOpen,
    description: '医学文献推荐'
  }];
  const getRiskLevelColor = score => {
    if (score <= 20) return 'text-green-600 bg-green-100';
    if (score <= 35) return 'text-blue-600 bg-blue-100';
    if (score <= 50) return 'text-yellow-600 bg-yellow-100';
    if (score <= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };
  const getRiskLevelText = score => {
    if (score <= 20) return '低风险';
    if (score <= 35) return '中低风险';
    if (score <= 50) return '中等风险';
    if (score <= 70) return '高风险';
    return '极高风险';
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部背景 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI智能检测中心</h1>
              <p className="text-blue-100">基于人工智能的医学影像分析与健康评估</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{consultationResult?.riskScore || ocrResult?.overallAssessment?.riskScore || '--'}</div>
                <div className="text-blue-100 text-sm">风险评分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{ocrResult?.nodules?.length || '--'}</div>
                <div className="text-blue-100 text-sm">检测结节</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 健康提醒 */}
        {userHealthData && userHealthData.uricAcid > 7.0 && <Alert className="border-orange-200 bg-orange-50 mb-6">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>健康提醒：</strong>您的尿酸水平为{userHealthData.uricAcid}mg/dL，高于正常值。建议查看知识库中的汉方清幽方案。
            </AlertDescription>
          </Alert>}

        {/* 标签导航 */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
          {tabs.map(tab => {
          const Icon = tab.icon;
          return <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>;
        })}
        </div>

        {/* 主要内容区域 */}
        <div className="space-y-6">
          {activeTab === 'ocr' && <OCRReportAnalyzer onAnalysisComplete={handleOCRAnalysisComplete} />}
          
          {activeTab === 'consultation' && <AIMedicalConsultation initialData={ocrResult} onConsultationComplete={handleConsultationComplete} />}
          
          {activeTab === 'knowledge' && <RAGKnowledgeBase healthData={userHealthData} onRecommendationSelect={handleRecommendationSelect} />}
        </div>

        {/* 综合评估面板 */}
        {(ocrResult || consultationResult) && <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-600" />
                  综合健康评估
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* CT分析结果 */}
                  {ocrResult && <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <Scan className="w-4 h-4 mr-2" />
                        CT分析结果
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">检测结节</span>
                          <span className="font-medium">{ocrResult.nodules.length}个</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">最大结节</span>
                          <span className="font-medium">{ocrResult.overallAssessment.largestNodule}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">风险评分</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(ocrResult.overallAssessment.riskScore)}`}>
                            {ocrResult.overallAssessment.riskScore}分
                          </span>
                        </div>
                      </div>
                    </div>}

                  {/* 问诊结果 */}
                  {consultationResult && <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        AI问诊结果
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">综合评分</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(consultationResult.riskScore)}`}>
                            {consultationResult.riskScore}分
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">风险等级</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(consultationResult.riskScore)}`}>
                            {getRiskLevelText(consultationResult.riskScore)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">随访计划</span>
                          <span className="font-medium">{consultationResult.followUpPlan.nextCT}</span>
                        </div>
                      </div>
                    </div>}

                  {/* 推荐方案 */}
                  {selectedRecommendation && <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <Activity className="w-4 h-4 mr-2" />
                        推荐方案
                      </h4>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-blue-800 mb-1">{selectedRecommendation.name}</h5>
                        <p className="text-sm text-blue-700 mb-2">{selectedRecommendation.description}</p>
                        <div className="flex justify-between text-xs text-blue-600">
                          <span>疗效: {selectedRecommendation.efficacy}</span>
                          <span>价格: {selectedRecommendation.price}</span>
                        </div>
                      </div>
                    </div>}
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3 mt-6">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    预约专家
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    生成报告
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="w-4 h-4 mr-2" />
                    分享结果
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>}
      </div>
    </div>;
}