// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { RotateCw, ZoomIn, ZoomOut, Move, Maximize2, Grid3x3, User, Activity, Heart, Brain, Eye, Settings, Info, Play, Pause, RotateCcw, Dna, Microscope } from 'lucide-react';

export function EnhancedDigitalTwin3D({
  healthData,
  onBodyPartClick,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPart, setSelectedPart] = useState(null);
  const [viewMode, setViewMode] = useState('front');
  const [isRotating, setIsRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [geneDataVisible, setGeneDataVisible] = useState(false);
  const [bodyParts, setBodyParts] = useState([
  // 头部
  {
    id: 'head',
    name: '头部',
    x: 50,
    y: 10,
    health: 92,
    status: 'excellent',
    issues: [],
    color: '#10b981',
    geneExpression: {
      telomereLength: 8.5,
      mitochondrialDNA: 95,
      neurogenesis: 88,
      cognitiveGenes: 91,
      inflammationMarkers: 12,
      oxidativeStress: 15,
      keyGenes: ['FOXO3', 'BDNF', 'APOE', 'SIRT1'],
      riskFactors: ['轻度认知功能下降风险'],
      recommendations: ['增加Omega-3摄入', '进行认知训练', '保证充足睡眠']
    }
  },
  // 心脏
  {
    id: 'heart',
    name: '心脏',
    x: 50,
    y: 35,
    health: 85,
    status: 'good',
    issues: ['心率略高'],
    color: '#ef4444',
    geneExpression: {
      telomereLength: 7.8,
      mitochondrialDNA: 82,
      cardiomyocyteHealth: 85,
      vascularHealth: 78,
      inflammationMarkers: 25,
      oxidativeStress: 28,
      keyGenes: ['NOS3', 'ACE', 'MTHFR', 'eNOS'],
      riskFactors: ['心血管疾病中等风险', '血压偏高'],
      recommendations: ['有氧运动训练', '控制钠盐摄入', '补充辅酶Q10']
    }
  },
  // 肝脏
  {
    id: 'liver',
    name: '肝脏',
    x: 45,
    y: 40,
    health: 78,
    status: 'fair',
    issues: ['轻度脂肪肝'],
    color: '#f59e0b',
    geneExpression: {
      telomereLength: 7.2,
      mitochondrialDNA: 75,
      detoxificationGenes: 68,
      lipidMetabolism: 72,
      inflammationMarkers: 35,
      oxidativeStress: 42,
      keyGenes: ['PNPLA3', 'TM6SF2', 'HSD17B13', 'GCKR'],
      riskFactors: ['脂肪肝风险', '代谢综合征倾向'],
      recommendations: ['减少酒精摄入', '控制体重', '增加膳食纤维']
    }
  },
  // 肺部
  {
    id: 'lungs',
    name: '肺部',
    x: 50,
    y: 30,
    health: 90,
    status: 'excellent',
    issues: [],
    color: '#06b6d4',
    geneExpression: {
      telomereLength: 8.2,
      mitochondrialDNA: 88,
      lungCapacity: 92,
      immuneResponse: 85,
      inflammationMarkers: 18,
      oxidativeStress: 20,
      keyGenes: ['GSTP1', 'MMP9', 'IL6', 'TNF'],
      riskFactors: ['轻微呼吸道敏感'],
      recommendations: ['避免空气污染', '进行呼吸训练', '戒烟']
    }
  },
  // 肾脏
  {
    id: 'kidneys',
    name: '肾脏',
    x: 50,
    y: 45,
    health: 88,
    status: 'good',
    issues: [],
    color: '#ec4899',
    geneExpression: {
      telomereLength: 7.9,
      mitochondrialDNA: 84,
      filtrationRate: 86,
      electrolyteBalance: 90,
      inflammationMarkers: 20,
      oxidativeStress: 22,
      keyGenes: ['UMOD', 'APOL1', 'PKD1', 'SLC12A1'],
      riskFactors: ['轻微肾功能下降趋势'],
      recommendations: ['充足水分摄入', '控制蛋白质摄入', '定期监测肾功能']
    }
  }]);
  const viewModes = [{
    id: 'front',
    name: '正面',
    icon: User
  }, {
    id: 'back',
    name: '背面',
    icon: RotateCcw
  }, {
    id: 'side',
    name: '侧面',
    icon: Move
  }, {
    id: '360',
    name: '360°',
    icon: RotateCw
  }];
  useEffect(() => {
    // 模拟3D模型加载
    const timer = setTimeout(() => {
      setIsLoading(false);
      initializeCanvas();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        setViewMode(prev => {
          const modes = ['front', 'side', 'back', 'side'];
          const currentIndex = modes.indexOf(prev === '360' ? 'front' : prev);
          return modes[(currentIndex + 1) % modes.length];
        });
      }, 2000 / animationSpeed);
      return () => clearInterval(interval);
    }
  }, [isRotating, animationSpeed]);
  const initializeCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      draw3DModel(ctx);
    }
  };
  const draw3DModel = ctx => {
    if (!ctx) return;
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 绘制背景
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 绘制网格
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
    }

    // 绘制人体轮廓
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // 头部
    ctx.arc(width / 2, height * 0.15, 20, 0, Math.PI * 2);
    // 身体
    ctx.moveTo(width / 2, height * 0.15 + 20);
    ctx.lineTo(width / 2, height * 0.4);
    ctx.lineTo(width / 2 - 30, height * 0.6);
    ctx.moveTo(width / 2, height * 0.4);
    ctx.lineTo(width / 2 + 30, height * 0.6);
    // 手臂
    ctx.moveTo(width / 2 - 10, height * 0.2);
    ctx.lineTo(width / 2 - 40, height * 0.4);
    ctx.moveTo(width / 2 + 10, height * 0.2);
    ctx.lineTo(width / 2 + 40, height * 0.4);
    // 腿部
    ctx.moveTo(width / 2 - 10, height * 0.6);
    ctx.lineTo(width / 2 - 15, height * 0.9);
    ctx.moveTo(width / 2 + 10, height * 0.6);
    ctx.lineTo(width / 2 + 15, height * 0.9);
    ctx.stroke();

    // 绘制健康热点
    bodyParts.forEach(part => {
      const x = width * (part.x / 100);
      const y = height * (part.y / 100);

      // 绘制热点圆圈
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = part.color + '40';
      ctx.fill();
      ctx.strokeStyle = part.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制健康数值
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(part.health + '%', x, y - 12);

      // 如果被选中，绘制高亮
      if (selectedPart?.id === part.id) {
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  };
  const handleCanvasClick = event => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 100;
    const y = (event.clientY - rect.top) / rect.height * 100;

    // 查找点击的身体部位
    const clickedPart = bodyParts.find(part => {
      const distance = Math.sqrt(Math.pow(x - part.x, 2) + Math.pow(y - part.y, 2));
      return distance < 10;
    });
    if (clickedPart) {
      setSelectedPart(clickedPart);
      setGeneDataVisible(true);
      onBodyPartClick?.(clickedPart);
      toast({
        title: "器官详情",
        description: `已选中${clickedPart.name}，正在加载基因表达数据...`
      });
    }
  };
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };
  const handleReset = () => {
    setZoomLevel(1);
    setViewMode('front');
    setIsRotating(false);
    setSelectedPart(null);
    setGeneDataVisible(false);
  };
  const getStatusColor = status => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'excellent':
        return '优秀';
      case 'good':
        return '良好';
      case 'fair':
        return '一般';
      case 'poor':
        return '较差';
      default:
        return '未知';
    }
  };
  const getGeneValueColor = (value, type) => {
    if (type === 'risk') {
      if (value < 20) return 'text-green-600';
      if (value < 40) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value >= 80) return 'text-green-600';
      if (value >= 60) return 'text-yellow-600';
      return 'text-red-600';
    }
  };
  return <div className={`bg-slate-900 rounded-lg overflow-hidden ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Microscope className="w-5 h-5 mr-2 text-blue-600" />
            基因增强数字孪生
          </div>
          <Badge className="bg-blue-600">
            {selectedPart ? selectedPart.name : '整体视图'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 控制面板 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* 视图模式切换 */}
            <div className="flex items-center bg-slate-700 rounded-lg p-1">
              {viewModes.map(mode => {
              const Icon = mode.icon;
              return <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`p-2 rounded ${viewMode === mode.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`} title={mode.name}>
                  <Icon className="w-4 h-4" />
                </button>;
            })}
            </div>

            {/* 缩放控制 */}
            <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
              <button onClick={handleZoomOut} className="p-2 text-gray-400 hover:text-white">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-white text-sm px-2">{Math.round(zoomLevel * 100)}%</span>
              <button onClick={handleZoomIn} className="p-2 text-gray-400 hover:text-white">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* 其他控制 */}
            <button onClick={() => setShowGrid(!showGrid)} className={`p-2 rounded ${showGrid ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-400 hover:text-white'}`} title="显示网格">
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button onClick={() => setIsRotating(!isRotating)} className={`p-2 rounded ${isRotating ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-400 hover:text-white'}`} title="自动旋转">
              {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button onClick={handleReset} className="p-2 bg-slate-700 text-gray-400 hover:text-white rounded" title="重置视图">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D模型展示区 */}
        <div className="relative">
          {isLoading ? <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-400">正在加载基因增强数字孪生...</p>
              </div>
            </div> : <div className="relative">
              <canvas ref={canvasRef} width={600} height={400} onClick={handleCanvasClick} className="w-full cursor-crosshair" style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center'
          }} />
              
              {/* 操作提示 */}
              <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3">
                <div className="space-y-2 text-gray-300 text-xs">
                  <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4" />
                    <span>点击器官查看基因表达数据</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dna className="w-4 h-4" />
                    <span>支持基因风险评估</span>
                  </div>
                </div>
              </div>
            </div>}
        </div>

        {/* 基因表达数据面板 */}
        {geneDataVisible && selectedPart && <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold flex items-center">
                <Dna className="w-5 h-5 mr-2 text-blue-600" />
                {selectedPart.name}基因表达数据
              </h4>
              <button onClick={() => setGeneDataVisible(false)} className="text-gray-400 hover:text-white">
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 基础指标 */}
              <div className="space-y-4">
                <h5 className="text-blue-400 font-medium">基础基因指标</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">端粒长度</span>
                    <span className={`font-semibold ${getGeneValueColor(selectedPart.geneExpression.telomereLength)}`}>
                      {selectedPart.geneExpression.telomereLength} kb
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">线粒体DNA完整性</span>
                    <span className={`font-semibold ${getGeneValueColor(selectedPart.geneExpression.mitochondrialDNA)}`}>
                      {selectedPart.geneExpression.mitochondrialDNA}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">炎症标志物</span>
                    <span className={`font-semibold ${getGeneValueColor(selectedPart.geneExpression.inflammationMarkers, 'risk')}`}>
                      {selectedPart.geneExpression.inflammationMarkers} pg/mL
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">氧化应激水平</span>
                    <span className={`font-semibold ${getGeneValueColor(selectedPart.geneExpression.oxidativeStress, 'risk')}`}>
                      {selectedPart.geneExpression.oxidativeStress} μmol/L
                    </span>
                  </div>
                </div>
              </div>

              {/* 关键基因 */}
              <div className="space-y-4">
                <h5 className="text-blue-400 font-medium">关键基因表达</h5>
                <div className="space-y-2">
                  {selectedPart.geneExpression.keyGenes.map((gene, index) => <div key={index} className="flex items-center justify-between p-2 bg-slate-700 rounded">
                      <span className="text-white font-mono text-sm">{gene}</span>
                      <span className="text-green-400 text-sm">正常表达</span>
                    </div>)}
                </div>
              </div>
            </div>

            {/* 风险因素和建议 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-900/30 rounded-lg p-4">
                <h5 className="text-red-400 font-medium mb-3">风险因素</h5>
                <ul className="space-y-2">
                  {selectedPart.geneExpression.riskFactors.map((risk, index) => <li key={index} className="flex items-start space-x-2 text-red-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>{risk}</span>
                    </li>)}
                </ul>
              </div>
              
              <div className="bg-green-900/30 rounded-lg p-4">
                <h5 className="text-green-400 font-medium mb-3">基因优化建议</h5>
                <ul className="space-y-2">
                  {selectedPart.geneExpression.recommendations.map((rec, index) => <li key={index} className="flex items-start space-x-2 text-green-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>{rec}</span>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>}
      </CardContent>
    </div>;
}