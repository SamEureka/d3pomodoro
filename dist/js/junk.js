// Junk factory

function junkFactory(html){
  switch (html) {
    case 'done':
    	return '<span><i class="fa fa-check-square-o"></i></span> - ';
      break;
    case 'reset':
    	return '<span><i class="fa fa-ban"></i></span> - ';
    default:
      console.log("I don't have any HTML for: "+html);
  }
}