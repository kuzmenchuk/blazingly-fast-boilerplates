import { UserCommunicationService } from "../../../services/user-communication.service";
import { ConfigService } from "../../../services/config.service";
import { TemplatesService } from "../../../services/templates.service";
import { TPipeFn } from "../create-boilerplate.types";

const userCommunication = UserCommunicationService.getInstance();
const template = TemplatesService.getInstance();
const config = ConfigService.getInstance();

export const getVariableValues: TPipeFn = async (args) => {
  const { variablesToAsk } = template.config(args.data.templateName);
  const variables = config
    .getAllVariables()
    .filter((variable) => variablesToAsk.includes(variable.name));

  const variablesEntries = await Promise.all(
    variables.map(async (variable) => {
      const answer = await userCommunication.askInput({
        title: `Please, provide the value for ${variable.name}.`,
        prompt: variable.description,
      });
      return [variable.name, answer];
    })
  );

  args.data.variableValues = Object.fromEntries(variablesEntries);

  return args;
};
