import React, { useContext } from 'react';

import { TodosContext } from '../store/todos-context';
import Todo from '../models/todo';

import classes from './TodoItem.module.css';

const TodoItem: React.FC<{
  myKey: string;
  todo: Todo;
  text: string;
  onRemoveTodo: () => void;
}> = ({ myKey, todo, text, onRemoveTodo }) => {
  const todosCtx = useContext(TodosContext);

  return (
    <li className={classes.item} data-testid='todo'>
      <label
        className={`${todo.complete ? classes.crossed : ''}`}
        htmlFor={myKey}
      >
        <input
          data-testid='todoToggler'
          className={classes.toggle}
          type='checkbox'
          id={myKey}
          checked={todo.complete}
          onChange={() => todosCtx.toggleTodo(todo)}
        />
        {text}
      </label>
      <button
        className={classes.close}
        onClick={onRemoveTodo}
        data-testid='removeButton'
      ></button>
    </li>
  );
};

export default TodoItem;
