var tuple = [
	{pid:1,bt:4,art:0,prio:2},
	{pid:2,bt:2,art:1,prio:4},
	{pid:3,bt:3,art:2,prio:6},
	{pid:4,bt:5,art:3,prio:10},
	{pid:5,bt:1,art:4,prio:8},
	{pid:6,bt:4,art:5,prio:12},
	{pid:7,bt:6,art:6,prio:9},
];
var n = tuple.length;
var total_btt = [];
var arrt = [];
for(var i=0;i<n;i++){
	total_btt[i]=tuple[i].bt;
	arrt[i]=tuple[i].art;
}
var artt = [];
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
	var mn = 0;
	var state = -1;
	for(var j=0;j<n;j++){
		if(tuple[j].art <= i && visited[j]===0){
		
			if(tuple[j].prio > mn){
				mn = tuple[j].prio;
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
			for(var j=0;j<tuple[state].bt;j++){
				final_ans.push(tuple[state].pid);
			}
			for(var g=i;g<i+tuple[state].bt;g++){
					var smit = [];
					for(var y=0;y<n;y++){
						if(tuple[y].art <= g && visited[y]===0){
							smit.push(tuple[y].pid);
						}
					}
					que.push(smit);
			}
			
			i+=tuple[state].bt-1;
			tuple[state].bt=0;
			
	
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


var wt  = [];

for(var i=0;i<n;i++){
	tat[i]=cmp_time[i] - arrt[i];
	wt[i] = tat[i]-total_btt[i];	
}
for(var i=0;i<n;i++){
	total_wt = total_wt + wt[i];
	total_tat = total_tat + tat[i];
}
console.log(total_wt/n + " " + total_tat/n);
