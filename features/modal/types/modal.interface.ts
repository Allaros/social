export type EditableMedia =
   | {
        kind: 'existing';
        id: number;
        url: string;
        type: PostMediaType;
     }
   | {
        kind: 'new';
        file: File;
        preview: string;
        type: PostMediaType;
     };
