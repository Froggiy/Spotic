import { UserDetails, Subscription } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import {
     useSessionContext,
      useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { Result } from "postcss";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetail] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscripttion = () => 
        supabase
    .from('subscriptions')
    .select('*, prices(*,products(*))')
    .in('status',['trialing','active'])
    .single();

    useEffect(() => {
        if(user && !isLoadingData && !userDetails && !subscription){
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscripttion()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subsciptionPromise = results[1];

                    if(userDetailsPromise.status === 'fulfilled'){
                        setUserDetail(userDetailsPromise.value.data as UserDetails);
                    }

                    if (subsciptionPromise.status === "fulfilled"){
                        setSubscription(subsciptionPromise.value.data as Subscription);
                    }

                    setIsLoadingData(false);
                }
            );
        } else if(!user && !isLoadingData && !subscription){
            setUserDetail(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]); 
    
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    return<UserContext.Provider value={value} {...props}/>
};

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined){
        throw new Error('useUser must be used within a MyUserContextProvider');
    }

    return context
};