var Event=require("./events"),cfg=require("../../pbx_config"),pbx_db=require("./pbx_db"),pbx_api=require("./api/pbx_api"),pbx_logger=require("./logger/pbx_logger"),agent_processor=require("./agent_processor"),awsS3=require("./s3/awsS3"),dt=require("./common/datetime"),express=require("express"),ari=require("ari-client"),util=require("util"),path=require("path"),fs=require("fs"),mv=require("mv"),logger=new pbx_logger,agentProcessor=new agent_processor,awsS3=new awsS3,dbOutput="",dbSMEid="",gcatId="",gcatDesc="",gparentCatId="",gvalidDtmf="",gchildrenStatus="",gmediaFile="",eventType="",flowType="",vm_recording="",api=new pbx_api,dateTime=new dt;function Voicemail(g){this.state_name="user_voicemail_state",this.enter=function(){var i;new pbx_db;function l(e){"SIMPLE_PLAY_WELCOME_VM"==g.callvoicemailstate?(g.voicemailTimerCounter="1",g.callvoicemailstate="PLAY_WELCOME",logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (SIMPLE_PLAY_WELCOME_VM)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.simple_voicemail_msg+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.simple_voicemail_msg+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","PLAY_WELCOME...In Playback Handler:"+e)})):"PLAY_WELCOME"==g.callvoicemailstate?(g.voicemailTimerCounter="1",logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (PLAY_WELCOME)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.welcome+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.welcome+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","PLAY_WELCOME...In Playback Handler:"+e)})):"PLAY_WELCOME_OFFHOUR"==g.callvoicemailstate?(g.voicemailTimerCounter="1",logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (PLAY_WELCOME_OFFHOUR)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.welcome_offhour+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.welcome_offhour+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","PLAY_WELCOME_OFFHOUR...In Playback Handler:"+e)})):"NO_VOICEMAIL"==g.callvoicemailstate?(logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (NO_VOICEMAIL)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.no_voicemail_thanks+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.no_voicemail_thanks+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","NO_VOICEMAIL...In Playback Handler:"+e)})):"OFF_HOURS"==g.callvoicemailstate?(logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (OFF_HOURS)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.no_working_hours+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.no_working_hours+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","OFF_HOURS...In Playback Handler:"+e)})):"THANKS_VOICEMAIL_MSG"==g.callvoicemailstate?(logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (THANKS_VOICEMAIL_MSG)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.thanks_voicemail_msg+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.thanks_voicemail_msg+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","THANKS_VOICEMAIL_MSG...In Playback Handler:"+e)})):"PLAY_REC_MAIN"==g.callvoicemailstate&&(logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (PLAY_REC_MAIN)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.rec_voicemail+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.rec_voicemail+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","PLAY_REC_MAIN...In Playback Handler:"+e)}))}function a(e){"timer_REPEATE_PLAY_WELCOME"==g.voicemailTimer?g.voicemailTimerCounter<"3"?(g.voicemailTimerCounter++,logger.log("DEB",g.channel.id,"voicemail","timer_REPEATE_PLAY_WELCOME timer("+g.voicemailTimerCounter+")"),logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (PLAY_WELCOME)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.no_input+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.no_input+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","PLAY_WELCOME...In Playback Handler:"+e)})):(logger.log("DEB",g.channel.id,"voicemail","timer_REPEATE_PLAY_WELCOME timer expired("+g.voicemailTimerCounter+")"),g.callvoicemailstate="NO_RESPONSE",logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State (NO_RESPONSE)"),logger.log("IMP",g.channel.id,"voicemail","Current state for start_playback is: "+e),logger.log("IMP",g.channel.id,"voicemail","Play: ("+cfg.voicemail.call_again+") Path: ("+cfg.media.dir+")"),i="sound:"+cfg.media.dir+"/"+cfg.voicemail.call_again+"-"+g.language,logger.log("IMP",g.channel.id,"voicemail","Going to play media ["+i+"]"),playback=null,playback=g.client.Playback(),logger.log("DEB",g.channel.id,"voicemail","channel:",g.channel.caller),g.channel.play({media:i},playback,function(e,i){logger.log("ERR",g.channel.id,"voicemail","NO_VOICEMAIL...In Playback Handler:"+e)})):"timer_STOP_VOICEMAIL_RECORDING"==g.voicemailTimer?(logger.log("IMP",g.channel.id,"voicemail","timer_STOP_VOICEMAIL_RECORDING expired.."),logger.log("DEB",g.channel.id,"voicemail","active voicemail recording, need to stop!"),logger.log("DEB",g.channel.id,"voicemail","Accepted recording"+g.voicemailRecordingFile),vm_recording.stop(function(e){logger.log("DEB",g.channel.id,"voicemail","voicemail recording stopped");var i=g.callRecordedFile+".wav",l="/var/spool/asterisk/recording/"+g.voicemailRecordingFile+".wav",a=cfg.voicemail.recording+"/"+g.voicemailRecordingFile+".wav",o=cfg.voicemail.recording+"/"+g.smeID;fs.existsSync(o)||fs.mkdirSync(o),mv(l,a,function(e){if(e)throw e;logger.log("DEB",g.channel.id,"voicemail","RECORDING Successfully Move from: ("+l+") to: ("+a+")"),g.voicemailRecordingFile=a,g.callType="3",g.s3RecordedFile=a,logger.log("DEB",g.channel.id,"agent_outgoing","storing recording in DB.."),g.callRecordedFileRaw=g.voicemailRecordingFileRaw,g.callDirection="VOICEMAIL",null!=g.s3RecordedFile&&0!=g.s3RecordedFile.length&&awsS3.s3Upload(g,g.smeID,g.s3RecordedFile,i,function(e,i){e?logger.log("ERR",g.channel.id,"agent_outgoing","s3Upload failed"):(logger.log("DEB",g.channel.id,"agent_outgoing","s3Upload Received: "+i.Location),console.log(i),g.s3uploadedUrl=i.Location,logger.log("DEB",g.channel.id,"agent_outgoing","calling agentProcessor.SaveS3RecordingData "),agentProcessor.SaveS3RecordingData(g))})})}),logger.log("DEB",g.channel.id,"voicemail","Update state from [VOICEMAIL_RECORDING] to [THANKS_VOICEMAIL_MSG]"),g.callvoicemailstate="THANKS_VOICEMAIL_MSG",l(g.currentState)):logger.log("DEB",g.channel.id,"voicemail","ignore case..")}function e(e){playback&&playback.id===e.playback.id&&g.channel,"SIMPLE_PLAY_WELCOME_VM"!==g.callvoicemailstate&&"PLAY_WELCOME"!==g.callvoicemailstate||(logger.log("DEB",g.channel.id,"voicemail","Play Promot ("+i+") finished"),g.voicemailTimer="timer_REPEATE_PLAY_WELCOME",logger.log("DEB",g.channel.id,"voicemail","timer_REPEATE_PLAY_WELCOME timer started for 5 seconds.."),setTimeout(a,5e3,g.currentState)),"PLAY_WELCOME_OFFHOUR"===g.callvoicemailstate?(logger.log("DEB",g.channel.id,"voicemail","Play Promot ("+i+") finished"),g.voicemailTimer="timer_REPEATE_PLAY_WELCOME",logger.log("DEB",g.channel.id,"voicemail","timer_REPEATE_PLAY_WELCOME timer started for 5 seconds.."),setTimeout(a,5e3,g.currentState)):"NO_VOICEMAIL"===g.callvoicemailstate||"OFF_HOURS"===g.callvoicemailstate||"NO_RESPONSE"===g.callvoicemailstate||"THANKS_VOICEMAIL_MSG"===g.callvoicemailstate?(logger.log("DEB",g.channel.id,"voicemail","Play Promot ("+i+") finished"),logger.log("IMP",g.channel.id,"voicemail","Disconnecting this call.."),c()):"PLAY_REC_MAIN"===g.callvoicemailstate&&(logger.log("DEB",g.channel.id,"voicemail","Play ("+i+") finished, start the voicemail recording.."),logger.log("IMP",g.channel.id,"voicemail","sme voicemail flag: "+g.smevoicemail),g.voicemailRecordingFileRaw="VMR_"+g.channel.id+"_"+Date.now().toString(),g.voicemailRecordingFile=g.smeID+"/"+g.voicemailRecordingFileRaw,vm_recording=g.client.LiveRecording(g.client,{name:g.voicemailRecordingFile}),g.channel.record({name:vm_recording.name,format:"wav",beep:!0,ifExists:"overwrite"},vm_recording),logger.log("IMP",g.channel.id,"voicemail","Voicemail recording started @: "+g.voicemailRecordingFile),g.voicemailRecordingStatus="1",logger.log("DEB",g.channel.id,"voicemail","Update state from [PLAY_REC_MAIN] to [VOICEMAIL_RECORDING]"),g.callvoicemailstate="VOICEMAIL_RECORDING",g.voicemailTimer="timer_STOP_VOICEMAIL_RECORDING",logger.log("DEB",g.channel.id,"voicemail","timer_STOP_VOICEMAIL_RECORDING timer started for 30 seconds.."),setTimeout(a,3e4,g.currentState))}function o(e,i){logger.log("DEB",g.channel.id,"voicemail","DTMF Event ("+e.digit+") @ state("+g.callvoicemailstate+")"),"NO_VOICEMAIL"===g.callvoicemailstate?(playback&&g.channel&&(logger.log("DEB",g.channel.id,"voicemail","stopping playing file ("+gmediaFile+")"),playback.stop()),logger.log("IMP",g.channel.id,"voicemail","DTMF("+e.digit+") received in state [NO_VOICEMAIL]"),logger.log("IMP",g.channel.id,"voicemail","Disconnecting this call.."),c()):"THANKS_VOICEMAIL_MSG"===g.callvoicemailstate?(playback&&g.channel&&(logger.log("DEB",g.channel.id,"voicemail","stopping playing file ("+gmediaFile+")"),playback.stop()),logger.log("IMP",g.channel.id,"voicemail","DTMF("+e.digit+") received in state [THANKS_VOICEMAIL_MSG]"),logger.log("DEB",g.channel.id,"voicemail","end of voicemail, Disconnecting this call.."),c()):"PLAY_WELCOME"===g.callvoicemailstate&&"1"===e.digit?(g.voicemailTimer="NA",playback&&g.channel&&(logger.log("DEB",g.channel.id,"voicemail","stopping playing file ("+gmediaFile+")"),playback.stop()),logger.log("IMP",g.channel.id,"voicemail","DTMF("+e.digit+") received in state [PLAY_WELCOME]"),logger.log("DEB",g.channel.id,"voicemail","Play beep Media"),logger.log("DEB",g.channel.id,"voicemail","Update state from [PLAY_WELCOME] to [PLAY_REC_MAIN]"),g.callvoicemailstate="PLAY_REC_MAIN",l(g.currentState)):"PLAY_WELCOME_OFFHOUR"===g.callvoicemailstate&&"1"===e.digit?(g.voicemailTimer="NA",playback&&g.channel&&(logger.log("DEB",g.channel.id,"voicemail","stopping playing file ("+gmediaFile+")"),playback.stop()),logger.log("IMP",g.channel.id,"voicemail","DTMF("+e.digit+") received in state [PLAY_WELCOME_OFFHOUR]"),logger.log("DEB",g.channel.id,"voicemail","Play beep Media"),logger.log("DEB",g.channel.id,"voicemail","Update state from [PLAY_WELCOME_OFFHOUR] to [PLAY_REC_MAIN]"),g.callvoicemailstate="PLAY_REC_MAIN",l(g.currentState)):"PLAY_REC_MAIN"===g.callvoicemailstate?(playback&&g.channel&&(logger.log("DEB",g.channel.id,"voicemail","stopping playing file ("+gmediaFile+")"),playback.stop()),logger.log("IMP",g.channel.id,"voicemail","DTMF("+e.digit+") received in state [PLAY_REC_MAIN]"),logger.log("DEB",g.channel.id,"voicemail","Start Voicemail Recording Here"),logger.log("IMP",g.channel.id,"voicemail","sme voicemail flag: "+g.smevoicemail),g.voicemailRecordingFileRaw="VMR_"+g.channel.id+"_"+Date.now().toString(),g.voicemailRecordingFile=g.smeID+"/"+g.voicemailRecordingFileRaw,vm_recording=g.client.LiveRecording(g.client,{name:g.voicemailRecordingFile}),g.channel.record({name:vm_recording.name,format:"wav",beep:!0,ifExists:"overwrite"},vm_recording),logger.log("IMP",g.channel.id,"voicemail","Voicemail recording started @: "+g.voicemailRecordingFile),g.voicemailRecordingStatus="1",logger.log("DEB",g.channel.id,"voicemail","Update state from [PLAY_REC_MAIN] to [VOICEMAIL_RECORDING]"),g.callvoicemailstate="VOICEMAIL_RECORDING"):"VOICEMAIL_RECORDING"===g.callvoicemailstate&&"#"===e.digit&&(g.voicemailTimer="NA",logger.log("IMP",g.channel.id,"voicemail","DTMF("+e.digit+") received in state [VOICEMAIL_RECORDING]"),logger.log("DEB",g.channel.id,"voicemail","active voicemail recording, need to stop!"),logger.log("DEB",g.channel.id,"voicemail","Accepted recording"+g.voicemailRecordingFile),vm_recording.stop(function(e){logger.log("DEB",g.channel.id,"voicemail","voicemail recording stopped");var i=g.callRecordedFile+".wav",l="/var/spool/asterisk/recording/"+g.voicemailRecordingFile+".wav",a=cfg.voicemail.recording+"/"+g.voicemailRecordingFile+".wav",o=cfg.voicemail.recording+"/"+g.smeID;fs.existsSync(o)||fs.mkdirSync(o),mv(l,a,function(e){if(e)throw e;logger.log("DEB",g.channel.id,"voicemail","RECORDING Successfully Move from: ("+l+") to: ("+a+")"),g.voicemailRecordingFile=a,g.callType="3",g.s3RecordedFile=a,logger.log("DEB",g.channel.id,"agent_outgoing","storing recording in DB.."),g.callDirection="VOICEMAIL",g.callRecordedFileRaw=g.voicemailRecordingFileRaw,null!=g.s3RecordedFile&&0!=g.s3RecordedFile.length&&awsS3.s3Upload(g,g.smeID,g.s3RecordedFile,i,function(e,i){e?logger.log("ERR",g.channel.id,"agent_outgoing","s3Upload failed"):(logger.log("DEB",g.channel.id,"agent_outgoing","s3Upload Received: "+i.Location),console.log(i),g.s3uploadedUrl=i.Location,logger.log("DEB",g.channel.id,"agent_outgoing","calling agentProcessor.SaveS3RecordingData "),agentProcessor.SaveS3RecordingData(g))})})}),logger.log("DEB",g.channel.id,"voicemail","Update state from [VOICEMAIL_RECORDING] to [THANKS_VOICEMAIL_MSG]"),g.callvoicemailstate="THANKS_VOICEMAIL_MSG",l(g.currentState))}function c(){"none"==g.calldisconnectedBy&&(g.calldisconnectedBy="Auto disconnect("+g.ivrFailedCallReason+")"),logger.log("IMP",g.channel.id,"voicemail","Inside cleanup function"),g.channel.removeListener("ChannelHangupRequest",n),g.channel.removeListener("ChannelDestroyed",n),g.client.removeListener("PlaybackFinished",e),g.channel.removeListener("ChannelDtmfReceived",o),g.channel.hangup(function(e){})}function n(e,i){logger.log("IMP",g.channel.id,"voicemail","Inside on_hangup"),"none"==g.calldisconnectedBy&&(g.calldisconnectedBy="user_disconnect("+g.ivrFailedCallReason+")"),logger.log("DEB",i.id,"voicemail","1 calldisconnectedBy:"+i.calldisconnectedBy),logger.log("DEB",i.id,"voicemail","2 calldisconnectedBy:"+g.calldisconnectedBy),logger.log("DEB",i.id,"voicemail","3 calldisconnectedBy:"+g.channel.calldisconnectedBy),c(),logger.log("DEB",g.channel.id,"voicemail","State-Machine Update to ==> [Event.HANGUP]"),g.state_machine.change_state(Event.HANGUP)}logger.log("IMP",g.channel.id,"voicemail","Entering user_voicemail_state: user_voicemail_state"),logger.log("DEB",g.channel.id,"voicemail","Uniqe Session ID: "+g.channel.callSessionId),g.channel.on("ChannelHangupRequest",n),g.channel.on("ChannelDestroyed",n),g.client.on("PlaybackFinished",e),g.channel.on("ChannelDtmfReceived",o),g.language="e",g.language="e","10001033"==g.smeID?(logger.log("DEB",g.channel.id,"voicemail","Special Disconnecting for Airpaypro"),logger.log("IMP",g.channel.id,"voicemail","Disconnecting this call.."),c()):(logger.log("DEB",g.channel.id,"voicemail","Current Voicemail State ("+g.callvoicemailstate+")"),l(g.currentState))}}module.exports=Voicemail;