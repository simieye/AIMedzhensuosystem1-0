// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';

export function KnowledgeEditor({
  knowledge,
  onSave,
  onCancel
}) {
  const [formData, setFormData] = useState({
    title: knowledge?.title || '',
    content: knowledge?.content || '',
    summary: knowledge?.summary || '',
    category: knowledge?.category || 'other',
    subcategory: knowledge?.subcategory || 'general',
    source: knowledge?.source || '',
    author: knowledge?.author || '',
    keywords: knowledge?.keywords || [],
    tags: knowledge?.tags || [],
    difficultyLevel: knowledge?.difficultyLevel || 'beginner',
    targetAudience: knowledge?.targetAudience || ['普通用户'],
    language: knowledge?.language || 'zh'
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [newTag, setNewTag] = useState('');
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };
  const handleRemoveKeyword = keyword => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };
  const handleRemoveTag = tag => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  const handleSave = () => {
    onSave({
      ...formData,
      id: knowledge?.id || null,
      lastUpdated: new Date()
    });
  };
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              {knowledge?.id ? '编辑知识' : '新建知识'}
            </CardTitle>
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                保存
              </Button>
              <Button variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                取消
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
              <input type="text" value={formData.title} onChange={e => handleInputChange('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="输入知识标题" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">作者</label>
              <input type="text" value={formData.author} onChange={e => handleInputChange('author', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="输入作者名称" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">摘要</label>
            <textarea value={formData.summary} onChange={e => handleInputChange('summary', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="输入知识摘要"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
            <textarea value={formData.content} onChange={e => handleInputChange('content', e.target.value)} rows={8} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="输入知识内容"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select value={formData.category} onChange={e => handleInputChange('category', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="anti_aging">抗衰老</option>
                <option value="nutrition">营养学</option>
                <option value="exercise">运动健康</option>
                <option value="supplements">补充剂</option>
                <option value="mental_health">心理健康</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">子分类</label>
              <input type="text" value={formData.subcategory} onChange={e => handleInputChange('subcategory', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="输入子分类" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">难度等级</label>
              <select value={formData.difficultyLevel} onChange={e => handleInputChange('difficultyLevel', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="beginner">初级</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">来源</label>
            <input type="text" value={formData.source} onChange={e => handleInputChange('source', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="输入知识来源" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">关键词</label>
            <div className="flex space-x-2 mb-2">
              <input type="text" value={newKeyword} onChange={e => setNewKeyword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddKeyword()} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="输入关键词" />
              <Button onClick={handleAddKeyword} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.keywords.map((keyword, index) => <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {keyword}
                  <button onClick={() => handleRemoveKeyword(keyword)} className="ml-2 text-blue-600 hover:text-blue-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
            <div className="flex space-x-2 mb-2">
              <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddTag()} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="输入标签" />
              <Button onClick={handleAddTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-green-600 hover:text-green-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}