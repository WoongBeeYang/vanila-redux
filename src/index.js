import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

 const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"

const addToDo = text => {
   return{
    type: ADD_TODO,
    text
   };
};

const deleteToDo = (id) => {
  return{
    type: DELETE_TODO,
    id
  }
}
const reducer = (state = [], action) => {//리듀서는 state 와 action 두가지 인자를 항상 가진다.
  switch(action.type){
    case ADD_TODO:
      //절대로 Mutate state 사용하지 말것!! (내용을 변경할 때는 추가를 해주는것이 아니라 새로은 object를 return 해줘야 한다. )
      //redux에서 가장 중요한 부분이다
      const newToDoObj = {text:action.text, id:Date.now()};
      return [newToDoObj, ...state];
    case DELETE_TODO:
      //삭제를 하고싶을때는 제외 해야할 식을 성립해야한다. (삭제할 todo의 id에 해당하지 않는 todo들)
      //filter 를 사용해서 Array를 수정하는것이 아닌 재생성 해준다.
      return state.filter(toDo => toDo.id !== action.id ); 
    default:
      return state; 
  }
} 
const store = createStore(reducer)

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));  
}

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}

const paintToDos = () => { //리스트 생성
  const toDos = store.getState(); //스테이트를 가져와서 toDos에 저장
  ul.innerHTML = ""; //초기화 진행
  toDos.forEach(toDo => { 
    const li = document.createElement("li"); 
    const btn = document.createElement("button");
    btn.innerText = "DELETE"; //삭제 버튼 생성
    btn.addEventListener("click", dispatchDeleteToDo); //삭제 이벤트 진행
    li.id = toDo.id 
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  }) 
}

store.subscribe(paintToDos)

//store을 수정할수 있는 유일한 방법은 action을 보내는 방법밖에 없다.
const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
}

form.addEventListener("submit", onSubmit);