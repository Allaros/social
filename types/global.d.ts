interface ISignIn {
   email: string;
   password: string;
}

interface ISendRecoveryMail {
   email: string;
}

interface IChangePass {
   password: string;
   token: string;
}

interface ISignUp {
   email: string;
   password: string;
   name: string;
   username: string;
}

interface IVerify {
   code: string;
}

interface ApiErrorResponse {
   message: string;
   code?: string;
   statusCode: number;
}
