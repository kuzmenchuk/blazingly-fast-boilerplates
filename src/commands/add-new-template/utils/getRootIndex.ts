import { copy } from "../../../copy/index";
import { PathService } from "../../../services/path.service";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();
const pathInstance = PathService.getInstance();

export const getRootIndex: TPipeFn = async (arg) => {
  const answer = await userCommunicationInstance.askOptions(
    [copy.yes, copy.no],
    {
      title: copy.doYouWantAppendStringToGlobalFile,
    }
  );

  if (answer === copy.no) {
    return arg;
  }

  await userCommunicationInstance.askApprove({
    title: copy.selectFileWhereAppendString,
  });

  const file = await userCommunicationInstance.askChooseFile({
    canSelectMany: false,
    title: copy.selectFile,
    openLabel: copy.select,
    canSelectFiles: true,
    canSelectFolders: false,
  });

  const relativePath = pathInstance.createRelative(file.path);

  const variable = arg.helperData.variables[0]?.name ?? "$$NAME";

  const pattern = await userCommunicationInstance.askInput({
    title: copy.providePattern,
    placeHolder: `\\nexport { default as ${variable} } from "./${variable}";`,
    prompt: copy.youCanUseVarsAndN,
  });

  arg.data.config.rootIndex = {
    path: relativePath,
    pattern,
  };

  return arg;
};
