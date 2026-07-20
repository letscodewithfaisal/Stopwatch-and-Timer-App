import { useEffect, useRef, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

function msToParts(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { hours, minutes, seconds }
}

const RADIUS = 130
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function Timer() {
  const [inputHours, setInputHours] = useState(0)
  const [inputMinutes, setInputMinutes] = useState(5)
  const [inputSeconds, setInputSeconds] = useState(0)

  const [totalMs, setTotalMs] = useState(0)
  const [remainingMs, setRemainingMs] = useState(0)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)

  const targetRef = useRef(null)
  const rafRef = useRef(null)

  const hasCustomTime = inputHours + inputMinutes + inputSeconds > 0
  const isConfigured = totalMs > 0
  const isIdle = !running && !isConfigured

  useEffect(() => {
    if (!running) return

    const tick = () => {
      const remaining = targetRef.current - Date.now()
      if (remaining <= 0) {
        setRemainingMs(0)
        setRunning(false)
        setFinished(true)
        return
      }
      setRemainingMs(remaining)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [running])

  const handleStart = () => {
    setFinished(false)
    let base = remainingMs
    if (!isConfigured) {
      base = (inputHours * 3600 + inputMinutes * 60 + inputSeconds) * 1000
      setTotalMs(base)
      setRemainingMs(base)
    }
    targetRef.current = Date.now() + base
    setRunning(true)
  }

  const handlePause = () => {
    setRunning(false)
    setRemainingMs(Math.max(0, targetRef.current - Date.now()))
  }

  const handleReset = () => {
    setRunning(false)
    setFinished(false)
    setTotalMs(0)
    setRemainingMs(0)
  }

  const { hours, minutes, seconds } = msToParts(remainingMs)
  const progress = totalMs > 0 ? remainingMs / totalMs : 1
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  const numberField = (value, setValue, label, max) => (
    <div className="flex flex-col items-center gap-1">
      <input
        type="number"
        min="0"
        max={max}
        value={value}
        disabled={running || isConfigured}
        onChange={(e) => {
          const v = Math.min(max, Math.max(0, Number(e.target.value) || 0))
          setValue(v)
        }}
        className="w-16 sm:w-20 text-center font-mono tabular text-3xl sm:text-4xl font-semibold bg-transparent text-steel-300 border-b-2 border-graphite-600 focus:border-cyan-400 outline-none py-1 disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label={label}
      />
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-steel-500">{label}</span>
    </div>
  )

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
        <svg viewBox="0 0 300 300" className="absolute inset-0 -rotate-90">
          <circle cx="150" cy="150" r={RADIUS} fill="none" stroke="#23262E" strokeWidth="10" />
          <circle
            cx="150"
            cy="150"
            r={RADIUS}
            fill="none"
            stroke={finished ? '#FF5C5C' : '#4FD8E8'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={isConfigured || running ? dashOffset : 0}
            style={{ transition: running ? 'none' : 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>

        <div className="relative flex flex-col items-center justify-center gap-4">
          {isIdle ? (
            <div className="flex items-end gap-2">
              {numberField(inputHours, setInputHours, 'HH', 23)}
              <span className="text-3xl sm:text-4xl text-steel-600 pb-5">:</span>
              {numberField(inputMinutes, setInputMinutes, 'MM', 59)}
              <span className="text-3xl sm:text-4xl text-steel-600 pb-5">:</span>
              {numberField(inputSeconds, setInputSeconds, 'SS', 59)}
            </div>
          ) : (
            <>
              <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${finished ? 'text-alert-500' : 'text-steel-500'}`}>
                {finished ? "Time's up" : running ? 'Counting down' : 'Paused'}
              </span>
              <div className="font-mono tabular text-2xl sm:text-5xl font-semibold text-steel-300 tracking-tight whitespace-nowrap px-4">
  {pad(hours)}:{pad(minutes)}:{pad(seconds)}
</div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        {!running ? (
          <button
            onClick={handleStart}
            disabled={isIdle && !hasCustomTime}
            className="px-6 py-2.5 rounded-full bg-cyan-400 text-graphite-950 font-semibold text-sm tracking-wide shadow-glowCyan hover:bg-cyan-500 active:scale-95 transition disabled:opacity-30 disabled:pointer-events-none"
          >
            {isConfigured ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-2.5 rounded-full bg-graphite-700 text-steel-300 font-semibold text-sm tracking-wide border border-graphite-600 hover:bg-graphite-600 active:scale-95 transition"
          >
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          disabled={isIdle}
          className="px-6 py-2.5 rounded-full bg-transparent text-steel-400 font-semibold text-sm tracking-wide border border-graphite-600 hover:text-steel-300 hover:border-graphite-500 active:scale-95 transition disabled:opacity-30 disabled:pointer-events-none"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
