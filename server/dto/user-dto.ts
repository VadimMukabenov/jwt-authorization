import { IUser } from "../../_types";

class UserDto {
    id: number;
    email: string;

    constructor(model: IUser) {
        this.id = model.id;
        this.email = model.email;
    }
}

export default UserDto;
