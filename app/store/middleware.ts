import {projectApi} from "./project/project.api";
import {authApi} from "./auth/auth.api";
import {jsonApi} from "./api/json.api";

const storeMiddlewares =
    [projectApi.middleware, authApi.middleware, jsonApi.middleware]

export default storeMiddlewares