$().ready(function(){
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
