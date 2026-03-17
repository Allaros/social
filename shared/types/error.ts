export class ApiError extends Error {
   code?: string;
   status?: number;
   handled?: boolean;

   constructor(
      message: string,
      code?: string,
      status?: number,
      handled = false
   ) {
      super(message);
      this.code = code;
      this.status = status;
      this.handled = handled;
   }
}
