import * as vscode from "vscode";
import { FsService } from "../../../services/fs.service";
import { PathService } from "../../../services/path.service";
import { getStringPositionInFile, replaceWithValues } from "../../../utils";
import { TPipeFn } from "../create-boilerplate.types";

const fsInstance = FsService.getInstance();
const pathInstance = PathService.getInstance();

export const openFileAfterBoilerplateCreated: TPipeFn = async (arg) => {
  const { templateConfig, data } = arg;

  if (!templateConfig) {
    throw new Error("Template config should exist");
  }

  if (!templateConfig.fileToOpenAfterBoilerplateCreated) {
    return arg;
  }

  const fileName = templateConfig.fileToOpenAfterBoilerplateCreated;
  const filePath = pathInstance.templates(data.templateName, fileName);
  const fileData = replaceWithValues(
    fsInstance.readFile(filePath),
    data.variableValues
  );
  const fileNameToOpen = replaceWithValues(fileName, data.variableValues);

  const editor = await fsInstance.openFile(
    templateConfig.path.concat("/" + fileNameToOpen)
  );

  const cursorPosition = getStringPositionInFile(fileData, new RegExp(/\$1/));

  if (cursorPosition) {
    let newPosition = editor.selection.active.with(...cursorPosition);
    let newSelection = new vscode.Selection(newPosition, newPosition);
    editor.selection = newSelection;

    editor.edit((edit) => {
      const start = new vscode.Position(...cursorPosition);
      const end = new vscode.Position(cursorPosition[0], cursorPosition[1] + 2); // $1 === 2 more characters
      edit.delete(new vscode.Range(start, end));
    });
  }

  return { templateConfig, data };
};
