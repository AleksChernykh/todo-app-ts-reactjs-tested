import React, { useEffect, useState } from 'react';

import Todo from '../models/todo';

interface ISelectedFilter {
  all: boolean;
  active: boolean;
  completed: boolean;
}

type TodosContextObj = {
  items: Todo[];
  filteredItems: Todo[];
  selectedFilter: ISelectedFilter;
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (selectedTodo: Todo) => void;
  filterTodo: (option: string) => void;
  deleteSelected: (event: React.MouseEvent) => void;
  selectAll: () => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  filteredItems: [],
  selectedFilter: { all: true, active: false, completed: false },
  addTodo: () => {},
  removeTodo: (id: string) => {},
  toggleTodo: () => {},
  filterTodo: () => {},
  deleteSelected: () => {},
  selectAll: () => {},
});

const TodosContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtered, setFiltered] = useState<Todo[]>(todos);
  const [selectedFilterPage, setSelectedFilterPage] = useState<ISelectedFilter>(
    {
      all: true,
      active: false,
      completed: false,
    }
  );

  useEffect(() => {
    const data = localStorage.getItem('USERS_TODO');
    if (data !== null) setTodos(JSON.parse(data));
  }, []);

  useEffect(() => {
    setFiltered(todos);
    localStorage.setItem('USERS_TODO', JSON.stringify(todos));
  }, [todos]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prev) => prev.concat(newTodo));
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  const toggleTodoHandler = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const selectAllHandler = () => {
    if (
      todos.filter((todo) => todo.complete === true).length >= 0 &&
      todos.filter((todo) => todo.complete === true).length < todos.length
    ) {
      const newSelectedTodo = [...todos].map((todo) => {
        if (todo.complete === false) {
          return {
            ...todo,
            complete: true,
          };
        }
        return todo;
      });
      setTodos(newSelectedTodo);
    } else if (
      todos.filter((todo) => todo.complete === true).length === todos.length
    ) {
      const newUnselectedTodo = [...todos].map((todo) => {
        if (todo.complete === true) {
          return {
            ...todo,
            complete: false,
          };
        }
        return todo;
      });
      setTodos(newUnselectedTodo);
    }
  };

  const deleteSelectedHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    const newTodo = [...todos].filter((todo) => todo.complete === false);
    setTodos(newTodo);
  };

  const filterTodoHandler = (option: string) => {
    if (option === 'all') {
      setSelectedFilterPage({ all: true, active: false, completed: false });
      setFiltered(todos);
    } else if (option === 'active') {
      const newActiveTodo = [...todos].filter(
        (todo) => todo.complete === false
      );
      setSelectedFilterPage({ all: false, active: true, completed: false });
      setFiltered(newActiveTodo);
    } else if (option === 'completed') {
      const newCompletedTodo = [...todos].filter(
        (todo) => todo.complete === true
      );
      setSelectedFilterPage({ all: false, active: false, completed: true });
      setFiltered(newCompletedTodo);
    }
  };

  const contextValue: TodosContextObj = {
    items: todos,
    filteredItems: filtered,
    selectedFilter: selectedFilterPage,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    toggleTodo: toggleTodoHandler,
    filterTodo: filterTodoHandler,
    deleteSelected: deleteSelectedHandler,
    selectAll: selectAllHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
