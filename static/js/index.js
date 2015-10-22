var Blog = React.createClass({
	loadEntries: function() {
    $.ajax({
      url: "/blog/api/entries",
      dataType: 'json',
      success: function(data) {
        this.setState({ entries: data });
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    }); 		
	},
	getInitialState: function() {
		return {
			entries: []
		}
	}, 
	componentDidMount: function() {
		this.loadEntries();
	},
	render: function() {
		var entries = this.state.entries.map(function(entry) {
			return (
				<div className="entry">
					<a href={"/blog/entries/" + entry.id} className="entry-title">{entry.title}</a>
					<div className="entry-metadata">
						{moment(entry.created_date).fromNow()} &bull; {entry.num_comments} comment{entry.num_comments == 1 ? "" : "s"} 
					</div>
					<div className="entry-text">{entry.text}</div>
				</div>
			);
		});	
		return (
			<div>{entries}</div>
		);
	}
});

$(document).ready(function() {
  React.render(
    <Blog />, $("#entries")[0]
  );
});