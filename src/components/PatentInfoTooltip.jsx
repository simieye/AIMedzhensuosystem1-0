// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Award, FileText, Globe, Users, CheckCircle, Info, ExternalLink, X, ChevronRight, Shield, Star } from 'lucide-react';

export function PatentInfoTooltip({
  product,
  trigger,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  });
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const patentData = {
    'nmn-250': {
      patentNumber: 'US11,234,567B2',
      patentTitle: 'Nicotinamide Mononucleotide Composition and Method of Use',
      filingDate: '2020-03-15',
      grantDate: '2023-08-21',
      inventors: ['Dr. Sarah Chen', 'Dr. Michael Wang', 'Dr. Lisa Zhang'],
      assignee: 'Longevity Science Inc.',
      expirationDate: '2040-03-15',
      claims: 12,
      citations: 48,
      description: '本专利涉及一种高纯度NMN组合物及其制备方法，具有优异的生物利用度和稳定性。',
      manufacturingInfo: {
        facility: 'GMP认证工厂 - 美国加州',
        certification: 'FDA注册、cGMP认证',
        capacity: '年产50吨',
        quality: '纯度99.5%以上',
        testing: '第三方实验室检测'
      },
      clinicalTrials: [{
        phase: 'Phase II',
        participants: 156,
        duration: '12周',
        results: 'NAD+水平提升45%，无严重副作用',
        published: 'Journal of Anti-Aging Medicine, 2023'
      }],
      regulatoryApprovals: [{
        country: '美国',
        status: 'GRAS认证',
        date: '2021-06-15'
      }, {
        country: '欧盟',
        status: 'Novel Food认证',
        date: '2021-09-20'
      }, {
        country: '日本',
        status: '功能性食品认证',
        date: '2022-01-10'
      }, {
        country: '中国',
        status: '进口保健食品备案',
        date: '2022-03-25'
      }]
    },
    'nmn-500': {
      patentNumber: 'US11,456,789B2',
      patentTitle: 'High-Dose Nicotinamide Mononucleotide Formulation',
      filingDate: '2020-08-22',
      grantDate: '2024-01-15',
      inventors: ['Dr. James Liu', 'Dr. Jennifer Wu'],
      assignee: 'Longevity Science Inc.',
      expirationDate: '2040-08-22',
      claims: 15,
      citations: 62,
      description: '高剂量NMN配方专利，采用缓释技术提高生物利用度，适合需要强化补充的人群。',
      manufacturingInfo: {
        facility: 'GMP认证工厂 - 美国加州',
        certification: 'FDA注册、cGMP认证',
        capacity: '年产30吨',
        quality: '纯度99.8%以上',
        testing: '第三方实验室检测'
      },
      clinicalTrials: [{
        phase: 'Phase II/III',
        participants: 234,
        duration: '16周',
        results: 'NAD+水平提升62%，耐受性良好',
        published: 'Cell Metabolism, 2024'
      }],
      regulatoryApprovals: [{
        country: '美国',
        status: 'GRAS认证',
        date: '2022-02-10'
      }, {
        country: '欧盟',
        status: 'Novel Food认证',
        date: '2022-05-18'
      }, {
        country: '日本',
        status: '功能性食品认证',
        date: '2022-08-22'
      }]
    }
  };
  const currentPatent = patentData[product?.id] || patentData['nmn-250'];
  useEffect(() => {
    const handleClickOutside = event => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    const handleScroll = () => {
      if (isVisible && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX
        });
      }
    };
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible]);
  const handleTriggerClick = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
    setIsVisible(!isVisible);
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getRegulatoryStatusColor = status => {
    if (status.includes('认证') || status.includes('批准')) return 'text-green-600 bg-green-100';
    if (status.includes('备案')) return 'text-blue-600 bg-blue-100';
    return 'text-gray-600 bg-gray-100';
  };
  return <>
      <div ref={triggerRef} onClick={handleTriggerClick} className={`cursor-pointer ${className}`}>
        {trigger || <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>专利信息</span>
          </Button>}
      </div>

      {isVisible && <div ref={tooltipRef} className="fixed z-50 w-96 max-h-[80vh] overflow-y-auto" style={{
      top: `${position.top}px`,
      left: `${position.left}px`
    }}>
          <Card className="shadow-2xl border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  专利与生产信息
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* 专利基本信息 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  专利详情
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">专利号：</span>
                    <span className="font-medium">{currentPatent.patentNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">专利标题：</span>
                    <span className="font-medium text-right flex-1 ml-2">{currentPatent.patentTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">申请日期：</span>
                    <span className="font-medium">{formatDate(currentPatent.filingDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">授权日期：</span>
                    <span className="font-medium">{formatDate(currentPatent.grantDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">到期日期：</span>
                    <span className="font-medium">{formatDate(currentPatent.expirationDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">权利要求：</span>
                    <span className="font-medium">{currentPatent.claims}项</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">引用次数：</span>
                    <span className="font-medium">{currentPatent.citations}次</span>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-blue-50 rounded text-sm text-blue-800">
                  {currentPatent.description}
                </div>
              </div>

              {/* 发明人信息 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  发明团队
                </h5>
                <div className="space-y-1 text-sm">
                  {currentPatent.inventors.map((inventor, index) => <div key={index} className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs text-blue-600 font-medium">{index + 1}</span>
                      </div>
                      <span className="text-gray-800">{inventor}</span>
                    </div>)}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-sm">
                    <span className="text-gray-600">专利权人：</span>
                    <span className="font-medium">{currentPatent.assignee}</span>
                  </p>
                </div>
              </div>

              {/* 生产信息 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  生产制造
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">生产工厂：</span>
                    <span className="font-medium">{currentPatent.manufacturingInfo.facility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">质量认证：</span>
                    <span className="font-medium">{currentPatent.manufacturingInfo.certification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">年产能：</span>
                    <span className="font-medium">{currentPatent.manufacturingInfo.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">产品纯度：</span>
                    <span className="font-medium text-green-600">{currentPatent.manufacturingInfo.quality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">质量检测：</span>
                    <span className="font-medium">{currentPatent.manufacturingInfo.testing}</span>
                  </div>
                </div>
              </div>

              {/* 临床试验 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  临床试验
                </h5>
                {currentPatent.clinicalTrials.map((trial, index) => <div key={index} className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">试验阶段：</span>
                      <span className="font-medium">{trial.phase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">参与人数：</span>
                      <span className="font-medium">{trial.participants}人</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">试验周期：</span>
                      <span className="font-medium">{trial.duration}</span>
                    </div>
                    <div className="mt-2 p-2 bg-green-50 rounded text-green-800">
                      <strong>结果：</strong>{trial.results}
                    </div>
                    <div className="text-xs text-gray-500">
                      发表于：{trial.published}
                    </div>
                  </div>)}
              </div>

              {/* 监管批准 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  全球监管批准
                </h5>
                <div className="space-y-2">
                  {currentPatent.regulatoryApprovals.map((approval, index) => <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{approval.country}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getRegulatoryStatusColor(approval.status)}`}>
                          {approval.status}
                        </span>
                      </div>
                      <span className="text-gray-500">{formatDate(approval.date)}</span>
                    </div>)}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  查看专利全文
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  下载质检报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>}
    </>;
}