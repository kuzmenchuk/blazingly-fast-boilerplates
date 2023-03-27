import { TemplatesService } from "../../../services/templates.service";
import { TPipeFn } from "../create-boilerplate.types";

const templatesInstance = TemplatesService.getInstance();

export const getTemplateConfig: TPipeFn = async (args) => {
  args.templateConfig = templatesInstance.config(args.data.templateName);

  return args;
};
