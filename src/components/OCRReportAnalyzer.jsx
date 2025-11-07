// @ts-ignore;
import React, { useState, useRef, useCallback } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, FileText, Scan, AlertTriangle, CheckCircle, Clock, TrendingUp, Activity, Brain, Eye, Loader2, X, ZoomIn } from 'lucide-react';

export function OCRReportAnalyzer({
  onAnalysisComplete,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef(null);
  const handleFileUpload = event => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        analyzeReport(file);
      } else {
        toast({
          title: "文件格式错误",
          description: "请上传图片格式的CT报告",
          variant: "destructive"
        });
      }
    }
  };
  const handleDrop = useCallback(event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      analyzeReport(file);
    }
  }, [toast]);
  const handleDragOver = useCallback(event => {
    event.preventDefault();
  }, []);
  const analyzeReport = async file => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // 模拟OCR分析过程
    const progressSteps = [{
      step: '图像预处理',
      duration: 1000
    }, {
      step: 'OCR文字识别',
      duration: 2000
    }, {
      step: '医学影像分析',
      duration: 1500
    }, {
      step: '结节检测与分类',
      duration: 2000
    }, {
      step: '风险评估',
      duration: 1000
    }];
    let currentProgress = 0;
    for (const {
      step,
      duration
    } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, duration));
      currentProgress += 100 / progressSteps.length;
      setAnalysisProgress(Math.round(currentProgress));
    }

    // 模拟分析结果
    const mockResult = {
      reportId: 'CT' + Date.now(),
      patientInfo: {
        name: '张晓明',
        age: 53,
        gender: '男',
        scanDate: '2024-01-15'
      },
      nodules: [{
        id: 'N001',
        location: '右肺上叶',
        size: '6mm × 8mm',
        density: '磨玻璃样',
        riskLevel: 'low',
        confidence: 0.92,
        description: '右肺上叶可见磨玻璃样结节，边界清晰，大小约6mm×8mm',
        recommendation: '建议3个月后复查CT'
      }, {
        id: 'N002',
        location: '左肺下叶',
        size: '4mm × 5mm',
        density: '实性',
        riskLevel: 'very_low',
        confidence: 0.88,
        description: '左肺下叶可见小实性结节，大小约4mm×5mm',
        recommendation: '建议6-12个月后复查CT'
      }],
      overallAssessment: {
        riskScore: 15,
        riskLevel: 'low',
        totalNodules: 2,
        largestNodule: '8mm',
        recommendation: '定期随访观察'
      },
      analysisTime: new Date().toISOString()
    };
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    onAnalysisComplete?.(mockResult);
    toast({
      title: "分析完成",
      description: `检测到${mockResult.nodules.length}个结节，已完成风险评估`
    });
  };
  const getRiskLevelColor = level => {
    switch (level) {
      case 'very_low':
        return 'text-green-600 bg-green-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'very_high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getRiskLevelText = level => {
    switch (level) {
      case 'very_low':
        return '极低风险';
      case 'low':
        return '低风险';
      case 'moderate':
        return '中等风险';
      case 'high':
        return '高风险';
      case 'very_high':
        return '极高风险';
      default:
        return '未知';
    }
  };
  const resetAnalysis = () => {
    setAnalysisResult(null);
    setUploadedFile(null);
    setPreviewUrl(null);
    setAnalysisProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Scan className="w-5 h-5 mr-2 text-blue-600" />
          AI智能CT报告分析
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 上传区域 */}
        {!uploadedFile && <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors" onDrop={handleDrop} onDragOver={handleDragOver}>
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">上传CT报告</h3>
            <p className="text-gray-500 mb-4">拖拽图片到此处或点击选择文件</p>
            <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              选择文件
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <p className="text-xs text-gray-400 mt-4">支持JPG、PNG、DICOM格式，最大10MB</p>
          </div>}

        {/* 预览和分析进度 */}
        {uploadedFile && <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={previewUrl} alt="CT报告预览" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={resetAnalysis}>
                <X className="w-4 h-4 mr-1" />
                重新上传
              </Button>
            </div>

            {/* 分析进度 */}
            {isAnalyzing && <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">AI分析中...</span>
                  <span className="text-sm text-gray-500">{analysisProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
              width: `${analysisProgress}%`
            }}></div>
                </div>
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              </div>}
          </div>}

        {/* 分析结果 */}
        {analysisResult && !isAnalyzing && <div className="space-y-6">
            {/* 总体评估 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-600" />
                  AI智能评估结果
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(analysisResult.overallAssessment.riskLevel)}`}>
                  {getRiskLevelText(analysisResult.overallAssessment.riskLevel)}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{analysisResult.nodules.length}</p>
                  <p className="text-sm text-gray-600">检测结节</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{analysisResult.overallAssessment.largestNodule}</p>
                  <p className="text-sm text-gray-600">最大结节</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{analysisResult.overallAssessment.riskScore}</p>
                  <p className="text-sm text-gray-600">风险评分</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-600">{analysisResult.overallAssessment.recommendation}</p>
                  <p className="text-sm text-gray-600">处理建议</p>
                </div>
              </div>
            </div>

            {/* 结节详情 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                结节详细信息
              </h4>
              {analysisResult.nodules.map((nodule, index) => <div key={nodule.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-800">结节 {index + 1}</h5>
                      <p className="text-sm text-gray-600">{nodule.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(nodule.riskLevel)}`}>
                      {getRiskLevelText(nodule.riskLevel)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">大小</p>
                      <p className="font-medium">{nodule.size}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">密度</p>
                      <p className="font-medium">{nodule.density}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">置信度</p>
                      <p className="font-medium">{(nodule.confidence * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">建议</p>
                      <p className="font-medium text-blue-600">{nodule.recommendation}</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
                    {nodule.description}
                  </div>
                </div>)}
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Activity className="w-4 h-4 mr-2" />
                开始AI问诊
              </Button>
              <Button variant="outline" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                生成报告
              </Button>
            </div>
          </div>}
      </CardContent>
    </div>;
}