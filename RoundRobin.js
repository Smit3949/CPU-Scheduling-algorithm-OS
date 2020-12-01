var tuple = [
	{pid:1,bt:5,art:0},
	{pid:2,bt:3,art:1},
	{pid:3,bt:1,art:2},
	{pid:4,bt:2,art:3},
	{pid:5,bt:3,art:4},
];
var tuple_temp = [
	{pid:1,bt:5,art:0},
	{pid:2,bt:3,art:1},
	{pid:3,bt:1,art:2},
	{pid:4,bt:2,art:3},
	{pid:5,bt:3,art:4},
];
var tq = 2;
var n = tuple.length;
var wt = [];// waiting time
var tat = [];// turnaround time
var total_wt = 0;//total waiting time
var total_tat = 0;//total turnaround time
var final_ans = [];// grannt chart
var vis = [];
for(var i=0;i<tuple.length;i++){
	vis[i]=0;
}
var rt = [];
for(var i=0;i<n;i++){
	rt.push(tuple[i].bt);
}
var store = [];
var visited = [];
for(var i=0;i<n;i++){
	visited[i]=0;
}
var que = [];//READY QUEUE
var fl=0;
var val = 0;
var count=0;
for(var i=0;i<10000;i++){
	count++;
	for(var j=0;j<n;j++){
		if(tuple[j].art <= i && vis[j]!=1){
			store.push(j);
			vis[j]=1;
		}
	}
	if(fl==1 && tuple[val].bt>0){
		store.push(val);
	}
	if(store.length===0){	
		var smit = [];
		for(var h=0;h<n;h++){
				if(tuple[h].art<=i && visited[h]===0){
					smit.push(tuple[h].pid);
				}
		}
		que.push(smit);
		final_ans.push('/');
	}
	else{
		fl=1;
		for(var j=i;j<i+tq;j++){
			var smit = [];
			for(var h=0;h<n;h++){
				if(tuple[h].art<=j && visited[h]===0){
					smit.push(tuple[h].pid);
				}
			}
			que.push(smit);
		}
		val = store[0];
		store.shift();
		var brt = tuple[val].bt;
		for(var t=0;t<Math.min(brt,tq);t++){
			final_ans.push(tuple[val].pid);
		}
		tuple[val].bt-=tq;
		if(tuple[val].bt<=0){
			visited[val]=1;
		}
		i+=Math.min(brt,tq)-1;
	}
	
	
}
for(var i=0;i<50;i++){
	console.log(final_ans[i]);
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
	tat[i]=cmp_time[i] - tuple[i].art;
	wt[i] = tat[i]-rt[i];
}
for(var i=0;i<n;i++){
	total_wt = total_wt + wt[i];
	total_tat = total_tat + tat[i];
}
