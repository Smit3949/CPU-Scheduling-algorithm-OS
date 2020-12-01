var tuple = [
	{pid:1,bt:2,art:1},
	{pid:2,bt:7,art:6},
	{pid:3,bt:5,art:4},

];
var n = tuple.length;
var artt = [];
var total_btt = [];
for(var i=0;i<tuple.length;i++){
	total_btt[i] = tuple[i].bt; 
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
		if(tuple[j].bt<=0){
			visited[j] = 1;
		}
	}
	var mn = 9999;
	var state = -1;
	for(var j=0;j<n;j++){
		if(tuple[j].art <= i){
			if(tuple[j].bt < mn && visited[j]===0){
				mn = tuple[j].bt;
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
	
			for(var j=0;j<1;j++){
				final_ans.push(tuple[state].pid);
			}
			tuple[state].bt-=1;
			for(var g=i;g<i+1;g++){
					var smit = [];
					for(var y=0;y<n;y++){
						if(tuple[y].art <= g || btco[y] == 1){
							smit.push(tuple[y].pid);
						}
					}
					que.push(smit);
			}
	}

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
console.log(que.length);
for(var i=0;i<n;i++){
	tat[i]=cmp_time[i] - artt[i];

	wt[i] = tat[i]-total_btt[i];
	
}
for(var i=0;i<n;i++){
	total_wt = total_wt + wt[i];
	total_tat = total_tat + tat[i];
}
console.log(total_wt/n + " " + total_tat/n);
