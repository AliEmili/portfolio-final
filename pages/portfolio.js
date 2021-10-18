import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { withRouter } from "next/router";
import { getPortfolioById } from "../actions";
import moment from "moment";
class Portfolio extends React.Component {
  static async getInitialProps({ query }) {
    let portfolio = {};

    try {
      portfolio = await getPortfolioById(query.id);
    } catch (error) {
      console.error(error);
    }

    return { portfolio };
  }

  render() {
    const { portfolio } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <p>
            <b>Description: </b>
            {portfolio.description}
          </p>
          <p>
            <b>Company: </b>
            {portfolio.company}
          </p>
          <p>
            <b>Position: </b>
            {portfolio.position}
          </p>
          <p>
            <b>Location: </b>
            {portfolio.location}
          </p>
          <p>
            <b>Start Date: </b>
            {moment(portfolio.startDate).format("MMMM YYYY")}
          </p>
          <p>
            <b>End Date: </b>
            {portfolio.endDate
              ? moment(portfolio.endDate).format("MMMM YYYY")
              : "Still Working Here"}
          </p>
          {portfolio.picturesUrl.map((pic) => (
            <img src={pic} alt="project pic" />
          ))}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolio);
