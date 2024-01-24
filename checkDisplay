function checkDisplays() 
{
  var apiKey = 'YOUR_APIKEY_HERE'; 
  // Hardcoded user IDs
  var userIds = ['2746597', '2323763','607333'];
  
  var plushieRow = 15;
  var flowerRow = 4;
  var user = 1;


  // Loop through each user ID
  for (var k = 0; k < userIds.length; k++) {
    Logger.log('user: ' + user);
    var userId = userIds[k].trim();
    user++;
    var url = 'https://api.torn.com/user/' + userId + '?selections=display&key=' + apiKey;
    
    var response = UrlFetchApp.fetch(url);
    var userData = JSON.parse(response.getContentText());

    // Get display case information
    var displayCase = userData.display;
    
    // Iterate through all items in the display case
    for (var itemID in displayCase) {
      if (displayCase.hasOwnProperty(itemID)) 
      {
        var itemInfo = displayCase[itemID];
        
        // Extract name and quantity
        var itemName = itemInfo.name;
        var itemQuantity = itemInfo.quantity;
        //Logger.log('Item Name: ' + itemName);
        //Logger.log('Item Quantity: ' + itemQuantity);     

        if (itemName == 'Jaguar Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'3').setValue(itemQuantity);
        }
        else if (itemName == 'Stingray Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'4').setValue(itemQuantity);

        }
        else if (itemName == 'Wolverine Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'5').setValue(itemQuantity);

        }
        else if (itemName == 'Red Fox Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'6').setValue(itemQuantity);

        }
        else if (itemName == 'Nessie Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'7').setValue(itemQuantity);
        }
        else if (itemName == 'Monkey Plushie')
        {
           var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'8').setValue(itemQuantity);
        }
        else if (itemName == 'Chamois Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'9').setValue(itemQuantity);
        }
        else if (itemName == 'Panda Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'11').setValue(itemQuantity);
        }
        else if (itemName == 'Camel Plushie')
        {
           var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'12').setValue(itemQuantity);
        }
        else if (itemName == 'Lion Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'13').setValue(itemQuantity);
        }
        else if (itemName == 'Sheep Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'14').setValue(itemQuantity);
        }
        else if (itemName == 'Teddy Bear Plushie')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'15').setValue(itemQuantity);

        }
        else if (itemName == 'Kitten Plushie')
        {
           var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(plushieRow,'16').setValue(itemQuantity);
        }


        if (itemName == 'Dahlia')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'3').setValue(itemQuantity);
        }
        else if (itemName == 'Banana Orchid')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'4').setValue(itemQuantity);

        }
        else if (itemName == 'Crocus')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'5').setValue(itemQuantity);

        }
        else if (itemName == 'Orchid')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'6').setValue(itemQuantity);

        }
        else if (itemName == 'Heather')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'7').setValue(itemQuantity);
        }
        else if (itemName == 'Ceibo Flower')
        {
           var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'8').setValue(itemQuantity);
        }
        else if (itemName == 'Edelweiss')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'9').setValue(itemQuantity);
        }
        else if (itemName == 'Cherry Blossom')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'10').setValue(itemQuantity);
        }
        else if (itemName == 'Peony')
        {
           var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'11').setValue(itemQuantity);
        }
        else if (itemName == 'Tribulus Omanense')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'12').setValue(itemQuantity);
        }
        else if (itemName == 'African Violet')
        {
          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(flowerRow,'13').setValue(itemQuantity);
        }

        
        // Output the information to the sheet
        //var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        //sheet.appendRow([itemName, itemQuantity]);
      }
    
      else 
      {
      Logger.log('Error fetching data for user ' + userID);
      }
    }
    plushieRow++;
    flowerRow++
  }
}
