// App.js handles the functionality of various components within the site, without reloading
// the web page (jQuery - client side)
$(() => {
  // 
  $(function () {
    //comment social button
    let $buttons = $("div.resource").children(".comment-container").children("form.submitContent").children("button.btn.btn-primary.commentFeed");
    //post new comment button
    let $commentForm = $("div.resource").children("div.comment-container").children("form.submitContent");
    //comment container
    let $commentSection = $("div.resource").children("div.comment-container");
    //comment input field
    let $commentInput = $("div.resource").children("div.comment-container").children("form.submitContent").children(".commentInput");

    $buttons.click((event) => {
      // event.preventDefault();
      // console.log("Comment toggle button clicked!");
      $commentSection.slideToggle();
      // $commentInput.slideToggle();
      $commentInput.focus();
    })

    // function createResource (resource){
    //   var $allResources = $("<div>").addClass("all-resources");
    //   var $resource = $("<div>").addClass("resource").appendTo($allResources);
    //   var $img = $("<img>").addClass("card-img-top").attr("src", "`${resource.imageURL}`").appendTo($resource);
    //   var $title = $("<h3>").text("`${resource.title}` - <a href='`${resource.resourceURL}`'>Source</a></h3>").appendTo($resource);
    //   var $description = $("<p>").text("`$(resource.description}`").appendTo($resource);
    //   var $footer = $("<footer>").appendTo($resource);
    //   var $rateButton = $("<button>").addClass("btn btn-primary").text("Rate").appendTo($footer);
    //   var $likeButton = $("<button>").addClass("btn btn-primary").text("Like").appendTo($footer);
    //   var $commentButton = $("<button>").addClass("btn btn-primary commentFeed").text("Comment").appendTo($footer);
    // }

   
    $.ajax({
      method: "GET",
      url: "api/users"
    }).done((resources) => {
      for(resource of resources) {
        // COPIES STRUCTURE FROM _feed.ejs
        let $newElement = $(`
          <div class="all-resources">
            <div class="resource">
              <img class="card-img-top" src='${resource.imageURL}'>
              <h3>${resource.title} - <a href="${resource.resourceURL}">Source</a></h3>
              <p>
                ${resource.description}
              </p>
              <footer>
                <button class="btn btn-primary">Rate</button>
                <button class="btn btn-primary">Like</button>
                <button class="btn btn-primary commentFeed">Comment</button>
              </footer>
              <div class="comment-container">
              </div>
              <div style="clear: both;">
              </div>
            </div>
          </div>
        `).prependTo($("section.feed"));
          // const $commentFeedToggle = $newElement.find(".commentFeed");
          // console.log("<a class='btn btn-primary commentFeed'>Comment</a> :  ====> ", $commentFeedToggle);
        }
      // makeNewEventHandlers(); // might not need
      });

    // handles the posting of new comments

   function createComment (comment) {
        var $container = $("<div>").addClass("comment-container");
        var $comment = $("<div>").addClass("comment").appendTo($container);
        var $header = $("<header>").appendTo($comment);
        var $userName = $("<h4>").addClass("username").text("`${eachComment.userId}`").appendTo($header);
        var $content = $("<p>").text(`${eachComment.newComment}`).appendTo($comment);
        var $footer = $("<footer>").appendTo($comment);
        var $span = $("<span>").addClass("timestamp").text("19 seconds ago").appendTo($footer);
        
      }



    $commentForm.click((event) => {
      event.preventDefault();
      $commentSection.slideToggle();
      console.log("Button Clicked!");
      $.ajax({
        method: "POST",
        url: "api/users"
      }).done((comments) => {
        for(eachComment of comments){
          // COPIES STRUCTURE FROM _comments.ejs
          let $newComment = $(`
            <div class="comment">
              <form class="submitComment" method="POST" action="/api/users/comment">
                <textarea class="commentInput" type="text" name="commentInput" placeholder="Type your comment..."></textarea>
                <input class="commentPost" type="submit" value="Post">
              </form>
            </div>
            <div class="postArea">
              <header>
                <h4 class="username">${eachComment.userId}</h4>
              </header>
              <p>
                ${eachComment.newComment}
              </p>
              <footer>
                <span class="timestamp">
                  19 seconds ago
                </span>
              </footer>
            </div>
          `).appendTo("div.commentContainer");
        }
      })
    })
  });

    // Handles the naming of the category titles
  function renameCategory() {
    let extension = window.location.pathname.split('/');
    for (let i in extension){
      extension[i] = extension[i].charAt(0).toUpperCase() + extension[i].slice(1);
    }
    $('.display-4').text(extension.join(" "));
  };

    // Highlights the selected page as blue on the sidebar
    // Changes the header for each category by calling on renameCategory
  $(function() {
    var url = document.location.href;
    $('.list-group form').each(function() {
      if (url === this.action + "?") {
        $(this).children('button.list-group-item').addClass("active");
        renameCategory();
        $(this).children('button.list-group-item').addClass("active");
      }
    });
  });
});


//   $.ajax({
//     method: "GET",
//     url: "api/users"
//   }).done((users) => {
//     for(user of users) {
//       console.log("!!!!!!!!! user = ", user)
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
