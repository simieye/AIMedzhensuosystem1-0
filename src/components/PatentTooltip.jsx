// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Shield, Award, FileText, ExternalLink, X, ChevronRight, CheckCircle, Star, TrendingUp } from 'lucide-react';

export function PatentTooltip({
  patentNumber,
  productName,
  children,
  position = 'top'
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [patentData, setPatentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleTrigger = async () => {
    if (!isVisible) {
      setIsVisible(true);
      await loadPatentData();
    } else {
      setIsVisible(false);
    }
  };
  const loadPatentData = async () => {
    setIsLoading(true);
    try {
      // 模拟专利数据加载
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockPatentData = {
        patentNumber: patentNumber,
        title: '基于人工智能的个性化营养配方推荐系统及方法',
        applicant: '臻·寿高端抗衰老诊所',
        inventor: ['张博士', '李教授', '王研究员'],
        applicationDate: '2023-10-15',
        publicationDate: '2024-01-20',
        grantDate: '2024-03-15',
        status: '已授权',
        type: '发明专利',
        field: '医疗健康',
        abstract: '本发明涉及一种基于人工智能的个性化营养配方推荐系统及方法，通过收集用户的健康数据、生活习惯和基因信息，利用机器学习算法分析用户的营养需求，生成个性化的营养补充方案。该系统能够实时调整配方，提高营养补充的精准性和有效性。',
        claims: ['一种基于人工智能的个性化营养配方推荐系统', '基于多维度健康数据的营养需求分析方法', '动态调整营养配方的机器学习算法', '个性化营养补充效果的评估系统'],
        technicalAdvantages: ['精准度高：基于AI算法分析，推荐准确率达95%以上', '个性化强：根据个人健康数据定制专属配方', '实时调整：根据健康变化动态优化配方', '科学验证：经过临床试验验证，安全有效'],
        applicationAreas: ['抗衰老营养补充', '慢性病营养干预', '运动营养指导', '孕期营养管理'],
        citations: 156,
        impactScore: 8.7,
        verificationStatus: 'verified'
      };
      setPatentData(mockPatentData);
    } catch (error) {
      console.error('Failed to load patent data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };
  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 -mt-2';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 -mb-2';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 -ml-2';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 -mr-2';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 -mt-2';
    }
  };
  if (!patentNumber) {
    return <>{children}</>;
  }
  return <div className="relative inline-block">
      <div ref={triggerRef} onClick={handleTrigger} className="cursor-pointer">
        {children}
      </div>
      
      {isVisible && <div ref={tooltipRef} className={`absolute z-50 w-96 ${getPositionClasses()}`}>
          <div className={`absolute w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white ${getArrowClasses()}`}></div>
          <Card className="shadow-2xl border-2 border-blue-200">
            <CardContent className="p-0">
              {/* 头部 */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    <span className="font-semibold">专利技术</span>
                  </div>
                  <button onClick={() => setIsVisible(false)} className="text-white/80 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm">
                  <p className="font-mono">{patentNumber}</p>
                  <p className="text-blue-100 mt-1">{productName}</p>
                </div>
              </div>
              
              {/* 内容 */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {isLoading ? <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                    <span className="text-gray-600">加载专利信息...</span>
                  </div> : patentData && <div className="space-y-4">
                    {/* 基本信息 */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        基本信息
                      </h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">专利名称:</span>
                          <span className="text-gray-800 text-right max-w-[60%]">{patentData.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">申请人:</span>
                          <span className="text-gray-800">{patentData.applicant}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">发明人:</span>
                          <span className="text-gray-800">{patentData.inventor.join('、')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">申请日期:</span>
                          <span className="text-gray-800">{patentData.applicationDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">授权日期:</span>
                          <span className="text-gray-800">{patentData.grantDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">专利类型:</span>
                          <span className="text-gray-800">{patentData.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* 技术优势 */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        技术优势
                      </h4>
                      <ul className="space-y-1">
                        {patentData.technicalAdvantages.map((advantage, index) => <li key={index} className="text-sm text-gray-700 flex items-start">
                            <CheckCircle className="w-3 h-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{advantage}</span>
                          </li>)}
                      </ul>
                    </div>

                    {/* 应用领域 */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">应用领域</h4>
                      <div className="flex flex-wrap gap-2">
                        {patentData.applicationAreas.map((area, index) => <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {area}
                          </span>)}
                      </div>
                    </div>

                    {/* 影响力指标 */}
                    <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{patentData.citations}</div>
                        <div className="text-xs text-gray-600">引用次数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{patentData.impactScore}</div>
                        <div className="text-xs text-gray-600">影响因子</div>
                      </div>
                    </div>

                    {/* 验证状态 */}
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">专利已验证</span>
                      </div>
                      <div className="flex items-center text-xs text-green-600">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        <span>官方认证</span>
                      </div>
                    </div>
                  </div>}
              </div>
              
              {/* 底部操作 */}
              {!isLoading && patentData && <div className="border-t p-3 bg-gray-50">
                  <button className="w-full flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                    查看专利详情
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>}
            </CardContent>
          </Card>
        </div>}
    </div>;
}