import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HabitDay, { DAY_SIZE } from '../../components/habit-day';
import Header from '../../components/header';
import { generateDatesFromYearStart } from '../../helpers/date';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const datesFromYearStart = generateDatesFromYearStart();
const minimiumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimiumSummaryDatesSize - datesFromYearStart.length;

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className="mx-1 text-xl text-zinc-400 font-bold text-center"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate('habit', { date: date.toISOString() })}
            />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => {
              return (
                <View
                  key={index}
                  className="bg-zinc-900 m-1 border-2 border-zinc-800 rounded-lg opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                ></View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
