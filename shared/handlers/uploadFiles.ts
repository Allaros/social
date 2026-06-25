export type UploadFilePayload = {
   file: File;
   signedUrl: string;
   storageKey: string;
};

export type UploadedFileMetadata = {
   storageKey: string;
   mimeType: string;
   size: number;
};

type UploadFilesOptions = {
   files: UploadFilePayload[];

   signal?: AbortSignal;

   onProgress?: (storageKey: string, progress: number) => void;
};

export const uploadFiles = async ({
   files,
   signal,
   onProgress,
}: UploadFilesOptions): Promise<UploadedFileMetadata[]> => {
   return Promise.all(
      files.map(
         (filePayload) =>
            new Promise<UploadedFileMetadata>((resolve, reject) => {
               const xhr = new XMLHttpRequest();

               const abortHandler = () => {
                  xhr.abort();
               };

               signal?.addEventListener('abort', abortHandler);

               xhr.upload.onprogress = (event) => {
                  if (event.lengthComputable && onProgress) {
                     onProgress(
                        filePayload.storageKey,
                        Math.round((event.loaded / event.total) * 100)
                     );
                  }
               };

               xhr.onload = () => {
                  signal?.removeEventListener('abort', abortHandler);

                  if (xhr.status >= 200 && xhr.status < 300) {
                     resolve({
                        storageKey: filePayload.storageKey,
                        mimeType: filePayload.file.type,
                        size: filePayload.file.size,
                     });
                  } else {
                     reject(
                        new Error(`Upload failed with status ${xhr.status}`)
                     );
                  }
               };

               xhr.onerror = () => {
                  signal?.removeEventListener('abort', abortHandler);

                  reject(new Error('Network error'));
               };

               xhr.onabort = () => {
                  signal?.removeEventListener('abort', abortHandler);

                  reject(new Error('Upload aborted'));
               };

               xhr.open('PUT', filePayload.signedUrl);

               xhr.setRequestHeader('Content-Type', filePayload.file.type);

               xhr.send(filePayload.file);
            })
      )
   );
};
