import { useState, useEffect } from 'react'

// Custom hook: tách logic ra khỏi UI
// Bất kỳ component nào cũng có thể dùng hook này
export function useTodos() {
    const [todos, setTodos] = useState(() => {
        // Lazy initializer: chỉ chạy 1 lần khi component mount
        // Đọc data từ localStorage nếu có, không thì trả về []
        const saved = localStorage.getItem('focusroom-todos')
        return saved ? JSON.parse(saved) : []
    })

    // Mỗi khi todos thay đổi → lưu vào localStorage
    useEffect(() => {
        localStorage.setItem('focusroom-todos', JSON.stringify(todos))
    }, [todos])

    // --- Các hàm thao tác ---

    function addTodo(text) {
        if (!text.trim()) return           // bỏ qua nếu input rỗng
        setTodos(prev => [
            {
                id: Date.now(),                // dùng timestamp làm ID tạm
                text: text.trim(),
                completed: false,
                priority: 'medium',
                createdAt: new Date().toISOString(),
            },
            ...prev,                         // todo mới lên đầu danh sách
        ])
    }

    function toggleTodo(id) {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }  // spread: copy object rồi đổi 1 field
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

    // Hook trả về data + các hàm — component dùng destructuring để lấy
    return { todos, addTodo, toggleTodo, deleteTodo, setPriority }
}