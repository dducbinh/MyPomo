import { useState, useEffect } from 'react'

// Custom hook: tách logic ra khỏi UI

export function useTodos() {
    const [todos, setTodos] = useState(() => {
        
        const saved = localStorage.getItem('focusroom-todos')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('focusroom-todos', JSON.stringify(todos))
    }, [todos])

    // --- Các hàm thao tác ---

    function addTodo(text) {
        if (!text.trim()) return           
        setTodos(prev => [
            {
                id: Date.now(),                
                text: text.trim(),
                completed: false,
                priority: 'medium',
                createdAt: new Date().toISOString(),
            },
            ...prev,                         
        ])
    }

    function toggleTodo(id) {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        )
    }

    function deleteTodo(id) {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    function setPriority(id, priority) {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, priority } : todo
            )
        )
    }

    // Hook trả về data + các hàm
    return { todos, addTodo, toggleTodo, deleteTodo, setPriority }
}