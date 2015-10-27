---
title: 'recsys challenge : part III'
author: aloneindecember
layout: post
permalink: /recsys-challenge-part-iii/
categories:
  - Uncategorized
---
In the last two posts about the recsys challenge  ([part][1] I and [part II][2]) I have discussed in detail some aspects of this year&#8217;s challenge data. This time I present an analysis of the data from the point of view of categories and the role they play in clicks, sessions and buys.

<h2 style="text-align: center;">
  Users seem to find items searching for brands,categories, or pushed by sales in the platform!
</h2>

[First things firsts][3], we have 52K items distributed in 339 categories. However, clicks are not equally distributed across these categories, and nor are the items. As we expect, both follow a [long tail][4] distribution.

Let&#8217;s take a closer look at items and clicks. *Which category gets the most number of clicks? What categories gets a higher number of purchases?*  The figure below shows the distribution of clicks across categories. The horizontal axis shows all the categories in the dataset (sorted by number of clicks)  and the vertical axis shows the number of clicks per each category in a logarithmic scale. Thus, we know that there are a very limited number of categories that get most of the clicks (around 50), while the remainder 250 or so get a very limited number of clicks.  Worth mentioning that the decay of the distribution is very steep, like the Cliffs of Moher (as seen in my [visual diary][5])

<div id="attachment_427" style="width: 710px" class="wp-caption aligncenter">
  <a href="http://aloneindecember.com/words/wp-content/uploads/2015/02/cat_pop_clicks.png"><img class="size-large wp-image-427" src="http://aloneindecember.com/words/wp-content/uploads/2015/02/cat_pop_clicks-1024x613.png" alt="The distribution of categories across clicks follows a long tail distribution" width="700" height="419" /></a>
  
  <p class="wp-caption-text">
    The distribution of categories across clicks follows a long tail distribution
  </p>
</div>

Let&#8217;s take a closer look at the distribution. The figure below focuses on the top 10 categories, sorted by number of clicks. Together, all the items from the category &#8216;0&#8217; where clicked 16337653 times, which is 155 times more clicks than for category &#8216;9&#8217;, in which users clicked 105282 times. In fact, the first 10 categories shown below account for 99% of all clicks in the dataset. Leaving the remainder 299 categories with only 1% of the clicks, very uninteresting items seems to be &#8230;

Besides the distribution, something that strikes me is why is there an <span style="color: #ff99cc;"><em><strong>&#8216;S&#8217;</strong></em></span> category, when all the other categories are encoded with numbers? Does it has an special meaning? Comments section is open if you have an answer or theory.

<div id="attachment_432" style="width: 710px" class="wp-caption aligncenter">
  <a href="http://aloneindecember.com/words/wp-content/uploads/2015/02/cat_pop_clicks_top2.png"><img class="wp-image-432 size-large" src="http://aloneindecember.com/words/wp-content/uploads/2015/02/cat_pop_clicks_top2-1024x613.png" alt="cat_pop_clicks_top" width="700" height="419" /></a>
  
  <p class="wp-caption-text">
    Distribution of clicks for the top 10 most clicked categories
  </p>
</div>

Now we can compare the graph above  with the one below, obtained from [Walker Sands’ 2014 future of retail study][6].We could asume, or figure out that the categories are also organised as below. Dreaming or imagining is free, so why not? Anyway, that doesn’t tells much. If we knew what type of categories get more buys and that was different to the clicks they get, that would be intresting, right? **#moredataplease **

<div id="attachment_440" style="width: 310px" class="wp-caption aligncenter">
  <a href="http://aloneindecember.com/words/wp-content/uploads/2015/02/Screen-Shot-2015-02-01-at-17.32.01.png"><img class="wp-image-440 size-medium" src="http://aloneindecember.com/words/wp-content/uploads/2015/02/Screen-Shot-2015-02-01-at-17.32.01-300x214.png" alt="The categories of products most bought online" width="300" height="214" /></a>
  
  <p class="wp-caption-text">
    The categories of products most bought online
  </p>
</div>

I know have more questions than when I started. For example,* is the distribution of categories across items the same as across clicks? Do categories get more clicks because those categories have more items?* **NO!**

The graph below shows the top 10 categories sorted by number of items. The vertical axis shows each category with it&#8217;s id, sorted by the category size, while the vertical item represents the number of items in a logarithmic scale.  We see some of the categories from the graph above, while some new categories come in, showing that not all the categories with a large number of items necessarily get a large number of clicks.

