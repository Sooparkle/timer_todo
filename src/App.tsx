import TodoList from "./component/TodoList"
import "./SCSS/App.scss";


function App() {

  return (
    <div className="app">
      <div className="title">
        <div>
          <h1>타이머로 체크하는 'TODO LIST' 앱</h1>
        </div>
        <div>
          <h1>타이머로 체크하는 'TODO LIST' 앱</h1>
        </div>
      </div>

      <TodoList />
    </div>
  )
}

export default App
