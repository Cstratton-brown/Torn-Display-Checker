function updateMarketValue()
{
  var apiKey = 'torn_api_key';
  // Get the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Identify the sheet in the spreadsheet to use
  // Load item reference JSON  
  const jsonItemString = HtmlService.createHtmlOutputFromFile("item_reference.json.html").getContent();
  const priceReference = JSON.parse(jsonItemString);
  var url = 'https://api.torn.com/torn/?selections=items&key=' + apiKey;

 // Make API request
  var response = UrlFetchApp.fetch(url);

  if (response.getResponseCode() == 200) 
    {
      var itemData = JSON.parse(response.getContentText());
      
      var items = itemData.items;

      for (var ID in items) 
      {
        if (items.hasOwnProperty(ID))
        {
          var itemId = items[ID];
          if (priceReference.items[itemId.name])
          {
            // If found, log the item name and market value
            var item = priceReference.items[itemId.name];
            var itemColumn = priceReference.items[itemId.name].collumn;
            if (items[ID].type == 'Flower')
            {
              var sheet = spreadsheet.getSheetByName('Flowers');
              // Return the collum of the username cell
              var cellRow = '26';
              
            }
            else if (items[ID].type == 'Plushie')
            {
              var sheet = spreadsheet.getSheetByName('Plushies');           
              // Return the collum of the username cell 
              var cellRow = '26';             

            }
            else if  (items[ID].type == 'Artifact')
            {
              var sheet = spreadsheet.getSheetByName('Artifacts');           
              // Return the collum of the username cell
              var cellRow = '24';
            }
            sheet.getRange(cellRow, itemColumn).setValue(items[ID].market_value); 
          }
        }
      }
    }
}

function emptySpreadsheet() 
{
  //replaces all numerical values in the tables with a value of 0 
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Flowers').getRange(3, 3, 20, 11).setValue(0);
  //gets active spreadsheet, specifies the flowers sheet, sets the tables range, specifies the value to fill the range with
  
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Plushies').getRange(3, 3, 20, 13).setValue(0);
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Artifacts').getRange(3, 2, 20, 3).setValue(0);
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Artifacts').getRange(3, 6, 20, 3).setValue(0)
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Artifacts').getRange(3, 10, 20, 3).setValue(0)
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Artifacts').getRange(3, 14, 20, 4).setValue(0)
  Logger.log('Sheet Cleared');
}

function tallyChanges() {
  // Set a comment on the edited cell to indicate when it was changed.
  var discordUrl = "discord_webhook_url";

  var sheetname = SpreadsheetApp.getActiveSpreadsheet();

  //var plushieMaths =SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Plushies').getRange(3, 23, 1, 13).getValues;
  //Logger.log(plushieMaths);

  //var lowestPlushie;
  //var lowestFlower;
  var totalPoints = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Maths').getRange('S9').getValue();
  var totalFlowerSets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Flowers').getRange('N23').getValue();
  var totalPlushieSets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Plushies').getRange('P23').getValue();
  var totalSets = totalFlowerSets + totalPlushieSets;

  var message = " Total Sets: " + totalSets + " Total Points: " + totalPoints;
  
  var payload = JSON.stringify({content: message});
  
  var params = {
    method: "POST",
    payload: payload,
    muteHttpExceptions: true,
    contentType: "application/json"
    };

  var response = UrlFetchApp.fetch(discordUrl, params);

}

function checkDisplays() 
{
  emptySpreadsheet();
  updateMarketValue();
  var apiKey = 'torn_api_key';
  // initialization of variables used to store info from the json files
  var itemType = 'null';
  var flowerType = 'flower';
  var plushieType = 'plushie';
  var artifactType= 'Artifact';
  var itemAmount = '0';
  // Get the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Identify the sheet in the spreadsheet to use
  var sheet = spreadsheet.getSheetByName('Plushie/Flower Totals');


  // Load item reference JSON  
  const jsonItemString = HtmlService.createHtmlOutputFromFile("item_reference.json.html").getContent();
  const itemReference = JSON.parse(jsonItemString);

  // Load user mapping JSON
  const jsonUsersString = HtmlService.createHtmlOutputFromFile("user_mapping.json.html").getContent();
  const userMapping = JSON.parse(jsonUsersString);


  // Iterate through all users in the mapping
  for (var userID in userMapping.users) 
  {
    if (userMapping.users.hasOwnProperty(userID)) 
    {
      var url = 'https://api.torn.com/user/' + userID + '?selections=display,profile&key=' + apiKey;

      //Logger.log('User: ' + userID);

      // Make API request
      var response = UrlFetchApp.fetch(url);

      if (response.getResponseCode() == 200) 
      {
        var userData = JSON.parse(response.getContentText());
        var userName = userID;
        // Get display case information
        var displayCase = userData.display;

        // Find the rows with the user ID using user mapping
        var userRow = userMapping.users[userName].row;

        // Iterate through all items in the display case
        for (var itemID in displayCase) 
        {
          if (displayCase.hasOwnProperty(itemID)) 
          {
            var itemInfo = displayCase[itemID];

            // Check if the item has a name and quantity
            if (itemInfo && 'name' in itemInfo && 'quantity' in itemInfo) 
            {
              var itemName = itemInfo.name;
              var itemAmount = itemInfo.quantity

              // Check if the item is present in the item reference JSON
              if (itemReference.items[itemName])
              {
                // Retrieve the attribute associated with the item
                var itemType = itemReference.items[itemName].type;
                var itemColumn = itemReference.items[itemName].collumn;
                // Find the cell containing the flower name in the specified range
                if (itemType == flowerType)
                {
                  var sheet = spreadsheet.getSheetByName('Flowers');
                }
                else if (itemType == plushieType)
                {
                  var sheet = spreadsheet.getSheetByName('Plushies');          
                }
                else if (itemType == artifactType)
                {
                  var sheet = spreadsheet.getSheetByName('Artifacts');     
                }
                //insert the returned quantity of the item into the cell based of the row of username and the collum of the item name
                sheet.getRange(userRow, itemColumn).setValue(itemAmount);              
              } 
              else
              {
                //Logger.log('Warning: Item "' + itemName + '" not found in itemReference.json.');
                // Handle the case when the item is not found in the reference (e.g., log a warning)
              }
            }
          }
        }      
      }
    }
  }
  tallyChanges();
}
