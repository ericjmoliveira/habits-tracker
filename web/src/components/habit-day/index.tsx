import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

import ProgressBar from '../progress-bar';

interface HabitDayProps {
  amount: number;
  completed: number;
}

export default function HabitDay({ amount, completed }: HabitDayProps) {
  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg', {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-400': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-300': completedPercentage >= 80
        })}
      ></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] flex flex-col p-6 bg-zinc-900 rounded-2xl">
          <span className="font-semibold text-zinc-400">Saturday</span>
          <span className="mt-1 text-3xl font-extrabold leading-tight">21/01</span>
          <ProgressBar progress={completedPercentage} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
