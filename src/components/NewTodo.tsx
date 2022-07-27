import React, { useRef, useContext } from 'react';

import { TodosContext } from '../store/todos-context';

import classes from './NewTodo.module.css';

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText?.trim().length === 0) {
      return;
    }

    todosCtx.addTodo(enteredText);

    todoTextInputRef.current!.value = '';
  };

  return (
    <header>
      <form onSubmit={submitHandler} data-testid='form-submit'>
        <input
          className={classes.input}
          type='text'
          placeholder='What needs to be done?'
          autoFocus
          ref={todoTextInputRef}
          data-testid='input'
        />
      </form>
    </header>
  );
};

export default NewTodo;
