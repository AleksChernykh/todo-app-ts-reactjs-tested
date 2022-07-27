import React, { useContext } from 'react';

import TodoItem from './TodoItem';
import { TodosContext } from '../store/todos-context';

import classes from './Todos.module.css';

const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const hasTodo = todosCtx.filteredItems.length > 0;
  const hasSelected =
    todosCtx.items.filter((todo) => todo.complete === true).length > 0;

  return (
    <section className={classes.main}>
      {hasTodo && (
        <label
          className={`${classes.toggle_all} ${
            hasSelected ? classes.all_selected : ''
          }`}
          onClick={() => todosCtx.selectAll()}
          data-testid='toggleAll'
        >
          ❯
        </label>
      )}
      {hasTodo && (
        <ul className={classes.list}>
          {todosCtx.filteredItems.map((item, i) => (
            <TodoItem
              data-testid='todo'
              todo={todosCtx.filteredItems[i]}
              key={item.id}
              myKey={item.id}
              text={item.text}
              onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Todos;