<div id="attachment_434" style="width: 710px" class="wp-caption aligncenter">
  <a href="http://aloneindecember.com/words/wp-content/uploads/2015/02/cat_items1.png"><img class="size-large wp-image-434" src="http://aloneindecember.com/words/wp-content/uploads/2015/02/cat_items1-1024x613.png" alt="Distribution of categories across items" width="700" height="419" /></a>
  
  <p class="wp-caption-text">
    Distribution of categories across items
  </p>
</div>

So far so good, all pretty boring until here &#8230; except for the magic &#8220;S&#8221; and the category &#8220;0&#8221;. The way the data is presented, we could assume that each item belongs to only one category. However, the figure below shows that this is not the case. Some items appear in our click data with more than one category in different transactions, now that is something I didn&#8217;t expect&#8230;

<div id="attachment_437" style="width: 710px" class="wp-caption aligncenter">
  <a href="http://aloneindecember.com/words/wp-content/uploads/2015/02/correlation2.png"><img class="wp-image-437 size-large" src="http://aloneindecember.com/words/wp-content/uploads/2015/02/correlation2-1024x613.png" alt="correlation" width="700" height="419" /></a>
  
  <p class="wp-caption-text">
    Correlation between categories
  </p>
</div>

The figure above shows the number of shared items among the biggest categories (transformed by a logarithm for better visualisation). The first thing we see is that the category &#8216;0&#8217; is highly correlated to all the other ones, the same goes for category &#8216;S&#8217;. My assumption here is that those categories are used as &#8216;*default*&#8216; or &#8216;*none*&#8216;, and at some point they are replaced by a better indicator of the category, or simply those are categories which apply to almost every item.  Either ways, it is something to bare in mind when building the models to predict purchases

We can see from the graph above that category &#8216;0&#8217; is highly correlated to most of the other top 10 cateories. But that is not the case for most of them (except &#8216;S&#8217; which is also correlated to most of the others). My assumption is that category 0 just means no category, and category S means something similar . However, we know that the data is dynamic, so the products might be unlabeled and then labeled, or mislabeled, and then unlabeled … the magic of real world data?

Finally, we can analyse the categories and sessions together, with the hope to find more answers, and even more questions. *Do people tend to click in many categories, do they browse mostly in one category?* The graph below shows that users tend to browse within one category.

<div id="attachment_439" style="width: 710px" class="wp-caption aligncenter">
  <a href="http://aloneindecember.com/words/wp-content/uploads/2015/02/cat_sessions.png"><img class="wp-image-439 size-large" src="http://aloneindecember.com/words/wp-content/uploads/2015/02/cat_sessions-1024x613.png" alt="cat_sessions" width="700" height="419" /></a>
  
  <p class="wp-caption-text">
    In a typical session, the user browses though only one or two categories
  </p>
</div>

&nbsp;

This is the typical scenario, where you are looking to buy the latest Lena Dunham book, [I’m not that kind of girl][7] (highly recommendable one by the way) and you get lost browsing though thousands of similar books such as Tavi Gevison’s [Rookie yearbook][8]. However, in the same session you wouldn’t probably search for a [Banana slicer][9] (a very popular and mediocre item in amazon with hilarious reviews)

**As you might have figured out already, I don&#8217;t answer all the questions I propose.** Some of them will be left for future posts, some of them are food for thought. Download the data, do the analysis and share it!  Finally,  I would like to thank the members of the  [recommender systems team][10] in the [Insight Centre for Data Analytics][11] for their discussions on this topic. Some of the figures here were first shown to me by them.

 [1]: http://aloneindecember.com/words/recsys-challenge-part-i/
 [2]: http://aloneindecember.com/words/recsys-challenge-part-ii/
 [3]: https://www.youtube.com/watch?v=gWcYOz2fpMk
 [4]: http://www.longtail.com/about.html
 [5]: http://diary.aloneindecember.com/post/91981935551
 [6]: http://www.walkersands.com/futureofretail
 [7]: http://www.amazon.co.uk/Not-That-Kind-Girl-Learned/dp/0008101264/ref=sr_1_1?ie=UTF8&qid=1422988023&sr=8-1&keywords=lenna+dunham
 [8]: http://www.amazon.co.uk/s/ref=a9_sc_1?rh=i%3Aaps%2Ck%3Arookie+yearbook&keywords=rookie+yearbook&ie=UTF8&qid=1422988039
 [9]: http://www.amazon.co.uk/Kitchen-Craft-KCBANSLICE-Banana-Slicer/dp/B003CLFC98/ref=sr_1_1?ie=UTF8&qid=1422988086&sr=8-1&keywords=banana+slicer
 [10]: https://www.insight-centre.org/about/team
 [11]: https://www.insight-centre.org