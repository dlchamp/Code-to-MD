const vscode = require('vscode');

async function getEditorSelection() {
	const editor = vscode.window.activeTextEditor;
	const selectedText = editor.document.getText(editor.selection);
	const language = editor.document.languageId;
	const prettifiedText = await formatSelectedText(selectedText, language);

	return [prettifiedText, language];
}

async function formatSelectedText(text, language) {
	const untitledDocument = await vscode.workspace.openTextDocument({ content: text, language });
	const formattedDocument = await vscode.commands.executeCommand('editor.action.formatDocument', untitledDocument.uri);
	const formattedText = formattedDocument ? formattedDocument.getText() : text;
	const initialIndentation = formattedText.match(/^\s*/)[0];
	const leftAlignedText = formattedText.split('\n').map(line => line.replace(initialIndentation, '')).join('\n');

	return leftAlignedText;
}

function escapeBackticks(text) {
	if (/```/.test(text)) {
		return text.replace(/```/g, '\\`\\`\\`');
	}
	return text
}

function removeInitialIndentation(text) {
	const lines = text.split('\n');
	const minIndentation = Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^\s*/)[0].length));

	return lines.map(line => line.slice(minIndentation)).join('\n');
}

async function copyToDiscord() {
	const [text, language] = await getEditorSelection();
	const escapedText = escapeBackticks(text)
	const leftAlignedText = removeInitialIndentation(escapedText);
	const formattedText = `\`\`\`${language}\n${leftAlignedText}\n\`\`\``;
	await vscode.env.clipboard.writeText(formattedText);
}

async function copyToReddit() {
	const [text, _] = await getEditorSelection();
	const leftAlignedText = removeInitialIndentation(text)
	const formattedText = leftAlignedText.split('\n').map(line => '    ' + line).join('\n');
	await vscode.env.clipboard.writeText(formattedText);
}

function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('code-to-md.copyToDiscord', copyToDiscord),
		vscode.commands.registerCommand('code-to-md.copyToReddit', copyToReddit)
	);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate,
};
