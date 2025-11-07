// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { FileText, ShoppingBag, Activity, Target, Plus } from 'lucide-react';

export function EmptyState({
  type = 'default',
  title,
  description,
  actionText,
  onAction
}) {
  const getIcon = () => {
    switch (type) {
      case 'reports':
        return <FileText className="w-16 h-16 text-gray-300" />;
      case 'orders':
        return <ShoppingBag className="w-16 h-16 text-gray-300" />;
      case 'detection':
        return <Activity className="w-16 h-16 text-gray-300" />;
      case 'plans':
        return <Target className="w-16 h-16 text-gray-300" />;
      default:
        return <FileText className="w-16 h-16 text-gray-300" />;
    }
  };
  const getDefaultTitle = () => {
    switch (type) {
      case 'reports':
        return '暂无检测报告';
      case 'orders':
        return '暂无订单记录';
      case 'detection':
        return '暂无检测数据';
      case 'plans':
        return '暂无健康计划';
      default:
        return '暂无数据';
    }
  };
  const getDefaultDescription = () => {
    switch (type) {
      case 'reports':
        return '上传您的第一份检测报告，开始健康分析之旅';
      case 'orders':
        return '浏览商城，选择您需要的健康产品';
      case 'detection':
        return '开始您的第一次健康检测';
      case 'plans':
        return '创建您的第一个健康计划，开启健康生活';
      default:
        return '暂无相关内容';
    }
  };
  return <div className="flex flex-col items-center justify-center p-8 text-center">
      {getIcon()}
      <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
        {title || getDefaultTitle()}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {description || getDefaultDescription()}
      </p>
      {actionText && onAction && <button onClick={onAction} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          {actionText}
        </button>}
    </div>;
}