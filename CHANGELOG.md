# Changelog

## Version 0.5.4 - Dependency updates
- Update all dependencies to the latest versions
- Rename copy options
    - Copy to Discord -> Copy for Discord/New Reddit
    - Copy to Reddit -> Copy for Old Reddit

## Version 0.5.3 - Remove unnecessary opening of new document
- Previously when selecting code and choosing to Copy to Discord/Reddit, it would open a new document with your selected code.  This has been removed

## Version 0.5.2 - Backtick Escape Functionality Bug Fix
- Fixed a bug in the backtick escape feature introduced in version 0.5.0. The function now correctly returns the original text when there are no triple backticks present.
- Refined the backtick escape feature to accurately target and escape only triple backticks, leaving single and double backticks untouched. This enhancement further ensures precision and appropriate code formatting for Discord's markdown.

## Version 0.5.1 - Backtick Escape Feature Enhancement
- Enhanced the backtick escape feature introduced in version 0.5.0. The updated feature now only escapes backticks if triple backticks are present, refining its functionality and ensuring more precise code formatting for Discord's markdown.


## Version 0.5.0 - Backtick Escape Feature
- Introduced functionality for escaping backticks (`) in code when copying to Discord. This provides more accurate code formatting for Discord's markdown.

## Version 0.4.2 - Code Indentation Fix Rework
- Reworked the fix introduced in version 0.0.5. This change enhances the handling of indented code copying, providing a better user experience.

## Version 0.4.1 - Code Indentation Fix
- Added a fix that improves handling of indented code when copying. This fix ensures properly formatted code across various platforms.

## Version 0.4.0 - JSON Support
- Extended the support to include JSON. Users can now convert their JSON files with this version, enabling wider usage.

## Version 0.3.0 - Automatic Formatter Integration
- Added automatic formatting based on the user's selected language formatter. This feature allows for easier and more streamlined code formatting across different languages.

## Version 0.2.0 - Old Reddit Markdown Support
- Expanded support to include old Reddit Markdown. This makes the extension more versatile, allowing users to format text for both Discord and Reddit.

## Version 0.1.0 - Initial Release
- The initial build of the extension, providing support for Discord Markdown. This first version allows users to format their code snippets for sharing on Discord.