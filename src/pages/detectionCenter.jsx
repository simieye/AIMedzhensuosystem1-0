// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, Camera, FileText, Brain, Stethoscope, BookOpen, Activity, CheckCircle, AlertCircle, Clock, TrendingUp, Zap, MessageCircle, X, ChevronRight, Download, Share2, Filter, Search, Eye, Heart, Pulse } from 'lucide-react';

// @ts-ignore;
import { AIAssistant } from '@/components/AIAssistant';
// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export default function DetectionCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('upload'); // upload, consultation, knowledge, results
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResults, setOcrResults] = useState([]);
  const [consultationMessages, setConsultationMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [knowledgeRecommendations, setKnowledgeRecommendations] = useState([]);
  const [digitalTwinData, setDigitalTwinData] = useState([]);
  const fileInputRef = useRef(null);
  const consultationEndRef = useRef(null);

  // AI问诊问题库
  const consultationQuestions = [{
    id: 1,
    question: "请问您最近有什么身体不适的症状吗？",
    type: "symptoms",
    options: ["无明显不适", "疲劳乏力", "头晕头痛", "胸闷心悸", "消化不良", "其他"]
  }, {
    id: 2,
    question: "您的睡眠质量如何？",
    type: "sleep",
    options: ["很好", "一般", "较差", "严重失眠"]
  }, {
    id: 3,
    question: "您的饮食习惯是怎样的？",
    type: "diet",
    options: ["均衡健康", "偏食", "油腻重口", "素食为主", "其他"]
  }, {
    id: 4,
    question: "您是否有定期运动的习惯？",
    type: "exercise",
    options: ["每天运动", "每周3-4次", "偶尔运动", "很少运动"]
  }, {
    id: 5,
    question: "您的压力水平如何？",
    type: "stress",
    options: ["轻松", "轻度压力", "中度压力", "高度压力"]
  }];

  // 模拟PubMed知识库
  const pubmedKnowledge = [{
    id: 1,
    title: "NMN在抗衰老中的作用机制研究",
    authors: "Zhang et al.",
    journal: "Nature Medicine",
    year: 2023,
    doi: "10.1038/s41591-023-02345-6",
    abstract: "本研究发现NMN通过激活SIRT1通路，显著改善细胞功能，延缓衰老进程...",
    relevance: 95,
    category: "抗衰老"
  }, {
    id: 2,
    title: "心率变异性与心血管健康的关系",
    authors: "Wang et al.",
    journal: "Journal of Cardiology",
    year: 2023,
    doi: "10.1016/j.jcard.2023.08.012",
    abstract: "HRV作为自主神经系统功能的重要指标，与心血管疾病风险密切相关...",
    relevance: 88,
    category: "心血管"
  }, {
    id: 3,
    title: "肠道菌群与免疫系统的相互作用",
    authors: "Li et al.",
    journal: "Cell",
    year: 2023,
    doi: "10.1016/j.cell.2023.07.021",
    abstract: "最新研究揭示了肠道菌群在调节免疫反应中的关键作用...",
    relevance: 82,
    category: "免疫"
  }];
  useEffect(() => {
    // 初始化AI问诊
    if (consultationMessages.length === 0) {
      startConsultation();
    }
  }, []);
  useEffect(() => {
    // 自动滚动到对话底部
    consultationEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [consultationMessages]);
  const startConsultation = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'assistant',
      content: '您好！我是您的AI健康助手。为了更好地为您分析检测结果，我需要了解一些基本情况。请问您最近有什么身体不适的症状吗？',
      timestamp: new Date(),
      isQuestion: true,
      questionData: consultationQuestions[0]
    };
    setConsultationMessages([welcomeMessage]);
    setCurrentQuestion(consultationQuestions[0]);
  };
  const handleFileUpload = event => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadTime: new Date(),
      status: 'uploading'
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);

    // 模拟上传过程
    newFiles.forEach((fileObj, index) => {
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => f.id === fileObj.id ? {
          ...f,
          status: 'processing'
        } : f));

        // 模拟OCR处理
        setTimeout(() => {
          processOCR(fileObj);
        }, 2000);
      }, index * 500);
    });
  };
  const processOCR = fileObj => {
    setIsProcessing(true);
    toast({
      title: "OCR识别中",
      description: `正在识别 ${fileObj.name}...`
    });

    // 模拟OCR处理结果
    setTimeout(() => {
      const ocrResult = {
        id: fileObj.id,
        fileName: fileObj.name,
        extractedText: generateMockOCRText(fileObj.name),
        keyMetrics: generateMockMetrics(fileObj.name),
        confidence: 0.92,
        processingTime: '2.3s'
      };
      setOcrResults(prev => [...prev, ocrResult]);
      setUploadedFiles(prev => prev.map(f => f.id === fileObj.id ? {
        ...f,
        status: 'completed'
      } : f));

      // 自动添加到数字孪生监控
      addToDigitalTwin(ocrResult);

      // 生成知识推荐
      generateKnowledgeRecommendations(ocrResult);
      setIsProcessing(false);
      toast({
        title: "OCR识别完成",
        description: `${fileObj.name} 识别成功，置信度 ${ocrResult.confidence * 100}%`
      });
    }, 3000);
  };
  const generateMockOCRText = fileName => {
    if (fileName.includes('血常规')) {
      return `血常规检查报告
白细胞计数: 6.8×10^9/L (参考值: 4.0-10.0)
红细胞计数: 4.5×10^12/L (参考值: 3.5-5.5)
血红蛋白: 138g/L (参考值: 110-160)
血小板计数: 245×10^9/L (参考值: 100-300)
淋巴细胞比例: 28.5% (参考值: 20-40)
中性粒细胞比例: 65.2% (参考值: 50-70)`;
    } else if (fileName.includes('生化')) {
      return `生化全项检查报告
总蛋白: 72g/L (参考值: 65-85)
白蛋白: 45g/L (参考值: 35-55)
谷丙转氨酶: 25U/L (参考值: 0-40)
谷草转氨酶: 28U/L (参考值: 0-40)
尿素氮: 5.2mmol/L (参考值: 2.9-8.2)
肌酐: 78μmol/L (参考值: 45-84)
总胆固醇: 4.8mmol/L (参考值: <5.2)
甘油三酯: 1.2mmol/L (参考值: <1.7)`;
    } else {
      return `健康检查报告
各项指标基本正常范围
建议定期复查
保持健康生活方式`;
    }
  };
  const generateMockMetrics = fileName => {
    if (fileName.includes('血常规')) {
      return [{
        name: '白细胞',
        value: 6.8,
        unit: '×10^9/L',
        status: 'normal',
        range: '4.0-10.0'
      }, {
        name: '红细胞',
        value: 4.5,
        unit: '×10^12/L',
        status: 'normal',
        range: '3.5-5.5'
      }, {
        name: '血红蛋白',
        value: 138,
        unit: 'g/L',
        status: 'normal',
        range: '110-160'
      }, {
        name: '血小板',
        value: 245,
        unit: '×10^9/L',
        status: 'normal',
        range: '100-300'
      }];
    } else if (fileName.includes('生化')) {
      return [{
        name: '谷丙转氨酶',
        value: 25,
        unit: 'U/L',
        status: 'normal',
        range: '0-40'
      }, {
        name: '谷草转氨酶',
        value: 28,
        unit: 'U/L',
        status: 'normal',
        range: '0-40'
      }, {
        name: '总胆固醇',
        value: 4.8,
        unit: 'mmol/L',
        status: 'normal',
        range: '<5.2'
      }, {
        name: '甘油三酯',
        value: 1.2,
        unit: 'mmol/L',
        status: 'normal',
        range: '<1.7'
      }];
    } else {
      return [{
        name: '整体健康',
        value: 92,
        unit: '分',
        status: 'excellent',
        range: '0-100'
      }];
    }
  };
  const addToDigitalTwin = ocrResult => {
    const digitalTwinEntry = {
      id: Date.now(),
      reportId: ocrResult.id,
      fileName: ocrResult.fileName,
      timestamp: new Date(),
      metrics: ocrResult.keyMetrics,
      overallScore: calculateOverallScore(ocrResult.keyMetrics),
      anomalies: detectAnomalies(ocrResult.keyMetrics),
      recommendations: generateRecommendations(ocrResult.keyMetrics)
    };
    setDigitalTwinData(prev => [...prev, digitalTwinEntry]);
    toast({
      title: "数字孪生更新",
      description: "检测结果已自动加入数字孪生监控系统"
    });
  };
  const calculateOverallScore = metrics => {
    if (!metrics || metrics.length === 0) return 85;
    const normalCount = metrics.filter(m => m.status === 'normal').length;
    return Math.round(normalCount / metrics.length * 100);
  };
  const detectAnomalies = metrics => {
    return metrics.filter(m => m.status !== 'normal').map(m => ({
      metric: m.name,
      value: m.value,
      range: m.range,
      severity: m.status === 'high' ? 'warning' : 'info'
    }));
  };
  const generateRecommendations = metrics => {
    const recommendations = [];
    const anomalies = detectAnomalies(metrics);
    if (anomalies.length === 0) {
      recommendations.push("各项指标正常，继续保持健康的生活方式");
    } else {
      recommendations.push("建议关注异常指标，定期复查");
      recommendations.push("如有不适，请及时就医咨询");
    }
    return recommendations;
  };
  const generateKnowledgeRecommendations = ocrResult => {
    // 基于OCR结果生成相关知识推荐
    const relevantKnowledge = pubmedKnowledge.filter(knowledge => {
      const text = ocrResult.extractedText.toLowerCase();
      return knowledge.category === '抗衰老' || text.includes('肝') && knowledge.category === '心血管' || text.includes('免疫') && knowledge.category === '免疫';
    });
    setKnowledgeRecommendations(relevantKnowledge);
  };
  const handleConsultationResponse = response => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: response,
      timestamp: new Date()
    };
    setConsultationMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const nextQuestionIndex = consultationMessages.findIndex(m => m.isQuestion) + 1;
      let assistantMessage;
      if (nextQuestionIndex < consultationQuestions.length) {
        const nextQuestion = consultationQuestions[nextQuestionIndex];
        assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: `感谢您的回答。${nextQuestion.question}`,
          timestamp: new Date(),
          isQuestion: true,
          questionData: nextQuestion
        };
        setCurrentQuestion(nextQuestion);
      } else {
        assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: '感谢您的配合！基于您的回答，我建议您上传相关的检测报告，我将为您提供更详细的分析和建议。',
          timestamp: new Date(),
          isComplete: true
        };
        setCurrentQuestion(null);
      }
      setConsultationMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'processing':
        return 'text-blue-600';
      case 'uploading':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Brain className="w-4 h-4 animate-pulse" />;
      case 'uploading':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">AI智能检测中心</h1>
              <p className="text-blue-100">智能OCR识别 · AI问诊 · 权威知识库</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{ocrResults.length}</div>
                <div className="text-blue-100 text-sm">已处理报告</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{digitalTwinData.length}</div>
                <div className="text-blue-100 text-sm">数字孪生数据</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 功能标签页 */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
          {[{
          id: 'upload',
          label: '报告上传',
          icon: Upload
        }, {
          id: 'consultation',
          label: 'AI问诊',
          icon: MessageCircle
        }, {
          id: 'knowledge',
          label: '知识库',
          icon: BookOpen
        }, {
          id: 'results',
          label: '检测结果',
          icon: Activity
        }].map(tab => {
          const Icon = tab.icon;
          return <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>;
        })}
        </div>

        {/* 报告上传区域 */}
        {activeTab === 'upload' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  智能OCR报告识别
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <div className="mb-4">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">上传检测报告</h3>
                    <p className="text-gray-500 text-sm mb-4">支持PDF、JPG、PNG格式，AI将自动识别并解析报告内容</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
                      <Upload className="w-4 h-4 mr-2" />
                      选择文件
                    </Button>
                    <Button variant="outline" onClick={() => {
                  toast({
                    title: "拍照功能",
                    description: "正在启动相机..."
                  });
                }}>
                      <Camera className="w-4 h-4 mr-2" />
                      拍照上传
                    </Button>
                  </div>
                  
                  <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" />
                </div>

                {/* 上传文件列表 */}
                {uploadedFiles.length > 0 && <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">上传列表</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map(file => <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(file.status)}
                            <div>
                              <p className="font-medium text-gray-800">{file.name}</p>
                              <p className="text-sm text-gray-500">{formatFileSize(file.size)} · {file.uploadTime.toLocaleTimeString()}</p>
                            </div>
                          </div>
                          <div className={`text-sm font-medium ${getStatusColor(file.status)}`}>
                            {file.status === 'uploading' && '上传中...'}
                            {file.status === 'processing' && 'OCR识别中...'}
                            {file.status === 'completed' && '已完成'}
                          </div>
                        </div>)}
                    </div>
                  </div>}
              </CardContent>
            </Card>

            {/* OCR识别结果 */}
            {ocrResults.length > 0 && <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    OCR识别结果
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ocrResults.map(result => <div key={result.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{result.fileName}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>置信度: {(result.confidence * 100).toFixed(1)}%</span>
                            <span>处理时间: {result.processingTime}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">关键指标</h5>
                            <div className="space-y-1">
                              {result.keyMetrics.map((metric, index) => <div key={index} className="flex justify-between text-sm">
                                  <span className="text-gray-600">{metric.name}:</span>
                                  <span className={`font-medium ${metric.status === 'normal' ? 'text-green-600' : 'text-orange-600'}`}>
                                    {metric.value} {metric.unit}
                                  </span>
                                </div>)}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">识别文本</h5>
                            <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 max-h-32 overflow-y-auto">
                              <pre className="whitespace-pre-wrap">{result.extractedText}</pre>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            查看详情
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            下载报告
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4 mr-1" />
                            分享
                          </Button>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}
          </div>}

        {/* AI问诊 */}
        {activeTab === 'consultation' && <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="w-5 h-5 mr-2" />
                AI智能问诊
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {consultationMessages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                      
                      {message.isQuestion && message.questionData && <div className="mt-3 space-y-2">
                          {message.questionData.options.map((option, index) => <button key={index} onClick={() => handleConsultationResponse(option)} className="w-full text-left p-2 bg-white rounded border border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-sm text-gray-700 transition-colors">
                              {option}
                            </button>)}
                        </div>}
                    </div>
                  </div>)}
                
                {isTyping && <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                    animationDelay: '0.1s'
                  }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                    animationDelay: '0.2s'
                  }}></div>
                      </div>
                    </div>
                  </div>}
                
                <div ref={consultationEndRef} />
              </div>
              
              {currentQuestion && <div className="text-center text-sm text-gray-500">
                  问题 {consultationQuestions.findIndex(q => q.id === currentQuestion.id) + 1} / {consultationQuestions.length}
                </div>}
            </CardContent>
          </Card>}

        {/* 知识库推荐 */}
        {activeTab === 'knowledge' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    权威文献推荐
                  </div>
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="搜索文献..." className="px-3 py-1 border rounded-lg text-sm" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeRecommendations.length > 0 ? knowledgeRecommendations.map(knowledge => <div key={knowledge.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 flex-1">{knowledge.title}</h4>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{knowledge.category}</span>
                          <span className="text-sm text-gray-600">相关度: {knowledge.relevance}%</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">{knowledge.authors}</span> · {knowledge.journal} · {knowledge.year}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{knowledge.abstract}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          DOI: {knowledge.doi}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            查看全文
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            下载PDF
                          </Button>
                        </div>
                      </div>
                    </div>) : <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">上传检测报告后，AI将为您推荐相关的权威文献</p>
                    </div>}
                </div>
              </CardContent>
            </Card>

            {/* PubMed数据库统计 */}
            <Card>
              <CardHeader>
                <CardTitle>知识库统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.8M+</div>
                    <div className="text-sm text-gray-600">PubMed文献</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">156K</div>
                    <div className="text-sm text-gray-600">抗衰老研究</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">89K</div>
                    <div className="text-sm text-gray-600">心血管疾病</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">45K</div>
                    <div className="text-sm text-gray-600">免疫学</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}

        {/* 检测结果与数字孪生 */}
        {activeTab === 'results' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  数字孪生监控数据
                </CardTitle>
              </CardHeader>
              <CardContent>
                {digitalTwinData.length > 0 ? <div className="space-y-4">
                    {digitalTwinData.map(data => <div key={data.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{data.fileName}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{data.timestamp.toLocaleDateString()}</span>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${data.overallScore >= 90 ? 'bg-green-100 text-green-800' : data.overallScore >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              评分: {data.overallScore}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">健康指标</h5>
                            <div className="space-y-1">
                              {data.metrics.slice(0, 3).map((metric, index) => <div key={index} className="flex justify-between text-sm">
                                  <span className="text-gray-600">{metric.name}:</span>
                                  <span className={`font-medium ${metric.status === 'normal' ? 'text-green-600' : 'text-orange-600'}`}>
                                    {metric.value} {metric.unit}
                                  </span>
                                </div>)}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">异常检测</h5>
                            {data.anomalies.length > 0 ? <div className="space-y-1">
                                {data.anomalies.map((anomaly, index) => <div key={index} className="text-sm text-orange-600">
                                    • {anomaly.metric}: {anomaly.value}
                                  </div>)}
                              </div> : <div className="text-sm text-green-600">无异常</div>}
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">AI建议</h5>
                            <div className="space-y-1">
                              {data.recommendations.slice(0, 2).map((rec, index) => <div key={index} className="text-sm text-gray-600">
                                  • {rec}
                                </div>)}
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div> : <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">暂无数字孪生数据，请先上传检测报告</p>
                  </div>}
              </CardContent>
            </Card>

            {/* 健康趋势图表 */}
            {digitalTwinData.length > 0 && <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    健康趋势分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={digitalTwinData.map(data => ({
                date: data.timestamp.toLocaleDateString(),
                score: data.overallScore
              }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>}
          </div>}
      </div>

      {/* AI客服组件 */}
      <AIAssistant />
    </div>;
}