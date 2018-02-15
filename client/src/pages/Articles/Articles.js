import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Panel from "../../components/Panel";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import axios from "axios";

class Articles extends Component {
  state = {
    authKey: "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
    articles: [],
    search: "",
    records: {value: "5"},
    start: "",
    end: "",
    queryURLBase: "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=",
    articleCounter: 0
  };

  componentDidMount() {
    this.loadArticles();
  }

  runQuery = (numArticles, queryURL) => {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"
  console.log(queryURL);
  axios.get({
    url: queryURL,
    method: "GET"
  }).then(function(NYTData) {

    // Logging the URL so we have access to it for troubleshooting
    console.log("------------------------------------");
    console.log("URL: " + queryURL);
    console.log("------------------------------------");

    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");

    // Loop through and provide the correct number of articles
    // for (var i = 0; i < numArticles; i++) {

    //   // Add to the Article Counter (to make sure we show the right number)
    //   this.setState({articleCounter: this.state.articleCounter + 1});

    //   // Create the HTML well (section) and add the article content for each
    //   var wellSection = $("<div>");
    //   wellSection.addClass("well");
    //   wellSection.attr("id", "article-well-" + this.state.articleCounter);
    //   $("#well-section").append(wellSection);

    //   // Confirm that the specific JSON for the article isn't missing any details
    //   // If the article has a headline include the headline in the HTML
    //   if (NYTData.response.docs[i].headline !== "null") {
    //     $("#article-well-" + this.state.articleCounter)
    //       .append(
    //         "<h3 class='articleHeadline'><span class='label label-primary'>" +
    //         this.state.articleCounter + "</span><strong> " +
    //         NYTData.response.docs[i].headline.main + "</strong></h3>"
    //       );

    //     // Log the first article's headline to console
    //     console.log(NYTData.response.docs[i].headline.main);
    //   }

    //   // If the article has a byline include the headline in the HTML
    //   if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
    //     $("#article-well-" + this.state.articleCounter)
    //       .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

    //     // Log the first article's Author to console.
    //     console.log(NYTData.response.docs[i].byline.original);
    //   }

    //   // Then display the remaining fields in the HTML (Section Name, Date, URL)
    //   $("#articleWell-" + this.state.articleCounter)
    //     .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
    //   $("#articleWell-" + this.state.articleCounter)
    //     .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
    //   $("#articleWell-" + this.state.articleCounter)
    //     .append(
    //       "<a href='" + NYTData.response.docs[i].web_url + "'>" +
    //       NYTData.response.docs[i].web_url + "</a>"
    //     );

    //   // Log the remaining fields to console as well
    //   console.log(NYTData.response.docs[i].pub_date);
    //   console.log(NYTData.response.docs[i].section_name);
    //   console.log(NYTData.response.docs[i].web_url);
    // }
  });

}

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, search: "", records: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search && this.state.records) {
      // API.saveArticle({
      //   search: this.state.search,
      //   records: this.state.records,
      //   synopsis: this.state.synopsis
      // })
      //   .then(res => this.loadArticles())
      //   .catch(err => console.log(err));
      // Grabbing text the user typed into the search input
      
      var searchURL = this.state.queryURLBase + this.state.search;
      console.log(searchURL, this.state.search);
      // If the user provides a startYear -- the startYear will be included in the queryURL
      if (parseInt(this.state.start)) {
        searchURL = searchURL + "&begin_date=" + this.state.start + "0101";
      }

      // If the user provides a startYear -- the endYear will be included in the queryURL
      if (parseInt(this.state.end)) {
        searchURL = searchURL + "&end_date=" +this.state.end + "0101";
      }

      // Then we will pass the final searchURL and the number of results to
      // include to the runQuery function
      this.runQuery(this.state.records, searchURL);
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 style={{ color: '#FFFFFF' }}>New York Times Search</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <Panel title="   Search Parameters">
              <form>
                <Input
                  value={this.state.search}
                  onChange={this.handleInputChange}
                  name="search"
                  placeholder="Title (required)"
                  label="Search Term:"
                />
                <Select
                  value={this.state.value}
                  onChange={this.handleInputChange}
                  name="records"
                  label="Number of Records to Retrieve:"
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </Select>
                <Input
                  value={this.state.start}
                  onChange={this.handleInputChange}
                  name="start"
                  placeholder="YYYY"
                  label="Start Year (optional):"
                />
                <Input
                  value={this.state.end}
                  onChange={this.handleInputChange}
                  name="end"
                  placeholder="YYYY"
                  label="End Year (optional):"
                />
                <FormBtn
                  disabled={!(this.state.records && this.state.search)}
                  onClick={this.handleFormSubmit}
                >
                  <i className="fa fa-trash"></i> Clear Results
                </FormBtn>
                <FormBtn
                  disabled={!(this.state.records && this.state.search)}
                  onClick={this.handleFormSubmit}
                >
                  <i className="fa fa-search"></i> Search
                </FormBtn>
              </form>
            </Panel>
          </Col>
          <Col size="md-6 sm-12">
            <Panel title="   Top Articles">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                      <Link to={"/articles/" + article._id}>
                        <strong>
                          {article.search} by {article.records}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
