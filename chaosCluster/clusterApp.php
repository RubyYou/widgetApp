<!doctype html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="Author" content="cluster app" />
  <meta name="Keywords" content=""/>
  <meta name="Description" content="" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <!--<link rel="stylesheet" type="text/css" media="screen" 
  		href="http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.2/jquery.mobile.min.css" />
-->
  <title>
    Prototyper project A | cluster App
  </title>
  <!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js">
	</script>
  <![endif]-->
  <style type="text/css" >
		#page{
			padding:10px 20px;
		}
  </style>
</head>

<body>
	<!--
	Next step:
	1. Create more quesitions and generate result.
	2. access database to restore or output contents.
	-->

<section id="page">

	<!-- create 5 question with check list ?-->
	<p class="output">The Cluster APP</p>

	<form action="clusterGet.php" method="get">
		<h3>Question 1: <br/>who are you?</h3>
		<label for="text-basic">Tell us who you are.</label>
		<input type="text" name="userName" id="text-basic" value="">

		<h3>Question 2: <br/>How do you learn new things?</h3>

	        <input type="radio" name="cluster" id="radio-choice-1" value="Understand_by_looking" checked="checked">
	        <label for="radio-choice-1">Understand by looking</label><br/>
	        <input type="radio" name="cluster" id="radio-choice-2" value="Unleash_by_connecting">
	        <label for="radio-choice-2">Unleash by connecting</label><br/>
	        <input type="radio" name="cluster" id="radio-choice-3" value="Create_by_working_together">
	        <label for="radio-choice-3">Create by working together</label><br/>
	        <input type="radio" name="cluster" id="radio-choice-4" value="Learn_by_sharing">
	        <label for="radio-choice-4">Learn by sharing</label><br/>
	        <input type="radio" name="cluster" id="radio-choice-5" value="Learn_by_doing">
	        <label for="radio-choice-5">Learn by doing</label><br/>
	        <input type="radio" name="cluster" id="radio-choice-6" value="Reveal_by_communicating">
	        <label for="radio-choice-6">Reveal by communicating</label><br/>

	    <br/>
		<input type="submit" class="ui-shadow ui-btn ui-corner-all" value="submit"/>
	</form>

</section>

	<!-- JavaScript => todo: jQ mobile
    ================================================== -->
	<!--<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.2/jquery.mobile.min.js"></script>-->
</body>
</html>