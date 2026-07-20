export default function ModeSwitch({ mode, onChange }) {
  const isStopwatch = mode === 'stopwatch'

  return (
    <div className="flex items-center justify-center gap-3 select-none">
      <span className={`font-mono text-xs tracking-[0.2em] uppercase transition-colors ${isStopwatch ? 'text-amber-400' : 'text-steel-500'}`}>
        Stopwatch
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={!isStopwatch}
        aria-label="Toggle between stopwatch and timer"
        onClick={() => onChange(isStopwatch ? 'timer' : 'stopwatch')}
        className="relative h-8 w-16 rounded-full bg-graphite-800 shadow-inset border border-graphite-600 transition-colors"
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full transition-all duration-300 ease-out shadow-lg ${
            isStopwatch
              ? 'left-1 bg-amber-400 shadow-glowAmber'
              : 'left-9 bg-cyan-400 shadow-glowCyan'
          }`}
        />
      </button>

      <span className={`font-mono text-xs tracking-[0.2em] uppercase transition-colors ${!isStopwatch ? 'text-cyan-400' : 'text-steel-500'}`}>
        Timer
      </span>
    </div>
  )
}
