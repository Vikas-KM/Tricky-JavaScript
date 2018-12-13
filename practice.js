var x =1;
var output = (function() {
    delete x;
    return x;
  })();
  
  console.log(output);