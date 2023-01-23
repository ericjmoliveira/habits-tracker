import { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import clsx from 'clsx';

import BackButton from '../../components/back-button';
import ProgressBar from '../../components/progress-bar';
import Checkbox from '../../components/checkbox';
import Loading from '../../components/loading';
import HabitsEmpty from '../../components/habits-empty';
import { api } from '../../lib/axios';
import { generateProgressPercentage } from '../../helpers/habits';

interface Params {
  date: string;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export default function Habit() {
  const [loading, setLoading] = useState(true);
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const [completedHabits, setCompletedHabits] = useState<string[]>();

  const route = useRoute();
  const { date } = route.params as Params;
  const parseDate = dayjs(date);
  const dayOfWeek = parseDate.format('dddd');
  const dayOfMonth = parseDate.format('DD/MM');
  const progress = habitsInfo?.possibleHabits.length
    ? generateProgressPercentage(habitsInfo.possibleHabits.length, completedHabits?.length!)
    : 0;
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await api.get('/day', { params: { date } });
      setHabitsInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'An error occurred, try again later!');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits!.includes(habitId)) {
        setCompletedHabits((prevState) => prevState!.filter((id) => id !== habitId));
      } else {
        setCompletedHabits((prevState) => [...prevState!, habitId]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'An error occurred, try again later!');
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-base text-zinc-400 font-semibold">{dayOfWeek}</Text>
        <Text className="mt-6 text-3xl text-white font-extrabold">{dayOfMonth}</Text>
        <ProgressBar progress={progress} />
        <View className={clsx('mt-6', { ['opacity-50']: isDateInPast })}>
          {habitsInfo?.possibleHabits ? (
            habitsInfo?.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits?.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}

          {isDateInPast && (
            <Text className="mt-10 text-white text-center">
              You can't edit habits of a past date
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
