function EndingState(n){this.state_name="ending",this.enter=function(){channel_name=n.channel.name,console.log("Ending call from",channel_name),n.channel.hangup()}}module.exports=EndingState;