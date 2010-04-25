//万全を期し（笑）メルセンヌ・ツイスタを使用。
var MT_RAND = new MersenneTwister();
var Interval = undefined;

function player_keep_choice(){return MT_RAND.nextInt(0, 3);}
function player_keep_decision(my_choice,left_choice){return my_choice;}
function exec_keep(){
	if(Interval == undefined){
		demo_start();
		Interval = setInterval("demo_loop(player_keep_choice,player_keep_decision,\'out_keep_times\',\'out_keep_hit\',\'out_keep_prob\');",10);
	}else{
		alert("今実験中です！");
	}
}

function player_change_choice(){return MT_RAND.nextInt(0, 3);}
function player_change_decision(my_choice,left_choice){return left_choice;}
function exec_change(){
	if(Interval == undefined){
		demo_start();
		Interval = setInterval("demo_loop(player_change_choice,player_change_decision,\'out_change_times\',\'out_change_hit\',\'out_change_prob\');",10);
	}else{
		alert("今実験中です！");
	}
}

var times;
var hits;
function demo_start(){
	i=1;
	times = parseInt(document.getElementById("exec_times").value);
	hits = 0;
}

function demo_loop(player_choice_func,player_decision_func,out_times,out_hit,out_prob){
	var ret,hit,left,open,player_choice,ary = Array(3),player_decision;
	ret = ("実験"+i+"\n");
	//実験。まずは、3つ（0,1,2）のうちどれが当たりかを決定
	hit = MT_RAND.nextInt(0, 3);
	//プレイヤに選択をしていただく。
	player_choice = player_choice_func();
	ret += ("プレイヤの選択："+(player_choice+1)+"番目の扉\n");
	//開く扉を決める
	if(player_choice == hit){//残りの中から適当に
		left = hit;
		open = hit;
		while(left == hit){
			left = MT_RAND.nextInt(0, 3);
		}
		ary[0] = false;
		ary[1] = false;
		ary[2] = false;
		ary[player_choice] = true;
		ary[left] = true;
		for(var j=0;j<3;j++){
			if(!ary[j]){
				open = j;
			}
		}
	}else{//はずれを開けて、あたりを残す。
		left = hit;
		ary[0] = false;
		ary[1] = false;
		ary[2] = false;
		ary[player_choice] = true;
		ary[left] = true;
		for(var j=0;j<3;j++){
			if(!ary[j]){
				open = j;
			}
		}
	}
	ret += ("はずれの扉が開いた："+(open+1)+"番目の扉\n");
	ret += ("残った扉："+(left+1)+"番目の扉\n");
	//プレイヤに決断を迫る。
	var player_decision = player_decision_func(player_choice,left);
	ret += ("プレイヤの最終決断："+(player_decision+1)+"番目の扉\n");
	ret += ("あたりは"+(hit+1)+"番目の扉\n");
	//判定
	if(player_decision == hit){
		hits++;
		ret += ("あたり。現在の確率："+(hits * 100 / i)+"%\n");
	}else{
		ret += ("はずれ。現在の確率："+(hits * 100 / i)+"%\n");
	}
	//表示
	document.getElementById(out_times).value = i;
	document.getElementById(out_hit).value = hits;
	document.getElementById(out_prob).value = hits * 100 / i;
	document.getElementById("output").value = (ret);
	//条件
	i++;
	if(i > times){
		demo_end();
	}
}

function demo_end(){
	clearInterval(Interval);
	document.getElementById("output").value += ("------------------------------\n実験終了");
	Interval = undefined;
}
