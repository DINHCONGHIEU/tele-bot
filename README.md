* Tạo bot với @BotFather và lấy token
* Để lấy thông tin về chat id cá nhân (tự nói chuyện với bot), sử dụng @userinfobot
* Để lấy thông tin về chat id nhóm (nhiều người có thể dùng bot), làm theo các bước:
1. Thêm bot vào group mới / Add bot to a new group
2. Tag con bot nói 1 2 câu (@yourbot hello) / Say something mentioning the bot
3. Dán đoạn sau đây vào trình duyệt (lưu ý nhập bot token) / Paste this url to your browser (with your bot token):
https://api.telegram.org/bot<token>/getUpdates
4. Lấy chatid / Get the chatid


* Sau khi điền webapp url vào, chạy function setWebhook / After pasting webapp url, run function setWebhook first
