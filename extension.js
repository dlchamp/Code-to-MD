// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	vscode.commands.registerCommand('code-to-md.copyToDiscord', function () {
		// Copy the snippet to the clipboard matching Discord's markdown formatting
		// \`\`\` {language}
		// 	# selected code
		// \`\`\``

		{
			const editor = vscode.window.activeTextEditor;
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			const language = editor.document.languageId;
			const formattedText = `\`\`\`${language}\n${text}\n\`\`\``;

			vscode.env.clipboard.writeText(formattedText);
		}
	});

	vscode.commands.registerCommand('code-to-md.copytoReddit', function () {
		// Copy the selected snippet to the clipboard using Reddit's old style markdown formatting
		// Where each line of code has affixed 4 extra spaces 

		{
			const editor = vscode.window.activeTextEditor;
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			const formattedText = text.trim().split('\n').map(line => '    ' + line).join('\n');

			vscode.env.clipboard.writeText(formattedText);
		}
	});
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
