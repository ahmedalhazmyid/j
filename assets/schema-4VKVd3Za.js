/* local validators — do not import zod from index (circular) */
function S(){return new Str()}
function N(){return new Num()}
function Obj(shape){return new ObjSch(shape)}
function En(vals){return new EnumSch(vals)}
class Str{
  constructor(){this._trim=false;this._min=0;this._max=Infinity;this._len=null}
  trim(){this._trim=true;return this}
  min(n){this._min=n;return this}
  max(n){this._max=n;return this}
  length(n){this._len=n;return this}
  _check(v){
    if(typeof v!=="string")return{ok:false,msg:"string"};
    let s=this._trim?v.trim():v;
    if(this._len!=null&&s.length!==this._len)return{ok:false,msg:"length"};
    if(s.length<this._min||s.length>this._max)return{ok:false,msg:"range"};
    return{ok:true,val:s};
  }
}
class Num{
  constructor(){this._pos=false;this._nneg=false;this._int=false;this._min=-Infinity;this._max=Infinity}
  positive(){this._pos=true;return this}
  nonnegative(){this._nneg=true;return this}
  int(){this._int=true;return this}
  min(n){this._min=n;return this}
  max(n){this._max=n;return this}
  _check(v){
    if(typeof v!=="number"||!Number.isFinite(v))return{ok:false,msg:"number"};
    if(this._int&&!Number.isInteger(v))return{ok:false,msg:"int"};
    if(this._pos&&!(v>0))return{ok:false,msg:"positive"};
    if(this._nneg&&v<0)return{ok:false,msg:"nonnegative"};
    if(v<this._min||v>this._max)return{ok:false,msg:"range"};
    return{ok:true,val:v};
  }
}
class EnumSch{
  constructor(vals){this._vals=vals}
  _check(v){return this._vals.includes(v)?{ok:true,val:v}:{ok:false,msg:"enum"}}
}
class ObjSch{
  constructor(shape){this.shape=shape}
  safeParse(data){
    try{return{success:true,data:this.parse(data)}}catch(e){return{success:false,error:e}}
  }
  parse(data){
    if(!data||typeof data!=="object")throw new Error("object");
    const out={};
    for(const[k,sch]of Object.entries(this.shape)){
      const r=sch._check(data[k]);
      if(!r.ok)throw new Error(k+":"+r.msg);
      out[k]=r.val;
    }
    return out;
  }
}
var i=Obj({title:S().trim().min(2).max(200),description:S().trim().min(10).max(4e3),sector:S().min(2).max(40),country:S().length(3),currency:S().length(3),language:En([`ar`,`en`]),capital:N().positive().max(0xe8d4a51000),revenueYear1:N().nonnegative().max(0xe8d4a51000),revenueGrowth:N().min(-.5).max(2),cogsPercent:N().min(0).max(.95),opexYear1:N().nonnegative().max(0xe8d4a51000),opexGrowth:N().min(-.5).max(2),employees:N().int().min(0).max(1e5),avgSalary:N().nonnegative().max(1e8),salaryGrowth:N().min(-.2).max(.5),taxRate:N().min(0).max(.6),discountRate:N().min(.01).max(.6),projectionYears:N().int().min(3).max(10),workingCapitalPercent:N().min(0).max(.8),depreciationYears:N().int().min(1).max(25),residualValuePercent:N().min(0).max(1)});
var a=(e=`ar`)=>({title:e===`ar`?`مقهى حيّ في الرياض`:`Neighbourhood café in Riyadh`,description:e===`ar`?`مقهى مختص بمساحة 90 متراً مربعاً في شمال الرياض، يقدّم القهوة والمعجنات لسكان الحي والعاملين في المكاتب القريبة، مع خدمة طلبات خارجية محدودة. الاستثمار يغطي التجهيز والإيجار المقدم والتراخيص ورأس المال العامل لأول دورة تشغيل.`:`A 90 sqm speciality café in North Riyadh serving coffee and pastry to nearby residents and office workers, with a modest takeaway line. Capital covers fit-out, prepaid rent, licences, and opening working capital.`,sector:`fnb`,country:`SAU`,currency:`SAR`,language:e,capital:42e4,revenueYear1:86e4,revenueGrowth:.12,cogsPercent:.3,opexYear1:145e3,opexGrowth:.05,employees:6,avgSalary:4e4,salaryGrowth:.04,taxRate:.15,discountRate:.12,projectionYears:5,workingCapitalPercent:.08,depreciationYears:5,residualValuePercent:.15});
export{i as n,a as t};
