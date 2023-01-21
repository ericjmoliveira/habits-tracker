import { BsPlusLg } from 'react-icons/bs';

import logoImage from '../../assets/logo.svg';

export default function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="Habits logo" />
      <button className="flex items-center gap-3 px-6 py-4 border border-violet-500 font-semibold rounded-lg hover:border-violet-300">
        <BsPlusLg className="text-violet-500" />
        New habit
      </button>
    </header>
  );
}
