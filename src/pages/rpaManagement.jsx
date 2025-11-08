// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Database, Play, Pause, Edit, Trash2, Plus, Search, Filter, Download, Upload, RefreshCw, Settings, Clock, TrendingUp, Activity, Globe, FileText, Flask, Newspaper, CheckCircle, AlertCircle, X, Eye, BarChart3, PieChart, Calendar, Zap, Shield, Cpu, HardDrive, Wifi, ChevronRight, MoreVertical, Square } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';
export default function RPAManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showDataSourceConfig, setShowDataSourceConfig] = useState(false);
  const [showCrawlRules, setShowCrawlRules] = useState(false);
  const [showTaskSchedule, setShowTaskSchedule] = useState(false);
  const [rpaTasks, setRpaTasks] = useState([]);
  const [dataSourceList, setDataSourceList] = useState([]);
  const [crawlMetrics, setCrawlMetrics] = useState(null);
  const [executionLogs, setExecutionLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // RPA任务数据
  const mockRpaTasks = [{
    id: 'RPA_001',
    name: 'PubMed医学文献爬取',
    description: '爬取PubMed数据库中的抗衰老相关医学文献',
    source: 'pubmed.ncbi.nlm.nih.gov',
    sourceType: 'academic_papers',
    status: 'running',
    frequency: 'daily',
    lastRun: new Date('2024-01-15T10:30:00'),
    nextRun: new Date('2024-01-16T10:30:00'),
    successRate: 95.2,
    dataCount: 15420,
    errorCount: 45,
    avgDuration: 1800,
    // 30分钟
    config: {
      keywords: ['anti-aging', 'longevity', 'NMN', 'NAD+', 'senescence'],
      maxResults: 100,
      dateRange: 'last_30_days',
      language: ['en', 'zh'],
      qualityThreshold: 0.8
    },
    schedule: {
      type: 'cron',
      expression: '0 30 10 * * ?',
      timezone: 'Asia/Shanghai'
    },
    monitoring: {
      cpuUsage: 45,
      memoryUsage: 62,
      networkUsage: 78,
      diskUsage: 34
    }
  }, {
    id: 'RPA_002',
    name: '健康资讯网站监控',
    description: '监控主流健康资讯网站的营养补充剂相关内容',
    source: 'healthline.com',
    sourceType: 'health_news',
    status: 'running',
    frequency: 'hourly',
    lastRun: new Date('2024-01-15T14:15:00'),
    nextRun: new Date('2024-01-15T15:15:00'),
    successRate: 98.7,
    dataCount: 8934,
    errorCount: 12,
    avgDuration: 600,
    // 10分钟
    config: {
      categories: ['nutrition', 'supplements', 'longevity', 'vitamins'],
      language: 'en',
      qualityThreshold: 0.85,
      maxPages: 50
    },
    schedule: {
      type: 'interval',
      interval: 3600,
      // 1小时
      timezone: 'Asia/Shanghai'
    },
    monitoring: {
      cpuUsage: 32,
      memoryUsage: 48,
      networkUsage: 65,
      diskUsage: 28
    }
  }, {
    id: 'RPA_003',
    name: '临床试验数据同步',
    description: '同步ClinicalTrials.gov上的抗衰老临床试验数据',
    source: 'clinicaltrials.gov',
    sourceType: 'clinical_trials',
    status: 'paused',
    frequency: 'weekly',
    lastRun: new Date('2024-01-10T09:00:00'),
    nextRun: null,
    successRate: 87.3,
    dataCount: 2341,
    errorCount: 89,
    avgDuration: 3600,
    // 1小时
    config: {
      conditions: ['aging', 'longevity', 'cellular health', 'senescence'],
      phases: ['Phase 2', 'Phase 3', 'Phase 4'],
      locations: ['US', 'EU', 'Asia'],
      recruitmentStatus: 'recruiting'
    },
    schedule: {
      type: 'cron',
      expression: '0 0 9 ? * MON',
      timezone: 'Asia/Shanghai'
    },
    monitoring: {
      cpuUsage: 0,
      memoryUsage: 0,
      networkUsage: 0,
      diskUsage: 0
    }
  }, {
    id: 'RPA_004',
    name: '社交媒体舆情监控',
    description: '监控社交媒体上关于抗衰老的讨论和趋势',
    source: 'twitter.com',
    sourceType: 'social_media',
    status: 'error',
    frequency: 'realtime',
    lastRun: new Date('2024-01-14T16:45:00'),
    nextRun: null,
    successRate: 72.1,
    dataCount: 5678,
    errorCount: 234,
    avgDuration: 300,
    // 5分钟
    config: {
      hashtags: ['antiaging', 'longevity', 'biohacking', 'healthspan'],
      languages: ['en', 'zh', 'es'],
      sentiment: 'positive',
      minFollowers: 1000
    },
    schedule: {
      type: 'realtime',
      timezone: 'Asia/Shanghai'
    },
    monitoring: {
      cpuUsage: 0,
      memoryUsage: 0,
      networkUsage: 0,
      diskUsage: 0
    }
  }];

  // 数据源列表
  const mockDataSources = [{
    id: 'DS_001',
    name: 'PubMed医学数据库',
    url: 'https://pubmed.ncbi.nlm.nih.gov',
    type: 'academic_papers',
    status: 'active',
    reliability: 95,
    updateFrequency: 'daily',
    dataFormat: 'JSON/XML',
    authentication: 'api_key',
    lastSync: new Date('2024-01-15T10:30:00'),
    description: '全球最大的医学文献数据库'
  }, {
    id: 'DS_002',
    name: 'HealthLine健康资讯',
    url: 'https://www.healthline.com',
    type: 'health_news',
    status: 'active',
    reliability: 88,
    updateFrequency: 'hourly',
    dataFormat: 'HTML',
    authentication: 'none',
    lastSync: new Date('2024-01-15T14:15:00'),
    description: '权威健康资讯网站'
  }, {
    id: 'DS_003',
    name: 'ClinicalTrials.gov',
    url: 'https://clinicaltrials.gov',
    type: 'clinical_trials',
    status: 'active',
    reliability: 92,
    updateFrequency: 'weekly',
    dataFormat: 'JSON',
    authentication: 'api_key',
    lastSync: new Date('2024-01-10T09:00:00'),
    description: '美国临床试验注册中心'
  }];

  // 爬取指标数据
  const mockCrawlMetrics = {
    totalTasks: 15,
    runningTasks: 12,
    pausedTasks: 2,
    errorTasks: 1,
    overallSuccessRate: 98.5,
    totalDataCount: 1245678,
    todayDataCount: 15420,
    avgResponseTime: 2.3,
    systemLoad: {
      cpu: 45.6,
      memory: 62.3,
      disk: 34.8,
      network: 78.2
    },
    qualityMetrics: {
      completeness: 92,
      accuracy: 88,
      timeliness: 95,
      consistency: 90
    },
    monthlyTrend: [{
      month: '8月',
      success: 12000,
      failed: 800,
      dataVolume: 45000
    }, {
      month: '9月',
      success: 15000,
      failed: 600,
      dataVolume: 52000
    }, {
      month: '10月',
      success: 18000,
      failed: 400,
      dataVolume: 61000
    }, {
      month: '11月',
      success: 22000,
      failed: 300,
      dataVolume: 73000
    }, {
      month: '12月',
      success: 25000,
      failed: 200,
      dataVolume: 85000
    }, {
      month: '1月',
      success: 28000,
      failed: 150,
      dataVolume: 98000
    }],
    taskDistribution: [{
      name: '学术文献',
      value: 35,
      color: '#3b82f6'
    }, {
      name: '健康资讯',
      value: 28,
      color: '#10b981'
    }, {
      name: '临床试验',
      value: 20,
      color: '#8b5cf6'
    }, {
      name: '社交媒体',
      value: 17,
      color: '#f59e0b'
    }]
  };

  // 执行日志数据
  const mockExecutionLogs = [{
    id: 'LOG_001',
    taskId: 'RPA_001',
    taskName: 'PubMed医学文献爬取',
    status: 'success',
    startTime: new Date('2024-01-15T10:30:00'),
    endTime: new Date('2024-01-15T11:00:00'),
    duration: 1800,
    dataCount: 245,
    errorMessage: null,
    details: {
      pagesCrawled: 50,
      itemsFound: 245,
      itemsProcessed: 245,
      errors: 0
    }
  }, {
    id: 'LOG_002',
    taskId: 'RPA_002',
    taskName: '健康资讯网站监控',
    status: 'success',
    startTime: new Date('2024-01-15T14:15:00'),
    endTime: new Date('2024-01-15T14:25:00'),
    duration: 600,
    dataCount: 89,
    errorMessage: null,
    details: {
      pagesCrawled: 20,
      itemsFound: 89,
      itemsProcessed: 89,
      errors: 0
    }
  }, {
    id: 'LOG_003',
    taskId: 'RPA_004',
    taskName: '社交媒体舆情监控',
    status: 'error',
    startTime: new Date('2024-01-14T16:45:00'),
    endTime: new Date('2024-01-14T16:50:00'),
    duration: 300,
    dataCount: 0,
    errorMessage: 'API rate limit exceeded',
    details: {
      pagesCrawled: 5,
      itemsFound: 0,
      itemsProcessed: 0,
      errors: 1
    }
  }];
  useEffect(() => {
    // 初始化数据
    setRpaTasks(mockRpaTasks);
    setDataSourceList(mockDataSources);
    setCrawlMetrics(mockCrawlMetrics);
    setExecutionLogs(mockExecutionLogs);

    // 模拟实时数据更新
    const interval = setInterval(() => {
      updateRealTimeData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const updateRealTimeData = () => {
    // 模拟实时数据更新
    setRpaTasks(prev => prev.map(task => {
      if (task.status === 'running') {
        return {
          ...task,
          monitoring: {
            cpuUsage: Math.max(10, Math.min(90, task.monitoring.cpuUsage + (Math.random() - 0.5) * 10)),
            memoryUsage: Math.max(10, Math.min(90, task.monitoring.memoryUsage + (Math.random() - 0.5) * 10)),
            networkUsage: Math.max(10, Math.min(90, task.monitoring.networkUsage + (Math.random() - 0.5) * 10)),
            diskUsage: Math.max(10, Math.min(90, task.monitoring.diskUsage + (Math.random() - 0.5) * 5))
          }
        };
      }
      return task;
    }));
  };
  const handleTaskAction = (taskId, action) => {
    setRpaTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        switch (action) {
          case 'start':
            return {
              ...task,
              status: 'running',
              lastRun: new Date(),
              monitoring: {
                cpuUsage: Math.random() * 50 + 20,
                memoryUsage: Math.random() * 40 + 30,
                networkUsage: Math.random() * 60 + 20,
                diskUsage: Math.random() * 30 + 10
              }
            };
          case 'pause':
            return {
              ...task,
              status: 'paused',
              nextRun: null,
              monitoring: {
                cpuUsage: 0,
                memoryUsage: 0,
                networkUsage: 0,
                diskUsage: 0
              }
            };
          case 'stop':
            return {
              ...task,
              status: 'stopped',
              nextRun: null,
              monitoring: {
                cpuUsage: 0,
                memoryUsage: 0,
                networkUsage: 0,
                diskUsage: 0
              }
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
      description: `任务${action === 'start' ? '已启动' : action === 'pause' ? '已暂停' : action === 'stop' ? '已停止' : '已删除'}`
    });
  };
  const handleCreateTask = () => {
    setShowCreateTask(true);
  };
  const handleViewTaskDetail = task => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };
  const getStatusColor = status => {
    switch (status) {
      case 'running':
        return 'text-green-600 bg-green-100';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      case 'stopped':
        return 'text-gray-600 bg-gray-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'running':
        return <Play className="w-4 h-4" />;
      case 'paused':
        return <Pause className="w-4 h-4" />;
      case 'stopped':
        return <Square className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
  const getSourceTypeIcon = type => {
    switch (type) {
      case 'academic_papers':
        return <Newspaper className="w-5 h-5 text-blue-600" />;
      case 'health_news':
        return <Globe className="w-5 h-5 text-green-600" />;
      case 'clinical_trials':
        return <Flask className="w-5 h-5 text-purple-600" />;
      case 'social_media':
        return <Activity className="w-5 h-5 text-orange-600" />;
      default:
        return <Database className="w-5 h-5 text-gray-600" />;
    }
  };
  const filteredTasks = rpaTasks.filter(task => task.name.toLowerCase().includes(searchQuery.toLowerCase()) || task.source.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">RPA智能爬虫管理</h1>
              <p className="text-purple-100">数据源配置 · 爬取规则 · 任务调度 · 实时监控</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{crawlMetrics?.runningTasks || 0}</div>
                <div className="text-purple-100 text-sm">运行中任务</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{crawlMetrics?.overallSuccessRate || 0}%</div>
                <div className="text-purple-100 text-sm">成功率</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{(crawlMetrics?.totalDataCount / 1000000).toFixed(1)}M</div>
                <div className="text-purple-100 text-sm">数据总量</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 功能标签页 */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
          {[{
          id: 'overview',
          label: '任务概览',
          icon: Activity
        }, {
          id: 'datasource',
          label: '数据源配置',
          icon: Database
        }, {
          id: 'rules',
          label: '爬取规则',
          icon: Settings
        }, {
          id: 'schedule',
          label: '任务调度',
          icon: Clock
        }, {
          id: 'monitoring',
          label: '数据监控',
          icon: BarChart3
        }].map(tab => {
          const Icon = tab.icon;
          return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === tab.id ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>;
        })}
        </div>

        {/* 任务概览 */}
        {activeTab === 'overview' && <div className="space-y-6">
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+15%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{crawlMetrics?.runningTasks || 0}</h3>
                  <p className="text-gray-600 text-sm">运行中任务</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    正常运行
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+2.3%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{crawlMetrics?.overallSuccessRate || 0}%</h3>
                  <p className="text-gray-600 text-sm">成功率</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    较上周提升
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Database className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-purple-600 font-medium">+8.7%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{(crawlMetrics?.totalDataCount / 1000000).toFixed(1)}M</h3>
                  <p className="text-gray-600 text-sm">数据总量</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 text-purple-500 mr-2" />
                    持续增长
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-sm text-red-600 font-medium">-3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{crawlMetrics?.errorTasks || 0}</h3>
                  <p className="text-gray-600 text-sm">异常任务</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    需要处理
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 任务列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    爬虫任务列表
                  </CardTitle>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索任务..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <Button onClick={handleCreateTask} className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      新建任务
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">任务名称</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">数据源</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">状态</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">频率</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">成功率</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">数据量</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">上次运行</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map(task => <tr key={task.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {getSourceTypeIcon(task.sourceType)}
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{task.name}</div>
                                <div className="text-sm text-gray-500">ID: {task.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-900">{task.source}</div>
                            <div className="text-sm text-gray-500">{task.sourceType.replace('_', ' ')}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                              {task.status === 'running' ? '运行中' : task.status === 'paused' ? '已暂停' : task.status === 'stopped' ? '已停止' : '错误'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">{task.frequency === 'daily' ? '每日' : task.frequency === 'hourly' ? '每小时' : task.frequency === 'weekly' ? '每周' : task.frequency === 'realtime' ? '实时' : task.frequency}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-900">{task.successRate}%</span>
                              {task.successRate > 90 ? <TrendingUp className="w-4 h-4 text-green-500 ml-2" /> : <TrendingUp className="w-4 h-4 text-red-500 ml-2 transform rotate-180" />}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">{task.dataCount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">{task.lastRun.toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewTaskDetail(task)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              {task.status === 'running' ? <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'pause')}>
                                  <Pause className="w-4 h-4" />
                                </Button> : <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'start')}>
                                  <Play className="w-4 h-4" />
                                </Button>}
                              <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'delete')}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* 数据监控图表 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    爬取趋势
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={crawlMetrics?.monthlyTrend || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="success" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="成功爬取" />
                      <Area type="monotone" dataKey="failed" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="失败爬取" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    任务分布
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie data={crawlMetrics?.taskDistribution || []} cx="50%" cy="50%" labelLine={false} label={({
                    name,
                    percent
                  }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {crawlMetrics?.taskDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>}

        {/* 数据源配置 */}
        {activeTab === 'datasource' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    数据源管理
                  </CardTitle>
                  <Button onClick={() => setShowDataSourceConfig(true)} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    添加数据源
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dataSourceList.map(source => <div key={source.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Globe className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${source.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {source.status === 'active' ? '活跃' : '非活跃'}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{source.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{source.url}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">类型:</span>
                          <span className="font-medium">{source.type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">可靠性:</span>
                          <span className="font-medium">{source.reliability}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">更新频率:</span>
                          <span className="font-medium">{source.updateFrequency}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          测试
                        </Button>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>}

        {/* 爬取规则 */}
        {activeTab === 'rules' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    爬取规则配置
                  </CardTitle>
                  <Button onClick={() => setShowCrawlRules(true)} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    新建规则
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rpaTasks.map(task => <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{task.name}</h4>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          编辑规则
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">爬取配置</h5>
                          <div className="bg-gray-50 p-3 rounded text-sm">
                            {Object.entries(task.config).map(([key, value]) => <div key={key}>
                                <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                              </div>)}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">调度配置</h5>
                          <div className="bg-gray-50 p-3 rounded text-sm">
                            {Object.entries(task.schedule).map(([key, value]) => <div key={key}>
                                <strong>{key}:</strong> {value}
                              </div>)}
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>}

        {/* 任务调度 */}
        {activeTab === 'schedule' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    任务调度管理
                  </CardTitle>
                  <Button onClick={() => setShowTaskSchedule(true)} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    新建调度
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rpaTasks.filter(task => task.status !== 'stopped').map(task => <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(task.status)}
                          <div>
                            <h4 className="font-semibold text-gray-800">{task.name}</h4>
                            <p className="text-sm text-gray-500">{task.frequency}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">下次运行</div>
                          <div className="text-sm font-medium">{task.nextRun ? task.nextRun.toLocaleString() : '未安排'}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">调度类型:</span>
                          <span className="ml-2 font-medium">{task.schedule.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">时区:</span>
                          <span className="ml-2 font-medium">{task.schedule.timezone}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">平均耗时:</span>
                          <span className="ml-2 font-medium">{Math.round(task.avgDuration / 60)}分钟</span>
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>}

        {/* 数据监控 */}
        {activeTab === 'monitoring' && <div className="space-y-6">
            {/* 系统负载 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  系统负载监控
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">CPU使用率</span>
                      <span className="text-sm font-medium">{crawlMetrics?.systemLoad.cpu.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{
                    width: `${crawlMetrics?.systemLoad.cpu}%`
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">内存使用率</span>
                      <span className="text-sm font-medium">{crawlMetrics?.systemLoad.memory.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{
                    width: `${crawlMetrics?.systemLoad.memory}%`
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">磁盘使用率</span>
                      <span className="text-sm font-medium">{crawlMetrics?.systemLoad.disk.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{
                    width: `${crawlMetrics?.systemLoad.disk}%`
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">网络使用率</span>
                      <span className="text-sm font-medium">{crawlMetrics?.systemLoad.network.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{
                    width: `${crawlMetrics?.systemLoad.network}%`
                  }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 数据质量分析 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  数据质量分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(crawlMetrics?.qualityMetrics || {}).map(([metric, value]) => <div key={metric}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{metric === 'completeness' ? '数据完整性' : metric === 'accuracy' ? '数据准确性' : metric === 'timeliness' ? '数据时效性' : '数据一致性'}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${metric === 'completeness' ? 'bg-green-500' : metric === 'accuracy' ? 'bg-blue-500' : metric === 'timeliness' ? 'bg-purple-500' : 'bg-orange-500'} h-2 rounded-full`} style={{
                    width: `${value}%`
                  }}></div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 执行日志 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    执行日志
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    导出日志
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {executionLogs.map(log => <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {log.status === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
                          <div>
                            <h5 className="font-medium text-gray-800">{log.taskName}</h5>
                            <p className="text-sm text-gray-500">{log.startTime.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">耗时: {Math.round(log.duration / 60)}分钟</div>
                          <div className="text-sm text-gray-600">数据量: {log.dataCount}</div>
                        </div>
                      </div>
                      {log.errorMessage && <div className="bg-red-50 p-2 rounded text-sm text-red-700">
                          错误信息: {log.errorMessage}
                        </div>}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
                        <div>
                          <span className="text-gray-600">爬取页面:</span>
                          <span className="ml-2 font-medium">{log.details.pagesCrawled}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">发现项目:</span>
                          <span className="ml-2 font-medium">{log.details.itemsFound}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">处理项目:</span>
                          <span className="ml-2 font-medium">{log.details.itemsProcessed}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">错误次数:</span>
                          <span className="ml-2 font-medium">{log.details.errors}</span>
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>}
      </div>

      {/* 任务详情弹窗 */}
      {showTaskDetail && selectedTask && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">任务详情</h3>
              <button onClick={() => setShowTaskDetail(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">基本信息</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">任务名称:</span>
                    <span className="ml-2 font-medium">{selectedTask.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">任务ID:</span>
                    <span className="ml-2 font-medium">{selectedTask.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">数据源:</span>
                    <span className="ml-2 font-medium">{selectedTask.source}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">状态:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status === 'running' ? '运行中' : selectedTask.status === 'paused' ? '已暂停' : selectedTask.status === 'stopped' ? '已停止' : '错误'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">性能监控</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-blue-600">{selectedTask.monitoring.cpuUsage}%</div>
                    <div className="text-sm text-gray-600">CPU使用率</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-green-600">{selectedTask.monitoring.memoryUsage}%</div>
                    <div className="text-sm text-gray-600">内存使用率</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-purple-600">{selectedTask.monitoring.networkUsage}%</div>
                    <div className="text-sm text-gray-600">网络使用率</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-orange-600">{selectedTask.monitoring.diskUsage}%</div>
                    <div className="text-sm text-gray-600">磁盘使用率</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">爬取配置</h4>
                <div className="bg-gray-50 p-3 rounded">
                  {Object.entries(selectedTask.config).map(([key, value]) => <div key={key} className="text-sm">
                      <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}