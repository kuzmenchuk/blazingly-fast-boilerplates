import * as vscode from "vscode";
import {
  addNewTemplate,
  addVariables,
  createBoilerplate,
} from "./commands/index";

export function activate(context: vscode.ExtensionContext) {
  let newTemplate = vscode.commands.registerCommand(
    "blazingly-fast-boilerplates.addNewTemplate",
    addNewTemplate
  );

  let newVariable = vscode.commands.registerCommand(
    "blazingly-fast-boilerplates.addVariables",
    addVariables
  );

  let newBoilerplate = vscode.commands.registerCommand(
    "blazingly-fast-boilerplates.createBoilerplate",
    createBoilerplate
  );

  context.subscriptions.push(newTemplate, newVariable, newBoilerplate);
}

// This method is called when your extension is deactivated
export function deactivate() {}
