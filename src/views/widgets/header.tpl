<!DOCTYPE html>
<html lang="{function.localeToHTML, defaultLang}" <!-- IF languageDirection -->data-dir="{languageDirection}"
	style="direction: {languageDirection};"
	<!-- ENDIF languageDirection -->>

	<head>

		<title>{browserTitle}</title>
		<!-- BEGIN metaTags -->
		{function.buildMetaTag}
			<!-- END metaTags -->

			<script>
				var config = JSON.parse('{{configJSON}}');
				var app = {
					user: JSON.parse('{{userJSON}}')
				};
			</script>

			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
			<link
				href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;600;700&display=swap"
				rel="stylesheet">
			<link rel="stylesheet" type="text/css" href="/assets/styles.css" />

			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
			<script src="https://kit.fontawesome.com/bac533fb64.js" crossorigin="anonymous"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>


			<!-- BEGIN linkTags -->
			{function.buildLinkTag}
				<!-- END linkTags -->

				<!--[if lt IE 9]>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.3.0/es5-shim.min.js"></script>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7/html5shiv.js"></script>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js"></script>
  		<script>_lt_ie_9_ = 1;</script>
	<![endif]-->

			</head>

			<body class="{bodyClass} template-widgets ">
				<div class="loader" id="loader">
					<div class="lds-ripple">
						<div></div>
						<div></div>
					</div>
				</div>
				<nav class="widgets-header position-relative d-flex align-items-center p-3">
					<h2 class="widget-title"></h2> 
					<button class="back" style="display:none" onclick="history.back()">Back</button>

				</nav>
				<div class="widgets-body">


					<div id="content" class="bg-grey-light" component="content">
			<!-- IMPORT partials/noscript/warning.tpl -->