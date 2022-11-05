function getFlattenObjEntries(obj, prefix) {
    let entries = [];
  
    for(let key of Object.keys(obj)) {
      let tempEntries = [];
      if(Object.prototype.toString.call(obj[key]) === '[object Object]') {
        const compundkey = prefix ? `${prefix}.${key.toString()}`: key.toString()
        tempEntries = getFlattenObjEntries(obj[key], compundkey);
        tempEntries.forEach(val => entries.push(val));
      }
      else {
        let entry = `${key}:${obj[key].toString()}`;
        entry = prefix ? `${prefix}.${entry}` : entry;
        entries.push(entry);
      }
    }
  
    return entries;
  }
  
  function flattenObj(obj) {
    let flattenObjEntries = getFlattenObjEntries(obj, '');
    console.log(flattenObjEntries);
  }
  
  let sample = {
    a: {
      b: {
        c: 1,
        d: 2,
        e: 3
      },
      f: 1,
      g: 2,
      k: {
        l: 6,
        m: {
          n: {
            o: {
              p: 4,
              q: 'cool'
            },
            r: 1
          },
          s: 5
        },
        t: 'yayyy!!'
      }
    },
    h: 1,
    i: 2
  };
  
  flattenObj(sample);
  
  /* output: 
  [
    'a.b.c:1',       'a.b.d:2',
    'a.b.e:3',       'a.f:1',
    'a.g:2',         'a.k.l:6',
    'a.k.m.n.o.p:4', 'a.k.m.n.o.q:cool',
    'a.k.m.n.r:1',   'a.k.m.s:5',
    'a.k.t:yayyy!!', 'h:1',
    'i:2'
  ]
  */