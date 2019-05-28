var TEMPLATE_ID = '1XnU1wxuIxXL0s0-Zvqc8v6QmqONpkjsdvfO3fvdBvE0'; // Default template ID.
var CARDS_PER_ROW = 4;
var DATA_SHEET_NAME = 'Cards ALL -deck';
var HEADER_ROWS = 3;

/**
 * Create a open translate menu item.
 * @param {Event} event The open event.
 */
function onOpen(event) {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Generate Cards', 'generateCards')
      .addToUi();
}

/**
 * Open the Add-on upon install.
 * @param {Event} event The install event.
 */
function onInstall(event) {
  onOpen(event);
}

/**
 * Prepares copy of card template to add our data
 */
function copyTemplateFile() {
  var copyTitle = 'Test Card Game ' + Utilities.formatDate(new Date(), "GMT-5", "yyyy-MM-dd HH:mm:ss");
  var template = DriveApp.getFileById(TEMPLATE_ID)
  var deckFile = template.makeCopy(copyTitle)
  return deckFile;
}
