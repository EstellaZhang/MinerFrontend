$().ready(function(){

    	$(document).ready(function() {
    		var flag=0; //需要根据传递值的方式具体获取
    		if(flag==0){//未在挖矿
				$("#stop_mining").attr("disabled","disabled");
            }else if(flag==1){//正在挖矿
                $("#start_mining").attr("disabled","disabled");
			}else{//未知状态
				alert("非正常操作！");
			}
			//将滚动条置于最底端
            window.scrollTo(0,document.body.scrollHeight);
		});
			$('#stop_mining').click(function(){
                var r=confirm("确实停止挖矿吗?")
                if (r==true)
                {
                    $.ajax({
                    type:"GET",
                    url: "/eth_miner/stop_miner.sh",
                });
                }
    			
    		})
    		$('#start_mining').click(function(){
    			$("#error").text("");
    			function get_config(){
    			var myconfig=[];
    			var val_eth=$('input:radio[name="pool-sel"]:checked').val();
    			var val_dou=$('input:radio[name="poold-sel2"]:checked').val();
				var checkbox_text=document.getElementById("dualmine-checkbox").checked
    			if (val_eth == 'eth' ){
    				myconfig.push(val_eth, $('#pool-cfg-poolurl').val(), $('#pool-cfg-wallet').val(), $('#pool-cfg-passwd').val())
    			}
    			else if (val_eth == 'f2' || val_eth == 'nano') {
                    myconfig.push(val_eth, $('#pool-cfg-poolurl').val(), $('#pool-cfg-wallet').val(), $('#pool-cfg-passwd').val(), $('#pool-cfg-workername').val())
    			}
				if(checkbox_text == true){
    					myconfig.push($('#poold-cfg-poolurl').val().replace(/\+/g, "%2B"), $('#poold-cfg-wallet').val(),$('#poold-cfg-passwd').val(), val_dou)    					
				}
    				return myconfig;
    			}
    			$.ajax({
    				type:"GET",
    				url: "/eth_miner/config.py?config_mining=" + get_config(),
    				dataType: 'json',
    				success:function(data){

    					if (data == "non_input") {
    						$("#error").text("Please input wallet or password or worker!");
    					}
    				}
    			});
    		});
    		$('#save_config').click(function(){
				$("no_name").text("");
    			function save_config(){
    				var my_saveconfig = new Array();
    				chkitem=document.forms[1].chkitem;
					for (i=0;i<chkitem.length;++ i){
						if (chkitem[i].checked)
						{
							if(chkitem[i].value == "restart"){
								my_saveconfig.push(chkitem[i].value)
							}
							else{
								my_saveconfig.push($('#pool-cfg-uname').val(), $('#pool-cfg-pwd').val())
							}
    					}
    				}
    			return my_saveconfig;
    			}
    			$.ajax({
    				type:"GET",
    				url:"/eth_miner/config.py?config_save=" + save_config(),
				dataType: 'json',
                    		success:function(data){
                        		if (data == "no_name_password") {
                            			$("#no_name").text("Please input name or password!");
                        		}                       
                    		}
    			});
    		});
    		/*
    		* 切换语言js
    		* */
		$('#english').click(function () {
            $('#start_mining').html('Save&Mining');
			$('#stop_mining').html('Stop Working');
			$('#poolurl').html('Mine address');
			$('#poolwallet').html('Wallet');
			$('#poolpwd').html('Password');
			$('#poolworkername').html('Miner name');
			$('#double-mining').html('Double Mining');
			$('#poold-sel-custom').html('Customize');
			$('#slim-input').html('Mine address');
			$('#poold-cfg-wallet').html('Wallet');
			$('#poold-cfg-passwd').html('Password');
			$('#help').html('Help');
			$('#start').html('START');
			$('#pool-sel-reboot').html('Reset&Start');
			$('#pool-sel-choose').html('Allow other hosts to access');
			$('#pool-cfg-uname').html('Plase enter your username');
			$('#pool-cfg-pwd').html('Please enter your password');
			$('#save_config').html('Submit');

		});
		$('#chinese').click(function () {
            $('#start_mining').html('保存配置并开始挖矿');
            $('#stop_mining').html('停止挖矿');
            $('#poolurl').html('矿池地址');
            $('#poolwallet').html('钱包');
            $('#poolpwd').html('密码');
            $('#poolworkername').html('矿工名称');
            $('#double-mining').html('双挖');
            $('#poold-sel-custom').html('自定义');
            $('#slim-input').html('矿池地址');
            $('#poold-cfg-wallet').html('钱包');
            $('#poold-cfg-passwd').html('密码');
            $('#help').html('帮助');
            $('#start').html('开始配置');
            $('#pool-sel-reboot').html('重启自动挖矿');
            $('#pool-sel-choose').html('允许其他主机访问');
            $('#pool-cfg-uname').html('请输入您的用户名');
            $('#pool-cfg-pwd').html('请输入您的密码');
            $('#save_config').html('提交');
		});

    		$('#pool-sel-ethpool').click(function () {
                document.getElementById('pool-cfg-poolurl').value='usl.ethpool.org:3333';
				$('#pool-cfg-workername').hide();
                $("[for='pool-cfg-workername']").hide();
            });
    		$('#pool-sel-f2pool').click(function () {
                document.getElementById('pool-cfg-poolurl').value='eth.f2pool.com:8008';
				$('#pool-cfg-workername').show();
                $("[for='pool-cfg-workername']").show();
            });
			$('#pool-sel-nanopool').click(function () {
                document.getElementById('pool-cfg-poolurl').value='eul.nanopool.org:9999';
				$('#pool-cfg-workername').show();
                $("[for='pool-cfg-workername']").show();
			});
			$("#dualmine-checkbox").click(function(){
                var _check = $(this).is(':checked');
				if(_check){
                    $("#double_main").show();
                }else{
                    $("#double_main").hide();
                }
			});
			$("#pool-sel-choose").click(function(){
				var _check = $(this).is(':checked');
				if(_check){
					$("#pool-sel-login").show();
				}else{
					$("#pool-sel-login").hide();
				}
			});
		$('#poold-sel-decred').click(function () {
            $("#poold-cfg-poolurl").focus();
            $('#poold-cfg-poolurl').val('stratum+tcp://yiimp.ccminer.org:3252').attr('disabled','true');

		});
		$('#poold-sel-siacoin').click(function () {
            $("#poold-cfg-poolurl").focus();
            $('#poold-cfg-poolurl').val('stratum+tcp://hub.miningpoolhub.com:20550').attr('disabled','true');
		});
		$('#poold-sel-lbry').click(function () {
            $("#poold-cfg-poolurl").focus();
            $('#poold-cfg-poolurl').val('stratum+tcp://lbry.suprnova.cc:6256').attr('disabled','true');
		});
		$('#poold-sel-custom').click(function () {
            $("#poold-cfg-poolurl").focus();
            $('#poold-cfg-poolurl').val('').removeAttr('disabled');
		});
		$.ajax({
			type:"GET",
			url:"/eth_miner/get_config.py",
			dataType:"json",
			success:function(data){
				$("input[name=poold-sel2][value=" + data["dualpool"] + " ]").attr('checked',true);
				$("input[name=pool-sel][value=" + data["onlypool"] + " ]").attr('checked',true);
				$("#pool-cfg-poolurl").val(data["-epool"]);
				$('#pool-cfg-passwd').val(data["-epsw"]);
				$('#pool-cfg-wallet').val(data["-ewal"]);
				$('#pool-cfg-workername').val(data["-eworker"]);
				$('#poold-cfg-poolurl').val(data["-dpool"]);
				$('#poold-cfg-passwd').val(data["-dpasw"]);
				$('#poold-cfg-wallet').val(data["-dwal"]);
				$('#pool-cfg-uname').val(data["username"]);
                		$('#pool-cfg-pwd').val("");
                		if (data["ifrestart"] == "restart"){
					document.getElementById("pool-sel-reboot").checked=true;
            			}	

            			var radio_text = document.getElementById('pool-sel-ethpool').checked;
				if(radio_text == true){
					$('#pool-cfg-workername').hide();
            				$("[for='pool-cfg-workername']").hide();
				}
				Materialize.updateTextFields();

			}
		});


});
