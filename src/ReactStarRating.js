

var Rating = React.createClass({

    getInitialState: function () {
        return {rating: 0};
    },
    createData: function (object) {
        var self = this;
        var data = [];
        for (var i = 0; i < 5; i++) {
            var checked = object.rating > i ? 'checked' : "";
            var starData = {value: i, checked: checked};
            data.push(starData);
        }

    },
    handleLoadData: function(){
        var self = this;
        $.get(
            self.props.getLink,
            {data: self.props.ratingId},
            function (result) {
                self.setState({rating: result.rating});
            }
        );
    },
    componentDidMount: function () {
        var self = this;
        self.handleLoadData();
    },
    handleChange: function (index) {
        var self = this;
        var rating = index;
        var data = {rating: rating, id: self.props.ratingId};
        self.setState({rating: rating});
        $.post(
            this.props.setLink,
            {data: data}
        );
    },
    render: function () {
        var self = this;
        var stars = [];
        for (var i = 1; i <= 5; i++) {
            if(i <= self.state.rating){
                stars.push(<span className='star' onClick={ self.handleChange.bind(self, i)}>★</span>);
            }else {
                stars.push(<span className='star' onClick={ self.handleChange.bind(self, i)}>☆</span>);
            }
        }
        return (
            <div className="rating-area">
                {stars}
            </div>
        );
    }
});

React.render(
    <Rating ratingId={1}  getLink={handleGetNamesLink} setLink={handleChangeRating} />,
    document.getElementById('component-container')
);