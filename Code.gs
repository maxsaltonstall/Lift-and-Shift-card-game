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
 * Creates a deck of cards using the data in the user's Drive. 
 */
function generateCards() {
  // Create a presentation from the cards template
  var deck = copyTemplateFile()
  
  // Grab the card data from this Sheet.
  var sheet = SpreadsheetApp.getActive().getSheetByName(DATA_SHEET_NAME);
  var data = sheet.getDataRange();
  var dataRows = data.getNumRows();
  var dataCols = data.getNumColumns();
  var dataValues = sheet.getDataRange().getValues();
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
