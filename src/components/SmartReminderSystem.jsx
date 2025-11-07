// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Bell, Clock, Sun, Moon, Pill, Volume2, VolumeX, Play, Pause, Settings, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export function SmartReminderSystem({
  onReminderComplete,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reminderTime, setReminderTime] = useState('07:00');
  const [reminderSound, setReminderSound] = useState(true);
  const [nextReminder, setNextReminder] = useState(null);
  const [reminderHistory, setReminderHistory] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const speechSynthesis = window.speechSynthesis;

  // 抗衰保护剂清单
  const antiAgingSupplements = [{
    id: 'nmn',
    name: 'NMN',
    description: '提升NAD+水平，延缓细胞衰老',
    time: '07:00',
    dosage: '250mg',
    frequency: '每日一次',
    color: 'bg-blue-500'
  }, {
    id: 'resveratrol',
    name: '白藜芦醇',
    description: '抗氧化，保护心血管健康',
    time: '08:00',
    dosage: '200mg',
    frequency: '每日一次',
    color: 'bg-purple-500'
  }, {
    id: 'coq10',
    name: '辅酶Q10',
    description: '增强心脏功能，提高能量代谢',
    time: '12:00',
    dosage: '100mg',
    frequency: '每日一次',
    color: 'bg-red-500'
  }, {
    id: 'vitamin_d',
    name: '维生素D3',
    description: '促进钙吸收，增强免疫力',
    time: '18:00',
    dosage: '2000IU',
    frequency: '每日一次',
    color: 'bg-yellow-500'
  }];
  useEffect(() => {
    // 更新当前时间
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 检查提醒时间
    const checkReminder = setInterval(() => {
      const now = new Date();
      const currentTimeStr = now.toTimeString().slice(0, 5);
      antiAgingSupplements.forEach(supplement => {
        if (currentTimeStr === supplement.time && !reminderHistory.includes(`${supplement.id}-${now.toDateString()}`)) {
          triggerReminder(supplement);
        }
      });
    }, 60000); // 每分钟检查一次

    return () => {
      clearInterval(timer);
      clearInterval(checkReminder);
    };
  }, [reminderHistory]);
  const triggerReminder = supplement => {
    setIsReminderActive(true);
    setNextReminder(supplement);

    // 语音提醒
    if (reminderSound) {
      speakReminder(supplement);
    }

    // 添加到历史记录
    const today = new Date().toDateString();
    setReminderHistory(prev => [...prev, `${supplement.id}-${today}`]);

    // 自动关闭提醒
    setTimeout(() => {
      setIsReminderActive(false);
      setNextReminder(null);
    }, 30000); // 30秒后自动关闭

    toast({
      title: "服药提醒",
      description: `该服用${supplement.name}了，${supplement.dosage}${supplement.id === 'vitamin_d' ? 'IU' : 'mg'}`,
      duration: 5000
    });
  };
  const speakReminder = supplement => {
    if ('speechSynthesis' in window) {
      const text = `早上好，现在是${supplement.time}，该服用您的${supplement.description}了。请服用${supplement.dosage}${supplement.id === 'vitamin_d' ? '国际单位' : '毫克'}的${supplement.name}，祝您健康长寿！`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      speechSynthesis.speak(utterance);
    }
  };
  const handleManualReminder = supplement => {
    triggerReminder(supplement);
  };
  const handleMarkComplete = supplementId => {
    const today = new Date().toDateString();
    setReminderHistory(prev => [...prev, `${supplementId}-${today}`]);
    toast({
      title: "已完成",
      description: "已标记为已完成，继续保持！"
    });
    if (isReminderActive) {
      setIsReminderActive(false);
      setNextReminder(null);
    }
  };
  const handleSnooze = () => {
    if (nextReminder) {
      setTimeout(() => {
        triggerReminder(nextReminder);
      }, 10 * 60 * 1000); // 10分钟后再次提醒
    }
    setIsReminderActive(false);
    setNextReminder(null);
  };
  const toggleSound = () => {
    setReminderSound(!reminderSound);
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };
  const isCompletedToday = supplementId => {
    const today = new Date().toDateString();
    return reminderHistory.includes(`${supplementId}-${today}`);
  };
  const formatTime = time => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            AI智能提醒系统
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{currentTime.toLocaleTimeString()}</span>
            <button onClick={toggleSound} className={`p-2 rounded ${reminderSound ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              {reminderSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 当前提醒弹窗 */}
        {isReminderActive && nextReminder && <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${nextReminder.color} rounded-full flex items-center justify-center`}>
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">服药提醒</h3>
                  <p className="text-sm text-gray-600">{currentTime.toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${nextReminder.color} text-white`}>
                  {nextReminder.name}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 mb-2">{nextReminder.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>剂量: <strong>{nextReminder.dosage}{nextReminder.id === 'vitamin_d' ? 'IU' : 'mg'}</strong></span>
                <span>频次: <strong>{nextReminder.frequency}</strong></span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={() => handleMarkComplete(nextReminder.id)} className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                已服用
              </Button>
              <Button variant="outline" onClick={handleSnooze} className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                稍后提醒
              </Button>
            </div>
          </div>}

        {/* 今日服药计划 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            今日抗衰保护剂计划
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {antiAgingSupplements.map(supplement => {
            const isCompleted = isCompletedToday(supplement.id);
            return <div key={supplement.id} className={`border rounded-lg p-4 ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${supplement.color} rounded-full flex items-center justify-center`}>
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">{supplement.name}</h5>
                      <p className="text-sm text-gray-600">{formatTime(supplement.time)}</p>
                    </div>
                  </div>
                  {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{supplement.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{supplement.dosage}{supplement.id === 'vitamin_d' ? 'IU' : 'mg'}</span>
                  <div className="flex space-x-2">
                    {!isCompleted && <Button size="sm" variant="outline" onClick={() => handleManualReminder(supplement)}>
                        <Bell className="w-3 h-3 mr-1" />
                        提醒
                      </Button>}
                    <Button size="sm" variant={isCompleted ? "outline" : "default"} onClick={() => handleMarkComplete(supplement.id)} className={isCompleted ? "text-green-600 border-green-200" : ""}>
                      {isCompleted ? '已完成' : '标记完成'}
                    </Button>
                  </div>
                </div>
              </div>;
          })}
          </div>
        </div>

        {/* 提醒设置 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            智能提醒设置
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">默认叫醒时间</label>
              <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">语音提醒</label>
              <div className="flex items-center space-x-3">
                <button onClick={toggleSound} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${reminderSound ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${reminderSound ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm text-gray-600">{reminderSound ? '已开启' : '已关闭'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 服药统计 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">今日服药进度</h4>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-700">完成进度</span>
                <span className="text-sm font-semibold text-blue-800">
                  {reminderHistory.filter(id => id.endsWith(new Date().toDateString())).length} / {antiAgingSupplements.length}
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
                width: `${reminderHistory.filter(id => id.endsWith(new Date().toDateString())).length / antiAgingSupplements.length * 100}%`
              }}></div>
              </div>
            </div>
            <div className="ml-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(reminderHistory.filter(id => id.endsWith(new Date().toDateString())).length / antiAgingSupplements.length * 100)}%
              </div>
              <div className="text-xs text-blue-600">完成率</div>
            </div>
          </div>
        </div>
      </CardContent>
    </div>;
}