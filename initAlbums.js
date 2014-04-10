var currentX = 0;
var currentY = 0;
var imagesArray = [[1,'important'],[2,'square'],[3,'square'],[1,'wide'],[1,'square'],[1,'square']]; // [src][type]
var imagesQueue = new Array();
var field = new Array();

function buildMosaic(){
	while(imagesArray.length != 0){
		tryPut(0);
	}
	//todo: well, now I can to build my mosaic :3
	var markup = "";
}

function initField(){
	while(imagesArray.length>0){
		var placeSearching = true;
		while(placeSearching){
			if(currentY==5){
				currentY=0;
				currentX++;
			}
			if(typeof field[currentX] == "undefined"){
				placeSearching = false;
				field[currentX] = new Array();
				break;
			}
			else
				if(typeof field[currentX][currentY] == "undefined"){
					placeSearching = false;
					break;
				}
			
			if(field[currentX][currentY]==0)
				currentY++;
		}
		
		if(!tryPut(0)){
			alert("error");
			break;
		}
	}
};


function tryPut(i){
	var imageSrc = imagesArray[i][0];
	var imageType = imagesArray[i][1];
	if(imageType==null)
		return false;
	switch(imageType){
		case 'square':
			field[currentX][currentY]="square";
			imageQueue.put(imageSrc);
			imagesArray.splice(i,1);
			currentY++;
			return true;
		case 'wide':
			if(checkRight()){
				field[currentX][currentY]="2";
				field[currentX+1][currentY]="0";
				imageQueue.put(imageSrc);
				imagesArray.splice(i,1);
				currentY++;
				return true;
			}
			break;
		case 'normal':
			if(checkBottom()){
				field[currentX][currentY]="3";
				field[currentX][currentY+1]="0";
				imageQueue.put(imageSrc);
				imagesArray.splice(i,1);
				currentY++;
				return true;
			}
			break;
		case 'important':
		
			if(checkRight() && checkBottom()){
				field[currentX][currentY]="4";
				field[currentX+1][currentY]="0";
				field[currentX][currentY+1]="0";
				field[currentX+1][currentY+1]="0";
				imageQueue.put(imageSrc);
				imagesArray.splice(i,1);
				currentY++;
				return true;
			}
			break;
	}
	return tryPut(i+1);
};
function checkRight(){
	if(typeof field[currentX+1] == "undefined")
		field[currentX+1] = new Array();
	return true;
};
function checkBottom(){
	if(currentY==4)
		return false;
	return (field[currentX][currentY+1]==null)
};

