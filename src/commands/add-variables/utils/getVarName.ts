import { copy } from "../../../copy";
import { UserCommunicationService } from "../../../services/user-communication.service";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getVarName = async (): Promise<string> => {
  const name = await userCommunicationInstance.askInput({
    title: copy.provideNameOfVar,
    placeHolder: "$$NAME",
  });

  if (name.startsWith("$$")) {
    return name;
  }

  await userCommunicationInstance.askApprove({
    title: copy.startVarNameWithDollars,
  });

  return getVarName();
};
