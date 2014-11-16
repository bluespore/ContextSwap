'use strict';

/**
 * Context Swap
 */
var ContextSwap = function(options){
    if(typeof options !== "object"){
        console.error('Context Swap Options set incorrectly');
        return false;
    }

    /**
     * Module options
     * Expected Params:
     * @param {String} node - Selector of element to bind to (context)
     * @param {String} closeElement selector
     * @param {String} openElement selector
     * @param {String} closeEvent
     * @param {String} openEvent
     * @param {String} modifier
     * @param {Function} onContextChange callback function
     */
    this.options = options;
    this.$node = $(this.options.node);
    this.init();
};

ContextSwap.prototype.init = function(){
    var root = this;
    this.$node.on(this.options.openEvent, this.options.openElement, function(e){
        e.preventDefault();
        root.changeContext();
    });
}

/**
 * Show options associated with this ContextSwap
 * @return {Boolean}
 */
ContextSwap.prototype.logOptions = function(){
    console.log(this.options);
    return true;
}

/**
 * Get options
 * @return {object} Module options
 */
ContextSwap.prototype.getOptions = function(){
    return this.options;
}

/**
 * Check if active
 * @return {Boolean} Returns status of hasClass
 */
ContextSwap.prototype.isActive = function(){
    return this.$node.hasClass(this.options.modifier);
}

/**
 * Activate functionality
 * @return {jQuery Object} Module node
 */
ContextSwap.prototype.activate = function(){
    var root = this;

    this.$node
    .addClass(this.options.modifier)
    .on(this.options.closeEvent, this.options.closeElement, function(e){
        e.preventDefault();
        root.changeContext();
    });

    return this.$node;
}

/**
 * Deactivate functionality
 * @return {jQuery Object} Module node
 */
ContextSwap.prototype.deactivate = function(){
    this.$node
    .removeClass(this.options.modifier)
    .off(this.options.closeEvent, this.options.closeElement);

    return this.$node;
}

/**
 * Destroy this module
 * @return {Boolean} successful destroy
 */
ContextSwap.prototype.destroy = function(){
    this.deactivate()
    .off(this.options.openEvent, this.options.openElement);
    delete this;
    return true;
}

/**
 * Change context
 * @return {Boolean} True for mutated context, false for default
 */
ContextSwap.prototype.changeContext = function(){
    if(typeof this.options.onContextChange !== 'function'){
        console.error('Callback supplied not a valid function');
        return false;
    }

    if(this.isActive()){
        this.deactivate();
    }
    else{
        this.activate();
    }

    this.options.onContextChange.call(this);
}

module.exports = ContextSwap;