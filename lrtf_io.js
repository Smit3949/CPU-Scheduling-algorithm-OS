var tuple = [
	{pid:1,bt1:3,art:0,io:2,bt2:2},
	{pid:2,bt1:2,art:0,io:4,bt2:1},
	{pid:3,bt1:1,art:2,io:3,bt2:2},
	{pid:4,bt1:2,art:5,io:2,bt2:1},
];
var total_bt = [];
var artt = [];
var total_btt = [];
var n = tuple.length;
for(var i=0;i<tuple.length;i++){
	total_bt[i] = tuple[i].bt1 + tuple[i].bt2;
	total_btt[i] = total_bt[i]; 
	artt[i] = tuple[i].art;
}
var tuple_temp = tuple;
tuple.sort(function(a, b) {
  return a.art - b.art;
});
tuple.sort();
var wt = [];
var tat = [];
var total_wt = 0;
var total_tat = 0;
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
for(var i=0;i<10000;i++){
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
			for(var j=0;j<1;j++){
				final_ans.push(tuple[state].pid);
			}
			tuple[state].bt1-=1;
			total_bt[state] -= 1;
			for(var g=i;g<i+1;g++){
					var smit = [];
					for(var y=0;y<n;y++){
						if(tuple[y].art <= g || btco[y] == 1){
							smit.push(tuple[y].pid);
						}
					}
					que.push(smit);
			}
			if(tuple[state].bt1<=0){
				
				tuple[state].art = i + tuple[state].io + 1;
				btco[state] = 1;
			}
			
		}
		else{
			for(var j=0;j<1;j++){
				final_ans.push(tuple[state].pid);
			}
			tuple[state].bt2-=1;
			total_bt[state] -= 1;
			for(var g=i;g<i+1;g++){
					var smit = [];
					for(var y=0;y<n;y++){
						if(tuple[y].art <= g || btco[y] == 1){
							smit.push(tuple[y].pid);
						}
					}
					que.push(smit);
			}
			if(tuple[state].bt2<=0){
				tuple[state].art = 10000;
			}
		}
	}

}
console.log(que.length);
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
for(var i=0;i<n;i++){
	tat[i]=cmp_time[i] - artt[i];
	wt[i] = tat[i]-total_btt[i];
}
for(var i=0;i<n;i++){
	total_wt = total_wt + wt[i];
	total_tat = total_tat + tat[i];
}
console.log(total_wt/n + " " + total_tat/n);
