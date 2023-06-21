export interface Message {
  fromUser: string;
  message: string;
  time: string;
  toUser: string;
}

export interface UserInterface {
  _id: string;
  ownerName: string;
  dogName: string;
  matches: UserInterface[];
  avatar: string;
  about: string;
  dogAge: number;
  ownerAge: number;
  gender: string;
  email?: string;
  password?: string;
}
