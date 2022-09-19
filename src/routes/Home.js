 import React, { useState } from 'react';
import { connect } from 'react-redux';
 
 const Home = ({toDos}) => {
  console.log(toDos)
  const [text, setText] = useState("");

  function onChange(e){
    setText(e.target.value)
  }

  function onSubmit(e){
    e.preventDefault();
    console.log(text);
  }

  
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {JSON.stringify(toDos)}
      </ul>
    </>
  );
 };

//ownProps는 plain Object를 반환시켜줘야 한다.
function mapStateProps(state){
  return { toDos : state };
}
 
//connect는 Home으로 보내는 props에 추가 될 수 있도록 허용해 준다.
//connect는 store와 연결시켜준다 어떻게?
 export default connect(mapStateProps) (Home);