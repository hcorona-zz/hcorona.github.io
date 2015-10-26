---
title: 'recsys challenge: part I'
author: aloneindecember
layout: post
permalink: /recsys-challenge-part-i/
categories:
  - Uncategorized
---
[RecSys’15][1] is ready to roll! We have a date, a venue, a call for papers, and, of course, a challenge. Last November, the details for this year&#8217;s RecSys challenge were announced, and the leaderboards are already getting submissions (more info in the [RecSys&#8217;15 website][2] and the [challenge website][3])

The german company [Yoochoose][4], which provides recommendations for e-commerce platforms, news and media, sponsors the competition. They give us a dataset of completely anonimized (unless otherwise proven) implicit feedback data coming from an e-commerce business located in Europe. The business sells all kind of stuff such as garden tools, toys, clothes, electronics and much more.

<h3 style="text-align: center;">
  <strong>33 MILLION CLICKS</strong><br /> <strong>1.1 MILLION BUYS</strong><br /> <strong>9 MILLION SESSIONS (USERS)</strong><br /> <strong>53K ITEMS</strong>
</h3>

The data represents six months worth of clicks grouped in sessions, from April 1st to September 30th. For some of the sessions (around 5%), there are also buying events, which is the interesting part, as the goal of this challenge is to predict whether the user (a session) is going to buy something or not, and if she is actually buying, what are the items bought. At this point it is important to note that user and sessions are equivalent in this problem. Since the data is anonymised, the terms session and users are interchangeable in this post.

**The problem can be defined in the following way: Given a sequence of click events (recorded in a user session on the e-commerce website)**

  * **Is the user going to buy items in this session?**
  * **If the user buys, what are the items that are going to be bought?**

I have already introduced the problem, now it is time to analyze the data. I will not go into detail about the data representation, as it is very well described in the competition website ([under challenge][5]). The data is presented in two files, one for clicks and another one for buys. However, in this analysis I present the clicks and buy from the same session together, to get a better sense of the problem.

<table class="MsoTableGrid" style="border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;" border="1" cellspacing="0" cellpadding="0">
  <tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes;">
    <td style="width: 140.1pt; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="140">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <b style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; font-family: Helvetica;"> </span></b>
      </p>
    </td>
    
    <td style="width: 70.85pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="71">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <b style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; font-family: Helvetica;">AVERAGE</span></b>
      </p>
    </td>
    
    <td style="width: 108.4pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="108">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <b style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; font-family: Helvetica;">MEDIAN</span></b>
      </p>
    </td>
    
    <td style="width: 106.45pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="106">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <b style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; font-family: Helvetica;">STD</span></b>
      </p>
    </td>
  </tr>
  
  <tr style="mso-yfti-irow: 1;">
    <td style="width: 140.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="140">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <b style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; font-family: Helvetica;">SESSION LENGTH<br /> (EVENTS)</span></b>
      </p>
    </td>
    
    <td style="width: 70.85pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="71">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">3.693</span>
      </p>
    </td>
    
    <td style="width: 108.4pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="108">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">2.0</span>
      </p>
    </td>
    
    <td style="width: 106.45pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="106">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">4.04</span>
      </p>
      
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;"> </span>
      </p>
    </td>
  </tr>
  
  <tr style="mso-yfti-irow: 2;">
    <td style="width: 140.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="140">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <b style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; font-family: Helvetica;">SESSSION LENGTH<br /> (<strong>EVENTS</strong>)</span></b>
      </p>
    </td>
    
    <td style="width: 70.85pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="71">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">404.428</span>
      </p>
    </td>
    
    <td style="width: 108.4pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="108">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">134.0</span>
      </p>
    </td>
    
    <td style="width: 106.45pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="106">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">782.123</span>
      </p>
    </td>
  </tr>
  
  <tr style="mso-yfti-irow: 3;">
    <td style="width: 140.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="140">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <b style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; font-family: Helvetica;">CLICKS PER ITEM</span></b>
      </p>
    </td>
    
    <td style="width: 70.85pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="71">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">625.79</span>
      </p>
    </td>
    
    <td style="width: 108.4pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="108">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">22.0</span>
      </p>
    </td>
    
    <td style="width: 106.45pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="106">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">2810.05</span>
      </p>
    </td>
  </tr>
  
  <tr style="mso-yfti-irow: 4; mso-yfti-lastrow: yes;">
    <td style="width: 140.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="140">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <b style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; font-family: Helvetica;">PURCHASES PER<br /> SESSION</span></b>
      </p>
    </td>
    
    <td style="width: 70.85pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="71">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">0.124</span>
      </p>
    </td>
    
    <td style="width: 108.4pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="108">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">0.0</span>
      </p>
    </td>
    
    <td style="width: 106.45pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="106">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; mso-pagination: none; tab-stops: 28.0pt 56.0pt 84.0pt 112.0pt 140.0pt 168.0pt 196.0pt 224.0pt 252.0pt 280.0pt 308.0pt 336.0pt; mso-layout-grid-align: none; text-autospace: none;" align="center">
        <span style="font-size: 11.0pt; font-family: Helvetica;">0.687</span>
      </p>
    </td>
  </tr>
