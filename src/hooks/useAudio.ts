import { useEffect, useRef, useState } from 'react';

// AudioContextの型定義を追加
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export const useAudio = () => {
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const setupAudio = async () => {
      try {
        // AudioContextの初期化
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        // マイクストリームの取得
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const source = audioContext.createMediaStreamSource(stream);

        // アナライザーの設定
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);

        // 音声データの更新
        const updateAudioData = () => {
          const frequencyArray = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(frequencyArray);

          const average =
            frequencyArray.reduce((a, b) => a + b, 0) / frequencyArray.length;
          setAudioLevel(average / 255);

          animationFrameId = requestAnimationFrame(updateAudioData);
        };

        // 音声処理の開始
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        updateAudioData();
      } catch (error) {
        console.error('Failed to access microphone:', error);
      }
    };

    setupAudio();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return { audioLevel };
};
