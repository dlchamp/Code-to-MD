const vscode = require('vscode');
const json5 = require('json5');

function activate(context) {
	vscode.commands.registerCommand('code-to-md.copyToDiscord', copyToDiscord);
	vscode.commands.registerCommand('code-to-md.copyToReddit', copyToReddit);
}

function deactivate() { }

async function getEditorSelection() {
	const editor = vscode.window.activeTextEditor;
	const selectedText = editor.document.getText(editor.selection);
	const language = editor.document.languageId;
	const prettifiedText = await formatSelectedText(selectedText, language);

	return [prettifiedText, language];
}

function removeInitialIndentation(text) {
	const lines = text.split('\n');
	const minIndentation = Math.min(
		...lines
			.filter(line => line.trim())
			.map(line => line.match(/^\s*/)[0].length)
	);

	return lines
		.map(line => line.slice(minIndentation))
		.join('\n');
}

function copyToDiscord() {
	getEditorSelection().then(([text, language]) => {
		const leftAlignedText = removeInitialIndentation(text);
		const formattedText = `\`\`\`${language}\n${leftAlignedText}\n\`\`\``;
		vscode.env.clipboard.writeText(formattedText);
	});
}



function copyToReddit() {
	getEditorSelection().then(([text, _]) => {
		const formattedText = text.split('\n').map(line => '  ' + line).join('\n');
		vscode.env.clipboard.writeText(formattedText);
	});
}


async function formatSelectedText(text, language) {
	const untitledDocument = await vscode.workspace.openTextDocument({
		content: text,
		language,
	});

	const formattedDocument = await vscode.commands.executeCommand(
		'editor.action.formatDocument',
		untitledDocument.uri,
	);

	const formattedText = formattedDocument ? formattedDocument.getText() : text;

	// Calculate the initial indentation of the first line
	const initialIndentation = formattedText.match(/^\s*/)[0];

	// Remove the initial indentation from all lines
	const leftAlignedText = formattedText
		.split('\n')
		.map(line => line.replace(initialIndentation, ''))
		.join('\n');

	return leftAlignedText;
}


module.exports = {
	activate,
	deactivate,
};
