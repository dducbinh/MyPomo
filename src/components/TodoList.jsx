import { useEffect, useRef } from 'react'
import { useTodos } from '../hooks/useTodos'
import { useState } from 'react'

const PRIORITY_STYLES = {
  high:   'bg-red-500/20 text-red-300 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  low:    'bg-green-500/20 text-green-300 border-green-500/30',
}

export default function TodoList({ onClose }) {
  const { todos, addTodo, toggleTodo, deleteTodo, setPriority } = useTodos()
  const [inputText, setInputText] = useState('')
  const [filter, setFilter]       = useState('all')
  const overlayRef                = useRef(null)

  // Click outside để đóng
  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose()
  }

  // Phím Escape để đóng
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    addTodo(inputText)
    setInputText('')
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'done')   return todo.completed
    return true
  })

  const doneCount   = todos.filter(t => t.completed).length
  const activeCount = todos.length - doneCount

  return (
    // Overlay tối phía sau
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/50 backdrop-blur-sm"
    >
      {/* Popup card */}
      <div className="w-full max-w-md mx-4 bg-gray-900/90 backdrop-blur-xl
                      border border-white/15 rounded-2xl shadow-2xl
                      flex flex-col overflow-hidden
                      animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4
                        border-b border-white/10">
          <div>
            <h2 className="text-white font-semibold text-base">Tasks</h2>
            <p className="text-white/40 text-xs mt-0.5">
              {activeCount} remaining · {doneCount} done
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20
                       text-white/60 hover:text-white transition-all
                       flex items-center justify-center text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-6">

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Add a task..."
              autoFocus
              className="flex-1 bg-white/10 text-white placeholder-white/30
                         rounded-xl px-4 py-2.5 text-sm outline-none
                         focus:bg-white/15 transition-colors
                         border border-white/10 focus:border-white/25"
            />
            <button
              type="submit"
              className="bg-white/15 hover:bg-white/25 text-white
                         rounded-xl px-4 py-2.5 text-sm font-medium
                         transition-colors border border-white/10"
            >
              Add
            </button>
          </form>

          {/* Filter */}
          <div className="flex gap-1">
            {['all', 'active', 'done'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium
                            capitalize transition-colors
                  ${filter === f
                    ? 'bg-white/20 text-white'
                    : 'text-white/40 hover:text-white/70'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Todo list */}
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
            {filteredTodos.length === 0 && (
              <p className="text-white/30 text-sm text-center py-8">
                {filter === 'done'
                  ? 'No completed tasks yet'
                  : 'No tasks — add one above!'}
              </p>
            )}

            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
                onPriority={(p) => setPriority(todo.id, p)}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

function TodoItem({ todo, onToggle, onDelete, onPriority }) {
  const [showPriority, setShowPriority] = useState(false)

  return (
    <div className={`flex items-center gap-3 bg-white/8 rounded-xl px-4 py-3
                     border border-white/5 group transition-opacity
                     ${todo.completed ? 'opacity-50' : ''}`}>

      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all
          ${todo.completed
            ? 'bg-white border-white'
            : 'border-white/40 hover:border-white'
          }`}
      >
        {todo.completed && (
          <span className="text-gray-900 text-xs flex items-center
                           justify-center w-full h-full font-bold">
            ✓
          </span>
        )}
      </button>

      {/* Text */}
      <span className={`flex-1 text-sm text-white/90
                        ${todo.completed ? 'line-through' : ''}`}>
        {todo.text}
      </span>

      {/* Priority */}
      <div className="relative">
        <button
          onClick={() => setShowPriority(s => !s)}
          className={`text-xs px-2 py-0.5 rounded-full border capitalize
                      opacity-0 group-hover:opacity-100 transition-opacity
                      ${PRIORITY_STYLES[todo.priority]}`}
        >
          {todo.priority}
        </button>

        {showPriority && (
          <div className="absolute right-0 bottom-full mb-1 bg-gray-800
                          rounded-lg border border-white/10 overflow-hidden
                          z-10 shadow-xl">
            {['high', 'medium', 'low'].map(p => (
              <button
                key={p}
                onClick={() => { onPriority(p); setShowPriority(false) }}
                className="block w-full text-left px-3 py-2 text-xs
                           capitalize text-white/70 hover:bg-white/10
                           transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Xóa */}
      <button
        onClick={onDelete}
        className="text-white/30 hover:text-red-400 transition-colors
                   opacity-0 group-hover:opacity-100 text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}