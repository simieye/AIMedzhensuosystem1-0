// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, FileText, Bot, BookOpen, AlertTriangle, Activity, Heart, Brain, Shield, Target, Camera, Stethoscope, Clock, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { OCRReportParser } from '@/components/OCRReportParser';
// @ts-ignore;
import { AIMedicalConsultation } from '@/components/AIMedicalConsultation';
// @ts-ignore;
import { RAGKnowledgeBase } from '@/components/RAGKnowledgeBase';
// @ts-ignore;
import { RiskAssessment } from '@/components/RiskAssessment';
export default function DetectionCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('ocr');
  const [parsedReport, setParsedReport] = useState(null);
  const [consultationData, setConsultationData] = useState([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);
  const [riskScores, setRiskScores] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [highlightMetric, setHighlightMetric] = useState(null);
  useEffect(() => {
    // 检查URL参数，如果有highlight参数则高亮对应指标
    const params = $w.page.dataset.params;
    if (params?.highlight) {
      setHighlightMetric(params.highlight);
      toast({
        title: "智能导航",
        description: `已为您高亮${params.highlight}相关指标`
      });
    }
  }, [$w.page.dataset.params]);
  const handleReportParsed = reportData => {
    setParsedReport(reportData);
    // 自动切换到风险评估标签
    setTimeout(() => {
      setActiveTab('risk');
    }, 1000);
  };
  const handleConsultationComplete = consultationMessages => {
    setConsultationData(consultationMessages);
    // 提取症状信息
    const symptoms = consultationMessages.filter(m => m.type === 'user').map(m => m.content);
    // 自动切换到知识库推荐
    setTimeout(() => {
      setActiveTab('knowledge');
    }, 1000);
  };
  const handleRecommendationSelect = recommendation => {
    setSelectedRecommendations(prev => [...prev, recommendation]);
    toast({
      title: "文献已选择",
      description: `已添加《${recommendation.title}》到推荐列表`
    });
  };
  const handleRiskUpdate = scores => {
    setRiskScores(scores);
    // 如果有高风险项目，显示提醒
    const highRisks = Object.entries(scores).filter(([_, score]) => score >= 60);
    if (highRisks.length > 0) {
      toast({
        title: "风险提醒",
        description: `发现${highRisks.length}项高风险指标，建议重点关注`,
        variant: "destructive"
      });
    }
  };
  const handleImageUpload = image => {
    setUploadedImage(image);
  };
  const handleQuickAction = action => {
    switch (action) {
      case 'upload_report':
        setActiveTab('ocr');
        break;
      case 'ai_consultation':
        setActiveTab('consultation');
        break;
      case 'risk_assessment':
        setActiveTab('risk');
        break;
      case 'knowledge_base':
        setActiveTab('knowledge');
        break;
      default:
        break;
    }
  };
  const quickActions = [{
    id: 'upload_report',
    title: '上传报告',
    description: 'OCR智能解析检测报告',
    icon: Upload,
    color: 'bg-blue-500'
  }, {
    id: 'ai_consultation',
    title: 'AI问诊',
    description: '智能症状分析',
    icon: Bot,
    color: 'bg-green-500'
  }, {
    id: 'risk_assessment',
    title: '风险评估',
    description: '健康风险评分',
    icon: AlertTriangle,
    color: 'bg-orange-500'
  }, {
    id: 'knowledge_base',
    title: '知识库',
    description: '医学文献推荐',
    icon: BookOpen,
    color: 'bg-purple-500'
  }];
  const getTabIcon = tabId => {
    switch (tabId) {
      case 'ocr':
        return Camera;
      case 'consultation':
        return Bot;
      case 'knowledge':
        return BookOpen;
      case 'risk':
        return AlertTriangle;
      default:
        return FileText;
    }
  };
  const getTabTitle = tabId => {
    switch (tabId) {
      case 'ocr':
        return '智能OCR';
      case 'consultation':
        return 'AI问诊';
      case 'knowledge':
        return '知识库';
      case 'risk':
        return '风险评估';
      default:
        return '检测中心';
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">AI智能检测中心</h1>
              <p className="text-blue-100">基于人工智能的健康检测与风险评估</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{parsedReport ? parsedReport.metrics.length : 0}</div>
                <div className="text-blue-100 text-sm">已检测指标</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{selectedRecommendations.length}</div>
                <div className="text-blue-100 text-sm">推荐文献</div>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {quickActions.map(action => {
            const Icon = action.icon;
            return <button key={action.id} onClick={() => handleQuickAction(action.id)} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors">
                  <div className={`${action.color} w-8 h-8 rounded-lg flex items-center justify-center mb-2 mx-auto`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-medium text-white text-sm">{action.title}</h3>
                  <p className="text-blue-100 text-xs">{action.description}</p>
                </button>;
          })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            {['ocr', 'consultation', 'knowledge', 'risk'].map(tabId => {
            const Icon = getTabIcon(tabId);
            return <TabsTrigger key={tabId} value={tabId} className="flex items-center space-x-2">
                <Icon className="w-4 h-4" />
                <span>{getTabTitle(tabId)}</span>
              </TabsTrigger>;
          })}
          </TabsList>

          {/* OCR报告解析 */}
          <TabsContent value="ocr" className="space-y-6">
            <OCRReportParser onReportParsed={handleReportParsed} onImageUpload={handleImageUpload} />
            
            {/* 已解析报告摘要 */}
            {parsedReport && <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    报告解析摘要
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{parsedReport.summary.normalCount}</div>
                      <div className="text-green-800">正常指标</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{parsedReport.summary.abnormalCount}</div>
                      <div className="text-yellow-800">异常指标</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{parsedReport.summary.criticalCount}</div>
                      <div className="text-red-800">危急指标</div>
                    </div>
                  </div>
                </CardContent>
              </Card>}
          </TabsContent>

          {/* AI问诊 */}
          <TabsContent value="consultation" className="space-y-6">
            <AIMedicalConsultation onConsultationComplete={handleConsultationComplete} />
          </TabsContent>

          {/* RAG知识库 */}
          <TabsContent value="knowledge" className="space-y-6">
            <RAGKnowledgeBase symptoms={consultationData.map(m => m.content).filter(Boolean)} diagnosis={parsedReport} onRecommendationSelect={handleRecommendationSelect} />
          </TabsContent>

          {/* 风险评估 */}
          <TabsContent value="risk" className="space-y-6">
            <RiskAssessment healthData={parsedReport ? {
            cholesterol: parsedReport.metrics.find(m => m.name.includes('胆固醇'))?.value || 5.0,
            bloodPressure: {
              systolic: 120,
              diastolic: 80
            },
            heartRate: 72,
            bmi: 23,
            glucose: 5.5,
            triglycerides: parsedReport.metrics.find(m => m.name.includes('甘油三酯'))?.value || 1.5,
            whiteBloodCells: parsedReport.metrics.find(m => m.name.includes('白细胞'))?.value || 6.0
          } : null} symptoms={consultationData.map(m => m.content).filter(Boolean)} onRiskUpdate={handleRiskUpdate} />
          </TabsContent>
        </Tabs>

        {/* 综合状态面板 */}
        {(parsedReport || consultationData.length > 0 || selectedRecommendations.length > 0) && <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                综合健康状态
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 报告状态 */}
                {parsedReport && <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      检测报告
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>报告类型:</span>
                        <span>{parsedReport.reportType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>检测日期:</span>
                        <span>{parsedReport.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>异常指标:</span>
                        <span className="text-red-600">{parsedReport.summary.abnormalCount}项</span>
                      </div>
                    </div>
                  </div>}

                {/* 问诊状态 */}
                {consultationData.length > 0 && <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      AI问诊
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>问诊进度:</span>
                        <span>已完成</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>症状记录:</span>
                        <span>{consultationData.filter(m => m.type === 'user').length}条</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>AI建议:</span>
                        <span>已生成</span>
                      </div>
                    </div>
                  </div>}

                {/* 推荐文献 */}
                {selectedRecommendations.length > 0 && <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      推荐文献
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>文献数量:</span>
                        <span>{selectedRecommendations.length}篇</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>相关度:</span>
                        <span>高</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>开放获取:</span>
                        <span>{selectedRecommendations.filter(r => r.openAccess).length}篇</span>
                      </div>
                    </div>
                  </div>}
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-center space-x-4 mt-6">
                <Button onClick={() => setActiveTab('ocr')}>
                  <Upload className="w-4 h-4 mr-2" />
                  上传新报告
                </Button>
                <Button onClick={() => setActiveTab('consultation')}>
                  <Bot className="w-4 h-4 mr-2" />
                  重新问诊
                </Button>
                <Button onClick={() => setActiveTab('risk')}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  查看风险评估
                </Button>
              </div>
            </CardContent>
          </Card>}
      </div>
    </div>;
}