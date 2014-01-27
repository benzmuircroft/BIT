BIT
===

BIT - Double level object encoding/decoding (Ultra fast compared to JSON)


```javascript

var BIT={
		enc:function(i){
			var s='';
			for(var v in i){
				if(i[v] instanceof Object){
					var ii=i[v];
					var ss='«';
					for(var vv in ii){
						ss=(ss==='«')?ss+vv+'°'+ii[vv]:ss+'~'+vv+'°'+ii[vv];
						}
					s=s+'¬'+v+'^'+ss;
					}
				else{s=(s==='')?v+'^'+i[v]:s+'¬'+v+'^'+i[v];}
				}return s;//string!
		},
		dec:function(p){
			var o={};
			p=p.split('¬');
			for(var n=0;n<p.length;n++){
				var k=p[n].split('^');
				var v=k[1];
				k=k[0];
				if(v.indexOf('«')===0){
					var oo={};
					var pp=v;pp=pp.slice(1);pp=pp.split('~');
					for(var nn=0;nn<pp.length;nn++){
						var kk=pp[nn].split('°');
						var vv=kk[1];
						kk=kk[0];
						oo[kk]=(/^\d+$/.test(vv))?parseInt(vv):vv;//int?
						}o[k]=oo;}
				else{o[k]=(/^\d+$/.test(v))?parseInt(v):v;}//int?
				}return o;}//object!
		};//---------------BIT
		

```

Outputs string or int as Object value

**//TODO:** support for Array (Array ends up as string)

Can be used on client and in node.js (copy 'n' paste)

Has 2 functions:

 - BIT.enc({'key':'val'});
 - BIT.dec('string');

Objects fed into BIT.enc can only be two levels deep i.e:

```javascript
   var main_object={'one':'level','other':'stuff','sub_object':{'second':'level','more':'stuff'}}
```

the above example is 78 bytes long with JSON.stringify...

BIT's version is:

```javascript
   «one^level¬other^stuff¬sub_object^«second°level~more°stuff
```

58 bytes long.

When to use BIT?

JSON is flexable / BIT is fast

If you need to transport more complex object data (with ajax or websockets) use JSON.


**How do I check wether I need to JSON.parse or BIT.dec?**

```javascript
   var _='«one^level¬other^stuff¬sub_object^«second°level~more°stuff';
   _=(_.indexOf('«')===0)?BIT.dec(_.slice(1)):JSON.parse(_);
```

This checks for the BIT object («) character, removes it then BIT decodes it. else it JSON.parses it

PS: don't forget to GZIP and cache
