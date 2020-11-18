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

export interface plannedTodoType extends todoType {
  dueDate: Date;
}

export interface plannedTodoBodyType extends todoBody {
  dueDate: string;
}

export interface MydayTodoBodyType extends todoBody {
  myDay: boolean;
}

export interface myDayTodoType extends todoType {
  myDay: boolean;
}

export type editDoneStatus = {
  todoId: string;
  done: boolean;
};

export type editStepDoneStatus = {
  todoId: string;
  projectId?: string;
  done: boolean;
  stepId: string;
};

export type editImpStatus = {
  todoId: string;
  important: boolean;
};

export type editTitleStatus = {
  todoId: string;
  newTodoTitle: string;
};

export enum todoFrom {
  MYDAY = 'MY DAY',
  PLANNED = 'PLANNED',
}
