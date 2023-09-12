import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"

export const authResolver = () => {
    return inject(AuthService).isAuth();
}