import React, {useState, useEffect} from 'react';
import './App.css';
//Import components
import Form from './components/Form';
import TodoList from './components/TodoList';


function App() {
    //State stuff
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
    //Run once when the app start
    useEffect(()=>{
      getLocalTodos();
    }, []);

    //Use effect
    useEffect(()=>{
      filterHandler();
      saveLocalTodos();
    }, [todos, status]);

  //Functions
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter((todo)=> todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo)=> todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };


//Save to local
const saveLocalTodos =()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
};

const getLocalTodos = () =>{
  if(localStorage.getItem('todos')===null){
    localStorage.setItem('todos', JSON.stringify([]));
  } else {
    let todoLocal = JSON.parse(localStorage.getItem('todos'));
    setTodos(todoLocal);
  }
};

  return (
    <div className="App">
        <header>
          <h1>Arogante</h1>
        </header>
        <Form 
          setInputText={setInputText} 
          todos={todos} 
          setTodos={setTodos} 
          inputText={inputText}
          setStatus={setStatus}
         
          />
        <TodoList 
          todos={todos} 
          setTodos={setTodos}
          filteredTodos={filteredTodos}
        />
    </div>
  );
}

export default App;
