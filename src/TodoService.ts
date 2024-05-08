interface TodoTypes {
  id : number;
  text : string;
  isCompleted : boolean;
}

const LOGAL_STORAGE_KEY = 'todos';

const TodoService = {

  //Get Todo Datas
  getTodo: (): TodoTypes[] => {
    const todo = localStorage.getItem(LOGAL_STORAGE_KEY);
    console.log("TodoService getTodo",todo)
    return todo ? JSON.parse(todo) : [];
  },

// add a data at Todo
  addTodo: (text : string) :TodoTypes => {
    const todo = TodoService.getTodo();
    const newTodo:TodoTypes = {
      id : todo.length * Math.random(), 
      text, 
      isCompleted : false
    };
    const updateTodo = [...todo, newTodo];
    localStorage.setItem(LOGAL_STORAGE_KEY, JSON.stringify(updateTodo));
    
    return newTodo
  },

  //Update a data at Todo
  updateTodo : (revisedTodo:TodoTypes) : TodoTypes => {

    const todo = TodoService.getTodo();
    console.log("TodoService Todo",  todo)
    const updateTodo = todo.map(t => t.id === revisedTodo?.id ? revisedTodo : t )
    localStorage.setItem(LOGAL_STORAGE_KEY, JSON.stringify(updateTodo))
    return revisedTodo

  },

  deletTodo : (id : number) : void =>{
    const todo = TodoService.getTodo();
    const updateTodo = todo.filter(t => id !== t.id );
    localStorage.setItem(LOGAL_STORAGE_KEY, JSON.stringify(updateTodo))
  }


}

export default TodoService

