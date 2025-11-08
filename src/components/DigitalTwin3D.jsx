// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Brain, Heart, Lungs, Liver, Kidney, Eye, Activity, Zap, Target, TrendingUp, AlertCircle, CheckCircle, Info, RotateCw, Maximize2, Grid3x3, Layers, Box } from 'lucide-react';

export function DigitalTwin3D({
  organsData = [],
  onOrganClick,
  className = ''
}) {
  const [rotation, setRotation] = useState({
    x: -20,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0
  });
  const [hoveredOrgan, setHoveredOrgan] = useState(null);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'skeleton', 'layers'
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);
  useEffect(() => {
    let animationFrame;
    if (autoRotate && !isDragging) {
      const animate = () => {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.5
        }));
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [autoRotate, isDragging]);
  const handleMouseDown = e => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
    setAutoRotate(false);
  };
  const handleMouseMove = e => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleWheel = e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(2, prev * delta)));
  };
  const getOrganIcon = organId => {
    const iconMap = {
      brain: Brain,
      heart: Heart,
      lungs: Lungs,
      liver: Liver,
      kidney: Kidney
    };
    return iconMap[organId] || Activity;
  };
  const getOrganColor = organ => {
    const healthColors = {
      excellent: {
        primary: '#10b981',
        secondary: '#34d399',
        glow: 'rgba(16, 185, 129, 0.3)'
      },
      good: {
        primary: '#3b82f6',
        secondary: '#60a5fa',
        glow: 'rgba(59, 130, 246, 0.3)'
      },
      fair: {
        primary: '#f59e0b',
        secondary: '#fbbf24',
        glow: 'rgba(245, 158, 11, 0.3)'
      },
      poor: {
        primary: '#ef4444',
        secondary: '#f87171',
        glow: 'rgba(239, 68, 68, 0.3)'
      }
    };
    return healthColors[organ.status] || healthColors.good;
  };
  const render3DBody = () => {
    // 确保 organsData 是数组且不为空
    if (!Array.isArray(organsData) || organsData.length === 0) {
      return <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">暂无器官数据</p>
          </div>
        </div>;
    }
    return <div className="relative preserve-3d transition-transform duration-100" style={{
      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoomLevel})`,
      transformStyle: 'preserve-3d'
    }}>
        {/* 人体主体 - 增强立体感 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 躯干主体 */}
          <div className="relative" style={{
          width: '120px',
          height: '180px',
          transformStyle: 'preserve-3d'
        }}>
            {/* 前面 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-purple-50 rounded-2xl border border-blue-200" style={{
            transform: 'translateZ(30px)',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.8)'
          }} />
            {/* 后面 */}
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-100 via-blue-50 to-purple-50 rounded-2xl border border-blue-200" style={{
            transform: 'translateZ(-30px) rotateY(180deg)',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.8)'
          }} />
            {/* 左侧面 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200" style={{
            transform: 'rotateY(-90deg) translateZ(60px)',
            width: '60px',
            left: '-30px',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15), inset 0 2px 10px rgba(255, 255, 255, 0.8)'
          }} />
            {/* 右侧面 */}
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 to-purple-50 rounded-2xl border border-blue-200" style={{
            transform: 'rotateY(90deg) translateZ(60px)',
            width: '60px',
            right: '-30px',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15), inset 0 2px 10px rgba(255, 255, 255, 0.8)'
          }} />
            {/* 顶面 */}
            <div className="absolute bg-gradient-to-br from-blue-100 to-purple-50 rounded-t-2xl border border-blue-200" style={{
            transform: 'rotateX(90deg) translateZ(90px)',
            width: '120px',
            height: '60px',
            top: '-30px',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.8)'
          }} />
            {/* 底面 */}
            <div className="absolute bg-gradient-to-tr from-blue-100 to-purple-50 rounded-b-2xl border border-blue-200" style={{
            transform: 'rotateX(-90deg) translateZ(90px)',
            width: '120px',
            height: '60px',
            bottom: '-30px',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.8)'
          }} />
          </div>

          {/* 头部 - 增强立体感 */}
          <div className="absolute" style={{
          width: '80px',
          height: '80px',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          transformStyle: 'preserve-3d'
        }}>
            {/* 前面 */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50 rounded-full border border-purple-200" style={{
            transform: 'translateZ(20px)',
            boxShadow: '0 8px 25px rgba(147, 51, 234, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.9)'
          }} />
            {/* 后面 */}
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-100 via-purple-50 to-pink-50 rounded-full border border-purple-200" style={{
            transform: 'translateZ(-20px) rotateY(180deg)',
            boxShadow: '0 8px 25px rgba(147, 51, 234, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.9)'
          }} />
            {/* 球体效果 */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full" style={{
            transform: 'translateZ(21px)',
            backdropFilter: 'blur(2px)'
          }} />
          </div>

          {/* 手臂 - 增强立体感 */}
          <div className="absolute bg-gradient-to-br from-blue-100 via-blue-50 to-purple-50 rounded-xl border border-blue-200" style={{
          width: '25px',
          height: '80px',
          top: '20px',
          left: '-35px',
          transform: 'rotateZ(-15deg) rotateY(20deg)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2), inset 0 2px 8px rgba(255, 255, 255, 0.8)'
        }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl" style={{
            transform: 'rotateY(90deg) translateZ(12.5px)',
            width: '25px',
            boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.8)'
          }} />
          </div>
          
          <div className="absolute bg-gradient-to-bl from-blue-100 via-blue-50 to-purple-50 rounded-xl border border-blue-200" style={{
          width: '25px',
          height: '80px',
          top: '20px',
          right: '-35px',
          transform: 'rotateZ(15deg) rotateY(-20deg)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2), inset 0 2px 8px rgba(255, 255, 255, 0.8)'
        }}>
            <div className="absolute inset-0 bg-gradient-to-l from-blue-50 to-purple-50 rounded-xl" style={{
            transform: 'rotateY(90deg) translateZ(12.5px)',
            width: '25px',
            boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.8)'
          }} />
          </div>

          {/* 腿部 - 增强立体感 */}
          <div className="absolute bg-gradient-to-br from-blue-100 via-blue-50 to-purple-50 rounded-xl border border-blue-200" style={{
          width: '30px',
          height: '100px',
          bottom: '-100px',
          left: '25px',
          transformStyle: 'preserve-3d',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2), inset 0 2px 8px rgba(255, 255, 255, 0.8)'
        }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl" style={{
            transform: 'rotateY(90deg) translateZ(15px)',
            width: '30px',
            boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.8)'
          }} />
          </div>
          
          <div className="absolute bg-gradient-to-bl from-blue-100 via-blue-50 to-purple-50 rounded-xl border border-blue-200" style={{
          width: '30px',
          height: '100px',
          bottom: '-100px',
          right: '25px',
          transformStyle: 'preserve-3d',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2), inset 0 2px 8px rgba(255, 255, 255, 0.8)'
        }}>
            <div className="absolute inset-0 bg-gradient-to-l from-blue-50 to-purple-50 rounded-xl" style={{
            transform: 'rotateY(90deg) translateZ(15px)',
            width: '30px',
            boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.8)'
          }} />
          </div>
        </div>

        {/* 器官热点 - 增强立体感 */}
        {organsData.map((organ, index) => {
        const Icon = getOrganIcon(organ.id);
        const colors = getOrganColor(organ);
        const isHovered = hoveredOrgan === organ.id;
        const isSelected = selectedOrgan === organ.id;
        return <div key={organ.id} className="absolute cursor-pointer transition-all duration-300 preserve-3d" style={{
          left: `${organ.position.x}%`,
          top: `${organ.position.y}%`,
          transform: `translate(-50%, -50%) translateZ(${isHovered || isSelected ? '60px' : '40px'}) scale(${isHovered || isSelected ? 1.2 : 1})`,
          transformStyle: 'preserve-3d'
        }} onMouseEnter={() => setHoveredOrgan(organ.id)} onMouseLeave={() => setHoveredOrgan(null)} onClick={() => {
          setSelectedOrgan(organ.id);
          onOrganClick?.(organ);
        }}>
              {/* 器官球体 - 增强立体感 */}
              <div className="relative" style={{
            width: '60px',
            height: '60px',
            transformStyle: 'preserve-3d'
          }}>
                {/* 前面 */}
                <div className="absolute inset-0 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300" style={{
              background: `radial-gradient(circle at 30% 30%, ${colors.secondary}, ${colors.primary})`,
              transform: 'translateZ(15px)',
              boxShadow: `0 15px 35px ${colors.glow}, 0 8px 25px rgba(0, 0, 0, 0.15), inset 0 2px 8px rgba(255, 255, 255, 0.6)`,
              borderColor: isHovered || isSelected ? colors.secondary : 'white'
            }}>
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">{organ.health}</div>
                    <div className="text-white/80 text-xs">健康值</div>
                  </div>
                </div>
                
                {/* 后面 */}
                <div className="absolute inset-0 rounded-full border-2 border-white/50" style={{
              background: `radial-gradient(circle at 70% 70%, ${colors.primary}, ${colors.secondary})`,
              transform: 'translateZ(-15px) rotateY(180deg)',
              boxShadow: `0 15px 35px ${colors.glow}, inset 0 2px 8px rgba(255, 255, 255, 0.4)`,
              borderColor: colors.primary
            }} />
                
                {/* 侧面效果 */}
                <div className="absolute inset-0 rounded-full" style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              transform: 'rotateY(90deg) translateZ(30px)',
              width: '30px',
              left: '15px',
              boxShadow: `inset 0 2px 8px rgba(255, 255, 255, 0.4)`
            }} />
                
                {/* 高光效果 */}
                <div className="absolute rounded-full" style={{
              width: '20px',
              height: '20px',
              top: '8px',
              left: '8px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)',
              transform: 'translateZ(16px)',
              filter: 'blur(2px)'
            }} />
              </div>

              {/* 器官标签 - 增强立体感 */}
              <div className="absolute bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-xl border border-gray-200 transition-all duration-300" style={{
            bottom: '-40px',
            left: '50%',
            transform: `translateX(-50%) translateZ(20px) rotateX(-10deg)`,
            transformStyle: 'preserve-3d',
            opacity: isHovered || isSelected ? 1 : 0.9,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 3px rgba(255, 255, 255, 0.8)'
          }}>
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" style={{
                color: colors.primary
              }} />
                  <span className="text-sm font-semibold text-gray-800">{organ.name}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {organ.status === 'excellent' ? '优秀' : organ.status === 'good' ? '良好' : organ.status === 'fair' ? '一般' : '较差'}
                </div>
                
                {/* 标签立体效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg" style={{
              transform: 'translateZ(1px)',
              pointerEvents: 'none'
            }} />
              </div>

              {/* 脉冲效果 */}
              {(isHovered || isSelected) && <div className="absolute rounded-full animate-ping" style={{
            width: '80px',
            height: '80px',
            top: '-10px',
            left: '-10px',
            background: colors.glow,
            transform: 'translateZ(10px)'
          }} />}
            </div>;
      })}
      </div>;
  };
  const renderSkeletonView = () => {
    return <div className="relative preserve-3d transition-transform duration-100" style={{
      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoomLevel})`,
      transformStyle: 'preserve-3d'
    }}>
        {/* 骨架结构 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 脊柱 */}
          <div className="absolute bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" style={{
          width: '8px',
          height: '200px',
          transform: 'translateZ(0px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
        }} />
          
          {/* 肋骨 */}
          {[...Array(12)].map((_, i) => <div key={i} className="absolute bg-gradient-to-r from-gray-400 to-gray-500 rounded-full" style={{
          width: '60px',
          height: '3px',
          top: `${40 + i * 10}px`,
          left: '50%',
          transform: `translateX(-50%) rotateZ(${i % 2 === 0 ? 15 : -15}deg)`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }} />)}
          
          {/* 四肢骨骼 */}
          <div className="absolute bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" style={{
          width: '4px',
          height: '80px',
          top: '30px',
          left: '20px',
          transform: 'rotateZ(-20deg)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
        }} />
          <div className="absolute bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" style={{
          width: '4px',
          height: '80px',
          top: '30px',
          right: '20px',
          transform: 'rotateZ(20deg)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
        }} />
        </div>
      </div>;
  };
  const renderLayersView = () => {
    return <div className="relative preserve-3d transition-transform duration-100" style={{
      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoomLevel})`,
      transformStyle: 'preserve-3d'
    }}>
        {/* 分层结构 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 外层 */}
          <div className="absolute bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-3xl border-2 border-blue-300/50" style={{
          width: '200px',
          height: '280px',
          transform: 'translateZ(40px)',
          boxShadow: '0 15px 40px rgba(59, 130, 246, 0.2)'
        }} />
          
          {/* 中层 */}
          <div className="absolute bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-2xl border-2 border-blue-200/50" style={{
          width: '160px',
          height: '220px',
          transform: 'translateZ(20px)',
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)'
        }} />
          
          {/* 内层 */}
          <div className="absolute bg-gradient-to-br from-blue-50/60 to-purple-50/60 rounded-xl border-2 border-blue-100/50" style={{
          width: '120px',
          height: '160px',
          transform: 'translateZ(0px)',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.1)'
        }} />
        </div>
      </div>;
  };
  return <div ref={containerRef} className={`relative w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-2xl overflow-hidden ${className}`} style={{
    perspective: '1200px',
    transformStyle: 'preserve-3d'
  }}>
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
      backgroundSize: '20px 20px',
      transform: 'rotateX(60deg) translateZ(-100px)',
      transformStyle: 'preserve-3d'
    }} />

      {/* 3D模型容器 */}
      <div className="relative w-full h-full flex items-center justify-center" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} onWheel={handleWheel} style={{
      cursor: isDragging ? 'grabbing' : 'grab'
    }}>
        {viewMode === '3d' && render3DBody()}
        {viewMode === 'skeleton' && renderSkeletonView()}
        {viewMode === 'layers' && renderLayersView()}
      </div>

      {/* 控制面板 */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 space-y-2">
        <div className="flex items-center space-x-2">
          <button onClick={() => setAutoRotate(!autoRotate)} className={`p-2 rounded-lg transition-colors ${autoRotate ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} title="自动旋转">
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={() => setZoomLevel(1)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors" title="重置缩放">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-1">
          <button onClick={() => setViewMode('3d')} className={`p-2 rounded-lg transition-colors ${viewMode === '3d' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} title="3D视图">
            <Box className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('skeleton')} className={`p-2 rounded-lg transition-colors ${viewMode === 'skeleton' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} title="骨架视图">
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('layers')} className={`p-2 rounded-lg transition-colors ${viewMode === 'layers' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} title="分层视图">
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 缩放控制 */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
        <div className="flex items-center space-x-2">
          <button onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))} className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
            <span className="text-xs">-</span>
          </button>
          <div className="text-xs text-gray-600 font-medium w-8 text-center">
            {Math.round(zoomLevel * 100)}%
          </div>
          <button onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.1))} className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
            <span className="text-xs">+</span>
          </button>
        </div>
      </div>

      {/* 状态指示器 */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3">
        <div className="text-xs text-gray-600 space-y-1">
          <div>旋转: X={Math.round(rotation.x)}° Y={Math.round(rotation.y)}°</div>
          <div>缩放: {Math.round(zoomLevel * 100)}%</div>
          <div>视图: {viewMode === '3d' ? '3D' : viewMode === 'skeleton' ? '骨架' : '分层'}</div>
        </div>
      </div>

      {/* 添加CSS样式 */}
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>;
}