import * as vscode from "vscode";
import {
  addNewTemplate,
  addVariables,
  createBoilerplate,
} from "./commands/index";
import { init } from "./utils/index";

export function activate(context: vscode.ExtensionContext) {
  try {
    let newTemplate = vscode.commands.registerCommand(
      "blazingly-fast-boilerplates.addNewTemplate",
      () => init().then(addNewTemplate)
    );

    let newVariable = vscode.commands.registerCommand(
      "blazingly-fast-boilerplates.addVariables",
      () => init().then(addVariables)
    );

    let newBoilerplate = vscode.commands.registerCommand(
      "blazingly-fast-boilerplates.createBoilerplate",
      () => init().then(createBoilerplate)
    );

    context.subscriptions.push(newTemplate, newVariable, newBoilerplate);
  } catch (error) {
    console.log(error);
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
