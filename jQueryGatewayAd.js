/* 
 * This jQuery loads an ad from google, centers it and makes the background 'grey' out once per session
 * Written by Kevin O'Riley for use @417 Magazine
 * Please credit 417 Magazine and Kevin O'Riley if used
 * 
 * to call create a div, give the div an ID or Class to call the function, put js google ad function in div
 * i.e <div id="gateway"><script>{literal}GA_googleFillSlot('gateway');{/literal}</script></div>
 * <script>
 *{literal}
 *jQuery(window).load(function(){
 *    koGateway('#gateway');
 *});
 *{/literal}
 *</script>
 *
 * Remove the {literal}{/literal} commands, they are for smarty templates, which we use at 417
 *
 */



function koGateway(id) {
  
   //Dont show on the phone if told not to
    var phone = jQuery(id).attr("data-phone");
    //console.log("this is "+phone);
    var myWindow = jQuery(window).width();
    var display = "show";
    if(((phone == "no") || (phone == undefined)) && (myWindow <= "480")){
        jQuery(thisElement).remove();
        display = "hide";
    }
   
    if(display == "show"){
  
  var indexHigh = 0;
    jQuery('div').each(function(){
        var curIndex = parseInt(jQuery(this).css('z-index'), 10); 
        if(curIndex > indexHigh){
            indexHigh = curIndex;
        }
    });
         
    //the above code makes sure the pop up has the highest z-index
        
    if(sessionStorage.firstVisit == "true"){
        //if you have already seen this ad, lets not show it for you again, till you close this tab
        jQuery(id).remove();
        jQuery('#greyOutPop').remove();
               
    } 
           
    if(sessionStorage.firstVisit != "true"){
        /*
                   * This is the meat, creates a 'grey out' div, moves the div to the same 
                   * element as the pop up div, centers the popup div, shows it all, and if you click, removes it 
                   * all and sets the seen this var
                   */
                  
        jQuery(id).css("position","fixed");
        jQuery(id).css("top", Math.max(0, ((jQuery(window).height() - jQuery(id).outerHeight()) / 2)));
        jQuery(id).css("left", Math.max(0, ((jQuery(window).width() - jQuery(id).outerWidth()) / 2)));
        jQuery(id).css("z-index", indexHigh+2);
        jQuery(id).css('overflow','hidden');
        jQuery(id +" iframe").css("box-shadow","5px 5px 10px #000000");
        jQuery(id).addClass('clickRemove');
        jQuery('body').append('<span id="closeX" style="float:right; color:#fff; font-size:35px; cursor:pointer;">&times;</span>');  // A little x that tells people how to close the ad 
        jQuery('body').append('<div id="greyOutPop" style=""></div>');
        jQuery('#closeX').appendTo('.clickRemove');
        jQuery('#greyOutPop').insertAfter('.clickRemove');
        jQuery('#greyOutPop').css({
            "background-color":"#000", 
            "opacity":"0.5", 
            "width":"100%", 
            "height":"100%", 
            "position":"fixed",
            "top":"0", 
            "bottom":"0", 
            "left":"0", 
            "right":"0", 
            "z-index":indexHigh++
        });
        jQuery(window).resize(function(){ //Lets readjust position if the screen changes size on us, probably not needed, but fun.. 
            jQuery(id).css("top", Math.max(0, ((jQuery(window).height() - jQuery(id).outerHeight()) / 2)));
            jQuery(id).css("left", Math.max(0, ((jQuery(window).width() - jQuery(id).outerWidth()) / 2)));
        });  
            
        jQuery(id).show();
        jQuery(document).click(function(){
           jQuery('.clickRemove').remove();
            jQuery('#greyOutPop').remove();
            sessionStorage.firstVisit = "true";
       });            
                   
            
    } 
     
      
}

}
/*
 * This is a function, like the one above, but should be activate on a $().click();
 */

