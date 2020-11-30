var tuple = [
	{pid:1,bt1:6,art:0,io:10,bt2:4},
	{pid:2,bt1:9,art:2,io:15,bt2:6},
	{pid:3,bt1:3,art:4,io:5,bt2:2},
	
	
];
var total_bt = [];
var artt = [];
var total_btt = [];
for(var i=0;i<tuple.length;i++){
	total_bt[i] = tuple[i].bt1 + tuple[i].io + tuple[i].bt2;
	total_btt[i] = total_bt[i] - tuple[i].io; 
	artt[i] = tuple[i].art;
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
var main_que = [];
for(var i=0;i<tuple.length;i++){
	visited[i]=0;
}
var tq = 3;
var que = [];
var btco = [];
for(var i=0;i<n;i++){
	btco[i] = 0;
}
var last = 1000;
for(var i=0;i<50;i++){

	for(var j=0;j<n;j++){
		if(tuple[j].art<=i && visited[j]===0){
			var flag=0;
			for(var g=0;g<main_que.length;g++){
				if(main_que[g]==j){
					flag=1;
				}
			}
			if(flag===0)main_que.push(j);
		}
	}
	if(last!=1000){
		main_que.push(last);
	}
	
	var state = -1;
	if(main_que.length!==0){
		state = main_que[0];
		visited[state]=1;
	}
	main_que.shift();
	
	if(state == -1){
		final_ans.push('/');
		var smit = [];
		que.push(smit);
	}
	else{
		if(btco[state]===0){
			var to = Math.min(tuple[state].bt1,tq);
		//	console.log(to);
			for(var j=0;j<to;j++){
				final_ans.push(tuple[state].pid);
			}
			last = state;
			tuple[state].bt1-=to;
			if(tuple[state].bt1===0){
				btco[state]=1;
				last = 1000;
				tuple[state].art = i + to + tuple[state].io;
				visited[state]=0;
			}
			for(var j=i;j<i+to;j++){
				var smit = [];
				for(var g=0;g<n;g++){
					if(tuple[g].art<=j){
						smit.push(tuple[g].pid);
					}
				}
				que.push(smit);
			}
		//	console.log(last);
			i+=to-1;
		}
		else{
		//	console.log(i + " "+ state);
			
			var to = Math.min(tuple[state].bt2,tq);
			for(var j=0;j<to;j++){
				final_ans.push(tuple[state].pid);
			}
			last = state;
			tuple[state].bt2-=to;
			if(tuple[state].bt2===0){
				btco[state]=1;
				last = 1000;
				tuple[state].art = 1000;
				visited[state]=1;
			}
			for(var j=i;j<i+to;j++){
				var smit = [];
				for(var g=0;g<n;g++){
					if(tuple[g].art<=j){
						smit.push(tuple[g].pid);
					}
				}
				que.push(smit);
			}
			
			i+=to-1;
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