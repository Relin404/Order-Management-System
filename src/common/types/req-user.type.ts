import { UserData } from 'src/modules/users/types/user-data.type';

export type ReqUser = Pick<UserData, 'id' | 'email'>;
