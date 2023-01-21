import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export default function Checkbox({ title, checked = false, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className="flex-row items-center mb-2" {...rest}>
      {checked ? (
        <View className="h-8 w-8 items-center justify-center bg-green-500 rounded-lg">
          <Feather name="check" size={20} color={colors.white} />
        </View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg"></View>
      )}

      <Text className="ml-3 text-white text-base font-semibold">{title} </Text>
    </TouchableOpacity>
  );
}
