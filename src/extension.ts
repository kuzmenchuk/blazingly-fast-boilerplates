import * as vscode from "vscode";
import {
  addNewTemplate,
  addVariables,
  createBoilerplate,
} from "./commands/index";
import { init } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  let newTemplate = vscode.commands.registerCommand(
    "blazingly-fast-boilerplates.addNewTemplate",
    () => {
      init();
      addNewTemplate();
    }
  );

  let newVariable = vscode.commands.registerCommand(
    "blazingly-fast-boilerplates.addVariables",
    () => {
      init();
      addVariables();
    }
  );

  let newBoilerplate = vscode.commands.registerCommand(
    "blazingly-fast-boilerplates.createBoilerplate",
    () => {
      init();
      createBoilerplate();
    }
  );

  context.subscriptions.push(newTemplate, newVariable, newBoilerplate);
}

// This method is called when your extension is deactivated
export function deactivate() {}
