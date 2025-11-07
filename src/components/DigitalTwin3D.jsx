// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { RotateCw, ZoomIn, ZoomOut, Move, Maximize2, Grid3x3, User, Activity, Heart, Brain, Eye, Settings, Info, Play, Pause, RotateCcw } from 'lucide-react';

export function DigitalTwin3D({
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
  const [viewMode, setViewMode] = useState('front'); // front, back, side, 360
  const [isRotating, setIsRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
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
    color: '#10b981'
  },
  // 眼部
  {
    id: 'eyes',
    name: '眼部',
    x: 50,
    y: 15,
    health: 88,
    status: 'good',
    issues: ['轻微疲劳'],
    color: '#3b82f6'
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
    color: '#ef4444'
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
    color: '#06b6d4'
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
    color: '#f59e0b'
  },
  // 胃部
  {
    id: 'stomach',
    name: '胃部',
    x: 55,
    y: 40,
    health: 82,
    status: 'good',
    issues: [],
    color: '#8b5cf6'
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
    color: '#ec4899'
  },
  // 骨骼
  {
    id: 'bones',
    name: '骨骼',
    x: 50,
    y: 60,
    health: 75,
    status: 'fair',
    issues: ['骨密度略低'],
    color: '#6b7280'
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
        // 模拟旋转动画
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
    // 初始化3D画布
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
      onBodyPartClick?.(clickedPart);
      toast({
        title: "选中部位",
        description: `已选中${clickedPart.name}，健康评分：${clickedPart.health}%`
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
  };
  const handleExport = () => {
    toast({
      title: "导出功能",
      description: "正在导出3D模型数据..."
    });
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
  return <div className={`bg-slate-900 rounded-lg overflow-hidden ${className}`}>
      {/* 控制面板 */}
      <div className="bg-slate-800 p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-white font-semibold">数字孪生人</h3>
            <Badge className="bg-blue-600">
              {selectedPart ? selectedPart.name : '整体视图'}
            </Badge>
          </div>
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
            <button onClick={handleExport} className="p-2 bg-slate-700 text-gray-400 hover:text-white rounded" title="导出数据">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 动画速度控制 */}
        {isRotating && <div className="mt-3 flex items-center space-x-3">
            <span className="text-gray-400 text-sm">旋转速度:</span>
            <input type="range" min="0.5" max="3" step="0.5" value={animationSpeed} onChange={e => setAnimationSpeed(parseFloat(e.target.value))} className="flex-1" />
            <span className="text-white text-sm">{animationSpeed}x</span>
          </div>}
      </div>

      {/* 3D模型展示区 */}
      <div className="relative">
        {isLoading ? <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-400">正在加载3D模型...</p>
            </div>
          </div> : <div className="relative">
            <canvas ref={canvasRef} width={600} height={400} onClick={handleCanvasClick} className="w-full cursor-crosshair" style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center'
        }} />
            
            {/* 健康指标图例 */}
            <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3">
              <h4 className="text-white text-sm font-semibold mb-2">健康状态</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-xs">优秀 (90-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300 text-xs">良好 (80-89)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300 text-xs">一般 (70-79)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300 text-xs">较差 (&lt;70)</span>
                </div>
              </div>
            </div>

            {/* 操作提示 */}
            <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 text-gray-300 text-xs">
                <Info className="w-4 h-4" />
                <span>点击身体部位查看详细信息</span>
              </div>
            </div>
          </div>}
      </div>

      {/* 选中部位详情 */}
      {selectedPart && <div className="bg-slate-800 p-4 border-t border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-semibold">{selectedPart.name}</h4>
            <Badge className={getStatusColor(selectedPart.status)}>
              {getStatusText(selectedPart.status)}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-sm">健康评分</p>
              <p className="text-2xl font-bold text-white">{selectedPart.health}%</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">主要问题</p>
              <p className="text-white">
                {selectedPart.issues.length > 0 ? selectedPart.issues.join(', ') : '无异常'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">建议措施</p>
              <p className="text-white text-sm">
                {selectedPart.issues.length > 0 ? '建议进一步检查' : '保持良好状态'}
              </p>
            </div>
          </div>
        </div>}
    </div>;
}