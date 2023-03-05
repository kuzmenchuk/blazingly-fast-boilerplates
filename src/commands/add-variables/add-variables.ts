import { copy } from "../../copy/index";
import { ConfigService } from "../../services/config.service";
import { UserCommunicationService } from "../../services/user-communication.service";
import { IVariable } from "../../types/index";
import { getVarName } from "./utils/getVarName";

const configInstance = ConfigService.getInstance();
const userCommunicationInstance = UserCommunicationService.getInstance();

export const addVariables = async () => {
  const variables: IVariable[] = [];

  try {
    const adding = async () => {
      const name = await getVarName();
      variables.push({ name });

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
  } catch (error) {
    console.log(error);
  } finally {
    if (variables.length > 0) {
      configInstance.addVariables(variables);
    }

    return variables;
  }
};
