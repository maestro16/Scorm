// v.3.1 170305
{	// Global objects
	var CLD =
	{
		aMouseEvents: [ "onmouseover", "onmouseout", "onclick", "ondblclick", "onmousedown", "onmouseup" ],
		oCanPlay:
		{
			"3gp": false,
			"mkv": false,
			"mp3": false,
			"mp4": false,
			"oga": false,
			"ogg": false,
			"ogv": false,
			"wav": false,
			"webm": false
		},
		oSoundFiles:
		{
			"click1": "../courseimages/click1.mp3",
			"click2": "../courseimages/click2.mp3",
			"click3": "../courseimages/click3.mp3",
			"click4": "../courseimages/click4.mp3",
			"over1": "../courseimages/over1.mp3",
			"over2": "../courseimages/over2.mp3",
			"over3": "../courseimages/over3.mp3",
			"over4": "../courseimages/over4.mp3",
			"success1": "../courseimages/success1.mp3",
			"success2": "../courseimages/success2.mp3",
			"success3": "../courseimages/success3.mp3",
			"success4": "../courseimages/success4.mp3",
			"failure1": "../courseimages/failure1.mp3",
			"failure2": "../courseimages/failure2.mp3",
			"failure3": "../courseimages/failure3.mp3",
			"failure4": "../courseimages/failure4.mp3",
			"click1ogg": "../courseimages/click1.ogg",
			"click2ogg": "../courseimages/click2.ogg",
			"click3ogg": "../courseimages/click3.ogg",
			"click4ogg": "../courseimages/click4.ogg",
			"over1ogg": "../courseimages/over1.ogg",
			"over2ogg": "../courseimages/over2.ogg",
			"over3ogg": "../courseimages/over3.ogg",
			"over4ogg": "../courseimages/over4.ogg",
			"success1ogg": "../courseimages/success1.ogg",
			"success2ogg": "../courseimages/success2.ogg",
			"success3ogg": "../courseimages/success3.ogg",
			"success4ogg": "../courseimages/success4.ogg",
			"failure1ogg": "../courseimages/failure1.ogg",
			"failure2ogg": "../courseimages/failure2.ogg",
			"failure3ogg": "../courseimages/failure3.ogg",
			"failure4ogg": "../courseimages/failure4.ogg"
		},
		CLFlashTypes:
		{
			"agent_001": "agent",
			"agent_002": "agent",
			"agent_004": "agent",
			"agent_005": "agent",
			"agent_006": "agent",
			"agent_007": "agent",
			"agent_008": "agent",
			"agent_010": "agent",
			"agent_2011": "agent",
			"media_003_video": "video"
		},
		ScormTypeToAbbr:
		{
			"true-false": "b",
			"choice": "c",
			"fill-in": "f",
			"long-fill-in": "t",
			"likert": "l",
			"matching": "m",
			"performance": "p",
			"sequencing": "s",
			"numeric": "n",
			"other": "o"
		},
		ScormTypeFromAbbr:
		{
			"b": "true-false",
			"c": "choice",
			"f": "fill-in",
			"t": "long-fill-in",
			"l": "likert",
			"m": "matching",
			"p": "performance",
			"s": "sequencing",
			"n": "numeric",
			"o": "other"
		},
		CLTypeToScorm:
		{
			"true-false": "true-false",
			"choice": "choice",
			"select": "choice",
			"order": "sequencing",
			"numeric": "numeric",
			"fib": "fill-in",
			"oto": "matching",
			"otm": "matching",
			"mtm": "matching",
			"other": "other"
		},
		CLTypeToAbbr:
		{
			"true-false": "b",
			"choice": "c",
			"select": "l",
			"order": "o",
			"numeric": "n",
			"fib": "f",
			"oto": "m",
			"otm": "g",
			"mtm": "x",
			"other": "o"
		},
		AbbrToScorm:
		{
			"b": "true-false",
			"c": "choice",
			"l": "choice",
			"o": "sequencing",
			"n": "numeric",
			"f": "fill-in",
			"m": "matching",
			"g": "matching",
			"x": "matching",
			"o": "other"
		}
	};
	var CLE = {}; // event handling
	var CLF = {}; // frames
	var CLI = {}; // interaction store
	var CLJ = {}; // objectives
	var CLM = {}; // masters
	var CLO = {}; // objects
	var CLP = {}; // pointers
	var CLS = {}; // slides
	var CLT = {}; // timelines
	var CLV =
	{
		oGlobal: {},
		oSlide: {}
	}; // variables
	var CLZ =
	{
		// storable
		aVisited: [],
		bSoundOn: true,
		nZoom: 1,
		oStore: {},
		// runtime only
		bLoaded: false,
		bNormalize: false,
		bPreloadImages: true,
		bStrictOrder: false,
		sCurrentFrameId: "",
		sCurrentSlideId: "",
		sEntry: "",
		sLocation: ""
	}; 
	var CLPath = [];
}

window.List = function (oArgs)
{	// List constructor
	this.pFirst = null;
	this.pLast = null;
	return this;
}
{ 	// List methods
	List.prototype.Append = function (oArgs)
	{
		if(this.pFirst==null) // list is empty
		{
			oArgs.pElement.pPrevious = null;
			oArgs.pElement.pNext = null;
			this.pFirst = oArgs.pElement;
			this.pLast = oArgs.pElement;
		}
		else // append after last elem
		{
			oArgs.pElement.pPrevious = this.pLast; 
			oArgs.pElement.pNext = null;
			this.pLast.pNext = oArgs.pElement;
			this.pLast = oArgs.pElement;
		}
		return this;
	};
	List.prototype.InsertBefore = function (oArgs)
	{
		if(oArgs.pElement==null) // nothing to do
		{
			return this;
		}
		if(oArgs.pBefore==null || this.pFirst==null) // list is empty or no ref
		{
			this.Append(oArgs);
			return this;
		}
		if(oArgs.pBefore.pPrevious==null) // ref is first item
		{
			this.pFirst = oArgs.pElement;
			oArgs.pElement.pPrevious = null;
		}
		else
		{
			oArgs.pElement.pPrevious = oArgs.pBefore.pPrevious;
			oArgs.pBefore.pPrevious.pNext = oArgs.pElement;
		}
		oArgs.pElement.pNext = oArgs.pBefore;
		oArgs.pBefore.pPrevious = oArgs.pElement;
		return this;
	};
	List.prototype.Remove = function (oArgs)
	{
		var bFound = false;
		for(var pTest=this.pFirst; pTest!=null; pTest=pTest.pNext)
		{
			if (pTest===oArgs.pElement)
			{
				bFound = true;
				if(oArgs.pElement.pPrevious==null) // first elem
				{
					this.pFirst = oArgs.pElement.pNext;
				}
				else
				{
					oArgs.pElement.pPrevious.pNext = oArgs.pElement.pNext;
				}
				if(oArgs.pElement.pNext==null) // last elem
				{
					this.pLast = oArgs.pElement.pPrevious;
				}
				else
				{
					oArgs.pElement.pNext.pPrevious = oArgs.pElement.pPrevious;
				}
				oArgs.pElement.pPrevious = null;
				oArgs.pElement.pNext = null;
				break;
			}
		}
		return this;
	};
	List.prototype.Destroy = function (oArgs)
	{
		this.pFirst = null;
		this.pLast = null;
		return this;
	};
	List.prototype.Add = List.prototype.Append;
	List.prototype.AddBefore = List.prototype.InsertBefore;
	List.prototype.Subtract = List.prototype.Remove;
}

window.Thread = function (oArgs)
{	// Thread constructor
	this.listActions = new List();
	this.oCurrentAction = null;
	this.sFrameId = null;
}
{	// Thread methods
	Thread.prototype.Load = function (oArgs)
	{
		for(var i=0; i<oArgs.jxActions.length; i++)
		{
			this.listActions.Append({ pElement: new Action({ xNode: oArgs.jxActions[i], sRespId: oArgs.sRespId }) });
		}
		this.oCurrentAction = this.listActions.pFirst;
		this.sRespId = oArgs.sRespId;
		return this;
	}
	Thread.prototype.Continue = function (oArgs)
	{
		for (;;)
		{
			var oAction = this.oCurrentAction;
			if(oAction==null)
			{
				break;
			}
			this.oCurrentAction = oAction.Continue();
			if(this.oCurrentAction==oAction)
			{
				break;
			}
		}
		return this.oCurrentAction;
	}
	Thread.prototype.InsertWaitAtThreadBegin = function (oArgs)
	{
		var oWait = new Action({ bDynamic: true, sAction: "WAIT", sCheck: "0", nStartTime: 0, nDur: oArgs.nDur });
		this.listActions.InsertBefore({ pElement: oWait, pBefore: oThread.listActions.pFirst });
		this.oCurrentAction = oWait;
		return this;
	}
}

window.Action = function (oArgs)
{	// Action constructor
	this.sId = CLTOOLS.GUID();
	if(oArgs.bDynamic==true)
	{
		if(oArgs.sAction==null)
		{
			return null;
		}
		this.sName = oArgs.sAction.toUpperCase();
	}
	else
	{
		this.sName = oArgs.xNode.nodeName.toUpperCase();
		this.jxNode = $(oArgs.xNode);
		$(oArgs.xNode).attr({ "cl-id": this.sId });
	}
	this.sRespId = oArgs.sRespId;
	this.bDebug = false;
	this.oParams = {};
	if(oArgs.pParent!=null)
	{
		this.pParent = oArgs.pParent;
	}
	this.nStartTime = 0;
	// DEBUGGER VARS
	this.bDebug = false;
	this.bProceed = false;
	this.bCancel = false;
	//
	switch(this.sName)
	{
		case "BEGIN_ASYNC": // legacy
		case "SEQ": // tested
		{
			this.listActions = new List();
			var jxChildren = this.jxNode.children();
			for(var i=0; i<jxChildren.length; i++)
			{
				this.listActions.Append({ pElement: new Action({ xNode: jxChildren[i], sRespId: oArgs.sRespId }) })
			}
			this.Continue = function (oArgs)
			{
				if(this.nStartTime == 0)
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					this.nStartTime = (new Date()).valueOf();
					this.oCurrentAction = this.listActions.pFirst;
					if(this.oCurrentAction!=null)
					{
						this.oCurrentAction.bDebug = this.bProceed;
					}
				}
				for(;;)
				{
					var oAction = this.oCurrentAction;
					if(oAction==null)
					{
						break;
					}
					this.oCurrentAction = oAction.Continue();
					if(this.oCurrentAction!=null)
					{
						this.bProceed = this.oCurrentAction.bDebug==true;
					}
					if(this.oCurrentAction==oAction)
					{
						break;
					}
				}
				if(this.oCurrentAction)
				{
					return this;
				}
				// Done
				this.nStartTime = 0;
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "BREAK":
		{
			this.oParams.sMode = this.jxNode.attr("mode");
			this.oParams.exprCondition = this.jxNode.attr("condition");
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(this.nStartTime==0)
				{
					if(this.oParams.sMode=="conditional")
					{
						if(!CL.Resp.EvalExpr({ sExpr: this.oParams.exprCondition, bBool: true }))
						{
							this.bDebug = false;
						}
					}
					this.nStartTime = (new Date()).valueOf();
				}
				if(this.oParams.sMode=="instant" || (this.oParams.sMode=="conditional" && CL.Resp.EvalExpr({ sExpr: this.oParams.exprCondition, bBool: true })))
				{
					this.pParent.bBreak = true;
					this.pParent.bProceed = this.bProceed;
					this.pNext = null;
					
					/*if(this.pParent!=null)
					{
						this.pNext = this.pParent.pNext;
					}*/
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "DEBUGGER":
		{
			this.oParams.sMode = this.jxNode.attr("mode");
			if(this.oParams.sMode=="conditional")
			{
				this.oParams.exprCondition = this.jxNode.attr("condition");
			}
			this.bDebug = true;
			this.Continue = function (oArgs)
			{
				if(this.nStartTime==0)
				{
					if(this.oParams.sMode=="conditional")
					{
						if(!CL.Resp.EvalExpr({ sExpr: this.oParams.exprCondition, bBool: true }))
						{
							this.bDebug = false;
						}
					}
					this.nStartTime = (new Date()).valueOf();
				}
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this, bCreate: true });
					return this;
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "CANCELTRANSFORM": // tested, dynamic
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.sType = oArgs.sType;
				this.oParams.bAll = oArgs.bAll;
				if(!this.oParams.bAll)
				{
					this.oParams.sTargetId = oArgs.sTargetId;
				}
			}
			else
			{
				this.oParams.sType = this.jxNode.attr("type");
				this.oParams.bAll = (this.jxNode.attr("all")=="1");
				if(!this.oParams.bAll)
				{
					this.oParams.sTargetId = this.jxNode.attr("pid");
				}
			}
			this.oParams.sTargetAction = (this.sName=="CANCELMOVE") ? "oActionMove" : ((this.sName=="CANCELROTATE") ? "oActionRotate" : "oActionSize");
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				var oActionTypes = { "move": "oActionMove", "size": "oActionSize", "rotate": "oActionRotate", "opacity": "oActionOpacity", "scale": "oActionScale", "skew": "oActionSkew" };
				if(this.oParams.sType=="any")
				{
					for(var sType in oActionTypes)
					{
						if(this.oParams.bAll)
						{
							for(var sObjectId in CLO)
							{
								if(CLO[sObjectId][oActionTypes[sType]]!=null)
								{
									CLO[sObjectId][oActionTypes[sType]].bCancelled = true;
								}
							}
						}
						else
						{
							if(CLO[this.oParams.sTargetId]!=null)
							{
								if(CLO[this.oParams.sTargetId][oActionTypes[sType]]!=null)
								{
									CLO[this.oParams.sTargetId][oActionTypes[sType]].bCancelled = true;
								}
							}
							else
							{
								var jxGroup = CL.jxGroups.find("group[id='" + this.oParams.sTargetId + "']");
								if(jxGroup.length!=0)
								{
									var aTargetIds = [];
									jxGroup.children("ref").each(function () { aTargetIds.push($(this).attr("id")) });
									for(var i=0; i<aTargetIds.length; i++)
									{
										if(CLO[aTargetIds[i]]!=null)
										{
											if(CLO[aTargetIds[i]][oActionTypes[sType]]!=null)
											{
												CLO[aTargetIds[i]][oActionTypes[sType]].bCancelled = true;
											}
										}
									}
								}
							}
						}
					}
				}
				else
				{
					if(this.oParams.bAll)
					{
						for(var sObjectId in CLO)
						{
							if(CLO[sObjectId][oActionTypes[this.oParams.sType]]!=null)
							{
								CLO[sObjectId][oActionTypes[this.oParams.sType]].bCancelled = true;
							}
						}
					}
					else
					{
						if(CLO[this.oParams.sTargetId]!=null)
						{
							if(CLO[this.oParams.sTargetId][oActionTypes[this.oParams.sType]]!=null)
							{
								CLO[this.oParams.sTargetId][oActionTypes[this.oParams.sType]].bCancelled = true;
							}
						}
						else
						{
							var jxGroup = CL.jxGroups.find("group[id='" + this.oParams.sTargetId + "']");
							if(jxGroup.length!=0)
							{
								var aTargetIds = [];
								jxGroup.children("ref").each(function () { aTargetIds.push($(this).attr("id")) });
								for(var i=0; i<aTargetIds.length; i++)
								{
									if(CLO[aTargetIds[i]]!=null)
									{
										if(CLO[aTargetIds[i]][oActionTypes[this.oParams.sType]]!=null)
										{
											CLO[aTargetIds[i]][oActionTypes[this.oParams.sType]].bCancelled = true;
										}
									}
								}
							}
						}
					}
				}
				return this.pNext;
			}
			break;
		}
		case "DISPLAY": 
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.sTargetId = oArgs.sTargetId;
				this.oParams.bDisplay = oArgs.bDisplay;
				var sTrans = oArgs.sTransition;
				var sDur = oArgs.sDuration;
			}
			else
			{
				this.oParams.sTargetId = this.jxNode.attr("pid");
				this.oParams.bDisplay = (this.jxNode.attr("display")=="inline");
				var sTrans = +this.jxNode.attr("transition");
				var sDur = this.jxNode.attr("dur");
			}
			this.oParams.bUseTransition = (sTrans!="-1");
			if(this.oParams.bUseTransition)
			{
				this.oParams.sTransition = sTrans;
				this.oParams.nDuration = +sDur;
			}
			this.Continue = function (oArgs)
			{
				if(this.nStartTime==0)
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					if(this.bProceed)
					{
						if(this.pNext!=null)
						{
							this.pNext.bDebug = this.bProceed;
						}
						else
						{
							CL.Debug.Update({ oAction: this, bFinal: true });
						}
					}
					this.nStartTime = (new Date()).valueOf();
					var aTargetIds = [];
					if(CLO[this.oParams.sTargetId]==null)
					{
						var jxGroup = CL.jxGroups.find("group[id='" + this.oParams.sTargetId + "']");
						if(jxGroup.length!=0)
						{
							jxGroup.children("ref").each(function () { aTargetIds.push($(this).attr("id")) });
						}
					}
					else
					{
						aTargetIds.push(this.oParams.sTargetId);
					}

					if(!this.oParams.bUseTransition)  // no transition - fast way
					{
						for(var i=0; i<aTargetIds.length; i++)
						{
							if(CLO[aTargetIds[i]]==null)
							{
								if(!this.oParams.bDisplay) // hide non-existent object
								{
									continue;
								}
								else // create object
								{
									CLO[aTargetIds[i]] = new CLObject({ xNode: CL.axSlides.find("object[id='" + aTargetIds[i] + "']"), oAppendTo: CL.oBoard });
								}
							}
							else
							{
								if(this.oParams.bDisplay)
								{
									CLO[aTargetIds[i]].Show({ bUseTransition: false, bActionCall: true });
								}
								else
								{
									CLO[aTargetIds[i]].Hide({ bUseTransition: false, bActionCall: true });
								}
							}
						}
						return this.pNext;
					}
					else // detecting longest duration
					{
						var nMaxDur = 0;
						var aTrans = [];
						var sTrans;
						var sDur;
						var nDur;
						if(this.oParams.sTransition=="0") // searching by object dur
						{
							for(var i=0; i<aTargetIds.length; i++)
							{
								if(CLO[aTargetIds[i]]==null)
								{
									var jxObject = CL.axSlides.find("object[id='" + aTargetIds[i] + "']");
									if(jxObject.length==0) continue;
									if(this.oParams.bDisplay) // show
									{
										sTrans = jxObject.attr("tranin");
										sDur = jxObject.attr("durin");
									}
									else // hide
									{
										sTrans = jxObject.attr("tranout");
										sDur = jxObject.attr("durout");
									}
									if(sTrans==null)
									{
										aTrans.push({ sId: aTargetIds[i], nTrans: -1 });
									}
									else
									{
										nDur = +sDur*1000;
										aTrans.push({ sId: aTargetIds[i], nTrans: +sTrans, nDur: nDur });
										if(nDur > nMaxDur) nMaxDur = nDur;
									}
								}
								else
								{
									if(this.oParams.bDisplay) // show
									{
										if(CLO[aTargetIds[i]].tranin==null)
										{
											aTrans.push({ sId: aTargetIds[i], nTrans: -1 });
										}
										else
										{
											nDur = CLO[aTargetIds[i]].tranin.duration*1000;
											aTrans.push({ sId: aTargetIds[i], nTrans: CLO[aTargetIds[i]].tranin.transition, nDur: nDur });
											if(nDur > nMaxDur)
											{
												nMaxDur = nDur;
											}
										}
									}
									else // hide
									{
										if(CLO[aTargetIds[i]].tranout==null)
										{
											aTrans.push({ sId: aTargetIds[i], nTrans: -1 });
										}
										else
										{
											nDur = CLO[aTargetIds[i]].tranout.duration*1000;
											aTrans.push({ sId: aTargetIds[i], nTrans: CLO[aTargetIds[i]].tranout.transition, nDur: nDur });
											if(nDur > nMaxDur)
											{
												nMaxDur = nDur;
											}
										}
									}
								}
							}
						}
						else // duration from param
						{
							nMaxDur = this.oParams.nDuration;
							for(var i=0; i<aTargetIds.length; i++)
							{
								aTrans.push({ sId: aTargetIds[i], nTrans: +this.oParams.sTransition-1, nDur: this.oParams.nDuration });
							}
						}
						for(var i=0; i<aTrans.length; i++)
						{
							if(this.oParams.bDisplay)
							{
								if(CLO[aTrans[i].sId]==null)
								{
									CLO[aTrans[i].sId] = new CLObject({ xNode: CL.axSlides.find("object[id='" + aTrans[i].sId + "']"), oAppendTo: CL.oBoard });
								}
								if(aTrans[i].nTrans==-1)
								{
									CLO[aTrans[i].sId].Show({ bActionCall: true, bUseTransition: false });
								}
								else
								{
									CLO[aTrans[i].sId].Show({ bActionCall: true, bUseTransition: true, iTransition: aTrans[i].nTrans, iDuration: aTrans[i].nDur });
								}
							}
							else
							{
								if(CLO[aTrans[i].sId]==null)
								{
									continue;
								}
								if(aTrans[i].nTrans==-1)
								{
									CLO[aTrans[i].sId].Hide({ bActionCall: true, bUseTransition: false });
								}
								else
								{
									CLO[aTrans[i].sId].Hide({ bActionCall: true, bUseTransition: true, iTransition: aTrans[i].nTrans, iDuration: aTrans[i].nDur });
								}
							}
						}
						this.nEndTime = this.nStartTime + nMaxDur;
					}
				}
				if((new Date()).valueOf() >= this.nEndTime)
				{
					//DisplayDone
					this.nStartTime = 0;
					return this.pNext;
				}	
				// Displaying
				return this;
			}
			break;
		}
		case "FOR": 
		{
			this.oParams.sName = this.jxNode.attr("name");
			this.oParams.exprFrom = this.jxNode.attr("from");
			this.oParams.exprTo = this.jxNode.attr("to");
			this.oParams.exprStep = this.jxNode.attr("step");
			this.oParams.bGlobal = (this.jxNode.attr("global")=="1");
			this.listActions = new List();
			var jxChildren = this.jxNode.children();
			var xElse = null;
			for(var i=0; i<jxChildren.length; i++)
			{
				this.listActions.Append({ pElement: new Action({ xNode: jxChildren[i], sRespId: oArgs.sRespId }) });
			}
			this.nStartTime = 0;
			this.Continue = function (oArgs)
			{
				if(this.nStartTime==0)
				{
					this.pBreak = this.pNext;
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					this.nStartTime = (new Date()).valueOf();
					this.nFrom = CL.Resp.EvalExpr({ sExpr: this.oParams.exprFrom, bNumeric: true });
					this.nTo = CL.Resp.EvalExpr({ sExpr: this.oParams.exprTo, bNumeric: true });
					this.nStep = CL.Resp.EvalExpr({ sExpr: this.oParams.exprStep, bNumeric: true });	
					this.nVar = this.nFrom;
					this.oCurrentAction = this.listActions.pFirst;
					if(this.oCurrentAction!=null)
					{
						this.oCurrentAction.bDebug = this.bProceed;
					}
				}
				if(this.oParams.bGlobal)
				{
					CLV.oGlobal[this.oParams.sName] = this.nVar;
				}
				else
				{
					CLV.oSlide[this.oParams.sName] = this.nVar;
				}
				if(this.nVar<=this.nTo)
				{
					for (;;)
					{
						var oAction = this.oCurrentAction;
						if(oAction==null)
						{
							break;
						}
						this.oCurrentAction = oAction.Continue();
						if(this.oCurrentAction!=null)
						{
							this.bProceed = this.oCurrentAction.bDebug = this.bProceed;
						}
						if(this.oCurrentAction==oAction)
						{
							break;
						}
					}
					if(this.oCurrentAction)
					{
						return this;
					}
					// Reset
					this.nVar += this.nStep;
					if(this.nVar<=this.nTo)
					{
						this.oCurrentAction = this.listActions.pFirst;
						return this;
					}
				}
				// Done
				this.nStartTime = 0;
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;				
			}
			break;
		}
		case "GOSUB":
		{
			CL.sReturnFrameId = CLZ.sCurrentFrameId; 
		}
		case "GOTO":
		{
			if(oArgs.bDynamic)
			{
				this.oParams.sTargetType = oArgs.sOption;
				if(this.oParams.sTargetType=="0")
				{
					this.oParams.sTargetId = oArgs.sTargetId;
				}
			}
			else
			{
				this.oParams.sTargetType = this.jxNode.attr("option");
				if(this.oParams.sTargetType=="0")
				{
					this.oParams.sTargetId = this.jxNode.attr("pid");
				}
			}
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				switch(this.oParams.sTargetType)
				{
					case "0":
					{
						if(this.oParams.sTargetId!=null)
						{
							if(this.oParams.sTargetId!=CLZ.sCurrentFrameId)
							{
								CL.Navigation.GoTo({ sTargetType: "frame", sTargetId: this.oParams.sTargetId });
							}
						}
						break;
					}
					case "1":
					{
						CL.Navigation.GoTo({ sTargetType: "frame", sTargetDir: "next" });
						break;
					}
					case "2":
					{
						CL.Navigation.GoTo({ sTargetType: "frame", sTargetDir: "prev" });
						break;
					}
					case "3":
					{
						CL.Navigation.GoTo({ sTargetType: "slide", sTargetDir: "next" });
						break;
					}
					case "4":
					{
						CL.Navigation.GoTo({ sTargetType: "slide", sTargetDir: "prev" });
						break;
					}
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;			
			}
			break;
		}
		case "IF":
		{
			this.oParams.sType = this.jxNode.attr("type");
			this.nStartTime = 0;
			switch(this.oParams.sType)
			{
				case "expression":
				{
					this.oParams.exprCondition = this.jxNode.attr("if");
					break;
				}
				case "confirm":
				{
					this.oParams.exprConfirm = this.jxNode.attr("confirm");
					break;
				}
				case "drop":
				{
					this.oParams.sTargetId = this.jxNode.attr("objectid");
					break;
				}
				case "score":
				{
					this.oParams.sObjectiveId = this.jxNode.attr("pid");
					this.oParams.sSourceId = this.jxNode.attr("oid");
					this.oParams.sCondition = this.jxNode.attr("condition");
					this.oParams.sScore = this.jxNode.attr("score");
					break;
				}
				case "completion":
				{
					this.oParams.sObjectiveId = this.jxNode.attr("pid");
					this.oParams.sStatus = this.jxNode.attr("cs");
					break;
				}
				case "success":
				{
					this.oParams.sObjectiveId = this.jxNode.attr("pid");
					this.oParams.sStatus = this.jxNode.attr("ss");
					break;
				}
			}
			this.listActions = new List();
			var jxChildren = this.jxNode.children();
			var xElse = null;
			for(var i=0; i<jxChildren.length; i++)
			{
				if(jxChildren[i].nodeName.toUpperCase()=="ELSE" && xElse==null) // first ELSE only
				{
					xElse = jxChildren[i];
				}
				else
				{
					this.listActions.Append({ pElement: new Action({ xNode: jxChildren[i], sRespId: oArgs.sRespId }) });
				}
			}
			if(xElse!=null)
			{
				this.listElseActions = new List();
				var jxElseChildren = $(xElse).children();
				for(var i=0; i<jxElseChildren.length; i++)
				{
					this.listElseActions.Append({ pElement: new Action({ xNode: jxElseChildren[i], sRespId: oArgs.sRespId }) });
				}
			}
			this.nStartTime = 0;
			this.Continue = function (oArgs)
			{
				if(this.nStartTime == 0)
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					this.nStartTime = (new Date()).valueOf();
					switch(this.oParams.sType)
					{
						case "expression":
						{
							if(CL.Resp.EvalExpr({ sExpr: this.oParams.exprCondition, bBool: true }))
							{
								this.oCurrentAction = this.listActions.pFirst;
							}
							else
							{
								if(this.listElseActions!=null)
								{
									this.oCurrentAction = this.listElseActions.pFirst;
								}
							}
							break;
						}
						case "confirm":
						{
							CL.Timeline.Pause({ bAllActive: true });
							if(confirm(CL.Resp.EvalExpr({ sExpr: this.oParams.exprConfirm })))
							{
								this.oCurrentAction = this.listActions.pFirst;
							}
							else
							{
								if(this.listElseActions!=null)
								{
									this.oCurrentAction = this.listElseActions.pFirst;
								}
							}
							CL.Timeline.Resume({ bAllActive: true });
							break;
						}
						case "drop":
						{
							var bConditionOk = (this.oParams.sTargetId == CL.sDragObjectId) ? true : false;
							if(this.oParams.sTargetId == CL.sDragObjectId)
							{
								this.oCurrentAction = this.listActions.pFirst;
							}
							else
							{
								if(this.listElseActions!=null)
								{
									this.oCurrentAction = this.listElseActions.pFirst;
								}
							}
							break;
						}
						case "score":
						{
							var sCurrentScore = CL.SCO.GetObjectiveScore({ sId: this.oParams.sObjectiveId, sSrcId: this.oParams.sSource });
							var nCurrentScore = (sCurrentScore == "" || sCurrentScore == null) ? 0 : parseFloat(sCurrentScore);
							if(isNaN(nCurrentScore))
							{
								nCurrentScore = 0;
							}
							var nScore = (this.oParams.sScore == "" || this.oParams.sScore == null) ? 0 : parseFloat(this.oParams.sScore);
							if(isNaN(nScore))
							{
								nScore = 0;
							}
							var bConditionOk = false;
							switch (this.oParams.sCondition)
							{
								case "lt":
								{
									bConditionOk = nCurrentScore < nScore ? true : false;
									break;
								}
								case "gt":
								{
									bConditionOk = nCurrentScore > nScore ? true : false;
									break;
								}
								case "eq":
								{
									bConditionOk = nCurrentScore == nScore ? true : false;
									break;
								}
								case "le":
								{
									bConditionOk = nCurrentScore <= nScore ? true : false;
									break;
								}
								case "ge":
								{
									bConditionOk = nCurrentScore >= nScore ? true : false;
									break;
								}
								case "ne":
								{
									bConditionOk = nCurrentScore != nScore ? true : false;
									break;
								}
							}
							if(bConditionOk)
							{
								this.oCurrentAction = this.listActions.pFirst;
							}
							else
							{
								if(this.listElseActions!=null)
								{
									this.oCurrentAction = this.listElseActions.pFirst;
								}
							}
							break;
						}
						case "completion":
						{
							var sCurrentStatus = CL.SCO.GetObjectiveCompletionStatus({ sId: this.oParams.sObjectiveId }); 
							if(sCurrentStatus==this.oParams.sStatus)
							{
								this.oCurrentAction = this.listActions.pFirst;
							}
							else
							{
								if(this.listElseActions!=null)
								{
									this.oCurrentAction = this.listElseActions.pFirst;
								}
							}
							break;
						}
						case "success":
						{
							var sCurrentStatus = CL.SCO.GetObjectiveSuccessStatus({ sId: this.oParams.sObjectiveId }); 
							if(sCurrentStatus==this.oParams.sStatus)
							{
								this.oCurrentAction = this.listActions.pFirst;
							}
							else
							{
								if(this.listElseActions!=null)
								{
									this.oCurrentAction = this.listElseActions.pFirst;
								}
							}
							break;
						}
					}
				}
				if(this.oCurrentAction!=null)
				{
					this.oCurrentAction.bDebug = this.bProceed;
				}
				for(;;)
				{
					var oAction = this.oCurrentAction;
					if(oAction==null)
					{
						break;
					}
					this.oCurrentAction = oAction.Continue();
					if(this.oCurrentAction!=null)
					{
						this.bProceed = this.oCurrentAction.bDebug;
					}
					if(this.oCurrentAction==oAction)
					{
						break;
					}
				}
				if(this.oCurrentAction)
				{
					return this;
				}
				// Done
				this.nStartTime = 0;
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;				
			}
			break;
		}
		case "JAVASCRIPT":
		{
			this.oParams.sCode = this.jxNode.attr("javascript");
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				try
				{
					eval(this.oParams.sCode);
				}
				catch(e)
				{
					if(this.bProceed)
					{
						alert(e);
					}
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "OPENURL":
		case "JUMP": // legacy
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.exprURL = oArgs.sURL;
				this.oParams.sProtocol = oArgs.sProtocol;
				this.oParams.bOpenCustom = oArgs.bCustom;
				if(this.oParams.bOpenCustom)
				{
					this.oParams.iWW = +oArgs.iWW;
					this.oParams.iWH = +oArgs.iWH;
					this.oParams.sPosition = oArgs.sPosition;
					this.oParams.sToolbar = oArgs.bToolbar ? "yes": "no";
					this.oParams.sLocation = oArgs.bLocation ? "yes": "no";
					this.oParams.sStatus = oArgs.bStatus ? "yes": "no";
					this.oParams.sMenubar = oArgs.bMenubar ? "yes": "no";
					this.oParams.sResize = oArgs.bResize ? "yes": "no";
					this.oParams.sScroll = oArgs.bScroll ? "yes": "no";
				}
			}
			else
			{ 
				this.oParams.exprURL = this.jxNode.attr("link");
				this.oParams.sProtocol = this.jxNode.attr("protocol");
				this.oParams.sSubject = this.jxNode.attr("subject");
				this.oParams.sBody = this.jxNode.attr("body");
				this.oParams.bOpenCustom = (this.jxNode.attr("open")=="custom");
				if(this.oParams.bOpenCustom)
				{
					this.oParams.iWW = +this.jxNode.attr("ww");
					this.oParams.iWH = +this.jxNode.attr("wh");
					this.oParams.sPosition = this.jxNode.attr("position");
					this.oParams.sToolbar = this.jxNode.attr("toolbar");
					this.oParams.sLocation = this.jxNode.attr("location");
					this.oParams.sStatus = this.jxNode.attr("status");
					this.oParams.sMenubar = this.jxNode.attr("menubar");
					this.oParams.sResize = this.jxNode.attr("resize");
					this.oParams.sScroll = this.jxNode.attr("scroll");
				}
			}
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(CL.oBrowser.sBrowser=="courselab")
				{
					alert(this.oParams.exprURL + "\n" + $(".cl-lang-strings > .cl-lang-external-url-disabled").text());
				}
				else if(this.oParams.sProtocol=="mailto")
				{
					document.location.href = "mailto:" + this.oParams.exprURL + "?subject=" + escape(this.oParams.sSubject) + "&body=" + escape(CL.Resp.EvalExpr({ sExpr: this.oParams.sBody, bString: true }));
				}
				else
				{
					var sURL = CL.Resp.EvalExpr({ sExpr: this.oParams.exprURL, bString: true });
					var sURLLC = sURL.toLowerCase();
					if(!(sURLLC.indexOf("http://")==0 || sURLLC.indexOf("https://")==0))
					{
						if(sURLLC.indexOf("://")==-1)
						{
							sURL = this.oParams.sProtocol + "://" + sURL;
						}
					}
					if(this.oParams.bOpenCustom)
					{
						var iLeft = 0;
						var iTop = 0;
						var iAvailW = window.screen.availWidth;
						var iAvailH = window.screen.availHeight;
						if(this.oParams.sPosition=="rt" || this.oParams.sPosition=="rb")
						{
							iLeft = iAvailW - iWW;
						}
						if(this.oParams.sPosition=="lb" || this.oParams.sPosition=="rb")
						{
							iTop = iAvailH - iWH;
						}
						if(this.oParams.sPosition=="center")
						{
							iLeft = Math.floor(0.5*(iAvailW - iWW));
							iTop = Math.floor(0.5*(iAvailH - iWH));
						}
						var sParams = "width=" + this.oParams.iWW + ",height=" + this.oParams.iWH + ",left=" + iLeft + ",top=" + iTop + ",location=" + this.oParams.sLocation + ",menubar=" + this.oParams.sMenubar + ",toolbar=" + this.oParams.sToolbar + ",status=" + this.oParams.sStatus + ",resizable=" + this.oParams.sResize + ",scrollbars=" + this.oParams.sScroll;
						var oWindow = window.open(sURL, "CL_ChildWindow", sParams);
					}
					else
					{
						var oWindow = window.open(sURL);
					}
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "MEDIAPLAY": // legacy
		case "SOUND":
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.bStart = oArgs.bPlay;
				this.oParams.sSrcType = oArgs.sSrcType;
				if(this.oParams.sSrcType=="file")
				{
					this.oParams.sFilePath = oArgs.sFilePath;
				}
				else if(this.oParams.sSrcType=="object")
				{
					var jObject = CL.axSlides.find("object[id='" + oArgs.sTargetId + "']");
					if(jObject.length!=0)
					{
						this.oParams.sFilePath = jObject.attr("soundsrc");
					}
					else
					{
						this.oParams.sFilePath = null;
					}
				}
			}
			else
			{
				this.oParams.bStart = (this.jxNode.attr("play")=="1");
				this.oParams.sSrcType = this.jxNode.attr("src_type");
				if(this.oParams.sSrcType=="file")
				{
					this.oParams.sFilePath = this.jxNode.attr("src");
				}
				else if(this.oParams.sSrcType=="object")
				{
					var jObject = CL.axSlides.find("object[id='" + this.jxNode.attr("pid") + "']");
					if(jObject.length!=0)
					{
						this.oParams.sFilePath = jObject.attr("soundsrc");
					}
					else
					{
						this.oParams.sFilePath = null;
					}
				}
			}
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(this.oParams.bStart)
				{
					if(this.oParams.sFilePath!=null)
					{
						CL.Sound.Play({ sEvent: "action", sFile: this.oParams.sFilePath });
					}
				}
				else
				{
					CL.Sound.Stop({ sEvent: "action" });
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "METHOD":
		{
			this.oParams.sTargetId = this.jxNode.attr("pid");
			this.oParams.oArgs = { pid: this.oParams.sTargetId, sMethod: this.jxNode.attr("method") };
			this.oParams.oArgs.oMethodArgs = {};
			var jxParams = this.jxNode.children("param");
			for(var i=0; i<jxParams.length; i++)
			{
				this.oParams.oArgs.oMethodArgs[$(jxParams[i]).attr("name")] = $(jxParams[i]).attr("value");
			}
			this.nStartTime = 0;
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(CLO[this.oParams.sTargetId]!=null)
				{
					CLO[this.oParams.sTargetId].CallMethod(this.oParams.oArgs);
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;	
		}
		case "MSGBOX":
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.exprMsgText = oArgs.sValue;
			}
			else
			{
				this.oParams.exprMsgText = this.jxNode.attr("value");
			}
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				CL.Timeline.Pause({ bAllActive: true });
				alert(CL.Resp.EvalExpr({ sExpr: this.oParams.exprMsgText }));
				CL.Timeline.Resume({ bAllActive: true });
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			};
			break;
		}
		case "NAVIGATION":
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.sTargets = oArgs.sTargets;
				this.oParams.sAction = oArgs.sAction;
			}
			else
			{
				this.oParams.sTargets = this.jxNode.attr("targets");
				this.oParams.sAction = this.jxNode.attr("action");
			}
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				CL.Event.Handle({ sEvtName: "EVENT_NAVIGATION", oHandlerArgs: { sTargets: this.oParams.sTargets, sAction: this.oParams.sAction } });
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "PAR":
		{
			this.bMustHaveChildBranch = true;
			var jxChildren = this.jxNode.children();
			if(jxChildren.length>0)
			{
				this.listActions = new List();
				for(var i=0; i<jxChildren.length; i++)
				{
					this.listActions.Append({ pElement: new Action({ xNode: jxChildren[i], sRespId: oArgs.sRespId }) })
				}
				this.nStartTime = 0;
				this.Continue = function (oArgs)
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					if(this.nStartTime==0)
					{
						this.nStartTime = (new Date()).valueOf();
						for(var oAction = this.listActions.pFirst; oAction != null; oAction = oAction.pNext)
						{
							oAction.bPARComplete = false;
						}
					}
					var bContinue = false;
					for(var oAction = this.listActions.pFirst; oAction != null; oAction = oAction.pNext)
					{
						if (oAction.bPARComplete==false)
						{
							if(oAction.Continue()==oAction)
							{
								bContinue = true;
							}
							else
							{
								oAction.bPARComplete = true;
							}
						}
					}
					if(bContinue)
					{
						return this;
					}
					// Done
					this.nStartTime = 0;
					if(this.bProceed)
					{
						if(this.pNext!=null)
						{
							this.pNext.bDebug = this.bProceed;
						}
						else
						{
							CL.Debug.Update({ oAction: this, bFinal: true });
						}
					}
					return this.pNext;
				};
			}
			else
			{
				this.Continue = function ()
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					if(this.bProceed)
					{
						if(this.pNext!=null)
						{
							this.pNext.bDebug = this.bProceed;
						}
						else
						{
							CL.Debug.Update({ oAction: this, bFinal: true });
						}
					}
					return this.pNext;
				}
			}
			break;
		}
		case "PRINT":
		{
			this.bMustHaveChildBranch = false;
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Update({ oAction: this });
					return this;
				}
				window.print();
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "RETURN":
		{
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(CL.sReturnFrameId!=null)
				{
					var sFrameId = CL.sReturnFrameId;
					CL.sReturnFrameId = null;
					CL.Navigation.GoTo({ sTargetType: "frame", sTargetId: sFrameId });
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "SEND_TO_LMS":
		{
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				CLLMS.Save();
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "RESET": 
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.sTargetId = oArgs.sTargetId;
				this.oParams.bInstant = oArgs.bInstant;
				if(!this.oParams.bInstant)
				{
					this.oParams.nDuration = parseFloat(oArgs.sDuration);
				}
			}
			else
			{
				this.oParams.sTargetId = this.jxNode.attr("pid");
				this.oParams.bInstant = (this.jxNode.attr("mode")=="instant");
				if(!this.oParams.bInstant)
				{
					this.oParams.nDuration = parseFloat(this.jxNode.attr("dur"));
				}
			}
			this.Continue = function (oArgs)
			{
				var oCurObj;
				if(this.nStartTime==0)
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					if(this.bProceed)
					{
						if(this.pNext!=null)
						{
							this.pNext.bDebug = this.bProceed;
						}
						else
						{
							CL.Debug.Update({ oAction: this, bFinal: true });
						}
					}
					var aTargetIds = [];
					if(CLO[this.oParams.sTargetId]==null)
					{
						var jxGroup = CL.jxGroups.find("group[id='" + this.oParams.sTargetId + "']");
						if(jxGroup.length!=0)
						{
							jxGroup.children("ref").each(function () { aTargetIds.push($(this).attr("id")) });
						}
					}
					else
					{
						aTargetIds.push(this.oParams.sTargetId);
					}
					if(aTargetIds.length==0)
					{
						return this.pNext;
					}
					this.aToReset = [];
					var oReset;
					var oInstant;
					var aInstants = [];
					for(var i=0; i<aTargetIds.length; i++)
					{
						oCurObj = CLO[aTargetIds[i]];
						if(oCurObj==null) continue;
						oReset = 
						{
							sId: aTargetIds[i],
							bSize: (oCurObj.initial.w!=oCurObj.current.w || oCurObj.initial.h!=oCurObj.current.h),
							bPosition: (oCurObj.initial.x!=oCurObj.current.x || oCurObj.initial.y!=oCurObj.current.y),
							bRotate: (oCurObj.initial.nAngle!=oCurObj.current.nAngle),
							bOpacity: (oCurObj.initial.nOpacity!=oCurObj.current.nOpacity),
							bScale: (oCurObj.initial.nScaleX!=oCurObj.current.nScaleX || oCurObj.initial.nScaleY!=oCurObj.current.nScaleY),
							bSkew: (oCurObj.initial.nSkewX!=oCurObj.current.nSkewX || oCurObj.initial.nSkewY!=oCurObj.current.nSkewY)
						};
						oInstant = 
						{
							sId: aTargetIds[i],
							bZ: (oCurObj.initial.nZ!=oCurObj.current.nZ),
							bHasResetMethod: (oCurObj.oMethods!=null && oCurObj.oMethods.Reset!=null)
						};
						if(oReset.bSize || oReset.bPosition || oReset.bRotate || oReset.bOpacity || oReset.bScale || oReset.bSkew)
						{
							this.aToReset.push(oReset);
						}
						if(oInstant.bZ || oInstant.bHasResetMethod)
						{
							aInstants.push(oInstant);
						}
					}
					if(aInstants.length>0)
					{
						for(var i=0; i<aInstants.length; i++) 
						{
							oCurObj = CLO[aInstants[i].sId];
							if(oCurObj==null) continue;
							if(aInstants[i].bZ)
							{
								$(oCurObj.div).css({ "z-index": oCurObj.initial.nZ });
								oCurObj.current.nZ = oCurObj.initial.nZ;
							}
							if(aInstants[i].bHasResetMethod)
							{
								oCurObj.CallMethod({ sMethod: "Reset" });
							}
						}
					}
					if(this.aToReset.length==0)
					{
						return this.pNext;
					}
					if(this.oParams.bInstant)
					{
						for(var i=0; i<this.aToReset.length; i++)
						{
							oCurObj = CLO[this.aToReset[i].sId];
							if(oCurObj==null) continue;
							if(this.aToReset[i].bRotate)
							{
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("rotate(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "rotate", sValue: oCurObj.initial.nAngle + "deg" });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "rotate", sValue: oCurObj.initial.nAngle + "deg" });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var sCSSPlainValue = "rotate(" + oCurObj.initial.nAngle + "deg)";
									sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
									$(oCurObj.div).attr({ "style": sStyle });
								}
								oCurObj.current.nAngle = oCurObj.initial.nAngle;
							}
							if(this.aToReset[i].bScale)
							{
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("scaleX(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleX", sValue: oCurObj.initial.nScaleX });
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleY", sValue: oCurObj.initial.nScaleY });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleX", sValue: oCurObj.initial.nScaleX });
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleY", sValue: oCurObj.initial.nScaleY });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var sCSSPlainValue = "scaleX(" + oCurObj.initial.nScaleX + ") scaleY(" + oCurObj.initial.nScaleY + ")";
									sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
									$(oCurObj.div).attr({ "style": sStyle });
								}
								oCurObj.current.nScaleX = oCurObj.initial.nScaleX;
								oCurObj.current.nScaleY = oCurObj.initial.nScaleY;
							}
							if(this.aToReset[i].bSkew)
							{
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("skewX(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewX", sValue: oCurObj.initial.nSkewX + "deg" });
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewY", sValue: oCurObj.initial.nSkewY + "deg" });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewX", sValue: oCurObj.initial.nSkewX + "deg" });
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewY", sValue: oCurObj.initial.nSkewY + "deg" });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var sCSSPlainValue = "skewX(" + oCurObj.initial.nSkewX + "deg) skewY(" + oCurObj.initial.nSkewY + "deg)";
									sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
									$(oCurObj.div).attr({ "style": sStyle });
								}
								oCurObj.current.nSkewX = oCurObj.initial.nSkewX;
								oCurObj.current.nSkewY = oCurObj.initial.nSkewY;
							}
							if(this.aToReset[i].bSize)
							{
								$(oCurObj.div).css({ "width": oCurObj.initial.w + "px", "height": oCurObj.initial.h + "px" });
								if($(oCurObj.div).children("img").length==1)
								{
									$(oCurObj.div).children("img").css({ "width": oCurObj.initial.w + "px", "height": oCurObj.initial.h + "px" });
								}
								oCurObj.current.w = oCurObj.initial.w;
								oCurObj.current.h = oCurObj.initial.h;
							}
							if(this.aToReset[i].bPosition)
							{
								$(oCurObj.div).css({ "left": oCurObj.initial.x + "px", "top": oCurObj.initial.y + "px" });
								oCurObj.current.x = oCurObj.initial.x;
								oCurObj.current.y = oCurObj.initial.y;
							}
							if(this.aToReset[i].bOpacity)
							{
								$(oCurObj.div).css({ "opacity": oCurObj.initial.nOpacity });
								oCurObj.current.opacity = oCurObj.initial.nOpacity;
							}
							return this.pNext; // only untimed props
						}
					}
					this.nStartTime = (new Date()).valueOf();
					this.nEndTime = this.nStartTime + this.oParams.nDuration;
					for(var i=0; i<this.aToReset.length; i++)
					{
						oCurObj = CLO[this.aToReset[i].sId];
						if(oCurObj==null) continue;
						if(this.aToReset[i].bRotate)
						{
							if(oCurObj.oActionRotate!=null)
							{
								oCurObj.oActionRotate.bCancelled = true;
							}
							oCurObj.oActionRotate = this;
							this.aToReset[i].nStartAngle = oCurObj.current.nAngle;
							this.aToReset[i].nEndAngle = oCurObj.initial.nAngle;
							this.aToReset[i].nDistance = this.aToReset[i].nEndAngle - this.aToReset[i].nStartAngle;
						}
						if(this.aToReset[i].bScale)
						{
							this.aToReset[i].nStartScaleX = +oCurObj.current.nScaleX;
							this.aToReset[i].nStartScaleY = +oCurObj.current.nScaleY;
							this.aToReset[i].nEndScaleX = +oCurObj.initial.nScaleX;
							this.aToReset[i].nEndScaleY = +oCurObj.initial.nScaleY;
							if(oCurObj.oActionScale!=null)
							{
								oCurObj.oActionScale.bCancelled = true;
							}
							oCurObj.oActionScale = this; 
							this.aToReset[i].nScaleDistanceX = this.aToReset[i].nEndScaleX - this.aToReset[i].nStartScaleX;
							this.aToReset[i].nScaleDistanceY = this.aToReset[i].nEndScaleY - this.aToReset[i].nStartScaleY;
						}
						if(this.aToReset[i].bSkew)
						{
							this.aToReset[i].nStartSkewX = +oCurObj.current.nSkewX;
							this.aToReset[i].nStartSkewY = +oCurObj.current.nSkewY;
							this.aToReset[i].nEndSkewX = +oCurObj.initial.nSkewX;
							this.aToReset[i].nEndSkewY = +oCurObj.initial.nSkewY;
							if(oCurObj.oActionSkew!=null)
							{
								oCurObj.oActionSkew.bCancelled = true;
							}
							oCurObj.oActionSkew = this; 
							this.aToReset[i].nSkewDistanceX = this.aToReset[i].nEndSkewX - this.aToReset[i].nStartSkewX;
							this.aToReset[i].nSkewDistanceY = this.aToReset[i].nEndSkewY - this.aToReset[i].nStartSkewY;
						}
						if(this.aToReset[i].bOpacity)
						{
							if(oCurObj.oActionOpacity!=null)
							{
								oCurObj.oActionOpacity.bCancelled = true;
							}
							oCurObj.oActionOpacity = this;
							this.aToReset[i].nStartOpacity = oCurObj.current.nOpacity;
							this.aToReset[i].nEndOpacity = oCurObj.initial.nOpacity;
							this.aToReset[i].nDistance = this.aToReset[i].nEndOpacity - this.aToReset[i].nStartOpacity;
						}
						if(this.aToReset[i].bSize)
						{
							if(oCurObj.oActionSize!=null)
							{
								oCurObj.oActionSize.bCancelled = true;
							}
							oCurObj.oActionSize = this;
							this.aToReset[i].nStartW = oCurObj.current.w;
							this.aToReset[i].nStartH = oCurObj.current.h;
							this.aToReset[i].nEndW = oCurObj.initial.w;
							this.aToReset[i].nEndH = oCurObj.initial.h;
							this.aToReset[i].nDistanceW = this.aToReset[i].nEndW - this.aToReset[i].nStartW;
							this.aToReset[i].nDistanceH = this.aToReset[i].nEndH - this.aToReset[i].nStartH;
						}
						if(this.aToReset[i].bPosition)
						{
							if(oCurObj.oActionMove!=null)
							{
								oCurObj.oActionMove.bCancelled = true;
							}
							oCurObj.oActionMove = this;
							this.aToReset[i].nStartX = oCurObj.current.x;
							this.aToReset[i].nStartY = oCurObj.current.y;
							this.aToReset[i].nEndX = oCurObj.initial.x;
							this.aToReset[i].nEndY = oCurObj.initial.y;
							this.aToReset[i].nPosDistanceX = this.aToReset[i].nEndX - this.aToReset[i].nStartX;
							this.aToReset[i].nPosDistanceY = this.aToReset[i].nEndY - this.aToReset[i].nStartY;
						}
						this.bCancelled = false;					
					}
				}
				if(this.bCancelled)
				{
					for(var i=0; i<this.aToReset.length; i++)
					{
						oCurObj = CLO[this.aToReset[i].sId];
						if(oCurObj==null) continue;
						if(this.aToReset[i].bRotate) oCurObj.oActionRotate = null;
						if(this.aToReset[i].bScale) oCurObj.oActionScale = null;
						if(this.aToReset[i].bSkew) oCurObj.oActionSkew = null;
						if(this.aToReset[i].bPosition) oCurObj.oActionMove = null;
						if(this.aToReset[i].bSize) oCurObj.oActionSize = null;
						if(this.aToReset[i].bOpacity) oCurObj.oActionOpacity = null;
						this.nStartTime = 0;
						return this.pNext;
					}
				}
				var nCurrentTime = (new Date()).valueOf();
				if(nCurrentTime>=this.nEndTime)
				{
					for(var i=0; i<this.aToReset.length; i++)
					{
						oCurObj = CLO[this.aToReset[i].sId];
						if(oCurObj==null) continue;
						if(this.aToReset[i].bRotate)
						{
							//RotateDone
							oCurObj.current.nAngle = this.aToReset[i].nEndAngle;
							var sStyle = $(oCurObj.div).attr("style");
							if(sStyle.indexOf("transform")!=-1)
							{
								if(sStyle.indexOf("rotate(")!=-1)
								{
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "rotate", sValue: this.aToReset[i].nEndAngle + "deg" });
								}
								else
								{
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "rotate", sValue: this.aToReset[i].nEndAngle + "deg" });
								}
								$(oCurObj.div).attr({ "style": sStyle });
							}
							else
							{
								var sCSSPlainValue = "rotate(" + this.aToReset[i].nEndAngle + "deg)";
								sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
								$(oCurObj.div).attr({ "style": sStyle });
							}
							oCurObj.oActionRotate = null;
						}
						if(this.aToReset[i].bScale)
						{
							// scale done
							oCurObj.current.nScaleX = this.aToReset[i].nEndScaleX;
							oCurObj.current.nScaleY = this.aToReset[i].nEndScaleY;
							var sStyle = $(oCurObj.div).attr("style");
							if(sStyle.indexOf("transform")!=-1)
							{
								if(sStyle.indexOf("scaleX(")!=-1)
								{
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleX", sValue: this.aToReset[i].nEndScaleX });
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleY", sValue: this.aToReset[i].nEndScaleY });
								}
								else
								{
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleX", sValue: this.aToReset[i].nEndScaleX });
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleY", sValue: this.aToReset[i].nEndScaleY });
								}
								$(oCurObj.div).attr({ "style": sStyle });
							}
							else
							{
								var sCSSPlainValue = "scaleX(" + this.aToReset[i].nEndScaleX + ") scaleY(" + this.aToReset[i].nEndScaleY + ")";
								sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
								$(oCurObj.div).attr({ "style": sStyle });
							}
							oCurObj.oActionScale = null;
						}
						if(this.aToReset[i].bSkew)
						{
							// skew done
							oCurObj.current.nSkewX = this.aToReset[i].nEndSkewX;
							oCurObj.current.nSkewY = this.aToReset[i].nEndSkewY;
							var sStyle = $(oCurObj.div).attr("style");
							if(sStyle.indexOf("transform")!=-1)
							{
								if(sStyle.indexOf("skewX(")!=-1)
								{
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewX", sValue: this.aToReset[i].nEndSkewX + "deg" });
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewY", sValue: this.aToReset[i].nEndSkewY + "deg" });
								}
								else
								{
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewX", sValue: this.aToReset[i].nEndSkewX + "deg" });
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewY", sValue: this.aToReset[i].nEndSkewY + "deg" });
								}
								$(oCurObj.div).attr({ "style": sStyle });
							}
							else
							{
								var sCSSPlainValue = "skewX(" + this.aToReset[i].nEndSkewX + "deg) skewY(" + this.aToReset[i].nEndSkewY + "deg)";
								sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
								$(oCurObj.div).attr({ "style": sStyle });
							}
							oCurObj.oActionSkew = null;
						}
						if(this.bOpacity)
						{
							// opacity done
							oCurObj.current.nOpacity = this.aToReset[i].nEndOpacity;
							$(oCurObj.div).css({ "opacity": this.aToReset[i].nEndOpacity });
							oCurObj.oActionOpacity = null;
						}
						if(this.bSize)
						{
							//SizeDone
							oCurObj.current.w = this.aToReset[i].nEndW;
							oCurObj.current.h = this.aToReset[i].nEndH;
							oCurObj.oActionSize = null;
							$(oCurObj.div).css({ "width": this.aToReset[i].nEndW + "px", "height": this.aToReset[i].nEndH + "px" });
							if($(oCurObj.div).children("img").length==1)
							{
								$(oCurObj.div).children("img").css({ "width": this.aToReset[i].nEndW + "px", "height": this.aToReset[i].nEndH + "px" });
							}
						}
						if(this.bPosition)
						{
							// Move done
							oCurObj.current.x = this.aToReset[i].nEndX;
							oCurObj.current.y = this.aToReset[i].nEndY;
							$(oCurObj.div).css({ "left": this.aToReset[i].nEndX + "px", "top": this.aToReset[i].nEndY + "px" });
							oCurObj.oActionMove = null;
						}
					}
					this.nStartTime = 0;
					return this.pNext;
				}
				else
				{
					var nScale = (nCurrentTime - this.nStartTime) / this.oParams.nDuration;
					for(var i=0; i<this.aToReset.length; i++)
					{
						oCurObj = CLO[this.aToReset[i].sId];
						if(oCurObj==null) continue;
						if(this.aToReset[i].bRotate)
						{
							// Rotating
							this.aToReset[i].nAngle = parseInt(this.aToReset[i].nStartAngle + this.aToReset[i].nDistance * nScale);
							oCurObj.current.nAngle = this.aToReset[i].nAngle;
							var sStyle = $(oCurObj.div).attr("style");
							if(sStyle.indexOf("transform")!=-1)
							{
								if(sStyle.indexOf("rotate(")!=-1)
								{
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "rotate", sValue: this.aToReset[i].nAngle + "deg" });
								}
								else
								{
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "rotate", sValue: this.aToReset[i].nAngle + "deg" });
								}
								$(oCurObj.div).attr({ "style": sStyle });
							}
							else
							{
								var sCSSPlainValue = "rotate(" + this.aToReset[i].nAngle + "deg)";
								sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
								$(oCurObj.div).attr({ "style": sStyle });
							}
						}
						if(this.aToReset[i].bScale)
						{
							this.aToReset[i].nScaleX = this.aToReset[i].nStartScaleX + this.aToReset[i].nScaleDistanceX * nScale;
							this.aToReset[i].nScaleY = this.aToReset[i].nStartScaleY + this.aToReset[i].nScaleDistanceY * nScale;
							var sStyle = $(oCurObj.div).attr("style");
							if(sStyle.indexOf("transform")!=-1)
							{
								if(sStyle.indexOf("scaleX(")!=-1)
								{
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleX", sValue: this.aToReset[i].nScaleX });
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleY", sValue: this.aToReset[i].nScaleY });
								}
								else
								{
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleX", sValue: this.aToReset[i].nScaleX });
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleY", sValue: this.aToReset[i].nScaleY });
								}
								$(oCurObj.div).attr({ "style": sStyle });
							}
							else
							{
								var sCSSPlainValue = "scaleX(" + this.aToReset[i].nScaleX + ") scaleY(" + this.aToReset[i].nScaleY + ")";
								sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
								$(oCurObj.div).attr({ "style": sStyle });
							}
						}
						if(this.aToReset[i].bSkew)
						{
							this.aToReset[i].nSkewX = this.aToReset[i].nStartSkewX + this.aToReset[i].nSkewDistanceX * nScale;
							this.aToReset[i].nSkewY = this.aToReset[i].nStartSkewY + this.aToReset[i].nSkewDistanceY * nScale;
							var sStyle = $(oCurObj.div).attr("style");
							if(sStyle.indexOf("transform")!=-1)
							{
								if(sStyle.indexOf("skewX(")!=-1)
								{
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewX", sValue: this.aToReset[i].nSkewX + "deg" });
									sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewY", sValue: this.aToReset[i].nSkewY + "deg" });
								}
								else
								{
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewX", sValue: this.aToReset[i].nSkewX + "deg" });
									sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewY", sValue: this.aToReset[i].nSkewY + "deg" });
								}
								$(oCurObj.div).attr({ "style": sStyle });
							}
							else
							{
								var sCSSPlainValue = "skewX(" + this.aToReset[i].nSkewX + "deg) skewY(" + this.aToReset[i].nSkewY + "deg)";
								sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
								$(oCurObj.div).attr({ "style": sStyle });
							}
						}
						if(this.aToReset[i].bOpacity)
						{
							this.aToReset[i].nOpacity = this.aToReset[i].nStartOpacity + this.aToReset[i].nDistance * nScale;
							oCurObj.current.nOpacity = this.aToReset[i].nOpacity;
							$(oCurObj.div).css({ "opacity": this.aToReset[i].nOpacity });
						}
						if(this.aToReset[i].bSize)
						{
							// Sizing
							var nPosW = parseInt(this.aToReset[i].nStartW + this.aToReset[i].nDistanceW * nScale);
							var nPosH = parseInt(this.aToReset[i].nStartH + this.aToReset[i].nDistanceH * nScale);
							oCurObj.current.w = nPosW;
							oCurObj.current.h = nPosH;
							$(oCurObj.div).css({ "width": nPosW + "px", "height": nPosH + "px" });
							if($(oCurObj.div).children("img").length==1)
							{
								$(oCurObj.div).children("img").css({ "width": nPosW + "px", "height": nPosH + "px" });
							}
						}
						if(this.aToReset[i].bPosition)
						{
							// Moving
							var nPosX = parseInt(this.aToReset[i].nStartX + this.aToReset[i].nPosDistanceX * nScale);
							var nPosY = parseInt(this.aToReset[i].nStartY + this.aToReset[i].nPosDistanceY * nScale);
							oCurObj.current.x = nPosX;
							oCurObj.current.y = nPosY;
							$(oCurObj.div).css({ "left": nPosX + "px", "top": nPosY + "px" });
						}
					}
				}
				return this;
			}
			break;
		}
		case "SET":
		{
			this.oParams.sTargetType = this.jxNode.attr("type");
			switch(this.oParams.sTargetType)
			{
				case "property":
				{
					this.oParams.sTargetId = this.jxNode.attr("objectid");
					this.oParams.sProperty = this.jxNode.attr("property");
					if(this.jxNode.attr("color_bg_switch")=="yes")
					{
						this.oParams.sColorBG = this.jxNode.attr("color_bg");
					}
					if(this.jxNode.attr("color_border_switch")=="yes")
					{
						this.oParams.sColorBorder = this.jxNode.attr("color_border");
					}
					if(this.jxNode.attr("borderwidth_switch")=="yes")
					{
						this.oParams.iBorderWidth = +this.jxNode.attr("borderwidth");
					}
					if(this.jxNode.attr("opacity_switch")=="yes")
					{
						this.oParams.iOpacity = +this.jxNode.attr("opacity");
					}
					if(this.jxNode.attr("drag_switch")=="yes")
					{
						this.oParams.bDraggable = this.jxNode.attr("drag")=="yes";
					}
					break;
				}
				case "master":
				{
					this.oParams.sMasterId = this.jxNode.attr("master");
					break;
				}
				case "score":
				{
					this.oParams.sObjectiveId = this.jxNode.attr("pid");
					this.oParams.sSourceId = this.jxNode.attr("oid");
					this.oParams.sAdditive = this.jxNode.attr("additive");
					this.oParams.exprScore = this.jxNode.attr("score");
					break;
				}
				case "completion":
				{
					this.oParams.sObjectiveId = this.jxNode.attr("pid");
					this.oParams.sCS = this.jxNode.attr("cs");
					break;
				}
				case "success":
				{
					this.oParams.sObjectiveId = this.jxNode.attr("pid");
					this.oParams.sSS = this.jxNode.attr("ss");
					break;
				}
				case "state":
				{
					this.oParams.sTargetId = this.jxNode.attr("objectid");
					this.oParams.sState = this.jxNode.attr("state");
					break;
				}
			}
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				switch(this.oParams.sTargetType)
				{
					case "property":
					{
						var oCurObj = CLO[this.oParams.sTargetId];
						if(oCurObj!=null)
						{
							if(this.oParams.sColorBG!=null)
							{
								oCurObj.current.sBGColor = this.oParams.sColorBG;
								switch(oCurObj.sType)
								{
									case "SHAPE":
									{
										//break;
									}
									default:
									{
										$(oCurObj.div).children(":first").css({ "background-color": this.oParams.sColorBG });
										break;
									}
								}
							}
							if(this.oParams.sColorBorder!=null)
							{
								oCurObj.current.sBorderColor = this.oParams.sColorBorder;
								switch(oCurObj.sType)
								{
									case "SHAPE":
									{
										break;
									}
									default:
									{
										$(oCurObj.div).children(":first").css({ "border-color": this.oParams.sColorBorder });
										if($(oCurObj.div).children(":first").css("border-style")=="none")
										{
											$(oCurObj.div).children(":first").css({ "border-style": "solid" });
										}
										break;
									}
								}
							}
							if(this.oParams.iBorderWidth!=null)
							{
								oCurObj.current.iBorderWidth = this.oParams.iBorderWidth;
								switch(oCurObj.sType)
								{
									case "SHAPE":
									{
										break;
									}
									default:
									{
										$(oCurObj.div).children(":first").css({ "border-width": this.oParams.iBorderWidth + "px" });
										break;
									}
								}
							}
							if(this.oParams.iOpacity!=null)
							{
								var nOpacity = this.oParams.iOpacity/100;
								oCurObj.current.nOpacity = nOpacity;
								switch(oCurObj.sType)
								{
									case "SHAPE":
									{
										break;
									}
									default:
									{
										$(oCurObj.div).css({ "opacity": nOpacity });
										break;
									}
								}
							}
							if(this.oParams.bDraggable!=null)
							{
								if(this.oParams.bDraggable==true)
								{
									if(!$(oCurObj.div).hasClass("ui-draggable"))
									{
										$(oCurObj.div).addClass("cl-drag").draggable();
										oCurObj.current.bDraggable = true;
									}
								}
								else
								{
									if($(oCurObj.div).hasClass("ui-draggable"))
									{
										$(oCurObj.div).removeClass("cl-drag").draggable("destroy");
										oCurObj.current.bDraggable = false;
									}
								}
							}
						}
						break;
					}
					case "master":
					{
						if(CLM[this.oParams.sMasterId]!=null)
						{
							CLM[this.oParams.sMasterId].Show();
						}
						break;
					}
					case "score":
					{
						var nScore = +CL.Resp.EvalExpr({ sExpr: this.oParams.exprScore, bNumeric: true });
						CL.SCO.SetObjectiveScore({ sId: this.oParams.sObjectiveId, sSrcId: this.oParams.sSourceId, bReplace: (this.oParams.sAdditive=="replace"), nScore: nScore });
						break;
					}
					case "completion":
					{
						CL.SCO.SetObjectiveCompletionStatus({ sId: this.oParams.sObjectiveId, sStatus: this.oParams.sCS });
						break;
					}
					case "success":
					{
						CL.SCO.SetObjectiveSuccessStatus({ sId: this.oParams.sObjectiveId, sStatus: this.oParams.sSS });
						break;
					}
					case "state":
					{
						var oCurObj = CLO[this.oParams.sTargetId];
						if(oCurObj!=null)
						{
							CLO[this.oParams.sTargetId].SetState({ sState: this.oParams.sState });
						}
						break;
					}
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "SWITCH":
		{
			this.oParams.exprSwitch = this.jxNode.attr("expr");
			this.oActionLists = {};
			var jxCases = this.jxNode.children("CASE");
			for(var i=0; i<jxCases.length; i++)
			{
				var jxChildren = $(jxCases[i]).children();
				var listCase = new List();
				for(var j=0; j<jxChildren.length; j++)
				{
					listCase.Append({ pElement: new Action({ xNode: jxChildren[j], sRespId: oArgs.sRespId }) });
				}
				this.oActionLists[i] = { exprValue: $(jxCases[i]).attr("value"), listActions: listCase };
			}
			var jxElse = this.jxNode.children("ELSE:first");
			if(jxElse.length!=0)
			{
				var jxChildren = jxElse.children();
				var listElse = new List();
				for(var j=0; j<jxChildren.length; j++)
				{
					listElse.Append({ pElement: new Action({ xNode: jxChildren[j], sRespId: oArgs.sRespId }) });
				}
				this.oActionLists["ELSE"] = { listActions: listElse };
			}
			this.nStartTime = 0;
			this.listActions = null;
			this.Continue = function (oArgs)
			{
				if(this.nStartTime == 0)
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					this.nStartTime = (new Date()).valueOf();
					this.listActions = null;
					var sSwitchValue = CL.Resp.EvalExpr({ sExpr: this.oParams.exprSwitch });
					sSwitchValue = sSwitchValue.toString();
					for(var sKey in this.oActionLists)
					{
						if(this.oActionLists[sKey].exprValue!=null)
						{
							var sValue = CL.Resp.EvalExpr({ sExpr: this.oActionLists[sKey].exprValue });
							if(sValue.toString()==sSwitchValue)
							{
								this.listActions = this.oActionLists[sKey].listActions;
								break;
							}
						}
					}
					if(this.listActions==null && this.oActionLists["ELSE"]!=null)
					{
						this.listActions = this.oActionLists["ELSE"].listActions;
					}
					if(this.listActions==null) // no cases, break
					{
						return this.pNext;
					}
					this.oCurrentAction = this.listActions.pFirst;
					if(this.oCurrentAction!=null)
					{
						this.oCurrentAction.bDebug = this.bProceed;
					}
				}
				for(;;)
				{
					var oAction = this.oCurrentAction;
					if(oAction==null)
					{
						break;
					}
					this.oCurrentAction = oAction.Continue();
					if(this.oCurrentAction!=null)
					{
						this.bProceed = this.oCurrentAction.bProceed;
					}
					if(this.oCurrentAction==oAction)
					{
						break;
					}
				}
				if(this.oCurrentAction)
				{
					return this;
				}
				// Done
				this.nStartTime = 0;
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;				
			}
			break;
		}
		case "TIMER":
		{
			this.oParams.nDuration = +this.jxNode.attr("dur");
			this.listActions = new List();
			var jxChildren = this.jxNode.children();
			for(var i=0; i<jxChildren.length; i++)
			{
				this.listActions.Append({ pElement: new Action({ xNode: jxChildren[i], sRespId: oArgs.sRespId }) })
			}
			this.nStartTime = 0;
			this.Continue = function (oArgs)
			{
				if(this.nStartTime==0)
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					// TimerStart
					this.nStartTime = (new Date()).valueOf();
					this.nEndTime = this.nStartTime + this.oParams.nDuration;
					this.oCurrentAction = this.listActions.pFirst;
					if(this.oCurrentAction!=null)
					{
						this.oCurrentAction.bDebug = this.bProceed;
					}
				}
				if((new Date()).valueOf() < this.nEndTime) // Waiting
				{
					return this;
				}
				for(;;)
				{
					var oAction = this.oCurrentAction;
					if(oAction==null)
					{
						break;
					}
					this.oCurrentAction = oAction.Continue();
					if(this.oCurrentAction!=null)
					{
						this.bProceed = this.oCurrentAction.bDebug;
					}
					if(this.oCurrentAction==oAction)
					{
						break;
					}
				}
				if(this.oCurrentAction)
				{
					return this;
				}
				//TimerDone
				this.nStartTime = 0;
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "TRANSFORM": // tested
		{
			this.oParams.sTargetId = this.jxNode.attr("pid");
			this.oParams.sType = this.jxNode.attr("type");
			this.oParams.bAdd = (this.jxNode.attr("additive")=="sum");
			this.oParams.nDuration = parseInt(this.jxNode.attr("dur"), 10);
			switch(this.oParams.sType)
			{
				case "move":
				{
					this.oParams.exprX = this.jxNode.attr("x");
					this.oParams.exprY = this.jxNode.attr("y");
					break;
				}
				case "size":
				{
					this.oParams.exprW = this.jxNode.attr("w");
					this.oParams.exprH = this.jxNode.attr("h");
					break;
				}
				case "rotate":
				{
					this.oParams.exprAngle = this.jxNode.attr("angle");
					break;
				}
				case "opacity":
				{
					this.oParams.exprOpacity = this.jxNode.attr("opacity");
					break;
				}
				case "scale":
				{
					this.oParams.exprScaleX = this.jxNode.attr("scale_x");
					this.oParams.exprScaleY = this.jxNode.attr("scale_y");
					break;
				}
				case "skew":
				{
					this.oParams.exprSkewX = this.jxNode.attr("skew_x");
					this.oParams.exprSkewY = this.jxNode.attr("skew_y");
					break;
				}
			}
			this.Continue = function (oArgs)
			{
				var oCurObj;
				var oActionTypes = { "move": "oActionMove", "size": "oActionSize", "rotate": "oActionRotate", "opacity": "oActionOpacity", "scale": "oActionScale", "skew": "oActionSkew" };
				if(this.nStartTime==0)
				{
					if(this.bDebug)
					{
						CL.Debug.Break({ oAction: this });
						return this;
					}
					if(this.bProceed)
					{
						if(this.pNext!=null)
						{
							this.pNext.bDebug = this.bProceed;
						}
						else
						{
							CL.Debug.Update({ oAction: this, bFinal: true });
						}
					}
					var aTargetIds = [];
					if(CLO[this.oParams.sTargetId]==null)
					{
						var jxGroup = CL.jxGroups.find("group[id='" + this.oParams.sTargetId + "']");
						if(jxGroup.length!=0)
						{
							jxGroup.children("ref").each(function () { aTargetIds.push($(this).attr("id")) });
						}
					}
					else
					{
						aTargetIds.push(this.oParams.sTargetId);
					}
					if(aTargetIds.length==0)
					{
						return this.pNext;
					}
					var aToTransform = [];
					var oTransform;
					for(var i=0; i<aTargetIds.length; i++)
					{
						oCurObj = CLO[aTargetIds[i]];
						if(oCurObj==null) continue;
						if(oCurObj[oActionTypes[this.oParams.sType]]!=null)
						{
							oCurObj[oActionTypes[this.oParams.sType]].bCancelled = true;
						}
						if(!$(oCurObj.div).is(":visible")) // object is invisible - stop animation (if any) and proceed next
						{
							continue;
						}
						aToTransform.push(aTargetIds[i]);
					}
					if(aToTransform.length==0)
					{
						return this.pNext;
					}
					var oTransform;
					this.nStartTime = (new Date()).valueOf();
					this.nEndTime = this.nStartTime + this.oParams.nDuration;
					this.aTargets = [];
					for(var i=0; i<aToTransform.length; i++)
					{
						oCurObj = CLO[aToTransform[i]];
						if(oCurObj==null) continue;
						switch(this.oParams.sType)
						{
							case "move":
							{
								oTransform =
								{
									sId: aToTransform[i],
									nStartX: +oCurObj.current.x,
									nStartY: +oCurObj.current.y,
									nEndX: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprX, bNumeric: true }),
									nEndY: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprY, bNumeric: true })
								};
								if(this.oParams.bAdd)
								{
									oTransform.nEndX += oTransform.nStartX;
									oTransform.nEndY += oTransform.nStartY;
								}
								if(oTransform.nStartX==oTransform.nEndX && oTransform.nStartY==oTransform.nEndY) // same values - nothing to do
								{
									break;
								}
								if(this.oParams.nDuration==0) // instant move and proceed next
								{
									oCurObj.current.x = oTransform.nEndX;
									oCurObj.current.y = oTransform.nEndY;
									$(oCurObj.div).css({ "left": oTransform.nEndX + "px", "top": oTransform.nEndY + "px" });
									break;
								}
								else // launch animation
								{
									oCurObj.oActionMove = this; 
									oTransform.nPosDistanceX = oTransform.nEndX - oTransform.nStartX;
									oTransform.nPosDistanceY = oTransform.nEndY - oTransform.nStartY;
									this.aTargets.push(oTransform);
								}
								break;
							}
							case "size":
							{
								oTransform =
								{
									sId: aToTransform[i],
									nStartW: +oCurObj.current.w,
									nStartH: +oCurObj.current.h,
									nEndW: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprW, bNumeric: true }),
									nEndH: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprH, bNumeric: true })
								};
								if(this.oParams.bAdd)
								{
									oTransform.nEndW += oTransform.nStartW;
									oTransform.nEndH += oTransform.nStartH;
								}
								if(oTransform.nStartW==oTransform.nEndW && oTransform.nStartH==oTransform.nEndH) // same values - nothing to do
								{
									break;
								}
								if(this.oParams.nDuration==0) // instant resize and proceed next
								{
									oCurObj.current.w = oTransform.nEndW;
									oCurObj.current.h = oTransform.nEndH;
									oCurObj.oActionSize = null;
									$(oCurObj.div).css({ "width": oTransform.nEndW + "px", "height": oTransform.nEndH + "px" });
									if($(oCurObj.div).children("img").length==1)
									{
										$(oCurObj.div).children("img").css({ "width": oTransform.nEndW + "px", "height": oTransform.nEndH + "px" });
									}
									break;
								}
								else // launch animation
								{
									oCurObj.oActionSize = this; // !!!
									oTransform.nDistanceW = oTransform.nEndW - oTransform.nStartW;
									oTransform.nDistanceH = oTransform.nEndH - oTransform.nStartH;
									this.aTargets.push(oTransform);
								}
								break;
							}
							case "rotate":
							{
								oTransform =
								{
									sId: aToTransform[i],
									nStartAngle: +oCurObj.current.nAngle,
									nEndAngle: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprAngle, bNumeric: true })
								}
								if(this.oParams.bAdd)
								{
									oTransform.nEndAngle += oTransform.nStartAngle;
								}
								if(oTransform.nStartAngle==oTransform.nEndAngle) // same values - nothing to do
								{
									break;
								}
								if(this.oParams.nDuration==0) // instant rotate and proceed next
								{
									oCurObj.current.nAngle = oTransform.nEndAngle;
									var sStyle = $(oCurObj.div).attr("style");
									if(sStyle.indexOf("transform")!=-1)
									{
										if(sStyle.indexOf("rotate(")!=-1)
										{
											sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "rotate", sValue: oTransform.nEndAngle + "deg" });
										}
										else
										{
											sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "rotate", sValue: oTransform.nEndAngle + "deg" });
										}
										$(oCurObj.div).attr({ "style": sStyle });
									}
									else
									{
										var sCSSPlainValue = "rotate(" + oTransform.nEndAngle + "deg)";
										sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
										$(oCurObj.div).attr({ "style": sStyle });
									}
								}
								else // launch animation
								{
									oCurObj.oActionRotate = this; 
									oTransform.nDistance = oTransform.nEndAngle - oTransform.nStartAngle;
									this.aTargets.push(oTransform);
								}
								break;
							}
							case "opacity":
							{
								oTransform =
								{
									sId: aToTransform[i],
									nStartOpacity: +oCurObj.current.nOpacity,
									nEndOpacity: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprOpacity, bNumeric: true })
								}
								if(isNaN(oTransform.nEndOpacity))
								{
									break;
								}
								oTransform.nEndOpacity = oTransform.nEndOpacity/100;
								if(oTransform.nEndOpacity>1)
								{
									oTransform.nEndOpacity = 1;
								}
								if(this.oParams.bAdd)
								{
									oTransform.nEndOpacity += oTransform.nStartOpacity;
								}
								if(oTransform.nEndOpacity>1)
								{
									oTransform.nEndOpacity = 1;
								}
								if(oTransform.nEndOpacity<0)
								{
									oTransform.nEndOpacity = 0;
								}
								if(oTransform.nStartOpacity==oTransform.nEndOpacity) // same values - nothing to do
								{
									break;
								}
								if(this.oParams.nDuration==0) // instant opacity and proceed next
								{
									oCurObj.current.nOpacity = oTransform.nEndOpacity;
									$(oCurObj.div).css({ "opacity": oTransform.nEndOpacity });
								}
								else // launch animation
								{
									oCurObj.oActionOpacity = this; 
									oTransform.nDistance = oTransform.nEndOpacity - oTransform.nStartOpacity;
									this.aTargets.push(oTransform);
								}
								break;
							}
							case "scale":
							{
								oTransform =
								{
									sId: aToTransform[i],
									nStartScaleX: +oCurObj.current.nScaleX,
									nStartScaleY: +oCurObj.current.nScaleY,
									nEndScaleX: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprScaleX, bNumeric: true }),
									nEndScaleY: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprScaleY, bNumeric: true })
								}
								if(isNaN(oTransform.nEndScaleX) || isNaN(oTransform.nEndScaleY))
								{
									break;
								}
								oTransform.nEndScaleX = oTransform.nEndScaleX/100;
								oTransform.nEndScaleY = oTransform.nEndScaleY/100;
								if(this.oParams.bAdd)
								{
									oTransform.nEndScaleX += oTransform.nStartScaleX;
									oTransform.nEndScaleY += oTransform.nStartScaleY;
								}
								if(oTransform.nStartScaleX==oTransform.nEndScaleX && oTransform.nStartScaleY==oTransform.nEndScaleY) // same values - nothing to do
								{
									break;
								}
								if(this.oParams.nDuration==0) // instant scale and proceed next
								{
									oCurObj.current.nScaleX = oTransform.nEndScaleX;
									oCurObj.current.nScaleY = oTransform.nEndScaleY;
									var sStyle = $(oCurObj.div).attr("style");
									if(sStyle.indexOf("transform")!=-1)
									{
										if(sStyle.indexOf("scaleX(")!=-1)
										{
											sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleX", sValue: oTransform.nEndScaleX });
											sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleY", sValue: oTransform.nEndScaleY });
										}
										else
										{
											sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleX", sValue: oTransform.nEndScaleX });
											sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleY", sValue: oTransform.nEndScaleY });
										}
										$(oCurObj.div).attr({ "style": sStyle });
									}
									else
									{
										var sCSSPlainValue = "scaleX(" + oTransform.nEndScaleX + ") scaleY(" + oTransform.nEndScaleY + ")";
										sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
										$(oCurObj.div).attr({ "style": sStyle });
									}
								}
								else // launch animation
								{
									oCurObj.oActionScale = this; 
									oTransform.nScaleDistanceX = oTransform.nEndScaleX - oTransform.nStartScaleX;
									oTransform.nScaleDistanceY = oTransform.nEndScaleY - oTransform.nStartScaleY;
									this.aTargets.push(oTransform);
								}
								break;
							}
							case "skew":
							{
								oTransform =
								{
									sId: aToTransform[i],
									nStartSkewX: +oCurObj.current.nSkewX,
									nStartSkewY: +oCurObj.current.nSkewY,
									nEndSkewX: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprSkewX, bNumeric: true }),
									nEndSkewY: +CL.Resp.EvalExpr({ sExpr: this.oParams.exprSkewY, bNumeric: true })
								}
								if(isNaN(oTransform.nEndSkewX) || isNaN(oTransform.nEndSkewY))
								{
									break;
								}
								if(this.oParams.bAdd)
								{
									oTransform.nEndSkewX += oTransform.nStartSkewX;
									oTransform.nEndSkewY += oTransform.nStartSkewY;
								}
								if(oTransform.nStartSkewX==oTransform.nEndSkewX && oTransform.nStartSkewY==oTransform.nEndSkewY) // same values - nothing to do
								{
									break;
								}
								if(this.oParams.nDuration==0) // instant skew and proceed next
								{
									oCurObj.current.nSkewX = oTransform.nEndSkewX;
									oCurObj.current.nSkewY = oTransform.nEndSkewY;
									var sStyle = $(oCurObj.div).attr("style");
									if(sStyle.indexOf("transform")!=-1)
									{
										if(sStyle.indexOf("skewX(")!=-1)
										{
											sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewX", sValue: oTransform.nEndSkewX + "deg" });
											sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewY", sValue: oTransform.nEndSkewY + "deg" });
										}
										else
										{
											sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewX", sValue: oTransform.nEndSkewX + "deg" });
											sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewY", sValue: oTransform.nEndSkewY + "deg" });
										}
										$(oCurObj.div).attr({ "style": sStyle });
									}
									else
									{
										var sCSSPlainValue = "skewX(" + oTransform.nEndSkewX + "deg) skewY(" + oTransform.nEndSkewY + "deg)";
										sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
										$(oCurObj.div).attr({ "style": sStyle });
									}
								}
								else // launch animation
								{
									oCurObj.oActionSkew = this; 
									oTransform.nSkewDistanceX = oTransform.nEndSkewX - oTransform.nStartSkewX;
									oTransform.nSkewDistanceY = oTransform.nEndSkewY - oTransform.nStartSkewY;
									this.aTargets.push(oTransform);
								}
								break;
							}
						}
					}
					if(this.aTargets.length==0)
					{
						return this.pNext;
					}
					this.bCancelled = false;
				}
				if(this.bCancelled)
				{
					for(var i=0; i<this.aTargets.length; i++)
					{
						oCurObj = CLO[this.aTargets[i].sId];
						if(oCurObj!=null) oCurObj[oActionTypes[this.oParams.sType]] = null;
					}
					this.nStartTime = 0;
					return this.pNext;
				}
				var nCurrentTime = (new Date()).valueOf();
				if(nCurrentTime >= this.nEndTime)
				{
					// End of transform
					for(var i=0; i<this.aTargets.length; i++)
					{
						oCurObj = CLO[this.aTargets[i].sId];
						if(oCurObj==null) continue;
						switch(this.oParams.sType)
						{
							case "move": // Move done
							{
								oCurObj.current.x = this.aTargets[i].nEndX;
								oCurObj.current.y = this.aTargets[i].nEndY;
								$(oCurObj.div).css({ "left": this.aTargets[i].nEndX + "px", "top": this.aTargets[i].nEndY + "px" });
								break;
							}
							case "size": //SizeDone
							{
								oCurObj.current.w = this.aTargets[i].nEndW;
								oCurObj.current.h = this.aTargets[i].nEndH;
								$(oCurObj.div).css({ "width": this.aTargets[i].nEndW + "px", "height": this.aTargets[i].nEndH + "px" });
								if($(oCurObj.div).children("img").length==1)
								{
									$(oCurObj.div).children("img").css({ "width": this.aTargets[i].nEndW + "px", "height": this.aTargets[i].nEndH + "px" });
								}
								break;
							}
							case "rotate": //RotateDone
							{
								oCurObj.current.nAngle = this.aTargets[i].nEndAngle;
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("rotate(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "rotate", sValue: this.aTargets[i].nEndAngle + "deg" });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "rotate", sValue: this.aTargets[i].nEndAngle + "deg" });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var oCSS = {};
									var sCSSPlainValue = "rotate(" + this.aTargets[i].nEndAngle + "deg)";
									oCSS[CL.sCSSPrefix + "transform"] = sCSSPlainValue;
									oCSS[CL.sCSSPrefix + "transform-origin"] = "50% 50%";
									oCSS["transform"] = sCSSPlainValue;
									oCSS["transform-origin"] = "50% 50%";
									$(oCurObj.div).css(oCSS);
								}
								break;
							}
							case "opacity": // opacity done
							{
								oCurObj.current.nOpacity = this.aTargets[i].nEndOpacity;
								$(oCurObj.div).css({ "opacity": this.aTargets[i].nEndOpacity });
								break;
							}
							case "scale": // scale done
							{
								oCurObj.current.nScaleX = this.aTargets[i].nEndScaleX;
								oCurObj.current.nScaleY = this.aTargets[i].nEndScaleY;
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("scaleX(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleX", sValue: this.aTargets[i].nEndScaleX });
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleY", sValue: this.aTargets[i].nEndScaleY });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleX", sValue: this.aTargets[i].nEndScaleX });
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleY", sValue: this.aTargets[i].nEndScaleY });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var sCSSPlainValue = "scaleX(" + this.aTargets[i].nEndScaleX + ") scaleY(" + this.aTargets[i].nEndScaleY + ")";
									sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
									$(oCurObj.div).attr({ "style": sStyle });
								}
								break;
							}
							case "skew": // skew done
							{
								oCurObj.current.nSkewX = this.aTargets[i].nEndSkewX;
								oCurObj.current.nSkewY = this.aTargets[i].nEndSkewY;
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("skewX(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewX", sValue: this.aTargets[i].nEndSkewX + "deg" });
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewY", sValue: this.aTargets[i].nEndSkewY + "deg" });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewX", sValue: this.aTargets[i].nEndSkewX + "deg" });
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewY", sValue: this.aTargets[i].nEndSkewY + "deg" });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var sCSSPlainValue = "skewX(" + this.aTargets[i].nEndSkewX + "deg) skewY(" + this.aTargets[i].nEndSkewY + "deg)";
									sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
									$(oCurObj.div).attr({ "style": sStyle });
								}
								break;
							}
						}
						oCurObj[oActionTypes[this.oParams.sType]] = null;
					}
					this.bCancelled = true;
					this.nStartTime = 0;
					return this.pNext;
				}
				else
				{
					var nScale = (nCurrentTime - this.nStartTime) / this.oParams.nDuration;
					for(var i=0; i<this.aTargets.length; i++)
					{
						oCurObj = CLO[this.aTargets[i].sId];
						if(oCurObj==null) continue;
						switch(this.oParams.sType)
						{
							case "move":
							{
								var nPosX = parseInt(this.aTargets[i].nStartX + this.aTargets[i].nPosDistanceX * nScale);
								var nPosY = parseInt(this.aTargets[i].nStartY + this.aTargets[i].nPosDistanceY * nScale);
								oCurObj.current.x = nPosX;
								oCurObj.current.y = nPosY;
								$(oCurObj.div).css({ "left": nPosX + "px", "top": nPosY + "px" });
								break;
							}
							case "size":
							{
								var nW = parseInt(this.aTargets[i].nStartW + this.aTargets[i].nDistanceW * nScale);
								var nH = parseInt(this.aTargets[i].nStartH + this.aTargets[i].nDistanceH * nScale);
								oCurObj.current.w = nW;
								oCurObj.current.h = nH;
								$(oCurObj.div).css({ "width": nW + "px", "height": nH + "px" });
								if($(oCurObj.div).children("img").length==1)
								{
									$(oCurObj.div).children("img").css({ "width": nW + "px", "height": nH + "px" });
								}
								break;
							}
							case "rotate":
							{
								this.aTargets[i].nAngle = parseInt(this.aTargets[i].nStartAngle + this.aTargets[i].nDistance * nScale);
								oCurObj.current.nAngle = this.aTargets[i].nAngle;
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("rotate(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "rotate", sValue: this.aTargets[i].nAngle + "deg" });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "rotate", sValue: this.aTargets[i].nAngle + "deg" });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var oCSS = {};
									var sCSSPlainValue = "rotate(" + this.aTargets[i].nAngle + "deg)";
									oCSS[CL.sCSSPrefix + "transform"] = sCSSPlainValue;
									oCSS[CL.sCSSPrefix + "transform-origin"] = "50% 50%";
									oCSS["transform"] = sCSSPlainValue;
									oCSS["transform-origin"] = "50% 50%";
									$(oCurObj.div).css(oCSS);
								}
								break;
							}
							case "opacity":
							{
								this.aTargets[i].nOpacity = this.aTargets[i].nStartOpacity + this.aTargets[i].nDistance * nScale;
								oCurObj.current.nOpacity = this.aTargets[i].nOpacity;
								$(oCurObj.div).css({ "opacity": this.aTargets[i].nOpacity });
								break;
							}
							case "scale":
							{
								this.aTargets[i].nScaleX = this.aTargets[i].nStartScaleX + this.aTargets[i].nScaleDistanceX * nScale;
								this.aTargets[i].nScaleY = this.aTargets[i].nStartScaleY + this.aTargets[i].nScaleDistanceY * nScale;
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("scaleX(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleX", sValue: this.aTargets[i].nScaleX });
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "scaleY", sValue: this.aTargets[i].nScaleY });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleX", sValue: this.aTargets[i].nScaleX });
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "scaleY", sValue: this.aTargets[i].nScaleY });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var sCSSPlainValue = "scaleX(" + this.aTargets[i].nScaleX + ") scaleY(" + this.aTargets[i].nScaleY + ")";
									sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
									$(oCurObj.div).attr({ "style": sStyle });
								}
								break;
							}
							case "skew":
							{
								this.aTargets[i].nSkewX = this.aTargets[i].nStartSkewX + this.aTargets[i].nSkewDistanceX * nScale;
								this.aTargets[i].nSkewY = this.aTargets[i].nStartSkewY + this.aTargets[i].nSkewDistanceY * nScale;
								var sStyle = $(oCurObj.div).attr("style");
								if(sStyle.indexOf("transform")!=-1)
								{
									if(sStyle.indexOf("skewX(")!=-1)
									{
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewX", sValue: this.aTargets[i].nSkewX + "deg" });
										sStyle = CL.ReplaceTransform({ sStyle: sStyle, sProp: "skewY", sValue: this.aTargets[i].nSkewY + "deg" });
									}
									else
									{
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewX", sValue: this.aTargets[i].nSkewX + "deg" });
										sStyle = CL.AppendTransform({ sStyle: sStyle, sProp: "skewY", sValue: this.aTargets[i].nSkewY + "deg" });
									}
									$(oCurObj.div).attr({ "style": sStyle });
								}
								else
								{
									var sCSSPlainValue = "skewX(" + this.aTargets[i].nSkewX + "deg) skewY(" + this.aTargets[i].nSkewY + "deg)";
									sStyle += ";" + CL.sCSSPrefix + "transform:" + sCSSPlainValue + ";transform:" + sCSSPlainValue + ";" + CL.sCSSPrefix + "transform-origin:50% 50%;transform-origin:50% 50%;";
									$(oCurObj.div).attr({ "style": sStyle });
								}
								break;
							}
						}
					}
				}
				return this;
			}
			break;
		}
		case "WAIT": // legacy
		case "PAUSE": // tested, dynamic
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.nDuration = +oArgs.sDuration;
			}
			else
			{
				this.oParams.nDuration = +this.jxNode.attr("dur");
			}
			this.nStartTime = 0;
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(this.nStartTime==0)
				{
					// WaitStart
					this.nStartTime = (new Date()).valueOf();
					this.nEndTime = this.nStartTime + this.oParams.nDuration;
				}
				if((new Date()).valueOf() >= this.nEndTime)
				{
					//WaitDone
					this.nStartTime = 0;
					if(this.bProceed)
					{
						if(this.pNext!=null)
						{
							this.pNext.bDebug = this.bProceed;
						}
						else
						{
							CL.Debug.Update({ oAction: this, bFinal: true });
						}
					}
					return this.pNext;
				}
				// Waiting
				return this;
			}
			break;
		}
		case "WHILE": 
		{
			this.oParams.exprCondition = this.jxNode.attr("condition");
			this.oParams.bCheckBefore = (this.jxNode.attr("mode")=="before");
			this.oParams.iBreakAfter = +this.jxNode.attr("max");
			var jxChildren = this.jxNode.children();
			this.listActions = new List();
			for(var i=0; i<jxChildren.length; i++)
			{
				this.listActions.Append({ pElement: new Action({ xNode: jxChildren[i], sRespId: oArgs.sRespId, pParent: this }) });
			}
			this.nStartTime = 0;
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(this.nStartTime==0)
				{
					this.bBreak = false;
					this.nStartTime = (new Date()).valueOf();
					this.iCnt = 0;
					this.oCurrentAction = this.listActions.pFirst;
					if(this.oCurrentAction!=null)
					{
						this.oCurrentAction.bDebug = this.bProceed;
					}
				}
				if(this.oParams.bCheckBefore)
				{
					if(CL.Resp.EvalExpr({ sExpr: this.oParams.exprCondition, bBool: true }) && this.iCnt<this.oParams.iBreakAfter)
					{
						for (;;)
						{
							var oAction = this.oCurrentAction;
							if(oAction==null)
							{
								break;
							}
							this.oCurrentAction = oAction.Continue();
							if(this.bBreak==true)
							{
								break;
							}
							if(this.oCurrentAction!=null)
							{
								this.bProceed = this.oCurrentAction.bDebug;
							}
							if(this.oCurrentAction==oAction)
							{
								break;
							}
						}
						if(!this.bBreak)
						{
							if(this.oCurrentAction)
							{
								return this;
							}
							// Reset
							this.iCnt ++;
							if(this.iCnt<=this.oParams.iBreakAfter)
							{
								this.oCurrentAction = this.listActions.pFirst;
								return this;
							}
						}
					}
				}
				else
				{
					if(this.iCnt<this.oParams.iBreakAfter)
					{
						for (;;)
						{
							var oAction = this.oCurrentAction;
							if(oAction==null)
							{
								break;
							}
							this.oCurrentAction = oAction.Continue();
							if(this.bBreak==true)
							{
								break;
							}
							if(this.oCurrentAction!=null)
							{
								this.bProceed = this.oCurrentAction.bDebug;
							}
							if(this.oCurrentAction==oAction)
							{
								break;
							}
						}
						if(!this.bBreak)
						{
							if(this.oCurrentAction)
							{
								return this;
							}
							// Reset
							this.iCnt ++;
							if(CL.Resp.EvalExpr({ sExpr: this.oParams.exprCondition, bBool: true }) && this.iCnt<=this.oParams.iBreakAfter)
							{
								this.oCurrentAction = this.listActions.pFirst;
								return this;
							}
						}
					}
				}
				// Done
				this.nStartTime = 0;
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;				
			}
			break;
		}
		case "VARIABLE": // tested, dynamic
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.sName = oArgs.sName;
				this.oParams.exprValue = oArgs.sValue;
				this.oParams.bGlobal = oArgs.bGlobal;
			}
			else
			{
				this.oParams.sName = this.jxNode.attr("name");
				this.oParams.exprValue = this.jxNode.attr("value");
				this.oParams.bGlobal = (this.jxNode.attr("global")=="1");
			}
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(this.oParams.bGlobal)
				{
					CLV.oGlobal[this.oParams.sName] = CL.Resp.EvalExpr({ sExpr: this.oParams.exprValue });
				}
				else
				{
					CLV.oSlide[this.oParams.sName] = CL.Resp.EvalExpr({ sExpr: this.oParams.exprValue });
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				return this.pNext;
			}
			break;
		}
		case "ZINDEX": // tested, dynamic
		{
			if(oArgs.bDynamic==true)
			{
				this.oParams.sTargetId = oArgs.sTargetId;
				this.oParams.exprZ = oArgs.sZ;
				this.oParams.bAdd = oArgs.bAdd;
			}
			else
			{
				this.oParams.sTargetId = this.jxNode.attr("pid");
				this.oParams.exprZ = this.jxNode.attr("z");
				this.oParams.bAdd = (this.jxNode.attr("additive")=="sum");
			}
			this.Continue = function (oArgs)
			{
				if(this.bDebug)
				{
					CL.Debug.Break({ oAction: this });
					return this;
				}
				if(this.bProceed)
				{
					if(this.pNext!=null)
					{
						this.pNext.bDebug = this.bProceed;
					}
					else
					{
						CL.Debug.Update({ oAction: this, bFinal: true });
					}
				}
				var aTargetIds = [];
				if(CLO[this.oParams.sTargetId]==null)
				{
					var jxGroup = CL.jxGroups.find("group[id='" + this.oParams.sTargetId + "']");
					if(jxGroup.length!=0)
					{
						jxGroup.children("ref").each(function () { aTargetIds.push($(this).attr("id")) });
					}
				}
				else
				{
					aTargetIds.push(this.oParams.sTargetId);
				}
				if(aTargetIds.length==0)
				{
					return this.pNext;
				}
				var iEndZ = parseInt(CL.Resp.EvalExpr({ sExpr: this.oParams.exprZ, bNumeric: true }), 10);
				var oCurObj;
				var iZ;
				for(var i=0; i<aTargetIds.length; i++)
				{
					oCurObj = CLO[aTargetIds[i]];
					if(oCurObj==null) continue;
					iZ = iEndZ;
					if(this.oParams.bAdd)
					{
						iZ += oCurObj.current.nZ;
					}
					oCurObj.current.nZ = iZ;
					$(oCurObj.div).css({ "z-index": iZ });
				}
				return this.pNext;
			}
			break;
		}
	}
	return this;
}

window.CLBase = function (oArgs)
{
	this.xNode = oArgs.xNode;
	this.jxNode = $(oArgs.xNode);
	this.sId = this.xNode.getAttribute("id");
	this.bActive = false;
	return this;
}

window.CLSlide = function (oArgs)
{	// CLSlide constructor

	CLBase.call(this, oArgs);
	
	CLV.oSlide = {};
	var oThis = this;
	var sAdvance = this.xNode.getAttribute("advance");
	this.bStopAtTheEnd = (sAdvance=="wait" || sAdvance=="");
	var sTransition = this.xNode.getAttribute("transition");
	if(sTransition!=null && sTransition!="-1")
	{
		var sDurOut = this.xNode.getAttribute("durout");
		if(sDurOut!=null && sDurOut!="0")
		{
			this.nTranOut = +sTransition;
			this.nDurOut = +sDurOut;
		}
	}
	var jxOnload = this.jxNode.children("RESPONSE[event='onload']");
	if(jxOnload.length!=0) // onload
	{
		CL.Resp.Process({ jxResp: jxOnload });
	}
	var jxKeyEvents = this.jxNode.children("RESPONSE[event='onkeydown']");
	if(jxKeyEvents.length!=0)
	{
		this.jxKeyEvents = jxKeyEvents;
	}
	this.sSid = this.xNode.getAttribute("sid");
	this.sName = this.xNode.getAttribute("name");
	var sIndent = this.xNode.getAttribute("indent");
	this.iIndent = (sIndent==null) ? 0 : +sIndent;	
	this.sMasterId = this.xNode.getAttribute("masterid");
	this.jxFrames = this.jxNode.find("frames > frame");
	this.jxObjects = this.jxNode.find("object");
	this.aFrameIds = [];
	var sFrameId;
	CL.nLastZ = 1000;
	for(var i=0; i<this.jxFrames.length; i++)
	{
		sFrameId = this.jxFrames[i].getAttribute("id");
		if(CLF[sFrameId]==null)
		{
			CLF[sFrameId] = new CLFrame({ xNode: this.jxFrames[i], oParentSlide: this, bMaster: false });
			this.aFrameIds.push(sFrameId);
		}
	}
	var jxOncomplete = this.jxNode.children("RESPONSE[event='oncomplete']");
	if(jxOncomplete.length!=0) // oncomplete
	{
		CL.Resp.Process({ jxResp: jxOncomplete });
	}
	if(this.jxNode.find("mousepointers").length!=0) // cursors
	{
		CLP[this.sId] = new CLPointer({ jxSlide: this.jxNode, sSlideId: this.sId });
	}	
	return this;
}
CLSlide.prototype = Object.create(CLBase.prototype);
CLSlide.prototype.constructor = CLSlide;
{	// CLSlide methods
	CLSlide.prototype.Start = function (oArgs)
	{
		var oThis = this;
		CLZ.sCurrentSlideId = oThis.sId;
		if(!CL.SCO.IsVisited({ sBy: "slideid", sSlideId: oThis.sId }))
		{
			CLZ.aVisited.push(oThis.sId);
		}
		CL.SCO.ApplyRules();
		CLLMS.Save();
		CL.Event.Handle({ sEvtName: "EVENT_SLIDE_OPENED" });
		var jxDisplayStart = oThis.jxNode.children("RESPONSE[event='ondisplay']");
		if(jxDisplayStart.length!=0) // ondisplay
		{
			CL.Resp.Process({ jxResp: jxDisplayStart });
		}
		if(CLM[this.sMasterId].bVisible!=true)
		{
			CLM[this.sMasterId].Show();
		}
		this.bActive = true;
		if(oArgs!=null)
		{
			if(oArgs.sStartFrom!=null && oArgs.sStartFrom!="" && CLF[oArgs.sStartFrom]!=null && !CLF[oArgs.sStartFrom].bIsFirst)
			{
				CLF[this.aFrameIds[0]].Start({ bIgnoreTimeline: true });
				CL.Modal();
				CL.Navigation.GoTo({ sTargetType: "frame", sTargetId: oArgs.sStartFrom });
			}
			else
			{
				CLF[this.aFrameIds[0]].Start();
			}
		}
		else
		{
			CLF[this.aFrameIds[0]].Start();
		}
		return this;
	}
	CLSlide.prototype.Show = function (oArgs)
	{
		var oThis = this;
		return this;
	}	
	CLSlide.prototype.Hide = function (oArgs)
	{
		$(this.jxFrames).each(function ()
		{
			CLF[$(this).attr("id")].Hide();
		});
		this.bActive = false;
		var jxDisplayEnd = this.jxNode.children("RESPONSE[event='onhide']");
		if(jxDisplayEnd.length!=0) // onhide
		{
			CL.Resp.Process({ jxResp: jxDisplayEnd });
		}
		return this;
	}
	CLSlide.prototype.Destroy = function (oArgs)
	{
		// kill frames, actionboxes, event handlers
		var oThis = this;
		var sSlideId = oThis.sId;
		CL.Event.Fire({ sEvtName: "BeforeDestroy", sSourceType: "SLIDE", sSourceId: sSlideId });
		$(oThis.jxFrames).each(function ()
		{
			CLF[$(this).attr("id")].Destroy();
		});
		if(CLP[oThis.sId]!=null)
		{
			CLP[oThis.sId].Hide();
			delete CLP[oThis.sId];
		}
		delete CLS[oThis.sId];
		CL.Event.Fire({ sEvtName: "AfterDestroy", sSourceType: "SLIDE", sSourceId: sSlideId });
		CL.Event.Unsubscribe({ sSrcId: oThis.sId });
		return null;
	}
	CLSlide.prototype.GetNumber = function (oArgs)
	{
		for(var i=0; i<CL.axSlides.length; i++)
		{
			if($(CL.axSlides[i]).attr("id")==this.sId)
			{
				return (i+1);
			}
		}
		return 0;
	}
}

window.CLFrame = function (oArgs)
{	// CLFrame constructor
	CLBase.call(this, oArgs);

	this.oParentSlide = oArgs.oParentSlide;
	this.bMaster = (this.oParentSlide instanceof CLMaster);
	this.bStarted = false;
	this.iFramesTotal = this.oParentSlide.jxFrames.length;
	this.iIndex = this.oParentSlide.jxFrames.index(this.jxNode);
	this.bIsFirst = (this.iIndex==0);
	this.bIsLast = (this.iIndex==this.iFramesTotal-1);
	this.oListenObjectEvents = {};
	if(this.iFramesTotal>1)
	{
		if(!this.bIsLast)
		{
			this.sNextFrameId = $(this.oParentSlide.jxFrames[this.iIndex+1]).attr("id");
		}
		if(!this.bIsFirst)
		{
			this.sPrevFrameId = $(this.oParentSlide.jxFrames[this.iIndex-1]).attr("id");
		}
	}
	var jxOnload = this.jxNode.children("RESPONSE[event='onload']");
	if(jxOnload.length!=0) // onload
	{
		CL.Resp.Process({ jxResp: jxOnload });
	}
	var jxKeyEvents = this.jxNode.children("RESPONSE[event='onkeydown']");
	if(jxKeyEvents.length!=0)
	{
		this.jxKeyEvents = jxKeyEvents;
	}
	if(!this.bMaster) // timeline
	{
		this.bStopAtTheEnd = (this.xNode.getAttribute("infinite")=="1");
		this.iDuration = 0;
		if(this.xNode.getAttribute("dur")!=null)
		{
			this.iDuration = +this.xNode.getAttribute("dur");
		}
		//if(this.iDuration!=0)
		{
			CLT[this.sId] = new CLTimeline({ xNode: oArgs.xNode, iDuration: this.iDuration });
			this.oTimeline = CLT[this.sId];
		}
	}
	
	var jxInteractiveObjects = this.jxNode.find("object[type='v_q_0000'], object[type='v_q_0002']");
	if(jxInteractiveObjects.length!=0)
	{
		var jxObjParent = $(jxInteractiveObjects[0]).parent();
		for(var i=0; i<jxInteractiveObjects.length; i++)
		{
			$(jxInteractiveObjects[i]).appendTo(jxObjParent);
		}
	}
	var sObjectId;
	this.jxObjects = this.jxNode.children("object");
	for(var i=0; i<this.jxObjects.length; i++) // create objects
	{
		sObjectId = this.jxObjects[i].getAttribute("id");
		if(CLO[sObjectId]==null)
		{
			CLO[sObjectId] = new CLObject({ xNode: this.jxObjects[i], oAppendTo: CL.oBoard, oParentSlide: this.oParentSlide, oParentFrame: this, sSlideId: this.oParentSlide.sId, sFrameId: this.sId, bMaster: this.bMaster });
			CLO[sObjectId].Render(); // Call Render after creating object to proceed with Constructor
		}
	}
	var jxOncomplete = this.jxNode.children("RESPONSE[event='oncomplete']");
	if(jxOncomplete.length!=0) // oncomplete
	{
		CL.Resp.Process({ jxResp: jxOncomplete });
	}
	return this;
};
CLFrame.prototype = Object.create(CLBase.prototype);
CLFrame.prototype.constructor = CLFrame;
{	// CLFrame methods
	CLFrame.prototype.Start = function (oArgs)
	{
		var oThis = this;
		var bIgnoreTimeline = (oArgs!=null && oArgs.bIgnoreTimeline==true);
		if(CLZ.sCurrentFrameId!=null && CLF[CLZ.sCurrentFrameId]!=null)
		{
			CLF[CLZ.sCurrentFrameId].Hide();
			CL.Resp.RemoveFrameThreads();
		}
		CLZ.sCurrentFrameId = oThis.sId; 
		CL.Event.Handle({ sEvtName: "EVENT_FRAME_OPENED" });
		var jxDisplayStart = oThis.jxNode.children("RESPONSE[event='ondisplay']");
		if(jxDisplayStart.length!=0) // ondisplay
		{
			CL.Resp.Process({ jxResp: jxDisplayStart });
		}
		oThis.Show();
		CL.Event.Handle({ sEvtName: "EVENT_FRAME_START_DISPLAY" });
		if(oThis.oTimeline!=null && !bIgnoreTimeline)
		{
			oThis.oTimeline.Start();
		}
		else
		{
			CL.Event.Handle({ sEvtName: "EVENT_FRAME_COMPLETE" });
			if(oThis.bIsLast)
			{
				CL.Event.Handle({ sEvtName: "EVENT_SLIDE_COMPLETE" });
			}
		}
		var jxAfterDisplay = oThis.jxNode.children("RESPONSE[event='onafterdisplay']");
		if(jxAfterDisplay.length!=0)
		{
			CL.Resp.Process({ jxResp: jxAfterDisplay });
		}
		if(oThis.bIsLast)
		{
			var jxSlideAfterDisplay = oThis.oParentSlide.jxNode.children("RESPONSE[event='onafterdisplay']");
			if(jxSlideAfterDisplay.length!=0)
			{
				CL.Resp.Process({ jxResp: jxSlideAfterDisplay });
			}
			if(oThis.iDuration==0 && !oThis.bStopAtTheEnd)
			{
				if(!oThis.oParentSlide.bStopAtTheEnd)
				{
					CL.Navigation.GoTo({ sTargetType: "slide", sTargetDir: "next" });
				}
			}
		}
		else
		{
			if(oThis.iDuration==0 && !oThis.bStopAtTheEnd)
			{
				if(oThis.sNextFrameId!=null)
				{
					CL.Navigation.GoTo({ sTargetType: "frame", sTargetId: oThis.sNextFrameId });
				}
			}
		}
		return oThis;
	}
	CLFrame.prototype.Show = function (oArgs)
	{
		var oThis = this;
		var sObjectId;
		oThis.bActive = true;
		if(oArgs!=null && oArgs.bMaster==true)
		{
			for(var i=0; i<oThis.jxObjects.length; i++)
			{
				sObjectId = $(oThis.jxObjects[i]).attr("id");
				CLO[sObjectId].Show({ bMaster: true });
			}
		}
		else
		{
			CLZ.sCurrentFrameId = oThis.sId;
			for(var i=0; i<oThis.jxObjects.length; i++)
			{
				sObjectId = $(oThis.jxObjects[i]).attr("id");
				if(CLO[sObjectId].iBegin==0 && CLO[sObjectId].display!="none")
				{
					CLO[sObjectId].Show();
				}
			}
			
		} 
		return oThis;
	}
	CLFrame.prototype.Hide = function (oArgs)
	{
		var oThis = this;
		oThis.bStarted = false;
		if(oThis.oTimeline!=null)
		{
			oThis.oTimeline.Pause();
		}
		var sObjectId;
		if(oArgs!=null && oArgs.bMaster==true)
		{
			for(var i=0; i<oThis.jxObjects.length; i++)
			{
				sObjectId = $(oThis.jxObjects[i]).attr("id");
				CLO[sObjectId].Hide({ bMaster: true });
			}
		}
		else
		{
			for(var i=0; i<oThis.jxObjects.length; i++)
			{
				sObjectId = $(oThis.jxObjects[i]).attr("id");
				if(CLO[sObjectId].display!="slide")
				{
					CLO[sObjectId].Hide(oArgs);
				}
			}
			// Hide foreign objects if any
			$(CL.oBoard).children("div:visible").each(function ()
			{
				var sFrameId = $(this).attr("data-frame-id");
				if(sFrameId!=null)
				{
					if(sFrameId!=oThis.sId)
					{
						var sSlideId = $(this).attr("data-slide-id");
						var sId = $(this).attr("id");
						if(sSlideId==oThis.oParentSlide.sId)
						{
							if(CLO[sId].display!="slide")
							{
								CLO[sId].Hide(oArgs);
							}
						}
						else if(CLM[sSlideId]==null) // not master obbject
						{
							CLO[sId].Hide(oArgs);
						}
					}
				}
			});
		}
		if(CLP[oThis.sId]!=null)
		{
			CLP[oThis.sId].Hide();
		}
		oThis.bActive = false;
		var jxDisplayEnd = oThis.jxNode.children("RESPONSE[event='onhide']");
		if(jxDisplayEnd.length!=0) // onhide
		{
			CL.Resp.Process({ jxResp: jxDisplayEnd });
		}
		return oThis;
	}
	CLFrame.prototype.Destroy = function (oArgs)
	{
		// kill objects, timelines, actionboxes
		var oThis = this;
		var sFrameId = oThis.sId;
		CL.Event.Fire({ sEvtName: "BeforeDestroy", sSourceType: "FRAME", sSourceId: sFrameId });
		if(oThis.oTimeline!=null)
		{
			clearTimeout(CLT[sFrameId].iTimerId);
			delete CLT[sFrameId];
		}
		$(oThis.jxObjects).each(function ()
		{
			CLO[$(this).attr("id")].Destroy();
		});
		delete CLF[oThis.sId];
		CL.Event.Fire({ sEvtName: "AfterDestroy", sSourceType: "FRAME", sSourceId: sFrameId });
		CL.Event.Unsubscribe({ sSrcId: oThis.sId });
		return null;
	}
	CLFrame.prototype.AddListener =  function (oArgs)
	{
		// sListenerId, sSourceId, sEvtName, (sMethod), (iExec)
		var oThis = this;
		if(oThis.oListenObjectEvents[oArgs.sSourceId]==null)
		{
			oThis.oListenObjectEvents[oArgs.sSourceId] = {};
		}
		if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName]==null)
		{
			oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName] = {};
		}
		if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId]==null)
		{
			oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId] = {};
		}
		if(oArgs.sMethod==null || oArgs.sMethod=="")
		{
			oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId].ListenEvt = (oArgs.iExec || -1);
		}
		else if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId][oArgs.sMethod]==null)
		{
			oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId][oArgs.sMethod] = (oArgs.iExec || -1);
		}
		return oThis;
	}
	CLFrame.prototype.RemoveListener =  function (oArgs)
	{
		// sListenerId, sSourceId, sEvtName, (sMethod)
		var oThis = this;
		if(oThis.oListenObjectEvents[oArgs.sSourceId]!=null)
		{
			if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName]!=null)
			{
				if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId]!=null)
				{
					if(oArgs.sMethod==null)
					{
						if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId].ListenEvt!=null)
						{
							delete oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId].ListenEvt;
						}
					}
					else
					{
						if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId][oArgs.sMethod]!=null)
						{
							delete oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][oArgs.sListenerId][oArgs.sMethod];
						}
					}
				}
			}
		}
		return oThis;
	};
	CLFrame.prototype.HandleListeners = function (oArgs)
	{
		//  sSourceId, sEvtName 
		var oThis = this;
		if(oThis.oListenObjectEvents!=null)
		{
			if(oThis.oListenObjectEvents[oArgs.sSourceId]!=null)
			{
				if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName]!=null)
				{
					for(var sListenerId in oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName])
					{
						if(CLO[sListenerId]!=null)
						{
							for(var sMethodName in oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][sListenerId])
							{
								if(CLO[sListenerId].oMethods[sMethodName]!=null)
								{
									CLO[sListenerId].CallMethod({ sMethod: sMethodName, oMethodArgs: { sSourceId: oArgs.sSourceId, sEvtName: oArgs.sEvtName } });
									if(oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][sListenerId][sMethodName]!=-1)
									{
										if(--oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][sListenerId][sMethodName]==0)
										{
											delete oThis.oListenObjectEvents[oArgs.sSourceId][oArgs.sEvtName][sListenerId][sMethodName];
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return oThis;
	}
}

window.CLMaster = function (oArgs)
{	// CLMaster constructor
	CLBase.call(this, oArgs);

	this.sSid = this.xNode.getAttribute("sid");
	this.jxFrames = this.jxNode.find("frames > frame:first");
	this.jxObjects = this.jxNode.find("object");
	this.bVisible = null;
	CL.nLastZ = 0;
	var sFrameId;
	for(var i=0; i<this.jxFrames.length; i++)
	{
		sFrameId = this.jxFrames[i].getAttribute("id");
		if(CLF[sFrameId]==null)
		{
			CLF[sFrameId] = new CLFrame({ xNode: this.jxFrames[i], oParentSlide: this, bMaster: true }).Hide();
		}
	}
	return this;
};
CLMaster.prototype = Object.create(CLBase.prototype);
CLMaster.prototype.constructor = CLMaster;
{	// CLMaster methods
	CLMaster.prototype.Show = function (oArgs)
	{
		var oThis = this;
		if(oThis.bVisible)
		{
			return oThis;
		}
		for(var sKey in CLM)
		{
			if(CLM[sKey].bVisible)
			{
				CLM[sKey].Hide({ bMaster: true });
			}
		}
		$(oThis.jxFrames).each(function ()
		{
			CLF[$(this).attr("id")].Show({ bMaster: true });
		});
		oThis.bVisible = true;
		return oThis;
	};	
	CLMaster.prototype.Hide = function (oArgs)
	{
		var oThis = this;
		$(oThis.jxFrames).each(function ()
		{
			CLF[$(this).attr("id")].Hide({ bMaster: true });
		});
		oThis.bVisible = false;
		return oThis;
	};
	CLMaster.prototype.Destroy = function (oArgs)
	{
		var oThis = this;
		$(oThis.jxFrames).each(function ()
		{
			CLF[$(this).attr("id")].Destroy();
		});
		delete CLM[oThis.sId];
		return null;
	};
}

window.CLObject = function (oArgs)
{	// CLObject constructor
	var oThis = this;
	CLBase.call(this, oArgs);
	CL.Event.Fire({ aEvents:
	[
		{ bRT: true, sEvtName: "EVENT_OBJECT_BEFORE_INIT", sSourceId: this.sId },
		{ sEvtName: "onbeforeinit", sSourceType: "OBJECT", sSourceId: this.sId }
	]});
	this.sSlideId = (oArgs.sSlideId==null) ? this.jxNode.parents("slide:first").attr("id") : oArgs.sSlideId;
	this.sFrameId = (oArgs.sFrameId==null) ? this.jxNode.parents("frame:first").attr("id") : oArgs.sFrameId;
	this.jxParams = CL.jxParams.find("param[objectid='" + this.sId + "']");
	var sSoundSrc = this.xNode.getAttribute("soundsrc");
	if(sSoundSrc!=null)
	{
		if(sSoundSrc!="")
		{
			this.bSound = true;
			this.sSoundSrc = sSoundSrc;
			this.bAutoStart = (this.xNode.getAttribute("play")=="1");
		}
		else
		{
			this.bSound = false;
		}
	}
	else
	{
		this.bSound = false;
	}
	this.parent = oArgs.oAppendTo;
	var sType = this.xNode.getAttribute("type");
	this.sType = (sType==null) ? (this.xNode.getAttribute("nodiv")=="yes" ? "SHAPE" : "BASIC") : sType;
	this.initial =
	{
		x: +this.xNode.getAttribute("x"),
		y: +this.xNode.getAttribute("y"),
		w: +this.xNode.getAttribute("w"),
		h: +this.xNode.getAttribute("h"),
		nZ: CL.nLastZ++, //+this.xNode.getAttribute("z"), postincrement value
		nAngle: (this.xNode.getAttribute("rotation")==null) ? 0 : parseInt(this.xNode.getAttribute("rotation"),10),
		nOpacity: (this.xNode.getAttribute("alpha")==null) ? 1 : (parseInt(this.xNode.getAttribute("alpha"), 10)/100),
		nScaleX: 1,
		nScaleY: 1,
		nSkewX: 0,
		nSkewY: 0,
		bDraggable: (this.xNode.getAttribute("draggable")=="1")
	};
	this.current = JSON.parse(JSON.stringify(this.initial));
	this.display = this.xNode.getAttribute("display");
	this.iBegin = 0;
	var sBegin = this.xNode.getAttribute("begin");
	this.iBegin = ((sBegin!=null && sBegin!="") ? +sBegin : 0);
	var sTranIn = this.xNode.getAttribute("tranin");
	var sTranOut = this.xNode.getAttribute("tranout");
	this.tranin = (sTranIn!=null) ? { transition: +sTranIn, duration: +this.xNode.getAttribute("durin") } : null;
	this.tranout = (sTranOut!=null) ? { transition: +sTranOut, duration: +this.xNode.getAttribute("durout") } : null;
	
	this.oMethods = {};
	this.events = {};
	this.data = {};
	
	if(this.sType!=null && this.sType!="BASIC" && this.sType!="SHAPE")
	{
		// search for methods
		if(CL.oMethods[this.sType]==null)
		{
			var jxMethods = CL.jxMethods.children("method[type='" + this.sType + "']");
			if(jxMethods.length > 0)
			{
				CL.oMethods[this.sType] = {};
				var sBody = "";
				var iBegin = -1;
				var iEnd = -1;
				for(var i=0; i<jxMethods.length; i++)
				{
					sBody = $(jxMethods[i]).text();
					iBegin = sBody.indexOf("{");
					iEnd = sBody.lastIndexOf("}");
					if(iBegin>0 && iEnd>0 && iBegin<iEnd)
					{
						sBody = sBody.substring(iBegin+1, iEnd);
						try
						{
							CL.oMethods[this.sType][$(jxMethods[i]).attr("name")] = new Function("argobj", sBody);
						}
						catch(e)
						{
							//debugger
						}
					}
				}
			}
		}
		if(CL.oMethods[this.sType]!=null)
		{
			for(var sMethod in CL.oMethods[this.sType])
			{
				this.oMethods[sMethod] = CL.oMethods[this.sType][sMethod];
			}
		}
	};
	
	var jData = this.jxNode.children("data");
	if(jData.length==0)
	{
		jData = this.jxNode.find("ffdata");
	}
	this.div = $(document.createElement("div")).attr(
	{
		"id": this.sId,
		"data-slide-id": this.sSlideId,
		"data-frame-id": (this.sFrameId==null ? "" : this.sFrameId)
	}
	).css(
	{
		"left": this.initial.x + "px",
		"top": this.initial.y + "px",
		"width": this.initial.w + "px",
		"height": this.initial.h + "px",
		"z-index": this.initial.nZ,
		"visibility": "hidden",
		"display": "block"
	}
	).addClass("cl-object clo-" + this.sType).appendTo($(this.parent));
	this.jEvtWrapper = $(document.createElement("div")).addClass("cl-evt-wrapper").appendTo(this.div);
	var sState = "default";
	var sStateId = this.sId + "_default";
	this.oStates =
	{
		"default":
		{
			sId: sStateId,
			jxParams: this.jxParams,
			tranin: this.tranin,
			tranout: this.tranout
		}
	};
	this.oStates[sState].initial = (JSON.parse(JSON.stringify(this.initial)));
	this.oStates[sState].current = (JSON.parse(JSON.stringify(this.current)));
	this.oStates[sState].jxParams = this.jxParams; 
	this.oStates[sState].div = $(document.createElement("div")).attr(
	{
		"id": sStateId,
		"data-state": sState,
		"data-left": this.initial.x + "px",
		"data-top": this.initial.y + "px",
		"data-width": this.initial.w + "px",
		"data-height": this.initial.h + "px",
		"data-z-index": this.initial.nZ
	}
	).addClass("cl-state").css(
	{
		"visibility": "visible",
		"display": "block"
	}
	).html(jData.text()).appendTo(this.jEvtWrapper);
	var jCSSStorage = $(this.oStates[sState].div).find(".style-custom");
	if(jCSSStorage.length!=0)
	{
		var sIE9 = jCSSStorage[0].getAttribute("data-ie9");
		if(sIE9==null || (sIE9!=null && navigator.userAgent.toLowerCase().indexOf("msie 9")!=-1))
		{
			var jCustomStyles = jCSSStorage.children(".rule");
			if(jCustomStyles.length>0)
			{
				CL.CSS.Parse({ jRules: jCustomStyles, sOldId: this.sId, sNewId: sStateId });
				jCSSStorage.remove();
			}
		}
	}
	this.sCurrentState = sState;
	this.sPreviousState = sState;
	this.sPreviousStableState = "DEFAULT";
	this.sCurrentStableState = "DEFAULT";
	var jEvtSrc;
	if(this.sType!="BASIC" && this.sType!="SHAPE")
	{
		jEvtSrc = $(this.oStates[sState].div).children(".cl-wrapper");
	}
	else if(this.sType=="BASIC")
	{
		if(this.jxNode.attr("preload")!=null)
		{
			jEvtSrc = $(this.oStates[sState].div).children("img:first");
		}
		else
		{
			jEvtSrc = $(this.oStates[sState].div).children("div:first");
		}
	}
	else if(this.sType=="SHAPE")
	{
		jEvtSrc = $(this.oStates[sState].div).children("img:first");
	}
	for(var i=0; i<CLD.aMouseEvents.length; i++)
	{
		if(jEvtSrc.attr(CLD.aMouseEvents[i])!=null)
		{
			this.jEvtWrapper.attr(CLD.aMouseEvents[i], jEvtSrc.attr(CLD.aMouseEvents[i]));
			jEvtSrc.attr(CLD.aMouseEvents[i], "").removeAttr(CLD.aMouseEvents[i]); // IE11 does not delete handler until it is re-written
		}
	}
	
	var jxStates = this.jxNode.children("state");
	if(jxStates!=0 && this.sType!="basic_shape")
	{
		if(CL.bTouch)
		{
			this.jEvtWrapper.on(
			{
				"touchstart": function (e) { oThis.UIStateEvent({ oEvt: e }) },
				"touchend": function (e) { oThis.UIStateEvent({ oEvt: e }) }
			});
		}
		else
		{
			this.jEvtWrapper.on(
			{
				"mouseover": function (e) { oThis.UIStateEvent({ oEvt: e }) },
				"mouseout": function (e) { oThis.UIStateEvent({ oEvt: e }) },
				"mousedown": function (e) { oThis.UIStateEvent({ oEvt: e }) },
				"mouseup": function (e) { oThis.UIStateEvent({ oEvt: e }) }
			});
		}
	}
	for(var i=0; i<jxStates.length; i++)
	{
		sState = jxStates[i].getAttribute("type");
		sStateId = this.sId + "_" + sState;
		this.oStates[sState] =
		{
			sId: sStateId,
			bDisabled: false,
			initial:
			{
				x: +jxStates[i].getAttribute("x"),
				y: +jxStates[i].getAttribute("y"),
				w: +jxStates[i].getAttribute("w"),
				h: +jxStates[i].getAttribute("h"),
				nZ: this.initial.nZ,
				nAngle: (jxStates[i].getAttribute("rotation")==null) ? 0 : (parseInt(jxStates[i].getAttribute("rotation"),10) - this.initial.nAngle),
				nOpacity: (jxStates[i].getAttribute("alpha")==null) ? 1 : (parseInt(jxStates[i].getAttribute("alpha"), 10)/100),
				nScaleX: 1,
				nScaleY: 1,
				nSkewX: 0,
				nSkewY: 0,
				bDraggable: (jxStates[i].getAttribute("draggable")=="1")
			}
		};
		this.oStates[sState].current = (JSON.parse(JSON.stringify(this.oStates[sState].initial)));
		this.oStates[sState].jxParams = this.jxParams.children("state[type='" + sState + "']");
		this.oStates[sState].tranin = (jxStates[i].getAttribute("tranin")!=null) ? { transition: +jxStates[i].getAttribute("tranin"), duration: +jxStates[i].getAttribute("durin") } : null;
		this.oStates[sState].tranout = (jxStates[i].getAttribute("tranout")!=null) ? { transition: +jxStates[i].getAttribute("tranout"), duration: +jxStates[i].getAttribute("durout") } : null;
		jData = $(jxStates[i]).children("data");
		if(jData.length==0)
		{
			jData = $(jxStates[i]).children("ffdata");
		}
		this.oStates[sState].div = $(document.createElement("div")).attr(
		{
			"id": sStateId,
			"data-state": sState,
			"data-left": this.oStates[sState].initial.x + "px",
			"data-top": this.oStates[sState].initial.y + "px",
			"data-width": this.oStates[sState].initial.w + "px",
			"data-height": this.oStates[sState].initial.h + "px",
			"data-z-index": this.oStates[sState].initial.nZ
			}
		).addClass("cl-state").css(
		{
			"visibility": "hidden",
			"display": "block"
		}
		).html(jData.text()).appendTo(this.jEvtWrapper);
		if((sState=="highlighted" || sState=="selected" || sState=="selected_over") && this.sType!="basic_shape")
		{
			this.oStates[sState].div.addClass("unselectable").css({ "cursor": "pointer" });
		}
		jCSSStorage = $(this.oStates[sState].div).find(".style-custom");
		if(jCSSStorage.length!=0)
		{
			var sIE9 = jCSSStorage[0].getAttribute("data-ie9");
			if(sIE9==null || (sIE9!=null && navigator.userAgent.toLowerCase().indexOf("msie 9")!=-1))
			{
				var jCustomStyles = jCSSStorage.children(".rule");
				if(jCustomStyles.length>0)
				{
					CL.CSS.Parse({ jRules: jCustomStyles, sOldId: this.sId, sNewId: sStateId });
					jCSSStorage.remove();
				}
			}
		}
		this.RenderState({ sState: sState });
	}
	this.ApplyState({ sState: "default" });
	CL.Event.Fire({ aEvents:
	[
		{ bRT: true, sEvtName: "EVENT_OBJECT_AFTER_INIT", sSourceId: this.sId },
		{ sEvtName: "onafterinit", sSourceType: "OBJECT", sSourceId: this.sId }
	]});
	return this;
};
CLObject.prototype = Object.create(CLBase.prototype);
CLObject.prototype.constructor = CLObject;
{	// CLObject methods
	CLObject.prototype.UIStateEvent = function (oArgs)
	{
		var oThis = this;
		var bPropagate = true;
		if(oArgs!=null)
		{
			if(oArgs.oEvt!=null)
			{
				bPropagate = !(oArgs.bPropagate==false);
				if(!oThis.oStates[oThis.sCurrentState].bDisabled)
				{
					switch(oArgs.oEvt.type)
					{
						case "touchstart":
						{
							break;
						}
						case "touchend":
						{
							break;
						}
						case "mouseover":
						{
							if(oThis.sCurrentState=="default" && oThis.oStates["highlighted"]!=null)
							{
								oThis.SetState({ sState: "highlighted" });
							}
							else if(oThis.sCurrentState=="selected" && oThis.oStates["selected_over"]!=null)
							{
								oThis.SetState({ sState: "selected_over" });
							}
							break;
						}
						case "mouseout":
						{
							if(oThis.sCurrentState=="highlighted")
							{
								oThis.SetState({ sState: "default" });
							}
							else if(oThis.sCurrentState=="selected_over" && oThis.oStates["selected"]!=null)
							{
								oThis.SetState({ sState: "selected" });
							}
							break;
						}
						case "mousedown":
						{
							if(oThis.sCurrentStableState=="DEFAULT")
							{
								if(oThis.oStates["active"]!=null)
								{
									oThis.SetState({ sState: "active" });
								}
							}
							break;
						}
						case "mouseup":
						{
							if(oThis.sCurrentStableState=="DEFAULT")
							{
								if(oThis.oStates["selected"]!=null)
								{
									oThis.SetState({ sState: "selected" });
								}
							}
							else if(oThis.sCurrentStableState=="SELECTED")
							{
								oThis.SetState({ sState: "default" });
							}
							break;
						}
					}
				}
			}
		}
		return bPropagate;
	};
	CLObject.prototype.SetState = function (oArgs)
	{
		var oThis = this;
		if(oThis.oStates[oArgs.sState]!=null)
		{ 
			if(oThis.sCurrentState==oArgs.sState)
			{
				return oThis;
			}
			if(oThis.oStates[oArgs.sState].bDisabled==true)
			{
				return oThis;
			}
			var jContainer = $(oThis.div);
			if(jContainer.length==0)
			{
				return oThis;
			}
			var jOldState = jContainer.find(".cl-state[data-state='" + oThis.sCurrentState + "']");
			var jNewState = jContainer.find(".cl-state[data-state='" + oArgs.sState + "']");
			if(jOldState.length==0 || jNewState.length==0)
			{
				return oThis;
			}
			oThis.oStates[oThis.sCurrentState].initial = (JSON.parse(JSON.stringify(oThis.initial)));
			oThis.oStates[oThis.sCurrentState].current = (JSON.parse(JSON.stringify(oThis.current)));
			oThis.initial = (JSON.parse(JSON.stringify(oThis.oStates[oArgs.sState].initial)));
			oThis.current = (JSON.parse(JSON.stringify(oThis.oStates[oArgs.sState].current)));
			this.ApplyState(oArgs);
			jOldState.hide();
			jNewState.css({ "visibility": "visible" }).show();
			oThis.sPreviousState = oThis.sCurrentState;
			_stateswitch:
			switch(oThis.sCurrentStableState)
			{
				case "DEFAULT":
				{
					switch(oArgs.sState)
					{
						case "selected":
						case "selected_over":
						{
							oThis.sPreviousStableState = "DEFAULT";
							oThis.sCurrentStableState = "SELECTED";
							break;
						}
						case "disabled":
						{
							oThis.sPreviousStableState = "DEFAULT";
							oThis.sCurrentStableState = "DISABLED";
							break;
						}
						default:
						{
							break _stateswitch;
						}
					}
					CL.Event.Fire({ aEvents:
					[
						{ bRT: true, sEvtName: "EVENT_STABLE_STATE_CHANGED", sSourceId: oThis.sId },
						{ sEvtName: "onChangeStableState", sSourceType: "OBJECT", sSourceId: oThis.sId }
					]});
					break;
				}
				case "SELECTED":
				{
					switch(oArgs.sState)
					{
						case "default":
						case "highlighted":
						case "active":
						{
							oThis.sPreviousStableState = "SELECTED";
							oThis.sCurrentStableState = "DEFAULT";
							break;
						}
						case "disabled":
						{
							oThis.sPreviousStableState = "SELECTED";
							oThis.sCurrentStableState = "DISABLED";
							break;
						}
						default:
						{
							break _stateswitch;
						}
					}
					CL.Event.Fire({ aEvents:
					[
						{ bRT: true, sEvtName: "EVENT_STABLE_STATE_CHANGED", sSourceId: oThis.sId },
						{ sEvtName: "onChangeStableState", sSourceType: "OBJECT", sSourceId: oThis.sId }
					]});
					break;
				}
				case "DISABLED":
				{
					switch(oArgs.sState)
					{
						case "default":
						case "highlighted":
						case "active":
						{
							oThis.sPreviousStableState = "DISABLED";
							oThis.sCurrentStableState = "DEFAULT";
							break;
						}
						case "selected":
						case "selected_over":
						{
							oThis.sPreviousStableState = "DISABLED";
							oThis.sCurrentStableState = "SELECTED";
							break;
						}
						default:
						{
							break _stateswitch;
						}
					}
					CL.Event.Fire({ aEvents:
					[
						{ bRT: true, sEvtName: "EVENT_STABLE_STATE_CHANGED", sSourceId: oThis.sId },
						{ sEvtName: "onChangeStableState", sSourceType: "OBJECT", sSourceId: oThis.sId }
					]});
					break;
				}
			}
			oThis.sCurrentState = oArgs.sState;
			CL.Event.Fire({ aEvents:
			[
				{ bRT: true, sEvtName: "EVENT_STATE_CHANGED", sSourceId: oThis.sId },
				{ sEvtName: "onChangeState", sSourceType: "OBJECT", sSourceId: oThis.sId }
			]});
		}
		return oThis;
	};
	CLObject.prototype.EnableState = function (oArgs)
	{
		var oThis = this;
		if(oThis.oStates[oArgs.sState]!=null)
		{
			oThis.oStates[oArgs.sState].bDisabled = false;
			$(oThis.oStates[oArgs.sState].div).find("div, img, td, button, svg, path").each(function ()
			{
				if(this.getAttribute("cl-pointer-disabled")!=null)
				{
					var sNodeName = this.nodeName.toLowerCase();
					if(sNodeName=="svg" || sNodeName=="path")
					{ 
						var sStyle = this.getAttribute("style");
						var aStyles = sStyle.split("default");
						this.setAttribute("style", aStyles.join("pointer"));
					}
					else
					{
						$(this).css({ "cursor": "pointer" });
					}
					this.removeAttribute("cl-pointer-disabled");
				}
			});
		}
		return oThis;
	};
	CLObject.prototype.DisableState = function (oArgs)
	{
		var oThis = this;
		if(oThis.oStates[oArgs.sState]!=null)
		{
			oThis.oStates[oArgs.sState].bDisabled = true;
			$(oThis.oStates[oArgs.sState].div).find("div, img, td, button, svg, path").each(function ()
			{
				if($(this).css("cursor")=="pointer")
				{
					this.setAttribute("cl-pointer-disabled", "1");
					var sNodeName = this.nodeName.toLowerCase();
					if(sNodeName=="svg" || sNodeName=="path")
					{ 
						var sStyle = this.getAttribute("style");
						var aStyles = sStyle.split("pointer");
						this.setAttribute("style", aStyles.join("default"));
					}
					else
					{
						$(this).css({ "pointer": "default" });
					}
				}
			});
		}
		return oThis;
	};
	CLObject.prototype.ApplyState = function (oArgs)
	{
		var oThis = this;
		var oState = oThis.oStates[oArgs.sState];
		var jDiv = $(oThis.div);
		jDiv.css({ "left": oState.current.x + "px", "top": oState.current.y + "px", "width": oState.current.w + "px", "height": oState.current.g + "px" });
		return oThis;
	};
	CLObject.prototype.CallMethod = function (oArgs)
	{
		if(oArgs==null) return null;
		var returnValue = null;
		if(oArgs.method!=null && oArgs.sMethod==null)
		{
			oArgs.sMethod = oArgs.method;
		}
		if(oArgs.args!=null && oArgs.oMethodArgs==null)
		{
			oArgs.oMethodArgs = {};
			for(var sKey in oArgs.args)
			{
				oArgs.oMethodArgs[sKey] = oArgs.args[sKey];
			}
		}
		var oThis = (!(this instanceof CLObject) && oArgs.pid!=null) ? CLO[oArgs.pid] : this;
		if(oThis==null)
		{
			if(CL.bDebug) alert("CL CallMethod:\nID: " + oArgs.pid + "\nMethod: " + oArgs.sMethod + "\nError: Object does not exist");	
		}
		else if(oThis.div==null)
		{
			if(CL.bDebug) alert("CL CallMethod:\nID: " + oThis.sId + "\nType: " + oThis.sType + "\nMethod: " + oArgs.sMethod + "\nError: Object's DOM does not exist");	
		}
		else if(oThis.oMethods[oArgs.sMethod]==null)
		{
			if(CL.bDebug) alert("CL CallMethod:\nID: " + oThis.sId + "\nType: " + oThis.sType + "\nMethod: " + oArgs.sMethod + "\nError: No such method defined");	
		}
		else
		{
			try
			{
				var oInnerArgs = { pid: oThis.sId };
				if(oArgs.oMethodArgs!=null)
				{
					for(var sKey in oArgs.oMethodArgs)
					{
						oInnerArgs[sKey] = oArgs.oMethodArgs[sKey];
					}
				}
				returnValue = oThis.oMethods[oArgs.sMethod](oInnerArgs);
			}
			catch(e)
			{
				if(CL.bDebug) alert("CL CallMethod:\nID: " + oThis.sId + "\nType: " + oThis.sType + "\nMethod: " + oArgs.sMethod + "\nError: " + e);	
			}
		}
		return returnValue;
	};	
	CLObject.prototype.Constructor = function (oArgs)
	{
		if(this.oMethods["Constructor"]!=null)
		{
			this.CallMethod({ sMethod: "Constructor", oMethodArgs: { pid: this.sId } });
		}
		return this;	
	};	
	CLObject.prototype.Show = function (oArgs)
	{
		var oThis = this;
		if(oThis.bShowInternal==true)
		{
			// skip show if object switches object display first time
			oThis.bShowInternal = false;
			return oThis;
		}
		if((oThis.bShowInternal==true || oThis.bShowInternal==false) && oArgs.bMaster)
		{
			// skip show if object switches object display next time
			return oThis;
		}
		if(oArgs!=null)
		{
			if(oArgs.bMaster==true)
			{
				if(oThis.display!="none")
				{
					$(oThis.div).show();
					CL.Event.Fire({ aEvents:
					[
						{ bRT: true, sEvtName: "EVENT_OBJECT_SHOW", sSourceId: oThis.sId },
						{ sEvtName: "ondisplay", sSourceType: "OBJECT", sSourceId: oThis.sId },
						{ sEvtName: "ondisplaytransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId },
						{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
					]});
					if(oThis.bSound && oThis.bAutoStart)
					{
						CL.Sound.Play({ sEvent: "object", sFile: oThis.sSoundSrc });
					}
				}
				return oThis;
			}
		}
		if(oArgs!=null && oArgs.bUseTransition!=null)
		{
			if(oArgs.bActionCall==true)
			{
				// calling from action
				if(oArgs.bUseTransition==false)
				{
					$(oThis.div).show();
					CL.Event.Fire({ aEvents:
					[
						{ bRT: true, sEvtName: "EVENT_OBJECT_SHOW", sSourceId: oThis.sId },
						{ sEvtName: "ondisplay", sSourceType: "OBJECT", sSourceId: oThis.sId },
						{ sEvtName: "ondisplaytransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId },
						{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
					]});
				}
				else
				{
					var iIdx = (oArgs.iTransition==23) ? Math.floor(Math.random()*CL.aTransitionsCommon.length) : oArgs.iTransition;
					var oOptions = { effect: CL.aTransitionsCommon[iIdx].t, duration: oArgs.iDuration, complete: function () { CL.Event.Fire({ aEvents: [{ sEvtName: "ondisplaytransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId } ]}); } };
					if(oArgs.fnCallback!=null)
					{
						oOptions.complete = oArgs.fnCallback;
					}
					if(CL.aTransitionsCommon[iIdx].d!=null)
					{
						oOptions.direction = CL.aTransitionsCommon[iIdx].d;
					}
					$(oThis.div).show(oOptions);
					CL.Event.Fire({ aEvents:
					[
						{ bRT: true, sEvtName: "EVENT_OBJECT_SHOW", sSourceId: oThis.sId },
						{ sEvtName: "ondisplay", sSourceType: "OBJECT", sSourceId: oThis.sId },
						{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
					]});
				}
				if(oThis.bSound && oThis.bAutoStart)
				{
					CL.Sound.Play({ sEvent: "object", sFile: oThis.sSoundSrc });
				}
			}
		}
		else
		{
			if(oThis.tranin!=null)
			{
				var iIdx = (oThis.tranin.transition==23) ? Math.floor(Math.random()*CL.aTransitionsCommon.length) : oThis.tranin.transition;
				var oOptions = { effect: CL.aTransitionsCommon[iIdx].t, duration: oThis.tranin.duration*1000, complete: function () { CL.Event.Fire({ aEvents: [{ sEvtName: "ondisplaytransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId } ]}); } };
				if(CL.aTransitionsCommon[iIdx].d!=null)
				{
					oOptions.direction = CL.aTransitionsCommon[iIdx].d;
				}
				$(oThis.div).show(oOptions);
				CL.Event.Fire({ aEvents:
				[
					{ bRT: true, sEvtName: "EVENT_OBJECT_SHOW", sSourceId: oThis.sId },
					{ sEvtName: "ondisplay", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
				]});
			}
			else
			{
				$(oThis.div).show();
				CL.Event.Fire({ aEvents:
				[
					{ bRT: true, sEvtName: "EVENT_OBJECT_SHOW", sSourceId: oThis.sId },
					{ sEvtName: "ondisplay", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ sEvtName: "ondisplaytransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
				]});
			}
		}
		if(oThis.bSound && oThis.bAutoStart)
		{
			CL.Sound.Play({ sEvent: "object", sFile: oThis.sSoundSrc });
		}
		return oThis;
	};
	CLObject.prototype.Hide = function (oArgs)
	{
		var oThis = this;
		if($(oThis.div).is(":animated"))
		{
			$(oThis.div).stop(true, true);
		}
		$(oThis.div).find(":animated").stop(true, true);
		if(CL.sModalSrcId==oThis.sId)
		{
			CL.Modal({ bOn: false, sSrcId: oThis.sId });
		}
		if(oArgs!=null)
		{
			if(oArgs.bMaster==true)
			{
				$(oThis.div).hide();
				CL.Event.Fire({ aEvents:
				[
					{ bRT: true, sEvtName: "EVENT_OBJECT_HIDE", sSourceId: oThis.sId },
					{ sEvtName: "onhide", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ sEvtName: "onhidetransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
				]});
				return oThis;
			}
		}
		if(oArgs!=null)
		{
			if(oArgs.bActionCall==true)
			{
				// calling from action
				if(oArgs.bUseTransition==false)
				{
					/*if(CL.sCSSPrefix=="-moz-" && oThis.sType=="BASIC")
					{
						$(oThis.div).fadeOut(250); // trying to override FF flickering bug on images
					}
					else*/
					{
						$(oThis.div).hide();
					}
					CL.Event.Fire({ aEvents:
					[
						{ bRT: true, sEvtName: "EVENT_OBJECT_HIDE", sSourceId: oThis.sId },
						{ sEvtName: "onhide", sSourceType: "OBJECT", sSourceId: oThis.sId },
						{ sEvtName: "onhidetransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId },
						{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
					]});
				}
				else
				{
					var iIdx = (oArgs.iTransition==23) ? Math.floor(Math.random()*CL.aTransitionsCommon.length) : oArgs.iTransition;
					var oOptions = { effect: CL.aTransitionsCommon[iIdx].t, duration: oArgs.iDuration };
					if(oArgs.fnCallback!=null)
					{
						oOptions.complete = oArgs.fnCallback;
					}
					if(CL.aTransitionsCommon[iIdx].d!=null)
					{
						oOptions.direction = CL.aTransitionsCommon[iIdx].d;
					}
					$(oThis.div).hide(oOptions);
					CL.Event.Fire({ aEvents:
					[
						{ bRT: true, sEvtName: "EVENT_OBJECT_HIDE", sSourceId: oThis.sId },
						{ sEvtName: "onhide", sSourceType: "OBJECT", sSourceId: oThis.sId },
						{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
					]});
				}
			}
		}
		else
		{
			// hide by usual timeline
			if(oThis.tranout!=null)
			{
				var iIdx = (oThis.tranout.transition==23) ? Math.floor(Math.random()*CL.aTransitionsCommon.length) : oThis.tranout.transition;
				var oOptions = { effect: CL.aTransitionsCommon[iIdx].t, duration: oThis.tranout.duration*1000, complete: function () { 	CL.Event.Fire({ aEvents: [ { sEvtName: "onhidetransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId } ]}); } };
				if(CL.aTransitionsCommon[iIdx].d!=null)
				{
					oOptions.direction = CL.aTransitionsCommon[iIdx].d;
				}
				$(oThis.div).hide(oOptions);
				CL.Event.Fire({ aEvents:
				[
					{ bRT: true, sEvtName: "EVENT_OBJECT_HIDE", sSourceId: oThis.sId },
					{ sEvtName: "onhide", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ sEvtName: "onhidetransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
				]});
			}
			else
			{
				if(CL.sCSSPrefix=="-moz-" && oThis.sType=="BASIC")
				{
					$(oThis.div).fadeOut(250); // trying to override FF flickering bug on images
				}
				else
				{
					$(oThis.div).hide();
				}
				CL.Event.Fire({ aEvents:
				[
					{ bRT: true, sEvtName: "EVENT_OBJECT_HIDE", sSourceId: oThis.sId },
					{ sEvtName: "onhide", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ sEvtName: "onhidetransitionend", sSourceType: "OBJECT", sSourceId: oThis.sId },
					{ bRT: true, sEvtName: "EVENT_DISPLAY_STATE_CHANGED", sSourceId: oThis.sId }
				]});
			}
		}
		return oThis;
	};
	CLObject.prototype.RenderState = function (oArgs)
	{
		if(this.sType!="BASIC" && this.sType!="SHAPE")
		{
			this.Constructor();
		}
		// apply extra CSS
		var oThis = this.oStates[oArgs.sState];
		if(oThis.initial.nAngle!=0)
		{
			var oCSS = {};
			oCSS[CL.sCSSPrefix + "transform"] = "rotate(" + oThis.initial.nAngle + "deg)";
			oCSS[CL.sCSSPrefix + "transform-origin"] = "50% 50%";
			oCSS["transform"] = "rotate(" + oThis.initial.nAngle + "deg)";
			oCSS["transform-origin"] = "50% 50%";
			$(oThis.div).css(oCSS);
		}
		if(oThis.initial.nOpacity!=1)
		{
			$(oThis.div).css({ "opacity": oThis.initial.nOpacity });
		}
		if(oArgs.sState!="default")
		{
			$(oThis.div).css({ "visibility": "visible" }).hide();
		}
		if(oThis.initial.bDraggable)
		{
			$(oThis.div).draggable(
			{
				cursor: "crosshair",
				iframeFix: true,
				zIndex: 4000,
				create: function (event, ui)
				{
					var sDragId = $(this).attr("id");
					$(CLO[sDragId].div).css({ "left": CLO[sDragId].current.x + "px", "top": CLO[sDragId].current.y + "px" });
				},
				drag: function (event, ui)
				{
					var sId = this.getAttribute("id");
					if(ui!=null)
					{
						var oPosition = ui.position;
						CLO[sId].current.x = oPosition.left;
						CLO[sId].current.y = oPosition.top;
					}
				},
				start: function (event, ui) {},
				stop: function (event, ui)
				{
					var sId = this.getAttribute("id");
					if(ui!=null)
					{
						var oPosition = ui.position;
						CLO[sId].current.x = oPosition.left/CLZ.nZoom;
						CLO[sId].current.y = oPosition.top/CLZ.nZoom;
						if(CL.bTouch && CL.bIOS)
						{
							// fix iOS "lost parent" bug
							var iT = setTimeout(function (oArgs) { $(CLO[oArgs.sId].div).css({ "left": oArgs.nX + "px", "top": oArgs.nY + "px" }); }, 250, { sId: sId, nX: CLO[sId].current.x, nY: CLO[sId].current.y });
						}
					}
				}
			});
		}
		if(this.jxNode.attr("ondrop")!=null)
		{
			$(oThis.div).droppable(
			{
				tolerance: "pointer",
				drop: function (event, ui)
				{
					var sId = this.getAttribute("id");
					if(ui.draggable.length!=0)
					{
						CL.sDragObjectId = ui.draggable.attr("id");
						CLO[sId].FireEvent({ sName: "ondrop" });
					}
					return false;
				}
			});
		}
		return oThis;
	};
	CLObject.prototype.Render = function (oArgs)
	{
		var oThis = this;
		CL.Event.Fire({ aEvents:
		[
			{ bRT: true, sEvtName: "EVENT_OBJECT_BEFORE_COMPLETE", sSourceId: oThis.sId },
			{ sEvtName: "onbeforecomplete", sSourceType: "OBJECT", sSourceId: oThis.sId }
		]});
		if(oThis.sType!="BASIC" && oThis.sType!="SHAPE")
		{
			oThis.Constructor();
		}
		// apply extra CSS
		if(oThis.initial.nAngle!=0)
		{
			var oCSS = {};
			oCSS[CL.sCSSPrefix + "transform"] = "rotate(" + oThis.initial.nAngle + "deg)";
			oCSS[CL.sCSSPrefix + "transform-origin"] = "50% 50%";
			oCSS["transform"] = "rotate(" + oThis.initial.nAngle + "deg)";
			oCSS["transform-origin"] = "50% 50%";
			$(oThis.div).css(oCSS);
		}
		if(oThis.initial.nOpacity!=1)
		{
			$(oThis.div).css({ "opacity": oThis.initial.nOpacity });
		}
		$(oThis.div).css({ "visibility": "visible" }).hide();
		if(oThis.initial.bDraggable)
		{
			$(oThis.div).draggable(
			{
				cursor: "crosshair",
				iframeFix: true,
				zIndex: 4000,
				create: function (event, ui)
				{
					var sDragId = $(this).attr("id");
					$(CLO[sDragId].div).css({ "left": CLO[sDragId].current.x + "px", "top": CLO[sDragId].current.y + "px" });
				},
				drag: function (event, ui)
				{
					var sId = this.getAttribute("id");
					if(ui!=null)
					{
						var oPosition = ui.position;
						CLO[sId].current.x = oPosition.left;
						CLO[sId].current.y = oPosition.top;
					}
				},
				start: function (event, ui) {},
				stop: function (event, ui)
				{
					var sId = this.getAttribute("id");
					if(ui!=null)
					{
						var oPosition = ui.position;
						CLO[sId].current.x = oPosition.left;
						CLO[sId].current.y = oPosition.top;
						if(CL.bTouch && CL.bIOS)
						{
							// fix iOS "lost parent" bug
							var iT = setTimeout(function (oArgs) { $(CLO[oArgs.sId].div).css({ "left": oArgs.nX + "px", "top": oArgs.nY + "px" }); }, 250, { sId: sId, nX: CLO[sId].current.x, nY: CLO[sId].current.y });
						}
					}
				}
			});
		}
		if(oThis.jxNode.attr("ondrop")!=null)
		{
			$(oThis.div).droppable(
			{
				tolerance: "pointer",
				drop: function (event, ui)
				{
					var sId = this.getAttribute("id");
					if(ui.draggable.length!=0)
					{
						CL.sDragObjectId = ui.draggable.attr("id");
						CLO[sId].FireEvent({ sName: "ondrop" });
					}
					return false;
				}
			});
		}
		CL.Event.Fire({ aEvents:
		[
			{ bRT: true, sEvtName: "EVENT_OBJECT_AFTER_COMPLETE", sSourceId: oThis.sId },
			{ sEvtName: "onaftercomplete", sSourceType: "OBJECT", sSourceId: oThis.sId }
		]});
		return oThis;
	};
	CLObject.prototype.AppendStyles = function (oArgs)
	{
		var oThis = this;
		var jCustomStyles = $(oThis.div).find("div.style-custom > div.rule");
		if(jCustomStyles.length>0)
		{
			if(CL.CSS.Exists({ sheet: 0, selector: $(jCustomStyles[0]).attr("data-name") })==-1)
			{
				jCustomStyles.each(function ()
				{
					var sRuleName = $(this).attr("data-name");
					if(CL.CSS.Exists({ sheet: 0, selector: sRuleName })==-1)
					{
						var sString = "";
						var jStatic = $(this).children(".rule-static");
						if(jStatic.length>0) sString = jStatic.text();
						var jDynamic = $(this).children(".rule-dynamic");
						for(var i=0; i<jDynamic.length; i++)
						{
							sString += CL.CSS.Create({ elem: jDynamic[i] });
						}
						CL.CSS.Append({ rules: [{ selector: sRuleName, ruletext: sString }] });
					}
				});
			}
			$(oThis.div).find("div.style-custom").remove();
		}
		return oThis;
	};
	CLObject.prototype.Destroy = function (oArgs)
	{
		// kill DIV, actionboxes
		var oThis = this;
		var sObjectId = oThis.sId;
		CL.Event.Fire({ aEvents:
		[
			{ bRT: true, sEvtName: "EVENT_OBJECT_BEFORE_DESTROY", sSourceId: sObjectId },
			{ sEvtName: "onbeforedestroy", sSourceType: "OBJECT", sSourceId: sObjectId }
		]});
		$(oThis.div).remove();
		if($("#" + oThis.sId + "_CLICKAREA").length!=0)
		{
			$("#" + oThis.sId + "_CLICKAREA").remove();
		}
		delete CLO[sObjectId];
		CL.Event.Fire({ aEvents:
		[
			{ bRT: true, sEvtName: "EVENT_OBJECT_AFTER_DESTROY", sSourceId: sObjectId },
			{ sEvtName: "onafterdestroy", sSourceType: "OBJECT", sSourceId: sObjectId }
		]});
		CL.Event.Unsubscribe({ sSrcId: oThis.sId });
		return null;
	};
	CLObject.prototype.InitAgent = function (oArgs)
	{
		var oThis = this;
		var jContainer = $(oThis.div).find(".cl-container:first");
		oThis.bAgentIsReady = false;
		oThis.aAgentStartQueue = [];
		oThis.aAgentHistory = [""];
		var sMode = (CL.oBrowser.sBrowser=="courselab") ? "gpu" : "transparent";
		oThis.sAgentCurrentState = "";
		var oFParams = { wmode: sMode, flashvars: "objID=" + oThis.sId + "&amp;objTemplate=" + oThis.sType };
		oThis.jAgent = new CLFlash(
		{
			container: jContainer,
			sPath: jContainer.attr("data-path"),
			nWidth: oThis.initial.w,
			nHeight: oThis.initial.h,
			oParams: oFParams
		});
		oThis.AgentAction = function (oArgs)
		{
			try
			{
				this.jAgent.jFPlayer[0].Action(oArgs.sAction, oArgs.sAutoReturn, oArgs.sOverride);
			}
			catch(e1)
			{
				try
				{
					this.jAgent.jFPlayer[0].CallFunction("<invoke name=\"Action\" returntype=\"string\"><arguments><string>" + oArgs.sAction + "</string><string>" + oArgs.sAutoReturn + "</string><string>" + oArgs.sOverride + "</string></arguments></invoke>");
				}
				catch(e2)
				{
					if($(this.jxParams).find("security_alert").text()=="yes")
					{
						CL.Alert({ sTxt: $(this.jxParams).find("hidden_security_alert").text() });
					}
				}
			}
			return this;
		};
		oThis.AgentEventHandler = function (oArgs)
		{ 
			if(oArgs.pid==null || oArgs.action==null || oArgs.evt==null) return this;
			if(!this.bAgentIsReady)
			{
				this.bAgentIsReady = true;
				this.sAgentCurrentState = "idle"
				this.FireEvent({ sName: "onReady" });
				while(this.aAgentStartQueue.length>0)
				{
					this.AgentAction(this.aAgentStartQueue.shift());
				}
				return this;
			}
			switch(oArgs.evt)
			{
				case "start":
				{
					this.sAgentCurrentState = oArgs.action;
					this.FireEvent({ sName: "onActionStart" });
					break;
				}
				case "end":
				{
					this.FireEvent({ sName: "onActionEnd" });
					this.aAgentHistory.push(oArgs.action);
					this.sAgentCurrentState = "";
					break;
				}
			}
			return this;
		};
		oThis.GetAgentState = function (oArgs)
		{
			var sState = "idle";
			try
			{
				sState = this.jAgent.jFPlayer[0].GetState();
			}
			catch(e1)
			{
				try
				{
					sState = this.jAgent.jFPlayer[0].CallFunction("<invoke name=\"GetState\" returntype=\"string\"><arguments></arguments></invoke>");
				}
				catch(e2)
				{
					if($(this.jxParams).find("security_alert").text()=="yes")
					{
						CL.Alert({ sTxt: $(this.jxParams).find("hidden_security_alert").text() });
					}
				}
			}
			return sState;
		};
		oThis.GetAgentQueue = function (oArgs)
		{
			var sFIFO = "";
			try
			{
				sFIFO = this.jAgent.jFPlayer[0].GetQueue();
			}
			catch(e1)
			{
				try
				{
					sFIFO = this.jAgent.jFPlayer[0].CallFunction("<invoke name=\"GetQueue\" returntype=\"string\"><arguments></arguments></invoke>");
				}
				catch(e2)
				{
					if($(this.jxParams).find("security_alert").text()=="yes")
					{
						CL.Alert({ sTxt: $(this.jxParams).find("hidden_security_alert").text() });
					}
				}
			}
			if(sFIFO.indexOf("<string>")!=-1 && sFIFO.lastIndexOf("</string>")!=-1)
			{
				sFIFO = sFIFO.substr(8);
				sFIFO = sFIFO.substring(0, sFIFO.lastIndexOf("</string>"));
			}
			return sFIFO;
		};
		return oThis;
	};
	CLObject.prototype.FireEvent = function (oArgs)
	{
		var oA = { sEvtName: oArgs.sName, sSourceType: "OBJECT", sSourceId: this.sId };
		if(oArgs.oOptions!=null)
		{
			oA.oOptions = oArgs.oOptions;
		}
		CL.Event.Fire({ aEvents: [ oA ] });
	}
}

window.CLEvent = function (oArgs)
{	// CLEvent constructor
	this.sEvtName = oArgs.sEvtName;
	this.sEvtScope = oArgs.sEvtScope || "global";
	this.oSubscribers = {};
	return this;
};
{	// CLEvent methods
	CLEvent.prototype.Find = function (oArgs)
	{
		if(oArgs==null) return -1;
		var iReturn = -1;
		if(oArgs.sSubscriberId!=null && oArgs.sMethod!=null)
		{
			if(this.oSubscribers[oArgs.sSubscriberId]!=null)
			{
				for(var i=0; i<this.oSubscribers[oArgs.sSubscriberId].length; i++)
				{
					if(this.oSubscribers[oArgs.sSubscriberId][i].sMethod==oArgs.sMethod)
					{
						iReturn = i;
						break;
					}
				}
			}
		}
		return iReturn;
	};
	CLEvent.prototype.Subscribe = function (oArgs)
	{
		// { aObjList = [ { sSubscriberId, sMethod, iExec } ] }
		if(oArgs==null) return this;
		if(oArgs.aObjList==null) return this;
		if(!$.isArray(oArgs.aObjList)) return this;
		var iCnt = -1;
		var iExec = -1;
		var iIdx = -1;
		var sMethod;
		while(oArgs.aObjList[++iCnt]!=null)
		{
			sMethod = oArgs.aObjList[iCnt].sMethod || "HandleEvt";
			iExec = oArgs.aObjList[iCnt].iExec || -1;
			if(this.oSubscribers[oArgs.aObjList[iCnt].sSubscriberId]==null)
			{
				this.oSubscribers[oArgs.aObjList[iCnt].sSubscriberId] = [ { sMethod: sMethod, iExec: iExec, iCount: 0 } ];
				continue;
			}
			iIdx = this.Find({ sSubscriberId: oArgs.aObjList[iCnt].sSubscriberId, sMethod: sMethod });
			if(iIdx==-1)
			{
				this.oSubscribers[oArgs.aObjList[iCnt].sSubscriberId].push( { sMethod: sMethod, iExec: iExec, iCount: 0 } );
			}
			else
			{
				this.oSubscribers[oArgs.aObjList[iCnt].sSubscriberId][iIdx] = { sMethod: sMethod, iExec: iExec, iCount: 0 };
			}
		}
		return this;
	};
	CLEvent.prototype.Unsubscribe = function (oArgs)
	{
		if(oArgs.aList!=null)
		{
			for(var i=0; i<oArgs.aList.length; i++)
			{
				if(this.oSubscribers[oArgs.aList[i].sId]==null)
				{
					continue;
				}
				if(oArgs.sMethod==null || oArgs.sMethod=="")
				{
					this.oSubscribers[oArgs.aList[i].sId] = null;
					delete this.oSubscribers[oArgs.aList[i].sId];
					continue;
				}
				var iIdx = this.Find({ sSubscriberId: oArgs.aList[i].sId, sMethod: sMethod });
				if(iIdx!=-1)
				{
					this.oSubscribers[oArgs.aList[i].sId].splice(i, 1);
					if(this.oSubscribers[oArgs.aList[i].sId].length==0)
					{
						this.oSubscribers[oArgs.aList[i].sId] = null;
						delete this.oSubscribers[oArgs.aList[i].sId];
					}
				}
			}
		}	
		return this;
	};
	CLEvent.prototype.Cleanup = function (oArgs)
	{
		for(var sKey in this.oSubscribers)
		{
			if(CLO[sKey]==null)
			{
				this.oSubscribers[sKey] = null;
				delete this.oSubscribers[sKey];
			}
		}
		return this;
	};
}

window.CLTimeline = function (oArgs)
{	// CLTimeline constructor
	this.jxOwnerNode = $(oArgs.xNode);
	this.jxNode = this.jxOwnerNode.children("timeline");
	this.sOwnerType = oArgs.xNode.nodeName;
	this.sOwnerId = this.jxOwnerNode.attr("id");
	this.sId = this.jxOwnerNode.attr("id");
	this.bIsActive = false;
	this.bIsPaused = false;
	this.bAutoProceed = (this.jxOwnerNode.attr("infinite")!="1");
	this.iFrameEnd = oArgs.iDuration;
	this.iStep = 10;
	this.iStartTime = 0;
	this.iCurrentTime = 0;
	this.iCurrentLeft = 0;
	this.iNextStop = 0;
	this.iTimerId = 0;
	this.oSequence = {};
	var jTA = this.jxNode.children("timeaction");
	var aChecks = [ this.iFrameEnd ];
	jTA.each(function ()
	{
		var iBegin = +$(this).attr("begin");
		if($.inArray(iBegin, aChecks)==-1)
		{
			aChecks.push(iBegin);
		}
	});
	this.aChecks = aChecks.sort(function (a1, a2) { return (a1 - a2) });
	for(var i=0; i<this.aChecks.length; i++)
	{
		var jTAByTime = this.jxNode.children("timeaction[begin='" + this.aChecks[i] + "']");
		var aActions = [];
		for(var j=0; j<jTAByTime.length; j++)
		{
			aActions.push({ sAction: $(jTAByTime[j]).attr("type"), sTargetId: $(jTAByTime[j]).attr("targetid"), iBegin: this.aChecks[i] });
		}
		this.oSequence["t" + this.aChecks[i]] = aActions;
	}
	this.aChecksBackup = this.aChecks.slice(0);
	this.oSequenceBackup = jQuery.extend(true, {}, this.oSequence );
	return this;
};
{	// CLTimeline methods
	CLTimeline.prototype.Insert = function (oArgs)
	{
		var oThis = this;
		var iBefore = -1;
		for(var i=0; i<oThis.aChecks.length; i++)
		{
			if(oArgs.nBegin==oThis.aChecks[i])
			{
				oThis.oSequence["t" + oThis.aChecks[i]].push({ sAction: oArgs.sAction, sTargetId: oArgs.sTargetId, nBegin: oThis.aChecks[i], oArgs: oArgs.oArgs });
				oThis.oSequenceBackup = jQuery.extend(true, {}, oThis.oSequence );
				return oThis;
			}
			else if(oArgs.nBegin>oThis.aChecks[i])
			{
				continue;
			}
			else
			{
				iBefore = i;
				break;
			}
		}
		oThis.aChecks.splice(iBefore, 0, oArgs.nBegin);
		oThis.oSequence["t" + oArgs.nBegin] = [{ sAction: oArgs.sAction, sTargetId: oArgs.sTargetId, nBegin: oArgs.nBegin, oArgs: oArgs.oArgs }];
		oThis.aChecksBackup = this.aChecks.slice(0);
		oThis.oSequenceBackup = jQuery.extend(true, {}, oThis.oSequence );
		return oThis;
	};
	CLTimeline.prototype.Start = function (oArgs)
	{
		var oThis = this;
		CL.Event.Fire({ aEvents: [{ sEvtName: "beforestart", sSourceType: "TIMELINE", sSourceId: oThis.sId }] });
		oThis.iStartTime = oThis.iCurrentTime = (new Date()).valueOf();
		oThis.bIsActive = true;
		oThis.aChecks = oThis.aChecksBackup.slice(0);
		oThis.oSequence = jQuery.extend(true, {}, oThis.oSequenceBackup);
		oThis.iStep = oThis.iCurrentLeft = oThis.aChecks[0];
		oThis.iNextStop = oThis.iStartTime + oThis.iStep;
		oThis.iTimerId = setTimeout(function () { oThis.Check ({ oCLTimeline: oThis }) }, oThis.iStep );
		CL.Event.Fire({ aEvents: [ { bRT: true, sEvtName: "EVENT_TIMELINE_START" }, { bRT: true, sEvtName: "EVENT_FRAME_START" }, { sEvtName: "afterstart", sSourceType: "TIMELINE", sSourceId: oThis.sId }] });
		return oThis;
	};
	CLTimeline.prototype.Pause = function (oArgs)
	{
		var oThis = this;
		if(!oThis instanceof CLTimeline)
		{
			if(oArgs.oCLTimeline==null)
			{
				return this;
			}
			oThis = oArgs.oCLTimeline;
		}
		if(oThis.iTimerId!=0)
		{
			CL.Event.Fire({ aEvents: [{ sEvtName: "beforepause", sSourceType: "TIMELINE", sSourceId: oThis.sId }] });
			var iNow = (new Date()).valueOf();
			oThis.iCurrentLeft = oThis.iStep - (iNow - oThis.iCurrentTime);
			clearTimeout(oThis.iTimerId);
			oThis.bIsPaused = true;
			CL.Event.Fire({ aEvents: [{ bRT: true, sEvtName: "EVENT_TIMELINE_PAUSE" }, { bRT: true, sEvtName: "EVENT_FRAME_PAUSE" }, { sEvtName: "afterpause", sSourceType: "TIMELINE", sSourceId: oThis.sId }] });
		}
		return oThis;
	};
	CLTimeline.prototype.Resume = function (oArgs)
	{
		var oThis = this;
		if(!oThis instanceof CLTimeline)
		{
			if(oArgs.oCLTimeline==null)
			{
				return this;
			}
			oThis = oArgs.oCLTimeline;
		}
		if(!oThis.bIsPaused)
		{
			return oThis;
		}
		CL.Event.Fire({ aEvents: [{ sEvtName: "beforeresume", sSourceType: "TIMELINE", sSourceId: oThis.sId }] });
		oThis.iCurrentTime = (new Date()).valueOf();
		oThis.iStep = oThis.iCurrentLeft;
		oThis.iTimerId = setTimeout(function () { oThis.Check ({ oCLTimeline: oThis }) }, oThis.iStep );
		oThis.bIsPaused = false;
		CL.Event.Fire({ aEvents: [{ bRT: true, sEvtName: "EVENT_TIMELINE_RESUME" }, { bRT: true, sEvtName: "EVENT_FRAME_RESUME" }, { sEvtName: "afterresume", sSourceType: "TIMELINE", sSourceId: oThis.sId }] });
		return oThis;
	};
	CLTimeline.prototype.End = function (oArgs)
	{
		var oThis = this;
		if(oThis.sOwnerType=="frame")
		{
			if(CLF[oThis.sOwnerId]==null)
			{
				return null;
			}
		}
		CL.Event.Fire({ aEvents: [{ sEvtName: "beforeend", sSourceType: "TIMELINE", sSourceId: oThis.sId }] });
		if(oThis.sOwnerType=="frame" && oThis.bAutoProceed)
		{
			if(oArgs==null || !(oArgs!=null && oArgs.bBreak==true))
			{
				if(!CLF[oThis.sOwnerId].bIsLast)
				{
					CLF[oThis.sOwnerId].Hide();
					CLF[CLF[oThis.sOwnerId].sNextFrameId].Start();
				}
			}
		}
		oThis.bIsActive = false;
		CL.Event.Fire({ aEvents: [{ bRT: true, sEvtName: "EVENT_TIMELINE_END" }, { bRT: true, sEvtName: "EVENT_FRAME_COMPLETE" }, { sEvtName: "afterend", sSourceType: "TIMELINE", sSourceId: oThis.sId }] });
		if(CLF[oThis.sOwnerId].bIsLast)
		{
			CL.Event.Fire({ aEvents: [{ bRT: true, sEvtName: "EVENT_SLIDE_COMPLETE" }] });
			if(!CLF[oThis.sOwnerId].bStopAtTheEnd)
			{
				if(!CLF[oThis.sOwnerId].oParentSlide.bStopAtTheEnd)
				{
					CL.Navigation.GoTo({ sTargetType: "slide", sTargetDir: "next" });
				}
			}
		}
		return oThis;
	};
	CLTimeline.prototype.Reset = function (oArgs)
	{
		var oThis = this; 
		if(!oThis instanceof CLTimeline)
		{
			if(oArgs.oCLTimeline==null)
			{
				return this;
			}
			oThis = oArgs.oCLTimeline;
		}
		clearTimeout(oThis.iTimerId);
		if(oThis.sOwnerType=="frame")
		{
			CLF[oThis.sOwnerId].Hide();
		}
		oThis.bIsActive = false;
		return this;
	};
	CLTimeline.prototype.Check = function (oArgs)
	{
		var oThis = this;
		if(!oThis instanceof CLTimeline)
		{
			if(oArgs.oCLTimeline==null)
			{
				return this;
			}
			oThis = oArgs.oCLTimeline;
		}
		clearTimeout(oThis.iTimerId);
		var iStop = oThis.aChecks.shift();
		oThis.Exec({ aActions: oThis.oSequence["t" + iStop] });
		delete oThis.oSequence["t" + iStop];
		oThis.iCurrentTime = (new Date()).valueOf();
		if(oThis.aChecks.length>0)
		{
			oThis.iStep = oThis.aChecks[0] - iStop;// - oThis.iStep;
			oThis.iNextStop = oThis.iNextStop + oThis.iStep;
			oThis.iTimerId = setTimeout(function () { oThis.Check ({ oCLTimeline: oThis }) }, oThis.iStep );
		}
		else
		{
			oThis.End();
		}
		return oThis;
	};
	CLTimeline.prototype.Exec = function (oArgs)
	{
		if(oArgs.aActions==null) return this;
		for(var i=0; i<oArgs.aActions.length; i++)
		{
			var oActArgs = oArgs.aActions[i];
			switch(oActArgs.sAction)
			{
				case "display":
				{
					CLO[oActArgs.sTargetId].Show();
					break;
				}
				case "hide":
				{
					CLO[oActArgs.sTargetId].Hide();
					break;
				}
				case "actionbox":
				{
					var jxActionBox = CL.axSlides.find("actionbox[id='" + oActArgs.sTargetId + "']");
					if(jxActionBox.length!=0)
					{
						var jxResp = jxActionBox.children("RESPONSE");
						if(jxResp.length!=0)
						{
							CL.Resp.Process({ jxResp: jxResp });
						}
					}
					break;
				}
				case "pointerset":
				{
					if(CLP[oActArgs.sTargetId]!=null)
					{
						CLP[oActArgs.sTargetId].Set(oActArgs.oArgs);
					}
					break;
				}
				case "pointermove":
				{
					if(CLP[oActArgs.sTargetId]!=null)
					{
						CLP[oActArgs.sTargetId].Move(oActArgs.oArgs);
					}
					break;
				}
				case "pointerclick":
				{
					if(CLP[oActArgs.sTargetId]!=null)
					{
						CLP[oActArgs.sTargetId].Click(oActArgs.oArgs);
					}
					break;
				}
				case "pointerreset":
				{
					if(CLP[oActArgs.sTargetId]!=null)
					{
						CLP[oActArgs.sTargetId].Reset(oActArgs.oArgs);
					}
					break;
				}
				case "pointerhide":
				{
					if(CLP[oActArgs.sTargetId]!=null)
					{
						CLP[oActArgs.sTargetId].Hide(oActArgs.oArgs);
					}
					break;
				}
			}
		}
		return this;
	};
}

window.CLPointer = function (oArgs)
{	// CLPointer constructor
	this.sId = oArgs.sSlideId;
	this.jPointer = $("#POINTER_" + this.sId);
	if(this.jPointer.length==0)
	{
		this.jPointer = $("#CL_POINTER").clone(true).attr({ "id": "POINTER_" + this.sId }).appendTo(CL.oBoard);
	}
	this.jPointer.css({ "left": 0, "top": 0 }); // initial position
	this.jIdle = this.jPointer.children(".cl-pointer-idle");
	this.jClick = this.jPointer.children(".cl-pointer-click");
	this.oPointers = {};
	var sFrameId;
	var nX = 0;
	var nY = 0;
	var nBegin;
	var nBeginNext;
	var nDur;
	var sIdleSrc;
	var sClickSrc;
	var bClick = false;
	var axPointerBlocks = oArgs.jxSlide.find("frame > mousepointers");
	if(axPointerBlocks.length!=0)
	{
		nX = axPointerBlocks[0].getAttribute("x");
		nX = (nX!=null && nX!="") ? +nX : 0;
		nY = axPointerBlocks[0].getAttribute("y");
		nY = (nY!=null && nY!="") ? +nY : 0;
	}
	var axPointers;
	var jxCurPointer;
	var jxFrame;
	var nFrameDur;
	var nDurMove;
	var nDurClick;
	var nDurReset;
	var nMoveStart;
	var nClickStart;
	var nResetStart;
	for(var i=0; i<axPointerBlocks.length; i++)
	{
		jxFrame = $(axPointerBlocks[i]).parent();
		axPointers = $(axPointerBlocks[i]).children("mousepointer");
		sFrameId = jxFrame.attr("id");
		nFrameDur = +jxFrame.attr("dur");
		this.oPointers[sFrameId] = { sFrameId: sFrameId, oTimeline: CLT[sFrameId], bClick: false };
		this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointerset", sTargetId: this.sId, nBegin: 0, oArgs: { nX: nX, nY: nY } });
		for(var j=0; j<axPointers.length; j++)
		{
			jxCurPointer = $(axPointers[j]);
			nX = +jxCurPointer.attr("x");
			nY = +jxCurPointer.attr("y");
			nBegin = +jxCurPointer.attr("begin");
			
			nBeginNext = nFrameDur;
			if(axPointers[j+1]!=null)
			{
				nBeginNext = +$(axPointers[j+1]).attr("begin");
			}
			
			nDur = +jxCurPointer.attr("dur");
			
			if(nBeginNext!=0 && nDur > (nBeginNext - nBegin))
			{
				nDur = nBeginNext - nBegin;
			}
			bClick = (jxCurPointer.attr("click")=="true");
			sIdleSrc = jxCurPointer.attr("arrowfile");
			if(sIdleSrc==null)
			{
				sIdleSrc = "";
			}
			if(bClick)
			{
				sClickSrc = jxCurPointer.attr("clickfile");
				if(sClickSrc==null)
				{
					sClickSrc = "";
				}
				
				if(nDur < 3*CL.nPointerGap)
				{
					// ignore click
					nDurMove = 2*CL.nPointerGap;
					this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointermove", sTargetId: this.sId, nBegin: nBegin, oArgs: { nDur: nDurMove, nX: nX, nY: nY, sSrc: sIdleSrc } });
				}
				else if(nDur < CL.nPointerClick)
				{
					// ignore move
					nDurClick = nDur - 2*CL.nPointerGap;
					nClickStart = nBegin + CL.nPointerGap;
					nResetStart = nBegin + CL.nPointerGap + nDurClick;
					this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointerset", sTargetId: this.sId, nBegin: nBegin, oArgs: { nX: nX, nY: nY } });
					this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointerclick", sTargetId: this.sId, nBegin: nClickStart, oArgs: { nDur: nDurClick, sClickSrc: (bClick ? sClickSrc : "") } });
					this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointerreset", sTargetId: this.sId, nBegin: nResetStart, oArgs: { nDur: 0 } });
				}
				else
				{
					// last pointer on the frame
					if((nBegin + nDur) > (nBeginNext - CL.nPointerClick))
					{
						// not enough for 0.5s click
						nMoveStart = nBegin;
						nDurMove = nBeginNext - CL.nPointerClick - nBegin;
						nClickStart = nBeginNext - CL.nPointerClick;
						nDurClick = CL.nPointerClick - CL.nPointerGap;
						nResetStart = nBeginNext - CL.nPointerGap;
					}
					else
					{
						nMoveStart = nBegin;
						nDurMove = nDur;
						nClickStart = nMoveStart + nDurMove + CL.nPointerGap;
						nDurClick = CL.nPointerClick - 2*CL.nPointerGap;
						nResetStart = nClickStart + CL.nPointerClick - CL.nPointerGap;
					}
					this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointermove", sTargetId: this.sId, nBegin: nMoveStart, oArgs: { nDur: nDurMove, nX: nX, nY: nY, sSrc: sIdleSrc }  });
					this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointerclick", sTargetId: this.sId, nBegin: nClickStart, oArgs: { nDur: nDurClick, sClickSrc: (bClick ? sClickSrc : "") }  });
					this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointerreset", sTargetId: this.sId, nBegin: nResetStart, oArgs: { nDur: 0 } });
				}
			}
			else
			{
				nMoveStart = nBegin;
				nDurMove = nDur - CL.nPointerGap;
				this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointermove", sTargetId: this.sId, nBegin: nMoveStart, oArgs: { nDur: nDurMove, nX: nX, nY: nY, sSrc: sIdleSrc }  });
			}
		}
		if(i==axPointerBlocks.length-1)
		{
			this.oPointers[sFrameId].oTimeline.Insert({ sAction: "pointerhide", sTargetId: this.sId, nBegin: nBeginNext - CL.nPointerGap, oArgs: { nDur: 0 }  });
		}
	}
	return this;
}
{	// CLPointer methods
	CLPointer.prototype.Set = function (oArgs)
	{
		this.jPointer.css({ "left": oArgs.nX + "px", "top": oArgs.nY + "px" });
		if(!this.jPointer.is(":visible"))
		{
			this.jPointer.show();
		}
		return this;
	};
	CLPointer.prototype.Move = function (oArgs)
	{
		if(!this.jPointer.is(":visible"))
		{
			this.jPointer.show();
		} 
		this.jIdle.attr({ "src": ((oArgs.sSrc!="") ? oArgs.sSrc : this.jIdle.attr("data-src")) }).show();
		this.jClick.hide();
		this.jPointer.animate({ "left": oArgs.nX + "px", "top": oArgs.nY + "px" }, oArgs.nDur); 
		return this;
	};
	CLPointer.prototype.Click = function (oArgs)
	{
		this.jIdle.hide();
		this.jClick.attr({ "src": ((oArgs.sClickSrc!="") ? oArgs.sClickSrc : this.jClick.attr("data-src")) }).show();
		return this;	
	};
	CLPointer.prototype.Reset = function (oArgs)
	{
		this.jIdle.attr({ "src": ((oArgs.sIdleSrc!="") ? oArgs.sIdleSrc : this.jIdle.attr("data-src")) }).show();
		this.jClick.hide();
		return this;
	};
	CLPointer.prototype.Hide =  function (oArgs)
	{
		this.jPointer.hide();
		return this;
	};
}

window.CLFlash = function (oArgs)
{	// CLFlash constructor
	if(oArgs.container==null || oArgs.sPath==null) return null;
	var jContainer = $(oArgs.container);
	var jParam;
	var aParams =
	[
		{ name: "allowscriptaccess", value: "always" },
		{ name: "base", value: "" },
//		{ name: "bgcolor", value: "#fff" },
		{ name: "menu", value: "false" },
		{ name: "play", value: "true" },
		{ name: "quality", value: "high" },
		{ name: "salign", value: "" },
		{ name: "scale", value: "showall" },
		{ name: "swliveconnect", value: "true" },
		{ name: "swremote", value: "" },
		{ name: "wmode", value: ((CL.oBrowser.sBrowser=="courselab") ? "gpu" : "transparent") },
		{ name: "flashvars", value: "" }
	];
	if(window.ActiveXObject != undefined) // IE<=IE11
	{
		var sHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + oArgs.nWidth + '" height="' + oArgs.nHeight + '">';
		sHTML += '<param name="movie" value="' + oArgs.sPath + '"/>';
		for(var i=0; i<aParams.length; i++)
		{
			if(oArgs.oParams!=null)
			{
				if(oArgs.oParams[aParams[i].name]!=null)
				{
					sHTML += '<param name="' + aParams[i].name + '" value="' + oArgs.oParams[aParams[i].name] + '"/>';
				}
				else
				{
					sHTML += '<param name="' + aParams[i].name + '" value="' + aParams[i].value + '"/>';
				}
			}
			else
			{
				sHTML += '<param name="' + aParams[i].name + '" value="' + aParams[i].value + '"/>';
			}
		}
		sHTML += '</object>';
		jContainer.html(sHTML);
		this.jFPlayer = jContainer.children("object:first");
	}
	else // IE11 and w3c browsers, HTML eval instead of DOM insert - due to IE11 wmode bug
	{
		var sHTML = '<object width="' + oArgs.nWidth + '" height="' + oArgs.nHeight + '" data="' + oArgs.sPath + '" type="application/x-shockwave-flash">';
		for(var i=0; i<aParams.length; i++)
		{
			if(oArgs.oParams!=null)
			{
				if(oArgs.oParams[aParams[i].name]!=null)
				{
					sHTML += '<param name="' + aParams[i].name + '" value="' + oArgs.oParams[aParams[i].name] + '"/>';
				}
				else
				{
					sHTML += '<param name="' + aParams[i].name + '" value="' + aParams[i].value + '"/>';
				}
			}
			else
			{
				sHTML += '<param name="' + aParams[i].name + '" value="' + aParams[i].value + '"/>';
			}
		}
		sHTML += '</object>';
		jContainer.html(sHTML);
		this.jFPlayer = jContainer.children("object:first");
	}
	return this;
};

var CL =
{
	aToDestroy: [],
	aTransitions: [	"blind_left", "blind_right", "blind_up", "blind_down", "drop_left", "drop_right", "drop_up", "drop_down", "slide_left", "slide_right", "slide_up", "slide_down", "clip_horizontal", "clip_vertical", "scale_horizontal", "scale_vertical", "scale_both", "fold", "puff", "fade", "bounce", "shake" ],
	aTransitionsCommon: [
		{ t: "blind", d: "left" },
		{ t: "blind", d: "right" },
		{ t: "blind", d: "up" },
		{ t: "blind", d: "down" },
		{ t: "drop", d: "left" },
		{ t: "drop", d: "right" },
		{ t: "drop", d: "up" },
		{ t: "drop", d: "down" },
		{ t: "slide", d: "left" },
		{ t: "slide", d: "right" },
		{ t: "slide", d: "up" },
		{ t: "slide", d: "down" },
		{ t: "fade" },
		{ t: "clip", d: "horizontal" },
		{ t: "clip", d: "vertical" },
		{ t: "scale", d: "horizontal" },
		{ t: "scale", d: "vertical" },
		{ t: "scale", d: "both" },
		{ t: "puff" },
		{ t: "bounce" },
		{ t: "pulsate" },
		{ t: "fold" },
		{ t: "shake" } ],
	axMasters: null,
	axSlides: null,
	bAlternativePath: false,
	bIOS: (/iP(hone|od|ad)/.test(navigator.platform)),
	bTouch: (("ontouchstart" in window) || (navigator.msMaxTouchPoints!=null)), 
	iAvailW: 0,
	iAvailH: 0,
	iCurrentTime: 0,
	bDebug: false,
	iDestroyTimer: 0,
	iResolution: 5,
	iResTimer: 0,
	jAlternativePathObject: null,
	jxGroups: null,
	jxMethods: null,
	jxModule: null,
	jxParams: null,
	listThreads: new List,
	nLastZ: 0,
	nModalZ: 5000,
	nPointerClick: 500,
	nPointerGap: 10,
	oActionTypes:
	{
		"CASE": "ALTERNATIVE",
		"ELSE": "ALTERNATIVE",
		"CHECKHIT": "CONDITIONAL",
		"IF": "CONDITIONAL",
		"IF_COMPLETION_STATUS": "CONDITIONAL",
		"IF_SCORE": "CONDITIONAL",
		"IF_SUCCESS_STATUS": "CONDITIONAL",
		"FOR": "LOOP",
		"FOREACH": "LOOP",
		"WHILE": "LOOP",
		"BEGIN_ASYNC": "STRUCTURE",
		"PAR": "STRUCTURE",
		"TIMER": "STRUCTURE",
		"SWITCH": "TREE"
	},
	oBoard: null,
	oBrowser: {},
	oCurrent:
	{
		jFrame: null,
		jMaster: null,
		jSlide: null,
		sFrameId: "",
		sMasterId: "",
		sSlideId: ""
	},
	oDurations: { fast: 250, normal: 400, slow: 800 },
	oHandlers: {},
	oMethods: {},
	ajAudio: {},
	sDragObjectId: "",
	sDummySWF: "../courseimages/dummy.swf",
	sCSSPrefix: (function ()
	{
		var sPrefix = "";
		try
		{
			var oStyles = window.getComputedStyle(document.documentElement, null);
			sPrefix = (Array.prototype.slice.call(oStyles).join("").match(/-(moz|webkit|ms)-/) || (oStyles.OLink === "" && ["", "o"]))[1];
		}
		catch(e) {}
		return (sPrefix=="" ? "" : "-" + sPrefix + "-");
	})(),
	sFrameId: "",
	sModalSrcId: "",
	sSlideId: "",
	vMethodReturnValue: null,
	xDoc: null,
	Alert: function (oArgs)
	{
		alert(oArgs.sTxt);
	},
	Call:
	{
		Method: function (oArgs)
		{
			var sType = oArgs.type;
			if(sType==null)
			{
				if(oArgs.id==null) return false;
				var jObject = CL.jxModule.find("object[id='" + oArgs.id + "']");
				if(jObject.length!=1) return false;
				sType = jObject.attr("type");
			}
			if(sType==null || sType=="") return false;
			if(CL.oMethods[sType]==null)
			{
				CL.oMethods[sType] = {};
			}
			if(CL.oMethods[sType][oArgs.method]==null)
			{
				var jMethod = CL.jxMethods.children("method[type='" + sType + "'][name='" + oArgs.method + "']");
				if(jMethod.length==1)
				{
					var sBody = jMethod.text();
					var iBegin = sBody.indexOf("{");
					var iEnd = sBody.lastIndexOf("}");
					if(iBegin>0 && iEnd>0 && iBegin<iEnd)
					{
						sBody = sBody.substring(iBegin+1, iEnd);
						CL.oMethods[sType][oArgs.method] = new Function("argobj", sBody);
					}
				}
			}
			if(CL.oMethods[sType][oArgs.method]!=null)
			{
				CL.vMethodReturnValue = null;
				try
				{
					CL.oMethods[sType][oArgs.method](oArgs.args);
				}
				catch(e)
				{
					if(CL.bDebug) alert("CL Call.Method [" + sType + "] [" + oArgs.method + "]: " + e);	
				}
			}
			return ((oArgs.bReturn==true) ? CL.vMethodReturnValue : null);
		}
	},
	CheckBrowser: function (oArgs)
	{
		var sUA = navigator.userAgent.toLowerCase();
		var nVer = -1;
		if(sUA.indexOf("courselab/3")!=-1)
		{
			CL.oBrowser.sBrowser = "courselab";
			CL.oBrowser.nVersion = 3;
			return true;
		}
		if(sUA.indexOf("msie")!=-1)
		{
			var reMSIE  = new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");
			if(reMSIE.exec(sUA) != null)
			{
				nVer = parseFloat( RegExp.$1 );
			}
			if(nVer < 9)
			{
				return "Internet Explorer " + nVer;
			}
			CL.oBrowser.sBrowser = "msie";
		}
		else if(/firefox[\/\s](\d+\.\d+)/.test(sUA))
		{
			nVer = new Number(RegExp.$1);
			if(nVer < 4)
			{
				return "Firefox " + nVer;
			}
			CL.oBrowser.sBrowser = "firefox";
		}
		else if(sUA.indexOf("chrome")!=-1)
		{
			/chrome[\/\s](\d+\.\d+)/.test(sUA);
			nVer = new Number(RegExp.$1);
			if(nVer<1)
			{
				return "Chrome " + nVer;
			}
			CL.oBrowser.sBrowser = "chrome";
		}
		else if(sUA.indexOf("safari")!=-1 && sUA.indexOf("chrome")==-1)
		{
			/version[\/\s](\d+\.\d+)/.test(sUA);
			nVer = new Number(RegExp.$1);
			if(nVer<5 && sUA.indexOf("android ")==-1)
			{
				return "Safari " + nVer;
			}
			CL.oBrowser.sBrowser = "safari";
		}
		else if(sUA.indexOf("opera/")!=-1)
		{
			/version[\/\s](\d+\.\d+)/.test(sUA);
			nVer = new Number(RegExp.$1);
			if(nVer<12)
			{
				return "Opera " + nVer;
			}
			CL.oBrowser.sBrowser = "opera";
		}
		else if(sUA.indexOf("opr/")!=-1)
		{
			/opr[\/\s](\d+\.\d+)/.test(sUA);
			nVer = new Number(RegExp.$1);
			if(nVer<12)
			{
				return "Opera " + nVer;
			}
			CL.oBrowser.sBrowser = "opera";
		}
		else if(sUA.indexOf("edge/")!=-1)
		{
			/edge[\/\s](\d+\.\d+)/.test(sUA);
			nVer = new Number(RegExp.$1);
			if(nVer<12)
			{
				return "Edge " + nVer;
			}
			CL.oBrowser.sBrowser = "edge";
		}
		else if(sUA.indexOf("yabrowser/")!=-1)
		{
			/yabrowser[\/\s](\d+\.\d+)/.test(sUA);
			nVer = new Number(RegExp.$1);
			if(nVer<1)
			{
				return "Yandex " + nVer;
			}
			CL.oBrowser.sBrowser = "yandex";
		}
		if(sUA.indexOf("opera mini/")!=-1)
		{
			return "Opera mini";
		}
		if(CL.bTouch && (sUA.indexOf("windows nt")!=-1 || sUA.indexOf("macintosh")!=-1))
		{
			CL.bTouch =  false;
		}
		CL.oBrowser.nVersion = nVer;
		return true;
	},
	Confirm: function (oArgs)
	{
		return confirm(oArgs.sTxt);
	},
	CSS:
	{
		Append: function (oArgs)
		{
			if(document.styleSheets==null) return false;
			if(document.styleSheets.length==0) return false;
			var iIdx = (oArgs.sheet==null) ? 0 : +oArgs.sheet;
			if(document.styleSheets[iIdx]==null) return false;
			var aRules = (oArgs.rules!=null) ? oArgs.rules : ( oArgs.selector!=null ? [ oArgs ] : []);
			var iExists = -1;
			for(var i=0; i<aRules.length; i++)
			{
				iExists = CL.CSS.Exists({ sheet: iIdx, selector: aRules[i].selector });
				if(iExists!=-1)
				{
					if(document.styleSheets[iIdx].deleteRule)
					{
						document.styleSheets[iIdx].deleteRule(iExists);
					}
					else if(document.styleSheets[iIdx].removeRule)
					{
						document.styleSheets[iIdx].removeRule(iIdx);
					}
				}
				if(document.styleSheets[iIdx].insertRule)
				{
					document.styleSheets[iIdx].insertRule(aRules[i].selector + " { " + aRules[i].ruletext + " }", 0);
				}
				else if(document.styleSheets[iIdx].addRule)
				{
					document.styleSheets[iIdx].addRule(aRules[i].selector, aRules[i].ruletext, 0);
				}
			}
			return true;
		},
		Create: function (oArgs)
		{
			var sCSSString = "";
			var sProperty = oArgs.elem.getAttribute("data-type");
			switch(sProperty)
			{
				case "background-size":
				case "border-radius":
				case "box-shadow":
				case "opacity":
				case "transform":
				case "transform-origin":
				{
					sCSSString += CL.CSS.PlainProperty({ prop: sProperty, value: oArgs.elem.getAttribute("data-value") }); 
					break;
				}
				case "linear-gradient":
				{
					sCSSString += CL.CSS.Gradient({ type: "linear", angle: oArgs.elem.getAttribute("data-angle"), colors: oArgs.elem.getAttribute("data-colors"), important: oArgs.elem.getAttribute("data-important"), bIE9: (oArgs.elem.getAttribute("data-ie9")!=null) }); 
					break;
				}
				case "radial-gradient":
				{
					sCSSString += CL.CSS.Gradient({ type: "radial", shape: oArgs.elem.getAttribute("data-shape"), colors: oArgs.elem.getAttribute("data-colors"), important: oArgs.elem.getAttribute("data-important"), px: oArgs.elem.getAttribute("data-px"), offset: oArgs.elem.getAttribute("data-offset"), width: oArgs.elem.getAttribute("data-width"), height: oArgs.elem.getAttribute("data-height"), radius: oArgs.elem.getAttribute("data-radius"), bIE9: (oArgs.elem.getAttribute("data-ie9")!=null) }); 
					break;
				}
			}
			return sCSSString;
		},
		Exists: function (oArgs)
		{
			var aSheets = document.styleSheets;
			if(aSheets==null) return -1;
			if(aSheets.length==0) return -1;
			var iIdx = (oArgs.sheet==null) ? 0 : +oArgs.sheet;
			if(document.styleSheets[iIdx]==null) return -1;
			var aRules = document.styleSheets[iIdx].rules || document.styleSheets[iIdx].cssRules;
			for(var i=0; i<aRules.length; i++)
			{
				if(aRules[i].selectorText.toLowerCase()==oArgs.selector.toLowerCase())
				{
					return i;
				}
			}
			return -1;
		},
		Gradient: function (oArgs)
		{
			var sString = "";
			switch(oArgs.type)
			{
				case "radial":
				{ 
					var aColorPairs = oArgs.colors.split(";");
					var aPair = [];
					if(navigator.userAgent.toLowerCase().indexOf("msie 9")!=-1)
					{
						var sGUID = CLTOOLS.GUID();
						var nR = 0.5;
						var nCx = 0.5;
						var nCy = 0.5;
						var nBase = 100;
						var sXML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none"><defs>';
						if(oArgs.px=="yes")
						{
							if(oArgs.offset!=null && oArgs.width!=null && oArgs.height!=null)
							{
								var aOffset = oArgs.offset.split(" ");
								var nOffX = parseFloat(aOffset[0]);
								var nOffY = parseFloat(aOffset[1]);
								var nW = parseFloat(oArgs.width);
								var nH = parseFloat(oArgs.height);
								nCx = nOffX/nW;
								nCy = nOffY/nH;
								nBase = Math.max(nW, nH);
								nR = (oArgs.radius==null) ? Math.min(nCx, nCy) : parseFloat(oArgs.radius)/nBase;
							}
						}	
						sXML += '<radialGradient id="' + sGUID + '" gradientUnits="userSpaceOnUse" cx="' + nCx + '" cy="' + nCy + '" r="' + nR + '">';
						for(var i=0; i<aColorPairs.length; i++)
						{
							aPair = aColorPairs[i].split("|");
							sXML +=	'<stop stop-color="' + aPair[0] + '" offset="' + (+aPair[1]/nBase) + '"/>';
						}
						sXML += '</radialGradient></defs>';
						sXML += '<rect fill="url(#' + sGUID + ')" x="0" y="0" width="100%" height="100%" />';
						sXML += '</svg>';
						sString += 'background-image:url(data:image/svg+xml;base64,' + CLTOOLS.Base64.Encode({ sString: sXML }) + ')';
					}
					else if(!oArgs.bIE9)
					{
						var sUnit = (oArgs.px=="yes") ? "px" : "%";
						var sOffset = (oArgs.offset!=null) ? (oArgs.offset + ",") : "";
						var sColors = "";
						var sShape = (oArgs.shape==null || oArgs.shape=="") ? "circle" : oArgs.shape;
						for(var i=0; i<aColorPairs.length; i++)
						{
							aPair = aColorPairs[i].split("|");
							sColors +=	"," + aPair[0] + " " + aPair[1] + sUnit;
						}
						if(CL.sCSSPrefix!="")
						{
							sString += "background-image:" + CL.sCSSPrefix + "radial-gradient(" + sOffset + sShape + sColors + ");";
						}
						sString += "background-image:radial-gradient(" + sOffset + sShape + sColors + ")";
					}
					if(oArgs.important!=null) sString += " !important";
					sString += ";";
					break;
				}
				case "linear":
				{
					var aColorPairs = oArgs.colors.split(";");
					var aPair = [];
					var nAngle = +oArgs.angle;
					if(navigator.userAgent.toLowerCase().indexOf("msie 9")!=-1)
					{
						var sGUID = CLTOOLS.GUID();
						var nX1 = 50;
						var nX2 = 50;
						var nY1 = 100;
						var nY2 = 0;
						switch(nAngle)
						{
							case 0:
							{
								break;
							}
							case 180:
							{
								nY1 = 0; 	nY2 = 100;
								break;
							}
							case 90:
							{
								nX1 = 0; 	nY1 = 50;
								nX2 = 100;	nY2 = 50;
								break;
							}
							case 270:
							{
								nX1 = 100; 	nY1 = 50;
								nX2 = 0;	nY2 = 50;
								break;
							}
							case 45:
							{
								nX1 = 0; 	nY1 = 100;
								nX2 = 100;	nY2 = 0;
								break;
							}
							case 135:
							{
								nX1 = 0; 	nY1 = 0;
								nX2 = 100; 	nY2 = 100;
								break;
							}
							case 225:
							{
								nX1 = 100; 	nY1 = 0;
								nX2 = 0; 	nY2 = 100;
								break;
							}
							case 315:
							{
								nX1 = 100; 	nY1 = 100;
								nX2 = 0; 	nY2 = 0;
								break;
							}
							default:
							{
								var nTan = Math.tan(Math.PI*nAngle/180);
								if((nAngle>0 && nAngle<45) || (nAngle>315 && nAngle<360))
								{
									nY1 = 100;
									nY2 = 0;
									nX1 = Math.round(50*(1 - nTan));
									nX2 = Math.round(50*(1 + nTan));
								}
								else if(nAngle>135 && nAngle<225)
								{
									nY1 = 0;
									nY2 = 100;
									nX1 = Math.round(50*(1 - nTan));
									nX2 = Math.round(50*(1 + nTan));
								}
								else if(nAngle>45 && nAngle<135)
								{
									nX1 = 0;
									nX2 = 100;
									nY1 = Math.round(50*(1 - 1/nTan));
									nY2 = Math.round(50*(1 + 1/nTan));
								}
								else if(nAngle>225 && nAngle<315)
								{
									nX1 = 100;
									nX2 = 0;
									nY1 = Math.round(50*(1 - 1/nTan));
									nY2 = Math.round(50*(1 + 1/nTan));
								}
								break;
							}
						}
						var sXML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">';
						sXML += '<linearGradient id="' + sGUID + '" gradientUnits="userSpaceOnUse" x1="' + nX1 + '%" y1="' + nY1 + '%" x2="' + nX2 + '%" y2="' + nY2 + '%">';
						for(var i=0; i<aColorPairs.length; i++)
						{
							aPair = aColorPairs[i].split("|");
							sXML +=	'<stop stop-color="' + aPair[0] + '" offset="' + (+aPair[1]/100) + '"/>';
						}
						sXML += '</linearGradient>';
						sXML += '<rect x="0" y="0" width="1" height="1" fill="url(#' + sGUID + ')" />';
						sXML += '</svg>';
						sString += 'background-image:url(data:image/svg+xml;base64,' + CLTOOLS.Base64.Encode({ sString: sXML }) + ')';
					}
					else if(!oArgs.bIE9)
					{
						var sColors = "";
						for(var i=0; i<aColorPairs.length; i++)
						{
							aPair = aColorPairs[i].split("|");
							sColors +=	"," + aPair[0] + " " + aPair[1] + "%";
						}
						if(CL.sCSSPrefix!="")
						{
							sString += "background-image:" + CL.sCSSPrefix + "linear-gradient(" + (90-nAngle) + "deg" + sColors + ");";
						}
						sString += "background-image:linear-gradient(" + nAngle + "deg" + sColors + ")";
					}
					if(oArgs.important!=null) sString += " !important";
					sString += ";";
					break;
				}
			}
			return sString;
		},
		Parse: function (oArgs)
		{
			// jRules, sOldId, sNewId
			var sRuleName = oArgs.jRules[0].getAttribute("data-name");
			var bReplaceId = (oArgs.sOldId!=null && oArgs.sNewId!=null);
			if(bReplaceId)
			{
				if(sRuleName.indexOf(oArgs.sOldId + "_")==-1)
				{
					sRuleName = sRuleName.split("#" + oArgs.sOldId).join("#" + oArgs.sNewId);
				}
			}
			if(CL.CSS.Exists({ sheet: 0, selector: sRuleName })==-1) // if already added
			{
				var jRule;
				var sString;
				var jStatic;
				var jDynamic;
				var sIE9;
				var bIE9 = (navigator.userAgent.toLowerCase().indexOf("msie 9")!=-1);
				for(var i=0; i<oArgs.jRules.length; i++)
				{
					if(bIE9 && oArgs.jRules[i].getAttribute("data-ie9")!=null)
					{
						continue;
					}
					jRule = $(oArgs.jRules[i]);
					sRuleName = oArgs.jRules[i].getAttribute("data-name");
					if(bReplaceId)
					{
						if(sRuleName.indexOf(oArgs.sOldId + "_")==-1)
						{
							sRuleName = sRuleName.split("#" + oArgs.sOldId).join("#" + oArgs.sNewId);
						}
					}
					if(CL.CSS.Exists({ sheet: 0, selector: sRuleName })==-1)
					{
						sString = "";
						jStatic = jRule.children(".rule-static");
						if(jStatic.length>0)
						{
							sString = jStatic.text();
						}
						jDynamic = jRule.children(".rule-dynamic");
						for(var j=0; j<jDynamic.length; j++)
						{
							sString += CL.CSS.Create({ elem: jDynamic[j] });
						}
						CL.CSS.Append({ rules: [{ selector: sRuleName, ruletext: sString }] });
					}
				}
			}
			return true;
		},
		PlainProperty: function (oArgs)
		{
			var sString = "";
			if(CL.sCSSPrefix!="")
			{
				sString += CL.sCSSPrefix + oArgs.prop + ":" + oArgs.value + ";";
			}
			sString += oArgs.prop + ":" + oArgs.value + ";";
			return sString;
		}
	},
	Debug:
	{
		oAction: null,
		Break: function (oArgs)
		{
			if(!oArgs.oAction.bDebuggerOn)
			{
				oArgs.oAction.bDebuggerOn = true;
				CL.Timeline.Pause({ bAllActive: true });
				CL.Debug.Update({ oAction: oArgs.oAction, bCreate: (oArgs.bCreate==true) });
			}
			if(oArgs.oAction.bCancel)
			{
				oArgs.oAction.bDebug = false;
				oArgs.oAction.bDebuggerOn = false;
				CL.Timeline.Resume({ bAllActive: true });
			}
			if(oArgs.oAction.bProceed)
			{
				oArgs.oAction.bDebug = false;
				oArgs.oAction.bDebuggerOn = false;
				CL.Timeline.Resume({ bAllActive: true });
			}
			return oArgs.oAction;
		},
		CreateActionList: function (oArgs)
		{
			var jxChildren = $(oArgs.xNode).children();
			var jLI;
			var sName;
			var sHTML1;
			var sHTML2;
			var aAttributes;
			var sGUID;
			for(var i=0; i<jxChildren.length; i++)
			{
				sGUID = $(jxChildren[i]).attr("cl-id");
				jLI = $(document.createElement("li")).attr({ "data-guid": sGUID });
				sName = jxChildren[i].nodeName.toUpperCase();
				sHTML1 = sName + "<span class='cl-debug-params'>";
				aAttributes = jxChildren[i].attributes;
				if(aAttributes.length>0)
				{
					sHTML2 = " { "; 
					for(var j=0; j<aAttributes.length; j++)
					{
						if(aAttributes[j].name=="cl-id") continue;
						sHTML2 += aAttributes[j].name + ": " + aAttributes[j].value;
						if(j<aAttributes.length-1) sHTML2 += " , ";
					}
					sHTML2 += "}";
				}
				else
				{
					sHTML2 = "";
				}
				sHTML1 += sHTML2 + "</span>";
				jLI.addClass("cl-debug-list-item").attr({ "title": sName + sHTML2 }).html(sHTML1).appendTo(oArgs.jRoot);
				if($(jxChildren[i]).children().length>0)
				{
					var jUL = $(document.createElement("ul")).addClass("cl-debug-list").appendTo(jLI);
					CL.Debug.CreateActionList({ jRoot: jUL, xNode: jxChildren[i] });
				}
			}
			return true;
		},
		Handle: function (oArgs)
		{
			if(oArgs.oElem==null) return false;
			switch($(oArgs.oElem).attr("data-action"))
			{
				case "toggle":
				{
					var jSection = $(oArgs.oElem).parents(".cl-debug-section:first");
					var jSectionBody = jSection.find(".cl-debug-section-body:first");
					if(jSectionBody.is(":visible"))
					{
						jSectionBody.slideUp();
						$(oArgs.oElem).removeClass("open").addClass("closed");
					}
					else
					{
						jSectionBody.slideDown();
						$(oArgs.oElem).removeClass("closed").addClass("open");
					}
					break;
				}
				case "proceed":
				{
					CL.Debug.oAction.bProceed = true;
					break;
				}
				case "cancel":
				{
					CL.Debug.oAction.bCancel = true;
					CL.Debug.Stop();
					break;
				}
			}
			return true;
		},
		Stop: function (oArgs)
		{
			var jDebug = $(".cl-debug");
			var jUL = jDebug.find(".cl-debug-action-list > ul");
			jUL.html("");
			var jVarsTable = $(".cl-debug .cl-debug-vars-global .cl-vars-table");
			var jTR = jVarsTable.find("tr");
			if(jTR.length>1)
			{
				for(var i=jTR.length-1; i>=1; i--)
				{
					$(jTR[i]).remove();
				}
			}
			jVarsTable = $(".cl-debug .cl-debug-vars-slide .cl-vars-table");
			jTR = jVarsTable.find("tr");
			if(jTR.length>1)
			{
				for(var i=jTR.length-1; i>=1; i--)
				{
					$(jTR[i]).remove();
				}
			}
			jDebug.hide();
			return true;
		},
		Update: function (oArgs)
		{
			var jDebug = $(".cl-debug");
			if(!jDebug.hasClass("ui-draggable"))
			{
				jDebug.draggable();
			}
			jDebug.show();
			CL.Debug.oAction = oArgs.oAction;
			var jUL = jDebug.find(".cl-debug-action-list > ul");
			if(oArgs.bCreate==true)
			{
				jUL.html("");
				var sRespId = oArgs.oAction.sRespId;
				var jxResp = CL.axSlides.find("[name='" + sRespId + "']");
				if(jxResp.length>0)
				{
					CL.Debug.CreateActionList({ jRoot: jUL, xNode: jxResp[0] });
				}
			}
			if(oArgs.bFinal==true)
			{
				jUL.find("li").removeClass("cl-debug-current").addClass("cl-debug-final");
				$(".cl-debug-btn-proceed").hide();
			}
			else
			{
				$(".cl-debug-btn-proceed").show();
				jUL.find("li").each(function ()
				{
					if($(this).attr("data-guid")==oArgs.oAction.sId)
					{
						$(this).addClass("cl-debug-current");
					}
					else
					{
						$(this).removeClass("cl-debug-current");
					}
				});
			}
			var jVarsTable = $(".cl-debug .cl-debug-vars-global .cl-vars-table");
			var jTR = jVarsTable.find("tr");
			if(jTR.length>1)
			{
				for(var i=jTR.length-1; i>=1; i--)
				{
					$(jTR[i]).remove();
				}
			}
			var jTD;
			for(var sKey in CLV.oGlobal)
			{
				jTR = $(document.createElement("tr")).appendTo(jVarsTable);
				$(document.createElement("td")).html(sKey).appendTo(jTR);
				$(document.createElement("td")).text(CLV.oGlobal[sKey]).attr({ "title": CLV.oGlobal[sKey] }).appendTo(jTR);
			}
			jVarsTable = $(".cl-debug .cl-debug-vars-slide .cl-vars-table");
			jTR = jVarsTable.find("tr");
			if(jTR.length>1)
			{
				for(var i=jTR.length-1; i>=1; i--)
				{
					$(jTR[i]).remove();
				}
			}
			for(var sKey in CLV.oSlide)
			{
				jTR = $(document.createElement("tr")).appendTo(jVarsTable);
				$(document.createElement("td")).html(sKey).appendTo(jTR);
				$(document.createElement("td")).text(CLV.oSlide[sKey]).attr({ "title": CLV.oSlide[sKey] }).appendTo(jTR);
			}
		}
	},
	DeleteStore: function (oArgs)
	{
		if(oArgs==null) return false;
		if(oArgs.sId==null) return false;
		if(CLI[oArgs.sId]!=null)
		{
			delete CLI[oArgs.sId];
		}
		if(oArgs.bChildren==true)
		{
			var aIds = [];
			for(var sKey in CLI)
			{
				if(CLI[sKey].a==oArgs.sId)
				{
					aIds.push(sKey);
				}
			}
			for(var i=0; i<aIds.length; i++)
			{
				delete CLI[aIds[i]];
			}
		}
		return true;
	},
	Destroy: function (oArgs)
	{
		_destroy:
		while(CL.aToDestroy.length>0)
		{
			switch(CL.aToDestroy[0].type)
			{
				case "object":
				{
					delete CLO[CL.aToDestroy[0].id];
					break;
				}
				case "frame":
				{
					delete CLF[CL.aToDestroy[0].id];
					break;
				}
				case "slide":
				{
					delete CLS[CL.aToDestroy[0].id];
					break;
				}
				case "master":
				{
					delete CLM[CL.aToDestroy[0].id];
					break;
				}
			}
			CL.aToDestroy.shift();
		}
		return true;
	},
	Event: 
	{
		Fire: function (oArgs)
		{
			if(oArgs.aEvents!=null)
			{
				if(!$.isArray(oArgs.aEvents))
				{
					return false;
				}
				for(var i=0; i<oArgs.aEvents.length; i++)
				{
					if(oArgs.aEvents[i].bRT==true)
					{
						if(oArgs.aEvents[i].sSourceId!=null)
						{
							CL.Event.Handle({ sEvtName: oArgs.aEvents[i].sEvtName, sSourceId: oArgs.aEvents[i].sSourceId });
						}
						else
						{
							CL.Event.Handle({ sEvtName: oArgs.aEvents[i].sEvtName });
						}
					}
					else
					{
						// accessible events
						CL.Event.Process({ sEvtName: oArgs.aEvents[i].sEvtName, sSourceType: oArgs.aEvents[i].sSourceType, sSourceId: oArgs.aEvents[i].sSourceId });
						if(oArgs.aEvents[i].sSourceType=="OBJECT")
						{
							if(CLO[oArgs.aEvents[i].sSourceId]!=null)
							{
								if(CLF[CLO[oArgs.aEvents[i].sSourceId].sFrameId]!=null)
								{
									CLF[CLO[oArgs.aEvents[i].sSourceId].sFrameId].HandleListeners( oArgs.aEvents[i] );
								}
							}
						}
					}
				}
				
			}
			else if(oArgs.sSourceType!=null)
			{
				// old syntax
				return CL.Event.Process(oArgs);
			}
			return true;
		},
		Handle: function (oArgs)
		{
			// runtime-level proprietary events EVENT_... - handle with oSubscribers
			// sEvtName, sSourceId, oHandlerArgs
			if(oArgs==null) return false;
			if(oArgs.sEvtName==null || oArgs.sEvtName=="") return false;
			if(CLE[oArgs.sEvtName]==null) return false;
			var oArgobj = { pid: oArgs.sSourceId, evt: oArgs.sEvtName };
			if(oArgs.oHandlerArgs!=null)
			{
				for(var sKey in oArgs.oHandlerArgs)
				{
					oArgobj[sKey] = oArgs.oHandlerArgs[sKey];
				}
			}
			if(oArgs.sSourceId!=null)
			{
				// for selected object only
				if(CLE[oArgs.sEvtName].oSubscribers[oArgs.sSourceId]==null || CLO[oArgs.sSourceId]==null) return false;
				for(var i=0; i<CLE[oArgs.sEvtName].oSubscribers[oArgs.sSourceId].length; i++)
				{
					CLO[oArgs.sSourceId].CallMethod({ sMethod: CLE[oArgs.sEvtName].oSubscribers[oArgs.sSourceId][i].sMethod, oMethodArgs: oArgobj });
				}
			}
			else
			{
				for(var sKey in CLE[oArgs.sEvtName].oSubscribers)
				{
					if(CLO[sKey]==null) continue;
					oArgobj.pid = sKey;
					for(var i=0; i<CLE[oArgs.sEvtName].oSubscribers[sKey].length; i++)
					{
						CLO[sKey].CallMethod({ sMethod: CLE[oArgs.sEvtName].oSubscribers[sKey][i].sMethod, oMethodArgs: oArgobj });
					}
				}
			}
			return true;
		},
		Key: function (oArgs)
		{
			switch(oArgs.oEvt.type)
			{
				case "keydown":
				{
					for(var sKey in CLF)
					{
						if(CLF[sKey].bMaster==true) continue; // or allow master key events?
						if(CLF[sKey].bActive==true)
						{
							if(CLF[sKey].jxKeyEvents!=null)
							{
								for(var i=0; i<CLF[sKey].jxKeyEvents.length; i++)
								{
									if(CL.Event.KeyCheck({ oEvt: oArgs.oEvt, xNode: CLF[sKey].jxKeyEvents[i] }))
									{
										CL.Resp.Process({ jxResp: $(CLF[sKey].jxKeyEvents[i]) });
									}
								}
							}
						}
					}
					for(var sKey in CLS)
					{
						if(CLS[sKey].bActive==true)
						{
							if(CLS[sKey].jxKeyEvents!=null)
							{
								for(var i=0; i<CLS[sKey].jxKeyEvents.length; i++)
								{
									if(CL.Event.KeyCheck({ oEvt: oArgs.oEvt, xNode: CLS[sKey].jxKeyEvents[i] }))
									{
										CL.Resp.Process({ jxResp: $(CLS[sKey].jxKeyEvents[i]) });
									}
								}
							}
						}
					}
					break;
				}
				case "keyup":
				{
					break;
				}
			}
			return true;
		},
		KeyCheck: function (oArgs)
		{
			var bShift = ($(oArgs.xNode).attr("shift")=="1");
			var bCtrl = ($(oArgs.xNode).attr("ctrl")=="1");
			var bAlt = ($(oArgs.xNode).attr("alt")=="1");
			var iKey = +$(oArgs.xNode).attr("key");
			if(bShift && oArgs.oEvt.shiftKey!=true)
			{
				return false;
			}
			if(bCtrl && oArgs.oEvt.ctrlKey!=true)
			{
				return false;
			}
			if(bAlt && oArgs.oEvt.altKey!=true)
			{
				return false;
			}
			if(iKey!=oArgs.oEvt.keyCode)
			{
				return false;
			}
			return true;
		},
		Listen: function (oArgs)
		{
			// subscribe to object's events
			// aList [ { sListenerId, sSourceId, sEvtName, (sMethod), (iExec)} ]
			if(oArgs==null) return false;
			if(oArgs.aList==null) return false;
			if(!$.isArray(oArgs.aList)) return false;
			var jxObject;
			var jxFrame;
			var sFrameId;
			for(var i=0; i<oArgs.aList.length; i++)
			{
				if(oArgs.aList[i].sSourceId==null || oArgs.aList[i].sSourceId=="" || oArgs.aList[i].sListenerId==null || oArgs.aList[i].sListenerId=="" || oArgs.aList[i].sEvtName==null  || oArgs.aList[i].sEvtName=="")
				{
					continue;
				}
				jxObject = CL.jxModule.find("object[id='" + oArgs.aList[i].sListenerId + "']");
				if(jxObject.length==0)
				{
					continue;
				}
				jxFrame = jxObject.parents("frame:first");
				if(jxFrame.length==0)
				{
					continue;
				}
				sFrameId = jxFrame[0].getAttribute("id");
				if(CLF[sFrameId]==null)
				{
					continue;
				}
				CLF[sFrameId].AddListener(oArgs.aList[i]);
			}
			return true;
		},
		Process: function (oArgs)
		{
			// user accessible events from objects, frames, slides etc.
			var sParentNodeName = (oArgs.sSourceType==null) ? "object" : oArgs.sSourceType.toLowerCase();
			var jxParent = CL.jxModule.find(sParentNodeName + "[id='" + oArgs.sSourceId + "']");
			if(jxParent.length!=0)
			{
				var jxNode = jxParent.children("RESPONSE[event='"+ oArgs.sEvtName +"']");
				if(jxNode.length>0)
				{
					CL.Resp.Process({ jxResp: jxNode });
					return true;
				}
			}
			return false;
		},
		Subscribe: function (oArgs)
		{
			// subscribe for basic runtime-level events EVENT_...
			// aList: array of { sId, sEvtName }
			if(oArgs==null) return false;
			if(oArgs.aList==null) return false;
			if(!$.isArray(oArgs.aList)) return false;
			for(var i=0; i<oArgs.aList.length; i++)
			{
				if(CLE[oArgs.aList[i].sEvtName]==null)
				{
					CLE[oArgs.aList[i].sEvtName] = new CLEvent({ sEvtName: oArgs.aList[i].sEvtName });
				}
				if(oArgs.aList[i].aSubscribers!=null)
				{
					CLE[oArgs.aList[i].sEvtName].Subscribe({ aObjList: [ { sSubscriberId: oArgs.aList[i].sId } ] });
				}
				else
				{
					CLE[oArgs.aList[i].sEvtName].Subscribe({ aObjList: [ { sSubscriberId: oArgs.aList[i].sId } ] });
				}
			}
			return true;
		},
		Unlisten: function (oArgs)
		{
			// unsubscribe to object's events
			// aList [ { sListenerId, sSourceId, sEvtName, (sMethod)} ]
			if(oArgs==null) return false;
			if(oArgs.aList==null) return false;
			if(!$.isArray(oArgs.aList)) return false;
			var jxObject;
			var jxFrame;
			var sFrameId;
			for(var i=0; i<oArgs.aList.length; i++)
			{
				if(oArgs.aList[i].sSourceId==null || oArgs.aList[i].sSourceId=="" || oArgs.aList[i].sListenerId==null || oArgs.aList[i].sListenerId=="" || oArgs.aList[i].sEvtName==null  || oArgs.aList[i].sEvtName=="")
				{
					continue;
				}
				jxObject = CL.jxModule.find("object[id='" + oArgs.aList[i].sListenerId + "']");
				if(jxObject.length==0)
				{
					continue;
				}
				jxFrame = jxObject.parents("frame:first");
				if(jxFrame.length==0)
				{
					continue;
				}
				sFrameId = jxFrame[0].getAttribute("id");
				if(CLF[sFrameId]==null)
				{
					continue;
				}
				CLF[sFrameId].RemoveListener(oArgs.aList[i]);
			}
			return true;
		},
		Unsubscribe: function (oArgs)
		{
			for(var sEvtName in CLE)
			{
				CLE[sEvtName].Unsubscribe({ aList: [ { sId: oArgs.sSrcId } ] });
			}
			return true;
		},
		Swipe: function (oArgs)
		{
			
		}
	},
	Exist: function (oArgs)
	{
		if(oArgs.id!=null)
		{
			return ($("#" + oArgs.id).length>0);
		}
		return false;
	},
	Get: function (oArgs)
	{
		if(oArgs==null) return [];
		// target = slide|frame|group|object|param|method
		// scope = module|slides|slide|masters|master|frame|groups|params|methods  > optional scope_by (dir|id), scope_id
		// by = id|dir|type(+name) //|attr|text > target_id, target_dir, target_type
		var jScope = [];
		switch(oArgs.scope)
		{
			case "methods":
			{
				jScope = CL.jxMethods;
				break;
			}
			case "params":
			{
				if(oArgs.scope_id==null || oArgs.scope_id=="")
				{
					jScope = CL.jxParams;
				}
				else
				{
					jScope = CL.jxParams.children("param[objectid='" + oArgs.scope_id + "']");
				}
				break;
			}
			case "groups":
			{
				if(oArgs.scope_id==null || oArgs.scope_id=="")
				{
					jScope = CL.jxGroups;
				}
				else
				{
					jScope = CL.jxGroups.children("group[id='" + oArgs.scope_id + "']")
				}
				break;
			}
			case "frame":
			{
				switch(oArgs.scope_by)
				{
					case "dir":
					{
						switch(oArgs.scope_dir)
						{
							case "next":
							{
								jScope = CL.oCurrent.jFrame.next();
								break;
							}
							case "prev":
							{
								jScope = CL.oCurrent.jFrame.prev();
								break;
							}
							case "first":
							case "last":
							{
								jScope = CL.oCurrent.jSlide.find("frame:" + oArgs.dir);
								break;
							}
							default:
							{
								return [];
							}
						}
						break;
					}
					case "id":
					default:
					{
						jScope = (oArgs.scope_id==null || oArgs.scope_id=="") ? CL.oCurrent.jFrame : CL.jxModule.find("frame[id='" + oArgs.scope_id + "']");
						break;
					}
				}
				break;
			}
			case "master":
			{
				switch(oArgs.scope_by)
				{
					case "dir":
					{
						switch(oArgs.scope_dir)
						{
							case "next":
							{
								jScope = CL.oCurrent.jMaster.next();
								break;
							}
							case "prev":
							{
								jScope = CL.oCurrent.jMaster.prev();
								break;
							}
							case "first":
							case "last":
							{
								jScope = CL.axMasters.children("slide:" + oArgs.dir);
								break;
							}
							default:
							{
								return [];
							}
						}
						break;
					}
					case "id":
					default:
					{
						jScope = (oArgs.scope_id==null || oArgs.scope_id=="") ? CL.oCurrent.jMaster : CL.axMasters.children("slide[id='" + oArgs.scope_id + "']");
						break;
					}
				}
				break;
			}
			case "masters":
			{
				jScope = CL.axMasters;
				break;
			}
			case "slide":
			{
				var sSlideId;
				switch(oArgs.scope_by)
				{
					case "dir":
					{
						if(CL.bAlternativePath)
						{
							sSlideId = CL.Call.Method({ type: "nav_025_structure", method: "GetSlideFromStructure", args: { pid: CL.jAlternativePath.attr("id"), directories: oArgs.scope_dir } });
						}
						else
						{
							switch(oArgs.scope_dir)
							{
								case "next":
								{
									jScope = CL.oCurrent.jSlide.next();
									break;
								}
								case "prev":
								{
									jScope = CL.oCurrent.jSlide.prev();
									break;
								}
								case "first":
								case "last":
								{
									jScope = CL.axSlides.children("slide:" + oArgs.dir);
									break;
								}
								default:
								{
									return [];
								}
							}
						}
						break;
					}
					case "id":
					default:
					{
						sSlideId = (oArgs.scope_id==null || oArgs.scope_id=="") ? CL.oCurrent.sSlideId : oArgs.scope_id;
						jScope = CL.axSlides.children("slide[id='" + sSlideId + "']");
						break;
					}
				}
				break;
			}
			case "slides":
			{
				jScope = CL.axSlides;
				break;
			}
			case "module":
			default:
			{
				jScope = CL.jxModule;
				break;
			}
		}
		if(jScope.length==0) return [];
		
		var jResult = [];
		if(oArgs.target=="method")
		{
			jResult = CL.jxMethods.children("method[type='" + oArgs.target_type + "'][name='" + oArgs.target_name + "']");
		}
		else
		{
			switch(oArgs.by)
			{
				case "id":
				{
					switch(oArgs.target)
					{
						case "frame":
						case "slide":
						case "group":
						case "object":
						{
							jResult = jScope.find(oArgs.target + "[id='" + oArgs.target_id + "']");
							break;
						}
						case "param":
						{
							jResult = jScope.children("param[objectid='" + oArgs.target_id + "']");
							break;
						}
					}
					break;
				}
				case "type":
				{
					switch(oArgs.target)
					{
						case "object":
						{
							jResult = jScope.find("object[type='" + oArgs.target_type + "']");
							break;
						}
					}
					break;
				}
				case "dir":
				{
					switch(oArgs.target)
					{
						case "slide":
						case "frame":
						{
							switch(oArgs.target_dir)
							{
								case "next":
								{
									jResult = jScope.next();
									break;
								}
								case "prev":
								{
									jResult = jScope.prev();
									break;
								}
								case "first":
								case "last":
								{
									jResult = jScope.parent().children(oArgs.target + ":" + oArgs.target_dir);
									break;
								}
							}
							break;
						}
					}
					break;
				}
			}
		}
			
		return jResult;
	},
	Init: function (oArgs)
	{
		function GetURLParam(oArgs)
		{
			var sURL = document.location.href;
			if(sURL.indexOf("?")!=-1)
			{
				var sParams = sURL.substr(sURL.indexOf("?") + 1); 
				var aPairs = sParams.split("&");
				var aChunks;
				sURL = sURL.substring(0, sURL.indexOf("?") + 1);
				for(var i=0; i<aPairs.length; i++)
				{
					aChunks = aPairs[i].split("=");
					if(aChunks.length==2)
					{
						switch(aChunks[0])
						{
							case "slideid":
							{
								CL.sSlideId = decodeURI(aChunks[1]);
								if(CL.sSlideId.charAt(0)=='"')
								{
									CL.sSlideId = CL.sSlideId.substring(1, CL.sSlideId.lastIndexOf('"'));
								}
								break;
							}
							case "frameid":
							{
								CL.sFrameId = decodeURI(aChunks[1]);
								if(CL.sFrameId.charAt(0)=='"')
								{
									CL.sFrameId = CL.sFrameId.substring(1, CL.sFrameId.lastIndexOf('"'));
								}
								break;
							}
						}
					}
				}
			}
			return true;
		}
		function Mobile()
		{ 
			var nua = navigator.userAgent;	
			if(nua.match(/iPad/i) != null)
			{
				return false;
			}
			var nW = screen.width;
			var nH = screen.height; 
			var nPR = window.devicePixelRatio;
			var jMeta = $("head").children("meta[name='viewport']");
			var sContent = jMeta.attr("content");
			var aPairs = sContent.split(",");
			var aParam;
			var nCW;
			var nCH;
			for(var i=0; i<aPairs.length; i++)
			{
				aParam = aPairs[i].split("=");
				if($.trim(aParam[0])=="width") nCW = parseFloat(aParam[1]);
				if($.trim(aParam[0])=="height") nCH = parseFloat(aParam[1]);
			}
			var nRW = nW/nCW;
			var nRH = nH/nCH;
			var nR = (nRW>nRH) ? nRH : nRW;
			if(((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 &&  nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1)))
			{ 
				nR /= nPR;
			}
			sContent = "width=" + nCW + ",height=" + nCH + ",initial-scale=" + nR + ",user-scalable=1";
			jMeta.attr({ "content": sContent });
			return true;
		}
		
		CL.oBoard = document.getElementById("boardFrame");
		var sBrowser = CL.CheckBrowser();
		if(sBrowser!=true)
		{
			$(CL.oBoard).hide();
			$(".cl-error-frame, .cl-error-browser").show();
			$(".cl-error-browser-type").html( sBrowser );
			return false;
		}
		Mobile();
		try
		{
			InitModule();
			CLZ.bInit = true;
		}
		catch(e)
		{
			alert("User function InitModule() failed. \nError: " + e);
		}
		GetURLParam();
		$(window.document).bind("keydown", { sSrc: "doc" }, function (event) { CL.Event.Key({ oEvt: event }) }).bind("keyup", { sSrc: "doc" }, function (event) { CL.Event.Key({ oEvt: event }) })
		CL.Mask({ on: true });
		$.ajax({
			type: "GET",
			url: "splash.xml",
			async: true,
			dataType: "xml",
			complete: function ()
			{
				CL.Mask({ on: false });
				return true;
			},
			failure: function ()
			{
				alert("No splash");
				return false;
			},
			success: function (oSplashDoc)
			{
				$(window).resize(function () { CL.Zoom({ bResize: true, bEvent: true }) });
				if(CL.sSlideId!="" || CL.sFrameId!="")
				{
					CL.Start();
				}
				else if($(oSplashDoc).find("settings > showsplash").text()=="yes")
				{
					$(CL.oBoard).html( $(oSplashDoc).find("data").text() );
					var jFitAny = $(oSplashDoc).find("settings > fitwindow");
					var jFitSmall = $(oSplashDoc).find("settings > fit_small_window");
					if(jFitAny.length!=0 || jFitSmall.length!=0)
					{
						if(jFitAny.text()=="yes")
						{
							CL.Zoom({ bFit: true });
						}
						else if(jFitSmall.text()=="yes")
						{
							CL.Zoom({ bFit: true, bSmall: true });
						}
					}
					return true;
				}
				else
				{
					CL.Start();
				}
				return true;
			}
		});
		CL.Sound.Init();
		if(CL.bTouch)
		{
			$(CL.oBoard).on("swipeleft", function(e) { CL.Event.Swipe({ oEvent: e, sDir: "left" }); }).on("swiperight", function(e) { CL.Event.Swipe({ oEvent: e, sDir: "right" }); });
		}
		return true;
	},
	FlashEIHandler: function (oArgs)
	{
		if(oArgs==null) return false;
		if(oArgs.pid==null || oArgs.action==null || oArgs.evt==null) return false;
		if(CLO[oArgs.pid]==null) return false;
		if(CLD.CLFlashTypes[CLO[oArgs.pid].sType]=="agent")
		{
			CLO[oArgs.pid].AgentEventHandler(oArgs);
		}
		else if(CLD.CLFlashTypes[CLO[oArgs.pid].sType]=="video")
		{
			
		}
		else
		{
			return false;
		}
		return true;
	},
	Mask: function (oArgs)
	{
		if(oArgs!=null)
		{
			if(oArgs.on==true)
			{
				$("div#boardMask").show();
				return true;
			}
		}
		$("div#boardMask").hide();
		return false;
	},
	Modal: function (oArgs)
	{
		var jMask = $(CL.oBoard).find(".cl-modal-mask");
		if(oArgs==null)
		{
			if(jMask.length!=0)
			{
				if(CL.sModalSrcId!="")
				{
					if(CLO[CL.sModalSrcId]!=null)
					{
						$(CLO[CL.sModalSrcId].div).css({ "z-index": CLO[CL.sModalSrcId].initial.nZ });
						CLO[CL.sModalSrcId].current.nZ = CLO[CL.sModalSrcId].initial.nZ;
					}
					CL.sModalSrcId = "";
					jMask.hide("fade", 250);
				}
			}
		}
		else if(oArgs.bOn==true && oArgs.sSrcId!=null)
		{
			if(jMask.length==0)
			{
				jMask = $(document.createElement("div")).addClass("cl-modal-mask").html("&nbsp;").appendTo($(CL.oBoard));
			}
			jMask.show("fade", 250);
			if(CL.sModalSrcId!="")
			{
				if(CLO[CL.sModalSrcId]!=null)
				{
					$(CLO[CL.sModalSrcId].div).css({ "z-index": CLO[CL.sModalSrcId].initial.nZ });
					CLO[CL.sModalSrcId].current.nZ = CLO[CL.sModalSrcId].initial.nZ;
				}
			}
			CL.sModalSrcId = oArgs.sSrcId;
			$(CLO[CL.sModalSrcId].div).css({ "z-index": CL.nModalZ });
			CLO[CL.sModalSrcId].current.nZ = CL.nModalZ;
		}
		else
		{
			if(jMask.length!=0)
			{
				if(oArgs.sSrcId!=null)
				{
					if(CL.sModalSrcId==oArgs.sSrcId)
					{
						if(CLO[CL.sModalSrcId]!=null)
						{
							$(CLO[CL.sModalSrcId].div).css({ "z-index": CLO[CL.sModalSrcId].initial.nZ });
							CLO[CL.sModalSrcId].current.nZ = CLO[CL.sModalSrcId].initial.nZ;
						}
						CL.sModalSrcId = "";
						jMask.hide("fade", 250);
					}
				}
				else
				{
					if(CL.sModalSrcId!="")
					{
						if(CLO[CL.sModalSrcId]!=null)
						{
							$(CLO[CL.sModalSrcId].div).css({ "z-index": CLO[CL.sModalSrcId].initial.nZ });
							CLO[CL.sModalSrcId].current.nZ = CLO[CL.sModalSrcId].initial.nZ;
						}
						CL.sModalSrcId = "";
						jMask.hide("fade", 250);
					}
				}
			}
		}
		return true;
	},
	Navigation:
	{
		Allowed: function (oArgs)
		{
			switch(oArgs.sTarget)
			{
				case "slide":
				{
					var iCurIdx = $.inArray(CLZ.sCurrentSlideId, CLPath);
					if(oArgs.sDir!=null)
					{
						switch(oArgs.sDir)
						{
							case "next":
							{
								if(CLPath[iCurIdx+1]==null) return false;
								break;
							}
							case "prev":
							{
								if(iCurIdx<=0) return false;
								break;
							}
						}
					}
					else if(oArgs.sTargetId!=null)
					{
						if(CLZ.bStrictOrder)
						{
							var iTargetIdx = $.inArray(oArgs.sTargetId, CLPath);
							if(iTargetIdx!=-1)
							{
								if($.inArray(oArgs.sTargetId, CLZ.aVisited)==-1)
								{
									if(iTargetIdx-iCurIdx>1)
									{
										return false;
									}
								}
							}
						}
					}
					break;
				}
				case "frame":
				{
					if(oArgs.sDir!=null)
					{
						switch(oArgs.sDir)
						{
							case "next":
							{
								if(CLF[CLZ.sCurrentFrameId].bIsLast) return false;
								break;
							}
							case "prev":
							{
								if(CLF[CLZ.sCurrentFrameId].bIsFirst) return false;
								break;
							}
						}
					}
					else
					{
						// by ID
					}					
					break;
				}
			}
			return true;
			if(oArgs.subject==null || oArgs.selectby==null) return false;
			var jStructure = CL.jxModule.find("object[type='nav_025_structure']");
			if(jStructure.length > 1)
			{
				jStructure = $(jStructure[0]);
			}
			switch(oArgs.subject)
			{
				case "slide":
				{
					var sFromId = (oArgs.from==null || oArgs.from=="") ? CL.oCurrent.sSlideId : oArgs.from;
					switch(oArgs.selectby)
					{
						case "id":
						{
							// from-to
							if(oArgs.to==null || oArgs.to=="") break;
							
							break;
						}
						case "dir":
						{
							// current-dir
							if(jStructure.length==1)
							{
								
							}
							else
							{
								
							}
							break;
						}
					}
					break;
				}
			}
			return false;
		},
		Chapter: function (oArgs)
		{
			var sSlideId = (oArgs==null) ? CLZ.sCurrentSlideId : oArgs.slideid;
			return "Chapter";
		},
		Exists: function (oArgs)
		{
			return false;
		},
		GetTarget: function (oArgs)
		{
			var jTarget;
			var sTargetId = "";
			var sFromId = (oArgs.from==null) ? CLZ.sCurrentSlideId : oArgs.from;
			var iIdx = $.inArray(sFromId, CLPath);
			switch(oArgs.sType)
			{
				case "slide":
				{
					switch(oArgs.sDir)
					{
						case "this":
						{
							sTargetId = CLZ.sCurrentSlideId;
							break;
						}
						case "next":
						{
							if(iIdx!=-1 && CLPath[iIdx+1]!=null)
							{
								sTargetId = CLPath[iIdx+1];
							}
							break;
						}
						case "prev":
						{
							if(iIdx>0)
							{
								sTargetId = CLPath[iIdx-1];
							}
							break;
						}
						case "first":
						{
							sTargetId = CLPath[0];
							break;
						}
						case "last":
						{
							sTargetId = CLPath[CLPath.length-1];
							break;
						}
					}
					break;
				}
				case "frame":
				{
					var jxFrame = CL.axSlides.find("frame[id='" + CLZ.sCurrentFrameId + "']");
					var jxTarget;
					switch(oArgs.sDir)
					{
						case "this":
						{
							jxTarget = jxFrame;
							break;
						}
						case "next":
						{
							jxTarget = jxFrame.next();
							if(jxTarget.length==0)
							{
								if(iIdx!=-1 && CLPath[iIdx+1]!=null)
								{
									var jxSlide = CL.jxModule.find("slide[id='" + CLPath[iIdx+1] + "']");
									jxTarget = jxSlide.find("frame:first");
								}
							}
							break;
						}
						case "prev":
						{
							jxTarget = jxFrame.prev();
							if(jxTarget.length==0)
							{
								if(iIdx!=-1 &&iIdx>0)
								{
									var jxSlide = CL.jxModule.find("slide[id='" + CLPath[iIdx-1] + "']");
									jxTarget = jxSlide.find("frame:last");
								}
							}
							break;
						}
						case "first":
						{
							jxTarget = jxFrame.parent().children(":first");
							break;
						}
						case "last":
						{
							jxTarget = jxFrame.parent().children(":last");
							break;
						}
					}
					if(jxTarget.length!=0)
					{
						sTargetId = jxTarget.attr("id");
					}
					break;
				}
			}
			return sTargetId;
		},
		GoTo: function (oArgs)
		{
			var sSlideId = "";
			var sFrameId = "";
			if(oArgs.sTargetType!=null)
			{
				switch(oArgs.sTargetType)
				{
					case "slide":
					{
						if(oArgs.sTargetId!=null)
						{
							sSlideId = oArgs.sTargetId;
						}
						else
						{
							if(oArgs.sTargetDir!=null)
							{
								if(oArgs.sTargetDir=="this")
								{
									sSlideId = CLZ.sCurrentSlideId;
								}
								else
								{
									sSlideId = CL.Navigation.GetTarget({ sType: "slide", sDir: oArgs.sTargetDir });
								}
							}
						}
						if(sSlideId!=null)
						{
							CL.Sound.Stop();
							if($(CL.oBoard).find(".cl-modal-mask").length>0)
							{
								if($(CL.oBoard).find(".cl-modal-mask").is(":visible"))
								{
									CL.Modal();
								}
							}
							CL.Open.Slide({ slideid: sSlideId });
						}
						break;
					}
					case "frame":
					{
						if(oArgs.sTargetId!=null)
						{
							sFrameId = oArgs.sTargetId;
						}
						else
						{
							if(oArgs.sTargetDir!=null)
							{
								sFrameId = CL.Navigation.GetTarget({ sType: "frame", sDir: oArgs.sTargetDir });
							}
						}
						if(sFrameId!="")
						{
							var jxFrame = CL.axSlides.find("frame[id='" + sFrameId + "']");
							var jxSlide = jxFrame.parents("slide:first");
							sSlideId = jxSlide.attr("id");
							if(jxSlide.attr("id")!=CLZ.sCurrentSlideId)
							{
								CL.Open.Slide({ slideid: sSlideId });
								if(!CLF[sFrameId].bIsFirst)
								{
									CLF[sFrameId].Start();
								}
							}
							else
							{
								CLF[sFrameId].Start();
							}
						}
						break;
					}
				}
			}
			else
			{
				var sTargetId = oArgs.targetid;
				if((sTargetId==null || sTargetId=="") && oArgs.dir!=null)
				{
					sTargetId = CL.Navigation.GetTarget({ type: "slide", dir: oArgs.dir });
				}
				CL.Open.Slide({ slideid: sTargetId });
			}
		},
		Path: function (oArgs)
		{
			if(oArgs!=null)
			{
				/*if(oArgs.chapter==true)
				{
					for(var i=0; i<CLPath)
				}*/
			}
			return CLPath;
		}
	},
	Object:
	{
		Exists: function (oArgs)
		{
			if(oArgs.selectby==null || oArgs.selectby=="") return false;
			switch(oArgs.selectby)
			{
				case "objectid":
				{
					switch(oArgs.scope)
					{
						case "group":
						{
							break;
						}
						case "frame":
						{
							break;
						}
						case "slide":
						{
							var jSlide;
							if(oArgs.slideid!=null || oArgs.slideid!="")
							{
								jSlide = CL.axSlides.children("slide[id='" + oArgs.slideid + "']");
							}
							else
							{
								jSlide = CL.oCurrent.jSlide;
							}
							return jSlide.find("object[id='" + oArgs.objectid + "']")
							break;
						}
						case "slides":
						{
							break;
						}
						case "master":
						{
							break;
						}
						case "masters":
						{
							break;
						}
						case "module":
						default:
						{
							break;
						}
					}
					break;
				}
				case "type":
				{
					switch(oArgs.scope)
					{
						case "slide":
						{
							break;
						}
						case "slides":
						{
							break;
						}
						case "master":
						{
							break;
						}
						case "masters":
						{
							break;
						}
						case "module":
						default:
						{
							break;
						}
					}
					break;
				}
			}
			return false;
		}
	},
	Open:
	{
		Master: function (oArgs)
		{
			CL.axMasters.each(function ()
			{
				var sMasterId = $(this).attr("id");
				CLM[sMasterId] = new CLMaster({ xNode: this });
			});
			return true;
		},
		Slide: function (oArgs)
		{
			var jxSlideNode = null;
			if(oArgs!=null)
			{
				if(oArgs.slideid!=null)
				{
					jxSlideNode = CL.jxModule.find("slides > slide[id='" + oArgs.slideid + "']");
				}
				else
				{
					if(CL.sSlideId=="")
					{
						jxSlideNode = CL.jxModule.find("slides > slide:first");
					}
					else
					{
						jxSlideNode = CL.jxModule.find("slides > slide[id='" + CL.sSlideId + "']");
					}
				}
			}
			else
			{
				if(CL.sSlideId=="")
				{
					jxSlideNode = CL.jxModule.find("slides > slide:first");
				}
				else
				{
					jxSlideNode = CL.jxModule.find("slides > slide[id='" + CL.sSlideId + "']");
				}
			}
			if(jxSlideNode==null || jxSlideNode.length==0)
			{
				return false;
			}
			var sSlideId = jxSlideNode.attr("id");
			if(CLZ.sCurrentSlideId!=null && CLZ.sCurrentSlideId!="")
			{
				if(CLZ.sCurrentSlideId==sSlideId)
				{
					// destroy current slide immediately to replay it from scratch
					CLS[CLZ.sCurrentSlideId].Destroy();
				}
				else
				{
					// destroy current slide usual way
					if(CLS[CLZ.sCurrentSlideId].nTranOut!=null)
					{
						var jBoard = $(CL.oBoard).clone(true).attr({ "id": "CL_BOARD_CLONE" }).addClass("cl-board-clone").appendTo($(CL.oBoard).parent());
						var sEffect = CL.aTransitionsCommon[CLS[CLZ.sCurrentSlideId].nTranOut].t;
						var sDirection = (CL.aTransitionsCommon[CLS[CLZ.sCurrentSlideId].nTranOut].d!=null) ? CL.aTransitionsCommon[CLS[CLZ.sCurrentSlideId].nTranOut].d : "";
						jBoard.hide({ effect: sEffect, direction: sDirection, duration: CLS[CLZ.sCurrentSlideId].nDurOut, complete: function() { $(this).remove(); } });
					}
					CLS[CLZ.sCurrentSlideId].Destroy();
				}
			}
			if(CLS[sSlideId]==null)
			{
				CLS[sSlideId] = new CLSlide({ xNode: jxSlideNode[0] });
			}
			if(CL.sFrameId!="")
			{
				CLS[sSlideId].Start({ sStartFrom: CL.sFrameId });
			}
			else
			{
				CLS[sSlideId].Start();
			}
			return true;
		}
	},
	Proceed: function (oArgs)
	{
		CL.Open.Master(oArgs);
		CL.Open.Slide(oArgs);
		return true;
	},
	Q:
	{
		EvalCondition: function (oArgs)
		{
			var bCorrect = false;
			switch(oArgs.sType)
			{
				case "numeric":
				{
					var nValue = parseFloat(oArgs.sValue);
					var nCheck = parseFloat(oArgs.oCond.val);
					switch(oArgs.oCond.op)
					{
						case "eq":
						{
							bCorrect = (nValue==nCheck);
							break;
						}
						case "ne":
						{
							bCorrect = (nValue!=nCheck);
							break;
						}
						case "gt":
						{
							bCorrect = (nValue>nCheck);
							break;
						}
						case "gte":
						{
							bCorrect = (nValue>=nCheck);
							break;
						}
						case "lt":
						{
							bCorrect = (nValue<nCheck);
							break;
						}
						case "lte":
						{
							bCorrect = (nValue<=nCheck);
							break;
						}
					}
					break;
				}
				case "fib":
				{
					var sValue = $.trim(oArgs.sValue.toString());
					var sCheck = $.trim(oArgs.oCond.val.toString());
					if(oArgs.oCond.cs!=true)
					{
						sValue = sValue.toLowerCase();
						sCheck = sCheck.toLowerCase();
					}
					switch(oArgs.oCond.op)
					{
						case "eq":
						{
							bCorrect = (sValue==sCheck);
							break;
						}
						case "ne":
						{
							bCorrect = (sValue!=sCheck);
							break;
						}
						case "cn":
						{
							bCorrect = (sValue.indexOf(sCheck)!=-1);
							break;
						}
						case "bw":
						{
							bCorrect = (sValue.indexOf(sCheck)==0);
							break;
						}
						case "ew":
						{
							bCorrect = (sValue.indexOf(sCheck)==(sValue.length-sCheck.length));
							break;
						}
					}
					break;
				}
			}
			return bCorrect;
		},
		EvalSet: function (oArgs)
		{
			var aCorrect = [];
			for(var i=0; i<oArgs.oPattern.aConds.length; i++)
			{
				aCorrect.push( CL.Q.EvalCondition({ sType: oArgs.sType, sValue: oArgs.sValue, oCond: oArgs.oPattern.aConds[i] }) );
			}
			var bCorrect = (oArgs.oPattern.sOp=="AND");
			for(var i=0; i<aCorrect.length; i++)
			{
				if(oArgs.oPattern.sOp=="AND")
				{
					if(aCorrect[i]!=true)
					{
						bCorrect = false;
						break;
					}
				}
				else if(oArgs.oPattern.sOp=="OR")
				{
					if(aCorrect[i]==true)
					{
						bCorrect = true;
						break;
					}
				}
			}
			return bCorrect;
		},
		FixNumeric: function (oArgs)
		{
			var sText = $.trim(oArgs.sText).replace(/,/g, ".");
			sText = sText.replace(/[^0-9.-]/g, "");
			if(sText.indexOf(".")!=sText.lastIndexOf("."))
			{
				var aParts = sText.split(".");
				sText = aParts.shift() + "." + aParts.join("");
			}
			if(sText.indexOf("-")!=0)
			{
				sText = sText.replace(/-/g,"");
			}
			return sText;
		}
	},
	Resp:
	{
		EvalExpr: function (oArgs)
		{
			var sExpr = String(oArgs.sExpr);
			var bResult = false;
			var nResult = 0;
			if(sExpr.indexOf("#")==-1 && sExpr.indexOf("$")==-1 && sExpr.indexOf("@")==-1) // no vars/props/specs to eval
			{
				if(oArgs.bBool==true) // need boolean anyway
				{
					try
					{
						bResult = eval(sExpr);
					}
					catch(e)
					{}
					return !!bResult;
				}
				else if(oArgs.bNumeric==true)  // need numeric anyway
				{
					if(sExpr.indexOf("++")!=-1)
					{
						var aParts = sExpr.split("++");
						sExpr = aParts.join("+1");
					}
					if(sExpr.indexOf("--")!=-1)
					{
						var aParts = sExpr.split("--");
						sExpr = aParts.join("-1");
					}
					try
					{
						nResult = eval(sExpr);
					}
					catch(e)
					{}
					nResult = parseFloat(nResult);
					if(!isNaN(nResult))
					{
						return nResult;
					}
				}
				return sExpr;
			}
			else
			{
				sExpr = CL.Substitute.Property({ sString: sExpr, bEval: true });
				sExpr = CL.Substitute.Variable({ sString: sExpr, bEval: true });
				sExpr = CL.Substitute.Service({ sString: sExpr, bEval: true });
				if(sExpr.indexOf("++")!=-1)
				{
					var aParts = sExpr.split("++");
					sExpr = aParts.join("+1");
				}
				if(sExpr.indexOf("--")!=-1)
				{
					var aParts = sExpr.split("--");
					sExpr = aParts.join("-1");
				}
				if(!isNaN(parseFloat(sExpr))) // check numeric only
				{
					if(sExpr==(+sExpr+""))
					{
						return +sExpr; // return number
					}
				}
				try
				{
					sExpr = eval(sExpr);
				}
				catch(e)
				{}
				if(oArgs.bBool==true)
				{
					return !!sExpr;
				}
				else if(oArgs.bNumeric==true)
				{
					if(!isNaN(parseFloat(sExpr)))
					{
						return parseFloat(sExpr);
					}
				}
			}
			return sExpr;
		},
		GetResponse: function(oArgs)
		{
			var jResponse = CL.jxModule.find("RESPONSE[name='" + oArgs.respid + "']");
			return (jResponse.length>0) ? jResponse : null;
		},
		Process: function (oArgs)
		{
			var jxResponse;
			var sRespId;
			if(oArgs.jxResp!=null)
			{
				jxResponse = oArgs.jxResp;
				sRespId = jxResponse.attr("name");
			}
			else if(oArgs.respid!=null)
			{
				jxResponse = CL.jxModule.find("RESPONSE[name='" + oArgs.respid + "']");
				sRespId = oArgs.respid;
			}
			else if((oArgs.leftrespid!=null || oArgs.rightrespid!=null) && oArgs.evt!=null)
			{
				if(oArgs.evt.button==2)
				{
					if(oArgs.rightrespid!=null)
					{
						sRespId = oArgs.rightrespid;
					}
					else
					{
						return false;
					}
				}
				else if(oArgs.evt.button==0)
				{
					if(oArgs.leftrespid!=null)
					{
						sRespId = oArgs.leftrespid;
					}
					else
					{
						return false;
					}
				}
				else
				{
					return false;
				}
				jxResponse = CL.jxModule.find("RESPONSE[name='" + sRespId + "']");
			}
			else
			{
				return false;
			}
			var oThread = new Thread();
			oThread.Load({ sRespId: sRespId, jxActions: jxResponse.children() });
			oThread.sFrameId = CLZ.sCurrentFrameId; // !!!
			CL.listThreads.Append({ pElement: oThread });
			CL.iCurrentTime = (new Date()).valueOf();
			var oAction = oThread.Continue();
			if(oAction==null)
			{
				CL.listThreads.Remove({ pElement: oThread });
				CL.Resp.RemoveFrameThreads();
			}
			else
			{
				if(CL.iResTimer)
				{
					clearTimeout(CL.iResTimer);
				}
				CL.Resp.RemoveFrameThreads();
				CL.iResTimer = setTimeout(function () { CL.TimerMain(); }, CL.iResolution);
			}
			return true;
		},
		RemoveFrameThreads:  function (oArgs)
		{
			var oThread;
			for(var oThread = CL.listThreads.pFirst; oThread != null; )
			{
				var oNextThread = oThread.pNext;
				if(oThread.sFrameId != CLZ.sCurrentFrameId)
				{
					CL.listThreads.Remove({ pElement: oThread });
				}
				oThread = oNextThread;
			}
		}
	},
	Restore: function (oArgs)
	{
		if(oArgs==null) return null;
		if(oArgs.sId==null) return null;
		if(CLI[oArgs.sId]==null) return null;
		if(oArgs.sProp==null) return true;
		var oProps =
		{
			"id": "i",
			"timestamp": "t",
			"parent_id": "a",
			"type": "y",
			"duration": "d",
			"elapsed": "e",
			"patterns": "p",
			"objectives": "o",
			"attempts": "x",
			"response": "r",
			"result": "z",
			"score": "s",
			"scoring_type": "g",
			"attempts_max": "w",
			"latency": "l",
			"state": "v"
		};
		return CLI[oArgs.sId][oProps[oArgs.sProp]];
	},
	SCO:
	{
		ApplyRules: function (oArgs)
		{
			var sObjective;
			var sSS;
			var sCS;
			var axRules = CL.jxModule.find("rules > rule");
			var jxRule;
			var bCheckCS = false;
			var bCheckSS = false;
			var sObjId;
			for(var i=0; i<axRules.length; i++)
			{
				jxRule = $(axRules[i]);
				sObjId = jxRule.attr("objective");
				if(CLJ[sObjId]!=null)
				{
					sSS = jxRule.attr("ss");
					sCS = jxRule.attr("cs");
					bCheckCS = false;
					bCheckSS = false;
					if(sSS!=null)
					{
						bCheckSS = (CLJ[sObjId].sSS != sSS);
					}
					if(sCS!=null)
					{
						bCheckCS = (CLJ[sObjId].sCS != sCS);
					}
					if(bCheckSS || bCheckCS)
					{
						var bSuccess = false;
						var axChildConditions = jxRule.children("condition");		
						for(var j=0; j<axChildConditions.length; j++)
						{
							var jxChildCondition = $(axChildConditions[j]);
							var bChildSuccess = CL.SCO.CheckCondition({ jxCondition: jxChildCondition });
							if(j == 0)
							{
								bSuccess = bChildSuccess;
							}
							else
							{
								var sOp = jxChildCondition.attr("op");
								switch(sOp)
								{
									case "and":
									{
										bSuccess = bSuccess && bChildSuccess;
										break;
									}
									case "or":
									{
										bSuccess = bSuccess || bChildSuccess;
										break;
									}
									case "andnot":
									{
										bSuccess = bSuccess && !bChildSuccess;
										break;
									}
									case "ornot":
									{
										bSuccess = bSuccess || !bChildSuccess;
										break;
									}
								}
							}
						}
						if(bSuccess == true)
						{
							if(sSS!=null)
							{
								CLJ[sObjId].sSS = sSS;
							}
							if(sCS!=null)
							{
								CLJ[sObjId].sCS = sCS;
							}
						}
					}
				}
			}
		},
		CheckCondition: function (oArgs)
		{
			// jxCondition
			var bSuccess = false;
			try
			{ 
				var sType = oArgs.jxCondition.attr("type");
				switch (sType)
				{
					case "group":
					{
						var axChildConditions = oArgs.jxCondition.children("condition");		
						for(var i=0; i<axChildConditions.length; i++)
						{
							var jxChildCondition = $(axChildConditions[i]);
							var bChildSuccess = CL.SCO.CheckCondition({ jxCondition: jxChildCondition });
							if(i==0)
							{
								bSuccess = bChildSuccess;
							}
							else
							{
								var sOp = jxChildCondition.attr("op");
								switch(sOp)
								{
									case "and":
									{
										bSuccess = bSuccess && bChildSuccess;
										break;
									}
									case "or":
									{
										bSuccess = bSuccess || bChildSuccess;
										break;
									}
									case "andnot":
									{
										bSuccess = bSuccess && !bChildSuccess;
										break;
									}
									case "ornot":
									{
										bSuccess = bSuccess || !bChildSuccess;
										break;
									}
								}
							}
						}
						break;
					}
					case "visited":
					{
						var sConditionVisits = oArgs.jxCondition.attr("visits");
						if(sConditionVisits.length > 0)
						{
							var aToVisit = sConditionVisits.split(",");
							if(CLZ.aVisited.length >= aToVisit.length)
							{
								var bAllVisited = true;
								for(var i=0; i<aToVisit.length; i++)
								{
									if(!CL.SCO.IsVisited({ sBy: "sid", sSid: aToVisit[i] }))
									{
										bAllVisited = false;
										break;
									}
								}
								bSuccess = bAllVisited;
							}
						}
						break;
					}
					case "score":
					{
						var sObjId = oArgs.jxCondition.attr("objective");
						var sComp = oArgs.jxCondition.attr("comp");
						var nScore = +oArgs.jxCondition.attr("score");
						if (CLJ[sObjId]!=null)
						{
							var nRaw = +CLJ[sObjId].nRawScore;
							switch(sComp)
							{
								case "lt":
								{
									bSuccess = (nRaw < nScore);
									break;
								}
								case "gt":
								{
									bSuccess = (nRaw > nScore);
									break;
								}
								case "eq":
								{
									bSuccess = (nRaw==nScore);
									break;
								}
								case "le":
								{
									bSuccess = (nRaw <= nScore);
									break;
								}
								case "ge":
								{
									bSuccess = (nRaw >= nScore);
									break;
								}
								case "ne":
								{
									bSuccess = (nRaw != nScore);
									break;
								}
							}
						}
						break;
					}
					case "success":
					{
						var sObjId = oArgs.jxCondition.attr("objective");
						if(CLJ[sObjId]!=null)
						{
							bSuccess = (oArgs.jxCondition.attr("ss") == CLJ[sObjId].sSS);
						}
						break;
					}
		
					case "completion":
					{
						var sObjId = oArgs.jxCondition.attr("objective");
						if(CLJ[sObjId]!=null)
						{
							bSuccess = (oArgs.jxCondition.attr("cs") == CLJ[sObjId].sCS);
						}
						break;
					}
				}
			}
			catch (e)
			{
				alert("SCOCheckCondition: " + e.description);
			}
			return bSuccess;
		},
		Create: function (oArgs)
		{
			// init objectives
			$(CL.jxModule).find("objectives > objective").each(function ()
			{
				var sCS = $(this).attr("cs");
				if(sCS==null || sCS=="") { sCS = "n"; }
				if(sCS.length>1) { sCS = sCS.substring(0, 1); }
				var sSS = $(this).attr("ss");
				if(sSS==null || sSS=="") { sSS = "u"; }
				if(sSS.length>1) { sSS = sSS.substring(0, 1); }
				CLJ[$(this).attr("id")] =
				{
					id: $(this).attr("id"),
					bModule: ($(this).attr("module")=="yes" ? "1" : "0"),
					sName: $(this).attr("name"),
					sCS: sCS,
					sSS: sSS,
					nMin: +$(this).attr("scoremin"),
					nMax: +$(this).attr("scoremax"),
					nRawScore: 0,
					oSrc: {}
				};
			});
			return true;
		},
		CreateInteraction: function (oArgs)
		{
			if(oArgs==null) return null;
			if(oArgs.sId==null) return null;
			if(CLI[oArgs.sId]!=null)
			{
				if(oArgs.bReplace==true)
				{
					delete CLI[oArgs.sId];
				}
				else
				{
					return CLI[oArgs.sId];
				}
			}
			var dDate = new Date();
			var sDate = CLTOOLS.Convert.DateToISO8601(dDate);
			CLI[oArgs.sId] = { id: oArgs.sId, timestamp: sDate };
			return CLI[oArgs.sId];
		},
		GetInteraction: function (oArgs)
		{
			return (CLI[oArgs.sId]!=null ? CLI[oArgs.sId] : null);
		},
		GetInteractionArray: function (oArgs)
		{
			if(CLI[oArgs.sId]==null) return null;
			switch(oArgs.sParam)
			{
				case "objectives":
				{
					return CLI[oArgs.sId].objectives;
				}
				case "correct_responses":
				{
					return CLI[oArgs.sId].R;
				}
			}
			return null;
		},
		GetInteractionParam: function (oArgs)
		{
			if(CLI[oArgs.sId]==null) return null;
			switch(oArgs.sParam)
			{
				case "latency":
				{
					return CLI[oArgs.sId].sLatency;
				}
				case "timestamp":
				{
					return CLI[oArgs.sId].sTimestamp;
				}
				case "learner_response":
				{
					return CLI[oArgs.sId].l;
				}
				case "description":
				{
					return CLI[oArgs.sId].d;
				}
				case "result":
				{
					return CLI[oArgs.sId].r;
				}
				case "type":
				{
					return CLI[oArgs.sId].t;
				}
			}
			return null;
		},
		GetObjectiveCompletionStatus: function (oArgs)
		{
			if(oArgs==null) return "";
			if(oArgs.sId==null) return "";
			if(CLJ[oArgs.sId]==null) return "";
			return CLJ[oArgs.sId].sCS;
		},
		GetObjectiveScore: function (oArgs)
		{
			if(oArgs==null) return 0;
			if(oArgs.sId==null) return 0;
			if(CLJ[oArgs.sId]==null) return 0;
			if((oArgs.sSrcId==null) || (oArgs.sSrcId==""))
			{
				return +CLJ[oArgs.sId].nRawScore;
			}
			else
			{
				return +CLJ[oArgs.sId].oSrc[oArgs.sSrcId].nRawScore;
			}
			return 0;
		},
		GetObjectiveSuccessStatus: function (oArgs)
		{
			if(oArgs==null) return "";
			if(oArgs.sId==null) return "";
			if(CLJ[oArgs.sId]==null) return "";
			return CLJ[oArgs.sId].sSS;
		},
		IsVisited: function (oArgs)
		{
			if(oArgs==null) return false;
			var jxSlide;
			var sSlideId;
			if(oArgs.sBy=="slideid")
			{
				if(oArgs.sSlideId==null) return false;
				jxSlide = CL.jxModule.find("slide[id='" + oArgs.sSlideId + "']");
				if(jxSlide.length==0) return false;
				sSlideId = oArgs.sSlideId;
			}
			else
			{
				if(oArgs.sSid==null || oArgs.sSid=="") return false;
				jxSlide = CL.jxModule.find("slide[sid='" + oArgs.sSid + "']");
				if(jxSlide.length==0) return false;
				sSlideId = jxSlide.attr("id");
			}
			if(sSlideId==null || sSlideId=="") return false;
			return ($.inArray(sSlideId, CLZ.aVisited)!=-1);
		},
		RemoveInteraction: function (oArgs)
		{
			if(CLI[oArgs.sId]!=null)
			{
				delete CLI[oArgs.sId];
				return true;
			}
			return false;
		},
		RemoveScoreFromObjective: function (oArgs)
		{
			if(oArgs==null) return false;
			if(oArgs.sId==null || oArgs.sSrcId==null) return false;
			if(CLJ[oArgs.sId]==null) return false;
			var sSrcId = ((oArgs.sSrcId==null) || (oArgs.sSrcId=="")) ? "_*_" : oArgs.sSrcId;
			if(CLJ[oArgs.sId].oSrc[sSrcId]==null) return false;
			delete CLJ[oArgs.sId].oSrc[sSrcId];
			var nTotal = 0;
			for(var sKey in CLJ[oArgs.sId].oSrc)
			{
				nTotal += +CLJ[oArgs.sId].oSrc[sKey].nRawScore;
			}
			CLJ[oArgs.sId].nRawScore = nTotal;
			CL.SCO.ApplyRules();
			return true;
		},
		SetInteractionParam: function (oArgs)
		{
			if(CLI[oArgs.sId]==null) return null;
			switch(oArgs.sParam)
			{
				case "latency":
				{
					CLI[oArgs.sId].sLatency = oArgs.sValue;
					break;
				}
				case "timestamp":
				{
					CLI[oArgs.sId].sTimestamp = oArgs.sValue;
					break;
				}
				case "learner_response":
				{
					CLI[oArgs.sId].l = oArgs.sValue;
					break;
				}
				case "description":
				{
					CLI[oArgs.sId].d = oArgs.sValue;
					break;
				}
				case "result":
				{
					CLI[oArgs.sId].r = oArgs.sValue;
					break;
				}
				case "type":
				{
					CLI[oArgs.sId].t = oArgs.sValue;
				}
			}
			return true;
		},
		SetInteractionArrayItem: function (oArgs)
		{
			if(CLI[oArgs.sId]==null) return null;
			switch(oArgs.sParam)
			{
				case "objectives":
				{
					if(CLI[oArgs.sId].O==null)
					{
						CLI[oArgs.sId].O = [];
					}
					if($.inArray(oArgs.sValue, CLI[oArgs.sId].O)==-1)
					{
						CLI[oArgs.sId].O.push(oArgs.sValue);
					}
					break;
				}
				case "correct_responses":
				{
					if(CLI[oArgs.sId].R==null)
					{
						CLI[oArgs.sId].R = [];
					}
					if($.inArray(oArgs.sValue, CLI[oArgs.sId].R)==-1)
					{
						CLI[oArgs.sId].R.push(oArgs.sValue);
					}
					break;
				}
			}
			return true;
		},
		SetObjectiveCompletionStatus: function (oArgs)
		{
			// sId, sStatus
			if(CLJ[oArgs.sId]!=null)
			{
				if(CLJ[oArgs.sId].sCS!=oArgs.sStatus)
				{
					CLJ[oArgs.sId].sCS = oArgs.sStatus;
					CL.SCO.ApplyRules();
				}
				return true;
			}
			return false;
		},
		SetObjectiveScore: function (oArgs)
		{
			// sId, nScore, sSrcId, bReplace
			if(oArgs==null) return false;
			if(oArgs.sId==null || oArgs.nScore==null) return false;
			if(CLJ[oArgs.sId]==null) return false;
			var sSrcId = ((oArgs.sSrcId==null) || (oArgs.sSrcId=="")) ? "_*_" : oArgs.sSrcId;
			if(CLJ[oArgs.sId].oSrc[sSrcId]==null)
			{
				CLJ[oArgs.sId].oSrc[sSrcId] = {};
			}
			if(oArgs.bReplace==true)
			{
				CLJ[oArgs.sId].oSrc[sSrcId].nRawScore = +oArgs.nScore;
			}
			else
			{
				if(CLJ[oArgs.sId].oSrc[sSrcId].nRawScore==null)
				{
					CLJ[oArgs.sId].oSrc[sSrcId].nRawScore = 0;
				}
				var nScore = +CLJ[oArgs.sId].oSrc[sSrcId].nRawScore;
				nScore += +oArgs.nScore;
				CLJ[oArgs.sId].oSrc[sSrcId].nRawScore = nScore;
			}
			var nTotal = 0;
			for(var sKey in CLJ[oArgs.sId].oSrc)
			{
				nTotal += +CLJ[oArgs.sId].oSrc[sKey].nRawScore;
			}
			CLJ[oArgs.sId].nRawScore = nTotal;
			CL.SCO.ApplyRules();
			return true;
		},
		SetObjectiveSuccessStatus: function (oArgs)
		{
			// sId, sStatus
			if(CLJ[oArgs.sId]!=null)
			{
				if(CLJ[oArgs.sId].sSS!=oArgs.sStatus)
				{
					CLJ[oArgs.sId].sSS = oArgs.sStatus;
					CL.SCO.ApplyRules();
				}
				return true;
			}
			return false;
		}
	},
	Search: function (oArgs)
	{
		function fnCheckMatches(oA)
		{
			var oDiv;
			var oDataObject = oA.xNode;
			var oSearchItem = oA.sItem;
			var bCS = oA.bCase;
	
			var sReturn = ""
			var aReturn = [];
	
			var sItem = oSearchItem.str;
			var sKey = oSearchItem.key;
			if(!bCS) sItem = sItem.toLowerCase();
			var sTxt = "";
			var sTmp = "";
	
			var iStart = 0;
			var iEnd = 0;
			var iIdx = -1;
			var aChunks = [];
	
			var iFirstItem = 0;
			var sFirstItem = "";
		
			var jDiv = $(document.createElement("div")).html($(oDataObject).text());
			sTxt = jDiv.text();
	
			var re = /[\n\r]/g;
			sTxt = sTxt.replace(re," ");
			re = /&nbsp;/g;
			sTxt = sTxt.replace(re," ");
			re = /[\.\:\?\!\(\)\[\]\{\},;]/g;
			sTxt = sTxt.replace(re," ");
			re = /[-"]/g;
			sTxt = sTxt.replace(re,"");
			re = /\s+/g;
			sTxt = sTxt.replace(re," ");
	
			var aWords = sTxt.split(" ");
			var sResult = "";
			var iCount = 0;
			if(!bCS) sTxt = sTxt.toLowerCase();
	
			switch(sKey)
			{
				case "bw":
				{
					aChunks = sItem.split("*");
					sItem = aChunks[0];
					iIdx = sTxt.indexOf(sItem);
					if(iIdx==-1) break;
					for(var i=0;i<aWords.length;i++)
					{
						if(aWords[i]=="") continue;
						sTmp = bCS ? aWords[i] : aWords[i].toLowerCase();
						iIdx = sTmp.indexOf(sItem);
						if(iIdx!=0) continue;

						sResult = " <span class='cl-found'>" + aWords[i] + "</span> ";
						if(i!=0) sResult = aWords[i-1] + sResult;
						if(i!=aWords.length-1) sResult += aWords[i+1];
						sResult = "..." + sResult + "...";
						aReturn.push(sResult);
					}
					break;
				}
				case "ew":
				{
					aChunks = sItem.split("*");
					sItem = aChunks[1];
					iIdx = sTxt.indexOf(sItem);
					if(iIdx==-1) break;
					for(var i=0;i<aWords.length;i++)
					{
						if(aWords[i]=="") continue;
						sTmp = bCS ? aWords[i] : aWords[i].toLowerCase();
						iIdx = sTmp.indexOf(sItem);
						if(aWords[i].length!=iIdx+sItem.length) continue;

						sResult = " <span class='cl-found'>" + aWords[i] + "</span> ";
						if(i!=0) sResult = aWords[i-1] + sResult;
						if(i!=aWords.length-1) sResult += aWords[i+1];
						sResult = "..." + sResult + "...";
						aReturn.push(sResult);
					}
					break;
				}
				case "cn":
				{
					aChunks = sItem.split("*");
					for(var i=0;i<aChunks.length;i++)
					{
						iFirstItem = i;
						sFirstItem = aChunks[i];
						if(sFirstItem!="") break;
					}
					iIdx = sTxt.indexOf(sFirstItem);
					if(iIdx==-1) break;
					wloop:
					for(var i=0;i<aWords.length;i++)
					{
						if(aWords[i]=="") continue;
						sTmp = bCS ? aWords[i] : aWords[i].toLowerCase();
						if(sTmp.indexOf(sFirstItem)==-1) continue;
						iStart = 0;
						for(var j=iFirstItem;j<aChunks.length;j++)
						{
							if(aChunks[j]=="") continue;
							iIdx = sTmp.indexOf(aChunks[j], iStart);
							if(iIdx==-1) continue wloop;
							if(j==0 && iIdx!=0) continue wloop; // if begins with
							if(j==aChunks.length-1 && iIdx!=aWords[i].length-aChunks[j].length) continue wloop; // if ends with
							iStart = iIdx + aChunks[j].length;
						}
						sResult = " <span class='cl-found'>" + aWords[i] + "</span> ";
						if(i!=0) sResult = aWords[i-1] + sResult;
						if(i!=aWords.length-1) sResult += aWords[i+1];
						sResult = "..." + sResult + "...";
						aReturn.push(sResult);
					}
					break;
				}
				case "ep":
				{
					aChunks = sItem.split(" ");
					for(var i=0;i<aChunks.length;i++)
					{
						iFirstItem = i;
						sFirstItem = aChunks[i];
						if(sFirstItem!="") break;
					}
					iIdx = sTxt.indexOf(sFirstItem);
					if(iIdx==-1) break;
					mainloop:
					for(var i=0;i<aWords.length;i++)
					{
						if(aWords[i]=="") continue;
						sTmp = bCS ? aWords[i] : aWords[i].toLowerCase();
						if(sTmp!=sFirstItem) continue;

						iCount = -1;
						for(var j=iFirstItem;j<aChunks.length;j++)
						{
							iCount++;
							sTmp = bCS ? aWords[i+iCount] : aWords[i+iCount].toLowerCase();
							if(aChunks[j]==sTmp) continue;
							continue mainloop;
						}
						sResult = " <span class='cl-found'>" + sItem + "</span> ";
						if(i!=0) sResult = aWords[i-1] + sResult;
						if(i!=aWords.length-aChunks.length-1) sResult += aWords[i+aChunks.length+1];
						sResult = "..." + sResult + "...";
						aReturn.push(sResult);
					}
					break;
				}
				case "wr":
				{
					iIdx = sTxt.indexOf(sItem);
					if(iIdx==-1) break;
					for(var i=0;i<aWords.length;i++)
					{
						if(aWords[i]=="") continue;
						sTmp = bCS ? aWords[i] : aWords[i].toLowerCase();
						if(sTmp!=sItem) continue;

						sResult = " <span class='cl-found'>" + aWords[i] + "</span> ";
						if(i!=0) sResult = aWords[i-1] + sResult;
						if(i!=aWords.length-1) sResult += aWords[i+1];
						sResult = "..." + sResult + "...";
						aReturn.push(sResult);
					}
					break;
				}
			}
			oDiv = null;
			return aReturn;
		}
		var bCase = oArgs.bCase;
		var bAND = oArgs.sLogic=="AND";
		var sScope = oArgs.sScope;
		var sText = oArgs.sString;
		var iIdx = -1;
		var aSlidesFound = [];
		
		var aObjectData = [];
		var aStringsToSearch = [];
		var aStringsToParse = [];
		var aParts = [];
		var aChunks = [];

		var aStringsFound = [];
		var aSlideStringsFound = [];
		var aObjectStringsFound = [];
		var aObjectMatchesFound = [];

		var aSlideItemFlags = [];
		var aItemFlags = [];

		var oSObj = {};
	
		var sTxt = "";
		var sSearchString = bCase ? sText : sText.toLowerCase();
		var aDebug = [];
	
		if(sText.indexOf("\"")!=-1)
		{
			// Looking for exact phrase patterns and pushing them "as is"
			aParts = sText.split("\"");
			// Check if all quotes are in pairs
			if(aParts.length<3)
			{
				// Only one quotemark - removing it from search
				for(var i=0;i<aParts.length;i++)
				{
					if(aParts[i]!="") aStringsToParse.push(aParts[i]);
				}
			}
			else
			{
				var bExact = false;
				for(var i=0;i<aParts.length;i++)
				{
					if(aParts[i]=="")
					{
						bExact = true;
						continue;
					}
					if(bExact)
					{
						if(aParts[i]!="") {
							oSObj = {};
							oSObj.str = aParts[i];
							oSObj.key = "ep"; // exact phrase
							aStringsToSearch.push(oSObj);
						}
					}
					else
					{
						if(aParts[i]!="") aStringsToParse.push(aParts[i]);
					}
					bExact = !bExact;
				}
			}
		}
		else
		{
			aStringsToParse.push(sSearchString);
		}
	
		// Adding other search items
		for(var i=0;i<aStringsToParse.length;i++)
		{
			if(aStringsToParse[i]=="") continue;
			aParts = aStringsToParse[i].split(" ");
			for(var j=0;j<aParts.length;j++)
			{
				if(aParts[j]=="") continue;
				oSObj = {};
				oSObj.str = aParts[j];
				iIdx = aParts[j].indexOf("*");
				if(iIdx==-1)
				{
					oSObj.key = "wr"; // exact word
				}
				else
				{
					aChunks = aParts[j].split("*");
					if(aChunks.length==2)
					{
						oSObj.key = (iIdx==0) ? "ew" : "bw";    // begins or ends with
					}
					else
					{
						oSObj.key = "cn";    // contains or complex case
					}
				}
				aStringsToSearch.push(oSObj);
			}
		}
	
//		var oArgs = new Object();
//		oArgs.pid = argobj.pid;
	
		var aResults = [];
		var jxObjectData;
		slidesloop:
		for(var i=0;i<CL.axSlides.length;i++)
		{
			aStringsFound = new Array();
			aSlideStringsFound = new Array();
			jxObjectData = $(CL.axSlides[i]).find("object > data");
			for(var k=0;k<aStringsToSearch.length;k++) aSlideItemFlags[k] = false;

			objloop:
			for(var j=0;j<jxObjectData.length;j++)
			{
				aObjectStringsFound = new Array();
				for(var k=0;k<aStringsToSearch.length;k++) aItemFlags[k] = false;
				for(var k=0;k<aStringsToSearch.length;k++)
				{
					aObjectMatchesFound = fnCheckMatches({ xNode: jxObjectData[j], sItem: aStringsToSearch[k], bCase: bCase });
					if(aObjectMatchesFound.length==0)
					{
						if(bAND && sScope=="object") continue objloop;
						continue;
					}
					aObjectStringsFound = aObjectStringsFound.concat(aObjectMatchesFound);
					aItemFlags[k] = true;
				}
				for(var k=0;k<aStringsToSearch.length;k++)
				{
					if(aItemFlags[k]) aSlideItemFlags[k] = true;
				}
				aSlideStringsFound = aSlideStringsFound.concat(aObjectStringsFound);
			}
			if(bAND && sScope=="slide")
			{
				for(var k=0;k<aStringsToSearch.length;k++)
				{
					if(!aSlideItemFlags[k]) continue slidesloop;
				}
			}
			aStringsFound = aStringsFound.concat(aSlideStringsFound);
			aDebug = aDebug.concat(aStringsFound);
			if(aSlideStringsFound.length>0)
			{
				// aSlidesFound.push(aSlides[i]);
				var oResult = new Object();
				oResult.slide = CL.axSlides[i];
				oResult.strings = aSlideStringsFound;
				aResults.push(oResult);
			}
		}
		return aResults;
	},
	Shutdown: function (oArgs)
	{
		if(CLZ.bInit)
		{
			CL.SCO.ApplyRules();
			CLLMS.Save();
			CLLMS.Shutdown();
			try
			{
				ShutdownModule();
			}
			catch(e)
			{
				alert("User function ShutdownModule() failed. \nError: " + e);
			}
		}
	},
	Slide:
	{
		Exists: function (oArgs)
		{
			switch(oArgs.selectby)
			{
				case "slideid":
				{
					if(oArgs.slideid==null || oArgs.slideid=="") break;
					return (CL.axSlides.children("slide[id='" + oArgs.slideid + "']").length==1);
					break;
				}
				case "dir":
				{
					if(oArgs.dir==null || oArgs.dir=="") break;
					var sSlideId = (oArgs.from==null) ? CL.oCurrent.sSlideId : oArgs.from;
					var jCurSlide = CL.axSlides.children("slide[id='" + sSlideId + "']");
					if(jCurSlide.length!=1) break;
					var jStructure = CL.Get.AlternativePath({});
					if(jStructure.length)
					break;
				}
			}
			return false;
		}
	},
	Sound:
	{
		Append: function (oArgs)
		{
			if(oArgs.oContainer==null || oArgs.sId==null || oArgs.sType==null) return null;
			var sSrc = "";
			if(oArgs.sType!="custom")
			{
				var jAudio = $(document.createElement("audio")).attr({ "id": oArgs.sId }).appendTo($(oArgs.oContainer));
				if(CLD.oCanPlay["mp3"])
				{
					sSrc = CLD.oSoundFiles[oArgs.sType];
					jAudio.attr({ "preload": "auto" }).append( $(document.createElement("source")).attr({ "src": sSrc, "type": "audio/mpeg" }) );
				}
				else if(CLD.oCanPlay["ogg"])
				{
					sSrc = CLD.oSoundFiles[oArgs.sType + "ogg"];
					jAudio.attr({ "preload": "auto" }).append( $(document.createElement("source")).attr({ "src": sSrc, "type": "audio/ogg" }) );
				}
			}
			else
			{
				if(oArgs.sFile!=null && oArgs.sFile!="")
				{
					var aParts = oArgs.sFile.split(".");
					var sExt = aParts[aParts.length-1].toLowerCase();
					switch(sExt)
					{
						case "mp3":
						{
							var jAudio = $(document.createElement("audio")).attr({ "id": oArgs.sId }).appendTo($(oArgs.oContainer));
							if(CLD.oCanPlay["mp3"])
							{
								sSrc = oArgs.sFile;
								jAudio.attr({ "preload": "auto" }).append( $(document.createElement("source")).attr({ "src": sSrc, "type": "audio/mpeg" }) );
							}
							else if(CLD.oCanPlay["ogg"])
							{
								sSrc = oArgs.sFile.substring(0, iIdx) + ".ogg";
								jAudio.attr({ "src": sSrc });
							}
							break;
						}
						case "ogg":
						case "oga":
						{
							var jAudio = $(document.createElement("audio")).attr({ "id": oArgs.sId }).appendTo($(oArgs.oContainer));
							if(CLD.oCanPlay["ogg"])
							{
								sSrc = oArgs.sFile;
								jAudio.attr({ "preload": "auto" }).append( $(document.createElement("source")).attr({ "src": sSrc, "type": "audio/ogg" }) );
							}
							break;
						}
						case "swf":
						{
							var jFlash = (new CLFlash({ container: $(oArgs.oContainer), sPath: CL.sDummySWF, nWidth: 1, nHeight: 1, oParams: { }}));
							jAudio = jFlash.jFPlayer;
							jAudio.attr({ "data-file": oArgs.sFile });
							break;
						}
						case "wav":
						{
							var jAudio = $(document.createElement("audio")).attr({ "id": oArgs.sId }).appendTo($(oArgs.oContainer));
							if(CLD.oCanPlay["wav"])
							{
								sSrc = oArgs.sFile;
								jAudio.attr({ "preload": "auto" }).append( $(document.createElement("source")).attr({ "src": sSrc, "type": "audio/wav" }) );
							}
							break;
						}
						case "webm":
						{
							var jAudio = $(document.createElement("audio")).attr({ "id": oArgs.sId }).appendTo($(oArgs.oContainer));
							if(CLD.oCanPlay["webm"])
							{
								sSrc = oArgs.sFile;
								jAudio.attr({ "preload": "auto" }).append( $(document.createElement("source")).attr({ "src": sSrc, "type": "audio/webm" }) );
							}
							break;
						}
						default:
						{
							var jAudio = $(document.createElement("audio")).attr({ "id": oArgs.sId }).appendTo($(oArgs.oContainer));
							if(CLD.oCanPlay[sExt])
							{
								sSrc = oArgs.sFile;
								jAudio.attr({ "src": sSrc });
							}
							break;
						}
					}
				}
			}
			return jAudio;
		},
		CLPlay: function (oArgs)
		{
			if(oArgs.jPlayer==null) return false;
			if(oArgs.jPlayer.length==0) return false;
			var sNodeName = oArgs.jPlayer[0].nodeName.toLowerCase();
			if(sNodeName=="audio")
			{
				try
				{
					oArgs.jPlayer[0].currentTime = 0;
					oArgs.jPlayer[0].play();
				}
				catch(e)
				{}
			}
			else if(sNodeName=="object")
			{
				try
				{
					oArgs.jPlayer.attr({ "src": oArgs.jPlayer.attr("data-file") });
					oArgs.jPlayer[0].LoadMovie(0, oArgs.jPlayer.attr("data-file"));
					oArgs.jPlayer[0].Play();
				}
				catch(e)
				{}
			}
			return true;
		},
		CLStop: function (oArgs)
		{
			if(oArgs.jPlayer==null) return false;
			if(oArgs.jPlayer.length==0) return false;
			var sNodeName = oArgs.jPlayer[0].nodeName.toLowercase();
			if(sNodeName=="audio")
			{
				try
				{
					oArgs.jPlayer[0].pause();
				}
				catch(e)
				{}
			}
			else if(sNodeName=="object")
			{
				try
				{
					oArgs.jPlayer.attr({ "src": CL.sDummySWF });
					oArgs.jPlayer[0].LoadMovie(0, CL.sDummySWF);
				}
				catch(e)
				{}
			}
			return true;
		},
		Disable: function (oArgs)
		{
			CL.Sound.Stop();
			CLZ.bSoundOn = false;
			return true;
		},
		Enable: function (oArgs)
		{
			CLZ.bSoundOn = true;
			return true;
		},
		Init: function (oArgs)
		{
			var jAudio = $(document.createElement("audio")).addClass("cl-audio-check").appendTo($(".cl-audio-container"));
			CLD.oCanPlay["mp3"] = (jAudio[0].canPlayType("audio/mpeg")!="");
			CLD.oCanPlay["mp4"] = (jAudio[0].canPlayType("audio/mp4")!="");
			CLD.oCanPlay["oga"] = CLD.oCanPlay["ogg"] = (jAudio[0].canPlayType("audio/ogg")!="");
			CLD.oCanPlay["wav"] = (jAudio[0].canPlayType("audio/wav")!="");
			CLD.oCanPlay["webm"] = (jAudio[0].canPlayType("audio/webm")!="");
			jAudio.remove();
			var jVideo = $(document.createElement("video")).addClass("cl-video-check").appendTo($(".cl-audio-container"));
			CLD.oCanPlay["ogv"] = (jVideo[0].canPlayType("video/ogg")!="");
			CLD.oCanPlay["mkv"] = (jVideo[0].canPlayType("video/x-matroska")!="");
			CLD.oCanPlay["3gp"] = (jVideo[0].canPlayType("video/3gpp")!="");
			jVideo.remove();
			return true;
		},
		Play: function (oArgs)
		{
			if(CLZ.bSoundOn)
			{
				CL.Sound.Stop({ sEvent: oArgs.sEvent });
				switch(oArgs.sEvent)
				{
					case "global":
					{
						if(oArgs.sFile==null) return false;
						if(oArgs.sFile.toLowerCase().indexOf(".swf")!=-1)
						{
							if(CL.ajAudio["swfaudio5"]==null)
							{
								CL.ajAudio["swfaudio5"] = (new CLFlash({ container: $(".cl-audio-container"), sPath: CL.sDummySWF, nWidth: 1, nHeight: 1, oParams: { }})).jFPlayer;
							}
							try
							{
								CL.ajAudio["swfaudio5"][0].LoadMovie(0, oArgs.sFile);
							}
							catch(e)
							{
								CL.ajAudio["swfaudio5"].attr({ "src": oArgs.sFile });
							}
							try
							{
								CL.ajAudio["swfaudio5"][0].Play();
							}
							catch(e){}
						}
						else
						{
							if(CL.ajAudio["audio5"]==null)
							{
								CL.ajAudio["audio5"] = $("#CLAudio5");
							}
							CL.ajAudio["audio5"].attr({ "src": oArgs.sFile });
							CL.ajAudio["audio5"][0].play();
						}
						break;
					}
					case "action":
					{
						if(oArgs.sFile==null) return false;
						if(oArgs.sFile.toLowerCase().indexOf(".swf")!=-1)
						{
							if(CL.ajAudio["swfaudio4"]==null)
							{
								CL.ajAudio["swfaudio4"] = (new CLFlash({ container: $(".cl-audio-container"), sPath: CL.sDummySWF, nWidth: 1, nHeight: 1, oParams: { }})).jFPlayer;
							}
							try
							{
								CL.ajAudio["swfaudio4"][0].LoadMovie(0, oArgs.sFile);
							}
							catch(e)
							{
								CL.ajAudio["swfaudio4"].attr({ "src": oArgs.sFile });
							}
							try
							{
								CL.ajAudio["swfaudio4"][0].Play();
							}
							catch(e){}
						}
						else
						{
							if(CL.ajAudio["audio4"]==null)
							{
								CL.ajAudio["audio4"] = $("#CLAudio4");
							}
							CL.ajAudio["audio4"].attr({ "src": oArgs.sFile });
							CL.ajAudio["audio4"][0].play();
						}
						break;
					}
					case "narration":
					case "success":
					case "failure":
					{
						if(oArgs.sFile==null) return false;
						if(oArgs.sFile.toLowerCase().indexOf(".swf")!=-1)
						{
							if(CL.ajAudio["swfaudio3"]==null)
							{
								CL.ajAudio["swfaudio3"] = (new CLFlash({ container: $(".cl-audio-container"), sPath: CL.sDummySWF, nWidth: 1, nHeight: 1, oParams: { }})).jFPlayer;
							}
							try
							{
								CL.ajAudio["swfaudio3"][0].LoadMovie(0, oArgs.sFile);
							}
							catch(e)
							{
								CL.ajAudio["swfaudio3"].attr({ "src": oArgs.sFile });
							}
							try
							{
								CL.ajAudio["swfaudio3"][0].Play();
							}
							catch(e){}
						}
						else
						{
							if(CL.ajAudio["audio3"]==null)
							{
								CL.ajAudio["audio3"] = $("#CLAudio3");
							}
							CL.ajAudio["audio3"].attr({ "src": oArgs.sFile });
							CL.ajAudio["audio3"][0].play();
						}
						break;
					}
					case "object":
					{
						if(oArgs.sFile==null) return false;
						if(oArgs.sFile.toLowerCase().indexOf(".swf")!=-1)
						{
							if(CL.ajAudio["swfaudio2"]==null)
							{
								CL.ajAudio["swfaudio2"] = (new CLFlash({ container: $(".cl-audio-container"), sPath: CL.sDummySWF, nWidth: 1, nHeight: 1, oParams: { }})).jFPlayer;
							}
							try
							{
								CL.ajAudio["swfaudio2"][0].LoadMovie(0, oArgs.sFile);
							}
							catch(e)
							{
								CL.ajAudio["swfaudio2"].attr({ "src": oArgs.sFile });
							}
							try
							{
								CL.ajAudio["swfaudio2"][0].Play();
							}
							catch(e){}
						}
						else
						{
							if(CL.ajAudio["audio2"]==null)
							{
								CL.ajAudio["audio2"] = $("#CLAudio2");
							}
							CL.ajAudio["audio2"].attr({ "src": oArgs.sFile });
							CL.ajAudio["audio2"][0].play();
						}
						break;
					}
					default:
					{
						if(oArgs.sFile==null && oArgs.sType=="custom") return false;
						var sFile = (oArgs.sType=="custom") ? oArgs.sFile : CLD.oSoundFiles[oArgs.sType];
						if(sFile==null) return false;
						if(sFile.toLowerCase().indexOf(".swf")!=-1)
						{
							if(CL.ajAudio["swfaudio1"]==null)
							{
								CL.ajAudio["swfaudio1"] = (new CLFlash({ container: $(".cl-audio-container"), sPath: CL.sDummySWF, nWidth: 1, nHeight: 1, oParams: { }})).jFPlayer;
							}
							if(CL.ajAudio["swfaudio1"].length!=0)
							{
								try
								{
									CL.ajAudio["swfaudio1"][0].LoadMovie(0, sFile);
								}
								catch(e)
								{
									CL.ajAudio["swfaudio1"].attr({ "src": sFile });
								}
								try
								{
									CL.ajAudio["swfaudio1"][0].Play();
								}
								catch(e){}
							}
						}
						else
						{
							if(CL.ajAudio["audio1"]==null)
							{
								CL.ajAudio["audio1"] = $("#CLAudio1");
							}
							if(CL.ajAudio["audio1"].length!=0)
							{
								if(oArgs.sType!="custom")
								{
									if(CL.ajAudio["audio1"][0].canPlayType("audio/mp3")=="")
									{
										sFile = CLD.oSoundFiles[oArgs.sType + "ogg"];
									}
								}
								CL.ajAudio["audio1"].attr({ "src": sFile });
								CL.ajAudio["audio1"][0].play();
							}
						}
						break;
					}
				}
			}
			return true;
		},
		Stop: function (oArgs)
		{
			var sType = (oArgs==null) ? "" : oArgs.sEvent;
			switch(sType)
			{
				case "over":
				case "click":
				{
					if(CL.ajAudio["audio1"]!=null)
					{
						if(CL.ajAudio["audio1"].length!=0)
						{
							CL.ajAudio["audio1"][0].pause();
						}
					}
					if(CL.ajAudio["swfaudio1"]!=null)
					{
						if(CL.ajAudio["swfaudio1"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio1"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio1"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					break;
				}
				case "object":
				{
					if(CL.ajAudio["audio2"]!=null)
					{
						if(CL.ajAudio["audio2"].length!=0)
						{
							CL.ajAudio["audio2"][0].pause();
						}
					}
					if(CL.ajAudio["swfaudio2"]!=null)
					{
						if(CL.ajAudio["swfaudio2"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio2"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio2"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					break;
				}
				case "narration":
				case "success":
				case "failure":
				{
					if(CL.ajAudio["audio3"]!=null)
					{
						if(CL.ajAudio["audio3"].length!=0)
						{
							CL.ajAudio["audio3"][0].pause();
						}
					}
					if(CL.ajAudio["swfaudio3"]!=null)
					{
						if(CL.ajAudio["swfaudio3"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio3"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio3"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					break;
				}
				case "action":
				{
					if(CL.ajAudio["audio4"]!=null)
					{
						if(CL.ajAudio["audio4"].length!=0)
						{
							CL.ajAudio["audio4"][0].pause();
						}
					}
					if(CL.ajAudio["swfaudio4"]!=null)
					{
						if(CL.ajAudio["swfaudio4"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio4"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio4"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					break;
				}
				case "global":
				{
					if(CL.ajAudio["audio5"]!=null)
					{
						if(CL.ajAudio["audio5"].length!=0)
						{
							CL.ajAudio["audio5"][0].pause();
						}
					}
					if(CL.ajAudio["swfaudio5"]!=null)
					{
						if(CL.ajAudio["swfaudio5"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio5"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio5"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					break;
				}
				default:
				{
					if(CL.ajAudio["audio1"]!=null)
					{
						if(CL.ajAudio["audio1"].length!=0)
						{
							CL.ajAudio["audio1"][0].pause();
						}
					}
					if(CL.ajAudio["audio2"]!=null)
					{
						if(CL.ajAudio["audio2"].length!=0)
						{
							CL.ajAudio["audio2"][0].pause();
						}
					}
					if(CL.ajAudio["audio3"]!=null)
					{
						if(CL.ajAudio["audio3"].length!=0)
						{
							CL.ajAudio["audio3"][0].pause();
						}
					}
					if(CL.ajAudio["audio4"]!=null)
					{
						if(CL.ajAudio["audio4"].length!=0)
						{
							CL.ajAudio["audio4"][0].pause();
						}
					}
					if(CL.ajAudio["audio5"]!=null)
					{
						if(CL.ajAudio["audio5"].length!=0)
						{
							CL.ajAudio["audio5"][0].pause();
						}
					}
					if(CL.ajAudio["swfaudio1"]!=null)
					{
						if(CL.ajAudio["swfaudio1"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio1"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio1"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					if(CL.ajAudio["swfaudio2"]!=null)
					{
						if(CL.ajAudio["swfaudio2"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio2"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio2"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					if(CL.ajAudio["swfaudio3"]!=null)
					{
						if(CL.ajAudio["swfaudio3"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio3"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio3"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					if(CL.ajAudio["swfaudio4"]!=null)
					{
						if(CL.ajAudio["swfaudio4"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio4"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio4"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					if(CL.ajAudio["swfaudio5"]!=null)
					{
						if(CL.ajAudio["swfaudio5"].length>0)
						{
							try
							{
								CL.ajAudio["swfaudio5"].attr({ "src": CL.sDummySWF });
								CL.ajAudio["swfaudio5"][0].LoadMovie(0, CL.sDummySWF);
							}
							catch(e)
							{}
						}
					}
					break;
				}
			}
		}
	},
	Start: function (oArgs)
	{
		function GetReady()
		{
			CL.jxGroups = $(CL.xDoc).find("groups");
			CL.axMasters = $(CL.xDoc).find("masters > slide");
			CL.jxMethods = $(CL.xDoc).find("methods");
			CL.jxModule = $(CL.xDoc).find("module");
			CL.jxParams = $(CL.xDoc).find("params");
			CL.axSlides = $(CL.xDoc).find("slides > slide");
			
			var jxRuntime = $(CL.xDoc).find("runtime");
			CLZ.bStrictOrder = (jxRuntime.attr("seqslides")=="yes");
			CLZ.bPreloadImages = (jxRuntime.attr("preloadimages")=="yes");
			CLZ.bNormalize = (jxRuntime.attr("normalize")=="yes");
			CLZ.bFitWindow = (jxRuntime.attr("preview_fitwindow")=="yes");
			CLZ.bFitSmall = (jxRuntime.attr("fit_small_window")=="yes");
			
			CL.SCO.Create();
			CLLMS.Init();
			CLLMS.Load();

			var jPath = CL.jxModule.find("object[type='nav_025_structure']");
			if(jPath.length>0)
			{
				CL.bAlternativePath = true;
				CL.jAlternativePath = $(jPath[0]);
			}
			// plain path only
			CL.axSlides.each(function ()
			{
				CLPath.push($(this).attr("id"));
			});
			
			$(CL.oBoard).html("");
			if(!CLZ.bZoom)
			{
				if(CLZ.bFitWindow)
				{
					CL.Zoom({ bFit: true });
				}
				else if(CLZ.bFitSmall)
				{
					CL.Zoom({ bFit: true, bSmall: true });
				}
			}
			return true;
		}
		
		CL.Mask({ on: true });
		$.ajax({
			type: "GET",
			url: "runtime.xml",
			async: true,
			dataType: "xml",
			complete: function ()
			{
				CL.Mask({ on: false });
				return true;
			},
			failure: function ()
			{
				alert("No runtime");
				return false;
			},
			success: function (oDoc)
			{
				if($(oDoc).find("module").length==0)
				{
					alert("Malformed runtime");
					return false;
				}
				CL.xDoc = oDoc;
				GetReady();
				CL.Proceed();
				return true;
			}
		});
		return true;
	},
	Store: function (oArgs)
	{
	
		if(oArgs==null) return false;
		if(oArgs.sId==null) return false;
		if(CLI[oArgs.sId]==null)
		{
			if(oArgs.bIfExist==true)
			{
				return false;
			}
			CLI[oArgs.sId] = { i: oArgs.sId };
		}
		if(oArgs.iTimestamp!=null)
		{
			CLI[oArgs.sId].t = oArgs.iTimestamp;
		}
		if(oArgs.sParentId!=null)
		{
			CLI[oArgs.sId].a = oArgs.sParentId;
		}
		if(oArgs.sType!=null)
		{
			CLI[oArgs.sId].y = (oArgs.sType==null) ? CLD.CLTypeToAbbr["other"] : CLD.CLTypeToAbbr[oArgs.sType];
		}
		if(oArgs.iLatency!=null)
		{
			CLI[oArgs.sId].l = oArgs.iLatency;
		}
		if(oArgs.iDuration!=null)
		{
			CLI[oArgs.sId].d = oArgs.iDuration;
		}
		if(oArgs.iElapsed!=null)
		{
			CLI[oArgs.sId].e = oArgs.iElapsed;
		}
		if(oArgs.sPatterns!=null)
		{
			CLI[oArgs.sId].p = oArgs.sPatterns;
		}
		if(oArgs.aObjectives!=null)
		{
			CLI[oArgs.sId].o = oArgs.aObjectives;
		}
		if(oArgs.aAttempts!=null)
		{
			CLI[oArgs.sId].x = oArgs.aAttempts; // array { response, timestamp, latency, status }
		}
		if(oArgs.sResponse!=null)
		{
			CLI[oArgs.sId].r = oArgs.sResponse;
		}
		if(oArgs.sResult!=null)
		{
			CLI[oArgs.sId].z = oArgs.sResult;
		}
		if(oArgs.nScore!=null)
		{
			CLI[oArgs.sId].s = oArgs.nScore;
		}
		if(oArgs.sScoringType!=null)
		{
			CLI[oArgs.sId].g = oArgs.sScoringType;
		}
		if(oArgs.iAttemptsMax!=null)
		{
			CLI[oArgs.sId].w = oArgs.iAttemptsMax;
		}
		if(oArgs.sState!=null)
		{
			CLI[oArgs.sId].v = oArgs.sState;
		}
		return true;
	},
	Timeline:
	{
		Pause: function (oArgs)
		{ 
			if(oArgs==null) return false;
			if(oArgs.bAllActive==true)
			{
				for(var sKey in CLT)
				{
					if(CLT[sKey].bIsActive && !CLT[sKey].bIsPaused)
					{
						CLT[sKey].Pause({ oTimeline: CLT[sKey] });
					}
				}
			}
			else
			{
				if(oArgs.sId!=null)
				{
					if(CLT[oArgs.sId].bIsActive && !CLT[oArgs.sId].bIsPaused)
					{
						CLT[oArgs.sId].Pause({ oTimeline: CLT[oArgs.sId] });
					}
				}
			}
			return true;
		},
		Reset: function (oArgs)
		{
			if(oArgs==null) return false;
			if(oArgs.bAllActive==true)
			{
				for(var sKey in CLT)
				{
					if(CLT[sKey].bIsActive && !CLT[sKey].bIsPaused)
					{
						CLT[sKey].Reset({ oTimeline: CLT[sKey] });
					}
				}
			}
			else
			{
				if(oArgs.sId!=null)
				{
					if(CLT[oArgs.sId].bIsActive && !CLT[oArgs.sId].bIsPaused)
					{
						CLT[oArgs.sId].Reset({ oTimeline: CLT[oArgs.sId] });
					}
				}
			}
		},
		Resume: function (oArgs)
		{
			if(oArgs==null) return false;
			if(oArgs.bAllActive==true)
			{
				for(var sKey in CLT)
				{
					if(CLT[sKey].bIsActive && CLT[sKey].bIsPaused)
					{
						CLT[sKey].Resume({ oTimeline: CLT[sKey] });
					}
				}
			}
			else
			{
				if(oArgs.sId!=null)
				{
					if(CLT[oArgs.sId].bIsActive && CLT[oArgs.sId].bIsPaused)
					{
						CLT[oArgs.sId].Resume({ oTimeline: CLT[oArgs.sId] });
					}
				}
			}
			return true;
		}
	},
	TimerMain: function (oArgs)
	{
		clearTimeout(CL.iResTimer);
		CL.iResTimer = 0;
		CL.iCurrentTime = (new Date()).valueOf();
		for(var oThread = CL.listThreads.pFirst; oThread != null; )
		{
			var pNext = oThread.pNext;
			var oAction = oThread.Continue();
			if(oAction == null)
			{
				CL.listThreads.Remove({ pElement: oThread });
			}
			oThread = pNext;
		}
		if(CL.listThreads.pFirst)
		{
			CL.iResTimer = setTimeout(function () { CL.TimerMain(); }, CL.iResolution);
		}
	},
	Zoom: function (oArgs)
	{
		var jContainer = $("body > .cl-container");
		var oCSS = {};
		var nZoomX = 1;
		var nZoomY = 1;
		var nZoom = 1;
		if(oArgs!=null)
		{
			var bFit = (oArgs.bFit==true);
			var bSmall = (oArgs.bSmall==true);
			var bResize = (oArgs.bResize==true);
			var iAvailW = $(window).width();
			var iAvailH = $(window).height();
			var iW = jContainer.width();
			var iH = jContainer.height();
			if(!CLZ.bZoom)
			{
				if(bFit && CLZ.nZoom==1)
				{
					if(oArgs.bSmall==true)
					{
						if(iAvailH>iH && iAvailW>iW)
						{
							return false;
						}
					}
					nZoomX = iAvailW/iW;
					nZoomY = iAvailH/iH;
					nZoom = (nZoomX>nZoomY) ? nZoomY : nZoomX;
					nZoom = Math.floor(nZoom*99)/100;
					CLZ.bZoom = true;
				}
			}
			else if(bResize && CLZ.bZoom)
			{
				nZoomX = iAvailW/iW;
				nZoomY = iAvailH/iH;
				nZoom = (nZoomX>nZoomY) ? nZoomY : nZoomX;
				nZoom = Math.floor(nZoom*99)/100;
				if(CLZ.bFitSmall && !CLZ.bFitWindow)
				{
					if(nZoom > 1 && !oArgs.bNaviBtn && !oArgs.bEvent)
					{
						nZoom = 1;
					}
				}
			}
		}
		else
		{
			nZoom = 1;
			CLZ.bZoom = false;
		}
		oCSS[CL.sCSSPrefix + "transform"] = oCSS["transform"] = "scale(" + nZoom + ")";
		jContainer.css(oCSS);
		CLZ.nZoom = nZoom;
		return true;
	},
	Substitute:
	{
		All: function (oArgs)
		{
			if(oArgs==null) return "";
			if(oArgs.sString==null || oArgs.sString=="") return "";
			var reLeft = new RegExp(/\{\{/);
			var reRight = new RegExp(/\}\}/);
			var sString = oArgs.sString;
			var sResult = sString;
			if(reLeft.test(sString) && reRight.test(sString))
			{
				var iStart = 0;
				var iEnd = 0;
				var iTmp = 0;
				var sBuffer = sString;
				var sTestStr = "";
				sResult = "";
				var sValue;
				while(reLeft.test(sBuffer))
				{
					iStart = sBuffer.search(reLeft);
					if(iStart>0)
					{
						sResult += sBuffer.substring(0,iStart);
						sBuffer = sBuffer.substr(iStart);
						iStart = 0;
					}
					iEnd = sBuffer.search(reRight);
					if(iEnd==-1)
					{
						sResult += "{{";
						sBuffer = sBuffer.substr(2);
						continue;
					}
					sTestStr = sBuffer.substring(iStart+2,iEnd);
					sValue = CL.Substitute.Property({ sString: sTestStr, bEval: false });
					if(sValue!=sTestStr)
					{
						sResult += sValue;
						sBuffer = sBuffer.substr(iEnd+2);
						continue;
					}
					sValue = CL.Substitute.Variable({ sString: sTestStr, bEval: false });
					if(sValue!=sTestStr)
					{
						sResult += sValue;
						sBuffer = sBuffer.substr(iEnd+2);
						continue;
					}
					sValue = CL.Substitute.Service({ sString: sTestStr });
					if(sValue!=sTestStr)
					{
						sResult += sValue;
						sBuffer = sBuffer.substr(iEnd+2);
						continue;
					}
					sResult += "{{" + sTestStr + "}}";
					sBuffer = sBuffer.substr(iEnd+2);
				}
				sResult += sBuffer;
			}
			return sResult;
		},
		GetProperty: function (oArgs)
		{
			//sId, sName
			if(oArgs==null) return null;
			if(oArgs.sId==null || oArgs.sId=="" || oArgs.sName==null || oArgs.sName=="") return null;
			var vValue = null;
			var sId = oArgs.sId;
			var sName = oArgs.sName;
			if(CLO[sId]!=null)
			{
				switch(sName.toLowerCase())
				{
					case "startx":
					{
						vValue = +CLO[sId].initial.x;
						break;
					}
					case "starty":
					{
						vValue = +CLO[sId].initial.y;
						break;
					}
					case "startw":
					{
						vValue = +CLO[sId].initial.w;
						break;
					}
					case "starth":
					{
						vValue = +CLO[sId].initial.h;
						break;
					}
					case "x":
					{
						vValue = +CLO[sId].current.x;
						break;
					}
					case "y":
					{
						vValue = +CLO[sId].current.y;
						break;
					}
					case "w":
					{
						vValue = +CLO[sId].current.w;
						break;
					}
					case "h":
					{
						vValue = +CLO[sId].current.h;
						break;
					}
					default:
					{
						vValue = CLO[sId][sName];
						if(vValue==null || vValue==undefined)
						{
							if(CLO[sId].oMethods!=null)
							{
								if(CLO[sId].oMethods.GetProperty!=null)
								{
									vValue = CLO[sId].CallMethod({ sMethod: "GetProperty", oMethodArgs: { property: sName }});
								}
							}
						}
						break;
					}
				}
				
			}
			else if(CLS[sId]!=null)
			{
				vValue = CLS[sId][sName];
			}
			else if(CLF[sId]!=null)
			{
				vValue = CLF[sId][sName];
			}
			else if(CLM[sId]!=null)
			{
				vValue = CLM[sId][sName];
			}
			else
			{
				var jxObject = CL.jxModule.find("object[id='" + sId + "']");
				if(jxObject.length!=0)
				{
					switch(sName.toLowerCase())
					{
						case "startx":
						{
							vValue = +jxObject.attr("x");
							break;
						}
						case "starty":
						{
							vValue = +jxObject.attr("y");
							break;
						}
						case "startw":
						{
							vValue = +jxObject.attr("w");
							break;
						}
						case "starth":
						{
							vValue = +jxObject.attr("h");
							break;
						}
					}
				}
			}
			if(vValue==undefined) vValue = null;
			return vValue;
		},
		Property: function (oArgs)
		{
			if(oArgs==null) return "";
			if(oArgs.sString==null || oArgs.sString=="") return "";
			var bEval = (oArgs.bEval==true);
			var sString = oArgs.sString;
			var reObjPtr = new RegExp(/\$/);
			if(!reObjPtr.test(sString)) return sString;
			var sBuffer = sString;
			var reObjEnd = new RegExp(/\./);
			var rePropEnd = new RegExp(/\W/);
			var iObjStart = 0;
			var iObjEnd = 0;
			var iPropEnd = 0;
			var iTmp = 0;
			var sValue = "";
			var sObjectId = "";
			var sPropertyName = "";
			var sPropertyValue = "";
			while(reObjPtr.test(sBuffer))
			{
				iObjStart = sBuffer.search(reObjPtr);
				if(iObjStart>0)
				{
					sValue += sBuffer.substring(0,iObjStart);
					sBuffer = sBuffer.substr(iObjStart);
					iObjStart = 0;
				}
				iObjEnd = sBuffer.search(reObjEnd);
				if(iObjEnd==-1)
				{
					sValue += "$";
					sBuffer = sBuffer.substr(1);
					continue;
				}
				sObjectId = sBuffer.substring(iObjStart+1,iObjEnd);
				iTmp = sBuffer.substr(iObjEnd+1).search(rePropEnd);
				iPropEnd = iTmp + iObjEnd + 1;
				var sProperty = iTmp==-1 ? sBuffer.substr(iObjEnd+1) : sBuffer.substring(iObjEnd+1,iPropEnd);
				sPropertyValue = CL.Substitute.GetProperty({ sId: sObjectId, sName: sProperty });
				if(sPropertyValue==null)
				{
					if(bEval)
					{
						sValue = sValue + "null";
					}
					else
					{
						sValue = iTmp==-1 ? sValue + sBuffer : sValue + sBuffer.substring(0,iPropEnd);
					}
				}
				else
				{
					if(bEval)
					{
						if(typeof sPropertyValue=="number")
						{
							sValue += sPropertyValue;
						}
						else
						{
							if(typeof sPropertyValue=="string")
							{
								if(!isNaN(parseFloat(sPropertyValue)))
								{
									sValue += sPropertyValue;
								}
								else
								{
									sValue += "\""+sPropertyValue+"\"";
								}
							}
							else
							{
								sValue = iTmp==-1 ? sValue + sBuffer : sValue + sBuffer.substring(0,iPropEnd);
							}
						}
					}
					else
					{
						if(typeof sPropertyValue=="string" || typeof sPropertyValue=="number")
						{
							sValue += sPropertyValue.toString();
						}
						else
						{
							sValue = iTmp==-1 ? sValue + sBuffer : sValue + sBuffer.substring(0,iPropEnd);
						}
					}
				}
				sBuffer = iTmp==-1 ? "" : sBuffer.substr(iPropEnd);
			}
			if (sBuffer!="") sValue += sBuffer;
			return sValue;			
		},
		Service: function (oArgs)
		{
			if(oArgs==null) return "";
			if(oArgs.sString==null || oArgs.sString=="") return "";
			var bEval = (oArgs.bEval==true);
			var reLeft = new RegExp(/\@/);
			var sString = oArgs.sString;
			var sResult = sString;
			if(reLeft.test(sString))
			{
				var reRight = new RegExp(/\W/);
				var sBuffer = sString;
				var sTestStr = "";
				var sValue = null;
				var iStart = 0;
				var iEnd = 0;
				sResult = "";
				while(reLeft.test(sBuffer))
				{
					iStart = sBuffer.search(reLeft);
					if(iStart>0)
					{
						sResult += sBuffer.substring(0,iStart);
						sBuffer = sBuffer.substr(iStart);
						iStart = 0;
					}
					sBuffer = sBuffer.substr(1);
					iEnd = sBuffer.search(reRight);
					sTestStr = (iEnd==-1) ? sTestStr = sBuffer.substr(iStart) : sBuffer.substring(iStart,iEnd);
					switch(sTestStr.toUpperCase())
					{
						case "DATE":
						{
							sValue = (new Date()).toLocaleDateString();
							break
						}
						case "NOW":
						{
							sValue = (new Date()).toLocaleString();
							break;
						}
						case "SCORE":
						{
							for(var sKey in CLJ)
							{
								if(+CLJ[sKey].bModule==1)
								{
									sValue = +CLJ[sObjId].nRawScore;
									break;
								}
							}
							break;
						}
						case "SLIDE":
						{
							sValue = CLS[CLZ.sCurrentSlideId].GetNumber();
							break
						}
						case "SLIDENAME":
						{
							sValue = CLS[CLZ.sCurrentSlideId].sName;
							break
						}
						case "SLIDES":
						{
							sValue = CL.Navigation.Path().length;
							break
						}
						case "TIME":
						{
							sValue = (new Date()).toLocaleTimeString();
							break;
						}
						case "USERNAME":
						{
							sValue = CLZ.sLearnerName; 
							break;
						}
					}
					if(sValue==null)
					{
						if(bEval)
						{
							sResult += "null";
						}
						else
						{
							sResult += "@" + sTestStr;
						}
					}
					else
					{
						if(bEval)
						{
							if(typeof sValue=="number")
							{
								sResult += sValue.toString();
							}
							else if(typeof sValue=="string")
							{
								sResult += "\"" + sValue + "\"";
							}
							else
							{
								sResult += "@" + sTestStr;
							}
						}
						else
						{
							sResult += sValue;
						}
					}
					sBuffer = iEnd==-1 ? "" : sBuffer.substr(iEnd);
				}
				sResult += sBuffer;
			}
			return sResult;
		},
		Variable: function (oArgs)
		{
			if(oArgs==null) return "";
			if(oArgs.sString==null || oArgs.sString=="") return "";
			var bEval = (oArgs.bEval==true);
			var reLeft = new RegExp(/\#/);
			var sString = oArgs.sString;
			var sResult = sString;
			if(reLeft.test(sString))
			{
				var reRight = new RegExp(/\W/);
				var sBuffer = sString;
				var sTestStr = "";
				var sValue = "";
				var iStart = 0;
				var iEnd = 0;
				sResult = "";
				while(reLeft.test(sBuffer))
				{
					iStart = sBuffer.search(reLeft);
					if(iStart>0)
					{
						sResult += sBuffer.substring(0,iStart);
						sBuffer = sBuffer.substr(iStart);
						iStart = 0;
					}
					sBuffer = sBuffer.substr(1);
					iEnd = sBuffer.search(reRight);
					sTestStr = (iEnd==-1) ? sTestStr = sBuffer.substr(iStart) : sBuffer.substring(iStart,iEnd);
					sValue = (CLV.oSlide[sTestStr]!=null) ? CLV.oSlide[sTestStr] : ((CLV.oGlobal[sTestStr]!=null) ? CLV.oGlobal[sTestStr] : null);
					if(sValue==null)
					{
						if(bEval)
						{
							sResult += "null";
						}
						else
						{
							sResult = sResult + "#" + sTestStr;
						}
					}
					else
					{
						if(bEval)
						{
							if(typeof sValue == "number")
							{
								sResult += sValue;
							}
							else
							{
								if(typeof sValue == "string")
								{
									if(!isNaN(parseFloat(sValue)))
									{
										var reNumeric = /^-?[0-9]\d*(\.\d+)?$/;
										if(reNumeric.test(sValue))
										{
											sResult += sValue;
										}
										else
										{
											sResult += "\""+sValue+"\"";
										}
									}
									else
									{
										sResult += "\""+sValue+"\"";
									}
								}
								else
								{
									sResult = sResult + "#" + sTestStr;
								}
							}
						}
						else
						{
							sResult += sValue;
						}
					}
					sBuffer = iEnd==-1 ? "" : sBuffer.substr(iEnd);
				}
				sResult += sBuffer;
			}
			return sResult;
		}
	},
	Common:
	{
		AddText: function (oArgs)
		{
			var sHTML = oArgs.sHTML;
			var jTargetDiv = $(oArgs.oTarget);
			var reTags = /(<\/?\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>)/gim;
			var aSplittedByTags = sHTML.split(reTags);
			aSplittedByTags.clean("");
			var sDivider = " ";
			switch(oArgs.sHow)
			{
				case "break":
				{
					sDivider = "<br>";
				}
				case "space":
				{
					var bHasTags = false;
					if(oArgs.sWhere=="start")
					{
						for(var i=0; i<aSplittedByTags.length; i++)
						{
							if(aSplittedByTags[i].charAt(0)=="<")
							{
								continue;
							}
							bHasTags = true;
							aSplittedByTags[i] = oArgs.sText + sDivider + aSplittedByTags[i];
							break;
						}
					}
					else
					{
						for(var i=aSplittedByTags.length-1; i>=0; i--)
						{
							if(aSplittedByTags[i].charAt(0)=="<")
							{
								continue;
							}
							bHasTags = true;
							aSplittedByTags[i] = aSplittedByTags[i] + sDivider + oArgs.sText;
							break;
						}
					}
					if(!bHasTags)
					{
						if(oArgs.sWhere=="start")
						{
							sHTML = oArgs.sText + sDivider + aSplittedByTags.join("");
						}
						else
						{
							sHTML = aSplittedByTags.join("") + sDivider + oArgs.sText;
						}
					}
					else
					{
						sHTML = aSplittedByTags.join("");
					}
					break;
				}
				case "p":
				{
					var bHasPs = false;
					var bHasPClosed = false;
					if(oArgs.sWhere=="start")
					{
						for(var i=0; i<aSplittedByTags.length; i++)
						{
							if(aSplittedByTags[i].toLowerCase().indexOf("<p")==-1)
							{
								continue;
							}
							bHasPs = true;
							aSplittedByTags.unshift(aSplittedByTags[i] + oArgs.sText + "</p>");
							break;
						}
						if(!bHasPs)
						{
							aSplittedByTags.unshift( "<p>" + oArgs.sText + "</p>");
						}
					}
					else
					{
						for(var i=aSplittedByTags.length-1; i>=0; i--)
						{
							if(aSplittedByTags[i].toLowerCase().indexOf("<p")==0)
							{
								bHasPs = true;
								for(var j=i+1; j<aSplittedByTags.length; i++)
								{
									if(aSplittedByTags[j].toLowerCase().indexOf("</p")==0)
									{
										bHasPClosed = true;
										aSplittedByTags[j] = aSplittedByTags[j] + aSplittedByTags[i] + oArgs.sText + "</p>";
										break;
									}
								}
								if(!bHasPClosed)
								{
									aSplittedByTags.push( aSplittedByTags[i] + oArgs.sText + "</p>");
								}
								break;
							}
						}
						if(!bHasPs)
						{
							aSplittedByTags.push( "<p>" + oArgs.sText + "</p>");
						}
					}
					sHTML = aSplittedByTags.join("");
					break;
				}
			}
			return sHTML;
		},
		WrapCharacters: function (oArgs)
		{
			var reTags = /(<\/?\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>)/gim;
			var reEntities = /(&#?[a-z0-9]+;)/gim;
			var aSplittedByEntities = [];
			var aSequence = [];
			var iCnt = 0;
			var iCnt2 = 0;
			var iCnt3 = 0;
			var iMainCnt = 0;
			var aSplittedByTags = oArgs.sHTML.split(reTags);
			aSplittedByTags.clean("");
			while(aSplittedByTags[iCnt]!=null)
			{
				if(aSplittedByTags[iCnt].charAt(0)!="<")
				{
					aSplittedByEntities = aSplittedByTags[iCnt].split(reEntities);
					aSplittedByEntities.clean("");
					iCnt2 = 0;
					while(aSplittedByEntities[iCnt2]!=null)
					{
						if(aSplittedByEntities[iCnt2].charAt(0)!="&")
						{
							aSequence = aSplittedByEntities[iCnt2].split("");
							iCnt3 = 0;
							while(aSequence[iCnt3]!=null)
							{
								aSequence[iCnt3] = '<span class="cl-char cl-char-hidden" data-i="' + (iMainCnt++) + '">' + aSequence[iCnt3] + '</span>';
								iCnt3++;
							}
							aSplittedByEntities[iCnt2] = aSequence.join("");
						}
						else
						{
							aSplittedByEntities[iCnt2] = [ '<span class="cl-char cl-char-hidden" data-i="' + (iMainCnt++) + '">' + aSplittedByEntities[iCnt2] + '</span>' ];
						}
						iCnt2++;
					}
					aSplittedByTags[iCnt] = aSplittedByEntities.join("");
				}
				else if(aSplittedByTags[iCnt].toLowerCase().indexOf("<img ")==0)
				{
					aSplittedByTags[iCnt] = '<span class="cl-char cl-char-hidden" data-i="' + (iMainCnt++) + '">' + aSplittedByTags[iCnt] + '</span>';
				}
				iCnt++;
			}
			return aSplittedByTags.join("");
		}
	},
	ReplaceTransform: function (oArgs)
	{
		var aParts = oArgs.sStyle.split(";")
		var iCnt = 0;
		var iIdx = -1;
		var iIdx1 = -1;
		var iIdx2 = -1;
		while(aParts[iCnt]!=null)
		{
			iIdx = aParts[iCnt].indexOf("transform:");
			if(iIdx!=-1)
			{
				iIdx1 = aParts[iCnt].indexOf(oArgs.sProp);
				if(iIdx1!=-1)
				{
					iIdx1 += oArgs.sProp.length + 1;
					var sBefore = aParts[iCnt].substring(0, iIdx1);
					iIdx2 = aParts[iCnt].indexOf(")", iIdx1);
					var sAfter = aParts[iCnt].substring(iIdx2);
					aParts[iCnt] = sBefore + oArgs.sValue + sAfter;
				}
			}
			iCnt++;
		}
		return aParts.join(";");
	},
	AppendTransform: function (oArgs)
	{
		var aParts = oArgs.sStyle.split(";")
		var iCnt = 0;
		var iIdx = -1;
		var iIdx1 = -1;
		var iIdx2 = -1;
		while(aParts[iCnt]!=null)
		{
			iIdx = aParts[iCnt].indexOf("transform:");
			if(iIdx!=-1)
			{
				aParts[iCnt] += " " + oArgs.sProp + "(" + oArgs.svalue + ");"
			}
			iCnt++;
		}
		return aParts.join(";")
	}
}

var CLSplash =
{
	Adjust: function (oArgs)
	{
		if(oArgs.sId==null) return false;
		var jDiv = $("#" + oArgs.sId + "_POPUP");
		if(jDiv.length==0) return false;
		var jHeader = jDiv.find(".cl-splash-popup-header");
		var jText = jDiv.find(".cl-splash-popup-text");
		var iPadding = parseInt(jDiv.attr("data-padding"), 10);
		var iFullH = parseInt(jDiv.attr("data-height"),10);
		jText.css({"height": (iFullH - jHeader.outerHeight() - iPadding) + "px" });
		jDiv.attr({ "data-adjusted": "1" });
		return true;
	},
	Close: function (oArgs)
	{
		if(oArgs.sId==null) return false;
		var jDiv = $("#" + oArgs.sId + "_POPUP");
		if(jDiv.length==0) return false;
		jDiv.fadeOut();
		return true;
	},
	Open: function (oArgs)
	{
		if(oArgs.sId==null) return false;
		var jDiv = $("#" + oArgs.sId + "_POPUP");
		if(jDiv.length==0) return false;
		if(jDiv.attr("data-one")=="yes")
		{
			$(".clo-splash_description").hide();
		}
		jDiv.fadeIn();
		if(jDiv.attr("data-adjusted")!="1")  CLSplash.Adjust(oArgs);
		return true;
	}
};

var CLTOOLS =
{
	Base64:
	{
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		Encode : function (oArgs)
		{
			var input = oArgs.sString;
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
	 
			input = CLTOOLS.Base64._utf8_encode(input);
	 
			while (i < input.length)
			{
	 
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
	 
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
	 
				if (isNaN(chr2))
				{
					enc3 = enc4 = 64;
				}
				else if (isNaN(chr3))
				{
					enc4 = 64;
				}
	 
				output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	 
			}
	 
			return output;
		},
		Decode : function (oArgs)
		{
			var input = oArgs.sString;
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
	 
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	 
			while (i < input.length) {
	 
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));
	 
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
	 
				output = output + String.fromCharCode(chr1);
	 
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
	 
			}
	 
			output = CLTOOLS.Base64._utf8_decode(output);
	 
			return output;
	 
		},
		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	 
			for (var n = 0; n < string.length; n++) {
	 
				var c = string.charCodeAt(n);
	 
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
	 
			return utftext;
		},
		_utf8_decode : function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = c3 = 0;
	 
			while ( i < utftext.length ) {
	 
				c = utftext.charCodeAt(i);
	 
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
	 
			}
	 
			return string;
		}		
	},
	Color:
	{
		HexToHSL: function (oArgs)
		{
			// oArgs: hex
			return CLTOOLS.Color.RGBToHSL( CLTOOLS.Color.HexToRGB(oArgs) );
		},
		HexToRGB: function (oArgs)
		{
			// oArgs: hex
			var sHex = String(oArgs.hex).replace(/[^0-9a-f]/gi, "");
			if(sHex.length < 6)
			{
				sHex = sHex.charAt(0) + sHex.charAt(0) + sHex.charAt(1) + sHex.charAt(1) + sHex.charAt(2) + sHex.charAt(2);
			}
			return { r: parseInt(sHex.substr(0,2), 16), g: parseInt(sHex.substr(2,2), 16), b: parseInt(sHex.substr(4,2), 16) };
		},
		HSLToHex: function (oArgs)
		{
			return CLTOOLS.Color.RGBToHex( CLTOOLS.Color.HSLToRGB(oArgs) );
		},
		HSLToRGB: function (oArgs)
		{
			// oArgs: h,s,l
			function hue2rgb(p, q, t)
			{
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}
			var oRGB = { r: 0, g: 0, b: 0 };
			if(oArgs.s==0)
			{
				oRGB.r = oRGB.g = oRGB.b = oArgs.l*255;
			}
			else
			{
				var nQ = (oArgs.l < 0.5) ? (oArgs.l * (1 + oArgs.s)) : (oArgs.l + oArgs.s - oArgs.l * oArgs.s);
				var nP = 2 * oArgs.l - nQ;
				oRGB.r = hue2rgb(nP, nQ, oArgs.h + 1/3) * 255;
				oRGB.g = hue2rgb(nP, nQ, oArgs.h) * 255;
				oRGB.b = hue2rgb(nP, nQ, oArgs.h - 1/3) * 255;
 			}
			return oRGB;
		},
		Modify: function (oArgs)
		{
			// oArgs: hex | rgb = {r,g,b} | hsl = {h,s,l}, hue &| sat &| lum [-1,1]
			// returns same value
			var oHSL = {};
			if(oArgs.hsl!=null)
			{
				oHSL = oArgs.hsl;
			}
			else if(oArgs.rgb!=null)
			{
				oHSL = CLTOOLS.Color.RGBToHSL(oArgs.rgb);
			}
			else if(oArgs.hex!=null)
			{
				oHSL = CLTOOLS.Color.HexToHSL(oArgs);
			}
			else return "";
			if(oArgs.hue!=null)
			{
				oHSL.h += oArgs.hue;
				if(oHSL.h < 0) oHSL.h += 1;
				if(oHSL.h > 1) oHSL.h -= 1;
			}
			if(oArgs.sat!=null)
			{
				oHSL.s += oArgs.sat;
				if(oHSL.s < 0) oHSL.s = 0;
				if(oHSL.s > 1) oHSL.s = 1;
			}
			if(oArgs.lum!=null)
			{
				oHSL.l += oArgs.lum;
				if(oHSL.l < 0) oHSL.l = 0;
				if(oHSL.l > 1) oHSL.l = 1;
			}
			return ((oArgs.hsl!=null) ? oHSL : ((oArgs.rgb!=null) ? CLTOOLS.Color.HSLToRGB(oHSL) : CLTOOLS.Color.HSLToHex(oHSL)) );
		},
		RGBToHex: function (oArgs)
		{
			// oArgs: r,g,b, bHash=true by default
			var sHex = (oArgs.bHash==false) ? "": "#";
			var sStr = (+oArgs.r).toString(16);
			if(sStr.indexOf(".")!=-1) sStr = sStr.substring(0,sStr.indexOf("."));
			sHex += (sStr.length==1) ? "0" + sStr : sStr;
			sStr = (+oArgs.g).toString(16);
			if(sStr.indexOf(".")!=-1) sStr = sStr.substring(0,sStr.indexOf("."));
			sHex += (sStr.length==1) ? "0" + sStr : sStr;
			sStr = (+oArgs.b).toString(16);
			if(sStr.indexOf(".")!=-1) sStr = sStr.substring(0,sStr.indexOf("."));
			sHex += (sStr.length==1) ? "0" + sStr : sStr;
			return sHex.toUpperCase();
		},
		RGBToHSL: function (oArgs)
		{
			// oArgs: r, g, b
			var nR = oArgs.r / 255;
			var nG = oArgs.g / 255;
			var nB = oArgs.b / 255;
			var nMax = Math.max(nR, nG, nB);
			var nMin = Math.min(nR, nG, nB);
			var oHSL = { h: 0, s: 0, l: 0.5*(nMax + nMin) };
			if(nMax!=nMin)
			{
				var nDiff = nMax - nMin;
				oHSL.s = (oHSL.l > 0.5) ? nDiff/(2 - nMax - nMin) : nDiff/(nMax + nMin);
				switch(nMax)
				{
					case nR:
					{
						oHSL.h = ((nG - nB)/nDiff) + ((nG < nB) ? 6 : 0);
						break;
					}
					case nG:
					{
						oHSL.h = ((nB - nR)/nDiff) + 2;
						break;
					}
					case nB:
					{
						oHSL.h = ((nR - nG)/nDiff) + 4;
						break;
					}
				}
				oHSL.h /= 6;
			}
			return oHSL;
		}
	},
	Convert:
	{
		CMITimeToInteger: function (sTime)
		{
			if(sTime==null || sTime=="") return "";
			var sValue = $.trim(sTime);
			sValue = sValue.toUpperCase();
			var regDec = new RegExp("\\d+","g");
			var regNonDec = new RegExp("\\D","g");
			var aNums = sValue.match(regDec);
			var aLetters = sValue.match(regNonDec);
			var iDate = Date.UTC(aNums[0], aNums[1], aNums[2], aNums[3], aNums[4], aNums[5], aNums[6]!=null ? aNums[6] : 0);
			return iDate;
		},
		CMITimespanToISO8601: function (sTimespan)
		{
			if(sTimespan==null || sTimespan=="") return "";
			var aParts = sTimespan.split(":");
			var iD = 0;
			var iH = 0;
			var iM = 0;
			var iS = 0;
			if(aParts.length==3)
			{
				iH = parseInt(aParts[0],10);
				if(iH>23)
				{
					iD = Math.floor(iH/24);
					iH = iH - iD*24;
				}
				iM = parseInt(aParts[1],10);
				iS = parseInt(aParts[2],10);
			}
			if(aParts.length==2)
			{
				iM = parseInt(aParts[0],10);
				iS = parseInt(aParts[1],10);
			}
			var sResult = iD==0 ? "PT" : "P" + iD.toString() + "DT";
			sResult += iH.toString() + "H" + iM.toString() + "M" + iS.toString() + "S";
			return sResult;
		},
		DateFromISO8601: function (sDate)
		{
			var sValue = sDate;
			sValue = sValue.toUpperCase();
			var dDate = new Date();
			var aParts = sValue.split("T");
			if(aParts.length!=2) return null;
			var aDate = aParts[0].split("-");
			var aTime = aParts[1].split(":");
			dDate.setUTCFullYear(parseInt(aDate[0],10));
			dDate.setUTCMonth(parseInt(aDate[1],10)-1);
			dDate.setUTCDate(parseInt(aDate[2],10));
			dDate.setUTCHours(parseInt(aTime[0],10));
			dDate.setUTCMinutes(parseInt(aTime[1],10));
			dDate.setUTCSeconds(parseInt(aTime[2],10));
			return dDate.valueOf();
		},
		DateToISO8601: function (dDate)
		{
			var iTmp = dDate.getUTCMonth() + 1;
			var sMonth = iTmp.toString();
			if(sMonth.length==1) sMonth = "0" + sMonth;
			iTmp = dDate.getUTCDate();
			var sDate = iTmp.toString();
			if(sDate.length==1) sDate = "0" + sDate;
			iTmp = dDate.getUTCHours();
			var sH = iTmp.toString();
			if(sH.length==1) sH = "0" + sH;
			iTmp = dDate.getUTCMinutes();
			var sM = iTmp.toString();
			if(sM.length==1) sM = "0" + sM;
			iTmp = dDate.getUTCSeconds();
			var sS = iTmp.toString();
			if(sS.length==1) sS = "0" + sS;
			iTmp = dDate.getUTCMilliseconds();
			iTmp = Math.round(iTmp/10);
			var sMS = iTmp.toString();
			if(sMS.length==1) sMS = "0" + sMS;
			var sValue = dDate.getUTCFullYear() + "-" + sMonth + "-" + sDate + "T" + sH + ":" + sM + ":" + sS + "." + sMS + "Z";
			return sValue;
		},
		IntegerToISO8601Period: function (iTime)
		{
			if(isNaN(iTime)) return null;
			var iValue = Math.round(iTime/1000);
			var iDays = 0;
			var iHours = 0;
			var iMin = 0;
			var iSec = 0;
			if(iValue > 86399) {	iDays = Math.floor(iValue/86400);	iValue = iValue - 86400*iDays;	}
			if(iValue > 3599) {		iHours = Math.floor(iValue/3600);	iValue = iValue - 3600*iHours;	}
			if(iValue > 59) {		iMin = Math.floor(iValue/60);		iValue = iValue - 60*iMin;		}
			iSec = iValue;
			var sValue = "P";
			if(iDays != 0) sValue += iDays.toString()+"D";
			sValue += "T" + iHours.toString() + "H" + iMin.toString() + "M" + iSec.toString() + "S";
			return sValue;
		},
		ISO8601ToCMITimespan: function (sPeriod)
		{
			if(sPeriod==null || sPeriod=="") return "";
			var sValue = $.trim(sPeriod);
			sValue = sValue.toUpperCase();
			var regDec = new RegExp("\\d+","g");
			var regNonDec = new RegExp("\\D","g");
			var aNums = sValue.match(regDec);
			var aLetters = sValue.match(regNonDec);
			if(aLetters[0]!="P") return "";
			var bTime = false;
			var iIndx = -1;
			var sResult = "";
			var iH,iM,iS = 0;
			for(var i=1;i<aLetters.length;i++)
			{
				if(aLetters[i]=="T")
				{
					bTime = true;
					continue;
				}
				switch(aLetters[i])
				{
					case "Y":	iIndx++;	iH += 8760*parseInt(aNums[iIndx],10); 	break;
					case "M":	iIndx++; 	bTime ? iM = parseInt(aNums[iIndx],10) : iH += 720*parseInt(aNums[iIndx],10);		break;
					case "D":	iIndx++;	iH += 24*parseInt(aNums[iIndx],10);		break;
					case "H":	iIndx++;	iH += parseInt(aNums[iIndx],10);		break;
					case "S":	iIndx++;	iS = parseInt(aNums[iIndx],10); 		break;
					default:	break;
				}
			}
			var sH = iH.toString();
			if(sH.length==1) sH = "0"+sH;
			var sM = iM.toString();
			if(sM.length==1) sM = "0"+sM;
			var sS = iS.toString();
			if(sS.length==1) sS = "0"+sS;
			var sResult = sH+":"+sM+":"+sS;
			return sResult;
		},
		PeriodFromISO8601ToInteger: function (sPeriod)
		{
			var sValue = $.trim(sPeriod);
			sValue = sValue.toUpperCase();
			var regDec = new RegExp("\\d+","g");
			var regNonDec = new RegExp("\\D","g");
			var aNums = sValue.match(regDec);
			var aLetters = sValue.match(regNonDec);
			if(aLetters[0]!="P") return null;
			var iValue = 0;
			var iMod = 0;
			var bTime = false;
			var iIndx = -1;
			var sTmp = "-";
			for(var i=1;i<aLetters.length;i++)
			{
				if(aLetters[i]=="T")
				{
					bTime = true;
					continue;
				}
				switch(aLetters[i])
				{
					case "Y":	iIndx++;	iValue += parseInt(aNums[iIndx],10)*977616000000; 	break;
					case "M":
						iIndx++;
						if(bTime)
						{
							iValue += parseInt(aNums[iIndx],10)*60000;
						}
						else
						{
							iValue += parseInt(aNums[iIndx],10)*2678400000;
						}
						break;
					case "D":	iIndx++; 	iValue += parseInt(aNums[iIndx],10)*86400000; 		break;
					case "H":	iIndx++; 	iValue += parseInt(aNums[iIndx],10)*3600000; 		break;
					case ".":	iIndx++;	sTmp = aNums[iIndx]; 								break;
					case "S":
						iIndx++;
						if(sTmp=="-")
						{
							iValue += parseInt(aNums[iIndx],10)*1000;
							break;
						}
						else
						{
							sTmp += "."+aNums[iIndx];
							iValue += parseFloat(sTmp)*1000;
						}
						break;
					default:	iMod = 0;			break;
				}
			}
			return iValue;
		},
		PeriodToString: function (iInterval)
		{
			var iValue = Math.round(iInterval/1000);
			var sOutput = "";
			var iT = 0;
			var sT = "";
			if(iValue>86399)
			{
				iT = Math.floor(iValue/86400);
				iValue = iValue - iT*86400;
				sOutput += iT.toString() + g_sDaysString;
			}
			if(iValue>3599)
			{
				iT = Math.floor(iValue/3600);
				iValue = iValue - iT*3600;
				sT = iT.toString();
				if(sT.length==1) sT = "0"+sT;
				sOutput += sT + g_sHoursString;
			}
			if(iValue>59)
			{
				iT = Math.floor(iValue/60);
				iValue = iValue - iT*60;
				sT = iT.toString();
				if(sT.length==1) sT = "0"+sT;
				sOutput += sT + g_sMinutesString;
			}
			sT = iValue.toString();
			if(sT.length==1) sT = "0"+sT;
			sOutput += sT + g_sSecondsString;
			return sOutput;
		}
	},
	Dice: function (oArgs)
	{
		// iMax, bIncludeMax, aUsed, iMaxTries
		var iRandomNumber = 0;
		var iCnt = 0;
		var bUsed = false;
		if(oArgs.iMaxTries==null || isNaN(oArgs.iMaxTries)) oArgs.iMaxTries=100;
		do
		{
			if(oArgs.bIncludeMax)
			{
				iRandomNumber = Math.ceil(Math.random()*oArgs.iMax);
			}
			else
			{
				iRandomNumber = Math.floor(Math.random()*oArgs.iMax);
			}
			iCnt++;
			if(oArgs.aUsed.length==0) return iRandomNumber;
			bUsed = true;
			for(var i=0;i<oArgs.aUsed.length;i++)
			{
				if(oArgs.aUsed[i]==iRandomNumber)
				{
					bUsed = false;
					break;
				}
			}
			if(bUsed) return iRandomNumber;
		}
		while(iCnt<oArgs.iMaxTries);
		return 0;
	},
	FormatReal_10_7: function (param)
	{
		if(param == null) return null;
		if(typeof param != "number")
		{
			var rArg = parseFloat(param);
			if(isNaN(rArg)) return null;
		}
		else
		{
			var rArg = param;
		}
		var sSign = rArg<0 ? "-" : "";
		rArg = Math.abs(rArg);
		var sArg = rArg.toString();
		if(sArg.indexOf("e")==-1)
		{
			if(sArg.indexOf(".")!=-1 && sArg.length<=8) return sSign+sArg;
			if(sArg.indexOf(".")==-1 && sArg.length<=7) return sSign+sArg;
			if(sArg.indexOf(".")!=-1 && sArg.length>8)
			{
				var aParts = sArg.split(".");
				if(aParts[0].length>7)
				{
					return sSign+aParts[0];
				}
				else
				{
					var iL = 8 - aParts[0].length;
					return sSign+aParts[0]+"."+aParts[1].substring(0,iL);
				}
				return sSign+sArg;
			}
			if(Math.abs(rArg)<0.5e-7) return "0";
		}
		return false;
	},
	FormatTime: function (oArgs)
	{
		// iValue in sec
		var iMin = Math.floor(oArgs.iValue/60);
		var iSec = oArgs.iValue - iMin*60;
		var sSec = iSec.toString();
		if(iSec<10)
		{
			sSec = "0" + sSec;
		}
		return { sMin: iMin.toString(), sSec: sSec };
	},
	GUID: function (oArgs)
	{
		var sGUID = "";
		var iRand = 0;
		for(var i=0; i<32; i++)
		{
			if(i==8 || i==12 || i==16 || i==20) sGUID += "_";
			iRand = Math.floor(Math.random()*16).toString(16).toLowerCase();
			sGUID += iRand;
		}
		return sGUID;
	},
	SVG:
	{
		// jQuery cannot play classes with SVG, workaround
		AddClass: function (oArgs)
		{
			var sClass = $(oArgs.oElem).attr("class");
			var aClasses = sClass.split(" ");
			if($.inArray(oArgs.sClass, aClasses)==-1)
			{
				sClass += " " + oArgs.sClass;
				$(oArgs.oElem).attr({ "class": sClass });
			}
			return true;
		},
		HasClass: function (oArgs)
		{
			var sClass = $(oArgs.oElem).attr("class");
			var aClasses = sClass.split(" ");
			var iIdx = $.inArray(oArgs.sClass, aClasses);
			return (iIdx!=-1);
		},
		RemoveClass: function (oArgs)
		{
			var sClass = $(oArgs.oElem).attr("class");
			var aClasses = sClass.split(" ");
			var iIdx = $.inArray(oArgs.sClass, aClasses);
			if(iIdx!=-1)
			{
				aClasses.splice(iIdx, 1);
				$(oArgs.oElem).attr({ "class": aClasses.join(" ") });
			}
			return true;
		}
	}
};

/* TRANSLATE LEGACY CALLS */
function PlayObjectSound(argobj) { return true; }
function processEvent(sResponseId) { CL.Resp.Process({ respid: sResponseId }); return true; }
function StartModule(sSlideId, sFrameId) { CL.Start({ sSlideId: sSlideId, sFrameId: sFrameId }); return true; }
function processEventLR(sLeftResponseId, sRightResponseId, oEvt)
{
	if(sLeftResponseId!=null && sRightResponseId!=null)
	{
		CL.Resp.Process({ leftrespid: sLeftResponseId, rightrespid: sRightResponseId, evt: oEvt });
	}
	else if(sLeftResponseId!=null && sRightResponseId==null)
	{
		CL.Resp.Process({ leftrespid: sLeftResponseId, evt: oEvt });
	}
	else if(sLeftResponseId==null && sRightResponseId!=null)
	{
		CL.Resp.Process({ rightrespid: sRightResponseId, evt: oEvt });
	}
	return true;
}
function ReplaceMacrosInStr(sString){return CL.Substitute.All({ sString: sString });}
function ReplaceVariablesInStr(sString, bEval){return CL.Substitute.Variable({ sString: sString, bEval: bEval });}
function ReplacePropertiesInStr(sString, bEval){return CL.Substitute.Property({ sString: sString, bEval: bEval });}
var g_arVars = CLV.oGlobal;
var g_arSlideVars = CLV.oSlide;

/* Extensions */
Object.defineProperty(Array.prototype, "clean",
{
    enumerable: false,
    value: function(toDelete)
	{
		for(var i=0; i<this.length; i++)
		{
			if(this[i]==toDelete)
			{         
				this.splice(i, 1);
				i--;
			}
		}
		return this;
	}
});
if(typeof JSON == "undefined")
{
	/**
	 * Implements JSON stringify and parse functions
	 * v1.0
	 * By Craig Buckler, Optimalworks.net
	 * As featured on SitePoint.com
	 * Please use as you wish at your own risk.
	 */
	var JSON = {};
	JSON.stringify = function (obj)
	{
		var t = typeof (obj);
		if (t != "object" || obj === null)
		{
			if (t == "string") obj = '"'+obj+'"';
			return String(obj);
		}
		else
		{
			var n;
			var v;
			var json = [];
			var arr = (obj && obj.constructor == Array);
			for (var n in obj)
			{
				v = obj[n];
				t = typeof(v);
				if (t == "string") v = '"'+v+'"';
				else if (t == "object" && v !== null) v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	JSON.parse = function (str)
	{
		if (str === "") str = '""';
		eval("var p=" + str + ";");
		return p;
	};
}
