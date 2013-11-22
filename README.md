Dynamic-Loading-Javascript-Module
=================================

Loading java script dynamically, And reduce html page loading time.

Usage
=====

Include jquery.js and module.js file bottom of the html page before closing body tag

<script type="text/javascript" src="js/module.js"></script>

Call loadModules after loading page


/* call after all modules loaded*/
function cm(){

}


/* call after individual module loaded
*  cim call after loading js1 module
*/
function cim(){

}

/* call after loading window */
$(window).load(function() {
	
	Module.loadModules([
	                    {module:'path/to/your/js'},
	                    {module:'path/to/your/js1', callback:cim()},
	                    {module:'path/to/your/js2'},
	                    {module:'path/to/your/js3'}
	   ], {oncomplete:cm});
});


Options
=======
module : path of module without .js extension
callback : callback function for individual module
oncomplete : callback functin after loading all modules
