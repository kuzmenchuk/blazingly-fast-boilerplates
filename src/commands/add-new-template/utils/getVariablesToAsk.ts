import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getVariablesToAsk: TPipeFn = async (arg) => {
  const answer = (await userCommunicationInstance.askOptions(
    arg.helperData.variables.map((variable) => variable.name),
    {
      title: "Please, choose the variables you want to use for this template.",
      canPickMany: true,
    }
    // because of canPickMany: true
  )) as unknown as string[];

  arg.data.config.variablesToAsk = answer;

  return arg;
};
