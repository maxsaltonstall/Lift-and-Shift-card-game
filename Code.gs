/* TODOs
    Prompt for template ID OR use drive picker
    https://developers.google.com/apps-script/guides/dialogs#file-open_dialogs
    https://stackoverflow.com/questions/44188017/google-apps-script-using-googles-file-picker-on-a-standalone-script
    https://developers.google.com/picker/docs/
    
    Delete first template card copy after making rest of cards
    Show link to cards generated after success
    Detect frozen rows to skip over
*/
    
// Default template ID.
var TEMPLATE_ID = '1XnU1wxuIxXL0s0-Zvqc8v6QmqONpkjsdvfO3fvdBvE0';
var CARDS_PER_ROW = 4;
var DATA_SHEET_NAME = 'Cards ALL 6 res -deck';
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
 * Prompt for choice of template slide to generate cards from
 * Validate formatting matches expectations
 */
function getTemplateId() {
  var ui = SpreadsheetApp.getUi();
  // TODO: Switch to Drive Picker
  ui.prompt("Please input the ID of your card template", ui.ButtonSet.OK_CANCEL);
  
}

function showCardGame() {
  var ui = SpreadsheetApp.getUi();
  // add final id
  ui.alert("Your cards are available here: ");
}

/**
 * Creates a deck of cards using the data in the user's Drive. 
 */
function generateCards() {
  getTemplateId();
  // Create a presentation from the cards template
  var deckId = copyTemplateFile();
  var deck = SlidesApp.openById(deckId);
  
  // Grab the card data from this Sheet.
  var sheet = SpreadsheetApp.getActiveSheet(); //.getSheetByName(DATA_SHEET_NAME);
  var data = sheet.getDataRange();
  var dataRows = data.getNumRows();
  var dataCols = data.getNumColumns();
  var dataValues = sheet.getDataRange().getValues();
  var numCards = dataRows - HEADER_ROWS;
  Logger.log("numCards: " + numCards + " cards brought in"); // debug: delete me later
  
  // Copy data from each row into a new slide, for each card
  var templateCard = deck.getSlides()[0];
  var sheetRow = [];

  for (var cardIndex = 0; cardIndex < dataRows - HEADER_ROWS; cardIndex++) {   //TEMP: limit how many cards generated
    sheetRow = dataValues[cardIndex + HEADER_ROWS]; // skip sheet headers, one row = one card
    for (var cardDupes = 0; cardDupes < sheetRow[18]; cardDupes++) {
      makeCard(sheetRow, templateCard);
      }
  }
}

/**
 * Replace text on the template based on row of data, repeat as needed
 */
function makeCard(sheetRow, templateSlide) {
    var cardSlide = templateCard.duplicate(); // slide we're editing now
    var title = sheetRow[0];
    var tier = sheetRow[2];
    var cost = sheetRow[9];
    var benefit = sheetRow[17];
    var victory = sheetRow[19];
    var ability = sheetRow[20];
    var flavor = sheetRow[21];
    cardSlide.replaceAllText('{title}', title);
    cardSlide.replaceAllText('{tier}', tier);
    cardSlide.replaceAllText('{cost}', cost.substring(cost.length-1));
    cardSlide.replaceAllText('{benefit}', benefit);
    cardSlide.replaceAllText('{victory}', victory);
    cardSlide.replaceAllText('{ability}', ability);
    cardSlide.replaceAllText('{flavor}', flavor);
}

/**
 * Prepares copy of card template to add our data
 */
function copyTemplateFile() {
  var copyTitle = 'Test Card Game ' + Utilities.formatDate(new Date(), "GMT-5", "yyyy-MM-dd HH:mm:ss");
  var template = DriveApp.getFileById(TEMPLATE_ID)
  var deckFile = template.makeCopy(copyTitle)
  return deckFile.getId();
}
