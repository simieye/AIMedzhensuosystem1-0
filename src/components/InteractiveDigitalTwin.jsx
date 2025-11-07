// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Brain, Heart, Lungs, Stomach, Liver, Kidney, Eye, Ear, Bone, Activity, Info, X, ChevronRight, Sparkles } from 'lucide-react';

export function InteractiveDigitalTwin({
  onOrganClick,
  userData,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [organDetails, setOrganDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  // 器官数据
  const organs = [{
    id: 'brain',
    name: '大脑',
    icon: Brain,
    x: 50,
    y: 15,
    health: 92,
    status: 'excellent',
    description: '认知功能良好，记忆力正常',
    issues: [],
    recommendations: ['保持充足睡眠', '进行脑力训练', '补充Omega-3脂肪酸'],
    color: '#8b5cf6'
  }, {
    id: 'heart',
    name: '心脏',
    icon: Heart,
    x: 50,
    y: 35,
    health: 85,
    status: 'good',
    description: '心血管功能正常，心律规则',
    issues: ['静息心率略高'],
    recommendations: ['增加有氧运动', '控制钠盐摄入', '管理压力'],
    color: '#ef4444'
  }, {
    id: 'lungs',
    name: '肺部',
    icon: Lungs,
    x: 45,
    y: 30,
    health: 88,
    status: 'good',
    description: '肺功能正常，呼吸顺畅',
    issues: [],
    recommendations: ['戒烟限酒', '进行呼吸训练', '避免空气污染'],
    color: '#06b6d4'
  }, {
    id: 'liver',
    name: '肝脏',
    x: 55,
    y: 40,
    health: 78,
    status: 'fair',
    description: '肝功能轻度异常',
    issues: ['轻度脂肪肝', '转氨酶略高'],
    recommendations: ['控制体重', '减少酒精摄入', '增加运动量'],
    color: '#f59e0b'
  }, {
    id: 'stomach',
    name: '胃部',
    icon: Stomach,
    x: 50,
    y: 45,
    health: 82,
    status: 'good',
    description: '消化功能正常',
    issues: [],
    recommendations: ['规律饮食', '避免刺激性食物', '细嚼慢咽'],
    color: '#10b981'
  }, {
    id: 'kidney',
    name: '肾脏',
    icon: Kidney,
    x: 48,
    y: 50,
    health: 90,
    status: 'excellent',
    description: '肾功能正常，滤过功能良好',
    issues: [],
    recommendations: ['充足饮水', '控制蛋白质摄入', '定期检查'],
    color: '#ec4899'
  }, {
    id: 'eyes',
    name: '眼睛',
    icon: Eye,
    x: 47,
    y: 18,
    health: 75,
    status: 'fair',
    description: '视力轻度下降',
    issues: ['轻度近视', '眼干症状'],
    recommendations: ['控制用眼时间', '做眼保健操', '补充维生素A'],
    color: '#3b82f6'
  }, {
    id: 'bones',
    name: '骨骼',
    icon: Bone,
    x: 52,
    y: 55,
    health: 80,
    status: 'good',
    description: '骨密度正常',
    issues: ['轻度钙质流失'],
    recommendations: ['补充钙质', '进行负重运动', '多晒太阳'],
    color: '#6b7280'
  }];
  useEffect(() => {
    drawBody();
  }, [selectedOrgan]);
  const drawBody = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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

    // 绘制人体轮廓
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // 头部
    ctx.arc(width / 2, height * 0.15, 25, 0, Math.PI * 2);
    // 身体
    ctx.moveTo(width / 2, height * 0.15 + 25);
    ctx.lineTo(width / 2, height * 0.5);
    ctx.lineTo(width / 2 - 40, height * 0.7);
    ctx.moveTo(width / 2, height * 0.5);
    ctx.lineTo(width / 2 + 40, height * 0.7);
    // 手臂
    ctx.moveTo(width / 2 - 15, height * 0.25);
    ctx.lineTo(width / 2 - 50, height * 0.45);
    ctx.moveTo(width / 2 + 15, height * 0.25);
    ctx.lineTo(width / 2 + 50, height * 0.45);
    // 腿部
    ctx.moveTo(width / 2 - 10, height * 0.7);
    ctx.lineTo(width / 2 - 15, height * 0.9);
    ctx.moveTo(width / 2 + 10, height * 0.7);
    ctx.lineTo(width / 2 + 15, height * 0.9);
    ctx.stroke();

    // 绘制器官
    organs.forEach(organ => {
      const x = width * (organ.x / 100);
      const y = height * (organ.y / 100);

      // 绘制器官圆圈
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fillStyle = organ.color + '40';
      ctx.fill();
      ctx.strokeStyle = organ.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制健康数值
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(organ.health + '%', x, y - 15);

      // 如果被选中，绘制高亮
      if (selectedOrgan?.id === organ.id) {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
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

    // 查找点击的器官
    const clickedOrgan = organs.find(organ => {
      const distance = Math.sqrt(Math.pow(x - organ.x, 2) + Math.pow(y - organ.y, 2));
      return distance < 10;
    });
    if (clickedOrgan) {
      handleOrganClick(clickedOrgan);
    }
  };
  const handleOrganClick = async organ => {
    setSelectedOrgan(organ);
    setIsLoading(true);
    try {
      // 模拟AI分析
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockDetails = {
        ...organ,
        aiAnalysis: `基于您的健康数据分析，${organ.name}的当前状态为${organ.status === 'excellent' ? '优秀' : organ.status === 'good' ? '良好' : organ.status === 'fair' ? '一般' : '较差'}。${organ.issues.length > 0 ? `主要问题包括：${organ.issues.join('、')}。` : '功能正常，无明显异常。'}建议${organ.recommendations.join('、')}以维持或改善${organ.name}健康。`,
        riskFactors: organ.issues.length > 0 ? ['年龄因素', '生活习惯', '环境影响'] : [],
        preventionTips: organ.recommendations,
        nextCheckup: organ.health < 80 ? '建议1个月内复查' : '建议3-6个月复查'
      };
      setOrganDetails(mockDetails);
      onOrganClick?.(organ);
      toast({
        title: "器官分析完成",
        description: `AI已为您分析${organ.name}的健康状况`
      });
    } catch (error) {
      toast({
        title: "分析失败",
        description: "AI分析失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-white">
            <Activity className="w-5 h-5 mr-2" />
            3D数字孪生交互
          </CardTitle>
          <div className="text-sm text-gray-400">
            点击器官查看AI分析
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <canvas ref={canvasRef} width={600} height={400} onClick={handleCanvasClick} className="w-full cursor-crosshair" />
          
          {/* 加载状态 */}
          {isLoading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-white">AI正在分析器官数据...</p>
              </div>
            </div>}
        </div>

        {/* 器官详情弹窗 */}
        {organDetails && <div className="p-6 bg-slate-800 border-t border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{
              backgroundColor: organDetails.color + '20'
            }}>
                  <organDetails.icon className="w-5 h-5" style={{
                color: organDetails.color
              }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{organDetails.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(organDetails.status)}`}>
                    {getStatusText(organDetails.status)}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedOrgan(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-300 mb-2">基本信息</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">健康评分:</span>
                    <span className="text-white font-medium">{organDetails.health}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">功能状态:</span>
                    <span className="text-white">{organDetails.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">下次复查:</span>
                    <span className="text-white">{organDetails.nextCheckup}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-300 mb-2">AI智能分析</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {organDetails.aiAnalysis}
                </p>
              </div>
            </div>

            {organDetails.issues.length > 0 && <div className="mt-4">
                <h4 className="font-medium text-gray-300 mb-2">关注问题</h4>
                <div className="flex flex-wrap gap-2">
                  {organDetails.issues.map((issue, index) => <span key={index} className="px-3 py-1 bg-red-900/30 text-red-300 rounded-full text-xs">
                      {issue}
                    </span>)}
                </div>
              </div>}

            <div className="mt-4">
              <h4 className="font-medium text-gray-300 mb-2">健康建议</h4>
              <div className="space-y-1">
                {organDetails.recommendations.map((rec, index) => <div key={index} className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">{rec}</span>
                  </div>)}
              </div>
            </div>
          </div>}

        {/* 操作提示 */}
        <div className="p-4 bg-slate-800/50 border-t border-slate-700">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Info className="w-4 h-4" />
            <span>点击人体器官查看AI健康分析，获取个性化建议</span>
          </div>
        </div>
      </CardContent>
    </div>;
}