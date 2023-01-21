import * as Dialog from '@radix-ui/react-dialog';
import { BsPlusLg, BsXLg } from 'react-icons/bs';

import NewHabitForm from '../new-habit-form';
import logoImage from '../../assets/logo.svg';

export default function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="Habits logo" />
      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="flex items-center gap-3 px-6 py-4 border border-violet-500 font-semibold rounded-lg hover:border-violet-300"
        >
          <BsPlusLg className="text-violet-500" />
          New habit
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
          <Dialog.Content className="absolute w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-zinc-900 rounded-2xl">
            <Dialog.Title className="text-3xl leading-tight font-extrabold">
              Create habit
            </Dialog.Title>
            <NewHabitForm />
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
              <BsXLg />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
