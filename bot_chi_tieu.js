var webapp = ''; // điền web url sau khi deploy app script
var token = ''; // token của bot tele
var url = 'https://api.telegram.org/bot' + token;
var chatid = ''; // id chat tele của mình để con bot gửi phản hồi

// kết nối telegram với gg sheet
function setWebhook(){
  var response = UrlFetchApp.fetch(url + '/setWebhook?url=' + webapp);
  Logger.log(response);
}

// gửi phản hồi từ bot về cho user
function sendMessage(body){
  var response = UrlFetchApp.fetch(url + '/sendMessage?chat_id=' + chatid + '&text=' + encodeURIComponent(body) + '&parse_mode=HTML');
}

// tương tác telegram với gg sheet ( nhận tin nhắn từ tele, thực hiện yêu cầu và phản hồi)
function doPost(e){

  // lấy và kết nối với sheet theo từng tháng. ví dụ tháng 10 thì sẽ kết nối với sheet tên "Tháng 10"
  const date = new Date();
  const month = date.getMonth() + 1;
  const sheetName = "Tháng " + month;
  const gs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  var contents = JSON.parse(e.postData.contents); // payload từ tele gửi lên và get ra dữ liệu tương ứng
  var text = contents.message.text;
  var newText = text.substring(text.indexOf(' ') + 1); // lấy từ phần tử thứ 2 và bỏ qua '/thu' hoặc '/chi' theo công thức
  var split = newText.split(','); // tách dữ liệu gửi từ tele để lấy dữ liệu tương ứng các cột trong sheet

  if(split[2] != null){ // nếu cú pháp đúng (cú pháp: danh mục, chi tiết, giá) thì ghi dữ liệu và phản hồi
    var number = split[2].replace('tr','000000').replace('k','000'); // thay thế đơn vị giá tiền mà user gửi để ghi vào sheet

    if(text.includes('/thu')){  // nếu thu thì tiến hành ghi vào cột thu và gửi phản hồi
      const range = gs.appendRow([new Date(),split[0],split[1],number]); // thêm dòng mới vào cột A, B, C, D tương ứng Ngày, Danh mục, Chi tiết, khoản thu
      const tongthu = gs.getRange("H2").getValue(); // lấy giá trị tổng tiền đã thu trong tháng tại cột H2

      // gửi phản hồi cho user qua tele nếu thành công kèm link theo dõi
      sendMessage("Tổng thu tháng " + month + " là: " + tongthu + ". Theo dõi danh mục chi tiêu tại <a href='Link gg sheet'>Sheets</a>");
    }
    else if(text.includes('/chi')){
      const range = gs.appendRow([new Date(),split[0],split[1],,number]); // thêm dòng mới vào cột A, B, C, E tương ứng Ngày, Danh mục, Chi tiết, khoản chi
      const tongchi = gs.getRange("I2").getValue();

      sendMessage("Tổng chi tháng " + month + " là:  " + tongchi + ". Theo dõi danh mục chi tiêu tại <a href='Link gg sheet'>Sheets</a>");
    }
  }
  else{ // nếu sai cú pháp thì gửi  thông báo cho user
    sendMessage("Nhập sai cú pháp " + "'/thu danh mục, chi tiết, giá' " + "hoặc " + "'/chi danh mục, chi tiết, giá' " + "rồi," + " chi tiết thu chi tại <a href='Link gg sheet'>đây</a>");
  }
}





