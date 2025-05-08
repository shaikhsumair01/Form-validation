#A simple Form validation file. When the user adds input data,
it validates the information and creates a table of records based on that information. 
The user can delete the records and even modify it. On clicking the update record, 
the details of the record on which the click occured would be filled inside the form automatically,
and the user can change the details. On changing the details, the previous record gets deleted 
and a new record is pushed at the end of the record table. The records are stored in LocalStorage 
of the browser so that whenever the user reloads the page on their machine, the data remains persistant.

The page is already been built and is running on the github server but in case a person wants to run the code on local machine:
In order to run the file on your computer, download the entire repo as it is. 
If the styles don't work use this tailwind cli in your terminal inside vscode:
 npx @tailwindcss/cli -i ./style.css -o ./output.css --watch     
 
page builder link:
 https://shaikhsumair01.github.io/Form-validation/

github link:
https://github.com/shaikhsumair01/Form-validation.git