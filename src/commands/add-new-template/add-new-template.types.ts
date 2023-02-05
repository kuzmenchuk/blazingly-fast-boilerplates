import { IVariable } from "../../services/config.service";
import { ITemplateConfig } from "../../services/templates.service";

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
