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
			<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>


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

			<body class="{bodyClass} ">

				<div class="loader" id="loader" style="display:none">
					<div class="lds-ripple">
						<div></div>
						<div></div>
					</div>
				</div>
				<div class="full-width-container">
					<header class="page-header"> 
						<div class="d-flex justify-content-between w-100 align-items-center">
							<div>
								<img class="logo"
									src="https://sdlms.deepthought.education/assets/uploads/files/system/site-logo.svg">
							</div>
							<div class="d-flex align-items-center">
								<div class="header-dropdown-menu w-100 d-none">
									<div class="nav-menu-item me-3" data-href="#" data-title="Home"><i class="fas fa-home"></i>
									</div>
									<div class="nav-menu-item me-3" data-href="#" data-title="User"><i class="fas fa-home"></i>
									</div>
									<div class="nav-menu-item me-3" data-href="#" data-title="Newer"><i class="fas fa-home"></i>
									</div>
								</div>
								<div class="nav-menu-item-extra d-none me-3 dropdown">
									<i class="fas fa-ellipsis-v dropdown-toggle" data-bs-toggle="dropdown"></i>
									<ul class="dropdown-menu">
										<li><a class="dropdown-item" href="#">Action</a></li>
										<li><a class="dropdown-item" href="#">Another action</a></li>
										<li><a class="dropdown-item" href="#">Something else here</a></li>
									</ul>
								</div>
								<div class="me-3">
									<img class="user-img" src="{user.picture}">
								</div>
							</div>
						</div>
					</header>

					<!-- IMPORT partials/sidebar/sidebar.tpl -->

					<div id="content" component="content">
			<!-- IMPORT partials/noscript/warning.tpl -->