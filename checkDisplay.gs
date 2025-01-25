function generateUserReference()
{
  var outputObject = {};
  const sheetName = 'userReference';

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var dataRange = sheet.getDataRange();
  const [headers,...sheetValues] = dataRange.getValues();
  
  sheetValues.forEach( (row, indexRowPosition) => {

    const rowObject = {
      rowIndex : indexRowPosition + 1

    }
    headers.forEach((key, indexColumnPosition) => {
      rowObject[key] = row[indexColumnPosition]
  })
  outputObject[rowObject.playerID] = rowObject
  })
  Logger.log(outputObject);
  return outputObject;
}

function updateMarketValue()
{
  var apiKey = 'torn_api_key';

  const params = 
  {
     method : "GET",
     contentType : "application/json", 
     headers : {
        Authorization : `ApiKey ${apiKey}`
     }
  }

  // Get the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Identify the sheet in the spreadsheet to use
  // Load item reference JSON  
  const jsonItemString = HtmlService.createHtmlOutputFromFile("item_reference.json.html").getContent();
  const priceReference = JSON.parse(jsonItemString);
  const url = 'https://api.torn.com/v2/torn?selections=items';

 // Make API request
  var response = UrlFetchApp.fetch(url, params);

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
  var discordUrl = "https://discord.com/api/webhooks/1200614425053364245/lxbvl6tb3lqutJ9FeCiqIzEJJYpBQ44ghTW2HaWUCnMgQuUR7MupIwodMIgg7GMOaBo4";
  var plushieMaths =SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Plushies').getRange(23, 3, 1, 13).getValues();
  var flowersMaths =SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Flowers').getRange(23, 3, 1, 11).getValues();
  var lowestPlushie;
  var lowestFlower;

  var plushieIndex = 0;
  for (let i = 0; i < 13; i++)
    {
      //plushiesAmounts.push(plushieMaths[i])
      if (plushieMaths[0][i] < plushieMaths[0][plushieIndex])
      {
        plushieIndex = i;
      } 
      //var plushieLowest = 
    }
  switch (plushieIndex)
  {
    case 0:
      lowestPlushie = "Jaguar";
      break;
    case 1:
      lowestPlushie = "Stingray";
      break;
    case 2:
      lowestPlushie = "Wolverine";
      break;
    case 3:
      lowestPlushie = "Red Fox";
      break;
    case 4:
      lowestPlushie = "Nessie";
      break;
    case 5:
      lowestPlushie = "Monkey";
      break;
    case 6:
      lowestPlushie = "Chamois";
      break;
    case 7:
      lowestPlushie = "Panda";
      break;
    case 8:
      lowestPlushie = "Camel";
      break;
    case 9:
      lowestPlushie = "Lion";
      break;
    case 10:
      lowestPlushie = "Sheep";
      break;
    case 11:
      lowestPlushie = "Teddy";
      break;
    case 12:
      lowestPlushie = "Kitten";    
  }
  Logger.log(lowestPlushie);

  var flowerIndex = 0;
  for (let i = 0; i < 11; i++)
    {
      //plushiesAmounts.push(plushieMaths[i])
      if (flowersMaths[0][i] < flowersMaths[0][flowerIndex])
      {
        flowerIndex = i;
      } 
    }
  switch (flowerIndex)
  {
    case 0:
      lowestFlower = "Dahlia";
      break;
    case 1:
      lowestFlower = "Banana Orchid";
      break;
    case 2:
      lowestFlower = "Crocus";
      break;
    case 3:
      lowestFlower = "Orchid";
      break;
    case 4:
      lowestFlower = "Heather";
      break;
    case 5:
      lowestFlower = "Ceibo";
      break;
    case 6:
      lowestFlower = "Edelweiss";
      break;
    case 7:
      lowestFlower = "Cherry Blossom";
      break;
    case 8:
      lowestFlower = "Peony";
      break;
    case 9:
      lowestFlower = "Tribulus";
      break;
    case 10:
      lowestFlower = "African Violet"; 
  }
  Logger.log(lowestFlower);

  var totalPoints = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Maths').getRange('S9').getValue();
  var totalFlowerSets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Flowers').getRange('N23').getValue();
  var totalPlushieSets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Plushies').getRange('P23').getValue();
  var totalSets = totalFlowerSets + totalPlushieSets;

  var message = " Total Sets: " + totalSets + " Total Points: " + totalPoints + " Lowest Plusie: " + lowestPlushie + " Lowest Flower: " + lowestFlower;
  
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
  var apiKey = 'Torn_API_Key';
  
  const params = 
  {
     method : "GET",
     contentType : "application/json", 
     headers : {
        Authorization : `ApiKey ${apiKey}`
     }
  }
  
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
  const userMapping = generateUserReference();

  // Iterate through all users in the mapping
  for (var playerID in userMapping) 
  {
    if (userMapping.hasOwnProperty(playerID)) 
    {
        var url = 'https://api.torn.com/v2/user?selections=display&id='  + playerID;

      // Make API request
      var response = UrlFetchApp.fetch(url, params);

      if (response.getResponseCode() == 200) 
      {
        var userData = JSON.parse(response.getContentText());
        var userName = playerID;
        // Get display case information
        var displayCase = userData.display;

        // Find the rows with the user ID using user mapping
        var userRow = userMapping[playerID].row;
        

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
