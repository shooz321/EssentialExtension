// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const reminderDisp = vscode.commands.registerCommand('essentialextension.reminder', () => {
		reminder();
	});
	context.subscriptions.push(reminderDisp);
}

function reminder() {
	const editor = vscode.window.activeTextEditor!;
	let index = editor.selection.active.line;
	let lineText = editor.document.lineAt(index).text;
	vscode.commands.executeCommand("type", { text: "\n" });
	console.log(lineText);
	if (lineText.trim()[0] !== '#' && lineText.trim() !== '') {
		let commentText = '#The function of this line is ' + lineText.trim();
		vscode.commands.executeCommand("type", { text: commentText });
		vscode.commands.executeCommand("type", { text: "\n" });
	}
}


// this method is called when your extension is deactivated
export function deactivate() { }
