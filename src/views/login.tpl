<!-- IMPORT partials/breadcrumbs.tpl -->

<div class="row">
	<!-- IF allowLocalLogin -->
	<div class="<!-- IF alternate_logins -->col-md-6<!-- ELSE -->col-md-12<!-- ENDIF alternate_logins -->">
		<div class="login-block">
			<div class="alert alert-danger" id="login-error-notify" <!-- IF error -->style="display:block"<!-- ELSE -->style="display: none;"<!-- ENDIF error -->>
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong>[[login:failed_login_attempt]]</strong>
				<p>{error}</p>
			</div>

			<form class="form-horizontal" role="form" method="post" id="login-form">
				<div class="form-group">
					<label for="username" class="col-lg-2 control-label sdlms-text-black-16px font-poppins">{allowLoginWith}</label>
					<div class="col-lg-10 " class="font-poppins sdlms-text-tertiary-16px">
						<input class="form-control" type="text" placeholder="{allowLoginWith}" name="username" id="username" autocorrect="off" autocapitalize="off" value="{username}"/>
					</div>
				</div>
				<div class="form-group">
					<label for="password" class="col-lg-2 control-label sdlms-text-black-16px font-poppins">[[user:password]]</label>
					<div class="col-lg-10" class="font-poppins sdlms-text-tertiary-16px">
						<input class="form-control" type="password" placeholder="[[user:password]]" name="password" id="password" <!-- IF username -->autocomplete="off"<!-- ENDIF username -->/>
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-offset-2 col-lg-10">
						<div class="checkbox">
							<label class="sdlms-text-black-16px font-poppins">
								<input type="checkbox" name="remember" id="remember" checked /> [[login:remember_me]]
							</label>
						</div>
					</div>
				</div>
				{{{each loginFormEntry}}}
				<div class="form-group loginFormEntry">
					<label for="login-{loginFormEntry.styleName}" class="col-lg-4 control-label">{loginFormEntry.label}</label>
					<div id="login-{loginFormEntry.styleName}" class="col-lg-8">{{loginFormEntry.html}}</div>
				</div>
				{{{end}}}
				<input type="hidden" name="_csrf" value="{config.csrf_token}" />
				<input type="hidden" name="noscript" id="noscript" value="true" />
				<div class="form-group">
					<div class="col-lg-offset-2 col-lg-10">
						<button class="btn btn-primary btn-lg btn-block sdlms-text-white-16px font-poppins primary-background" id="login" type="submit">[[global:login]]</button>
						<!-- IF allowRegistration -->
						<span class="sdlms-text-black-16px font-poppins">[[login:dont_have_account]] <a href="{config.relative_path}/register" class="sdlms-sub-text-primary-16px font-poppins">[[register:register]]</a></span>
						<!-- ENDIF allowRegistration -->
						<!-- IF allowPasswordReset -->
						&nbsp; <a id="reset-link" href="{config.relative_path}/reset" class="sdlms-sub-text-primary-16px font-poppins">[[login:forgot_password]]</a>
						<!-- ENDIF allowPasswordReset -->
					</div>
				</div>
			</form>

		</div>
	</div>
	<!-- ENDIF allowLocalLogin -->

	<!-- IF alternate_logins -->
	<div class="<!-- IF allowLocalLogin -->col-md-6<!-- ELSE -->col-md-12<!-- ENDIF allowLocalLogin -->">
		<div class="alt-login-block">
			<h4>[[login:alternative_logins]]</h4>
			<ul class="alt-logins">
				{{{each authentication}}}
				<li class="{authentication.name}"><a rel="nofollow noopener noreferrer" target="_top" href="{config.relative_path}{authentication.url}"><i class="fa {authentication.icon} fa-3x"></i></a></li>
				{{{end}}}
			</ul>
		</div>
	</div>
	<!-- ENDIF alternate_logins -->
</div>
