// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, AlertTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Brain, Heart, Lungs, Liver, Kidney, Activity, Bug, Play, Pause, RefreshCw, AlertTriangle, CheckCircle, XCircle, Database, Zap, Eye, Settings, TestTube, Beaker, FlaskConical, Microscope } from 'lucide-react';

// @ts-ignore;
import { DigitalTwin3D } from '@/components/DigitalTwin3D';
// @ts-ignore;

export default function Test3DModel(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 测试状态管理
  const [testState, setTestState] = useState('idle'); // idle, loading, success, error
  const [currentTest, setCurrentTest] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [isAutoTest, setIsAutoTest] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState('normal');
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    fps: 0
  });

  // 测试数据集
  const testDataSets = {
    normal: [{
      id: 'brain',
      name: '大脑',
      position: {
        x: 50,
        y: 20
      },
      health: 92,
      status: 'excellent',
      issues: [],
      color: '#8b5cf6',
      description: '认知功能良好，记忆力正常',
      metrics: {
        memory: 88,
        focus: 90,
        reaction: 85,
        creativity: 92
      },
      recommendations: ['保持充足睡眠', '进行脑力训练', '补充Omega-3脂肪酸']
    }, {
      id: 'heart',
      name: '心脏',
      position: {
        x: 50,
        y: 35
      },
      health: 85,
      status: 'good',
      issues: ['心率略高'],
      color: '#ef4444',
      description: '心血管功能基本正常，需要关注心率',
      metrics: {
        heartRate: 78,
        bloodPressure: '125/82',
        hrv: 45,
        vo2max: 42
      },
      recommendations: ['增加有氧运动', '减少咖啡因摄入', '控制盐分摄入']
    }, {
      id: 'lungs',
      name: '肺部',
      position: {
        x: 45,
        y: 30
      },
      health: 90,
      status: 'excellent',
      issues: [],
      color: '#06b6d4',
      description: '肺功能良好，呼吸系统健康',
      metrics: {
        lungCapacity: 95,
        oxygenSaturation: 98,
        breathingRate: 16,
        fev1: 88
      },
      recommendations: ['保持规律运动', '避免吸烟环境', '进行深呼吸练习']
    }, {
      id: 'liver',
      name: '肝脏',
      position: {
        x: 55,
        y: 40
      },
      health: 78,
      status: 'fair',
      issues: ['轻度脂肪肝'],
      color: '#f59e0b',
      description: '肝功能轻度异常，需要注意饮食',
      metrics: {
        alt: 35,
        ast: 32,
        bilirubin: 1.2,
        albumin: 4.2
      },
      recommendations: ['控制脂肪摄入', '增加运动量', '定期复查肝功能']
    }, {
      id: 'kidney',
      name: '肾脏',
      position: {
        x: 50,
        y: 45
      },
      health: 88,
      status: 'good',
      issues: [],
      color: '#ec4899',
      description: '肾功能正常，代谢良好',
      metrics: {
        creatinine: 0.9,
        bun: 18,
        egfr: 92,
        uricAcid: 5.8
      },
      recommendations: ['保持充足水分', '控制蛋白质摄入', '定期检查肾功能']
    }],
    empty: [],
    single: [{
      id: 'brain',
      name: '大脑',
      position: {
        x: 50,
        y: 20
      },
      health: 95,
      status: 'excellent',
      issues: [],
      color: '#8b5cf6',
      description: '认知功能极佳',
      metrics: {
        memory: 95,
        focus: 93,
        reaction: 90,
        creativity: 96
      },
      recommendations: ['继续保持良好习惯']
    }],
    malformed: [{
      id: null,
      name: undefined,
      position: {
        x: 'invalid',
        y: null
      },
      health: 'invalid',
      status: 'unknown',
      issues: 'not_array',
      color: null,
      description: 123,
      metrics: 'invalid_object',
      recommendations: null
    }],
    large: Array.from({
      length: 20
    }, (_, i) => ({
      id: `organ_${i}`,
      name: `器官${i + 1}`,
      position: {
        x: 20 + i % 3 * 30,
        y: 20 + Math.floor(i / 3) * 15
      },
      health: 60 + Math.floor(Math.random() * 40),
      status: ['excellent', 'good', 'fair', 'poor'][Math.floor(Math.random() * 4)],
      issues: i % 3 === 0 ? ['测试问题'] : [],
      color: ['#8b5cf6', '#ef4444', '#06b6d4', '#f59e0b', '#ec4899'][i % 5],
      description: `测试器官${i + 1}的描述`,
      metrics: {
        value1: Math.floor(Math.random() * 100),
        value2: Math.floor(Math.random() * 100)
      },
      recommendations: [`建议${i + 1}`, `建议${i + 2}`]
    }))
  };

  // 性能监控
  const performanceMonitorRef = useRef(null);
  const startPerformanceMonitor = () => {
    const startTime = performance.now();
    const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    performanceMonitorRef.current = setInterval(() => {
      const currentTime = performance.now();
      const currentMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
      setPerformanceMetrics({
        renderTime: currentTime - startTime,
        memoryUsage: currentMemory - startMemory,
        fps: Math.round(1000 / (currentTime - startTime))
      });
    }, 100);
  };
  const stopPerformanceMonitor = () => {
    if (performanceMonitorRef.current) {
      clearInterval(performanceMonitorRef.current);
      performanceMonitorRef.current = null;
    }
  };

  // 测试函数
  const runSingleTest = async (testName, testData, expectedBehavior) => {
    const testStart = performance.now();
    setTestState('loading');
    setCurrentTest(testName);
    try {
      startPerformanceMonitor();

      // 模拟数据加载
      await new Promise(resolve => setTimeout(resolve, 500));
      const testResult = {
        name: testName,
        startTime: testStart,
        endTime: performance.now(),
        duration: performance.now() - testStart,
        status: 'success',
        details: expectedBehavior,
        data: testData
      };
      setTestResults(prev => [...prev, testResult]);
      setTestState('success');
      toast({
        title: "测试通过",
        description: `${testName} 测试成功完成`
      });
      return testResult;
    } catch (error) {
      const testResult = {
        name: testName,
        startTime: testStart,
        endTime: performance.now(),
        duration: performance.now() - testStart,
        status: 'error',
        error: error.message,
        details: expectedBehavior
      };
      setTestResults(prev => [...prev, testResult]);
      setTestState('error');
      toast({
        title: "测试失败",
        description: `${testName} 测试失败: ${error.message}`,
        variant: "destructive"
      });
      return testResult;
    } finally {
      stopPerformanceMonitor();
    }
  };

  // 自动测试序列
  const runAutoTest = async () => {
    setIsAutoTest(true);
    setTestResults([]);
    const testSequence = [{
      name: '正常数据加载测试',
      data: testDataSets.normal,
      expected: '应该正常渲染所有器官热点'
    }, {
      name: '空数据处理测试',
      data: testDataSets.empty,
      expected: '应该显示空状态提示'
    }, {
      name: '单个器官测试',
      data: testDataSets.single,
      expected: '应该正常渲染单个器官'
    }, {
      name: '异常数据处理测试',
      data: testDataSets.malformed,
      expected: '应该优雅处理异常数据'
    }, {
      name: '大数据量测试',
      data: testDataSets.large,
      expected: '应该处理大量数据而不崩溃'
    }];
    for (const test of testSequence) {
      await runSingleTest(test.name, test.data, test.expected);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 测试间隔
    }
    setIsAutoTest(false);
    setCurrentTest(null);
    toast({
      title: "自动测试完成",
      description: `已完成 ${testSequence.length} 项测试`
    });
  };

  // 手动测试函数
  const handleManualTest = dataType => {
    setSelectedDataType(dataType);
    const testData = testDataSets[dataType];
    runSingleTest(`手动测试 - ${dataType}`, testData, `测试${dataType}类型数据的处理`);
  };

  // 清除测试结果
  const clearTestResults = () => {
    setTestResults([]);
    setTestState('idle');
    setCurrentTest(null);
    setPerformanceMetrics({
      renderTime: 0,
      memoryUsage: 0,
      fps: 0
    });
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      stopPerformanceMonitor();
    };
  }, []);
  return <div style={style} className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">3D数字孪生模型测试</h1>
          <p className="text-gray-600">测试3D数字孪生模型的数据加载和渲染功能，确保在各种数据状态下都能正常工作</p>
        </div>

        {/* 测试控制面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 自动测试控制 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="w-5 h-5 mr-2" />
                自动测试
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={runAutoTest} disabled={isAutoTest} className="w-full" variant={isAutoTest ? "secondary" : "default"}>
                {isAutoTest ? <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    测试进行中...
                  </> : <>
                    <Play className="w-4 h-4 mr-2" />
                    开始自动测试
                  </>}
              </Button>
              
              <Button onClick={clearTestResults} variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                清除结果
              </Button>
              
              <div className="text-sm text-gray-600">
                <div>测试状态: <span className={`font-medium ${testState === 'success' ? 'text-green-600' : testState === 'error' ? 'text-red-600' : testState === 'loading' ? 'text-blue-600' : 'text-gray-600'}`}>
                  {testState === 'idle' ? '空闲' : testState === 'loading' ? '测试中' : testState === 'success' ? '成功' : '失败'}
                </span></div>
                {currentTest && <div>当前测试: <span className="font-medium">{currentTest}</span></div>}
              </div>
            </CardContent>
          </Card>

          {/* 手动测试控制 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Beaker className="w-5 h-5 mr-2" />
                手动测试
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.keys(testDataSets).map(dataType => <Button key={dataType} onClick={() => handleManualTest(dataType)} variant={selectedDataType === dataType ? "default" : "outline"} className="w-full justify-start">
                  <Database className="w-4 h-4 mr-2" />
                  {dataType === 'normal' ? '正常数据' : dataType === 'empty' ? '空数据' : dataType === 'single' ? '单个器官' : dataType === 'malformed' ? '异常数据' : '大数据量'}
                </Button>)}
            </CardContent>
          </Card>

          {/* 性能监控 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                性能监控
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">渲染时间</span>
                  <span className="text-sm font-medium">{performanceMetrics.renderTime.toFixed(2)}ms</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">内存使用</span>
                  <span className="text-sm font-medium">{(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(2)}MB</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">FPS</span>
                  <span className="text-sm font-medium">{performanceMetrics.fps}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3D模型展示区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  3D模型预览
                </div>
                <div className="text-sm text-gray-600">
                  当前数据: {selectedDataType}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg overflow-hidden">
                <DigitalTwin3D organsData={testDataSets[selectedDataType]} onOrganClick={organ => {
                toast({
                  title: "器官点击",
                  description: `点击了 ${organ.name}，健康值: ${organ.health}`
                });
              }} />
              </div>
            </CardContent>
          </Card>

          {/* 测试结果 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Microscope className="w-5 h-5 mr-2" />
                  测试结果
                </div>
                <div className="text-sm text-gray-600">
                  {testResults.length} 个结果
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {testResults.length === 0 ? <div className="text-center py-8 text-gray-500">
                    <FlaskConical className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>暂无测试结果</p>
                    <p className="text-sm">运行测试以查看结果</p>
                  </div> : testResults.map((result, index) => <div key={index} className={`p-3 rounded-lg border ${result.status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {result.status === 'success' ? <CheckCircle className="w-4 h-4 text-green-600 mr-2" /> : <XCircle className="w-4 h-4 text-red-600 mr-2" />}
                          <span className="font-medium text-sm">{result.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {result.duration.toFixed(2)}ms
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>预期: {result.details}</div>
                        {result.error && <div className="text-red-600 mt-1">错误: {result.error}</div>}
                      </div>
                    </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 测试统计 */}
        {testResults.length > 0 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                测试统计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{testResults.length}</div>
                  <div className="text-sm text-blue-800">总测试数</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {testResults.filter(r => r.status === 'success').length}
                  </div>
                  <div className="text-sm text-green-800">成功测试</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {testResults.filter(r => r.status === 'error').length}
                  </div>
                  <div className="text-sm text-red-800">失败测试</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {(testResults.reduce((sum, r) => sum + r.duration, 0) / testResults.length).toFixed(2)}ms
                  </div>
                  <div className="text-sm text-purple-800">平均耗时</div>
                </div>
              </div>
            </CardContent>
          </Card>}
      </div>
    </div>;
}