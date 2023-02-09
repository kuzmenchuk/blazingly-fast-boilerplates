import { ConfigService, IVariable } from "../../services/config.service";
import { UserCommunicationService } from "../../services/user-communication.service";

const configInstance = ConfigService.getInstance();
const userCommunicationInstance = UserCommunicationService.getInstance();

export const addVariables = async () => {
  const variables: IVariable[] = [];

  const adding = async () => {
    const name = await userCommunicationInstance.askInput({
      title:
        "Please, provide the name of the variable. Use uppercase snake case with $$ at the beginning.",
      placeHolder: "$$NAME",
    });
    const description = await userCommunicationInstance.askInput({
      title: "Please, provide the description of the variable",
    });

    variables.push({ name, description });

    const answer = await userCommunicationInstance.askOptions(
      ["One more", "That's all"],
      { title: "Do you wanna add one more variable?" }
    );
    const oneMore = answer === "One more";

    if (oneMore) {
      await adding();
    }
  };

  await adding();

  configInstance.addVariables(variables);

  return variables;
};
