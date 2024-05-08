import { useState } from "react";
import TodoService from "../TodoService";
import {FaEdit, FaCheck} from "react-icons/fa";
import {GiCancel} from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";
import "../SCSS/TodoList.scss"
import Timer from "./Timer";

interface TodoTypes {
  id : number;
  text : string;
  isCompleted : boolean;
}

const TodoList = () =>{
const [ todo, setTodo ] = useState<TodoTypes[]>(TodoService.getTodo());
const [ editingTodoId, setEditingTodoId ] = useState< number | null >(null);
const [ editingTodoText, setEditingTodoText ] = useState<string>("");

const handleEditStart = (id : number, text:string) => {
  setEditingTodoId(id)
  setEditingTodoText(text)
}

const handleEditCancel = () =>{
  setEditingTodoId(null)
  setEditingTodoText("")

}

const handleEditSave = (id:number) => {
  if(editingTodoText.trim() !== ""){
    const upadateTodo = TodoService.updateTodo({
      id,
      text : editingTodoText,
      isCompleted: false
    })
    console.log("TodoList handleEditSave 1")
    setTodo((prev) => {
      return prev.map((item) => {
        return item.id === id ? upadateTodo : item 
        })
      })
      setEditingTodoText("")
      setEditingTodoId(null)
  }
}

//! delete funaction

const handleDeleteTodo = (id:number) =>{
  TodoService.deletTodo(id)
  setTodo(prev => {
    return prev.filter(item => item.id !== id )
  })

}
  return(
    <>
    <div className="inputForm">
      <TodoForm setTodo={setTodo}/>
    </div>
    {
      todo.length > 0 ?(
        <div className="itemWrap">
        {
          todo.map((i) => (
            <div key={i?.id} className="items">
              {
                editingTodoId == i?.id ?
    
                (
                <div className="editedText">
    
                  <input type="text" value={editingTodoText} onChange={(e) => setEditingTodoText(e.target.value)} />
                  <button className="saveBtn" onClick={()=> handleEditSave(i.id)} ><FaCheck /></button>
                  <button className="editBtn" onClick={()=> handleEditCancel()} ><GiCancel /></button>
                </div>
                ) 
                
                :
                
                (
                  <div className="editBtn">
                    <span>{i?.text}</span>
                    <button onClick={()=> handleEditStart(i.id, i.text)} ><FaEdit /></button>
                    <Timer />
    
                  </div>
                )
              }
    
              <button className="deleteBtn" onClick={()=> handleDeleteTodo(i.id)}>
                < RiDeleteBin5Fill />
              </button>
    
            </div>
          ))
        }
        </div>
      ) : <p className="todoNull">오늘 할 일을 다 하셨나 봐요!</p>
    }


  </>
    
  )

}

export default TodoList