<?

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');


if (isset ($_GET["url"]) !=""){
	$baseUrl = 'http://' . htmlspecialchars($_GET["url"]);	
} else {
	$baseUrl = "https://bionicteaching.com";
}


$jsonUrl = $baseUrl . '/wp-json/wp/v2/posts?_embed';

$json = file_get_contents($jsonUrl);

$obj = json_decode($json,true);


$timelineIntro = '{ "timeline": { "headline" : "Your Site + TimelineJS", "type" : "default", "text" : "<p>The last 50 posts</p>" },';


$timelineEvents = $timelineIntro . '"date" : [ ';

foreach ($obj as $key => $value) {
	$i = 1;
    $timelineEvents .= '{ "startDate" : "2001,12,10:, "endDate" : "2002,12,09", "headline" : "foo-' .$value["title"]["rendered"]. '"text" : "some words", "asset" { "media" : "https://c1.staticflickr.com/5/4165/34235788350_ce2563a421_b.jpg" } }'  ;
 
    if(end($obj) !== $value){
     $timelineEvents .=	',';
    } else {
    	$timelineEvents .= ']}';
    }
  };

echo $timelineEvents;


?>
