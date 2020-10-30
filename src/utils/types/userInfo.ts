export enum op {
  UPDATE = 'update',
  ADD = 'add',
  Del = 'delete',
}
export interface userInfo {
  googleId?: string;
  name: string;
  email: string;
  imageURL: string;
  twitterId?: string;
  id: string;
}

export interface stepType {
  taskTitle: string;
  done: boolean;
  id: string;
}
export interface todoBody {
  id: string;
  userId: string;
  todoTitle: string;
  normalTask: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  important: boolean;
  dueDate?: string;
  myDay?: boolean;
  steps: Array<stepType>;
}

export interface todoType {
  id: string;
  userId: string;
  todoTitle: string;
  normalTask: string;
  done: boolean;
  createdAt: Date;
  important: boolean;
  updatedAt: string;
  dueDate?: Date;
  myDay?: boolean;
  steps: Array<stepType>;
}

export interface plannedTodoType {
  id: string;
  userId: string;
  todoTitle: string;
  normalTask: string;
  done: boolean;
  createdAt: Date;
  important: boolean;
  updatedAt: string;
  dueDate: Date;
  myDay?: boolean;
  steps: Array<stepType>;
}

export interface plannedTodoBodyType {
  id: string;
  userId: string;
  todoTitle: string;
  normalTask: string;
  done: boolean;
  createdAt: string;
  important: boolean;
  updatedAt: string;
  dueDate: string;
  myDay?: boolean;
  steps: Array<stepType>;
}

export interface MydayTodoBodyType {
  id: string;
  userId: string;
  todoTitle: string;
  normalTask: string;
  done: boolean;
  createdAt: string;
  important: boolean;
  updatedAt: string;
  dueDate?: string;
  myDay: boolean;
  steps: Array<stepType>;
}

export interface myDayTodoType {
  id: string;
  userId: string;
  todoTitle: string;
  normalTask: string;
  done: boolean;
  createdAt: Date;
  important: boolean;
  updatedAt: string;
  dueDate?: Date;
  myDay: boolean;
  steps: Array<stepType>;
}

export type editDoneStatus = {
  todoId: string;
  done: boolean;
};

export type editImpStatus = {
  todoId: string;
  important: boolean;
};
