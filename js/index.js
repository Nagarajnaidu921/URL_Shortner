document.addEventListener('DOMContentLoaded', function () {
    async function urlGen(url) {

        try {

            const res = await fetch(url);
            const tinyUrl = await res.text();
            document.getElementById('loader').style.display = 'none'
            document.getElementById('link').innerText = tinyUrl;
            document.getElementById('copy').style.display = 'block';
            document.getElementById('social-sharing-link-container-layout').style.display = 'block';
            new QRCode(document.getElementById('qrcode'), {
                text: tinyUrl,
                width: 250,
                height: 250,
                correctLevel: QRCode.CorrectLevel.H
            });
            document.getElementById('facebook').href = `https://www.facebook.com/sharer.php?u=${tinyUrl}`;
            document.getElementById('twitter').href = `https://twitter.com/intent/tweet?url=${tinyUrl}`;
            document.getElementById('linkedin').href = `https://www.linkedin.com/shareArticle?url=${tinyUrl}`;
            setTimeout(() => {
                document.getElementById('loader').style.display = 'none'
            }, 500);
        } catch (error) {

        }

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
        chrome.tabs.query(queryInfo, function (tabs) {
            let tab = tabs[0];
            let tabUrL = 'http://tinyurl.com/api-create.php?url=' + tab.url;
            urlGen(tabUrL)
        });
    })();
});