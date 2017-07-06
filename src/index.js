import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'

const API_KEY = "AIzaSyCJUFYTlIu4WqKMuFpNgEXp7XhuozsfMdQ";



// Create new component, This comp should produce some HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('van halen');
    }

    videoSearch(term) {
         YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })} />
            </div>
        );
    }

}

// Take this components's generated HTML and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));