function Jet()
{
};




Jet.get=function(cond)
{
	co=cond.substr(1,cond.length);
	var ret=null;
	switch(cond[0])
	{
	case '#':
	ret=document.getElementById(co);
	if(ret)ret=new JetHtml(ret);
	break;
	case '.':
	ret=document.getElementsByClassName(cond);
	if(ret)ret=new JetList(ret);
	break;
	default:
	ret=document.getElementsByTagName(cond);
	if(ret)ret=new JetList(ret);
	break;
	}
	if(ret)ret.selector=cond;
	return ret;
};
Jet.inner=function(source,arg)
{
	try
	{
	if(typeof(source.attr)!="undefined")
	{
	src=source.source;
	}
	else
	{
	src=source;
	}
	}
	catch(ex)
	{
	return null;
	}
	if(typeof(src.innerHTML)!="undefined")
	{
	    if(src.nodeName.toLowerCase()=="input"  || src.nodeName.toLowerCase()=="textarea" || src.nodeName.toLowerCase()=="select")
	    {
	        switch(src.type.toLowerCase())
	        {
	        case 'checkbox': case 'radio':
	        if(typeof(arg)=="undefined")return src.checked;
	        else src.checked=arg;
	        break;
	        default:
	        if(typeof(arg)=="undefined")return src.value;
	        else src.value=arg;
	        break;
	        }
	    }
	    else if(typeof(arg)!=="undefined")
	    {
	    
	    if(typeof(arg)=="object")
	    {
	    src.appendChild(arg);
	    }
	    else if(typeof(arg)=="string")
	    {
	    src.innerHTML=arg;
	    }
	    
	    }
	    else
	    {
	    return src.innerHTML;
	    }
	    return null;
	}
};
Jet.show=function(source,arg,eleminate)
{
	try
	{
	if(typeof(source.attr)!="undefined")
	{
	src=source.source;
	}
	else
	{
	src=source;
	}
	}
	catch(ex)
	{
	return null;
	}
	if(typeof(src.innerHTML)!="undefined")
	{
	if(arg)
	{
	src.style.visibility="visible";
	if(src.lastPosition)src.style.position=source.lastPosition;
	src.lastPosition=null;
	}
	else
	{
	src.style.visibility="hidden";
	if(eleminate || typeof(eleminate)=="undefined")
	{
	src.lastPosition=(src.style.position)?src.style.position:"static";
	src.style.position="absolute";
	}
	}
	}
};
Jet.attr=function(source,name,value)
{
	try
	{
	if(typeof(source.attr)!="undefined")
	{
	src=source.source;
	}
	else
	{
	src=source;
	}
	}
	catch(ex)
	{
	return null;
	}
	if(typeof(src.innerHTML)!="undefined")
	{
	if(typeof(value)!='undefined')src.setAttribute(name,value);
	else return src.getAttribute(name);
	}
	return null;
};
Jet.config=function()
{
	_=Jet.get;
	if(typeof(NetSchedule)!='undefined')
	{
	    _ajaxQ=NetSchedule;
	    _ajaxQ.command=[];
	    _ajaxQ.list=[];
	}
	
	if(Utility)
	{
	    _util=Utility;
	}
	if(JetAnimation)
	{
	    _A=JetAnimation;
	    JetS=JetScene;
	    JetSG=SceneGroup;
	}
};
Jet.loadResource=function(file,type,callback)
{
	var node=null;
	switch(type)
	{
	    case 'css': case 'style':
	        node=document.createElement('link');
	        node.setAttribute('rel','stylesheet');
	        node.setAttribute('type','text/css');
	        node.setAttribute('href',file);
	        break;
	    case 'javascript': case 'js': case 'script':
	        node=document.createElement('script');
	        node.setAttribute('type','text/javascript');
	        node.setAttribute('src',file);
	        break;
	    default: break;
	}
	if(node)
	{
	    if(callback)
	    {
	        if(typeof(callback)=="string")node.setAttribute("onload",callback);
	        else node.onload=callback;
	    }
	    document.body.appendChild(node);
	}
};

