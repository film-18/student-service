import { createContext, useMemo, useState, useContext, useCallback } from "react";
import { useGoogleLogin } from 'react-google-login';
import { useGoogleLogout } from 'react-google-login'

const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;

export const GoogleContext = createContext()

export const GoogleProvider = ({children}) => {

    const [user, setUser] = useState(null);

    // const responseGoogle = (response) => {
    //     setUser(response.profileObj)
    //     console.log(response.profileObj);
    //     // alert("login success")
    //     // location.href = '/'

    // }

    const responseGoogle = useCallback(
        (response) => {
            setUser(response.profileObj)
            console.log(response.profileObj)
        },
        [setUser]
    )

    const onFailure = (res) => {
        console.log(res);
    }

    const responseSignOut = () => {
        setUser(null)
    }


    const { signIn } = useGoogleLogin({
        clientId,
        onSuccess: responseGoogle,
        onFailure,
        isSignedIn: true,
        cookiePolicy: 'single_host_origin',
    })

    const { signOut } = useGoogleLogout({
        clientId,
        onFailure,
        onLogoutSuccess: responseSignOut
    })

    const value = useMemo(
        () => ({
            user,
            signIn,
            signOut
        }),
        [user, signIn, signOut]
    )

    return (
        <GoogleContext.Provider value={value}>
            {children}
        </GoogleContext.Provider>
    )
}

export const useGoogle = () => useContext(GoogleContext)