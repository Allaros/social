interface ISignIn {
   email: string;
   password: string;
}

interface ISendEmail {
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

interface IConfirmMagic {
   token: string;
}

interface IGetProfile {
   username: string;
}

type PostMediaType = 'image' | 'video';