function JetHtml(source)
{
	
	this.source=null;
	this.selector=null;
this.source=source;
	
	this.inner=function(arg)
	{
		if(typeof(arg)=="undefined")return Jet.inner(this);
		else Jet.inner(this,arg);
	};
	this.show=function(arg,eleminate)
	{
		if(typeof(eleminate)!="undefined")Jet.show(this,arg,eleminate);
		else Jet.show(this,arg);
	};
	this.attr=function(name,value)
	{
		if(typeof(value)!="undefined")Jet.attr(this,name,value);
		else return Jet.attr(this,name);
	};
	this.value=function(arg)
	{
		if(typeof(arg)=="undefined")return Jet.inner(this);
		else Jet.inner(this,arg);
	};
	this.a=function(effect,tag,speed,callback)
	{
		return JetAnimation.do(effect,this.selector,tag,speed,-1,callback);
	};
};




function JetList(list)
{
	
	this.sources=null;
	this.length=0;
	this.selector=null;
if(typeof(list)!="undefined")
{
var i=0;
for(i in list)
{
if(typeof(list[i].attr)!="undefined")this[i]=list[i];
else this[i]=new JetHtml(this[i]=list[i]);
}
this.length=i;
}
	
	this.inner=function(arg)
	{
		if(typeof(arg)!="undefined")  for(var i in this)Jet.inner(this[i],arg);
		else
		{
		ret=[]
		for(i in this)
		{
		if(r=Jet.inner(this[i]))
		{
		ret[i]=r;
		}
		
		}
		return ret;
		}
	};
	this.show=function(eleminate,arg)
	{
		for(i in this)Jet.show(this[i],arg,eleminate);
	};
	this.attr=function(name,value)
	{
		if(typeof(value)!="undefined")for(i in this)Jet.attr(this[i],name,value);
		else
		{
		ret=new Array();
		for(i in this)
		{
		if(this[i])
		if(r=Jet.attr(this[i],name))
		{
		ret[i]=r;
		}
		}
		return ret;
		}
	};
	this.push=function(jh)
	{
		this.length++;
		this[this.length]=jh;
	};
	this.value=function(arg)
	{
		if(typeof(arg)!="undefined")  for(var i in this)Jet.inner(this[i],arg);
		else
		{
		ret=[]
		for(i in this)
		{
		if(r=Jet.inner(this[i]))
		{
		ret[i]=r;
		}
		
		}
		return ret;
		}
	};
};




function NetSchedule()
{
	
	this.repeat=false;
};



NetSchedule.list=null;
NetSchedule.command=null;
NetSchedule.net=null;
NetSchedule.currentCommand=null;
NetSchedule.processing=false;


NetSchedule.add=function(netData,command)
{
	if(!NetSchedule.list)NetSchedule.list=[];
	NetSchedule.list.push({'command':command,'netData':netData})
};
NetSchedule.run=function(force)
{
	if(!NetSchedule.processing || force)
	{
	    if(!NetSchedule.net)NetSchedule.net=new NetworkTransfer();
	    var task=NetSchedule.list.pop();
	    if(task)
	    {
	        NetSchedule.processing=true;
	        NetSchedule.currentCommand=task.command;
	        NetSchedule.net.data=task.netData.data;
	        NetSchedule.net.target=task.netData.url;
	        NetSchedule.method=task.netData.method;
	        NetSchedule.net.callback=NetSchedule.callback;
	        NetSchedule.net.onerror=NetSchedule.errorCallback;
	        NetSchedule.net.send();
	    }
	    else if(NetSchedule.repeat)
	    {
	        setTimeout(NetSchedule.run,5000);//check NetSchedule 5 seconds again
	        NetSchedule.processing=false;
	    }
	    else
	    {
	        NetSchedule.processing=false; //finished all tasks
	    }
	}
};
NetSchedule.callback=function(res)
{
	NetSchedule.command[NetSchedule.currentCommand](res);
	NetSchedule.run(true);//fore to run
};
NetSchedule.errorCallback=function()
{
	NetSchedule.run(true);//force run
};

