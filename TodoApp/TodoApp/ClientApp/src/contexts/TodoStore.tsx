import React, { useState } from 'react';
import TodoItemData from '../types/TodoItemData';
import * as api from '../apis/todoItemsApi';

type TodoStoreType = {
    todoItems: TodoItemData[],
    createTodoItem(item: TodoItemData): Promise<void>,
    getTodoItems(date?: Date): Promise<void>,
    updateTodoItem(item: TodoItemData): Promise<void>,
    deleteTodoItem(id: number): Promise<void>
};

const defaultValue: TodoStoreType = {
    todoItems: [],
    createTodoItem: (item) => Promise.resolve(),
    getTodoItems: (date) => Promise.resolve(),
    updateTodoItem: (item) => Promise.resolve(),
    deleteTodoItem: (id) => Promise.resolve()
};

const TodoContext = React.createContext<TodoStoreType>(defaultValue);

type Props = {
    children?: React.ReactNode
};

export const TodoStore: React.FC<Props>  = ({ children }) => {
    const [todoItems, setTodoItems] = useState<TodoItemData[]>(defaultValue.todoItems);

    const createTodoItem = async (item: TodoItemData): Promise<void> => {
        const added = await api.createTodoItem(item);
        if (added == null)
            return;

        setTodoItems([...todoItems, added]);
    };

    const getTodoItems = async (date?: Date): Promise<void> => {
        const items = await api.getTodoItems(date);
        setTodoItems(items != null ? items.sort(i => i.todoItemId) : []);
    }

    const updateTodoItem = async (item: TodoItemData): Promise<void> => {
        const updated = await api.updateTodoItem(item);
        if (updated == null) {
            return;
        }

        const index = todoItems.findIndex(x => x.todoItemId === updated.todoItemId)
        if (index !== -1)
        {
            const updatedItems = [...todoItems.slice(0, index),
                Object.assign({}, todoItems[index], updated),
                ...todoItems.slice(index+1)];
            setTodoItems(updatedItems);
        }
    }

    const deleteTodoItem = async (id: number): Promise<void> => {
        const deleted = await api.deleteTodoItem(id);
        if (deleted == null)
            return;
        const index = todoItems.findIndex(x => x.todoItemId === deleted.todoItemId)

        if (index !== -1)
        {
            const updatedItems = [...todoItems.slice(0, index),
                ...todoItems.slice(index+1)];
            setTodoItems(updatedItems);
        }
    }

    const getContextValue = () => {
        return { todoItems, createTodoItem, getTodoItems, updateTodoItem, deleteTodoItem }
    }

    return (
        <TodoContext.Provider value={getContextValue()}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;