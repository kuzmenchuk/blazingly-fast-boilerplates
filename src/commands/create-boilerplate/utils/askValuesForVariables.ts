import { copy } from "../../../copy/index";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { ConfigService } from "../../../services/config.service";
import { TemplatesService } from "../../../services/templates.service";
import { TPipeFn } from "../create-boilerplate.types";

const userCommunicationInstance = UserCommunicationService.getInstance();
const templateInstance = TemplatesService.getInstance();
const configInstance = ConfigService.getInstance();

export const askValuesForVariables: TPipeFn = async (args) => {
  const { variablesToAsk } = templateInstance.config(args.data.templateName);
  const variables = configInstance
    .getAllVariables()
    .filter((variable) => variablesToAsk.includes(variable.name));

  const variablesEntries: [string, string][] = [];

  for (const variable of variables) {
    const answer = await userCommunicationInstance.askInput({
      title: copy.provideValueFor.concat(variable.name),
    });
    variablesEntries.push([variable.name, answer]);
  }

  args.data.variableValues = Object.fromEntries(variablesEntries);

  return args;
};
