import axios from 'axios';
import { useState, useEffect } from 'react'


export default function UserAPI(token:any) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/info', {
                        headers: {Authorization: token}
                    });
                } catch (error:any) {
                    alert(error.res.data.msg);
                }
            }
            getUser();
        }
    }, [token]);

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    };
}