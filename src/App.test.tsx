import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('On load', () => {
  it('renders the correct initial DOM', () => {
    const document = render(<App />);

    const mainHeader = document.getByTestId('main-header');
    const inputElement = document.getByTestId('input');

    // The main header should show 'todos' text
    expect(mainHeader).toHaveTextContent(/todos/i);

    // The input placehoolder should have text 'What needs to be done?'
    expect(inputElement.getAttribute('placeholder')).toBe(
      'What needs to be done?'
    );
  });

  it('focuses input', () => {
    render(<App />);

    // Should have focus on input
    expect(screen.getByTestId('input')).toHaveFocus();
  });
});

describe('Form', () => {
  it('does not create todo, when input is empty', () => {
    render(<App />);

    // When Enter key is pressed with empty input, nothing is added to todo list
    userEvent.keyboard('[enter]');
    const todoItem = screen.queryByTestId('todo');
    expect(todoItem).not.toBeInTheDocument();
  });

  it('creates a new todo item when input has value and Enter is pressed', () => {
    render(<App />);

    // Sets value 'we go jim' to the input
    const selectInput = screen.getByTestId('input');
    userEvent.type(selectInput, 'we go jim');
    expect(selectInput).toHaveValue('we go jim');

    // Adds a todo with text 'we go jim' after pressing Enter
    userEvent.keyboard('[enter]');
    const todoItem = screen.getByTestId('todo');
    expect(todoItem).toHaveTextContent('we go jim');
  });
});

describe('Todo item, when added,', () => {
  it('shows X (remove button), if hovered and deletes todo if X is clicked', () => {
    render(<App />);

    // Hovers over added before todo with text 'we go jim' and shows remove button (X)
    const addedTodo = screen.getByText('we go jim');
    userEvent.hover(addedTodo);
    const removeButton = screen.getByTestId('removeButton');
    expect(removeButton).toBeInTheDocument();

    // Deletes todo if remove button is clicked
    userEvent.click(removeButton);
    expect(addedTodo).not.toBeInTheDocument();
  });

  it('can be selected and cleared with Clear Completed button', () => {
    render(<App />);

    // Adds new todo with text 'YB better'
    const selectInput = screen.getByTestId('input');
    userEvent.type(selectInput, 'YB better{enter}');
    const newTodo = screen.getByText('YB better');
    expect(newTodo).toBeInTheDocument();

    // Toggles todo item and shows 'Clear Completed' button
    const todoToggler = screen.getByTestId('todoToggler');
    userEvent.click(todoToggler);
    const clearCompleted = screen.getByRole('button', {
      name: 'Clear Completed',
    });
    expect(clearCompleted).toBeInTheDocument();

    // Removes selected todo, when 'Clear Completed' is clicked
    userEvent.click(clearCompleted);
    const todo = screen.queryByTestId('todo');
    expect(todo).not.toBeInTheDocument();
  });
});

describe('Footer', () => {
  it('counts new todos when they are added', () => {
    render(<App />);

    // Adds 3 new todos and shows the amount in counter
    userEvent.keyboard('Test 1{enter}Test 2{enter}Test 3{enter}');
    expect(screen.queryAllByTestId('todo').length).toBe(3);
    const counter = screen.getByTestId('counter');
    expect(counter).toHaveTextContent('3 items left');
  });

  it('filters all/active/completed todos', () => {
    render(<App />);

    // Toggle comlete in second todo
    const secondTodoToggler = screen.queryAllByTestId('todoToggler')[1];
    userEvent.click(secondTodoToggler);

    // Shows All, when 'All' filter is active
    userEvent.click(screen.getByTestId('filterAll'));
    expect(screen.queryAllByTestId('todo').length).toBe(3);

    // Shows Active, when 'Active' filter is active
    userEvent.click(screen.getByTestId('filterActive'));
    expect(screen.queryAllByTestId('todo').length).toBe(2);

    // Shows Completed, when 'Completed' filter is completed
    userEvent.click(screen.getByTestId('filterCompleted'));
    expect(screen.queryAllByTestId('todo').length).toBe(1);
  });
});

describe('Toggle all button', () => {
  it('toggles all todos as completed/incomplete', () => {
    render(<App />);

    // Toggles all 3 todos to be completed
    userEvent.click(screen.getByTestId('toggleAll'));
    userEvent.click(screen.getByTestId('filterCompleted'));
    expect(screen.queryAllByTestId('todo').length).toBe(3);

    // Toggles all 3 todos to be incomplete
    userEvent.click(screen.getByTestId('toggleAll'));
    userEvent.click(screen.getByTestId('filterActive'));
    expect(screen.queryAllByTestId('todo').length).toBe(3);
  });
});
