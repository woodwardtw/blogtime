
function jsonStart () {
  var urlChop = 'blog post title';
  return '{"title": {"media": {"url": "","caption": "","credit": ""},"text": {"headline": "' + urlChop + '","text": "<p>A timeline of the last 50 posts</p>"}}, "events": [';
}



var _theUrl = urlHash()+'/wp-json/wp/v2/posts?_embed&per_page=5';
var timeline_json = "";

function getData(){
$(document).ready(function() {
  var theEvents = "";
  var i = 0;
  var posts = $.ajax({     
    url: _theUrl,
    jsonp: "cb",
    dataType: 'json',
    success: function(data) {
     var lastOne = (data.length-1);
        //console.log(data); //dumps the data to the console to check if the callback is made successfully.
        $.each(data, function(index, item) {
           var mediaStart = '{"media" : {';
           var mediaURL = '"url" : "' + theImage(item) +'",';
           var mediaCaption = '"caption":' + '""' +',';
           var mediaCredit = '"credit":'+'""';
           var mediaEnd = ' },';
           
           var dateStart = '"start_date": {';
           var dateMonth = '"month": "' +item.date_gmt.substring(5,7) + '",';
           var dateDay = ' "day":"' + item.date_gmt.substring(8,10) + '",';
           var dateYear = ' "year":"' + item.date_gmt.substring(0,4) + '"';
           var dateEnd = '},';

           var textStart = ' "text": {';
           var textHeadline = '"headline": "' + item.title.rendered + '",';
           var textText = '"text":"text"}}';
           if (index != lastOne) {
            textText = textText+',';
           }
                  
           var theMedia = mediaStart+mediaURL+mediaCaption+mediaCredit+mediaEnd; 
           var theDate = dateStart+dateMonth+dateDay+dateYear+dateEnd;
           var theText = textStart+textHeadline+textText;

           theEvents = theEvents+=(theMedia+theDate+theText);
           if (index === lastOne){

            timeline_json = jsonStart() + theEvents + ']}'; 
            //console.log(timeline_json);
            insertData(timeline_json);

            return timeline_json;

           }
        }); //each   
      } //success   

  }); //ajax
  
  //get total pages      
}); //ready
}


function makeTimeline(){
  var theData = document.getElementById('output').innerHTML;
  console.log(theData);
  window.timeline = new TL.Timeline('timeline-embed', theData);
}

function insertData(content) {
    document.getElementById('output').innerHTML = content;
}


function loadData(json){
    addCode('jsFile='+json);
    createStoryJS({
        type:       'timeline',
        width:      '800',
        height:     '600',
        source:     jsFile,
        embed_id:   'my-timeline'
    });
}

//addCode(code) will create a script element and add code to it
function addCode(code){
    var JS= document.createElement('script');
    JS.text= code;
    document.body.appendChild(JS);
}


function backImg(item){
    var rand = Math.floor(Math.random() * bgColors.length);
    return bgColors[rand];
}

function theImage(item){
    if (item.featured_media >0){
    theImg =  item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
    //console.log(theImg);
    return theImg;
  } else {
    return '';
  }
}          


//GET THE HASH VARIABLE FROM URL 
function urlHash(){
  if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      if (hash.includes('http')){
        return hash;
      } else{
        return 'http://'+hash;
      }
      // hash found
  } else {
      // No hash found
      return 'https://bionicteaching.com';
  }
}

