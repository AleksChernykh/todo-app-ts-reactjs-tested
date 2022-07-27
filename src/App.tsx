import Todos from './components/Todos';
import NewTodo from './components/NewTodo';
import Footer from './components/Footer';

import './App.css';
import TodosContextProvider from './store/todos-context';

const App = () => {
  return (
    <TodosContextProvider>
      <div className='App'>
        <h1 data-testid='main-header'>todos</h1>
        <NewTodo />
        <Todos />
        <Footer />
      </div>
    </TodosContextProvider>
  );
};

export default App;
