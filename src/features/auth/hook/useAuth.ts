import {setError, setLoading, setUser} from "../state/auth.slice";
import {register} from "../service/auth.api";
import type { RegisterPayload, LoginPayload } from "../auth.types";
import { useDispatch } from "react-redux";

export const useAuth = () => {

    const dispatch = useDispatch(); 

    async function handleRegister(registerPayload: RegisterPayload) {
        const data = await register(registerPayload);
        dispatch(setUser(data.user));
    }

    return {
        handleRegister
    }
}