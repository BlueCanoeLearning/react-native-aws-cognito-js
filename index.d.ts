
declare module "react-native-aws-cognito-js" {

    /**
     * Error type returned from CognitoUser.authenticateUser().
     * Code parameter is used to determine if user account needs verification
     * //FIXME: CognitoError should just be merged with this now that we have a grasp on all the possible error messages
     */
    export interface CognitoAccountError extends Error {
        code?: string;
        time?: string;
        region?: string;
        hostname?: string;
        retryable?: boolean;
    }
    
    export interface CognitoLoginCallback {
        onSuccess: (userSession: CognitoUserSession) => void;
        onFailure: (error: CognitoAccountError) => void;
        newPasswordRequired: (userAttributes: CognitoUserAttribute, rawAttributes: any) => void;
        mfaRequired: ((challengeName: string, challengeParameters: any) => void) | null;
        customChallenge: any;
    }
    export class AuthenticationDetails {
        constructor(data: any);
    }

    export class CognitoUser {
        public username?: string;
        public deviceKey?: string;
        public storage: StorageHelper;

        constructor(data: { Username: string, Pool: CognitoUserPool });

        public authenticateUser(authDetails: AuthenticationDetails, callback: CognitoLoginCallback): void;
        public signOut(): void;
        public confirmRegistration(confirmationCode: string, forceAliasCreation: boolean, callback: (error?: Error) => void): void;
        public forgotPassword(handlers: { onSuccess: () => void, onFailure: (error: Error) => void, inputVerificationCode: any }): void
        public confirmPassword(confirmationCode: string, password: string, handlers: { onSuccess: (deviceKey: string) => void, onFailure: (error: Error) => void }): void;
        public resendConfirmationCode(callback: (error: Error) => void): void;
        public setDeviceStatusRemembered(handlers: { onSuccess: (successMessage: string) => void, onFailure: (error: Error) => void }): void;
        public getDevice(handlers: { onSuccess: (data: any) => void, onFailure: (error: Error) => void }): void;
        public refreshSession(refreshToken: CognitoRefreshToken, callback: (error: any, session: CognitoUserSession) => void): void;
        public getUserAttributes(callback: (error: Error, attributes: CognitoUserAttribute[]) => void): void;
        public updateAttributes(attributes: CognitoUserAttribute[], callback: (error?: Error) => void): void;
        public getSession(callback: (error: Error, session: CognitoUserSession) => void): void;
        public changePassword(oldUserPassword: string, newUserPassword: string, callback: (error: Error | null, result: 'SUCCESS' | null) => void): void;
    }

    export class CognitoUserAttribute {
        constructor(attr?: { Name: string, Value: string });
        public getValue(): string;
        public getName(): string;
    }

    export class CognitoUserPool {
        public storage: StorageHelper;
        constructor(data: {
            UserPoolId: string,
            ClientId: string,
            endpoint?: string
        });
        public signUp(username: string,
            password: string,
            userAttributes: CognitoUserAttribute[],
            validationData: any[],
            callback: (error: CognitoAccountError, result: any) => void): void;
    }

    export class CognitoUserSession {
        constructor(data: {
            IdToken: CognitoIdToken,
            AccessToken: CognitoAccessToken,
            RefreshToken: CognitoRefreshToken,
        });

        public isValid(): boolean;
        public getAccessToken(): CognitoAccessToken;
        public getIdToken(): CognitoIdToken;
        public getRefreshToken(): CognitoRefreshToken;
    }
    export class CognitoAccessToken {
        constructor(data: { AccessToken: string });

        public getJwtToken(): string;
        public getExpiration(): number;
    }

    export class CognitoIdToken {
        constructor(data: { IdToken: string });

        public getJwtToken(): string;
        public getExpiration(): number;
    }

    export class CognitoRefreshToken {
        constructor(data: { RefreshToken: string });

        public getToken(): string;
    }

    export class StorageHelper {
        public sync(callback: (err: Error | null, success: "SUCCESS" | null) => void): void;
    }
}