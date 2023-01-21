import { View } from 'react-native';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View className="w-full h-3 mt-4 bg-zinc-700 rounded-xl">
      <View className="h-3 bg-violet-600" style={{ width: `${progress}%` }}></View>
    </View>
  );
}
