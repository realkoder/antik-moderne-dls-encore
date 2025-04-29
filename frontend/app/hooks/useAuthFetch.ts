import { useAuth } from "@clerk/react-router";
import { useEffect, useState } from "react";
import type Client from "~/lib/client";
import getRequestClient from "~/lib/getRequestClient";

const useAuthFetch = () => {
    const { getToken } = useAuth();
    const [authRequestClient, setAuthRequestClient] = useState<Client | undefined>();

    useEffect(() => {
        (async () => {
            const token = await getToken();
            if (!token) return;
            console.log("TOKEN FROM AUTHFETCH", token);
            setAuthRequestClient(getRequestClient(token, false));
        })();

    }, [getToken]);

    return { authRequestClient };
}

export default useAuthFetch;