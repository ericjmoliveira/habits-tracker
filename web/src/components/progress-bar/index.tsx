interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 w-full mt-4 bg-zinc-700 rounded-xl">
      <div
        role="progressbar"
        aria-label="Progress of habits completed on this day"
        aria-valuenow={progress}
        className="h-3 w-3/4 bg-violet-600 rounded-xl"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
