class Todo {
  id: string;
  text: string;
  complete: boolean;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
    this.complete = false;
  }
}

export default Todo;
