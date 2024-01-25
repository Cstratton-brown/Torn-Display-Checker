# Torn-Display-Checker
Javascript function to be used in google scripts in combination with a google sheet spreadsheet to automate the tracking of plushies and flowers within your display case for the online browser based game Torn.
The code checks all user displays based of the user IDs entered into the script and then returns the name and amount of each flower and plushie that is contained within the display case and then inputs the quantaty values into a spreadsheet.
Two JSON files are used in this project, both formatted as .html files due to google scripts not allowing any file extensions other than .gs and .html.
item_reference.json contains the items to search the display cases for, the names of the item match their names in torn and they contain twon attributes, type and name, type is the item type they are in torn which in this case is plushie or flower. name is the name that the item is listed on in the spreadsheet which doesnt always match the full name due to formatting.
user_mapping.json contains the users to check the display case of, only one attribute is included, the username that matches the userID in Torn.

The two json files are referenced against data returned from the API of whats in each users display case to determine the correct coordinates of the cell which the quantaty of the item is to be assigned to.
The collumn and row values are found through the textSearch function to find the username and item name attributes that match those on the spreadsheet before grabbing their row and collumn values respectivaly.
To determine if the username value grabbed is in the plushies or flowers section the type attribute of the item is checked and used to determine which is the appropriate row.
