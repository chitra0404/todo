import React, { useState } from 'react'




const TodoEdit = (props) => {

    const { onUpdateTodo, todo, index } = props;
    const [title, setTitle] = useState(todo.title);
   // const [status, setStatus] = useState(todo.status);

    const editTodo = () => {
        if (title.length > 0) {
            onUpdateTodo({
                index: index,
                todo: {
                    title
                    
                }
            });
        }
    }

    const handleEnterSubmission = (e) => {
        if (e.key === 'Enter') {
            editTodo();
        }
    }

    return (
        <div className='todo-input-item'>
        <label>Title</label>
        <input type="text" value={newTitle}  onChange={e => setTitle(e.target.value)} onKeyDown={e => handleEnterSubmission(e)} placeholder='Enter  what to do' />
     
           
     
            <Button variant="success" onClick={(e) => editTodo()}>
                 Save
            </Button>
        
         </div>
    );
}

export default TodoEdit;