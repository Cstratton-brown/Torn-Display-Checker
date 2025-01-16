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

function checkDisplays() 
{
  var apiKey = 'YOUR_APIKEY_HERE'; 
  // rows for plushies and flowers text
  var itemType = 'null';
  var sheetName = '';
  var flowerType = 'flower';
  var plushieType = 'plushie';
  var cellRow = '1';
  var itemAmount = '0';
  // Get the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Replace 'Sheet1' with the name of your sheet
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

      Logger.log('User: ' + userID);

      // Make API request
      var response = UrlFetchApp.fetch(url);

      if (response.getResponseCode() == 200) 
      {
        var userData = JSON.parse(response.getContentText());
        var userName = userID;
        // Get display case information
        var displayCase = userData.display;

        // Find the rows with the user ID using user mapping
        var userIDRows = userMapping.users[userID];

        // Find the cell containing the username in the specified range
        var searchRangeNameFlower = sheet.getRange(4, 1, 6, 1);
        var searchRangeNamePlushie = sheet.getRange(15, 1, 6, 1);
        var usernameCellFlower = searchRangeNameFlower.createTextFinder(userName).findNext();
        var usernameCellPlushie = searchRangeNamePlushie.createTextFinder(userName).findNext();

        // Return the row of the username cell for flowers
        var cellRowFlower = usernameCellFlower.getRow();
        
        // Return the row of the username cell for plushies
        var cellRowPlushie = usernameCellPlushie.getRow();  

        //For loop to autofill item spaces with the value 0 before it checks the amounts in the display cases
        for (var itemName in itemReference.items)
        {
          if (itemReference.items.hasOwnProperty(itemName))
          {
            //Logger.log(itemName)
            // Retrieve the attribute associated with the item
            var itemType = itemReference.items[itemName].type;
            var sheetName = itemReference.items[itemName].name;

            // Find the cell containing the flower name in the specified range
            if (itemType == flowerType)
            {
            var searchRangeFlower = sheet.getRange(1, 3, 2, 15);
            var flowerCell = searchRangeFlower.createTextFinder(sheetName).findNext();
            // Return the collum of the username cell
            var cellCollum = flowerCell.getColumn(); 
            var cellRow = cellRowFlower;
            }

            // Find the cell containing the plushie name in the specified range
            else if (itemType == plushieType)
            {
            var searchRangePlushie = sheet.getRange(13, 3, 1, 20);
            var plushieCell = searchRangePlushie.createTextFinder(sheetName).findNext();                
            // Return the collum of the username cell
            var cellCollum = plushieCell.getColumn(); 
            var cellRow = cellRowPlushie;             
            }
            //insert the default quantity of the item into the cell based of the row of username and the collum of the item name
            sheet.getRange(cellRow, cellCollum).setValue(0);              
            } 
          }
        }

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
                var sheetName = itemReference.items[itemName].name;
                // Find the cell containing the flower name in the specified range
                if (itemType == flowerType)
                {
                  var searchRangeFlower = sheet.getRange(1, 3, 2, 15);
                  var flowerCell = searchRangeFlower.createTextFinder(sheetName).findNext();
                  // Return the collum of the username cell
                  var cellCollum = flowerCell.getColumn(); 
                  var cellRow = cellRowFlower;
                }
                else if (itemType == plushieType)
                {
                  // Find the cell containing the plushie name in the specified range
                  var searchRangePlushie = sheet.getRange(13, 3, 1, 20);
                  var plushieCell = searchRangePlushie.createTextFinder(sheetName).findNext();                
                  // Return the collum of the username cell
                  var cellCollum = plushieCell.getColumn(); 
                  var cellRow = cellRowPlushie;             
                }
                //insert the returned quantity of the item into the cell based of the row of username and the collum of the item name
                sheet.getRange(cellRow, cellCollum).setValue(itemAmount);              
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
}
