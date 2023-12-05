export type ResponseErr = {
    status?: number;
    error?: object;
  };
  
export type DisplayData = Object | Array<any> | string;
  
export type TypeStat = {
    type: string;
    percent: number;
    count: number;
};
  
export type DataStats = {
    total: number;
    typeCount: number;
    types: TypeStat[];
};
  
export type outputFormat = 'Text' | 'JSON'