<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>

</head>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap');
</style>

<body width="1040px" style="width: 1040px; height: 640px;">
	<div style="padding: 22px 75px; width: 890px; display: flex; justify-content: space-between; box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important; align-items: center; background-color: white; font-family: 'Poppins', sans-serif;">
		<p style="font-size: 42px; font-weight: 600; margin: 0;">
			<span style="color: #0029ff;">
				{{event_text_1}}
			</span>
			<span>
				{{event_text_2}}
			</span>
		</p>
		<img src="https://blog.deepthought.education/wp-content/uploads/2022/06/dt-logo-expanded.svg" alt="" style="width: 145px; height: 23px;">
	</div>
	<div style="padding: 65px 75px 45px 75px; width: 890px; height: 418px; font-family: 'Poppins', sans-serif; background: rgba(217, 217, 217, 0.2);">
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<div>
				<div style="display: flex; justify-content: space-between;">
					<img src="https://blog.deepthought.education/wp-content/uploads/2022/07/left-quote.png" alt="">
					<div></div>
				</div>
				<div style="display: flex; justify-content: center; padding: 16px 24px;">
					<p style="width: 400px; margin: 0; font-family: 'Open Sans', sans-serif; font-size: 20px; color: black; overflow-wrap: break-word;">
						{{anecdote}}
					</p>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<div></div>
					<img src="https://blog.deepthought.education/wp-content/uploads/2022/07/right-quote.png" alt="">
				</div>
			</div>
			<img src="{{image}}" style="height: 340px; width: 340px; border: 6px solid #FFFFFF; border-radius: 50%; object-fit: cover; box-shadow: 8px 8px 24px 0px #00000033;" alt="">
		</div>
		<div style="margin-top: 30px; display: flex; justify-content: space-between;">
			<div></div>
			<div>
				<p style="font-size: 20px; width: 340px; color: #0029ff; margin: 0; text-align: center; font-weight: 600;">
					{{name}}
				</p>
				<p style="width: 340px; text-align: center; margin: 0; font-family: 'Open Sans', sans-serif; font-size: 16px;">
					{{designation}}
				</p>
			</div>
		</div>
	</div>
</body>

</html>