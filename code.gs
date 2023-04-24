function doGet(e) {
  return HtmlService.createTemplateFromFile('index').evaluate()
      .setTitle('C-R-U-D')
      .setFaviconUrl('https://i.ibb.co/L06Cyzc/Faster.png')
      .addMetaTag('viewport', 'width=device-width , initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
  }


function include(file){
  return HtmlService.createHtmlOutputFromFile(file).getContent()
}

/** ^   ^ */
/** CRUD 24-4-66 Exp BY Gukkghu Dev */
/** ------------------------------------------------------------------------------ */

  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data")
  var folder = DriveApp.getFolderById('1oz4ubl6sGEd78MjISE6Z1AKdcnqcau3U')



function mainData_B(dataForm){
  try {
    if(!dataForm.refID_edit){
      let codeEmp = new Date().getTime();
      createData(dataForm,codeEmp)
    }else{
      updateData(dataForm)
    }
  }
  catch(err) {
    console.log(err.message) 
  }
  finally {
    return "success"
  }
}

function createData(dataForm,codeEmp){
     
    if(dataForm.file1.length > 0){
     var idfile = folder.createFile(dataForm.file1).getId()
     var file = "https://lh5.googleusercontent.com/d/"+idfile
     }else{
       var file = "noFile"
     }

  ss.appendRow(
    [
      new Date(),
      codeEmp,
      dataForm.nameEmp,
      dataForm.positionEmp,
      dataForm.officeEmp,
      dataForm.idEmp,
      dataForm.bdEmp,
      dataForm.salEmp,
      dataForm.gridChecka,
      dataForm.gridCheckb,
      dataForm.flexRadioDefault,
      file
    ]
  )

return "success"

}


function updateData(dataForm){

    var folder = DriveApp.getFolderById('1oz4ubl6sGEd78MjISE6Z1AKdcnqcau3U')
     
    if(dataForm.fileEdit.length > 0){
     var idfile = folder.createFile(dataForm.fileEdit).getId()
     var file = "https://lh5.googleusercontent.com/d/"+idfile
     }else{
       var file = dataForm.oldfile
     }
    Logger.log(dataForm)
    const rowUpdate = searchByindexOf(dataForm.refID_edit)

    ss.getRange(rowUpdate,1,1,ss.getLastColumn()).setValues(
      [
        [
        new Date,         
        dataForm.refID_edit,
        dataForm.nameEmp_edit,
        dataForm.positionEmp_edit,
        dataForm.officeEmp_edit,
        dataForm.idEmp_edit,
        dataForm.bdEmp_edit,
        dataForm.salEmp_edit,
        dataForm.gridChecka_edit,
        dataForm.gridCheckb_edit,
        dataForm.flexRadioDefault,
        file
        ]
      ]

    )

return "success"
}
 

function deleteRow(keysRow){

  searchByindexOf(keysRow)
  ss.deleteRow(rowUpdate)

  return "success"
}


function searchByindexOf(keys){     
     var idSearch = keys
    const dataBeforeSearch = ss.getRange(2,1,ss.getLastRow()-1,ss.getLastColumn()).getDisplayValues()
     var idCol = dataBeforeSearch.map(function(r){return r[1];});

     var posIndex = idCol.indexOf(idSearch);
     Logger.log(posIndex)
     var rowindex = posIndex === -1 ? 0 : posIndex + 2
    Logger.log(rowindex)

    return rowindex
}


function getData(){
  return ss.getDataRange().getDisplayValues()
}

        
