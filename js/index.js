 document.addEventListener('DOMContentLoaded', function() {
     function urlGen(url) {

         var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 document.getElementById('link').innerText = this.responseText;
                 document.getElementById('copy').style.display = 'block';
                 document.getElementById('social-sharing-link-container-layout').style.display = 'block';
                 new QRCode(document.getElementById('qrcode'), {
                     text: this.responseText,
                     width: 250,
                     height: 250,
                     correctLevel: QRCode.CorrectLevel.H
                 });
                 document.getElementById('facebook').href = 'https://www.facebook.com/sharer.php?u=' + this.responseText;
                 document.getElementById('twitter').href = 'https://twitter.com/intent/tweet?url=' + this.responseText;
                 document.getElementById('google-plus').href = 'https://plus.google.com/share?url=' + this.responseText;
             }
         };
         xhttp.open('GET', url, true);
         xhttp.send();


         function copy(event) {
             var range = document.createRange();
             range.selectNode(document.getElementById('link'));
             window.getSelection().addRange(range);
             document.execCommand('Copy');
         }
         document.querySelector('#copy').addEventListener('click', copy);

     }



     (function getCurrentTabUrl() {
         let queryInfo = {
             active: true,
             currentWindow: true
         };
         chrome.tabs.query(queryInfo, function(tabs) {
             let tab = tabs[0];
             let tabUrL = 'http://tinyurl.com/api-create.php?url=' + tab.url;
             urlGen(tabUrL)
         });
     })();
 });