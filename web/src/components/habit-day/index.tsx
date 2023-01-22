import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { BsCheckLg } from 'react-icons/bs';
import clsx from 'clsx';

import ProgressBar from '../progress-bar';

interface HabitDayProps {
  date: Date;
  amount?: number;
  completed?: number;
}

export default function HabitDay({ amount = 0, completed = 0, date }: HabitDayProps) {
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);
  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg', {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-400': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-300': completedPercentage >= 80,
          'border-4 border-white': isCurrentDay
        })}
      ></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] flex flex-col p-6 bg-zinc-900 rounded-2xl">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 text-3xl font-extrabold leading-tight">{dayAndMonth}</span>
          <ProgressBar progress={completedPercentage} />
          <div className="flex flex-col gap-3 mt-6">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="h-8 w-8 flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <BsCheckLg />
                </Checkbox.Indicator>
              </div>
              <span className="text-xl text-white font-semibold leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Drink 2L of water
              </span>
            </Checkbox.Root>
          </div>
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
