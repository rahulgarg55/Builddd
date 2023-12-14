var Event=require("./events"),cfg=require("../../pbx_config"),pbx_db=require("./pbx_db"),pbx_api=require("./api/pbx_api"),pbx_logger=require("./logger/pbx_logger"),agent_processor=require("./agent_processor"),express=require("express"),dt=require("./common/datetime"),awsS3=require("./s3/awsS3"),ari=require("ari-client"),util=require("util"),path=require("path"),fs=require("fs"),mv=require("mv"),logger=new pbx_logger,dateTime=new dt,agentProcessor=new agent_processor,awsS3=new awsS3,dbOutput="",dbSMEid="",api=new pbx_api;function AgentClick2Call(s){this.state_name="agent_c2c_state",logger.log("DEB",s.channel.id,"agent_c2c","Current State ["+s.currentState+"] Update to ==> [dialing]"),s.currentState="dialing",s.dialStatus="NOANSWER";s.totalHoldDuration=0,this.enter=function(){var e;new pbx_db,s.callcdrMode="22",s.callDirection="OUTGOING",s.callDirectionStatus="1",logger.log("IMP",s.channel.id,"agent_c2c","Entering agent_c2c_state: agent_c2c_state"),s.channel.on("ChannelHangupRequest",a),s.client.on("PlaybackFinished",function e(n){logger.log("IMP",s.channel.id,"agent_c2c","on_playback_finished");"WAITING_AGENT_C2C_DATA"==s.user_ivr_state?(s.client.removeListener("PlaybackFinished",e),s.client.removeListener("ChannelHangupRequest",a),logger.log("IMP",s.channel.id,"agent_c2c","FSM State Changed [TO => AGENT_C2C]"),s.state_machine.change_state(Event.AGENT_C2C)):"AGENT_C2C_TRY_LATER"==s.user_ivr_state?(logger.log("IMP",s.channel.id,"agent_c2c","AGENT_C2C_TRY_LATER so let kill the agent app side."),s.client.removeListener("PlaybackFinished",e),d(s.channel,s.agentChannel),setTimeout(d,1100,s.channel,s.agentChannel)):"PLAY_BUSSY"!=s.user_ivr_state&&"PLAY_BUSSY_SWITCHEDOFF"!=s.user_ivr_state&&"PLAY_SWITCHEDOFF_NOTRESPONDING"!=s.user_ivr_state&&"PLAY_NOT_AVAILABLE"!=s.user_ivr_state||(logger.log("DEB",s.channel.id,"agent_c2c",s.user_ivr_state+" so let kill the agent app side."),s.client.removeListener("PlaybackFinished",e),d(s.channel,s.agentChannel),setTimeout(d,1100,s.channel,s.agentChannel))});function i(){logger.log("IMP",s.channel.id,"agent_c2c","Inside start_playback"),"PLAY_NOT_AVAILABLE"==s.user_ivr_state?(logger.log("IMP",s.channel.id,"agent_c2c","IVR STATE (PLAY_NOT_AVAILABLE)"),s.mediafileName=cfg.media.dir+"/"+cfg.outgoing.not_available+"-e",logger.log("IMP",s.channel.id,"agent_c2c","Play ("+s.mediafileName+")"),current_sound="sound:"+s.mediafileName,logger.log("IMP",s.channel.id,"agent_c2c","Going to play media["+current_sound+"]"),e=null,e=s.client.Playback(),logger.log("DEB",s.channel.id,"agent_c2c","channel:",s.channel.caller),s.channel.play({media:current_sound},e,function(e,n){logger.log("ERR",s.channel.id,"agent_c2c","...In Playback Handler:"+e)})):"PLAY_BUSSY"==s.user_ivr_state?(logger.log("IMP",s.channel.id,"agent_c2c","IVR STATE (PLAY_BUSSY)"),s.mediafileName=cfg.media.dir+"/"+cfg.outgoing.number_is_bussy+"-e",logger.log("IMP",s.channel.id,"agent_c2c","Play ("+s.mediafileName+")"),current_sound="sound:"+s.mediafileName,logger.log("IMP",s.channel.id,"agent_c2c","Going to play media["+current_sound+"]"),e=null,e=s.client.Playback(),logger.log("DEB",s.channel.id,"agent_c2c","channel:",s.channel.caller),s.channel.play({media:current_sound},e,function(e,n){logger.log("ERR",s.channel.id,"agent_c2c","...In Playback Handler:"+e)})):"PLAY_BUSSY_SWITCHEDOFF"==s.user_ivr_state?(logger.log("IMP",s.channel.id,"agent_c2c","IVR STATE (PLAY_BUSSY_SWITCHEDOFF)"),s.mediafileName=cfg.media.dir+"/"+cfg.outgoing.busy_or_switchedoff+"-e",logger.log("IMP",s.channel.id,"agent_c2c","Play ("+s.mediafileName+")"),current_sound="sound:"+s.mediafileName,logger.log("IMP",s.channel.id,"agent_c2c","Going to play media["+current_sound+"]"),e=null,e=s.client.Playback(),logger.log("DEB",s.channel.id,"agent_c2c","channel:",s.channel.caller),s.channel.play({media:current_sound},e,function(e,n){logger.log("ERR",s.channel.id,"agent_c2c","...In Playback Handler:"+e)})):"PLAY_SWITCHEDOFF_NOTRESPONDING"==s.user_ivr_state?(logger.log("IMP",s.channel.id,"agent_c2c","IVR STATE (PLAY_SWITCHEDOFF_NOTRESPONDING)"),s.mediafileName=cfg.media.dir+"/"+cfg.outgoing.notresponding_or_switchedoff+"-e",logger.log("IMP",s.channel.id,"agent_c2c","Play ("+s.mediafileName+")"),current_sound="sound:"+s.mediafileName,logger.log("IMP",s.channel.id,"agent_c2c","Going to play media["+current_sound+"]"),e=null,e=s.client.Playback(),logger.log("DEB",s.channel.id,"agent_c2c","channel:",s.channel.caller),s.channel.play({media:current_sound},e,function(e,n){logger.log("ERR",s.channel.id,"agent_c2c","...In Playback Handler:"+e)})):"WAITING_AGENT_C2C_DATA"==s.user_ivr_state?(logger.log("IMP",s.channel.id,"agent_c2c","IVR STATE (WAITING_AGENT_C2C_DATA)"),s.mediafileName=cfg.media.dir+"/"+cfg.outgoing.agent_wait_fetching_data+"-e",logger.log("IMP",s.channel.id,"agent_c2c","Play ("+s.mediafileName+")"),current_sound="sound:"+s.mediafileName,logger.log("IMP",s.channel.id,"agent_c2c","Going to play media["+current_sound+"]"),e=null,e=s.client.Playback(),logger.log("DEB",s.channel.id,"agent_c2c","channel:",s.channel.caller),s.channel.play({media:current_sound},e,function(e,n){logger.log("ERR",s.channel.id,"agent_c2c","...In Playback Handler:"+e)})):"AGENT_C2C_TRY_LATER"==s.user_ivr_state?(logger.log("IMP",s.channel.id,"agent_c2c","IVR STATE (AGENT_C2C_TRY_LATER)"),s.mediafileName=cfg.media.dir+"/"+cfg.outgoing.agent_try_after_sometime+"-e",logger.log("IMP",s.channel.id,"agent_c2c","Play ("+s.mediafileName+")"),current_sound="sound:"+s.mediafileName,logger.log("IMP",s.channel.id,"agent_c2c","Going to play media["+current_sound+"]"),e=null,e=s.client.Playback(),logger.log("DEB",s.channel.id,"agent_c2c","channel:",s.channel.caller),s.channel.play({media:current_sound},e,function(e,n){logger.log("ERR",s.channel.id,"agent_c2c","...In Playback Handler:"+e)})):logger.log("ERR",s.channel.id,"agent_c2c","Invalid DB response!")}function o(){logger.log("DEB",s.channel.id,"agent_c2c","cleanup request.."),s.channel.removeListener("ChannelHangupRequest",a),"1"==s.idealAgentFlag&&(logger.log("DEB",s.channel.id,"agent_c2c","calling makeAgentFree to mark the tried agent idle"),agentProcessor.freeAgent(s)),null!=s.agentChannel&&(logger.log("DEB",s.channel.id,"agent_c2c","removeListener of ChannelDtmfReceived"),s.agentChannel.removeListener("ChannelDtmfReceived",r))}function r(e,n){logger.log("IMP",s.channel.id,"agent_c2c","Inside on_dtmf"),"#"===e.digit&&(console.log("Accepted recording",s.callRecordedFile),s.client.recordings.stop({recordingName:s.callRecordedFile},function(e){}))}function a(e,n){"INCOMING"==s.callDirection&&"22"!=s.callcdrMode&&(s.customer_number=s.idealAgentNumber),0!=s.CustomerConnectedStartTime?(s.CustomerConnectedEndTime=dateTime.getAgentDateTime(),s.CustomerConnectedDuration=dateTime.calculateDuration(s.CustomerConnectedStartTime,s.CustomerConnectedEndTime),logger.log("DEB",s.channel.id,"agent_c2c","CustomerConnectedDuration("+s.CustomerConnectedDuration+")")):s.CustomerConnectedStartTime="0",logger.log("DEB",s.channel.id,"agent_c2c","on_hangup, idealAgentNumber("+s.idealAgentNumber+") , customer_number("+s.customer_number+")"),logger.log("IMP",s.channel.id,"agent_c2c","Inside on_hangup"),o(),logger.log("DEB",s.channel.id,"agent_c2c","State-Machine Update to ==> [Event.HANGUP]"),s.state_machine.change_state(Event.HANGUP)}function d(e,n){e.hangup(function(e){})}function t(e,n){logger.log("IMP",s.channel.id,"agent_c2c",""),logger.log("IMP",s.channel.id,"agent_c2c","ON Event [channelStateChange {"+n.state+"}]"),logger.log("IMP",s.channel.id,"agent_c2c",""),console.log(util.format("Channel %s is now: %s",n.name,n.state)),"Ringing"==n.state?(logger.log("DEB",s.channel.id,"agent_c2c","inside Ringing state"),s.CustomerRingingStartTime=dateTime.getAgentDateTime(),logger.log("DEB",s.channel.id,"agent_c2c","CustomerRingingStartTime("+s.CustomerRingingStartTime+")")):"Up"==n.state?(logger.log("DEB",s.channel.id,"agent_c2c","inside Up state"),s.CustomerConnectedStartTime=dateTime.getAgentDateTime(),logger.log("DEB",s.channel.id,"agent_c2c","CustomerConnectedStartTime("+s.CustomerConnectedStartTime+")"),s.CustomerRingingEndTime=dateTime.getAgentDateTime(),s.CustomerRingingDuration=dateTime.calculateDuration(s.CustomerRingingStartTime,s.CustomerRingingEndTime),logger.log("DEB",s.channel.id,"agent_c2c","CustomerRingingDuration("+s.CustomerRingingDuration+")"),s.customerStatus="0"):logger.log("DEB",s.channel.id,"agent_c2c","inside other state")}logger.log("DEB",s.channel.id,"agent_c2c","checking App c2c detail to make customer call.."),logger.log("DEB",s.channel.id,"agent_c2c","SmeId: "+s.smeID),logger.log("DEB",s.channel.id,"agent_c2c","VirtualNo: "+s.calllongcode),logger.log("DEB",s.channel.id,"agent_c2c","agentnumber: "+s.idealAgentNumber),logger.log("DEB",s.channel.id,"agent_c2c","recording flag: "+s.smerecording),logger.log("DEB",s.channel.id,"agent_c2c","masking flag: "+s.smemasking),logger.log("DEB",s.channel.id,"agent_c2c","voicemail flag: "+s.smemasking),logger.log("DEB",s.channel.id,"agent_c2c","sme status flag: "+s.smestatus),logger.log("DEB",s.channel.id,"agent_c2c","valid SME Algorithm: "+s.smeAlgorithm),logger.log("DEB",s.channel.id,"agent_c2c","Queue Limit: "+s.queue_limit),logger.log("DEB",s.channel.id,"agent_c2c","agentid: "+s.idealAgentID),logger.log("DEB",s.channel.id,"agent_c2c","agentgroup: "+s.idealAgentGroup),api.funGetAppOutCallDetail(s.channel.id,s.smeID,s.idealAgentNumber,s.called_number,s.callSessionId,function(e,n,a){var g,l;e||200!=n.statusCode||0==a.status?(logger.log("DEB",s.channel.id,"agent_c2c","Agent not have valid data of far end  statusCode("+n.statusCode+") && result.status("+a.status+")"),logger.log("IMP",s.channel.id,"agent_c2c","agentC2CtriedCounter("+s.agentC2CtriedCounter+")"),cfg.outgoing.agent_c2c_wait_retry<s.agentC2CtriedCounter?(logger.log("DEB",s.channel.id,"agent_c2c","play, try again and kill the call."),logger.log("DEB",s.channel.id,"agent_c2c","Media State Update: AGENT_C2C_TRY_LATER"),s.user_ivr_state="AGENT_C2C_TRY_LATER"):(logger.log("DEB",s.channel.id,"agent_c2c","lets try again to get c2c agent data"),logger.log("DEB",s.channel.id,"agent_c2c","Media State Update: WAITING_AGENT_C2C_DATA"),s.user_ivr_state="WAITING_AGENT_C2C_DATA"),s.agentC2CtriedCounter++,i(s.currentState)):0!=a.data.click2call.length?(logger.log("DEB",s.channel.id,"agent_c2c","Valid Application API response of click2call"),s.customer_number=a.data.click2call[0].to_no,s.called_number=a.data.click2call[0].from_no,s.c2cMode=a.data.click2call[0].call_mode,s.address_book_name="",s.address_book_id="0",logger.log("DEB",s.channel.id,"agent_c2c","Customer Name: "+s.address_book_name),logger.log("DEB",s.channel.id,"agent_c2c","Addressbook ID: "+s.address_book_id),logger.log("DEB",s.channel.id,"agent_c2c","Customer Number: "+s.customer_number),logger.log("DEB",s.channel.id,"agent_c2c","C2C Mode: "+s.c2cMode),s.customer_number.length>=cfg.outgoing.number_length?(s.ringTime=0,s.ccEndNode="CCG_"+s.allocated_agent+"_"+s.ringTime+"_"+s.dialStatus,s.callMode="WRINGG_APP",logger.log("DEB",s.channel.id,"agent_c2c","Called Number: "+s.customer_number),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"dialstatus",value:s.dialstatus},function(e){e?logger.log("ERR",s.channel.id,"agent_c2c","["+this.state_name+"]: error in setchannelvar: "+e):logger.log("DEB",s.channel.id,"agent_c2c","Channel Variable dialstatus set!!")}),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"ccEndNode",value:s.ccEndNode},function(e){e?logger.log("IMP",s.channel.id,"agent_c2c","["+this.state_name+"]: error in setchannelvar: "+e):logger.log("IMP",s.channel.id,"agent_c2c","Channel Variable ccEndNode set!!")}),logger.log("DEB",s.channel.id,"agent_c2c","Agent "+s.idealAgentNumber+" is safe to patch a call"),logger.log("IMP",s.channel.id,"agent_c2c","###################### Dial Status is : "+s.dialStatus),logger.log("IMP",s.channel.id,"agent_c2c","###################### cc EndNode is : "+s.ccEndNode),s.allocated_agent=s.customer_number,logger.log("DEB",s.channel.id,"agent_c2c","Will Dial the allocated Agent:"+s.allocated_agent),logger.log("DEB",s.channel.id,"agent_c2c","and bridge the customer number:"+s.channel.caller.number),s.channel.caller.number,s.allocated_agent,logger.log("DEB",s.channel.id,"agent_c2c","and bridge the customer number:"+s.channel.caller.number),logger.log("DEB",s.channel.id,"agent_c2c","Mark the agent busy - markAgentBusy"),agentProcessor.markAgentBusy(s),g=s.channel,e="",l=s.client.Channel(),s.callpatchedAgentId=s.idealAgentID,s.AgentStartCallTime=dateTime.getAgentDateTime(),e=s.calllongcode,s.agentChannel=l,n="SIP/"+s.allocated_agent+"@"+cfg.asterisk.gw_ipaddr_port,e="ed_kommuno <"+e+">",logger.log("DEB",s.channel.id,"agent_c2c","Current State ["+s.currentState+"] Update to ==> [originating]"),s.currentState="originating",logger.log("DEB",s.channel.id,"agent_c2c","callerID("+e+"), endPoint("+n+")"),s.originateTime=(new Date).getTime(),logger.log("DEB",s.channel.id,"agent_c2c","Call Originate Time :  "+s.originateTime),s.waitingTime=(s.originateTime-s.startTime)/1e3,logger.log("DEB",s.channel.id,"agent_c2c"," Waiting  time : [",s.waitingTime,"]"),l.on("ChannelStateChange",t),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"waitingTime",value:s.waitingTime},function(e){e?logger.log("ERR",s.channel.id,"agent_c2c","["+this.state_name+"]: Error in SetChannelVar "+e):logger.log("DEB",s.channel.id,"agent_c2c","["+this.state_name+"]: Channel Varaible SetChannelVar set!")}),g.on("StasisEnd",function(e,n){var a;logger.log("DEB",s.channel.id,"agent_c2c"," channel inside StasisEnd  "+n.id),logger.log("DEB",s.channel.id,"agent_c2c"," Inside channel StasisEnd function "),a=l,logger.log("DEB",s.channel.id,"agent_c2c","Channel "+n.name+" left our application, hanging up dialed channel: "+a.name),a.hangup(function(e){})}),l.on("ChannelDestroyed",function(e,n){var a,l,t,c,g;logger.log("DEB",s.channel.id,"agent_c2c","Inside dialed ChannelDestroyed, Current State ["+s.currentState+"]"),logger.log("DEB",s.channel.id,"agent_c2c","Agent call disconneced, Reason_Cause["+e.cause+"] Cause_Msg["+e.cause_txt+"]"),s.agentCallResponseCode=e.cause,s.agentCallResponseMsg=e.cause_txt,s.customerEndCallTime=dateTime.getAgentDateTime(),0!=s.CustomerConnectedStartTime?(s.CustomerConnectedEndTime=dateTime.getAgentDateTime(),s.CustomerConnectedDuration=dateTime.calculateDuration(s.CustomerConnectedStartTime,s.CustomerConnectedEndTime),logger.log("DEB",s.channel.id,"call_autodial","CustomerConnectedDuration("+s.CustomerConnectedDuration+")")):s.CustomerConnectedStartTime="0","patched"!=s.currentState?(e=dateTime.getAgentDateTime(),e=dateTime.calculateDuration(s.AgentStartCallTime,e),logger.log("DEB",s.channel.id,"agent_c2c","failed call duration("+e+" seconds)"),logger.log("DEB",s.channel.id,"agent_c2c","Play End Call Termination to A-Party"),"16"==s.agentCallResponseCode&&e<"30"||"17"==s.agentCallResponseCode?(logger.log("DEB",s.channel.id,"agent_c2c","Media State Update: PLAY_BUSSY"),s.user_ivr_state="PLAY_BUSSY"):"16"==s.agentCallResponseCode&&"30"<=e?(logger.log("DEB",s.channel.id,"agent_c2c","Media State Update: PLAY_SWITCHEDOFF_NOTRESPONDING"),s.user_ivr_state="PLAY_SWITCHEDOFF_NOTRESPONDING"):"19"==s.agentCallResponseCode?(logger.log("DEB",s.channel.id,"agent_c2c","Media State Update: PLAY_BUSSY_SWITCHEDOFF"),s.user_ivr_state="PLAY_BUSSY_SWITCHEDOFF"):(logger.log("DEB",s.channel.id,"agent_c2c","no match case so playing default end call media"),logger.log("DEB",s.channel.id,"agent_c2c","Media State Update: PLAY_NOT_AVAILABLE"),s.user_ivr_state="PLAY_NOT_AVAILABLE"),i(s.currentState)):logger.log("DEB",s.channel.id,"agent_c2c","State ("+s.currentState+") so no Media for End Call Termination"),"1"==s.callRecordingStatus?"mp3"==cfg.system.recording_type?(logger.log("DEB",s.channel.id,"agent_c2c","active recording, need to stop!"),console.log("Accepted recording",s.callRecordedFile),s.client.recordings.stop({recordingName:s.callRecordedFile},function(e){}),l=s.callRecordedFile+".wav",t="/var/spool/asterisk/recording/"+s.callRecordedFile+".wav",c=cfg.media.rec_dir+"/"+s.callRecordedFile+".wav",a=cfg.media.rec_dir+"/"+s.callRecordedFile+".mp3",g=cfg.media.rec_dir+"/"+s.smeID,fs.existsSync(g)||fs.mkdirSync(g),s.callRecordedFile=t,mv(t,c,function(e){if(e)throw e;logger.log("DEB",s.channel.id,"agent_c2c","RECORDING Successfully Move from: ("+t+") to: ("+c+")"),s.callRecordedFile=c,s.s3RecordedFile=a,s.s3RecordedFileWav=c,logger.log("DEB",s.channel.id,"agent_c2c","storing recording in DB.."),s.callDirection="OUTGOING";e=`ffmpeg -i ${s.s3RecordedFileWav} -codec:a libmp3lame -qscale:a 2 `+s.s3RecordedFile;exec(e,(e,n,a)=>{e?(logger.log("ERR",s.channel.id,"agent_c2c","ENCODING failed, store failed recording. SaveS3FailedRecordingData error"+e),logger.log("ERR",s.channel.id,"agent_c2c","file encoded failed to mp3 "+s.s3RecordedFile+" from wav "+s.s3RecordedFileWav),agentProcessor.SaveS3FailedRecordingData(s)):(logger.log("DEB",s.channel.id,"agent_c2c","file encoded to mp3 "+s.s3RecordedFile+" from wav "+s.s3RecordedFileWav),null!=s.s3RecordedFile&&0!=s.s3RecordedFile.length&&awsS3.s3Upload(s,s.smeID,s.s3RecordedFile,s.s3RecordedFile,function(e,n){e?(logger.log("ERR",s.channel.id,"agent_c2c","UPLOAD s3Upload failed, store for retry"),logger.log("DEB",s.channel.id,"agent_c2c","UPLOAD to s3 failed, store failed recording. SaveS3FailedRecordingData"),agentProcessor.SaveS3FailedRecordingData(s)):(logger.log("DEB",s.channel.id,"agent_c2c","UPLOAD S3 s3Upload Received: "+n.Location),console.log(n),s.s3uploadedUrl=n.Location,s.callDirection="OUTGOING",logger.log("DEB",s.channel.id,"agent_c2c","calling agentProcessor.SaveS3RecordingData "),agentProcessor.SaveS3RecordingData(s),fs.unlink(s.s3RecordedFileWav,e=>{e?(logger.log("ERR",s.channel.id,"agent_c2c","DELETE error while deleting wav recording file("+s.s3RecordedFileWav+"):",e),console.error(e)):logger.log("DEB",s.channel.id,"agent_c2c","DELETE successfully deleting wav recording file"+s.s3RecordedFileWav)}),fs.unlink(s.s3RecordedFile,e=>{e?(logger.log("ERR",s.channel.id,"agent_c2c","DELETE error while deleting mp3 recording file("+s.s3RecordedFile+"):",e),console.error(e)):logger.log("DEB",s.channel.id,"agent_c2c","DELETE successfully deleting mp3 recording file"+s.s3RecordedFile)}))}))})})):"wav"==cfg.system.recording_type?(logger.log("DEB",s.channel.id,"agent_c2c","active recording, need to stop!"),console.log("Accepted recording",s.callRecordedFile),s.client.recordings.stop({recordingName:s.callRecordedFile},function(e){}),l=s.callRecordedFile+".wav",t="/var/spool/asterisk/recording/"+s.callRecordedFile+".wav",c=cfg.media.rec_dir+"/"+s.callRecordedFile+".wav",g=cfg.media.rec_dir+"/"+s.smeID,fs.existsSync(g)||fs.mkdirSync(g),s.callRecordedFile=t,mv(t,c,function(e){if(e)throw e;logger.log("DEB",s.channel.id,"agent_c2c","RECORDING Successfully Move from: ("+t+") to: ("+c+")"),s.callRecordedFile=c,s.s3RecordedFile=c,logger.log("DEB",s.channel.id,"agent_c2c","storing recording in DB.."),s.callDirection="OUTGOING",null!=s.s3RecordedFile&&0!=s.s3RecordedFile.length&&awsS3.s3Upload(s,s.smeID,s.s3RecordedFile,l,function(e,n){e?logger.log("ERR",s.channel.id,"agent_c2c","s3Upload failed"):(logger.log("DEB",s.channel.id,"agent_c2c","s3Upload Received: "+n.Location),console.log(n),s.s3uploadedUrl=n.Location,logger.log("DEB",s.channel.id,"agent_c2c","calling agentProcessor.SaveS3RecordingData "),agentProcessor.SaveS3RecordingData(s),fs.unlink(s.s3RecordedFile,e=>{e?(logger.log("ERR",s.channel.id,"agent_c2c","DELETE error while deleting wav recording file("+s.s3RecordedFile+"):",e),console.error(e)):logger.log("DEB",s.channel.id,"agent_c2c","DELETE successfully deleting wav recording file"+s.s3RecordedFile)}))})})):logger.log("ERR",s.channel.id,"agent_c2c","invalid recording format mentioned in cfg file. ("+cfg.system.recording_type+")"):logger.log("DEB",s.channel.id,"agent_c2c","No active recording!"),s.callInfo="outgoing",logger.log("DEB",s.channel.id,"agent_c2c","generating agent cdr for agent call reporting (failed to answer)"),logger.log("DEB",s.channel.id,"agent_c2c","============================================== free the agent =================================="),agentProcessor.freeAgent(s),agentProcessor.logAgentCdr(s),agentProcessor.logCustomerCdr(s),"originating"==s.currentState?(s.disconnectStatus="NOANSWER",o()):"feedback"==s.currentState?logger.log("DEB",s.channel.id,"agent_c2c"," call current state is : ["+s.currentState+"]"):("user_disconnect"!=s.currentState&&(logger.log("DEB",s.channel.id,"agent_c2c","Current State ["+s.currentState+"] Update to ==> [agent_disconnect]"),s.currentState="agent_disconnect",s.disconnectStatus="AGENT",logger.log("DEB",s.channel.id,"agent_c2c"," Call disconnected by agent")),d(s.channel))}),a="channel:"+s.channel.id,logger.log("DEB",s.channel.id,"agent_c2c","stasisApp app name: "+cfg.asterisk.stasisApp),s.client.applications.subscribe({applicationName:cfg.asterisk.stasisApp,eventSource:a},function(e,n){e?logger.log("ERR",s.channel.id,"agent_c2c","Error while subscribing for channel!!"):logger.log("DEB",s.channel.id,"agent_c2c","Subscribed for channel successfully")}),l.on("Ring",function(e,n){logger.log("DEB",s.channel.id,"agent_c2c","Ringing!!!")}),s.client.channels.ring({channelId:s.channel.id},function(e){e&&logger.log("['ERR', call.channel.id, 'agent_c2c', "+this.state_name+"]: Error in Ringing Function "+e)}),l.on("ChannelHold",function(e,n){s.holdEventTime=(new Date).getTime(),logger.log("DEB",s.channel.id,"agent_c2c","#####   ChannelHold and time is : !!!"+s.holdEventTime)}),l.on("ChannelUnhold",function(e,n){logger.log("DEB",s.channel.id,"agent_c2c"," #####   ChannelUnhold !!!"),s.currentTime=(new Date).getTime();var a=s.currentTime-s.holdEventTime;logger.log("DEB",s.channel.id,"agent_c2c","current time is : "+s.currentTime),s.totalHoldDuration=s.totalHoldDuration+a,logger.log("DEB",s.channel.id,"agent_c2c","current hold Duration is : "+a),logger.log("DEB",s.channel.id,"agent_c2c","holdDuration "+s.totalHoldDuration/1e3),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"holdTime",value:s.totalHoldDuration/1e3},function(e){e&&logger.log("ERR",s.channel.id,"agent_c2c","["+this.state_name+"]: Error in SetChannelVar "+e)})}),l.on("StasisStart",function(e,n){var l,t,c;logger.log("DEB",s.channel.id,"agent_c2c","Stasis Started for dialed:  "+n.id),logger.log("DEB",s.channel.id,"agent_c2c","Stasis Started time : "+s.startTime),agentProcessor.updateLiveCall(s,"22"),l=g,t=n,c=s.client.Bridge(),t.on("StasisEnd",function(e,n){var a;logger.log("DEB",s.channel.id,"agent_c2c","Inside dialed StasisEnd function"),"none"==s.calldisconnectedBy&&(s.calldisconnectedBy="agent_disconnect"),a=n,n=c,logger.log("DEB",s.channel.id,"agent_c2c","Dialed channel "+a.name+" has left our application, destroying bridge "+a.name),n.destroy(function(e){if(e)throw e;logger.log("DEB",s.channel.id,"agent_c2c","Bridge Destroyed !"+a.name)})}),t.on("ChannelDtmfReceived",r),t.answer(function(e){if(e)throw e;logger.log("DEB",s.channel.id,"agent_c2c","Dialed Channel Answered. Inform CRM about patching here"),s.dialStatus="ANSWER",logger.log("DEB",s.channel.id,"agent_c2c","Dial Status change to  : ["+s.dialStatus+"]"),s.answerTime=(new Date).getTime();var n,a,e=parseInt(s.answerTime/1e3);logger.log("DEB",s.channel.id,"agent_c2c","answer time is "+e),s.ringTime=(s.answerTime-s.originateTime)/1e3,s.ccEndNode="CCG_"+s.allocated_agent+"_"+s.ringTime+"_"+s.dialStatus,logger.log("DEB",s.channel.id,"agent_c2c"," Ring Time : ["+s.ringTime+"] and CCG endNode is : ["+s.ccEndNode+"]"),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"ringTime",value:s.ringTime},function(e){e?logger.log("ERR",s.channel.id,"agent_c2c","["+this.state_name+"]: Error in SetChannelVar: "+e):logger.log("DEB",s.channel.id,"agent_c2c","["+this.state_name+"]: Channel Varaible ringTime set! ")}),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"callPatchTime",value:e},function(e){e?logger.log("ERR",s.channel.id,"agent_c2c","["+this.state_name+"]: Error in SetChannelVar: "+e):logger.log("DEB",s.channel.id,"agent_c2c","["+this.state_name+"]: Channel Varaible callPatchTime set! ")}),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"dialStatus",value:s.dialStatus},function(e){e?logger.log("ERR",s.channel.id,"agent_c2c","["+this.state_name+"]: Error in SetChannelVar(%s)"+e):logger.log("DEB",s.channel.id,"agent_c2c","["+this.state_name+"]: Channel Varaible dialStatus set! ")}),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"ccEndNode",value:s.ccEndNode},function(e){e?logger.log("ERR",s.channel.id,"agent_c2c","["+this.state_name+"]: Error in SetChannelVar: "+e):logger.log("DEB",s.channel.id,"agent_c2c","["+this.state_name+"]: Channel Varaible ccEndNode set! ")}),s.client.channels.setChannelVar({channelId:s.channel.id,variable:"waitingStatus",value:"ANSWERED"},function(e){e?logger.log("ERR",s.channel.id,"agent_c2c","["+this.state_name+"]: Error in SetChannelVar(%s)"+e):logger.log("DEB",s.channel.id,"agent_c2c","["+this.state_name+"]: Channel Varaible waitingStatus set! ")}),e=l,n=t,a=c,logger.log("DEB",s.channel.id,"agent_c2c","Adding channel "+e.name+" and dialed channel "+n.name+" to bridge: "+a.id),a.addChannel({channel:[e.id,n.id]},function(e){if(e)throw e;s.BRIDGED_TIME=(new Date).getTime();e=parseInt(s.BRIDGED_TIME/1e3);logger.log("DEB",s.channel.id,"agent_c2c","Time When bridged:"+e)}),logger.log("DEB",s.channel.id,"agent_c2c","Will send notify for channel "+l.id+" and caller: "+l.caller.number),logger.log("DEB",s.channel.id,"agent_c2c","Current State ["+s.currentState+"] Update to ==> [patched]"),s.currentState="patched"}),c.create({type:"mixing,dtmf_events,proxy_media"},function(e,n){if(e)throw e;logger.log("DEB",s.channel.id,"agent_c2c","Created bridge: "+n.id),s.AgentStatus=0,s.callanswerFlag="2","1"==s.callfinalStatus&&(s.callfinalStatus="0"),"none"==s.callpatchedAgentGroup&&(s.callpatchedAgentGroup=s.idealAgentGroup),s.callpatchedAgentId=s.idealAgentID,"false"==s.callcdrFlag&&(s.callcdrFlag="true;"),"1"==s.smerecording&&(logger.log("IMP",s.channel.id,"agent_c2c","enabled SME recording flag: "+s.smerecording),s.callRecordedFileRaw="AOR_"+s.channel.id+"_"+Date.now().toString(),s.callRecordedFile=s.smeID+"/"+s.callRecordedFileRaw,s.client.bridges.record({bridgeId:n.id,format:"wav",name:s.callRecordedFile},e=>{}),logger.log("IMP",s.channel.id,"agent_c2c","Recording started @: "+s.callRecordedFile),s.callRecordingStatus="1")})}),l.originate({endpoint:n,app:cfg.asterisk.stasisApp,appArgs:"AGENT_CH",callerId:e},function(e,n){e?logger.log("ERR",s.channel.id,"agent_c2c","Error in dialing("+e+")"):(s.customerStartCallTime=dateTime.getAgentDateTime(),logger.log("DEB",s.channel.id,"agent_c2c","customerStartCallTime("+s.customerStartCallTime+") marked on dialing"))})):(logger.log("ERR",s.channel,"agent_c2c","Invalid number to make click2call ("+s.customer_number+")"),logger.log("DEB",s.channel.id,"agent_c2c","Agent not have valid data of far end call.customer_number.length:("+s.customer_number.length+")"),s.callagentincomingstate="AGENT_WELCOME",logger.log("DEB",s.channel.id,"agent_c2c","Its Agent Incoming call (IVR-Call)"),logger.log("DEB",s.channel.id,"agent_c2c","State-Machine Update to ==> [Event.AGENT_INCOMING]"),s.state_machine.change_state(Event.AGENT_INCOMING)),logger.log("DEB",s.channel.id,"agent_c2c","Init Call CDR and Unique Number Detail Set on NEW CALL."),agentProcessor.setEndCallCdr(s,"0"),agentProcessor.addLiveCall(s)):(logger.log("ERR",s.channel.id,"agent_c2c","invalid customer number length: "+s.customer_number.length),s.callagentincomingstate="AGENT_WELCOME",logger.log("DEB",s.channel.id,"agent_c2c","Its Agent Incoming call (IVR-Call)"),logger.log("DEB",s.channel.id,"agent_c2c","State-Machine Update to ==> [Event.AGENT_INCOMING]"),s.state_machine.change_state(Event.AGENT_INCOMING))})}}module.exports=AgentClick2Call;