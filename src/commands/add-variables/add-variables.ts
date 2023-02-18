import { copy } from "../../copy/index";
import { ConfigService } from "../../services/config.service";
import { UserCommunicationService } from "../../services/user-communication.service";
import { IVariable } from "../../types/index";

const configInstance = ConfigService.getInstance();
const userCommunicationInstance = UserCommunicationService.getInstance();

export const addVariables = async () => {
  const variables: IVariable[] = [];

  const adding = async () => {
    const name = await userCommunicationInstance.askInput({
      title: copy.provideNameOfVar,
      placeHolder: "$$NAME",
    });
    const description = await userCommunicationInstance.askInput({
      title: copy.provideDescriptionOfVar,
    });

    variables.push({ name, description });

    const answer = await userCommunicationInstance.askOptions(
      [copy.oneMore, copy.thatsAll],
      { title: copy.doYouWannaAddMoreVars }
    );
    const oneMore = answer === copy.oneMore;

    if (oneMore) {
      await adding();
    }
  };

  await adding();

  configInstance.addVariables(variables);

  return variables;
};
