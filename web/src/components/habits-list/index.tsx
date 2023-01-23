import { useState, useEffect } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';
import { BsCheckLg } from 'react-icons/bs';
import { api } from '../../lib/axios';
import dayjs from 'dayjs';

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export default function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get('/day', {
        params: {
          date: date.toISOString()
        }
      })
      .then((response) => setHabitsInfo(response.data));
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter((id) => id !== habitId);
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({ possibleHabits: habitsInfo!.possibleHabits, completedHabits });
    onCompletedChanged(completedHabits.length);
  };

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  return (
    <div className="flex flex-col gap-3 mt-6">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          checked={habitsInfo.completedHabits.includes(habit.id)}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          disabled={isDateInPast}
        >
          <div className="h-8 w-8 flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <BsCheckLg />
            </Checkbox.Indicator>
          </div>
          <span className="text-xl text-white font-semibold leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
