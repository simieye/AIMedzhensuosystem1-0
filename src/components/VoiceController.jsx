// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

export function VoiceController({
  onVoiceCommand,
  onSpeechEnd,
  enabled = true
}) {
  const {
    toast
  } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  useEffect(() => {
    // 检查语音识别和语音合成支持
    const recognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    const synthesisSupported = 'speechSynthesis' in window;
    setSpeechSupported(recognitionSupported && synthesisSupported);
    synthRef.current = window.speechSynthesis;
    if (recognitionSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'zh-CN';
      recognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setIsListening(false);
        if (onVoiceCommand) {
          onVoiceCommand(transcript);
        }
      };
      recognitionRef.current.onerror = event => {
        setIsListening(false);
        toast({
          title: "语音识别错误",
          description: event.error,
          variant: "destructive"
        });
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (onSpeechEnd) {
          onSpeechEnd();
        }
      };
    }
  }, [onVoiceCommand, onSpeechEnd, toast]);
  const startListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      toast({
        title: "语音功能不可用",
        description: "您的浏览器不支持语音识别功能",
        variant: "destructive"
      });
      return;
    }
    try {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "开始语音识别",
        description: "请说出您的指令..."
      });
    } catch (error) {
      toast({
        title: "启动失败",
        description: "语音识别启动失败",
        variant: "destructive"
      });
    }
  };
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  const speak = (text, options = {}) => {
    if (!speechSupported || !synthRef.current) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      // 停止当前语音
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = event => {
        setIsSpeaking(false);
        reject(event.error);
      };
      synthRef.current.speak(utterance);
    });
  };
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // 暴露方法给父组件
  React.useImperativeHandle(React.createRef(), () => ({
    speak,
    stopSpeaking,
    startListening,
    stopListening
  }));
  return {
    isListening,
    isSpeaking,
    speechSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  };
}