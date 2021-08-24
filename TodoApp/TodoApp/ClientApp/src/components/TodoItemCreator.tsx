import React, { useContext, useEffect, useState } from 'react';
import TodoContext from '../contexts/TodoStore';

function TodoItemCreator() {
    const [text, setText] = useState<string>('');

    const handleTextChange = (event: any) => {
        setText(event.target.value);
    };

    const { createTodoItem } = useContext(TodoContext);

    const handleButtonClick = () => {
        createTodoItem({todoItemId: 0, text, date: new Date(), isDone: false});
    }

    return (
        <div className="row">
            <div className="col-10">
                <input type="text" style={{width: "100%"}} onChange={handleTextChange} />
            </div>
            <div className="col-2">
                <button type="button" className="btn btn-success" onClick={handleButtonClick}>Create</button>
            </div>
        </div>
    );
}

export default TodoItemCreator;