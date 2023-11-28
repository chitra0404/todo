import React, { useState } from 'react'
import './todolist.css'


  return (
    <div className='todo'>
<form onSubmit={handleSubmit}>
  <input type="text" placeholder='Enter  what to do' value={title}
          onInput={(event) => setTitle(event.target.value)}></input>
  <button className='btn' type="submit">submit</button>
</form>
    </div>
  );


export default TodoField
