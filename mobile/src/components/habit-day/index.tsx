import { Dimensions, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const WEEK_DAYS = 7;
const HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = Dimensions.get('screen').width / WEEK_DAYS - HORIZONTAL_PADDING - 5;

interface HabitDayProps extends TouchableOpacityProps {}

export default function HabitDay({ ...rest }: HabitDayProps) {
  return (
    <TouchableOpacity
      className="bg-zinc-900 m-1 border-2 border-zinc-800 rounded-lg"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
