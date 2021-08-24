import React from 'react';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import TodoItemData from '../types/TodoItemData'
import TodoContext from '../contexts/TodoStore';
import { useContext } from 'react';
import { useEffect } from 'react';

type TodoItemsListProps = {
    items: TodoItemData[]
}

function TodoList() {

    const { todoItems, getTodoItems } = useContext(TodoContext);

    useEffect(() => {
        getTodoItems()
    }, []);

    const renderTodoItems = () => todoItems.map((v) => <TodoItem data={v} key={v.todoItemId} />);

    return (
        <div>
            {renderTodoItems()}
            <TodoItemCreator />
        </div>
    );
}

export default TodoList;