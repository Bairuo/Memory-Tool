function Knowledge(){
	this.dis = [];
	this.ans = [];
}

var knowledges = [];
var inputtext;
var cnt = 0;
var fileinput = document.getElementById('inputfile'),
	view = document.getElementById('checkview');

window.onload = function(){
	var ansinput = document.getElementById('input');

	if(document.all){
		ansinput.onpropertychange = Check;
	}
	else{
		ansinput.oninput = Check;
	}
}

function Check(){
	var ansinput = document.getElementById('input');
	var ans = "";
	var t = 0;

	for(var i in knowledges[cnt].ans){
		//if(knowledges[cnt].ans[i] != '\n' && knowledges[cnt].ans[i] != '\r\n')
			ans += knowledges[cnt].ans[i];
		t++;
	}
	//alert(t);
	ans = ans.substring(0,t - 2);
	
	
	if(ansinput.value == ans){
		view.value += "Correct.\n";
		ansinput.value = '';
		cnt++;
		Show();
	}
}

fileinput.addEventListener('change', function Display(){
	
	var file = fileinput.files[0];


	var reader = new FileReader();
	reader.onload = function(){
		inputtext = this.result;
		view.value = "Input finish...\n";
		Init();
	};
	reader.readAsText(file);

});

function Init(){
	var display = document.getElementById('display');
	var data = inputtext;
	var mode = 0, k = 0;

	knowledges.push(new Knowledge());

	for(var i in data){
		if(mode === 0){
			if(data[i] === ' '){
				mode = 1;
			}
			else{
				knowledges[k].dis.push(data[i]);
			}
		}
		else{
			if(data.charCodeAt(i) > 127){
				mode = 0;
				knowledges.push(new Knowledge());
				k++;
				knowledges[k].dis.push(data[i]);
			}
			else{
				knowledges[k].ans.push(data[i]);
			}
		}		
	}
	cnt = 0;
	Show();
}

function Show(){
	var display = document.getElementById('display');
	
	display.value = '';
	for(var i in knowledges[cnt].dis)
		display.value = display.value + knowledges[cnt].dis[i];
}