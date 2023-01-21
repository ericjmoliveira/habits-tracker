import { View, ScrollView, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import BackButton from '../../components/back-button';
import ProgressBar from '../../components/progress-bar';
import Checkbox from '../../components/checkbox';

interface Params {
  date: string;
}

export default function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;
  const parseDate = dayjs(date);
  const dayOfWeek = parseDate.format('dddd');
  const dayOfMonth = parseDate.format('DD/MM');

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-base text-zinc-400 font-semibold">{dayOfWeek}</Text>
        <Text className="mt-6 text-3xl text-white font-extrabold">{dayOfMonth}</Text>
        <ProgressBar progress={30} />
        <View className="mt-6">
          <Checkbox title="Drink 2L of water" checked={false} />
          <Checkbox title="Go for a walk" checked={true} />
        </View>
      </ScrollView>
    </View>
  );
}
