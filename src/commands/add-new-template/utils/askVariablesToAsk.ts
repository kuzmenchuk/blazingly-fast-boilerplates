import { copy } from "../../../copy/index";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn, IPipeFnOptions } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const askVariablesToAsk: TPipeFn = async (arg) => {
  arg.data.config.variablesToAsk = await askUserToChooseVariables(arg);

  return arg;
};

const askUserToChooseVariables = async (
  arg: IPipeFnOptions
): Promise<string[]> => {
  const answer = (await userCommunicationInstance.askOptions(
    arg.helperData.variables.map((variable) => variable.name),
    {
      title: copy.chooseVarsYouWannaUse,
      canPickMany: true,
    }
    // vscode API type fix because of canPickMany: true
  )) as unknown as string[];

  // user should select at least one variable
  if (answer.length === 0) {
    await userCommunicationInstance.askApprove({
      title: copy.selectAtLeastOneVar,
    });
    return askUserToChooseVariables(arg);
  }

  return answer;
};
