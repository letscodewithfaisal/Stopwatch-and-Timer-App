import { useState } from 'react'
import ModeSwitch from './components/ModeSwitch.jsx'
import Stopwatch from './components/Stopwatch.jsx'
import Timer from './components/Timer.jsx'

export default function App() {
  const [mode, setMode] = useState('stopwatch')

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 sm:py-16">
      <header className="text-center mb-10">
        <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-steel-500 mb-2">
          Precision Instrument
        </p>
        <h1 className="font-mono text-2xl sm:text-3xl font-semibold text-steel-300 tracking-tight">
          ChronoDeck
        </h1>
      </header>

      <div className="mb-10">
        <ModeSwitch mode={mode} onChange={setMode} />
      </div>

      <main className="w-full flex justify-center">
        {mode === 'stopwatch' ? <Stopwatch /> : <Timer />}
      </main>

      <footer className="mt-16 font-mono text-[10px] tracking-[0.3em] uppercase text-steel-600">
        Built with React
      </footer>
    </div>
  )
}
