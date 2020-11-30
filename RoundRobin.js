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
var tuple_temp = tuple;

var n = tuple.length;
var wt = [];
var tat = [];
var total_wt = 0;
var total_tat = 0;
var rt = [];
for(var i=0;i<n;i++){
	rt.push(tuple[i].bt);
}
var complete=0, t=0,minm=9999;
var shortest=0,finish_time;
var check = false;
var final_ans = [];
// 1 2 3 4
// 2 4 6 8
var vis = [];
for(var i=0;i<tuple.length;i++){
	vis[i]=0;
}
var store = [];
var vis = [];
for(var j=0;j<n;j++){
	vis[j]=0;
}
var visited = [];
for(var i=0;i<n;i++){
	visited[i]=0;
}
var que = [];
var fl=0;
var val = 0;
var count=0;
for(var i=0;i<50;i++){
	count++;
//	console.log("i "+i);
	for(var j=0;j<n;j++){
		if(tuple[j].art <= i && vis[j]!=1){
			store.push(j);
			vis[j]=1;
		}
	}
	if(fl==1 && tuple[val].bt>0 ){
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
		
	
		brt-=tq;
		tuple[val].bt-=tq;
		if(tuple[val].bt<=0){
			visited[val]=1;
			console.log(val);
		}
		i+=tq-1;
		
	}
	
	
}
for(var i=0;i<50;i++){
	console.log("que "+que[i]);
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
//	console.log(cmp_time[i]+" "+tuple[i].art);
	tat[i]=cmp_time[i] - tuple[i].art;
//	console.log(tat[i]+" "+rt[i]);
	wt[i] = tat[i]-rt[i];
//	console.log(wt[i]);
}
for(var i=0;i<n;i++){
	total_wt = total_wt + wt[i];
	total_tat = total_tat + tat[i];
}

//console.log(total_wt/n+" "+total_tat/n);