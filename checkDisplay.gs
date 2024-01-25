function checkDisplays() 
{
  var apiKey = 'YOUR_APIKEY_HERE'; 
  // rows for plushies and flowers text
  var plushieRow = 12;
  var flowerRow = 2;

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
        var userName = userData.name;
        Logger.log('User: '+userName +'[' + userID + ']');
        // Get display case information
        var displayCase = userData.display;

        // Find the rows with the user ID using user mapping
        var userIDRows = userMapping.users[userID];

        // Initialize quantities for all items to 0
        var itemQuantities = {};
        Object.keys(itemReference.items).forEach(function(itemName) 
        {
        itemQuantities[itemName] = 0;
        });

        // If user ID is not found in the mapping, log an error and continue to the next user
        if (!userIDRows) 
        {
          Logger.log('Error: User ID ' + userID + ' not found in the user mapping.');
          continue;
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
            }
              Logger.log('Item Name: ' + itemName);
              Logger.log('Item Quantity: ' + itemInfo.quantity); 
              //Logger.log('Item Row: ' + itemRow);
              Logger.log('Item Collumn: ' + itemName);   
              
          } 
           else
          {
            Logger.log('Warning: Item "' + itemName + '" not found in itemReference.json.');
            // Handle the case when the item is not found in the reference (e.g., log a warning)
          }
        }
      }
    }      
    else 
    {
    Logger.log('Error fetching data for user ' + userID);
    }
  }
}
