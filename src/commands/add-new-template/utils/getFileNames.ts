import { copy } from "../../../copy/index";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getFileNames: TPipeFn = async (arg) => {
  const variable = arg.helperData.variables[0]?.name ?? "$$NAME";

  const answer = await userCommunicationInstance.askInput({
    title: copy.provideFilenamesWithSeparator,
    placeHolder: [".component.tsx", ".modules.scss"]
      .map((str) => variable + str)
      .concat("index.ts")
      .join(","),
  });

  arg.data.fileNames = answer.split(",").map((str) => str.trim());

  return arg;
};
