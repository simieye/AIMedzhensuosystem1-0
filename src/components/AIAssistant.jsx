// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Send, Bot, User, Settings, History, Database, Brain, Zap, Clock, TrendingUp, Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, RefreshCw, Play, Pause, CheckCircle, AlertCircle, X, ChevronRight, BarChart3, PieChart, Activity, Target, BookOpen, Globe, Cpu, HardDrive, Wifi, FileText, Link, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export function AIAssistant(props) {
  const {
    $w,
    className = ''
  } = props;
  const {
    toast
  } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRPAConfig, setShowRPAConfig] = useState(false);
  const [showConversationHistory, setShowConversationHistory] = useState(false);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [showEvolutionStatus, setShowEvolutionStatus] = useState(false);
  const [rpaTasks, setRpaTasks] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [evolutionMetrics, setEvolutionMetrics] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // RPA任务配置数据
  const mockRpaTasks = [{
    id: 1,
    name: 'PubMed医学文献爬取',
    source: 'https://pubmed.ncbi.nlm.nih.gov',
    type: 'academic_papers',
    frequency: 'daily',
    status: 'active',
    lastRun: new Date('2024-01-15T10:30:00'),
    nextRun: new Date('2024-01-16T10:30:00'),
    successRate: 95.2,
    dataCount: 15420,
    config: {
      keywords: ['anti-aging', 'longevity', 'NMN', 'NAD+'],
      maxResults: 100,
      dateRange: 'last_30_days'
    }
  }, {
    id: 2,
    name: '健康资讯网站监控',
    source: 'https://www.healthline.com',
    type: 'health_news',
    frequency: 'hourly',
    status: 'active',
    lastRun: new Date('2024-01-15T14:15:00'),
    nextRun: new Date('2024-01-15T15:15:00'),
    successRate: 98.7,
    dataCount: 8934,
    config: {
      categories: ['nutrition', 'supplements', 'longevity'],
      language: 'en',
      qualityThreshold: 0.8
    }
  }, {
    id: 3,
    name: '临床试验数据同步',
    source: 'https://clinicaltrials.gov',
    type: 'clinical_trials',
    frequency: 'weekly',
    status: 'paused',
    lastRun: new Date('2024-01-10T09:00:00'),
    nextRun: null,
    successRate: 87.3,
    dataCount: 2341,
    config: {
      conditions: ['aging', 'longevity', 'cellular_health'],
      phases: ['Phase 2', 'Phase 3'],
      locations: ['US', 'EU', 'Asia']
    }
  }];

  // 对话历史数据
  const mockConversationHistory = [{
    id: 1,
    sessionId: 'session_001',
    userId: $w.auth.currentUser?.userId || 'user_001',
    conversationType: 'health_consultation',
    messages: [{
      type: 'user',
      content: '我想了解NMN的抗衰老机制',
      timestamp: new Date('2024-01-15T10:30:00')
    }, {
      type: 'ai',
      content: 'NMN（烟酰胺单核苷酸）是NAD+的前体，通过提升细胞内NAD+水平来激活SIRT1蛋白，从而改善细胞功能、延缓衰老...',
      timestamp: new Date('2024-01-15T10:30:15')
    }],
    qualityScore: 4.5,
    isResolved: true,
    tags: ['NMN', '抗衰老', '机制'],
    createdAt: new Date('2024-01-15T10:30:00')
  }, {
    id: 2,
    sessionId: 'session_002',
    userId: $w.auth.currentUser?.userId || 'user_001',
    conversationType: 'product_recommendation',
    messages: [{
      type: 'user',
      content: '推荐一些适合我年龄的保健品',
      timestamp: new Date('2024-01-14T15:20:00')
    }, {
      type: 'ai',
      content: '基于您的年龄和健康数据，我推荐您考虑以下保健品：1. NMN补充剂 - 提升NAD+水平；2. 辅酶Q10 - 心脏健康...',
      timestamp: new Date('2024-01-14T15:20:12')
    }],
    qualityScore: 4.8,
    isResolved: true,
    tags: ['保健品', '推荐', '个性化'],
    createdAt: new Date('2024-01-14T15:20:00')
  }];

  // 知识库数据
  const mockKnowledgeBase = [{
    id: 1,
    title: 'NMN抗衰老机制详解',
    content: 'NMN（烟酰胺单核苷酸）是NAD+的直接前体，通过补充NMN可以有效提升体内NAD+水平...',
    category: 'anti_aging',
    subcategory: 'supplements',
    source: 'Nature Medicine',
    author: 'Dr. Zhang Wei',
    confidenceScore: 0.95,
    qualityScore: 0.92,
    usageFrequency: 156,
    verificationStatus: 'verified',
    evolutionStage: 'mature',
    lastUpdated: new Date('2024-01-15T08:00:00'),
    keywords: ['NMN', 'NAD+', '抗衰老', 'SIRT1'],
    viewCount: 2341,
    feedbackScore: 4.6
  }, {
    id: 2,
    title: '间歇性禁食的健康益处',
    content: '间歇性禁食是一种饮食模式，通过周期性地在进食和禁食之间切换，带来多种健康益处...',
    category: 'nutrition',
    subcategory: 'diet_methods',
    source: 'Cell Metabolism',
    author: 'Dr. Li Ming',
    confidenceScore: 0.88,
    qualityScore: 0.90,
    usageFrequency: 98,
    verificationStatus: 'verified',
    evolutionStage: 'growing',
    lastUpdated: new Date('2024-01-14T16:30:00'),
    keywords: ['间歇性禁食', '自噬', '代谢健康', '长寿'],
    viewCount: 1876,
    feedbackScore: 4.4
  }, {
    id: 3,
    title: '端粒与衰老的关系',
    content: '端粒是染色体末端的保护性结构，随着细胞分裂逐渐缩短，被认为是衰老的重要标志...',
    category: 'cellular_biology',
    subcategory: 'aging_mechanisms',
    source: 'Science',
    author: 'Dr. Wang Fang',
    confidenceScore: 0.91,
    qualityScore: 0.89,
    usageFrequency: 67,
    verificationStatus: 'pending',
    evolutionStage: 'developing',
    lastUpdated: new Date('2024-01-13T11:45:00'),
    keywords: ['端粒', '衰老', '细胞分裂', '染色体'],
    viewCount: 1234,
    feedbackScore: 4.2
  }];

  // 自进化指标数据
  const mockEvolutionMetrics = {
    totalKnowledge: 1250,
    activeKnowledge: 1180,
    newKnowledgeThisMonth: 45,
    updatedKnowledgeThisMonth: 23,
    averageQualityScore: 0.87,
    averageConfidenceScore: 0.84,
    evolutionRate: 0.12,
    autoUpdateSuccess: 96.5,
    userSatisfactionRate: 4.3,
    knowledgeDistribution: {
      anti_aging: 320,
      nutrition: 280,
      exercise: 200,
      supplements: 180,
      mental_health: 150,
      other: 120
    },
    evolutionStages: {
      developing: 180,
      growing: 420,
      mature: 580,
      optimized: 70
    },
    monthlyGrowth: [{
      month: '8月',
      new: 28,
      updated: 15,
      quality: 0.82
    }, {
      month: '9月',
      new: 32,
      updated: 18,
      quality: 0.84
    }, {
      month: '10月',
      new: 38,
      updated: 20,
      quality: 0.85
    }, {
      month: '11月',
      new: 42,
      updated: 22,
      quality: 0.86
    }, {
      month: '12月',
      new: 45,
      updated: 23,
      quality: 0.87
    }]
  };
  useEffect(() => {
    // 初始化数据
    setRpaTasks(mockRpaTasks);
    setConversationHistory(mockConversationHistory);
    setKnowledgeBase(mockKnowledgeBase);
    setEvolutionMetrics(mockEvolutionMetrics);

    // 加载初始欢迎消息
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        type: 'ai',
        content: '您好！我是您的AI健康助手。我可以帮助您：\n\n🧠 健康咨询和问题解答\n📊 个性化健康建议\n🔍 产品推荐和比较\n📚 健康知识科普\n\n有什么可以帮助您的吗？',
        timestamp: new Date()
      }]);
    }
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // 保存对话记录
      saveConversation(userMessage, aiResponse);
    }, 1500);
  };
  const generateAIResponse = userMessage => {
    const responses = {
      'NMN': 'NMN（烟酰胺单核苷酸）是NAD+的直接前体，研究表明它可以有效提升细胞内NAD+水平，激活SIRT1蛋白，从而改善细胞功能、延缓衰老。建议剂量为每日250-500mg，最好在早晨服用。',
      '抗衰老': '抗衰老是一个综合性的健康管理系统，包括：1）营养补充（如NMN、辅酶Q10）；2）规律运动；3）充足睡眠；4）压力管理；5）定期体检。每个人的情况不同，建议制定个性化的抗衰老方案。',
      '推荐': '基于当前的健康趋势和科学研究，我推荐您关注：1）NMN补充剂 - 提升细胞能量；2）间歇性禁食 - 促进自噬；3）高强度间歇训练 - 改善心肺功能；4）冥想练习 - 降低压力水平。具体方案需要根据您的个人情况定制。',
      'default': '感谢您的提问！基于最新的医学研究和健康数据，我建议您保持均衡的营养摄入、规律的运动习惯和充足的睡眠。如需更个性化的建议，请提供更多关于您健康状况的信息。'
    };
    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.includes(key)) {
        return response;
      }
    }
    return responses.default;
  };
  const saveConversation = (userMessage, aiResponse) => {
    // 这里应该调用数据源API保存对话记录
    console.log('保存对话记录:', {
      userMessage,
      aiResponse,
      userId: $w.auth.currentUser?.userId
    });
  };
  const handleFileUpload = event => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const fileMessage = {
        id: Date.now(),
        type: 'user',
        content: `📎 已上传文件: ${file.name}`,
        timestamp: new Date(),
        attachment: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      };
      setMessages(prev => [...prev, fileMessage]);

      // 模拟AI处理文件
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: `我已收到您上传的文件"${file.name}"。正在分析文件内容，稍后为您提供详细的分析结果和建议。`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 2000);
    }
  };
  const handleRPATaskAction = (taskId, action) => {
    setRpaTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        switch (action) {
          case 'start':
            return {
              ...task,
              status: 'active',
              lastRun: new Date()
            };
          case 'pause':
            return {
              ...task,
              status: 'paused'
            };
          case 'delete':
            return null;
          default:
            return task;
        }
      }
      return task;
    }).filter(Boolean));
    toast({
      title: "操作成功",
      description: `RPA任务${action === 'start' ? '已启动' : action === 'pause' ? '已暂停' : '已删除'}`
    });
  };
  const handleKnowledgeAction = (knowledgeId, action) => {
    setKnowledgeBase(prev => prev.map(knowledge => {
      if (knowledge.id === knowledgeId) {
        switch (action) {
          case 'edit':
            // 这里应该打开编辑界面
            toast({
              title: "编辑知识",
              description: "正在打开编辑界面..."
            });
            return knowledge;
          case 'delete':
            return null;
          case 'verify':
            return {
              ...knowledge,
              verificationStatus: 'verified'
            };
          default:
            return knowledge;
        }
      }
      return knowledge;
    }).filter(Boolean));
    if (action === 'delete') {
      toast({
        title: "删除成功",
        description: "知识条目已删除"
      });
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      case 'stopped':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getVerificationColor = status => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getEvolutionColor = stage => {
    switch (stage) {
      case 'optimized':
        return 'text-purple-600 bg-purple-100';
      case 'mature':
        return 'text-blue-600 bg-blue-100';
      case 'growing':
        return 'text-green-600 bg-green-100';
      case 'developing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  if (!isOpen) {
    return <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>;
  }
  return <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className="bg-white rounded-lg shadow-2xl w-96 max-h-[80vh] flex flex-col">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">AI健康助手</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowRPAConfig(true)} className="text-white hover:bg-white/20">
                <Database className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowConversationHistory(true)} className="text-white hover:bg-white/20">
                <History className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowKnowledgeBase(true)} className="text-white hover:bg-white/20">
                <BookOpen className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowEvolutionStatus(true)} className="text-white hover:bg-white/20">
                <TrendingUp className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 功能标签页 */}
          <div className="flex space-x-1 mt-3">
            {['chat', 'voice', 'image', 'location'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${activeTab === tab ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                {tab === 'chat' && '💬 对话'}
                {tab === 'voice' && '🎤 语音'}
                {tab === 'image' && '🖼️ 图片'}
                {tab === 'location' && '📍 位置'}
              </button>)}
          </div>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
          {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-3 ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  {message.type === 'user' && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    {message.attachment && <div className="mt-2 p-2 bg-white/20 rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-xs">{message.attachment.name}</span>
                        </div>
                      </div>}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          
          {isTyping && <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl p-3">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
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
              </div>
            </div>}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4" />
            </Button>
            <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="输入您的问题..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* RPA配置弹窗 */}
      {showRPAConfig && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                RPA数据爬取配置
              </h3>
              <button onClick={() => setShowRPAConfig(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">爬虫任务列表</h4>
                <Button size="sm" onClick={() => {
              toast({
                title: "创建任务",
                description: "正在打开任务创建界面..."
              });
            }}>
                  <Plus className="w-4 h-4 mr-1" />
                  新建任务
                </Button>
              </div>

              {rpaTasks.map(task => <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-800">{task.name}</h5>
                      <p className="text-sm text-gray-600">{task.source}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status === 'active' ? '运行中' : task.status === 'paused' ? '已暂停' : '已停止'}
                      </span>
                      <div className="flex space-x-1">
                        {task.status === 'active' ? <Button size="sm" variant="outline" onClick={() => handleRPATaskAction(task.id, 'pause')}>
                            <Pause className="w-4 h-4" />
                          </Button> : <Button size="sm" variant="outline" onClick={() => handleRPATaskAction(task.id, 'start')}>
                            <Play className="w-4 h-4" />
                          </Button>}
                        <Button size="sm" variant="outline" onClick={() => handleRPATaskAction(task.id, 'delete')}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">频率:</span>
                      <span className="ml-2 font-medium">{task.frequency}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">成功率:</span>
                      <span className="ml-2 font-medium">{task.successRate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">数据量:</span>
                      <span className="ml-2 font-medium">{task.dataCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">上次运行:</span>
                      <span className="ml-2 font-medium">{task.lastRun.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm text-gray-600 mb-1">配置信息:</div>
                    <div className="bg-gray-50 p-2 rounded text-xs">
                      {Object.entries(task.config).map(([key, value]) => <div key={key}>
                          <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                        </div>)}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>}

      {/* 对话历史弹窗 */}
      {showConversationHistory && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <History className="w-5 h-5 mr-2" />
                对话历史记录
              </h3>
              <button onClick={() => setShowConversationHistory(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">历史对话</h4>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="w-4 h-4 mr-1" />
                    筛选
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    导出
                  </Button>
                </div>
              </div>

              {conversationHistory.map(conversation => <div key={conversation.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-800">{conversation.conversationType === 'health_consultation' ? '健康咨询' : conversation.conversationType === 'product_recommendation' ? '产品推荐' : '其他对话'}</h5>
                      <p className="text-sm text-gray-600">会话ID: {conversation.sessionId}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">{conversation.qualityScore}</span>
                      </div>
                      {conversation.isResolved && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    {conversation.messages.map((message, index) => <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-2 text-sm ${message.type === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {message.content}
                        </div>
                      </div>)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {conversation.tags.map((tag, index) => <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {conversation.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>}

      {/* 知识库管理弹窗 */}
      {showKnowledgeBase && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                知识库管理
              </h3>
              <button onClick={() => setShowKnowledgeBase(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">知识条目</h4>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => {
                toast({
                  title: "添加知识",
                  description: "正在打开知识添加界面..."
                });
              }}>
                    <Plus className="w-4 h-4 mr-1" />
                    添加知识
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    刷新
                  </Button>
                </div>
              </div>

              {knowledgeBase.map(knowledge => <div key={knowledge.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-800">{knowledge.title}</h5>
                      <p className="text-sm text-gray-600">{knowledge.category} / {knowledge.subcategory}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getVerificationColor(knowledge.verificationStatus)}`}>
                        {knowledge.verificationStatus === 'verified' ? '已验证' : knowledge.verificationStatus === 'pending' ? '待验证' : '已拒绝'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getEvolutionColor(knowledge.evolutionStage)}`}>
                        {knowledge.evolutionStage === 'optimized' ? '优化' : knowledge.evolutionStage === 'mature' ? '成熟' : knowledge.evolutionStage === 'growing' ? '成长中' : '开发中'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{knowledge.content}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">置信度:</span>
                      <span className="ml-2 font-medium">{(knowledge.confidenceScore * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">质量评分:</span>
                      <span className="ml-2 font-medium">{(knowledge.qualityScore * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">使用频率:</span>
                      <span className="ml-2 font-medium">{knowledge.usageFrequency}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">查看次数:</span>
                      <span className="ml-2 font-medium">{knowledge.viewCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {knowledge.keywords.slice(0, 3).map((keyword, index) => <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {keyword}
                        </span>)}
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" onClick={() => handleKnowledgeAction(knowledge.id, 'edit')}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleKnowledgeAction(knowledge.id, 'verify')}>
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleKnowledgeAction(knowledge.id, 'delete')}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>}

      {/* 自��化状态弹窗 */}
      {showEvolutionStatus && evolutionMetrics && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                知识库自进化状态
              </h3>
              <button onClick={() => setShowEvolutionStatus(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 总体指标 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{evolutionMetrics.totalKnowledge}</div>
                  <div className="text-sm text-gray-600">总知识条目</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{evolutionMetrics.newKnowledgeThisMonth}</div>
                  <div className="text-sm text-gray-600">本月新增</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{(evolutionMetrics.averageQualityScore * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">平均质量</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{evolutionMetrics.evolutionRate.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">进化速率</div>
                </div>
              </div>

              {/* 月度增长趋势 */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">月度增长趋势</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    {evolutionMetrics.monthlyGrowth.map((month, index) => <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{month.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">新增: {month.new}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">更新: {month.updated}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-sm">质量: {(month.quality * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>

              {/* 知识分布 */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">知识分类分布</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(evolutionMetrics.knowledgeDistribution).map(([category, count]) => <div key={category} className="bg-gray-50 p-3 rounded">
                      <div className="text-lg font-semibold text-gray-800">{count}</div>
                      <div className="text-sm text-gray-600">{category.replace('_', ' ')}</div>
                    </div>)}
                </div>
              </div>

              {/* 进化阶段分布 */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">进化阶段分布</h4>
                <div className="space-y-2">
                  {Object.entries(evolutionMetrics.evolutionStages).map(([stage, count]) => <div key={stage} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${stage === 'optimized' ? 'bg-purple-500' : stage === 'mature' ? 'bg-blue-500' : stage === 'growing' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-sm text-gray-600">{stage === 'optimized' ? '优化' : stage === 'mature' ? '成熟' : stage === 'growing' ? '成长中' : '开发中'}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{count}</span>
                    </div>)}
                </div>
              </div>

              {/* 自动更新状态 */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-green-800">自动更新状态</h5>
                    <p className="text-sm text-green-700">系统正在自动更新知识库，成功率: {evolutionMetrics.autoUpdateSuccess}%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">运行中</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>;
}