import React, { createContext, useCallback, useMemo, useState } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    setTheme(val => (val === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default TodoContext;
