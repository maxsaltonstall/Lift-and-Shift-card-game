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
