<p> 
		<?php

		if( (isset($_GET["userName"])) && (isset($_GET["cluster"])) ){

			$userName = $_GET["userName"];
			$cluster = $_GET["cluster"];

			switch ($cluster) {
			    case "Understand_by_looking":
			        echo $userName.", you are an Observer.";
			        break;
			    case "Unleash_by_connecting":
			        echo $userName.", you are a Networker.";
			        break;
			    case "Create_by_working_together":
			        echo $userName.", you are a collaborator.";
			        break;
			    case "Learn_by_sharing":
			        echo $userName.", you are a bridger.";
			        break;
			    case "Learn_by_doing":
			        echo $userName.", you are a prototyper.";
			        break;
			    case "Reveal_by_communicating":
			        echo $userName.", you are a Narrator.";
			        break;
			    default:
			    	echo "who are you". $_GET["cluster"]."?";
			    	break;
			}
		}
		?>
</p>