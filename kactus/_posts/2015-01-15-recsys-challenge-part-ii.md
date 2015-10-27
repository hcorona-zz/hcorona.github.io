---
title: 'recsys challenge: part II'
author: aloneindecember
layout: post
permalink: /recsys-challenge-part-ii/
categories:
  - Uncategorized
---
After my first entry on the recsys challenge ([recsys challenge: part I][1]) , I now show analyse some time patterns more in depth. It is important to understand **when do people browse and buy?**, to include that information in our model (if that turns out to be valuable)

<h2 style="text-align: center;">
  When do people buy stuff?<br /> Well, definitely not Tuesdays!
</h2>

To answer the question, I will follow a top down approach, from moths to days to hours, trying to understand how people behave in the scenario presented by this dataset. I will also compare the trends found here with those found in the previous recsys challenges, finding that user behaviour is, as one can expect, domain dependent.

*Lets analyse the monthly trends.* The figure below shows a histogram of the number of transactions per month. We show both purchases (blue line, left vertical axis) and clicks (green line, right vertical axis). As we know from the previous post, we are given six months worth of data &#8211; April to September 2014. There are two main things to highlight from this graph: First, the activity on the site was decreasing from April to July, with the browsing activity decreasing at a lower pace than the buying activity, being the global maximum located in July (beware the different scales in the graph, even in July, there are many more clicks than purchases). In August the activity of the site reaches it maximum value. **This effect might have something to do with summer sales, so maybe this e-commerce  platform sells seasonal items such as clothes. **Moreover, the conversion rate (fraction of number of purchases per click) in the second quarter (July, August and September) is  higher than for the first quarter.

<div id="attachment_422" style="width: 1010px" class="wp-caption aligncenter">
  <a href="http://aloneindecember.com/words/wp-content/uploads/2015/01/month_hist1.png"><img class="wp-image-422 size-full" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/month_hist1.png" alt="month_hist" width="1000" height="600" /></a>
  
  <p class="wp-caption-text">
    Site activity, monthly histogram
  </p>
</div>

&nbsp;

&nbsp;

Of course, I am assuming we are given all there data there is. I also assume there is no other artefact or filtering on the data we are given that could bias the data, something which is not certain (might have to ask @recsyschallenge). **However, given these assumptions are true, the data could be showing us an interesting behaviour on the way people buy things, holding off from buying in June, knowing that they can find the same product cheaper in July**. It would be interesting to see what are the figures like per category (something left for the next blog post in a few weeks).

*Let&#8217;s now analyse the daily pattern per month.* This is very interesting, as it can help us understand, for example, **what day do people buy things, in relation to when they get paid?**. The figure below show a histogram of the site activity, where time has been divided by dates, from the first to the last day of each month.

**<span style="line-height: 1.5;">To be honest, I would expect to see a different result, maybe we need more data to see that people tend to spend their paycheques as soon as possible, but the data tells us that the site has more activity on week 2 and 3 of the month. </span>**<span style="line-height: 1.5;">However, there is an interesting trend show in the graph. The distance between each peak of activity (this is, the wavelength) is exactly 4 days, except for the period 13th &#8211; 18th, which lasts 6 days instead of 4. For now, I leave this as an open question, the comments section is open for answers.</span>

<div id="attachment_386" style="width: 1010px" class="wp-caption aligncenter">
  <img class="wp-image-386 size-full" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/day_month.png" alt="day_month" width="1000" height="600" />
  
  <p class="wp-caption-text">
    Site activity, date histogram
  </p>
</div>

*So lets now see the day of the week*. This is extremely interesting, and generated some discussion in my [group][2]. **It turns out the site has its highest activity is on Sundays**, followed by Mondays. This is somehow expected if we hypothesise people do not work on Sundays, and in many countries in Europe (specially in smaller cities) shops are closed that day. People are terrified of spending a whole day without buying something, so they buy things online. However, the minimum activity found on Tuesdays is harder to explain (again, comments section are open). The rest of the week shows a more stable daily activity of circa 150K to 180k purchases/day.

<div id="attachment_387" style="width: 1010px" class="wp-caption aligncenter">
  <img class="wp-image-387 size-full" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/day_of_week.png" alt="day_of_week" width="1000" height="600" />
  
  <p class="wp-caption-text">
    Site activity, day histogram
  </p>
</div>

*Let&#8217;s now take a look at the data on an hourly basis*, which also shows some interesting trends. The figure below shows a histogram of purchases and clicks on an hourly basis for all the data. Of course, when people are sleeping they do not buy things (not yet). However, **as the sun rises, the activity does too, reaching a peak of activity of both sales and purchases at 9am, presumably when people arrive to work.** **Later again the activity increases after lunch and reaches the daily maximum value at 20h, just after european time for dinner.**

