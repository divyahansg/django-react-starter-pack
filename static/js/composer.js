$(document).ready(function() {
  $("#submit-entry").click(function(e) {
    var csrf = $('meta[name=csrf]').attr("content");
    var title = $("#input-entry-title").val();
    var text = $("#input-entry-text").val();
    var data = {"title": title, "text": text};
    $.ajax({
      url: "/blog/api/entries/add",
      dataType: 'json',
      type: "POST",
      headers: {
        'X-CSRFToken': csrf
      },
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(data) {
        $("#input-entry-title").val("");
        $("#input-entry-text").val("");
        alert("Success!");
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });    
  });
});