var tuple = [
	{pid:1,bt1:6,art:0,io:10,bt2:4},
	{pid:2,bt1:9,art:0,io:15,bt2:6},
	{pid:3,bt1:3,art:0,io:5,bt2:2},
	
];
var total_bt = [];
var artt = [];
var total_btt = [];
for(var i=0;i<tuple.length;i++){
	total_bt[i] = tuple[i].bt1 + tuple[i].io + tuple[i].bt2;
	total_btt[i] = total_bt[i] - tuple[i].io; 
	artt[i] = tuple[i].art;
//	console.log(total_bt[i]);
}
var tuple_temp = tuple;
tuple.sort(function(a, b) {
  return a.art - b.art;
});
tuple.sort();

var n = tuple.length;
var wt = [];
var tat = [];
var total_wt = 0;
var total_tat = 0;
var rt = [];
for(var i=0;i<n;i++){
	rt.push(tuple[i].bt);
}


var final_ans = [];
var visited = [];
for(var i=0;i<tuple.length;i++){
	visited[i]=0;
}

var que = [];
var btco = [];
for(var i=0;i<n;i++){
	btco[i] = 0;
}

for(var i=0;i<50;i++){
	
	for(var j=0;j<n;j++){
		if(total_bt[i]<=0){
			visited[i] = 1;
		}
	}
	var mn = 0;
	var state = -1;
	for(var j=0;j<n;j++){
		if(tuple[j].art <= i){
		
			if(total_bt[j] > mn){
				mn = total_bt[j];
				state = j;
			}
		}
	}



	if(state == -1){
		final_ans.push('/');
		var smit = [];
		que.push(smit);
	}
	else{
		if(btco[state] === 0){
		//	if(i==3){console.log("fuck1");}
			for(var j=0;j<tuple[state].bt1;j++){
				final_ans.push(tuple[state].pid);
			}
			tuple[state].art = i + tuple[state].bt1 + tuple[state].io;
		//	console.log(state + " " + tuple[state].art);
			for(var g=i;g<i+tuple[state].bt1-1;g++){
					var smit = [];
					for(var y=0;y<n;y++){
						if(tuple[y].art <= g || btco[y] == 1){
							smit.push(tuple[y].pid);
						}
					}
					que.push(smit);
			}
			i+=tuple[state].bt1-1;
			
			btco[state] = 1;
			total_bt[state] -= (tuple[state].bt1+tuple[state].io);
		}
		else{
		//	if(i==3){console.log("fuck2");}
			for(var j=0;j<tuple[state].bt2;j++){
				final_ans.push(tuple[state].pid);
			}
			for(var g=i;g<i+tuple[state].bt1-1;g++){
					var smit = [];
					for(var y=0;y<n;y++){
						if(tuple[y].art <= g || btco[y] == 1){
							smit.push(tuple[y].pid);
						}
					}
					que.push(smit);
			}
			i+=tuple[state].bt2-1;
			total_bt[state] = 0;
			tuple[state].art = 100;
		}
	}

}
console.log(que.length);
for(var i=0;i<50;i++){
	console.log(i+" "+final_ans[i]);
}
var cmp_time = [];
for(var i=0;i<tuple.length;i++){

	cmp_time[i]=-1;
}
for(var i=final_ans.length-1;i>=0;i--){
//	console.log(final_ans[i]);
	if(final_ans[i]==='/'){}
		else{
		if(cmp_time[final_ans[i]-1]==-1){
			
			cmp_time[final_ans[i]-1]=i+1;
		}}
	
}


var wt  = [];

for(var i=0;i<n;i++){
	tat[i]=cmp_time[i] - artt[i];

	wt[i] = tat[i]-total_btt[i];
	
}
for(var i=0;i<n;i++){
	total_wt = total_wt + wt[i];
	total_tat = total_tat + tat[i];
}
console.log(total_wt/n + " " + total_tat/n);