function NetData(url,data,method)
{
	
	this.url=null;
	this.data=null;
	this.method=null;
this.url=url;
if(typeof(data)=="undefined")
{
    this.data=[];
}
else if(typeof(data)=="string")
{
    
}
else if(data instanceof Array)
{
    this.data=data;
}

switch(method.toLowerCase())
{
    //case 'get': this.method='get'; break;
    case 'post': this.method='post'; break;
    default: this.method='get'; break;
}
	
	this.add=function(param,value,encode)
	{
		if(encode)  this.data[param]=encdoeURIComponent(value);
		else this.data[param]=value;
	};
};




NetData.get=function(net)
{
	this.url=net.target;
	this.data=net.data;
	this.method=net.method;
	
};

function Utility()
{
};




Utility.parseXml=function(xml)
{
	if(window.DOMParser)
	{
	    var parser=new window.DOMParser();
	    var doc=parser.parseFromXML(xml,"text/xml");
	}
	else
	{
	    var doc=new ActiveXObject("Microsoft.DOMXML");
	    doc.async=false;
	    doc.load(xml);
	}
	return doc;
};
Utility.StringForm=function(format,data)
{
	var result=format;
	if(data instanceof Array)
	{
	    
	}
	else if(data instanceof Object)
	{
	    for(var i in data)
	    {
	        result=result.replace(new RegExp("\%"+i+"\%","g"),data[i]);
	    }
	    return result;
	}
	return format;
};

function JetAnimation()
{
};



JetAnimation.intervals=null;
JetAnimation.framePeriod=25;


