 document.addEventListener("DOMContentLoaded", function() {
 	function urlGen(url){
 		
 		var xhttp = new XMLHttpRequest();
 		xhttp.onreadystatechange = function() {
 			console.log(this);
 			if (this.readyState == 4 && this.status == 200) {
 				document.getElementById("input").innerText = this.responseText;
 				document.getElementById("copy").style.display = "block";

 			}
 		};
 		xhttp.open("GET", url, true);
 		xhttp.send();


 		function copy(event) {
 				var range = document.createRange();
 				range.selectNode(document.getElementById('input'));
 				window.getSelection().addRange(range);
 				document.execCommand("Copy");
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
 			let tabUrL = 'http://tinyurl.com/api-create.php?url='+tab.url;
 			urlGen(tabUrL)
 		});
 	})();
 });
