/// <reference types="Cypress" />

describe("Dashboard", () => {
  beforeEach(() => {
  beforeEach(() => {
    cy.fixture("dashboardData.json").as("getTimeTracking");
    cy.visit("http://localhost:3000/dashboard");
  });

  it("should render the correct title", () => {
    cy.title().should("equal", "Time Tracking - Dashboard");
  });

  it("should render the sidebar with daily as the selected timeframe by default", () => {
    cy.get('[data-testid="sidebar"] [aria-selected="true"]').should(
      "have.text",
      "Daily"
    );
  });

  it("should render the correct number of dashboard cards", () => {
    cy.get('[data-testid="dashboard-card"]').should("have.length", 6);
  });

  it("should render the dashboard cards with the correct data for daily timeframe by default", () => {
    cy.fixture("dashboardData.json").then((data) => {
      data.forEach((item, index) => {
        cy.get(`[data-testid="dashboard-card"]:eq(${index})`).within(() => {
          cy.get('[data-testid="card-title"]').should("have.text", item.title);
          cy.get('[data-testid="card-current"]').should(
            "have.text",
            item.timeframes.daily.current.toString() + "hrs"
          );
          cy.get('[data-testid="card-previous"]').should(
            "have.text",
            "Yesterday - " + item.timeframes.daily.previous.toString() + "hrs"
          );
        });
      });
    });
  });

  it("should update the dashboard cards when the timeframe is changed", () => {
    cy.get('[data-testid="sidebar"] [data-value="weekly"]').click();
    cy.get('[data-testid="sidebar"] [aria-selected="true"]').should(
      "have.text",
      "Weekly"
    );
    cy.fixture("dashboardData.json").then((data) => {
      data.forEach((item, index) => {
        cy.get(`[data-testid="dashboard-card"]:eq(${index})`).within(() => {
          cy.get('[data-testid="card-title"]').should("have.text", item.title);
          cy.get('[data-testid="card-current"]').should(
            "have.text",
            item.timeframes.weekly.current.toString() + "hrs"
          );
          cy.get('[data-testid="card-previous"]').should(
            "have.text",
            "Last Week - " + item.timeframes.weekly.previous.toString() + "hrs"
          );
        });
      });
    });
  });
});
