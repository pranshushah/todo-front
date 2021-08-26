export type Op = 'update' | 'add' | 'delete';

export type TodoFrom = 'MY_DAY' | 'PLANNED' | 'PROJECT' | 'IMPORTANT' | 'TASK';

export type TaskStatus = 'COMPLETED' | 'INCOMPLETED';

export type DayStatus = 'today' | 'tommorrow' | 'previous' | 'later';

export interface notification {
  message: string;
  type: string;
  id: string;
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
  projectId?: string;
  todoTitle: string;
  normalTask: boolean;
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
  projectId?: string;
  todoTitle: string;
  normalTask: boolean;
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

export interface todoInProjectType extends todoType {
  projectId: string;
}

export interface plannedTodoBodyType extends todoBody {
  dueDate: string;
}

export interface todoBodyInProjectType extends todoBody {
  projectId: string;
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

export interface project {
  projectName: string;
  id: string;
  userId: string;
}

export interface everyTodoType {
  normalTodos?: todoType[];
  projectTodos?: todoInProjectType[];
  impTodos?: todoType[];
  myDayTodos?: myDayTodoType[];
  plannedTodos?: plannedTodoType[];
}
