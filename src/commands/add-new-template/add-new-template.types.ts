import { IVariable, ITemplateConfig } from "../../types/index";

export interface IPipeFnOptions {
  data: {
    name: string;
    fileNames: string[];
    config: ITemplateConfig;
  };
  helperData: {
    variables: IVariable[];
  };
}

export type TPipeFn = (arg: IPipeFnOptions) => Promise<IPipeFnOptions>;