<div id="attachment_388" style="width: 1010px" class="wp-caption aligncenter">
  <img class="wp-image-388 size-full" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/hour.png" alt="hour" width="1000" height="600" />
  
  <p class="wp-caption-text">
    Site activity, hour histogram
  </p>
</div>

Of course, online activity and traffic is domain dependent, and @alansaid was kind enough to point me to a paper that contains the graph shown below. It was published as part of the [News Recommender Systems Challenge in RecSys&#8217;13][3]. Here, the average number of impressions received (a metric correlated to the number of articles being read) shows a different pattern. **If we take a look at the yellow and orange line (both coming from newspapers) the peak reaches at around lunchtime. **Thus, people start the day buying or browsing for a while, work until lunch time, and when they are back from lunch, they read the newspaper before starting again.

<div id="attachment_396" style="width: 710px" class="wp-caption aligncenter">
  <img class="wp-image-396 size-large" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/Screen-Shot-2015-01-09-at-13.57.59-1024x686.png" alt="Avg impressions per hour (per publisher)" width="700" height="469" />
  
  <p class="wp-caption-text">
    Average number of impressions histogram, on an hourly basis. Figure taken from the paper: Said, A., Lin, J., Bellogín, A., & de Vries, A. (2013, November). A month in the life of a production news recommender system. In Proceedings of the 2013 workshop on Living labs for information retrieval evaluation (pp. 7-10). ACM.
  </p>
</div>

I hope some of you are familiar with the [Recsys&#8217;14 challenge][4], it used the [MovieTweetings][5] dataset which contains information about users tweeting ratings for IMDB movies. Again, I got the figures for the hourly activity to show the full picture of activities in different challenges in the RecSys conferences through the years.  The figure below shows that **people tend to post these tweets about movies late night, that is when most of people have time to watch movies I guess**. However, the activity at 5h is very similar than 16h (good question would be if the data shows local time or UTC time?)

<div id="attachment_401" style="width: 570px" class="wp-caption aligncenter">
  <img class="wp-image-401 size-full" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/tweets-imdb.png" alt="tweets-imdb" width="560" height="420" />
  
  <p class="wp-caption-text">
    Activity histogram from the MovieTweetings dataset, hourly based
  </p>
</div>

<h2 style="text-align: center;">
  Side note!, this data tells us that people wake up, buy things, work, read the news paper, go home,  buy things and watch movies, only to wake up, buy things, work, read the news papers, go home, buy more things and watch movies&#8230;
</h2>

Going back to this year&#8217;s challenge, We know that, days and hours are not independent. An average person&#8217;s schedule on Monday is not the same as Saturday and Sunday, as ur weeks are usually divided into weeks and weekends ([unless you are a PhD student][6]). The graphs below show the histogram of activity in the site where a week is divided into 169 slots of length 1 hour (horizontal axis). Once the data is analysed like in this way, further trends seem to arise.

<div id="attachment_399" style="width: 1272px" class="wp-caption aligncenter">
  <img class="wp-image-399 size-full" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/168hours_pattern.png" alt="168hours_pattern" width="1262" height="600" />
  
  <p class="wp-caption-text">
    Site activity, weekly histogram (divided by hours)
  </p>
</div>

**The most interesting pattern seen here, besides the fact that people wake up later on weekends, is how the conversion rate (number purchases per clicks) varies with time.** Not surprisingly, the highest conversion rates are found in Saturday and Sunday, which tells us that people have more free time on weekends, and are more free (or bored) to make decisions or buy things, tons and tons of things. Again, Tuesdays seem odd, very little browsing, and even less purchasing.

<div id="attachment_398" style="width: 934px" class="wp-caption aligncenter">
  <img class="wp-image-398 size-full" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/buysperclick.png" alt="buysperclick" width="924" height="420" />
  
  <p class="wp-caption-text">
    Site conversion rate, weekly histogram (divided by hours)
  </p>
</div>

This is the end of the second entry. Hope to publish a third entry soon with more insights on the data that will help me build a model. I would like to thank the members of the  [recommender systems team][7] in the [Insight Centre for Data Analytics][8] for their discussions on this topic.

 [1]: http://aloneindecember.com/words/recsys-challenge-part-i/
 [2]: http://insight-centre.org/content/recommender-systems
 [3]: http://recsys.acm.org/recsys13/nrs/
 [4]: http://recsys.acm.org/recsys14/challenge-workshop/
 [5]: https://github.com/sidooms/MovieTweetings
 [6]: http://www.phdcomics.com/comics/archive.php?comicid=453
 [7]: https://www.insight-centre.org/about/team
 [8]: https://www.insight-centre.org/