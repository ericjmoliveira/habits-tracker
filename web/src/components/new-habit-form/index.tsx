import { FormEvent, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import * as Checkbox from '@radix-ui/react-checkbox';

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

export default function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const handleCreateNewHabit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || weekDays.length === 0) {
      return;
    }

    await api.post('/habits', { title, weekDays });
    alert('Habit created successfully!');

    setTitle('');
    setWeekDays([]);
  };

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay != weekDayIndex));
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  };

  return (
    <form onSubmit={handleCreateNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What is your commitment?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Do exercises, sleep well, etc..."
        className="mt-3 p-4 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        What is the recurrence?
      </label>
      {availableWeekDays.map((weekDay, index) => (
        <div key={weekDay} className="flex flex-col gap-2 mt-3">
          <Checkbox.Root
            className="flex items-center gap-3 group focus:outline-none"
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className="h-8 w-8 flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <BsCheckLg />
              </Checkbox.Indicator>
            </div>
            <span className="text-white leading-tight">{weekDay}</span>
          </Checkbox.Root>
        </div>
      ))}

      <button className="flex items-center justify-center gap-3 mt-6 p-4 bg-green-600 font-semibold rounded-lg hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
        <BsCheckLg className="font-bold" />
        Confirm
      </button>
    </form>
  );
}
