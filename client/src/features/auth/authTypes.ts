export enum Roles {
    RECIPEINT="RECIPEINT",
    USER="USER"
}

export interface User {
  token: string;
  role: Roles;
}
