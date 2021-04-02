export interface BlockedUser {
  id: number;
  name: string;
}

export interface BlockedUsersState {
  list: BlockedUser[];
}