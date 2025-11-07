// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, Camera, FileText, CheckCircle, AlertCircle, Loader2, Eye, Download, Share2 } from 'lucide-react';

export function OCRReportParser({
  onReportParsed,
  onImageUpload
}) {
  const {
    toast
  } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileUpload = async file => {
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      toast({
        title: "文件格式错误",
        description: "请上传图片格式的检测报告",
        variant: "destructive"
      });
      return;
    }

    // 检查文件大小（限制10MB）
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "文件过大",
        description: "请上传小于10MB的图片文件",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);
    setUploadedImage(URL.createObjectURL(file));
    try {
      // 模拟OCR处理过程
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 模拟OCR解析结果
      const mockParsedData = {
        reportType: '血常规检查',
        hospital: '北京协和医院',
        date: '2024-01-15',
        patientName: '张晓明',
        patientId: 'P20240115001',
        metrics: [{
          name: '白细胞计数',
          value: '6.8',
          unit: '×10⁹/L',
          referenceRange: '4.0-10.0',
          status: 'normal',
          trend: 'stable'
        }, {
          name: '红细胞计数',
          value: '4.5',
          unit: '×10¹²/L',
          referenceRange: '4.0-5.5',
          status: 'normal',
          trend: 'stable'
        }, {
          name: '血红蛋白',
          value: '142',
          unit: 'g/L',
          referenceRange: '120-160',
          status: 'normal',
          trend: 'up'
        }, {
          name: '血小板计数',
          value: '280',
          unit: '×10⁹/L',
          referenceRange: '100-300',
          status: 'normal',
          trend: 'stable'
        }, {
          name: '总胆固醇',
          value: '5.8',
          unit: 'mmol/L',
          referenceRange: '<5.2',
          status: 'high',
          trend: 'up'
        }, {
          name: '甘油三酯',
          value: '2.1',
          unit: 'mmol/L',
          referenceRange: '<1.7',
          status: 'high',
          trend: 'up'
        }],
        summary: {
          normalCount: 4,
          abnormalCount: 2,
          criticalCount: 0,
          overallStatus: 'attention'
        },
        recommendations: ['控制饮食，减少高脂食物摄入', '增加有氧运动，每周至少150分钟', '定期复查血脂水平', '考虑营养师咨询']
      };
      setParsedData(mockParsedData);
      onReportParsed?.(mockParsedData);
      onImageUpload?.(uploadedImage);
      toast({
        title: "OCR解析成功",
        description: `成功识别${mockParsedData.metrics.length}项检测指标`
      });
    } catch (error) {
      toast({
        title: "OCR解析失败",
        description: "图片识别失败，请重新上传清晰的报告图片",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleCameraCapture = () => {
    // 创建相机输入
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';
    input.onchange = e => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  };
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };
  const handleDragOver = e => {
    e.preventDefault();
  };
  const getStatusColor = status => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      case 'critical':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'normal':
        return '正常';
      case 'high':
        return '偏高';
      case 'low':
        return '偏低';
      case 'critical':
        return '危急';
      default:
        return '未知';
    }
  };
  const getTrendIcon = trend => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };
  return <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          智能OCR报告解析
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 上传区域 */}
        {!uploadedImage ? <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors" onDrop={handleDrop} onDragOver={handleDragOver}>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">上传检测报告</h3>
            <p className="text-gray-500 mb-4">支持拖拽或点击上传图片，系统将自动识别报告内容</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleFileSelect} disabled={isProcessing}>
                <Upload className="w-4 h-4 mr-2" />
                选择文件
              </Button>
              <Button variant="outline" onClick={handleCameraCapture} disabled={isProcessing}>
                <Camera className="w-4 h-4 mr-2" />
                拍照上传
              </Button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }} className="hidden" />
          </div> : <div className="space-y-4">
            {/* 图片预览 */}
            <div className="relative">
              <img src={uploadedImage} alt="检测报告" className="w-full h-64 object-cover rounded-lg" />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  查看
                </Button>
                <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm" onClick={() => {
              setUploadedImage(null);
              setParsedData(null);
            }}>
                  重新上传
                </Button>
              </div>
            </div>

            {/* 处理状态 */}
            {isProcessing && <div className="flex items-center justify-center p-8 bg-blue-50 rounded-lg">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mr-3" />
                <div>
                  <p className="text-blue-800 font-semibold">正在解析报告...</p>
                  <p className="text-blue-600 text-sm">AI正在识别报告内容，请稍候</p>
                </div>
              </div>}

            {/* 解析结果 */}
            {parsedData && !isProcessing && <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <p className="font-semibold text-green-800">解析完成</p>
                      <p className="text-green-600 text-sm">成功识别{parsedData.metrics.length}项检测指标</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      下载
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4 mr-1" />
                      分享
                    </Button>
                  </div>
                </div>

                {/* 报告基本信息 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">报告类型</p>
                    <p className="font-semibold">{parsedData.reportType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">检测机构</p>
                    <p className="font-semibold">{parsedData.hospital}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">检测日期</p>
                    <p className="font-semibold">{parsedData.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">患者姓名</p>
                    <p className="font-semibold">{parsedData.patientName}</p>
                  </div>
                </div>

                {/* 检测指标 */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">检测指标详情</h4>
                  <div className="space-y-2">
                    {parsedData.metrics.map((metric, index) => <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{metric.name}</p>
                          <p className="text-sm text-gray-600">
                            参考范围: {metric.referenceRange}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              {metric.value} {metric.unit}
                            </p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                              {getStatusText(metric.status)}
                            </span>
                          </div>
                          <div className="text-lg font-medium text-gray-600">
                            {getTrendIcon(metric.trend)}
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>

                {/* 总结和建议 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">检测结果总结</h4>
                    <div className="space-y-1 text-sm">
                      <p>✅ 正常指标: {parsedData.summary.normalCount}项</p>
                      <p>⚠️ 异常指标: {parsedData.summary.abnormalCount}项</p>
                      <p>🚨 危急指标: {parsedData.summary.criticalCount}项</p>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">健康建议</h4>
                    <ul className="space-y-1 text-sm">
                      {parsedData.recommendations.map((rec, index) => <li key={index} className="flex items-start">
                          <span className="text-yellow-600 mr-2">•</span>
                          <span>{rec}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>}
          </div>}
      </CardContent>
    </Card>;
}