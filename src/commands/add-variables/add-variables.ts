import { ConfigService, IVariable } from "../../services/config.service";
import { UserCommunicationService } from "../../services/user-communication.service";

const config = ConfigService.getInstance();
const userCommunication = UserCommunicationService.getInstance();

export const addVariables = async () => {
  const variables: IVariable[] = [];

  const adding = async () => {
    const name = await userCommunication.askInput({
      title:
        "Please, provide the name of the variable. Use uppercase snake case with $$ at the beginning.",
      placeHolder: "$$NAME",
    });
    const description = await userCommunication.askInput({
      title: "Please, provide the description of the variable",
    });

    variables.push({ name, description });

    const answer = await userCommunication.askOptions(
      ["One more", "That's all"],
      { title: "Do you wanna add one more variable?" }
    );
    const oneMore = answer === "One more";

    if (oneMore) {
      await adding();
    }
  };

  await adding();

  config.addVariables(variables);

  return variables;
};