JetAnimation.fade=function(selector,tag,step,timeline)
{
	var target=null;
	target=_(selector);
	
	if(target instanceof JetHtml)
	{
	    var opacity=target.source.style.opacity;
	    if(!opacity)opacity=1;
	    else opacity=parseFloat(opacity);
	    if((tag<=opacity+step && step<0) || (tag>=opacity+step && step>0))
	    {
	        target.source.style.opacity=(opacity+step)+"";
	    }
	    else
	    {
	        target.source.style.opacity=tag+"";
	        clearInterval(JetAnimation.intervals['fade'+selector]);
	        delete(JetAnimation.intervals['fade'+selector]);
	        if(timeline>-1)
	        {
	            JetTimeline.list[timeline].next();
	        }
	    }
	}
};
JetAnimation.move=function(selector,x2,y2,stepx,stepy,kind,tagPosition,timeline)
{
	var target=null;
	target=_(selector);
	
	if(target instanceof JetHtml)
	{
	    var x1=target.source.offsetLeft;
	    var y1=target.source.offsetTop;
	    var moved=false;
	    if((x2<=x1+stepx && stepx<0) || (x2>=x1+stepx && stepx>0))
	    {
	        target.source.style.left=x1+stepx+"px";
	        moved=true;
	    }
	    else target.source.style.left=x2+"px";
	    if((y2<=y1+stepy && stepy<0) || (y2>=y1+stepy && stepy>0))
	    {
	        target.source.style.top=y1+stepy+"px";
	        moved=true;
	    }
	    else target.source.style.top=y2+"px";
	    
	    if(!moved)
	    {
	        if(kind=='r' || kind=='t')target.source.style.position=tagPosition;
	        clearInterval(JetAnimation.intervals['move'+selector]);
	        delete(JetAnimation.intervals['move'+selector]);
	        if(timeline>-1)
	        {
	            JetTimeline.list[timeline].next();
	        }
	    }
	}
};
JetAnimation.color=function(selector,mode,r,g,b,sr,sg,sb,timeline)
{
	var target=null;
	target=_(selector);
	
	if(target instanceof JetHtml)
	{
	    var cstyle=(mode=='bg')?window.getComputedStyle(target.source).backgroundColor:window.getComputedStyle(target.source).color;
	        
	    var pat=/(\d+)[\s,]+(\d+)[\s,]+(\d+)/;
	    c=pat.exec(cstyle);
	    var r1=parseInt(c[1]);
	    var g1=parseInt(c[2]);
	    var b1=parseInt(c[3]);
	                
	    var colored=false;
	    
	    if((r<=r1+sr && sr<0) || (r>=r1+sr && sr>0))
	    {
	        r1+=sr;
	        colored=true;
	    }else r1=sr;
	    if((g<=g1+sg && sg<0) || (g>=g1+sg && sg>0))
	    {
	        g1+=sg;
	        colored=true;
	    }else g1=sg;
	    if((b<=b1+sb && sb<0) || (b>=b1+sb && sb>0))
	    {
	        b1+=sb;
	        colored=true;
	    }else b1=b;
	    if(mode=='bg')target.source.style.backgrounColor="rgb("+Math.round(r1)+","+Math.round(g1)+","+Math.round(b1)+")";
	    else target.source.style.color="rgb("+Math.round(r1)+","+Math.round(g1)+","+Math.round(b1)+")";
	    
	    
	    if(!colored)
	    {
	        clearInterval(JetAnimation.intervals['color'+selector]);
	        delete(JetAnimation.intervals['color'+selector]);
	        if(timeline>-1)
	        {
	            JetTimeline.list[timeline].next();
	        }
	    }
	}
};
JetAnimation.size=function(selector,w2,h2,stepw,steph,timeline)
{
	var target=null;
	target=_(selector);
	
	if(target instanceof JetHtml)
	{
	    var w1=target.source.offsetWidth;
	    var h1=target.source.offsetHeight;
	    var sized=false;
	    if((w2<=w1+stepw && stepw<0) || (w2>=w1+stepw && stepw>0))
	    {
	        target.source.style.width=w1+stepw+"px";
	        sized=true;
	    }
	    else target.source.style.width=w2+"px";
	    if((h2<=h1+steph && steph<0) || (h2>=h1+steph && steph>0))
	    {
	        target.source.style.height=h1+steph+"px";
	        sized=true;
	    }
	    else target.source.style.height=h2+"px";
	    
	    if(!sized)
	    {
	        clearInterval(JetAnimation.intervals['size'+selector]);
	        delete(JetAnimation.intervals['size'+selector]);
	        if(timeline>-1)
	        {
	            JetTimeline.list[timeline].next();
	        }
	    }
	}
};
JetAnimation.do=function(effect,selector,tag,speed,timeline,callback)
{
	var ret=null;
	var target=null;
	if(!JetAnimation.intervals)JetAnimation.intervals={};
	
	if(typeof(selector)=="string") target=_(selector);
	else { target=selector; selector=target.selector;}
	
	if(typeof(timeline)=="undefined")timeline=-1;
	switch(effect)
	{
	    case 'fade':
	        
	        if(typeof(JetAnimation.intervals["fade"+selector])=="undefined")
	        {
	            if(target instanceof JetHtml)
	            {
	                var opacity=target.source.style.opacity;
	                if(!opacity)opacity=1;
	                else opacity=parseFloat(opacity);
	                var tag_opacity=parseFloat(tag);
	                var fade_speed=parseInt(speed)/JetAnimation.framePeriod;
	                var delta=tag_opacity-opacity;
	                var fade_step=delta/fade_speed;
	                var interval=setInterval(JetAnimation.fade,JetAnimation.framePeriod,selector,tag_opacity,fade_step,timeline);
	                JetAnimation.intervals["fade"+selector]=interval;
	                ret=opacity;
	            }
	        }
	        else
	        {
	            setTimeout("JetAnimation.do('fade','"+selector+"',"+tag+","+speed+","+timeline+")",JetAnimation.framePeriod);
	            return 0;
	        }
	        break;
	    case 'move': case 'move-r': case 'move-t':
	        var k='n';//normal
	        if(effect.length>4)k=effect.substring(5,6);
	        if(typeof(JetAnimation.intervals["move"+selector])=="undefined")
	        {
	            if(target instanceof JetHtml)
	            {
	            
	                var x1=target.source.offsetLeft;
	                var y1=target.source.offsetTop;
	                var tagPosition=target.source.style.position;
	                var pat=/(\-*\d+),(\-*\d+)/;
	                var res=pat.exec(tag);
	                var x2=parseFloat(res[1]);
	                var y2=parseFloat(res[2]);
	                var stepx=0;
	                var stepy=0;
	                
	                if(k=='r')
	                {
	                    x2=x1+x2;
	                    y2=y1+y2;
	                }
	                else if(k=='t')
	                {
	                    var sx1=x1;
	                    var sy1=y1;
	                    x1=x1-x2;
	                    y1=y1-y2;
	                    x2=sx1;
	                    y2=sy1;
	                }
	                
	                var move_speed=parseInt(speed)/JetAnimation.framePeriod;
	                var dx=x2-x1;
	                var dy=y2-y1;
	                stepx=dx/move_speed;
	                stepy=dy/move_speed;
	                
	                //round step
	                stepx=Math.round(stepx);
	                stepy=Math.round(stepy);
	                
	                target.source.style.left=x1+'px';
	                target.source.style.top=y1+"px";
	                target.source.style.position="absolute";
	                
	                var interval=setInterval(JetAnimation.move,JetAnimation.framePeriod,selector,x2,y2,stepx,stepy,k,tagPosition,timeline);
	                JetAnimation.intervals["move"+selector]=interval;
	                ret=x1+","+y1;
	            }
	        }
	        else
	        {
	            setTimeout("JetAnimation.do('"+effect+"','"+selector+"','"+tag+"',"+speed+","+timeline+")",JetAnimation.framePeriod);
	            return 0;
	        }
	        break;
	        case 'size':
	        if(typeof(JetAnimation.intervals["size"+selector])=="undefined")
	        {
	            if(target instanceof JetHtml)
	            {
	            
	                var w1=target.source.offsetWidth;
	                var h1=target.source.offsetHeight;
	                var pat=/(\-*\d+),(\-*\d+)/;
	                var res=pat.exec(tag);
	                var w2=parseFloat(res[1]);
	                var h2=parseFloat(res[2]);
	                var stepw=0;
	                var steph=0;
	                
	                var size_speed=parseInt(speed)/JetAnimation.framePeriod;
	                var dw=w2-w1;
	                var dh=w2-w1;
	                stepw=dw/size_speed;
	                steph=dh/size_speed;
	                
	                //round step
	                stepw=Math.round(stepw);
	                steph=Math.round(steph);
	                
	                target.source.style.width=w1+'px';
	                target.source.style.height=h1+"px";
	                //target.source.style.position="absolute";
	                
	                var interval=setInterval(JetAnimation.size,JetAnimation.framePeriod,selector,w2,h2,stepw,steph,timeline);
	                JetAnimation.intervals["size"+selector]=interval;
	                ret=w1+","+h1;
	            }
	        }
	        else
	        {
	            setTimeout("JetAnimation.do('"+effect+"','"+selector+"','"+tag+"',"+speed+","+timeline+")",JetAnimation.framePeriod);
	            return 0;
	        }
	        break;
	        case 'color': case 'bgcolor':
	        var cstyle=(effect=='bgcolor')?window.getComputedStyle(target.source).backgroundColor:window.getComputedStyle(target.source).color;
	        var mode=(effect=='bgcolor')?'bg':'';
	        
	        if(typeof(JetAnimation.intervals["color"+selector])=="undefined")
	        {
	            if(target instanceof JetHtml)
	            {
	                var pat=/(\d+)[\s,]+(\d+)[\s,]+(\d+)/;
	                var tpat=/(\w\w)(\w\w)(\w\w)/;
	                c=pat.exec(cstyle);
	                d=tpat.exec(tag)
	                var r1=parseInt(c[1]);
	                var g1=parseInt(c[2]);
	                var b1=parseInt(c[3]);
	                
	                var r2=parseInt("0x"+d[1]);
	                var g2=parseInt("0x"+d[2]);
	                var b2=parseInt("0x"+d[3]);
	                
	                var frs=speed/JetAnimation.framePeriod;
	                
	                var sr=(r2-r1)/frs;
	                var sg=(g2-g1)/frs;
	                var sb=(b2-b1)/frs;
	                
	                
	                var interval=setInterval(JetAnimation.color,JetAnimation.framePeriod,selector,mode,r2,g2,b2,sr,sg,sb,timeline);
	                JetAnimation.intervals["color"+selector]=interval;
	                ret=opacity;
	            }
	        }
	        else
	        {
	            setTimeout("JetAnimation.do('color','"+selector+"','"+tag+"',"+speed+","+timeline+")",JetAnimation.framePeriod);
	            return 0;
	        }
	        break;
	    case 'visible':
	        break;
	}
	if(callback)setTimeout(callback,speed);
	return ret;
};

