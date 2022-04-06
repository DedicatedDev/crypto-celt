import * as React from "react";
import { createContext, useReducer, useContext } from "react";
import { AllTokens } from "../interfaces/AllTokens";
export interface SignStatus {
    signed: boolean;
    address: string;
    signature: string;
}

interface AppContextStatus {
    authStatus: SignStatus;
    setAuthStatus: (status: SignStatus) => void;
    allTokens:AllTokens
    setTokens:(tokens:AllTokens) => void;
}

const initialAuthStatus: SignStatus = {
    signed: false,
    address: "",
    signature: "",
};

const initialAppContext: AppContextStatus = {
    authStatus: initialAuthStatus,
    setAuthStatus: () => initialAuthStatus,
    allTokens: {
        celts: [],
        others: []
    },
    setTokens:() => []
};

const AppContext = createContext(initialAppContext);

enum AppContextActionType {
    setAuthStatus,
    setTokens,
}

type AppContextActions = 
|{ type: AppContextActionType.setAuthStatus; status: SignStatus}
|{ type: AppContextActionType.setTokens; tokens: AllTokens}

const AppContextReducer = (state: AppContextStatus, action: AppContextActions) => {
switch (action.type) {
    case AppContextActionType.setAuthStatus:
        return { ...state, authStatus: action.status ?? initialAuthStatus };
    case AppContextActionType.setTokens:
        return { ...state, allTokens: action.tokens};
    default:
        return { ...state};
    }
};

export const AppContextProvider: React.FC = ({ children }) => {
    const [appState, dispatch] = useReducer(AppContextReducer, initialAppContext);
    const dispatchAuthStatus = (status: SignStatus) => {
    dispatch({ type: AppContextActionType.setAuthStatus, status: status });
    };
    const dispatchTokens = (tokens: AllTokens) => {
        dispatch({ type: AppContextActionType.setTokens, tokens: tokens});
    };
    return (
        <AppContext.Provider
            value={{
                authStatus: appState.authStatus,
                setAuthStatus: dispatchAuthStatus,
                allTokens:appState.allTokens,
                setTokens:dispatchTokens
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContextStore = () => useContext(AppContext);
