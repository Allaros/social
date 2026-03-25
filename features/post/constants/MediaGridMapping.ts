export type RowConfig = {
   count: number;
   cols: number;
};

export type Layout = {
   top: RowConfig;
   middle?: RowConfig;
   bottom?: RowConfig;
};

export const MediaGridMapping: Layout[] = [
   {
      top: { count: 1, cols: 1 },
   },
   {
      top: { count: 2, cols: 2 },
   },
   {
      top: { count: 1, cols: 1 },
      middle: { count: 2, cols: 2 },
   },
   {
      top: { count: 1, cols: 1 },
      middle: { count: 3, cols: 3 },
   },
   {
      top: { count: 2, cols: 2 },
      middle: { count: 3, cols: 3 },
   },
   {
      top: { count: 2, cols: 2 },
      middle: { count: 4, cols: 4 },
   },
   {
      top: { count: 2, cols: 2 },
      middle: { count: 2, cols: 2 },
      bottom: { count: 3, cols: 3 },
   },
   {
      top: { count: 2, cols: 2 },
      middle: { count: 3, cols: 3 },
      bottom: { count: 3, cols: 3 },
   },
   {
      top: { count: 2, cols: 2 },
      middle: { count: 3, cols: 3 },
      bottom: { count: 4, cols: 4 },
   },
   {
      top: { count: 2, cols: 2 },
      middle: { count: 4, cols: 4 },
      bottom: { count: 4, cols: 4 },
   },
];
