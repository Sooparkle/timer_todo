import React, { Dispatch, SetStateAction, useState } from "react"
import TodoService from "../TodoService";
import TodoTypes from "../TodoTypes";
import "../SCSS/TodoForm.scss"

interface PropTypes {
  setTodo: Dispatch<SetStateAction<TodoTypes[]>>;
}


const TodoForm:React.FC<PropTypes> = ({setTodo}) =>{
const [newTodoText, setNewTodoText] = useState<string>("");

const handleAddTodo = () =>{

  if(newTodoText.trim() !== ""){
    const newTodo = TodoService.addTodo(newTodoText)
    setTodo(prev => [...prev, newTodo])
    setNewTodoText("")
  }
}
  return(
  <div>
    <input type="text" value={newTodoText} onChange={(e)=>setNewTodoText(e.target.value)} placeholder="TODO를 추가해 보세요" />
    <button onClick={handleAddTodo}>ADD</button>
  </div>
  )
}

export default TodoForm;