import { Link } from '@reach/router';
import moment from 'moment';
import { Component } from 'react';
import { fetchArticles } from '../api';

class ArticlesList extends Component {
  state = {
    articles: [],
  };
  
  componentDidMount() {
    const { topic } = this.props;
    this.getArticles(topic);
  };

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    console.log(topic)
    if (topic !== prevProps.topic) {
      this.getArticles(topic);   
    };
  };

  getArticles = (topic) => {
    fetchArticles(topic).then((articles) => {
        this.setState({ articles });
      });
  }

  render () {
    const { articles } = this.state;
    return (
      <main className="articles-list">
        {articles.map(({ article_id, title, author, topic, created_at }) => {
          return (
            <section key={article_id}> 
              <div className="articles-content">
                <Link to={`/articles/${article_id}`}>
                  <h2>{title}</h2>
                </Link>  
                <h3> by {author}</h3>
              </div>
              <span className="articles-topic">{topic}</span>
              <span className="articles-date">{moment(created_at).utcOffset(0).format("LLLL")}</span>
            </section>
          )
        })
        }
      </main>
    )
  }

};

export default ArticlesList;