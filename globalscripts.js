function CheckFormatting()
		{
			var userAgent = navigator.userAgent.toLowerCase();
			//userAgent = "iphone";
			if (userAgent.indexOf("iphone") != -1)
			{
				document.getElementsByClassName("mainParagraph")[0].style.margin = "0% 5% 0% 5%";
			}
		}
