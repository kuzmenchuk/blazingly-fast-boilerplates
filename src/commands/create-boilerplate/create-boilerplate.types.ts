import { ITemplateConfig } from "../../types/index";

export type TPipeFn = (args: IPipeFnOptions) => Promise<IPipeFnOptions>;

export interface IPipeFnOptions {
  data: {
    templateName: string;
    variableValues: {
      [variable: string]: string;
    };
  };
  templateConfig?: ITemplateConfig;
}