</table>

<p style="text-align: left;">
  The table above shows a large deviation (from the mean) in the number of clicks that an item receives. We further investigate this by plotting the item popularity distribution in the figure below. This figure shows the distribution of clicks across items. The horizontal axis represents each of the items (plotted in a logarithmic scale), while the vertical axis represents the number of clicks that particular item received (also plotted in a logarithmic scale).
</p>

<p style="text-align: left;">
  Thus, we have the classical scenario of the long tail, where a small subset of items get many clicks (they are very popular), while most of the items in the catalog get a very small number of clicks. In this dataset, 10% of the items (the 5200 most popular) get circa 90% of the clicks, while the remaining 90% of items only get 10% of the clicks.
</p>

<div id="attachment_351" style="width: 710px" class="wp-caption aligncenter">
  <a href="http://aloneindecember.com/words/wp-content/uploads/2015/01/image001.png"><img class="size-large wp-image-351" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/image001-1024x796.png" alt="figure 1 caption" width="700" height="544" /></a>
  
  <p class="wp-caption-text">
    Item popularity distribution
  </p>
</div>

Now let’s move on to session length, in the first effort to understand all the aspects of a session, as it is our main information source. We can measure session length in terms of number of clicks or time duration (for example, in seconds).

From the table above we know that the average session length is 2.69 clicks and lasts around 6.7 minutes (404.42 seconds). However, the deviation from the mean in both metrics is very large. Thus, we will find very short sessions and very long sessions, of up to 68 hours (session id:  10145339 ) and 261 clicks (session id: 6149111).

The figures below show the histogram of session lengths in time and clicks. The horizontal axis represents the length (seconds or clicks), while the vertical axis represents the number of sessions with that particular length in a logarithmic scale.

From the information in the graphs, we know that 51% of the sessions have less than three clicks. Thus, sessions tend to be short (90% of the sessions have less than 8 clicks), and there are only a  few longer sessions, of up to 200 clicks.  We see similar patterns in the case of session length distribution calculated by clicks. Something expected, as clicks and time must be  highly correlated (*humans can only click and browse at a certain speed, right?*)[<img class="aligncenter wp-image-484 size-large" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/Screen-Shot-2015-04-01-at-11.42.15-1024x828.png" alt="Screen Shot 2015-04-01 at 11.42.15" width="700" height="566" />][6]

<div id="attachment_353" style="width: 710px" class="wp-caption aligncenter">
  <img class="wp-image-353 size-large" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/image003-1024x741.png" alt="image003" width="700" height="507" />
  
  <p class="wp-caption-text">
    Session length distribution (measured in time)
  </p>
</div>

Finally, it is very interesting to know if the number of times a user clicks (or the time a user spends browsing) is correlated with a higher probability of purchasing an item (do not mistake for number of items bought, that is a different story!)

There is a clear trend showing that longer sessions have, on average, more shopping transactions. However, this is true up to around 40 clicks, and after that the number of sessions available is very small. (We don&#8217;t have many sessions with more than 40 clicks &#8211; only around 10000 to be exact)

<div id="attachment_357" style="width: 710px" class="wp-caption aligncenter">
  <img class="wp-image-357 size-large" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/image007-1024x743.png" alt="image007" width="700" height="508" />
  
  <p class="wp-caption-text">
    Session length distribution
  </p>
</div>

On a final note! When I wanted to analyse the prizes of items bought, we found out that around 53% of the transactions have no associated prize (or quantity of items bought). When doing some search to understand this, I saw the following message from @abellogin (picture below). It turns out that data is simply missing!

<div id="attachment_359" style="width: 427px" class="wp-caption aligncenter">
  <img class="wp-image-359 size-full" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/image010.png" alt="image010" width="417" height="314" />
  
  <p class="wp-caption-text">
    Something weird in the data &#8230;
  </p>
</div>

[<img class="aligncenter size-full wp-image-360" src="http://aloneindecember.com/words/wp-content/uploads/2015/01/image011.png" alt="image011" width="565" height="263" />][7]

Hi, I am [Humberto Corona][8] and I write this blog! Since October 2014, I am a PhD student at the Insight Centre for Data Analytics in UCD.  I would like to thank the members of the  [recommender systems team][9] in the [Insight Centre for Data Analytics][10] for their discussions on this topic.

 [1]: http://recsys.acm.org/recsys15/
 [2]: http://recsys.acm.org/recsys15/challenge/
 [3]: http://2015.recsyschallenge.com
 [4]: http://www.yoochoose.com/en/
 [5]: http://2015.recsyschallenge.com/challenge.html
 [6]: http://aloneindecember.com/words/wp-content/uploads/2015/01/Screen-Shot-2015-04-01-at-11.42.15.png
 [7]: http://aloneindecember.com/words/wp-content/uploads/2015/01/image011.png
 [8]: https://www.insight-centre.org/users/humberto-corona
 [9]: https://www.insight-centre.org/about/team
 [10]: https://www.insight-centre.org