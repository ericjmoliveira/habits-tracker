import { BsCheckLg } from 'react-icons/bs';

export default function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What is your commitment?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Do exercises, sleep well, etc..."
        className="mt-3 p-4 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-400"
        autoFocus
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        What is the recurrence?
      </label>
      <button className="flex items-center justify-center gap-3 mt-6 p-4 bg-green-600 font-semibold rounded-lg hover:bg-green-500">
        <BsCheckLg className="font-bold" />
        Confirm
      </button>
    </form>
  );
}
