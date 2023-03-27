import { copy } from "../../copy/index";
import { ConfigService } from "../../services/config.service";
import { UserCommunicationService } from "../../services/user-communication.service";
import { IVariable } from "../../types/index";
import { getVarName } from "./utils/getVarName";

export const addVariables = async () => {
  const configInstance = ConfigService.getInstance();
  const userCommunicationInstance = UserCommunicationService.getInstance();

  const variables: IVariable[] = [];

  try {
    const addingVariableRecursive = async () => {
      variables.push({ name: await getVarName() });

      const answer = await userCommunicationInstance.askOptions(
        [copy.oneMore, copy.thatsAll],
        { title: copy.doYouWannaAddMoreVars }
      );

      if (answer === copy.oneMore) {
        await addingVariableRecursive();
      }
    };

    await addingVariableRecursive();
  } catch (error) {
    console.log(error);
  } finally {
    if (variables.length > 0) {
      configInstance.addVariables(variables);
    }

    return variables;
  }
};
