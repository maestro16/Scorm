// File	name: lms.js
// 170113
//(c)2002-2017 Websoft Ltd. http://www.courselab.ru/ http://www.courselab.com/

var g_bUseScorm2004 = false;  
var g_bUseScorm12 = true;  
var g_bUseAicc = false;

var CLLMS =
{
	API: null,
	bAICC: false,
	bBreak: true,
	bSCORM: false,
	bLMSShotDown: false,
	dtSessionBegin: null,
	iSessionStart: 0,
	oCMI: {},
	oConfig:
	{
		bExitSuspend: true,
		bStrictEntry: true,
		nMaxTries: 7,
		oAPINames: { "1.2": "API", "2004": "API_1484_11" },
		oAPICommands:
		{
			"1.2":
			{
				"Initialize": "LMSInitialize",
				"GetValue": "LMSGetValue",
				"SetValue": "LMSSetValue",
				"Commit": "LMSCommit",
				"GetLastError": "LMSGetLastError",
				"GetErrorString": "LMSGetErrorString",
				"Terminate": "LMSFinish"
			},
			"2004":
			{
				"Initialize": "Initialize",
				"GetValue": "GetValue",
				"SetValue": "SetValue",
				"Commit": "Commit",
				"GetLastError": "GetLastError",
				"GetErrorString": "GetErrorString",
				"Terminate": "Terminate"
			}
		}
	},
	sSessionId: "",
	sSessionURL: "",
	sStandard: "none",
	AICC:
	{
		CreateData: function (oArgs)
		{
			var sStatus;
			var sSS;
			var sCS;
			var sCRLF = String.fromCharCode(13,10);
			var sData = "";
			sData += "[CORE]" + sCRLF;
			sData += "LESSON_LOCATION=" + CLZ.sCurrentSlideId + sCRLF;
			sData += "TIME=" + CLLMS.AICC.ReturnSessionTime() + sCRLF;

			var oModuleObjective;
			for(var sKey in CLJ)
			{
				if(CLJ[sKey].bModule)
				{
					oModuleObjective = CLJ[sKey];
					break;
				}
			}
			if(oModuleObjective!=null)
			{
				var nRaw = oModuleObjective.nRawScore;
				if (CLZ.bNormalize)
				{
					var nMax = oModuleObjective.nMax;
					if(nMax!=0)
					{
						var nScaled = nRaw/nMax;
						nRaw = parseInt(parseFloat(nScaled) * 100 + 0.5);
					}
				}
				sData += "SCORE=" + nRaw + sCRLF;
				// Status
				sSS = oModuleObjective.sSS.charAt(0);
				sCS = oModuleObjective.sCS.charAt(0);
				if (sSS!="" && sSS!="u")
				{
					sStatus = sSS;
				}
				else
				{
					sStatus = sCS;
				}
				sData += "LESSON_STATUS=" + sStatus + sCRLF;
			}
			sData += "[CORE_LESSON]" + sCRLF;
			sData += CLLMS.PrepareSuspendData() + sCRLF;
			sData += "[OBJECTIVES_STATUS]" + sCRLF;

			var nIndex = 1;
			for(var sKey in CLJ)
			{
				if(+CLJ[sKey].bModule==1) continue;
				sData += "J_ID." + nIndex + "=" + CLJ[sKey].id + sCRLF;
				sData += "J_Score." + nIndex + "=" + CLJ[sKey].nRawScore + sCRLF;
				sSS = CLJ[sKey].sSS.charAt(0);
				sCS = CLJ[sKey].sCS.charAt(0);
				if(sSS!="" && sSS!="u")
				{
					sStatus = sSS;
				}
				else
				{
					sStatus = sCS;
				}
				sData += "J_Status." + nIndex + "=" + sStatus + sCRLF;
				nIndex++;
			}		
			return sData;
		},
		HandleResponse: function (oArgs)
		{
			var sCRLF = String.fromCharCode(13,10);
			var sCR = String.fromCharCode(10);
			var sSrc = $.trim(unescape(oArgs.sResponse));
			var aChunks = sSrc.split(sCRLF);
			var iError = -1;
			var iData = -1;
			for(var i=0; i<aChunks.length; i++)
			{
				aChunks[i] = $.trim(aChunks[i]);
				if(aChunks[i].toUpperCase().indexOf("ERROR")==0)
				{
					iError = i;
				}
				if(aChunks[i].toUpperCase().indexOf("AICC_DATA")==0)
				{
					iData = i;
				}
			}
			if(iError==-1)
			{
				// malformed answer
				return false;
			}
			var aParts = aChunks[iError].split("=");
			if(aParts.length!=2)
			{
				return false;
			}
			aParts[1] = $.trim(aParts[1]);
			if(isNaN(+aParts[1]))
			{
				return false;
			}
			if(+aParts[1]!=0)
			{
				if(CLLMS.bBreak)
				{
					$(CL.oBoard).hide();
					$(".cl-error-frame, .cl-error-aicc-aborted").show();
					$(".cl-error-aicc-number").html( aParts[1] );
				}
				return false;
			}
			if(iData==-1)
			{
				return false;
			}
			var aData = sSrc.split(aChunks[iData]);
			if(aData.length<2)
			{
				return false;
			}
			var aDataLines = aData[1].split(sCRLF);
			var sUpperCase = "";
			var aSuspendData = [];
			var aPair = [];
			for(var i=0; i<aDataLines.length; i++)
			{
				aDataLines[i] = $.trim(aDataLines[i]);
				if(aDataLines[i]=="") continue;
				sUpperCase = aDataLines[i].toUpperCase();
				if(sUpperCase.indexOf("[CORE]")==0)
				{
					continue;
				}
				else if(sUpperCase.indexOf("[CORE_LESSON]")==0)
				{
					var iCnt = i + 1;
					while(aDataLines[iCnt]!=null)
					{
						sUpperCase = aDataLines[iCnt].toUpperCase();
						if(sUpperCase.indexOf("[")==0)
						{
							if(sUpperCase.indexOf("[CORE")==0 || sUpperCase.indexOf("[COMMENTS]")==0 || sUpperCase.indexOf("[EVALUATION]")==0 || sUpperCase.indexOf("[OBJECTIVES_STATUS]")==0 || sUpperCase.indexOf("[STUDENT_DATA]")==0)
							{
								break;
							}
							else
							{
								aSuspendData.push(aDataLines[iCnt]);
							}
						}
						else
						{
							aSuspendData.push(aDataLines[iCnt]);
						}
						iCnt++;
					}
					i = iCnt - 1;
				}
				else if(sUpperCase.indexOf("TIME")==0)
				{
					aPair = aDataLines[i].split("=");
					if(aPair.length<2)
					{
						continue;
					}
					CLZ.sTotalTime = $.trim(aPair[1]);
				}
				else if(sUpperCase.indexOf("STUDENT_NAME")==0)
				{
					aPair = aDataLines[i].split("=");
					if(aPair.length<2)
					{
						continue;
					}
					CLZ.sLearnerName = $.trim(aPair[1]);
					continue;
				}
				else if(sUpperCase.indexOf("STUDENT_ID")==0)
				{
					aPair = aDataLines[i].split("=");
					if(aPair.length<2)
					{
						continue;
					}
					CLZ.sLearnerId = $.trim(aPair[1]);
					continue;
				}
				else if(sUpperCase.indexOf("LESSON_LOCATION")==0)
				{
					aPair = aDataLines[i].split("=");
					if(aPair.length<2)
					{
						continue;
					}
					CL.sSlideId = $.trim(aPair[1]);
					continue;
				}
				else if(sUpperCase.indexOf("LESSON_STATUS")==0)
				{
					aPair = aDataLines[i].split("=");
					if(aPair.length<2)
					{
						continue;
					}
					var sValue = $.trim(aPair[1]).toLowerCase();
					var arValues = sValue.split(",");
					var sStatus = arValues[0];
					var sFlag = "r";
					if(arValues.length > 1)
					{
						sFlag = arValues[1];
					}		
					if(sFlag == "r" || sFlag == "resume")
					{
						CLLMS.oCMI.entry = "resume";
					}
					continue;
				}
			}
			CLLMS.RestoreSuspendData({ sData: aSuspendData.join(sCRLF) });
			return true;
		},
		Initialize: function (oArgs)
		{
			return true;
		},
		InitSessionTime: function (oArgs)
		{
			CLLMS.iSessionStart = (new Date()).valueOf();
		},
		Load: function (oArgs)
		{
			$.ajax(
			{
				type: "POST",
				url: CLLMS.sSessionURL,
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: "command=GetParam&version=2.0&session_id=" + escape(CLLMS.sSessionId) + "&AICC_Data=",
				dataType: "text",
				complete: function (jqXHR, sStatus)
				{
					//alert("AICC Load - no success. Status: " + sStatus);
					return false;
				},
				error: function (jqXHR, sStatus, sStatusString)
				{
					alert("AICC Load error. Status: " + sStatus + " " + sStatusString);
					return false;
				},
				success: function (sData, sStatus, jqXHR)
				{
					CLLMS.AICC.InitSessionTime();
					CLLMS.AICC.HandleResponse({ sResponse: sData });
					return true;
				}
			});
			return true;
		},
		ReturnSessionTime: function (oArgs)
		{
			var iCurrent = new Date().valueOf();
			var iPeriod = iCurrent - CLLMS.iSessionStart;
			var iH = Math.floor(iPeriod / 3600000);
			iPeriod = (iPeriod - iH*3600000);
			var iM = Math.floor(iPeriod / 60000);
			iPeriod = (iPeriod - iM*60000);
			var iS = Math.floor(iPeriod / 1000);
			var iMS = iPeriod - iS*1000;
			var sString = "";
			sString += ((iH < 10) ? ("0" + iH) : iH) + ":";
			sString += ((iM < 10) ? ("0" + iM) : iM) + ":";
			sString += ((iS < 10) ? ("0" + iS) : iS) + ".";
			sString += (iMS < 10) ? ("00" + iMS) : ((iMS < 100) ? ("0" + iMS) : iMS );
			CLLMS.AICC.InitSessionTime();
			return sString;
		},
		Save: function (oArgs)
		{
			$.ajax(
			{
				type: "POST",
				url: CLLMS.sSessionURL,
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: "command=PutParam&version=2.0&session_id=" + escape(CLLMS.sSessionId) + "&AICC_Data=" + escape(CLLMS.AICC.CreateData()),
				dataType: "text",
				complete: function (jqXHR, sStatus)
				{
					//alert("AICC Save - no success. Status: " + sStatus);
					return false;
				},
				error: function (jqXHR, sStatus, sStatusString)
				{
					alert("AICC Save error. Status: " + sStatus + " " + sStatusString);
					return false;
				},
				success: function (sData, sStatus, jqXHR)
				{
					CLLMS.AICC.InitSessionTime();
					return true;
				}
			});
		},
		Shutdown: function (oArgs)
		{
			return true;
		}
	},
	FindAPI: function (oArgs)
	{
		if(oArgs.sStandard==null) return null;
		if(CLLMS.oConfig.oAPINames[oArgs.sStandard]==null) return null;
		if(oArgs.oWindow==null) return null;
		var oWindow = oArgs.oWindow;
		var nTries = 0;
		while (oWindow[CLLMS.oConfig.oAPINames[oArgs.sStandard]]==null && oWindow.parent!=null && oWindow.parent!=oWindow)
		{
			nTries++;
			if(nTries > CLLMS.oConfig.nMaxTries)
			{
				return null;
			}
			oWindow = oWindow.parent;
		}
		return oWindow[CLLMS.oConfig.oAPINames[oArgs.sStandard]];
	},
	Init: function (oArgs)
	{
		var oWindow = window;
		var bFound = false;
		var sSCORM = (g_bUseScorm2004 ? "2004" : (g_bUseScorm12 ? "1.2" : ""));
		if(sSCORM!="")
		{
			if(oWindow.parent!=null && oWindow.parent!=oWindow)
			{
				CLLMS.API = CLLMS.FindAPI({ oWindow: oWindow.parent, sStandard: sSCORM });
				if(CLLMS.API==null && oWindow.parent.opener!=null)
				{
					CLLMS.API = CLLMS.FindAPI({ oWindow: oWindow.parent.opener, sStandard: sSCORM });
				}
			}
			if(CLLMS.API==null && oWindow.opener!=null)
			{
				CLLMS.API = CLLMS.FindAPI({ oWindow: oWindow.opener, sStandard: sSCORM });
			}
			if(CLLMS.API!=null)
			{
				CLLMS.sStandard = sSCORM;
				bFound = true;
			}
			CLLMS.bSCORM = bFound;
			if(CLLMS.bSCORM)
			{
				CLLMS.SCORM.Initialize();
			}
		}
		else
		{
			if(g_bUseAicc)
			{
				var s = window.location.search;
				if (s.length > 0)
				{
					var arPairs = s.split("&");
					for(var i=0; i<arPairs.length; i++)
					{
						if(arPairs[i].indexOf("?") == 0)
						{
							arPairs[i] = arPairs[i].substring(1, arPairs[i].length);
						}
						var arPair = arPairs[i].split("=");
						if(arPair.length == 2)
						{
							var sName = arPair[0];
							var sValue = arPair[1];
							sName = sName.toLowerCase();
							switch (sName)
							{
								case "aicc_sid":
								{
									CLLMS.sSessionId = sValue;
									break;
								}
								case "aicc_url":
								{
									CLLMS.sSessionURL = unescape(sValue);
									break;
								}
							}
						}
					}
					if(CLLMS.sSessionId!="" && CLLMS.sSessionURL!="")
					{
						CLLMS.bAICC = true;
						CLLMS.AICC.Initialize();
					}
				}
			}
		}
	},
	J:
	{
		aKeys: [ "nRawScore","oSrc","sCS","sSS" ],
		aIds: [ "r","O","c","s" ],
		Minimize: function (oArgs)
		{
			var J = {};
			var iIdx = -1;
			for(var sId in CLJ)
			{
				J[sId] = {};
				for(var sKey in CLJ[sId])
				{
					iIdx = $.inArray(sKey, CLLMS.J.aKeys);
					if(iIdx==-1) continue;
					switch(CLLMS.J.aIds[iIdx])
					{
						case "r":
						{
							J[sId][CLLMS.J.aIds[iIdx]] = +CLJ[sId][CLLMS.J.aKeys[iIdx]];
							break;
						}
						case "c":
						case "s":
						{
							J[sId][CLLMS.J.aIds[iIdx]] = CLJ[sId][CLLMS.J.aKeys[iIdx]];
							break;
						}
						case "O":
						{
							J[sId][CLLMS.J.aIds[iIdx]] = {};
							for(var sSrcId in CLJ[sId][CLLMS.J.aKeys[iIdx]])
							{
								J[sId][CLLMS.J.aIds[iIdx]][sSrcId] = +CLJ[sId][CLLMS.J.aKeys[iIdx]][sSrcId].nRawScore;
							}
							break;
						}
					}
				}
			}
			return J;
		},
		Restore: function (oArgs)
		{
			if(oArgs.J==null) return false;
			var iIdx = -1;
			for(var sId in oArgs.J)
			{
				if(CLJ[sId]==null) continue;
				for(var sKey in oArgs.J[sId])
				{
					iIdx = $.inArray(sKey, CLLMS.J.aIds);
					if(iIdx==-1) continue;
					switch(CLLMS.J.aIds[iIdx])
					{
						case "r":
						{
							CLJ[sId].nRawScore = +oArgs.J[sId][CLLMS.J.aIds[iIdx]];
							break;
						}
						case "c":
						{
							CLJ[sId].sCS = oArgs.J[sId][CLLMS.J.aIds[iIdx]];
							break;
						}
						case "s":
						{
							CLJ[sId].sSS = oArgs.J[sId][CLLMS.J.aIds[iIdx]];
							break;
						}
						case "O":
						{
							;
							if(CLJ[sId].oSrc==null) CLJ[sId].oSrc = {};
							for(var sSrcId in oArgs.J[sId][CLLMS.J.aIds[iIdx]])
							{
								CLJ[sId].oSrc[sSrcId] = { nRawScore: +oArgs.J[sId][CLLMS.J.aIds[iIdx]][sSrcId] };
							}
							break;
						}
					}
				}
			}
			return true;
		}
	},
	Load: function (oArgs)
	{
		var bLoaded = false;
		if(CLLMS.bLMSShotDown!=true)
		{
			try
			{
				if(CLLMS.bSCORM)
				{
					bLoaded = CLLMS.SCORM.Load();
				}
				else if(CLLMS.bAICC)
				{
					bLoaded = CLLMS.AICC.Load();
				}
			}
			catch (e)
			{
			}
		}
		return bLoaded;
	},
	PrepareSuspendData: function (oArgs)
	{
		var sText = '{"V":' + JSON.stringify(CLV.oGlobal) + ',';
		sText += '"Z":' + JSON.stringify(CLLMS.Z.Minimize()) + ',';
		sText += '"J":' + JSON.stringify(CLLMS.J.Minimize()) + '}';
		return CLTOOLS.Base64.Encode({ sString: sText });
	},
	RestoreSuspendData: function (oArgs)
	{ 
		var sText = CLTOOLS.Base64.Decode({ sString: oArgs.sData });
		if(sText=="") return false;
		var oData = JSON.parse(sText);
		if(typeof oData != "object") return false;
		CLV.oGlobal = $.extend(true, {}, oData.V);
		CLLMS.Z.Restore({ Z: oData.Z });
		CLLMS.J.Restore({ J: oData.J });
		return true;
	},
	Save: function (oArgs)
	{
		if(CLLMS.bLMSShotDown!=true)
		{
			try
			{
				if(CLLMS.bSCORM)
				{
					CLLMS.SCORM.Save();
				}
				else if(CLLMS.bAICC)
				{
					CLLMS.AICC.Save();
				}
			}
			catch (e)
			{
			}
		}
	},
	SCORM:
	{
		Commit: function (oArgs)
		{
			var sResult;
			if(CLLMS.API!=null)
			{
				sResult = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].Commit ]("");
				var sError = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetLastError ]();
				var iError = parseInt(sError, 10);
				if(iError!=0)
				{
					if(CLLMS.bDebug)
					{
						alert("SCORM " + CLLMS.sStandard + " " + CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].Commit + "\n" + CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetErrorString ](iError));
					}
				}
			}
			return (sResult=="true");
		},
		GetInteractionCorrectResponseIndex: function (oArgs)
		{
			var iIndex = -1;
			var iCorrectResponsesCount = CLLMS.SCORM.GetValue({ sName: "cmi.interactions." + oArgs.iIdx + ".correct_responses._count" });
			iCorrectResponsesCount = parseInt(iCorrectResponsesCount, 10);
			for (var i = 0; i < iCorrectResponsesCount; i++)
			{
				var sExistingCorrectResponsePattern = CLLMS.SCORM.GetValue({ sName: "cmi.interactions." + oArgs.iIdx + ".correct_responses." + i.toString() + ".pattern" });
				if(sExistingCorrectResponsePattern == oArgs.sPattern)
				{
					iIndex = i;
					break;
				}
			}
			return (iIndex==-1 ? { iCount: iCorrectResponsesCount } : iIndex);
		},
		GetInteractionIndex: function (oArgs)
		{
			var iIndex = -1;
			var iInteractionsCount = CLLMS.SCORM.GetValue({ sName: "cmi.interactions._count" });
			iInteractionsCount = parseInt(iInteractionsCount, 10);
			for(var i=0; i<iInteractionsCount; i++)
			{
				var sExistingInteractionId = CLLMS.SCORM.GetValue({ sName: "cmi.interactions."+ i +".id" });
				if(sExistingInteractionId == oArgs.sId)
				{
					iIndex = i;
					break;
				}
			}
			return (iIndex==-1 ? { iCount: iInteractionsCount } : iIndex);
		},
		GetInteractionObjectiveIndex: function (oArgs)
		{
			var iIndex = -1;
			var iObjectivesCount = CLLMS.SCORM.GetValue({ sName: "cmi.interactions." + oArgs.iIdx + ".objectives._count" });
			iObjectivesCount = parseInt(iObjectivesCount, 10);
			for(var i = 0; i < iObjectivesCount; i++)
			{
				var sExistingObjectiveId = CLLMS.SCORM.GetValue({ sName: "cmi.interactions." + oArgs.iIdx + ".objectives." + i + ".id" });
				if(sExistingObjectiveId == oArgs.sId)
				{
					iIndex = i;
					break;
				}
			}
			return (iIndex==-1 ? { iCount: iObjectivesCount } : iIndex);
		},
		GetValue: function (oArgs)
		{
			var sValue = ""; 
			if(CLLMS.API!=null)
			{
				sValue = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetValue ]( oArgs.sName );
				var sError = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetLastError ]();
				var iError = parseInt(sError, 10);
				if(iError!=0)
				{
					if(CLLMS.bDebug)
					{
						alert("SCORM " + CLLMS.sStandard + " " + CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetValue + " " + oArgs.sName + "\n" + CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetErrorString ](iError));
					}
				}
			}
			return sValue;
		},
		GetObjectiveIndex: function (oArgs)
		{
			var iIndex = -1;
			var sObjectivesCount = CLLMS.SCORM.GetValue({ sName: "cmi.objectives._count" });
			var iObjectivesCount = parseInt(sObjectivesCount);
			for(var i=0; i<iObjectivesCount; i++)
			{
				var sExistingObjectiveId = CLLMS.SCORM.GetValue({ sName: "cmi.objectives."+ i +".id" });
				if(sExistingObjectiveId==oArgs.sId)
				{
					iIndex = i;
					break;
				}
			}
			return (iIndex==-1 ? { iCount: iObjectivesCount } : iIndex);
		},
		Initialize: function (oArgs)
		{
			var sResult;
			try
			{
				if(CLLMS.API!=null)
				{
					CLLMS.SCORM.InitSessionTime();
					var sResult = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].Initialize ]("");
					var sError = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetLastError ]();
					var iError = parseInt(sError, 10);
					if(iError!=0)
					{
						if(CLLMS.bDebug)
						{
							alert("SCORM " + CLLMS.sStandard + " " + CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetValue + " " + oArgs.sName + "\n" + CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetErrorString ](iError));
						}
						if(CLLMS.bBreak)
						{
							$(CL.oBoard).hide();
							$(".cl-error-frame, .cl-error-scorm-aborted").show();
							$(".cl-error-scorm-number").html( sError );
							$(".cl-error-scorm-reason").html( CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetErrorString ](sError) );
							return false;
						}
					}
				}
			}
			catch(e)
			{
				if(CLLMS.bDebug)
				{
					alert(CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].Initialize + ": " + e);
				}
				return false;
			}
			return (sResult=="true");
		},
		InitSessionTime: function (oArgs)
		{
			CLLMS.iSessionStart = (new Date()).valueOf();
		},
		Load: function (oArgs)
		{
			var bLoaded = false;
			try
			{
				if(CLLMS.oConfig.bStrictEntry)
				{
					CLZ.sEntry = CLLMS.SCORM.GetValue({ sName: ((CLLMS.sStandard=="2004") ? "cmi.entry" : "cmi.core.entry") });
				}
				else
				{
					CLZ.sEntry = "";
				}
				if(CLZ.sEntry=="resume" || CLZ.sEntry=="")
				{
					CL.sSlideId = CLLMS.SCORM.GetValue({ sName: ((CLLMS.sStandard=="2004") ? "cmi.location" : "cmi.core.lesson_location") });
					var sSuspendData = CLLMS.SCORM.GetValue({ sName: "cmi.suspend_data" });
					var bRestored = CLLMS.RestoreSuspendData({ sData: sSuspendData });
					CLZ.bLoaded = (CLZ.sLocation!="" && bRestored);
				}
			}
			catch (e)
			{
				if(CLLMS.bDebug)
				{
					alert("SCORM " + CLLMS.sStandard + " Load: " + e);
				}
			}
			return CLZ.bLoaded;
		},
		Save: function (oArgs)
		{
			try
			{
				CLLMS.SCORM.SaveSessionTime();
				if(CLLMS.sStandard=="2004")
				{
					CLLMS.SCORM.SetValue({ sName: "cmi.location", sValue: CLZ.sCurrentSlideId });
					CLLMS.SCORM.SetValue({ sName: "cmi.exit", sValue: (CLLMS.oConfig.bExitSuspend ? "suspend" : "") });
				}
				else if(CLLMS.sStandard=="1.2")
				{
					CLLMS.SCORM.SetValue({ sName: "cmi.core.lesson_location", sValue: CLZ.sCurrentSlideId });
					CLLMS.SCORM.SetValue({ sName: "cmi.core.exit", sValue: (CLLMS.oConfig.bExitSuspend ? "suspend" : "") });
				}
				CLLMS.SCORM.SetValue({ sName: "cmi.suspend_data", sValue: CLLMS.PrepareSuspendData() });
				CLLMS.SCORM.SaveObjectives();
				CLLMS.SCORM.SaveInteractions();
				CLLMS.SCORM.Commit();
			}
			catch (e)
			{
				if(CLLMS.bDebug)
				{
					alert("SCORM " + CLLMS.sStandard + " Save: " + e);
				}
			}
		},
		SaveInteractions: function (oArgs)
		{
			function SaveSingleInteraction(oA)
			{
				var oStore = oA.oStore;
				var sId = oA.sIntId;
				
				var sType = oStore.y;
				if(sType==null || sType=="") return false;
				if(sType.length > 1) return false;

				var iTimestamp = 0;

				var iIndex = CLLMS.SCORM.GetInteractionIndex({ sId: sId });
				var sInteraction;
				if(isNaN(iIndex))
				{
					sInteraction = "cmi.interactions." + iIndex.iCount;
					CLLMS.SCORM.SetValue({ sName: sInteraction + ".id", sValue: sId });
					iIndex = iIndex.iCount;
				}
				else
				{
					sInteraction = "cmi.interactions." + iIndex;
				}		

				CLLMS.SCORM.SetValue({ sName: sInteraction + ".type", sValue: CLD.AbbrToScorm[sType] });
				
				if(oStore.s!=null)
				{
					iTimestamp = +oStore.s;
				}
				if(oSupported["timestamp"] || oSupported["datetime"])
				{
					if(oA.iBase!=null)
					{
						iTimestamp += oA.iBase;
					}
					if(oStore.s!=null)
					{
						var sTimestamp = CLTOOLS.Convert.DateToISO8601(new Date(iTimestamp));
						if(oSupported["timestamp"])
						{
							CLLMS.SCORM.SetValue({ sName: sInteraction + ".timestamp", sValue: sTimestamp });
						}
						else
						{
							CLLMS.SCORM.SetValue({ sName: sInteraction + ".datetime", sValue: sTimestamp });
						}
					}
				}
				
				if(oSupported["latency"])
				{
					if(oStore.d!=null)
					{
						var iLatency = +oStore.d;
						var sLatency = CLTOOLS.Convert.IntegerToISO8601Period(iLatency);
						CLLMS.SCORM.SetValue({ sName: sInteraction + ".latency", sValue: sLatency });
					}
				}

				if(oSupported["result"])
				{
					if(oStore.r!=null)
					{
						var sResult = (oStore.r=="i") ? "incorrect": (oStore.r=="c" ? "correct" : "neutral");
						CLLMS.SCORM.SetValue({ sName: sInteraction + ".result", sValue: sResult });
					}
				}

				if(oSupported["correct_responses"])
				{
					if(oStore.P!=null)
					{
						if(oStore.P.length!=0)
						{
							var aCorrect = [];
							switch(sType)
							{
								case "b":
								{
									aCorrect.push((+oStore.P[0]==1) ? "true" : "false");
									break;
								}
								case "c":
								case "l":
								case "o":
								{
									aCorrect.push(oStore.P.join("[,]"));
									break;
								}
								case "m":
								{
									var sCorrect = "";
									for(var j=0; j<oStore.P.length; j++)
									{
										if(j!=0) sCorrect += "[,]";
										sCorrect += oStore.P[j] + "[.]" + oStore.P[j];
									}
									aCorrect.push(sCorrect);
									break;
								}
								case "g":
								{
									break;
								}
								case "x":
								{
									break;
								}
								default:
								{
									break;
								}
							}
							if(aCorrect.length>0)
							{
								for (var j=0; j<aCorrect.length; j++)
								{
									var iCorrectResponseIndex = CLLMS.SCORM.GetInteractionCorrectResponseIndex({ iIdx: iIndex, sPattern: aCorrect[j] });
									if(isNaN(iCorrectResponseIndex))
									{
										CLLMS.SCORM.SetValue({ sName: sInteraction + ".correct_responses." + iCorrectResponseIndex.iCount + ".pattern", sValue: aCorrect[j] });
									}
									else
									{
										CLLMS.SCORM.SetValue({ sName: sInteraction + ".correct_responses." + iCorrectResponseIndex + ".pattern", sValue: aCorrect[j] });
									}
								}
							}
						}
					}
				}
				
				if(oSupported["learner_response"])
				{
					if(oStore.R!=null)
					{
						if(oStore.R.length!=0)
						{
							var aResponse = [];
							switch(sType)
							{
								case "b":
								{
									aResponse.push((+oStore.R[0]==1) ? "true" : "false");
									break;
								}
								case "c":
								case "l":
								case "o":
								{
									aResponse.push(oStore.R.join("[,]"));
									break;
								}
								case "m":
								{
									var sResponse = "";
									if(oStore.P!=null)
									{
										for(var j=0; j<oStore.P.length; j++)
										{
											if(sResponse!="") sResponse += "[,]";
											sResponse += oStore.P[j] + "[.]" + oStore.R[j];
										}
									}
									aResponse.push(sResponse);
									break;
								}
								case "g":
								{
									break;
								}
								case "x":
								{
									break;
								}
								case "n":
								{
									aResponse.push(CLTOOLS.FormatReal_10_7(+oStore.R[0]));
									break;
								}
								default:
								{
									aResponse.push(oStore.R[0]);
									break;
								}
							}
							CLLMS.SCORM.SetValue({ sName: sInteraction + ".learner_response", sValue: aResponse[0] });
						}
					}
				}
				
				if(oSupported["objectives"])
				{
					if(oStore.J!=null)
					{
						var nScore = 0;
						var nTmpScore = -1;
						for(var j=0; j<oStore.J.length; j++)
						{
							var iObjectiveIndex = CLLMS.SCORM.GetInteractionObjectiveIndex({ iIdx: iIndex, sId: oStore.J[j] });
							if(isNaN(iObjectiveIndex))
							{
								CLLMS.SCORM.SetValue({ sName: sInteraction + ".objectives." + iObjectiveIndex.iCount + ".id", sValue: oStore.J[j] });
							}
							else
							{
								CLLMS.SCORM.SetValue({ sName: sInteraction + ".objectives." + iObjectiveIndex + ".id", sValue: oStore.J[j] });
							}
							nTmpScore = CL.SCO.GetObjectiveScore({ sId: oStore.J[j], sSrcId: sId });
							if(nTmpScore > nScore) nScore = nTmpScore;
						}
						if(oSupported["weighting"])
						{
							CLLMS.SCORM.SetValue({ sName: sInteraction + ".weighting", sValue: CLTOOLS.FormatReal_10_7(nScore) });
						}
					}
				}
				return true;
			}
			
			if(CLLMS.API!=null)
			{
				switch (CLLMS.sStandard)
				{
					case "2004":
					{
						var sIntChildren = CLLMS.SCORM.GetValue({ sName: "cmi.interactions._children" });
						var oSupported =
						{
							"type": (sIntChildren.indexOf("type")!=-1),
							"weighting": (sIntChildren.indexOf("weighting")!=-1),
							"timestamp": (sIntChildren.indexOf("timestamp")!=-1),
							"datetime": (sIntChildren.indexOf("datetime")!=-1),
							"latency": (sIntChildren.indexOf("latency")!=-1),
							"learner_response": (sIntChildren.indexOf("learner_response")!=-1),
							"result": (sIntChildren.indexOf("result")!=-1),
							"objectives": (sIntChildren.indexOf("objectives")!=-1),
							"correct_responses": (sIntChildren.indexOf("correct_responses")!=-1)
						};
						for(var sKey in CLZ.oStore)
						{
							SaveSingleInteraction({ sIntId: sKey, oStore: CLZ.oStore[sKey] });
							if(CLZ.oStore[sKey].Q!=null)
							{
								for(var i=0; i<CLZ.oStore[sKey].Q.length; i++)
								{
									SaveSingleInteraction({ sIntId: sKey + "_" + CLZ.oStore[sKey].Q[i].i, oStore: CLZ.oStore[sKey].Q[i], iBase: +CLZ.oStore[sKey].s });
								}
							}
						}
						return true;
					}
				}
			}
			return false;
		},
		SaveObjectives: function (oArgs)
		{
			if(CLLMS.API!=null)
			{
				switch(CLLMS.sStandard)
				{
					case "2004":
					{
						var iIndex;
						for(var sKey in CLJ)
						{
							if(+CLJ[sKey].bModule==1)
							{
								CLLMS.SCORM.SetValue({ sName: "cmi.score.min", sValue: +CLJ[sKey].nMin });
								CLLMS.SCORM.SetValue({ sName: "cmi.score.max", sValue: +CLJ[sKey].nMax });
								CLLMS.SCORM.SetValue({ sName: "cmi.score.raw", sValue: +CLJ[sKey].nRawScore });
								var nScaled = 0;
								if(+CLJ[sKey].nMax!=0)
								{
									nScaled = +CLJ[sKey].nRawScore/+CLJ[sKey].nMax;
									CLLMS.SCORM.SetValue({ sName: "cmi.score.scaled", sValue: nScaled });
								}
								CLLMS.SCORM.SetValue({ sName: "cmi.success_status", sValue: CLLMS.UnAbbreviate({ sParam: "status", sValue: CLJ[sKey].sSS }) });
								CLLMS.SCORM.SetValue({ sName: "cmi.completion_status", sValue: CLLMS.UnAbbreviate({ sParam: "status", sValue: CLJ[sKey].sCS }) });
							}
							iIndex = CLLMS.SCORM.GetObjectiveIndex({ sId: sKey });
							var sObj = "cmi.objectives.";
							if(isNaN(iIndex) && iIndex.iCount!=null)
							{
								sObj += iIndex.iCount;
								CLLMS.SCORM.SetValue({ sName: sObj + ".id", sValue: sKey });
							}
							else
							{
								sObj += iIndex;
							}
							CLLMS.SCORM.SetValue({ sName: sObj + ".description", sValue: CLJ[sKey].sName });
							CLLMS.SCORM.SetValue({ sName: sObj + ".score.min", sValue: CLJ[sKey].nMin });
							CLLMS.SCORM.SetValue({ sName: sObj + ".score.max", sValue: CLJ[sKey].nMax });
							CLLMS.SCORM.SetValue({ sName: sObj + ".score.raw", sValue: CLJ[sKey].nRawScore });
							var nScaled = 0;
							if(CLJ[sKey].nMax!=0)
							{
								nScaled = CLJ[sKey].nRawScore/CLJ[sKey].nMax;
								CLLMS.SCORM.SetValue({ sName: sObj + ".score.scaled", sValue: nScaled });
							}
							CLLMS.SCORM.SetValue({ sName: sObj + ".success_status", sValue: CLLMS.UnAbbreviate({ sParam: "status", sValue: CLJ[sKey].sSS }) });
							CLLMS.SCORM.SetValue({ sName: sObj + ".completion_status", sValue: CLLMS.UnAbbreviate({ sParam: "status", sValue: CLJ[sKey].sCS }) });
						}
						break;
					}
					case "1.2":
					{
						var iIndex;
						for(var sKey in CLJ)
						{
							if(+CLJ[sKey].bModule==1)
							{
								CLLMS.SCORM.SetValue({ sName: "cmi.core.score.min", sValue: CLJ[sKey].nMin });
								CLLMS.SCORM.SetValue({ sName: "cmi.core.score.max", sValue: CLJ[sKey].nMax });
								if(CLJ[sKey].nMax!=0 && CLZ.bNormalize)
								{
									CLLMS.SCORM.SetValue({ sName: "cmi.core.score.raw", sValue: CLJ[sKey].nRawScore/CLJ[sKey].nMax*100 });
								}
								else
								{
									CLLMS.SCORM.SetValue({ sName: "cmi.core.score.raw", sValue: CLJ[sKey].nRawScore });
								}
								var sStatus;
								if(CLJ[sKey].sSS!="u" && CLJ[sKey].sSS!="")
								{
									sStatus = CLJ[sKey].sSS;
								}
								else
								{
									sStatus = CLJ[sKey].sCS;
								}
								if(sStatus.charAt(0)!="n")
								{
									CLLMS.SCORM.SetValue({ sName: "cmi.core.lesson_status", sValue: CLLMS.UnAbbreviate({ sParam: "status", sValue: sStatus }) });
								}
								break;
							}
						}
						break;
					}
				}
			}
		},
		SaveSessionTime: function (oArgs)
		{
			if(CLLMS.API!=null)
			{
				var iCurrent = new Date().valueOf();
				var iPeriod = iCurrent - CLLMS.iSessionStart;
				var iH = Math.floor(iPeriod / 3600000);
				iPeriod = (iPeriod - iH*3600000);
				var iM = Math.floor(iPeriod / 60000);
				iPeriod = (iPeriod - iM*60000);
				var iS = Math.floor(iPeriod / 1000);
				var iMS = iPeriod - iS*1000;
				var iDecS = Math.floor(iMS/10);
				var sString = "";
				switch (CLLMS.sStandard)
				{
					case "2004":
					{
						sString += "PT" + iH + "H" + iM + "M" + iS + ".";
						sString += ((iDecS==0) ? "00" : ((iDecS<10) ? "0" + iDecS : iDecS)) + "S";
						try
						{
							CLLMS.SCORM.SetValue({ sName: "cmi.session_time", sValue: sString });
							CLLMS.SCORM.InitSessionTime();
						}
						catch(e)
						{}
						break;
					}
					case "1.2":
					{
						sString += ((iH < 10) ? ("0" + iH) : iH) + ":";
						sString += ((iM < 10) ? ("0" + iM) : iM) + ":";
						sString += ((iS < 10) ? ("0" + iS) : iS) + ".";
						sString += ((iDecS==0) ? "00" : ((iDecS<10) ? "0" + iDecS : iDecS));
						try
						{
							CLLMS.SCORM.SetValue({ sName: "cmi.core.session_time", sValue: sString });
							CLLMS.SCORM.InitSessionTime();
						}
						catch(e)
						{}
						break;
					}
				}
			}
			return true;
		},
		SetValue: function (oArgs)
		{
			var sResult = "";
			if(CLLMS.API!=null)
			{
				sResult = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].SetValue ]( oArgs.sName, oArgs.sValue );
				var sError = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetLastError ]();
				var iError = parseInt(sError, 10);
				if(iError!=0)
				{
					if(CLLMS.bDebug)
					{
						alert("SCORM " + CLLMS.sStandard + " " + CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].SetValue + " " + oArgs.sName + "=" + oArgs.sValue + "\n" + CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].GetErrorString ](iError));
					}
				}
			}
			return (sResult=="true");
		},
		Shutdown: function (oArgs)
		{
			CLLMS.SCORM.Terminate();
			return true;
		},
		Terminate: function (oArgs)
		{
			var sResult;
			try
			{
				if(CLLMS.API!=null)
				{
					sResult = CLLMS.API[ CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].Terminate ]("");
					if(sResult!="true")
					{
						if(CLLMS.bDebug)
						{
							alert("SCORM " + CLLMS.sStandard + " " + CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].Terminate + " failed");
						}
					}
				}
			}
			catch(e)
			{
				if(CLLMS.bDebug)
				{
					alert("SCORM " + CLLMS.sStandard + " " + CLLMS.oConfig.oAPICommands[ CLLMS.sStandard ].Terminate + "\n" + e);
				}
				return false;
			}
			return (sResult=="true");
		}
	},
	Shutdown: function (oArgs)
	{
		if(CLLMS.bLMSShotDown!=true)
		{
			if(CLLMS.bSCORM)
			{
				CLLMS.SCORM.Shutdown();
			}
			else if(CLLMS.bAICC)
			{
				CLLMS.AICC.Shutdown();
			}
			CLLMS.bLMSShotDown = true;
		}
	},
	UnAbbreviate: function (oArgs)
	{
		var s = ""
		if(oArgs.sValue=="") return "";
		var sValue = oArgs.sValue.charAt(0);
		switch(oArgs.sParam)
		{
			case "status":
			{
				switch(sValue)
				{
					case "p":
					{
						s = "passed";
						break;
					}
					case "f":
					{
						s = "failed";
						break;
					}
					case "u":
					{
						s = "unknown";
						break;
					}
					case "n":
					{
						s = "not attempted";
						break;
					}
					case "i":
					{
						s = "incomplete";
						break;
					}
					case "c":
					{
						s = "completed";
						break;
					}
				}
				break;
			}
		}
		return s;
	},
	Z:
	{
		aKeys: [ "aVisited","bSoundOn","nZoom","oStore" ],
		aIds: [ "V","B","Z","S" ],
		Minimize: function (oArgs)
		{
			var Z = {};
			var iIdx = -1;
			for(var sKey in CLZ)
			{
				iIdx = $.inArray(sKey, CLLMS.Z.aKeys);
				if(iIdx==-1) continue;
				switch(CLLMS.Z.aIds[iIdx])
				{
					case "B":
					{
						Z.B = (CLZ[sKey]==true ? 1 : 0);
						break;
					}
					case "Z":
					{
						Z.Z = CLZ[sKey];
						break;
					}
					case "V":
					{
						Z.V = [];
						for(var i=0; i<CLZ[sKey].length; i++)
						{
							Z.V.push(CL.jxModule.find("slide[id='" + CLZ[sKey][i] + "']").attr("sid"));
						}
						break;
					}
					case "S":
					{
						Z.S = $.extend(true, {}, CLZ[sKey]);
						break;
					}
				}
			}
			return Z;
		},
		Restore: function (oArgs)
		{
			function DeghostArray(aArray)
			{
				var aNewArray = [];
				var sType = ""
				for(var i=0; i<aArray.length; i++)
				{
					sType = typeof aArray[i];
					if(sType=="string" || sType=="number")
					{
						aNewArray.push(aArray[i]);
					}
					else if(sType=="object")
					{
						if($.isArray(aArray[i]))
						{
							aNewArray.push(DeghostArray(aArray[i]));
						}
						else
						{
							aNewArray.push(DeghostObject(aArray[i]));
						}
					}
				}
				return aNewArray;
			};
			function DeghostObject(oObject)
			{
				var oNewObject = {};
				var sType = "";
				for(var sProp in oObject)
				{
					sType = typeof oObject[sProp];
					if(sType=="string" || sType=="number")
					{
						oNewObject[sProp] = oObject[sProp];
					}
					else if(sType=="object")
					{
						if($.isArray(oObject[sProp]))
						{
							oNewObject[sProp] = DeghostArray(oObject[sProp]);
						}
						else
						{
							oNewObject[sProp] = DeghostObject(oObject[sProp]);
						}
					}
				}
				return oNewObject;
			}
			if(oArgs.Z==null) return false;
			var iIdx = -1;
			var sValue;
			for(var sKey in oArgs.Z)
			{
				iIdx = $.inArray(sKey, CLLMS.Z.aIds);
				if(iIdx==-1) continue;
				switch(CLLMS.Z.aIds[iIdx])
				{
					case "B":
					{
						CLZ[CLLMS.Z.aKeys[iIdx]] = (+oArgs.Z[sKey]==1);
						break;
					}
					case "Z":
					{
						CLZ[CLLMS.Z.aKeys[iIdx]] = +oArgs.Z[sKey];
						break;
					}
					case "V":
					{
						for(var i=0; i<oArgs.Z[sKey].length; i++)
						{
							sValue = oArgs.Z[sKey][i];
							if(sValue!="undefined")
							{
								CLZ[CLLMS.Z.aKeys[iIdx]].push(CL.jxModule.find("slide[sid='" + sValue + "']").attr("id"));
							}
						}
						break;
					}
					case "S":
					{
						CLZ[CLLMS.Z.aKeys[iIdx]] = DeghostObject( oArgs.Z[sKey] );
						break;
					}
				}
			}
			return true;
		}
	}
	
};