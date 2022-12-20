import {projectApi} from "./project/project.api";
import {authApi} from "./auth/auth.api";

const storeMiddlewares =
    [projectApi.middleware , authApi.middleware]

export default storeMiddlewares