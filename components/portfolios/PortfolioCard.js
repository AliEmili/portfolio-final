import React from "react";
import { Card, CardHeader, CardBody, CardText, CardTitle } from "reactstrap";

import { Router } from "../../routes";

export default class PortfolioCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { portfolio, children } = this.props;

    return (
      <span onClick={() => Router.pushRoute(`/portfolio/${portfolio._id}`)}>
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">
            {portfolio.position}
          </CardHeader>
          <CardBody>
            <p className="portfolio-card-city">{portfolio.location}</p>
            <CardTitle className="portfolio-card-title">
              {portfolio.title}
            </CardTitle>
            <CardText className="portfolio-card-text">
              {portfolio.description}
            </CardText>
            <div className="readMore">{children}</div>
          </CardBody>
        </Card>
      </span>
    );
  }
}
