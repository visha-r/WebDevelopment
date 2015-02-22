<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />

    <title>Visha's Home Page</title>

    <link rel="stylesheet" href="MainStyle.css" />
    <script type="text/javascript"
        src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

    <script type="text/javascript" src="../../javascript/window_size_tracker.js"></script>

</head>

<body>

    <div class="pad">

        <form id="form1" runat="server">

            <div>

                <ul class="master_navigation">
                    <li><span class="menu_link"><a href="sitestatistics/" target="_blank">SiteStatistics</a></span></li>
                    <li><a href="statistics/" target="_blank">Statistics</a></li>
                    <li><a href="source/" target="_blank">Source</a></li>
                    <li><a href="search/" target="_blank">Search</a></li>
                    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                    <li><a href="textview/" target="_blank">TextView</a></li>
                    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                    <li><a href="blog/" target="_blank">Blog</a></li>
                </ul>

                <hr />


                <div id="content">
                    <img class="mypic" src="images/my_pics/visha_img1.jpg" />
                    <div id="texts">
                        Hi!!! Thanks for visiting my page!! I am Vishalakshy
				Rajaram Chettiar. People who know me call me Visha. I am a Computer
				Science graduate student at Northeastern University. I created this
				web page as part of my web development course CS5610. Having worked
				as a Software developer for more than 2 years, I have yearning
				interest towards learning new technologies. I am very excited about
				this course as I am going to experiment with a number of cutting-edge
				technologies like AngularJS, Node.js, MongoDB, CSS3, HTML5, jQuery
				etc....
                    </div>
                </div>

                <hr />
                <div class="button_links">
                    <table>
                        <tr>
                            <td>
                                <div class="buttons button1"><a href="story/index.htm?../experiments/story.txt" target="_blank" class="round green">Experiments<span class="round">Ready to see all my experiments?</span></a></div>
                            </td>
                            <td>
                                <div class="buttons button2"><a href="project/projectHome.html" class="round red">Project<span class="round">Take a look at my project. You will really like it!!</span></a></div>
                            </td>
                            <td>
                                <div class="buttons button3"><a href="#" class="round yellow">Documentation<span class="round">Complete details about the project</span></a></div>
                            </td>
                        </tr>
                    </table>
                </div>
                <p id="contacts">
                    <a href="mailto:rajaramchettiar.v@husky.neu.edu">
                        <img class="contact" src="images/my_pics/contact1.jpg" />
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="http://www.linkedin.com/in/vishalakshyrajaramchettiar">
                        <img class="contact" src="images/my_pics/linkedin.jpg" />
                    </a>
                    <a href="https://github.com/visha-r/WebDevelopment">
                        <img class="github" src="images/my_pics/github.jpeg" />
                    </a>
                </p>
            </div>

        </form>

    </div>

</body>
</html>
