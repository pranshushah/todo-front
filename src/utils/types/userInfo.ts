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
