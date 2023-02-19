import { copy } from "../../../copy/index";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { ConfigService } from "../../../services/config.service";
import { TemplatesService } from "../../../services/templates.service";
import { TPipeFn } from "../create-boilerplate.types";

const userCommunicationInstance = UserCommunicationService.getInstance();
const templateInstance = TemplatesService.getInstance();
const configInstance = ConfigService.getInstance();

export const getVariableValues: TPipeFn = async (args) => {
  const { variablesToAsk } = templateInstance.config(args.data.templateName);
  const variables = configInstance
    .getAllVariables()
    .filter((variable) => variablesToAsk.includes(variable.name));

  const variablesEntries = await Promise.all(
    variables.map(async (variable) => {
      const answer = await userCommunicationInstance.askInput({
        title: copy.provideValueFor.concat(variable.name),
      });
      return [variable.name, answer];
    })
  );

  args.data.variableValues = Object.fromEntries(variablesEntries);

  return args;
};
