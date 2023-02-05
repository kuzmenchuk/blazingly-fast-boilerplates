export type TPipeFn = (args: IPipeFnOptions) => Promise<IPipeFnOptions>;

export interface IPipeFnOptions {
  data: {
    templateName: string;
    variableValues: {
      [variable: string]: string;
    };
  };
}
