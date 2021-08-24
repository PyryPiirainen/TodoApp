import TodoItemData from '../types/TodoItemData';

export const createTodoItem = async (item: TodoItemCreateDto): Promise<TodoItemReadDto | null> => {
    let response: Response = await fetch(
        'todoitems',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });

    if (response.ok) {
        let payload = await response.json()
        return payload as TodoItemReadDto;
    }
    else {
        return null;
    }
}

export const getTodoItems = async (date?: Date): Promise<TodoItemReadDto[] | null> => {

    let url = 'todoitems';
    if (date != null) {
        url += `?${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    let response: Response = await fetch(url, { method: 'GET' });
    if (response.ok) {
        let payload = await response.json()
        return payload as TodoItemReadDto[];
    }
    else {
        return null;
    }
}

export const updateTodoItem = async (item: TodoItemUpdateDto): Promise<TodoItemReadDto | null> => {
    let response: Response = await fetch(
        'todoitems',
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });

    if (response.ok) {
        let payload = await response.json();
        return payload as TodoItemReadDto;
    }
    else {
        return null;
    }
}

export const deleteTodoItem = async (todoItemId: number): Promise<TodoItemReadDto | null> => {
    let response: Response = await fetch(`todoitems/${todoItemId}`, { method: 'DELETE' });
    if (response.ok) {
        let payload = await response.json();
        return payload as TodoItemReadDto;
    }
    else {
        return null;
    }
}

interface TodoItemCreateDto {
    text: string,
    date: Date
}

interface TodoItemReadDto {
    todoItemId: number,
    text: string,
    date: Date,
    isDone: boolean
}

interface TodoItemUpdateDto {
    todoItemId: number,
    text: string,
    date: Date,
    isDone: boolean
}