function JetScene(effect,selector,tag,speed)
{
	
	this.effect=null;
	this.selector=null;
	this.tag=null;
	this.speed=null;
	this.timeline=null;
this.effect=effect; this.selector=selector; this.tag=tag; this.speed=speed;
	
	this.animate=function()
	{
		JetAnimation.do(this.effect,this.selector,this.tag,this.speed,this.timeline);
	};
};




function JetTimeline(scenes)
{
	
	this.scenes=null;
	this.index=null;
	this.currentScene=null;
	this.seek=0;
	this.loop=false;
	this.done=null;
	this.callback=null;
this.index=JetTimeline.count; JetTimeline.count++;
if(!JetTimeline.list)JetTimeline.list=[];
JetTimeline.list[this.index]=this;
this.scenes=scenes instanceof Array?scenes:[];
	
	this.add=function(scene)
	{
		if(scene instanceof JetScene || scene instanceof SceneGroup)
		{
		    this.scenes.push(scene);
		}
	};
	this.next=function()
	{
		//if(this.currentScene instanceof SceneGroup) if(this.currentScene.endTime>Date.now())return 0;
		
		this.currentScene=this.scenes[this.seek];
		if(this.currentScene)
		{
		    this.currentScene.timeline=this.index;
		    this.seek++;
		    this.currentScene.animate();
		}
		else
		{
		    if(this.callback)
		    {
		        /*if(typeof(this.callback)=="string")eval(this.callback);
		        else */this.callback()
		    }
		    this.done=true;
		    this.seek=0;
		    if(this.loop)this.next();
		}
	};
};



JetTimeline.count=0;
JetTimeline.list=null;


function SceneGroup(ls)
{
	
	this.ls=null;
	this.timeline=null;
	this.maxTime=null;
this.ls=ls;
this.maxTime=0;
for(var i=0;i<ls.length;i++)
{
    if(ls[i].speed>this.maxTime)this.maxTime=ls[i].speed;
}
	
	this.animate=function()
	{
		var timeline_set=false;
		for(var i=0;i<this.ls.length;i++)
		{
		    //this.endTime=Date.now()+this.maxTime;
		    if(this.maxTime==this.ls[i].speed && !timeline_set){this.ls[i].timeline=this.timeline;timeline_set=true;}
		    else this.ls[i].timeline=-1; /*diable timeline*/
		    /*
		    Time line will set on one of the logest scene with timeline_set to avoid multiple timeline.next() calls
		    */
		    this.ls[i].animate();
		}
	};
};



SceneGroup.endTime=0;

