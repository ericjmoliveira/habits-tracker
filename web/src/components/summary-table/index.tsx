import { useEffect, useState } from 'react';

import HabitDay from '../habit-day';
import { generateDatesFromYearStart } from '../../helpers/date';
import { api } from '../../lib/axios';
import dayjs from 'dayjs';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const summaryDates = generateDatesFromYearStart();
const minimiumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimiumSummaryDatesSize - summaryDates.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export default function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get('/summary').then((response) => setSummary(response.data));
  }, []);

  return (
    <section className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="w-10 h-10 flex items-center justify-center text-zinc-400 text-xl font-bold"
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, 'day');
          });

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
        })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              ></div>
            );
          })}
      </div>
    </section>
  );
}
