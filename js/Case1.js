function Knowledge(){
	this.dis = [];
	this.ans = [];
}

var knowledges = [];
var inputtext;
var cnt = 0, MAX, MODE = 0; //MODE 0 English 1 Text 2 Ans Text
var fileinput = document.getElementById('inputfile'),
	view = document.getElementById('checkview'), //Console
	ansinput = document.getElementById('input'),
	display = document.getElementById('display'); //Prompt Message
	
window.onload = function(){
	
	if(document.all){
		ansinput.onpropertychange = Check;
	}
	else{
		ansinput.oninput = Check;
	}
	ChooseCase1();
}

function ChooseCase1(){
  MODE = 0;
  view.value = "You have choosen English Mode.\nWaiting for file selection...\n";
}

function ChooseCase2(){
  MODE = 1;
  view.value = "You have choosen Text Mode.\nWaiting for file selection...\n";
  display.value = "";
}

function ChooseCase3(){
  MODE = 2;
  view.value = "You have choosen Ans Text Mode.\nWaiting for file selection...\n";
  display.value = "";
}



function Check(){
	var ans = "";
	var t = 0;
	
	if(MODE == 0){
		for(var i in knowledges[cnt].ans){
				ans += knowledges[cnt].ans[i];
			t++;
		}
	
		ans = ans.substring(0,t - 2);
	
	
		if(ansinput.value == ans){
			view.value += (cnt + 1) + ".Correct\n";
			ansinput.value = '';
			cnt++;
			Show();
		}
  	}
  	else if(MODE == 1){
    	ansinput.value = '';
    	cnt++;
    	Show();
  	}
	else if(MODE == 2){
		if(ansinput.value != 'i')cnt++;
		ansinput.value = '';
		Show();
	}
	
}

fileinput.addEventListener('change', function Display(){
	
	var file = fileinput.files[0];

	var reader = new FileReader();
	reader.onload = function(){
		inputtext = this.result;
		if(MODE == 0)view.value += "Input finished...\nPress:\n\tctrl+1 to random mode (or switch normal mode).\n\tctrl+i to skip\n\tctrl+o to return.\n";
    	else if(MODE == 1)view.value += "Input finished...\nPress:\n\tctrl+1 to random mode (or switch normal mode).\n\tAny input to skip\n\tctrl+o to return.\n";
    	else if(MODE == 2)view.value += "Input finished...\nPress:\n\tctrl+1 to random mode (or switch normal mode).\n\ti input to display answer, any other input to skip\n\tctrl+o to return.\n";
		
		if(MODE == 0)InitCase1();
    	else if(MODE == 1)InitCase2();
    	else if(MODE == 2)InitCase3();
	};
	reader.readAsText(file);

});

function InitCase1(){
	var data = inputtext;
	var mode = 0, k = 0;

 	knowledges.splice(0, knowledges.lenth);
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
	MAX = k;
	cnt = 0;
	Show();
}

function InitCase2(){
  	var data = inputtext;
  	var mode = 0, k = 0;
  
  	knowledges.splice(0, knowledges.lenth);
  	knowledges.push(new Knowledge());
  
  	for(var i = 0; i < data.length; i++){
    	if(mode === 0){
      		if(data[i] < ' '){
				knowledges[k].dis.push(data[i]);
        		mode = 1;
				i++;
      		}
      		else{
        		knowledges[k].dis.push(data[i]);
      		}
    	}
    	else{
      		if(data[i] < ' '){
        		mode = 0;
				i++;
        		knowledges.push(new Knowledge());
        		k++;
      		}
      		else{
        		knowledges[k].dis.push(data[i]);
        		mode = 0;
      		}
		}
	}

	MAX = k;
  	cnt = 0;
	Show();
}

function InitCase3(){
  	var data = inputtext;
  	var mode = 0, k = 0, state = 0;
  
  	knowledges.splice(0, knowledges.lenth);
  	knowledges.push(new Knowledge());
  
  	for(var i = 0; i < data.length; i++){
    	if(mode === 0){
      		if(data[i] < ' '){
				if(state % 2 == 0)
					knowledges[k].dis.push(data[i]);
				else
					knowledges[k].ans.push(data[i]);

        		mode = 1;
				i++;
      		}
      		else{
				if(state % 2 == 0)
					knowledges[k].dis.push(data[i]);
				else
					knowledges[k].ans.push(data[i]);
      		}
    	}
    	else{
      		if(data[i] < ' '){
        		mode = 0;
				i++;
				if(state % 2 == 0)
					state++;
				else{
					state++;
        			knowledges.push(new Knowledge());
				}
        		k++;
      		}
      		else{
				if(state % 2 == 0)
					knowledges[k].dis.push(data[i]);
				else
					knowledges[k].ans.push(data[i]);
        		mode = 0;
      		}
		}
	}

	MAX = k;
  	cnt = 0;
	Show();
}

function Show(){
	
	display.value = '';
	
	if(cnt > MAX){
		view.value += "\nCongratulations, you have finished this text!\n";
		view.scrollTop = view.scrollHeight;
		return;
	}
	
  	if(MODE === 0){
		for(var i in knowledges[cnt].dis)
			display.value += knowledges[cnt].dis[i];    
  	}
  	else if(MODE === 1){
    	view.value += "\n";
		for(var i in knowledges[cnt].dis)
			view.value += knowledges[cnt].dis[i];
  	}
	else if(MODE === 2){
		var data;
		if(ansinput.value == 'i')data = knowledges[cnt].dis;
		else data = knowledges[cnt].ans;
		
		for(var i in data)
			view.value += data[i];
	}
	view.scrollTop = view.scrollHeight;

}