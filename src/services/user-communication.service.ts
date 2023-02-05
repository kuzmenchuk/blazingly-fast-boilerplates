import * as vscode from "vscode";
import { assert } from "../utils/index";
import { PathService } from "./path.service";

interface Options {
  type: "error" | "info" | "warn";
  message: string;
  items?: string[];
}

const pathService = PathService.getInstance();

export class UserCommunicationService {
  private static instance: UserCommunicationService;

  private constructor() {}

  public static getInstance(): UserCommunicationService {
    if (!this.instance) {
      this.instance = new UserCommunicationService();
    }

    return this.instance;
  }

  public async showMessage({ type, message, items = [] }: Options) {
    const vscodeShowMessage = this.getMessageHandler(type);
    return vscodeShowMessage(message, ...items);
  }

  private getMessageHandler(type: Options["type"]) {
    switch (type) {
      case "error":
        return vscode.window.showErrorMessage;
      case "info":
        return vscode.window.showInformationMessage;
      case "warn":
        return vscode.window.showWarningMessage;
      default:
        return vscode.window.showWarningMessage;
    }
  }

  public async askInput(options?: vscode.InputBoxOptions) {
    const result = await vscode.window.showInputBox({
      ignoreFocusOut: true,
      ...options,
    });
    return assert(result);
  }

  public async askOptions(items: string[], options?: vscode.QuickPickOptions) {
    const result = await vscode.window.showQuickPick(items, options);
    return assert(result);
  }

  public async askChooseFile(options: vscode.OpenDialogOptions) {
    const defaultUri = pathService.workspaceUri();
    const file = await vscode.window.showOpenDialog({ defaultUri, ...options });
    return assert(file && file[0]);
  }
}
