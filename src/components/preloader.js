// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

/**
 * Visual preloader system for A-Frame.
 *
 * When applied to the <scene> will automatically display a preloader modal that reflects the current loading progress
 * of resources in <a-assets> that have been flagged for preloading and will auto-close the modal when it reaches 100%.
 * Alternately, the modal can be manually closed
 *
 * Emits a 'preloading-complete' event when done.
 */
AFRAME.registerSystem('preloader', {
    schema: {
        target: { type: 'selector', default: '#preloader'}, //the html target selector
        progressValueAttr:  { type: 'string', default: 'aria-valuenow' },//an attribute of the progress bar to set when progress is updated
        label: { type: 'selector', default: '#preloader .progress-label'}, //html class of label in preloader - used to set the percentage
        labelText: { type: 'string', default: '{0}% Cargado'}, //loading text format {0} will be replaced with the percent progress e.g. 30%
        autoClose: { type: 'boolean', default: true}, //automatically close preloader by default - not supported if clickToClose is set to 'true'
        debug: { type: 'boolean', default: false}, //whether or not to enable logging to console
        disableVRModeUI: { type: 'boolean', default: true}, //whether or not to disable VR Mode UI when preloading
        slowLoad: { type: 'boolean', default: false}, //deliberately slow down the load progress by adding 2 second delays before updating progress - used to showcase loader on fast connections and should not be enabled in production
        doneLabelText: { type: 'string', default: 'Iniciando Experiencia VR...'}, //text to set on label when loading is complete
        skAnimation: { type: 'selector', default: '.sk-spinner-pulse' }
    },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    loadedAssetCount: 0, //total number of assets loaded
    totalAssetCount: 0, //total number of assets to load
    slowLoadTimeAssetUpdate: 1000, //length of time to slow down asset load progress if slowLoad is set to 'true'
    slowLoadTimePreloadFinish: 4000, //length of time to slow down preload finish if slowLoad is set to 'true'

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {

        if(!this.data.target) { return; };

        if(this.data.debug){
            console.log('Initialized preloader');
        }

        document.querySelector('a-assets').addEventListener('loaded',function(){
            if(this.data.debug){
                console.info('All assets loaded');
            }
            this.triggerProgressComplete();

        }.bind(this));

        var assetItems = document.querySelectorAll('a-assets a-asset-item,a-assets img,a-assets audio,a-assets video');

        this.totalAssetCount = assetItems.length;
        this.watchPreloadProgress(assetItems);
        this.initPreloader();

        if(this.data.disableVRModeUI){
            this.sceneEl.setAttribute('vr-mode-ui','enabled','false');
        }
    },

    /**
     *
     * @param assetItems A NodeList with a list of <a-asset-item> elements that you wish to watch
     */
    watchPreloadProgress: function(assetItems){
        for (var a = 0; a < assetItems.length; a++) {

            var eventName;

            switch(assetItems[a].nodeName.toLowerCase()){
                case 'a-asset-item':
                    eventName = 'loaded';
                    break;
                case 'img':
                    eventName = 'load';
                    break;
                case 'audio':
                case 'video':
                    eventName = 'loadeddata';
                    break;
            }

            assetItems[a].addEventListener(eventName,function(e){
                this.loadedAssetCount++;
                if(this.data.debug) {
                    console.info('Loaded ' + this.loadedAssetCount + '/' + this.totalAssetCount + ' asset items');
                }
                this.onAssetLoaded();
            }.bind(this));
        }
    },

    onAssetLoaded: function(){
        if(this.loadedAssetCount === this.totalAssetCount){
            this.triggerProgressComplete();
        }else{
            var percentage = Math.floor(this.loadedAssetCount/this.totalAssetCount*100);
            if(this.data.slowLoad) {
                setTimeout(function () {
                    this.drawProgress(percentage);
                }.bind(this), this.slowLoadTimeAssetUpdate)
            }else{
                this.drawProgress(percentage);
            }
        }
    },

    triggerProgressComplete: function(){

        if(this.data.slowLoad){
            setTimeout(function(){
                this.drawProgress(100);
                this.data.target.classList.add('preloader__complete');
            }.bind(this),this.slowLoadTimePreloadFinish-1000);
        }else{
            this.drawProgress(100);
            this.data.target.classList.add('preloader__complete');
        }

        if(this.data.autoClose){
            if(this.data.slowLoad){
                setTimeout(function(){
                    this.triggerPreloadingComplete();
                    this.closeDiv();
                }.bind(this),this.slowLoadTimePreloadFinish)
            }else{
                this.triggerPreloadingComplete();
                this.closeDiv();
            }

        }
    },

    drawProgress: function(percentage){
        this.data.label.innerHTML = (percentage === 100) ? this.data.doneLabelText : this.data.labelText.format(percentage);
        if(percentage === 100 && this.data.skAnimation.length) {
            this.data.skAnimation.parentNode.removeChild(this.data.skAnimation);
        }
    },

    initPreloader: function(){
        this.data.target.style.display = 'block';
        this.data.target.style.zIndex = '500';
    },

    triggerPreloadingComplete: function(){
        if(this.data.debug){
            console.info('Preloading complete');
        }
        if(this.data.disableVRModeUI){
            this.sceneEl.setAttribute('vr-mode-ui','enabled','true');
        }

        this.sceneEl.emit('preloading-complete');
    },

    closeDiv: function(){
        const _this = this;
        setTimeout(function () {
            _this.data.target.style.display = 'none';
            _this.data.target.style.zIndex = '0';
        }, 1500);
    }
});
