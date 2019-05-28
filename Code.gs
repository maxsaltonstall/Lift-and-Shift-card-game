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
  var deckId = copyTemplateFile();
  var deck = SlidesApp.openById(deckId);
  
  // Grab the card data from this Sheet.
  var sheet = SpreadsheetApp.getActive().getSheetByName(DATA_SHEET_NAME);
  var data = sheet.getDataRange();
  var dataRows = data.getNumRows();
  var dataCols = data.getNumColumns();
  var dataValues = sheet.getDataRange().getValues();
  var numCards = dataRows - HEADER_ROWS;
  Logger.log("numCards: " + numCards + " cards brought in"); // debug: delete me later
  
  // Copy data from each row into a new slide, for each card
  var templateCard = deck.getSlides()[0];
  var sheetRow = [];

  for (var cardIndex = 0; cardIndex < 5; cardIndex++) {
    var cardSlide = templateCard.duplicate(); // slide we're editing now
    sheetRow = dataValues[cardIndex + HEADER_ROWS]; // skip sheet headers, one row = one card
    var title = sheetRow[0];
    var tier = sheetRow[1];
    var cost = sheetRow[8];
    var benefit = sheetRow[16];
    var victory = sheetRow[18];
    var played = sheetRow[19];
    var bought = sheetRow[20];
    cardSlide.replaceAllText('{title}', title);
    cardSlide.replaceAllText('{tier}', tier);
    cardSlide.replaceAllText('{cost}', cost);
    cardSlide.replaceAllText('{benefit}', benefit);
    cardSlide.replaceAllText('{victory}', victory);
    cardSlide.replaceAllText('{ability}', played + '\n' + bought);
  }
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
