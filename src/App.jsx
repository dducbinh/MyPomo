import { useState } from 'react'
import PomodoroTimer from './components/PomodoroTimer'
import BottomNav from './components/BottomNav'
import TopBar from './components/TopBar'

export default function App() {
  const [activePage, setActivePage] = useState('timer')

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <TopBar />

        <main className="flex-1 flex items-center justify-center px-4">
          {activePage === 'timer' && <PomodoroTimer />}
          {activePage === 'rooms' && <ComingSoon icon="🏠" label="Study Rooms" />}
          {activePage === 'chat' && <ComingSoon icon="💬" label="Chat" />}
          {activePage === 'music' && <ComingSoon icon="🎵" label="Music" />}
          {activePage === 'bg' && <ComingSoon icon="🖼" label="Background" />}
          {activePage === 'weather' && <ComingSoon icon="🌤" label="Weather" />}
        </main>

        <BottomNav activePage={activePage} onNavigate={setActivePage} />
      </div>

    </div>
  )
}

function ComingSoon({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-6xl">{icon}</span>
      <p className="text-white/60 text-lg">{label} — Coming soon</p>
    </div>
  )
}