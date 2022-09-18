// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const commentType : { [key:string]: string} = {
	js: '//',
	py: '#',
	cpp: '//',
	ts: '//'
};

const commentStarts = [
	'The function of this line is ',
	'The most important line of the entire file is ',
	'Sometimes I wonder why I have so many things when in reality I just need this line of code ',
	'The expensive electricity bill that I pay is worth it because of this line of code ',
	'Why fall in love when you can have this line of code ',
	'One thing I really enjoy about this line in particular is ',
	'Why take drugs when I could stare at ',
	'Satoshi Nakamoto would come out of hiding to look at ',
	'Give me liberty or give me ',
	'When I need help I go to stack overflow, when stackoverflow needs help it looks at '
];

const preComments = [
	'This line ',
	'I really do think this line ',
	'I think this line ',
	'This line ',
	'If this line ',
	'When I die, I want this line of code ',
	'The line ',
	'In reality this line of code '
];

const postComments = [
	' is just so beautiful',
	' is the best code I have ever done in my entire life',
	' would make Mark Zuckerberg proud',
	' would make me the next Bill Gates',
	' didn’t exist, the whole code would fail',
	' written on my grave',
	' brings intense joy to my life',
	' is the secret to the meaning of life'
];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const reminderDisp = vscode.commands.registerCommand('essentialextension.reminder', () => {
		reminder();
	});
	const bananaUpDisp = vscode.commands.registerCommand('essentialextension.bananaUp', () => {
		banana("up");
	});
	const bananaDownDisp = vscode.commands.registerCommand('essentialextension.bananaDown', () => {
		banana("down");
	});
	const bananaLeftDisp = vscode.commands.registerCommand('essentialextension.bananaLeft', () => {
		banana("left");
	});
	const bananaRightDisp = vscode.commands.registerCommand('essentialextension.bananaRight', () => {
		banana("right");
	});
	context.subscriptions.push(reminderDisp);
	context.subscriptions.push(bananaUpDisp);
	context.subscriptions.push(bananaDownDisp);
	context.subscriptions.push(bananaLeftDisp);
	context.subscriptions.push(bananaRightDisp);
}

function reminder() {
	const editor = vscode.window.activeTextEditor!;
	let index = editor.selection.active.line;
	let lineText = editor.document.lineAt(index).text;
	vscode.commands.executeCommand("type", { text: "\n" });
	let file = editor.document.fileName.split(".");
	let fileType = file[file.length - 1];
	if (lineText.trim().substring(0,commentType[fileType].length) !== commentType[fileType] && lineText.trim() !== '') {
		let commentText= '';
		if(Math.floor(Math.random() * 2) === 0){
			let index = Math.floor(Math.random() * 10);
			commentText = commentType[fileType] + commentStarts[index] + lineText.trim();
		}else {
			let index = Math.floor(Math.random() * 8);
			commentText = commentType[fileType] + preComments[index] + lineText.trim() + postComments[index];
		}
		vscode.commands.executeCommand("type", { text: commentText });
		vscode.commands.executeCommand("type", { text: "\n" });
	}
}

function banana(direction:string) {
	const editor = vscode.window.activeTextEditor!;
	if(Math.floor(Math.random() * 4) === 0){
		let index = editor.selection.active.line;
		let totalLines = editor.document.getText().split(/\r\n|\r|\n/).length;		
		let movement = Math.floor(Math.random()*totalLines) - index;
		console.log(movement);
		vscode.commands.executeCommand("cursorMove",{to: 'down', by: 'line', value: movement});
		let file = editor.document.fileName.split(".");
		let fileType = file[file.length - 1];
		let funny = commentType[fileType] + "You slipped on a banana";
		vscode.commands.executeCommand("type", { text: funny });
	}else{
		vscode.commands.executeCommand("cursorMove",{to: direction});
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }
