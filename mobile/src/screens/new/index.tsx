import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import BackButton from '../../components/back-button';
import Checkbox from '../../components/checkbox';
import { api } from '../../lib/axios';

const availableWeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function New() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex));
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  };

  const handleCreateNewHabit = async () => {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert('New habit', 'Inform the habit and choose the periodicity');
      }
      await api.post('/habits', { title, weekDays });

      setTitle('');
      setWeekDays([]);

      Alert.alert('New habit', 'Habit created successfully!');
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'An error occurred, try again later');
    }
  };

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-3xl text-white font-extrabold">Create habit</Text>
        <Text className="mt-6 text-base text-white font-semibold">What is your commitment?</Text>
        <TextInput
          className="h-12 mt-3 pl-4 bg-zinc-900 text-white rounded-lg border-2 border-zinc-800 focus:border-green-600"
          placeholder="Do exercises, sleep well, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />
        <Text className="mt-4 mb-3 text-base text-white font-semibold">
          What is the recurrence?
        </Text>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center mt-6 bg-green-600 rounded-md"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="ml-2 text-base text-white font-semibold">Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
