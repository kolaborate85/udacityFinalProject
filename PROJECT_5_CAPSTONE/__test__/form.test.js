/**
 * @jest-environment jsdom
 */

const formHandler= require('../src/client/js/formHandler');
test('fetch Api-result', function(){
    

    
    formHandler.domElements.text = {value:'test-value'}
    formHandler.domElements.results= { innerHTML: ""};
    
    formHandler.handleSubmit(mockEvent);
    setTimeout(function(){
        expect(formHandler.domElements.results).stringContaining('none')
    },100);
})

global.fetch = function(url){
	return new Promise(function(resolve, reject){
    	// assert right formTExt
      resolve({
      	json:function(){
        	return {
            	irony: "none",
               	confidence: "yes",
              	subjectivity: "no"
            }
        }
      })
    })
}

const mockEvent = {
    preventDefault(){}
};