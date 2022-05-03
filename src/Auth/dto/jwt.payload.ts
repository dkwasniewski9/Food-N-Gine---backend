import {UserRole} from "../../Shared/user.role.enum";

export class JwtPayload {
    id: number;
    role: UserRole;
}
