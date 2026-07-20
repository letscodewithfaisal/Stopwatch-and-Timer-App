import { useEffect, useRef, useState } from 'react'

function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10)
  const centiseconds = totalCentiseconds % 100
  const totalSeconds = Math.floor(totalCentiseconds / 100)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  const pad = (n, len = 2) => String(n).padStart(len, '0')

  return {
    display: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    centis: pad(centiseconds),
  }
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])

  const startRef = useRef(null)
  const baseRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!running) return

    const tick = () => {
      setElapsed(baseRef.current + (Date.now() - startRef.current))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [running])

  const handleStart = () => {
    startRef.current = Date.now()
    setRunning(true)
  }

  const handlePause = () => {
    baseRef.current = elapsed
    setRunning(false)
  }

  const handleReset = () => {
    setRunning(false)
    setElapsed(0)
    baseRef.current = 0
    setLaps([])
  }

  const handleLap = () => {
    if (!running) return
    setLaps((prev) => [{ id: prev.length + 1, time: elapsed }, ...prev])
  }

  const { display, centis } = formatTime(elapsed)

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center justify-center w-full max-w-md aspect-square rounded-full bg-graphite-800 panel-texture border border-graphite-600 shadow-inset">
        <div className="absolute top-8 flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${running ? 'bg-amber-400 animate-pulse' : 'bg-graphite-600'}`}
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-steel-500">
            {running ? 'Running' : elapsed > 0 ? 'Paused' : 'Ready'}
          </span>
        </div>

        <div
          className="font-mono tabular text-5xl sm:text-6xl font-semibold text-steel-300 tracking-tight"
          aria-live="off"
        >
          {display}
          <span className="text-2xl sm:text-3xl text-amber-400/80">.{centis}</span>
        </div>

        <div className="absolute bottom-10 flex gap-3">
          {!running ? (
            <button
              onClick={handleStart}
              className="px-6 py-2.5 rounded-full bg-amber-400 text-graphite-950 font-semibold text-sm tracking-wide shadow-glowAmber hover:bg-amber-500 active:scale-95 transition"
            >
              {elapsed > 0 ? 'Resume' : 'Start'}
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
            onClick={running ? handleLap : handleReset}
            disabled={!running && elapsed === 0}
            className="px-6 py-2.5 rounded-full bg-transparent text-steel-400 font-semibold text-sm tracking-wide border border-graphite-600 hover:text-steel-300 hover:border-graphite-500 active:scale-95 transition disabled:opacity-30 disabled:pointer-events-none"
          >
            {running ? 'Lap' : 'Reset'}
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="w-full max-w-md mt-8">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-steel-500">Laps</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-steel-500">{laps.length}</span>
          </div>
          <ul className="max-h-48 overflow-y-auto rounded-lg border border-graphite-700 divide-y divide-graphite-700">
            {laps.map((lap) => {
              const t = formatTime(lap.time)
              return (
                <li
                  key={lap.id}
                  className="flex items-center justify-between px-4 py-2.5 bg-graphite-800/50 font-mono text-sm text-steel-300 tabular"
                >
                  <span className="text-steel-500">Lap {String(lap.id).padStart(2, '0')}</span>
                  <span>
                    {t.display}
                    <span className="text-amber-400/70">.{t.centis}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
