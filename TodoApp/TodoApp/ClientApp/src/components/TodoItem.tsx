import React, { useContext, useEffect, useState } from 'react';
import TodoItemData from '../types/TodoItemData';
import TodoContext from '../contexts/TodoStore';

type Props = {
    data: TodoItemData,
    key: number
}

const TodoItem: React.FC<Props> = ({ data }) => {
    const [text, setText] = useState<string>('');
    const [isDone, setIsDone] = useState<boolean>(false);

    const { updateTodoItem, deleteTodoItem } = useContext(TodoContext);

    //const saveDelayMs = 1000;

    useEffect(() => {
        setText(data.text);
        setIsDone(data.isDone);
    }, []);

    useEffect(() => {
        save();
    }, [text, isDone]);

    const handleCheckboxChange = (event: any) => {
        setIsDone(event.target.checked);
    };

    const handleTextChange = (event: any) => {
        setText(event.target.value);
    };

    const handleDeleteClick = (event: any) => {
        deleteTodoItem(data.todoItemId);
    }

    const save = () => {
        updateTodoItem({...data, text, isDone});
    };

    return (
        <div className="row">
            <div className="col">
                <input type="checkbox" className="form-check-input" onChange={handleCheckboxChange} checked={isDone}/>
            </div>
            <div className="col-10">
                <input type="text" className="form-control" value={text} onChange={handleTextChange} />
            </div>
            <div className="col">
                <button type="button" className="btn btn-outline-secondary" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    );
}

export default TodoItem;