var fs=require("fs"),dt=require("../common/datetime.js"),cfg=require("../../../pbx_config"),gwriteStream=null,gwriteStreamErr=null,gFiledDate=null,gFiledDateErr=null,logger=function(){function i(){var e,l={flags:"a",defaultEncoding:"utf8",fd:null,mode:438,autoClose:!0},g=(console.log("level: ",cfg.log.level),console.log("file_size: ",cfg.log.file_size),console.log("write_to_console_flag: ",cfg.log.write_to_console_flag),console.log("general_log_path: ",cfg.log.general_log_path),console.log("general_log_file: ",cfg.log.general_log_file),console.log("summary_log_path: ",cfg.log.summary_log_path),console.log("summary_log_file: ",cfg.log.summary_log_file),console.log("error_log_path: ",cfg.log.error_log_path),console.log("error_log_file: ",cfg.log.error_log_file),console.log("cdr_log_path: ",cfg.log.cdr_log_path),console.log("cdr_log_file: ",cfg.log.cdr_log_file),new dt),o=g.getDateString(),o=((gFiledDate=o)!=r&&(e=cfg.log.general_log_path+cfg.log.general_log_file+"_"+o+".txt",console.log("Logger File(%s)",e),gwriteStream&&gwriteStream.close(),gwriteStream=null,gwriteStream=fs.createWriteStream(e,l),r=o),g.getDateString());(gFiledDateErr=o)!=t&&(e=cfg.log.error_log_path+cfg.log.error_log_file+"_"+o+".txt",console.log("Logger File(%s)",e),gwriteStreamErr&&gwriteStreamErr.close(),gwriteStreamErr=null,gwriteStreamErr=fs.createWriteStream(e,l),t=o)}var r="",t="";return logger.prototype.init=function(e,l,g){i()},logger.prototype.log=function(e,l,g,o){var r,t;gwriteStreamErr&&(t=(r=new dt).getDateTimeString(),r.getDateString()!=gFiledDateErr&&(console.log("generating new log file.."+t+"#"+gFiledDateErr),i()),"ERR"===e)&&gwriteStreamErr.write("["+e+"] ["+t+"] ["+l+"] ["+g+"] "+o+"\n"),gwriteStream&&(t=(r=new dt).getDateTimeString(),r.getDateString()!=gFiledDate&&(console.log("generating new log file.."+t+"#"+gFiledDate),i()),"IMP"===e&&(gwriteStream.write("\n"),"1"===cfg.log.write_to_console_flag?console.log(""):console.log("ERROR: Writestream is null, Could not write logss"+t+"#"+o)),"4"===cfg.log.level&&("DEB"===e||"INFO"===e||"IMP"===e||"ERR"===e||"AGENTCDR"===e)||"3"===cfg.log.level&&("INFO"===e||"IMP"===e||"ERR"===e||"AGENTCDR"===e)||"2"===cfg.log.level&&("IMP"===e||"ERR"===e||"AGENTCDR"===e)||"1"===cfg.log.level&&"ERR"===e)&&(gwriteStream.write("["+e+"] ["+t+"] ["+l+"] ["+g+"] "+o+"\n"),"1"===cfg.log.write_to_console_flag?console.log("["+e+"] ["+t+"] ["+l+"] ["+g+"] "+o):console.log("ERROR: Writestream is null, Could not write logss"+t+"#"+o))},this};module.exports=logger;