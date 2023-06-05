# Code to Markdown for Visual Studio Code

A simple tool that will take your selected/highlighted code snippet from within VS Code, format it for Reddit or Discord markdown before placing it on your system's clipboard, ready to paste in either program.

The goal of this extension is to provide a utility that helps users always have nicely formatted code blocks when asking for help within various help/support servers and subreddits. 

## Installation

- Installing via .vsix file (windows)
    - Download the latest [release](https://github.com/dlchamp/Code-to-MD/releases/tag/v0.5.3)
    - Open Windows Command Prompt in at the location where you downloaded the file to
    - run `code --install-extension code-to-markdown-0.5.3.vsix`

- Installing via VSCode
    - Navigate to Extensions (Ctrl+Shift+X)
    - Search `Code to Markdown`
    - Install

- Install via Marketplace Link:
    - [Click Here](https://marketplace.visualstudio.com/items?itemName=DLCHAMP.code-to-markdown)


- Install via Open-VSX
    - [Click Here](https://open-vsx.org/extension/DLCHAMP/code-to-markdown)

## Instructions

1. Select a snippet of code from your project
2. Right-click and Select `Copy to Discord` or `Copy to Reddit`
3. Paste the selected and now formatted code within a Reddit post or comment, or Discord chat box.

## Example

![Example](https://github.com/dlchamp/Code-to-MD/blob/master/images/example.gif?raw=true)



# Disclaimer and Notes:

- I use old reddit, so the "Copy to Reddit" function is specifically designed for that.
- You can use the "Copy to Discord" or "Copy to Reddit" when copying to New Reddit, but you must be in markdown mode.  Fancy Pants editor seems to cause weird issues when pasting  
- When using the "Copy to Discord" button, it will include the language for proper syntax highlighting (ex: \`\`\`python {code} \`\`\`)  
- When copying functions or code that is indented away from the left margin, be sure to highlight all the way to the margin before copying so that it knows how to properly handle formatting the code under the first line
- It's only been tested with Python, JS/TS, and JSON.   It might work with other languages, but I can't guarantee it's success.


