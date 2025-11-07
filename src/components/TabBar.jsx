// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Activity, ShoppingBag, User, Target } from 'lucide-react';

export function TabBar({
  activeTab,
  onTabChange
}) {
  const tabs = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'detection',
    label: '检测',
    icon: Activity
  }, {
    id: 'mall',
    label: '商城',
    icon: ShoppingBag
  }, {
    id: 'plan',
    label: '方案',
    icon: Target
  }, {
    id: 'profile',
    label: '我的',
    icon: User
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map(tab => {
        const Icon = tab.icon;
        return <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>;
      })}
      </div>
    </div>;
}