var tuple = [
	{pid:1,bt:6,art:2},
	{pid:2,bt:3,art:5},
	{pid:3,bt:8,art:1},
	{pid:4,bt:3,art:0},
	{pid:5,bt:4,art:4},
];
var tuple_temp = tuple;
tuple.sort(function(a, b) {
	if(a.art==b.art){return a.bt-b.bt;}
  return a.art - b.art;
});
tuple.sort();
var n = tuple.length;
var wt = [];// waiting time
var tat = [];//turn around time
var total_wt = 0;//total waiting time
var total_tat = 0;//total turnaround time
var final_ans = [];// grannt chart
var visited = []; 
for(var i=0;i<tuple.length;i++){
	visited[i]=0;
}
var que = []; // running queue 
var state = 0;
var flag=0;
var count = 0;
for(var i=0;i<10000;i++){
	visited[state]++;
	if(tuple[state].art>i){
		final_ans.push('/');
		var smit =[];
		que.push(smit);
	}
	else{
			if(flag==1 && visited[state]>1){
				final_ans.push('/');
					var smit =[];
					que.push(smit);
			}
			else
			{	flag=1;
				for(var j=0;j<tuple[state].bt;j++){
					final_ans.push(tuple[state].pid);
				}
				var mx=10000;
				var ind=0;
				for(var j=0;j<tuple.length;j++){
					if(tuple[j].art<=tuple[state].art+tuple[state].bt && visited[j]===0){
						if(tuple[j].art<mx){
							mx=tuple[j].art;
							ind=j;
						}
					}
				}
				for(var k=i;k<i+tuple[state].bt;k++){
				 	var smit = [];
					count++;
					for(var y=0;y<n;y++){
						if(tuple[y].art <= k && visited[y]<=1){
							smit.push(tuple[y].pid);
						}
					}
					que.push(smit);
				}
				i+=tuple[state].bt-1;
				visited[state]++;
				state=ind;
			
			}
		
	}
}
var cmp_time = [];//completion time
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
	tat[i]=cmp_time[i] - tuple_temp[i].art;
	wt[i] = tat[i]-tuple[i].bt;
}
for(var i=0;i<n;i++){
	total_wt = total_wt + wt[i];
	total_tat = total_tat + tat[i];
}