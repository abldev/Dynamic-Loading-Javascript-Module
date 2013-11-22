

;(function(){
	
	Module = function (){
		
		this._mCOunt = 0;
		this._modules = {};
		this._aModuleIndex = 0;
		this._aModule;
		this._mOptions;
	};
	
	/*load modules*/
	Module.prototype.loadModules = function( modules, options ){
		
		log('Module : Load');
		this._modules = modules;		
		this._mCOunt = modules.length;
		this._aModuleIndex = 0;
		
		log('Module : Count' + this._mCOunt);
		
		if( typeof options != 'undefined' )
			this._mOptions = options;
		else
			this._mOptions = {};
		
		this.runModule();
	};
	
	/*run modules*/
	Module.prototype.runModule = function( ){
		
		
		if( this._aModuleIndex == this._mCOunt ){
			
			log('Module : Loaded All');
			log(this._mOptions);
			if(  typeof this._mOptions.oncomplete == 'function')
				this._mOptions.oncomplete();
			
			return true;
		}
		
		if( this._aModuleIndex < this._mCOunt ){
			
			this._aModule = this._modules[ this._aModuleIndex ];
			
			this._execute();
		}
		
	};
	
	/*execute module*/
	Module.prototype._execute = function( ){
		
		var _mod = this._aModule;
		
		log('Module : Loading - ' + _mod.module);
		var callback = _mod.callback || false;
		
		$.ajax({
			url:  _mod.module+'.js',
			type:'GET',
			cache: false,
			dataType:'script',
			success: function(data){
				
				log('Module : Complete - ' + _mod.module);
				
				Module._aModuleIndex++;
				
				Module.runModule();
				if( typeof callback == 'function' ){
					callback();
				}
			}
		}); 
		
	};

	window.Module = new Module();
})();
