import { useEffect, useRef, useState } from 'react';

export const useAudio = () => {
  const [audioLevel, setAudioLevel] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        const audioContext = new AudioContext();

        // マイクから音声を取得
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const source = audioContext.createMediaStreamSource(stream);

        // 音声データを分析
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;
        source.connect(analyser);

        // 周波数データを取得
        const frequencyArray = new Uint8Array(analyser.frequencyBinCount);

        const updateAudioData = () => {
          analyser.getByteFrequencyData(frequencyArray);
          const average =
            frequencyArray.reduce((a, b) => a + b, 0) / frequencyArray.length;
          setAudioLevel(average / 255);
          requestAnimationFrame(updateAudioData);
        };
        updateAudioData();
      } catch (error) {
        console.error('Failed to access microphone:', error);
      }
    };

    setupAudio();
  }, []);

  return { audioLevel };
};
