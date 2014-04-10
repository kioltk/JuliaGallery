var imageDesktopSize = 0.25;
var imageMobileSize = 0.4;
var isItMobile = false;
window.onload=(function(){	
    cropImages();
	
		
	
		
});
window.onresize=(function(){
    cropImages();
	if(mosaicShowed){
		buildMosaic();
	}
});




function onCategorySelected(item){
	$(item).attr('id','selected');
	deleteAllCategoriesExceptSelected();
	
}

function deleteListItem(item){
	if(isItMobile){
		$(item).css({
						'transition':'1.5s',
						'height':0
					});
	}else{
		$(item).css({
						'transition':'1.5s',
						'width':0
					});
	}
};

function deleteAllCategoriesExceptSelected(){
	var items = $('.services-list li.category:first');
		items.each(function(i){
				
				if($(this).attr('id')!='selected'){
					deleteListItem($(this));
					$(this).bind(
						"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", 
						function(){ 
							$(this).remove(); 
							deleteAllCategoriesExceptSelected(); 
						}
					);
				}
				else{
					deleteCategoriesFromLastTillSelected();
				}
				
		});
}
function deleteCategoriesFromLastTillSelected(){
	var items = $('.services-list li.category:last');
		items.each(function(i){
			
				if($(this).attr('id')!='selected'){
					deleteListItem($(this));
					$(this).bind(
						"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", 
						function(){ 
							$(this).remove(); 
							deleteCategoriesFromLastTillSelected(); 
						}
					);
				}
				
		});
}

function deleteAllItems(){
	var items = $('.services-list li:last');
		items.each(function(i){
			
					deleteListItem($(this));
					$(this).bind(
						"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", 
						function(){ 
							$(this).remove(); 
							deleteAllItems(); 
						}
					);
				
		});
}


// НИЛАПАТЬ
function cropImages() {
	
		var width = document.body.clientWidth;
		var height = document.body.clientHeight;
		var imageSize = imageDesktopSize;
		
		var items = $('.services-list li');
		var list = $('.services-list');
		// по ориентации
		if(height>width){
			// мобильный
			isItMobile=true;
			imageSize = imageMobileSize;
			list.each(function(i){
				var size = items.size();
				$(this).css({
					
				});
				$(this).attr("class","services-list mobile");
			});
			
			items.each(function(i){
				$(this).css({
					'height': height * imageSize
				});
				var image = $(this).find('.image');
				centerVertically(image);
			});
			
		}
		else{
			isItMobile = false;
			// устанавливаем ширину списка такой, какой она заранее будет
			list.each(function(i){
				var size = items.size();
				$(this).css({
					'width': size * imageSize * width,
				});
				$(this).attr("class","services-list desktop");
			});
			
			items.each(function(i){
				
				$(this).css({
					'width': imageSize * width,
				});
				var image = $(this).find('.image');
				centerHorizontally(image);
				
				var vignette = $(this).find('vignette');
				image.bind(
					"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", 
					function(){ 
						vignette.addClass("hovered"); 
					}
				);
			});
			
		}
    };
	
function centerVertically(image){
	var imgVRelativeOffset = (image.height() - image.parent().height()) / 2;
	image.css({
		'top' : imgVRelativeOffset * - 1
	});
}
function centerHorizontally(image){
	var imgVRelativeOffset = (image.width() - image.parent().width()) / 2;
	image.css({
		'left': imgVRelativeOffset * - 1,
	});
}