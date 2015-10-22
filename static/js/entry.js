
var Entry = React.createClass({
	loadEntry: function(entry_id) {
    $.ajax({
      url: "/blog/api/entries/" + entry_id,
      dataType: 'json',
      success: function(data) {
        this.setState({ entry: data });
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    }); 		
	},
	getInitialState: function() {
		return {
			entry: null,
			comments: []
		}
	}, 
	componentDidMount: function() {
		var entry_id = $('meta[name=entry-id]').attr("content");
		this.loadEntry(entry_id);
	},
	render: function() {
		var entry = this.state.entry;
		var content;
		if(entry) {
			return (
				<div className="entry">
					<div className="entry-title">{entry.title}</div>
					<div className="entry-metadata">
						{moment(entry.created_date).fromNow()} &bull; {entry.num_comments} comment{entry.num_comments == 1 ? "" : "s"} 
					</div>
					<div className="entry-text">{entry.text}</div>
				</div>
			);
		} else {
			return (<div />);
		}
	}
});

var CommentList = React.createClass({
	addComment: function() {
    var csrf = $('meta[name=csrf]').attr("content");
		var entry_id = $('meta[name=entry-id]').attr("content");
		var name = $("#input-comment-name").val();
		var text = $("#input-comment-text").val();
		var data = {"name": name, "text": text};
    $.ajax({
      url: "/blog/api/entries/" + entry_id + "/comments/add",
      dataType: 'json',
      type: "POST",
      headers: {
        'X-CSRFToken': csrf
      },
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(data) {
        var comments = this.state.comments;
        comments.push(data);
        this.setState({ state: comments });
        $("#input-comment-name").val("");
        $("#input-comment-text").val("");
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    }); 	
	},
	loadComments: function() {
		var entry_id = $('meta[name=entry-id]').attr("content");
    $.ajax({
      url: "/blog/api/entries/" + entry_id + "/comments",
      dataType: 'json',
      success: function(data) {
        this.setState({ comments: data });
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    }); 		
	},
	getInitialState: function() {
		return {
			comments: []
		};
	},
	componentDidMount: function() {
		this.loadComments();
		$("#submit-comment").click(function(e) {
			this.addComment();	
		}.bind(this));
	},
	render: function() {
		var comments = this.state.comments.map(function(comment) {
			return (
				<div className="comment">
          <hr className="comment-hr" />
					<div className="comment-name">{comment.name}</div>
					<div className="comment-metadata">{moment(comment.created_date).fromNow()}</div>
					<div className="comment-text">{comment.text}</div>
				</div>
			);
		}); 	
		return (
			<div className="comment-list">
				{comments}
			</div>
		);
	}
});

$(document).ready(function() {
  React.render(
    <Entry />, $("#entry")[0]
  );
  React.render(
    <CommentList />, $("#comments")[0]
  );
});