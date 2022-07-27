import React, { useContext } from 'react';

import { TodosContext } from '../store/todos-context';

import classes from './TodoFilters.module.css';

const TodoFilters: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={classes.filters}>
      <li>
        <a
          className={`${todosCtx.selectedFilter.all ? classes.selected : ''}`}
          onClick={() => todosCtx.filterTodo('all')}
          data-testid='filterAll'
        >
          All
        </a>
      </li>
      <li>
        <a
          className={`${
            todosCtx.selectedFilter.active ? classes.selected : ''
          }`}
          onClick={() => todosCtx.filterTodo('active')}
          data-testid='filterActive'
        >
          Active
        </a>
      </li>
      <li>
        <a
          className={`${
            todosCtx.selectedFilter.completed ? classes.selected : ''
          }`}
          onClick={() => todosCtx.filterTodo('completed')}
          data-testid='filterCompleted'
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodoFilters;
