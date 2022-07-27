import React, { useContext } from 'react';

import { TodosContext } from '../store/todos-context';
import TodoFilters from './TodoFilters';

import classes from './Footer.module.css';

const Footer: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const todoItemsLeft = todosCtx.items.filter(
    (item) => item.complete === false
  ).length;

  const hasSelectedItems =
    todosCtx.items.filter((item) => item.complete === true).length > 0
      ? `${classes.clear} ${classes.show}`
      : classes.clear;

  return (
    <>
      {todosCtx.items.length > 0 && (
        <footer className={classes.footer}>
          <span className={classes.todo_count} data-testid='counter'>
            <strong>{todoItemsLeft}</strong>
            {todosCtx.items.length === 1 ? (
              <span> item </span>
            ) : (
              <span> items </span>
            )}
            <span>left</span>
          </span>
          <TodoFilters />
          <button
            className={hasSelectedItems}
            onClick={(e) => todosCtx.deleteSelected(e)}
          >
            Clear Completed
          </button>
        </footer>
      )}
    </>
  );
};

export default Footer;
