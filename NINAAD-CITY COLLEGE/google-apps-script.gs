/**
 * NINAAD 2025 Registration with File Upload
 *
 * ✅ Stores data in Google Sheet
 * ✅ Uploads screenshot to Google Drive
 * ✅ Saves Drive sharable link in Sheet
 */

// === CONFIGURATION ===
const SHEET_ID = '1hwLvg9E3eSnVLMcQAdoMxWR2-Oa6paaN9a5ew_Gi1rU'; // <-- apna Google Sheet ID daalo
const FOLDER_ID = '1VF5kIKb4gWNmGI2dEJ70DCfVXlglWlqe'; // <-- Google Drive folder ID

/**
 * Handle POST requests (Form submission)
 */
function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // === Add headers if not present ===
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Reference ID',
        'Full Name',
        'Email',
        'Phone',
        'College Name',
        'Event Name',
        'Team Members',
        'Payment Screenshot Link'
      ];
      sheet.appendRow(headers);
    }

    // === Handle file upload (base64) ===
    let fileUrl = '';
    if (postData.paymentScreenshotBase64 && postData.paymentScreenshotMime && postData.paymentScreenshotFilename) {
      const base64 = postData.paymentScreenshotBase64;
      const mimeType = postData.paymentScreenshotMime;
      const filename = postData.paymentScreenshotFilename;

      const data = Utilities.base64Decode(base64);
      const blob = Utilities.newBlob(data, mimeType, filename);

      const folder = DriveApp.getFolderById(FOLDER_ID);
      const file = folder.createFile(blob);

      // Make file shareable (anyone with link can view)
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
    }

    // === Prepare row data ===
    const rowData = [
      new Date().toISOString(),
      postData.referenceId || '',
      postData.fullName || '',
      postData.email || '',
      postData.phone || '',
      postData.collegeName || '',
      postData.eventName || '',
      postData.teamMembers || '',
      fileUrl
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '✅ Registration saved successfully',
      fileUrl: fileUrl
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('❌ Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test GET endpoint
 */
function doGet() {
  return ContentService.createTextOutput("🚀 NINAAD 2025 Registration API is running successfully!");
}