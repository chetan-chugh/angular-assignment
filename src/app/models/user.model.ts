export interface User {
  username: string;
  password: string;
  role: 'admin' | 'member';
}

export interface Visit {
  username: string;
  page: string;
  time: string; // saved as ISO string in local storage
}
