function Knowledge(){
	this.dis = [];
	this.ans = [];
}

var knowledges = [];
var cnt = 0;

function Check(){

	var input = document.getElementById('input');
	var ans = "";
	
	for(var i in knowledges[cnt].ans){
		if(knowledges[cnt].ans[i] != '\n')ans += knowledges[cnt].ans[i];
		
	}
		
	if(input.value == ans){
		alert("Correct");
		input.value = '';
		cnt++;
		Show();
	}
}
function Display(){
	var	
		fileinput = document.getElementById('inputfile'),
		view = document.getElementById('checkview');
	
	var file = fileinput.files[0];


	var reader = new FileReader();
	reader.onload = function(){
		view.value = this.result;
		Init();
	};
	reader.readAsText(file);

}
function Init(){
	var view = document.getElementById('checkview');
	var display = document.getElementById('display');
	var data = view.value;
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