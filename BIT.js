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
		};//BIT
